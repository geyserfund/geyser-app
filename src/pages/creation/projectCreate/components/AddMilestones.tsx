import { useMutation } from '@apollo/client';
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
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { DonationInputWithSatoshi } from '../../../../components/molecules';
import { ButtonComponent, TextBox } from '../../../../components/ui';
import { colors } from '../../../../constants';
import { MUTATION_CREATE_PROJECT_MILESTONE, MUTATION_DELETE_PROJECT_MILESTONE, MUTATION_UPDATE_PROJECT_MILESTONE } from '../../../../graphql/mutations';
import { useNotification } from '../../../../utils';
import { TMilestone } from '../types';

interface IAddMilestones {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (milestones: TMilestone[]) => void
	milestones: TMilestone[]
	isSatoshi: boolean;
	setIsSatoshi: React.Dispatch<React.SetStateAction<boolean>>
	projectId?: number;
}

export const defaultMilestone = {
	name: '',
	projectId: 0,
	description: '',
	amount: 0,
};

export const AddMilestones = ({isOpen, projectId, onClose, milestones: availableMilestones, onSubmit, isSatoshi, setIsSatoshi}:IAddMilestones) => {
	const {toast} = useNotification();

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

		try {
			filetMilestones.map(async milestone => {
				const createMilestoneInput = {
					...milestone,
					projectId,

				};
				if (milestone.id) {
					await updateMilestone({variables: {input: {
						projectMilestoneId: milestone.id,
						name: milestone.name,
						description: milestone.description,
						amount: milestone.amount,
					}}});
				} else {
					await createMilestone({variables: {input: createMilestoneInput}});
				}
			});
		} catch (error) {
			toast({
				title: 'Something went wrong',
				description: 'Please try again.',
				status: 'error',
			});
		}

		onSubmit(filetMilestones);
		onClose();
	};

	const handleRemoveMilestone = async (itemIndex: number) => {
		const currentMilestone = milestones.current.find((milestone, index) => index === itemIndex);
		const newMilestones = milestones.current.filter((milestone, index) => index !== itemIndex);

		if (currentMilestone && currentMilestone.id) {
			try {
				await removeMilestone({variables: {projectMilestoneId: currentMilestone.id}});
				setMilestones(newMilestones);
			} catch (error) {
				toast({
					title: 'Something went wrong',
					description: `${error}`,
					status: 'error',
				});
			}
		} else {
			setMilestones(newMilestones);
		}
	};

	const [createMilestone, {
		loading: createMilestoneLoading,
	}] = useMutation(MUTATION_CREATE_PROJECT_MILESTONE);

	const [updateMilestone, {
		loading: updateMilestoneLoading,
	}] = useMutation(MUTATION_UPDATE_PROJECT_MILESTONE);

	const [removeMilestone, {
		loading: removeMilestoneLoading,
	}] = useMutation(MUTATION_DELETE_PROJECT_MILESTONE);

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="flex-start" padding="20px 0px" >
				<ModalHeader paddingX="20px"><Text fontSize="18px" fontWeight={600}>Select Milestones</Text></ModalHeader>
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
								<VStack key={index} width="100%" alignItems="flex-start" paddingX="2px">
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
										placeholder ={'title ...'}
										value={milestone.name}
										onChange={(event: any) => handleTextChange(event, index)}
									/>
									<DonationInputWithSatoshi
										amountSatoshi={amountSatoshi}
										onChangeSatoshi={setAmountSatoshi}
										value={milestone.amount || undefined}
										onChange={(_:any, value: number) => handleAmountChange(value, index)}
									/>
								</VStack>
							))
						}
					</VStack>
					<VStack spacing="10px">
						<ButtonComponent isFullWidth onClick={handleAddMilestone}>Add a milestone</ButtonComponent>
						<ButtonComponent
							isFullWidth
							primary
							isLoading={createMilestoneLoading || updateMilestoneLoading || removeMilestoneLoading}
							onClick={handleConfirmMilestone}
						>
								Confirm
						</ButtonComponent>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

