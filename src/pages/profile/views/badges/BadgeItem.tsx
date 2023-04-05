import { Image, VStack } from '@chakra-ui/react'
import { useState } from 'react'

import { ButtonComponent } from '../../../../components/ui'
import { ClaimABadgeProps, NostrBadge } from '../../../../hooks/useNostrBadges'

interface BadgeItemProps {
  userBadge: NostrBadge
  isClaimed?: boolean
  claimABadge: (_: ClaimABadgeProps) => void
}

export const BadgeItem = ({
  userBadge,
  isClaimed,
  claimABadge,
}: BadgeItemProps) => {
  const [claiming, setClaiming] = useState(false)
  const handleClick = () => {
    claimABadge({
      badgeId: userBadge.id,
      isClaiming: setClaiming,
    })
  }

  return (
    <VStack key={userBadge.id} overflow="hidden" spacing="0px">
      <Image width="175px" maxWidth="175px" src={userBadge.image} />
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
