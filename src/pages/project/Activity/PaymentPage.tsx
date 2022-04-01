import { Box, CloseButton, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SatoshiIcon } from '../../../components/icons';
import { ButtonComponent, ErrorBox, SatoshiAmount, SectionTitle, SelectComponent, TextArea, TextBox } from '../../../components/ui';
import { IProjectType, projectTypes, SelectCountryOptions } from '../../../constants';
import {IFundForm} from '../../../hooks';
import { IProjectReward } from '../../../interfaces';
import { DonationBased, RewardBased } from '../FundForm';

interface IPaymentPageProps {
	isMobile: boolean
	handleCloseButton: () => void
	btcRate: number
	state: IFundForm
	setTarget: (_: any) => void
	updateReward:any
	setState: any
	handleFund: () => void
	type: IProjectType
	rewards?: IProjectReward[]
}

export const PaymentPage = ({
	isMobile,
	handleCloseButton,
	btcRate,
	handleFund,
	state,
	setTarget,
	setState,
	updateReward,
	type,
	rewards,
}: IPaymentPageProps) => {
	const [error, setError] = useState('');

	useEffect(() => {
		if (error) {
			setTimeout(() => setError(''), 2000);
		}
	}, [error]);

	const submit = () => {
		const valid = validateFundingAmount();
		if (valid) {
			handleFund();
		}
	};

	const validateFundingAmount = () => {
		if (getTotalAmount('dollar') >= 1000) {
			setError('Payment above $1000 is not allowed at the moment. Please update the amount, or contact us for donating a higher amount');
			return false;
		}

		if (getTotalAmount('sats') < 1) {
			setError('Payment below 1 sats is not allowed at the moment. Please update the amount');
			return false;
		}

		return true;
	};

	const renderFundForm = () => {
		switch (type) {
			case projectTypes.donation:
				return <DonationBased
					{...{btcRate,
						state,
						setTarget,
						setError }}
				/>;

			case projectTypes.reward:
				return <RewardBased {...{rewards, setState, updateReward}}/>;
			default:
				return null;
		}
	};

	const getRewardsNumber = () => {
		let totalRewards = 0;
		Object.keys(state.rewards).map(key => {
			totalRewards += state.rewards[key];
		});
		return totalRewards;
	};

	const getTotalAmount = (type: 'sats' | 'dollar') => {
		if (type === 'sats') {
			return Math.round(state.rewardsCost / btcRate) + state.donationAmount;
		}

		const donationAmount = Math.round(state.donationAmount * btcRate);

		return donationAmount + state.rewardsCost;
	};

	console.log('checking state', state);
	return (
		<VStack
			padding={isMobile ? '10px 10px' : '10px 20px'}
			margin="10px 15px"
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			// PaddingTop="40px"
			position="relative"
			alignItems="flex-start"
		>
			<CloseButton
				borderRadius="50%"
				position="absolute"
				right="10px"
				top="-5px"
				onClick={handleCloseButton}
			/>
			{renderFundForm()}
			<Divider orientation="horizontal"/>
			<SectionTitle>Comment</SectionTitle>
			<Box width="100%" >
				<TextArea
					placeholder="Leave a public message here."
					variant="unstyled"
					fontSize="14px"
					padding="5px"
					resize="none"
					value={state.comment}
					maxLength={280}
					name="comment"
					onChange={setTarget}
				/>
			</Box>
			<Box width="100%" >
				<SelectComponent
					fontSize="14px"
					placeholder="Delivery Rewards..."
					options={SelectCountryOptions}
				/>
			</Box>
			<Box width="100%">
				<TextBox
					type="email"
					placeholder="Contact Email"
				/>
			</Box>
			<HStack width="100%" justifyContent="space-between" alignItems="flex-start">
				<VStack alignItems="flex-start" spacing="0px">
					<SectionTitle>Total</SectionTitle>
					<SatoshiAmount label="Donation">{state.donationAmount}</SatoshiAmount>
					<SatoshiAmount label="Reward" extra={`${getRewardsNumber()} reward`}>{Math.round(state.rewardsCost / btcRate)}</SatoshiAmount>
				</VStack>
				<VStack alignItems="flex-end" spacing="0px">
					<SatoshiAmount color="brand.primary" fontSize="24px">{getTotalAmount('sats')}</SatoshiAmount>
					<Text> {`$${getTotalAmount('dollar')}`}</Text>
				</VStack>
			</HStack>

			<Box width="100%">
				<ButtonComponent
					primary
					standard
					leftIcon={<SatoshiIcon />}
					width="100%"
					marginTop="15px"
					onClick={submit}
				>
					Fund project
				</ButtonComponent>
			</Box>
			{error && <Box width="100%">
				<ErrorBox message={error} />
			</Box>}

		</VStack>);
};
