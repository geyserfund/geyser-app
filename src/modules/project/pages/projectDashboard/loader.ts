export type ProjectDashboardPages = typeof import('./index.ts')

let _p: Promise<ProjectDashboardPages> | null = null
export const loadProjectDashboardPages = () => {
  _p ??= import(/* webpackChunkName: "projectDashboardPages" */ './index.ts')
  return _p
}
