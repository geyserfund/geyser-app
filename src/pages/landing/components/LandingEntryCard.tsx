import {
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { H3 } from '../../../components/typography'
import { ImageWithReload } from '../../../components/ui'
import { getPath } from '../../../constants'
import { Entry, Project } from '../../../types'
import { toSmallImageUrl } from '../../../utils'
import { AvatarElement } from '../../projectView/projectMainBody/components'
import { FundingStatWithFollow } from './FundingStatWithFollow'

interface LandingProjectCardProps extends CardLayoutProps {
  entry: Entry
  isMobile?: boolean
}

export const LandingProjectCard = ({
  entry,
  isMobile,
  ...rest
}: LandingProjectCardProps) => {
  const getResponsiveValue = (value: any) => {
    if (isMobile) {
      return { base: value.base }
    }

    return value
  }

  return (
    <CardLayout
      hover
      as={Link}
      to={getPath('entry', entry.id)}
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
          grey
          width="100%"
          height="100%"
          objectFit="cover"
          src={toSmallImageUrl(`${entry.image}`)}
        />
      </Box>
      <VStack
        flex={1}
        width={getResponsiveValue({ base: 'auto', xl: '100%' })}
        minWidth={getResponsiveValue({ base: '170px', md: 'auto' })}
        padding="10px"
        alignItems="start"
        justifyContent="center"
        overflow="hidden"
      >
        <H3 isTruncated width="100%">
          {entry.title}
        </H3>
        <Box width="100%" overflow="hidden">
          <AvatarElement borderRadius="50%" user={entry.creator} noLink />
        </Box>
        <FundingStatWithFollow
          fundersCount={entry.fundersCount}
          amountFunded={entry.amountFunded}
          width="100%"
          justifyContent={{
            base: 'space-between',
            sm: 'start',
            xl: 'space-between',
          }}
          spacing={{ base: '0px', sm: '30px', xl: '0px' }}
        />
      </VStack>
    </CardLayout>
  )
}

export const LandingProjectCardSkeleton = ({
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
        minWidth={getResponsiveValue({ base: '170px', md: 'auto' })}
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
