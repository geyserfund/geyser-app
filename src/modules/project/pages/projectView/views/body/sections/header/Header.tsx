import {
  Badge,
  Box,
  HStack,
  Icon,
  IconButton,
  Link as ChakraLink,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  Stack,
  StackProps,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { PiArrowsClockwiseBold, PiFlag, PiMapPin } from 'react-icons/pi'
import { Link } from 'react-router'

import { ProjectStatusBar } from '@/components/ui'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ProjectCategoryLabel, ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'
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
import { ProjectShareModal } from './shareModal'

const REPORT_PROJECT_AIRTABLE_URL = 'https://airtable.com/appyM7XlNIWVypuP5/pagpNDtO12bhTK6hQ/form'

interface HeaderDetailsProps extends StackProps {
  onOpen: () => void
  summaryLoading: boolean
  summaryError: boolean
  isProjectOwner: boolean
}

const HeaderDetails = ({ onOpen, summaryLoading, summaryError, isProjectOwner, ...props }: HeaderDetailsProps) => {
  const { project, projectOwner } = useProjectAtom()
  const projectImages = project.images || []
  const isRecoverableGrant = Boolean((project as typeof project & { isRecoverableGrant?: boolean }).isRecoverableGrant)

  const thumbnailOutlineColor = useColorModeValue('neutralAlpha.4', 'neutralAlpha.6')
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
        <HStack w="full" alignItems="start" justifyContent="space-between" gap={3}>
          <HStack alignItems="center" gap={2} minW={0}>
            <H1 size={'2xl'} medium sx={{ textWrap: 'balance' }}>
              {project.title}
            </H1>
            <NonProjectProjectIcon taxProfile={projectOwner?.user?.taxProfile} />
          </HStack>
          <HeaderActions isProjectOwner={isProjectOwner} />
        </HStack>

        {summaryLoading && !isRecoverableGrant ? (
          <SkeletonLayout height="20px" w="250px" />
        ) : summaryError && !isRecoverableGrant ? (
          <Body size="md" medium light>
            {t('Unable to load project summary right now')}
          </Body>
        ) : !isRecoverableGrant ? (
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
        ) : null}

        <HStack w="full" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={3}>
          <ProjectHeaderTags />
        </HStack>
      </VStack>
    </Stack>
  )
}

const HeaderActions = ({ isProjectOwner }: { isProjectOwner: boolean }) => {
  const { project } = useProjectAtom()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const isRecoverableGrant = Boolean((project as typeof project & { isRecoverableGrant?: boolean }).isRecoverableGrant)
  const shareLabel = isRecoverableGrant ? t('Share') : t('Share & Earn')

  if (isProjectOwner) {
    return <CreatorEditButton as={Link} to={getPath('dashboardInfo', project.name)} flexShrink={0} />
  }

  return (
    <>
      <HStack spacing={2} flexShrink={0}>
        <ReportProjectButton />
        <Tooltip label={shareLabel}>
          <IconButton
            aria-label={shareLabel}
            icon={<PiArrowsClockwiseBold />}
            variant="soft"
            colorScheme="neutral1"
            size="md"
            onClick={onOpen}
          />
        </Tooltip>
        <FollowButton project={project} size="md" tooltipLabel={t('Follow')} />
      </HStack>
      <ProjectShareModal isOpen={isOpen} onClose={onClose} projectId={project.id} title={project.title} />
    </>
  )
}

const ReportProjectButton = () => {
  return (
    <Tooltip label={t('Report')}>
      <IconButton
        aria-label={t('Report')}
        as={ChakraLink}
        href={REPORT_PROJECT_AIRTABLE_URL}
        isExternal
        icon={<PiFlag />}
        variant="soft"
        colorScheme="neutral1"
        size="md"
      />
    </Tooltip>
  )
}

type ProjectHeaderTagVariant = 'category' | 'facilitated' | 'location' | 'tag'

type ProjectHeaderTag = {
  label: string
  variant: ProjectHeaderTagVariant
  to?: string
}

