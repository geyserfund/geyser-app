import { Box, Text, VStack } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import QRCode from 'react-qr-code';
import { ButtonComponent } from '../../../components/ui';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';

import { RiLinksLine, RiLinkUnlinkM } from 'react-icons/ri';

const useStyles = createUseStyles({
	blockText: {
		fontSize: '12px',
	},
	copyText: {
		width: '100%',
	},
});

interface IQrInvoice {
	comment: string;
	title: string;
	amount: number;
	owners: string[];
	qrCode: string;
	invoiceCancelled: boolean;
	handleCloseButton: () => void;

}

export const QrInvoice = ({
	comment, title, amount, owners, qrCode, invoiceCancelled}: IQrInvoice) => {
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
			px={10}
			py={4}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"

			display="flex"
			alignItems="center"
			justifyContent="center"

		>
			<Box width="100%">
				<Box backgroundColor="brand.bgLightGrey" borderRadius="12px" padding="10px">
					<Text className={classes.blockText}> {`Grant: ${title}`}</Text>
					<Text className={classes.blockText}> {`The Board: ${owners.join(', ')}`}</Text>
					<Text className={classes.blockText}> {`Amount (sats): ${amount}`}</Text>
					{comment && <Text className={classes.blockText}> {`Comment: ${comment}`}</Text>}
				</Box>
			</Box>
			<QRCode value={qrCode} onClick={handleCopy} />
			{invoiceCancelled
				? <Text color="#EA453B">You cancelled your payment. Please close window and try again.</Text>
				: <Text color="#EAA13B">Waiting for your payment...</Text>
			}
			<Box className={classes.copyText}>
				<ButtonComponent
					isFullWidth
					primary={copy}
					onClick={handleCopy}
					leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
				>
					{!copy ? 'Copy Invoice' : 'Invoice Copied'}
				</ButtonComponent>
				<Link isExternal href="https://geyser.notion.site/How-to-get-started-with-Lightning-77e201fbc3f944b683b0cf3d30716961">
					<ButtonComponent isFullWidth my={2} leftIcon={<QuestionOutlineIcon/>}>Don&apos;t have a wallet?</ButtonComponent>
				</Link>
			</Box>

		</VStack>
	);
};
