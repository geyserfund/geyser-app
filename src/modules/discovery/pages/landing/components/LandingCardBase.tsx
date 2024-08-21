import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react'
import { PiLightning, PiUsers } from 'react-icons/pi'

import { Body, H3 } from '@/shared/components/typography'
import { getShortAmountLabel } from '@/utils'

import { ImageWithReload } from '../../../../../components/ui'
import { CardLayout, CardLayoutProps, SkeletonLayout } from '../../../../../shared/components/layouts'
import { ProjectForLandingPageFragment } from '../../../../../types'

export interface LandingCardBaseProps extends CardLayoutProps {
  isMobile?: boolean
  project: ProjectForLandingPageFragment
  hasSubscribe?: boolean
}

export const LandingCardBase = ({ isMobile, project, hasSubscribe, ...rest }: LandingCardBaseProps) => {
  return (
    <CardLayout
      hover
      padding="0px"
      width={{ base: 'full', lg: 'auto' }}
      direction={{ base: 'row', lg: 'column' }}
      spacing={0}
      flex={{ base: 'unset', lg: 1 }}
      {...rest}
    >
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
        justifyContent="space-between"
        overflow="hidden"
        spacing={1}
      >
        <H3 size="lg" medium flex={1} isTruncated width="100%">
          {project.title}
        </H3>

        <HStack w="full" justifyContent={'start'} spacing={3}>
          <HStack>
            <PiUsers />
            <Body size="sm" dark>
              {project.fundersCount}
            </Body>
          </HStack>
          <HStack>
            <PiLightning />
            <Body size="sm" dark>
              {getShortAmountLabel(project.balance, true)}
            </Body>
          </HStack>
        </HStack>
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
