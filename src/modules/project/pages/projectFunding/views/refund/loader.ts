export type RefundPages = typeof import('./index.ts')

let _p: Promise<RefundPages> | null = null
export const loadRefundPages = () => {
  _p ??= import(/* webpackChunkName: "refundPages" */ './index.ts')
  return _p
}
