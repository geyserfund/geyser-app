import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Flex,
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
import { useMemo, useState } from 'react'
import {
  PiArrowsClockwiseBold,
  PiCalendarBold,
  PiCaretDownBold,
  PiChartBarBold,
  PiCoinsBold,
  PiCoinsDuotone,
  PiNewspaperDuotone,
  PiRocketLaunchDuotone,
  PiScalesBold,
} from 'react-icons/pi'
import { Link, useNavigate, useParams } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useAuthContext } from '@/context'
import { useBTCConverter } from '@/helpers'
import { useAuthModal } from '@/modules/auth/hooks/useAuthModal'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { MarkdownField } from '@/shared/markdown/MarkdownField.tsx'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import {
  ImpactFundApplicationsQuery,
  ImpactFundApplicationStatus,
  ImpactFundQuery,
  useImpactFundApplicationsQuery,
  useImpactFundApplyMutation,
  useImpactFundQuery,
} from '@/types'
import { getShortAmountLabel, useNotification } from '@/utils'

import { DonationSponsorCTA } from '../components/DonationSponsorCTA.tsx'

const APPLICATIONS_PAGE_SIZE = 15
const DESCRIPTION_PREVIEW_CHAR_LIMIT = 500
const btcNumberFormatter = new Intl.NumberFormat()
const usdNumberFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
const fundedStatus = [ImpactFundApplicationStatus.Funded]
type ImpactFundDetails = ImpactFundQuery['impactFund']
type FundedApplication = ImpactFundApplicationsQuery['impactFundApplications']['applications'][number]
type OwnedProject = { id: unknown; title: string }

function truncateDescription(text: string, limit: number, expanded: boolean): string {
  return !expanded && text.length > limit ? `${text.slice(0, limit)}...` : text
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
    statusIn: fundedStatus,
    pagination: {
      take: APPLICATIONS_PAGE_SIZE,
      ...(cursorId ? { cursor: { id: cursorId } } : {}),
    },
  }
}

function hasValue<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

function getCommittedAmountDisplay({
  amountCommitted,
  amountCommittedCurrency,
  usdRate,
  getUSDAmount,
  getSatoshisFromUSDCents,
}: {
  amountCommitted?: number | null
  amountCommittedCurrency?: string
  usdRate: number
  getUSDAmount: ReturnType<typeof useBTCConverter>['getUSDAmount']
  getSatoshisFromUSDCents: ReturnType<typeof useBTCConverter>['getSatoshisFromUSDCents']
}) {
  if (!hasValue(amountCommitted)) {
    return null
  }

  if (amountCommittedCurrency === 'USDCENT') {
    const primary = usdNumberFormatter.format(amountCommitted / 100)

    if (usdRate <= 0) {
      return { primary }
    }

    const convertedSats = getSatoshisFromUSDCents(amountCommitted as Parameters<typeof getSatoshisFromUSDCents>[0])
    return {
      primary,
      secondary: `${getShortAmountLabel(convertedSats, true)} sats`,
    }
  }

  const primary = `${btcNumberFormatter.format(amountCommitted)} sats`

  if (usdRate <= 0) {
    return { primary }
  }

  return {
    primary,
    secondary: usdNumberFormatter.format(getUSDAmount(amountCommitted as Parameters<typeof getUSDAmount>[0])),
  }
}

const howItWorksItems = [
  {
    title: 'Annual Commitment',
    description: 'A dedicated pool of capital is committed each year by founding and supporting sponsors.',
    icon: PiCalendarBold,
  },
  {
    title: 'Allocation Committee',
    description: 'An independent review panel evaluates applications and allocates funding.',
    icon: PiScalesBold,
  },
  {
    title: 'Transparency & Reporting',
    description: 'Impact reports are published outlining funded projects, outcomes, and fund performance.',
    icon: PiChartBarBold,
  },
]

const fundingOverviewItems = [
  {
    title: 'Funding Cycles',
    description: 'Applications are reviewed and selected on a recurring basis.',
    icon: PiArrowsClockwiseBold,
  },
  {
    title: 'Funding Range',
    description: 'From $2.5k to $20k, depending on scope, impact and stage of development.',
    icon: PiCoinsBold,
  },
]

