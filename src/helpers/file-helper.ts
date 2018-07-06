import FileContainer from '../providers/file-container'
import ParamsWithFiles from '../providers/params-with-files'

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
    if (data[key] instanceof Object) {
      if (Array.isArray(data[key])) {
        // the params.data[key] can be an array of files
        for (let i = 0; i < data[key].length; i++) {
          if ('rawFile' in data[key][i]) {
            const currentFile = {
              source: `${key}[]`,
              file: data[key][i].rawFile,
              title: data[key][i].title
            }

            files.push(currentFile)
          }
        }
        delete data[key]
      } else if ('rawFile' in data[key]) {
        // or can be the file directly
        const currentFile = {
          source: key,
          file: data[key].rawFile,
          title: data[key].title
        }

        files.push(currentFile)

        delete data[key]
      }
    }
  }

  return {
    files,
    data
  }
}
