import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { BiRightArrow } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { Body1 } from '../../../../components/typography'
import { FollowAProjectUrl } from '../../../../constants'
import { useCustomTheme } from '../../../../utils'

export const NoFollowedProjects = () => {
  const theme = useCustomTheme()
  return (
    <VStack w="full" padding="12px" spacing="20px">
      <Box width="200px">
        <Image
          w="full"
          h="auto"
          alt="feed-logged-out"
          src={FollowAProjectUrl}
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
        background={`linear-gradient(270deg, ${theme.primary[400]} -0.16%, ${theme.primary[400]} 35.26%, ${theme.secondary.green} 99.84%)`}
      >
        Discover Projects
      </Button>
    </VStack>
  )
}
