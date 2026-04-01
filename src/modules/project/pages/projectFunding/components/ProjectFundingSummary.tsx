/* eslint-disable complexity */
import { Button, Divider, Grid, HStack, Icon, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiCaretDown, PiCaretUp, PiInfo } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useProjectMatchingPreview } from '@/modules/project/funding/hooks/useProjectMatchingPreview.ts'
import { getProjectMatchingAmountBreakdown } from '@/modules/project/matching/utils/projectMatching.ts'
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
import { recurringFundingModes } from '@/modules/project/recurring/graphql'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { bitcoinQuoteAtom } from '@/shared/state/btcRateAtom.ts'
import { referrerHeroIdAtom } from '@/shared/state/referralAtom.ts'
import { ProjectMatchingCurrency } from '@/types'
import { centsToDollars, commaFormatted, toInt, useMobileMode } from '../../../../../utils'
import { LaunchpadSummary, NonProfitSummary, TAndCs } from '../views/fundingInit/sections/FundingInitSideContent.tsx'
import { PaymentIntervalLabelMap } from '../views/fundingInit/sections/FundingSubscription'

type ProjectFundingSummaryProps = {
  disableCollapse?: boolean
  referenceCode?: string | null
  matchedAmountOverride?: { sats: number; usdCents: number } | null
}

type SummaryRowProps = {
  label: React.ReactNode
  children: React.ReactNode
}

const SummaryRow = ({ label, children }: SummaryRowProps) => {
  return (
    <Grid w="full" templateColumns="minmax(0, 1fr) max-content" columnGap={3} alignItems="start">
      <Body size={{ base: 'sm', lg: 'md' }} light textAlign="left" whiteSpace="nowrap">
        {label}
      </Body>
      <HStack minW={0} alignItems="start" justifyContent="flex-end" flexWrap="wrap">
        {children}
      </HStack>
    </Grid>
  )
}

