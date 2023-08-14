import {
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from '@chakra-ui/react'

import {
  FundingStatWithFollow,
  FundingStatWithFollowProps,
} from '../../pages/landing/components/FundingStatWithFollow'
import { AvatarElement } from '../../pages/projectView/projectMainBody/components'
import {
  EntryForLandingPageFragment,
  ProjectForLandingPageFragment,
} from '../../types'
import { H3 } from '../typography'
import { ImageWithReload } from '../ui'
import { CardLayout, CardLayoutProps } from '.'

export interface LandingCardBaseProps
  extends FundingStatWithFollowProps,
    CardLayoutProps {
  isMobile?: boolean
  imageSrc: string
  title: string
  user:
    | EntryForLandingPageFragment['creator']
    | ProjectForLandingPageFragment['owners'][number]['user']
}

export const LandingCardBase = ({
  isMobile,
  imageSrc,
  title,
  fundersCount,
  amountFunded,
  projectId,
  user,
  ...rest
}: LandingCardBaseProps) => {
  const getResponsiveValue = (value: any) => {
    if (isMobile) {
      return { base: value.base }
    }

    return value
  }

  return (
    <CardLayout
      hover
      padding="0px"
      width={getResponsiveValue({ base: 'full', xl: '240px' })}
      direction={getResponsiveValue({ base: 'row', xl: 'column' })}
      spacing="0px"
      {...rest}
    >
      <Box
        width={getResponsiveValue({ base: '125px', xl: 'full' })}
        height={getResponsiveValue({ base: '125px', xl: '200px' })}
      >
        <ImageWithReload
          width="100%"
          height="100%"
          objectFit="cover"
          src={imageSrc}
          alt={`${title}-header-image`}
        />
      </Box>
      <VStack
        flex={1}
        width={getResponsiveValue({ base: 'auto', xl: '100%' })}
        minWidth={getResponsiveValue({ base: '170px', xl: 'auto' })}
        padding="10px"
        alignItems="start"
        justifyContent="space-between"
        overflow="hidden"
        spacing="0px"
      >
        <H3 isTruncated width="100%">
          {title}
        </H3>
        <Box width="100%">
          <AvatarElement borderRadius="50%" user={user} noLink />
        </Box>
        <FundingStatWithFollow
          width="100%"
          fundersCount={fundersCount}
          amountFunded={amountFunded}
          projectId={projectId}
          justifyContent={
            isMobile
              ? 'start'
              : {
                  base: 'space-between',
                  sm: 'start',
                  xl: 'space-between',
                }
          }
          spacing={isMobile ? '25px' : { base: '0px', sm: '25px', xl: '0px' }}
        />
      </VStack>
    </CardLayout>
  )
}

export const LandingCardBaseSkeleton = ({
  isMobile,
}: {
  isMobile?: boolean
}) => {
  const getResponsiveValue = (value: any) => {
    if (isMobile) {
      return { base: value.base }
    }

    return value
  }

  return (
    <CardLayout
      padding="0px"
      width={getResponsiveValue({ base: 'full', xl: '240px' })}
      direction={getResponsiveValue({ base: 'row', xl: 'column' })}
      spacing="0px"
    >
      <Skeleton
        width={getResponsiveValue({ base: '125px', xl: 'full' })}
        height={getResponsiveValue({ base: '125px', xl: '200px' })}
      ></Skeleton>
      <VStack
        flex={1}
        width={getResponsiveValue({ base: 'auto', xl: '100%' })}
        minWidth={getResponsiveValue({ base: '170px', xl: 'auto' })}
        padding="10px"
        alignItems="start"
        justifyContent="center"
        overflow="hidden"
      >
        <Skeleton borderRadius="8px" width="100%" height="20px" />
        <HStack width="100%" overflow="hidden">
          <SkeletonCircle size={'20px'} />
          <SkeletonText flex="1" noOfLines={1} />
        </HStack>
        <Skeleton borderRadius="8px" width="100%" height="20px" />
        <Skeleton borderRadius="8px" width="100%" height="20px" />
      </VStack>
    </CardLayout>
  )
}
