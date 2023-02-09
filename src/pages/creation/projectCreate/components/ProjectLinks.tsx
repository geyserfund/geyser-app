import { Box, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'

import { ProjectLinkInput } from '../../../../components/inputs'
import { Body2, Caption } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'
import { getIconForLink } from '../../../../helpers/getIconForLinks'
import { Maybe } from '../../../../types'

interface ProjectLinksProps {
  links: string[]
  setLinks: (_: string[]) => void
  linkError?: boolean[]
}

export const ProjectLinks = ({
  links,
  setLinks,
  linkError = [],
}: ProjectLinksProps) => {
  const rowStyles = { width: '100%', alignItems: 'flex-start', spacing: '5px' }

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
  }, [links])

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target
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
