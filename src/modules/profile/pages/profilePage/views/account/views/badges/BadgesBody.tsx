import { VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '@/modules/profile/state'
import { userBadgesAtom } from '@/modules/profile/state/badgesAtom.ts'
import { Body } from '@/shared/components/typography'
import { toInt, useNotification } from '@/utils'

import { ExternalAccountType } from '../../../../../../../../modules/auth'
import { SkeletonLayout } from '../../../../../../../../shared/components/layouts'
import { useUserBadgesQuery } from '../../../../../../../../types'
import { NostrBadges } from './NostrBadges'

export const BadgesBody = () => {
  const { t } = useTranslation()

  const isEdit = useViewingOwnProfileAtomValue()

  const { toast } = useNotification()

  const { userProfile } = useUserProfileAtom()
  const [userBadges, setUserBadges] = useAtom(userBadgesAtom)

  const { loading: userBadgeLoading } = useUserBadgesQuery({
    skip: !userProfile.id,
    variables: { input: { where: { userId: toInt(userProfile.id) } } },
    onError() {
      toast({
        title: t('Error fetching badges'),
        description: t('Please refresh the page and try again.'),
        status: 'error',
      })
    },
    onCompleted(data) {
      setUserBadges(data.userBadges)
    },
  })

  const nostrId =
    userProfile.externalAccounts.find((account) => account?.accountType === ExternalAccountType.nostr)?.externalId || ''

  const hasBadgeNoNostrForOwn = userBadges.length > 0 && !nostrId && isEdit

  if (userBadgeLoading) {
    return <BadgesBodySkeleton />
  }

  return (
    <>
      {isEdit && hasBadgeNoNostrForOwn && (
        <VStack background="neutral1.3" borderRadius="8px" padding="5px 15px" width="fit-content" alignSelf="center">
          <Body light>{t('Login with Nostr to claim the badges you earned!')}</Body>
        </VStack>
      )}

      <NostrBadges nostrId={nostrId} userBadges={userBadges} isEdit={isEdit} />
    </>
  )
}

export const BadgesBodySkeleton = () => {
  return (
    <>
      <Wrap spacingY="40px" w="full" paddingX={0} justify="center">
        {[1, 2, 3].map((value) => {
          return (
            <WrapItem key={value} display="flex" flexDirection="column" alignItems="center" paddingTop="20px">
              <SkeletonLayout height="140px" width="109px" />
            </WrapItem>
          )
        })}
      </Wrap>
    </>
  )
}
