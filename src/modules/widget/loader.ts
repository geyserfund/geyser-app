export type WidgetModule = typeof import('./index.ts')

let _p: Promise<WidgetModule> | null = null
export const loadWidgetModule = () => {
  _p ??= import(/* webpackChunkName: "widget" */ './index.ts')
  return _p
}
