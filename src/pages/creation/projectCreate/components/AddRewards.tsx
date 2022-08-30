import {
	Box,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
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
import { AiOutlineUpload } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { useParams } from 'react-router';
import { SatoshiIcon, SatoshiIconTilted } from '../../../../components/icons';
import { DonationInput, DonationInputWithSatoshi, FileUpload } from '../../../../components/molecules';
import { ButtonComponent, ImageWithReload, TextArea, TextBox } from '../../../../components/ui';
import { colors, GeyserAssetDomainUrl } from '../../../../constants';
import { TRewards } from '../types';

interface IAddRewards {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (rewards: TRewards) => void
	rewards?: TRewards;
	isSatoshi: boolean;
	setIsSatoshi: React.Dispatch<React.SetStateAction<boolean>>
}

export const defaultReward = {
	name: '',
	projectId: '',
	description: '',
	cost: 0,
	image: '',
};

export const AddRewards = ({isOpen, onClose, rewards: availableReward, onSubmit, isSatoshi, setIsSatoshi}:IAddRewards) => {
	const [_rewards, _setRewards] = useState<TRewards>(availableReward || defaultReward);
	const rewards = useRef(_rewards);
	const setRewards = (value: TRewards) => {
		rewards.current = value;
		_setRewards(value);
	};

	useEffect(() => {
		if (availableReward && availableReward !== rewards.current) {
			setRewards(availableReward);
		}
	}, [availableReward]);

	const handleAmountChange = (value: any) => {
		setRewards({...rewards.current, cost: value});
	};

	const handleTextChange = (event: any) => {
		if (event) {
			const {name, value} = event.target;
			if (name) {
				setRewards({...rewards.current, [name]: value});
			}
		}
	};

	const handleConfirmReward = () => {
		const id = rewards.current.id || new Date().toISOString();
		onSubmit({...rewards.current, id});
		onClose();
	};

	const handleUpload = (url: string) => {
		setRewards({...rewards.current, image: `${GeyserAssetDomainUrl}${url}`});
	};

	console.log('checking rewards');
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
			<ModalOverlay />
			<ModalContent display="flex" alignItems="flex-start" padding="20px 0px" >
				<ModalHeader paddinX="20px"><Text fontSize="18px" fontWeight={600}>Add a Reward</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody width="100%" >
					<VStack
						width="100%"
						paddingBottom="20px"
						marginBottom="20px"
						maxHeight="600px" overflowY="auto"
						alignItems="flex-start"
						spacing="10px"
						paddingX="2px"
					>
						<VStack width="100%" alignItems="flex-start">
							<Text>Name</Text>
							<TextBox
								placeholder ={'T - Shirt ...'}
								value={rewards.current.name}
								name="name"
								onChange={handleTextChange}
							/>
						</VStack>

						<VStack width="100%" alignItems="flex-start">
							<Text>Description</Text>
							<TextArea
								placeholder ={' ...'}
								value={rewards.current.description}
								name="description"
								onChange={handleTextChange}
							/>
						</VStack>

						<VStack width="100%" alignItems="flex-start">
							<FileUpload onUploadComplete={handleUpload} >
								{
									rewards.current.image
										? <HStack justifyContent="center">
											<ImageWithReload borderRadius="4px" src={rewards.current.image} maxHeight="200px"/>
										</HStack>
										: <HStack
											borderRadius="4px"
											backgroundColor="brand.bgGrey"
											width="100%"
											height="70px"
											justifyContent="center"
											alignItems="center"
											_hover={{backgroundColor: 'brand.gray300'}}
										>
											<AiOutlineUpload />
											<Text>Add image</Text>
										</HStack>
								}
							</FileUpload>
						</VStack>
						<VStack width="100%" alignItems="flex-start">
							<Text>Cost of reward</Text>
							<InputGroup>
								<InputLeftAddon>
									{
										isSatoshi ? <SatoshiIconTilted /> : <BiDollar />
									}
								</InputLeftAddon>
								<Input
									focusBorderColor="brand.primary"
									name="cost"
									type="number"
									onChange={handleTextChange}
								/>
							</InputGroup>
							{/* <DonationInputWithSatoshi
								amountSatoshi={isSatoshi}
								onChangeSatoshi={setIsSatoshi}
								value={rewards.current.cost}
								onChange={(_:any, value: number) => handleAmountChange(value)}
							/> */}
						</VStack>

					</VStack>
					<VStack spacing="10px">
						<ButtonComponent isFullWidth primary onClick={handleConfirmReward}>Confirm</ButtonComponent>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

