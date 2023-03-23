import { Avatar } from '@chakra-ui/react'

import { CardLayout } from '../../../components/layouts'
import { H1 } from '../../../components/typography'
import { ConnectAccounts } from '../../auth'
import { LightningAddress } from '../../projectView/projectMainBody/components'
import { ExternalAccountDisplay } from '../components'
import { UserProfileState } from '../type'

interface AccountInfoProps extends UserProfileState {
  isEdit: boolean
}

export const AccountInfo = ({
  userProfile,
  setUserProfile,
  isEdit,
}: AccountInfoProps) => {
  return (
    <CardLayout
      padding="20px"
      direction="column"
      alignItems="start"
      spacing="10px"
    >
      <Avatar
        src={`${userProfile.imageUrl}`}
        h="100px"
        w="100px"
        border="2px solid"
        borderColor="neutral.200 !important"
      />
      <H1>{userProfile.username}</H1>
      <LightningAddress
        name={userProfile.username}
        border="1px solid"
        borderColor="neutral.200"
        backgroundColor="neutral.100"
      />
      {userProfile.externalAccounts.map((externalAccount) => {
        if (externalAccount) {
          return (
            <ExternalAccountDisplay
              key={externalAccount?.id}
              account={externalAccount}
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              isEdit={isEdit}
            />
          )
        }
      })}
      {isEdit && <ConnectAccounts user={userProfile} />}
    </CardLayout>
  )
}
