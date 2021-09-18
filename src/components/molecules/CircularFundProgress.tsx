import React from 'react';
import { CircularProgress } from '@chakra-ui/react';
import {Box} from '@chakra-ui/layout';
import {Stat, StatHelpText, StatLabel, StatNumber} from '@chakra-ui/stat';

interface ICircularFundProgress {
    amount: number;
    goal?: number;
}

export const CircularFundProgress = ({amount, goal}: ICircularFundProgress) => {
	console.log('checking valuies', goal);
	return (
		<CircularProgress
			value={20}
			size="208px"
			thickness="6px"
			color="brand.primary"
			position="relative"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Box position="absolute" fontSize="12px">
				<Stat textAlign="center">
					<StatLabel fontSize="12px" color="brand.textGrey">Funded</StatLabel>
					<StatNumber>{amount.toFixed(2)} 丰</StatNumber>
					<StatHelpText fontSize="12px" color="brand.textGrey">$0.1 of goal ($259)</StatHelpText>
				</Stat>
			</Box>
		</CircularProgress>
	);
};
