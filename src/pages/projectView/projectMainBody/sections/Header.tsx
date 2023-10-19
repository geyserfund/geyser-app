import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { BsArrowRight } from 'react-icons/bs'

import { CardLayout } from '../../../../components/layouts'
import { Body1 } from '../../../../components/typography'
import { ImageWithReload, ProjectStatusLabel } from '../../../../components/ui'
import { VideoPlayer } from '../../../../components/ui/VideoPlayer'
import { ID } from '../../../../constants'
import { useAuthContext, useProjectContext } from '../../../../context'
import { validateImageUrl } from '../../../../forms/validations/image'
import { ProjectStatus, WalletStatus } from '../../../../types'
import { useMobileMode } from '../../../../utils'
import {
  ContributeButton,
  FollowButton,
  LightningAddress,
  ProjectFundingQR,
  ShareButton,
} from '../components'
import { CreatorSocial } from './CreatorSocial'

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { followedProjects } = useAuthContext()
  const isMobile = useMobileMode()

  if (!project) {
    return null
  }

  const statusContent = () => {
    if (
      project.status === ProjectStatus.Active &&
      project?.wallets[0]?.state.status === WalletStatus.Ok
    ) {
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
        <VStack
          w="full"
          spacing="10px"
          paddingX={{ base: '10px', lg: 0 }}
          alignItems="start"
        >
          <HStack flexGrow={1} width="100%" spacing={3} alignItems="center">
            <ImageWithReload
              borderRadius="8px"
              objectFit="cover"
              src={project.thumbnailImage || undefined}
              width={{ base: '42px', lg: '80px' }}
              height={{ base: '42px', lg: '80px' }}
              maxHeight="80px"
              alignSelf={'start'}
            />
            <Text flex={1} variant="h2" width="100%" color="neutral.900">
              {project.title}
            </Text>
          </HStack>
          <Text variant="h3" color="neutral.900">
            {project.shortDescription}
          </Text>
          <HStack w="full">
            <LightningAddress name={`${project.name}@geyser.fund`} />
            <ProjectFundingQR project={project} />
          </HStack>
          <HStack w="full" color="neutral.600">
            <Body1 semiBold>{`${project.fundersCount} ${t(
              'contributors',
            )}`}</Body1>
            <Text paddingBottom="22px" lineHeight={0} fontSize="40px">
              .
            </Text>
            <Body1 semiBold>{`${project.followers?.length || 0} ${t(
              'followers',
            )}`}</Body1>

            <Text paddingBottom="22px" lineHeight={0} fontSize="40px">
              .
            </Text>
            <HStack
              _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={handleClickDetails}
              spacing="5px"
            >
              <Body1 semiBold>{t('Details')}</Body1>
              <BsArrowRight fontWeight={500} display="inline-block" />
            </HStack>
          </HStack>
          <CreatorSocial />
          {isMobile && (
            <VStack w="full" paddingTop="5px">
              <ContributeButton w="full" />

              {followedProjects.some(
                (followedProject) => followedProject?.id === project?.id,
              ) ? (
                <ShareButton w="full" />
              ) : (
                <FollowButton size="md" w="full" projectId={project?.id} />
              )}
            </VStack>
          )}
        </VStack>
      </CardLayout>
    </>
  )
})
