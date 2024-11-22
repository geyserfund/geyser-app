import { atom } from 'jotai'

import { UserForProfilePageFragment, UserHeroStats } from '@/types'

type HeroCardAtomType = {
  isOpen: boolean
  user: UserForProfilePageFragment
  stats: UserHeroStats
}

export const heroCardAtom = atom<HeroCardAtomType | null>(null)
