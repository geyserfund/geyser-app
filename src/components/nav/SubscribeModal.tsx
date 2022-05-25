import React, { useState } from 'react';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	Link,
	IconButton,
	HStack,
	VStack} from '@chakra-ui/react';
import { ButtonComponent, TextBox } from '../ui';
import { createCreatorRecord } from '../../api';
import { useNotification, validateEmail } from '../../utils';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { GeyserTelegramUrl, GeyserTwitterUrl } from '../../constants';

    interface ISubscribeModal {
        isOpen: boolean;
        onClose: any
    }

export const SubscribeModal = ({isOpen, onClose}:ISubscribeModal) => {
	const { toast } = useNotification();

	const [submitting, setSubmitting] = useState(false);
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

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
			console.log('checking response value', value);
			setSubmitting(false);
			setSuccess(true);
			toast({
				title: 'Succesfully subscribed to geyser',
				status: 'success',
			});
		} catch (error) {
			console.log('checking error', error);
			toast({
				title: 'Something went wrong',
				description: 'Please try again',
				status: 'error',
			});
		}
	};

	const handleClose = () => {
		setSuccess(false);
		setEmail('');
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} isCentered>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="center" padding="20px 15px">
				<ModalHeader><Text fontSize="16px" fontWeight={600}>{success ? 'Success!' : 'Subscribe'}</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody width="100%">
					<VStack spacing="15px" width="100%">
						<Text>
							{success ? 'Thanks for signing up. We’ll be sharing more info about Geyser projects and product soon. To join our community find us on Telegram and Twitter.' : 'To get information on the latest Geyser projects and product, subscribe by dropping your email below'}
						</Text>
						{!success && <TextBox value={email} placeholder="Contact Email" onChange={handleEmail}/>}
						{error && <Text fontSize={'12px'}>{error}</Text>}
						{success
&& <HStack>
	<Link href={GeyserTwitterUrl} isExternal>
		<IconButton
			size="sm"
			background={'none'}
			aria-label="twitter"
			icon={<FaTwitter fontSize="20px" />}
			color={'brand.gray500'}
		/>
	</Link>
	<Link href={GeyserTelegramUrl} isExternal>
		<IconButton
			size="sm"
			background={'none'}
			aria-label="telegram"
			icon={<FaTelegramPlane fontSize="20px" />}
			color={'brand.gray500'}
		/>
	</Link>
</HStack>
						}
						<ButtonComponent isFullWidth primary onClick={success ? handleClose : handleConfirm} disabled={!email} isLoading={submitting}>
							{success ? 'Close' : 'Confirm'}
						</ButtonComponent>
					</VStack>

				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
