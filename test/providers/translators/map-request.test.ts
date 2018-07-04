import feathers, { Application, ServiceMethods, NullableId } from '@feathersjs/feathers'
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

class MesagesService implements ServiceMethods<any> {
  async find(params: any) {
    return []
  }

  async get(id: NullableId) {
    return null
  }

  async create(data: any, params: any) {
    return null
  }

  async update(id: NullableId, data: any, params: any) {
    return null
  }

  async patch(id: NullableId, data: any, params: any) {
    return null
  }

  async remove(id: NullableId, params: any) {
    return null
  }
}

describe('map request', () => {
  test('GET_LIST', async () => {
    const client: Application = feathers()
    const service = new MesagesService()

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

    const response = await mapRequest(client, {}, GET_LIST, 'messages', params)
    const query = paramsToQuery(GET_LIST, params)

    expect(service.find).toHaveBeenCalledWith(query)
  })

  test('GET_ONE', async () => {
    const client: Application = feathers()
    const service = new MesagesService()

    jest.spyOn(service, 'get')
    client.use('/messages', service)

    const params = {
      id: 3
    }
    const response = await mapRequest(client, {}, GET_ONE, 'messages', params)
    const query = paramsToQuery(GET_ONE, params)

    expect(service.get).toHaveBeenCalledWith(query, {})
  })

  test('GET_MANY', async () => {
    const client: Application = feathers()
    const service = new MesagesService()

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

    const response = await mapRequest(client, {}, GET_MANY, 'messages', params)
    const query = paramsToQuery(GET_MANY, params)

    expect(service.find).toHaveBeenCalledWith(query)
  })

  test('GET_MANY_REFERENCE', async () => {
    const client: Application = feathers()
    const service = new MesagesService()

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

    const response = await mapRequest(client, {}, GET_MANY_REFERENCE, 'messages', params)
    const query = paramsToQuery(GET_MANY_REFERENCE, params)

    expect(service.find).toHaveBeenCalledWith(query)
  })

  test('CREATE', async () => {
    const client: Application = feathers()
    const service = new MesagesService()

    jest.spyOn(service, 'create')
    client.use('/messages', service)

    const params = {
      data: {
        text: 'hello'
      }
    }

    const response = await mapRequest(client, {}, CREATE, 'messages', params)
    const query = paramsToQuery(CREATE, params)

    expect(service.create).toHaveBeenCalledWith(query, {})
  })

  test('UPDATE', async () => {
    const client: Application = feathers()
    const service = new MesagesService()

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

    const response = await mapRequest(client, {}, UPDATE, 'messages', params)
    const query = paramsToQuery(UPDATE, params)

    expect(service.update).toHaveBeenCalledWith(query.id, query.data, {})
  })

  test('UPDATE_MANY', async () => {
    const client: Application = feathers()
    const service = new MesagesService()

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
    const service = new MesagesService()

    jest.spyOn(service, 'remove')
    client.use('/messages', service)

    const params = {
      id: 3
    }
    const response = await mapRequest(client, {}, DELETE, 'messages', params)
    const query = paramsToQuery(DELETE, params)

    expect(service.remove).toHaveBeenCalledWith(query, {})
  })

  test('DELETE_MANY', async () => {
    const client: Application = feathers()
    const service = new MesagesService()

    jest.spyOn(service, 'remove')
    client.use('/messages', service)

    const params = {
      ids: [123, 654, 789]
    }
    const response = await mapRequest(client, {}, DELETE_MANY, 'messages', params)
    const query = paramsToQuery(DELETE_MANY, params)

    expect(service.remove).toHaveBeenCalledWith(null, query)
  })

  test('DELETE_MANY with empty ids', async () => {
    const client: Application = feathers()
    const service = new MesagesService()

    jest.spyOn(service, 'remove')
    client.use('/messages', service)

    const params = {
      ids: []
    }
    const response = await mapRequest(client, {}, DELETE_MANY, 'messages', params)
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
    const service = new MesagesService()

    jest.spyOn(service, 'remove')
    client.use('/messages', service)

    const params = {}
    const response = await mapRequest(client, {}, DELETE_MANY, 'messages', params)
      .then(result => {
        // we should not execute this code
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toEqual('DELETE_MANY is not allowed without a list of ids')
      })
  })

  test('UKNOWN_ACTION', async () => {
    const client: Application = feathers()
    const service = new MesagesService()

    client.use('/messages', service)
    await mapRequest(client, {}, 'UKNOWN_ACTION', 'messages', {})
      .then(result => {
        // we should not execute this code
        expect(true).toBeFalsy()
      })
      .catch(error => {
        expect(error.message).toEqual('UKNOWN_ACTION mapRequest is unknown')
      })
  })
})
