import { useQuery } from '@apollo/client'
import { Button, HStack, Image, VStack, Wrap } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CardLayout, SkeletonLayout } from '../../../components/layouts'
import { Body2, H2 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import { BadgesGroupUrl, getPath } from '../../../constants'
import { QUERY_GET_USER_BADGES } from '../../../graphql/queries/badges'
import { ClaimABadgeProps, useNostrBadges } from '../../../hooks/useNostrBadges'
import { User, UserBadge } from '../../../types'
import { toInt } from '../../../utils'
import { ExternalAccountType } from '../../auth'

export const Badges = ({
  userProfile,
  isEdit,
  isLoading,
}: {
  userProfile: User
  isEdit: boolean
  isLoading: boolean
}) => {
  const { data: userBadgesData, loading: userBadgeLoading } = useQuery<{
    userBadges: UserBadge[]
  }>(QUERY_GET_USER_BADGES, {
    variables: { input: { where: { userId: toInt(userProfile.id) } } },
  })

  const renderBadgesBody = () => {
    if (userBadgeLoading || isLoading) {
      return <BadgesBodySkeleton />
    }

    return (
      <BadgesBody
        {...{
          userBadges: userBadgesData?.userBadges || [],
          userProfile,
          isEdit,
        }}
      />
    )
  }

  return (
    <CardLayout padding="20px">
      <H2>Badges</H2>
      <Body2 color="neutral.700">
        Geyser badges are earned for launching successful projects, contributing
        to them and being an active community member.{' '}
      </Body2>

      {renderBadgesBody()}

      <Button variant="outlined" as={Link} to={getPath('badges')}>
        {' '}
        Go to Badges page
      </Button>
    </CardLayout>
  )
}

export const BadgesBodySkeleton = () => {
  return (
    <Wrap w="full" justifyContent="space-between">
      <SkeletonLayout height="150px" width="150px" />
      <SkeletonLayout height="150px" width="150px" />
      <SkeletonLayout height="150px" width="150px" />
    </Wrap>
  )
}

interface BadgesBodyProps {
  userBadges: UserBadge[]
  isEdit: boolean
  userProfile: User
}

export const BadgesBody = ({
  userBadges,
  userProfile,
  isEdit,
}: BadgesBodyProps) => {
  const nostrId =
    userProfile.externalAccounts.find(
      (account) => account?.type === ExternalAccountType.nostr,
    )?.externalId || ''
  const hasBadgeNoNostrForOwn = userBadges.length > 0 && !nostrId && isEdit

  const getTitleToDisplay = () => {
    return userBadges.length
      ? `${userBadges.length} Geyser badges`
      : 'No Geyser badges'
  }

  return (
    <>
      <VStack
        background="neutral.100"
        borderRadius="8px"
        padding="5px 15px"
        width="fit-content"
        alignSelf="center"
      >
        {isEdit && (
          <Body2 color="neutral.900" semiBold>
            {getTitleToDisplay()}
          </Body2>
        )}
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

      {nostrId && (
        <RenderBadges
          nostrId={nostrId}
          userBadges={userBadges}
          isEdit={isEdit}
        />
      )}
    </>
  )
}

export const RenderBadges = ({
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
    return <BadgesBodySkeleton />
  }

  return (
    <>
      {!isEdit && (
        <Body2 color="neutral.900" semiBold>
          {getTitleToDisplay()}
        </Body2>
      )}
      <Wrap w="full" justifyContent="space-between">
        {claimedBadges.map((userBadge) => {
          return (
            <BadgeItem
              isClaimed
              key={userBadge.id}
              userBadge={userBadge}
              claimABadge={claimABadge}
            />
          )
        })}
        {isEdit &&
          unClaimedBadges.map((userBadge) => {
            return (
              <BadgeItem
                key={userBadge.id}
                userBadge={userBadge}
                claimABadge={claimABadge}
              />
            )
          })}
      </Wrap>
    </>
  )
}

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
    <VStack key={userBadge.id}>
      <Image width="175px" maxWidth="175px" src={badge.image} />
      <Body2 color="neutral.600" isTruncated>
        {badge.name}
      </Body2>
      {!isClaimed && (
        <ButtonComponent primary onClick={handleClick} isLoading={claiming}>
          Claim
        </ButtonComponent>
      )}
    </VStack>
  )
}
