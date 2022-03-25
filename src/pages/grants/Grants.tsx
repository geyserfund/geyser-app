import React, { useState } from 'react';
import { Box, Text, HStack, Link, Image, Avatar, Button, VStack, Show, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Input, Textarea } from '@chakra-ui/react';
import { Footer } from '../../components/molecules';
import { ButtonComponent } from '../../components/ui';
import Bubble from '../../assets/bubble.svg';
import Mick from '../../assets/mick.svg';
import Secondl1ght from '../../assets/secondl1ght.svg';
import Stelios from '../../assets/stelios.jpg';
import Saz from '../../assets/saz.jpg';
import Kraken from '../../assets/kraken.svg';
import WalletOfSat from '../../assets/walletofsat.svg';
import Qr from '../../assets/qr.svg';
import Confetti from '../../assets/confetti.svg';
import { SatoshiIcon, ArrowDownIcon, ArrowUpIcon } from '../../components/icons';
import { createUseStyles } from 'react-jss';
import { isMobileMode, isMediumScreen } from '../../utils';

const useStyles = createUseStyles({
	potentialRecipients: {
		'&:hover': {
			textDecoration: 'none',
			backgroundColor: '#F6F6F6',
		},
	},
});

const ContributeButton = () => {
	const [step, setStep] = useState(0);
	const [amount, setAmount] = useState(0);
	const { isOpen, onOpen, onClose } = useDisclosure();

	if (step === 0) {
		return (
			<>
				<ButtonComponent
					borderRadius="4px"
					backgroundColor="brand-bgGrey2"
					width="100%"
					my={3}
					onClick={onOpen}
				>
        Contribute to this grant
				</ButtonComponent>

				<Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Comment and contribute</ModalHeader>
						<ModalCloseButton onClick={() => setAmount(0)} />
						<ModalBody>
							<HStack>
								<Text>Amount</Text>
								<SatoshiIcon/>
							</HStack>
							<NumberInput
								name="amount"
								onChange={valueString => setAmount(parseInt(valueString, 10))}
								inputMode="numeric"
								focusBorderColor="#20ECC7"
								min={1}
								isRequired={true}
							>
								<NumberInputField placeholder={'sats'} />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
							<Text mt={5}>Comment</Text>
							<Textarea
								name="comment"
								placeholder="Add a comment..."
								focusBorderColor="#20ECC7"
								resize="none"
								size="sm"
							/>
							<Text fontWeight="bold" mt={10}>Where do the funds go?</Text>
							<Text>Geyser will custody the grant funds until the recepients are established.</Text>
						</ModalBody>
						<ModalFooter>
							<ButtonComponent
								primary
								width="100%"
								onClick={() => setStep(1)}
								disabled={amount <= 0}
							>
              Contribute
							</ButtonComponent>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		);
	}

	if (step === 1) {
		return (
			<>
				<ButtonComponent
					borderRadius="4px"
					backgroundColor="brand-bgGrey2"
					width="100%"
					my={3}
					onClick={onOpen}
				>
				Contribute to this grant
				</ButtonComponent>

				<Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Pay with lightning invoice</ModalHeader>
						<ModalCloseButton onClick={() => {
							setStep(0);
							setAmount(0);
							onClose();
						}} />
						<ModalBody>
							<Image src={Qr} margin="0 auto"/>
							<Text mt={5}>Amount (sats)</Text>
							<NumberInput
								name="amount"
								disabled
								value={amount}
							>
								<NumberInputField backgroundColor="grey" />
							</NumberInput>
						</ModalBody>
						<ModalFooter>
							<ButtonComponent primary width="100%" onClick={() => setStep(2)}>Pay</ButtonComponent>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		);
	}

	if (step === 2) {
		return (
			<>
				<ButtonComponent
					borderRadius="4px"
					backgroundColor="brand-bgGrey2"
					width="100%"
					my={3}
					onClick={onOpen}
				>
				Contribute to this grant
				</ButtonComponent>

				<Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Success!</ModalHeader>
						<ModalCloseButton onClick={() => {
							setStep(0);
							setAmount(0);
							onClose();
						}} />
						<ModalBody>
							<Image src={Confetti} margin="0 auto" width="100%"/>
						</ModalBody>
						<ModalFooter>
							<ButtonComponent primary width="100%" onClick={() => {
								setStep(0);
								setAmount(0);
								onClose();
							}}>Close</ButtonComponent>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		);
	}

	return (
		<>
		</>
	);
};

