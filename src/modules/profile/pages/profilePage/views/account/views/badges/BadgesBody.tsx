import { HStack, Image, SkeletonText, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '@/modules/profile/state'
import { Body } from '@/shared/components/typography'
import { toInt, useNotification } from '@/utils'

import { ExternalAccountType } from '../../../../../../../../pages/auth'
import { SkeletonLayout } from '../../../../../../../../shared/components/layouts'
import { BadgesGroupUrl } from '../../../../../../../../shared/constants'
import { UserBadgeStatus, useUserBadgesQuery } from '../../../../../../../../types'
import { NostrBadges } from './NostrBadges'

export const BadgesBody = () => {
  const { t } = useTranslation()

  const isEdit = useViewingOwnProfileAtomValue()

  const { toast } = useNotification()

  const { userProfile } = useUserProfileAtom()

  const { data: userBadgesData, loading: userBadgeLoading } = useUserBadgesQuery({
    skip: !userProfile.id,
    variables: { input: { where: { userId: toInt(userProfile.id) } } },
    onError() {
      toast({
        title: 'Error fetching badges',
        description: 'Please refresh the page and try again.',
        status: 'error',
      })
    },
  })

  const userBadges = userBadgesData?.userBadges || []

  const nostrId =
    userProfile.externalAccounts.find((account) => account?.accountType === ExternalAccountType.nostr)?.externalId || ''

  const hasBadgeNoNostrForOwn = userBadges.length > 0 && !nostrId && isEdit

  const showTopSection = hasBadgeNoNostrForOwn || userBadges.length === 0

  const hasBadge = isEdit
    ? userBadges.length > 0
    : userBadges.filter((badge) => badge.status === UserBadgeStatus.Accepted).length > 0

  if (userBadgeLoading) {
    return <BadgesBodySkeleton />
  }

  return (
    <>
      {isEdit && showTopSection && (
        <VStack background="neutral1.3" borderRadius="8px" padding="5px 15px" width="fit-content" alignSelf="center">
          {hasBadgeNoNostrForOwn && <Body light>{t('Login with Nostr to claim the badges you earned!')}</Body>}
        </VStack>
      )}
      {!hasBadge && (
        <VStack
          background="neutral1.3"
          borderRadius="8px"
          padding="5px 15px"
          mt={6}
          width="fit-content"
          alignSelf="center"
        >
          <Body medium>{t('No Geyser badges')}</Body>
        </VStack>
      )}
      {hasBadgeNoNostrForOwn && (
        <HStack w="full" justifyContent="center">
          <Image width="100%" alt="badges-group" src={BadgesGroupUrl} />
        </HStack>
      )}

      {nostrId && <NostrBadges nostrId={nostrId} userBadges={userBadges} isEdit={isEdit} />}
    </>
  )
}

export const BadgesBodySkeleton = () => {
  return (
    <>
      <Wrap spacingX="50px" spacingY="40px" w="full" paddingX={3} justify="center">
        {[1, 2, 3].map((value) => {
          return (
            <WrapItem key={value} display="flex" flexDirection="column" alignItems="center" paddingTop="20px">
              <SkeletonLayout height="70px" width="70px" transform="rotate(-45deg)" />
              <SkeletonText borderRadius="8px" pt="30px" width="full" noOfLines={2} />
            </WrapItem>
          )
        })}
      </Wrap>
    </>
  )
}
