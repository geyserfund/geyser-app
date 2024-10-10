import { Button, Divider, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PiCaretDown, PiCaretUp } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body, H2 } from '@/shared/components/typography'

import { useFundCalc } from '../../../../../helpers'
import { toInt, useMobileMode } from '../../../../../utils'
import { Badge } from './Badge'

export const ProjectFundingSummary = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  const isMobileMode = useMobileMode()

  const { rewards } = useRewardsAtom()

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
      }
    })
    .map(({ count, rewardName }) => {
      if (!count || count === 0) return ''
      return `${rewardName} (x${count})`
    })
    .filter(Boolean)
    .join(', ')

  const hasDetails = formState.donationAmount > 0 || numberOfRewardsSelected > 0 || getTotalAmount('dollar', name) >= 10

  const mobileDisplayStyle = { base: hasDetails && isMobileDetailsOpen ? 'flex' : 'none', lg: 'flex' }

  return (
    <motion.div
      layout
      style={{
        width: '100%',
        overflow: 'hidden',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobileMode ? '4px' : '12px',
      }}
      transition={{ type: 'spring', stiffness: 900, damping: 40 }}
    >
      <HStack as={motion.div} layout w="full" justifyContent={'space-between'}>
        <H2 size={{ base: 'xl', lg: '3xl' }} medium>
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
        {formState.comment && (
          <>
            <VStack w="full" alignItems={'start'}>
              <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Comment')}: `}</Body>
              <Body size={{ base: 'sm', lg: 'md' }}>{formState.comment}</Body>
            </VStack>
            <Divider />
          </>
        )}

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
          <HStack alignItems={'start'}>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Rewards')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {getRewardsAmount('sats')}{' '}
              <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
                sats
              </Body>
            </Body>
          </HStack>
        )}

        {numberOfRewardsSelected > 0 && (
          <HStack alignItems={'start'}>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Items')}: `}</Body>
            <Body size={{ base: 'sm', lg: 'md' }}>{items}</Body>
          </HStack>
        )}

        {getTotalAmount('dollar', name) >= 10 && (
          <HStack display={mobileDisplayStyle}>
            <Body size={{ base: 'sm', lg: 'md' }} light>{`${t('Badge')}: `}</Body>
            <Badge
              donationAmountInDollars={getTotalAmount('dollar', name)}
              height={{ base: '16px', lg: '20px' }}
              width={{ base: '16px', lg: '20px' }}
            />
          </HStack>
        )}
      </VStack>

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
