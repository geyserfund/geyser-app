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
      {/* <Box
					backgroundColor="brand.bgGreen"
					height="85px"
					borderRadius="12px"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						width="80%"
						position="relative"
					>
						<NumberInput
							name="amount"
							variant="unstyled"
							marginLeft="10px"
							onChange={handleInput}
							onFocus={() => setError('')}
						>
							<NumberInputField placeholder={'0'} fontSize="30px" textAlign="center" />
						</NumberInput>
						<Box position="absolute" right={-5}>
							<SatoshiIcon isDark={isDarkMode()} fontSize="30px" marginRight="10px" marginBottom="5px" />
						</Box>
					</Box>
					<Text color="brand.textGrey" fontSize="12px">{`$${(btcRate * state.donationAmount).toFixed(2)}`}</Text>
				</Box> */}
    </Box>
  </VStack>
);
