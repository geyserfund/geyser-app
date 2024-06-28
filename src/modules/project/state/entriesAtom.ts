import { atom } from 'jotai'

import { ProjectEntryFragment } from '../../../types'

/** Published Entries for Project in context */
export const entriesAtom = atom<ProjectEntryFragment[]>([])

/** If Entries are loading */
export const entriesLoadingAtom = atom(true)

/** Unpublished Entries for Project in context */
export const unpublishedEntriesAtom = atom<ProjectEntryFragment[]>([])

/** If project has Entries */
export const hasEntriesAtom = atom((get) => {
  const entries = get(entriesAtom)
  const unpublishedEntries = get(unpublishedEntriesAtom)

  return entries.length > 0 || unpublishedEntries.length > 0
})

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
