import Options, { defaultOptions } from './options'
import { Application } from '@feathersjs/feathers'
import mapAuth from './translators/map-auth'

export default function feathersAuthProvider(
  client: Application,
  options: Options = defaultOptions
) {
  return async (type: string, params: any) => mapAuth(client, options, type, params)
}
