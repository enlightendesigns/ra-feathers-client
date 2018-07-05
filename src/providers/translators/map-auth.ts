import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from 'react-admin'
import { Application } from '@feathersjs/feathers'
import { FeathersAuthCredentials } from '@feathersjs/authentication-client'
import Options from '../options'

export default async function mapAuth(
  client: Application,
  options: Options,
  type: string,
  params: any
): Promise<any> {
  const debug: boolean = options.debug
  const permissionKey = 'permissions'
  const permissionField = 'roles'
  const storageKey = 'token'

  let response: Promise<any>

  switch (type) {
    case AUTH_LOGIN:
      const username = params.username
      const password = params.password
      const authCredentials: FeathersAuthCredentials = {
        strategy: 'local',
        email: username,
        password: password
      }
      response = client.authenticate(authCredentials)
      break
    case AUTH_LOGOUT:
      localStorage.removeItem(storageKey)
      response = client.logout()
      break
    case AUTH_ERROR:
      const code = params.code
      if (code === 401 || code === 403) {
        localStorage.removeItem(storageKey)
        response = Promise.reject(new Error('Authentication error'))
      } else {
        response = Promise.resolve()
      }
      break
    case AUTH_CHECK:
      const token = localStorage.getItem(storageKey)
      if (token) {
        response = Promise.resolve(`${storageKey} key is present in localStorage`)
      } else {
        response = Promise.reject(new Error('Authentication check failed'))
      }
      break
    default:
      throw new Error(`Unsupported FeathersJS authClient action type ${type}`)
  }

  /* istanbul ignore next */
  if (debug) {
    console.log('authProvider response', type, response)
  }

  return response
}
