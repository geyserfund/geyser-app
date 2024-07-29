import { atom, useSetAtom } from 'jotai'
import { useCallback } from 'react'

import { authUserAtom } from '../../../pages/auth/state'
import { ProjectHeaderSummaryFragment, ProjectPageBodyFragment, ProjectPageDetailsFragment } from '../../../types'
import { contributionAtomReset } from './contributionsAtom'
import { entriesAtomReset } from './entriesAtom'
import { goalsAtomReset } from './goalsAtom'
import { projectFormAtomReset } from './projectFormAtom'
import { rewardsAtomReset } from './rewardsAtom'
import { walletAtomReset } from './walletAtom'

export type ProjectState = ProjectPageBodyFragment & ProjectHeaderSummaryFragment & ProjectPageDetailsFragment

/** Project atom is the root project store */
export const projectAtom = atom<ProjectState>({} as ProjectState)

/** Partially Update the project atom with a project */
export const partialUpdateProjectAtom = atom(null, (get, set, updateProject: Partial<ProjectState>) => {
  const projectData = get(projectAtom)
  set(projectAtom, { ...projectData, ...updateProject })
})

/** Defaults to true when intialized, Set to false after project is loaded. */
export const projectLoadingAtom = atom(true)

/** True for creator visiting their own project */
export const isProjectOwnerAtom = atom((get) => {
  const project = get(projectAtom)
  const user = get(authUserAtom)

  if (project.id && user.id && project.owners && project.owners.length > 0 && project.owners[0]?.user.id === user.id) {
    return true
  }

  return false
})

/** Get the project owner for the project in context */
export const projectOwnerAtom = atom((get) => {
  const project = get(projectAtom)

  if (project.owners && project.owners.length > 0) {
    return project.owners[0]
  }

  return undefined
})
/** Initial load for project details, set to true after loaded */
export const initialProjectDetailsLoadAtom = atom(false)

/** Reset all real-atoms in this file to it's initial State */
export const projectAtomReset = atom(null, (get, set) => {
  set(projectAtom, {} as ProjectState)
  set(projectLoadingAtom, true)
  set(initialProjectDetailsLoadAtom, false)
})

export const useProjectReset = () => {
  const projectReset = useSetAtom(projectAtomReset)
  const contributionsReset = useSetAtom(contributionAtomReset)
  const entriesReset = useSetAtom(entriesAtomReset)
  const goalsReset = useSetAtom(goalsAtomReset)
  const projectFormReset = useSetAtom(projectFormAtomReset)
  const rewardsReset = useSetAtom(rewardsAtomReset)
  const walletReset = useSetAtom(walletAtomReset)

  const resetProject = useCallback(() => {
    console.log('=================================')
    console.log('=========RESET IS CALLED=========')
    console.log('=================================')

    projectReset()
    contributionsReset()
    entriesReset()
    goalsReset()
    projectFormReset()
    rewardsReset()
    walletReset()
  }, [contributionsReset, entriesReset, goalsReset, projectFormReset, projectReset, rewardsReset, walletReset])

  return resetProject
}
