import { Image, VStack } from '@chakra-ui/react'

// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { ButtonComponent } from '../../../../../../../../components/ui'
import { ClaimABadgeProps } from '../../../../../../../../shared/hooks/useNostrBadges'
import { UserBadge } from '../../../../../../../../types'

interface BadgeItemProps {
  userBadge: UserBadge
  isClaimed?: boolean
  isEdit?: boolean
  claimABadge: (_: ClaimABadgeProps) => void
  handleClick: (badge: UserBadge) => void
}

export const BadgeItem = ({
  userBadge,
  // isClaimed, isEdit, claimABadge,
  handleClick,
}: BadgeItemProps) => {
  // const { t } = useTranslation()
  const { badge } = userBadge

  // const [claiming, setClaiming] = useState(false)
  // const onClaim = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   claimABadge({
  //     userBadgeId: userBadge.id,
  //     badgeId: badge.uniqueName,
  //     badgeAwardId: userBadge.badgeAwardEventId || '',
  //     isClaiming: setClaiming,
  //   })
  // }

  return (
    <VStack
      key={userBadge.id}
      overflow="hidden"
      w="full"
      onClick={() => handleClick(userBadge)}
      _hover={{ cursor: 'pointer' }}
    >
      <Image width="auto" maxWidth="110px" src={badge.image} />
      {/* {
        !isClaimed && isEdit &&
        <ButtonComponent size="sm" primary onClick={onClaim} isLoading={claiming}>
          {t('Claim')}
        </ButtonComponent>
      } */}
    </VStack>
  )
}
