import { atom } from 'jotai'

import { ProjectEntryFragment } from '../../../types'

/** Published Entries for Project in context */
export const entriesAtom = atom<ProjectEntryFragment[]>([])

/** Unpublished Entries for Project in context */
export const unpublishedEntriesAtom = atom<ProjectEntryFragment[]>([])

/** Initial load for entries, set to true after loaded */
export const initialEntriesLoadAtom = atom(false)

/** Delete entry by id */
export const deleteEntryAtom = atom(null, (get, set, entryId: string) => {
  const entries = get(entriesAtom)
  const unpublishedEntries = get(unpublishedEntriesAtom)

  if (entries.some((entry) => entry.id === entryId)) {
    const newEntries = entries.filter((entry) => entry.id !== entryId)
    set(entriesAtom, newEntries)
  } else if (unpublishedEntries.some((entry) => entry.id === entryId)) {
    const newEntries = unpublishedEntries.filter((entry) => entry.id !== entryId)
    set(unpublishedEntriesAtom, newEntries)
  }
})
