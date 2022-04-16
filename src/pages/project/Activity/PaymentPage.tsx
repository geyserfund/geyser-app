import { Box, CloseButton, Divider, HStack, Text, VStack, Button, Input, InputGroup, InputLeftElement, Modal, ModalOverlay, ModalBody, ModalCloseButton, ModalContent, useDisclosure, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SatoshiIcon, GifIcon } from '../../../components/icons';
import { ButtonComponent, ErrorBox, SatoshiAmount, SectionTitle, SelectComponent, TextArea, TextBox } from '../../../components/ui';
import { colors, projectTypes, SelectCountryOptions } from '../../../constants';
import { useFundCalc } from '../../../helpers/fundingCalculation';
import {IFundForm} from '../../../hooks';
import { IProjectReward, IProjectType } from '../../../interfaces';
import { DonationBased, RewardBased } from '../FundForm';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

interface IPaymentPageProps {
	isMobile: boolean
	fundLoading: boolean
	handleCloseButton: () => void
	btcRate: number
	state: IFundForm
	setTarget: (_: any) => void
	updateReward:any
	setState: any
	handleFund: () => void
	type: IProjectType
	rewards?: IProjectReward[]
	name: string
}

export const PaymentPage = ({
	isMobile,
	fundLoading,
	handleCloseButton,
	btcRate,
	handleFund,
	state,
	setTarget,
	setState,
	updateReward,
	type,
	rewards,
	name,
}: IPaymentPageProps) => {
	const [error, setError] = useState('');
	const {getShippingCost, getTotalAmount} = useFundCalc(state);
	const [gifSearch, setGifSearch] = useState('bitcoin');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedGif, setSelectedGif] = useState<string | number>('');
	const [gifHover, setGifHover] = useState(false);

	useEffect(() => {
		if (error) {
			setTimeout(() => setError(''), 3000);
		}
	}, [error]);

	const submit = () => {
		const valid = validateFundingAmount();
		if (valid) {
			handleFund();
		}
	};

	const gf = new GiphyFetch('AqeIUD33qyHnMwLDSDWP0da9lCSu0LXx');
	const fetchGifs = (offset: number) => gf.search(gifSearch, { offset, sort: 'relevant', limit: 9 });

	const validateFundingAmount = () => {
		if (getTotalAmount('dollar', name) >= 5000) {
			setError('Payment above $5000 is not allowed at the moment. Please update the amount, or contact us for donating a higher amount');
			return false;
		}

		if (getTotalAmount('sats', name) < 1) {
			setError('Payment below 1 sats is not allowed at the moment. Please update the amount');
			return false;
		}

		if (state.rewardsCost && !state.email) {
			setError('Email is a required field when donating for a reward.');
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

	console.log('checking state', state);
	return (
		<VStack
			padding={isMobile ? '10px 10px' : '10px 20px'}
			margin="10px 15px"
			spacing="12px"
			width="100%"
			height="100%"
			position="relative"
			alignItems="flex-start"
		>
			<CloseButton
				borderRadius="50%"
				position="absolute"
				right="0px"
				top="-10px"
				onClick={handleCloseButton}
			/>
			{renderFundForm()}
			<Divider borderTopWidth="3px" borderBottomWidth="0px" orientation="horizontal" marginTop="0px !important" />
			<VStack spacing="5px" width="100%" alignItems="flex-start">
				<SectionTitle>Comment</SectionTitle>
				<Box width="100%" position="relative">
					<TextArea
						pr={16}
						placeholder="Leave a public message here."
						fontSize="14px"
						resize="none"
						value={state.comment}
						maxLength={280}
						name="comment"
						onChange={setTarget}

					/>
					{gifHover && selectedGif && <CloseIcon position="absolute" top="31px" right="29px"/>}
					{selectedGif
						?	<Image src={`https://media.giphy.com/media/${selectedGif}/giphy.gif`} alt="gif" width="50px" height="50px" zIndex="10" position="absolute" top="3.5" right="3" cursor="pointer" opacity={gifHover ? '0.25' : '1'} onMouseEnter={() => {
							setGifHover(true);
						}} onMouseLeave={() => {
							setGifHover(false);
						}} onClick={() => {
							setSelectedGif('');
							setGifHover(false);
							onOpen();
						}}/>
						: <Button zIndex="10" position="absolute" top="2" right="3" bg="none" p={0} onClick={onOpen}>
							<GifIcon/>
						</Button>
					}
				</Box>

				<Modal onClose={() => {
					setGifSearch('bitcoin');
					onClose();
				}} isOpen={isOpen} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalCloseButton />
						<ModalBody>
							<Box height="350px" overflow="auto" mt={10}>
								<InputGroup mb={2}>
									<InputLeftElement >
										<SearchIcon/>
									</InputLeftElement>
									<Input placeholder="Search" variant="filled" textAlign="center" focusBorderColor="brand.primary"
										onChange={e => setGifSearch(e.target.value)}
									/>
								</InputGroup>
								<Box display="flex" justifyContent="center" alignItems="center" cursor="pointer">
									<Grid width={300} columns={3} fetchGifs={fetchGifs} noLink={true} hideAttribution={true} key={gifSearch} onGifClick={gif => {
										setSelectedGif(gif.id);
										state.gif = gif.id;
										setTarget(gif);
										onClose();
									}} />
								</Box>
							</Box>
						</ModalBody>
					</ModalContent>
				</Modal>

				{state.rewardsCost && name !== 'day-of-genesis' && <Box width="100%" >
					<SelectComponent
						name="shippingDestination"
						fontSize="14px"
						placeholder={<Text color={colors.grayPlaceholder}>Delivery Rewards...</Text>}
						options={SelectCountryOptions}
						onChange={setState}
						value={SelectCountryOptions.find(val => val.value === state.shippingDestination) }
					/>
				</Box>}
				{state.rewardsCost &&	<Box width="100%">
					<TextBox
						type="email"
						name="email"
						fontSize="14px"
						placeholder="Contact Email"
						value={state.email}
						onChange={setTarget}
					/>
				</Box>}
			</VStack>
			{type === projectTypes.reward && <HStack width="100%" justifyContent="space-between" alignItems="flex-start">
				<VStack alignItems="flex-start" spacing="0px">
					<SectionTitle>Total</SectionTitle>
					<SatoshiAmount label="Donation">{state.donationAmount}</SatoshiAmount>
					<SatoshiAmount label="Reward" extra={`${getRewardsNumber()} reward`}>{Math.round(state.rewardsCost / btcRate)}</SatoshiAmount>
					{ state.rewardsCost && name !== 'day-of-genesis' && <SatoshiAmount label="Shipping" >{getShippingCost()}</SatoshiAmount>}

				</VStack>
				<VStack alignItems="flex-end" spacing="0px">
					<SatoshiAmount color="brand.primary" fontSize="24px">{getTotalAmount('sats', name)}</SatoshiAmount>
					<Text> {`$${getTotalAmount('dollar', name)}`}</Text>
				</VStack>
			</HStack>}
			<Box width="100%">
				<ButtonComponent
					isLoading={fundLoading}
					primary
					standard
					leftIcon={<SatoshiIcon />}
					width="100%"
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
