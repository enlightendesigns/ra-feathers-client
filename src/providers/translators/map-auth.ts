import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from 'react-admin'
import { Application } from '@feathersjs/feathers'
import { FeathersAuthCredentials } from '@feathersjs/authentication-client'
import Options from '../options'
import AuthenticationResult from './authentication-result'

export default async function mapAuth(
  client: Application,
  options: Options,
  type: string,
  params: any
): Promise<AuthenticationResult | void | string> {
  const storageKey = 'ra-feathers-token'
  let response: Promise<AuthenticationResult | void | string>

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
      const status = params.status
      if (status === 401 || status === 403) {
        localStorage.removeItem(storageKey)
        response = Promise.reject(`Authentication error with status ${status}`)
      } else {
        if (options.debug) {
          console.warn('Unknown Authentication error', params.status, params)
        }
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
      response = Promise.reject(new Error(`Unsupported FeathersJS authClient action type ${type}`))
  }

  if (options.debug) {
    console.log('authProvider response type=%s, response=%j', type, response)
  }

  return response
}
