import { LazyQueryHookOptions } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useProjectEntriesAPI } from '@/modules/project/API/useProjectEntriesAPI'

import { useUnsavedAlert } from '../../../../../../../shared/hooks/useUnsavedAlert'
import {
  CreateEntryInput,
  EntryType,
  ProjectEntryQuery,
  ProjectEntryQueryVariables,
  ProjectEntryViewFragment,
  UpdateEntryInput,
  useProjectEntryQuery,
} from '../../../../../../../types'
import { toInt, useNotification } from '../../../../../../../utils'

type EntryFormType = Pick<ProjectEntryViewFragment, 'id' | 'title' | 'description' | 'image' | 'content' | 'status'>

const schema = yup.object({
  title: yup.string().required('This is a required field'),
})

export const useEntryForm = (
  projectId: number,
  entryId?: number | string,
  options?: LazyQueryHookOptions<ProjectEntryQuery, ProjectEntryQueryVariables>,
  entryTemplate: ProjectEntryViewFragment = {} as ProjectEntryViewFragment,
) => {
  const toast = useNotification()

  const [loading, setLoading] = useState(Boolean(entryId))

  const { createEntry, updateEntry, publishEntry } = useProjectEntriesAPI()

  const { formState, setValue, watch, getValues, reset } = useForm<EntryFormType>({
    defaultValues: {
      content: entryTemplate.content || '',
      description: entryTemplate.description || '',
      image: entryTemplate.image || '',
      title: entryTemplate.title || '',
    },
    resolver: yupResolver(schema),
  })
  const { isDirty } = formState

  const resetForm = (entry: ProjectEntryViewFragment) => {
    reset({
      id: entry.id,
      status: entry.status,
      content: entry.content,
      description: entry.description,
      image: entry.image,
      title: entry.title,
    })
  }

  useProjectEntryQuery({
    variables: {
      entryId: toInt(entryId),
    },
    skip: !entryId,
    fetchPolicy: 'network-only',
    ...options,
    onError(error) {
      if (options?.onError) {
        options?.onError(error)
      }

      setLoading(false)
    },
    onCompleted(data) {
      if (data.entry) {
        resetForm(data.entry)
      }

      setLoading(false)
    },
  })

  useUnsavedAlert(isDirty)

  const saveEntry = useCallback(
    async (props?: { onCompleted?: Function }) => {
      if (!isDirty) {
        return
      }

      const entry = getValues()

      if (entryId || Boolean(entry?.id)) {
        const input: UpdateEntryInput = {
          content: entry.content,
          description: entry.description,
          entryId: entryId || toInt(entry?.id),
          image: entry.image,
          title: entry.title,
        }
        await updateEntry.execute({
          variables: { input },
          onError() {
            toast.error({
              title: 'Entry update failed',
              description: 'Please try again later',
            })
          },
          onCompleted(data) {
            resetForm(data.updateEntry)
            if (props?.onCompleted) {
              props.onCompleted()
            }
          },
        })
      } else {
        const input: CreateEntryInput = {
          projectId: toInt(projectId),
          content: entry.content,
          description: entry.description || '',
          image: entry.image,
          title: entry.title || '',
          type: EntryType.Article,
        }
        await createEntry.execute({
          variables: { input },
          onError() {
            toast.error({
              title: 'Entry creation failed',
              description: 'Please try again later',
            })
          },
          onCompleted(data) {
            resetForm(data.createEntry)
          },
        })
      }
      /** Don't add apollo query or mutation to useEffect dependency */
    },
    [entryId, projectId, toast, resetForm, getValues, isDirty],
  )

  const publishEntryAfterValidation = useCallback(
    async ({ onCompleted }: { onCompleted?: Function }) => {
      const entry = getValues()
      if (!entry.id) {
        toast.info({
          title: 'Cannot publish',
          description: 'Please edit your content before publish',
        })
        return
      }

      try {
        if (isDirty) {
          await saveEntry()
        }

        const entryId = toInt(entry.id)
        if (entryId) {
          publishEntry.execute({
            variables: { id: entryId },
            onCompleted(data) {
              resetForm(data.publishEntry)
              if (onCompleted) {
                onCompleted()
              }

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
        }
      } catch (error) {
        toast.error({
          title: 'Entry publish failed',
          description: 'Please try again later',
        })
      }
    },
    /** Don't add apollo query or mutation to useEffect dependency */
    [isDirty, saveEntry, getValues, resetForm, toast],
  )

  return {
    loading,
    saving: updateEntry.loading || createEntry.loading,
    saveEntry,
    publishEntry: publishEntryAfterValidation,
    publishing: publishEntry.loading,
    setValue,
    isDirty,
    watch,
  }
}
