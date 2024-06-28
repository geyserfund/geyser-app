import { HStack, IconButton, Link } from '@chakra-ui/react'

import { getIconForLink } from '@/helpers/getIconForLinks'

export const ProjectLinks = ({ links }: { links: string[] }) => {
  return (
    <HStack spacing={0.5}>
      {links.map((link) => {
        const Icon = getIconForLink(link)
        return (
          <IconButton
            size="xs"
            variant="outline"
            aria-label="link-icon"
            key={link}
            as={Link}
            href={link || ''}
            isExternal
          >
            <Icon fontSize="12px" />
          </IconButton>
        )
      })}
    </HStack>
  )
}
