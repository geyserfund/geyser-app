export type DiscoveryModule = typeof import('./index.ts')

let _p: Promise<DiscoveryModule> | null = null
export const loadDiscoveryModule = () => {
  _p ??= import(/* webpackChunkName: "discovery" */ './index.ts')
  return _p
}
