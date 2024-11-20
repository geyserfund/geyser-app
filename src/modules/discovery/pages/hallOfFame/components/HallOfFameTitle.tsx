import { HStack, Icon, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiDotOutline } from 'react-icons/pi'

import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { HallOfFameIllustrationUrl } from '@/shared/constants'
import { lightModeColors } from '@/shared/styles'
import { commaFormatted, getBitcoinAmount, getShortAmountLabel } from '@/utils'

import { useSummaryBannerStats } from '../hooks'
import { FlowingGifBackground } from './FlowingGifBackground'

export const HallOfFameTitle = () => {
  const { projectsCount, bitcoinsRaised, contributorsCount, loading: projectStatLoading } = useSummaryBannerStats()

  const bannerItems = [
    { label: 'Contributors', value: getShortAmountLabel(contributorsCount) },
    { label: 'Raised', value: `${getBitcoinAmount(bitcoinsRaised, true)} ₿` },
    { label: 'Projects', value: commaFormatted(projectsCount) },
  ]
  const padding = { base: 4, lg: '6' }

  const renderPlatformStats = () => {
    if (projectStatLoading) return <ProjectStatSkeleton />

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
          alt="Hall of Fame"
          width={{ base: '95px', lg: '130px' }}
          height="auto"
          objectFit={'contain'}
          zIndex={1}
        />
        <VStack w="full" alignItems={'start'} spacing={{ base: 2, lg: 0 }} zIndex={1}>
          <H2 size={{ base: 'xl', lg: '3xl' }} bold color={lightModeColors.utils.text}>
            {t('Hall of Fame')}
          </H2>

          <Body size={{ base: 'sm', lg: 'xl' }} medium color={lightModeColors.neutral1[11]}>
            {t('The Projects and Heroes bringing Bitcoin closer to mass adoption')}
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
