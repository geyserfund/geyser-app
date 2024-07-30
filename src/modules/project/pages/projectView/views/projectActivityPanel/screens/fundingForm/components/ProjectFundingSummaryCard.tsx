import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { FormEventHandler, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { BoltIcon } from '../../../../../../../../../components/icons'
import { useFundCalc } from '../../../../../../../../../helpers'
import { standardPadding } from '../../../../../../../../../styles'
import { toInt } from '../../../../../../../../../utils'
import { useFundingContext } from '../../../../../../../context'
import { Badge } from './Badge'

type Props = {
  onSubmit: () => void
}

export const ProjectFundingSummaryCard = forwardRef<HTMLDivElement, Props>(({ onSubmit }, ref) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { fundForm } = useFundingContext()

  const { state: formState, hasSelectedRewards } = fundForm

  const { getTotalAmount } = useFundCalc(formState)

  const name = project ? project.name : ''
  const numberOfRewardsSelected =
    hasSelectedRewards && formState.rewardsByIDAndCount
      ? Object.entries(formState.rewardsByIDAndCount).reduce((accumulator, currentValue) => {
          return accumulator + toInt(currentValue[1])
        }, 0)
      : 0

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onSubmit()
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      <VStack ref={ref} width={'100%'} borderRadius={'md'} p={standardPadding} spacing={2}>
        <VStack color={'neutral.700'} fontWeight={'medium'} width={'full'} alignItems="flex-start" spacing={0}>
          {formState.donationAmount && formState.donationAmount > 0 && (
            <HStack>
              <Text fontSize="16px" textColor={'neutral.700'} fontWeight={'normal'}>
                {`${t('Donation')}: `}
              </Text>
              <Text fontSize="18px" textColor={'neutral.700'} fontWeight={'bold'}>
                {`${formState.donationAmount.toLocaleString()} sats`}
              </Text>
            </HStack>
          )}
          {numberOfRewardsSelected > 0 && (
            <HStack>
              <Text fontSize="16px" textColor={'neutral.700'} fontWeight={'normal'}>
                {`${t('Items Selected')}: `}
              </Text>
              <Text fontSize="18px" textColor={'neutral.700'} fontWeight={'bold'}>
                {`${numberOfRewardsSelected.toString()}`}
              </Text>
            </HStack>
          )}

          <HStack>
            <Text fontSize="16px" textColor={'neutral.700'} fontWeight={'normal'}>
              {`${t('Total')}: `}
            </Text>
            <Text fontSize="16px" textColor={'neutral.700'} fontWeight={'bold'}>
              {`$${getTotalAmount('dollar', name)}`}
            </Text>
            <Text fontSize="16px" textColor={'neutral.700'} fontWeight={'normal'}>
              {`(${getTotalAmount('sats', name).toLocaleString()} sats)`}
            </Text>
          </HStack>

          {getTotalAmount('dollar', name) >= 10 && (
            <HStack>
              <Text fontSize="16px" textColor={'neutral.700'} fontWeight={'normal'}>
                {`${t('You will Receive')}: `}
              </Text>
              <HStack>
                <Badge donationAmountInDollars={getTotalAmount('dollar', name)} />
                <Text fontSize="16px" textColor={'neutral.700'} fontWeight={'normal'}>
                  {t('Badge')}
                </Text>
              </HStack>
            </HStack>
          )}
        </VStack>

        <Button w="full" variant="primary" type="submit" leftIcon={<BoltIcon />}>
          {t('Checkout')}
        </Button>
      </VStack>
    </form>
  )
})
