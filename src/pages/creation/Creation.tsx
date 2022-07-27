import React from 'react';
import { VStack } from '@chakra-ui/react';

import { Editor } from './Editor';
import { isMobileMode } from '../../utils';
import { Footer } from '../../components/molecules';

export const Creation = () => {
	const isMobile = isMobileMode();

	return (

		<VStack
			background={'brand.bgGrey4'}
			position="relative"
			paddingTop={isMobile ? '61px' : '71px'}
			height="100%"
			justifyContent="space-between"
		>
			<VStack
				spacing="40px"
				width="100%"
				maxWidth="1370px"
				padding={isMobile ? '0px 10px' : '0px 40px'}
				marginBottom="40px"
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
			>
				<Editor />
			</VStack>
			<Footer />
		</VStack >

	);
};
