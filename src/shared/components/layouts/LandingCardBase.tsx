import { Box, HStack, Icon, Skeleton, SkeletonCircle, SkeletonText, Tooltip, VStack } from '@chakra-ui/react'

import { H3 } from '../../../components/typography'
import {
  ImageWithReload,
  ProjectStatusColors,
  ProjectStatusIcons,
  ProjectStatusLabels,
  ProjectStatusTooltip,
} from '../../../components/ui'
import { AvatarElement } from '../../../modules/project/pages/projectView/views/projectActivityPanel/components'
import { SubscribeButton } from '../../../modules/project/pages/projectView/views/projectActivityPanel/screens/info/components'
import {
  FundingStatWithFollow,
  FundingStatWithFollowProps,
} from '../../../pages/landing/components/FundingStatWithFollow'
import { EntryForLandingPageFragment, ProjectForLandingPageFragment } from '../../../types'
import { CardLayout, CardLayoutProps } from '.'

export interface LandingCardBaseProps extends FundingStatWithFollowProps, CardLayoutProps {
  isMobile?: boolean
  projectStatus?: ProjectStatusLabels
  imageSrc: string
  title: string
  user?: EntryForLandingPageFragment['creator'] | ProjectForLandingPageFragment['owners'][number]['user']
  hasSubscribe?: boolean
}

export const LandingCardBase = ({
  isMobile,
  projectStatus,
  imageSrc,
  title,
  fundersCount,
  amountFunded,
  project,
  user,
  hasSubscribe,
  ...rest
}: LandingCardBaseProps) => {
  const getResponsiveValue = (value: any) => {
    if (isMobile) {
      return { base: value.base }
    }

    return value
  }

  const StatusIcon = projectStatus && ProjectStatusIcons[projectStatus]
  const StatusTooltip = projectStatus && ProjectStatusTooltip[projectStatus]
  const StatusColor = projectStatus && ProjectStatusColors[projectStatus]

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
        <ImageWithReload width="100%" height="100%" objectFit="cover" src={imageSrc} alt={`${title}-header-image`} />
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
        <HStack w="full">
          <H3 flex={1} isTruncated width="100%">
            {title}
          </H3>
          {StatusIcon && (
            <Tooltip label={StatusTooltip}>
              <span>
                <Icon as={StatusIcon} color={StatusColor} />
              </span>
            </Tooltip>
          )}
        </HStack>

        {user && (
          <Box width="100%">
            <AvatarElement borderRadius="50%" user={user} noLink />
          </Box>
        )}
        {hasSubscribe ? (
          <SubscribeButton
            size="sm"
            mt="10px"
            w="full"
            projectName={project.name}
            projectTitle={project.title}
            noIcon
          />
        ) : (
          <FundingStatWithFollow
            width="100%"
            fundersCount={fundersCount}
            amountFunded={amountFunded}
            project={project}
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
        )}
      </VStack>
    </CardLayout>
  )
}

export const LandingCardBaseSkeleton = ({ isMobile }: { isMobile?: boolean }) => {
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
