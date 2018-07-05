import Options from './options'
import { Application } from '@feathersjs/feathers'
import mapAuth from './translators/map-auth'

export default function feathersAuthProvider(client: Application, options: Options) {
  return async (type: string, params: string) => {
    return mapAuth(client, options, type, params)
  }
}
