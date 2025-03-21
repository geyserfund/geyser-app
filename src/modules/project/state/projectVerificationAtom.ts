import { atom } from 'jotai'

import { projectAtom } from './projectAtom.ts'

const FUNDING_LIMIT_REACHED_AMOUNT_LEVEL_1 = 1000000 // 10K USD in cents
const FUNDING_LIMIT_REACHED_AMOUNT_LEVEL_2 = 10000000 // 100K USD in cents

const FUNDING_LIMIT_ALMOST_REACHED_AMOUNT_LEVEL_1 = 800000 // 8K USD in cents
const FUNDING_LIMIT_ALMOST_REACHED_AMOUNT_LEVEL_2 = 8000000 // 80K USD in cents

export const hasProjectFundingLimitAlmostReachedAtom = atom((get) => {
  const project = get(projectAtom)

  const owner = project.owners?.[0]

  if (!owner) return false

  if (
    project.balanceUsdCent >= FUNDING_LIMIT_ALMOST_REACHED_AMOUNT_LEVEL_1 &&
    !owner?.user?.complianceDetails?.verifiedDetails?.phoneNumber?.verified
  ) {
    return true
  }

  if (
    project.balanceUsdCent >= FUNDING_LIMIT_ALMOST_REACHED_AMOUNT_LEVEL_2 &&
    !owner?.user?.complianceDetails?.verifiedDetails?.identity?.verified
  ) {
    return true
  }

  return false
})

export const hasProjectFundingLimitReachedAtom = atom((get) => {
  const project = get(projectAtom)

  const owner = project.owners?.[0]

  if (!owner) return false

  if (
    project.balanceUsdCent >= FUNDING_LIMIT_REACHED_AMOUNT_LEVEL_1 &&
    !owner?.user?.complianceDetails?.verifiedDetails?.phoneNumber?.verified
  ) {
    return true
  }

  if (
    project.balanceUsdCent >= FUNDING_LIMIT_REACHED_AMOUNT_LEVEL_2 &&
    !owner?.user?.complianceDetails?.verifiedDetails?.identity?.verified
  ) {
    return true
  }

  return false
})
