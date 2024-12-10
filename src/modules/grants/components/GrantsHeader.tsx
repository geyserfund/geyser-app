import { HStack, Icon, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import {
  PiDotOutline,
  // PiTrophy
} from 'react-icons/pi'

import { FlowingGifBackground } from '@/modules/discovery/pages/hallOfFame/components/FlowingGifBackground'
import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { __production__, __staging__, HallOfFameIllustrationUrl } from '@/shared/constants'
import { lightModeColors } from '@/shared/styles'
import { useGrantStatisticsQuery } from '@/types'
import { getShortAmountLabel } from '@/utils'

// const GEYSER_PROJECT_NAME = __staging__ ? 'geyser2' : __production__ ? 'grants' : 'geyser2'

export const GrantsHeader = () => {
  const { data, loading } = useGrantStatisticsQuery()

  const grantedAmount = data?.grantStatistics.grants?.amountFunded || 0
  const distributedAmount = data?.grantStatistics.grants?.amountGranted || 0

  const bannerItems = [
    { label: 'granted', value: getShortAmountLabel(grantedAmount) },
    { label: 'distributed', value: `${getShortAmountLabel(distributedAmount)}` },
  ]

  const padding = { base: 4, lg: '6' }

  const renderPlatformStats = () => {
    if (loading) return <ProjectStatSkeleton />

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
    <CardLayout
      w="full"
      dense
      spacing={{ base: 4, lg: 6 }}
      background="linear-gradient(81deg, #FFFBE7 -9.6%, #C4FFF4 109.2%)"
      position="relative"
      backgroundColor="utils.pbg"
      alignItems={{ base: 'start', lg: 'center' }}
    >
      <FlowingGifBackground />

      <HStack
        w="full"
        spacing={{ base: 4, lg: 6 }}
        paddingX={padding}
        paddingTop={padding}
        paddingBottom={{ base: 0, lg: 6 }}
      >
        <Image
          src={HallOfFameIllustrationUrl}
          alt="Geyser Grants"
          width={{ base: '95px', lg: '130px' }}
          height="auto"
          objectFit={'contain'}
          zIndex={1}
        />
        <VStack w="full" alignItems={'start'} spacing={{ base: 2, lg: 0 }} zIndex={1}>
          <H2 size={{ base: 'xl', lg: '3xl' }} bold color={lightModeColors.utils.text}>
            {t('Geyser Grants')}
          </H2>

          <Body size={{ base: 'sm', lg: 'xl' }} medium color={lightModeColors.neutral1[11]}>
            {t(
              'Grants for educators, creatives and builders pushing Bitcoin adoption further. Help fund the next round of grants now!',
            )}
          </Body>
          <HStack w="full" display={{ base: 'none', lg: 'flex' }} color={lightModeColors.utils.text}>
            {renderPlatformStats()}
          </HStack>
        </VStack>
      </HStack>
      <HStack
        paddingX={padding}
        paddingY={2}
        alignItems={'center'}
        justifyContent={'center'}
        w="full"
        display={{ base: 'flex', lg: 'none' }}
        backgroundColor="neutralAlpha.3"
      >
        {renderPlatformStats()}
      </HStack>
    </CardLayout>
  )
}

const ProjectStatSkeleton = () => {
  return [1, 2, 3].map((key) => {
    return (
      <>
        <SkeletonLayout height="24px" />
        {key < 3 && <Icon as={PiDotOutline} size="xl" />}
      </>
    )
  })
}
