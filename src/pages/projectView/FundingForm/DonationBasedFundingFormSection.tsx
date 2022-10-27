import { Box, VStack } from '@chakra-ui/react';
import { AnyAaaaRecord } from 'dns';
import React from 'react';
import { DonationInput } from '../../../components/molecules';
import { SectionTitle } from '../../../components/ui';

interface IDonationBasedProps {
  setState: AnyAaaaRecord;
}

export const DonationBasedFundingFormSection = ({
  setState,
}: IDonationBasedProps) => (
  <VStack width="100%">
    <Box width="100%">
      <SectionTitle> Send amount</SectionTitle>
      <DonationInput
        inputGroup={{ padding: '2px', marginBottom: '10px' }}
        name="donationAmount"
        onChange={setState}
      />
    </Box>
  </VStack>
);
