import React from 'react';
import { CircularProgress } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import { isDarkMode } from '../../utils';

interface ICircularFundProgress {
	amount: number;
	goal: number;
	rate: number
}

export const CircularFundProgress = ({ goal, rate, amount }: ICircularFundProgress) => {
	console.log('rate', rate);
	const isDark = isDarkMode();
	const goalUSD = (goal * rate).toFixed(2);
	const amountUSD = (amount * rate).toFixed(2);
	const percentage = (parseFloat(amountUSD) / parseFloat(goalUSD)) * 100;
	return (
		<CircularProgress
			value={percentage}
			size="208px"
			thickness="6px"
			color="brand.primary"
			position="relative"
			display="flex"
			justifyContent="center"
			alignItems="center"
			filter="drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15))"
		>
			<Box position="absolute" fontSize="12px">
				<Stat textAlign="center">
					<StatLabel fontSize="12px" color={isDark ? 'brand.textWhite' : 'brand.textGrey'}>Funded</StatLabel>
					<StatNumber>{amount} 丰</StatNumber>
					<StatHelpText fontSize="12px" color={isDark ? 'brand.textWhite' : 'brand.textGrey'}>{`$${amountUSD} of goal ($${goalUSD})`}</StatHelpText>
				</Stat>
			</Box>
		</CircularProgress>
	);
};
