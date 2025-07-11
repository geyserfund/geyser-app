/* eslint-disable complexity */
import { Button, HStack, Icon, useDisclosure, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiCaretDown, PiCaretUp, PiInfo } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { selectedGoalIdAtom } from '@/modules/project/funding/state'
import {
  rewardsCostAtoms,
  shippingCostAtom,
  tipAtoms,
  totalAmountSatsAtom,
  totalAmountUsdCentAtom,
} from '@/modules/project/funding/state/fundingFormAtom.ts'
import { shippingCountryAtom } from '@/modules/project/funding/state/shippingAddressAtom.ts'
import { useGoalsAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { SubscriptionCurrencyType } from '@/types/generated/graphql'

import { centsToDollars, commaFormatted, toInt, useMobileMode } from '../../../../../utils'
import { LaunchpadSummary, NonProfitSummary, TAndCs } from '../views/fundingInit/sections/FundingInitSideContent.tsx'
import { PaymentIntervalLabelMap } from '../views/fundingInit/sections/FundingSubscription'

type ProjectFundingSummaryProps = {
  disableCollapse?: boolean
  referenceCode?: string | null
}

export const ProjectFundingSummary = ({ disableCollapse, referenceCode }: ProjectFundingSummaryProps) => {
  const { t } = useTranslation()

  const isMobileMode = useMobileMode()

  const { rewards } = useRewardsAtom()
  const { inProgressGoals } = useGoalsAtom()
  const projectGoalId = useAtomValue(selectedGoalIdAtom)

  const rewardsCosts = useAtomValue(rewardsCostAtoms)
  const shippingCosts = useAtomValue(shippingCostAtom)
  const shippingCountry = useAtomValue(shippingCountryAtom)
  const tip = useAtomValue(tipAtoms)
  const totalSats = useAtomValue(totalAmountSatsAtom)
  const totalUsdCent = useAtomValue(totalAmountUsdCentAtom)

  const currentGoal =
    inProgressGoals.length > 0
      ? projectGoalId
        ? inProgressGoals.find((goal) => goal.id === projectGoalId)
        : inProgressGoals[0]
      : undefined

  const { formState, hasSelectedRewards } = useFundingFormAtom()

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
      <VStack w="full" alignItems="start" spacing={{ base: 0, lg: 3 }} display={mobileDisplayStyle}>
        <VStack w="full" alignItems="start" display={{ base: 'flex', lg: 'none' }} spacing={3} marginBottom={3}>
          <H2 size="xl" bold>
            {t('Summary')}
          </H2>

          <NonProfitSummary disableDesktop={true} />
          <LaunchpadSummary disableDesktop={true} />
          <TAndCs disableDesktop={true} />
        </VStack>

        {referenceCode && (
          <HStack>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Reference code')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>{referenceCode}</Body>
          </HStack>
        )}

        {formState.donationAmount && formState.donationAmount > 0 && (
          <HStack>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Donation')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {`${commaFormatted(formState.donationAmount)} `}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
          </HStack>
        )}

        {formState.subscription && formState.subscription.cost > 0 && (
          <HStack>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Subscription')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {`${centsToDollars(formState.subscription.cost)}`}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                {`${formState.subscription.currency === SubscriptionCurrencyType.Usdcent ? '$' : ' sats'} / ${
                  PaymentIntervalLabelMap[formState.subscription.interval]
                }`}
              </Body>
            </Body>
          </HStack>
        )}
        {numberOfRewardsSelected > 0 && (
          <VStack w="full" alignItems={'start'} spacing={1}>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Products')}: `}</Body>
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
        )}

        {rewardsCosts.sats > 0 && (
          <HStack alignItems={'start'}>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Products cost')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {commaFormatted(rewardsCosts.sats)}{' '}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
            <Body as="span" size={{ base: 'sm', lg: 'md' }} medium light wordBreak={'break-all'}>
              {`($${centsToDollars(rewardsCosts.usdCents)})`}
            </Body>
          </HStack>
        )}
        {shippingCosts.sats > 0 && (
          <HStack alignItems={'start'}>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Shipping cost')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {commaFormatted(shippingCosts.sats)}{' '}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
            <Body as="span" size={{ base: 'sm', lg: 'md' }} medium light wordBreak={'break-all'}>
              {`($${centsToDollars(shippingCosts.usdCents)})`}
            </Body>
            {!shippingCountry && (
              <TooltipPopover text={t('Shipping cost is an estimate and may vary depending on the shipping address.')}>
                <HStack as="span" h="full" alignItems={'center'}>
                  <Icon as={PiInfo} />
                </HStack>
              </TooltipPopover>
            )}
          </HStack>
        )}
        {tip.sats > 0 && (
          <HStack>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Geyser tip')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {`${commaFormatted(tip.sats)} `}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
            <Body as="span" size={{ base: 'sm', lg: 'md' }} medium light wordBreak={'break-all'}>
              {`($${centsToDollars(tip.usdCents)})`}
            </Body>
          </HStack>
        )}

        {currentGoal && (
          <HStack>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('To a goal')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>{currentGoal?.title}</Body>
          </HStack>
        )}
      </VStack>

      <HStack as={motion.div} layout alignItems="start">
        <Body size={{ base: 'md', lg: 'xl' }} light>
          {`${t('Total')}: `}
        </Body>
        <HStack flex={1} flexWrap={'wrap'}>
          <Body size={{ base: 'md', lg: 'xl' }} medium wordBreak={'break-all'}>
            {`${commaFormatted(totalSats)} `}
          </Body>
          <Body as="span" size={{ base: 'md', lg: 'xl' }} light>
            sats
          </Body>
          <Body as="span" size={{ base: 'md', lg: 'xl' }} medium light wordBreak={'break-all'}>
            {`($${commaFormatted(centsToDollars(totalUsdCent))})`}
          </Body>
        </HStack>
      </HStack>
    </motion.div>
  )
}
