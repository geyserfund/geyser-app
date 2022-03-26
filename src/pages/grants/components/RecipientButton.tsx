import React, { useState } from 'react';
import { Text,	Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from '@chakra-ui/react';
import { ButtonComponent } from '../../../components/ui';
import { BubbleCursor } from './BubbleCursor';

export const RecipientButton = () => {
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
						<BubbleCursor/>
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
					<BubbleCursor/>
					<ModalHeader textAlign="center">Success!</ModalHeader>
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
