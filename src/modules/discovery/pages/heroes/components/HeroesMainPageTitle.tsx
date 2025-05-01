import { Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiDotOutline } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { CrownIllustrationUrl } from '@/shared/constants'
import { GradientBanner } from '@/shared/molecules/GradientBanner.tsx'
import { commaFormatted, getBitcoinAmount, getShortAmountLabel } from '@/utils'

import { useSummaryBannerStats } from '../hooks'

export const HeroesMainPageTitle = () => {
  const { projectsCount, bitcoinsRaised, contributorsCount, loading: projectStatLoading } = useSummaryBannerStats()

  const bannerItems = [
    { label: 'Contributors', value: getShortAmountLabel(contributorsCount) },
    { label: 'Raised', value: `${getBitcoinAmount(bitcoinsRaised, true)} ₿` },
    { label: 'Projects', value: commaFormatted(projectsCount) },
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
      title={t('Heroes')}
      subtitle={t('The creators, contributors and ambassadors bringing Bitcoin closer to mass adoption.')}
      imageUrl={CrownIllustrationUrl}
      statsLoading={projectStatLoading}
      stats={renderPlatformStats()}
    />
  )
}
