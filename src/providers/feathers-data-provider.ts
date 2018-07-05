import mapRequest from './translators/map-request'
import mapResponse from './translators/map-response'
import Options from './options'
import { Application } from '@feathersjs/feathers'

const defaultOption = {
  debug: false
}

export default function feathersDataProvider(
  client: Application,
  options: Options = defaultOption
) {
  return async (type: string, resource: string, params: object) => {
    const debug = options.debug

    // if the client is configured with authentication
    // then the authentication method is available
    if ('authenticate' in client) {
      const authResult: any = await client.authenticate()
      if (debug) {
        console.log('dataProvider auth result', authResult)
      }
    }

    const feathersResponse: any = await mapRequest(client, options, type, resource, params)

    return mapResponse(options, feathersResponse, type, resource, params)
  }
}
