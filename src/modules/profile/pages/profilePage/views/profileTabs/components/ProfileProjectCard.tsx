import { Badge, Box, HStack, Icon, SkeletonText, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiHandHeart, PiRecycle, PiRocketLaunch, PiStorefront } from 'react-icons/pi'
import { Link } from 'react-router'

import { FollowButton } from '@/modules/project/pages/projectView/views/body/components'
import { isRecoverableGrantProject } from '@/modules/project/utils/isRecoverableGrantProject.ts'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'

import { ProjectStatusIcon } from '../../../../../../../components/ui'
import { SkeletonLayout } from '../../../../../../../shared/components/layouts'
import { getPath } from '../../../../../../../shared/constants'
import { ProjectForProfilePageFragment, ProjectFundingStrategy } from '../../../../../../../types'
import { commaFormatted, toSmallImageUrl } from '../../../../../../../utils'

interface ProfileProjectCardProps extends Omit<CardLayoutProps, 'to'> {
  project: ProjectForProfilePageFragment
  showStatus?: boolean
  showFollow?: boolean
  showStats?: boolean
  compact?: boolean
  footer?: React.ReactNode
  titleAccessory?: React.ReactNode
  showProjectType?: boolean
}

export const ProfileProjectCard = ({
  project,
  showStatus,
  showFollow,
  showStats,
  compact,
  footer,
  titleAccessory,
  showProjectType,
  ...rest
}: ProfileProjectCardProps) => {
  const { t } = useTranslation()

  const wallet = project?.wallets?.[0]
  const projectTypeBadge = getProjectTypeBadge(project, t)

  if (!project) {
    return null
  }

  return (
    <CardLayout
      noborder
      dense
      as={Link}
      to={getPath('project', project.name)}
      padding={2}
      direction={'row'}
      w="full"
      alignItems="start"
      overflow="visible"
      {...rest}
    >
      <Box
        width={compact ? '56px' : '70px'}
        height={compact ? '56px' : '70px'}
        flexShrink={0}
        overflow={'hidden'}
        borderRadius="8px"
      >
        <ImageWithReload
          w="100%"
          h="100%"
          objectFit="cover"
          src={toSmallImageUrl(project.thumbnailImage || '')}
          alt={`${project.title}-header-image`}
        />
      </Box>

      <VStack w={compact ? `calc(100% - 66px)` : `calc(100% - 80px)`} alignItems="flex-start" spacing={0}>
        <HStack w="full" justifyContent={'space-between'}>
          <Body bold isTruncated flex={1} minW={0}>
            {project.title}
          </Body>
          {titleAccessory}
          {showStatus && <ProjectStatusIcon project={project} wallet={wallet} />}
          {showFollow && <FollowButton project={project} />}
        </HStack>
        {showProjectType ? <ProjectTypeBadge {...projectTypeBadge} /> : null}
        <Body light lineHeight={1.2}>
          {project.shortDescription}
        </Body>
        {showStats && (
          <HStack w="full" spacing="20px">
            <Body size="sm" light>
              {t('Contributions')}
              {': '}
              <Body as="span" dark>
                {commaFormatted(project.balance)}
              </Body>
              {' sats '}
            </Body>

            <Body size="sm" light>
              {t('Contributors')}
              {': '}
              <Body as="span" dark>
                {project.fundersCount}
              </Body>
            </Body>
          </HStack>
        )}
        {footer}
      </VStack>
    </CardLayout>
  )
}

const getProjectTypeBadge = (project: ProjectForProfilePageFragment, t: (key: string) => string) => {
  if (isRecoverableGrantProject(project)) {
    return { label: t('Recoverable Grant'), colorScheme: 'primary1', icon: PiRecycle }
  }

  if (project.fundingStrategy === ProjectFundingStrategy.AllOrNothing) {
    return { label: t('Campaign'), colorScheme: 'success', icon: PiRocketLaunch }
  }

  if (project.fundingStrategy === ProjectFundingStrategy.TakeItAll) {
    return { label: t('Fundraiser'), colorScheme: 'info', icon: PiHandHeart }
  }

  return { label: t('Shop'), colorScheme: 'neutral1', icon: PiStorefront }
}

const ProjectTypeBadge = ({ label, colorScheme, icon }: ReturnType<typeof getProjectTypeBadge>) => (
  <Badge colorScheme={colorScheme} variant="soft" size="sm">
    <HStack spacing={1}>
      <Icon as={icon} boxSize="12px" />
      <Body as="span" size="xs">
        {label}
      </Body>
    </HStack>
  </Badge>
)

export const ProfileProjectCardSkeleton = (props: CardLayoutProps) => {
  return (
    <CardLayout
      noborder
      dense
      padding="10px"
      direction={'row'}
      w="full"
      alignItems="start"
      overflow="visible"
      {...props}
    >
      <Box width="70px" height="70px">
        <SkeletonLayout w="100%" h="100%" />
      </Box>
      <VStack w={`calc(100% - 80px)`} alignItems="flex-start">
        <SkeletonLayout w="100px" h="32px" />
        <SkeletonText w="100%" noOfLines={2} />
      </VStack>
    </CardLayout>
  )
}
