import { Box, CloseButton, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SatoshiIcon } from '../../../components/icons';
import { ButtonComponent, CustomToggle, ErrorBox } from '../../../components/ui';
import { IProjectType, projectTypes } from '../../../constants';
import {IFundForm} from '../../../hooks';
import { DonationBased, RewardBased } from '../FundForm';

interface IPaymentPageProps {
	isMobile: boolean
	handleCloseButton: () => void
	btcRate: number
	state: IFundForm
	setTarget: (_: any) => void
	setState: any
	handleFund: () => void
	type: IProjectType
}

export const PaymentPage = ({
	isMobile,
	handleCloseButton,
	btcRate,
	handleFund,
	state,
	setTarget,
	setState,
	type,
}: IPaymentPageProps) => {
	const [error, setError] = useState('');

	const submit = () => {
		const valid = validateFundingAmount();
		if (valid) {
			handleFund();
		}
	};

	const validateFundingAmount = () => {
		if (state.amount * btcRate >= 1000) {
			setError('Payment above $1000 is not allowed at the moment. Please update the amount, or contact us for donating a higher amount');
			return false;
		}

		if (state.amount < 1) {
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
				return <RewardBased {...{setState}}/>;
			default:
				return null;
		}
	};

	return (
		<VStack
			padding={isMobile ? '10px 10px' : '10px 20px'}
			margin="10px 15px"
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			paddingTop="40px"
			position="relative"
		>
			<CloseButton
				borderRadius="50%"
				position="absolute"
				right="10px"
				top="10px"
				onClick={handleCloseButton}
			/>
			{renderFundForm()}
			<Box width="100%" >
				<Text lineHeight="26px">Comment</Text>
				<Box
					backgroundColor="brand.bgGreen"
					height="85px"
					borderRadius="12px"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Textarea
						variant="unstyled"
						fontSize="14px"
						margin="5px"
						resize="none"
						value={state.comment}
						maxLength={280}
						name="comment"
						onChange={setTarget}
					/>
				</Box>

			</Box>
			<Box width="100%">
				<CustomToggle
					first="Appear as anonymous"
					second="Appear with profile"
					value={state.anonymous}
					name="anonymous"
					onChange={setTarget}
				/>
			</Box>
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
