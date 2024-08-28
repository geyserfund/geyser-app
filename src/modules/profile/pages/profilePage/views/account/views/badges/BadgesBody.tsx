import { HStack, Image, SkeletonText, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { ExternalAccountType } from '../../../../../../../../pages/auth'
import { SkeletonLayout } from '../../../../../../../../shared/components/layouts'
import { BadgesGroupUrl } from '../../../../../../../../shared/constants'
import { UserBadge, UserForProfilePageFragment } from '../../../../../../../../types'
import { NostrBadges } from './NostrBadges'

interface BadgesBodyProps {
  userBadges: UserBadge[]
  isEdit: boolean
  userProfile: UserForProfilePageFragment
}

export const BadgesBody = ({ userBadges, userProfile, isEdit }: BadgesBodyProps) => {
  const { t } = useTranslation()
  const nostrId =
    userProfile.externalAccounts.find((account) => account?.accountType === ExternalAccountType.nostr)?.externalId || ''
  const hasBadgeNoNostrForOwn = userBadges.length > 0 && !nostrId && isEdit

  const showTopSection = hasBadgeNoNostrForOwn || userBadges.length === 0

  return (
    <>
      {isEdit && showTopSection && (
        <VStack background="neutral1.3" borderRadius="8px" padding="5px 15px" width="fit-content" alignSelf="center">
          {userBadges.length === 0 && <Body medium>{t('No Geyser badges')}</Body>}

          {hasBadgeNoNostrForOwn && <Body light>{t('Login with Nostr to claim the badges you earned!')}</Body>}
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
