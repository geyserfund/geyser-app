import { Avatar, Button, HStack, SkeletonCircle, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiGear } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { H1 } from '@/shared/components/typography'
import { getExternalAccountsButtons } from '@/shared/utils/user/getExternalAccountsButtons'

import { ConnectAccounts } from '../../../../../../../pages/auth'
import { SkeletonLayout } from '../../../../../../../shared/components/layouts'
import { getPath } from '../../../../../../../shared/constants'
import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../../state'

export const AccountInfo = () => {
  const { t } = useTranslation()

  const { userProfile, isLoading } = useUserProfileAtom()

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  const userAccountToDisplay = userProfile.externalAccounts

  const accountButtonProps = getExternalAccountsButtons({
    accounts: userAccountToDisplay,
  })

  if (isLoading) {
    return <AccountInfoSkeleton />
  }

  return (
    <VStack spacing={3}>
      <HStack w="full" spacing={{ base: 2, lg: 3 }} alignItems={'start'}>
        <Avatar src={`${userProfile.imageUrl}`} h="64px" w="64px" />
        <VStack w="full" alignItems="start">
          <H1 size="2xl" bold>
            {userProfile.username}
          </H1>
          <HStack w="full" justifyContent={'start'} flexWrap={'wrap'}>
            {accountButtonProps.map(({ icon, props, key }) => {
              if (!icon || !props) {
                return
              }

              return (
                <Button
                  key={key}
                  aria-label={`user-external-account-link-${key}`}
                  size={'sm'}
                  variant="soft"
                  colorScheme="neutral1"
                  p={'0'}
                  fontSize="16px"
                  {...props}
                >
                  {icon}
                </Button>
              )
            })}
            <ConnectAccounts user={userProfile} />
          </HStack>
        </VStack>
      </HStack>
      {isViewingOwnProfile && userProfile && (
        <Button
          as={Link}
          to={getPath('userProfileSettings', userProfile.id)}
          width="100%"
          variant="soft"
          colorScheme="neutral1"
          leftIcon={<PiGear />}
        >
          {t('Profile settings')}
        </Button>
      )}
    </VStack>
  )
}

export const AccountInfoSkeleton = () => {
  return (
    <VStack spacing={3}>
      <HStack w="full" spacing={{ base: 2, lg: 3 }} alignItems={'start'}>
        <SkeletonCircle h="64px" w="64px" />
        <VStack w="full" alignItems="start">
          <SkeletonLayout height="30px" w="120px" />
          <HStack w="full" justifyContent={'start'} flexWrap={'wrap'}>
            {[1, 2, 3].map((key) => {
              return <SkeletonLayout key={key} height="24px" w="24px" />
            })}
            <SkeletonLayout height="24px" w="120px" />
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  )
}
