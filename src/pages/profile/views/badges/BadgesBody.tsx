import { HStack, Image, VStack, Wrap } from '@chakra-ui/react'

import { SkeletonLayout } from '../../../../components/layouts'
import { Body2 } from '../../../../components/typography'
import { BadgesGroupUrl } from '../../../../constants'
import { User, UserBadge } from '../../../../types'
import { ExternalAccountType } from '../../../auth'
import { NostrBadges } from './NostrBadges'

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
      {isEdit && (
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

          {hasBadgeNoNostrForOwn && (
            <Body2 color="neutral.700">
              Login with Nostr to claim the badges you earned!
            </Body2>
          )}
        </VStack>
      )}
      {hasBadgeNoNostrForOwn && (
        <HStack w="full" justifyContent="center">
          <Image maxWidth="400px" alt="badges-group" src={BadgesGroupUrl} />
        </HStack>
      )}

      {nostrId && (
        <NostrBadges
          nostrId={nostrId}
          userBadges={userBadges}
          isEdit={isEdit}
        />
      )}
    </>
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
