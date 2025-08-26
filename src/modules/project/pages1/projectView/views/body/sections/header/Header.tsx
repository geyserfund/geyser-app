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
  StackProps,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { PiCaretDoubleDown, PiQrCode } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { ProjectStatusBar } from '@/components/ui'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { validateImageUrl } from '@/shared/markdown/validations/image'
import { MediaCarousel } from '@/shared/molecules/MediaCarousel'
import { useCurrencyFormatter } from '@/shared/utils/hooks'

import { ImageWithReload } from '../../../../../../../../shared/components/display/ImageWithReload'
import { Body, H1 } from '../../../../../../../../shared/components/typography'
import {
  dimensions,
  FlashMembershipCountUrl,
  getPath,
  ID,
  projectFlashIds,
  projectsWithSubscription,
} from '../../../../../../../../shared/constants'
import { VideoPlayer } from '../../../../../../../../shared/molecules/VideoPlayer'
import { useProjectPageHeaderSummaryQuery } from '../../../../../../../../types'
import { commaFormatted, removeProjectAmountException, toInt, useMobileMode } from '../../../../../../../../utils'
import { toLargeImageUrl } from '../../../../../../../../utils/tools/imageSizes'
import { useProjectAtom, useWalletAtom } from '../../../../../../hooks/useProjectAtom'
import { FollowButton } from '../../components'
import { CreatorEditButton } from '../../components/CreatorEditButton'
import { CreatorSocial } from './components/CreatorSocial'
import { LightningAddressModal } from './components/LightningAddressModal'
import { NonProjectProjectIcon } from './components/NonProjectProjectIcon.tsx'
import { PostOnNostr } from './components/PostOnNostr.tsx'
import { ShareProjectButton } from './components/ShareProjectButton'

interface HeaderDetailsProps extends StackProps {
  onOpen: () => void
}

const HeaderDetails = ({ onOpen, ...props }: HeaderDetailsProps) => {
  const { project, projectOwner, partialUpdateProject } = useProjectAtom()

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

  const getSubscriptionValue = async (flashId: number) => {
    const value = await fetch(`${FlashMembershipCountUrl}?geyser_flash_id=${flashId}`).then((res) => res.json())
    setSubscribers(toInt(`${value.membership_count}`))
  }

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

  const handleClickDetails = () => {
    const element = document.getElementById(ID.project.details.container)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClickLightingQR = () => {
    const element = document.getElementById(ID.project.fundNow.container)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      spacing={4}
      w="full"
      paddingX={{ base: 3, lg: 6 }}
      paddingY={{ base: 5, lg: 6 }}
      position="relative"
      alignItems="start"
      {...props}
    >
      <Box
        position={{ base: project.images[0] ? 'absolute' : 'unset', lg: 'unset' }}
        top={'-48px'}
        left={'16px'}
        zIndex={1}
      >
        <ImageWithReload
          border="2px solid"
          borderColor="neutral1.1"
          borderRadius="16px"
          objectFit="cover"
          src={project.thumbnailImage || ''}
          alt={`${project.title} project thumbnail image`}
          width={'64px'}
          height={'64px'}
          maxHeight="64px"
          alignSelf={'start'}
          onClick={onOpen}
          cursor={'pointer'}
        />
      </Box>
      <VStack maxWidth="full" flex={1} spacing={2} alignItems="start">
        <H1 size={'2xl'} width="100%" medium>
          {project.title}
          <NonProjectProjectIcon taxProfile={projectOwner?.user?.taxProfile} />
        </H1>

        <HStack w="full" flexWrap={'wrap'}>
          <LightningAddressModal name={`${project.name}`} npub={project?.keys?.nostrKeys.publicKey.npub} />
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
            <IconButton
              aria-label="Go to project Lighting QR"
              icon={<PiQrCode fontSize="20px" />}
              variant="soft"
              colorScheme="neutral1"
              onClick={handleClickLightingQR}
            />
            <FollowButton project={project} withLabel />
            <ShareProjectButton />
            <PostOnNostr />
          </HStack>

          <CreatorEditButton as={Link} to={getPath('dashboardInfo', project.name)} />
        </HStack>
      </VStack>
    </Stack>
  )
}

const MobileBalanceInfo = () => {
  const { formatAmount } = useCurrencyFormatter()
  const { project } = useProjectAtom()

  return (
    <VStack
      w="full"
      paddingX={3}
      paddingY={2}
      backgroundColor={'neutral1.3'}
      borderTop="1px solid"
      borderColor="neutral1.6"
      justifyContent="center"
      alignItems="center"
      spacing={0}
    >
      {project.balance > 0 && (
        <Body size="lg" bold>
          {commaFormatted(project.balance)}
          <Body as="span">{' sats'}</Body>
        </Body>
      )}
      <Body size="sm">
        {`${formatAmount(project.balanceUsdCent, 'USDCENT')}`}{' '}
        <Body as="span" light>
          {t('contributed in total')}
        </Body>
      </Body>
    </VStack>
  )
}

export const Header = () => {
  const { project, isProjectOwner, loading } = useProjectAtom()
  const { wallet } = useWalletAtom()

  const isMobile = useMobileMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const renderImageOrVideo = () => {
    const isImage = validateImageUrl(project.images[0])

    if (isImage) {
      return (
        <ImageWithReload
          width="100%"
          height="100%"
          maxHeight={dimensions.project.header.maxHeight}
          objectFit="contain"
          src={project.images[0] || undefined}
          alt={`${project.title} project image`}
        />
      )
    }

    return <VideoPlayer url={project.images[0]} />
  }

  if (loading) {
    return <HeaderSkeleton />
  }

  const hideProjectAmount = removeProjectAmountException(project?.name)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? 'md' : 'xl'} isCentered>
        <ModalOverlay />
        <ModalContent padding="0" minWidth="0">
          <img src={toLargeImageUrl(project.thumbnailImage || '')} alt={project.title} />
        </ModalContent>
      </Modal>

      <CardLayout id={'HEADER_ITEM'} w="full" dense spacing={0} position="relative">
        <ProjectStatusBar project={project} wallet={wallet} isProjectOwner={isProjectOwner} />

        {project.images.length === 1 && <Box>{renderImageOrVideo()}</Box>}

        {project.images.length > 1 && <MediaCarousel altText={'Project header image'} links={project.images} />}
        <HeaderDetails onOpen={onOpen} />
        {isMobile && !hideProjectAmount && <MobileBalanceInfo />}
      </CardLayout>
    </>
  )
}

export const HeaderSkeleton = () => {
  return (
    <CardLayout w="full" mobileDense padding={0} spacing={0}>
      <Box w="full">
        <Skeleton
          borderRadius="8px 8px 0px 0px"
          width="100%"
          height={{ base: '150px', lg: dimensions.project.header.maxHeight }}
        />
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
