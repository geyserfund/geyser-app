import { HStack, Icon, IconButton, Image, VStack } from '@chakra-ui/react'
import { PiDotOutline, PiX } from 'react-icons/pi'

import { FlowingGifBackground } from '@/modules/discovery/pages/heroes/components/FlowingGifBackground.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body, H2 } from '@/shared/components/typography'
import { lightModeColors } from '@/shared/styles'

import { TitleHeaderGradient } from '../styles/custom.ts'

type GradientBannerProps = {
  title: string
  subtitle: string
  imageUrl: string
  background?: string
  stats?: React.ReactNode
  statsLoading?: boolean
  children?: React.ReactNode
  onClose?: () => void
  endContent?: React.ReactNode
}

export const GradientBanner = ({
  title,
  subtitle,
  imageUrl,
  background,
  stats,
  statsLoading,
  children,
  onClose,
  endContent,
}: GradientBannerProps) => {
  const padding = { base: 2, lg: 4 }

  const renderPlatformStats = () => {
    if (statsLoading) return <ProjectStatSkeleton />

    return stats
  }

  return (
    <CardLayout
      w="full"
      dense
      spacing={{ base: 4, lg: 6 }}
      background={background || TitleHeaderGradient}
      position="relative"
      backgroundColor="utils.pbg"
      alignItems={{ base: 'start', lg: 'center' }}
    >
      <FlowingGifBackground />
      {onClose && (
        <IconButton
          aria-label="Close"
          variant="ghost"
          position="absolute"
          right={1}
          top={1}
          icon={<PiX />}
          onClick={onClose}
        />
      )}
      <HStack
        w="full"
        spacing={{ base: 4, lg: 6 }}
        paddingX={padding}
        paddingTop={padding}
        paddingBottom={{ base: stats ? 0 : 2, lg: 4 }}
        alignItems="flex-start"
      >
        <Image
          src={imageUrl}
          alt="Hall of Fame"
          maxHeight="120px"
          width={{ base: '95px', lg: '120px' }}
          height="auto"
          objectFit={'contain'}
          zIndex={1}
        />
        <VStack w="full" alignItems={'start'} spacing={{ base: 2, lg: 0 }} zIndex={1}>
          <H2
            size={{ base: 'xl', lg: '3xl' }}
            bold
            color={lightModeColors.utils.text}
            paddingRight={onClose ? 6 : undefined}
          >
            {title}
          </H2>

          <Body size={{ base: 'sm', lg: 'xl' }} medium color={lightModeColors.neutral1[11]}>
            {subtitle}
            {endContent && <> {endContent}</>}
          </Body>
          <HStack w="full" display={{ base: 'none', lg: 'flex' }}>
            {children}
          </HStack>
          <HStack w="full" display={{ base: 'none', lg: 'flex' }} color={lightModeColors.utils.text}>
            {renderPlatformStats()}
          </HStack>
        </VStack>
      </HStack>
      <HStack w="full" paddingX={2} paddingBottom={2} display={{ base: 'flex', lg: 'none' }}>
        {children}
      </HStack>
      {stats && (
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
      )}
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
