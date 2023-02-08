import { QueryHookOptions, useLazyQuery, useMutation } from '@apollo/client'
import { useCallback, useEffect } from 'react'

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
import { checkKeyValueExists, toInt, useNotification } from '../../utils'
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

export const useEntryState = (
  projectId: number,
  entryId?: number | string,
  options?: QueryHookOptions<TEntryData, TEntryVariables>,
) => {
  const { toast } = useNotification()
  const [entry, setEntry] = useListenerState<Entry>({} as Entry)

  const [saving, setSaving] = useListenerState(false)

  const [createEntryMutation] = useMutation<TEntryData, TEntryCreateVariables>(
    MUTATION_CREATE_ENTRY,
    {
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
        if (data.entry) {
          setEntry({ ...entry.current, ...data.entry })
        }
      },
    },
  )

  const [updateEntryMutation] = useMutation<TEntryData, TEntryUpdateVariables>(
    MUTATION_UPDATE_ENTRY,
    {
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
        if (data.entry) {
          setEntry({ ...entry.current, ...data.entry })
        }
      },
    },
  )

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

  const updateEntry = useCallback((value: Partial<Entry>) => {
    setEntry({ ...entry.current, ...value })
  }, [])

  const saveEntry = () => {
    if (saving.current) {
      return
    }

    const isValid = checkKeyValueExists(
      entry.current,
      ['content', 'description', 'image', 'title'],
      'any',
    )

    if (!isValid) {
      return
    }

    if (entryId || entry.current.id) {
      const input: UpdateEntryInput = {
        content: entry.current.content,
        description: entry.current.description,
        entryId: toInt(entry.current.id),
        image: entry.current.image,
        title: entry.current.title,
      }
      setSaving(true)
      updateEntryMutation({ variables: { input } })
    } else {
      const input: CreateEntryInput = {
        projectId: toInt(projectId),
        content: entry.current.content,
        description: entry.current.description,
        image: entry.current.image,
        title: entry.current.title,
        type: EntryType.Article,
      }
      setSaving(true)
      createEntryMutation({ variables: { input } })
    }
  }

  return {
    loading,
    saving: saving.current,
    entry: entry.current,
    updateEntry,
    saveEntry,
  }
}
