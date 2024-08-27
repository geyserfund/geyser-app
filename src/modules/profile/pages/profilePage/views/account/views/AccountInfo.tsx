import {
  Avatar,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  SkeletonCircle,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import { PiGear } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { H1 } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import {
  ExternalAccountButtonReturnType,
  getExternalAccountsButtons,
} from '@/shared/utils/user/getExternalAccountsButtons'
import { toInt, useNotification } from '@/utils'

import { ConnectAccounts, ExternalAccountType } from '../../../../../../../pages/auth'
import { SkeletonLayout } from '../../../../../../../shared/components/layouts'
import { getPath } from '../../../../../../../shared/constants'
import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../../state'
import { RemoveExternalAccountModal } from '../../../components/RemoveExternalAccountModal'
import { useAccountUnlink } from '../hooks/useAccountUnlink'

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
            {accountButtonProps.map((accountButton) => {
              return <AccountInfoButton key={accountButton.key} accountInfoProps={accountButton} />
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

const AccountInfoButton = ({ accountInfoProps }: { accountInfoProps: ExternalAccountButtonReturnType }) => {
  const { account, icon, key, props } = accountInfoProps

  const removeAccountModal = useModal()

  const toast = useNotification()

  const { isLoading, handleAccountUnlink, isEdit } = useAccountUnlink({
    accountId: toInt(account.id),
    accountType: account.accountType as ExternalAccountType,
    mutationProps: {
      onError(error) {
        toast.error({
          title: 'Failed to unlink account',
          description: `${error.message}`,
        })
      },
      onCompleted() {
        removeAccountModal.onClose()
      },
    },
  })

  if (isEdit) {
    return (
      <>
        <Popover trigger="hover">
          <PopoverTrigger>
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
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />

              <PopoverCloseButton />
              <PopoverBody>
                <Button variant="solid" colorScheme="error" isLoading={isLoading} onClick={removeAccountModal.onOpen}>
                  {t('Disconnect')}
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
        <RemoveExternalAccountModal
          {...removeAccountModal}
          type={account.accountType as ExternalAccountType}
          confirm={() => {
            handleAccountUnlink()
          }}
        />
      </>
    )
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
