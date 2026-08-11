import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonProps,
  HStack,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
// import { useAtomValue } from 'jotai'
import type { MouseEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCopy, PiHandHeartBold, PiLink } from 'react-icons/pi'
import { useNavigate, useSearchParams } from 'react-router'

import { useProjectGrantApplicationsAPI } from '@/modules/project/API/useProjectGrantApplicationsAPI'
import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { useBlockedProjectContribution } from '@/modules/project/hooks/useBlockedProjectContribution.ts'
import { QRCodeComponent } from '@/modules/project/pages/projectFunding/views/fundingPayment/components/QRCodeComponent.tsx'
import { type AnimatedNavBarItem, AnimatedNavBar } from '@/shared/components/navigation/AnimatedNavBar'
import { Body } from '@/shared/components/typography'
// import { hasProjectFundingLimitReachedAtom } from '@/modules/project/state/projectVerificationAtom.ts'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { VotingInfoModal } from '@/shared/molecules/VotingInfoModal'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { getFullDomainUrl } from '@/shared/utils/project/getFullDomainUrl.ts'
import { CommunityVoteGrant, GrantStatusEnum, VotingSystem } from '@/types'

import { useProjectAtom } from '../../../../../hooks/useProjectAtom'

type ContributeButtonProps = ButtonProps & {
  isWidget?: boolean
  paymentMethods?: string[]
}

