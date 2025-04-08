/* eslint-disable complexity */
import { Button, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiCaretDown, PiCaretUp } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { selectedGoalIdAtom } from '@/modules/project/funding/state'
import { useGoalsAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body, H2 } from '@/shared/components/typography'
import { SubscriptionCurrencyType } from '@/types/generated/graphql'

import { centsToDollars, commaFormatted, toInt, useMobileMode } from '../../../../../utils'
import { PaymentIntervalLabelMap } from '../views/fundingInit/sections/FundingSubscription'

export const ProjectFundingSummary = ({ disableCollapse }: { disableCollapse?: boolean }) => {
  const { t } = useTranslation()

  const isMobileMode = useMobileMode()

  const { rewards } = useRewardsAtom()
  const { inProgressGoals } = useGoalsAtom()
  const projectGoalId = useAtomValue(selectedGoalIdAtom)

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
    : formState.donationAmount > 0 || numberOfRewardsSelected > 0 || formState.totalAmountUsdCent >= 10

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
        gap: isMobileMode ? '4px' : '12px',
      }}
      transition={{ type: 'spring', stiffness: 900, damping: 40 }}
    >
      <HStack as={motion.div} layout w="full" justifyContent={'space-between'}>
        <H2 size={{ base: 'xl', lg: '2xl' }} bold>
          {t('Summary')}
        </H2>
        <Button
          variant="soft"
          colorScheme="neutral1"
          size="sm"
          onClick={onMobileDetailsToggle}
          rightIcon={isMobileDetailsOpen ? <PiCaretDown /> : <PiCaretUp />}
          display={{ base: hasDetails ? 'auto' : 'none', lg: 'none' }}
        >
          {isMobileDetailsOpen ? t('Collapse') : t('Details')}
        </Button>
      </HStack>
      <VStack w="full" alignItems="start" spacing={{ base: 0, lg: 3 }} display={mobileDisplayStyle}>
        {formState.donationAmount && formState.donationAmount > 0 && (
          <HStack>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Donation')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {`${formState.donationAmount.toLocaleString()} `}
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
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Rewards')}: `}</Body>
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

        {numberOfRewardsSelected > 0 && (
          <HStack alignItems={'start'}>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Rewards')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {commaFormatted(formState.rewardsCostInSatoshi)}{' '}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
          </HStack>
        )}
      </VStack>

      {currentGoal && (
        <HStack>
          <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('To a goal')}: `}</Body>
          <Body size={{ base: 'sm', lg: 'md' }}>{currentGoal?.title}</Body>
        </HStack>
      )}

      <HStack as={motion.div} layout alignItems="start">
        <Body size={{ base: 'md', lg: 'xl' }} light>
          {`${t('Total')}: `}
        </Body>
        <HStack flex={1} flexWrap={'wrap'}>
          <Body size={{ base: 'md', lg: 'xl' }} medium wordBreak={'break-all'}>
            {`${commaFormatted(formState.totalAmount)} `}
          </Body>
          <Body as="span" size={{ base: 'md', lg: 'xl' }} light>
            sats
          </Body>
          <Body as="span" size={{ base: 'md', lg: 'xl' }} medium light wordBreak={'break-all'}>
            {`($${commaFormatted(centsToDollars(formState.totalAmountUsdCent))})`}
          </Body>
        </HStack>
      </HStack>
    </motion.div>
  )
}
