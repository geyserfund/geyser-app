import { Button, useDisclosure, VStack } from '@chakra-ui/react'
import { BsTwitter } from 'react-icons/bs'

import { BoltSvgIcon, NostrSvgIcon } from '../../components/icons'
import { Body1, Body2 } from '../../components/typography'
import { User } from '../../types'
import { ConnectWithLightningModal } from './ConnectWithLightningModal'

export const ConnectAccounts = ({ user }: { user: User }) => {
  // const displayNostrButton = !user.externalAccounts.some(
  //   (externalAccount) => externalAccount?.type === 'nostr',
  // )

  // const displayTwitterButton = !user.externalAccounts.some(
  //   (externalAccount) => externalAccount?.type === 'twitter',
  // )

  const { isOpen, onClose, onOpen } = useDisclosure()

  const displayNostrButton = true

  const displayTwitterButton = true

  return (
    <>
      <VStack w="full" alignItems="start">
        <Body1 bold>Connect more accounts</Body1>
        <Body2>
          Connect more social profiles to your Geyser account so you can login
          from more devices and accounts.
        </Body2>
        {displayTwitterButton && (
          <Button
            w="100%"
            backgroundColor="brand.twitter"
            leftIcon={<BsTwitter />}
            color="white"
            _hover={{}}
          >
            Twitter
          </Button>
        )}
        {displayNostrButton && (
          <Button
            w="100%"
            backgroundColor="brand.nostr"
            leftIcon={<NostrSvgIcon height="20px" width="20px" />}
            color="white"
            _hover={{}}
          >
            Nostr
          </Button>
        )}
        <Button
          w="100%"
          backgroundColor="brand.lightning"
          leftIcon={<BoltSvgIcon height="20px" width="20px" />}
          _hover={{}}
          onClick={onOpen}
        >
          Lightning
        </Button>
      </VStack>

      <ConnectWithLightningModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
