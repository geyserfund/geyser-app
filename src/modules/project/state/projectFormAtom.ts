/** These are for Project form State  */

import { atom } from 'jotai'

import { getDiff } from '@/utils'

import { projectAtom, ProjectState } from './projectAtom'

/** Base project is the project that is fetched from the server */
export const formProjectAtom = atom<ProjectState>({} as ProjectState)

/** Partially Update the form project atom with a project */
export const partialUpdateFormProjectAtom = atom(null, (get, set, updateProject: Partial<ProjectState>) => {
  const formProjectData = get(formProjectAtom)
  set(formProjectAtom, { ...formProjectData, ...updateProject })
})

/** Sync base project and the edited project */
export const syncProjectAtom = atom(null, (_, set, project: ProjectState) => {
  set(projectAtom, project)
  set(formProjectAtom, project)
})
/** Get the diff between the current project and the base project */
export const diffProjectAtom = atom((get) => {
  const project = get(projectAtom)
  const formProject = get(formProjectAtom)

  return getDiff(project, formProject, [
    'location',
    'description',
    'images',
    'rewardCurrency',
    'shortDescription',
    'status',
    'thumbnailImage',
    'title',
    'links',
  ])
})

/** Reset all real-atoms in this file to it's initial State */
export const projectFormAtomReset = atom(null, (get, set) => {
  set(formProjectAtom, {} as ProjectState)
})
