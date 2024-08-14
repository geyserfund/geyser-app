import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts'
import { H1 } from '@/shared/components/typography'

import { RenderGoals } from './common/RenderGoals'
import { CreatorGoalPageBottomBar, CreatorGoalPageTopBar } from './components'

export const ProjectGoals = () => {
  return (
    <VStack w="full" spacing={8} paddingBottom={'120px'}>
      <CreatorGoalPageTopBar />
      <VStack w="full" alignItems={'start'}>
        <H1 size="2xl" bold>
          {t('Goals')}
        </H1>
        <CardLayout w="full">
          <RenderGoals />
        </CardLayout>
      </VStack>

      <CreatorGoalPageBottomBar />
    </VStack>
  )
}
