export type LandingPages = typeof import('./index.ts')

let _p: Promise<LandingPages> | null = null
export const loadLandingPages = () => {
  _p ??= import('./index.ts')
  return _p
}
