import { Box, VStack } from '@chakra-ui/react'

import { DonationInput } from '../../../../components/molecules'
import { SectionTitle } from '../../../../components/ui'
import { useProjectContext } from '../../../../context'
import { FundingFormRewards } from './FundingFormRewards'

export const FundingFormSection = () => {
  const {
    fundForm: { setState },
  } = useProjectContext()
  return (
    <VStack
      marginTop="0px !important"
      width="100%"
      spacing="30px"
      flex="1"
      overflowX="visible"
    >
      <Box width="100%">
        <SectionTitle>Donate to this idea</SectionTitle>

        <DonationInput
          inputGroup={{ padding: '2px' }}
          name="donationAmount"
          onChange={setState}
        />
      </Box>

      <FundingFormRewards />
    </VStack>
  )
}
