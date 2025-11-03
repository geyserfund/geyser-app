export type ProjectModule = typeof import('./index.ts')

let _p: Promise<ProjectModule> | null = null
export const loadProjectModule = () => {
  _p ??= import(/* webpackChunkName: "project" */ './index.ts')
  return _p
}
