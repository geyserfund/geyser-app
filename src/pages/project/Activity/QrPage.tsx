import { Box, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { createUseStyles } from 'react-jss';
import QRCode from 'react-qr-code';
import { isMobileMode } from '../../../utils';

const useStyles = createUseStyles({
	blockText: {
		fontSize: '12px',
	},
});

interface IQrPage {
    comment: string;
     title: string;
     amount: number;
     owner: string;
     qrCode: string;
}

export 	const QrPage = ({
	comment, title, amount, owner, qrCode,
}:IQrPage) => {
	const isMobile = isMobileMode();
	const classes = useStyles();

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
		>
			<Box width="100%" padding="10px">
				<Text fontSize="16px"> Confirm and pay using QR Code </Text>
				<Box backgroundColor="brand.bgLightGrey" borderRadius="12px" padding="10px">
					<Text className={classes.blockText}> {`Project: ${title}`}</Text>
					<Text className={classes.blockText}> {`Project Owner: ${owner}`}</Text>
					<Text className={classes.blockText}> {`Amount: ${amount}`}</Text>
					{comment && <Text className={classes.blockText}> {`Message: ${comment}`}</Text>}
				</Box>
			</Box>
			<QRCode value={qrCode} />

		</VStack>
	);
};
