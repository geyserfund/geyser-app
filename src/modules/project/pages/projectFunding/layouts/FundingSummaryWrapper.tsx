import { HStack, StackProps, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import React, { PropsWithChildren } from 'react'

import { useAuthContext } from '@/context/auth.tsx'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { cannotCompleteShippingForThisOrderAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { LegalEntityType } from '@/types/generated/graphql.ts'

import { CannotCompleteShippingForThisOrder } from '../views/fundingInit/components/CannotCompleteShippingForThisOrder.tsx'
import { CompleteVerificationToIncreaseFunding } from '../views/fundingInit/components/CompleteVerificationToIncreaseFunding.tsx'
import { MAX_DONATION_AMOUNT } from '../views/fundingInit/sections/FundingInitSideContent.tsx'

export const FundingSummaryWrapper: React.FC<PropsWithChildren<StackProps>> = ({ children, ...rest }) => {
  const { user } = useAuthContext()

  const { project, formState } = useFundingFormAtom()
  const cannotCompleteShippingForThisOrder = useAtomValue(cannotCompleteShippingForThisOrderAtom)

  const isFundingAmountTooHigh = formState.donationAmountUsdCent > MAX_DONATION_AMOUNT

  const showCompleteVerification = isFundingAmountTooHigh && !user.complianceDetails.verifiedDetails?.identity?.verified

  const isDisabled = cannotCompleteShippingForThisOrder || showCompleteVerification

  const ownerTaxProfile = project.owners[0]?.user.taxProfile
  const isNonProfit = ownerTaxProfile?.legalEntityType === LegalEntityType.NonProfit && ownerTaxProfile?.verified
  return (
    <VStack
      paddingX={{ base: 0, lg: 6 }}
      paddingY={{ base: 0, lg: 6 }}
      width={'100%'}
      height={{ base: 'calc(100% - 72px)', lg: isNonProfit ? 'calc(100% - 194px)' : 'calc(100% - 120px)' }}
      overflowY={'auto'}
      borderRadius={'md'}
      spacing={4}
      alignItems="start"
      {...rest}
    >
      {children}
      {isDisabled && (
        <VStack w="full" alignItems="flex-start">
          {showCompleteVerification && !cannotCompleteShippingForThisOrder && <CompleteVerificationToIncreaseFunding />}
          {cannotCompleteShippingForThisOrder && <CannotCompleteShippingForThisOrder />}
        </VStack>
      )}
    </VStack>
  )
}

export const FundingCheckoutWrapper: React.FC<PropsWithChildren<StackProps>> = ({ children, ...rest }) => {
  return (
    <HStack
      alignItems={'flex-end'}
      w="full"
      height={{ base: '72px', lg: '120px' }}
      padding={{ base: 0, lg: 6 }}
      {...rest}
    >
      {children}
    </HStack>
  )
}
