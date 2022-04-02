import { Box, NumberInput, NumberInputField, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { SatoshiIcon } from '../../../components/icons';
import {IFundForm} from '../../../hooks';
import { isDarkMode } from '../../../utils';

interface IDonationBasedProps {
	btcRate: number
	state: IFundForm
	setTarget: (_: any) => void
    setError: (_:any) => void
}

export const DonationBased = ({
	btcRate,
	state,
	setTarget,
	setError,
}: IDonationBasedProps) => {
	const handleInput = (stringv: string, numberv: number) => {
		setTarget({target: {name: 'donationAmount', value: numberv || 0}});
	};

	return (
		<VStack width="100%" >
			<Box width="100%" >
				<Text lineHeight="26px">Send amount</Text>
				<Box
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
							value={state.donationAmount}
							onFocus={() => setError('')}
						>
							<NumberInputField placeholder={'2000'} fontSize="30px" textAlign="center" />
						</NumberInput>
						<Box position="absolute" right={-5}>
							<SatoshiIcon isDark={isDarkMode()} fontSize="30px" marginRight="10px" marginBottom="5px" />
						</Box>
					</Box>
					<Text color="brand.textGrey" fontSize="12px">{`$ ${btcRate * state.amount}`}</Text>
				</Box>

			</Box>
		</VStack>);
};
