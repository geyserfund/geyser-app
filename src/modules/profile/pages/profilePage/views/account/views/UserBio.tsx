import { SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useUserProfileAtom } from '@/modules/profile/state'
import { Body } from '@/shared/components/typography'

export const UserBio = () => {
  const { userProfile, isLoading } = useUserProfileAtom()

  if (isLoading) {
    return <UserBioSkeleton />
  }

  if (!userProfile.bio) return null

  return (
    <VStack w="full" alignItems={'start'}>
      <Body size="xl" medium>
        {t('Bio')}
      </Body>
      <Body>{userProfile.bio}</Body>
    </VStack>
  )
}

export const UserBioSkeleton = () => {
  return (
    <VStack w="full" alignItems={'start'}>
      <Body size="xl" medium>
        {t('Bio')}
      </Body>
      <Body>
        <SkeletonText noOfLines={3} spacing="4" />
      </Body>
    </VStack>
  )
}
