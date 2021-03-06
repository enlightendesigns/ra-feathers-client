import { Application } from '@feathersjs/feathers'
import { AUTH_LOGIN } from 'react-admin'
import feathersAuthProvider from '../../src/providers/feathers-auth-provider'

describe('feathers auth provider', () => {
  const MockApplication = jest.fn<Application>(() => ({
    authenticate: jest.fn(),
    logout: jest.fn()
  }))

  test('it correctly return expected function with default options', () => {
    const client: Application = new MockApplication()
    const func = feathersAuthProvider(client)

    expect(func).toBeInstanceOf(Function)
  })

  test('it correctly return expected function', () => {
    const client: Application = new MockApplication()
    const func = feathersAuthProvider(client, { debug: false })

    expect(func).toBeInstanceOf(Function)
  })

  test('it correctly map to data function', () => {
    const client: Application = new MockApplication()
    const func = feathersAuthProvider(client, { debug: false })(AUTH_LOGIN, {})

    expect(func).toBeInstanceOf(Promise)
  })
})
