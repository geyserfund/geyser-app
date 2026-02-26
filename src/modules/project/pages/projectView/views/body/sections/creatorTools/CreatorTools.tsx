import { Box, Button, HStack, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight, PiCoinsDuotone, PiFlagCheckeredDuotone, PiSparkle } from 'react-icons/pi'
import { Link, useLocation } from 'react-router'

import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath, GuideStepByStepUrl } from '@/shared/constants/index.ts'
import { commaFormatted } from '@/shared/utils/formatData/helperFunctions.ts'
import { ProjectStatus } from '@/types'

import { useProjectAtom } from '../../../../../../hooks/useProjectAtom.ts'
import { CreatorButtons } from './components/CreatorButtons.tsx'
import { useAonClaimFunds } from './hooks/useAonClaimFunds.ts'
import { useImpactFundEligibility } from './hooks/useImpactFundEligibility.ts'
import { useWithdrawFunds } from './hooks/useWithdrawFunds.ts'

export const CreatorTools = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const location = useLocation()
  const isDraftUrl = location.pathname.includes('/draft')

  const { eligibleImpactFund } = useImpactFundEligibility()
  const { payoutRskModal, projectRskEoa, withdrawableSats, withdrawableUsd, showWithdraw, onCompleted } =
    useWithdrawFunds()
  const { showClaim, payoutRskModal: aonPayoutModal, onCompleted: onAonCompleted } = useAonClaimFunds()

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
            <Box color="yellow.500" flexShrink={0}>
              <PiCoinsDuotone size={28} />
            </Box>
            <VStack align="start" spacing={0}>
              <Body size="md" bold>
                {t('Withdraw funds')}
              </Body>
              <Body size="sm" color="neutral1.11">
                {t('Available to withdraw')}{' '}
                <Body as="span" size="sm" bold color="neutral1.12">
                  {commaFormatted(withdrawableSats)} {t('sats')}
                </Body>{' '}
                <Body as="span" size="sm" color="neutral1.9">
                  (≈${withdrawableUsd.toFixed(0)})
                </Body>
              </Body>
            </VStack>
          </HStack>
          <Button colorScheme="primary1" variant="solid" size="md" flexShrink={0} onClick={payoutRskModal.onOpen}>
            {t('Withdraw')}
          </Button>
        </HStack>
      )}

      {eligibleImpactFund && (
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
            <HStack spacing={0} color="neutral1.11" flexShrink={0}>
              <PiSparkle size={14} />
              <PiCoinsDuotone size={22} />
            </HStack>
            <VStack align="start" spacing={0}>
              <Body size="md" bold>
                {eligibleImpactFund.title}
              </Body>
              <Body size="sm" color="neutral1.11">
                {t('Your project may be eligible for additional funding.')}
              </Body>
            </VStack>
          </HStack>
          <Button
            as={Link}
            to={getPath('impactFunds', encodeURIComponent(eligibleImpactFund.name))}
            size="md"
            variant="solid"
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
