/* eslint-disable capitalized-comments */

import React, { useEffect, useState } from 'react';
import {
	Text,	Modal, ModalOverlay, ModalContent, ModalHeader, Box,
	ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input, Textarea,
} from '@chakra-ui/react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { BiCopyAlt } from 'react-icons/bi';
import { CheckIcon } from '@chakra-ui/icons';
import { VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { isMobileMode, isMediumScreen, useNotification } from '../../../utils';
import Loader from '../../../components/ui/Loader';
import { createCreatorRecord } from '../../../api';

interface RecipientButtonProps {
page: string,
active: boolean,
title: string,
}

export const RecipientButton = ({page, active, title}:RecipientButtonProps) => {
	const isMobile = isMobileMode();
	const isMedium = isMediumScreen();
	const [step, setStep] = useState(0);
	const [grantee, setGrantee] = useState('');
	const [description, setDescription] = useState('');
	const [url, setUrl] = useState('');
	const [contact, setContact] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const { toast } = useNotification();

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

	const handleSubmission = async () => {
		try {
			setSubmitting(true);
			const records = [{
				fields: {
					Name: grantee,
					Description: description,
					Link: url,
					Contact: contact,
					Type: [
						'Grant Applicant',
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
		setGrantee('');
		setDescription('');
		setUrl('');
		setContact('');
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
			<Modal onClose={close} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontWeight="bold" fontSize="2xl">{submitting ? 'Applying' : 'Apply'}</ModalHeader>
					<ModalCloseButton onClick={close} />
					<ModalBody>
						{submitting ? <Loader/> : <>
							<Text fontWeight="bold" fontSize="md">Are you currently working on a project that supports Bitcoin education in emerging countries? Apply to this grant to receive a donation.</Text>
							<Text mt={5} fontWeight="bold">What’s your project or initiative called?</Text>
							<Input
								name="name"
								placeholder="Bitcoin for Fairness"
								focusBorderColor="#20ECC7"
								onChange={event => setGrantee(event.target.value)}
								value={grantee}
								isRequired={true}
							/>
							<Text mt={5} fontWeight="bold">How are you supporting Bitcoin Education in emerging markets?</Text>
							<Textarea
								name="description"
								placeholder="Teaching young Africans the basics about Bitcoin."
								focusBorderColor="#20ECC7"
								onChange={event => setDescription(event.target.value)}
								value={description}
								isRequired={true}
							/>
							<Text mt={5} fontWeight="bold">Where can we find more information about your project or initiative? Drop a link to your project, whether it’s on Geyser or elsewhere</Text>
							<Input
								name="link"
								placeholder="https://geyser.fund/project/bitcoin-for-fairness"
								focusBorderColor="#20ECC7"
								onChange={event => setUrl(event.target.value)}
								value={url}
								isRequired={true}
							/>
							<Text mt={5} fontWeight="bold">Your email/contact info</Text>
							<Input
								name="contact"
								placeholder="anita@geyser.fund"
								focusBorderColor="#20ECC7"
								onChange={event => setContact(event.target.value)}
								value={contact}
								isRequired={true}
							/>
						</>
						}
					</ModalBody>
					<ModalFooter>
						{!submitting
						&& <ButtonComponent
							primary width="100%"
							onClick={handleSubmission}
							disabled={grantee.length === 0 || description.length === 0 || url.length === 0 || contact.length === 0}
						>Submit</ButtonComponent>}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);

	const renderSuccessModal = () => (
		<Modal onClose={close} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center">Success!</ModalHeader>
				<ModalCloseButton onClick={close} />
				<ModalBody>
					<VStack
						padding={isMobile ? '10px 10px' : '10px 20px'}
						spacing="12px"
						width="100%"
						height="100%"
						overflowY="hidden"
						position="relative"
						alignItems="center"
						justifyContent="center"
					>
						<Box bg="brand.primary" borderRadius="full" width="100px" height="100px" display="flex" justifyContent="center" alignItems="center">
							<CheckIcon w={10} h={10}/>
						</Box>
						<Text py={5} textAlign="center"><b>{grantee}</b> has applied to receive this <b>Geyser Grant</b>.</Text>
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
				w={page === 'grants' ? isMedium ? '300px' : '400px' : '100%'}
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
