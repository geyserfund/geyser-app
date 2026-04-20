export type DiscoveryModule = typeof import('./index.ts')

let _p: Promise<DiscoveryModule> | null = null
export const loadDiscoveryModule = () => {
  _p ??= import('./index.ts')
  return _p
}
