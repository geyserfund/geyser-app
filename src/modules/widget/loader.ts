export type WidgetModule = typeof import('./index.ts')

let _p: Promise<WidgetModule> | null = null
export const loadWidgetModule = () => {
  _p ??= import('./index.ts')
  return _p
}
