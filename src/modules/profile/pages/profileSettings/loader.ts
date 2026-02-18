export type ProfileSettingsModule = typeof import('./index.ts')

let _p: Promise<ProfileSettingsModule> | null = null
export const loadProfileSettingsModule = () => {
  _p ??= import('./index.ts')
  return _p
}
