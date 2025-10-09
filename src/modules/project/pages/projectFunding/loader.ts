export type ProjectFundingPages = typeof import('./index.ts')

let _p: Promise<ProjectFundingPages> | null = null
export const loadProjectFundingPages = () => {
  _p ??= import(/* webpackChunkName: "projectFundingPages" */ './index.ts')
  return _p
}
