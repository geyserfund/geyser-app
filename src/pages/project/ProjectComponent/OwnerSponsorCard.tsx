import { Avatar, Box, HStack, Text, VStack, Image, Button, IconButton, Tooltip, Modal, ModalOverlay, ModalContent,	ModalHeader,	ModalFooter,	ModalBody, useDisclosure,	ModalCloseButton, Link as LinkChakra } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IParticipant, IProject, IProjectDetail } from '../../../interfaces';
import { ButtonComponent } from '../../../components/ui';
import ReactPlayer from 'react-player';
import { isMobileMode, getFormattedDate, encode } from '../../../utils';
import { useStyles } from './styles';
import { QrIcon, BoltIcon, ShareIcon } from '../../../components/icons';
import { DownloadIcon } from '@chakra-ui/icons';
import { QRCode } from 'react-qrcode-logo';
import { REACT_APP_API_ENDPOINT } from '../../../constants';
import LogoLight from '../../../assets/logo-dark-green.svg';
import html2canvas from 'html2canvas';

interface IOwnerSponsorCard {
	project: IProject
	projectDetails: IProjectDetail
}

function ModalProjectImage({ image }:{image: string}) {
	return (
		<Box borderLeftRadius="lg" backgroundImage={image} w="50%" backgroundSize="cover" id="modal-image"/>
	);
}

const ModalImage = React.memo(ModalProjectImage);

export const OwnerSponsorCard = ({ project, projectDetails }: IOwnerSponsorCard) => {
	const { id, media: images, name, title, owners, createdAt: date } = project;
	const owner = owners[0];
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
			html2canvas(document.getElementById('lnaddress-qr')!, { useCORS: true }).then(canvas => {
				setImageDownload(canvas.toDataURL('image/png', 1.0));
			});
		}
	};

	// const lnurlPayUrl = encode(`${REACT_APP_API_ENDPOINT}/lnurl/pay?projectId=${id}`);
	const lnurlPayUrl = encode(`https://7fb8-80-113-228-11.ngrok.io/lnurl/pay?projectId=${id}`);

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

	const handleShare = () => {
		navigator.clipboard.writeText(`https://geyser.fund/project/${name}`);
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
					<Text fontSize="md" mr={2} py="8px">{getFormattedDate(date)}</Text>

					<Tooltip label={copy ? 'Copied!' : 'Copy Lightning Address'} placement="top" closeOnClick={false}>
						<Button leftIcon={<BoltIcon/>} my={isMobile ? 2 : 0} mr={2} border="1px solid #20ECC7" _hover={{backgroundColor: 'none'}} _active={{backgroundColor: 'brand.primary'}} bg="none" fontWeight="medium" onClick={handleAddressCopy} color="#2F423E">{name}@geyser.fund</Button>
					</Tooltip>

					<Tooltip label="View Campaign QR Code" placement="top">
						<IconButton mr={2} border="1px solid #20ECC7" _hover={{backgroundColor: 'none'}} _active={{backgroundColor: 'brand.primary'}} bg="none" icon={<QrIcon/>} aria-label="qr" onClick={() => {
							setCopy(false);
							onOpen();
							if (imageDownload.length === 0) {
								setTimeout(() => {
									capture();
								}, 1000);
							}
						}}/>
					</Tooltip>

					<Tooltip label={copy ? 'Copied!' : 'Share Campaign'} placement="top" closeOnClick={false}>
						<IconButton border="1px solid #20ECC7" _hover={{backgroundColor: 'none'}} _active={{backgroundColor: 'brand.primary'}} bg="none" icon={<ShareIcon/>} aria-label="share" onClick={handleShare}/>
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

			<Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={() => {
				setCopy(false);
				onClose();
			}} size={isMobile ? 'md' : 'xl'} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader><Text fontSize="3xl">Campaign QR code</Text></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text mb={5} fontWeight="medium">Lightning addresses and QR codes make it possible for anyone to fund campaigns from anywhere.</Text>

						<Box display="flex" w="100%" p={4} bg="brand.bgGrey" borderRadius="lg" id="lnaddress-qr">
							<ModalImage image={images[0]}/>

							<Box bg="brand.primary" w="50%" p={5} borderRightRadius="lg" display="flex" justifyContent="center" alignItems="center">
								<Box>
									<Text textAlign="center" fontWeight="bold" fontSize="1xl">{title}</Text>
									<Text textAlign="center" fontSize={isMobile ? '6px' : '10px'}>
										CONTRIBUTE TO THIS PROJECT WITH A LIGHTNING QR CODE OR LIGHTNING ADDRESS
									</Text>

									<Box display="flex" justifyContent="center" p={2} bgColor="#fff" borderRadius="lg" marginTop={2} marginBottom={2}>
										<QRCode
											qrStyle="dots"
											logoImage={LogoLight}
											eyeRadius={2}
											// removeQrCodeBehindLogo={true}
											bgColor="#fff"
											fgColor="#20ECC7"
											size={isMobile ? 121 : 186}
											value={lnurlPayUrl}
										/>
									</Box>
									<Box display="flex" justifyContent="center" alignItems="center" paddingTop={1}>
										<Text textAlign="center" fontWeight="bold" wordBreak="break-all" fontSize={isMobile ? '8px' : '12px'}>{name}@geyser.fund</Text>
									</Box>
								</Box>
							</Box>
						</Box>
					</ModalBody>
					<ModalFooter>
						<Box w="100%">
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
						</Box>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
