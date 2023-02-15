import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import {
  MUTATION_ADD_PROJECT_LINK,
  MUTATION_REMOVE_PROJECT_LINK,
} from '../../graphql/mutations'
import { MutationInput, Project, ProjectLinkMutationInput } from '../../types'
import { toInt, useNotification } from '../../utils'

export const useProjectLinksState = ({
  project,
  updateProject,
}: {
  project: Project
  updateProject?: (_: Project) => void
}) => {
  const [links, _setLinks] = useState<string[]>([''])

  const [linkError, setLinkError] = useState<boolean[]>([false])

  const { toast } = useNotification()

  useEffect(() => {
    if (project?.links?.length > 0) {
      const newLinks = project.links.filter((val) => val) as string[]
      _setLinks(newLinks)
    }
  }, [project])

  const [addLink] = useMutation<
    { projectLinkAdd: Project },
    MutationInput<ProjectLinkMutationInput>
  >(MUTATION_ADD_PROJECT_LINK, {
    onError() {
      toast({
        title: 'Error adding project link',
        status: 'error',
      })
    },
    onCompleted(data) {
      if (updateProject) {
        updateProject(data.projectLinkAdd)
      }
    },
  })

  const [removeLink] = useMutation<
    { projectLinkRemove: Project },
    MutationInput<ProjectLinkMutationInput>
  >(MUTATION_REMOVE_PROJECT_LINK, {
    onError() {
      toast({
        title: 'Error removing project link',
        status: 'error',
      })
    },
    onCompleted(data) {
      if (updateProject) {
        updateProject(data.projectLinkRemove)
      }
    },
  })

  const setLinks = (links: string[]) => {
    const errors = [] as boolean[]

    links.map((link, index) => {
      try {
        const url = new URL(link)

        const isDuplicate = links.indexOf(link) !== index
        if (url.protocol.includes('https') && !isDuplicate) {
          errors.push(false)
        } else {
          errors.push(true)
        }
      } catch (error) {
        errors.push(true)
      }
    })

    setLinkError(errors)

    _setLinks(links)
  }

  const saveLinks = async () => {
    const finalLinks = links.filter((link) => link)
    const addLinks =
      project?.links?.length > 0
        ? finalLinks.filter((link) => !project.links.includes(link))
        : finalLinks
    const removeLinks =
      project?.links?.length > 0
        ? project.links.filter((link) => !finalLinks.includes(link as string))
        : []

    if (addLinks.length > 0) {
      await Promise.all(
        addLinks.map(async (link) => {
          await addLink({
            variables: {
              input: {
                projectId: toInt(project.id),
                link,
              },
            },
          })
        }),
      )
    }

    if (removeLinks.length > 0) {
      await Promise.all(
        removeLinks.map(async (link) => {
          await removeLink({
            variables: {
              input: {
                projectId: toInt(project.id),
                link,
              },
            },
          })
        }),
      )
    }
  }

  return { links, setLinks, linkError, saveLinks }
}
