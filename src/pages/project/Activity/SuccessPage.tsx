import React, { useEffect, useState } from 'react';
import { Text, VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { CloseButton } from '@chakra-ui/react';
import { BiCopyAlt } from 'react-icons/bi';
import ReactConfetti from 'react-confetti';
import { IFundForm } from '../../../hooks';

interface ISuccessPage {
	state: IFundForm
	handleCloseButton: () => void
}

export const SuccessPage = ({ state, handleCloseButton }: ISuccessPage) => {
	const [copy, setCopy] = useState(false);
	console.log(state);

	const isMobile = isMobileMode();
	const shareProjectWithfriends = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopy(true);
	};

	const openInNewTab = (url: string) => {
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
		if (newWindow) {
			newWindow.opener = null;
		}
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
			{/* <Box display="flex" justifyContent="center" alignItems="center" width="100%">
			</Box> */}
			<Text fontSize="30px" width="70%" textAlign="center">
				Funding successful!
			</Text>
			<Text paddingBlockEnd="30px" textAlign="center">
				The payment went through. You can now share this campaign with friends.
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
			{
				!state.anonymous
				&& <ButtonComponent
					standard
					primary={copy}
					width="100%"
					onClick={() => openInNewTab('https://twitter.com/geyserfunders')}
					style={{
						whiteSpace: 'normal',
						wordWrap: 'break-word',
					}}
				>
				Check your Twitter! Our bot @geyserfunders just sent out a tweet to thank you for supporting this project.
				</ButtonComponent>
			}

		</VStack>
	);
};
