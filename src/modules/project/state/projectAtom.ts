import { atom, useAtom, useSetAtom } from 'jotai'
import { atomEffect } from 'jotai-effect'

import { authUserAtom } from '../../../pages/auth/state'
import { ProjectHeaderSummaryFragment, ProjectPageBodyFragment, ProjectPageDetailsFragment } from '../../../types'
import { getDiff } from '../../../utils'
import { initialGoalsLoadAtom } from './goalsAtom'

export type ProjectState = ProjectPageBodyFragment & ProjectHeaderSummaryFragment & ProjectPageDetailsFragment

/** Project atom is the root project store */
export const projectAtom = atom<ProjectState>({} as ProjectState)

/** Partially Update the project atom with a project */
export const partialUpdateProjectAtom = atom(null, (get, set, updateProject: Partial<ProjectState>) => {
  const projectData = get(projectAtom)
  set(projectAtom, { ...projectData, ...updateProject })
})

/** Base project is the project that is fetched from the server */
export const baseProjectAtom = atom<ProjectState>({} as ProjectState)

/** Sync base project and the edited project */
export const syncProjectAtom = atom(null, (_, set, project: ProjectState) => {
  set(projectAtom, project)
  set(baseProjectAtom, project)
})

/** Get the diff between the current project and the base project */
export const diffProjectAtom = atom((get) => {
  const project = get(projectAtom)
  const baseProject = get(baseProjectAtom)

  return getDiff(project, baseProject, [
    'location',
    'description',
    'image',
    'rewardCurrency',
    'shortDescription',
    'status',
    'thumbnailImage',
    'title',
    'links',
  ])
})

/** Defaults to true when intialized, Set to false after project is loaded. */
export const projectLoadingAtom = atom(true)

/** True for creator visiting their own project */
export const isProjectOwnerAtom = atom((get) => {
  const project = get(projectAtom)
  const user = get(authUserAtom)

  if (project.id && user.id && project.owners[0]?.user.id === user.id) {
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

/** Reset the project state */
const projectResetAtom = atom(null, (get, set) => {
  set(projectLoadingAtom, true)
  set(initialProjectDetailsLoadAtom, false)
  set(initialGoalsLoadAtom, false)
  set(initialGoalsLoadAtom, false)
})
export const useProjectReset = () => useSetAtom(projectResetAtom)
