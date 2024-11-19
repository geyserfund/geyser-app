/* eslint-disable complexity */
import { Button, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiCaretDown, PiCaretUp } from 'react-icons/pi'

import { ImageWithReload } from '@/components/ui'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { selectedGoalIdAtom } from '@/modules/project/funding/state'
import { useGoalsAtom, useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body, H2 } from '@/shared/components/typography'

import { useFundCalc } from '../../../../../helpers'
import { toInt, useMobileMode } from '../../../../../utils'

export const ProjectFundingSummary = ({ disableCollapse }: { disableCollapse?: boolean }) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

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

  const { getTotalAmount, getRewardsAmount } = useFundCalc(formState)

  const { isOpen: isMobileDetailsOpen, onToggle: onMobileDetailsToggle } = useDisclosure()

  const name = project ? project.name : ''
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
    : formState.donationAmount > 0 || numberOfRewardsSelected > 0 || getTotalAmount('dollar', name) >= 10

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
              {getRewardsAmount('sats').toLocaleString()}{' '}
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
            {`${getTotalAmount('sats', name).toLocaleString()} `}
          </Body>
          <Body as="span" size={{ base: 'md', lg: 'xl' }} light>
            sats
          </Body>
          <Body as="span" size={{ base: 'md', lg: 'xl' }} medium light wordBreak={'break-all'}>
            {`($${getTotalAmount('dollar', name)})`}
          </Body>
        </HStack>
      </HStack>
    </motion.div>
  )
}
