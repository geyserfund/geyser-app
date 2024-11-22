import { useAtomValue } from 'jotai'

import { projectHeroAtom, ProjectHeroAtomType } from '../../pages1/projectView/state/heroAtom'

export const useProjectHeroWithProjectName = (projectName?: string) => {
  const projectHeros = useAtomValue(projectHeroAtom)

  return getHeroIdFromProjectHeroes(projectHeros, projectName)
}

export const getHeroIdFromProjectHeroes = (heroes: ProjectHeroAtomType[], projectName?: string) => {
  if (!projectName) return undefined

  const currentProjectHero = heroes.find((r) => r.projectName === projectName)

  if (!currentProjectHero) return undefined

  return currentProjectHero.heroId
}
