import { dashboard, initDashboard } from '@graphql-portal/dashboard';
import { prefixLogger } from '@graphql-portal/logger';
import { ApiDef, GatewayConfig } from '@graphql-portal/types';
import cluster from 'cluster';
import { customAlphabet } from 'nanoid';
import { loadApiDefs as loadApiDefsFromFs } from './api-def.config';
import { loadConfig } from './gateway.config';
import useEnv from './use-env';

const logger = prefixLogger('config');

export type Config = {
  nodeId: string;
  gateway: GatewayConfig;
  apiDefs: ApiDef[];
  timestamp: number;
};

const config: Config = {} as any;

export async function initConfig(): Promise<void> {
  config.nodeId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-', 11)();
  config.gateway = (await loadConfig()) as GatewayConfig;
  if (!config.gateway) {
    throw new Error('Gateway config was not found at path "./config/gateway.yaml"');
  }
  useEnv(config.gateway);
}

export async function loadApiDefs(): Promise<boolean> {
  if (cluster.isWorker) {
    return false;
  }

  config.apiDefs = config.apiDefs ?? [];

  if (config.gateway.use_dashboard_configs) {
    initDashboard(config.gateway);
    const loaded = await dashboard.loadApiDefs();

    if (!(loaded && loaded?.apiDefs)) {
      logger.info('API Definitions were not updated from Dashboard.');
      return false;
    }

    config.apiDefs = loaded.apiDefs;
    config.timestamp = +loaded.timestamp;
  } else {
    config.apiDefs = await loadApiDefsFromFs(config.gateway);
    config.timestamp = Date.now();
    useEnv(config.apiDefs);
  }
  return true;
}

export { config };
