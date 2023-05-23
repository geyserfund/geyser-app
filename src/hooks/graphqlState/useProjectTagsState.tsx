import { useEffect, useMemo, useState } from 'react'

import {
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
  updateProject: (_: Partial<ProjectFragment>) => void
}) => {
  const [tags, setTags] = useState<Tag[]>([])

  const { toast } = useNotification()

  useEffect(() => {
    if (project && project.tags) {
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
        })
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
          })
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
      const results = await Promise.all(
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

      updateProject({
        tags: results.flatMap(({ data }) => data?.projectTagRemove || []),
      })
    }

    if (addTags.length > 0) {
      const results = await Promise.all(
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

      updateProject({
        tags: results.flatMap(({ data }) => data?.projectTagAdd || []),
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
