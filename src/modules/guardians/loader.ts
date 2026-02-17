export type GuardiansModule = typeof import('./index.ts')

let _p: Promise<GuardiansModule> | null = null
export const loadGuardiansModule = () => {
  _p ??= import('./index.ts')
  return _p
}
