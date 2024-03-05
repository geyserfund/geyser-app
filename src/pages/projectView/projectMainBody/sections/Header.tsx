import { Box, HStack, Modal, ModalContent, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsArrowRight } from 'react-icons/bs'

import { CardLayout } from '../../../../components/layouts'
import { Body1 } from '../../../../components/typography'
import { ImageWithReload, ProjectStatusLabel } from '../../../../components/ui'
import { VideoPlayer } from '../../../../components/ui/VideoPlayer'
import { FlashMembershipCountUrl, ID, projectFlashIds, projectsWithSubscription } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { validateImageUrl } from '../../../../forms/validations/image'
import { ProjectStatus, WalletStatus } from '../../../../types'
import { toInt, useMobileMode } from '../../../../utils'
import { toLargeImageUrl } from '../../../../utils/tools/imageSizes'
import { useFollowedProjectsValue } from '../../../auth/state'
import { SubscribeButton } from '../../projectActivityPanel/screens/info/components'
import { ContributeButton, FollowButton, LightningAddress, ProjectFundingQR, ShareButton } from '../components'
import { NpubDisplay } from '../components/NpubDisplay'
import { CreatorSocial } from './CreatorSocial'

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const followedProjects = useFollowedProjectsValue()
  const isMobile = useMobileMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [subscribers, setSubscribers] = useState(0)
  const isProjectSubscriptionEnabled = project && projectsWithSubscription.includes(project?.name)

  useEffect(() => {
    if (isProjectSubscriptionEnabled) {
      const flashId = projectFlashIds[project?.name]
      if (flashId) {
        getSubscriptionValue(flashId)
      }
    }
  }, [isProjectSubscriptionEnabled, project])

  if (!project) {
    return null
  }

  const getSubscriptionValue = async (flashId: number) => {
    const value = await fetch(`${FlashMembershipCountUrl}?geyser_flash_id=${flashId}`).then((res) => res.json())
    setSubscribers(toInt(`${value.membership_count}`))
  }

  const statusContent = () => {
    if (project.status === ProjectStatus.Active && project?.wallets[0]?.state.status === WalletStatus.Ok) {
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
      <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? 'md' : 'xl'} isCentered>
        <ModalOverlay />
        <ModalContent padding="0" minWidth="0">
          <img src={toLargeImageUrl(project.thumbnailImage || '')} alt={project.title} />
        </ModalContent>
      </Modal>
      <CardLayout
        ref={ref}
        mobileDense
        paddingX={{ base: 0, lg: '20px' }}
        paddingTop={{ base: '0', lg: '20px' }}
        spacing="10px"
      >
        {statusContent()}
        <Box>{renderImageOrVideo()}</Box>
        <VStack w="full" spacing="10px" paddingX={{ base: '10px', lg: 0 }} alignItems="start">
          <HStack flexGrow={1} width="100%" spacing={3} alignItems="center">
            <ImageWithReload
              borderRadius="8px"
              objectFit="cover"
              src={project.thumbnailImage || ''}
              width={{ base: '42px', lg: '80px' }}
              height={{ base: '42px', lg: '80px' }}
              maxHeight="80px"
              alignSelf={'start'}
              onClick={onOpen}
              cursor={'pointer'}
            />
            <Text flex={1} variant="h2" width="100%" color="neutral.900">
              {project.title}
              {'!'}
            </Text>
          </HStack>
          <Text variant="h3" color="neutral.900">
            {project.shortDescription}
          </Text>
          <HStack w="full">
            <NpubDisplay npub={project?.keys.nostrKeys.publicKey.npub} />
            <LightningAddress name={`${project.name}`} isGeyser />
            <ProjectFundingQR project={project} />
          </HStack>
          <HStack w="full" color="neutral.600" flexWrap={'wrap'}>
            <Body1 semiBold>{`${project.fundersCount} ${t('contributors')}`}</Body1>
            <Text paddingBottom="22px" lineHeight={0} fontSize="40px">
              .
            </Text>
            <Body1 semiBold>{`${project.followers?.length || 0} ${t('followers')}`}</Body1>
            {subscribers && (
              <>
                <Text paddingBottom="22px" lineHeight={0} fontSize="40px">
                  .
                </Text>
                <Body1 semiBold>{`${subscribers || 0} ${t('subscribers')}`}</Body1>
              </>
            )}
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
              <HStack w="full">
                <ContributeButton flex={1} />
                <SubscribeButton flex={1} projectName={project.name} projectTitle={project.title} />
              </HStack>

              {followedProjects.some((followedProject) => followedProject?.id === project?.id) ? (
                <ShareButton w="full" />
              ) : (
                <FollowButton size="md" w="full" project={project} />
              )}
            </VStack>
          )}
        </VStack>
      </CardLayout>
    </>
  )
})
