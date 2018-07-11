import winston, { Logger, LeveledLogMethod } from 'winston'
import { mapRequest } from './translators/map-request'
import mapResponse from './translators/map-response'
import Options, { defaultOptions } from './options'
import AuthenticationResult from './translators/authentication-result'
import { Application } from '@feathersjs/feathers'

export default function feathersDataProvider(
  client: Application,
  options: Options = defaultOptions
) {
  return async (type: string, resource: string, params: any) => {
    /* istanbul ignore next */
    const logLevel: string = options.debug ? 'info' : 'error'
    /* istanbul ignore next */
    const logger: Logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(winston.format.splat(), winston.format.simple()),
      transports: [new winston.transports.Console()]
    })

    // if the client is configured with authentication
    // then the authentication method is available
    if ('authenticate' in client) {
      const authResult: AuthenticationResult = await client.authenticate()
      /* istanbul ignore next */
      logger.info('dataProvider auth result=%j', authResult)
    }

    /* istanbul ignore next */
    const feathersResponse: any = await mapRequest(logger, client, options, type, resource, params)

    /* istanbul ignore next */
    return mapResponse(options, feathersResponse, type, resource, params)
  }
}
