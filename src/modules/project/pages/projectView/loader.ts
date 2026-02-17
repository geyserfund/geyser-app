export type ProjectViewPages = typeof import('./index.ts')

let _p: Promise<ProjectViewPages> | null = null
export const loadProjectViewPages = () => {
  _p ??= import('./index.ts')
  return _p
}
