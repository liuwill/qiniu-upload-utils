import fs from 'fs'
import path from 'path'

export function buildFileList(basePath, fileList) {
  const rootPath = path.resolve(basePath)

  return fileList.map(item => ({
    path: item,
    name: item.substring(rootPath.length + 1),
  }))
}

export function listFiles(basePath) {
  const rootPath = path.resolve(basePath)

  try {
    fs.accessSync(rootPath, fs.constants.R_OK)
  } catch (err) {
    return []
  }

  const pathList = []
  const fileList = []
  const rootStat = fs.statSync(basePath)
  if (rootStat.isFile()) {
    return [basePath]
  }

  pathList.push(basePath)
  while (pathList.length) {
    const directoryPath = pathList.shift()
    const innerList = fs.readdirSync(directoryPath)
    for (let filename of innerList) {
      const filePath = path.join(directoryPath, filename)
      const fileStat = fs.statSync(filePath)
      if (fileStat.isFile()) {
        fileList.push(filePath)
      } else {
        pathList.push(filePath)
      }
    }
  }

  return fileList
}
