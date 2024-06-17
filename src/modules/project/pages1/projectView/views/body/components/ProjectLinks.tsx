import { HStack, Link } from '@chakra-ui/react'
import { BsLink45Deg } from 'react-icons/bs'

import { IconButtonComponent } from '../../../../../../../components/ui'
import { getIconForLink } from '../../../../../../../helpers/getIconForLinks'
import { SummaryInfoLine } from './SummaryInfoLine'

export const ProjectLinks = ({ links }: { links: string[] }) => {
  const hasLinks = links?.length > 0

  if (!hasLinks) {
    return null
  }

  return (
    <SummaryInfoLine
      label="Links"
      icon={
        <span>
          <BsLink45Deg color={'neutral.600'} fontSize="18px" />
        </span>
      }
    >
      <HStack spacing="5px">
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
    </SummaryInfoLine>
  )
}
