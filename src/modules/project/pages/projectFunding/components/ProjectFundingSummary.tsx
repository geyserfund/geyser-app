/* eslint-disable complexity */
import { HStack, Icon, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiInfo } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useProjectMatchingPreview } from '@/modules/project/funding/hooks/useProjectMatchingPreview.ts'
import { selectedGoalIdAtom } from '@/modules/project/funding/state'
import {
  guardianBadgesCostAtoms,
  networkFeeAtom,
  rewardsCostAtoms,
  shippingCostAtom,
  tipAtoms,
  totalAmountSatsAtom,
  totalAmountUsdCentAtom,
} from '@/modules/project/funding/state/fundingFormAtom.ts'
import { shippingCountryAtom } from '@/modules/project/funding/state/shippingAddressAtom.ts'
import { useGoalsAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { getProjectMatchingAmountBreakdown } from '@/modules/project/matching/utils/projectMatching.ts'
import { recurringFundingModes } from '@/modules/project/recurring/graphql'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { bitcoinQuoteAtom } from '@/shared/state/btcRateAtom.ts'
import { referrerHeroIdAtom } from '@/shared/state/referralAtom.ts'
import { ProjectMatchingCurrency } from '@/types'
import { commaFormatted, toInt } from '@/utils'

import { LaunchpadSummary, NonProfitSummary, TAndCs } from '../views/fundingInit/sections/FundingInitSideContent.tsx'
import { PaymentIntervalLabelMap } from '../views/fundingInit/sections/FundingSubscription'
import type { FundingSummaryContentData, FundingSummaryProductItem } from './FundingSummaryContent.tsx'
import { FundingSummaryContent } from './FundingSummaryContent.tsx'

type ProjectFundingSummaryProps = {
  disableCollapse?: boolean
  referenceCode?: string | null
  matchedAmountOverride?: { sats: number; usdCents: number } | null
}

/** ProjectFundingSummary adapts live funding form state into the shared funding summary UI. */
export const ProjectFundingSummary = ({
  disableCollapse,
  referenceCode,
  matchedAmountOverride,
}: ProjectFundingSummaryProps) => {
  const { t } = useTranslation()

  const bitcoinQuote = useAtomValue(bitcoinQuoteAtom)
  const { rewards } = useRewardsAtom()
  const { inProgressGoals } = useGoalsAtom()
  const projectGoalId = useAtomValue(selectedGoalIdAtom)

  const rewardsCosts = useAtomValue(rewardsCostAtoms)
  const shippingCosts = useAtomValue(shippingCostAtom)
  const shippingCountry = useAtomValue(shippingCountryAtom)
  const tip = useAtomValue(tipAtoms)
  const networkFee = useAtomValue(networkFeeAtom)
  const totalSats = useAtomValue(totalAmountSatsAtom)
  const totalUsdCent = useAtomValue(totalAmountUsdCentAtom)
  const guardianBadgesCosts = useAtomValue(guardianBadgesCostAtoms)
  const referrerHeroId = useAtomValue(referrerHeroIdAtom)

  const { formState, hasSelectedRewards, project } = useFundingFormAtom()
  const matchingPreview = useProjectMatchingPreview()

  const currentGoal =
    inProgressGoals.length > 0
      ? projectGoalId
        ? inProgressGoals.find((goal) => goal.id === projectGoalId)
        : inProgressGoals[0]
      : undefined

  const productItems: FundingSummaryProductItem[] = rewards.reduce<FundingSummaryProductItem[]>((items, reward) => {
    const count = formState.rewardsByIDAndCount ? formState.rewardsByIDAndCount[reward.id] : 0

    if (!count) {
      return items
    }

    return [
      ...items,
      {
        image: reward.images[0],
        key: reward.id,
        label: `${reward.name} (x${count})`,
      },
    ]
  }, [])

  const numberOfRewardsSelected =
    hasSelectedRewards && formState.rewardsByIDAndCount
      ? Object.entries(formState.rewardsByIDAndCount).reduce((total, [, count]) => total + toInt(count), 0)
      : 0

  const matchingAmountBreakdown = formState.fundingMode
    ? getProjectMatchingAmountBreakdown({
        amount: project.activeMatching?.remainingCapAmount || 0,
        referenceCurrency: project.activeMatching?.referenceCurrency || ProjectMatchingCurrency.Btcsat,
        bitcoinQuote,
      })
    : { sats: 0, usdCents: 0 }

  const matchingAmount = matchedAmountOverride
    ? {
        label: t('Matched amount'),
        sats: matchedAmountOverride.sats,
        usdCents: matchedAmountOverride.usdCents,
      }
    : project.activeMatching && matchingPreview.hasActiveMatching && matchingPreview.matchedAmountSats > 0
    ? {
        label: t('Matched amount'),
        sats: matchingPreview.matchedAmountSats,
        usdCents: matchingPreview.matchedAmountUsdCents,
      }
    : undefined

  const donation =
    formState.donationAmount > 0 && formState.fundingMode !== recurringFundingModes.membership
      ? {
          label: t(
            formState.fundingMode === recurringFundingModes.recurringDonation ? 'Recurring donation' : 'Donation',
          ),
          sats: formState.donationAmount,
          usdCents: formState.donationAmountUsdCent,
        }
      : undefined

  const membership = formState.subscription?.subscriptionId
    ? {
        label: t('Membership'),
        value: (
          <Body size={{ base: 'sm', lg: 'md' }}>
            {`$${commaFormatted(formState.subscription.amountUsdCent / 100)}`}
            <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
              {` / ${commaFormatted(formState.subscription.amountBtcSat)} sats / ${
                PaymentIntervalLabelMap[formState.subscription.interval]
              }`}
            </Body>
          </Body>
        ),
      }
    : undefined

  const summaryData: FundingSummaryContentData = {
    currentGoalTitle: currentGoal?.title,
    donation,
    guardianBadgesSats: guardianBadgesCosts.sats,
    matchingAmount,
    matchingAvailable:
      project.activeMatching && matchingPreview.hasActiveMatching
        ? {
            label: t('Matching available'),
            sats: matchingAmountBreakdown.sats,
            usdCents: matchingAmountBreakdown.usdCents,
          }
        : undefined,
    membership,
    networkFee,
    productItems,
    productsCost: rewardsCosts,
    referenceCode,
    referrerHeroId,
    shippingCost: shippingCosts,
    showShippingEstimateTooltip: !shippingCountry,
    tip:
      tip.sats > 0
        ? {
            label:
              formState.fundingMode === recurringFundingModes.recurringDonation ? (
                <HStack spacing={1}>
                  <Body as="span" size={{ base: 'sm', lg: 'md' }} light>
                    {t('Geyser tip')}
                  </Body>
                  <TooltipPopover text={t('Applies to the first payment only.')}>
                    <HStack as="span" h="full" alignItems="center">
                      <Icon as={PiInfo} />
                    </HStack>
                  </TooltipPopover>
                </HStack>
              ) : (
                t('Geyser tip')
              ),
            sats: tip.sats,
            usdCents: tip.usdCents,
          }
        : undefined,
    total: {
      sats: totalSats,
      usdCents: totalUsdCent,
    },
  }

  return (
    <FundingSummaryContent
      data={summaryData}
      disableCollapse={disableCollapse}
      hasDetails={
        disableCollapse ? false : formState.donationAmount > 0 || numberOfRewardsSelected > 0 || totalUsdCent >= 10
      }
      mobileHeaderContent={
        <VStack w="full" alignItems="start" display={{ base: 'flex', lg: 'none' }} spacing={3} marginBottom={3}>
          <H2 size="xl" bold sx={{ textWrap: 'balance' }}>
            {t('Summary')}
          </H2>

          <NonProfitSummary disableDesktop={true} />
          <LaunchpadSummary disableDesktop={true} />
          <TAndCs disableDesktop={true} />
        </VStack>
      }
    />
  )
}
