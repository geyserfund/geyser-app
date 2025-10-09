export type ProjectCreationPages = typeof import('./index.ts')

let _p: Promise<ProjectCreationPages> | null = null
export const loadProjectCreationPages = () => {
  _p ??= import(/* webpackChunkName: "projectCreationPages" */ './index.ts')
  return _p
}
