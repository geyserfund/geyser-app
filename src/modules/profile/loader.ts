export type ProfileModule = typeof import('./index.ts')

let _p: Promise<ProfileModule> | null = null
export const loadProfileModule = () => {
  _p ??= import(/* webpackChunkName: "profile" */ './index.ts')
  return _p
}
