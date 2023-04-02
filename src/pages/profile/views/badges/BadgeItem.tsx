import { Image, VStack } from '@chakra-ui/react'
import { useState } from 'react'

import { Body2 } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'
import { ClaimABadgeProps } from '../../../../hooks/useNostrBadges'
import { UserBadge } from '../../../../types'

interface BadgeItemProps {
  userBadge: UserBadge
  isClaimed?: boolean
  claimABadge: (_: ClaimABadgeProps) => void
}

export const BadgeItem = ({
  userBadge,
  isClaimed,
  claimABadge,
}: BadgeItemProps) => {
  const { badge } = userBadge

  const [claiming, setClaiming] = useState(false)
  const handleClick = () => {
    claimABadge({
      badgeId: badge.uniqueName,
      badgeAwardId: userBadge.badgeAwardEventId || '',
      isClaiming: setClaiming,
    })
  }

  return (
    <VStack key={userBadge.id} overflow="hidden" spacing="0px">
      <Image width="175px" maxWidth="175px" src={badge.image} />
      {!isClaimed && (
        <ButtonComponent
          size="sm"
          primary
          onClick={handleClick}
          isLoading={claiming}
        >
          Claim
        </ButtonComponent>
      )}
    </VStack>
  )
}
