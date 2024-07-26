import { Button, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { getIconForLink } from '../../../helpers/getIconForLinks'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { Maybe } from '../../../types'
import { ProjectLinkInput } from './components/ProjectLinkInput'

interface ProjectLinksProps {
  links: string[]
  setLinks: (_: string[]) => void
  linkError?: boolean[]
}

export const ProjectLinks = ({ links = [], setLinks, linkError = [] }: ProjectLinksProps) => {
  const { t } = useTranslation()
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

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const newLinkList = links.map((val, i) => (i === index ? value : val))
    setLinks(newLinkList)
  }

  return (
    <FieldContainer
      title={t('Project links')}
      subtitle={t('Connect your sites so viewers can see more proof of your work')}
      info={t('Please provide secure links, starting with https://')}
    >
      <VStack w="full" spacing={3}>
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
        <Button variant="outline" colorScheme="neutral1" w="full" onClick={addNewLink} isDisabled={links.length >= 7}>
          {t('Add Project Link')}
        </Button>
      </VStack>
    </FieldContainer>
  )
}
