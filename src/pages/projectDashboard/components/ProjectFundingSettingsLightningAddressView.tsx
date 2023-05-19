import { Container, Text, VStack } from '@chakra-ui/react'

import { colors } from '../../../styles'

type Props = {
  lightningAddress: string
}

// TODO: This view should eventually support updates.

export const ProjectFundingSettingsLightningAddressView = ({
  lightningAddress,
}: Props) => {
  return (
    <Container maxW="md">
      <VStack alignItems={'flex-start'} spacing={2.5}>
        <Text color="neutral.700">Where are all your funds going to?</Text>

        <VStack
          spacing="7px"
          alignItems={'flex-start'}
          width={'full'}
          border="1px solid"
          borderColor={colors.neutral300}
          borderRadius="4px"
          padding="16px"
        >
          <Text fontSize="10px" fontWeight={400}>
            Lightning Address
          </Text>

          <Text fontSize="14px">{lightningAddress}</Text>
        </VStack>

        <Text fontSize="10px" color="neutral.700" fontWeight={400}>
          If you want to change how you receive your funds reach out to
          hello@geyser.fund. We are not currently enabling editing of this
          information for security reasons.
        </Text>
      </VStack>
    </Container>
  )
}
