import { Image, VStack } from '@chakra-ui/react'

import { UserBadge } from '../../../../../../../../types'

type BadgeItemProps = {
  userBadge: UserBadge
  handleClick: (badge: UserBadge) => void
}

export const BadgeItem = ({ userBadge, handleClick }: BadgeItemProps) => {
  const { badge } = userBadge

  return (
    <VStack overflow="hidden" w="full" onClick={() => handleClick(userBadge)} _hover={{ cursor: 'pointer' }}>
      <Image width="auto" maxWidth="110px" src={badge.image} alt={`${badge.name} badge image`} />
    </VStack>
  )
}
