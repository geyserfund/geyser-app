import { useEffect, useMemo, useState } from 'react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { Tag, useProjectTagAddMutation, useProjectTagRemoveMutation } from '../../../../../types'
import { toInt, useNotification } from '../../../../../utils'

export const useProjectTagsState = () => {
  const { project, partialUpdateProject } = useProjectAtom()

  const [tags, setTags] = useState<Tag[]>([])
  const [settingTags, setSettingTags] = useState(false)
  const { toast } = useNotification()

  useEffect(() => {
    if (project && project.tags && !settingTags) {
      setTags(project.tags)
      setSettingTags(true)
    }
  }, [project, settingTags])

  const [addTag, { loading: addTagLoading }] = useProjectTagAddMutation({
    onError() {
      toast({
        title: 'failed to add tag',
        status: 'error',
      })
    },
    onCompleted(data) {
      if (data.projectTagAdd) {
        partialUpdateProject({
          tags: data.projectTagAdd,
        })
      }
    },
  })

  const [removeTag, { loading: removeTagLoading }] = useProjectTagRemoveMutation({
    onError() {
      toast({
        title: 'failed to remove tag',
        status: 'error',
      })
    },
    onCompleted(data) {
      if (data.projectTagRemove) {
        partialUpdateProject({
          tags: data.projectTagRemove,
        })
      }
    },
  })

  const addTags = useMemo(
    () =>
      project && project.tags?.length > 0
        ? tags.filter((tag) => !project.tags.some((projectTag) => tag.id === projectTag.id))
        : tags,

    [project, tags],
  )

  const removeTags = useMemo(
    () =>
      project && project.tags?.length > 0
        ? project.tags.filter((tag) => !tags.some((projectTag) => tag.id === projectTag.id))
        : [],
    [project, tags],
  )

  const isDirty = useMemo(() => Boolean(addTags.length || removeTags.length), [addTags.length, removeTags.length])

  const saveTags = async () => {
    if (!project) {
      return
    }

    if (removeTags.length > 0) {
      removeTags.map(async (tag) => {
        await removeTag({
          variables: {
            input: {
              projectId: toInt(project.id),
              tagId: tag.id,
            },
          },
        })
      })
    }

    if (addTags.length > 0) {
      addTags.map(async (tag) => {
        await addTag({
          variables: {
            input: {
              projectId: toInt(project.id),
              tagId: tag.id,
            },
          },
        })
      })
    }
  }

  const loading = addTagLoading || removeTagLoading

  return {
    tags,
    setTags,
    saveTags,
    isDirty,
    loading,
  }
}
