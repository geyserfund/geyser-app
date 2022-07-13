import { Link, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import { isMobileMode } from '../../utils';

export const NotFound = () => {
	const isMobile = isMobileMode();
	return (
		<VStack
			width="100%"
			height="100%"
			backgroundColor="brand.bgGrey"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			spacing="10px"
			paddingTop={isMobile ? '61px' : '71px'}

		>
			<BiErrorAlt fontSize="80px"/>
			<Text fontSize="20px">
            Oops!
			</Text>
			<Text fontSize="20px">
			This page was not found, please try again.
			</Text>
			<Text fontSize="20px">
			If the problem persists let us know via. <Link href="https://t.me/+EZ5otIPhVcxhMmFk" target="_blank">telegram</Link> or this <Link>feedback form.</Link>
			</Text>
		</VStack>
	);
};
