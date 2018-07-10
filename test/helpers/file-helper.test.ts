import { getFilesFromParams } from '../../src/helpers/file-helper'

describe('file helper', () => {
  test('it extract single file objects', () => {
    const file4 = new File([], '')

    const params = {
      data: {
        singleFile: { title: 'singleFile1', rawFile: file4 },
        id: 321,
        text: 'some text'
      }
    }

    const expected = {
      files: [{ source: 'singleFile', title: 'singleFile1', file: file4 }],
      data: {
        id: 321,
        text: 'some text'
      }
    }

    const actual = getFilesFromParams(params)

    expect(actual).toEqual(expected)
  })

  test('it extract single malformed file objects', () => {
    const file4 = new File([], '')

    const params = {
      data: {
        singleFile: { title: 'singleFile1' },
        id: 321,
        text: 'some text'
      }
    }

    const expected = {
      files: [],
      data: {
        singleFile: { title: 'singleFile1' },
        id: 321,
        text: 'some text'
      }
    }

    const actual = getFilesFromParams(params)

    expect(actual).toEqual(expected)
  })

  test('it extract multiple file objects', () => {
    const file1 = new File([], '')
    const file2 = new File([], '')
    const file3 = new File([], '')
    const file4 = new File([], '')

    const params = {
      data: {
        multipleFiles: [
          { title: 'multipleFile1', rawFile: file1 },
          { title: 'multipleFile2', rawFile: file2 },
          { title: 'multipleFile3', rawFile: file3 }
        ],
        id: 321,
        text: 'some text'
      }
    }

    const expected = {
      files: [
        { source: 'multipleFiles[]', title: 'multipleFile1', file: file1 },
        { source: 'multipleFiles[]', title: 'multipleFile2', file: file2 },
        { source: 'multipleFiles[]', title: 'multipleFile3', file: file3 }
      ],
      data: {
        id: 321,
        text: 'some text'
      }
    }

    const actual = getFilesFromParams(params)

    expect(actual).toEqual(expected)
  })

  test('it extract multiple malformed file objects', () => {
    const params = {
      data: {
        multipleFiles: [
          { title: 'multipleFile1' },
          { title: 'multipleFile2' },
          { title: 'multipleFile3' }
        ],
        id: 321,
        text: 'some text'
      }
    }

    const expected = {
      files: [],
      data: {
        multipleFiles: [
          { title: 'multipleFile1' },
          { title: 'multipleFile2' },
          { title: 'multipleFile3' }
        ],
        id: 321,
        text: 'some text'
      }
    }

    const actual = getFilesFromParams(params)

    expect(actual).toEqual(expected)
  })

  test('it extract files object and plain data from params', () => {
    const file1 = new File([], '')
    const file2 = new File([], '')
    const file3 = new File([], '')
    const file4 = new File([], '')

    const params = {
      data: {
        multipleFiles: [
          { title: 'multipleFile1', rawFile: file1 },
          { title: 'multipleFile2', rawFile: file2 },
          { title: 'multipleFile3', rawFile: file3 }
        ],
        singleFile: { title: 'singleFile1', rawFile: file4 },
        id: 321,
        text: 'some text'
      }
    }

    const expected = {
      files: [
        { source: 'multipleFiles[]', title: 'multipleFile1', file: file1 },
        { source: 'multipleFiles[]', title: 'multipleFile2', file: file2 },
        { source: 'multipleFiles[]', title: 'multipleFile3', file: file3 },
        { source: 'singleFile', title: 'singleFile1', file: file4 }
      ],
      data: {
        id: 321,
        text: 'some text'
      }
    }

    const actual = getFilesFromParams(params)

    expect(actual).toEqual(expected)
  })
})
