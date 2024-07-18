import { atom } from 'jotai'

import { EntryStatus, ProjectEntryFragment, ProjectEntryViewFragment } from '../../../types'

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

/** add new entry or update existing entry  */
export const addUpdateEntryAtom = atom(null, (get, set, entry: ProjectEntryFragment | ProjectEntryViewFragment) => {
  const allEntries = get(entriesAtom)
  const allUnpublishedEntries = get(unpublishedEntriesAtom)

  const isEntryExist = allEntries.some((e) => e.id === entry.id)
  const isEntryExistInUnpublished = allUnpublishedEntries.some((e) => e.id === entry.id)

  if (isEntryExistInUnpublished) {
    /** If entry status is update to publish, move entry from unpublished to publish */
    if (entry.status === EntryStatus.Published) {
      const newUnpublishedEntries = allUnpublishedEntries.filter((e) => e.id !== entry.id)
      set(unpublishedEntriesAtom, newUnpublishedEntries)

      const newEntries = [entry, ...allEntries]
      set(entriesAtom, newEntries)
      return
    }

    /** If entry status is update to unpublished, update entry in unpublished */
    const newUnpublishedEntries = allUnpublishedEntries.map((e) => (e.id === entry.id ? entry : e))
    set(unpublishedEntriesAtom, newUnpublishedEntries)
    return
  }

  /** If entry is already published, update entry in published */
  if (isEntryExist) {
    const newEntries = allEntries.map((e) => (e.id === entry.id ? entry : e))
    set(entriesAtom, newEntries)
    return
  }

  /** If entry is new and status is published, add entry to published */
  if (entry.status === EntryStatus.Published) {
    const newEntries = [entry, ...allEntries]
    set(entriesAtom, newEntries)
    return
  }

  /** If entry is new and status is unpublished, add entry to unpublished */
  const newUnpublishedEntries = [entry, ...allUnpublishedEntries]
  set(unpublishedEntriesAtom, newUnpublishedEntries)
})
