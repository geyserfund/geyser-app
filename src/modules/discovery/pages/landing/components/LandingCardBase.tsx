import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react'

import { Body, H3 } from '@/shared/components/typography'
import { isInactive } from '@/utils'

import { ImageWithReload } from '../../../../../components/ui'
import { CardLayout, CardLayoutProps, SkeletonLayout } from '../../../../../shared/components/layouts'
import { ProjectForLandingPageFragment } from '../../../../../types'

export interface LandingCardBaseProps extends CardLayoutProps {
  isMobile?: boolean
  project: ProjectForLandingPageFragment
  hasSubscribe?: boolean
}

export const LandingCardBase = ({ isMobile, project, hasSubscribe, ...rest }: LandingCardBaseProps) => {
  const inActive = isInactive(project.status)
  return (
    <CardLayout
      hover
      padding="0px"
      width={{ base: 'full', lg: 'auto' }}
      direction={{ base: 'row', lg: 'column' }}
      spacing={0}
      flex={{ base: 'unset', lg: 1 }}
      position="relative"
      {...rest}
    >
      {inActive && (
        <Box
          backgroundColor={'utils.pbg'}
          opacity={0.5}
          zIndex="1"
          pointerEvents={'none'}
          position="absolute"
          width="100%"
          height="100%"
        />
      )}
      <Box width={{ base: '96px', lg: 'auto' }} height={{ base: '96px', lg: 'auto' }}>
        <ImageWithReload
          width="100%"
          height="100%"
          aspectRatio={1}
          objectFit="cover"
          src={project.thumbnailImage}
          alt={`${project.title}-header-image`}
        />
      </Box>
      <VStack
        flex={1}
        width={{ base: 'auto', lg: '100%' }}
        minWidth={{ base: '170px', lg: 'auto' }}
        padding={4}
        alignItems="start"
        overflow="hidden"
        spacing={1}
      >
        <H3 size="lg" medium isTruncated width="100%">
          {project.title}
        </H3>
        <Body size="sm" dark noOfLines={2} isTruncated width="100%" wordBreak={'break-all'} whiteSpace={'normal'}>
          {project.shortDescription}
        </Body>
      </VStack>
    </CardLayout>
  )
}

export const LandingCardBaseSkeleton = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <>
      <CardLayout
        hover
        padding="0px"
        width={{ base: 'full', lg: 'auto' }}
        direction={{ base: 'row', lg: 'column' }}
        spacing={0}
        flex={{ base: 'unset', lg: 1 }}
      >
        <Box width={{ base: '96px', lg: 'auto' }} height={{ base: '96px', lg: 'auto' }} aspectRatio={1}>
          <Skeleton width="100%" height="100%"></Skeleton>
        </Box>
        <VStack
          flex={1}
          width={{ base: 'auto', lg: '100%' }}
          minWidth={{ base: '170px', lg: 'auto' }}
          padding={4}
          alignItems="start"
          justifyContent="space-between"
          overflow="hidden"
          spacing={1}
        >
          <SkeletonLayout width="100%" height="22px" />

          <HStack w="full" justifyContent={'start'} spacing={3}>
            <SkeletonLayout width="30px" height="22px" />

            <SkeletonLayout width="60px" height="22px" />
          </HStack>
        </VStack>
      </CardLayout>
    </>
  )
}
