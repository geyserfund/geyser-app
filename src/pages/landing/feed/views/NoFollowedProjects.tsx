import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { BiRightArrow } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { FollowAProjectImage } from '../../../../assets'
import { Body1 } from '../../../../components/typography'
import { colors } from '../../../../styles'

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
          {"You don't follow any projects"}
        </Body1>
        <Body1 color="black">
          Check out some trending projects this week that you can follow in the
          discovery view!
        </Body1>
      </VStack>
      <Button
        as={Link}
        to={'/'}
        variant="ghost"
        width="full"
        maxWidth="200px"
        rightIcon={<BiRightArrow />}
        background={`linear-gradient(270deg, ${colors.primary400} -0.16%, ${colors.primary} 35.26%, ${colors.bgLightGreenGradient} 99.84%)`}
      >
        Discover Projects
      </Button>
    </VStack>
  )
}