export const ContributeButton = ({ isWidget, paymentMethods, onClick, ...rest }: ContributeButtonProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const votingInfoModal = useModal()
  const directPaymentModal = useModal()

  useProjectGrantApplicationsAPI(true)

  const { project } = useProjectAtom()
  const { isFundingDisabled } = useProjectToolkit(project)
  const { handleBlockedContribution } = useBlockedProjectContribution(project)

  const communityVotingGrant =
    project?.grantApplications &&
    project.grantApplications.length > 0 &&
    (project.grantApplications.find(
      (application) =>
        application.grant.__typename === 'CommunityVoteGrant' &&
        application.grant.status === GrantStatusEnum.FundingOpen,
    )?.grant as CommunityVoteGrant)

  const isStepVoting = communityVotingGrant ? communityVotingGrant.votingSystem === VotingSystem.StepLog_10 : false
  const hasDirectPaymentDetails = Boolean(
    project?.directPaymentDetails?.btcAddress || project?.directPaymentDetails?.lightningAddress,
  )
  const managedRecoverableGrant = isManagedRecoverableGrantProject(project)
  const usesTemporaryDirectPayments = TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && !managedRecoverableGrant
  const managedPaymentMethods = project?.paymentMethods?.managedRecoverableGrant
  const hasManagedPaymentMethod = Boolean(
    managedPaymentMethods?.stripe || managedPaymentMethods?.strikeLightning || managedPaymentMethods?.strikeOnChain,
  )
  const hasStripePaymentMethod = Boolean(project?.paymentMethods?.fiat?.stripe)
  const bitcoinAddress = project?.directPaymentDetails?.btcAddress ?? ''
  const lightningAddress = project?.directPaymentDetails?.lightningAddress ?? ''
  const { onCopy: onCopyBitcoinAddress, hasCopied: hasCopiedBitcoinAddress } = useCopyToClipboard(bitcoinAddress)
  const { onCopy: onCopyLightningAddress, hasCopied: hasCopiedLightningAddress } = useCopyToClipboard(lightningAddress)
  const [selectedDirectPaymentMethod, setSelectedDirectPaymentMethod] = useState<'bitcoin' | 'lightning'>('bitcoin')
  const activeDirectPaymentMethod =
    selectedDirectPaymentMethod === 'bitcoin' && bitcoinAddress ? 'bitcoin' : lightningAddress ? 'lightning' : 'bitcoin'
  const directPaymentMethods = useMemo<AnimatedNavBarItem[]>(
    () => [
      ...(bitcoinAddress
        ? [
            {
              key: 'bitcoin',
              name: t('Bitcoin'),
              onClick: () => setSelectedDirectPaymentMethod('bitcoin'),
            },
          ]
        : []),
      ...(lightningAddress
        ? [
            {
              key: 'lightning',
              name: t('Lightning'),
              onClick: () => setSelectedDirectPaymentMethod('lightning'),
            },
          ]
        : []),
    ],
    [bitcoinAddress, lightningAddress, t],
  )
  const activeDirectPaymentMethodIndex = directPaymentMethods.findIndex(
    (method) => method.key === activeDirectPaymentMethod,
  )

  useEffect(() => {
    if (!usesTemporaryDirectPayments || !hasDirectPaymentDetails || searchParams.get('direct-payment') !== '1') {
      return
    }

    directPaymentModal.onOpen()
    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.delete('direct-payment')
    setSearchParams(nextSearchParams, { replace: true })
  }, [directPaymentModal, hasDirectPaymentDetails, searchParams, setSearchParams, usesTemporaryDirectPayments])

  if (!project) {
    return null
  }

  const handleWidgetClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (usesTemporaryDirectPayments && hasDirectPaymentDetails) {
      event.preventDefault()
      directPaymentModal.onOpen()
      return
    }

    if (handleBlockedContribution(event)) {
      return
    }

    onClick?.(event)
  }

  const handleInlineClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (usesTemporaryDirectPayments && hasDirectPaymentDetails) {
      event.preventDefault()
      directPaymentModal.onOpen()
      return
    }

    if (handleBlockedContribution(event)) {
      return
    }

    onClick?.(event)
    if (event.defaultPrevented) {
      return
    }

    if (communityVotingGrant && isStepVoting) {
      votingInfoModal.onOpen()
    } else {
      navigate(getPath('projectFunding', project.name))
    }
  }

  const handlePayWithStripe = () => {
    directPaymentModal.onClose()
    navigate(`${getPath('projectFunding', project.name)}?direct-payment-stripe=1`)
  }

  const sharedButtonProps: ButtonProps = {
    size: 'lg',
    variant: 'solid',
    colorScheme: 'primary1',
    isDisabled: managedRecoverableGrant
      ? !hasManagedPaymentMethod || isFundingDisabled()
      : usesTemporaryDirectPayments && !hasStripePaymentMethod
      ? !hasDirectPaymentDetails
      : isFundingDisabled(),
    position: 'relative',
    sx: {
      transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background-color 0.2s',
      '&:active:not(:disabled)': { transform: 'scale(0.96)' },
    },
  }

  return (
    <>
      {communityVotingGrant && isStepVoting && (
        <VotingInfoModal
          {...votingInfoModal}
          modalTitle={t('Project is part of a voting grant')}
          grantName={communityVotingGrant.title}
          votingSystem={VotingSystem.StepLog_10}
          project={project}
        />
      )}

      {usesTemporaryDirectPayments && hasDirectPaymentDetails && (
        <DirectPaymentModal
          isOpen={directPaymentModal.isOpen}
          onClose={directPaymentModal.onClose}
          methods={directPaymentMethods}
          activeMethodIndex={activeDirectPaymentMethodIndex}
          activeMethod={activeDirectPaymentMethod}
          bitcoinAddress={bitcoinAddress}
          lightningAddress={lightningAddress}
          bitcoinCopied={hasCopiedBitcoinAddress}
          lightningCopied={hasCopiedLightningAddress}
          onCopyBitcoinAddress={onCopyBitcoinAddress}
          onCopyLightningAddress={onCopyLightningAddress}
          hasStripePaymentMethod={hasStripePaymentMethod}
          onPayWithStripe={handlePayWithStripe}
        />
      )}
      {isWidget ? (
        usesTemporaryDirectPayments && !hasStripePaymentMethod && !hasDirectPaymentDetails ? (
          <Tooltip label={t('Funding is unavailable at the moment, until the creator adds payment details.')}>
            <span tabIndex={0} style={{ display: 'block', width: '100%' }}>
              <Button
                {...sharedButtonProps}
                {...rest}
                data-testid="contribute-button"
                as={Link}
                href={getFullDomainUrl(getPath('projectFunding', project.name))}
                isExternal
                onClick={handleWidgetClick}
              >
                {t('Contribute')}
              </Button>
            </span>
          </Tooltip>
        ) : (
          <Button
            {...sharedButtonProps}
            {...rest}
            data-testid="contribute-button"
            as={Link}
            href={getFullDomainUrl(getPath('projectFunding', project.name))}
            isExternal
            onClick={handleWidgetClick}
          >
            {t('Contribute')}
          </Button>
        )
      ) : usesTemporaryDirectPayments && !hasStripePaymentMethod && !hasDirectPaymentDetails ? (
        <Tooltip label={t('Funding is unavailable at the moment, until the creator adds payment details.')}>
          <span tabIndex={0} style={{ display: 'block', width: '100%' }}>
            <Button {...sharedButtonProps} {...rest} data-testid="contribute-button" onClick={handleInlineClick}>
              {t('Contribute')}
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Button {...sharedButtonProps} {...rest} data-testid="contribute-button" onClick={handleInlineClick}>
          {t('Contribute')}
        </Button>
      )}
    </>
  )
}

type DirectPaymentModalProps = {
  isOpen: boolean
  onClose: () => void
  methods: AnimatedNavBarItem[]
  activeMethodIndex: number
  activeMethod: 'bitcoin' | 'lightning'
  bitcoinAddress: string
  lightningAddress: string
  bitcoinCopied: boolean
  lightningCopied: boolean
  onCopyBitcoinAddress: () => void
  onCopyLightningAddress: () => void
  hasStripePaymentMethod: boolean
  onPayWithStripe: () => void
}

