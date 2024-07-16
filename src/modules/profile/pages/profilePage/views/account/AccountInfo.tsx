import { Avatar, Button, SkeletonCircle, SkeletonText, Stack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsGearFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { Body1, H1 } from '../../../../../../components/typography'
import { getPath } from '../../../../../../shared/constants'
import { ConnectAccounts } from '../../../../../../pages/auth'
import { CardLayout, SkeletonLayout } from '../../../../../../shared/components/layouts'
import { useUserProfileAtomValue, useViewingOwnProfileAtomValue } from '../../../../state'
import { ExternalAccountDisplay } from './components/ExternalAccountDisplay'

interface AccountInfoProps {
  isLoading?: boolean
}

export const AccountInfo = ({ isLoading }: AccountInfoProps) => {
  const { t } = useTranslation()

  const userProfile = useUserProfileAtomValue()

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  const userAccountToDisplay = userProfile.externalAccounts

  if (isLoading) {
    return <AccountInfoSkeleton />
  }

  return (
    <>
      <CardLayout
        noMobileBorder
        padding={{ base: '10px', lg: '20px' }}
        direction="column"
        alignItems="start"
        spacing="20px"
      >
        <VStack w="full" alignItems="center" spacing="10px">
          <Avatar
            src={`${userProfile.imageUrl}`}
            h="100px"
            w="100px"
            border="2px solid"
            borderColor="neutral.200 !important"
          />
          <H1>{userProfile.username}</H1>
          {userProfile.bio && (
            <Body1 semiBold color="neutral.600" wordBreak="break-word">
              {userProfile.bio}
            </Body1>
          )}
        </VStack>
        {userAccountToDisplay.length > 0 && (
          <VStack w="full" alignItems="start">
            {userAccountToDisplay.map((externalAccount) => {
              if (externalAccount) {
                return <ExternalAccountDisplay key={externalAccount?.id} account={externalAccount} />
              }
            })}
          </VStack>
        )}
        <ConnectAccounts user={userProfile} />
      </CardLayout>
      {isViewingOwnProfile && userProfile && (
        <>
          <Stack direction="column" w="full" pt="20px" spacing="5px">
            <Button
              as={Link}
              to={getPath('userProfileSettings', userProfile.id)}
              width="100%"
              variant="secondary"
              marginTop="5px"
              leftIcon={<BsGearFill />}
            >
              {t('Settings')}
            </Button>
          </Stack>
        </>
      )}
    </>
  )
}

export const AccountInfoSkeleton = () => {
  return (
    <CardLayout padding="20px" direction="column" justifyContent={'center'} alignItems="center" spacing="20px">
      <SkeletonCircle height="100px" width="100px" />
      <SkeletonLayout height="42px" width="60%" />

      <SkeletonText height="32px" width="100%" />

      <SkeletonLayout height="32px" width="100%" />
      <SkeletonLayout height="32px" width="100%" />

      <SkeletonLayout height="32px" width="100%" />
    </CardLayout>
  )
}
