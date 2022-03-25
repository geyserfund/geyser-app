/* eslint-disable capitalized-comments */
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import {
	Box, Text, HStack, Link, Image, Avatar, Button, VStack, Show,
	Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
	ModalBody, ModalCloseButton, useDisclosure, Input,
} from '@chakra-ui/react';

import { Footer } from '../../components/molecules';
import { ButtonComponent } from '../../components/ui';
import { ContributeButton } from './ContributeButton';

import Bubble from '../../assets/bubble.svg';
import { SatoshiIcon, ArrowDownIcon, ArrowUpIcon } from '../../components/icons';
import { createUseStyles } from 'react-jss';
import { getDaysAgo, isMobileMode, isMediumScreen } from '../../utils';
import useWindowSize from 'react-use/lib/useWindowSize';
// import { QUERY_GET_PROJECT } from '../../graphql';
import { IProject, IGrantee } from '../../interfaces';

const useStyles = createUseStyles({
	potentialRecipients: {
		'&:hover': {
			textDecoration: 'none',
			backgroundColor: '#F6F6F6',
		},
	},
});

interface ContributeProps {
	confettiEffects: React.Dispatch<React.SetStateAction<boolean>>
}

const ContributeButton = ({ confettiEffects }: ContributeProps) => {
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
						<ModalHeader textAlign="center">Comment and contribute</ModalHeader>
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
								onClick={() => {
									confettiEffects(false);
									setStep(1);
								}}
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
						<ModalHeader textAlign="center">Pay with lightning invoice</ModalHeader>
						<ModalCloseButton onClick={() => {
							setStep(0);
							setAmount(0);
							onClose();
						}} />
						<ModalBody>
							<Image src="" margin="0 auto"/>
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
							<ButtonComponent primary width="100%" onClick={() => {
								setStep(2);
								confettiEffects(true);
							}}>Pay</ButtonComponent>
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
						<ModalHeader textAlign="center">Success!</ModalHeader>
						<ModalCloseButton onClick={() => {
							setStep(0);
							setAmount(0);
							onClose();
						}} />
						<ModalBody>
							<Text textAlign="center" fontSize="50px">🎉</Text>
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
					<ModalHeader textAlign="center">Success</ModalHeader>
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

const ClickableAvatar = ({ url, imageUrl }: { url: string, imageUrl: string }) => {
	console.log('IMAGEURL: ', imageUrl);
	return (
		<Link href={url} isExternal>
			<Avatar w={['40px', '60px']} h={['40px', '60px']} src={imageUrl} />
		</Link>
	);
};

const Grantee = ({ grantee }: { grantee: IGrantee }) => {
	const classes = useStyles();
	console.log('URL: ', grantee.url);
	return (
		<Link href={grantee.url} isExternal className={classes.potentialRecipients} border="2px solid lightgrey" borderRadius="md" display="flex" justifyContent="center" alignItems="center" pl={5}>
			<Text textDecoration="underline" textDecorationThickness="3px" textDecorationColor="brand.bgGreyDark" px={6} py={2} fontWeight="bold">{grantee.name}</Text>
		</Link>
	);
};

export const Grants = ({ project }: { project: IProject }) => {
	const isMobile = isMobileMode();
	const isMedium = isMediumScreen();
	const [arrowChange, setArrowChange] = useState(false);
	const [confetti, setConfetti] = useState(false);
	const { width, height } = useWindowSize();
	const { owners, funders, sponsors, grantees } = project;

	return (
		<>
			{confetti && <Confetti
				width={width}
				height={height}
				recycle={false}
				numberOfPieces={2100}
				tweenDuration={100000}
			/>}
			<Box id="top">
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
									<HStack spacing="10px" mr={isMobile ? 0 : 10}>
										<SatoshiIcon/><Text fontSize="lg"><b>{project.balance}</b> received</Text>
									</HStack>
									<Text fontSize="lg" textAlign={isMobile ? 'right' : 'left'}><b>{project.funders.length}</b> donations</Text>
								</Box>
							</Box>

						</Box>

						{/* grant info */}
						<Box width={{xl: '40%'}}>
							<Text fontSize="4xl" fontWeight="bold">{project.title}</Text>
							<Text color="brand.primary" fontWeight="bold" fontSize="lg">Supporting Bitcoin hackathons focused on on-chain and lightning applications.</Text>
							<HStack my={2} spacing="10px">
								<Text bg="brand.bgGrey" px={5} py={1} borderRadius="lg">#001</Text>
								<Text bg="brand.bgGrey" px={5} py={1} borderRadius="lg">Hackathons</Text>
								<Text bg="brand.bgGrey" px={5} py={1} borderRadius="lg">Building</Text>
							</HStack>
							<Text>Created <b>{`${getDaysAgo(project.createdAt)} ago`}</b></Text>
							<HStack my={1} flexWrap="wrap" spacing="10px">
								<Text>The Board:</Text>
								<Box>
									{
										owners.map(owner => (
											<Link
												key={owner.user.id}
												href={`https://twitter.com/${owner.user.twitterHandle}`}
												isExternal
												fontSize="sm"
												color="brand.primary"
												fontWeight="bold"
											>@{ owner.user.twitterHandle } </Link>
										))
									}
								</Box>
							</HStack>
							<Text>{project.description}</Text>
							<ContributeButton project={project}/>
						</Box>
					</Box>
				</Box>
			</Box>

			{/* arrow icon */}
			<Show above="xl">
				<Box display="flex" justifyContent="center">
					<Link href={arrowChange ? '#bottom' : '#top'}>
						<Button bg="none" border="1px solid lightgrey" onClick={() => setArrowChange(!arrowChange)}>
							{ arrowChange ? <ArrowUpIcon/> : <ArrowDownIcon/> }
						</Button>
					</Link>
				</Box>
			</Show>

			{/* donation, sponsor, recipient sections */}
			<Box id="bottom"></Box>
			<Box py={20}>
				<VStack justifyContent="center" alignItems="center" spacing="50px">

					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">Most recent donations</Text>
						<HStack flexWrap="wrap" spacing={['0px', '15px']}>
							{
								funders.map(funder => (
									<ClickableAvatar
										key={funder.user.id}
										url={`https://twitter.com/${funder.user.twitterHandle}`}
										imageUrl={funder.user.imageUrl}
									/>
								))
							}
						</HStack>
					</Box>

					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">Sponsors</Text>
						<HStack flexWrap="wrap" spacing={['0px', '15px']}>
							{
								sponsors.map(sponsor => (
									<ClickableAvatar
										key={sponsor.user.id}
										url={`https://twitter.com/${sponsor.user.twitterHandle}`}
										imageUrl={sponsor.user.imageUrl}
									/>
								))
							}
						</HStack>
					</Box>

					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">Potential recipients</Text>
						<HStack flexWrap="wrap" spacing={['0px', '15px']}>
							<RecipientButton/>
							{
								grantees.map(grantee => <Grantee key={grantee.id} grantee={grantee}/>)
							}
						</HStack>
					</Box>

				</VStack>
			</Box>

			{/* footer */}
			<Footer/>
		</>
	);
};
