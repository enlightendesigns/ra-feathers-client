import { mapRequest } from './translators/map-request'
import { mapResponse } from './translators/map-response'

export type Options = {}

export function dataProvider(client: any, options: Options = {}) {
  return async (type: string, resource: string, params: object) => {
    if ('authenticate' in client) {
      const authResult: any = await client.authenticate()
    }

    const feathersResponse: any = await mapRequest(client, options, type, resource, params)

    return mapResponse(options, feathersResponse, type, resource, params)
  }
}
