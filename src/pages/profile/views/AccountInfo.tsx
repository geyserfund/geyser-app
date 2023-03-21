import { Avatar } from '@chakra-ui/react'

import { CardLayout } from '../../../components/layouts'
import { H1 } from '../../../components/typography'
import { User } from '../../../types'
import { LightningAddress } from '../../projectView/projectMainBody/components'
import { ExternalAccountDisplay } from '../components'

export const AccountInfo = ({ user }: { user: User }) => {
  return (
    <CardLayout
      padding="20px"
      direction="column"
      alignItems="start"
      width="100%"
      maxWidth="400px"
    >
      <Avatar
        src={`${user.imageUrl}`}
        h="100px"
        w="100px"
        border="2px solid"
        borderColor="neutral.200 !important"
      />
      <H1>{user.username}</H1>
      <LightningAddress name={user.username} />
      {user.externalAccounts.map((externalAccount) => {
        if (externalAccount) {
          return (
            <ExternalAccountDisplay
              key={externalAccount?.id}
              account={externalAccount}
            />
          )
        }
      })}
    </CardLayout>
  )
}
