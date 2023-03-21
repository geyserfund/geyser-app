import { HStack } from '@chakra-ui/react'
import { BsTwitter } from 'react-icons/bs'

import { CloseIconButton } from '../../../components/buttons'
import { BoltSvgIcon, NostrSvgIcon } from '../../../components/icons'
import { Body2 } from '../../../components/typography'
import { colors } from '../../../styles'
import { ExternalAccount } from '../../../types'

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
      padding="10px"
      justifyContent="space-between"
    >
      <HStack>
        <Icon height="20px" width="20px" />
        <Body2>{account.externalUsername}</Body2>
      </HStack>
      <CloseIconButton />
    </HStack>
  )
}
