import { HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FiChevronsDown } from 'react-icons/fi'

import { lightModeColors } from '../../styles'

export const PullingDownContent = (props: any) => {
  const { t } = useTranslation()

  const renderNArrows = (n: number) => {
    return [...Array(n).keys()].map((_, i) => (
      <FiChevronsDown color={lightModeColors.primary[400]} key={i} />
    ))
  }

  return (
    <HStack pt="5px" spacing="10px" w="full" justifyContent="center">
      {renderNArrows(3)}
      <Text color="primary.400">{t('Pulldown to refresh')}</Text>
      {renderNArrows(3)}
    </HStack>
  )
}
