import React, { useEffect, useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/layout';
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

	const botTwitterUrl = 'https://twitter.com/geyserfunders';

	useEffect(() => {
		if (copy) {
			setTimeout(() => {
				setCopy(false);
			}, 2000);
		}
	}, [copy]);

	return (
		<><VStack
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
			<ReactConfetti />
			<CloseButton
				borderRadius="50%"
				position="absolute"
				right="10px"
				top="10px"
				onClick={handleCloseButton} />
			<Text fontSize="30px" width="80%" textAlign="center" paddingBlockEnd="50px">
				Funding successful!
			</Text>
			<Box alignItems="left" width="100%">
				<Text paddingBlockEnd="30px">
					The payment went through. You can now share this campaign with friends.
				</Text>
				{state.rewards
					&& <Text textAlign="left" width="100%" paddingBlockEnd="10px">
						🎁  The creator will get in touch with you.
					</Text>}
				{!state.anonymous
					&& <Text textAlign="left" paddingBlockEnd="30px">
						🤖  Check your Twitter! Our bot <a href={botTwitterUrl}>@geyserfunders</a> just sent out a tweet.
					</Text>}
				<ButtonComponent
					standard
					primary={copy}
					leftIcon={copy ? <BiCopyAlt /> : <HiOutlineSpeakerphone />}
					width="100%"
					onClick={shareProjectWithfriends}
				>
					{copy ? 'Project Link Copied' : 'Share project with friends'}
				</ButtonComponent>
			</Box>
		</VStack></>
	);
};
