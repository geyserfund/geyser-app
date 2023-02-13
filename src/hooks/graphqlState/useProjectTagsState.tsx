import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import {
  MUTATION_PROJECT_TAG__REMOVE,
  MUTATION_PROJECT_TAG_ADD,
} from '../../graphql/mutations'
import {
  MutationInput,
  Project,
  ProjectLinkMutationInput,
  ProjectTagMutationInput,
  Tag,
} from '../../types'
import { toInt, useNotification } from '../../utils'

export const useProjectTagsState = ({
  project,
  updateProject,
}: {
  project: Project
  updateProject?: (_: Project) => void
}) => {
  const [tags, setTags] = useState<Tag[]>([])

  const { toast } = useNotification()

  useEffect(() => {
    if (project?.tags?.length > 0) {
      setTags(project?.tags)
    }
  }, [project])

  const [addTag, { loading: addTagLoading }] = useMutation<
    { projectTagAdd: Tag },
    MutationInput<ProjectTagMutationInput>
  >(MUTATION_PROJECT_TAG_ADD, {
    onError() {
      toast({
        title: 'failed to add project tag',
        status: 'error',
      })
    },
    onCompleted(data) {
      if (updateProject) {
        updateProject({
          tags: project.tags
            ? [...project.tags, data.projectTagAdd]
            : [data.projectTagAdd],
        } as Project)
      }
    },
  })
  const [removeTag, { loading: removeTagLoading }] = useMutation<
    { projectTagRemove: Tag },
    MutationInput<ProjectTagMutationInput>
  >(MUTATION_PROJECT_TAG__REMOVE, {
    onError() {
      toast({
        title: 'failed to remove project tag',
        status: 'error',
      })
    },
    onCompleted(data) {
      if (updateProject) {
        updateProject({
          tags: project.tags
            ? project.tags.filter((tag) => tag.id !== data.projectTagRemove.id)
            : [],
        } as Project)
      }
    },
  })

  const saveTags = async () => {
    const addTags =
      project?.tags?.length > 0
        ? tags.filter((tag) => !project.tags.some((tag2) => tag.id === tag2.id))
        : tags
    const removeTags =
      project?.tags?.length > 0
        ? project.tags.filter((tag) => !tags.some((tag2) => tag.id === tag2.id))
        : []

    if (addTags.length > 0) {
      await Promise.all(
        addTags.map(async (tag) => {
          await addTag({
            variables: {
              input: {
                projectId: toInt(project.id),
                tagId: tag.id,
              },
            },
          })
        }),
      )
    }

    if (removeTags.length > 0) {
      await Promise.all(
        removeTags.map(async (tag) => {
          await removeTag({
            variables: {
              input: {
                projectId: toInt(project.id),
                tagId: tag.id,
              },
            },
          })
        }),
      )
    }
  }

  const loading = addTagLoading || removeTagLoading

  return {
    tags,
    setTags,
    saveTags,
    loading,
  }
}
