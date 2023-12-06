import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { H2 } from '../../../../../../components/typography'

export const RewardsHeader = () => {
  const { t } = useTranslation()

  return (
    <Stack
      direction={{ base: 'row', lg: 'row' }}
      pb={4}
      w="full"
    >
      <H2>{t('Manage Items & Bundles')}</H2>
    </Stack>
  )
}
