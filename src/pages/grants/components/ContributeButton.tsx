/* eslint-disable radix */

import React, { useEffect, useState } from 'react';
import {
	Text,	Modal, ModalOverlay, ModalContent, ModalHeader, Box,
	ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input, Image, HStack, InputGroup, InputLeftElement, Link,
} from '@chakra-ui/react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { BiCopyAlt } from 'react-icons/bi';
import { CheckIcon } from '@chakra-ui/icons';
import { VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { isMediumScreen, useNotification } from '../../../utils';
import Loader from '../../../components/ui/Loader';
import { createCreatorRecord } from '../../../api';
import { commaFormatted } from '../../../utils/helperFunctions';
import { IProject } from '../../../interfaces';

interface ContributeButtonProps {
active: boolean,
title: string,
project: IProject
}

export const ContributeButton = ({active, title, project}:ContributeButtonProps) => {
	const [step, setStep] = useState(0);
	const [name, setName] = useState('');
	const [contact, setContact] = useState('');
	const [amount, setAmount] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const { toast } = useNotification();
	const isMedium = isMediumScreen();
	const initialRef = React.useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	// copy link
	const shareProjectWithfriends = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopy(true);
	};

	const [copy, setCopy] = useState(false);
	useEffect(() => {
		if (copy) {
			setTimeout(() => {
				setCopy(false);
			}, 2000);
		}
	}, [copy]);

	const handleConfirm = async () => {
		try {
			setSubmitting(true);
			const records = [{
				fields: {
					Name: name,
					Contact: contact,
					Type: [
						'Grant Contributor',
					],
				},
			}];
			await createCreatorRecord({records});
			setStep(1);
		} catch (_) {
			toast({
				title: 'Something went wrong',
				description: 'Please try again',
				status: 'error',
			});
		}

		setSubmitting(false);
	};

	const close = () => {
		setName('');
		setContact('');
		setAmount(0);
		setStep(0);
		onClose();
	};

	const renderModal = () => {
		if (step === 0) {
			return renderFormModal();
		}

		if (step === 1) {
			return renderSuccessModal();
		}
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
								<ButtonComponent onClick={() => setAmount(100)}>$100</ButtonComponent>
								<ButtonComponent onClick={() => setAmount(1000)}>$1000</ButtonComponent>
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
											setAmount(parseInt(event.target.value));
										}}
										value={amount}
										isRequired={true}
									/>
								</InputGroup>
							</HStack>
						</>
						}
					</ModalBody>
					<ModalFooter>
						{!submitting
						&& <ButtonComponent
							primary width="100%"
							onClick={handleConfirm}
							disabled={!amount || amount <= 0}
						>Confirm</ButtonComponent>}
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
						<Text pt={5}>You contributed <b>{`$${commaFormatted(amount)}`}</b> to <b>{project.title}.</b></Text>
						<Text>Check it out on the <Link isExternal href="" textDecoration="underline"><b>block explorer</b></Link>.</Text>
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

	return (

		<>
			<ButtonComponent
				disabled={!active}
				primary
				standard
				w={isMedium ? '300px' : '400px'}
				onClick={() => {
					onOpen();
				}}
			>
				{title}
			</ButtonComponent>
			{ renderModal() }
		</>
	);
};
