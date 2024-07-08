import { Box, HStack, SkeletonText, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { CardLayout, CardLayoutProps, SkeletonLayout } from '../../../../../../../components/layouts'
import { Body1, Body2 } from '../../../../../../../components/typography'
import { ImageWithReload, ProjectStatusLabel } from '../../../../../../../components/ui'
import { getPath } from '../../../../../../../constants'
import { ProjectForProfilePageFragment } from '../../../../../../../types'
import { commaFormatted, toSmallImageUrl } from '../../../../../../../utils'
import { FollowButton } from '../../../../../../project/pages/projectView/views/projectMainBody/components'

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

  if (!project) {
    return null
  }

  return (
    <CardLayout
      as={Link}
      to={getPath('project', project.name)}
      padding="10px"
      direction={'row'}
      w="full"
      alignItems="start"
      overflow="visible"
      {...rest}
    >
      <Box width="70px" height="70px">
        <ImageWithReload
          w="100%"
          h="100%"
          objectFit="cover"
          src={toSmallImageUrl(project.thumbnailImage || '')}
          alt={`${project.title}-header-image`}
          borderRadius="8px"
        />
      </Box>

      <VStack w={`calc(100% - 80px)`} alignItems="flex-start">
        <HStack w="full" justifyContent={'space-between'}>
          <Body1 xBold color="neutral.900" isTruncated>
            {project.title}
          </Body1>
          {showStatus && <ProjectStatusLabel iconOnly project={project} />}
          {showFollow && <FollowButton useCase="icon" project={project} />}
        </HStack>
        <Body1 color="neutral.600" lineHeight={1.2}>
          {project.shortDescription}
        </Body1>
        {showStats && (
          <HStack w="full" spacing="20px">
            <Body2 color="neutral.600">
              <Box as="span" color="neutral.900">
                {project.fundersCount}{' '}
              </Box>{' '}
              {t('Contributors')}
            </Body2>
            <Body2 color="neutral.600">
              <Box as="span" color="neutral.900">
                {commaFormatted(project.balance)}{' '}
              </Box>{' '}
              {t('Sats funded')}
            </Body2>
          </HStack>
        )}
      </VStack>
    </CardLayout>
  )
}

export const ProfileProjectCardSkeleton = (props: CardLayoutProps) => {
  return (
    <CardLayout padding="10px" direction={'row'} w="full" alignItems="start" overflow="visible" {...props}>
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
