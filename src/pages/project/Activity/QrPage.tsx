import { Box, Text, VStack, HStack } from '@chakra-ui/layout';
import { CloseButton, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import QRCode from 'react-qr-code';
import { ButtonComponent, Card, SatoshiAmount, SectionTitle } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { RiLinksLine, RiLinkUnlinkM } from 'react-icons/ri';
import { IFundingTx, IProject, IProjectReward } from '../../../interfaces';
import { IFundForm } from '../../../hooks';
import { GiftIcon } from '../../../components/icons';
import { useBtcContext } from '../../../context/btc';
import { BsLightning } from 'react-icons/bs';
import {GiCrossedChains} from 'react-icons/gi';
import { colors } from '../../../constants';

const useStyles = createUseStyles({
	blockText: {
		fontSize: '14px',
		marginBottom: '3px',
	},
	copyText: {
		width: '100%',
	},
	qr: {
		margin: '5px',

	},
	qrContainer: {
		border: '2px solid',
		borderColor: colors.primary,
		borderRadius: '10px',
		'&:hover': {
			cursor: 'pointer',
		},
	},
});

interface IQrPage {
	handleCloseButton: () => void
	fundingTx: IFundingTx
	state: IFundForm
	project: IProject
}

export const QrPage = ({
	fundingTx,
	state,
	project,
	handleCloseButton,
}: IQrPage) => {
	const { paymentRequest, address, amount} = fundingTx;
	const {comment} = state;
	const {title} = project;

	const {btcRate} = useBtcContext();

	console.log(paymentRequest, address);

	const isMobile = isMobileMode();
	const classes = useStyles();

	const [copy, setcopy] = useState(false);
	const [platform, setPlatform] = useState(0);

	const handleCopy = () => {
		navigator.clipboard.writeText(paymentRequest);
		setcopy(true);
		setTimeout(() => {
			setcopy(false);
		}, 2000);
	};

	const handleCopyOnchain = () => {
		navigator.clipboard.writeText(getOnchainAddress());
		setcopy(true);
		setTimeout(() => {
			setcopy(false);
		}, 2000);
	};

	const getOnchainAddress = () => {
		const bitcoins = amount / 100000000;
		return `bitcoin:${address}?amount=${bitcoins}`;
	};

	const getRewardNames = () => {
		let rewardNames = '';
		project.rewards?.map((reward: IProjectReward) => {
			const rewardCount = state.rewards[reward.id];
			if (rewardCount) {
				if (rewardNames.length === 0) {
					rewardNames = `${reward.name}(x${rewardCount})`;
				} else {
					rewardNames = `${rewardNames}, ${reward.name}(x${rewardCount})`;
				}
			}
		});
		return rewardNames;
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

	const qrBackgroundColor = copy ? colors.primary : colors.bgWhite;

	return (
		<VStack
			padding={isMobile ? '10px 0px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			margin="10px 15px"
			display="flex"
			alignItems="flex-start"
			position="relative"
		>
			<CloseButton
				borderRadius="50%"
				position="absolute"
				right="10px"
				top="0px"
				onClick={handleCloseButton}
			/>
			<SectionTitle> Confirm & fund</SectionTitle>
			<Card width="100%" borderRadius="5px">
				<VStack width="100%" padding="15px" alignItems="flex-start">
					{state.rewardsCost > 0 && (
						<VStack borderBottom="1px solid grey100">
							<HStack>
								<GiftIcon />
								<Text>{`Reward: ${getRewardNames()}`}</Text>
							</HStack>
						</VStack>
					)}
					<HStack width="100%" justifyContent="space-between" alignItems="flex-start">
						<VStack alignItems="flex-start" spacing="0px">
							<SectionTitle>Total</SectionTitle>
							<SatoshiAmount label="Donation">{state.donationAmount}</SatoshiAmount>
							<SatoshiAmount label="Reward" extra={`${getRewardsNumber()} reward`}>{Math.round(state.rewardsCost / btcRate)}</SatoshiAmount>
							<Text className={classes.blockText}> {`Project: ${title}`}</Text>
							{comment && <Text className={classes.blockText}> {`Comment: ${comment}`}</Text>}
							{ state.email && <Text className={classes.blockText}> {`Email: ${state.email}`}</Text>}
						</VStack>
						<VStack alignItems="flex-end" spacing="0px">
							<SatoshiAmount color="brand.primary" fontSize="24px">{getTotalAmount('sats')}</SatoshiAmount>
							<Text> {`$${getTotalAmount('dollar')}`}</Text>
						</VStack>
					</HStack>
				</VStack>

			</Card>
			<Card width="100%" borderRadius="5px">
				<Tabs variant="enclosed" isFitted onChange={setPlatform}>
					<TabList >
						<Tab value="lightning" color={platform === 0 ? colors.normalLightGreen : colors.textBlack}><BsLightning/><Text marginLeft="3px">Lightning</Text></Tab>
						<Tab value="onChain" color={platform === 1 ? colors.normalLightGreen : colors.textBlack}><GiCrossedChains /><Text marginLeft="3px">On-chain</Text></Tab>
					</TabList>
					<TabPanels>
						<TabPanel display="flex" justifyContent="center">
							<Box className={classes.qrContainer} backgroundColor={qrBackgroundColor}>
								<QRCode bgColor={qrBackgroundColor} className={classes.qr} value={paymentRequest} onClick={handleCopy} />
							</Box>
						</TabPanel>
						<TabPanel display="flex" justifyContent="center">
							<Box className={classes.qrContainer} backgroundColor={qrBackgroundColor}>
								<QRCode bgColor={qrBackgroundColor} className={classes.qr} value={getOnchainAddress()} onClick={handleCopyOnchain} />
							</Box>
						</TabPanel>
					</TabPanels>
				</Tabs>

			</Card>
			{platform === 0 &&	<Box className={classes.copyText}>
				<ButtonComponent
					isFullWidth
					primary={copy}
					onClick={handleCopy}
					leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
				>
					{!copy ? 'Copy Invoice' : 'Invoice Copied'}
				</ButtonComponent>
				<Text ></Text>
			</Box>}
			{platform === 1 && <Box className={classes.copyText}>
				<ButtonComponent
					isFullWidth
					primary={copy}
					onClick={handleCopyOnchain}
					leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
				>
					{!copy ? 'Copy Address' : 'Address Copied'}
				</ButtonComponent>
				<Text ></Text>
			</Box>}

		</VStack>
	);
};
