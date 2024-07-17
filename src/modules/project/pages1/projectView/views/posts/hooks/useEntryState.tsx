import { LazyQueryHookOptions } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'

import { useListenerState } from '../../../../../../../shared/hooks/useListenerState'
import { useUnsavedAlert } from '../../../../../../../shared/hooks/useUnsavedAlert'
import {
  CreateEntryInput,
  EntryType,
  ProjectEntryQuery,
  ProjectEntryQueryVariables,
  ProjectEntryViewFragment,
  UpdateEntryInput,
  useCreateEntryMutation,
  useProjectEntryLazyQuery,
  usePublishEntryMutation,
  useUpdateEntryMutation,
} from '../../../../../../../types'
import { checkDiff, checkKeyValueExists, toInt, useNotification } from '../../../../../../../utils'

const entryEditKeyList: (keyof ProjectEntryViewFragment)[] = ['content', 'description', 'image', 'title']

export const useEntryState = (
  projectId: number,
  entryId?: number | string,
  options?: LazyQueryHookOptions<ProjectEntryQuery, ProjectEntryQueryVariables>,
  entryTemplate: ProjectEntryViewFragment = {} as ProjectEntryViewFragment,
) => {
  const toast = useNotification()

  const [entry, setEntry] = useState<ProjectEntryViewFragment>(entryTemplate as ProjectEntryViewFragment)
  const [baseEntry, setBaseEntry] = useState<ProjectEntryViewFragment>(entryTemplate as ProjectEntryViewFragment)

  const [loading, setLoading] = useState(true)

  const [hasDiff, setHasDiff] = useState(false)

  const [saving, setSaving] = useListenerState(false)

  useUnsavedAlert(hasDiff)

  const [createEntryMutation] = useCreateEntryMutation({
    onError() {
      setSaving(false)
      toast.error({
        title: 'Entry creation failed',
        description: 'Please try again later',
      })
    },
    onCompleted(data) {
      setSaving(false)
      if (data.createEntry) {
        sync(data.createEntry)
      }
    },
  })

  const [updateEntryMutation] = useUpdateEntryMutation({
    onError() {
      setSaving(false)
      toast.error({
        title: 'Entry update failed',
        description: 'Please try again later',
      })
    },
    onCompleted(data) {
      setSaving(false)
      if (data.updateEntry) {
        setBaseEntry({ ...baseEntry, ...data.updateEntry })
      }
    },
  })

  const [publishEntryMutation, { loading: publishing }] = usePublishEntryMutation({
    onCompleted(data) {
      sync(data.publishEntry)
      toast.success({
        title: 'Entry published',
        description: 'Your entry is now live',
      })
    },
    onError() {
      toast.error({
        title: 'Entry publish failed',
        description: 'Please try again later',
      })
    },
  })

  const [getEntryQuery] = useProjectEntryLazyQuery({
    variables: {
      entryId: toInt(entryId),
    },
    ...options,
    onCompleted(data) {
      if (data.entry) {
        sync(data.entry)
      }

      if (options?.onCompleted) {
        options?.onCompleted(data)
      }

      setLoading(false)
    },
    onError(error) {
      if (options?.onError) {
        options?.onError(error)
      }

      setLoading(false)
    },
  })

  useEffect(() => {
    if (entryId && entryId !== 'new') {
      setLoading(true)
      getEntryQuery()
    } else {
      setLoading(false)
    }
  }, [entryId, getEntryQuery])

  useEffect(() => {
    const isDiff = checkDiff(entry, baseEntry, entryEditKeyList)
    setHasDiff(isDiff)
  }, [entry, baseEntry])

  const sync = (value: ProjectEntryViewFragment) => {
    setBaseEntry(value)
    setEntry(value)
  }

  const updateEntry = (value: Partial<ProjectEntryViewFragment>) => {
    setEntry({ ...entry, ...value })
  }

  const saveEntry = useCallback(async () => {
    if (saving.current) {
      return
    }

    const isValid = checkKeyValueExists(entry, entryEditKeyList, 'any')

    const isDiff = checkDiff(entry, baseEntry, entryEditKeyList)

    if (!isValid || !isDiff) {
      return
    }

    setSaving(true)

    if (entryId || Boolean(baseEntry.id)) {
      const input: UpdateEntryInput = {
        content: entry.content,
        description: entry.description,
        entryId: entryId || toInt(baseEntry.id),
        image: entry.image,
        title: entry.title,
      }
      await updateEntryMutation({ variables: { input } })
    } else {
      const input: CreateEntryInput = {
        projectId: toInt(projectId),
        content: entry.content,
        description: entry.description || '',
        image: entry.image,
        title: entry.title || '',
        type: EntryType.Article,
      }
      await createEntryMutation({ variables: { input } })
    }
  }, [saving, entry, baseEntry, entryId, projectId, createEntryMutation, updateEntryMutation, setSaving])

  const publishEntry = async () => {
    if (!entry.id) {
      toast.info({
        title: 'Cannot publish',
        description: 'Please edit your content before preview',
      })
      return
    }

    try {
      if (hasDiff) {
        await saveEntry()
      }

      const entryId = toInt(entry.id)
      if (entryId) {
        publishEntryMutation({ variables: { id: entryId } })
      }
    } catch (error) {
      toast.error({
        title: 'Entry publish failed',
        description: 'Please try again later',
      })
    }
  }

  return {
    loading,
    saving: saving.current,
    entry,
    hasDiff,
    updateEntry,
    saveEntry,
    publishEntry,
    publishing,
  }
}
