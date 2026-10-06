import { Button, HStack, Icon, Link as ChakraLink, Stack, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import {
  PiArrowUpRight,
  PiCoins,
  PiCreditCard,
  PiFlagCheckered,
  PiGear,
  PiHandCoins,
  PiInfo,
  PiWarning,
} from 'react-icons/pi'
import { Link, useLocation, useSearchParams } from 'react-router'

import { MIN_BITCOIN_PAYOUT_SATS_FORMATTED } from '@/modules/project/constants/payout.ts'
import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { useStripeConnectStatus } from '@/modules/project/hooks/useStripeConnectStatus.ts'
import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { isCircularGrantProject } from '@/modules/project/utils/isCircularGrantProject.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath, GuideStepByStepUrl } from '@/shared/constants/index.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue.tsx'
import { ControlPanelNotification } from '@/shared/molecules/ControlPanelNotification.tsx'
import { getRootstockExplorerAddressUrl } from '@/shared/utils/external/rootstock.ts'
import { commaFormatted } from '@/shared/utils/formatData/helperFunctions.ts'
import { isLegacyTiaProject } from '@/shared/utils/project/isLegacyTiaProject.ts'
import {
  ProjectReviewStatus,
  ProjectStatus,
  useProjectLaunchReviewsQuery,
  useProjectReviewRequestMutation,
} from '@/types'
import { useNotification } from '@/utils/tools/Notification.tsx'

import { useProjectAtom } from '../../../../../../hooks/useProjectAtom.ts'
import { stripeConnectNoticeClosedByProjectAtom } from '../noticeAtom.ts'
import { TiaRskEoaSetupNotice } from '../tiaNotification/TiaRskEoaSetupNotice.tsx'
import { ControlPanelButtons } from './components/ControlPanelButtons.tsx'
import { ProjectReviewFeedbackModal } from './components/ProjectReviewFeedbackModal.tsx'
import { useAonClaimFunds } from './hooks/useAonClaimFunds.ts'
import { useImpactFundEligibility } from './hooks/useImpactFundEligibility.ts'
import { useWithdrawFunds } from './hooks/useWithdrawFunds.ts'

type FinancialActionsProps = {
  showClaim: boolean
  showClaimedWithdraw: boolean
  showWithdrawableBalance: boolean
  aonPayoutModal: { onOpen: () => void }
  onOpenClaimedWithdraw: () => void
  payoutRskModal: { onOpen: () => void }
  projectRskEoa: string
  withdrawableSats: number
  withdrawableUsd: number
  isBelowMinWithdrawThreshold: boolean
  hasOngoingWithdraw: boolean
  hasFailedWithdraw: boolean
  showWithdraw: boolean
}

type OngoingWithdrawNoticeProps = {
  onContinue: () => void
}

/** Shows the ongoing withdraw action outside the withdraw balance row. */
const OngoingWithdrawNotice = ({ onContinue }: OngoingWithdrawNoticeProps) => {
  return (
    <ControlPanelNotification
      icon={<Icon as={PiInfo} color="primary1.11" boxSize="24px" flexShrink={0} aria-hidden />}
      title={t('Ongoing payout')}
      description={t('You have an ongoing payout. Continue to finish the withdrawal flow.')}
      actionButton={
        <Button colorScheme="primary1" variant="solid" size="sm" w={{ base: 'full', md: 'auto' }} onClick={onContinue}>
          {t('Continue withdraw')}
        </Button>
      }
      variant="info"
    />
  )
}

/** Renders the financial action rows (claim / withdraw) for the control panel. */
const ControlPanelFinancialActions = ({
  showClaim,
  showClaimedWithdraw,
  showWithdrawableBalance,
  aonPayoutModal,
  onOpenClaimedWithdraw,
  payoutRskModal,
  projectRskEoa,
  withdrawableSats,
  withdrawableUsd,
  isBelowMinWithdrawThreshold,
  hasOngoingWithdraw,
  hasFailedWithdraw,
  showWithdraw,
}: FinancialActionsProps) => {
  if (!showClaim && !showClaimedWithdraw && !showWithdrawableBalance) return null
  return (
    <VStack w="full" spacing={3} align="stretch">
      {showClaim && (
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          border="1px solid"
          borderColor="neutral1.6"
          borderRadius="innerCard"
          px={4}
          py={4}
          spacing={4}
        >
          <HStack spacing={3} flex={1} alignItems="center">
            <Icon as={PiFlagCheckered} color="primary1.11" boxSize="28px" flexShrink={0} aria-hidden />
            <VStack align="start" spacing={0}>
              <Body size="md" bold color="utils.text">
                {t('Claim funds')}
              </Body>
              <Body size="sm" color="neutral1.11">
                {t('Claim to your Geyser Rootstock wallet')}
              </Body>
            </VStack>
          </HStack>
          <Button colorScheme="primary1" variant="solid" size="md" flexShrink={0} onClick={aonPayoutModal.onOpen}>
            {t('Claim')}
          </Button>
        </HStack>
      )}

      {showClaimedWithdraw && (
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          border="1px solid"
          borderColor="neutral1.6"
          borderRadius="innerCard"
          px={4}
          py={4}
          spacing={4}
        >
          <HStack spacing={3} flex={1} alignItems="center">
            <Icon as={PiFlagCheckered} color="primary1.11" boxSize="28px" flexShrink={0} aria-hidden />
            <VStack align="start" spacing={0}>
              <Body size="md" bold color="utils.text">
                {t('Funds in your Rootstock wallet')}
              </Body>
              <Body size="sm" color="neutral1.11">
                {t('Your campaign funds are ready to withdraw')}
              </Body>
            </VStack>
          </HStack>
          <Button colorScheme="primary1" variant="solid" size="md" flexShrink={0} onClick={onOpenClaimedWithdraw}>
            {t('Withdraw')}
          </Button>
        </HStack>
      )}

      {showWithdrawableBalance && (
        <VStack
          w="full"
          spacing={3}
          alignItems="stretch"
          border="1px solid"
          borderColor="neutral1.6"
          borderRadius="innerCard"
          px={4}
          py={4}
        >
          <Stack
            w="full"
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 3, md: 4 }}
            justifyContent={{ base: 'flex-start', md: 'space-between' }}
            alignItems={{ base: 'stretch', md: 'center' }}
          >
            <HStack spacing={3} alignItems="center" flex={{ base: 'none', md: 1 }}>
              <Icon as={PiCoins} color="primary1.11" boxSize="28px" flexShrink={0} aria-hidden />
              <VStack align="start" spacing={0}>
                <Body size="md" color="neutral1.11">
                  {t('Funds available to withdraw')}:{' '}
                  <Body as="span" size="md" bold color="utils.text">
                    {commaFormatted(withdrawableSats)} {t('sats')}
                  </Body>{' '}
                  <Body as="span" size="md" color="neutral1.11">
                    ≈${withdrawableUsd.toFixed(0)}
                  </Body>
                </Body>
                {projectRskEoa ? (
                  <ChakraLink
                    href={getRootstockExplorerAddressUrl(projectRskEoa)}
                    isExternal
                    display="inline-flex"
                    alignItems="center"
                    gap={1}
                    color="neutral1.11"
                    _hover={{ color: 'utils.text', textDecoration: 'underline' }}
                  >
                    <Body as="span" size="sm" color="inherit" medium>
                      {t('View on-chain')}
                    </Body>
                    <Icon as={PiArrowUpRight} boxSize="14px" aria-hidden />
                  </ChakraLink>
                ) : null}
                {hasFailedWithdraw ? (
                  <Body size="sm" color="neutral1.11">
                    {t('Your previous withdraw attempt failed. You can try again.')}
                  </Body>
                ) : null}
              </VStack>
            </HStack>
            <Tooltip
              label={t('Minimum withdrawal is {{amount}} sats. Increase your balance to enable withdrawals.', {
                amount: MIN_BITCOIN_PAYOUT_SATS_FORMATTED,
              })}
              hasArrow
              shouldWrapChildren
              isDisabled={hasOngoingWithdraw || !isBelowMinWithdrawThreshold}
            >
              <Button
                colorScheme="primary1"
                variant="solid"
                size="md"
                w={{ base: 'full', md: 'auto' }}
                flexShrink={0}
                onClick={payoutRskModal.onOpen}
                isDisabled={!showWithdraw || hasOngoingWithdraw}
              >
                {t('Withdraw')}
              </Button>
            </Tooltip>
          </Stack>
          {hasOngoingWithdraw ? <OngoingWithdrawNotice onContinue={payoutRskModal.onOpen} /> : null}
        </VStack>
      )}
    </VStack>
  )
}

