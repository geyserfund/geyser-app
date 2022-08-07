import React from 'react';
import { HStack, Input, Text, VStack } from '@chakra-ui/react';

import { Editor } from './Editor';
import { isMobileMode } from '../../utils';
import { CreateNav } from './CreateNav';
import { BsImage } from 'react-icons/bs';

export const Creation = () => {
	const isMobile = isMobileMode();

	return (
		<>
			<CreateNav />
			<VStack
				background={'brand.bgGrey4'}
				position="relative"
				paddingTop={isMobile ? '61px' : '71px'}
				height="100%"
				justifyContent="space-between"
			>
				<VStack
					spacing="20px"
					width="100%"
					height="100%"
					maxWidth="1080px"
					padding={isMobile ? '0px 10px' : '0px 40px'}
					marginBottom="80px"
					display="flex"
					flexDirection="column"
					alignItems="flex-start"
				>
					<HStack marginTop="20px" width="100%" height="65px" borderRaidus="4px" backgroundColor="brand.bgGrey" justifyContent="center">
						<BsImage />
						<Text> Select a header image</Text>
					</HStack>
					<Input
						border="none"
						_focus={{ border: 'none' }}
						placeholder="Title"
						color="brand.gray500"
						fontSize="40px"
						fontWeight={700}
						marginTop="20px"
					/>
					<Input
						border="none"
						_focus={{ border: 'none' }}
						placeholder="Summary of your project idea"
						color="brand.gray500"
						fontSize="26px"
						fontWeight={600}
					/>
					<Editor />
				</VStack>
			</VStack >

		</>

	);
};
