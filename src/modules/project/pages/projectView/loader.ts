export type ProjectViewPages = typeof import('./index.ts')

let _p: Promise<ProjectViewPages> | null = null
export const loadProjectViewPages = () => {
  _p ??= import(/* webpackChunkName: "projectViewPages" */ './index.ts')
  return _p
}
