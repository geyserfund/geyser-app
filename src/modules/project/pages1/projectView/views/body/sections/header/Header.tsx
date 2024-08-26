import {
  Box,
  HStack,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCaretDoubleDown } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { ProjectStatusBar } from '@/components/ui'
import { validateImageUrl } from '@/shared/markdown/validations/image'

import { ImageWithReload } from '../../../../../../../../shared/components/display/ImageWithReload'
import { CardLayout, SkeletonLayout } from '../../../../../../../../shared/components/layouts'
import { Body, H1 } from '../../../../../../../../shared/components/typography'
import {
  FlashMembershipCountUrl,
  getPath,
  ID,
  projectFlashIds,
  projectsWithSubscription,
} from '../../../../../../../../shared/constants'
import { useProjectPageHeaderSummaryQuery } from '../../../../../../../../types'
import { toInt, useMobileMode } from '../../../../../../../../utils'
import { toLargeImageUrl } from '../../../../../../../../utils/tools/imageSizes'
import { useProjectAtom, useWalletAtom } from '../../../../../../hooks/useProjectAtom'
import { FollowButton } from '../../components'
import { CreatorEditButton } from '../../components/CreatorEditButton'
import { CreatorSocial } from './components/CreatorSocial'
import { LightningAddress } from './components/LightningAddress'
import { NpubDisplay } from './components/NpubDisplay'
import { ShareProjectButton } from './components/ShareProjectButton'
import { VideoPlayer } from './components/VideoPlayer'

export const Header = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner, loading, partialUpdateProject } = useProjectAtom()
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

  const handleClickDetails = () => {
    const element = document.getElementById(ID.project.details.container)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderImageOrVideo = () => {
    const isImage = validateImageUrl(project.image)

    if (isImage) {
      return <ImageWithReload width="100%" maxHeight="330px" objectFit="cover" src={project.image || undefined} />
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

      <CardLayout id={'HEADER_ITEM'} w="full" dense spacing={0} position="relative">
        <ProjectStatusBar project={project} wallet={wallet} isProjectOwner={isProjectOwner} />
        <Box>{renderImageOrVideo()}</Box>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={4}
          w="full"
          paddingX={{ base: 3, lg: 6 }}
          paddingY={{ base: 5, lg: 6 }}
          position="relative"
          alignItems="start"
        >
          <Box position={{ base: project.image ? 'absolute' : 'unset', lg: 'unset' }} top={'-48px'} left={'16px'}>
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

            <HStack w="full" flexWrap={'wrap'}>
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
                <Body size="md" medium light>
                  {`${t('Contributors')}: ${project.fundersCount}`}
                </Body>
                <Body size="md" medium light>
                  {`${t('Followers')}: ${project.followersCount}`}
                </Body>

                {subscribers && <Body size="md" medium light>{`${subscribers || 0} ${t('subscribers')}`}</Body>}
              </HStack>
            )}

            <HStack w="full" paddingTop={1} justifyContent="space-between" flexWrap={'wrap'}>
              <HStack>
                <IconButton
                  aria-label="Go to project details"
                  icon={<PiCaretDoubleDown />}
                  variant="soft"
                  colorScheme="neutral1"
                  onClick={handleClickDetails}
                />
                <FollowButton project={project} />
                <ShareProjectButton />
              </HStack>

              <CreatorEditButton as={Link} to={getPath('dashboardInfo', project.name)} />
            </HStack>
          </VStack>
        </Stack>
      </CardLayout>
    </>
  )
}

export const HeaderSkeleton = () => {
  return (
    <CardLayout w="full" mobileDense padding={0} spacing={0}>
      <Box w="full">
        <Skeleton borderRadius="8px 8px 0px 0px" width="100%" height={{ base: '150px', lg: '220px' }} />
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
            <SkeletonLayout width="24px" height="24px" />
            <SkeletonLayout width="24px" height="24px" />
            <SkeletonLayout width="150px" height="24px" />
          </HStack>
        </VStack>
      </HStack>
    </CardLayout>
  )
}
