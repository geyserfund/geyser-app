import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  useCreateEntryMutation,
  useDeleteEntryMutation,
  useProjectEntriesLazyQuery,
  useProjectUnplublishedEntriesLazyQuery,
  usePublishEntryMutation,
  useUpdateEntryMutation,
} from '@/types'

import { useProjectAtom } from '../hooks/useProjectAtom'
import {
  addUpdateEntryAtom,
  deleteEntryAtom,
  entriesAtom,
  initialEntriesLoadAtom,
  unpublishedEntriesAtom,
} from '../state/entriesAtom'
import { isProjectOwnerAtom } from '../state/projectAtom'
import { updateEntryCache, updateProjectEntriesCache } from './cache/projectEntryCache'
import { useCustomMutation } from './custom/useCustomMutation'

/**
 * Query, Create, Update, Delete, Publish project entries for current Project context
 * @param load - Load entries on mount
 */
export const useProjectEntriesAPI = (load?: boolean) => {
  const isProjectOwner = useAtomValue(isProjectOwnerAtom)

  const { project, loading } = useProjectAtom()

  const setentries = useSetAtom(entriesAtom)
  const setunpublishedEntries = useSetAtom(unpublishedEntriesAtom)
  const [initialEntriesLoad, setInitialEntriesLoad] = useAtom(initialEntriesLoadAtom)
  const addUpdateEntry = useSetAtom(addUpdateEntryAtom)
  const removeEntry = useSetAtom(deleteEntryAtom)

  const [queryProjectEntries, queryProjectEntriesOptions] = useProjectEntriesLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      where: {
        id: project.id,
      },
    },
    onCompleted(data) {
      const entries = data?.projectGet?.entries || []
      setentries(entries)
      setInitialEntriesLoad(true)
    },
  })

  const [queryUnpublishedProjectEntries, queryUnpublishedProjectEntriesOptions] =
    useProjectUnplublishedEntriesLazyQuery({
      fetchPolicy: 'cache-first',
      variables: {
        where: {
          id: project.id,
        },
      },
      onCompleted(data) {
        const unpublishedEntries = data?.projectGet?.entries || []
        setunpublishedEntries(unpublishedEntries)
      },
    })

  useEffect(() => {
    if (project.id && !loading && load) {
      if (!initialEntriesLoad) {
        queryProjectEntries()
      }

      if (isProjectOwner) {
        queryUnpublishedProjectEntries()
      }
    }
  }, [
    project.id,
    loading,
    load,
    initialEntriesLoad,
    queryUnpublishedProjectEntries,
    queryProjectEntries,
    isProjectOwner,
  ])

  const [createEntry, createEntryOptions] = useCustomMutation(useCreateEntryMutation, {
    onCompleted(data) {
      if (data.createEntry) {
        addUpdateEntry(data.createEntry)
      }
    },
    update(cache, { data }) {
      if (data?.createEntry) {
        updateEntryCache(cache, data.createEntry)
        updateProjectEntriesCache(cache, data.createEntry)
      }
    },
  })

  const [updateEntry, updateEntryOptions] = useCustomMutation(useUpdateEntryMutation, {
    onCompleted(data) {
      if (data.updateEntry) {
        addUpdateEntry(data.updateEntry)
      }
    },
    update(cache, { data }) {
      if (data?.updateEntry) {
        updateEntryCache(cache, data.updateEntry)
        updateProjectEntriesCache(cache, data.updateEntry)
      }
    },
  })

  const [publishEntry, publishEntryOptions] = useCustomMutation(usePublishEntryMutation, {
    onCompleted(data) {
      addUpdateEntry(data.publishEntry)
    },
    update(cache, { data }) {
      if (data?.publishEntry) {
        updateEntryCache(cache, data.publishEntry)
        updateProjectEntriesCache(cache, data.publishEntry)
      }
    },
  })

  const [deleteEntry, deleteEntryOptions] = useCustomMutation(useDeleteEntryMutation, {
    onCompleted(data) {
      removeEntry(data.deleteEntry.id)
    },
  })

  return {
    queryProjectEntries: {
      execute: queryProjectEntries,
      ...queryProjectEntriesOptions,
    },
    queryUnpublishedProjectEntries: {
      execute: queryUnpublishedProjectEntries,
      ...queryUnpublishedProjectEntriesOptions,
    },
    createEntry: {
      execute: createEntry,
      ...createEntryOptions,
    },
    updateEntry: {
      execute: updateEntry,
      ...updateEntryOptions,
    },
    publishEntry: {
      execute: publishEntry,
      ...publishEntryOptions,
    },
    deleteEntry: {
      execute: deleteEntry,
      ...deleteEntryOptions,
    },
  }
}
