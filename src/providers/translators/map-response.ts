import {
  CREATE,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} from 'react-admin'
import Options from '../options'

export default function mapResponse(
  options: Options,
  response: any,
  type: string,
  resource: string,
  params: any
) {
  let mappedResponse = {}

  switch (type) {
    case GET_LIST:
      mappedResponse = response
      break
    case GET_ONE:
      mappedResponse = {
        data: response
      }
      break
    case GET_MANY:
      mappedResponse = response
      break
    case GET_MANY_REFERENCE:
      mappedResponse = response
      break
    case CREATE:
      mappedResponse = {
        data: {
          ...response,
          id: response.id
        }
      }
      break
    case UPDATE:
      mappedResponse = {
        data: response
      }
      break
    case DELETE:
      mappedResponse = {
        data: response
      }
      break
    case DELETE_MANY:
      const deletedIds = response.map((item: any) => item.id)
      mappedResponse = {
        data: deletedIds
      }
      break
    case UPDATE_MANY:
    default:
      mappedResponse = response
  }

  return mappedResponse
}
