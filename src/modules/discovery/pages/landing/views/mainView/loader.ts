export type LandingMainViewPages = typeof import('./index.ts')

let _p: Promise<LandingMainViewPages> | null = null
export const loadLandingMainViewPages = () => {
  _p ??= import(/* webpackChunkName: "landingMainViewPages" */ './index.ts')
  return _p
}
