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
import Options from '../options'
import FileContainer from '../file-container'
import { getFilesFromParams } from '../../helpers/file-helper'
import ParamsWithFiles from '../params-with-files'
import submitFormData from '../../helpers/submit-form-data'

async function mapRequest(
  client: Application,
  options: Options,
  type: string,
  resource: string,
  params: any
): Promise<any> {
  const debug: boolean = options.debug

  // retrieve the service matching with the resource
  const service: Service<any> = client.service(resource)

  /* istanbul ignore next */
  if (debug) {
    console.log('dataProvider params in', type, params)
  }

  // translate the params to feathers query language
  const query = paramsToQuery(type, params)

  /* istanbul ignore next */
  if (debug) {
    console.log('dataProvider query out', type, query)
  }

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
      const paramsWithFiles: ParamsWithFiles = getFilesFromParams(params)
      const fileContainers: FileContainer[] = paramsWithFiles.files
      const data = paramsWithFiles.data
      // if we have files, we need to bypass the service
      // and create a custom form object
      if (fileContainers.length > 0) {
        const formData = new FormData()
        for (let i = 0; i < fileContainers.length; i++) {
          const fileContainer: FileContainer = fileContainers[i]
          const source = fileContainer.source
          const file = fileContainer.file

          formData.append(source, file)
        }
        for (let name in data) {
          formData.append(name, data[name])
        }
        response = submitFormData(client, resource, formData)
      } else {
        response = service.create(query)
      }
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
      response = Promise.reject(Error(`${type} mapRequest is unknown`))
  }

  if (debug) {
    console.log('dataProvider response out', type, response)
  }

  return response
}

export default mapRequest
