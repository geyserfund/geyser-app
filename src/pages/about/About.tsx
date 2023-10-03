import { Box, HStack, VStack } from '@chakra-ui/react'

import { AppFooter } from '../../components/molecules'
import {
  BuildByCreators,
  CurrentlyOnGeyser,
  GeyserTeam,
  GreenBackgroundAboutHeader,
  NewWayOfCrowdFunding,
  SubscribeAbout,
  WhatPeopleAreSaying,
  WhereGreatIdeas,
  WhyGeyser,
} from './components'

export const About = () => {
  return (
    <VStack backgroundColor="neutral.0" spacing={{ base: 50, lg: 100 }}>
      <GreenBackgroundAboutHeader />
      <WhereGreatIdeas />
      <HStack w={'full'} justifyContent={'center'} position={'relative'}>
        <NewWayOfCrowdFunding />
        <Box
          w={'full'}
          position={'absolute'}
          top={-20}
          left={0}
          height={'1848px'}
          backgroundColor={'primary.50'}
          clipPath={'polygon(0 0, 100% 12%, 100% 100%, 0% 100%)'}
        />
        <Box
          w={475}
          h={475}
          scale={0.5}
          position={'absolute'}
          top={50}
          left={0}
          borderRadius={'100%'}
          backgroundColor="secondary.green"
          filter="blur(280px)"
        />
      </HStack>
      <BuildByCreators />
      <CurrentlyOnGeyser />
      <WhatPeopleAreSaying />
      <WhyGeyser />
      <GeyserTeam />
      <SubscribeAbout />
      <AppFooter />
    </VStack>
  )
}

export default About
