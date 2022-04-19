/* eslint-disable capitalized-comments */
import React, { useEffect, useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { CloseButton } from '@chakra-ui/react';
import { BiCopyAlt } from 'react-icons/bi';
import ReactConfetti from 'react-confetti';
import { IFundForm } from '../../../hooks';
import { IBadge, IFundingTx, IProject } from '../../../interfaces';
import { computeFunderBadges } from '../../../helpers/computeBadges';
// import { MUTATION_CLAIM_FUNDING } from '../../../graphql';

interface ISuccessPage {
	state: IFundForm
	fundingTx: IFundingTx
	project: IProject
	handleCloseButton: () => void
}

export const SuccessPage = ({ state, fundingTx, project, handleCloseButton }: ISuccessPage) => {
	const [copy, setCopy] = useState(false);
	const [newBadges, setNewBadges] = useState<IBadge[]>([]);

	const isMobile = isMobileMode();
	const shareProjectWithfriends = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopy(true);
	};

	const botTwitterUrl = 'https://twitter.com/geyserfunders';

	// const [claimFunding, {
	// 	data, loading,
	// }] = useMutation(MUTATION_CLAIM_FUNDING);

	// const claimFunding = () => {

	// };

	useEffect(() => {
		if (state.anonymous) {
			const badges = computeFunderBadges({
				project,
				funder: {
					...fundingTx.funder,
					timesFunded: 1,
					amountFunded: fundingTx.amount,
					confirmedAt: fundingTx.paidAt,
				},
			});
			setNewBadges(badges);
		}
	}, []);

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
				{(state.rewards && Object.entries(state.rewards).length > 0)
					&& <Text textAlign="left" width="100%" paddingBlockEnd="10px">
						🎁  The creator will get in touch with you.
					</Text>}
				{state.anonymous && newBadges.length > 0
					// && <HStack>
					// 	<Text paddingBlockEnd="30px">
					// 	The amount you funded has earned you the following {newBadges.length === 1 ? 'badge' : 'badge'}: {newBadges.map(badge => badge.badge).join(', ')}.
					// 	Log in now to claim it!
					// 	</Text>
					// 	<ButtonComponent
					// 		primary={copy}
					// 		width="25%"
					// 		onClick={() => {}}
					// 	>
					// Log In
					// 	</ButtonComponent>
					// </HStack>
				}
				{!state.anonymous
					&& <Text textAlign="left" paddingBlockEnd="30px">
						🤖  Check your Twitter! Our bot <a href={botTwitterUrl}>@geyserfunders</a> just sent out a tweet.
					</Text>
				}
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
