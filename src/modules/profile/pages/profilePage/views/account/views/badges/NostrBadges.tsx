import { VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { useNostrBadges } from '../../../../../../../../shared/hooks/useNostrBadges'
import { UserBadge } from '../../../../../../../../types'
import { BadgeItem } from './BadgeItem'
import { BadgesBodySkeleton } from './BadgesBody'

export const NostrBadges = ({
  nostrId,
  userBadges,
  isEdit,
}: {
  nostrId: string
  userBadges: UserBadge[]
  isEdit: boolean
}) => {
  const { t } = useTranslation()
  const [claimedBadges, setClaimedBadges] = useState<UserBadge[]>([])
  const [unClaimedBadges, setUnClaimedBadges] = useState<UserBadge[]>([])

  const { badgeIds: nostrBadgeIds, loading: nostrBadgesLoading, claimABadge } = useNostrBadges(nostrId)

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

  const numberOfBadges = nostrBadgeIds?.length || 0

  const isEmpty = numberOfBadges === 0

  if (nostrBadgesLoading) {
    return <BadgesBodySkeleton />
  }

  return (
    <>
      {!isEdit && isEmpty && (
        <VStack background="neutral1.3" borderRadius="8px" padding="5px 15px" width="fit-content" alignSelf="center">
          <Body medium>{t('No Geyser badges')}</Body>
        </VStack>
      )}

      <Wrap w="full" spacing={2} justify="start" paddingBottom="20px">
        {claimedBadges.map((userBadge) => {
          return (
            <WrapItem key={userBadge.id}>
              <BadgeItem isClaimed userBadge={userBadge} claimABadge={claimABadge} />
            </WrapItem>
          )
        })}
        {isEdit &&
          unClaimedBadges.map((userBadge) => {
            return (
              <WrapItem key={userBadge.id}>
                <BadgeItem userBadge={userBadge} claimABadge={claimABadge} />
              </WrapItem>
            )
          })}
      </Wrap>
    </>
  )
}
