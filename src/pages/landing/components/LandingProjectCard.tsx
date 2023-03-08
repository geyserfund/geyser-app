import {
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { Body2, H3 } from '../../../components/typography'
import { ImageWithReload } from '../../../components/ui'
import { getPath } from '../../../constants'
import { Project } from '../../../types'
import { AvatarElement } from '../../projectView/projectMainBody/components'
import { FundingStatWithFollow } from './FundingStatWithFollow'

interface LandingProjectCardProps extends CardLayoutProps {
  project: Project
  isMobile?: boolean
  showDescription?: boolean
}

export const LandingProjectCard = ({
  project,
  isMobile,
  showDescription,
  ...rest
}: LandingProjectCardProps) => {
  const navigate = useNavigate()
  const getResponsiveValue = (value: any) => {
    if (isMobile) {
      return { base: value.base }
    }

    return value
  }

  return (
    <CardLayout
      hover
      onClick={() => navigate(getPath('project', project.name))}
      padding="0px"
      width={getResponsiveValue({ base: 'full', xl: '240px' })}
      direction={getResponsiveValue({ base: 'row', xl: 'column' })}
      spacing="0px"
      {...rest}
    >
      <Box
        width={getResponsiveValue({ base: '150px', xl: 'full' })}
        height={getResponsiveValue({ base: 'auto', xl: '200px' })}
        maxHeight={getResponsiveValue({ base: '170px', xl: 'auto' })}
      >
        <ImageWithReload
          grey
          width="100%"
          height="100%"
          objectFit="cover"
          src={project.thumbnailImage || ''}
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
          {project.title}
        </H3>
        {showDescription && (
          <Body2
            color="neutral.800"
            noOfLines={2}
            width="100%"
            isTruncated
            whiteSpace="normal"
          >
            {project.shortDescription}
          </Body2>
        )}
        <Box width="100%" overflow="hidden">
          <AvatarElement
            borderRadius="50%"
            user={project.owners[0].user}
            noLink
          />
        </Box>
        <FundingStatWithFollow
          width="100%"
          fundersCount={project.fundersCount || 0}
          amountFunded={project.balance}
          projectId={project.id}
          justifyContent={{
            base: 'space-between',
            sm: 'start',
            xl: 'space-between',
          }}
          spacing={{ base: '0px', sm: '25px', xl: '0px' }}
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
