import { Box, HStack, Link, Tooltip } from '@chakra-ui/react'
import { BsLink45Deg } from 'react-icons/bs'

import { IconButtonComponent } from '../../../../components/ui'
import { getIconForLink } from '../../../../helpers/getIconForLinks'
import { colors } from '../../../../styles'

export const ProjectLinks = ({ links }: { links: string[] }) => {
  const hasLinks = links?.length > 0

  if (!hasLinks) {
    return null
  }

  return (
    <HStack spacing="12px">
      <Tooltip label={'Links'} placement="top">
        <Box>
          <BsLink45Deg color={colors.neutral600} fontSize="22px" />
        </Box>
      </Tooltip>
      <HStack>
        {links.map((link) => {
          const Icon = getIconForLink(link)
          return (
            <IconButtonComponent
              size="sm"
              variant="ghost"
              aria-label="link-icon"
              key={link}
              as={Link}
              href={link || ''}
              isExternal
              noBorder
            >
              <Icon fontSize="20px" />
            </IconButtonComponent>
          )
        })}
      </HStack>
    </HStack>
  )
}
