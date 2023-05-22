export function getFileNameAndPath(filePath: string) {
  const name = filePath.match(/[^/\\]+$/)?.[0] || ''
  const path = filePath.substring(0, filePath.length - name.length)
  return { name, path }
}

export function getFileName(filePath: string) {
  return getFileNameAndPath(filePath).name
}

export function getFilePath(filePath: string) {
  return getFileNameAndPath(filePath).path
}
