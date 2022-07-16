import { Avatar, Box, HStack, Text, VStack, Image, Button, IconButton, Tooltip, Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody, useDisclosure,
	ModalCloseButton } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IParticipant, IProjectDetail } from '../../../interfaces';
import { ButtonComponent } from '../../../components/ui';
import ReactPlayer from 'react-player';
import { isMobileMode, getFormattedDate, encode } from '../../../utils';
import { useStyles } from './styles';
import { QrIcon } from '../../../components/icons';
import { CopyIcon } from '@chakra-ui/icons';
import QRCode from 'react-qr-code';
import { REACT_APP_API_ENDPOINT } from '../../../constants';

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
			<VStack spacing="15px" alignItems="flex-start">
				<HStack alignItems="center">
					<Link to={`/profile/${owner.user.id}`}>
						<Avatar width="50px" height="50px" name={owner.user.username} src={owner.user.imageUrl} />
					</Link>

					<Link to={`/profile/${owner.user.id}`}>
						<Text fontSize="18px" _hover={{ textdecoration: 'underline', fontWeight: 500 }}>
							{owner.user.username}
						</Text>
					</Link>
				</HStack>

				<Box display={isMobile ? 'block' : 'flex'}>
					<Text w={isMobile ? '70%' : 'auto'} textAlign="center" fontSize="md" bg="brand.bgGrey3" px={isMobile ? 0 : 4} py="8px" rounded="md">{getFormattedDate(date)}</Text>

					<Tooltip hasArrow label={copy ? 'Copied!' : 'Copy Lightning Address'} placement="top" closeOnClick={false} bg="brand.primary" color="black">
						<Button my={isMobile ? 2 : 0} mx={isMobile ? 0 : 2} display="block" bg="brand.bgGrey3" fontWeight="medium" onClick={handleAddressCopy}>{name}@geyser.fund</Button>
					</Tooltip>

					<IconButton bg="brand.bgGrey3" icon={<QrIcon/>} aria-label="qr" onClick={onOpen}/>
				</Box>

				<VStack spacing="10px">
					<Image src={images[0]} w="100%" borderRadius="md"/>

					<Text fontSize="3xl" fontWeight="bold" textAlign="left" w="100%">{owner.user.username}</Text>

					{problem && <Text w="100%" fontSize="lg" fontWeight="medium">{problem}</Text>}

					<Text w="100%" fontSize="lg" fontWeight="medium">{idea}</Text>
				</VStack>

				{podcast && <Box width="100%" mt={10}>
					<ReactPlayer className={classes.podcastContainer} height="200px" width="100%" url={podcast.podcast} />
				</Box>}
			</VStack>

			<Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader><Text fontSize="3xl">Project QR code</Text></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text mb={5} fontWeight="medium">Lightning addresses and QR codes make it possible for anyone to fund projects from anywhere.</Text>

						<Box display={isMobile ? 'block' : 'flex'} w="100%" bg="brand.bgGrey" p={5} borderRadius="lg">
							<Image borderLeftRadius={isMobile ? '' : 'lg'} borderTopRadius={isMobile ? 'lg' : ''} borderTopLeftRadius="lg" src={images[0]} w={isMobile ? '100%' : '50%'} objectFit="cover"/>

							<Box bg="brand.primary" w={isMobile ? '100%' : '50%'} p={5} borderRightRadius={isMobile ? '' : 'lg'} borderBottomRadius={isMobile ? 'lg' : ''} borderBottomRightRadius="lg" display="flex" justifyContent="center" alignItems="center">
								<Box cursor="pointer" onClick={handleAddressCopy}>
									<Box display="flex" justifyContent="center">
										<QRCode bgColor="#20ECC7" size={isMobile ? 121 : 186} value={lnurlPayUrl} />
									</Box>

									<Text mt={2} fontSize="xs" color="brand.textGrey" textAlign="center">⚡ LIGHTNING ADDRESS</Text>

									<Text fontSize="xs" fontWeight="medium" wordBreak="break-all" textAlign="center">{name}@geyser.fund</Text>
								</Box>
							</Box>
						</Box>
					</ModalBody>
					<ModalFooter>
						<ButtonComponent w="100%" primary onClick={handleAddressCopy}>
							<CopyIcon mr={2}/> {copy ? 'Copied!' : 'Copy'}
						</ButtonComponent>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
