import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiShare } from 'react-icons/pi'

import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { dimensions } from '@/shared/constants'
import { BackButton } from '@/shared/molecules/BackButton.tsx'
import { toPx } from '@/utils'

import { IndividualHallOfFameTitle } from '../components/IndividualHallOfFameTitle'
import { TopProjectLeaderboard } from '../components/TopProjectLeaderboard'

export const ProjectLeaderboard = () => {
  return (
    <VStack
      w="full"
      height={{ base: 'full', lg: `calc(100vh - ${toPx(dimensions.topNavBar.desktop.height + 40)})` }}
      paddingTop={{
        base: toPx(dimensions.projectNavBar.mobile.height),
        lg: toPx(dimensions.projectNavBar.desktop.height),
      }}
    >
      <TopNavContainerBar>
        <BackButton />
        <Button size="lg" variant="soft" colorScheme="neutral1" leftIcon={<PiShare />}>
          {t('Share')}
        </Button>
      </TopNavContainerBar>
      <CardLayout w="full" h="full" dense>
        <IndividualHallOfFameTitle title={t('Hall of Fame')} noborder borderRadius={0} />
        <TopProjectLeaderboard />
      </CardLayout>
    </VStack>
  )
}
