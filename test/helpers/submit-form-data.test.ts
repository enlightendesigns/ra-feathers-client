import submitFormData from '../../src/helpers/submit-form-data'
import { Application } from '@feathersjs/feathers'

global.Headers = data => data
window.fetch = require('jest-fetch-mock')

describe('submit form data with POST and accessToken', () => {
  const baseUrl = 'http://localhost:3030/messages'
  const accessToken = 'this is a token'
  const MockApplicationWithAuthentication = jest.fn<Application>(() => ({
    service: jest.fn().mockReturnValue({ base: baseUrl }),
    settings: { accessToken: accessToken }
  }))

  const MockApplicationWithoutAuthentication = jest.fn<Application>(() => ({
    service: jest.fn().mockReturnValue({ base: baseUrl }),
    settings: {}
  }))

  const MockFormData = jest.fn<FormData>(() => ({
    text: 'hello'
  }))

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponse(JSON.stringify({}))
  })

  test('submitFormData with accessToken', () => {
    const client = new MockApplicationWithAuthentication()
    const data = new MockFormData()
    const actual = submitFormData(client, 'messages', data, 'POST')

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(baseUrl)
    expect(fetch.mock.calls[0][1].headers).toEqual({ Authorization: `Bearer ${accessToken}` })
    expect(fetch.mock.calls[0][1].method).toEqual('POST')
    expect(fetch.mock.calls[0][1].body).toEqual({ text: 'hello' })
  })

  test('submitFormData without accessToken', () => {
    const client = new MockApplicationWithoutAuthentication()
    const data = new MockFormData()
    const actual = submitFormData(client, 'messages', data, 'POST')

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(baseUrl)
    expect(fetch.mock.calls[0][1].headers).toEqual(undefined)
    expect(fetch.mock.calls[0][1].method).toEqual('POST')
    expect(fetch.mock.calls[0][1].body).toEqual({ text: 'hello' })
  })

  test('submitFormData with id', () => {
    const client = new MockApplicationWithoutAuthentication()
    const data = new MockFormData()
    const resourceId = '123456'
    const actual = submitFormData(client, 'messages', data, 'POST', resourceId)

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${baseUrl}/${resourceId}`)
    expect(fetch.mock.calls[0][1].headers).toEqual(undefined)
    expect(fetch.mock.calls[0][1].method).toEqual('POST')
    expect(fetch.mock.calls[0][1].body).toEqual({ text: 'hello' })
  })

  test('submitFormData with PATCH', () => {
    const client = new MockApplicationWithoutAuthentication()
    const data = new MockFormData()
    const resourceId = '123456'
    const actual = submitFormData(client, 'messages', data, 'PATCH', resourceId)

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${baseUrl}/${resourceId}`)
    expect(fetch.mock.calls[0][1].headers).toEqual(undefined)
    expect(fetch.mock.calls[0][1].method).toEqual('PATCH')
    expect(fetch.mock.calls[0][1].body).toEqual({ text: 'hello' })
  })
})
