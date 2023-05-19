import { useEffect, useMemo, useState } from 'react'

import {
  Project,
  ProjectFragment,
  Tag,
  useProjectTagAddMutation,
  useProjectTagRemoveMutation,
} from '../../types'
import { toInt, useNotification } from '../../utils'

export const useProjectTagsState = ({
  project,
  updateProject,
}: {
  project: ProjectFragment | null
  updateProject?: (_: Project) => void
}) => {
  const [tags, setTags] = useState<Tag[]>([])

  const { toast } = useNotification()

  useEffect(() => {
    if (project && project.tags?.length) {
      setTags(project.tags)
    }
  }, [project])

  const [addTag, { loading: addTagLoading }] = useProjectTagAddMutation({
    onError() {
      toast({
        title: 'failed to add tag',
        status: 'error',
      })
    },
    onCompleted(data) {
      if (updateProject && data.projectTagAdd) {
        updateProject({
          tags: data.projectTagAdd,
        } as Project)
      }
    },
  })

  const [removeTag, { loading: removeTagLoading }] =
    useProjectTagRemoveMutation({
      onError() {
        toast({
          title: 'failed to remove tag',
          status: 'error',
        })
      },
      onCompleted(data) {
        if (updateProject && data.projectTagRemove) {
          updateProject({
            tags: data.projectTagRemove,
          } as Project)
        }
      },
    })

  const addTags = useMemo(
    () =>
      project && project.tags?.length > 0
        ? tags.filter(
            (tag) =>
              !project.tags.some((projectTag) => tag.id === projectTag.id),
          )
        : tags,

    [project, tags],
  )

  const removeTags = useMemo(
    () =>
      project && project.tags?.length > 0
        ? project.tags.filter(
            (tag) => !tags.some((projectTag) => tag.id === projectTag.id),
          )
        : [],
    [project, tags],
  )

  const isDirty = useMemo(
    () => Boolean(addTags.length || removeTags.length),
    [addTags.length, removeTags.length],
  )

  const saveTags = async () => {
    if (!project) {
      return
    }

    if (removeTags.length > 0) {
      await Promise.allSettled(
        removeTags.map((tag) =>
          removeTag({
            variables: {
              input: {
                projectId: toInt(project.id),
                tagId: tag.id,
              },
            },
          }),
        ),
      )
    }

    if (addTags.length > 0) {
      await Promise.allSettled(
        addTags.map((tag) =>
          addTag({
            variables: {
              input: {
                projectId: toInt(project.id),
                tagId: tag.id,
              },
            },
          }),
        ),
      )
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
