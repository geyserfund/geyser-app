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
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { PiCaretDoubleDown, PiQrCode } from 'react-icons/pi'
import { Link } from 'react-router'

import { ProjectStatusBar } from '@/components/ui'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ID } from '@/shared/constants/components/id.ts'
import { validateImageUrl } from '@/shared/markdown/validations/image'
import { MediaCarousel } from '@/shared/molecules/MediaCarousel'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { useProjectPageHeaderSummaryQuery } from '@/types'

import { ImageWithReload } from '../../../../../../../../shared/components/display/ImageWithReload'
import { Body, H1 } from '../../../../../../../../shared/components/typography'
import {
  FlashMembershipCountUrl,
  getPath,
  projectFlashIds,
  projectsWithSubscription,
} from '../../../../../../../../shared/constants'
import { VideoPlayer } from '../../../../../../../../shared/molecules/VideoPlayer'
import {
  commaFormatted,
  isAllOrNothing,
  removeProjectAmountException,
  toInt,
  useMobileMode,
} from '../../../../../../../../utils'
import { toLargeImageUrl } from '../../../../../../../../utils/tools/imageSizes'
import { useProjectAtom, useWalletAtom } from '../../../../../../hooks/useProjectAtom'
import { FollowButton } from '../../components'
import { CreatorEditButton } from '../../components/CreatorEditButton'
import { AonProjectBalanceDisplay } from '../contributionSummary/components/AonProjectBalanceDisplay.tsx'
import { NonProjectProjectIcon } from './components/NonProjectProjectIcon.tsx'
import { PostOnNostr } from './components/PostOnNostr.tsx'
import { ShareProjectButton } from './components/ShareProjectButton'

interface HeaderDetailsProps extends StackProps {
  onOpen: () => void
  summaryLoading: boolean
  summaryError: boolean
}

const HeaderDetails = ({ onOpen, summaryLoading, summaryError, ...props }: HeaderDetailsProps) => {
  const { project, projectOwner } = useProjectAtom()
  const projectImages = project.images || []

  const thumbnailOutlineColor = useColorModeValue('neutralAlpha.4', 'neutralAlpha.6')
  const iconButtonPressStyles = {
    transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1)',
    '&:active': { transform: 'scale(0.96)' },
  }

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
        position={{ base: projectImages[0] ? 'absolute' : 'unset', lg: 'unset' }}
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
          outline="1px solid"
          outlineColor={thumbnailOutlineColor}
          outlineOffset="-1px"
        />
      </Box>
      <VStack maxWidth="full" flex={1} spacing={2} alignItems="start">
        <HStack w="full" alignItems="center" gap={2}>
          <H1 size={'2xl'} medium sx={{ textWrap: 'balance' }}>
            {project.title}
          </H1>
          <NonProjectProjectIcon taxProfile={projectOwner?.user?.taxProfile} />
        </HStack>

        {summaryLoading ? (
          <SkeletonLayout height="20px" w="250px" />
        ) : summaryError ? (
          <Body size="md" medium light>
            {t('Unable to load project summary right now')}
          </Body>
        ) : (
          <HStack w="full" flexWrap={'wrap'} paddingTop={1}>
            <Body size="md" medium light sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {t('Contributors: {{count}}', { count: project.fundersCount ?? 0 })}
            </Body>
            <Body size="md" medium light sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {t('Followers: {{count}}', { count: project.followersCount ?? 0 })}
            </Body>

            {subscribers && (
              <Body size="md" medium light sx={{ fontVariantNumeric: 'tabular-nums' }}>
                {t('{{count}} subscribers', { count: subscribers || 0 })}
              </Body>
            )}
          </HStack>
        )}

        <HStack w="full" paddingTop={1} justifyContent="space-between" flexWrap={'wrap'}>
          <HStack>
            <IconButton
              aria-label={t('Go to project details')}
              icon={<PiCaretDoubleDown />}
              variant="soft"
              colorScheme="neutral1"
              onClick={handleClickDetails}
              sx={iconButtonPressStyles}
            />
            <IconButton
              aria-label={t('Go to project Lightning QR')}
              icon={<PiQrCode fontSize="20px" />}
              variant="soft"
              colorScheme="neutral1"
              onClick={handleClickLightingQR}
              sx={iconButtonPressStyles}
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
  const isAON = isAllOrNothing(project)

  const renderBalanceInfo = () => {
    if (isAON) {
      return <AonProjectBalanceDisplay />
    }

    return (
      <>
        {project.balance > 0 && (
          <Body size="lg" bold sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {commaFormatted(project.balance)}
            <Body as="span">{' sats'}</Body>
          </Body>
        )}
        <Body size="sm" sx={{ fontVariantNumeric: 'tabular-nums' }}>
          {`${formatAmount(project.balanceUsdCent, 'USDCENT')}`}{' '}
          <Body as="span" light>
            {t('raised')}
          </Body>
        </Body>
      </>
    )
  }

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
      {renderBalanceInfo()}
    </VStack>
  )
}

export const Header = () => {
  const { project, isProjectOwner, loading, partialUpdateProject } = useProjectAtom()
  const { wallet } = useWalletAtom()
  const projectImages = project.images || []

  const headerMediaOutlineColor = useColorModeValue('neutralAlpha.4', 'neutralAlpha.6')

  const isMobile = useMobileMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { loading: summaryLoading, error: summaryError } = useProjectPageHeaderSummaryQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        name: project?.name || '',
      },
    },
    skip: !project.name,
    onCompleted(data) {
      if (data.projectGet) {
        partialUpdateProject(data.projectGet)
      }
    },
  })
  const renderImageOrVideo = () => {
    const primaryProjectImage = projectImages[0]
    const isImage = validateImageUrl(primaryProjectImage)

    if (isImage) {
      return (
        <ImageWithReload
          width="100%"
          height="100%"
          maxHeight={dimensions.project.header.maxHeight}
          objectFit="contain"
          src={primaryProjectImage || undefined}
          alt={`${project.title} project image`}
        />
      )
    }

    return <VideoPlayer url={primaryProjectImage} />
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

        {projectImages.length === 1 && (
          <Box
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              border: '1px solid',
              borderColor: headerMediaOutlineColor,
            }}
          >
            {renderImageOrVideo()}
          </Box>
        )}

        {projectImages.length > 1 && <MediaCarousel altText={'Project header image'} links={projectImages} />}
        <HeaderDetails onOpen={onOpen} summaryLoading={summaryLoading} summaryError={Boolean(summaryError)} />
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
