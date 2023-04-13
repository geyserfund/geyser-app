import { VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Body2 } from '../../../../components/typography'
import { useNostrBadges } from '../../../../hooks/useNostrBadges'
import { UserBadge } from '../../../../types'
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

  const {
    badgeIds: nostrBadgeIds,
    loading: nostrBadgesLoading,
    claimABadge,
  } = useNostrBadges(nostrId)

  useEffect(() => {
    if (userBadges.length > 0) {
      const claimedBadges =
        (nostrBadgeIds.length > 0 &&
          userBadges?.filter((userbadge) =>
            nostrBadgeIds.includes(userbadge.badge.uniqueName),
          )) ||
        []

      const unClaimedBadges =
        nostrBadgeIds.length > 0
          ? userBadges?.filter(
              (userbadge) =>
                !nostrBadgeIds.includes(userbadge.badge.uniqueName),
            ) || []
          : userBadges

      setClaimedBadges(claimedBadges)
      setUnClaimedBadges(unClaimedBadges)
    }
  }, [nostrBadgeIds, userBadges])

  const numberOfBadges = nostrBadgeIds?.length || 0

  const getTitleToDisplay = () => {
    return numberOfBadges
      ? `${numberOfBadges} Geyser badges`
      : 'No Geyser badges'
  }

  if (nostrBadgesLoading) {
    return <BadgesBodySkeleton noTop={isEdit} />
  }

  return (
    <>
      {!isEdit && (
        <VStack
          background="neutral.100"
          borderRadius="8px"
          padding="5px 15px"
          width="fit-content"
          alignSelf="center"
        >
          <Body2 color="neutral.900" semiBold>
            {getTitleToDisplay()}
          </Body2>
        </VStack>
      )}

      <Wrap
        w="full"
        spacingX="10px"
        spacingY="40px"
        justify="center"
        overflowY="auto"
      >
        {claimedBadges.map((userBadge) => {
          return (
            <WrapItem key={userBadge.id}>
              <BadgeItem
                isClaimed
                userBadge={userBadge}
                claimABadge={claimABadge}
              />
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
