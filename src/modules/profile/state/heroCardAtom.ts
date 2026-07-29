import { atom } from 'jotai'

import { UserForProfilePageFragment, UserHeroImpact, UserHeroStats, UserHeroTrust } from '@/types'

type HeroCardAtomType = {
  isOpen: boolean
  user: UserForProfilePageFragment
  stats?: UserHeroStats
  impact?: UserHeroImpact
  trust?: UserHeroTrust
}

export const heroCardAtom = atom<HeroCardAtomType | null>(null)
