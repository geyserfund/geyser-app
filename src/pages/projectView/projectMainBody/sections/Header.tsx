import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineCalendar } from 'react-icons/ai'

import { CardLayout } from '../../../../components/layouts'
import { Body1 } from '../../../../components/typography'
import { ImageWithReload, ProjectStatusLabel } from '../../../../components/ui'
import { VideoPlayer } from '../../../../components/ui/VideoPlayer'
import { ID } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { validateImageUrl } from '../../../../forms/validations/image'
import { ProjectStatus } from '../../../../types'
import {
  LightningAddress,
  ProjectFundingQR,
  ProjectMenu,
  SummaryInfoLine,
} from '../components'
import { CreatorSocial } from './CreatorSocial'

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectContext()

  if (!project) {
    return null
  }

  const statusContent = () => {
    if (project.status === ProjectStatus.Active) {
      return null
    }

    return (
      <HStack w="full" justifyContent="center" pt={{ base: '10px', lg: '0px' }}>
        <ProjectStatusLabel project={project} />
      </HStack>
    )
  }

  const handleClickDetails = () => {
    const element = document.getElementById(ID.project.details.container)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderImageOrVideo = () => {
    const isImage = validateImageUrl(project.image)

    if (isImage) {
      return (
        <ImageWithReload
          width="100%"
          maxHeight="350px"
          objectFit="cover"
          borderRadius={{ base: 0, lg: '8px' }}
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
    <>
      <CardLayout
        ref={ref}
        mobileDense
        paddingX={{ base: 0, lg: '20px' }}
        paddingTop={{ base: '0', lg: '20px' }}
        spacing="10px"
      >
        {statusContent()}
        <Box>{renderImageOrVideo()}</Box>
        <VStack w="full" spacing="10px" paddingX={{ base: '10px', lg: 0 }}>
          <HStack flexGrow={1} width="100%" spacing={3} alignItems="center">
            <ImageWithReload
              borderRadius="8px"
              objectFit="cover"
              src={project.thumbnailImage || undefined}
              width="42px"
              height="42px"
              maxHeight="80px"
            />
            <HStack w="full" justifyContent="space-between">
              <Text flex={1} variant="h2" width="100%" color="neutral.900">
                {project.title}
              </Text>
              {isProjectOwner && <ProjectMenu projectName={project.name} />}
            </HStack>
          </HStack>
          <Text variant="h3" color="neutral.900">
            {project.shortDescription}
          </Text>
          <HStack w="full">
            <LightningAddress name={`${project.name}@geyser.fund`} />
            <ProjectFundingQR project={project} />
          </HStack>
          <HStack w="full" color="neutral.600">
            <Body1 semiBold>{`${project.fundersCount} contributors`}</Body1>
            <Body1
              semiBold
              _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={handleClickDetails}
            >
              {t('Details >')}
            </Body1>
          </HStack>
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
        </VStack>
      </CardLayout>
    </>
  )
})
