import { Button, Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { useState } from 'react'
import { PiArrowSquareOut } from 'react-icons/pi'
import { SingleValue } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { fundingProjectAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { fundingPaymentDetailsPartialUpdateAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { rskAccountKeysAtom } from '@/modules/project/funding/state/swapRskAtom.ts'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { generateAccountKeys, generatePreImageHash } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import type { ContributionFiatToLightningSwapPaymentDetailsBanxaInput } from '@/types/index.ts'
import { useFundingFiatSwapPaymentCreateMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { FiatSwapStatus, fiatSwapStatusAtom } from '../atom/fiatSwapStatusAtom.ts'
import { fiatSwapCurrencies } from '../data.ts'
import { BitcoinPurchaseNotice } from './BitcoinPurchaseNotice.tsx'
import { useGenerateTransactionDataForClaimingRBTCToContract } from '@/modules/project/funding/hooks/useFundingAPI.ts'

/** Component for handling fiat swap currency selection and payment */
export const FiatSwapForm: React.FC = () => {
  const toast = useNotification()

  const fundingContribution = useAtomValue(fundingContributionAtom)
  const project = useAtomValue(fundingProjectAtom)
  const updateFundingPaymentDetails = useSetAtom(fundingPaymentDetailsPartialUpdateAtom)
  const setFiatSwapStatus = useSetAtom(fiatSwapStatusAtom)
  const setRskAccountKeys = useSetAtom(rskAccountKeysAtom)

  const { isLoggedIn } = useAuthContext()
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const userAccountKeyPair = useAtomValue(userAccountKeyPairAtom)
  const { generateTransactionForLightningToRskSwap } = useGenerateTransactionDataForClaimingRBTCToContract()

  const [createFiatSwapPayment, { loading: isLoading }] = useFundingFiatSwapPaymentCreateMutation()

  const [selectedCurrency, setSelectedCurrency] = useState<SingleValue<{ label: string; value: string }>>()

  const handleCreateFiatSwapPayment = async () => {
    if (!selectedCurrency?.value) {
      toast.error({
        title: t('Please select a currency'),
      })
      return
    }

    const lightningPreImage = generatePreImageHash()
    let accountKeys = {
      publicKey: userAccountKeys?.rskKeyPair?.publicKey || '',
      address: userAccountKeys?.rskKeyPair?.address || '',
      privateKey: userAccountKeyPair?.privateKey || '',
    }

    if (!isLoggedIn) {
      const generatedKeys = generateAccountKeys()
      setRskAccountKeys(generatedKeys)
      accountKeys = {
        publicKey: generatedKeys.publicKey,
        address: generatedKeys.address,
        privateKey: generatedKeys.privateKey,
      }
    }

    if (!accountKeys.publicKey || !accountKeys.address || !accountKeys.privateKey) {
      toast.error({
        title: t('Missing Rootstock account keys'),
      })
      return
    }

    const banxaInput = {
      fiatCurrency: selectedCurrency?.value || '',
      returnUrl: `${window.location.origin}${getPath('fundingCallback', project.name)}`,
    } as ContributionFiatToLightningSwapPaymentDetailsBanxaInput

    const { data } = await createFiatSwapPayment({
      variables: {
        input: {
          contributionId: fundingContribution.id,
          paymentsInput: {
            fiatToLightningSwap: {
              create: true,
              banxa: banxaInput,
            },
            lightningToRskSwap: {
              create: true,
              boltz: {
                claimPublicKey: accountKeys.publicKey,
                claimAddress: accountKeys.address,
                preimageHash: lightningPreImage.preimageHash,
              },
            },
          },
        },
      },
    })

    if (data?.contributionPaymentsAdd.payments.fiatToLightningSwap?.checkoutUrl) {
      window.open(data.contributionPaymentsAdd.payments.fiatToLightningSwap.checkoutUrl, '_blank')
      updateFundingPaymentDetails({
        fiatToLightningSwap: data?.contributionPaymentsAdd.payments.fiatToLightningSwap,
        lightningToRskSwap: data?.contributionPaymentsAdd.payments.lightningToRskSwap,
      })
      setFiatSwapStatus(FiatSwapStatus.pending)

      if (data?.contributionPaymentsAdd.payments.lightningToRskSwap) {
        generateTransactionForLightningToRskSwap({
          contribution: fundingContribution,
          payment: data.contributionPaymentsAdd.payments.lightningToRskSwap,
          preImages: lightningPreImage,
          accountKeys,
        })
      }
    }
  }

  return (
    <>
      <FieldContainer title={t('Currency')} subtitle={t('Select a currency supported by our payment provider')}>
        <CustomSelect
          width={'100%'}
          options={fiatSwapCurrencies}
          value={selectedCurrency}
          onChange={(value) => {
            setSelectedCurrency(value)
          }}
        />
      </FieldContainer>
      <Button
        width="100%"
        maxWidth="350px"
        size="lg"
        variant="solid"
        colorScheme="primary1"
        rightIcon={<Icon as={PiArrowSquareOut} />}
        onClick={handleCreateFiatSwapPayment}
        isLoading={isLoading}
      >
        {isLoading ? t('Redirecting you to fiat payment') : t('Pay with Banxa')}
      </Button>
      <Body size="sm">{t('You will be redirected to Banxa our fiat payment provider to complete your payment.')}</Body>
      <BitcoinPurchaseNotice />
    </>
  )
}
