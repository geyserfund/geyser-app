import { Box, Text, VStack } from '@chakra-ui/layout';
import { CloseButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import QRCode from 'react-qr-code';
import { ButtonComponent } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { RiLinksLine, RiLinkUnlinkM } from 'react-icons/ri';

const useStyles = createUseStyles({
	blockText: {
		fontSize: '12px',
	},
	copyText: {
		width: '100%',
	},
});

interface IQrPage {
	comment: string;
	title: string;
	amount: number;
	owner: string;
	qrCode: string;
	handleCloseButton: () => void
}

export const QrPage = ({
	comment, title, amount, owner, qrCode, handleCloseButton,
}: IQrPage) => {
	const isMobile = isMobileMode();
	const classes = useStyles();

	const [copy, setcopy] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(qrCode);
		setcopy(true);
		setTimeout(() => {
			setcopy(false);
		}, 2000);
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
				onClick={handleCloseButton}
			/>
			<Box width="100%" padding="10px">
				<Text fontSize="16px"> Confirm and pay using QR Code </Text>
				<Box backgroundColor="brand.bgLightGrey" borderRadius="12px" padding="10px">
					<Text className={classes.blockText}> {`Project: ${title}`}</Text>
					<Text className={classes.blockText}> {`Project Owner: ${owner}`}</Text>
					<Text className={classes.blockText}> {`Amount: ${amount}`}</Text>
					{comment && <Text className={classes.blockText}> {`Message: ${comment}`}</Text>}
				</Box>
			</Box>
			<QRCode value={qrCode} onClick={handleCopy} />
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

		</VStack>
	);
};
