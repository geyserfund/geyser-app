import { Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiDotOutline } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { __production__, __staging__, getPath, GrantsIllustrationUrl } from '@/shared/constants'
import { GradientBanner } from '@/shared/molecules/GradientBanner.tsx'
import { useGrantStatisticsQuery } from '@/types'
import { getShortAmountLabel } from '@/utils'

const GEYSER_PROJECT_NAME = 'grants'

export const GrantsHeader = () => {
  const { data, loading } = useGrantStatisticsQuery()

  const grantedAmount = data?.grantStatistics.grants?.amountFunded || 0
  const distributedAmount = data?.grantStatistics.grants?.amountGranted || 0

  const bannerItems = [
    { label: 'granted', value: getShortAmountLabel(grantedAmount) },
    { label: 'distributed', value: `${getShortAmountLabel(distributedAmount)}` },
  ]

  const renderPlatformStats = () => {
    return bannerItems.map((item, index) => (
      <>
        <Body key={index} size={{ base: 'sm', lg: 'xl' }} color="neutral1.10" textAlign={'center'}>
          {item.value} <Body as="span">{item.label}</Body>
        </Body>
        {index < bannerItems.length - 1 && <Icon as={PiDotOutline} />}
      </>
    ))
  }

  return (
    <GradientBanner
      title={t('Geyser Grants')}
      subtitle={t(
        'Grants for educators, creatives and builders pushing Bitcoin adoption further. Help fund the next round of grants now! ',
      )}
      endContent={
        <Body as={Link} to={getPath('project', GEYSER_PROJECT_NAME)} underline>
          {t('Learn more about Geyser Grants.')}
        </Body>
      }
      imageUrl={GrantsIllustrationUrl}
      stats={renderPlatformStats()}
      statsLoading={loading}
    />
  )
}
