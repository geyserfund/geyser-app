import { Box, BoxProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const BetaBox = (props: BoxProps) => {
  const { t } = useTranslation()
  return (
    <Box
      as="span"
      fontSize="10px"
      fontWeight={700}
      backgroundColor="primary.400"
      borderRadius="4px"
      padding="3px 5px"
      ml="10px"
      {...props}
    >
      {t('Beta')}
    </Box>
  )
}
