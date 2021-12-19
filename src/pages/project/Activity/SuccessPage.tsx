import React from 'react';
import { Text, VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { HiOutlineSpeakerphone } from 'react-icons/hi';

export const SuccessPage = () => {
	const isMobile = isMobileMode();
	const shareProjectWithfriends = () => {

	};

	return (
		<VStack
			padding={isMobile ? '10px 10px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			position="relative"
			backgroundColor="brand.primary"
			alignItems="center"
			justifyContent="center"
		>
			<Text fontSize="30px" width="70%" textAlign="center">
            21000
            Successfully Funded!
			</Text>
			<ButtonComponent
				standard
				leftIcon={<HiOutlineSpeakerphone />}
				width="100%"
				onClick={shareProjectWithfriends}
			>
            Share project with friends
			</ButtonComponent>
		</VStack>
	);
};
