import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';
import { ButtonComponent, Linkin } from '../ui';

interface IRequiredLoginModal {
	isOpen: boolean;
	onClose: () => void;
	handleClick: () => void
}

export const RequiredLoginModal = ({isOpen, onClose, handleClick}: IRequiredLoginModal) => {
	const history = useHistory();

	console.log('checking required Auth Modal');
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent paddingX="10px" marginX="10px">
				<ModalHeader textAlign="center" fontSize="16px" >Oops! Looks like you are not logged in</ModalHeader>
				<ModalBody fontSize="12px" textAlign="justify">
					The page you are trying to access required authorization.
				</ModalBody>

				<ModalFooter width="100%">
					<VStack width="100%">
						<ButtonComponent isFullWidth onClick={() => history.push('/')}>Go to home</ButtonComponent>
						<ButtonComponent primary isFullWidth onClick={handleClick}>Login to continue</ButtonComponent>
					</VStack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
