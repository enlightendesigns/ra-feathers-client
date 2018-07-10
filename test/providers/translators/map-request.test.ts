import feathers, { Application, Service } from '@feathersjs/feathers'
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} from 'react-admin'

import { mapRequest } from '../../../src/providers/translators/map-request'
import paramsToQuery from '../../../src/providers/translators/params-to-query'
import { Options } from '../../../src/providers/options'
import * as fileHelper from '../../../src/helpers/file-helper'
import * as submitFormHelper from '../../../src/helpers/submit-form-data'

global.Headers = data => data
window.fetch = require('jest-fetch-mock')

global.console = {
  log: () => {
    // do nothing
  },
  warn: () => {
    // do nothing
  }
}

const options: Options = {
  debug: false
}

describe('map request', () => {
  const MockService = jest.fn<Service<any>>(() => ({
    find: jest.fn().mockResolvedValue([]),
    get: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(null),
    patch: jest.fn().mockResolvedValue(null),
    remove: jest.fn().mockResolvedValue(null)
  }))

  test('GET_LIST', async () => {
    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'find')
    client.use('/messages', service)

    const params = {
      pagination: {
        page: 1,
        perPage: 10
      },
      filter: {
        text: 'filter string'
      }
    }

    const response = await mapRequest(client, options, GET_LIST, 'messages', params)
    const query = paramsToQuery(GET_LIST, params)

    expect(service.find).toHaveBeenCalledWith(query)
  })

  test('GET_ONE', async () => {
    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'get')
    client.use('/messages', service)

    const params = {
      id: 3
    }
    const response = await mapRequest(client, options, GET_ONE, 'messages', params)
    const query = paramsToQuery(GET_ONE, params)

    expect(service.get).toHaveBeenCalledWith(query, {})
  })

  test('GET_MANY', async () => {
    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'find')
    client.use('/messages', service)

    const params = {
      pagination: {
        page: 1,
        perPage: 10
      },
      filter: {
        text: 'filter string'
      }
    }

    const response = await mapRequest(client, options, GET_MANY, 'messages', params)
    const query = paramsToQuery(GET_MANY, params)

    expect(service.find).toHaveBeenCalledWith(query)
  })

  test('GET_MANY_REFERENCE', async () => {
    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'find')
    client.use('/messages', service)

    const params = {
      target: 'author_id',
      id: 658,
      pagination: {
        page: 1,
        perPage: 10
      },
      filter: {
        text: 'filter string'
      }
    }

    const response = await mapRequest(client, options, GET_MANY_REFERENCE, 'messages', params)
    const query = paramsToQuery(GET_MANY_REFERENCE, params)

    expect(service.find).toHaveBeenCalledWith(query)
  })

  test('CREATE', async () => {
    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'create')
    client.use('/messages', service)

    const params = {
      data: {
        text: 'hello'
      }
    }

    const response = await mapRequest(client, options, CREATE, 'messages', params)
    const query = paramsToQuery(CREATE, params)

    expect(service.create).toHaveBeenCalledWith(query, {})
  })

  test('CREATE with single file attached', async () => {
    const originalSubmitFormData = submitFormHelper.submitFormData
    submitFormHelper.submitFormData = jest.fn().mockImplementation(() => {
      return Promise.resolve({ id: 321 })
    })

    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'create')
    client.use('/messages', service)

    const file = new File([], '')
    const params = {
      data: {
        singleFile: { title: 'singleFile1', rawFile: file },
        id: 321,
        text: 'some text'
      }
    }

    const response = await mapRequest(client, options, CREATE, 'messages', params)
    const formData = fileHelper.getFilesFromParams(params)

    expect(submitFormHelper.submitFormData.mock.calls.length).toEqual(1)
    expect(submitFormHelper.submitFormData.mock.calls[0][1]).toEqual('messages')
    expect(submitFormHelper.submitFormData.mock.calls[0][2].get('id')).toEqual('321')
    expect(submitFormHelper.submitFormData.mock.calls[0][2].get('text')).toEqual('some text')
    expect(submitFormHelper.submitFormData.mock.calls[0][2].get('singleFile')).toEqual(file)
    expect(submitFormHelper.submitFormData.mock.calls[0][3]).toEqual('POST')

    // reset the mock module
    submitFormHelper.submitFormData = originalSubmitFormData
  })

  test('UPDATE', async () => {
    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'update')
    client.use('/messages', service)

    const params = {
      id: 123,
      data: {
        text: 'hello my friend',
        name: 'Batman'
      },
      previousData: {
        text: 'hello my hero',
        name: 'Batman'
      }
    }

    const response = await mapRequest(client, options, UPDATE, 'messages', params)
    const query = paramsToQuery(UPDATE, params)

    expect(service.patch).toHaveBeenCalledWith(query.id, query.data, {})
  })

  test('UPDATE with single file attached', async () => {
    const originalSubmitFormData = submitFormHelper.submitFormData
    submitFormHelper.submitFormData = jest.fn().mockImplementation(() => {
      return Promise.resolve({ id: 321 })
    })

    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'patch')
    client.use('/messages', service)

    const file = new File([], '')
    const params = {
      id: 321,
      data: {
        singleFile: { title: 'singleFile1', rawFile: file },
        id: 321,
        text: 'some new text'
      },
      previousData: {
        singleFile: { title: 'singleFile2', rawFile: file },
        id: 321,
        text: 'some text'
      }
    }

    const response = await mapRequest(client, options, UPDATE, 'messages', params)
    const formData = fileHelper.getFilesFromParams(params)

    expect(submitFormHelper.submitFormData.mock.calls.length).toEqual(1)
    expect(submitFormHelper.submitFormData.mock.calls[0][1]).toEqual('messages')
    expect(submitFormHelper.submitFormData.mock.calls[0][2].get('id')).toEqual('321')
    expect(submitFormHelper.submitFormData.mock.calls[0][2].get('text')).toEqual('some new text')
    expect(submitFormHelper.submitFormData.mock.calls[0][2].get('singleFile')).toEqual(file)
    expect(submitFormHelper.submitFormData.mock.calls[0][3]).toEqual('PATCH')

    // reset the mock module
    submitFormHelper.submitFormData = originalSubmitFormData
  })

  test('UPDATE_MANY', async () => {
    const client: Application = feathers()
    const service = new MockService()

    client.use('/messages', service)
    await mapRequest(client, {}, UPDATE_MANY, 'messages', {})
      .then(result => {
        // we should not execute this code
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toEqual('UPDATE_MANY paramToQuery not implemented')
      })
  })

  test('DELETE', async () => {
    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'remove')
    client.use('/messages', service)

    const params = {
      id: 3
    }
    const response = await mapRequest(client, options, DELETE, 'messages', params)
    const query = paramsToQuery(DELETE, params)

    expect(service.remove).toHaveBeenCalledWith(query, {})
  })

  test('DELETE_MANY', async () => {
    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'remove')
    client.use('/messages', service)

    const params = {
      ids: [123, 654, 789]
    }
    const response = await mapRequest(client, options, DELETE_MANY, 'messages', params)
    const query = paramsToQuery(DELETE_MANY, params)

    expect(service.remove).toHaveBeenCalledWith(null, query)
  })

  test('DELETE_MANY with empty ids', async () => {
    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'remove')
    client.use('/messages', service)

    const params = {
      ids: []
    }
    const response = await mapRequest(client, options, DELETE_MANY, 'messages', params)
      .then(result => {
        // we should not execute this code
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toEqual('DELETE_MANY is not allowed without a list of ids')
      })
  })

  test('DELETE_MANY with no ids', async () => {
    const client: Application = feathers()
    const service = new MockService()

    jest.spyOn(service, 'remove')
    client.use('/messages', service)

    const params = {}
    const response = await mapRequest(client, options, DELETE_MANY, 'messages', params)
      .then(result => {
        // we should not execute this code
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toEqual('DELETE_MANY is not allowed without a list of ids')
      })
    expect(service.remove).toHaveBeenCalledTimes(0)
  })

  test('UKNOWN_ACTION', async () => {
    const client: Application = feathers()
    const service = new MockService()

    client.use('/messages', service)
    await mapRequest(client, options, 'UKNOWN_ACTION', 'messages', {})
      .then(result => {
        // we should not execute this code
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toEqual('UKNOWN_ACTION mapRequest is unknown')
      })
  })

  test('UKNOWN_ACTION with debug on', async () => {
    const client: Application = feathers()
    const service = new MockService()
    const optionsWithDebug: Options = {
      debug: true
    }
    client.use('/messages', service)
    await mapRequest(client, optionsWithDebug, 'UKNOWN_ACTION', 'messages', {})
      .then(result => {
        // we should not execute this code
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toEqual('UKNOWN_ACTION mapRequest is unknown')
      })
  })
})
