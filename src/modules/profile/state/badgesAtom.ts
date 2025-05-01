import { atom } from 'jotai'

import type { GuardianBadgeJewel } from '@/shared/constants/assets/guardianAssets.tsx'
import { getBadgeJewelImage } from '@/shared/constants/assets/guardianAssets.tsx'
import { UserBadge } from '@/types'

export const userBadgesAtom = atom<UserBadge[]>([])

export const guardianJewelsToRenderAtom = atom((get) => {
  const userBadges = get(userBadgesAtom)

  return userBadges.map((badge) => getBadgeJewelImage(badge.badge.uniqueName)).filter(Boolean) as GuardianBadgeJewel[]
})
