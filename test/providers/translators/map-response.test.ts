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
import mapResponse from '../../../src/providers/translators/map-response'
import { Options } from '../../../src/providers/options'

const options: Options = {
  debug: false
}

describe('map response', () => {
  test('GET_LIST', () => {
    const response = {
      data: [
        { id: 1, text: 'hello 1' },
        { id: 2, text: 'hello 2' },
        { id: 3, text: 'hello 3' },
        { id: 4, text: 'hello 4' }
      ]
    }
    const expected = {
      data: [
        { id: 1, text: 'hello 1' },
        { id: 2, text: 'hello 2' },
        { id: 3, text: 'hello 3' },
        { id: 4, text: 'hello 4' }
      ]
    }
    const actual = mapResponse(options, response, GET_LIST, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('GET_MANY', () => {
    const response = {
      data: [
        { id: 1, text: 'hello 1' },
        { id: 2, text: 'hello 2' },
        { id: 3, text: 'hello 3' },
        { id: 4, text: 'hello 4' }
      ]
    }
    const expected = {
      data: [
        { id: 1, text: 'hello 1' },
        { id: 2, text: 'hello 2' },
        { id: 3, text: 'hello 3' },
        { id: 4, text: 'hello 4' }
      ]
    }
    const actual = mapResponse(options, response, GET_MANY, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('GET_MANY_REFERENCE', () => {
    const response = {
      data: [
        { id: 1, text: 'hello 1' },
        { id: 2, text: 'hello 2' },
        { id: 3, text: 'hello 3' },
        { id: 4, text: 'hello 4' }
      ]
    }
    const expected = {
      data: [
        { id: 1, text: 'hello 1' },
        { id: 2, text: 'hello 2' },
        { id: 3, text: 'hello 3' },
        { id: 4, text: 'hello 4' }
      ]
    }
    const actual = mapResponse(options, response, GET_MANY_REFERENCE, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('GET_ONE', () => {
    const response = { id: 1, text: 'hello 1' }
    const expected = {
      data: { id: 1, text: 'hello 1' }
    }
    const actual = mapResponse(options, response, GET_ONE, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('CREATE', () => {
    const params = { data: { text: 'hello 1' } }
    const response = { id: 1 }
    const expected = {
      data: { id: 1, text: 'hello 1' }
    }
    const actual = mapResponse(options, response, CREATE, 'messages', params)

    expect(actual).toEqual(expected)
  })

  test('UPDATE', () => {
    const response = { id: 1, text: 'hello 1' }
    const expected = {
      data: { id: 1, text: 'hello 1' }
    }
    const actual = mapResponse(options, response, UPDATE, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('DELETE', () => {
    const response = { id: 1, text: 'hello 1' }
    const expected = {
      data: { id: 1, text: 'hello 1' }
    }
    const actual = mapResponse(options, response, DELETE, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('UPDATE_MANY', () => {
    const response = 'test'
    const expected = 'test'
    const actual = mapResponse(options, response, UPDATE_MANY, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('DELETE_MANY', () => {
    const params = {
      ids: [123, 456, 987]
    }
    const response = [
      { id: 123, text: 'hello 123' },
      { id: 456, text: 'hello 456' },
      { id: 987, text: 'hello 987' }
    ]
    const expected = {
      data: [123, 456, 987]
    }
    const actual = mapResponse(options, response, DELETE_MANY, 'messages', params)

    expect(actual).toEqual(expected)
  })

  test('UKNOWN', () => {
    const response = 'test'
    const expected = 'test'
    const actual = mapResponse(options, response, 'UKNOWN', 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('UKNOWN with debug on', () => {
    const response = 'test'
    const expected = 'test'
    const actual = mapResponse(options, response, 'UKNOWN', 'messages', {})

    expect(actual).toEqual(expected)
  })
})
