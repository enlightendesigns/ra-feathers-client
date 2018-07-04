import mapRequest from './translators/map-request'
import mapResponse from './translators/map-response'
import { Options } from './options'

const defaultOption = {
  debug: false
}

export default function feathersDataProvider(client: any, options: Options = defaultOption) {
  return async (type: string, resource: string, params: object) => {
    if ('authenticate' in client) {
      const authResult: any = await client.authenticate()
    }

    const feathersResponse: any = await mapRequest(client, options, type, resource, params)

    return mapResponse(options, feathersResponse, type, resource, params)
  }
}
