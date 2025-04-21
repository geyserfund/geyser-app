import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { LegalEntityType } from '@/types/index.ts'
import { useNotification } from '@/utils'

import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary'
import { FundingCheckoutWrapper, FundingSummaryWrapper } from '../../../layouts/FundingSummaryWrapper'
import { CompleteVerificationToIncreaseFunding } from '../components/CompleteVerificationToIncreaseFunding.tsx'

const MAX_DONATION_AMOUNT = 1000000 // 10,000 USD in cents

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

  const { user } = useAuthContext()

  const { isFundingInputAmountValid, project, formState } = useFundingFormAtom()

  const ownerTaxProfile = project.owners[0]?.user.taxProfile
  const isNonProfit = ownerTaxProfile?.legalEntityType === LegalEntityType.NonProfit && ownerTaxProfile?.verified

  const handleCheckoutButtonPressed = (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <form style={{ width: '100%', height: '100%', overflowY: 'visible' }} onSubmit={handleCheckoutButtonPressed}>
      <FundingSummaryWrapper justifyContent="space-between">
        <ProjectFundingSummary />
        {showCompleteVerification && <CompleteVerificationToIncreaseFunding />}
      </FundingSummaryWrapper>
      <FundingCheckoutWrapper>
        <VStack w="full">
          {isNonProfit && (
            <Body size="sm" light>
              {t('A Tax-deductible invoice is provided  when contributing to this project.')}{' '}
              {t('To ensure accurate name in the invoice, update your username or tax profile in profile settings.')}
            </Body>
          )}
          <Body size="sm" light>
            {t('By continuing to checkout you are accepting our T&Cs')}
          </Body>
          <Button
            size="lg"
            w="full"
            variant="solid"
            colorScheme="primary1"
            type="submit"
            isDisabled={showCompleteVerification}
          >
            {t('Checkout')}
          </Button>
        </VStack>
      </FundingCheckoutWrapper>
    </form>
  )
}
