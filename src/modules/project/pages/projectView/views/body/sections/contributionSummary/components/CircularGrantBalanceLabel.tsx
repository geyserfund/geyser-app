import { HStack, Tooltip } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiInfo } from 'react-icons/pi'

import { CircularGrantTooltipLabel } from '../../circularGrant/CircularGrantExplainer.tsx'

export const CircularGrantBalanceLabel = () => (
  <HStack spacing={1}>
    <span>{t('Circular Grant')}</span>
    <Tooltip label={<CircularGrantTooltipLabel />} hasArrow placement="top">
      <span aria-label={t('Circular grant information')}>
        <PiInfo />
      </span>
    </Tooltip>
  </HStack>
)
