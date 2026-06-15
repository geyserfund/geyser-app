export type ImpactFundsModule = typeof import('./index.ts')

let _p: Promise<ImpactFundsModule> | null = null
export const loadImpactFundsModule = () => {
  _p ??= import('./index.ts')
  return _p
}

export const loadImpactFundsMainPage = () => import('./pages/ImpactFundsMainPage.tsx')

export const loadImpactFundsWorkshopsPage = () => import('./pages/ImpactFundsWorkshopsPage.tsx')

export const loadImpactFundDetailPage = () => import('./pages/ImpactFundDetailPage.tsx')

export const loadImpactFundDashboardPage = () => import('./pages/ImpactFundDashboardPage.tsx')

export const loadLegacyGrantRedirectPage = () => import('./pages/LegacyGrantRedirectPage.tsx')
