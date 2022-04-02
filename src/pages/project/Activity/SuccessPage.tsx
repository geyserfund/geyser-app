import React, { useEffect, useState } from 'react';
import { Text, VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { SatoshiIcon } from '../../../components/icons';
import { Box, CloseButton } from '@chakra-ui/react';
import { BiCopyAlt } from 'react-icons/bi';
import ReactConfetti from 'react-confetti';
import { useFundCalc } from '../../../helpers/fundingCalculation';
import { IFundForm } from '../../../hooks';

interface ISuccessPage {
	state: IFundForm
	handleCloseButton: () => void
}

export const SuccessPage = ({ state, handleCloseButton }: ISuccessPage) => {
	const [copy, setCopy] = useState(false);

	const {getTotalAmount} = useFundCalc(state);

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
			backgroundColor="brand.primary"
			alignItems="center"
			justifyContent="center"
		>
			<ReactConfetti
				// DrawShape={ctx => {
				// 	ctx.beginPath();
				// 	for (let i = 0; i < 22; i++) {
				// 		const angle = 0.35 * i;
				// 		const x = (0.2 + (1.5 * angle)) * Math.cos(angle);
				// 		const y = (0.2 + (1.5 * angle)) * Math.sin(angle);
				// 		ctx.lineTo(x, y);
				// 	}

				// 	ctx.stroke();
				// 	ctx.closePath();
				// }}
			/>
			<CloseButton
				borderRadius="50%"
				position="absolute"
				right="10px"
				top="10px"
				onClick={handleCloseButton}
			/>
			<Box display="flex" justifyContent="center" alignItems="center" width="100%">
				<SatoshiIcon scale={1.2} paddingBottom="5px"/><Text marginLeft="5px" fontSize="30px" >{getTotalAmount('sats')} </Text>
			</Box>
			<Text fontSize="30px" width="70%" textAlign="center">
			Successfully funded!
			</Text>
			<ButtonComponent
				standard
				primary={copy}
				leftIcon={copy ? <BiCopyAlt /> : <HiOutlineSpeakerphone />}
				width="100%"
				onClick={shareProjectWithfriends}
			>
				{copy ? 'Project Link Copied' : 'Share project with friends'}
			</ButtonComponent>
		</VStack>
	);
};
