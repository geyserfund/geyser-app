import React, { useEffect, useState } from 'react';
import { Text, VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { BiCopyAlt } from 'react-icons/bi';
import Check from '../../../assets/check.svg';
import { Image, Box } from '@chakra-ui/react';

interface IPaymentSuccess {
	amount: number
	grant: string
}

export const PaymentSuccess = ({ amount, grant }: IPaymentSuccess) => {
	const [copy, setCopy] = useState(false);
	const isMobile = isMobileMode();
	const shareProjectWithfriends = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopy(true);
	};

	useEffect(() => {
		if (copy) {
			setTimeout(() => {
				setCopy(false);
			}, 2000);
		}
	}, [copy]);

	return (

		<VStack
			padding={isMobile ? '10px 10px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			position="relative"
			alignItems="center"
			justifyContent="center"
		>
			<Box bg="brand.primary" borderRadius="full" width="100px">
				<Image src={Check}/>
			</Box>
			<Text py={5} textAlign="center">You made a contribution of <b>{amount}</b> sats to <b>{grant}</b>.</Text>
			<ButtonComponent
				standard
				primary={copy}
				leftIcon={copy ? <BiCopyAlt /> : <HiOutlineSpeakerphone />}
				width="100%"
				onClick={shareProjectWithfriends}
			>
				{copy ? 'Grant Link Copied' : 'Share grant with friends'}
			</ButtonComponent>
		</VStack>

	);
};
