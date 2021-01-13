import { diff } from '@graphql-inspector/core';
import { processConfig } from '@graphql-mesh/config';
import { getMesh } from '@graphql-mesh/runtime';
import { prefixLogger } from '@graphql-portal/logger';
import { ApiDef } from '@graphql-portal/types';
import { Application, Request, Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import { defaultMiddlewares, loadCustomMiddlewares, prepareRequestContext } from '../middleware';

interface IMesh {
  schema: GraphQLSchema;
  contextBuilder: (initialContextValue?: any) => Promise<Record<string, any>>;
}

const logger = prefixLogger('router');

let router: Router;
const apiSchema: { [apiName: string]: GraphQLSchema } = {};

export async function setRouter(app: Application, apiDefs: ApiDef[]): Promise<void> {
  await buildRouter(apiDefs);
  app.use((req, res, next) => router(req, res, next));
}

export async function buildRouter(apiDefs: ApiDef[]): Promise<Router> {
  const nextRouter = Router();

  nextRouter.use(prepareRequestContext);

  if (apiDefs?.length) {
    logger.info('Loaded %s API Definitions, preparing the endpoints for them.', apiDefs.length);
    await Promise.all(apiDefs.map((apiDef) => buildApi(nextRouter, apiDef)));
  } else {
    logger.warn('No APIs were loaded as the configuration is empty.');
  }

  router = nextRouter;
  return router;
}

async function buildApi(toRouter: Router, apiDef: ApiDef, mesh?: IMesh) {
  if (!mesh) {
    const customMiddlewares = await loadCustomMiddlewares();
    [...defaultMiddlewares, ...customMiddlewares].map((mw) => {
      toRouter.use(apiDef.endpoint, mw(apiDef));
    });
  }

  mesh = await getMeshForApiDef(apiDef, mesh);
  if (!mesh) {
    logger.error(`Could not get schema for API, enpoint ${apiDef.endpoint} won't be added to the router`);
    return;
  }
  const { schema, contextBuilder } = mesh;
  apiSchema[apiDef.name] = schema;

  logger.info(`Loaded API ${apiDef.name} ➜ ${apiDef.endpoint}`);

  toRouter.use(
    apiDef.endpoint,
    graphqlHTTP(async (req: Request) => {
      const forwardHeaders = req.context === undefined ? {} : req.context.forwardHeaders;
      const context = await contextBuilder({
        ...forwardHeaders,
      });

      return {
        schema,
        context,
        graphiql: { headerEditorEnabled: true },
      };
    })
  );
}

async function getMeshForApiDef(apiDef: ApiDef, mesh?: IMesh, retry = 5): Promise<IMesh | undefined> {
  if (mesh) {
    return mesh;
  }
  try {
    const meshConfig = await processConfig({ sources: apiDef.sources, ...apiDef.mesh });
    mesh = await getMesh(meshConfig);
  } catch (error) {
    logger.error(error);
    if (retry) {
      logger.warn('Failed to load schema, retrying after 5 seconds...');
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return getMeshForApiDef(apiDef, mesh, retry - 1);
    }
  }
  return mesh;
}

export async function updateApi(apiDef: ApiDef): Promise<void> {
  logger.debug(`Updating API ${apiDef.name}: ${apiDef.endpoint}`);
  const mesh = await getMeshForApiDef(apiDef);
  if (!mesh) {
    logger.error(`Could not get schema for API, enpoint ${apiDef.endpoint} won't be updated in the router`);
    return;
  }
  if (apiSchema[apiDef.name] && !diff(mesh.schema, apiSchema[apiDef.name]!).length) {
    logger.debug(`API ${apiDef.name} schema was not changed`);
    return;
  }
  logger.info(`API ${apiDef.name} schema changed, updating the endpoint: ${apiDef.endpoint}`);

  const routerWithNewApi = Router();
  await buildApi(routerWithNewApi, apiDef, mesh);

  const oldLayerIndex = router.stack.findIndex(
    (layer) => layer.name === 'graphqlMiddleware' && layer.regexp.test(apiDef.endpoint)
  );
  router.stack.splice(oldLayerIndex, 1, routerWithNewApi.stack[0]);
}
