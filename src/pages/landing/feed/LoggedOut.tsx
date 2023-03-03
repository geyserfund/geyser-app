import { Box, Image, VStack } from '@chakra-ui/react'

import { FeedLoggedOutImage } from '../../../assets'
import { Body1 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import { useAuthContext } from '../../../context'

export const LoggedOut = () => {
  const { loginOnOpen } = useAuthContext()
  return (
    <VStack w="full" padding="12px" spacing="20px">
      <Box width="200px">
        <Image
          w="full"
          h="auto"
          alt="feed-logged-out"
          src={FeedLoggedOutImage}
        />
      </Box>
      <VStack w="full">
        <Body1 bold color="black">
          {"You're not logged in."}
        </Body1>
        <Body1 color="black">
          Login now to see activity from projects you funded or follow
        </Body1>
      </VStack>
      <ButtonComponent
        primary
        width="full"
        maxWidth="200px"
        onClick={loginOnOpen}
      >
        Login
      </ButtonComponent>
    </VStack>
  )
}
