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
import { mapResponse } from '../../../src/providers/translators/map-response'

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
    const actual = mapResponse({}, response, GET_LIST, 'messages', {})

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
    const actual = mapResponse({}, response, GET_MANY, 'messages', {})

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
    const actual = mapResponse({}, response, GET_MANY_REFERENCE, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('GET_ONE', () => {
    const response = { id: 1, text: 'hello 1' }
    const expected = {
      data: { id: 1, text: 'hello 1' }
    }
    const actual = mapResponse({}, response, GET_ONE, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('CREATE', () => {
    const params = { data: { text: 'hello 1' } }
    const response = { id: 1 }
    const expected = {
      data: { id: 1, text: 'hello 1' }
    }
    const actual = mapResponse({}, response, CREATE, 'messages', params)

    expect(actual).toEqual(expected)
  })

  test('UPDATE', () => {
    const response = { id: 1, text: 'hello 1' }
    const expected = {
      data: { id: 1, text: 'hello 1' }
    }
    const actual = mapResponse({}, response, UPDATE, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('DELETE', () => {
    const response = { id: 1, text: 'hello 1' }
    const expected = {
      data: { id: 1, text: 'hello 1' }
    }
    const actual = mapResponse({}, response, DELETE, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('UPDATE_MANY', () => {
    const response = 'test'
    const expected = 'test'
    const actual = mapResponse({}, response, UPDATE_MANY, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('DELETE_MANY', () => {
    const response = 'test'
    const expected = 'test'
    const actual = mapResponse({}, response, DELETE_MANY, 'messages', {})

    expect(actual).toEqual(expected)
  })

  test('UKNOWN', () => {
    const response = 'test'
    const expected = 'test'
    const actual = mapResponse({}, response, 'UKNOWN', 'messages', {})

    expect(actual).toEqual(expected)
  })
})
