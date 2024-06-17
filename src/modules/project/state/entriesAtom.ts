import { atom } from 'jotai'

import { ProjectEntryFragment } from '../../../types'

/** Published Entries for Project in context */
export const entriesAtom = atom<ProjectEntryFragment[]>([])

/** Unpublished Entries for Project in context */
export const unpublishedEntriesAtom = atom<ProjectEntryFragment[]>([])

/** If project has Entries */
export const hasEntriesAtom = atom((get) => {
  const entries = get(entriesAtom)
  const unpublishedEntries = get(unpublishedEntriesAtom)

  return entries.length > 0 || unpublishedEntries.length > 0
})
