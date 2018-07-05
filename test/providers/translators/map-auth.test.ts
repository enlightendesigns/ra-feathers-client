import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from 'react-admin'
import { Application } from '@feathersjs/feathers'
import mapAuth from '../../../src/providers/translators/map-auth'

describe('map auth', () => {
  const MockApplication = jest.fn<Application>(() => ({
    authenticate: jest.fn(),
    logout: jest.fn()
  }))

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
    const response = mapAuth(client, { debug: false }, AUTH_LOGIN, params)

    expect(client.authenticate).toHaveBeenCalledWith(actual)
  })

  test('AUTH_LOGOUT', () => {
    const token = 'this is a jwt token'
    localStorage.setItem('token', token)
    expect(localStorage.getItem('token')).toEqual(token)

    const client = new MockApplication()
    const response = mapAuth(client, { debug: false }, AUTH_LOGOUT, {})
    expect(client.logout).toHaveBeenCalled()
    expect(localStorage.getItem('token')).toBeNull()
  })

  test('AUTH_ERROR with code 200', async () => {
    const token = 'this is a jwt token'
    localStorage.setItem('token', token)
    expect(localStorage.getItem('token')).toEqual(token)

    const params = {
      code: 200
    }
    const client = new MockApplication()
    const response = mapAuth(client, { debug: false }, AUTH_ERROR, params)
    expect(localStorage.getItem('token')).toBe(token)

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
    localStorage.setItem('token', token)
    expect(localStorage.getItem('token')).toEqual(token)

    const params = {
      code: 401
    }
    const client = new MockApplication()
    const response = mapAuth(client, { debug: false }, AUTH_ERROR, params)
    expect(localStorage.getItem('token')).toBe(null)

    await response
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toBe('Authentication error')
      })
  })

  test('AUTH_ERROR with code 403', async () => {
    const token = 'this is a jwt token'
    localStorage.setItem('token', token)
    expect(localStorage.getItem('token')).toEqual(token)

    const params = {
      code: 403
    }
    const client = new MockApplication()
    const response = mapAuth(client, { debug: false }, AUTH_ERROR, params)
    expect(localStorage.getItem('token')).toBe(null)

    await response
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toBe('Authentication error')
      })
  })

  test('AUTH_CHECK with token present', async () => {
    const token = 'this is a jwt token'
    localStorage.setItem('token', token)
    expect(localStorage.getItem('token')).toEqual(token)

    const client = new MockApplication()
    const response = mapAuth(client, { debug: false }, AUTH_CHECK, {})
    expect(localStorage.getItem('token')).toBe(token)

    await response
      .then(text => {
        expect(text).toEqual('token key is present in localStorage')
      })
      .catch(error => {
        expect(error).toBeFalsy()
      })
  })

  test('AUTH_CHECK with token not present', async () => {
    const token = 'this is a jwt token'
    localStorage.setItem('token', token)
    expect(localStorage.getItem('token')).toEqual(token)

    localStorage.removeItem('token')
    expect(localStorage.getItem('token')).toEqual(null)

    const client = new MockApplication()
    const response = mapAuth(client, { debug: false }, AUTH_CHECK, {})
    expect(localStorage.getItem('token')).toBe(null)

    await response
      .then(text => {
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toBe('Authentication check failed')
      })
  })

  test('UNKNOWN', async () => {
    const client = new MockApplication()
    const response = mapAuth(client, { debug: false }, 'UKNOWN', {})

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
    const response = mapAuth(client, { debug: true }, 'UKNOWN', {})

    await response
      .then(text => {
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toBe('Unsupported FeathersJS authClient action type UKNOWN')
      })
  })
})
