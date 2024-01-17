import { HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H2 } from '../../../../../components/typography'
import { dimensions } from '../../../../../constants'
import { useProjectContext } from '../../../../../context'
import { standardPadding } from '../../../../../styles'

enum RewardStatus {
  todo = 'Todo',
  shipped = 'Shipped',
  delivered = 'Delivered',
}

export const ProjectContributors = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()

  return (
    <VStack
      width="100%"
      flexGrow={1}
      overflowY="auto"
      pt={{ base: dimensions.topNavBar.desktop.height + 80, lg: '10px' }}
    >
      <HStack w="full" px={standardPadding}>
        <H2>{t('To Do')}</H2>
      </HStack>
    </VStack>
  )
}
