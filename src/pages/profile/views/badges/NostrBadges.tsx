import { GridItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Body2 } from '../../../../components/typography'
import { NostrBadge, useNostrBadges } from '../../../../hooks/useNostrBadges'
import { BadgeItem } from './BadgeItem'
import { BadgesBodySkeleton } from './BadgesBody'

export const NostrBadges = ({
  nostrId,
  isEdit,
}: {
  nostrId: string
  isEdit: boolean
}) => {
  const [claimedBadges, setClaimedBadges] = useState<NostrBadge[]>([])
  const [unClaimedBadges, setUnClaimedBadges] = useState<NostrBadge[]>([])

  const {
    badges,
    claimedBadgeIds: nostrBadgeIds,
    loading: nostrBadgesLoading,
    claimABadge,
  } = useNostrBadges(nostrId)

  useEffect(() => {
    if (badges.length > 0) {
      const claimedBadges =
        (nostrBadgeIds.length > 0 &&
          badges?.filter((badge) => nostrBadgeIds.includes(badge.id))) ||
        []

      const unClaimedBadges =
        nostrBadgeIds.length > 0
          ? badges?.filter((badges) => !nostrBadgeIds.includes(badges.id)) || []
          : badges

      setClaimedBadges(claimedBadges)
      setUnClaimedBadges(unClaimedBadges)
    }
  }, [nostrBadgeIds, badges])

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

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 2, xl: 3 }}
        spacingX="20px"
        spacingY="40px"
      >
        {claimedBadges.map((userBadge) => {
          return (
            <GridItem key={userBadge.id}>
              <BadgeItem
                isClaimed
                userBadge={userBadge}
                claimABadge={claimABadge}
              />
            </GridItem>
          )
        })}
        {isEdit &&
          unClaimedBadges.map((userBadge) => {
            return (
              <GridItem key={userBadge.id}>
                <BadgeItem userBadge={userBadge} claimABadge={claimABadge} />
              </GridItem>
            )
          })}
      </SimpleGrid>
    </>
  )
}
