import { Avatar, Box, HStack, Text, VStack, Image, Button, IconButton, Tooltip, Modal, ModalOverlay, ModalContent,	ModalHeader,	ModalFooter,	ModalBody, useDisclosure,	ModalCloseButton, Link as LinkChakra } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IParticipant, IProjectDetail } from '../../../interfaces';
import { ButtonComponent } from '../../../components/ui';
import ReactPlayer from 'react-player';
import { isMobileMode, getFormattedDate, encode } from '../../../utils';
import { useStyles } from './styles';
import { QrIcon, BoltIcon } from '../../../components/icons';
import { DownloadIcon, CopyIcon } from '@chakra-ui/icons';
import QRCode from 'react-qr-code';
import { REACT_APP_API_ENDPOINT } from '../../../constants';
import html2canvas from 'html2canvas';

interface IOwnerSponsorCard {
	owner: IParticipant
	ambassadors: IParticipant[]
	images: string[]
	projectDetails: IProjectDetail
    date: string
    name: string
    id: string
}

export const OwnerSponsorCard = ({ owner, ambassadors, images, projectDetails, date, name, id }: IOwnerSponsorCard) => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });
	const podcast = projectDetails.blocks.find(block => block.key === 'podcast');
	const { problem, idea } = projectDetails;
	const [copy, setCopy] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imageDownload, setImageDownload] = useState('');
	const finalRef = React.useRef(null);

	const capture = () => {
		if (document.getElementById('lnaddress-qr')) {
			html2canvas(document.getElementById('lnaddress-qr')!).then(canvas => {
				setImageDownload(canvas.toDataURL('image/png', 1.0));
			});
		}
	};

	const lnurlPayUrl = encode(`${REACT_APP_API_ENDPOINT}/lnurl/pay?projectId=${id}`);

	useEffect(() => {
		if (copy) {
			setTimeout(() => {
				setCopy(false);
			}, 2000);
		}
	}, [copy]);

	const handleAddressCopy = () => {
		navigator.clipboard.writeText(`${name}@geyser.fund`);
		setCopy(true);
	};

	return (
		<>
			<Box>
				<HStack alignItems="center">
					<Link to={`/profile/${owner.user.id}`}>
						<Avatar width="40px" height="40px" name={owner.user.username} src={owner.user.imageUrl} />
					</Link>

					<Link to={`/profile/${owner.user.id}`}>
						<Text fontSize="18px" _hover={{ textdecoration: 'underline', fontWeight: 500 }}>
							{owner.user.username}
						</Text>
					</Link>
				</HStack>

				<Box display="flex" flexWrap="wrap" justifyContent="start" alignItems="center" marginTop="8px" marginBottom="16px">
					<Text textAlign="center" fontSize="md" mr={2} px={4} py="8px">{getFormattedDate(date)}</Text>

					<Tooltip label={copy ? 'Copied!' : 'Copy Lightning Address'} placement="top" closeOnClick={false}>
						<Button leftIcon={<BoltIcon/>} my={isMobile ? 2 : 0} mr={2} border="1px solid #20ECC7" _hover={{backgroundColor: 'none'}} bg="none" fontWeight="medium" onClick={handleAddressCopy}>{name}@geyser.fund</Button>
					</Tooltip>

					<Tooltip label="View Project QR Code" placement="top">
						<IconButton border="1px solid #20ECC7" _hover={{backgroundColor: 'none'}} bg="none" icon={<QrIcon/>} aria-label="qr" onClick={() => {
							onOpen();
							if (imageDownload.length === 0) {
								setTimeout(() => {
									capture();
								}, 2100);
							}
						}}/>
					</Tooltip>
				</Box>

				<VStack spacing="10px" w="100%">
					<Image ref={finalRef} src={images[0]} w="100%" maxHeight="40vh" objectFit="cover" borderRadius="md"/>

					<Text fontSize="3xl" fontWeight="bold" textAlign="left" w="100%">{owner.user.username}</Text>

					{problem && <Text w="100%" fontSize="lg" fontWeight="medium">{problem}</Text>}

					<Text w="100%" fontSize="lg" fontWeight="medium">{idea}</Text>
				</VStack>

				{podcast && <Box width="100%" mt={10}>
					<ReactPlayer className={classes.podcastContainer} height="200px" width="100%" url={podcast.podcast} />
				</Box>}
			</Box>

			<Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size={isMobile ? 'md' : 'xl'} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader><Text fontSize="3xl">Campaign QR code</Text></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text mb={5} fontWeight="medium">Lightning addresses and QR codes make it possible for anyone to fund campaigns from anywhere.</Text>

						<Box display={isMobile ? 'block' : 'flex'} w="100%" p={5} bg="brand.bgGrey" borderRadius="lg">
							<Image display={isMobile ? 'none' : 'block'} borderLeftRadius="lg" borderRightRadius="0" src={images[0]} w="50%" objectFit="cover"/>

							<Box bg="brand.primary" w={isMobile ? '100%' : '50%'} p={5} borderRadius="lg" borderLeftRadius={isMobile ? 'lg' : '0'} display="flex" justifyContent="center" alignItems="center">
								<Box cursor="pointer" onClick={handleAddressCopy}>
									<Box display="flex" justifyContent="center" id="lnaddress-qr" p={2} bgColor="#fff" borderRadius="lg">
										<QRCode bgColor="#fff" fgColor="#20ECC7" size={isMobile ? 121 : 186} value={lnurlPayUrl} />
									</Box>

									<HStack mt={2}>
										<BoltIcon/>
										<Text fontSize="xs" fontWeight="light">LIGHTNING ADDRESS</Text>
									</HStack>

									<Text fontSize="xs" fontWeight="medium" wordBreak="break-all">{name}@geyser.fund</Text>
								</Box>
							</Box>
						</Box>
					</ModalBody>
					<ModalFooter>
						<VStack w="100%">
							<ButtonComponent w="100%" primary onClick={handleAddressCopy}>
								<CopyIcon mr={2}/> {copy ? 'Copied!' : 'Copy'}
							</ButtonComponent>

							{imageDownload.length === 0
								? <ButtonComponent disabled={true} isLoading={true} w="100%" primary>
									<DownloadIcon mr={2}/> Download
								</ButtonComponent>
								: <LinkChakra w="100%" h="100%" _hover={{textDecoration: 'none'}} href={imageDownload} download={`${name}-lnaddress-qr.png`} isExternal>
									<ButtonComponent w="100%" primary>
										<DownloadIcon mr={2}/> Download
									</ButtonComponent>
								</LinkChakra>
							}
						</VStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
