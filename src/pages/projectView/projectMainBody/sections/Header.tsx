import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineCalendar } from 'react-icons/ai'

import { CardLayout } from '../../../../components/layouts'
import { ImageWithReload, ProjectStatusLabel } from '../../../../components/ui'
import { VideoPlayer } from '../../../../components/ui/VideoPlayer'
import { useProjectContext } from '../../../../context'
import { validateImageUrl } from '../../../../forms/validations/image'
import { useMobileMode } from '../../../../utils'
import {
  FollowButton,
  LightningAddress,
  ProjectFundingQR,
  ProjectMenu,
  SummaryInfoLine,
} from '../components'
import { CreatorSocial } from './CreatorSocial'

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { project, isProjectOwner } = useProjectContext()

  if (!project) {
    return null
  }

  const statusContent = (
    <HStack>
      <ProjectStatusLabel project={project} />
      {isProjectOwner && <ProjectMenu projectName={project.name} />}
    </HStack>
  )

  const renderImageOrVideo = () => {
    const isImage = validateImageUrl(project.image)

    if (isImage) {
      return (
        <ImageWithReload
          width="100%"
          maxHeight="350px"
          objectFit="cover"
          borderRadius="8px"
          src={project.image || undefined}
        />
      )
    }

    if (project.image && !isImage) {
      return <VideoPlayer url={project.image} />
    }

    return null
  }

  return (
    <CardLayout ref={ref} mobileDense>
      <Box>{renderImageOrVideo()}</Box>
      <HStack flexGrow={1} width="100%" spacing={3} alignItems="start">
        <ImageWithReload
          borderRadius="8px"
          objectFit="cover"
          src={project.thumbnailImage || undefined}
          width={{ base: '50px', lg: '80px' }}
          height={{ base: '50px', lg: '80px' }}
          maxHeight="80px"
        />
        <VStack
          flex={1}
          alignItems="start"
          // maxWidth="calc(100% - 76px - 24px)"
          spacing={0}
        >
          <HStack w="full">
            <Text flex={1} variant={{ base: 'h2', xl: 'h1' }} width="100%">
              {project.title}
            </Text>
            {!isMobile && statusContent}
          </HStack>
          {isMobile && <HStack w="full">{statusContent}</HStack>}

          {!isMobile && (
            <HStack width="100%" flexWrap="wrap">
              <HStack flexGrow={1} flexWrap="wrap">
                <LightningAddress name={`${project.name}@geyser.fund`} />
                <ProjectFundingQR project={project} />
              </HStack>
              <FollowButton projectId={project.id} />
            </HStack>
          )}
        </VStack>
      </HStack>

      {isMobile ? (
        <>
          <HStack flexGrow={1}>
            <FollowButton projectId={project.id} />
            <LightningAddress name={`${project.name}@geyser.fund`} />
            <ProjectFundingQR project={project} />
          </HStack>
        </>
      ) : null}

      <Text variant={{ base: 'h3', xl: 'h2' }}>{project.shortDescription}</Text>

      <HStack spacing={5} w="100%" flexWrap="wrap">
        <CreatorSocial />
        <SummaryInfoLine
          label={t('Launched')}
          icon={
            <span>
              <AiOutlineCalendar color="neutral.600" />
            </span>
          }
        >
          <Text variant="body2" color="neutral.600">{`${t(
            'Launched',
          )} ${DateTime.fromMillis(Number(project.createdAt)).toFormat(
            'dd LLL yyyy',
          )}`}</Text>
        </SummaryInfoLine>
      </HStack>
    </CardLayout>
  )
})
