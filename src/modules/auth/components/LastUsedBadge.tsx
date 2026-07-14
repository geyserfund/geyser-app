import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const LastUsedBadge = () => {
  const { t } = useTranslation()

  return (
    <Text as="span" fontSize="11px" fontWeight={600} lineHeight="1.2" opacity={0.7} ml={2} whiteSpace="nowrap">
      {t('Last used')}
    </Text>
  )
}
