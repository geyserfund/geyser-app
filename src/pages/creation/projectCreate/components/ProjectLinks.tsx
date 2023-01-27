import { useMutation } from '@apollo/client'
import { Box, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ProjectLinkInput } from '../../../../components/inputs'
import { Body2, Caption } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'
import {
  MUTATION_ADD_PROJECT_LINK,
  MUTATION_REMOVE_PROJECT_LINK,
} from '../../../../graphql/mutations'
import { getIconForLink } from '../../../../helpers/getIconForLinks'
import { Maybe, Project, ProjectLinkMutationInput } from '../../../../types'
import { toInt, useNotification, validUrl } from '../../../../utils'

interface ProjectLinksProps {
  links: string[]
  setLinks: (_: string[]) => void
}

export const useProjectLinks = ({ project }: { project: Project }) => {
  const [links, setLinks] = useState<string[]>([''])

  const { toast } = useNotification()

  const [addLink] = useMutation<ProjectLinkMutationInput>(
    MUTATION_ADD_PROJECT_LINK,
    {
      onError() {
        toast({
          title: 'Error adding project link',
          status: 'error',
        })
      },
    },
  )

  const [removeLink] = useMutation<ProjectLinkMutationInput>(
    MUTATION_REMOVE_PROJECT_LINK,
    {
      onError() {
        toast({
          title: 'Error removing project link',
          status: 'error',
        })
      },
    },
  )

  const handleLinks = async () => {
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

  return { links, setLinks, handleLinks }
}

export const ProjectLinks = ({ links, setLinks }: ProjectLinksProps) => {
  const rowStyles = { width: '100%', alignItems: 'flex-start', spacing: '5px' }

  const [linkError, setLinkError] = useState<any>({})

  const handleClose = (val: Maybe<string>) => {
    const newLinks = links.filter((link) => link !== val)
    setLinks(newLinks)
  }

  const addNewLink = () => {
    if (links[links.length - 1] === '') {
      return
    }

    setLinks([...links, ''])
  }

  useEffect(() => {
    if (links) {
      if (links && links.length > 1 && links[0] === '') {
        const newList = links.filter((val) => val) as string[]
        setLinks(newList)
      }
    }
  }, [links])

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target
    if (!value || validUrl.test(value)) {
      setLinkError({ ...linkError, [index]: false })
    } else {
      setLinkError({ ...linkError, [index]: true })
    }

    const newLinkList = links.map((val, i) => (i === index ? value : val))
    setLinks(newLinkList)
  }

  return (
    <VStack {...rowStyles}>
      <Body2>Project links</Body2>
      <Caption>Click add link to add up to 7 different links.</Caption>
      {links &&
        links.map((link, index) => {
          return (
            <ProjectLinkInput
              key={index}
              leftIcon={getIconForLink(link)}
              handleClose={() => handleClose(link)}
              value={link || ''}
              isError={linkError[index]}
              onChange={(event) => handleChange(index, event)}
            />
          )
        })}
      <Box w="full" paddingTop="10px">
        <ButtonComponent w="full" onClick={addNewLink}>
          Add Project Link
        </ButtonComponent>
      </Box>
    </VStack>
  )
}
