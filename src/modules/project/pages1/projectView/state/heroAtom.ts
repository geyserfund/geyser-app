import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { DateTime } from 'luxon'

export type ProjectHeroAtomType = {
  dateTime: number
  projectName: string
  heroId: string
}

/** Hero Ids for the project */
export const projectHeroAtom = atomWithStorage<ProjectHeroAtomType[]>('heroId', [])

/** Add hero to the project */
export const addProjectHeroAtom = atom(null, (get, set, hero: Omit<ProjectHeroAtomType, 'dateTime'>) => {
  const allProjectHeroes = get(projectHeroAtom)

  const isExist = allProjectHeroes.some((r) => r.projectName === hero.projectName)
  const dateTime = DateTime.now().toMillis()

  const currentProjectHero = { ...hero, dateTime }

  let newProjectHero = [] as ProjectHeroAtomType[]

  if (isExist) {
    newProjectHero = allProjectHeroes.map((r) => {
      if (r.projectName === hero.projectName) {
        return currentProjectHero
      }

      return r
    })
  } else {
    newProjectHero = [...allProjectHeroes, currentProjectHero]
  }

  set(projectHeroAtom, newProjectHero)
})
