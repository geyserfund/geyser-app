import { Link, Text, VStack } from '@chakra-ui/react'
import { BiErrorAlt } from 'react-icons/bi'

export const NotAuthorized = () => (
  <VStack
    width="100%"
    height="100%"
    backgroundColor="brand.bgGrey"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    spacing="10px"
  >
    <BiErrorAlt fontSize="80px" />
    <Text fontSize="20px">Oops!</Text>
    <Text fontSize="20px">You do not have permission to access this page.</Text>
    <Text fontSize="20px">
      If the problem persists let us know via.{' '}
      <Link href="https://t.me/+EZ5otIPhVcxhMmFk" target="_blank">
        telegram
      </Link>{' '}
      or this <Link>feedback form.</Link>
    </Text>
  </VStack>
)
