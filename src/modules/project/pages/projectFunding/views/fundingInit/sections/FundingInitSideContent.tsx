import { Box, Button, Icon, Link, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { FormEvent } from 'react'
import { Trans } from 'react-i18next'
import { PiHeartbeatFill } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { BodyProps } from '@/components/typography/Body.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { cannotCompleteShippingForThisOrderAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath, GeyserTermsUrl } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { darkModeColors } from '@/shared/styles/colors.ts'
import { LegalEntityType } from '@/types/index.ts'
import { isPrelaunch, useMobileMode, useNotification } from '@/utils'

import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary'
import { FundingCheckoutWrapper, FundingSummaryWrapper } from '../../../layouts/FundingSummaryWrapper'

export const MAX_DONATION_AMOUNT = 1000000 // 10,000 USD in cents

export const FundingInitBottomContent = () => {
  return <FundingInitSummary />
}

export const FundingInitSideContent = () => {
  return (
    <CardLayout w="full" h="full" padding={0}>
      <FundingInitSummary />
    </CardLayout>
  )
}

export const FundingInitSummary = () => {
  const navigate = useNavigate()
  const toast = useNotification()
  const cannotCompleteShippingForThisOrder = useAtomValue(cannotCompleteShippingForThisOrderAtom)

  const { user } = useAuthContext()

  const { isFundingInputAmountValid, project, formState } = useFundingFormAtom()

  const handleCheckoutButtonPressed = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { valid, title, description } = isFundingInputAmountValid
    if (valid) {
      navigate(getPath('fundingDetails', project.name))
    } else {
      toast.error({
        title,
        description,
      })
    }
  }

  const isFundingAmountTooHigh = formState.donationAmountUsdCent > MAX_DONATION_AMOUNT

  const showCompleteVerification = isFundingAmountTooHigh && !user.complianceDetails.verifiedDetails?.identity?.verified

  const isDisabled = cannotCompleteShippingForThisOrder || showCompleteVerification

  return (
    <VStack
      as="form"
      width="100%"
      height="100%"
      maxHeight={{ base: 'calc(100vh - 177px)', lg: 'auto' }}
      overflowY="auto"
      justifyContent={'space-between'}
      onSubmit={handleCheckoutButtonPressed}
    >
      <FundingSummaryWrapper>
        <ProjectFundingSummary />
      </FundingSummaryWrapper>
      <FundingCheckoutWrapper>
        <VStack w="full" alignItems="flex-start">
          <NonProfitSummary disableMobile={true} />
          <LaunchpadSummary disableMobile={true} />
          <TAndCs disableMobile={true} />
          <Button
            size="lg"
            w="full"
            variant="solid"
            colorScheme="primary1"
            type="submit"
            isDisabled={isDisabled}
            data-testid="continue-from-init-button"
          >
            {t('Continue')}
          </Button>
        </VStack>
      </FundingCheckoutWrapper>
    </VStack>
  )
}

export const TAndCs = ({
  disableMobile,
  disableDesktop,
  ...props
}: {
  disableMobile?: boolean
  disableDesktop?: boolean
} & BodyProps) => {
  const isMobile = useMobileMode()

  if ((isMobile && disableMobile) || (!isMobile && disableDesktop)) {
    return null
  }

  return (
    <Body size="sm" light {...props}>
      <Trans i18nKey="By continuing to checkout you are accepting our <1>T&Cs</1>.">
        {'By continuing to checkout you are accepting our '}
        <Link isExternal href={GeyserTermsUrl} textDecoration={'underline'}>
          {'T&Cs'}
        </Link>
        {'.'}
      </Trans>
    </Body>
  )
}

export const NonProfitSummary = ({
  disableMobile,
  disableDesktop,
  ...props
}: {
  disableMobile?: boolean
  disableDesktop?: boolean
} & BodyProps) => {
  const { project } = useFundingFormAtom()
  const { hasSelectedRewards } = useFundingFormAtom()
  const isMobile = useMobileMode()

  const ownerTaxProfile = project.owners[0]?.user.taxProfile
  const isNonProfit = ownerTaxProfile?.legalEntityType === LegalEntityType.NonProfit && ownerTaxProfile?.verified
  const isLaunchpad = isPrelaunch(project?.status) && hasSelectedRewards

  if (!isNonProfit || isLaunchpad || (isMobile && disableMobile) || (!isMobile && disableDesktop)) {
    return null
  }

  return (
    <Body size="sm" light {...props}>
      <Box as="span" verticalAlign={'text-top'}>
        <Icon as={PiHeartbeatFill} color={darkModeColors.orange[10]} boxSize={4} />
      </Box>
      {t('A tax-deductible invoice is provided  when contributing to this project.')}{' '}
      {t('To ensure accurate name in the invoice, update your username or tax profile in profile settings.')}
    </Body>
  )
}

export const LaunchpadSummary = ({
  disableMobile,
  disableDesktop,
  ...props
}: {
  disableMobile?: boolean
  disableDesktop?: boolean
} & StackProps) => {
  const { project } = useFundingFormAtom()
  const { hasSelectedRewards } = useFundingFormAtom()
  const isMobile = useMobileMode()

  const isLaunchpad = isPrelaunch(project?.status) && hasSelectedRewards

  if (!isLaunchpad || (isMobile && disableMobile) || (!isMobile && disableDesktop)) {
    return null
  }

  return (
    <Feedback variant={FeedBackVariant.WARNING} noIcon {...props}>
      <Body size="sm">
        {t(
          "You’re purchasing a product from a project that’s in Launchpad. Your payment will be processed, but the project will only be going live if the project reaches $210. By contributing, you're helping the creator reach that milestone. 🙌",
        )}
      </Body>
    </Feedback>
  )
}
