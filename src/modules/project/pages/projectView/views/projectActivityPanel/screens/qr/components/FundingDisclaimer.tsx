import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const FundingDisclaimer = () => {
  const { t } = useTranslation()
  return (
    <Text fontSize="8px" fontWeight={400} color={'neutral.700'}>
      {t(
        'Geyser is not a store. It’s a way to bring creative projects to life using Bitcoin. Your donation will support a creative project that has yet to be developed. There’s a risk that, despite a creator’s best efforts, your reward will not be fulfilled, and we urge you to consider this risk prior to backing it. Geyser is not responsible for project claims or reward fulfillment.',
      )}
    </Text>
  )
}
