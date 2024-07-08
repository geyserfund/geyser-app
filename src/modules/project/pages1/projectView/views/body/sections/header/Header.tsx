import {
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCaretDoubleDown, PiShareFat } from 'react-icons/pi'

import {
  FlashMembershipCountUrl,
  ID,
  projectFlashIds,
  projectsWithSubscription,
} from '../../../../../../../../constants'
import { validateImageUrl } from '../../../../../../../../forms/validations/image'
import { ImageWithReload } from '../../../../../../../../shared/components/display/ImageWithReload'
import { CardLayout, SkeletonLayout } from '../../../../../../../../shared/components/layouts'
import { Body, H1 } from '../../../../../../../../shared/components/typography'
import { ProjectStatusLabel } from '../../../../../../../../shared/molecules/ProjectStatusLabel'
import { ProjectStatus, useProjectPageHeaderSummaryQuery, WalletStatus } from '../../../../../../../../types'
import { toInt, useMobileMode } from '../../../../../../../../utils'
import { toLargeImageUrl } from '../../../../../../../../utils/tools/imageSizes'
import { useProjectAtom, useWalletAtom } from '../../../../../../hooks/useProjectAtom'
import { FollowButton } from '../../components'
import { CreatorSocial } from './components/CreatorSocial'
import { LightningAddress } from './components/LightningAddress'
import { NpubDisplay } from './components/NpubDisplay'
import { ShareProjectButton } from './components/ShareProjectButton'
import { VideoPlayer } from './components/VideoPlayer'

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const { project, loading, partialUpdateProject } = useProjectAtom()
  const { wallet } = useWalletAtom()

  const isMobile = useMobileMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [subscribers, setSubscribers] = useState(0)
  const isProjectSubscriptionEnabled = project && projectsWithSubscription.includes(project?.name)

  const { loading: summaryLoading } = useProjectPageHeaderSummaryQuery({
    variables: {
      where: {
        name: project?.name,
      },
    },
    skip: !project.name,
    onCompleted(data) {
      if (data.projectGet) {
        partialUpdateProject(data.projectGet)
      }
    },
  })

  useEffect(() => {
    if (isProjectSubscriptionEnabled) {
      const flashId = projectFlashIds[project?.name]
      if (flashId) {
        getSubscriptionValue(flashId)
      }
    }
  }, [isProjectSubscriptionEnabled, project])

  const getSubscriptionValue = async (flashId: number) => {
    const value = await fetch(`${FlashMembershipCountUrl}?geyser_flash_id=${flashId}`).then((res) => res.json())
    setSubscribers(toInt(`${value.membership_count}`))
  }

  const statusContent = () => {
    if (project.status === ProjectStatus.Active && wallet?.state.status === WalletStatus.Ok) {
      return null
    }

    return (
      <HStack w="full" justifyContent="center" pt={{ base: '10px', lg: '0px' }}>
        <ProjectStatusLabel project={project} wallet={wallet} />
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
          maxHeight="330px"
          objectFit="cover"
          borderRadius="8px 8px 0px 0px"
          src={project.image || undefined}
        />
      )
    }

    if (project.image && !isImage) {
      return <VideoPlayer url={project.image} />
    }

    return null
  }

  if (loading) {
    return <HeaderSkeleton />
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? 'md' : 'xl'} isCentered>
        <ModalOverlay />
        <ModalContent padding="0" minWidth="0">
          <img src={toLargeImageUrl(project.thumbnailImage || '')} alt={project.title} />
        </ModalContent>
      </Modal>
      {/* {statusContent()} */}

      <CardLayout w="full" ref={ref} mobileDense padding={0} spacing={0}>
        <Box>{renderImageOrVideo()}</Box>
        <HStack
          spacing={4}
          w="full"
          paddingX={{ base: 4, lg: 6 }}
          paddingY={{ base: 5, lg: 6 }}
          position="relative"
          alignItems="start"
        >
          <Box position={{ base: 'absolute', lg: 'unset' }} top={'-48px'} left={'16px'}>
            <ImageWithReload
              border="2px solid"
              borderColor="neutral1.1"
              borderRadius="16px"
              objectFit="cover"
              src={project.thumbnailImage || ''}
              width={'64px'}
              height={'64px'}
              maxHeight="64px"
              alignSelf={'start'}
              onClick={onOpen}
              cursor={'pointer'}
            />
          </Box>
          <VStack flex={1} spacing={2} alignItems="start">
            <H1 size={'2xl'} width="100%" medium>
              {project.title}
            </H1>

            <HStack w="full">
              <HStack spacing={0.5}>
                <LightningAddress name={`${project.name}`} isGeyser />
                <NpubDisplay npub={project?.keys?.nostrKeys.publicKey.npub} />
              </HStack>
              <CreatorSocial />
            </HStack>

            {summaryLoading ? (
              <SkeletonLayout height="20px" w="250px" />
            ) : (
              <HStack w="full" flexWrap={'wrap'} paddingTop={1}>
                <Body size="xs" medium light>
                  {`${t('Contributors')}: ${project.fundersCount}`}
                </Body>
                <Body size="xs" medium light>
                  {`${t('Followers')}: ${project.followersCount}`}
                </Body>

                {subscribers && <Body size="xs" medium light>{`${subscribers || 0} ${t('subscribers')}`}</Body>}
              </HStack>
            )}

            <HStack w="full" paddingTop={1}>
              <IconButton
                aria-label="Go to project details"
                size="sm"
                icon={<PiCaretDoubleDown />}
                variant="soft"
                colorScheme="neutral1"
                onClick={handleClickDetails}
              />
              <FollowButton project={project} />
              <ShareProjectButton />
            </HStack>
          </VStack>
        </HStack>
      </CardLayout>
    </>
  )
})

export const HeaderSkeleton = () => {
  return (
    <CardLayout w="full" mobileDense padding={0} spacing={0}>
      <Box w="full">
        <Skeleton borderRadius="8px 8px 0px 0px" width="100%" height="330px" />
      </Box>
      <HStack
        spacing={4}
        w="full"
        paddingX={{ base: 4, lg: 6 }}
        paddingY={{ base: 5, lg: 6 }}
        position="relative"
        alignItems="start"
      >
        <Box position={{ base: 'absolute', lg: 'unset' }} top={'-48px'} left={'16px'}>
          <Skeleton
            border="2px solid"
            borderColor="neutral1.1"
            borderRadius="16px"
            objectFit="cover"
            width={'64px'}
            height={'64px'}
            maxHeight="64px"
            alignSelf={'start'}
          />
        </Box>
        <VStack flex={1} spacing={2} alignItems="start">
          <SkeletonLayout width="70%" height="20px" />

          <HStack w="full">
            <SkeletonLayout height="20px" width="150px" />
            <SkeletonLayout height="20px" width="100px" />
            <SkeletonLayout height="20px" width="20px" />
            <SkeletonLayout height="20px" width="20px" />
          </HStack>

          <SkeletonText noOfLines={2} w="40%" />

          <HStack w="full" paddingTop={1}>
            <SkeletonLayout width="32px" height="32px" />
            <SkeletonLayout width="150px" height="32px" />
          </HStack>
        </VStack>
      </HStack>
    </CardLayout>
  )
}
