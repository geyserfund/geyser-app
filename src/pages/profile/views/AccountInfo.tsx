import { Avatar, Button, SkeletonCircle, VStack } from '@chakra-ui/react'

import { CardLayout, SkeletonLayout } from '../../../components/layouts'
import { Body1, H1 } from '../../../components/typography'
import { ConnectAccounts, ExternalAccountType } from '../../auth'
import { LightningAddress } from '../../projectView/projectMainBody/components'
import { ExternalAccountDisplay } from '../components'
import { EditProfileModal } from '../components/EditProfileModal'
import { useEditProfileModal } from '../hooks/useEditProfileModal'
import { UserProfileState } from '../type'

interface AccountInfoProps extends UserProfileState {
  isEdit: boolean
  isLoading?: boolean
}

export const AccountInfo = ({
  userProfile,
  setUserProfile,
  isEdit,
  isLoading,
}: AccountInfoProps) => {
  const modalProps = useEditProfileModal()

  if (isLoading) {
    return <AccountInfoSkeleton />
  }

  const lightningAddress =
    userProfile.wallet?.connectionDetails.__typename ===
    'LightningAddressConnectionDetails'
      ? userProfile.wallet.connectionDetails.lightningAddress
      : ''

  const getIsEdit = (accountType: ExternalAccountType) => {
    if (
      (accountType === ExternalAccountType.nostr ||
        accountType === ExternalAccountType.twitter) &&
      userProfile.ownerOf.length > 0
    ) {
      return false
    }

    return userProfile.externalAccounts.length > 1 ? isEdit : false
  }

  return (
    <>
      <CardLayout
        padding="20px"
        direction="column"
        alignItems="start"
        spacing="20px"
      >
        <VStack w="full" alignItems="start" spacing="10px">
          <Avatar
            src={`${userProfile.imageUrl}`}
            h="100px"
            w="100px"
            border="2px solid"
            borderColor="neutral.200 !important"
          />
          <H1>{userProfile.username}</H1>
          {lightningAddress && (
            <LightningAddress
              name={lightningAddress}
              border="1px solid"
              borderColor="neutral.200"
              backgroundColor="neutral.100"
              overflow="hidden"
              maxWidth="full"
            />
          )}
          {userProfile.bio && (
            <Body1 semiBold color="neutral.600" wordBreak="break-word">
              {userProfile.bio}
            </Body1>
          )}
        </VStack>

        <VStack w="full" alignItems="start">
          <Body1 bold color="neutral.900">
            Connected accounts
          </Body1>
          {userProfile.externalAccounts.map((externalAccount) => {
            if (externalAccount) {
              return (
                <ExternalAccountDisplay
                  key={externalAccount?.id}
                  account={externalAccount}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  isEdit={getIsEdit(
                    externalAccount.accountType as ExternalAccountType,
                  )}
                />
              )
            }
          })}
        </VStack>
        {isEdit && <ConnectAccounts user={userProfile} />}
      </CardLayout>
      {isEdit && userProfile && (
        <>
          <Button
            onClick={() => modalProps.onOpen({ user: userProfile })}
            width="100%"
            variant="secondary"
            marginTop="20px"
          >
            Edit
          </Button>
          {modalProps.isOpen && <EditProfileModal {...modalProps} />}
        </>
      )}
    </>
  )
}

export const AccountInfoSkeleton = () => {
  return (
    <CardLayout
      padding="20px"
      direction="column"
      alignItems="start"
      spacing="10px"
    >
      <SkeletonCircle height="100px" width="100px" />
      <SkeletonLayout height="25px" width="60%" />
      <SkeletonLayout height="32px" width="80%" />
      <SkeletonLayout height="44px" width="100%" />
      <SkeletonLayout height="44px" width="100%" />
    </CardLayout>
  )
}
