export type HeroesPages = typeof import('./index.ts')

let _p: Promise<HeroesPages> | null = null
export const loadHeroesPages = () => {
  _p ??= import(/* webpackChunkName: "heroesPages" */ './index.ts')
  return _p
}
