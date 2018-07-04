import {
  CREATE,
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  UPDATE_MANY
} from 'react-admin'
import { Application, Service } from '@feathersjs/feathers'
import paramsToQuery from './params-to-query'
import { Options } from '../data-provider'

export async function mapRequest(
  client: Application,
  options: Options,
  type: string,
  resource: string,
  params: any
): Promise<any> {
  // retrieve the service matching with the resource
  const service: Service<any> = client.service(resource)
  // translate the params to feathers query language
  const query = paramsToQuery(type, params)

  let response: Promise<any>

  switch (type) {
    case GET_LIST:
      response = service.find(query)
      break
    case GET_ONE:
      response = service.get(query)
      break
    case GET_MANY:
      response = service.find(query)
      break
    case GET_MANY_REFERENCE:
      response = service.find(query)
      break
    case CREATE:
      response = service.create(query)
      break
    case UPDATE:
      response = service.update(query.id, query.data)
      break
    case DELETE:
      response = service.remove(query)
      break
    default:
      throw new Error(`${type} mapRequest is unknown`)
  }

  return response
}
