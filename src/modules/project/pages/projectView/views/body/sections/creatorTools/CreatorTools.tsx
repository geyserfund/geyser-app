import { Box, Button, HStack, Icon, Image, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo } from 'react'
import { PiArrowUpRight, PiFlagCheckeredDuotone, PiInfo, PiWarning } from 'react-icons/pi'
import { Link, useLocation, useSearchParams } from 'react-router'

import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath, GuideStepByStepUrl } from '@/shared/constants/index.ts'
import { commaFormatted } from '@/shared/utils/formatData/helperFunctions.ts'
import { ProjectReviewStatus, ProjectStatus } from '@/types'

import { useProjectAtom } from '../../../../../../hooks/useProjectAtom.ts'
import { TiaRskEoaSetupNotice } from '../tiaNotification/TiaRskEoaSetupNotice.tsx'
import { CreatorButtons } from './components/CreatorButtons.tsx'
import { useAonClaimFunds } from './hooks/useAonClaimFunds.ts'
import { useImpactFundEligibility } from './hooks/useImpactFundEligibility.ts'
import { useWithdrawFunds } from './hooks/useWithdrawFunds.ts'

export const CreatorTools = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isDraftUrl = location.pathname.includes('/draft')

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
    <CardLayout
      display={{ base: 'none', lg: 'flex' }}
      w="full"
      direction="column"
      backgroundColor="neutral1.3"
      spacing={4}
    >
      <HStack w="full" justifyContent="space-between">
        <Body size="2xl" bold>
          {t('Actions')}
        </Body>
        <Button
          size="md"
          as={ChakraLink}
          href={GuideStepByStepUrl}
          isExternal
          variant="ghost"
          colorScheme="neutral1"
          paddingX={2}
          rightIcon={<PiArrowUpRight />}
        >
          {t('Guides & Checklist')}
        </Button>
      </HStack>

      <TiaRskEoaSetupNotice compact />

      {hasRevisionsRequested && (
        <HStack
          w="full"
          spacing={2}
          px={3}
          py={2}
          bg="warning.1"
          borderRadius="6px"
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack spacing={2} flex={1} alignItems="center">
            <Icon as={PiWarning} color="warning.11" boxSize="16px" flexShrink={0} />
            <Body size="sm" color="neutral1.11">
              <Body as="span" bold size="sm">
                {t('Updates requested.')}
              </Body>{' '}
              {t('Review feedback and resubmit your project.')}
            </Body>
          </HStack>
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
        </HStack>
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
                    ${withdrawableUsd.toFixed(0)}
                  </Body>
                </Body>
              </HStack>
              <Button colorScheme="primary1" variant="solid" size="md" flexShrink={0} onClick={payoutRskModal.onOpen}>
                {t('Withdraw')}
              </Button>
            </HStack>
          )}
        </VStack>
      )}

      {/* Notifications */}
      {eligibleImpactFund && (
        <HStack
          w="full"
          spacing={2}
          px={3}
          py={2}
          bg="neutral1.2"
          borderRadius="6px"
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack spacing={2} flex={1} alignItems="center">
            <Icon as={PiInfo} color="neutral1.11" boxSize="16px" flexShrink={0} />
            <Body size="sm" bold color="neutral1.11">
              {t('Eligible for {{fundName}}.', { fundName: eligibleImpactFund.title })}
            </Body>
            <Body size="sm" color="neutral1.11">
              {t('Your project may be eligible for funding.')}
            </Body>
          </HStack>
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
        </HStack>
      )}

      <HStack w="full" spacing={4} alignItems="stretch">
        <CreatorButtons />
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
