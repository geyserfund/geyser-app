import { Box, Text, VStack, HStack } from '@chakra-ui/layout';
import { CloseButton, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import QRCode from 'react-qr-code';
import { ButtonComponent, Card, SatoshiAmount, SectionTitle } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { RiLinksLine, RiLinkUnlinkM } from 'react-icons/ri';
import { IFundingTx, IFundingAmounts, IProject, IProjectReward } from '../../../interfaces';
import { IFundForm } from '../../../hooks';
import { GiftIcon } from '../../../components/icons';
import { BsLightning } from 'react-icons/bs';
import {GiCrossedChains} from 'react-icons/gi';
import { colors } from '../../../constants';
import { useFundCalc } from '../../../helpers/fundingCalculation';

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
	tabActive: {
		color: `${colors.normalLightGreen} !important`,
	},
});

interface IQrPage {
	handleCloseButton: () => void
	fundingTx: IFundingTx
	amounts: IFundingAmounts
	state: IFundForm
	project: IProject
}

export const QrPage = ({
	fundingTx,
	amounts,
	state,
	project,
	handleCloseButton,
}: IQrPage) => {
	const { paymentRequest, address, amount} = fundingTx;
	const {title} = project;

	const {getTotalAmount, getRewardsQuantity} = useFundCalc(state);

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

	// Const getBip21String = () => {
	// 	const bitcoins = amount / 100000000;
	// 	return `bitcoin:${address}?amount=${bitcoins}&lightning=${paymentRequest}`;
	// }

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

	const rewardCountString = () => {
		const count = getRewardsQuantity();
		if (count === 0) {
			return '';
		}

		if (count === 1) {
			return '1 reward';
		}

		return `${count} rewards`;
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
						<VStack width="100%" alignItems="flex-start" paddingBottom="5px" borderBottom={`1px solid ${colors.gray200}`}>
							<HStack>
								<GiftIcon />
								<Text>{`Reward: ${getRewardNames()}`}</Text>
							</HStack>
						</VStack>
					)}
					<HStack width="100%" justifyContent="space-between" alignItems="flex-start">
						<VStack alignItems="flex-start" spacing="0px">
							<SectionTitle>Total</SectionTitle>
							<SatoshiAmount label="Donation">{amounts.donationAmount}</SatoshiAmount>
							{amounts.rewardsCost && <SatoshiAmount label="Reward" extra={rewardCountString()}>{amounts.rewardsCost}</SatoshiAmount>}
							{amounts.rewardsCost && <SatoshiAmount label="Shipping" >{amounts.shippingCost}</SatoshiAmount>}
							<Text className={classes.blockText}> {`Project: ${title}`}</Text>
							{ state.email && <Text className={classes.blockText}> {`Email: ${state.email}`}</Text> }
							{ state.comment && <Text className={classes.blockText}> {`Comment: ${state.comment}`}</Text> }
							{/* { state.media && <Image src={`${fundingTx.media}`} alt="gif" width="100%" borderRadius="4px" /> } */}
						</VStack>
						<VStack alignItems="flex-end" spacing="0px">
							<SatoshiAmount color="brand.primary" fontSize="24px">{getTotalAmount('sats', project.name)}</SatoshiAmount>
							<Text> {`$${getTotalAmount('dollar', project.name)}`}</Text>
						</VStack>
					</HStack>
				</VStack>

			</Card>
			<Card width="100%" borderRadius="5px">
				<Tabs variant="enclosed" isFitted onChange={setPlatform}>
					<TabList >
						<Tab className={platform === 0 ? classes.tabActive : ''} value="lightning" ><BsLightning/><Text marginLeft="3px">Lightning</Text></Tab>
						<Tab className={platform === 1 ? classes.tabActive : ''} value="onChain" ><GiCrossedChains /><Text marginLeft="3px">On-chain</Text></Tab>
					</TabList>
					<TabPanels>
						<TabPanel display="flex" flexDirection="column" alignItems="center">
							<Box className={classes.qrContainer} backgroundColor={qrBackgroundColor}>
								<QRCode size={186} bgColor={qrBackgroundColor} className={classes.qr} value={paymentRequest} onClick={handleCopy} />
							</Box>
							<Text paddingTop="15px">Waiting for payment...</Text>
						</TabPanel>
						<TabPanel display="flex" flexDirection="column" alignItems="center">
							<Box className={classes.qrContainer} backgroundColor={qrBackgroundColor}>
								<QRCode size={186} bgColor={qrBackgroundColor} className={classes.qr} value={getOnchainAddress()} onClick={handleCopyOnchain} />
							</Box>
							<Text paddingTop="15px">Waiting for payment...</Text>
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
