// react admin https://marmelab.com/react-admin/DataProviders.html
// feathers https://github.com/feathersjs/docs/blob/master/api/databases/querying.md

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

import paramsToQuery from '../../../src/providers/translators/params-to-query'

describe('translate RA params to Feathers query', () => {
  test('GET_LIST', () => {
    const params = {
      pagination: {
        page: 1,
        perPage: 10
      },
      sort: {
        field: 'id',
        order: 'ASC'
      },
      filter: {
        text: 'filter string'
      }
    }
    const result = paramsToQuery(GET_LIST, params)
    const expected = {
      query: {
        $limit: 10,
        $skip: 0,
        $sort: {
          id: 1
        },
        text: 'filter string'
      }
    }

    expect(result).toEqual(expected)
  })

  test('GET_LIST with pagination', () => {
    let params = {
      pagination: {
        page: 1,
        perPage: 10
      },
      filter: {
        text: 'filter string'
      }
    }
    let result = paramsToQuery(GET_LIST, params)
    let expected = {
      query: {
        $limit: 10,
        $skip: 0,
        text: 'filter string'
      }
    }

    expect(result).toEqual(expected)

    params = {
      pagination: {
        page: 15,
        perPage: 100
      },
      filter: {
        text: 'filter string'
      }
    }

    result = paramsToQuery(GET_LIST, params)
    expected = {
      query: {
        $limit: 100,
        $skip: 1400,
        text: 'filter string'
      }
    }

    expect(result).toEqual(expected)
  })

  test('GET_ONE with integer identifier', () => {
    const params = {
      id: 13
    }
    const expected = 13
    const result = paramsToQuery(GET_ONE, params)

    expect(result).toEqual(expected)
  })

  test('GET_ONE with string identifier', () => {
    const params = {
      id: 'abc'
    }
    const expected = 'abc'
    const result = paramsToQuery(GET_ONE, params)

    expect(result).toEqual(expected)
  })

  test('GET_MANY', () => {
    const params = {
      ids: [123, 321, 654]
    }
    const expected = {
      id: {
        $in: [123, 321, 654]
      },
      $limit: 3
    }

    const result = paramsToQuery(GET_MANY, params)

    expect(result).toEqual(expected)
  })

  test('GET_MANY_REFERENCE', () => {
    const params = {
      target: 'author_id',
      id: 658,
      sort: {
        field: 'created',
        order: 'DESC'
      }
    }
    const expected = {
      author_id: 658,
      $sort: {
        created: -1
      }
    }

    const result = paramsToQuery(GET_MANY_REFERENCE, params)

    expect(result).toEqual(expected)
  })

  test('CREATE', () => {
    const params = {
      data: {
        text: 'hello',
        name: 'Batman'
      }
    }
    const expected = {
      text: 'hello',
      name: 'Batman'
    }
    const result = paramsToQuery(CREATE, params)

    expect(result).toEqual(expected)
  })

  test('UPDATE with previous data', () => {
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
    const expected = {
      id: 123,
      data: {
        text: 'hello my friend'
      }
    }
    const result = paramsToQuery(UPDATE, params)

    expect(result).toEqual(expected)
  })

  test('DELETE with integer identifier', () => {
    const params = {
      id: 13
    }
    const expected = 13
    const result = paramsToQuery(DELETE, params)

    expect(result).toEqual(expected)
  })

  test('DELETE with string identifier', () => {
    const params = {
      id: 'abc'
    }
    const expected = 'abc'
    const result = paramsToQuery(DELETE, params)

    expect(result).toEqual(expected)
  })

  test(DELETE_MANY, () => {
    const params = {
      ids: [123, 456, 987]
    }
    const expected = {
      query: {
        id: {
          $in: [123, 456, 987]
        }
      }
    }
    const result = paramsToQuery(DELETE_MANY, params)

    expect(result).toEqual(expected)
  })
})
