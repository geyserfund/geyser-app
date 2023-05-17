import { Box, Button } from '@chakra-ui/react'
import { useEffect } from 'react'

import { ProjectLinkInput } from '../../../components/inputs'
import { getIconForLink } from '../../../helpers/getIconForLinks'
import { Maybe } from '../../../types'
import { FormInputContainer } from './FormInputContainer'

interface ProjectLinksProps {
  links: string[]
  setLinks: (_: string[]) => void
  linkError?: boolean[]
}

export const ProjectLinks = ({
  links = [],
  setLinks,
  linkError = [],
}: ProjectLinksProps) => {
  const handleClose = (val: Maybe<string>) => {
    const newLinks = links.filter((link) => link !== val)
    setLinks(newLinks)
  }

  const addNewLink = () => {
    if (links[links.length - 1] === '' || links.length >= 7) {
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
  }, [links, setLinks])

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target
    const newLinkList = links.map((val, i) => (i === index ? value : val))
    setLinks(newLinkList)
  }

  return (
    <FormInputContainer
      title="Project links"
      subtitle="Connect your sites so viewers can see more proof of your work"
    >
      <Box w="full">
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
      </Box>
      <Button
        size="sm"
        variant="secondary"
        w="full"
        onClick={addNewLink}
        isDisabled={links.length >= 7}
      >
        Add Project Link
      </Button>
    </FormInputContainer>
  )
}
