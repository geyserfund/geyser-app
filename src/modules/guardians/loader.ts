export type GuardiansModule = typeof import('./index.ts')

let _p: Promise<GuardiansModule> | null = null
export const loadGuardiansModule = () => {
  _p ??= import(/* webpackChunkName: "guardians" */ './index.ts')
  return _p
}
