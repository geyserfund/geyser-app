import {
  HStack,
  Image,
  SkeletonText,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

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
      (account) => account?.accountType === ExternalAccountType.nostr,
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
          <Image maxWidth="350px" alt="badges-group" src={BadgesGroupUrl} />
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

export const BadgesBodySkeleton = ({ noTop }: { noTop?: boolean }) => {
  return (
    <>
      {!noTop && (
        <SkeletonLayout height="30px" width="150px" alignSelf="center" />
      )}
      <Wrap
        spacingX="90px"
        spacingY="40px"
        w="full"
        paddingX="30px"
        justify="center"
      >
        {[1, 2].map((value) => {
          return (
            <WrapItem
              key={value}
              display="flex"
              flexDirection="column"
              alignItems="center"
              paddingTop="20px"
            >
              <SkeletonLayout
                height="100px"
                width="100px"
                transform="rotate(-45deg)"
              />
              <SkeletonText
                borderRadius="8px"
                pt="30px"
                width="full"
                noOfLines={2}
              />
            </WrapItem>
          )
        })}
      </Wrap>
    </>
  )
}
