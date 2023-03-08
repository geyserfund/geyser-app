import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { BiRightArrow } from 'react-icons/bi'

import { FollowAProjectImage } from '../../../../assets'
import { Body1 } from '../../../../components/typography'

export const NoFollowedProjects = () => {
  return (
    <VStack w="full" padding="12px" spacing="20px">
      <Box width="200px">
        <Image
          w="full"
          h="auto"
          alt="feed-logged-out"
          src={FollowAProjectImage}
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
      <Button
        width="full"
        maxWidth="200px"
        rightIcon={<BiRightArrow />}
        backgroundColor="linear-gradient(270deg, #6BE7CE -0.16%, #20ECC7 35.26%, #00F388 99.84%)"
      >
        Discover Projects
      </Button>
    </VStack>
  )
}
