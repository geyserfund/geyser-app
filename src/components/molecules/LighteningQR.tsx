import { Box, Button, IconButton, Tooltip } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import React, { useState } from 'react';
import { isMobileMode } from '../../utils';
import { BoltIcon, QrIcon, ShareIcon } from '../icons';

interface ILighteningQR {
	name: string;
}

export const LighteningQR = ({name}: ILighteningQR) => {
	const isMobile = isMobileMode();
	const [copy, setCopy] = useState(false);
	const [imageDownload, setImageDownload] = useState('');

	const handleAddressCopy = () => {
		navigator.clipboard.writeText(`${name}@geyser.fund`);
		setCopy(true);
	};

	const capture = () => {
		if (document.getElementById('lnaddress-qr')) {
			html2canvas(document.getElementById('lnaddress-qr')!, { useCORS: true }).then(canvas => {
				setImageDownload(canvas.toDataURL('image/png', 1.0));
			});
		}
	};

	const handleShare = () => {
		navigator.clipboard.writeText(`https://geyser.fund/project/${name}`);
		setCopy(true);
	};

	return (
		<Box display="flex" flexWrap="wrap" justifyContent="start" alignItems="center" marginTop="8px" marginBottom="16px">

			<Tooltip label={copy ? 'Copied!' : 'Copy Lightning Address'} placement="top" closeOnClick={false}>
				<Button leftIcon={<BoltIcon/>} my={isMobile ? 2 : 0} mr={2} border="1px solid #20ECC7" _hover={{backgroundColor: 'none'}} _active={{backgroundColor: 'brand.primary'}} bg="none" fontWeight="medium" onClick={handleAddressCopy} color="#2F423E" id="lightning-address">{name}@geyser.fund</Button>
			</Tooltip>

			<Tooltip label="View Project QR Code" placement="top">
				<IconButton mr={2} _hover={{backgroundColor: 'none', border: '1px solid #20ECC7'}} _active={{backgroundColor: 'brand.primary'}} bg="none" icon={<QrIcon/>} aria-label="qr" onClick={() => {
					setCopy(false);
					if (imageDownload.length === 0) {
						setTimeout(() => {
							capture();
						}, 2100);
					}
				}}/>
			</Tooltip>

			<Tooltip label={copy ? 'Copied!' : 'Share Project'} placement="top" closeOnClick={false}>
				<IconButton border="1px solid #20ECC7" _hover={{backgroundColor: 'none'}} _active={{backgroundColor: 'brand.primary'}} bg="none" icon={<ShareIcon/>} aria-label="share" onClick={handleShare}/>
			</Tooltip>
		</Box>
	);
};
