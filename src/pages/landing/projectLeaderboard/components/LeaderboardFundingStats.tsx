import { HStack, StackProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SatSymbolIcon } from '../../../../components/icons'
import { Caption, MonoBody1 } from '../../../../components/typography'
import { Project } from '../../../../types'
import { getShortAmountLabel } from '../../../../utils'

interface LeaderboardFundingStatsProps extends StackProps {
  funders: Project['fundersCount']
  funded: Project['balance']
}

export const LeaderboardFundingStats = ({
  funders,
  funded,
  ...rest
}: LeaderboardFundingStatsProps) => {
  const { t } = useTranslation()
  return (
    <HStack w="full" spacing="20px" {...rest}>
      <HStack spacing="4px">
        <MonoBody1 semiBold>{getShortAmountLabel(funders || 0)}</MonoBody1>
        <Caption textTransform="uppercase">{t('funders')}</Caption>
      </HStack>
      <HStack spacing="4px">
        <SatSymbolIcon fontSize="14px" />
        <MonoBody1 semiBold>{getShortAmountLabel(funded)}</MonoBody1>
        <Caption textTransform="uppercase">{t('funded')}</Caption>
      </HStack>
    </HStack>
  )
}
