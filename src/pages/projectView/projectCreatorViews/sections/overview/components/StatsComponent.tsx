import { HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H3 } from '../../../../../../components/typography'
import { getPath } from '../../../../../../constants'
import { useProjectContext } from '../../../../../../context'
import { StatsBlock } from '../elements'

export const StatsComponent = () => {
  const { t } = useTranslation()

  const { project } = useProjectContext()

  console.log('checking path', getPath('projectContributors', project?.name))
  return (
    <VStack w="full" alignItems="start" spacing="10px">
      <H3>{t('Stats')}</H3>
      <HStack w="full" spacing="20px" wrap="wrap">
        <StatsBlock
          title={t('Total received (sats)')}
          prevValue={1100000}
          value={1120000}
          width={{ base: '100%', lg: '33%' }}
        />
        <HStack flex={2} width={{ base: '100%', lg: 'auto' }} spacing="20px">
          <StatsBlock
            title={t('Contributors')}
            prevValue={40}
            value={50}
            flex={1}
          />
          <StatsBlock
            title={t('Rewards purchased')}
            prevValue={100}
            value={140}
            flex={1}
          />
        </HStack>
      </HStack>
    </VStack>
  )
}
