export type ProjectModule = typeof import('./index.ts')

let _p: Promise<ProjectModule> | null = null
export const loadProjectModule = () => {
  _p ??= import('./index.ts')
  return _p
}
