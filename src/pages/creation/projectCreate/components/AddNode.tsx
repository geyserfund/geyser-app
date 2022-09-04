import {
	Checkbox,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ButtonComponent, TextArea, TextBox } from '../../../../components/ui';
import { isMobileMode } from '../../../../utils';
import { checkMacaroonPermissions } from '../../../../utils/checkMacaroonPermissions';
import { TNodeInput } from '../types';

interface IAddNode {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (_: TNodeInput) => void;
	node?: TNodeInput;
}

export const defaultNode = {
	name: '',
	isVoltage: false,
	hostname: '',
	publicKey: '',
	invoiceMacaroon: '',
	tlsCert: '',
	grpc: '',
};

export const AddNode = ({isOpen, onClose, node, onSubmit }:IAddNode) => {
	const params = useParams<{projectId: string}>();

	const isMobile = isMobileMode();

	const [isVoltage, setIsVoltage] = useState(false);
	const [form, setForm] = useState<TNodeInput>(node || defaultNode);
	const [formError, setFormError] = useState<any>({});

	const handleTextChange = (event: any) => {
		setFormError({});
		if (event) {
			const {name, value} = event.target;
			if (name) {
				setForm({...form, [name]: value});
			}
		}
	};

	const handleIsVoltage = (event: any) => {
		setFormError({});
		if (event) {
			setIsVoltage(event.target.checked);
		}
	};

	const handleSubmit = () => {
		const isValid = validateForm();
		if (isValid) {
			onSubmit(form);
			onClose();
		}
	};

	const validateForm = () => {
		const errors: any = {};
		let isValid = true;

		const additionalText = ' is a required field';

		if (!form.name) {
			errors.name = 'Node name' + additionalText;
			isValid = false;
		}

		if (!form.hostname) {
			errors.hostname = 'Host name' + additionalText;
			isValid = false;
		}

		if (!form.publicKey) {
			errors.publicKey = 'Public Key' + additionalText;
			isValid = false;
		}

		if (!form.invoiceMacaroon) {
			errors.invoiceMacaroon = 'Invoice Macaroon' + additionalText;
			isValid = false;
		} else {
			const val = checkMacaroonPermissions(form.invoiceMacaroon);
			if (val) {
				errors.invoiceMacaroon = val;
				isValid = false;
			}
		}

		if (!isVoltage && !form.tlsCert) {
			errors.tlsCert = 'TLS certificate' + additionalText;
			isValid = false;
		}

		if (!isVoltage && !form.grpc) {
			errors.grpc = 'gRPC port' + additionalText;
			isValid = false;
		}

		if (!isValid) {
			setFormError(errors);
		}

		return isValid;
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size={isMobile ? 'sm' : 'md'} isCentered>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="flex-start" padding="20px 0px" >
				<ModalHeader paddingX="20px"><Text fontSize="18px" fontWeight={600}>Add a Node</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody width="100%" >
					<VStack
						width="100%"
						paddingBottom="20px"
						marginBottom="20px"
						maxHeight="600px" overflowY="auto"
						spacing="15px"
						paddingX="2px"
					>
						<VStack width="100%" alignItems="flex-start">
							<Text>
								Node Name
							</Text>
							<TextBox
								name="name"
								onChange={handleTextChange}
								value={form.name}
								error={formError.name}
							/>
						</VStack>
						<VStack width="100%" alignItems="flex-start">
							<Checkbox size="lg" colorScheme="green" isChecked={isVoltage} onChange={handleIsVoltage}>
								<Text>This is a voltage Node</Text>
							</Checkbox>
						</VStack>
						<VStack width="100%" alignItems="flex-start">
							<Text>
								Hostname or IP address
							</Text>
							<TextBox
								name="hostname"
								onChange={handleTextChange}
								value={form.hostname}
								error={formError.hostname}
							/>
						</VStack>
						<VStack width="100%" alignItems="flex-start">
							<Text>
								Public key
							</Text>
							<TextBox
								name="publicKey"
								onChange={handleTextChange}
								value={form.publicKey}
								error={formError.publicKey}
							/>
						</VStack>
						<VStack width="100%" alignItems="flex-start">
							<Text>
								Invoice Macaroon
							</Text>
							<TextArea
								name="invoiceMacaroon"
								onChange={handleTextChange}
								value={form.invoiceMacaroon}
								error={formError.invoiceMacaroon}
							/>
						</VStack>
						{!isVoltage
						&& <>
							<VStack width="100%" alignItems="flex-start">
								<Text>
									TLS certificate
								</Text>
								<TextBox
									name="tlsCert"
									onChange={handleTextChange}
									value={form.tlsCert}
									error={formError.tlsCert}
								/>
							</VStack>
							<VStack width="100%" alignItems="flex-start">
								<Text>
									gRPC port
								</Text>
								<TextBox
									name="grpc"
									onChange={handleTextChange}
									value={form.grpc}
									error={formError.grpc}
								/>
							</VStack>
						</>}
					</VStack>
					<VStack spacing="10px">
						<ButtonComponent isFullWidth primary onClick={handleSubmit}>Confirm</ButtonComponent>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

