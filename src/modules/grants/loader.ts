export type GrantsModule = typeof import('./index.ts')

let _p: Promise<GrantsModule> | null = null
export const loadGrantsModule = () => {
  _p ??= import('./index.ts')
  return _p
}
