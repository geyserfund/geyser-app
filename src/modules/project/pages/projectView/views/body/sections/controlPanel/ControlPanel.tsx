import { Box, Button, HStack, Icon, Image, Link as ChakraLink, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import { PiArrowUpRight, PiFlagCheckeredDuotone, PiGear, PiWarning } from 'react-icons/pi'
import { Link, useLocation, useSearchParams } from 'react-router'

import { GEYSER_PROMOTIONS_PROJECT_NAME } from '@/modules/discovery/pages/landing/views/mainView/defaultView/sections/Featured.tsx'
import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath, GuideStepByStepUrl } from '@/shared/constants/index.ts'
import { commaFormatted } from '@/shared/utils/formatData/helperFunctions.ts'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { ProjectReviewStatus, ProjectStatus } from '@/types'

import { useProjectAtom } from '../../../../../../hooks/useProjectAtom.ts'
import { promotionsNoticeClosedByProjectAtom } from '../noticeAtom.ts'
import { TiaRskEoaSetupNotice } from '../tiaNotification/TiaRskEoaSetupNotice.tsx'
import { ControlPanelButtons } from './components/ControlPanelButtons.tsx'
import { ControlPanelNotification } from './components/ControlPanelNotification.tsx'
import { useAonClaimFunds } from './hooks/useAonClaimFunds.ts'
import { useImpactFundEligibility } from './hooks/useImpactFundEligibility.ts'
import { useWithdrawFunds } from './hooks/useWithdrawFunds.ts'

export const ControlPanel = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isDraftUrl = location.pathname.includes('/draft')
  const projectNoticeKey = String(project.id)

  const { isFundingDisabled } = useProjectToolkit(project)
  const [promotionsNoticeClosedByProject, setPromotionsNoticeClosedByProject] = useAtom(
    promotionsNoticeClosedByProjectAtom,
  )
  const isPromotionsModalOpen = Boolean(promotionsNoticeClosedByProject[projectNoticeKey])

  const { eligibleImpactFund } = useImpactFundEligibility()
  const { payoutRskModal, projectRskEoa, withdrawableSats, withdrawableUsd, showWithdraw, onCompleted } =
    useWithdrawFunds()
  const { showClaim, payoutRskModal: aonPayoutModal, onCompleted: onAonCompleted } = useAonClaimFunds()

  /** Get latest review for revisions requested check */
  const latestReview = useMemo(() => {
    if (!project.reviews || project.reviews.length === 0) return undefined
    return [...project.reviews].sort((a, b) => (b.version ?? 0) - (a.version ?? 0))[0]
  }, [project.reviews])

  const hasRevisionsRequested = latestReview?.status === ProjectReviewStatus.RevisionsRequested

  /** Handle ?action=withdraw query param to auto-open withdrawal modal */
  useEffect(() => {
    const action = searchParams.get('action')
    if (action === 'withdraw' && showWithdraw && !payoutRskModal.isOpen) {
      payoutRskModal.onOpen()
      // Remove the query param after opening the modal
      searchParams.delete('action')
      setSearchParams(searchParams, { replace: true })
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
            variant="solid"
            bg="white"
            color="neutral1.12"
            paddingX={3}
            leftIcon={<PiGear />}
            _hover={{ bg: 'neutral1.2' }}
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
          variant="solid"
          bg="white"
          color="neutral1.12"
          paddingX={3}
          leftIcon={<PiGear />}
          _hover={{ bg: 'neutral1.2' }}
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
      {(showClaim || showWithdraw) && (
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

          {showWithdraw && (
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
                  alt="coins"
                  boxSize="52px"
                  objectFit="contain"
                  flexShrink={0}
                />
                <Body size="md" color="neutral1.11">
                  {t('Funds available to withdraw')}:{' '}
                  <Body as="span" size="md" bold color="neutral1.12">
                    {commaFormatted(withdrawableSats)} {t('sats')}
                  </Body>{' '}
                  <Body as="span" size="md" color="neutral1.9">
                    ≈${withdrawableUsd.toFixed(0)}
                  </Body>
                </Body>
              </HStack>
              <Button
                colorScheme="primary1"
                variant="solid"
                size="md"
                w={{ base: 'full', md: 'auto' }}
                flexShrink={0}
                onClick={payoutRskModal.onOpen}
              >
                {t('Withdraw')}
              </Button>
            </Stack>
          )}
        </VStack>
      )}

      {/* Notifications */}
      {!isPromotionsModalOpen && !isFundingDisabled() && (
        <ControlPanelNotification
          icon={
            <Image
              src={'https://storage.googleapis.com/geyser-projects-media/utils/microphone.png'}
              alt="amplify image"
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
          icon={
            <Image
              src="/icons/impact-funds-icon.png"
              alt="impact fund"
              width="48px"
              height="48px"
              flexShrink={0}
              filter="grayscale(1)"
            />
          }
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
