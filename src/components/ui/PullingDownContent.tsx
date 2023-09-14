import { HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FiChevronsDown } from 'react-icons/fi'

import { useCustomTheme } from '../../utils'

export const PullingDownContent = (props: any) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  const renderNArrows = (n: number) => {
    return [...Array(n).keys()].map((_, i) => (
      <FiChevronsDown color={colors.neutral[1000]} key={i} />
    ))
  }

  return (
    <HStack pt="5px" spacing="10px" w="full" justifyContent="center">
      {renderNArrows(3)}
      <Text color="neutral.1000">{t('Pulldown to refresh')}</Text>
      {renderNArrows(3)}
    </HStack>
  )
}