const fundingModelItems = [
  {
    title: 'Direct Grants',
    description: 'Full requested amount allocated after committee approval.',
    icon: PiCoinsBold,
  },
  {
    title: 'Capped Matching Fund',
    description:
      'The fund matches independently raised capital up to a predefined cap to incentivize traction and community participation.',
    icon: PiArrowsClockwiseBold,
  },
  {
    title: 'All-or-Nothing Co-Funding',
    description:
      'Conditional commitment released only if full funding is reached within a fixed timeframe (for example, 60 days).',
    icon: PiScalesBold,
  },
]

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
    answer: 'Pending confirmation. Please provide the expected review timeline so we can publish it here.',
  },
]

export function ImpactFundDetailPage(): JSX.Element | null {
  const { impactFundName } = useParams<{ impactFundName: string }>()
  const decodedImpactFundName = impactFundName ? decodeURIComponent(impactFundName) : ''
  const { user, isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const { success, error: notifyError } = useNotification()
  const navigate = useNavigate()

  const projectModal = useDisclosure()
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')

  const { data, loading, error } = useImpactFundQuery({
    variables: { input: { where: { name: decodedImpactFundName } } },
    skip: !impactFundName,
  })

  const [apply, { loading: applying }] = useImpactFundApplyMutation()
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

  const ownedProjects = useMemo(
    () =>
      (user?.ownerOf || [])
        .map((owner) => owner.project)
        .filter((project): project is NonNullable<typeof project> => Boolean(project)),
    [user?.ownerOf],
  )

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      loginOnOpen({ showLightning: false })
      return
    }

    if (ownedProjects.length === 0) {
      navigate(getPath('launchStart'))
      return
    }

    const firstOwnedProjectId = String(ownedProjects[0]?.id || '')
    setSelectedProjectId(firstOwnedProjectId)
    projectModal.onOpen()
  }

  const submitApplication = async () => {
    if (!impactFund || !selectedProjectId) return

    try {
      await apply({
        variables: {
          input: { impactFundId: impactFund.id, projectId: selectedProjectId },
        },
      })

      success({ title: t('Application submitted') })
      projectModal.onClose()
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
      onApplyClick={handleApplyClick}
      ownedProjects={ownedProjects}
      selectedProjectId={selectedProjectId}
      onSelectedProjectIdChange={setSelectedProjectId}
      isProjectModalOpen={projectModal.isOpen}
      onProjectModalClose={projectModal.onClose}
      applying={applying}
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
  onApplyClick: () => void
  ownedProjects: OwnedProject[]
  selectedProjectId: string
  onSelectedProjectIdChange: (projectId: string) => void
  isProjectModalOpen: boolean
  onProjectModalClose: () => void
  applying: boolean
  onSubmitApplication: () => Promise<void>
}

type FundingModelCardProps = {
  item: (typeof fundingModelItems)[number]
  isOpen: boolean
  onToggle: () => void
  surfaceBg: string
  highlightedSurfaceBg: string
  highlightedSurfaceBorderColor: string
  metricHoverBg: string
  primaryTextColor: string
  secondaryTextColor: string
}

function FundingModelCard({
  item,
  isOpen,
  onToggle,
  surfaceBg,
  highlightedSurfaceBg,
  highlightedSurfaceBorderColor,
  metricHoverBg,
  primaryTextColor,
  secondaryTextColor,
}: FundingModelCardProps): JSX.Element {
  return (
    <Box
      p={4}
      bg={isOpen ? highlightedSurfaceBg : surfaceBg}
      borderRadius="lg"
      border="1px solid"
      borderColor={isOpen ? highlightedSurfaceBorderColor : 'transparent'}
      cursor="pointer"
      onClick={onToggle}
      transition="all 0.2s"
      _hover={{ bg: isOpen ? highlightedSurfaceBg : metricHoverBg }}
    >
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between" align="center">
          <Body bold color={primaryTextColor}>
            {t(item.title)}
          </Body>
          <Icon
            as={PiCaretDownBold}
            boxSize={4}
            color={secondaryTextColor}
            transform={isOpen ? 'rotate(180deg)' : 'none'}
            transition="transform 0.2s"
            flexShrink={0}
          />
        </HStack>
        {isOpen && (
          <Body size="sm" color={secondaryTextColor}>
            {t(item.description)}
          </Body>
        )}
      </VStack>
    </Box>
  )
}

type FundedApplicationsSectionProps = {
  applicationsLoading: boolean
  applicationsError: boolean
  fundedApplications: FundedApplication[]
  hasMoreFundedApplications: boolean
  isLoadingMoreApplications: boolean
  onLoadMoreApplications: () => Promise<void>
  surfaceBg: string
  mutedBg: string
  emphasisTextColor: string
  secondaryTextColor: string
  subtleTextColor: string
  tertiaryTextColor: string
}

function FundedApplicationsSection({
  applicationsLoading,
  applicationsError,
  fundedApplications,
  hasMoreFundedApplications,
  isLoadingMoreApplications,
  onLoadMoreApplications,
  surfaceBg,
  mutedBg,
  emphasisTextColor,
  secondaryTextColor,
  subtleTextColor,
  tertiaryTextColor,
}: FundedApplicationsSectionProps): JSX.Element {
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
            to={getPath('project', application.project.id)}
            overflow="hidden"
            cursor="pointer"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
            borderWidth="0"
            bg={surfaceBg}
          >
            {application.project.thumbnailImage && (
              <Image
                src={application.project.thumbnailImage}
                alt={application.project.title}
                w="full"
                h="200px"
                objectFit="cover"
              />
            )}
            <VStack align="stretch" spacing={3} p={5}>
              <Flex align="baseline" gap={2} flexWrap="wrap">
                <H2 size="md" bold flex="1" minW="0">
                  {application.project.title}
                </H2>
                {hasValue(application.amountAwardedInSats) && (
                  <Body bold color={emphasisTextColor} size="sm" flexShrink={0}>
                    ₿ {btcNumberFormatter.format(application.amountAwardedInSats)}
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

function ImpactFundDetailContent({
  impactFund,
  fundedApplications,
  applicationsLoading,
  applicationsError,
  hasMoreFundedApplications,
  isLoadingMoreApplications,
  onLoadMoreApplications,
  onApplyClick,
  ownedProjects,
  selectedProjectId,
  onSelectedProjectIdChange,
  isProjectModalOpen,
  onProjectModalClose,
  applying,
  onSubmitApplication,
}: ImpactFundDetailContentProps): JSX.Element {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [expandedFundingModel, setExpandedFundingModel] = useState<string | null>(null)
  const usdRate = useAtomValue(usdRateAtom)
  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const surfaceBg = useColorModeValue('neutral1.3', 'neutral1.3')
  const mutedBg = useColorModeValue('neutral1.2', 'neutral1.2')
  const primaryTextColor = useColorModeValue('neutral1.11', 'neutral1.11')
  const secondaryTextColor = useColorModeValue('neutral1.9', 'neutral1.10')
  const subtleTextColor = useColorModeValue('neutral1.8', 'neutral1.10')
  const tertiaryTextColor = useColorModeValue('neutral1.7', 'neutral1.9')
  const emphasisTextColor = useColorModeValue('primary1.9', 'primary1.9')
  const metricHoverBg = useColorModeValue('neutral1.3', 'neutral1.4')
  const highlightedSurfaceBg = useColorModeValue('primary1.50', 'primary1.900')
  const highlightedSurfaceBorderColor = useColorModeValue('primary1.200', 'primary1.700')
  const archivedBadgeBg = useColorModeValue('neutral1.3', 'neutral1.4')
  const archivedBadgeBorderColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const tagBg = useColorModeValue('primary1.100', 'primary1.900')
  const tagColor = useColorModeValue('primary1.800', 'primary1.100')
  const tagBorderColor = useColorModeValue('primary1.200', 'primary1.800')
  const iconBg = useColorModeValue('primary1.100', 'primary1.900')
  const iconColor = useColorModeValue('primary1.600', 'primary1.300')
  const committedAmountDisplay = getCommittedAmountDisplay({
    amountCommitted: impactFund.amountCommitted,
    amountCommittedCurrency: impactFund.amountCommittedCurrency,
    usdRate,
    getUSDAmount,
    getSatoshisFromUSDCents,
  })
  const descriptionText = impactFund.description || ''
  const hasLongDescription = descriptionText.length > DESCRIPTION_PREVIEW_CHAR_LIMIT
  const descriptionContent = truncateDescription(descriptionText, DESCRIPTION_PREVIEW_CHAR_LIMIT, isDescriptionExpanded)

  return (
    <VStack align="stretch" spacing={14}>
      <Head
        title={impactFund.title}
        description={impactFund.subtitle || undefined}
        image={impactFund.heroImage || undefined}
      />

      <VStack align="stretch" spacing={6}>
        {impactFund.heroImage && (
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
          <Flex justify="space-between" align={{ base: 'stretch', md: 'baseline' }} gap={4} flexWrap="wrap">
            <HStack align={{ base: 'start', md: 'baseline' }} spacing={3} flexWrap="wrap">
              <H2 size="3xl" bold color={primaryTextColor} lineHeight={1}>
                {impactFund.title}
              </H2>
              {committedAmountDisplay && (
                <H2 display={{ base: 'none', md: 'block' }} size="2xl" bold color={emphasisTextColor} lineHeight={1}>
                  {committedAmountDisplay.primary}
                </H2>
              )}
              {committedAmountDisplay?.secondary && (
                <H2
                  display={{ base: 'none', md: 'block' }}
                  size="2xl"
                  color={tertiaryTextColor}
                  whiteSpace="nowrap"
                  lineHeight={1}
                >
                  {committedAmountDisplay.secondary}
                </H2>
              )}
            </HStack>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              size="lg"
              colorScheme="primary1"
              onClick={onApplyClick}
              flexShrink={0}
              px={8}
              minW="210px"
              fontWeight="semibold"
              fontSize="lg"
            >
              {t('Apply for funding')}
            </Button>
          </Flex>
          <Flex display={{ base: 'flex', md: 'none' }} justify="space-between" align="stretch" gap={3}>
            {committedAmountDisplay && (
              <VStack align="start" spacing={0}>
                <H2 size="xl" bold color={emphasisTextColor}>
                  {committedAmountDisplay.primary}
                </H2>
                {committedAmountDisplay.secondary && (
                  <H2 size="xl" color={tertiaryTextColor}>
                    {committedAmountDisplay.secondary}
                  </H2>
                )}
              </VStack>
            )}
            <Button
              size="md"
              colorScheme="primary1"
              onClick={onApplyClick}
              flexShrink={0}
              alignSelf="stretch"
              h="auto"
              minH="unset"
              whiteSpace="nowrap"
              px={7}
              fontWeight="semibold"
              fontSize="lg"
            >
              {t('Apply for funding')}
            </Button>
          </Flex>
          {impactFund.tags.length > 0 && (
            <HStack spacing={2} flexWrap="wrap">
              {impactFund.tags.map((tag) => (
                <Box
                  key={tag}
                  px={3}
                  py={1}
                  borderRadius="full"
                  bg={tagBg}
                  color={tagColor}
                  border="1px solid"
                  borderColor={tagBorderColor}
                >
                  <Body size="xs" bold whiteSpace="nowrap">
                    {tag}
                  </Body>
                </Box>
              ))}
            </HStack>
          )}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box
              p={6}
              bg={mutedBg}
              borderRadius="lg"
              transition="all 0.3s"
              _hover={{ bg: metricHoverBg, transform: 'translateY(-2px)' }}
            >
              <HStack spacing={4}>
                <Flex w="48px" h="48px" align="center" justify="center" bg={iconBg} borderRadius="lg" flexShrink={0}>
                  <Icon as={PiCoinsDuotone} boxSize={6} color={iconColor} />
                </Flex>
                <VStack align="start" spacing={0}>
                  <H2 size="xl" bold color={primaryTextColor}>
                    ₿ {btcNumberFormatter.format(impactFund.metrics.awardedTotalSats)}
                  </H2>
                  <Body
                    size="xs"
                    fontSize={{ base: '10px', md: '12px' }}
                    color={subtleTextColor}
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
            <Box
              p={6}
              bg={mutedBg}
              borderRadius="lg"
              transition="all 0.3s"
              _hover={{ bg: metricHoverBg, transform: 'translateY(-2px)' }}
            >
              <HStack spacing={4}>
                <Flex w="48px" h="48px" align="center" justify="center" bg={iconBg} borderRadius="lg" flexShrink={0}>
                  <Icon as={PiRocketLaunchDuotone} boxSize={6} color={iconColor} />
                </Flex>
                <VStack align="start" spacing={0}>
                  <H2 size="xl" bold color={primaryTextColor}>
                    {impactFund.metrics.projectsFundedCount}
                  </H2>
                  <Body
                    size="xs"
                    fontSize={{ base: '10px', md: '12px' }}
                    color={subtleTextColor}
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
            <Box
              p={6}
              bg={mutedBg}
              borderRadius="lg"
              transition="all 0.3s"
              _hover={{ bg: metricHoverBg, transform: 'translateY(-2px)' }}
            >
              <HStack spacing={4}>
                <Flex w="48px" h="48px" align="center" justify="center" bg={iconBg} borderRadius="lg" flexShrink={0}>
                  <Icon as={PiNewspaperDuotone} boxSize={6} color={iconColor} />
                </Flex>
                <VStack align="start" spacing={0}>
                  <H2 size="xl" bold color={primaryTextColor}>
                    {t('Yearly')}
                  </H2>
                  <Body
                    size="xs"
                    fontSize={{ base: '10px', md: '12px' }}
                    color={subtleTextColor}
                    textTransform="uppercase"
                    letterSpacing="wide"
                    fontWeight="medium"
                    noOfLines={1}
                    whiteSpace="nowrap"
                  >
                    {t('Impact & Transparency Report')}
                  </Body>
                </VStack>
              </HStack>
            </Box>
          </SimpleGrid>
          {impactFund.description && (
            <VStack align="stretch" spacing={2}>
              <Box color={secondaryTextColor}>
                <MarkdownField preview content={descriptionContent} />
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

      <VStack align="stretch" spacing={6}>
        <H2 size="xl" bold>
          {t('How It Works')}
        </H2>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {howItWorksItems.map((item) => (
            <Box key={item.title} p={5} bg={surfaceBg} borderRadius="lg">
              <HStack align="start" spacing={4}>
                <Flex w="42px" h="42px" borderRadius="md" bg={iconBg} align="center" justify="center" flexShrink={0}>
                  <Icon as={item.icon} boxSize={5} color={iconColor} />
                </Flex>
                <VStack align="stretch" spacing={1}>
                  <Body bold color={primaryTextColor}>
                    {t(item.title)}
                  </Body>
                  <Body size="sm" color={secondaryTextColor}>
                    {t(item.description)}
                  </Body>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      <VStack align="stretch" spacing={6}>
        <H2 size="xl" bold>
          {t('How Funding Works')}
        </H2>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {fundingOverviewItems.map((item) => (
            <Box key={item.title} p={5} bg={surfaceBg} borderRadius="lg">
              <HStack align="start" spacing={4}>
                <Flex w="42px" h="42px" borderRadius="md" bg={iconBg} align="center" justify="center" flexShrink={0}>
                  <Icon as={item.icon} boxSize={5} color={iconColor} />
                </Flex>
                <VStack align="stretch" spacing={1}>
                  <Body bold color={primaryTextColor}>
                    {t(item.title)}
                  </Body>
                  <Body size="sm" color={secondaryTextColor}>
                    {t(item.description)}
                  </Body>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>

        <VStack align="stretch" spacing={3} pt={2}>
          <H2 size="lg" bold color={secondaryTextColor}>
            {t('Funding Models')}
          </H2>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} alignItems="start">
            {fundingModelItems.map((item) => (
              <FundingModelCard
                key={item.title}
                item={item}
                isOpen={expandedFundingModel === item.title}
                onToggle={() => setExpandedFundingModel(expandedFundingModel === item.title ? null : item.title)}
                surfaceBg={surfaceBg}
                highlightedSurfaceBg={highlightedSurfaceBg}
                highlightedSurfaceBorderColor={highlightedSurfaceBorderColor}
                metricHoverBg={metricHoverBg}
                primaryTextColor={primaryTextColor}
                secondaryTextColor={secondaryTextColor}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>

      <VStack align="stretch" spacing={6}>
        <H2 size="xl" bold>
          {t('Projects Awarded')}
        </H2>
        <FundedApplicationsSection
          applicationsLoading={applicationsLoading}
          applicationsError={applicationsError}
          fundedApplications={fundedApplications}
          hasMoreFundedApplications={hasMoreFundedApplications}
          isLoadingMoreApplications={isLoadingMoreApplications}
          onLoadMoreApplications={onLoadMoreApplications}
          surfaceBg={surfaceBg}
          mutedBg={mutedBg}
          emphasisTextColor={emphasisTextColor}
          secondaryTextColor={secondaryTextColor}
          subtleTextColor={subtleTextColor}
          tertiaryTextColor={tertiaryTextColor}
        />
      </VStack>

      <VStack align="stretch" spacing={8}>
        <H2 size="xl" bold>
          {t('Sponsors')}
        </H2>

        <VStack align="stretch" spacing={10}>
          {impactFund.liveSponsors.length > 0 ? (
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={6}>
              {impactFund.liveSponsors.map((sponsor) => (
                <Box key={sponsor.id}>
                  {sponsor.url ? (
                    <ChakraLink href={sponsor.url} isExternal _hover={{ textDecoration: 'none' }}>
                      <Box
                        p={5}
                        bg={surfaceBg}
                        borderRadius="lg"
                        transition="all 0.3s"
                        _hover={{
                          transform: 'translateY(-4px)',
                          shadow: 'lg',
                        }}
                        cursor="pointer"
                        height="full"
                      >
                        {sponsor.image && (
                          <Box w="full" h="80px" display="flex" alignItems="center" justifyContent="center">
                            <Image src={sponsor.image} alt={sponsor.name} maxW="full" maxH="80px" objectFit="contain" />
                          </Box>
                        )}
                      </Box>
                    </ChakraLink>
                  ) : (
                    <Box p={5} bg={surfaceBg} borderRadius="lg" height="full">
                      {sponsor.image && (
                        <Box w="full" h="80px" display="flex" alignItems="center" justifyContent="center">
                          <Image src={sponsor.image} alt={sponsor.name} maxW="full" maxH="80px" objectFit="contain" />
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Box p={6} bg={mutedBg} borderRadius="lg">
              <Body color={subtleTextColor}>{t('No active sponsors at the moment')}</Body>
            </Box>
          )}

          {impactFund.archivedSponsors.length > 0 && (
            <VStack align="stretch" spacing={5}>
              <H2 size="lg" color={secondaryTextColor}>
                {t('Past')}
              </H2>
              <Wrap spacing={4}>
                {impactFund.archivedSponsors.map((sponsor) => (
                  <WrapItem key={sponsor.id}>
                    <Box
                      px={4}
                      py={2}
                      bg={archivedBadgeBg}
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={archivedBadgeBorderColor}
                    >
                      <Body size="sm" color={secondaryTextColor} fontWeight="medium">
                        {sponsor.name}
                      </Body>
                    </Box>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          )}
        </VStack>
      </VStack>

      <DonationSponsorCTA
        title={t('Support this fund')}
        description={t(
          'This fund is open for donations. Support impactful projects by donating or becoming a sponsor.',
        )}
        donateProjectName={impactFund.donateProject?.name}
      />

      <VStack align="stretch" spacing={4}>
        <H2 size="xl" bold>
          {t('FAQ')}
        </H2>
        <Accordion allowToggle>
          {faqItems.map((item) => (
            <AccordionItem key={item.question} borderColor={archivedBadgeBorderColor}>
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

      <Modal isOpen={isProjectModalOpen} onClose={onProjectModalClose} size="lg">
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
                  <Body fontWeight="semibold" color={primaryTextColor}>
                    {t('Select your project')}:
                  </Body>
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
                      {t("You don't have any projects yet. Create a project to apply for funding.")}
                    </Body>
                    <Button
                      as={Link}
                      to={getPath('launchStart')}
                      colorScheme="primary1"
                      size="md"
                      onClick={onProjectModalClose}
                    >
                      {t('Create a Project')}
                    </Button>
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
    </VStack>
  )
}
