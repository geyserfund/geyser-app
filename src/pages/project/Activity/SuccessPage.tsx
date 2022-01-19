import React, { useState } from 'react';
import { Text, VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { SatoshiIcon } from '../../../components/icons';
import { Box, CloseButton } from '@chakra-ui/react';
import { BiCopyAlt } from 'react-icons/bi';

interface ISuccessPage {
	amount: number
	handleCloseButton: () => void
}

export const SuccessPage = ({ amount, handleCloseButton }: ISuccessPage) => {
	const [copy, setCopy] = useState(false);

	const isMobile = isMobileMode();
	const shareProjectWithfriends = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopy(true);
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
			<CloseButton
				borderRadius="50%"
				position="absolute"
				right="10px"
				top="10px"
				onClick={handleCloseButton}
			/>
			<Box display="flex" alignItems="center">
				<Text marginRight="5px" fontSize="30px" width="70%" textAlign="center">{amount} </Text><SatoshiIcon />
			</Box>
			<Text fontSize="30px" width="70%" textAlign="center">
				Successfully Funded!
			</Text>
			<ButtonComponent
				standard
				leftIcon={copy ? <BiCopyAlt /> : <HiOutlineSpeakerphone />}
				width="100%"
				onClick={shareProjectWithfriends}
			>
				{copy ? 'Project Link Copied' : 'Share project with friends'}
			</ButtonComponent>
		</VStack>
	);
};
