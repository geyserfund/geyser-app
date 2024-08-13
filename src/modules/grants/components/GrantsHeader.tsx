import { useQuery } from '@apollo/client'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DonateIcon } from '@/components/icons/svg/DonateIcon'
import { TrophyIcon } from '@/components/icons/svg/TrophyIcon'
import { Banner } from '@/components/ui/Banner'
import { QUERY_GRANT_STATISTICS } from '@/graphqlBase/queries/grant'
import { GrantStatistics } from '@/types'
import { getShortAmountLabel, useMobileMode } from '@/utils'

const GrantsHeader = () => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()

  const { data, loading } = useQuery<{ grantStatistics: GrantStatistics }>(QUERY_GRANT_STATISTICS)

  const items = [
    {
      label: t('Granted'),
      value: getShortAmountLabel(data?.grantStatistics.grants?.amountFunded || 0),
      suffix: 'Sats',
    },
    {
      label: t('Distributed'),
      value: getShortAmountLabel(data?.grantStatistics.grants?.amountGranted || 0),
      suffix: 'Sats',
    },
  ]

  const Direction = isMobile ? VStack : HStack

  return (
    <VStack spacing={4} w="100%" alignItems="center">
      <Banner title={t('Geyser Grants - empowering bitcoin creators!')} items={items} loading={loading} reverse />
      <Direction
        justifyContent="space-between"
        w="100%"
        border="1px solid"
        borderColor="neutralAlpha.6"
        borderRadius="md"
        p={6}
      >
        <Button w="100%" size="lg" variant="primary" rightIcon={<DonateIcon />}>
          {t('Donate to Geyser Grant')}
        </Button>
        <Button w="100%" size="lg" variant="primary" bg="yellow.9" rightIcon={<TrophyIcon />}>
          {t('Create a grant')}
        </Button>
      </Direction>
    </VStack>
  )
}

export default GrantsHeader
