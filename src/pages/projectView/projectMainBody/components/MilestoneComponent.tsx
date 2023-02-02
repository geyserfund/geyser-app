import { Checkbox, HStack, Text } from '@chakra-ui/react'

import { SatoshiAmount } from '../../../../components/ui'

type Props = {
  name: string
  description: string
  amountRemaining: number
  isReached?: boolean
}

export const MilestoneComponent = ({
  name,
  description,
  amountRemaining,
  isReached,
}: Props) => (
  <HStack>
    <Checkbox isChecked={isReached} colorScheme="gray">
      <Text color="brand.neutral800">{`${name}: ${description} - `}</Text>
    </Checkbox>

    {isReached ? (
      <Text>Reached!</Text>
    ) : (
      <>
        <SatoshiAmount>{amountRemaining}</SatoshiAmount>
        <Text color="brand.neutral800"> to go.</Text>
      </>
    )}
  </HStack>
)
