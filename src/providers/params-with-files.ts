import FileContainer from './file-container'

interface ParamsWithFiles {
  files: FileContainer[]
  data: {
    [key: string]: any
  }
}

export default ParamsWithFiles
