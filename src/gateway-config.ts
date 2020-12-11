import { cosmiconfig } from 'cosmiconfig';
import Ajv from 'ajv';
import { GatewayConfig } from './types/gateway-config';
import logger from './logger';

const gatewaySchema = require('../../src/types/gateway-schema.json');

export function validateConfig(config: any): config is GatewayConfig {
  const ajv = new Ajv();
  const validate = ajv.compile(gatewaySchema);
  if (!validate(config)) {
    logger.error('GraphQL Portal configuration is not valid:');
    logger.error(
      ajv.errorsText(validate.errors, {
        dataVar: 'config',
      }),
    );
    return false;
  }

  return true;
}

export async function loadConfig(): Promise<GatewayConfig> {
  // find & parse config
  const explorer = cosmiconfig('gateway', {
    searchPlaces: [
      'config/gateway.json',
      'config/gateway.yaml',
    ],
  });

  const results = await explorer.search();
  const config = results?.config;

  // validate with AJV
  if (!validateConfig(config)) {
    throw new Error('Configuration file is not valid.');
  }

  return config;
}
