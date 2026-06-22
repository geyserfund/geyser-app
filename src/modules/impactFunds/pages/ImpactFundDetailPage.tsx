import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Image,
  Link as ChakraLink,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spinner,
  UnorderedList,
  useColorModeValue,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Trans } from 'react-i18next'
import {
  PiArrowUpRightBold,
  PiCaretRightBold,
  PiCoinsBold,
  PiCoinsDuotone,
  PiRocketLaunchDuotone,
} from 'react-icons/pi'
import { Link, useParams } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useAuthContext } from '@/context'
import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useAuthModal } from '@/modules/auth/hooks/useAuthModal'
import { getCommittedAmountDisplay, getSatsAmountDisplay } from '@/modules/impactFunds/utils/formatCommittedAmount.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath, ProjectValidations } from '@/shared/constants/index.ts'
import { MdxMarkdownEditor } from '@/shared/markdown/MdxMarkdownEditor.tsx'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { standardPadding } from '@/shared/styles/index.ts'
import type { ImpactFundApplicationsQuery, ImpactFundQuery } from '@/types'
import {
  ImpactFundApplicationFundingModel,
  ImpactFundApplicationStatus,
  ImpactFundSponsorTier,
  OrderByOptions,
  ProjectStatus,
  useImpactFundApplicationsQuery,
  useImpactFundApplyMutation,
  useImpactFundQuery,
  useProjectPageFundersQuery,
  useUpdateProjectMutation,
} from '@/types'
import { useNotification } from '@/utils'

import { FundingModelsShowcase } from '../components/FundingModelsShowcase.tsx'
import { IMPACT_FUND_DETAILS_SEO_IMAGES } from '../utils/constants.ts'
import {
  impactFundFundingModelItems,
  impactFundFundingOverviewItems,
  impactFundHowItWorksItems,
} from '../utils/informationContent.ts'

const APPLICATIONS_PAGE_SIZE = 15
const DESCRIPTION_PREVIEW_CHAR_LIMIT = 500
const DESCRIPTION_COLLAPSED_MAX_HEIGHT = '240px'
const SPONSOR_INQUIRY_CALENDAR_URL = 'https://cal.com/metamick/thirtymin?overlayCalendar=true'
const APPLY_HASH = '#apply'
const BECOME_SPONSOR_HASH = '#become-a-sponsor'
const LATAM_IMPACT_FUND_NAME = 'latam-impact-fund'
const CIRCULAR_ECONOMY_IMPACT_FUND_NAME = 'circular-economies-impact-fund'
const CIRCULAR_ECONOMY_REPORT_BANNER_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/ce-report-banner.png'
const CIRCULAR_ECONOMY_REPORT_PDF_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/Circular-Economies-Report.pdf'
const satsNumberFormatter = new Intl.NumberFormat()
const awardedApplicationStatuses = [ImpactFundApplicationStatus.Disbursement, ImpactFundApplicationStatus.Funded]
const projectStoryMinLength = ProjectValidations.description.minLength
const projectStoryMaxLength = ProjectValidations.description.maxLength
type FundedApplication = ImpactFundApplicationsQuery['impactFundApplications']['applications'][number]
type OwnedProject = { id: unknown; title: string; description?: string | null }
type SponsorItem = Pick<ImpactFundDetails['liveSponsors'][number], 'id' | 'name' | 'image' | 'url'>
type ViewerApplication = {
  id: string
  status: ImpactFundApplicationStatus
  project: {
    id: string
    name: string
    title: string
  }
}
type ImpactFundDetails = ImpactFundQuery['impactFund'] & {
  canAccessDashboard: boolean
  viewerApplications: ViewerApplication[]
}
type CommunitySupporter = {
  id: string
  username: string
  imageUrl: string | null
}

const getImpactFundProjectDescriptionError = (value: string) => {
  const trimmedLength = value.trim().length

  if (trimmedLength === 0) {
    return t('Project story is required.')
  }

  if (trimmedLength < projectStoryMinLength) {
    return t('Project story should be longer than {{count}} characters.', { count: projectStoryMinLength })
  }

  if (value.length > projectStoryMaxLength) {
    return t('Project story should be shorter than {{count}} characters.', { count: projectStoryMaxLength })
  }

  return ''
}

const fundingModelLabels: Record<ImpactFundApplicationFundingModel, string> = {
  [ImpactFundApplicationFundingModel.DirectGrant]: 'Direct Grant',
  [ImpactFundApplicationFundingModel.Matching]: 'Matching',
  [ImpactFundApplicationFundingModel.AonCofunding]: 'AON Co-Funding',
}
type FundingModelPillStyle = { bg: string; textColor: string }
type FundingModelPillStyles = Record<ImpactFundApplicationFundingModel, FundingModelPillStyle>

function ImpactFundDescriptionPreview({ value }: { value: string }) {
  return <MdxMarkdownEditor mode="preview" value={value} />
}

function getQuarterFromDate(dateString: string): string {
  const date = new Date(dateString)
  const quarter = Math.floor(date.getMonth() / 3) + 1
  const year = date.getFullYear()
  return `Q${quarter} ${year}`
}

function buildFundedApplicationsInput(impactFundId: number, cursorId?: string) {
  return {
    impactFundId,
    statusIn: awardedApplicationStatuses,
    pagination: {
      take: APPLICATIONS_PAGE_SIZE,
      ...(cursorId ? { cursor: { id: cursorId } } : {}),
    },
  }
}

function hasValue<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

function getFundingModelLabel(fundingModel: ImpactFundApplicationFundingModel): string {
  return fundingModelLabels[fundingModel] ?? fundingModel
}

const faqItems = [
  {
    question: 'Who can apply for funding?',
    answer:
      'Any project owner with an active or pre-launch project on Geyser can apply by submitting their project through the application flow.',
  },
  {
    question: 'How are projects selected?',
    answer:
      'Applications are reviewed by an independent allocation committee based on scope, expected impact, and stage of development.',
  },
  {
    question: 'What funding options are available?',
    answer:
      'Projects can be supported through direct grants, capped matching funds, and all-or-nothing co-funding commitments.',
  },
  {
    question: 'Can projects receive support in multiple cycles?',
    answer:
      'Funding is organized in recurring cycles, and projects can be reconsidered based on progress and alignment with current priorities.',
  },
  {
    question: 'How long does review take after I apply?',
    answer:
      'Applications are reviewed on a continuous basis, and all reviews are typically completed within a quarter.',
  },
]

