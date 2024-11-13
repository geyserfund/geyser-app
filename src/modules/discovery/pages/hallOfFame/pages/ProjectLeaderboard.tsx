import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft, PiShare } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { dimensions, getPath } from '@/shared/constants'
import { discoveryPageCommonLayoutStyles } from '@/shared/styles/discoveryPageLayout'
import { toPx } from '@/utils'

import { IndividualHallOfFameTitle } from '../components/IndividualHallOfFameTitle'

export const ProjectLeaderboard = () => {
  return (
    <VStack w="full" paddingBottom="80px">
      <TopNavContainerBar {...discoveryPageCommonLayoutStyles}>
        <Button
          as={Link}
          to={getPath('discoveryHallOfFame')}
          size="lg"
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {t('Back')}
        </Button>
        <Button size="lg" variant="soft" colorScheme="neutral1" leftIcon={<PiShare />}>
          {t('Share')}
        </Button>
      </TopNavContainerBar>

      <VStack
        w="full"
        paddingTop={{
          base: toPx(dimensions.projectNavBar.mobile.height),
          lg: toPx(dimensions.projectNavBar.desktop.height),
        }}
      >
        <IndividualHallOfFameTitle title={t('Hall of Fame')} />
      </VStack>
    </VStack>
  )
}
