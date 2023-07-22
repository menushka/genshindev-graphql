import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda'
import { context, server } from './server'

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  { context }
)
