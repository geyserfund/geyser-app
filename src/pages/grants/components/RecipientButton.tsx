/* eslint-disable capitalized-comments */
import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {
	Text,	Modal, ModalOverlay, ModalContent, ModalHeader, Image, Box,
	ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input,
} from '@chakra-ui/react';
import Check from '../../../assets/check.svg';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { BiCopyAlt } from 'react-icons/bi';

import { VStack } from '@chakra-ui/layout';
import { ButtonComponent } from '../../../components/ui';
import { BubbleCursor } from './BubbleCursor';
import { isMobileMode, useNotification } from '../../../utils';

import {
	MUTATION_SUBMIT_GRANTEE,
} from '../../../graphql';
import { IProject } from '../../../interfaces';

export const RecipientButton = ({ project }: { project: IProject }) => {
	const isMobile = isMobileMode();
	const [step, setStep] = useState(0);
	const [grantee, setGrantee] = useState('');
	const [url, setUrl] = useState('');
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

	// Mutation to submit grantee
	const [submitGrantee] = useMutation(MUTATION_SUBMIT_GRANTEE);

	const handleSubmission = async () => {
		submitGrantee({
			variables: {
				projectId: project.id,
				name: grantee,
				url,
			},
		}).then(() => setStep(1)).catch(e => {
			toast({
				title: 'Something went wrong',
				description: e.message,
				status: 'error',
			});
		});
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
			{/* <ButtonComponent
				borderRadius="4px"
				backgroundColor="brand-bgGrey2"
				mb={2}
				onClick={onOpen}
			>
			Submit a potential recipient
			</ButtonComponent> */}

			{/* success modal */}
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<BubbleCursor/>
					<ModalHeader>Submit request for a  grant recipient</ModalHeader>
					<ModalCloseButton onClick={() => {
						setGrantee('');
						setUrl('');
						setStep(0);
						onClose();
					}} />
					<ModalBody>
						<Text>Drop below the name, and a Tweet or link that demonstrates the person or organization’s fit to receive this grant.</Text>
						<Text mt={5}>Name</Text>
						<Input
							name="name"
							placeholder="Recipient"
							focusBorderColor="#20ECC7"
							onChange={event => setGrantee(event.target.value)}
							isRequired={true}
						/>
						<Text mt={5}>Link</Text>
						<Input
							name="link"
							placeholder="https://twitter.com/metamick14"
							focusBorderColor="#20ECC7"
							onChange={event => setUrl(event.target.value)}
							value={url}
							isRequired={true}
						/>
					</ModalBody>
					<ModalFooter>
						<ButtonComponent
							primary width="100%"
							onClick={handleSubmission}
							disabled={url.length === 0 || grantee.length === 0}
						>Nominate</ButtonComponent>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);

	const renderSuccessModal = () => (
		<Modal onClose={onClose} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<BubbleCursor/>
				<ModalHeader textAlign="center">Success!</ModalHeader>
				<ModalCloseButton onClick={() => {
					setGrantee('');
					setUrl('');
					setStep(0);
					onClose();
				}} />
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
							<Image src={Check} />
						</Box>
						<Text py={5} textAlign="center"><b>{grantee}</b> has been added to the potential recipients!</Text><ButtonComponent
							standard
							primary={copy}
							leftIcon={copy ? <BiCopyAlt /> : <HiOutlineSpeakerphone />}
							width="100%"
							onClick={shareProjectWithfriends}
						>
							{copy ? 'Grant Link Copied' : 'Share grant with friends'}
						</ButtonComponent>
					</VStack>
				</ModalBody>
				<ModalFooter>
					<ButtonComponent primary width="100%" onClick={() => {
						setGrantee('');
						setUrl('');
						setStep(0);
						onClose();
					}} >Close</ButtonComponent>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);

	return (
		<>
			<ButtonComponent
				borderRadius="4px"
				backgroundColor="brand-bgGrey2"
				onClick={() => {
					console.log('STEP:', step);

					onOpen();
				}}
			>
			Submit a potential recipient
			</ButtonComponent>
			{ renderModal() }
		</>
	);
};
