import { Button, HStack, Image, VStack, Wrap } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../components/layouts'
import { Body2, H2 } from '../../../components/typography'
import Loader from '../../../components/ui/Loader'
import { BadgesGroupUrl, getPath } from '../../../constants'
import { NostrBadges, useNostrBadges } from '../../../hooks/useNostrBadges'
import { User } from '../../../types'
import { ExternalAccountType } from '../../auth'

export const Badges = ({
  userProfile,
  isEdit,
}: {
  userProfile: User
  isEdit: boolean
}) => {
  const { badges, loading } = useNostrBadges(
    'c849ecee7b8e350249cee3b15bba5a1dc73e70dea3ddafa0787d128db6c048fe',
  )

  const hasNostr = userProfile.externalAccounts.some(
    (externalAccount) => externalAccount?.type === ExternalAccountType.nostr,
  )
  const numberOfBadges = badges.length

  const hasBadgeNoNostrForOwn = badges.length > 0 && !hasNostr && isEdit

  if (loading) {
    return <Loader />
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

      <Button as={Link} to={getPath('badges')}>
        {' '}
        Go to Badges page
      </Button>
    </CardLayout>
  )
}

export const ClaimBadge = ({ badges }: { badges: NostrBadges }) => {
  return (
    <Wrap w="full">
      <VStack></VStack>
    </Wrap>
  )
}
