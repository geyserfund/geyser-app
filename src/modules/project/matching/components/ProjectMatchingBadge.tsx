import { Badge, BadgeProps } from '@chakra-ui/react'

import { getProjectMatchingBadgeLabel } from '../utils/projectMatching'
import { ProjectMatchingType } from '@/types'

type ProjectMatchingBadgeProps = {
  matchingType?: ProjectMatchingType | null
} & BadgeProps

export const ProjectMatchingBadge = ({ matchingType, ...props }: ProjectMatchingBadgeProps) => {
  return (
    <Badge
      colorScheme="amber"
      variant="soft"
      borderRadius="full"
      px={3}
      py={1}
      fontWeight="semibold"
      textTransform="none"
      {...props}
    >
      {getProjectMatchingBadgeLabel(matchingType)}
    </Badge>
  )
}
