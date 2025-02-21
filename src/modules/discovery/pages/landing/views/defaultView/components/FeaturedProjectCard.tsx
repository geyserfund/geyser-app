import { Box, HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiLightning, PiUsers } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body, H2 } from '@/shared/components/typography'
import { standardPadding } from '@/shared/styles'
import { commaFormatted } from '@/utils'

import { getPathWithGeyserHero } from '../../../../../../../shared/constants'
import { useFeaturedProjectForLandingPageQuery } from '../../../../../../../types'
import { FeatureAirtableData } from '../sections/Featured'
import { MiniProjectCard } from './MiniProjectCard.tsx'

export const FeaturedProjectCard = ({
  projectName,
  showMini,
  startAnimating,
  data,
  ...rest
}: {
  projectName: string
  showMini?: boolean
  startAnimating?: boolean
  data?: FeatureAirtableData
} & CardLayoutProps) => {
  const navigate = useNavigate()
  const { data: response, loading } = useFeaturedProjectForLandingPageQuery({
    variables: {
      where: {
        name: projectName,
      },
    },
    skip: !projectName,
  })

  const project = response?.projectGet

  if (loading || !project) {
    if (showMini) {
      return null
    }

    return <FeaturedCardSkeleton />
  }

  const hadFeaturedData = data?.Featured_Author && data.Featured_Comment

  if (showMini && project) {
    return (
      <MiniProjectCard
        project={project}
        startAnimating={startAnimating}
        onClick={() => navigate(getPathWithGeyserHero('project', projectName))}
      />
    )
  }

  return (
    <CardLayout
      direction={{ base: 'column', sm: 'row' }}
      width="100%"
      height={{ base: 'auto', sm: '252px' }}
      alignItems="start"
      spacing="0px"
      padding="0px"
      borderRadius="8px"
      overflow="hidden"
      onClick={() => navigate(getPathWithGeyserHero('project', projectName))}
      _hover={{ backgroundColor: 'neutral1.2', cursor: 'pointer' }}
      {...rest}
    >
      <Box width={{ base: '100%', sm: '44%' }} height={{ base: '240px', sm: '100%' }} overflow="hidden">
        <ImageWithReload height="full" width="full" src={`${project.thumbnailImage}`} objectFit="cover" />
      </Box>
      <VStack
        width={{ base: '100%', sm: '55%' }}
        height="100%"
        minWidth="200px"
        alignItems="start"
        spacing="10px"
        overflow="hidden"
        padding={standardPadding}
        justifyContent={{ base: 'start', sm: 'space-between' }}
      >
        <H2 size="2xl" bold>
          {project.title}
        </H2>
        {hadFeaturedData && (
          <VStack alignItems={'start'}>
            <Body size="xl" fontStyle={'italic'} bold light>
              {data.Featured_Comment}
            </Body>
            <Body>{data.Featured_Author}</Body>
          </VStack>
        )}

        {!hadFeaturedData && (
          <HStack spacing={3} justifySelf={'end'} flexWrap={'wrap'}>
            <HStack spacing={1}>
              <PiUsers />
              <Body size="sm" light medium pt={1}>
                {t('Contributions')}:
                <Body as="span" dark medium>
                  {project.fundersCount}
                </Body>
              </Body>
            </HStack>
            <HStack spacing={1}>
              <PiLightning />
              <Body size="sm" light medium pt={1}>
                {t('Contributed')}:
                <Body as="span" dark medium>
                  {commaFormatted(project.balance)}
                </Body>
                <Body as="span" light medium>
                  {` sats ($${commaFormatted(Math.round(project.balanceUsdCent / 100))})`}
                </Body>
              </Body>
            </HStack>
          </HStack>
        )}
      </VStack>
    </CardLayout>
  )
}

export const FeaturedCardSkeleton = () => {
  return (
    <CardLayout
      direction={{ base: 'column', sm: 'row' }}
      width="100%"
      height={{ base: 'auto', sm: '252px' }}
      alignItems="start"
      spacing="0px"
      padding="0px"
      borderRadius="8px"
      overflow="hidden"
    >
      <Box width={{ base: '100%', sm: '44%' }} height={{ base: '240px', sm: '100%' }} overflow="hidden">
        <Skeleton height="full" width="full" />
      </Box>
      <VStack
        width={{ base: '100%', sm: '55%' }}
        height="100%"
        minWidth="200px"
        alignItems="start"
        spacing="10px"
        overflow="hidden"
        padding={standardPadding}
        justifyContent={{ base: 'start', sm: 'space-between' }}
      >
        <VStack alignItems={'start'} w="full">
          <SkeletonLayout height="29px" width="200px" />

          <SkeletonText noOfLines={6} w="full" />
        </VStack>
        <HStack spacing={3} justifySelf={'end'} flexWrap={'wrap'}>
          <SkeletonLayout height="22px" width="40px" />
          <SkeletonLayout height="22px" width="60px" />
        </HStack>
      </VStack>
    </CardLayout>
  )
}