export const ProjectFundingSummary = ({
  disableCollapse,
  referenceCode,
  matchedAmountOverride,
}: ProjectFundingSummaryProps) => {
  const { t } = useTranslation()

  const isMobileMode = useMobileMode()
  const bitcoinQuote = useAtomValue(bitcoinQuoteAtom)
  const formatUsdEstimate = (usdCents: number) =>
    `$${centsToDollars(usdCents).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`

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

  const currentGoal =
    inProgressGoals.length > 0
      ? projectGoalId
        ? inProgressGoals.find((goal) => goal.id === projectGoalId)
        : inProgressGoals[0]
      : undefined

  const { formState, hasSelectedRewards, project } = useFundingFormAtom()
  const matchingPreview = useProjectMatchingPreview()

  const { isOpen: isMobileDetailsOpen, onToggle: onMobileDetailsToggle } = useDisclosure()

  const numberOfRewardsSelected =
    hasSelectedRewards && formState.rewardsByIDAndCount
      ? Object.entries(formState.rewardsByIDAndCount).reduce((accumulator, currentValue) => {
          return accumulator + toInt(currentValue[1])
        }, 0)
      : 0

  const items = rewards
    .map((reward) => {
      const count = formState?.rewardsByIDAndCount ? formState.rewardsByIDAndCount[reward.id] : 0
      const rewardName = reward.name
      return {
        count,
        rewardName,
        rewardImage: reward.images[0],
      }
    })
    .map(({ count, rewardName, rewardImage }) => {
      if (!count || count === 0) return null
      return { label: `${rewardName} (x${count})`, image: rewardImage }
    })
    .filter((val) => val)

  const hasDetails = disableCollapse
    ? false
    : formState.donationAmount > 0 || numberOfRewardsSelected > 0 || totalUsdCent >= 10

  const matchingAmountBreakdown = formState.fundingMode
    ? getProjectMatchingAmountBreakdown({
        amount: project.activeMatching?.remainingCapAmount || 0,
        referenceCurrency: project.activeMatching?.referenceCurrency || ProjectMatchingCurrency.Btcsat,
        bitcoinQuote,
      })
    : { sats: 0, usdCents: 0 }

  const matchingRow = matchedAmountOverride
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
    : null

  const matchingAvailableRow =
    project.activeMatching && matchingPreview.hasActiveMatching
      ? {
          label: t('Matching available'),
          sats: matchingAmountBreakdown.sats,
          usdCents: matchingAmountBreakdown.usdCents,
        }
      : null
  const hasMatchingSection = Boolean(matchingAvailableRow || matchingRow)
  const hasContributionSection = Boolean(
    (formState.donationAmount && formState.donationAmount > 0 && formState.fundingMode !== recurringFundingModes.membership) ||
      (formState.subscription && formState.subscription.subscriptionId) ||
      numberOfRewardsSelected > 0 ||
      rewardsCosts.sats > 0 ||
      shippingCosts.sats > 0 ||
      tip.sats > 0 ||
      networkFee.sats > 0 ||
      guardianBadgesCosts.sats > 0 ||
      currentGoal,
  )
  const sectionDividerColor = useColorModeValue('neutralAlpha.4', 'neutralAlpha.6')

  const mobileDisplayStyle = disableCollapse
    ? 'flex'
    : { base: hasDetails && isMobileDetailsOpen ? 'flex' : 'none', lg: 'flex' }

  return (
    <motion.div
      layout
      style={{
        width: '100%',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',

        gap: isMobileMode ? '4px' : '12px',
      }}
      transition={{ type: 'spring', stiffness: 900, damping: 40 }}
    >
      <HStack as={motion.div} layout w="full" justifyContent={'space-between'}>
        <H2 size={{ base: 'xl', lg: '2xl' }} display={{ base: 'none', lg: 'block' }} bold>
          {t('Summary')}
        </H2>
      </HStack>
      <Button
        variant="soft"
        colorScheme="neutral1"
        size="sm"
        onClick={onMobileDetailsToggle}
        rightIcon={isMobileDetailsOpen ? <PiCaretDown /> : <PiCaretUp />}
        display={{ base: hasDetails ? 'auto' : 'none', lg: 'none' }}
        position="absolute"
        top={1}
        right={0}
      >
        {isMobileDetailsOpen ? t('Collapse') : t('Details')}
      </Button>
      <VStack w="full" alignItems="start" spacing={{ base: 2, lg: 3 }} display={mobileDisplayStyle}>
        <VStack w="full" alignItems="start" display={{ base: 'flex', lg: 'none' }} spacing={3} marginBottom={3}>
          <H2 size="xl" bold>
            {t('Summary')}
          </H2>

          <NonProfitSummary disableDesktop={true} />
          <LaunchpadSummary disableDesktop={true} />
          <TAndCs disableDesktop={true} />
        </VStack>

        {referrerHeroId && (
          <SummaryRow label={t('Referred by')}>
            <Body size={{ base: 'sm', lg: 'md' }}>{referrerHeroId}</Body>
          </SummaryRow>
        )}

        {referrerHeroId && (hasMatchingSection || hasContributionSection) && <Divider borderColor={sectionDividerColor} />}

        {matchingAvailableRow && (
          <SummaryRow label={matchingAvailableRow.label}>
            <Body size={{ base: 'sm', lg: 'md' }} wordBreak="break-all">
              {`${commaFormatted(matchingAvailableRow.sats)} `}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
            <Body as="span" size={{ base: 'sm', lg: 'md' }} light wordBreak="break-all">
              {`(${formatUsdEstimate(matchingAvailableRow.usdCents)})`}
            </Body>
          </SummaryRow>
        )}

        {matchingRow && (
          <SummaryRow label={matchingRow.label}>
            <Body size={{ base: 'sm', lg: 'md' }} wordBreak="break-all">
              {`${commaFormatted(matchingRow.sats)} `}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
            <Body as="span" size={{ base: 'sm', lg: 'md' }} light wordBreak="break-all">
              {`(${formatUsdEstimate(matchingRow.usdCents)})`}
            </Body>
          </SummaryRow>
        )}

        {hasMatchingSection && hasContributionSection && <Divider borderColor={sectionDividerColor} />}

        {formState.donationAmount &&
          formState.donationAmount > 0 &&
          formState.fundingMode !== recurringFundingModes.membership && (
            <VStack w="full" alignItems="start" spacing={{ base: 2, lg: 3 }}>
              <SummaryRow
                label={t(formState.fundingMode === recurringFundingModes.recurringDonation ? 'Recurring donation' : 'Donation')}
              >
                <Body size={{ base: 'sm', lg: 'md' }}>
                  {`${commaFormatted(formState.donationAmount)} `}
                  <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                    sats
                  </Body>
                </Body>
                <Body as="span" size={{ base: 'sm', lg: 'md' }} medium light wordBreak="break-all">
                  {`(${formatUsdEstimate(formState.donationAmountUsdCent)})`}
                </Body>
              </SummaryRow>
            </VStack>
          )}

        {formState.subscription && formState.subscription.subscriptionId && (
          <SummaryRow label={t('Membership')}>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {formatUsdEstimate(formState.subscription.amountUsdCent)}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                {` / ${commaFormatted(formState.subscription.amountBtcSat)} sats / ${
                  PaymentIntervalLabelMap[formState.subscription.interval]
                }`}
              </Body>
            </Body>
          </SummaryRow>
        )}
        {numberOfRewardsSelected > 0 && (
          <Grid
            w="full"
            templateColumns="minmax(0, 1fr) max-content"
            columnGap={3}
            alignItems="start"
          >
            <Body size={{ base: 'sm', lg: 'md' }} light textAlign="left" whiteSpace="nowrap">
              {t('Products')}
            </Body>
            <VStack w="full" alignItems={'start'} spacing={1}>
            {items.map((item) => {
              return (
                <HStack w="full" key={item?.label} alignItems="center">
                  <ImageWithReload
                    height="20px"
                    width="20px"
                    minWidth="20px"
                    borderRadius="8px"
                    src={item?.image}
                    alt={item?.label}
                  />
                  <Body isTruncated size={{ base: 'sm', lg: 'md' }}>
                    {item?.label}
                  </Body>
                </HStack>
              )
            })}
            </VStack>
          </Grid>
        )}

        {rewardsCosts.sats > 0 && (
          <SummaryRow label={t('Products cost')}>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {commaFormatted(rewardsCosts.sats)}{' '}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
            <Body as="span" size={{ base: 'sm', lg: 'md' }} medium light wordBreak={'break-all'}>
              {`(${formatUsdEstimate(rewardsCosts.usdCents)})`}
            </Body>
          </SummaryRow>
        )}
        {shippingCosts.sats > 0 && (
          <SummaryRow label={t('Shipping cost')}>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {commaFormatted(shippingCosts.sats)}{' '}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
            <Body as="span" size={{ base: 'sm', lg: 'md' }} medium light wordBreak={'break-all'}>
              {`(${formatUsdEstimate(shippingCosts.usdCents)})`}
            </Body>
            {!shippingCountry && (
              <TooltipPopover text={t('Shipping cost is an estimate and may vary depending on the shipping address.')}>
                <HStack as="span" h="full" alignItems={'center'}>
                  <Icon as={PiInfo} />
                </HStack>
              </TooltipPopover>
            )}
          </SummaryRow>
        )}
        {tip.sats > 0 && (
          <SummaryRow
            label={
              formState.fundingMode === recurringFundingModes.recurringDonation ? (
                <HStack spacing={1}>
                  <Body as="span" size={{ base: 'sm', lg: 'md' }} light>
                    {t('Geyser tip')}
                  </Body>
                  <TooltipPopover text={t('Applies to the first payment only.')}>
                    <HStack as="span" h="full" alignItems={'center'}>
                      <Icon as={PiInfo} />
                    </HStack>
                  </TooltipPopover>
                </HStack>
              ) : (
                t('Geyser tip')
              )
            }
          >
            <Body size={{ base: 'sm', lg: 'md' }}>
              {`${commaFormatted(tip.sats)} `}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
            <Body as="span" size={{ base: 'sm', lg: 'md' }} medium light wordBreak={'break-all'}>
              {`(${formatUsdEstimate(tip.usdCents)})`}
            </Body>
          </SummaryRow>
        )}

        {networkFee.sats > 0 && (
          <SummaryRow label={t('Network fees')}>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {`${commaFormatted(networkFee.sats)} `}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
            <Body as="span" size={{ base: 'sm', lg: 'md' }} medium light wordBreak={'break-all'}>
              {`(${formatUsdEstimate(networkFee.usdCents)})`}
            </Body>
            <TooltipPopover
              text={t('Network fees include mining and swapping fees on the Bitcoin and Rootstock network.')}
            >
              <HStack as="span" h="full" alignItems={'center'}>
                <Icon as={PiInfo} />
              </HStack>
            </TooltipPopover>
          </SummaryRow>
        )}
        {guardianBadgesCosts.sats > 0 && (
          <SummaryRow label={t('Guardian badges')}>
            <Body size={{ base: 'sm', lg: 'md' }}>{`${commaFormatted(guardianBadgesCosts.sats)} `}</Body>
          </SummaryRow>
        )}

        {currentGoal && (
          <SummaryRow label={t('To a goal')}>
            <Body size={{ base: 'sm', lg: 'md' }}>{currentGoal?.title}</Body>
          </SummaryRow>
        )}
      </VStack>

      {(hasMatchingSection || hasContributionSection || referrerHeroId) && <Divider borderColor={sectionDividerColor} />}

      <Grid as={motion.div} layout w="full" templateColumns="minmax(0, 1fr) max-content" columnGap={3} alignItems="start">
        <Body size={{ base: 'md', lg: 'xl' }} light textAlign="left" whiteSpace="nowrap">
          {`${t('Total')}: `}
        </Body>
        <HStack minW={0} justifyContent="flex-end" flexWrap={'wrap'}>
          <Body size={{ base: 'md', lg: 'xl' }} medium wordBreak={'break-all'}>
            {`${commaFormatted(totalSats)} `}
          </Body>
          <Body as="span" size={{ base: 'md', lg: 'xl' }} light>
            sats
          </Body>
          <Body as="span" size={{ base: 'md', lg: 'xl' }} medium light wordBreak={'break-all'}>
            {`(${formatUsdEstimate(totalUsdCent)})`}
          </Body>
        </HStack>
      </Grid>

      {referenceCode && (
        <SummaryRow label={t('Reference code')}>
          <Body size={{ base: 'sm', lg: 'md' }}>{referenceCode}</Body>
        </SummaryRow>
      )}
    </motion.div>
  )
}
