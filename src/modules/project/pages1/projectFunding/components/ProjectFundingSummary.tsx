import { Button, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PiCaretDown, PiCaretUp } from 'react-icons/pi'

import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body, H2 } from '@/shared/components/typography'

import { useFundCalc } from '../../../../../helpers'
import { toInt } from '../../../../../utils'
import { useFundingContext } from '../../../context'
import { Badge } from './Badge'

export const ProjectFundingSummary = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { fundForm } = useFundingContext()

  const { rewards } = useRewardsAtom()

  const { state: formState, hasSelectedRewards } = fundForm

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

  const hasDetails = formState.donationAmount > 0 || numberOfRewardsSelected > 0

  const mobileDisplayStyle = { base: hasDetails && isMobileDetailsOpen ? 'flex' : 'none', lg: 'flex' }

  return (
    <VStack
      as={motion.div}
      layout
      color={'neutral.700'}
      fontWeight={'medium'}
      width={'full'}
      alignItems="flex-start"
      spacing={{ base: 1, lg: 3 }}
    >
      <HStack as={motion.div} layout w="full" justifyContent={'space-between'}>
        <H2 size={{ base: 'lg', lg: '2xl' }} medium>
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
      </VStack>

      <HStack as={motion.div} layout>
        <Body size={{ base: 'md', lg: 'xl' }} light>
          {`${t('Total')}: `}
        </Body>
        <Body size={{ base: 'md', lg: 'xl' }} medium>
          {`${getTotalAmount('sats', name).toLocaleString()} `}
          <Body as="span" light>
            sats
          </Body>
        </Body>
        <Body size={{ base: 'md', lg: 'xl' }} medium light>
          {`($${getTotalAmount('dollar', name)})`}
        </Body>
      </HStack>

      {getTotalAmount('dollar', name) >= 10 && (
        <HStack display={mobileDisplayStyle}>
          <Body size={{ base: 'sm', lg: 'md' }}>{`${t('You will Receive')}: `}</Body>
          <HStack>
            <Badge
              donationAmountInDollars={getTotalAmount('dollar', name)}
              height={{ base: '16px', lg: '20px' }}
              width={{ base: '16px', lg: '20px' }}
            />
            <Body size={{ base: 'sm', lg: 'md' }}>{t('Badge')}</Body>
          </HStack>
        </HStack>
      )}
    </VStack>
  )
}
