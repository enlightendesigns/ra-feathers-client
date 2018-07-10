import { Application } from '@feathersjs/feathers'
import { GET_ONE } from 'react-admin'
import feathersDataProvider from '../../src/providers/feathers-data-provider'
import * as requestFunctions from '../../src/providers/translators/map-request'

describe('feathers auth provider', () => {
  const originalMapRequest = requestFunctions.mapRequest
  requestFunctions.mapRequest = jest.fn().mockImplementation(() => {
    return Promise.resolve({ id: 321 })
  })

  const MockApplication = jest.fn<Application>(() => ({
    authenticate: jest.fn(),
    logout: jest.fn(),
    service: jest.fn()
  }))

  const MockApplicationWithNoAuthentication = jest.fn<Application>(() => ({
    logout: jest.fn()
  }))

  test('it correctly return expected function', () => {
    const client: Application = new MockApplication()
    const func = feathersDataProvider(client, { debug: false })

    expect(func).toBeInstanceOf(Function)
  })

  test('it correctly return expected function with default options', () => {
    const client: Application = new MockApplication()
    const func = feathersDataProvider(client)

    expect(func).toBeInstanceOf(Function)
  })

  test('it correctly map to map data provider function', () => {
    const client: Application = new MockApplication()
    const func = feathersDataProvider(client, { debug: false })(GET_ONE, 'resource', {})

    expect(func).toBeInstanceOf(Promise)
    expect(client.authenticate).toHaveBeenCalled()
  })

  test('it correctly map to map data provider function', () => {
    const client: Application = new MockApplicationWithNoAuthentication()
    const func = feathersDataProvider(client, { debug: false })(GET_ONE, 'resource', {})

    expect(func).toBeInstanceOf(Promise)
  })
})
