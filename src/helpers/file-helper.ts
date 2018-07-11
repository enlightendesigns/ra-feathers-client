import FileContainer from '../providers/file-container'
import ParamsWithFiles from '../providers/params-with-files'

export function paramsHasFile(params: any): boolean {
  let hasFile = false
  const data = { ...params.data }

  for (let key in data) {
    let slice = data[key]
    if (paramsHasSingleFile(slice) || paramsHasArrayOfFiles(slice)) {
      hasFile = true
    }
  }
  return hasFile
}

export function paramsHasArrayOfFiles(slice: any): boolean {
  let hasArrayOfFiles = false
  if (slice instanceof Object) {
    if (Array.isArray(slice)) {
      for (let i = 0; i < slice.length; i++) {
        if (slice[i]['rawFile'] !== undefined) {
          hasArrayOfFiles = true
        }
      }
    }
  }

  return hasArrayOfFiles
}

export function paramsHasSingleFile(slice: any): boolean {
  let hasSingleFile = false

  if (slice['rawFile'] !== undefined) {
    hasSingleFile = true
  }

  return hasSingleFile
}

/**
 * helper function that return the params keys
 * matching with a file
 *
 * @param params
 */
export function getFilesFromParams(params: any): ParamsWithFiles {
  const files: FileContainer[] = []
  const data = { ...params.data }

  for (let key in data) {
    let slice = data[key]

    if (paramsHasArrayOfFiles(slice)) {
      for (let i = 0; i < slice.length; i++) {
        const currentFile = {
          source: `${key}[]`,
          file: slice[i].rawFile,
          title: slice[i].title
        }
        files.push(currentFile)
      }
      delete data[key]
    } else if (paramsHasSingleFile(slice)) {
      const currentFile = {
        source: key,
        file: slice.rawFile,
        title: slice.title
      }
      files.push(currentFile)
      delete data[key]
    }
  }

  return {
    files,
    data
  }
}

export function createFormData(paramsAndFiles: ParamsWithFiles): FormData {
  const files: FileContainer[] = paramsAndFiles.files
  const data = paramsAndFiles.data
  const formData = new FormData()

  for (let i = 0; i < files.length; i++) {
    formData.append(files[i].source, files[i].file)
  }
  for (let name in data) {
    formData.append(name, data[name])
  }

  return formData
}