export const ControlPanel = () => {
  const { project, isProjectOwner, partialUpdateProject } = useProjectAtom()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const reviewFeedbackModal = useModal()
  const resubmitConfirmModal = useModal()
  const toast = useNotification()
  const isDraftUrl = location.pathname.includes('/draft')
  const isTiaProject = isLegacyTiaProject(project)
  const isCircularGrant = isCircularGrantProject(project)

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
  const stripeConnectNoticeKey = project.id ? `${project.id}:${isStripeConnectIncomplete ? 'incomplete' : 'setup'}` : ''
  const isStripeConnectNoticeClosed = Boolean(stripeConnectNoticeClosedByProject?.[stripeConnectNoticeKey])
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
  const {
    showClaim,
    showClaimedWithdraw,
    payoutRskModal: aonPayoutModal,
    openClaimedWithdraw,
    onCompleted: onAonCompleted,
  } = useAonClaimFunds()

  /** Get latest review for revisions requested check */
  const latestReview = useMemo(() => {
    if (!project.reviews || project.reviews.length === 0) return undefined
    return [...project.reviews].sort((a, b) => (b.version ?? 0) - (a.version ?? 0))[0]
  }, [project.reviews])

  const hasRevisionsRequested = latestReview?.status === ProjectReviewStatus.RevisionsRequested
  const isReviewPending = latestReview?.status === ProjectReviewStatus.Pending
  const isInactiveProject = project.status === ProjectStatus.Inactive
  const { data: projectLaunchReviewsData } = useProjectLaunchReviewsQuery({
    variables: {
      where: {
        id: project.id,
      },
    },
    skip: !project.id || !isProjectOwner || !hasRevisionsRequested,
  })
  const latestReviewWithFeedback = useMemo(() => {
    const reviews = projectLaunchReviewsData?.projectGet?.reviews

    if (!reviews || reviews.length === 0) {
      return latestReview
    }

    return [...reviews].sort((a, b) => (b.version ?? 0) - (a.version ?? 0))[0]
  }, [latestReview, projectLaunchReviewsData?.projectGet?.reviews])
  const [projectReviewRequest, { loading: isResubmittingReview }] = useProjectReviewRequestMutation({
    onCompleted(data) {
      const nextReview = data.projectReviewRequest

      toast.success({
        title: t('Review submitted'),
        description: t('Your project has been submitted for review. You will be notified by email of any updates.'),
      })

      partialUpdateProject({
        reviews: project.reviews ? [...project.reviews, nextReview] : [nextReview],
      })
      resubmitConfirmModal.onClose()
    },
    onError() {
      toast.error({
        title: t('Submission failed'),
        description: t('Failed to submit project for review. Please try again.'),
      })
    },
  })

  const handleResubmitForReview = async () => {
    await projectReviewRequest({
      variables: {
        input: {
          projectId: project.id,
        },
      },
    })
  }

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
    <CardLayout w="full" direction="column" spacing={4}>
      <Stack
        w="full"
        direction={{ base: 'column', lg: 'row' }}
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', lg: 'center' }}
        spacing={{ base: 1, lg: 4 }}
      >
        <Body size="2xl" bold color="utils.text">
          {t('Control Panel')}
        </Body>
        <HStack spacing={1} flexWrap="wrap" marginLeft={{ base: -3, lg: 0 }}>
          <Button
            size="md"
            as={ChakraLink}
            href={GuideStepByStepUrl}
            isExternal
            variant="ghost"
            colorScheme="neutral1"
            paddingX={3}
            rightIcon={<PiArrowUpRight aria-hidden />}
          >
            {t('Guides & Checklist')}
          </Button>
          <Button
            size="md"
            as={Link}
            to={getPath('projectDashboard', project.name)}
            variant="ghost"
            colorScheme="neutral1"
            paddingX={3}
            leftIcon={<PiGear aria-hidden />}
          >
            {t('Go to Dashboard')}
          </Button>
        </HStack>
      </Stack>

      {isTiaProject && <TiaRskEoaSetupNotice compact />}

      {isReviewPending && (
        <ControlPanelNotification
          icon={<Icon as={PiInfo} color="primary1.11" boxSize="24px" flexShrink={0} aria-hidden />}
          title={t('Under review.')}
          description={t('Your project has been re-submitted for review. The team will review it promptly.')}
          variant="info"
        />
      )}

      {hasRevisionsRequested && (
        <ControlPanelNotification
          icon={<Icon as={PiWarning} color="warning.11" boxSize="24px" flexShrink={0} aria-hidden />}
          title={t('Updates requested.')}
          description={t('Review feedback and resubmit your project.')}
          actionButton={
            <HStack spacing={2} w={{ base: 'full', md: 'auto' }}>
              <Button
                colorScheme="neutral1"
                variant="outline"
                size="sm"
                px={4}
                flex={1}
                onClick={reviewFeedbackModal.onOpen}
              >
                {t('View feedback')}
              </Button>
              <Button
                colorScheme="primary1"
                variant="solid"
                size="sm"
                px={4}
                flex={1}
                onClick={resubmitConfirmModal.onOpen}
                isLoading={isResubmittingReview}
              >
                {t('Re-submit')}
              </Button>
            </HStack>
          }
          variant="warning"
        />
      )}

      <ProjectReviewFeedbackModal modal={reviewFeedbackModal} review={latestReviewWithFeedback} />
      <AlertDialogue
        title={t('Re-submit for review')}
        description={t('This will submit your project for further review. Have you applied the changes requested?')}
        hasCancel
        positiveButtonProps={{
          children: t('Submit'),
          isLoading: isResubmittingReview,
          onClick: handleResubmitForReview,
        }}
        {...resubmitConfirmModal}
      />

      {TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && !isCircularGrant && (
        <ControlPanelNotification
          icon={<Icon as={PiWarning} color="warning.11" boxSize="24px" flexShrink={0} aria-hidden />}
          title={t('Add payment details to keep receiving contributions in Bitcoin')}
          description={
            project.paymentMethods?.fiat?.stripe
              ? t(
                  'Geyser’s Bitcoin payment methods are temporarily unavailable. Add direct payment preferences so your community can continue to support you with Bitcoin.',
                )
              : t(
                  'Geyser’s Bitcoin payment methods are temporarily unavailable. Add direct payment preferences or configure Stripe so your community can continue to support you.',
                )
          }
          actionButton={
            <Button
              as={Link}
              to={getPath('dashboardWallet', project.name)}
              colorScheme="primary1"
              variant="solid"
              size="sm"
            >
              {t('Add payment details')}
            </Button>
          }
          variant="warning"
        />
      )}

      {/* Financial Actions Section */}
      <ControlPanelFinancialActions
        showClaim={isCircularGrant ? false : showClaim}
        showClaimedWithdraw={isCircularGrant ? false : showClaimedWithdraw}
        showWithdrawableBalance={isCircularGrant ? false : showWithdrawableBalance}
        aonPayoutModal={aonPayoutModal}
        onOpenClaimedWithdraw={openClaimedWithdraw}
        payoutRskModal={payoutRskModal}
        projectRskEoa={projectRskEoa}
        withdrawableSats={withdrawableSats}
        withdrawableUsd={withdrawableUsd}
        isBelowMinWithdrawThreshold={isBelowMinWithdrawThreshold}
        hasOngoingWithdraw={hasOngoingWithdraw}
        hasFailedWithdraw={hasFailedWithdraw}
        showWithdraw={showWithdraw}
      />

      {/* Write Update nudge — shown when no post in last 7 days */}

      {/* Notifications */}
      {isInactiveProject && (
        <ControlPanelNotification
          icon={<Icon as={PiWarning} color="warning.11" boxSize="24px" flexShrink={0} aria-hidden />}
          title={t('Inactive Project')}
          description={t(
            'Your project cannot receive contributions but is visible to the public. To reactivate your project go to settings',
          )}
          actionButton={
            <Button
              colorScheme="primary1"
              variant="solid"
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

      {shouldShowStripeConnectNotice && !isCircularGrant && (
        <ControlPanelNotification
          icon={<Icon as={PiCreditCard} color="primary1.11" boxSize="24px" flexShrink={0} aria-hidden />}
          title={
            isStripeConnectIncomplete
              ? t('Complete your Stripe Connect configuration')
              : t('Enable fiat payments and recurring contributions')
          }
          description={
            isStripeConnectIncomplete
              ? stripeConnectDisabledReasonLabel ||
                t('Open Stripe Connect to finish your configuration and enable fiat contributions.')
              : t(
                  'Connect Stripe to receive fiat payments directly to your bank account and allow contributors to set up auto-renewing support.',
                )
          }
          actionButton={
            <Button
              as={Link}
              to={getPath('dashboardWallet', project.name)}
              variant="solid"
              colorScheme="primary1"
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
                    ...(current ?? {}),
                    [stripeConnectNoticeKey]: true,
                  }))
          }
          variant="info"
        />
      )}

      {eligibleImpactFund && (
        <ControlPanelNotification
          icon={<Icon as={PiHandCoins} color="primary1.11" boxSize="24px" flexShrink={0} aria-hidden />}
          title={t('Eligible for {{fundName}}.', { fundName: eligibleImpactFund.title })}
          description={t('Your project may be eligible for funding.')}
          actionButton={
            <Button
              as={Link}
              to={getPath('impactFunds', encodeURIComponent(eligibleImpactFund.name))}
              size="sm"
              variant="solid"
              colorScheme="primary1"
              flexShrink={0}
            >
              {t('Learn more')}
            </Button>
          }
          variant="info"
        />
      )}

      <HStack w="full" spacing={4} alignItems="stretch">
        <ControlPanelButtons />
      </HStack>

      {showWithdraw && !isCircularGrant && (
        <PayoutRsk
          {...payoutRskModal}
          project={project}
          rskAddress={projectRskEoa}
          payoutAmountOverride={withdrawableSats}
          onCompleted={onCompleted}
        />
      )}

      {showClaim && !isCircularGrant && (
        <PayoutRsk {...aonPayoutModal} project={project} onCompleted={onAonCompleted} />
      )}
    </CardLayout>
  )
}
