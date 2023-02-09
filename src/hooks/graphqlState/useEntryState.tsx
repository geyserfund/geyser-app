import { QueryHookOptions, useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import { QUERY_GET_ENTRY_FOR_ADD_EDIT } from '../../graphql'
import {
  MUTATION_CREATE_ENTRY,
  MUTATION_UPDATE_ENTRY,
} from '../../graphql/mutations'
import {
  CreateEntryInput,
  Entry,
  EntryType,
  UpdateEntryInput,
} from '../../types'
import {
  checkDiff,
  checkKeyValueExists,
  toInt,
  useNotification,
} from '../../utils'
import { useBeforeClose } from '../useBeforeClose'
import { useListenerState } from '../useListenerState'

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

export const useEntryState = (
  projectId: number,
  entryId?: number | string,
  options?: QueryHookOptions<TEntryData, TEntryVariables>,
) => {
  const { toast } = useNotification()
  const { setIsFormDirty } = useBeforeClose()

  const [entry, setEntry] = useState<Entry>({} as Entry)
  const [baseEntry, setBaseEntry] = useState<Entry>({} as Entry)

  const [saving, setSaving] = useListenerState(false)

  const [createEntryMutation] = useMutation<
    TEntryCreateData,
    TEntryCreateVariables
  >(MUTATION_CREATE_ENTRY, {
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
        setBaseEntry(data.createEntry)
        setEntry(data.createEntry)
      }
    },
  })

  const [updateEntryMutation] = useMutation<
    TEntryUpdateData,
    TEntryUpdateVariables
  >(MUTATION_UPDATE_ENTRY, {
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

  const [getEntryQuery, { loading }] = useLazyQuery<
    TEntryData,
    TEntryVariables
  >(QUERY_GET_ENTRY_FOR_ADD_EDIT, {
    variables: {
      id: toInt(entryId),
    },
    ...options,
    onCompleted(data) {
      if (data.entry) {
        setEntry(data.entry)
        setBaseEntry(data.entry)
      }

      if (options?.onCompleted) {
        options?.onCompleted(data)
      }
    },
  })

  useEffect(() => {
    if (entryId && entryId !== 'new') {
      getEntryQuery()
    }
  }, [entryId])

  useEffect(() => {
    const isDiff = checkDiff(entry, baseEntry)
    setIsFormDirty(isDiff)
  }, [entry, baseEntry])

  const updateEntry = (value: Partial<Entry>) => {
    setEntry({ ...entry, ...value })
  }

  const saveEntry = () => {
    if (saving.current) {
      return
    }

    const isValid = checkKeyValueExists(
      entry,
      ['content', 'description', 'image', 'title'],
      'any',
    )

    const isDiff = checkDiff(entry, baseEntry)

    if (!isValid || !isDiff) {
      return
    }

    if (entryId || Boolean(baseEntry.id)) {
      const input: UpdateEntryInput = {
        content: entry.content,
        description: entry.description,
        entryId: toInt(baseEntry.id),
        image: entry.image,
        title: entry.title,
      }
      setSaving(true)
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
      setSaving(true)
      createEntryMutation({ variables: { input } })
    }
  }

  return {
    loading,
    saving: saving.current,
    entry,
    updateEntry,
    saveEntry,
  }
}
