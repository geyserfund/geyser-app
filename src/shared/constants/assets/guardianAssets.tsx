import {
  KingJewelUrl,
  KingNostrCardUrl,
  KnightJewelUrl,
  KnightNostrCardUrl,
  LegendJewelUrl,
  LegendNostrCardUrl,
  WarriorJewelUrl,
  WarriorNostrCardUrl,
} from '@/shared/constants'
import { GuardianType } from '@/types/index.ts'

export const guardianNostrCards = {
  [GuardianType.Warrior]: WarriorNostrCardUrl,
  [GuardianType.Knight]: KnightNostrCardUrl,
  [GuardianType.King]: KingNostrCardUrl,
  [GuardianType.Legend]: LegendNostrCardUrl,
}

export const guardianJewels = {
  [GuardianType.Warrior]: WarriorJewelUrl,
  [GuardianType.Knight]: KnightJewelUrl,
  [GuardianType.King]: KingJewelUrl,
  [GuardianType.Legend]: LegendJewelUrl,
}

export const guardianText = {
  [GuardianType.Warrior]: 'Warrior',
  [GuardianType.Knight]: 'Knight',
  [GuardianType.King]: 'King',
  [GuardianType.Legend]: 'Legend',
}

export const guardianBadgeUniqueName = {
  [GuardianType.Warrior]: 'Geyser-Guardian:-Warrior',
  [GuardianType.Knight]: 'Geyser-Guardian:-Knight',
  [GuardianType.King]: 'Geyser-Guardian:-King',
  [GuardianType.Legend]: 'Geyser-Guardian:-Legend',
}

export type GuardianBadgeJewel = {
  guardianType: GuardianType
  guardianText: string
  jewel: string
  selected?: boolean
}

export const getBadgeJewelImage = (badgeUniqueName: string): GuardianBadgeJewel | undefined => {
  const guardianType = Object.entries(guardianBadgeUniqueName).find(
    ([_, uniqueName]) => uniqueName === badgeUniqueName,
  )?.[0] as GuardianType | undefined

  return guardianType
    ? { guardianType, guardianText: guardianText[guardianType], jewel: guardianJewels[guardianType] }
    : undefined
}
