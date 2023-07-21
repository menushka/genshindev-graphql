import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda'
import { server } from './server.mjs'

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server as any,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
)
