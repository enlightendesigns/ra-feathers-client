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

  console.log('dataProvider params', type, params)

  // translate the params to feathers query language
  const query = paramsToQuery(type, params)

  console.log('dataProvider query', type, query)

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
    case DELETE_MANY:
      // very important validation here
      // passing an empty list of ids will
      // perform a truncate table instead of deleting
      // a subset of items
      if (
        'query' in query &&
        'id' in query.query &&
        '$in' in query.query.id &&
        Array.isArray(query.query.id['$in']) &&
        query.query.id['$in'].length > 0
      ) {
        response = service.remove(null, query)
      } else {
        throw new Error(`${type} is not allowed without a list of ids`)
      }
      break
    default:
      throw new Error(`${type} mapRequest is unknown`)
  }

  return response
}
