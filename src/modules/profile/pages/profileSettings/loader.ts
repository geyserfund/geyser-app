export type ProfileSettingsModule = typeof import('./index.ts')

let _p: Promise<ProfileSettingsModule> | null = null
export const loadProfileSettingsModule = () => {
  _p ??= import(/* webpackChunkName: "profileSettings" */ './index.ts')
  return _p
}
