import { Wrap, WrapItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

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

  if (nostrBadgesLoading) {
    return <BadgesBodySkeleton />
  }

  return (
    <>
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