const RecipientButton = () => {
	const [step, setStep] = useState(0);
	const [recipient, setRecipient] = useState('');
	const [link, setLink] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();

	const addRecipient = (event:React.ChangeEvent<HTMLInputElement>) => setRecipient(event.target.value);

	const addLink = (event:React.ChangeEvent<HTMLInputElement>) => setLink(event.target.value);

	if (step === 0) {
		return (
			<>
				<ButtonComponent
					borderRadius="4px"
					backgroundColor="brand-bgGrey2"
					mb={2}
					onClick={onOpen}
				>
				Submit a potential recipient
				</ButtonComponent>

				<Modal onClose={onClose} isOpen={isOpen} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Submit request for a  grant recipient</ModalHeader>
						<ModalCloseButton onClick={() => {
							setRecipient('');
							setLink('');
							onClose();
						}} />
						<ModalBody>
							<Text>Drop below the name, and a Tweet or link that demonstrates the person or organization’s fit to receive this grant.</Text>
							<Text mt={5}>Name</Text>
							<Input
								name="name"
								placeholder="Recipient"
								focusBorderColor="#20ECC7"
								onChange={addRecipient}
								isRequired={true}
							/>
							<Text mt={5}>Link</Text>
							<Input
								name="link"
								placeholder="https://twitter.com/metamick14"
								focusBorderColor="#20ECC7"
								onChange={addLink}
								value={link}
								isRequired={true}
							/>
						</ModalBody>
						<ModalFooter>
							<ButtonComponent primary width="100%" onClick={() => setStep(1)} disabled={link.length === 0 || recipient.length === 0}>Nominate</ButtonComponent>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		);
	}

	return (
		<>
			<ButtonComponent
				borderRadius="4px"
				backgroundColor="brand-bgGrey2"
				mb={2}
				onClick={onOpen}
			>
			Submit a potential recipient
			</ButtonComponent>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Success</ModalHeader>
					<ModalCloseButton onClick={() => {
						setRecipient('');
						setLink('');
						setStep(0);
						onClose();
					}} />
					<ModalBody>
						<Text>You nominated <b>{recipient}</b> to become a potential grant recipient.</Text>
					</ModalBody>
					<ModalFooter>
						<ButtonComponent primary width="100%" onClick={() => {
							setRecipient('');
							setLink('');
							setStep(0);
							onClose();
						}} >Close</ButtonComponent>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export const Grants = () => {
	const isMobile = isMobileMode();
	const isMedium = isMediumScreen();
	const classes = useStyles();

	return (
		<>
			<Box height={{xl: '100vh'}} id="top">
				<Box display="flex" justifyContent="center" alignItems="center" height={{xl: '85vh'}}>
					<Box
						display={isMedium ? 'block' : 'flex'}
						justifyContent="space-between"
						alignItems="center"
						width={isMobile ? '100%' : '75%'}
						margin="0 auto"
						px={[2, 100]}
					>

						{/* bubble section */}
						<Box mt={{base: 10, xl: 0}}>

							<Box border="1px solid lightgrey" borderRadius="full" p={[20, 50]} width={{base: '75%', md: '50%', xl: '100%'}} margin="0 auto">
								<Image src={Bubble} w={{md: '90%'}} margin="0 auto" cursor="pointer"/>
							</Box>

							<Text fontSize="lg" fontWeight="bold" textAlign={isMedium ? 'center' : 'left'} color="brand.primary" mt={5}>Grant open</Text>
							<Box display="flex" justifyContent="center">
								<Box display={isMobile ? 'block' : 'flex'} justifyContent="center" my={4}>
									<HStack spacing="10px" mr={10}>
										<SatoshiIcon/><Text fontSize="lg"><b>23,000</b> received</Text>
									</HStack>
									<Text fontSize="lg" textAlign={isMobile ? 'right' : 'left'}><b>213</b> donations</Text>
								</Box>
							</Box>

						</Box>

						{/* grant info */}
						<Box width={{xl: '40%'}}>
							<Text fontSize="4xl" fontWeight="bold">Bitcoin Hackathons</Text>
							<Text color="brand.primary" fontWeight="bold" fontSize="lg">Supporting Bitcoin hackathons focused on on-chain and lightning applications.</Text>
							<HStack my={2} spacing="10px">
								<Text bg="brand.bgGrey" px={5} py={1} borderRadius="lg">#001</Text>
								<Text bg="brand.bgGrey" px={5} py={1} borderRadius="lg">Hackathons</Text>
								<Text bg="brand.bgGrey" px={5} py={1} borderRadius="lg">Building</Text>
							</HStack>
							<Text>Created <b>23-Mar-2022</b></Text>
							<HStack my={1} flexWrap="wrap" spacing="10px">
								<Text>The Board:</Text>
								<Link href="https://twitter.com/metamick14" isExternal fontSize="sm" color="brand.primary" fontWeight="bold">@metamick14</Link>
								<Link href="https://twitter.com/steliosats" isExternal fontSize="sm" color="brand.primary" fontWeight="bold">@steliosats</Link>
								<Link href="https://twitter.com/sajald77" isExternal fontSize="sm" color="brand.primary" fontWeight="bold">@sajald77</Link>
								<Link href="https://twitter.com/secondl1ght" isExternal fontSize="sm" color="brand.primary" fontWeight="bold">@secondl1ght</Link>
							</HStack>
							<Text>The aim of this grant is to support Bitcoin development through fast iterative hackathon sessions. The funds donated to this grant will be given out to award winners of Bitcoin Hackathons in the month of March and April 2022. The sum will be distributed among different projects and this information will be shared on this page. Geyser will charge no fees.</Text>
							<ContributeButton/>
						</Box>
					</Box>
				</Box>

				{/* arrow icons */}
				<Show above="xl">
					<Box display="flex" justifyContent="center">
						<Link href="#bottom">
							<Button bg="none" border="1px solid lightgrey">
								<ArrowDownIcon/>
							</Button>
						</Link>
					</Box>
				</Show>
			</Box>

			<Box id="bottom" pt={10}></Box>
			<Box height={{xl: '100vh'}} py={{base: 20, xl: 0}} >
				<Show above="xl">
					<Box display="flex" justifyContent="center">
						<Link href="#top">
							<Button bg="none" border="1px solid lightgrey">
								<ArrowUpIcon/>
							</Button>
						</Link>
					</Box>
				</Show>

				{/* donation, sponsor, recipient sections */}
				<VStack justifyContent="center" alignItems="center" height={{xl: '85vh'}} spacing="50px">

					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">Most recent donations</Text>
						<HStack flexWrap="wrap" spacing={['0px', '15px']}>
							<Link href="" isExternal>
								<Avatar w={['40px', '60px']} h={['40px', '60px']} src={Mick} />
							</Link>
							<Link href="" isExternal>
								<Avatar w={['40px', '60px']} h={['40px', '60px']} src={Stelios} />
							</Link>
							<Link href="" isExternal>
								<Avatar w={['40px', '60px']} h={['40px', '60px']} src={Saz} />
							</Link>
							<Link href="" isExternal>
								<Avatar w={['40px', '60px']} h={['40px', '60px']} src={Secondl1ght} />
							</Link>
						</HStack>
					</Box>

					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">Sponsors</Text>
						<HStack flexWrap="wrap" spacing={['0px', '15px']}>
							<Link href="" isExternal>
								<Avatar w={['40px', '60px']} h={['40px', '60px']} src={Kraken} />
							</Link>
							<Link href="" isExternal>
								<Avatar w={['40px', '60px']} h={['40px', '60px']} src={WalletOfSat} />
							</Link>
						</HStack>
					</Box>

					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">Potential recipients</Text>
						<HStack flexWrap="wrap" spacing={['0px', '15px']}>
							<RecipientButton/>
							<Link href="" isExternal className={classes.potentialRecipients} border="2px solid lightgrey" borderRadius="md">
								<Text textDecoration="underline" textDecorationThickness="3px" textDecorationColor="brand.bgGreyDark" px={6} py={2} fontWeight="bold">bolt-fun</Text>
							</Link>
							<Link href="" isExternal className={classes.potentialRecipients} border="2px solid lightgrey" borderRadius="md">
								<Text textDecoration="underline" textDecorationThickness="3px" textDecorationColor="brand.bgGreyDark" px={6} py={2} fontWeight="bold">pleb.labs</Text>
							</Link>
						</HStack>
					</Box>

				</VStack>
			</Box>

			{/* footer */}
			<Footer/>
		</>
	);
};
