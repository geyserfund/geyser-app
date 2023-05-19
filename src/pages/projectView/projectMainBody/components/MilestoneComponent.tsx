import { Checkbox, HStack, Wrap } from '@chakra-ui/react'

import { Body1, H3 } from '../../../../components/typography'
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
  <Wrap>
    <HStack>
      <Checkbox isChecked={isReached} colorScheme="gray" />
      <H3 color={isReached ? 'neutral.700' : 'neutral.400'}>{`${name}${
        description ? ': ' + description : ''
      }`}</H3>
    </HStack>

    {!isReached && (
      <HStack spacing="5px">
        <Body1 color="primary.800"> - </Body1>
        <SatoshiAmount color="primary.800" fontWeight={500}>
          {amountRemaining}
        </SatoshiAmount>
        <Body1 semiBold color="neutral.800">
          {' '}
          needed!
        </Body1>
      </HStack>
    )}
  </Wrap>
)
