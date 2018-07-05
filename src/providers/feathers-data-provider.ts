import mapRequest from './translators/map-request'
import mapResponse from './translators/map-response'
import Options, { defaultOptions } from './options'
import { Application } from '@feathersjs/feathers'

export default function feathersDataProvider(
  client: Application,
  options: Options = defaultOptions
) {
  return async (type: string, resource: string, params: any) => {
    const debug = options.debug

    // if the client is configured with authentication
    // then the authentication method is available
    if ('authenticate' in client) {
      const authResult: any = await client.authenticate()
      /* istanbul ignore next */
      if (debug) {
        console.log('dataProvider auth result', authResult)
      }
    }

    /* istanbul ignore next */
    const feathersResponse: any = await mapRequest(client, options, type, resource, params)

    /* istanbul ignore next */
    return mapResponse(options, feathersResponse, type, resource, params)
  }
}
