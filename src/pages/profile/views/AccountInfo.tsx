import { Avatar, HStack } from '@chakra-ui/react'
import { BsTwitter } from 'react-icons/bs'

import { BoltSvgIcon, NostrSvgIcon } from '../../../components/icons'
import { CardLayout } from '../../../components/layouts'
import { Body2, H1 } from '../../../components/typography'
import { colors } from '../../../styles'
import { ExternalAccount, User } from '../../../types'
import { LightningAddress } from '../../projectView/projectMainBody/components'

export const AccountInfo = ({ user }: { user: User }) => {
  return (
    <CardLayout padding="20px" direction="column" alignItems="start">
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

const externalAccountColorMap = {
  twitter: colors.twitter,
  lightning: colors.lightning,
  nostr: colors.nostr,
} as { [key: string]: string }

const externalAccountIconMap = {
  twitter: BsTwitter,
  lightning: BoltSvgIcon,
  nostr: NostrSvgIcon,
} as { [key: string]: any }

export const ExternalAccountDisplay = ({
  account,
}: {
  account: ExternalAccount
}) => {
  const Icon = externalAccountIconMap[account.type]
  return (
    <HStack
      w="100%"
      backgroundColor="neutral.100"
      borderRadius="8px"
      color={externalAccountColorMap[account.type]}
    >
      <Icon />
      <Body2>{account.externalUsername}</Body2>
    </HStack>
  )
}