export function ImpactFundDetailPage(): JSX.Element | null {
  const { impactFundName } = useParams<{ impactFundName: string }>()
  const decodedImpactFundName = impactFundName ? decodeURIComponent(impactFundName) : ''
  const { user, isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const { success, error: notifyError } = useNotification()
  const { isOpen: isProjectModalOpen, onOpen: onProjectModalOpen, onClose: onProjectModalClose } = useDisclosure()
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [projectDescription, setProjectDescription] = useState('')
  const [hasConfirmedProjectVision, setHasConfirmedProjectVision] = useState(false)
  const [hasConfirmedImpactMetric, setHasConfirmedImpactMetric] = useState(false)
  const [hasSubmittedApplicationForm, setHasSubmittedApplicationForm] = useState(false)
  const previousAuthQueryKeyRef = useRef<string | null>(null)

  const { data, loading, error, refetch } = useImpactFundQuery({
    variables: { input: { where: { name: decodedImpactFundName } } },
    skip: !impactFundName,
  })

  const [apply, { loading: applying }] = useImpactFundApplyMutation()
  const [updateProject, { loading: updatingProject }] = useUpdateProjectMutation()
  const [isLoadingMoreApplications, setIsLoadingMoreApplications] = useState(false)

  const impactFund = data?.impactFund

  const {
    data: applicationsData,
    loading: applicationsLoading,
    error: applicationsError,
    fetchMore: fetchMoreApplications,
  } = useImpactFundApplicationsQuery({
    skip: !impactFund?.id,
    variables: {
      input: {
        ...buildFundedApplicationsInput(impactFund?.id ?? 0),
      },
    },
  })

  const fundedApplications = applicationsData?.impactFundApplications?.applications ?? []
  const fundedApplicationsCount = applicationsData?.impactFundApplications?.totalCount ?? 0
  const hasMoreFundedApplications = fundedApplications.length < fundedApplicationsCount
  const {
    data: communitySupportersData,
    loading: communitySupportersLoading,
    error: communitySupportersError,
  } = useProjectPageFundersQuery({
    skip: !impactFund?.donateProjectId,
    variables: {
      input: {
        where: {
          projectId: impactFund?.donateProjectId,
          anonymous: false,
          confirmed: true,
        },
        orderBy: {
          amountFunded: OrderByOptions.Desc,
        },
        pagination: {
          take: 100,
        },
      },
    },
  })
  const communitySupporters = useMemo<CommunitySupporter[]>(() => {
    const uniqueSupporters = new Map<string, CommunitySupporter>()

    for (const funder of communitySupportersData?.fundersGet ?? []) {
      const funderUser = funder.user
      if (!funderUser?.id) continue

      const userId = String(funderUser.id)
      if (uniqueSupporters.has(userId)) continue

      uniqueSupporters.set(userId, {
        id: userId,
        username: funderUser.username || t('User'),
        imageUrl: funderUser.imageUrl ?? null,
      })
    }

    return Array.from(uniqueSupporters.values())
  }, [communitySupportersData?.fundersGet])

  useEffect(() => {
    if (!impactFundName) {
      return
    }

    const currentAuthQueryKey = `${isLoggedIn ? 'logged-in' : 'logged-out'}:${user?.id ?? 'anonymous'}`

    if (previousAuthQueryKeyRef.current === null) {
      previousAuthQueryKeyRef.current = currentAuthQueryKey
      return
    }

    if (previousAuthQueryKeyRef.current !== currentAuthQueryKey) {
      previousAuthQueryKeyRef.current = currentAuthQueryKey
      refetch().catch(() => undefined)
    }
  }, [impactFundName, isLoggedIn, refetch, user?.id])

  const ownedProjects = useMemo(
    () =>
      (user?.ownerOf || [])
        .map((owner) => owner.project)
        .filter(
          (project): project is NonNullable<typeof project> =>
            Boolean(project) && project?.status === ProjectStatus.Active,
        ),
    [user?.ownerOf],
  )
  const viewerApplicationProjectIdSet = useMemo(
    () => new Set((impactFund?.viewerApplications ?? []).map((application) => String(application.project.id))),
    [impactFund?.viewerApplications],
  )
  const availableOwnedProjects = useMemo(
    () => ownedProjects.filter((project) => !viewerApplicationProjectIdSet.has(String(project.id))),
    [ownedProjects, viewerApplicationProjectIdSet],
  )
  const selectedProject = useMemo(
    () => availableOwnedProjects.find((project) => String(project.id) === selectedProjectId) ?? null,
    [availableOwnedProjects, selectedProjectId],
  )
  const projectDescriptionError = getImpactFundProjectDescriptionError(projectDescription)
  const hasAvailableProjects = availableOwnedProjects.length > 0
  const shouldDisableApply = isLoggedIn && !hasAvailableProjects

  useEffect(() => {
    if (availableOwnedProjects.length === 0) {
      if (selectedProjectId !== '') {
        setSelectedProjectId('')
      }

      return
    }

    const hasSelectedAvailableProject = availableOwnedProjects.some(
      (project) => String(project.id) === selectedProjectId,
    )
    if (!hasSelectedAvailableProject) {
      setSelectedProjectId(String(availableOwnedProjects[0]?.id || ''))
    }
  }, [availableOwnedProjects, selectedProjectId])

  useEffect(() => {
    setProjectDescription(selectedProject?.description || '')
    setHasConfirmedProjectVision(false)
    setHasConfirmedImpactMetric(false)
    setHasSubmittedApplicationForm(false)
  }, [selectedProject?.id, selectedProject?.description])

  const handleApplyClick = useCallback(() => {
    window.history.replaceState(null, '', APPLY_HASH)

    if (!isLoggedIn) {
      loginOnOpen({ showLightning: false })
      return
    }

    if (!hasAvailableProjects) {
      return
    }

    const firstOwnedProjectId = String(availableOwnedProjects[0]?.id || '')
    setSelectedProjectId(firstOwnedProjectId)
    onProjectModalOpen()
  }, [availableOwnedProjects, hasAvailableProjects, isLoggedIn, loginOnOpen, onProjectModalOpen])

  useEffect(() => {
    if (window.location.hash === APPLY_HASH) {
      handleApplyClick()
    }
  }, [handleApplyClick])

  const submitApplication = async () => {
    if (!impactFund || !selectedProjectId) return

    setHasSubmittedApplicationForm(true)
    if (projectDescriptionError || !hasConfirmedProjectVision || !hasConfirmedImpactMetric) {
      return
    }

    try {
      await updateProject({
        variables: {
          input: { projectId: selectedProjectId, description: projectDescription },
        },
      })

      await apply({
        variables: {
          input: { impactFundId: impactFund.id, projectId: selectedProjectId },
        },
      })

      await refetch()
      success({ title: t('Application submitted') })
      setProjectDescription('')
      setHasConfirmedProjectVision(false)
      setHasConfirmedImpactMetric(false)
      setHasSubmittedApplicationForm(false)
      onProjectModalClose()
    } catch (error) {
      notifyError({ title: t('Failed to apply to impact fund') })
    }
  }

  const loadMoreApplications = async () => {
    if (!impactFund || fundedApplications.length === 0 || !hasMoreFundedApplications || isLoadingMoreApplications) {
      return
    }

    const lastApplication = fundedApplications[fundedApplications.length - 1]
    if (!lastApplication) return

    setIsLoadingMoreApplications(true)
    try {
      await fetchMoreApplications({
        variables: {
          input: {
            ...buildFundedApplicationsInput(impactFund.id, lastApplication.id),
          },
        },
        updateQuery(previousResult, { fetchMoreResult }) {
          if (!fetchMoreResult?.impactFundApplications) {
            return previousResult
          }

          return {
            impactFundApplications: {
              ...fetchMoreResult.impactFundApplications,
              applications: [
                ...previousResult.impactFundApplications.applications,
                ...fetchMoreResult.impactFundApplications.applications,
              ],
            },
          }
        },
      })
    } finally {
      setIsLoadingMoreApplications(false)
    }
  }

  if (loading) {
    return (
      <VStack align="stretch" spacing={14}>
        <Card p={8}>
          <VStack py={8}>
            <Spinner />
          </VStack>
        </Card>
      </VStack>
    )
  }

  if (error) {
    return (
      <VStack align="stretch" spacing={14}>
        <Card p={8}>
          <Body>{t('Failed to load impact fund.')}</Body>
        </Card>
      </VStack>
    )
  }

  if (!impactFund) {
    return null
  }

  return (
    <ImpactFundDetailContent
      impactFund={impactFund}
      fundedApplications={fundedApplications}
      applicationsLoading={applicationsLoading}
      applicationsError={Boolean(applicationsError)}
      hasMoreFundedApplications={hasMoreFundedApplications}
      isLoadingMoreApplications={isLoadingMoreApplications}
      onLoadMoreApplications={loadMoreApplications}
      communitySupporters={communitySupporters}
      communitySupportersLoading={communitySupportersLoading}
      communitySupportersError={Boolean(communitySupportersError)}
      onApplyClick={handleApplyClick}
      shouldDisableApply={shouldDisableApply}
      viewerApplications={impactFund.viewerApplications ?? []}
      ownedProjects={availableOwnedProjects}
      hasOwnedProjects={ownedProjects.length > 0}
      selectedProjectId={selectedProjectId}
      onSelectedProjectIdChange={setSelectedProjectId}
      projectDescription={projectDescription}
      onProjectDescriptionChange={setProjectDescription}
      projectDescriptionError={projectDescriptionError}
      hasConfirmedProjectVision={hasConfirmedProjectVision}
      onHasConfirmedProjectVisionChange={setHasConfirmedProjectVision}
      hasConfirmedImpactMetric={hasConfirmedImpactMetric}
      onHasConfirmedImpactMetricChange={setHasConfirmedImpactMetric}
      hasSubmittedApplicationForm={hasSubmittedApplicationForm}
      isProjectModalOpen={isProjectModalOpen}
      onProjectModalClose={() => {
        setHasSubmittedApplicationForm(false)
        onProjectModalClose()
      }}
      applying={applying || updatingProject}
      onSubmitApplication={submitApplication}
    />
  )
}

type ImpactFundDetailContentProps = {
  impactFund: ImpactFundDetails
  fundedApplications: FundedApplication[]
  applicationsLoading: boolean
  applicationsError: boolean
  hasMoreFundedApplications: boolean
  isLoadingMoreApplications: boolean
  onLoadMoreApplications: () => Promise<void>
  communitySupporters: CommunitySupporter[]
  communitySupportersLoading: boolean
  communitySupportersError: boolean
  onApplyClick: () => void
  shouldDisableApply: boolean
  viewerApplications: ViewerApplication[]
  ownedProjects: OwnedProject[]
  hasOwnedProjects: boolean
  selectedProjectId: string
  onSelectedProjectIdChange: (projectId: string) => void
  projectDescription: string
  onProjectDescriptionChange: (value: string) => void
  projectDescriptionError: string
  hasConfirmedProjectVision: boolean
  onHasConfirmedProjectVisionChange: (value: boolean) => void
  hasConfirmedImpactMetric: boolean
  onHasConfirmedImpactMetricChange: (value: boolean) => void
  hasSubmittedApplicationForm: boolean
  isProjectModalOpen: boolean
  onProjectModalClose: () => void
  applying: boolean
  onSubmitApplication: () => Promise<void>
}

type FundedApplicationsSectionProps = {
  applicationsLoading: boolean
  applicationsError: boolean
  fundedApplications: FundedApplication[]
  hasMoreFundedApplications: boolean
  isLoadingMoreApplications: boolean
  onLoadMoreApplications: () => Promise<void>
  cardBg: string
  mutedBg: string
  emphasisTextColor: string
  secondaryTextColor: string
  subtleTextColor: string
  tertiaryTextColor: string
  fundingModelPillStyles: FundingModelPillStyles
}

function FundedApplicationsSection({
  applicationsLoading,
  applicationsError,
  fundedApplications,
  hasMoreFundedApplications,
  isLoadingMoreApplications,
  onLoadMoreApplications,
  cardBg,
  mutedBg,
  emphasisTextColor,
  secondaryTextColor,
  subtleTextColor,
  tertiaryTextColor,
  fundingModelPillStyles,
}: FundedApplicationsSectionProps): JSX.Element {
  const fallbackPillBg = useColorModeValue('gray.100', 'gray.700')
  const fallbackPillTextColor = useColorModeValue('gray.800', 'gray.100')

  if (applicationsLoading) {
    return (
      <VStack py={8}>
        <Spinner />
      </VStack>
    )
  }

  if (applicationsError) {
    return (
      <Box p={8} bg={mutedBg} borderRadius="lg">
        <Body>{t('Failed to load applications.')}</Body>
      </Box>
    )
  }

  if (fundedApplications.length === 0) {
    return (
      <Box p={8} bg={mutedBg} borderRadius="lg">
        <VStack spacing={2}>
          <Body size="lg" color={subtleTextColor}>
            {t('No projects have been awarded yet')}
          </Body>
          <Body size="sm" color={tertiaryTextColor}>
            {t('Check back soon to see funded projects')}
          </Body>
        </VStack>
      </Box>
    )
  }

  return (
    <VStack align="stretch" spacing={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {fundedApplications.map((application) => (
          <Card
            key={application.id}
            as={Link}
            to={getPath('project', application.project.name)}
            overflow="hidden"
            cursor="pointer"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
            boxShadow="0 8px 24px rgba(15, 23, 42, 0.08)"
            bg={cardBg}
          >
            <Box position="relative">
              {application.project.thumbnailImage && (
                <Image
                  src={application.project.thumbnailImage}
                  alt={application.project.title}
                  w="full"
                  h="200px"
                  objectFit="cover"
                />
              )}
              <Box
                position="absolute"
                top={3}
                right={3}
                px={2.5}
                py={1}
                borderRadius="full"
                bg={fundingModelPillStyles[application.fundingModel]?.bg ?? fallbackPillBg}
                flexShrink={0}
              >
                <Body
                  size="xs"
                  fontWeight="semibold"
                  color={fundingModelPillStyles[application.fundingModel]?.textColor ?? fallbackPillTextColor}
                >
                  {t(getFundingModelLabel(application.fundingModel))}
                </Body>
              </Box>
            </Box>
            <VStack align="stretch" spacing={3} p={5}>
              <Flex align="baseline" gap={2} flexWrap="wrap">
                <H2 size="md" bold flex="1" minW="0">
                  {application.project.title}
                </H2>
                {hasValue(application.amountAwardedInSats) && (
                  <Body bold color={emphasisTextColor} size="sm" flexShrink={0}>
                    {`${satsNumberFormatter.format(application.amountAwardedInSats)} sats`}
                  </Body>
                )}
                {application.awardedAt && (
                  <>
                    <Body color={tertiaryTextColor} size="sm">
                      •
                    </Body>
                    <Body size="sm" color={subtleTextColor} flexShrink={0}>
                      {getQuarterFromDate(application.awardedAt)}
                    </Body>
                  </>
                )}
              </Flex>
              {application.project.shortDescription && (
                <Body size="sm" color={secondaryTextColor} noOfLines={2}>
                  {application.project.shortDescription}
                </Body>
              )}
            </VStack>
          </Card>
        ))}
      </SimpleGrid>
      {hasMoreFundedApplications && (
        <Button
          onClick={onLoadMoreApplications}
          isLoading={isLoadingMoreApplications}
          alignSelf="center"
          size="lg"
          variant="outline"
          colorScheme="neutral1"
        >
          {t('View More')}
        </Button>
      )}
    </VStack>
  )
}

type ImpactFundThemeColors = {
  surfaceBg: string
  mutedBg: string
  primaryTextColor: string
  secondaryTextColor: string
  subtleTextColor: string
  tertiaryTextColor: string
  emphasisTextColor: string
  metricHoverBg: string
  highlightedSurfaceBg: string
  highlightedSurfaceBorderColor: string
  cardBg: string
  archivedBadgeBg: string
  archivedBadgeBorderColor: string
  tagBg: string
  tagColor: string
  tagBorderColor: string
  iconBg: string
  iconColor: string
  fundingModelPillStyles: FundingModelPillStyles
}

function useImpactFundThemeColors(): ImpactFundThemeColors {
  const directGrantPillBg = useColorModeValue('blue.100', 'blue.900')
  const directGrantPillTextColor = useColorModeValue('blue.800', 'blue.100')
  const matchingPillBg = useColorModeValue('green.100', 'green.900')
  const matchingPillTextColor = useColorModeValue('green.800', 'green.100')
  const aonCofundingPillBg = useColorModeValue('purple.100', 'purple.900')
  const aonCofundingPillTextColor = useColorModeValue('purple.800', 'purple.100')

  return {
    surfaceBg: useColorModeValue('neutral1.3', 'neutral1.3'),
    mutedBg: useColorModeValue('neutral1.2', 'neutral1.2'),
    primaryTextColor: useColorModeValue('neutral1.11', 'neutral1.11'),
    secondaryTextColor: useColorModeValue('neutral1.9', 'neutral1.10'),
    subtleTextColor: useColorModeValue('neutral1.8', 'neutral1.10'),
    tertiaryTextColor: useColorModeValue('neutral1.7', 'neutral1.9'),
    emphasisTextColor: useColorModeValue('primary1.9', 'primary1.9'),
    metricHoverBg: useColorModeValue('neutral1.3', 'neutral1.4'),
    highlightedSurfaceBg: useColorModeValue('primary1.50', 'primary1.900'),
    highlightedSurfaceBorderColor: useColorModeValue('primary1.200', 'primary1.700'),
    cardBg: useColorModeValue('white', 'neutral1.3'),
    archivedBadgeBg: useColorModeValue('neutral1.3', 'neutral1.4'),
    archivedBadgeBorderColor: useColorModeValue('neutral1.4', 'neutral1.5'),
    tagBg: useColorModeValue('primary1.100', 'primary1.900'),
    tagColor: useColorModeValue('primary1.800', 'primary1.100'),
    tagBorderColor: useColorModeValue('primary1.200', 'primary1.800'),
    iconBg: useColorModeValue('primary1.100', 'primary1.900'),
    iconColor: useColorModeValue('primary1.600', 'primary1.300'),
    fundingModelPillStyles: {
      [ImpactFundApplicationFundingModel.DirectGrant]: {
        bg: directGrantPillBg,
        textColor: directGrantPillTextColor,
      },
      [ImpactFundApplicationFundingModel.Matching]: {
        bg: matchingPillBg,
        textColor: matchingPillTextColor,
      },
      [ImpactFundApplicationFundingModel.AonCofunding]: {
        bg: aonCofundingPillBg,
        textColor: aonCofundingPillTextColor,
      },
    },
  }
}

type LatamSectionColors = {
  pageBg: string
  surfaceBg: string
  mutedSurfaceBg: string
  darkSurfaceBg: string
  primaryText: string
  secondaryText: string
  borderColor: string
  amberBg: string
  amberText: string
}

/** Theme tokens for the LATAM impact fund full-bleed page layout. */
function useLatamSectionColors(): LatamSectionColors {
  return {
    pageBg: useColorModeValue('white', 'utils.pbg'),
    surfaceBg: useColorModeValue('white', 'neutral1.3'),
    mutedSurfaceBg: useColorModeValue('#F5F6F6', 'neutral1.3'),
    darkSurfaceBg: useColorModeValue('#17120C', 'neutral1.1'),
    primaryText: useColorModeValue('black', 'neutral1.12'),
    secondaryText: useColorModeValue('#626872', 'neutral1.10'),
    borderColor: useColorModeValue('#E2E4E6', 'neutral1.5'),
    amberBg: useColorModeValue('#F09A34', 'amber.9'),
    amberText: useColorModeValue('black', 'neutral1.1'),
  }
}

type ImpactFundOverviewSectionProps = {
  impactFund: ImpactFundDetails
  committedAmountDisplay: ReturnType<typeof getCommittedAmountDisplay>
  awardedAmountDisplay: ReturnType<typeof getSatsAmountDisplay>
  showAwardedAsPrimaryMetric: boolean
  onApplyClick: () => void
  shouldDisableApply: boolean
  viewerApplications: ViewerApplication[]
  colors: ImpactFundThemeColors
  showHeader?: boolean
}

function ImpactFundOverviewSection({
  impactFund,
  committedAmountDisplay,
  awardedAmountDisplay,
  showAwardedAsPrimaryMetric,
  onApplyClick,
  shouldDisableApply,
  viewerApplications,
  colors,
  showHeader = true,
}: ImpactFundOverviewSectionProps): JSX.Element {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const descriptionText = impactFund.description || ''
  const hasLongDescription = descriptionText.length > DESCRIPTION_PREVIEW_CHAR_LIMIT
  const isDescriptionCollapsed = hasLongDescription && !isDescriptionExpanded
  const descriptionFadeGradient = useColorModeValue(
    'linear(to-b, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
    'linear(to-b, rgba(23, 25, 35, 0) 0%, rgba(23, 25, 35, 1) 100%)',
  )
  const primaryAmountDisplay = showAwardedAsPrimaryMetric ? awardedAmountDisplay : committedAmountDisplay
  const primaryAmountLabel = showAwardedAsPrimaryMetric ? t('Awarded so far') : t('Amount committed')
  const applicationInfoBg = useColorModeValue('neutral1.2', 'neutral1.2')
  const applicationInfoBorderColor = useColorModeValue('neutral1.4', 'neutral1.4')
  const pendingViewerApplications = viewerApplications.filter(
    (application) => application.status === ImpactFundApplicationStatus.Pending,
  )

  return (
    <VStack align="stretch" spacing={6}>
      {showHeader && impactFund.heroImage && (
        <Image
          src={impactFund.heroImage}
          alt={impactFund.title}
          w="full"
          maxH="300px"
          objectFit="cover"
          borderRadius="lg"
        />
      )}
      <VStack align="stretch" spacing={4}>
        {showHeader && (
          <Flex justify="space-between" align={{ base: 'stretch', md: 'baseline' }} gap={4} flexWrap="wrap">
            <H2 size="3xl" bold color={colors.primaryTextColor} lineHeight={1}>
              {impactFund.title}
            </H2>
            <HStack spacing={3} align="center" flexWrap="wrap" justify={{ base: 'stretch', md: 'flex-end' }}>
              {impactFund.canAccessDashboard && (
                <Button
                  as={Link}
                  to={getPath('impactFundDashboard', impactFund.name)}
                  display={{ base: 'none', md: 'inline-flex' }}
                  size="lg"
                  variant="outline"
                  colorScheme="primary1"
                  flexShrink={0}
                  px={8}
                  minW="210px"
                  fontWeight="semibold"
                  fontSize="lg"
                >
                  {t('Access Moderator Dashboard')}
                </Button>
              )}
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                size="lg"
                colorScheme="primary1"
                onClick={onApplyClick}
                isDisabled={shouldDisableApply}
                flexShrink={0}
                px={8}
                minW="210px"
                fontWeight="semibold"
                fontSize="lg"
              >
                {t('Apply for funding')}
              </Button>
            </HStack>
          </Flex>
        )}
        {showHeader && impactFund.canAccessDashboard && (
          <Button
            as={Link}
            to={getPath('impactFundDashboard', impactFund.name)}
            display={{ base: 'flex', md: 'none' }}
            size="md"
            variant="outline"
            colorScheme="primary1"
            w="full"
            fontWeight="semibold"
            fontSize="lg"
          >
            {t('Access Moderator Dashboard')}
          </Button>
        )}
        {showHeader && (
          <Button
            display={{ base: 'flex', md: 'none' }}
            size="md"
            colorScheme="primary1"
            onClick={onApplyClick}
            isDisabled={shouldDisableApply}
            w="full"
            fontWeight="semibold"
            fontSize="lg"
          >
            {t('Apply for funding')}
          </Button>
        )}
        {impactFund.tags.length > 0 && (
          <HStack spacing={2} flexWrap="wrap">
            {impactFund.tags.map((tag) => (
              <Box
                key={tag}
                px={3}
                py={1}
                borderRadius="full"
                bg={colors.tagBg}
                color={colors.tagColor}
                border="1px solid"
                borderColor={colors.tagBorderColor}
              >
                <Body size="xs" bold whiteSpace="nowrap">
                  {tag}
                </Body>
              </Box>
            ))}
          </HStack>
        )}
        {pendingViewerApplications.length > 0 && (
          <VStack align="stretch" spacing={3}>
            {pendingViewerApplications.map((application) => (
              <Box
                key={application.id}
                p={5}
                bg={applicationInfoBg}
                borderRadius="lg"
                border="1px solid"
                borderColor={applicationInfoBorderColor}
              >
                <Body size="sm" color={colors.secondaryTextColor}>
                  <Trans
                    i18nKey="You have applied to this impact fund with <strong>{{projectTitle}}</strong>. Your application is under review and a moderator will reach out if more details are needed."
                    values={{ projectTitle: application.project.title }}
                    components={{ strong: <strong /> }}
                  />
                </Body>
              </Box>
            ))}
          </VStack>
        )}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {primaryAmountDisplay && (
            <Box
              p={6}
              bg={colors.mutedBg}
              borderRadius="lg"
              transition="all 0.3s"
              _hover={{ bg: colors.metricHoverBg, transform: 'translateY(-2px)' }}
            >
              <HStack spacing={4}>
                <Flex
                  w="48px"
                  h="48px"
                  align="center"
                  justify="center"
                  bg={colors.iconBg}
                  borderRadius="lg"
                  flexShrink={0}
                >
                  <Icon as={PiCoinsBold} boxSize={6} color={colors.iconColor} />
                </Flex>
                <VStack align="start" spacing={0}>
                  <HStack spacing={2} align="baseline">
                    <H2 size="xl" bold color={colors.emphasisTextColor}>
                      {primaryAmountDisplay.primary}
                    </H2>
                    {primaryAmountDisplay.secondary && (
                      <Body size="xs" color={colors.tertiaryTextColor}>
                        {primaryAmountDisplay.secondary}
                      </Body>
                    )}
                  </HStack>
                  <Body
                    size="xs"
                    fontSize={{ base: '10px', md: '12px' }}
                    color={colors.subtleTextColor}
                    textTransform="uppercase"
                    letterSpacing="wide"
                    fontWeight="medium"
                    noOfLines={1}
                    whiteSpace="nowrap"
                  >
                    {primaryAmountLabel}
                  </Body>
                </VStack>
              </HStack>
            </Box>
          )}
          {!showAwardedAsPrimaryMetric && (
            <Box
              p={6}
              bg={colors.mutedBg}
              borderRadius="lg"
              transition="all 0.3s"
              _hover={{ bg: colors.metricHoverBg, transform: 'translateY(-2px)' }}
            >
              <HStack spacing={4}>
                <Flex
                  w="48px"
                  h="48px"
                  align="center"
                  justify="center"
                  bg={colors.iconBg}
                  borderRadius="lg"
                  flexShrink={0}
                >
                  <Icon as={PiCoinsDuotone} boxSize={6} color={colors.iconColor} />
                </Flex>
                <VStack align="start" spacing={0}>
                  <H2 size="xl" bold color={colors.primaryTextColor}>
                    {`${satsNumberFormatter.format(impactFund.metrics.awardedTotalSats)} sats`}
                  </H2>
                  <Body
                    size="xs"
                    fontSize={{ base: '10px', md: '12px' }}
                    color={colors.subtleTextColor}
                    textTransform="uppercase"
                    letterSpacing="wide"
                    fontWeight="medium"
                    noOfLines={1}
                    whiteSpace="nowrap"
                  >
                    {t('Awarded so far')}
                  </Body>
                </VStack>
              </HStack>
            </Box>
          )}
          <Box
            p={6}
            bg={colors.mutedBg}
            borderRadius="lg"
            transition="all 0.3s"
            _hover={{ bg: colors.metricHoverBg, transform: 'translateY(-2px)' }}
          >
            <HStack spacing={4}>
              <Flex
                w="48px"
                h="48px"
                align="center"
                justify="center"
                bg={colors.iconBg}
                borderRadius="lg"
                flexShrink={0}
              >
                <Icon as={PiRocketLaunchDuotone} boxSize={6} color={colors.iconColor} />
              </Flex>
              <VStack align="start" spacing={0}>
                <H2 size="xl" bold color={colors.primaryTextColor}>
                  {impactFund.metrics.projectsFundedCount}
                </H2>
                <Body
                  size="xs"
                  fontSize={{ base: '10px', md: '12px' }}
                  color={colors.subtleTextColor}
                  textTransform="uppercase"
                  letterSpacing="wide"
                  fontWeight="medium"
                  noOfLines={1}
                  whiteSpace="nowrap"
                >
                  {t('Projects funded')}
                </Body>
              </VStack>
            </HStack>
          </Box>
        </SimpleGrid>
        {impactFund.description && (
          <VStack align="stretch" spacing={2}>
            <Box color={colors.secondaryTextColor} position="relative">
              <Box
                maxH={isDescriptionCollapsed ? DESCRIPTION_COLLAPSED_MAX_HEIGHT : undefined}
                overflow={isDescriptionCollapsed ? 'hidden' : undefined}
              >
                <ImpactFundDescriptionPreview value={descriptionText} />
              </Box>
              {isDescriptionCollapsed && (
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  h="80px"
                  pointerEvents="none"
                  bgGradient={descriptionFadeGradient}
                />
              )}
            </Box>
            {hasLongDescription && (
              <Button
                onClick={() => setIsDescriptionExpanded((current) => !current)}
                alignSelf="flex-start"
                variant="ghost"
                colorScheme="primary1"
                size="sm"
              >
                {isDescriptionExpanded ? t('Read less') : t('Read more')}
              </Button>
            )}
          </VStack>
        )}
      </VStack>
    </VStack>
  )
}

function ImpactFundWideHero({
  impactFund,
  onApplyClick,
  shouldDisableApply,
}: {
  impactFund: ImpactFundDetails
  onApplyClick: () => void
  shouldDisableApply: boolean
}): JSX.Element {
  const heroTextColor = useColorModeValue('black', 'white')
  const heroPrimaryButtonBg = useColorModeValue('white', 'neutral1.12')
  const heroAccentButtonBg = useColorModeValue('#F7931A', 'orange.400')
  const overlayGradient = useColorModeValue(
    'linear-gradient(90deg, var(--chakra-colors-whiteAlpha-800) 0%, var(--chakra-colors-whiteAlpha-700) 36%, var(--chakra-colors-whiteAlpha-300) 58%, var(--chakra-colors-whiteAlpha-100) 100%)',
    'linear-gradient(90deg, var(--chakra-colors-blackAlpha-800) 0%, var(--chakra-colors-blackAlpha-600) 42%, var(--chakra-colors-blackAlpha-200) 100%)',
  )

  return (
    <Box
      w="100vw"
      maxW="100vw"
      position="relative"
      left="50%"
      right="50%"
      ml="-50vw"
      mr="-50vw"
      overflow="hidden"
      minH={dimensions.impactLendingHero.minHeight}
      bg="neutral1.2"
    >
      {impactFund.heroImage && (
        <Box
          position="absolute"
          inset={0}
          backgroundImage={`url('${impactFund.heroImage}')`}
          backgroundPosition={{ base: 'center', lg: '78% 34%' }}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
        />
      )}
      <Box position="absolute" inset={0} background={overlayGradient} />

      <Flex
        position="relative"
        w="full"
        maxW={`${dimensions.maxWidth + 24 * 2}px`}
        minH={dimensions.impactLendingHero.minHeight}
        mx="auto"
        px={standardPadding}
        py={{ base: 10, lg: 12 }}
        align="center"
      >
        <VStack align="flex-start" spacing="22px" maxW={{ base: 'full', lg: '760px' }}>
          <H1
            size={{ base: '3xl', md: '4xl', lg: '48px' }}
            bold
            lineHeight={{ base: '1.12', lg: '54px' }}
            color={heroTextColor}
          >
            {impactFund.title}
          </H1>
          {impactFund.subtitle && (
            <Body
              size={{ base: 'md', lg: 'lg' }}
              medium
              lineHeight={{ base: '26px', lg: '28px' }}
              color={heroTextColor}
            >
              {impactFund.subtitle}
            </Body>
          )}
          <HStack spacing={3} flexWrap="wrap" pt="8px">
            {impactFund.canAccessDashboard && (
              <Button
                as={Link}
                to={getPath('impactFundDashboard', impactFund.name)}
                h="42px"
                px="18px"
                borderRadius="6px"
                variant="outline"
                bg={heroPrimaryButtonBg}
                color={heroTextColor}
                fontSize="sm"
                fontWeight="600"
              >
                {t('Access Moderator Dashboard')}
              </Button>
            )}
            <Button
              h="42px"
              px="18px"
              borderRadius="6px"
              bg={heroAccentButtonBg}
              color={heroTextColor}
              onClick={onApplyClick}
              isDisabled={shouldDisableApply}
              fontSize="sm"
              fontWeight="600"
              _hover={{ bg: heroAccentButtonBg }}
            >
              {t('Apply for funding')}
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}

function ImpactFundBreadcrumb({
  currentLabel,
  colors,
}: {
  currentLabel: string
  colors: ImpactFundThemeColors
}): JSX.Element {
  return (
    <Box w="100vw" maxW="100vw" position="relative" left="50%" right="50%" ml="-50vw" mr="-50vw" px={standardPadding}>
      <HStack
        maxW={`${dimensions.maxWidth + 24 * 2}px`}
        mx="auto"
        spacing={3}
        align="center"
        color={colors.secondaryTextColor}
        py={{ base: 4, lg: 5 }}
      >
        <Body
          as={Link}
          to={getPath('impactFunds')}
          size="sm"
          bold
          letterSpacing="0.18em"
          textTransform="uppercase"
          color={colors.secondaryTextColor}
        >
          {t('Impact Fund')}
        </Body>
        <PiCaretRightBold size={12} />
        <Body size="sm" bold letterSpacing="0.18em" textTransform="uppercase" color={colors.primaryTextColor}>
          {currentLabel}
        </Body>
      </HStack>
    </Box>
  )
}

function ImpactFundInformationSection({ colors }: { colors: ImpactFundThemeColors }): JSX.Element {
  const sectionCardShadow = '0 8px 24px rgba(15, 23, 42, 0.08)'

  return (
    <>
      <VStack align="stretch" spacing={6}>
        <H2 size="xl" bold color={colors.primaryTextColor}>
          {t('How It Works')}
        </H2>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {impactFundHowItWorksItems.map((item) => (
            <Box key={item.title} p={5} bg={colors.surfaceBg} borderRadius="lg">
              <HStack align="start" spacing={4}>
                <Flex
                  w="42px"
                  h="42px"
                  borderRadius="md"
                  bg={colors.iconBg}
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Icon as={item.icon} boxSize={5} color={colors.iconColor} />
                </Flex>
                <VStack align="stretch" spacing={1}>
                  <Body bold color={colors.primaryTextColor}>
                    {item.title}
                  </Body>
                  <Body size="sm" color={colors.secondaryTextColor}>
                    {item.description}
                  </Body>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      <VStack align="stretch" spacing={6}>
        <H2 size="xl" bold color={colors.primaryTextColor}>
          {t('How Are Funds Distributed')}
        </H2>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {impactFundFundingOverviewItems.map((item) => (
            <Box key={item.title} p={5} bg={colors.cardBg} borderRadius="xl" boxShadow={sectionCardShadow}>
              <HStack align="start" spacing={4}>
                <Flex
                  w="42px"
                  h="42px"
                  borderRadius="md"
                  bg={colors.iconBg}
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Icon as={item.icon} boxSize={5} color={colors.iconColor} />
                </Flex>
                <VStack align="stretch" spacing={1}>
                  <Body bold color={colors.primaryTextColor}>
                    {item.title}
                  </Body>
                  <Body size="sm" color={colors.secondaryTextColor}>
                    {item.description}
                  </Body>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>

        <VStack align="stretch" spacing={3} pt={2}>
          <H2 size="lg" bold color={colors.secondaryTextColor}>
            {t('Funding Models')}
          </H2>
          <Body size="sm" color={colors.secondaryTextColor} maxW="3xl">
            {t(
              'The funds are deployed using different models, based on the type of initiative and the amount to distribute.',
            )}
          </Body>
          <FundingModelsShowcase
            items={impactFundFundingModelItems}
            surfaceBg={colors.cardBg}
            primaryTextColor={colors.primaryTextColor}
            secondaryTextColor={colors.secondaryTextColor}
            mutedTextColor={colors.tertiaryTextColor}
            highlightedSurfaceBg={colors.highlightedSurfaceBg}
            highlightedSurfaceBorderColor={colors.highlightedSurfaceBorderColor}
          />
        </VStack>
      </VStack>
    </>
  )
}

type SponsorLogoProps = {
  sponsor: SponsorItem
  imageMaxHeight: string
  fallbackTextColor: string
}

function SponsorLogo({ sponsor, imageMaxHeight, fallbackTextColor }: SponsorLogoProps): JSX.Element {
  const content = (
    <Box w="full" h={imageMaxHeight} display="flex" alignItems="center" justifyContent="center">
      {sponsor.image ? (
        <Image
          src={sponsor.image}
          alt={sponsor.name}
          maxW="full"
          maxH={imageMaxHeight}
          objectFit="contain"
          transition="transform 0.2s"
          _hover={{ transform: 'scale(1.03)' }}
        />
      ) : (
        <Body size="sm" color={fallbackTextColor} fontWeight="medium">
          {sponsor.name}
        </Body>
      )}
    </Box>
  )

  if (!sponsor.url) {
    return content
  }

  return (
    <ChakraLink href={sponsor.url} isExternal _hover={{ textDecoration: 'none' }}>
      {content}
    </ChakraLink>
  )
}

type SponsorTierListProps = {
  title: string
  sponsors: SponsorItem[]
  imageMaxHeight: string
  secondaryTextColor: string
}

function SponsorTierList({
  title,
  sponsors,
  imageMaxHeight,
  secondaryTextColor,
}: SponsorTierListProps): JSX.Element | null {
  if (sponsors.length === 0) {
    return null
  }

  return (
    <VStack align="stretch" spacing={5}>
      <H2 size="lg" color={secondaryTextColor}>
        {t(title)}
      </H2>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={6}>
        {sponsors.map((sponsor) => (
          <Box key={sponsor.id}>
            <SponsorLogo sponsor={sponsor} imageMaxHeight={imageMaxHeight} fallbackTextColor={secondaryTextColor} />
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

type ImpactFundSponsorsSectionProps = {
  impactFund: ImpactFundDetails
  onBecomeSponsor: () => void
  colors: ImpactFundThemeColors
}

function ImpactFundSponsorsSection({
  impactFund,
  onBecomeSponsor,
  colors,
}: ImpactFundSponsorsSectionProps): JSX.Element {
  const foundingSponsors = impactFund.liveSponsors.filter((sponsor) => sponsor.tier === ImpactFundSponsorTier.Tier_1)
  const supportingSponsors = impactFund.liveSponsors.filter((sponsor) => sponsor.tier === ImpactFundSponsorTier.Tier_2)
  const hasAnyLiveSponsors = foundingSponsors.length > 0 || supportingSponsors.length > 0

  return (
    <VStack align="stretch" spacing={8}>
      <VStack align="stretch" spacing={1}>
        <Flex justify="space-between" align="center" gap={3}>
          <H2 size="2xl" bold>
            {t('Sponsors')}
          </H2>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            size="lg"
            variant="outline"
            colorScheme="primary1"
            onClick={onBecomeSponsor}
            fontSize="lg"
            fontWeight="semibold"
            px={8}
          >
            {t('Become a Sponsor')}
          </Button>
        </Flex>
        <Body size="sm" color={colors.secondaryTextColor}>
          {t('Sponsors have made significant contributions to the fund and are part of the allocation committee.')}
        </Body>
        <Button
          display={{ base: 'flex', md: 'none' }}
          size="lg"
          variant="outline"
          colorScheme="primary1"
          onClick={onBecomeSponsor}
          w="full"
          mt={2}
          fontSize="lg"
          fontWeight="semibold"
        >
          {t('Become a Sponsor')}
        </Button>
      </VStack>

      <VStack align="stretch" spacing={10}>
        {hasAnyLiveSponsors ? (
          <VStack align="stretch" spacing={8}>
            <SponsorTierList
              title="Founding Sponsors"
              sponsors={foundingSponsors}
              imageMaxHeight="80px"
              secondaryTextColor={colors.secondaryTextColor}
            />
            <SponsorTierList
              title="Supporting Sponsors"
              sponsors={supportingSponsors}
              imageMaxHeight="64px"
              secondaryTextColor={colors.secondaryTextColor}
            />
          </VStack>
        ) : (
          <Box p={6} bg={colors.mutedBg} borderRadius="lg">
            <Body color={colors.subtleTextColor}>{t('No active sponsors at the moment')}</Body>
          </Box>
        )}

        {impactFund.archivedSponsors.length > 0 && (
          <SponsorTierList
            title="Past"
            sponsors={impactFund.archivedSponsors}
            imageMaxHeight="56px"
            secondaryTextColor={colors.secondaryTextColor}
          />
        )}
      </VStack>
    </VStack>
  )
}

type CommunitySupportersSectionProps = {
  showSection: boolean
  donateProjectName?: string
  communitySupporters: CommunitySupporter[]
  communitySupportersLoading: boolean
  communitySupportersError: boolean
  colors: ImpactFundThemeColors
}

function CommunitySupportersSection({
  showSection,
  donateProjectName,
  communitySupporters,
  communitySupportersLoading,
  communitySupportersError,
  colors,
}: CommunitySupportersSectionProps): JSX.Element | null {
  if (!showSection) {
    return null
  }

  let supportersContent: JSX.Element

  if (communitySupportersLoading) {
    supportersContent = (
      <VStack py={6}>
        <Spinner />
      </VStack>
    )
  } else if (communitySupportersError) {
    supportersContent = (
      <Box p={6} bg={colors.mutedBg} borderRadius="lg">
        <Body color={colors.subtleTextColor}>{t('Failed to load community supporters.')}</Body>
      </Box>
    )
  } else if (communitySupporters.length > 0) {
    supportersContent = (
      <Wrap spacing={4}>
        {communitySupporters.map((supporter) => (
          <WrapItem key={supporter.id}>
            <Avatar
              size="md"
              src={supporter.imageUrl || undefined}
              name={supporter.username}
              title={supporter.username}
              bg={colors.mutedBg}
            />
          </WrapItem>
        ))}
      </Wrap>
    )
  } else {
    supportersContent = (
      <Box p={6} bg={colors.mutedBg} borderRadius="lg">
        <Body color={colors.subtleTextColor}>{t('No community supporters yet.')}</Body>
      </Box>
    )
  }

  return (
    <VStack align="stretch" spacing={6}>
      <VStack align="stretch" spacing={1}>
        <Flex justify="space-between" align="center" gap={3}>
          <H2 size="2xl" bold>
            {t('Community Supporters')}
          </H2>
          {donateProjectName && (
            <Button
              as={Link}
              to={getPath('fundingStart', donateProjectName)}
              display={{ base: 'none', md: 'inline-flex' }}
              size="lg"
              colorScheme="primary1"
              fontSize="lg"
              fontWeight="semibold"
              px={8}
            >
              {t('Donate to this Impact Fund')}
            </Button>
          )}
        </Flex>
        <Body size="sm" color={colors.secondaryTextColor}>
          {t('Individuals that have donated to this impact fund.')}
        </Body>
        {donateProjectName && (
          <Button
            as={Link}
            to={getPath('fundingStart', donateProjectName)}
            display={{ base: 'flex', md: 'none' }}
            size="lg"
            colorScheme="primary1"
            w="full"
            mt={2}
            fontSize="lg"
            fontWeight="semibold"
          >
            {t('Donate to this Impact Fund')}
          </Button>
        )}
      </VStack>
      {supportersContent}
    </VStack>
  )
}

function ImpactFundFaqSection({
  primaryTextColor,
  secondaryTextColor,
  borderColor,
}: {
  primaryTextColor: string
  secondaryTextColor: string
  borderColor: string
}): ReactNode {
  return (
    <VStack align="stretch" spacing={4}>
      <H2 size="xl" bold>
        {t('FAQ')}
      </H2>
      <Accordion allowToggle>
        {faqItems.map((item) => (
          <AccordionItem key={item.question} borderColor={borderColor}>
            <h3>
              <AccordionButton py={4}>
                <Box as="span" flex="1" textAlign="left">
                  <Body bold color={primaryTextColor}>
                    {t(item.question)}
                  </Body>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <Body size="sm" color={secondaryTextColor}>
                {t(item.answer)}
              </Body>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  )
}

function ImpactReportsSection({
  bannerAlt,
  bannerUrl,
  primaryTextColor,
  reportUrl,
  secondaryTextColor,
}: {
  bannerAlt: string
  bannerUrl: string
  primaryTextColor: string
  reportUrl: string
  secondaryTextColor: string
}): ReactNode {
  const buttonBg = useColorModeValue('white', 'white')
  const buttonColor = useColorModeValue('neutral1.11', 'neutral1.11')
  const buttonHoverBg = useColorModeValue('neutral1.2', 'neutral1.2')

  return (
    <VStack align="stretch" spacing={4}>
      <VStack align="stretch" spacing={1}>
        <H2 size="xl" bold color={primaryTextColor}>
          {t('Impact Reports')}
        </H2>
        <Body size="sm" color={secondaryTextColor}>
          {t('Open the latest report for this impact fund.')}
        </Body>
      </VStack>

      <ChakraLink
        href={reportUrl}
        isExternal
        aria-label={t('Open Circular Economy impact report')}
        display="block"
        _hover={{
          textDecoration: 'none',
          '.impact-report-card': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 28px rgba(15, 23, 42, 0.14)',
          },
          '.impact-report-button': {
            bg: buttonHoverBg,
          },
        }}
      >
        <Box
          className="impact-report-card"
          overflow="hidden"
          borderRadius="xl"
          bg="transparent"
          boxShadow="0 8px 24px rgba(15, 23, 42, 0.08)"
          position="relative"
          transition="transform 0.2s ease, box-shadow 0.2s ease"
        >
          <Image src={bannerUrl} alt={bannerAlt} w="full" h="auto" display="block" />
          <Flex
            className="impact-report-button"
            position="absolute"
            right={4}
            top={4}
            px={5}
            h="48px"
            align="center"
            borderRadius="md"
            bg={buttonBg}
            color={buttonColor}
            boxShadow="0 10px 24px rgba(15, 23, 42, 0.18)"
            transition="background-color 0.2s ease"
            gap={2}
            fontWeight="semibold"
          >
            <Body color="inherit" fontWeight="inherit">
              {t('View full report')}
            </Body>
            <Icon as={PiArrowUpRightBold} />
          </Flex>
        </Box>
      </ChakraLink>
    </VStack>
  )
}

function LatamPageSection({
  children,
  colors,
  bg,
  py = dimensions.impactLendingSection.paddingY,
}: {
  children: React.ReactNode
  colors: LatamSectionColors
  bg?: string
  py?: React.ComponentProps<typeof Box>['py']
}): ReactNode {
  return (
    <Box
      w="100vw"
      maxW="100vw"
      position="relative"
      left="50%"
      right="50%"
      ml="-50vw"
      mr="-50vw"
      bg={bg ?? colors.pageBg}
      py={py}
      px={standardPadding}
    >
      <Box maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto">
        {children}
      </Box>
    </Box>
  )
}

function LatamSurface({
  children,
  colors,
  bg,
}: {
  children: ReactNode
  colors: LatamSectionColors
  bg?: string
}): ReactNode {
  return (
    <Box
      borderWidth="1px"
      borderColor={colors.borderColor}
      borderRadius="8px"
      bg={bg ?? colors.surfaceBg}
      color={colors.primaryText}
      p={{ base: 5, lg: 7 }}
    >
      {children}
    </Box>
  )
}

type SponsorInquiryModalProps = {
  isOpen: boolean
  onClose: () => void
  primaryTextColor: string
  secondaryTextColor: string
  tertiaryTextColor: string
  highlightedSurfaceBg: string
  highlightedSurfaceBorderColor: string
}

function SponsorInquiryModal({
  isOpen,
  onClose,
  primaryTextColor,
  secondaryTextColor,
  tertiaryTextColor,
  highlightedSurfaceBg,
  highlightedSurfaceBorderColor,
}: SponsorInquiryModalProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent maxH={{ base: '100dvh', md: '90vh' }}>
        <ModalHeader>{t('Become a Sponsor')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack align="stretch" spacing={5}>
            <Body color={secondaryTextColor}>
              {t(
                'Thank you for your interest in sponsoring this fund! We would love to discuss partnership opportunities with you.',
              )}
            </Body>

            <Box
              p={5}
              bg={highlightedSurfaceBg}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={highlightedSurfaceBorderColor}
            >
              <VStack align="stretch" spacing={3}>
                <Body fontWeight="semibold" color={primaryTextColor}>
                  {t('Schedule a call with us')}
                </Body>
                <Body size="sm" color={secondaryTextColor}>
                  {t(
                    'Book a time to speak with our team about sponsorship benefits, visibility opportunities, and how we can work together to support impactful projects.',
                  )}
                </Body>
                <Button
                  as={ChakraLink}
                  href={SPONSOR_INQUIRY_CALENDAR_URL}
                  isExternal
                  colorScheme="primary1"
                  size="md"
                  mt={2}
                >
                  {t('Schedule Call')}
                </Button>
              </VStack>
            </Box>

            <Body size="sm" color={tertiaryTextColor}>
              {t('You can also reach out to us directly at')} <strong>hello@geyser.fund</strong>
            </Body>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            {t('Close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

type ApplicationSubmissionModalProps = {
  isOpen: boolean
  onClose: () => void
  ownedProjects: OwnedProject[]
  hasOwnedProjects: boolean
  selectedProjectId: string
  onSelectedProjectIdChange: (projectId: string) => void
  projectDescription: string
  onProjectDescriptionChange: (value: string) => void
  projectDescriptionError: string
  hasConfirmedProjectVision: boolean
  onHasConfirmedProjectVisionChange: (value: boolean) => void
  hasConfirmedImpactMetric: boolean
  onHasConfirmedImpactMetricChange: (value: boolean) => void
  hasSubmittedApplicationForm: boolean
  applying: boolean
  onSubmitApplication: () => Promise<void>
  primaryTextColor: string
  secondaryTextColor: string
  highlightedSurfaceBg: string
  highlightedSurfaceBorderColor: string
}

function ApplicationSubmissionModal({
  isOpen,
  onClose,
  ownedProjects,
  hasOwnedProjects,
  selectedProjectId,
  onSelectedProjectIdChange,
  projectDescription,
  onProjectDescriptionChange,
  projectDescriptionError,
  hasConfirmedProjectVision,
  onHasConfirmedProjectVisionChange,
  hasConfirmedImpactMetric,
  onHasConfirmedImpactMetricChange,
  hasSubmittedApplicationForm,
  applying,
  onSubmitApplication,
  primaryTextColor,
  secondaryTextColor,
  highlightedSurfaceBg,
  highlightedSurfaceBorderColor,
}: ApplicationSubmissionModalProps): JSX.Element {
  const hasProjectDescriptionError = hasSubmittedApplicationForm && Boolean(projectDescriptionError)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: '4xl' }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('Submit your application')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack align="stretch" spacing={5}>
            <Body color={secondaryTextColor}>
              {t('You must submit your Geyser project as the application. Your project should include')}:
            </Body>

            <UnorderedList spacing={3} ml={4} color={secondaryTextColor}>
              <ListItem>
                <Body size="sm" color={secondaryTextColor}>
                  {t('A clear description of your project vision and goals')}
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" color={secondaryTextColor}>
                  {t('The intended impact and how it aligns with the fund')}
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" color={secondaryTextColor}>
                  {t('Examples of past work or relevant experience')}
                </Body>
              </ListItem>
            </UnorderedList>

            {ownedProjects.length > 0 ? (
              <VStack align="stretch" spacing={3}>
                <FormControl>
                  <FormLabel color={primaryTextColor}>{t('Select your project')}</FormLabel>
                  <Select
                    value={selectedProjectId}
                    onChange={(event) => onSelectedProjectIdChange(event.target.value)}
                    size="lg"
                  >
                    {ownedProjects.map((project) => (
                      <option key={String(project.id)} value={String(project.id)}>
                        {project.title}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired isInvalid={hasProjectDescriptionError}>
                  <FormLabel color={primaryTextColor} mb={1}>
                    {t('Project story')}
                  </FormLabel>
                  <Body size="sm" color={secondaryTextColor} mb={2}>
                    {t(
                      'Note: you are editing your project story, any changes will be reflected in your story and be visible on your project page.',
                    )}
                  </Body>
                  <Box
                    h={{ base: '340px', md: '440px' }}
                    overflowY="auto"
                    bg="utils.pbg"
                    borderWidth="1px"
                    borderColor={hasProjectDescriptionError ? 'error.9' : 'neutral1.6'}
                    borderRadius="md"
                  >
                    <MdxMarkdownEditor
                      mode="edit"
                      value={projectDescription}
                      onChange={onProjectDescriptionChange}
                      minHeight="100%"
                      placeholder={t(
                        'Tell the story of your project: its origin, mission, goals, and the impact you want to make',
                      )}
                    />
                  </Box>
                  <HStack w="full" justifyContent="space-between" alignItems="start" pt={1}>
                    <FormErrorMessage mt={0}>{projectDescriptionError}</FormErrorMessage>
                    <Body
                      size="xs"
                      color={projectDescription.length > projectStoryMaxLength ? 'error.9' : secondaryTextColor}
                      whiteSpace="nowrap"
                      ml="auto"
                    >
                      {projectDescription.length}/{projectStoryMaxLength}
                    </Body>
                  </HStack>
                </FormControl>
                <VStack align="stretch" spacing={3}>
                  <Checkbox
                    isChecked={hasConfirmedProjectVision}
                    onChange={(event) => onHasConfirmedProjectVisionChange(event.target.checked)}
                    colorScheme="primary1"
                  >
                    <Body size="sm" color={secondaryTextColor}>
                      {t('I have included a detailed description of the project vision and specific goals')}
                    </Body>
                  </Checkbox>
                  <Checkbox
                    isChecked={hasConfirmedImpactMetric}
                    onChange={(event) => onHasConfirmedImpactMetricChange(event.target.checked)}
                    colorScheme="primary1"
                  >
                    <Body size="sm" color={secondaryTextColor}>
                      {t('I have included a clear impact measurement metric')}
                    </Body>
                  </Checkbox>
                  {hasSubmittedApplicationForm && (!hasConfirmedProjectVision || !hasConfirmedImpactMetric) && (
                    <Body size="sm" color="error.9">
                      {t('Confirm both requirements before submitting.')}
                    </Body>
                  )}
                  <Body size="sm" color={secondaryTextColor}>
                    {t('Not including this information may delay your application or cause it to be rejected.')}
                  </Body>
                </VStack>
              </VStack>
            ) : (
              <Box
                p={6}
                bg={highlightedSurfaceBg}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={highlightedSurfaceBorderColor}
                textAlign="center"
              >
                <VStack spacing={4}>
                  <Body color={secondaryTextColor}>
                    {hasOwnedProjects
                      ? t('All of your projects have already applied to this impact fund.')
                      : t("You don't have any projects yet. Create a project to apply for funding.")}
                  </Body>
                  {!hasOwnedProjects && (
                    <Button as={Link} to={getPath('launchStart')} colorScheme="primary1" size="md" onClick={onClose}>
                      {t('Create a Project')}
                    </Button>
                  )}
                </VStack>
              </Box>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          {ownedProjects.length > 0 && (
            <Button w="full" colorScheme="primary1" isLoading={applying} onClick={onSubmitApplication} size="lg">
              {t('Submit Application')}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function ImpactFundDetailContent({
  impactFund,
  fundedApplications,
  applicationsLoading,
  applicationsError,
  hasMoreFundedApplications,
  isLoadingMoreApplications,
  onLoadMoreApplications,
  communitySupporters,
  communitySupportersLoading,
  communitySupportersError,
  onApplyClick,
  shouldDisableApply,
  viewerApplications,
  ownedProjects,
  hasOwnedProjects,
  selectedProjectId,
  onSelectedProjectIdChange,
  projectDescription,
  onProjectDescriptionChange,
  projectDescriptionError,
  hasConfirmedProjectVision,
  onHasConfirmedProjectVisionChange,
  hasConfirmedImpactMetric,
  onHasConfirmedImpactMetricChange,
  hasSubmittedApplicationForm,
  isProjectModalOpen,
  onProjectModalClose,
  applying,
  onSubmitApplication,
}: ImpactFundDetailContentProps): JSX.Element {
  const { isOpen: isSponsorModalOpen, onOpen: onSponsorModalOpen, onClose: onSponsorModalClose } = useDisclosure()
  const usdRate = useAtomValue(usdRateAtom)
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()
  const colors = useImpactFundThemeColors()
  const latamSectionColors = useLatamSectionColors()
  const committedAmountDisplay = getCommittedAmountDisplay({
    amountCommitted: impactFund.amountCommitted,
    amountCommittedCurrency: impactFund.amountCommittedCurrency,
    usdRate,
    getUSDAmount,
    getSatoshisFromUSDCents,
  })
  const awardedAmountDisplay = getSatsAmountDisplay({
    amountSats: impactFund.metrics.awardedTotalSats,
    usdRate,
    getUSDAmount,
  })
  const showAwardedAsPrimaryMetric = impactFund.amountCommitted === 0
  const showImpactReportsSection = impactFund.name === CIRCULAR_ECONOMY_IMPACT_FUND_NAME
  const showWideHero = impactFund.name === LATAM_IMPACT_FUND_NAME
  const handleBecomeSponsorClick = useCallback(() => {
    window.history.replaceState(null, '', BECOME_SPONSOR_HASH)
    onSponsorModalOpen()
  }, [onSponsorModalOpen])

  useEffect(() => {
    if (window.location.hash === BECOME_SPONSOR_HASH) {
      onSponsorModalOpen()
    }
  }, [onSponsorModalOpen])

  const seoImage = IMPACT_FUND_DETAILS_SEO_IMAGES[impactFund.name as keyof typeof IMPACT_FUND_DETAILS_SEO_IMAGES]
  const overviewSection = (
    <ImpactFundOverviewSection
      impactFund={impactFund}
      committedAmountDisplay={committedAmountDisplay}
      awardedAmountDisplay={awardedAmountDisplay}
      showAwardedAsPrimaryMetric={showAwardedAsPrimaryMetric}
      onApplyClick={onApplyClick}
      shouldDisableApply={shouldDisableApply}
      viewerApplications={viewerApplications}
      colors={colors}
      showHeader={!showWideHero}
    />
  )
  const projectsAwardedSection = (
    <VStack align="stretch" spacing={6}>
      <H2 size="xl" bold color={colors.primaryTextColor}>
        {t('Projects Awarded')}
      </H2>
      <FundedApplicationsSection
        applicationsLoading={applicationsLoading}
        applicationsError={applicationsError}
        fundedApplications={fundedApplications}
        hasMoreFundedApplications={hasMoreFundedApplications}
        isLoadingMoreApplications={isLoadingMoreApplications}
        onLoadMoreApplications={onLoadMoreApplications}
        cardBg={colors.cardBg}
        mutedBg={colors.mutedBg}
        emphasisTextColor={colors.emphasisTextColor}
        secondaryTextColor={colors.secondaryTextColor}
        subtleTextColor={colors.subtleTextColor}
        tertiaryTextColor={colors.tertiaryTextColor}
        fundingModelPillStyles={colors.fundingModelPillStyles}
      />
    </VStack>
  )
  const sponsorsSection = (
    <ImpactFundSponsorsSection impactFund={impactFund} onBecomeSponsor={handleBecomeSponsorClick} colors={colors} />
  )
  const communitySupportersSection = (
    <CommunitySupportersSection
      showSection={Boolean(impactFund.donateProjectId)}
      donateProjectName={impactFund.donateProject?.name || undefined}
      communitySupporters={communitySupporters}
      communitySupportersLoading={communitySupportersLoading}
      communitySupportersError={communitySupportersError}
      colors={colors}
    />
  )
  const impactReportsSection = showImpactReportsSection ? (
    <ImpactReportsSection
      bannerAlt={t('Circular Economy impact report banner')}
      bannerUrl={CIRCULAR_ECONOMY_REPORT_BANNER_URL}
      primaryTextColor={colors.primaryTextColor}
      reportUrl={CIRCULAR_ECONOMY_REPORT_PDF_URL}
      secondaryTextColor={colors.secondaryTextColor}
    />
  ) : null
  const faqSection = (
    <ImpactFundFaqSection
      primaryTextColor={colors.primaryTextColor}
      secondaryTextColor={colors.secondaryTextColor}
      borderColor={colors.archivedBadgeBorderColor}
    />
  )
  const finalCtaSection = (
    <Box
      p={8}
      bg={colors.highlightedSurfaceBg}
      borderRadius="xl"
      textAlign="center"
      boxShadow="0 8px 24px rgba(15, 23, 42, 0.08)"
    >
      <VStack spacing={4}>
        <H2 size="2xl" bold color={colors.primaryTextColor}>
          {t('Ready to make an impact?')}
        </H2>
        <Body size="md" color={colors.secondaryTextColor} maxW="480px">
          {t('Submit your project application and join the growing community of Bitcoin-funded initiatives.')}
        </Body>
        <Button
          size="lg"
          colorScheme="primary1"
          onClick={onApplyClick}
          isDisabled={shouldDisableApply}
          px={10}
          fontWeight="semibold"
          fontSize="lg"
        >
          {t('Apply for funding')}
        </Button>
      </VStack>
    </Box>
  )
  const latamFinalCtaSection = (
    <Box p={8} bg={latamSectionColors.amberBg} borderRadius="8px" textAlign="center">
      <VStack spacing={4}>
        <H2 size="2xl" bold color={latamSectionColors.amberText}>
          {t('Ready to make an impact?')}
        </H2>
        <Body size="md" color={latamSectionColors.amberText} maxW="480px">
          {t('Submit your project application and join the growing community of Bitcoin-funded initiatives.')}
        </Body>
        <Button
          size="lg"
          onClick={onApplyClick}
          isDisabled={shouldDisableApply}
          px={10}
          fontWeight="semibold"
          fontSize="lg"
          bg={latamSectionColors.darkSurfaceBg}
          color="white"
          _hover={{ bg: latamSectionColors.darkSurfaceBg }}
        >
          {t('Apply for funding')}
        </Button>
      </VStack>
    </Box>
  )
  const modals = (
    <>
      <SponsorInquiryModal
        isOpen={isSponsorModalOpen}
        onClose={onSponsorModalClose}
        primaryTextColor={colors.primaryTextColor}
        secondaryTextColor={colors.secondaryTextColor}
        tertiaryTextColor={colors.tertiaryTextColor}
        highlightedSurfaceBg={colors.highlightedSurfaceBg}
        highlightedSurfaceBorderColor={colors.highlightedSurfaceBorderColor}
      />

      <ApplicationSubmissionModal
        isOpen={isProjectModalOpen}
        onClose={onProjectModalClose}
        ownedProjects={ownedProjects}
        hasOwnedProjects={hasOwnedProjects}
        selectedProjectId={selectedProjectId}
        onSelectedProjectIdChange={onSelectedProjectIdChange}
        projectDescription={projectDescription}
        onProjectDescriptionChange={onProjectDescriptionChange}
        projectDescriptionError={projectDescriptionError}
        hasConfirmedProjectVision={hasConfirmedProjectVision}
        onHasConfirmedProjectVisionChange={onHasConfirmedProjectVisionChange}
        hasConfirmedImpactMetric={hasConfirmedImpactMetric}
        onHasConfirmedImpactMetricChange={onHasConfirmedImpactMetricChange}
        hasSubmittedApplicationForm={hasSubmittedApplicationForm}
        applying={applying}
        onSubmitApplication={onSubmitApplication}
        primaryTextColor={colors.primaryTextColor}
        secondaryTextColor={colors.secondaryTextColor}
        highlightedSurfaceBg={colors.highlightedSurfaceBg}
        highlightedSurfaceBorderColor={colors.highlightedSurfaceBorderColor}
      />
    </>
  )

  if (showWideHero) {
    return (
      <Box bg={latamSectionColors.pageBg} color={latamSectionColors.primaryText}>
        <VStack align="stretch" spacing={0}>
          <Head
            title={impactFund.title}
            description={impactFund.subtitle || undefined}
            image={seoImage || impactFund.heroImage || undefined}
          />

          <ImpactFundWideHero
            impactFund={impactFund}
            onApplyClick={onApplyClick}
            shouldDisableApply={shouldDisableApply}
          />
          <ImpactFundBreadcrumb currentLabel={impactFund.title} colors={colors} />

          <LatamPageSection colors={latamSectionColors} py={dimensions.impactLendingSection.paddingYCompact}>
            <LatamSurface colors={latamSectionColors}>{overviewSection}</LatamSurface>
          </LatamPageSection>

          <LatamPageSection colors={latamSectionColors} bg={latamSectionColors.mutedSurfaceBg}>
            <ImpactFundInformationSection colors={colors} />
          </LatamPageSection>

          <LatamPageSection colors={latamSectionColors}>
            <LatamSurface colors={latamSectionColors}>{projectsAwardedSection}</LatamSurface>
          </LatamPageSection>

          <LatamPageSection colors={latamSectionColors} bg={latamSectionColors.darkSurfaceBg}>
            <LatamSurface colors={latamSectionColors}>{sponsorsSection}</LatamSurface>
          </LatamPageSection>

          <LatamPageSection colors={latamSectionColors}>
            <VStack align="stretch" spacing={{ base: 8, lg: 10 }}>
              {communitySupportersSection}
              {impactReportsSection}
              {faqSection}
              {latamFinalCtaSection}
            </VStack>
          </LatamPageSection>

          {modals}
        </VStack>
      </Box>
    )
  }

  return (
    <VStack align="stretch" spacing={14}>
      <Head
        title={impactFund.title}
        description={impactFund.subtitle || undefined}
        image={seoImage || impactFund.heroImage || undefined}
      />

      {overviewSection}
      <ImpactFundInformationSection colors={colors} />
      {projectsAwardedSection}
      {sponsorsSection}
      {communitySupportersSection}
      {impactReportsSection}
      {faqSection}
      {finalCtaSection}
      {modals}
    </VStack>
  )
}
