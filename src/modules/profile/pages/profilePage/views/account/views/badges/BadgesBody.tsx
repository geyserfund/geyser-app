import { Wrap, WrapItem } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { useUserProfileAtom } from '@/modules/profile/state'
import { userBadgesAtom } from '@/modules/profile/state/badgesAtom.ts'
import { toInt, useNotification } from '@/utils'

import { SkeletonLayout } from '../../../../../../../../shared/components/layouts'
import { useUserBadgesQuery } from '../../../../../../../../types'
import { BadgeItem } from './BadgeItem'

export const BadgesBody = () => {
  const { t } = useTranslation()

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

  if (userBadgeLoading) {
    return <BadgesBodySkeleton />
  }

  return (
    <>
      <Wrap w="full" spacingX={2} spacingY={4} justify="start" paddingBottom="20px">
        {userBadges.map((userBadge) => <WrapItem key={userBadge.id}><BadgeItem userBadge={userBadge} handleClick={() => {}} /></WrapItem>)}
      </Wrap>
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
