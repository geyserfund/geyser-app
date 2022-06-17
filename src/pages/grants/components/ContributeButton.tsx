/* eslint-disable radix */

import React, { useEffect, useState } from 'react';
import {
	Text,	Modal, ModalOverlay, ModalContent, ModalHeader, Box,
	ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input, Image, HStack, InputGroup, InputLeftElement, Link,
} from '@chakra-ui/react';
import QRCode from 'react-qr-code';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { BiCopyAlt } from 'react-icons/bi';
import { CheckIcon } from '@chakra-ui/icons';
import { VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { isMediumScreen, useNotification } from '../../../utils';
import Loader from '../../../components/ui/Loader';
import { createCreatorRecord } from '../../../api';
import { commaFormatted } from '../../../utils/helperFunctions';
import { IProject, IFundingInput } from '../../../interfaces';
import { useFundingFlow } from '../../../hooks';
import { fundingStages } from '../../../constants';
import { RiLinksLine, RiLinkUnlinkM } from 'react-icons/ri';
import { useBtcContext } from '../../../context/btc';

interface ContributeButtonProps {
active: boolean,
title: string,
project: IProject
}

export const ContributeButton = ({active, title, project}:ContributeButtonProps) => {
	const [name, setName] = useState('');
	const [contact, setContact] = useState('');
	const [contributeAmount, setContributeAmount] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState(false);
	const [copy, setCopy] = useState(false);
	const { toast } = useNotification();
	const isMedium = isMediumScreen();
	const initialRef = React.useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {btcRate} = useBtcContext();
	const {fundState, fundingTx, gotoNextStage, resetFundingFlow, requestFunding} = useFundingFlow({ hasWebLN: true });

	const shareProjectWithfriends = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopy(true);
	};

	useEffect(() => {
		if (copy) {
			setTimeout(() => {
				setCopy(false);
			}, 2000);
		}
	}, [copy]);

	const { address } = fundingTx;

	const getOnchainAddress = () => {
		const bitcoins = (parseInt((contributeAmount / btcRate).toFixed(0))) / 100000000;
		return `bitcoin:${address}?amount=${bitcoins}`;
	};

	const handleCopyOnchain = () => {
		navigator.clipboard.writeText(getOnchainAddress());
		setCopy(true);
	};

	const handleFund = async () => {
		const input: IFundingInput = {
			projectId: Number(project.id),
			anonymous: true,
			donationInput: { donationAmount: parseInt((contributeAmount / btcRate).toFixed(0)) },
		};
		requestFunding(input);
	};

	const handleConfirm = async () => {
		if ((parseInt((contributeAmount / btcRate).toFixed(0))) > 15000000) {
			setMessage(true);
		} else if (contributeAmount === 0) {
			toast({
				title: 'Payment below 1 sats is not allowed at the moment.',
				description: 'Please update the amount.',
				status: 'error',
			});
		} else {
			try {
				setSubmitting(true);

				if (name || contact) {
					const records = [{
						fields: {
							Title: name,
							fldGla9o00ogzrquw: contact,
							Type: [
								'Subscriber',
							],
							fldOWbMeUVrRjXrYu: ['Geyser Grants'],
							Grant: project.title,
							fldNsoC4hNwXXYBUZ: contributeAmount,
							Notes: 'Contributor',
						},
					}];
					await createCreatorRecord({records});
				}

				handleFund();
			} catch (_) {
				toast({
					title: 'Something went wrong',
					description: 'Please try again',
					status: 'error',
				});
				setSubmitting(false);
			}
		}
	};

	const close = () => {
		setName('');
		setContact('');
		setContributeAmount(0);
		setSubmitting(false);
		setMessage(false);
		resetFundingFlow();
		onClose();
	};

	const renderFormModal = () => (
		<>
			<Modal onClose={close} isOpen={isOpen} isCentered initialFocusRef={initialRef}>
				<ModalOverlay />
				<ModalContent>
					<HStack p={6}>
						<Image src={project.media[0]} alt="icon" rounded="lg" w="100px" mr={1}/>
						<Box>
							<ModalHeader fontWeight="bold" fontSize="2xl" p={0}>Contribute</ModalHeader>
							<Text textAlign="justify">Contribute to this cause to support the Bitcoin ecosystem. Geyser will custody the funds until the recipients are established and then distribute the funds to the best applicants. Donations are non-refundable and not tax deductible.</Text>
						</Box>
					</HStack>
					<ModalCloseButton onClick={close} />
					<ModalBody>
						{submitting ? <Loader/> : <>
							<HStack><Text fontWeight="bold">Name / Nym</Text> <Text>(optional)</Text></HStack>
							<Input
								name="name"
								placeholder="Satoshi"
								focusBorderColor="#20ECC7"
								onChange={event => setName(event.target.value)}
								value={name}
							/>
							<HStack mt={5}><Text fontWeight="bold">Email / Contact</Text> <Text>(optional)</Text></HStack>
							<Input
								name="contact"
								placeholder="satoshi@geyser.fund"
								focusBorderColor="#20ECC7"
								onChange={event => setContact(event.target.value)}
								value={contact}
							/>
							<Text mt={5} fontWeight="bold">Amount</Text>
							<HStack>
								<ButtonComponent onClick={() => {
									setMessage(false);
									setContributeAmount(100);
								}}>$100</ButtonComponent>
								<ButtonComponent onClick={() => {
									setMessage(false);
									setContributeAmount(1000);
								}}>$1000</ButtonComponent>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										fontWeight="bold"
									>
									$
									</InputLeftElement>
									<Input
										ref={initialRef}
										name="amount"
										type="number"
										placeholder="0"
										focusBorderColor="#20ECC7"
										fontWeight="bold"
										onChange={event => {
											if (message) {
												setMessage(false);
											}

											if (parseInt(event.target.value, 10) > 0) {
												setContributeAmount(parseInt(event.target.value, 10));
											} else {
												setContributeAmount(0);
											}
										}}
										value={contributeAmount <= 0 ? '' : contributeAmount}
										isRequired={true}
									/>
								</InputGroup>
							</HStack>
							{message && <Text textAlign="justify" mt={5}>Payment above 15,000,000 sats is not allowed at the moment. Please update the amount, or contact us for donating a higher amount</Text>}
						</>
						}
					</ModalBody>
					<ModalFooter>
						{!submitting
						&& <ButtonComponent
							primary width="100%"
							onClick={handleConfirm}
							disabled={!contributeAmount || contributeAmount <= 0 || submitting || message}
						>Confirm</ButtonComponent>}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);

	const renderPaymentModal = () => (
		<>
			<Modal onClose={close} isOpen={isOpen} isCentered>
				<ModalOverlay/>
				<ModalContent>
					<HStack p={6}>
						<Image src={project.media[0]} alt="icon" rounded="lg" w="100px" mr={1}/>
						<Box>
							<ModalHeader fontWeight="bold" fontSize="2xl" p={0}>Contribute</ModalHeader>
							<Text textAlign="justify">Contribute to this cause to support the Bitcoin ecosystem. Geyser will custody the funds until the recipients are established and then distribute the funds to the best applicants. Donations are non-refundable and not tax deductible.</Text>
						</Box>
					</HStack>
					<ModalCloseButton onClick={close} />
					<ModalBody>
						<Text textAlign="center" fontWeight="bold" fontSize="md">Contribute using Bitcoin on-chain</Text>
						<Box display="flex" justifyContent="center" alignItems="center" pt="15px" cursor="pointer" w="186px" h="186px" margin="0 auto">
							<QRCode size={186} value={getOnchainAddress()} onClick={handleCopyOnchain}/>
						</Box>
						<Text paddingTop="15px" textAlign="center" color="brand.primary" fontWeight="bold">Waiting for payment...</Text>
					</ModalBody>
					<ModalFooter>
						<ButtonComponent
							isFullWidth
							primary={copy}
							onClick={handleCopyOnchain}
							leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
						>
							{!copy ? 'Copy Address' : 'Address Copied'}
						</ButtonComponent>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);

	const renderSuccessModal = () => (
		<Modal onClose={close} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontWeight="bold" fontSize="2xl" textAlign="center">Successful contribution!</ModalHeader>
				<ModalCloseButton onClick={close} />
				<ModalBody>
					<VStack mb={6}>
						<Box bg="brand.primary" borderRadius="full" width="75px" height="75px" display="flex" justifyContent="center" alignItems="center">
							<CheckIcon w={10} h={10}/>
						</Box>
						<Text pt={5}>You contributed <b>{`$${commaFormatted(contributeAmount)}`}</b> to <b>{project.title}.</b></Text>
						<Text>Check it out on the <Link isExternal href={`https://mempool.space/address/${address}`} textDecoration="underline"><b>block explorer</b></Link>.</Text>
					</VStack>
					<ButtonComponent
						standard
						primary={copy}
						leftIcon={copy ? <BiCopyAlt /> : <HiOutlineSpeakerphone />}
						width="100%"
						onClick={shareProjectWithfriends}
					>
						{copy ? 'Grant Link Copied' : 'Share grant with friends'}
					</ButtonComponent>
				</ModalBody>
				<ModalFooter>
					<ButtonComponent primary width="100%" onClick={close}>Close</ButtonComponent>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);

	const renderModal = () => {
		console.log('FUND STATE', fundState);

		switch (fundState) {
			case fundingStages.initial:
				return null;
			case fundingStages.form:
				return renderFormModal();
			case fundingStages.started:
				return renderPaymentModal();
			case fundingStages.completed:
				return renderSuccessModal();
			default:
				return null;
		}
	};

	return (
		<>
			<ButtonComponent
				disabled={!active}
				primary
				standard
				w={isMedium ? '300px' : '400px'}
				onClick={() => {
					onOpen();
					gotoNextStage();
				}}
			>
				{title}
			</ButtonComponent>
			{renderModal()}
		</>
	);
};
