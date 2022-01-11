import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface IFundingStatusProp {
    open?: boolean
}

export const FundingStatus = ({ open }: IFundingStatusProp) => {
	console.log();
	return (
		<Box display="flex" alignItems="center">
			<Box
				borderRadius="50%"
				backgroundColor={open ? 'brand.lightGreen' : 'red'}
				height="10px"
				width="10px"
				marginRight="15px"
			/>
			<Text>{open ? 'CROWDFUNDING OPEN' : 'CROWDFUNDING CLOSED'}</Text>
		</Box>
	);
};