const DirectPaymentModal = ({
  isOpen,
  onClose,
  methods,
  activeMethodIndex,
  activeMethod,
  bitcoinAddress,
  lightningAddress,
  bitcoinCopied,
  lightningCopied,
  onCopyBitcoinAddress,
  onCopyLightningAddress,
  hasStripePaymentMethod,
  onPayWithStripe,
}: DirectPaymentModalProps) => {
  const { t } = useTranslation()
  const isBitcoinActive = activeMethod === 'bitcoin'

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="2xl">
        <ModalHeader>{t('Direct Bitcoin Payment')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom={6}>
          <VStack align="stretch" spacing={5}>
            <Body size="lg">{t('Pay the creator directly using one of the methods below.')}</Body>
            <DirectPaymentWarning />
            <VStack align="stretch" spacing={2}>
              <AnimatedNavBar items={methods} activeIndex={Math.max(activeMethodIndex, 0)} showLabel />
              <DirectPaymentMethod
                address={isBitcoinActive ? bitcoinAddress : lightningAddress}
                copied={isBitcoinActive ? bitcoinCopied : lightningCopied}
                onCopy={isBitcoinActive ? onCopyBitcoinAddress : onCopyLightningAddress}
              />
              {hasStripePaymentMethod && <PayWithStripeButton onClick={onPayWithStripe} />}
              <DirectPaymentSupportNotice />
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const DirectPaymentWarning = () => {
  const { t } = useTranslation()

  return (
    <Alert status="warning" borderRadius="8px" alignItems="flex-start">
      <AlertIcon />
      <VStack align="start" spacing={1}>
        <AlertTitle>{t('Your contributions will not show')}</AlertTitle>
        <AlertDescription fontSize="md" fontWeight="medium">
          {t(
            'The Geyser Bitcoin funding flow is currently unavailable due to an issue in one of our payment service providers',
          )}{' '}
          ({' '}
          <Link href="https://geyser.fund/news" isExternal textDecoration="underline">
            {t('see latest updates here')}
          </Link>
          {t(
            '). These payment methods were provided by the creator. Geyser will not verify the payment, and as such your contribution will not show on the project at this time.',
          )}
        </AlertDescription>
      </VStack>
    </Alert>
  )
}

const PayWithStripeButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation()

  return (
    <>
      <Body size="sm" light alignSelf="center">
        {t('or')}
      </Body>
      <Button
        size="lg"
        w="full"
        variant="solid"
        bg="#635BFF"
        color="white"
        _hover={{ bg: '#635BFF', opacity: 0.92 }}
        onClick={onClick}
      >
        <HStack spacing={2} justify="center" align="center">
          <span>{t('Pay with')}</span>
          <Image src="/icons/stripe-logo-white.png" alt={t('Stripe')} h="24px" ml={-1} objectFit="contain" />
        </HStack>
      </Button>
    </>
  )
}

const DirectPaymentSupportNotice = () => {
  const { t } = useTranslation()

  return (
    <Alert
      status="success"
      borderRadius="8px"
      alignItems="flex-start"
      bg="primary1.2"
      border="1px solid"
      borderColor="primary1.5"
    >
      <Icon as={PiHandHeartBold} color="primary1.9" boxSize={7} alignSelf="center" mr={2} />
      <VStack align="start" spacing={1}>
        <Body size="sm" bold>
          {t('Support Geyser')}
        </Body>
        <Body size="sm" lineHeight="1.5">
          {t(
            'Geyser takes 0% fee on direct contributions. We rely on community contributions to keep the platform running. Consider supporting us directly ',
          )}
          <Link href="https://geyser.fund/project/geyser/funding" isExternal textDecoration="underline">
            {t('here')}
          </Link>
          {t(', or become a ')}
          <Link href="https://geyser.fund/guardians" isExternal textDecoration="underline">
            {t('Geyser Guardian')}
          </Link>
          {t('.')}
        </Body>
      </VStack>
    </Alert>
  )
}

type DirectPaymentMethodProps = {
  address: string
  copied: boolean
  onCopy: () => void
}

const DirectPaymentMethod = ({ address, copied, onCopy }: DirectPaymentMethodProps) => {
  const { t } = useTranslation()

  return (
    <VStack align="stretch" spacing={4} padding={5} border="1px solid" borderColor="neutral1.6" borderRadius="8px">
      <VStack align="center" width="full">
        <QRCodeComponent value={address} onClick={onCopy} isColored={copied} />
      </VStack>
      <Body wordBreak="break-all" textAlign="center">
        {address}
      </Body>
      <Button
        size="lg"
        minWidth="310px"
        alignSelf="center"
        leftIcon={copied ? <PiLink /> : <PiCopy />}
        onClick={onCopy}
        variant="solid"
        colorScheme="primary1"
      >
        {copied ? t('Copied!') : t('Copy address')}
      </Button>
    </VStack>
  )
}
