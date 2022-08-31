import { CloseIcon } from '@chakra-ui/icons';
import {
	Box,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useParams } from 'react-router';
import { DonationInput, DonationInputWithSatoshi } from '../../../../components/molecules';
import { ButtonComponent, IconButtonComponent, TextBox } from '../../../../components/ui';
import { colors } from '../../../../constants';
import { TMilestone } from '../types';

interface IAddMilestones {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (milestones: TMilestone[]) => void
	milestones: TMilestone[]
	isSatoshi: boolean;
	setIsSatoshi: React.Dispatch<React.SetStateAction<boolean>>
}

export const defaultMilestone = {
	name: '',
	projectId: '',
	description: '',
	amount: 0,
};

export const AddMilestones = ({isOpen, onClose, milestones: availableMilestones, onSubmit, isSatoshi, setIsSatoshi}:IAddMilestones) => {
	const params = useParams<{projectId: string}>();

	const [_milestones, _setMilestones] = useState<TMilestone[]>(availableMilestones);
	const milestones = useRef(_milestones);
	const setMilestones = (value: TMilestone[]) => {
		milestones.current = value;
		_setMilestones(value);
	};

	const [amountSatoshi, setAmountSatoshi] = useState(isSatoshi);

	const handleAddMilestone = () => {
		setMilestones([...milestones.current, defaultMilestone]);
	};

	const handleAmountChange = (value: any, itemIndex: number) => {
		const newMilestones = milestones.current.map((milestone, index) => {
			if (index === itemIndex) {
				return { ...milestone, amount: value};
			}

			return milestone;
		});

		setMilestones(newMilestones);
	};

	const handleTextChange = (event: any, itemIndex: number) => {
		if (event) {
			const newMilestones = milestones.current.map((milestone, index) => {
				if (index === itemIndex) {
					return { ...milestone, name: event.target.value};
				}

				return milestone;
			});

			setMilestones(newMilestones);
		}
	};

	const handleConfirmMilestone = () => {
		const filetMilestones = milestones.current.filter(milestone => milestone.amount > 0 && milestone.name);
		setIsSatoshi(amountSatoshi);
		onSubmit(filetMilestones);
		onClose();
	};

	const handleRemoveMilestone = (itemIndex: number) => {
		const newMilestones = milestones.current.filter((milestone, index) => index !== itemIndex);
		setMilestones(newMilestones);
	};

	console.log('checking milestones');
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="flex-start" padding="20px 0px" >
				<ModalHeader paddinX="20px"><Text fontSize="18px" fontWeight={600}>Select Milestones</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody width="100%" >
					<VStack
						width="100%"
						paddingBottom="20px"
						marginBottom="20px"
						borderBottom="1px solid"
						borderBottomColor={colors.gray300}
						maxHeight="600px" overflowY="auto"
						spacing="15px"
					>
						{
							milestones.current.map((milestone, index) => (
								<VStack key={index} width="100%" alignItems="flex-start">
									<HStack justifyContent="space-between" width="100%">
										<Text marginTop="10px" marginBottoim="5px">{`Milestone ${index + 1}`}</Text>
										<ButtonComponent
											size="xs"
											padding="7px"
											rounded="full"
											onClick={() => handleRemoveMilestone(index)}
										>
											<CloseIcon fontSize="10px"/>
										</ButtonComponent>
									</HStack>
									<TextBox
										placeholder ={`milestone ${index + 1}...`}
										value={milestone.name}
										onChange={(event: any) => handleTextChange(event, index)}
									/>
									<DonationInputWithSatoshi
										amountSatoshi={amountSatoshi}
										onChangeSatoshi={setAmountSatoshi}
										value={milestone.amount}
										onChange={(_:any, value: number) => handleAmountChange(value, index)}
									/>
								</VStack>
							))
						}
					</VStack>
					<VStack spacing="10px">
						<ButtonComponent isFullWidth onClick={handleAddMilestone}>Add a milestone</ButtonComponent>
						<ButtonComponent isFullWidth primary onClick={handleConfirmMilestone}>Confirm</ButtonComponent>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

