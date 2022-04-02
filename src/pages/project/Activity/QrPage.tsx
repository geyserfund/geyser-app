import { Box, Text, VStack } from '@chakra-ui/layout';
import { CloseButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import QRCode from 'react-qr-code';
import { ButtonComponent } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { RiLinksLine, RiLinkUnlinkM } from 'react-icons/ri';
import { IFundingTx } from '../../../interfaces';
import { IFundForm } from '../../../hooks';

const useStyles = createUseStyles({
	blockText: {
		fontSize: '12px',
	},
	copyText: {
		width: '100%',
	},
});

interface IQrPage {
	title: string;
	owners: string[];
	handleCloseButton: () => void
	fundingTx: IFundingTx
	state: IFundForm
}

export const QrPage = ({
	fundingTx,
	state,
	title,
	owners,
	handleCloseButton,
}: IQrPage) => {
	const { paymentRequest, address, amount} = fundingTx;
	const {comment} = state;

	console.log(paymentRequest, address);

	const isMobile = isMobileMode();
	const classes = useStyles();

	const [copy, setcopy] = useState(false);

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

	return (
		<VStack
			padding={isMobile ? '10px 0px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			margin="10px 15px"
			display="flex"
			alignItems="center"
			justifyContent="center"
			position="relative"
		>
			<CloseButton
				borderRadius="50%"
				position="absolute"
				right="10px"
				top="0px"
				onClick={handleCloseButton}
			/>
			<Box width="100%" padding="10px">
				<Text fontSize="16px"> Confirm and pay using QR Code </Text>
				<Box backgroundColor="brand.bgLightGrey" borderRadius="12px" padding="10px">
					<Text className={classes.blockText}> {`Project: ${title}`}</Text>
					<Text className={classes.blockText}> {`Project Owners: ${owners.join(', ')}`}</Text>
					<Text className={classes.blockText}> {`Amount: ${amount}`}</Text>
					{comment && <Text className={classes.blockText}> {`Message: ${comment}`}</Text>}
				</Box>
			</Box>
			<QRCode value={paymentRequest} onClick={handleCopy} />
			<QRCode value={getOnchainAddress()} onClick={handleCopyOnchain} />
			<Box className={classes.copyText}>
				<ButtonComponent
					isFullWidth
					primary={copy}
					onClick={handleCopy}
					leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
				>
					{!copy ? 'Copy Invoice' : 'Invoice Copied'}
				</ButtonComponent>
				<Text ></Text>
			</Box>
			<Box className={classes.copyText}>
				<ButtonComponent
					isFullWidth
					primary={copy}
					onClick={handleCopyOnchain}
					leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
				>
					{!copy ? 'Copy Address' : 'Address Copied'}
				</ButtonComponent>
				<Text ></Text>
			</Box>

		</VStack>
	);
};
