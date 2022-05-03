import React, { useState } from 'react';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack} from '@chakra-ui/react';
import { ButtonComponent, TextBox } from '../ui';
import { createCreatorRecord } from '../../api';
import { useNotification, validateEmail } from '../../utils';

    interface ISubscribeModal {
        isOpen: boolean;
        onClose: any
    }

export const SubscribeModal = ({isOpen, onClose}:ISubscribeModal) => {
	const { toast } = useNotification();

	const [submitting, setSubmitting] = useState(false);
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	const handleEmail = (event:any) => {
		if (error) {
			setError('');
		}

		setEmail(event.target.value);
	};

	const handleConfirm = async () => {
		const res = validateEmail(email);
		console.log('checking res', res);
		if (!res) {
			setError('please enter a valid email address');
			return;
		}

		try {
			setSubmitting(true);
			const records = [{
				fields: {
					Email: email,
					Type: [
						'Subscriber',
					],
				},
			}];
			const value = await createCreatorRecord({records});
			console.log('checking repsonse value', value);
		} catch (error) {
			console.log('checking error', error);
			toast({
				title: 'Something went wrong',
				description: 'Please try again',
				status: 'error',
			});
		}

		setSubmitting(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="center" padding="20px 15px">
				<ModalHeader><Text fontSize="16px" fontWeight={600}>Subscribe</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody width="100%">
					<VStack spacing="15px" width="100%">
						<Text>
            To get information on the latest Geyser projects and product, subscribe by dropping your email below
						</Text>
						<TextBox value={email} placeholder="Contact Email" onChange={handleEmail}/>
						{error && <Text fontSize={'12px'}>{error}</Text>}
						<ButtonComponent isFullWidth primary onClick={handleConfirm} disabled={!email} isLoading={submitting}>
                             Confirm
						</ButtonComponent>
					</VStack>

				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
