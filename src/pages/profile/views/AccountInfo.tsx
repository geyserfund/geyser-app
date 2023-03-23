import { Avatar } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { CardLayout } from '../../../components/layouts'
import { H1 } from '../../../components/typography'
import { User } from '../../../types'
import { ConnectAccounts } from '../../auth'
import { LightningAddress } from '../../projectView/projectMainBody/components'
import { ExternalAccountDisplay } from '../components'

export const AccountInfo = ({ user }: { user: User }) => {
  const params = useParams<{ userId: string }>()

  const isEdit = user.id === params.userId

  return (
    <CardLayout
      padding="20px"
      direction="column"
      alignItems="start"
      maxWidth="400px"
      spacing="10px"
    >
      <Avatar
        src={`${user.imageUrl}`}
        h="100px"
        w="100px"
        border="2px solid"
        borderColor="neutral.200 !important"
      />
      <H1>{user.username}</H1>
      <LightningAddress
        name={user.username}
        border="1px solid"
        borderColor="neutral.200"
        backgroundColor="neutral.100"
      />
      {user.externalAccounts.map((externalAccount) => {
        if (externalAccount) {
          return (
            <ExternalAccountDisplay
              key={externalAccount?.id}
              account={externalAccount}
              isEdit={isEdit}
            />
          )
        }
      })}
      {isEdit && <ConnectAccounts user={user} />}
    </CardLayout>
  )
}
