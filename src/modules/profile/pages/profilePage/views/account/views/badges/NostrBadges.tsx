import { Image, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { GenericHeroCardUrl } from '@/shared/constants'
import { useModal } from '@/shared/hooks'

import { useNostrBadges } from '../../../../../../../../shared/hooks/useNostrBadges'
import { UserBadge } from '../../../../../../../../types'
import { BadgeItem } from './BadgeItem'
import { BadgesBodySkeleton } from './BadgesBody'
import { MediaCarouselForCards } from './MediaCarouselForCards'

export const NostrBadges = ({
  nostrId,
  userBadges,
  isEdit,
}: {
  nostrId: string
  userBadges: UserBadge[]
  isEdit: boolean
}) => {
  const [claimedBadges, setClaimedBadges] = useState<UserBadge[]>([])
  const [unClaimedBadges, setUnClaimedBadges] = useState<UserBadge[]>([])

  const { badgeIds: nostrBadgeIds, loading: nostrBadgesLoading, claimABadge } = useNostrBadges(nostrId)

  const itemsModal = useModal<{ currentIndex: number }>()

  useEffect(() => {
    if (userBadges.length > 0) {
      const claimedBadges =
        (nostrBadgeIds.length > 0 &&
          userBadges?.filter((userbadge) => nostrBadgeIds.includes(userbadge.badge.uniqueName))) ||
        []

      const unClaimedBadges =
        nostrBadgeIds.length > 0
          ? userBadges?.filter((userbadge) => !nostrBadgeIds.includes(userbadge.badge.uniqueName)) || []
          : userBadges

      setClaimedBadges(claimedBadges)
      setUnClaimedBadges(unClaimedBadges)
    }
  }, [nostrBadgeIds, userBadges])

  if (nostrBadgesLoading) {
    return <BadgesBodySkeleton />
  }

  const totalBadgeLinks = userBadges.map((userBadge) => userBadge.badge.image) || []

  const handleClick = (badge: UserBadge) => {
    const currentIndex = (userBadges.findIndex((userBadge) => userBadge.id === badge.id) || 0) + 1
    itemsModal.onOpen({ currentIndex })
  }

  const handleClickHeroCard = () => {
    itemsModal.onOpen({ currentIndex: 0 })
  }

  return (
    <>
      <Wrap w="full" spacingX={2} spacingY={4} justify="start" paddingBottom="20px">
        <WrapItem>
          <VStack overflow="hidden" w="full" onClick={handleClickHeroCard} _hover={{ cursor: 'pointer' }}>
            <Image width="auto" maxWidth="110px" src={GenericHeroCardUrl} />
          </VStack>
        </WrapItem>

        {claimedBadges.map((userBadge) => {
          return (
            <WrapItem key={userBadge.id}>
              <BadgeItem isClaimed userBadge={userBadge} claimABadge={claimABadge} handleClick={handleClick} />
            </WrapItem>
          )
        })}
        {unClaimedBadges.map((userBadge) => {
          return (
            <WrapItem key={userBadge.id}>
              <BadgeItem
                userBadge={userBadge}
                claimABadge={claimABadge}
                isEdit={nostrId ? isEdit : false}
                handleClick={handleClick}
              />
            </WrapItem>
          )
        })}
      </Wrap>

      {itemsModal.isOpen && (
        <MediaCarouselForCards
          title={t('Geyser Cards')}
          description={t('Geyser Cards celebrate your achievements across the Bitcoin landscape. ')}
          imageLinkList={totalBadgeLinks}
          size="md"
          bodyProps={{
            as: VStack,
            gap: 4,
          }}
          {...itemsModal}
        />
      )}
    </>
  )
}
