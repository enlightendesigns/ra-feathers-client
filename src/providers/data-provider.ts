import { mapRequest } from './translators/map-request'
import { mapResponse } from './translators/map-response'

export type Options = {}

export function dataProvider(client: any, options: Options = {}) {
  return async (type: string, resource: string, params: object) => {
    const authResult = await client.authenticate()
    const feathersResponse: any = mapRequest(client, options, type, resource, params)
    const reactAdminResponse: any = mapResponse(options, feathersResponse, type, resource, params)

    return reactAdminResponse
  }
}
