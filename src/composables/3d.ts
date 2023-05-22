import type { Scene } from 'babylonjs'
import { SceneLoader } from 'babylonjs'
import { getFileName, getFilePath } from '@util/index'

export async function importMesh(url: string, scene: Scene) {
  const mesh = await SceneLoader.ImportMeshAsync(
    '',
    getFilePath(url),
    getFileName(url),
    scene,
  )
  return mesh
}

export async function importMeshes(urls: string[], scene: Scene) {
  const pool = urls.map(url => importMesh(url, scene))
  return Promise.all(pool)
}
