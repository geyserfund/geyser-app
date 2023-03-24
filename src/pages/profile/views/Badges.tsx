import { useQuery } from '@apollo/client'
import { Button, HStack, Image, VStack, Wrap } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../components/layouts'
import { Body2, H2 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { BadgesGroupUrl, getPath } from '../../../constants'
import { QUERY_GET_USER_BADGES } from '../../../graphql/queries/badges'
import { useNostrBadges } from '../../../hooks/useNostrBadges'
import { User, UserBadge } from '../../../types'
import { ExternalAccountType } from '../../auth'

export const Badges = ({
  userProfile,
  isEdit,
}: {
  userProfile: User
  isEdit: boolean
}) => {
  const { badges, loading } = useNostrBadges(
    userProfile.externalAccounts.find(
      (account) => account?.type === ExternalAccountType.nostr,
    )?.externalId || '',
  )

  const { data: userBadgesData, loading: userBadgeLoading } = useQuery<{
    userBadges: UserBadge[]
  }>(QUERY_GET_USER_BADGES, {
    variables: { input: { where: { userId: userProfile.id } } },
  })

  const hasNostr = userProfile.externalAccounts.some(
    (externalAccount) => externalAccount?.type === ExternalAccountType.nostr,
  )

  const numberOfBadges = badges.length

  const hasBadgeNoNostrForOwn = badges.length > 0 && !hasNostr && isEdit

  if (loading || userBadgeLoading) {
    return <Loader />
  }

  const userBadges = userBadgesData?.userBadges

  const claimedBadges =
    userBadges?.filter((userbadge) =>
      badges.some((badge) => badge.name === userbadge.badge.uniqueName),
    ) || []

  const unClaimedBadges =
    userBadges?.filter(
      (userbadge) =>
        !badges.some((badge) => badge.name === userbadge.badge.uniqueName),
    ) || []

  return (
    <CardLayout padding="20px">
      <H2>Badges</H2>
      <Body2 color="neutral.700">
        Geyser badges are earned for launching successful projects, contributing
        to them and being an active community member.{' '}
      </Body2>

      <VStack background="neutral.100" borderRadius="8px" padding="10px 15px">
        <Body2 color="neutral.900" semiBold>
          {numberOfBadges
            ? `${numberOfBadges} Geyser badges`
            : 'No Geyser badges'}
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
          <RenderBadges badges={claimedBadges} isClaimed />
          <RenderBadges badges={unClaimedBadges} />
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
}: {
  badges: UserBadge[]
  isClaimed?: boolean
}) => {
  return (
    <Wrap w="full">
      {badges.map((badge) => {
        return (
          <VStack key={badge.id}>
            <Image src={badge.badge.image} />
            {!isClaimed && (
              <ButtonComponent primary isDisabled>
                Claim
              </ButtonComponent>
            )}
          </VStack>
        )
      })}
    </Wrap>
  )
}
