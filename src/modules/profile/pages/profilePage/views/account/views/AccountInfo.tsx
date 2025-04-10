import {
  Button,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  SkeletonCircle,
  useClipboard,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { Link } from 'react-router-dom'

import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar'
import { ProfileText } from '@/shared/components/display/ProfileText.tsx'
import { H1 } from '@/shared/components/typography'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath, GuardiansJewelUrl } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import {
  ExternalAccountButtonReturnType,
  getExternalAccountsButtons,
} from '@/shared/utils/user/getExternalAccountsButtons'
import { toInt, useNotification } from '@/utils'

import { ConnectAccounts, ExternalAccountType } from '../../../../../../../modules/auth'
import { SkeletonLayout } from '../../../../../../../shared/components/layouts'
import { userProfileAtom, useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../../state'
import { RemoveExternalAccountModal } from '../../../components/RemoveExternalAccountModal'
import { useAccountUnlink } from '../hooks/useAccountUnlink'
import { UserVerifiedBadge } from './badges/VerifiedBadge.tsx'
import { UserBio } from './UserBio'

export const AccountInfo = () => {
  const { userProfile, isLoading } = useUserProfileAtom()

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  const { onCopy } = useClipboard(userProfile.username)
  const toast = useNotification()

  // Define color mode values
  const heroIdBg = useColorModeValue('gray.100', 'gray.700')
  const heroIdColor = useColorModeValue('neutral.500', 'neutral.600')
  const heroIdHoverBg = useColorModeValue('gray.200', 'gray.600')

  const userAccountToDisplay = userProfile.externalAccounts

  const accountButtonProps = getExternalAccountsButtons({
    accounts: userAccountToDisplay,
  })

  if (isLoading) return <AccountInfoSkeleton />
  return (
    <VStack spacing={3}>
      <HStack w="full" spacing={{ base: 2, lg: 3 }} alignItems={'start'}>
        <ProfileAvatar
          src={`${userProfile.imageUrl}`}
          h="64px"
          w="64px"
          guardian={userProfile.guardianType}
          wrapperProps={{ padding: '3px' }}
        />
        <VStack w="full" h="full" alignItems="start" justifyContent={'center'} spacing={1.5}>
          <HStack>
            <H1 size="2xl" bold>
              {userProfile.username}
            </H1>
            <UserVerifiedBadge user={userProfile} fontSize="2xl" />
            <ProfileText name={userProfile.username} guardian={userProfile.guardianType} size="md" />
            {/* {userProfile.guardianType && <Image height="24px" width="24px" src={GuardiansJewelUrl} />} */}
          </HStack>

          <Body
            size="sm"
            color={heroIdColor}
            bgColor={heroIdBg}
            borderRadius={'md'}
            p={1}
            onClick={() => {
              onCopy()
              toast.success({ title: t('Hero ID Copied!') })
            }}
            cursor="pointer"
            _hover={{ bgColor: heroIdHoverBg }}
          >
            {t('Hero ID: {{username}}', { username: userProfile.username })}
          </Body>
          {!userProfile.guardianType && isViewingOwnProfile && (
            <Button
              as={Link}
              to={getPath('guardians')}
              variant="outline"
              size="sm"
              mt={1}
              rightIcon={<Image height="16px" width="16px" src={GuardiansJewelUrl} />}
            >
              {t('Become a guardian')}
            </Button>
          )}
        </VStack>
      </HStack>
      <HStack w="full" justifyContent={'start'} flexWrap={'wrap'}>
        {accountButtonProps.map((accountButton) => {
          return <AccountInfoButton key={accountButton.key} accountInfoProps={accountButton} />
        })}
        <ConnectAccounts user={userProfile} />
      </HStack>
      <UserBio />
    </VStack>
  )
}

const AccountInfoButton = ({ accountInfoProps }: { accountInfoProps: ExternalAccountButtonReturnType }) => {
  const { account, icon, key, props } = accountInfoProps

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenWithDelay, onOpen: onOpenWithDelay, onClose: onCloseWithDelay } = useDisclosure()

  const removeAccountModal = useModal()

  const setUserProfile = useSetAtom(userProfileAtom)

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
        toast.success({
          title: 'Account unlinked',
          description: 'Account has been successfully unlinked',
        })
        setUserProfile((current) => ({
          ...current,
          externalAccounts: current.externalAccounts.filter((acc) => acc.id !== account.id),
        }))
      },
    },
  })

  if (isEdit) {
    return (
      <>
        <Popover isOpen={isOpen || isOpenWithDelay} onOpen={onOpen} onClose={onClose} openDelay={100} closeDelay={100}>
          <PopoverTrigger>
            <Button
              key={key}
              aria-label={`user-external-account-link-${key}`}
              size={'sm'}
              variant={isOpen ? 'solid' : 'soft'}
              colorScheme={isOpen ? 'error' : 'neutral1'}
              p={'0'}
              fontSize="16px"
              onMouseOver={() => {
                setTimeout(() => {
                  onOpen()
                }, 200)
              }}
              onMouseLeave={() => {
                onClose()
                setTimeout(() => {
                  onCloseWithDelay()
                }, 20)
              }}
              {...props}
            >
              {icon}
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />

              <PopoverCloseButton />
              <PopoverBody
                onMouseOver={onOpenWithDelay}
                onMouseLeave={() => {
                  setTimeout(() => {
                    onCloseWithDelay()
                  }, 200)
                }}
              >
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
