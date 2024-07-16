import { QueryHookOptions, useLazyQuery, useMutation } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'

import { QUERY_ENTRY_WITH_OWNERS } from '../../../graphql'
import { MUTATION_CREATE_ENTRY, MUTATION_UPDATE_ENTRY } from '../../../graphql/mutations'
import { CreateEntryInput, Entry, EntryType, UpdateEntryInput } from '../../../types'
import { checkDiff, checkKeyValueExists, toInt, useNotification } from '../../../utils'
import { useListenerState } from '../useListenerState'
import { useUnsavedAlert } from '../useUnsavedAlert'

type TEntryVariables = {
  id?: Number
  name?: string
}

type TEntryUpdateVariables = {
  input: UpdateEntryInput
}

type TEntryCreateVariables = {
  input: CreateEntryInput
}

type TEntryData = {
  entry: Entry
}

type TEntryCreateData = {
  createEntry: Entry
}

type TEntryUpdateData = {
  updateEntry: Entry
}

const entryEditKeyList: (keyof Entry)[] = ['content', 'description', 'image', 'title']

export const useEntryState = (
  projectId: number,
  entryId?: number | string,
  options?: QueryHookOptions<TEntryData, TEntryVariables>,
  entryTemplate: Entry = {} as Entry,
) => {
  const { toast } = useNotification()

  const [entry, setEntry] = useState<Entry>(entryTemplate as Entry)
  const [baseEntry, setBaseEntry] = useState<Entry>(entryTemplate as Entry)

  const [loading, setLoading] = useState(true)

  const [hasDiff, setHasDiff] = useState(false)

  const [saving, setSaving] = useListenerState(false)

  useUnsavedAlert(hasDiff)

  const [createEntryMutation] = useMutation<TEntryCreateData, TEntryCreateVariables>(MUTATION_CREATE_ENTRY, {
    onError() {
      setSaving(false)
      toast({
        title: 'Entry creation failed',
        description: 'Please try again later',
        status: 'error',
      })
    },
    onCompleted(data) {
      setSaving(false)
      if (data.createEntry) {
        sync(data.createEntry)
      }
    },
  })

  const [updateEntryMutation] = useMutation<TEntryUpdateData, TEntryUpdateVariables>(MUTATION_UPDATE_ENTRY, {
    onError() {
      setSaving(false)
      toast({
        title: 'Entry update failed',
        description: 'Please try again later',
        status: 'error',
      })
    },
    onCompleted(data) {
      setSaving(false)
      if (data.updateEntry) {
        setBaseEntry({ ...baseEntry, ...data.updateEntry })
      }
    },
  })

  const [getEntryQuery] = useLazyQuery<TEntryData, TEntryVariables>(QUERY_ENTRY_WITH_OWNERS, {
    variables: {
      id: toInt(entryId),
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

  const sync = (value: Entry) => {
    setBaseEntry(value)
    setEntry(value)
  }

  const updateEntry = (value: Partial<Entry>) => {
    setEntry({ ...entry, ...value })
  }

  const saveEntry = useCallback(() => {
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
      updateEntryMutation({ variables: { input } })
    } else {
      const input: CreateEntryInput = {
        projectId: toInt(projectId),
        content: entry.content,
        description: entry.description || '',
        image: entry.image,
        title: entry.title || '',
        type: EntryType.Article,
      }
      createEntryMutation({ variables: { input } })
    }
  }, [saving, entry, baseEntry, entryId, projectId, createEntryMutation, updateEntryMutation, setSaving])

  return {
    loading,
    saving: saving.current,
    entry,
    hasDiff,
    updateEntry,
    saveEntry,
  }
}
