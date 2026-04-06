import { Box, Button, HStack, Icon, Image, Link as ChakraLink, Stack, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import { PiArrowUpRight, PiFlagCheckeredDuotone, PiGear, PiWarning } from 'react-icons/pi'
import { Link, useLocation, useSearchParams } from 'react-router'

import { GEYSER_PROMOTIONS_PROJECT_NAME } from '@/modules/discovery/pages/landing/views/mainView/defaultView/sections/Featured.tsx'
import { MIN_BITCOIN_PAYOUT_USD } from '@/modules/project/constants/payout.ts'
import { useStripeConnectStatus } from '@/modules/project/hooks/useStripeConnectStatus.ts'
import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath, GuideStepByStepUrl, ImpactFundsIconUrl } from '@/shared/constants/index.ts'
import { commaFormatted } from '@/shared/utils/formatData/helperFunctions.ts'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { ProjectFundingStrategy, ProjectReviewStatus, ProjectStatus } from '@/types'

import { useProjectAtom } from '../../../../../../hooks/useProjectAtom.ts'
import { promotionsNoticeClosedByProjectAtom, stripeConnectNoticeClosedByProjectAtom } from '../noticeAtom.ts'
import { TiaRskEoaSetupNotice } from '../tiaNotification/TiaRskEoaSetupNotice.tsx'
import { ControlPanelButtons } from './components/ControlPanelButtons.tsx'
import { ControlPanelNotification } from './components/ControlPanelNotification.tsx'
import { useAonClaimFunds } from './hooks/useAonClaimFunds.ts'
import { useImpactFundEligibility } from './hooks/useImpactFundEligibility.ts'
import { useWithdrawFunds } from './hooks/useWithdrawFunds.ts'

type FinancialActionsProps = {
  showClaim: boolean
  showWithdrawableBalance: boolean
  aonPayoutModal: { onOpen: () => void }
  payoutRskModal: { onOpen: () => void }
  withdrawableSats: number
  withdrawableUsd: number
  isBelowMinWithdrawThreshold: boolean
  hasOngoingWithdraw: boolean
  hasFailedWithdraw: boolean
  showWithdraw: boolean
}

/** Renders the financial action rows (claim / withdraw) for the control panel. */
const ControlPanelFinancialActions = ({
  showClaim,
  showWithdrawableBalance,
  aonPayoutModal,
  payoutRskModal,
  withdrawableSats,
  withdrawableUsd,
  isBelowMinWithdrawThreshold,
  hasOngoingWithdraw,
  hasFailedWithdraw,
  showWithdraw,
}: FinancialActionsProps) => {
  if (!showClaim && !showWithdrawableBalance) return null
  return (
    <VStack w="full" spacing={3} align="stretch">
      {showClaim && (
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          bg="utils.pbg"
          border="1px solid"
          borderColor="neutral1.6"
          borderRadius="8px"
          px={4}
          py={4}
          spacing={4}
        >
          <HStack spacing={3} flex={1} alignItems="center">
            <Box color="primary1.9" flexShrink={0}>
              <PiFlagCheckeredDuotone size={28} />
            </Box>
            <VStack align="start" spacing={0}>
              <Body size="md" bold>
                {t('Claim funds')}
              </Body>
              <Body size="sm" color="neutral1.11">
                {t('Your campaign reached its goal')}
              </Body>
            </VStack>
          </HStack>
          <Button colorScheme="primary1" variant="solid" size="md" flexShrink={0} onClick={aonPayoutModal.onOpen}>
            {t('Claim')}
          </Button>
        </HStack>
      )}

      {showWithdrawableBalance && (
        <Stack
          w="full"
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 3, md: 4 }}
          justifyContent={{ base: 'flex-start', md: 'space-between' }}
          alignItems={{ base: 'stretch', md: 'center' }}
          bg="utils.pbg"
          border="1px solid"
          borderColor="neutral1.6"
          borderRadius="8px"
          px={4}
          py={4}
        >
          <HStack spacing={3} alignItems="center" flex={{ base: 'none', md: 1 }}>
            <Image
              src="/icons/creator_tools_bitcoin_coins.png"
              alt={t('Coins')}
              boxSize="52px"
              objectFit="contain"
              flexShrink={0}
            />
            <VStack align="start" spacing={0}>
              <Body size="md" color="neutral1.11">
                {t('Funds available to withdraw')}:{' '}
                <Body as="span" size="md" bold color="neutral1.12">
                  {commaFormatted(withdrawableSats)} {t('sats')}
                </Body>{' '}
                <Body as="span" size="md" color="neutral1.9">
                  ≈${withdrawableUsd.toFixed(0)}
                </Body>
              </Body>
              {hasOngoingWithdraw ? (
                <Body size="sm" color="neutral1.11">
                  {t('You have an ongoing payout. Continue to finish the withdrawal flow.')}
                </Body>
              ) : hasFailedWithdraw ? (
                <Body size="sm" color="neutral1.11">
                  {t('Your previous withdraw attempt failed. You can try again.')}
                </Body>
              ) : null}
            </VStack>
          </HStack>
          <Tooltip
            label={t('Minimum withdrawal is {{amount}} USD. Increase your balance to enable withdrawals.', {
              amount: MIN_BITCOIN_PAYOUT_USD,
            })}
            hasArrow
            shouldWrapChildren
            isDisabled={hasOngoingWithdraw || !isBelowMinWithdrawThreshold}
          >
            <Button
              colorScheme={showWithdraw ? 'primary1' : 'neutral1'}
              variant="solid"
              size="md"
              w={{ base: 'full', md: 'auto' }}
              flexShrink={0}
              onClick={payoutRskModal.onOpen}
              isDisabled={!showWithdraw}
            >
              {hasOngoingWithdraw ? t('Continue withdraw') : hasFailedWithdraw ? t('Try again') : t('Withdraw')}
            </Button>
          </Tooltip>
        </Stack>
      )}
    </VStack>
  )
}

