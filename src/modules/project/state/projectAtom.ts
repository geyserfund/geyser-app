import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

import { authUserAtom } from '../../../pages/auth/state'
import { ProjectHeaderSummaryFragment, ProjectPageBodyFragment } from '../../../types'
import { getDiff } from '../../../utils'

export type ProjectState = ProjectPageBodyFragment & ProjectHeaderSummaryFragment

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
