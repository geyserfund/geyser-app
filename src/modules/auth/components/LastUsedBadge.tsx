import { Text } from '@chakra-ui/react'
import { t } from 'i18next'

/** Displays a label indicating the last used authentication method. */
export const LastUsedBadge = () => {
  return (
    <Text as="span" fontSize="11px" fontWeight={600} lineHeight="1.2" opacity={0.7} ml={2} whiteSpace="nowrap">
      {t('Last used')}
    </Text>
  )
}
