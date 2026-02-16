export type ImpactFundsModule = typeof import('./index.ts')

let _p: Promise<ImpactFundsModule> | null = null
export const loadImpactFundsModule = () => {
  _p ??= import(/* webpackChunkName: "impact-funds" */ './index.ts')
  return _p
}
