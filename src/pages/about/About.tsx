import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import {
  BuildByCreators,
  GeyserTeam,
  GreenBackgroundAboutHeader,
  NewWayOfCrowdFunding,
  WhatPeopleAreSaying,
  WhereGreatIdeas,
} from './components'

const About = () => {
  const { t } = useTranslation()
  console.log('this is about page')
  return (
    <VStack backgroundColor="neutral.0" spacing={100} paddingBottom={50}>
      <GreenBackgroundAboutHeader />
      <WhereGreatIdeas />
      <NewWayOfCrowdFunding />
      <BuildByCreators />
      <WhatPeopleAreSaying />
      <GeyserTeam />
    </VStack>
  )
}

export default About
