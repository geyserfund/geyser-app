import { Box, HStack, SkeletonText, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { FollowButton } from '@/modules/project/pages1/projectView/views/body/components'
import { Body } from '@/shared/components/typography'

import { ImageWithReload, ProjectStatusIcon } from '../../../../../../../components/ui'
import { CardLayout, CardLayoutProps, SkeletonLayout } from '../../../../../../../shared/components/layouts'
import { getPath } from '../../../../../../../shared/constants'
import { ProjectForProfilePageFragment } from '../../../../../../../types'
import { commaFormatted, toSmallImageUrl } from '../../../../../../../utils'

interface ProfileProjectCardProps extends Omit<CardLayoutProps, 'to'> {
  project: ProjectForProfilePageFragment
  showStatus?: boolean
  showFollow?: boolean
  showStats?: boolean
}

export const ProfileProjectCard = ({
  project,
  showStatus,
  showFollow,
  showStats,
  ...rest
}: ProfileProjectCardProps) => {
  const { t } = useTranslation()

  const wallet = project?.wallets?.[0]

  if (!project || !wallet) {
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
      <Box width="70px" height="70px" overflow={'hidden'} borderRadius="8px">
        <ImageWithReload
          w="100%"
          h="100%"
          objectFit="cover"
          src={toSmallImageUrl(project.thumbnailImage || '')}
          alt={`${project.title}-header-image`}
        />
      </Box>

      <VStack w={`calc(100% - 80px)`} alignItems="flex-start" spacing={0}>
        <HStack w="full" justifyContent={'space-between'}>
          <Body bold isTruncated>
            {project.title}
          </Body>
          {showStatus && <ProjectStatusIcon project={project} wallet={wallet} />}
          {showFollow && <FollowButton project={project} />}
        </HStack>
        <Body light lineHeight={1.2}>
          {project.shortDescription}
        </Body>
        {showStats && (
          <HStack w="full" spacing="20px">
            <Body size="sm" light>
              {t('Contributors')}
              {': '}
              <Body as="span" dark>
                {commaFormatted(project.balance)}
              </Body>
              {' sats '}
            </Body>

            <Body size="sm" light>
              {t('Funded')}
              {': '}
              <Body as="span" dark>
                {project.fundersCount}
              </Body>
            </Body>
          </HStack>
        )}
      </VStack>
    </CardLayout>
  )
}

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
