import { useQuery } from '@apollo/client'
import { Button, HStack, Image, VStack, Wrap } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../components/layouts'
import { Body2, H2 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { BadgesGroupUrl, getPath } from '../../../constants'
import { QUERY_GET_USER_BADGES } from '../../../graphql/queries/badges'
import { ClaimABadgeProps, useNostrBadges } from '../../../hooks/useNostrBadges'
import { User, UserBadge } from '../../../types'
import { toInt } from '../../../utils'
import { ExternalAccountType } from '../../auth'

export const Badges = ({
  userProfile,
  isEdit,
}: {
  userProfile: User
  isEdit: boolean
}) => {
  const { badges, loading, claimABadge } = useNostrBadges(
    userProfile.externalAccounts.find(
      (account) => account?.type === ExternalAccountType.nostr,
    )?.externalId || '',
  )

  const { data: userBadgesData, loading: userBadgeLoading } = useQuery<{
    userBadges: UserBadge[]
  }>(QUERY_GET_USER_BADGES, {
    variables: { input: { where: { userId: toInt(userProfile.id) } } },
  })

  const hasNostr = userProfile.externalAccounts.some(
    (externalAccount) => externalAccount?.type === ExternalAccountType.nostr,
  )

  if (loading || userBadgeLoading) {
    return <Loader />
  }

  const userBadges = userBadgesData?.userBadges || []
  const hasBadgeNoNostrForOwn = userBadges.length > 0 && !hasNostr && isEdit
  const numberOfBadges = badges?.length || 0

  const claimedBadges =
    (badges.length > 0 &&
      userBadges?.filter((userbadge) =>
        badges.some((badge) => badge.name === userbadge.badge.uniqueName),
      )) ||
    []

  const unClaimedBadges =
    badges.length > 0
      ? userBadges?.filter(
          (userbadge) =>
            !badges.some((badge) => badge.name === userbadge.badge.uniqueName),
        ) || []
      : userBadges

  const getTitleToDisplay = () => {
    if (isEdit) {
      return userBadges.length
        ? `${userBadges.length} Geyser badges`
        : 'No Geyser badges'
    }

    return numberOfBadges
      ? `${numberOfBadges} Geyser badges`
      : 'No Geyser badges'
  }

  return (
    <CardLayout padding="20px">
      <H2>Badges</H2>
      <Body2 color="neutral.700">
        Geyser badges are earned for launching successful projects, contributing
        to them and being an active community member.{' '}
      </Body2>

      <VStack background="neutral.100" borderRadius="8px" padding="10px 15px">
        <Body2 color="neutral.900" semiBold>
          {getTitleToDisplay()}
        </Body2>
        {hasBadgeNoNostrForOwn && (
          <Body2 color="neutral.700">
            Login with Nostr to claim the badges you earned!
          </Body2>
        )}
      </VStack>

      {hasBadgeNoNostrForOwn && (
        <HStack w="full" justifyContent="center">
          <Image maxWidth="400px" alt="badges-group" src={BadgesGroupUrl} />
        </HStack>
      )}

      {hasNostr && (
        <>
          <RenderBadges
            claimABadge={claimABadge}
            badges={claimedBadges}
            isClaimed
          />
          {isEdit && (
            <RenderBadges claimABadge={claimABadge} badges={unClaimedBadges} />
          )}
        </>
      )}

      <Button as={Link} to={getPath('badges')}>
        {' '}
        Go to Badges page
      </Button>
    </CardLayout>
  )
}

export const RenderBadges = ({
  badges,
  isClaimed,
  claimABadge,
}: {
  badges: UserBadge[]
  isClaimed?: boolean
  claimABadge: (_: ClaimABadgeProps) => void
}) => {
  return (
    <Wrap w="full" justifyContent="space-between">
      {badges.map((badge) => {
        const handleClick = () =>
          claimABadge({
            badgeId: badge.badge.uniqueName,
            badgeAwardId: badge.badgeAwardEventId || '',
          })
        return (
          <VStack key={badge.id}>
            <Image maxWidth="175px" src={badge.badge.image} />
            {!isClaimed && (
              <ButtonComponent primary onClick={handleClick}>
                Claim
              </ButtonComponent>
            )}
          </VStack>
        )
      })}
    </Wrap>
  )
}