type ProjectHeaderTagProject = ReturnType<typeof useProjectAtom>['project'] & {
  fieldPartner?: { id?: string | null; username?: string | null } | null
  isRecoverableGrant?: boolean
}

const getProjectHeaderLocationFilter = (project: ProjectHeaderTagProject) => {
  const searchParams = new URLSearchParams()

  if (project.location?.country?.code && project.location.country.name !== 'Online') {
    searchParams.set('countryCode', project.location.country.code)
  }

  if (project.location?.region) {
    searchParams.set('region', project.location.region)
  }

  return searchParams
}

const getProjectHeaderTags = (project: ProjectHeaderTagProject) => {
  const tags: ProjectHeaderTag[] = []
  const locationLabel = [project.location?.country?.name, project.location?.region].filter(Boolean).join(', ')
  const locationFilter = getProjectHeaderLocationFilter(project)

  if (project.isRecoverableGrant && project.fieldPartner?.username) {
    tags.push({
      label: t('Facilitated by {{fieldPartnerName}}', { fieldPartnerName: project.fieldPartner.username }),
      variant: 'facilitated',
      to: project.fieldPartner.id ? getPath('userProfile', project.fieldPartner.id) : undefined,
    })
  }

  if (project.category) {
    tags.push({
      label: ProjectCategoryLabel[project.category] ?? project.category,
      variant: 'category',
      to: getPath('discoveryProjectsCategory', project.category),
    })
  }

  if (project.subCategory) {
    tags.push({
      label: ProjectSubCategoryLabel[project.subCategory] ?? project.subCategory,
      variant: 'category',
      to: getPath('discoveryProjectsSubCategory', project.subCategory),
    })
  }

  if (locationLabel) {
    const locationSearch = locationFilter.toString()

    tags.push({
      label: locationLabel,
      variant: 'location',
      to: locationSearch ? `${getPath('discoveryProjects')}?${locationSearch}` : undefined,
    })
  }

  if (project.launchedAt) {
    tags.push({
      label: t('Launched: {{date}}', {
        date: DateTime.fromMillis(Number(project.launchedAt)).toFormat('dd LLL yyyy'),
      }),
      variant: 'tag',
    })
  }

  tags.push(...(project.tags || []).map((tag) => ({ label: tag.label, variant: 'tag' as const })))

  return tags
}

const ProjectHeaderTags = () => {
  const { project } = useProjectAtom()
  const labels = getProjectHeaderTags(project as ProjectHeaderTagProject)

  const uniqueLabels = [...new Map(labels.map((tag) => [tag.label, tag])).values()]

  if (uniqueLabels.length === 0) {
    return null
  }

  return (
    <HStack flexWrap="wrap" gap={2} paddingTop={1}>
      {uniqueLabels.map((tag) => (
        <Badge
          key={tag.label}
          as={tag.to ? Link : undefined}
          to={tag.to}
          borderRadius="full"
          paddingX={2.5}
          paddingY={1}
          textTransform="none"
          fontWeight="medium"
          cursor={tag.to ? 'pointer' : undefined}
          backgroundColor={
            tag.variant === 'category' ? 'warning.1' : tag.variant === 'facilitated' ? 'neutral1.3' : 'neutral1.1'
          }
          color={tag.variant === 'category' ? 'warning.11' : 'neutral1.10'}
          border="1px solid"
          borderColor={
            tag.variant === 'category' ? 'warning.3' : tag.variant === 'facilitated' ? 'neutral1.3' : 'neutral1.6'
          }
          _hover={
            tag.to
              ? {
                  textDecoration: 'none',
                  backgroundColor: tag.variant === 'category' ? 'warning.2' : 'neutral1.2',
                }
              : undefined
          }
        >
          {tag.variant === 'location' && <Icon as={PiMapPin} mr={1} verticalAlign="text-bottom" />}
          {tag.label}
        </Badge>
      ))}
    </HStack>
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
        <HeaderDetails
          onOpen={onOpen}
          summaryLoading={summaryLoading}
          summaryError={Boolean(summaryError)}
          isProjectOwner={isProjectOwner}
        />
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
