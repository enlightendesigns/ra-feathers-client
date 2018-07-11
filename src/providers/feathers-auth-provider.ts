import winston, { Logger } from 'winston'
import Options, { defaultOptions } from './options'
import { Application } from '@feathersjs/feathers'
import mapAuth from './translators/map-auth'

export default function feathersAuthProvider(
  client: Application,
  options: Options = defaultOptions
) {
  const logLevel = options.debug ? 'info' : 'error'
  const logger: Logger = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(winston.format.splat(), winston.format.simple()),
    transports: [new winston.transports.Console()]
  })

  return async (type: string, params: any) => mapAuth(logger, client, options, type, params)
}
