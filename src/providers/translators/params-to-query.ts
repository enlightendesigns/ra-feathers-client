import diff from 'object-diff'
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

export default function paramsToQuery(type: string, params: any) {
  let query: any = {}

  switch (type) {
    case GET_MANY:
      if ('ids' in params) {
        query['id'] = {
          $in: params.ids
        }
        query['$limit'] = params.ids.length
      }
      query = {
        query: {
          ...query
        }
      }
      break

    case GET_MANY_REFERENCE:
    case GET_LIST:
      if ('target' in params && 'id' in params) {
        query[params.target] = params.id
      }
      if ('pagination' in params) {
        const { page, perPage } = params.pagination
        query['$limit'] = perPage
        query['$skip'] = perPage * (page - 1)
      }

      if ('sort' in params) {
        const { field, order } = params.sort
        const sortVal = order === 'DESC' ? -1 : 1
        query['$sort'] = {}
        query['$sort'][field] = sortVal
      }

      if ('filter' in params) {
        const { filter } = params
        query = {
          query: {
            ...query,
            ...filter
          }
        }
      }

      /*
      // SQL database only
      for (let field in filter) {
        query[`${field}[$like]`] = `%${filter[field]}%`;
      }
      */

      break

    case GET_ONE:
      query = params.id
      break

    case CREATE:
      query = params.data
      break

    case UPDATE:
      let data = params.data
      let previousData = params.previousData
      query = {
        id: params.id,
        data: diff(previousData, data)
      }
      break

    case UPDATE_MANY:
      throw new Error('UPDATE_MANY paramToQuery not implemented')

    case DELETE:
      query = params.id
      break

    case DELETE_MANY:
      query['id'] = {
        $in: params.ids
      }
      query = {
        query: query
      }
      break
  }

  return query
}
