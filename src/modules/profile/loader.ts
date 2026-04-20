export type ProfileModule = typeof import('./index.ts')

let _p: Promise<ProfileModule> | null = null
export const loadProfileModule = () => {
  _p ??= import('./index.ts')
  return _p
}
