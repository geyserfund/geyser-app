import { HStack, IconButton, Link } from '@chakra-ui/react'
import { t } from 'i18next'

import { getIconForLink } from '@/helpers/getIconForLinks'

type ProjectLinksProps = {
  links: string[]
  size?: 'sm' | 'md'
}

export const ProjectLinks = ({ links, size = 'sm' }: ProjectLinksProps) => {
  return (
    <HStack spacing={0.5} flexWrap="wrap">
      {links.map((link) => {
        const Icon = getIconForLink(link)
        return (
          <IconButton
            size={size}
            variant="soft"
            aria-label={t('Open project link')}
            key={link}
            as={Link}
            href={link || ''}
            isExternal
          >
            <Icon fontSize="16px" />
          </IconButton>
        )
      })}
    </HStack>
  )
}
