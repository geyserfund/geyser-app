import { Box, HStack, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import { PiLightning, PiUsers } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { standardPadding } from '@/shared/styles'
import { commaFormatted } from '@/utils'

import { ImageWithReload } from '../../../../../../../components/ui'
import { getPath } from '../../../../../../../shared/constants'
import { useFeaturedProjectForLandingPageQuery } from '../../../../../../../types'
import { ProjectRowLayout } from './ProjectRowLayout'

export const FeaturedProjectCard = ({ projectName }: { projectName: string }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data, loading } = useFeaturedProjectForLandingPageQuery({
    variables: {
      where: {
        name: projectName,
      },
    },
  })

  const project = data?.projectGet

  if (loading || !project) {
    return <FeaturedCardSkeleton />
  }

  return (
    <ProjectRowLayout title={t('Featured Project')} width="100%">
      <CardLayout
        direction={{ base: 'column', sm: 'row' }}
        width="100%"
        height={{ base: 'auto', sm: '252px' }}
        alignItems="start"
        spacing="0px"
        padding="0px"
        borderRadius="8px"
        overflow="hidden"
        onClick={() => navigate(getPath('project', projectName))}
        _hover={{ backgroundColor: 'neutral1.2', cursor: 'pointer' }}
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
          <VStack alignItems={'start'}>
            <H2 size="2xl" bold>
              {project.title}
            </H2>
            <Body light medium noOfLines={5} isTruncated whiteSpace="normal">
              {project.shortDescription}
            </Body>
          </VStack>
          <HStack spacing={3} justifySelf={'end'} flexWrap={'wrap'}>
            <HStack spacing={1}>
              <PiUsers />
              <Body size="sm" light medium>
                {t('Contributions')}:
                <Body as="span" dark medium>
                  {project.fundersCount}
                </Body>
              </Body>
            </HStack>
            <HStack spacing={1}>
              <PiLightning />
              <Body size="sm" light medium>
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
        </VStack>
      </CardLayout>
    </ProjectRowLayout>
  )
}

export const FeaturedCardSkeleton = () => {
  return (
    <ProjectRowLayout title={t('Featured')} width="100%">
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
          <SkeletonLayout height="full" width="full" />
        </Box>
        <VStack
          width={{ base: '100%', sm: '45%' }}
          height="100%"
          minWidth="200px"
          alignItems="start"
          spacing="10px"
          overflow="hidden"
          padding={standardPadding}
          justifyContent={{ base: 'start', sm: 'space-between' }}
        >
          <VStack alignItems={'start'}>
            <SkeletonLayout height="29px" width="200px" />

            <SkeletonText noOfLines={6} />
          </VStack>
          <HStack spacing={3} justifySelf={'end'} flexWrap={'wrap'}>
            <SkeletonLayout height="22px" width="40px" />
            <SkeletonLayout height="22px" width="60px" />
          </HStack>
        </VStack>
      </CardLayout>
    </ProjectRowLayout>
  )
}
