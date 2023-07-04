import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { FormEventHandler, forwardRef } from 'react'

import { BoltIcon } from '../../../../components/icons'
import { SatoshiAmount, SectionTitle } from '../../../../components/ui'
import { useProjectContext } from '../../../../context'
import { useFundCalc } from '../../../../helpers'

type Props = {
  onSubmit: () => void
}

export const ProjectFundingSummaryCard = forwardRef<HTMLDivElement, Props>(
  ({ onSubmit }, ref) => {
    const { fundForm, project } = useProjectContext()

    const { state: formState, hasSelectedRewards } = fundForm

    const { getTotalAmount } = useFundCalc(formState)

    const name = project ? project.name : ''
    const rewards = project ? project.rewards : []
    const hasRewards = rewards.length > 0

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()
      e.stopPropagation()
      onSubmit()
    }

    return (
      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <VStack
          ref={ref}
          padding={2}
          width={'100%'}
          borderRadius={'md'}
          backgroundColor={'neutral.100'}
          spacing={2}
        >
          <VStack
            padding={2}
            color={'neutral.700'}
            fontWeight={'medium'}
            width={'full'}
            alignItems="flex-start"
            spacing={2}
          >
            {hasRewards && hasSelectedRewards ? (
              <HStack
                justifyContent={'space-between'}
                width={'full'}
                alignItems="flex-start"
                color="neutral.700"
              >
                <Text
                  flex={0}
                  fontSize="14px"
                  textColor={'neutral.700'}
                  fontWeight={'normal'}
                >
                  Rewards
                </Text>
                <VStack flex={1} flexWrap={'wrap'} alignItems="flex-end">
                  {formState.rewardsByIDAndCount &&
                    Object.entries(formState.rewardsByIDAndCount).map(
                      ([key, value]) => {
                        const reward = rewards.find(({ id }) => id === key)
                        if (reward) {
                          return (
                            <Text key={key}>
                              {value}x {reward.name}
                            </Text>
                          )
                        }
                      },
                    )}
                </VStack>
              </HStack>
            ) : null}

            <HStack
              justifyContent={'space-between'}
              width={'full'}
              fontSize={'10px'}
            >
              <SectionTitle>Total</SectionTitle>

              <HStack>
                <SatoshiAmount
                  color="neutral.700"
                  fontWeight="bold"
                  marginLeft="auto"
                  fontSize="21px"
                >
                  {getTotalAmount('sats', name)}
                </SatoshiAmount>

                <Text
                  variant="satoshi"
                  color="neutral.700"
                  fontWeight="bold"
                  marginLeft="auto"
                  fontSize="21px"
                >
                  {`($${getTotalAmount('dollar', name)})`}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <Button
            w="full"
            variant="primary"
            type="submit"
            leftIcon={<BoltIcon />}
          >
            Continue
          </Button>
        </VStack>
      </form>
    )
  },
)
