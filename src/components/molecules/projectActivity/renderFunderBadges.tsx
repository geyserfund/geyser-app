import { Badge } from '@chakra-ui/react'
import { ReactElement } from 'react'

import { IBadge } from '../../../interfaces'

export const renderFunderBadges = (badges: IBadge[]): ReactElement[] => {
  return badges.map((badge, index) => <Badge key={index}>{badge.badge}</Badge>)
}
