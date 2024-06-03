import {
  Avatar,
  Button,
  Divider,
  HStack,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react'
import { PiCertificate, PiMagnifyingGlass } from 'react-icons/pi'
import { RiHomeLine } from 'react-icons/ri'

import { Body } from '../../../shared/components/typography'
import { UserMeFragment } from '../../../types'
import { UserAccountsIconsArray } from './UserAccountsIconsArray'

export const UserNav = ({ user }: { user: UserMeFragment }) => {
  return (
    <Popover placement="bottom-end" closeOnBlur>
      <PopoverTrigger>
        <Button variant="ghost" padding={0} borderRadius={'50%'}>
          <Avatar src={user.imageUrl || ''} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverBody padding={4} width="256px">
          <UserNavContent user={user} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export const UserNavContent = ({ user }: { user: UserMeFragment }) => {
  return (
    <VStack spacing={4} w="full" alignItems={'start'}>
      <HStack spacing={2}>
        <Avatar src={user.imageUrl || ''} />
        <VStack flex={1}>
          <Body fontSize="xl" bold>
            {user.username}
          </Body>
          <UserAccountsIconsArray externalAccounts={user.externalAccounts} />
        </VStack>
      </HStack>
      <Divider borderColor="neutral1.6" />
      <VStack spacing={2} w="full">
        <Button
          w="full"
          variant="surface"
          colorScheme="neutral1"
          size="lg"
          leftIcon={<RiHomeLine />}
          justifyContent={'start'}
        >
          Home
        </Button>
        <Button
          w="full"
          variant="surface"
          colorScheme="neutral1"
          size="lg"
          justifyContent={'start'}
          leftIcon={<PiMagnifyingGlass />}
        >
          Discover
        </Button>
        <Button
          w="full"
          variant="surface"
          colorScheme="neutral1"
          size="lg"
          justifyContent={'start'}
          leftIcon={<PiCertificate />}
        >
          Grants
        </Button>
      </VStack>
    </VStack>
  )
}
