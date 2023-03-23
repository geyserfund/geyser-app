import { Image, VStack } from '@chakra-ui/react'

import { CardLayout } from '../../../components/layouts'
import { Body2, H1, H2 } from '../../../components/typography'
import { BadgesGroupUrl } from '../../../constants'
import { User } from '../../../types'
import { ExternalAccountType } from '../../auth'

export const Badges = ({ user }: { user: User }) => {
  const hasNostr = user.externalAccounts.some(
    (externalAccount) => externalAccount?.type === ExternalAccountType.nostr,
  )
  const numberOfBadges = 5

  const hasBadgeNoNostr = numberOfBadges && !hasNostr
  return (
    <CardLayout padding="20px" maxWidth="540px">
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
        {hasBadgeNoNostr && (
          <Body2 color="neutral.700">
            Login with Nostr to claim the badges you earned!
          </Body2>
        )}
      </VStack>

      {hasBadgeNoNostr && <Image alt="badges-group" src={BadgesGroupUrl} />}
    </CardLayout>
  )
}
