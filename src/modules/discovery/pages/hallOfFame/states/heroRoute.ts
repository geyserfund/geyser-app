import { atom } from 'jotai'

import { routeMatchForAtom } from '@/config/routes/routeGroups'
import { getPath } from '@/shared/constants'

import { HeroType } from '../components/TopHeroes'

export const isAmbassadorHeroRouteAtom = atom(routeMatchForAtom([getPath('hallOfFameHeroesAmbassador')]))
export const isCreatorHeroRouteAtom = atom(routeMatchForAtom([getPath('hallOfFameHeroesCreator')]))
export const isContributorHeroRouteAtom = atom(routeMatchForAtom([getPath('hallOfFameHeroesContributor')]))

export const heroTypeFromRoute = atom((get) => {
  const isAmbassadorHeroRoute = get(isAmbassadorHeroRouteAtom)
  const isCreatorHeroRoute = get(isCreatorHeroRouteAtom)
  const isContributorHeroRoute = get(isContributorHeroRouteAtom)

  if (isAmbassadorHeroRoute) {
    return HeroType.Ambassadors
  }

  if (isCreatorHeroRoute) {
    return HeroType.Creators
  }

  if (isContributorHeroRoute) {
    return HeroType.Contributors
  }
})