export const ControlPanel = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isDraftUrl = location.pathname.includes('/draft')
  const projectNoticeKey = String(project.id)
  const isTiaProject = project?.fundingStrategy === ProjectFundingStrategy.TakeItAll

  const { isFundingDisabled } = useProjectToolkit(project)
  const [promotionsNoticeClosedByProject, setPromotionsNoticeClosedByProject] = useAtom(
    promotionsNoticeClosedByProjectAtom,
  )
  const isPromotionsModalOpen = Boolean(promotionsNoticeClosedByProject[projectNoticeKey])
  const [stripeConnectNoticeClosedByProject, setStripeConnectNoticeClosedByProject] = useAtom(
    stripeConnectNoticeClosedByProjectAtom,
  )
  const {
    isReady: isStripeConnectReady,
    isIncomplete: isStripeConnectIncomplete,
    disabledReasonLabel: stripeConnectDisabledReasonLabel,
    loading: isStripeConnectStatusLoading,
  } = useStripeConnectStatus({
    projectId: project?.id,
    isTiaProject,
    fetchPolicy: 'network-only',
  })
  const hasStripeConnectConfigured = Boolean(project?.paymentMethods?.fiat?.stripe)
  const stripeConnectNoticeKey = `${project.id}:${isStripeConnectIncomplete ? 'incomplete' : 'setup'}`
  const isStripeConnectNoticeClosed = Boolean(stripeConnectNoticeClosedByProject[stripeConnectNoticeKey])
  const shouldShowStripeConnectNotice =
    isTiaProject &&
    !isStripeConnectNoticeClosed &&
    !isStripeConnectReady &&
    (!isStripeConnectStatusLoading || isStripeConnectIncomplete || !hasStripeConnectConfigured)

  const { eligibleImpactFund } = useImpactFundEligibility()
  const {
    payoutRskModal,
    projectRskEoa,
    withdrawableSats,
    withdrawableUsd,
    showWithdrawableBalance,
    isBelowMinWithdrawThreshold,
    hasOngoingWithdraw,
    hasFailedWithdraw,
    showWithdraw,
    onCompleted,
  } = useWithdrawFunds()
  const { showClaim, payoutRskModal: aonPayoutModal, onCompleted: onAonCompleted } = useAonClaimFunds()

  /** Get latest review for revisions requested check */
  const latestReview = useMemo(() => {
    if (!project.reviews || project.reviews.length === 0) return undefined
    return [...project.reviews].sort((a, b) => (b.version ?? 0) - (a.version ?? 0))[0]
  }, [project.reviews])

  const hasRevisionsRequested = latestReview?.status === ProjectReviewStatus.RevisionsRequested
  const isInactiveProject = project.status === ProjectStatus.Inactive

  /** Handle ?action=withdraw query param to auto-open withdrawal modal */
  useEffect(() => {
    const action = searchParams.get('action')
    if (action === 'withdraw' && showWithdraw && !payoutRskModal.isOpen) {
      payoutRskModal.onOpen()
      // Remove the query param after opening the modal
      const nextSearchParams = new URLSearchParams(searchParams)
      nextSearchParams.delete('action')
      setSearchParams(nextSearchParams, { replace: true })
    }
  }, [searchParams, setSearchParams, showWithdraw, payoutRskModal])

  if (
    !isProjectOwner ||
    isDraftUrl ||
    (project.status && [ProjectStatus.Closed, ProjectStatus.Deleted].includes(project.status))
  )
    return null

  return (
    <CardLayout w="full" direction="column" backgroundColor="neutral1.3" spacing={4}>
      {/* Mobile layout - Dashboard button next to title */}
      <VStack w="full" spacing={3} display={{ base: 'flex', lg: 'none' }}>
        <HStack w="full" justifyContent="space-between">
          <Body size="2xl" bold>
            {t('Control Panel')}
          </Body>
          <Button
            size="md"
            as={Link}
            to={getPath('projectDashboard', project.name)}
            variant="soft"
            colorScheme="neutral1"
            paddingX={3}
            leftIcon={<PiGear />}
          >
            {t('Go to Dashboard')}
          </Button>
        </HStack>
      </VStack>

      {/* Desktop layout - all on same line */}
      <HStack w="full" justifyContent="space-between" display={{ base: 'none', lg: 'flex' }}>
        <Body size="2xl" bold>
          {t('Control Panel')}
        </Body>
        <Button
          size="md"
          as={Link}
          to={getPath('projectDashboard', project.name)}
          variant="soft"
          colorScheme="neutral1"
          paddingX={3}
          leftIcon={<PiGear />}
        >
          {t('Go to Dashboard')}
        </Button>
      </HStack>

      <TiaRskEoaSetupNotice compact />

      {hasRevisionsRequested && (
        <ControlPanelNotification
          icon={<Icon as={PiWarning} color="warning.11" boxSize="16px" flexShrink={0} />}
          title={t('Updates requested.')}
          description={t('Review feedback and resubmit your project.')}
          actionButton={
            <Button
              colorScheme="warning"
              variant="soft"
              size="sm"
              flexShrink={0}
              as={Link}
              to={getPath('launchFinalize', project.id)}
            >
              {t('Re-submit')}
            </Button>
          }
          variant="warning"
        />
      )}

      {/* Financial Actions Section */}
      <ControlPanelFinancialActions
        showClaim={showClaim}
        showWithdrawableBalance={showWithdrawableBalance}
        aonPayoutModal={aonPayoutModal}
        payoutRskModal={payoutRskModal}
        withdrawableSats={withdrawableSats}
        withdrawableUsd={withdrawableUsd}
        isBelowMinWithdrawThreshold={isBelowMinWithdrawThreshold}
        hasOngoingWithdraw={hasOngoingWithdraw}
        hasFailedWithdraw={hasFailedWithdraw}
        showWithdraw={showWithdraw}
      />

      {/* Notifications */}
      {isInactiveProject && (
        <ControlPanelNotification
          icon={
            <Image
              src="/icons/creator_tools_inactive_warning.png"
              alt={t('Inactive project warning')}
              width="48px"
              height="48px"
              flexShrink={0}
            />
          }
          title={t('Inactive Project')}
          description={t(
            'Your project cannot receive contributions but is visible to the public. To reactivate your project go to settings',
          )}
          actionButton={
            <Button
              colorScheme="warning"
              variant="soft"
              size="sm"
              flexShrink={0}
              as={Link}
              to={getPath('dashboardSettings', project.name)}
            >
              {t('Settings')}
            </Button>
          }
          variant="warning"
        />
      )}

      {shouldShowStripeConnectNotice && (
        <ControlPanelNotification
          icon={<Image src="/icons/creator_tools_stripe.webp" alt={t('Stripe icon')} width="48px" height="48px" />}
          title={
            isStripeConnectIncomplete
              ? t('Complete your Stripe Connect configuration')
              : t('Receive fiat payments directly')
          }
          description={
            isStripeConnectIncomplete
              ? stripeConnectDisabledReasonLabel ||
                t('Open Stripe Connect to finish your configuration and enable fiat contributions.')
              : t(
                  'Connect Stripe to receive fiat payments straight to your bank account and enable auto-renewing recurring contributions for contributors.',
                )
          }
          actionButton={
            <Button
              as={Link}
              to={getPath('dashboardWallet', project.name)}
              variant="soft"
              colorScheme="neutral1"
              size="sm"
              flexShrink={0}
            >
              {isStripeConnectIncomplete ? t('Manage Stripe Connect') : t('Configure Stripe Connect')}
            </Button>
          }
          onClose={
            isStripeConnectIncomplete
              ? undefined
              : () =>
                  setStripeConnectNoticeClosedByProject((current) => ({
                    ...current,
                    [stripeConnectNoticeKey]: true,
                  }))
          }
          variant="info"
        />
      )}

      {!isPromotionsModalOpen && !isFundingDisabled() && (
        <ControlPanelNotification
          icon={
            <Image
              src={'https://storage.googleapis.com/geyser-projects-media/utils/microphone.png'}
              alt={t('Amplify image')}
              width="48px"
              height="48px"
              flexShrink={0}
            />
          }
          title={t('Amplify your reach')}
          description={t(
            'Get more eyes on your project by getting it featured on the landing page or in our newsletter.',
          )}
          actionButton={
            <Button
              as={Link}
              to={getPath('projectRewards', GEYSER_PROMOTIONS_PROJECT_NAME)}
              variant="soft"
              colorScheme="neutral1"
              size="sm"
              flexShrink={0}
            >
              {t('View promotion plans')}
            </Button>
          }
          onClose={() =>
            setPromotionsNoticeClosedByProject((current) => ({
              ...current,
              [projectNoticeKey]: true,
            }))
          }
          variant="info"
        />
      )}

      {eligibleImpactFund && (
        <ControlPanelNotification
          icon={<Image src={ImpactFundsIconUrl} alt={t('Impact fund')} width="50px" height="50px" flexShrink={0} />}
          title={t('Eligible for {{fundName}}.', { fundName: eligibleImpactFund.title })}
          description={t('Your project may be eligible for funding.')}
          actionButton={
            <Button
              as={Link}
              to={getPath('impactFunds', encodeURIComponent(eligibleImpactFund.name))}
              size="sm"
              variant="soft"
              colorScheme="neutral1"
              flexShrink={0}
            >
              {t('Learn more')}
            </Button>
          }
          variant="info"
        />
      )}

      <HStack w="full" justifyContent="space-between" alignItems="center">
        <Body size="lg" bold>
          {t('Quick actions')}
        </Body>
        <Button
          size="md"
          as={ChakraLink}
          href={GuideStepByStepUrl}
          isExternal
          variant="ghost"
          colorScheme="neutral1"
          rightIcon={<PiArrowUpRight />}
        >
          {t('Guides & Checklist')}
        </Button>
      </HStack>

      <HStack w="full" spacing={4} alignItems="stretch">
        <ControlPanelButtons />
      </HStack>

      {showWithdraw && (
        <PayoutRsk
          {...payoutRskModal}
          project={project}
          rskAddress={projectRskEoa}
          payoutAmountOverride={withdrawableSats}
          onCompleted={onCompleted}
        />
      )}

      {showClaim && <PayoutRsk {...aonPayoutModal} project={project} onCompleted={onAonCompleted} />}
    </CardLayout>
  )
}
