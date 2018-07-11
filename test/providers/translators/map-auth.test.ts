import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSION } from 'react-admin'
import { Application } from '@feathersjs/feathers'
import mapAuth from '../../../src/providers/translators/map-auth'
import { Logger } from 'winston'

describe('map auth', () => {
  const MockApplication = jest.fn<Application>(() => ({
    authenticate: jest.fn(),
    logout: jest.fn()
  }))

  const MockLogger = jest.fn<Logger>(() => ({
    info: jest.fn(),
    warn: jest.fn()
  }))

  const logger = new MockLogger()
  const jwtTokenKey = 'ra-feathers-token'

  test('AUTH_LOGIN', () => {
    const params = {
      username: 'test@mail.com',
      password: 'secret'
    }
    const actual = {
      email: params.username,
      password: params.password,
      strategy: 'local'
    }
    const client = new MockApplication()
    const response = mapAuth(logger, client, { debug: false }, AUTH_LOGIN, params)

    expect(client.authenticate).toHaveBeenCalledWith(actual)
  })

  test('AUTH_LOGOUT', () => {
    const token = 'this is a jwt token'
    localStorage.setItem(jwtTokenKey, token)
    expect(localStorage.getItem(jwtTokenKey)).toEqual(token)

    const client = new MockApplication()
    const response = mapAuth(logger, client, { debug: false }, AUTH_LOGOUT, {})
    expect(client.logout).toHaveBeenCalled()
    expect(localStorage.getItem(jwtTokenKey)).toBeNull()
  })

  test('AUTH_ERROR with code 200', async () => {
    const token = 'this is a jwt token'
    localStorage.setItem(jwtTokenKey, token)
    expect(localStorage.getItem(jwtTokenKey)).toEqual(token)

    const params = {
      status: 200
    }
    const client = new MockApplication()
    const response = mapAuth(logger, client, { debug: false }, AUTH_ERROR, params)
    expect(localStorage.getItem(jwtTokenKey)).toBe(token)

    await response
      .then(() => {
        expect(true).toBeTruthy()
      })
      .catch(error => {
        expect(true).toBeFalsy()
        throw error
      })
  })

  test('AUTH_ERROR with code 401', async () => {
    const token = 'this is a jwt token'
    localStorage.setItem(jwtTokenKey, token)
    expect(localStorage.getItem(jwtTokenKey)).toEqual(token)

    const params = {
      status: 401
    }
    const client = new MockApplication()
    const response = mapAuth(logger, client, { debug: false }, AUTH_ERROR, params)
    expect(localStorage.getItem(jwtTokenKey)).toBe(null)

    await response
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error).toBe('Authentication error with status 401')
      })
  })

  test('AUTH_ERROR with code 403', async () => {
    const token = 'this is a jwt token'
    localStorage.setItem(jwtTokenKey, token)
    expect(localStorage.getItem(jwtTokenKey)).toEqual(token)

    const params = {
      status: 403
    }
    const client = new MockApplication()
    const response = mapAuth(logger, client, { debug: false }, AUTH_ERROR, params)
    expect(localStorage.getItem(jwtTokenKey)).toBe(null)

    await response
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error).toBe('Authentication error with status 403')
      })
  })

  test('AUTH_CHECK with token present', async () => {
    const token = 'this is a jwt token'
    localStorage.setItem(jwtTokenKey, token)
    expect(localStorage.getItem(jwtTokenKey)).toEqual(token)

    const client = new MockApplication()
    const response = mapAuth(logger, client, { debug: false }, AUTH_CHECK, {})
    expect(localStorage.getItem(jwtTokenKey)).toBe(token)

    await response
      .then(text => {
        expect(text).toEqual(`${jwtTokenKey} key is present in localStorage`)
      })
      .catch(error => {
        expect(error).toBeFalsy()
      })
  })

  test('AUTH_CHECK with token not present', async () => {
    const token = 'this is a jwt token'
    localStorage.setItem(jwtTokenKey, token)
    expect(localStorage.getItem(jwtTokenKey)).toEqual(token)

    localStorage.removeItem(jwtTokenKey)
    expect(localStorage.getItem(jwtTokenKey)).toEqual(null)

    const client = new MockApplication()
    const response = mapAuth(logger, client, { debug: false }, AUTH_CHECK, {})
    expect(localStorage.getItem(jwtTokenKey)).toBe(null)

    await response
      .then(text => {
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toBe('Authentication check failed')
      })
  })

  test('AUTH_GET_PERMISSION', async () => {
    const client = new MockApplication()
    const response = mapAuth(logger, client, { debug: false }, 'AUTH_GET_PERMISSION', {})

    await response
      .then(text => {
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toBe(
          'Unsupported FeathersJS authClient action type AUTH_GET_PERMISSION'
        )
      })
  })

  test('UNKNOWN', async () => {
    const client = new MockApplication()
    const response = mapAuth(logger, client, { debug: false }, 'UKNOWN', {})

    await response
      .then(text => {
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toBe('Unsupported FeathersJS authClient action type UKNOWN')
      })
  })

  test('UNKNOWN with debug', async () => {
    const client = new MockApplication()
    const response = mapAuth(logger, client, { debug: true }, 'UKNOWN', {})

    await response
      .then(text => {
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toBe('Unsupported FeathersJS authClient action type UKNOWN')
      })
  })
})
