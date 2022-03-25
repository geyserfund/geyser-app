/* eslint-disable capitalized-comments */
import { useMutation, useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';

// import Confetti from '../../assets/confetti.svg';
import { QrPage } from '../project/Activity/QrPage';
import { SuccessPage } from '../project/Activity/SuccessPage';
import { ButtonComponent } from '../../components/ui';
import { SatoshiIcon } from '../../components/icons';

import {
	MUTATION_FUND_PROJECT,
	QUERY_GET_FUNDING,
} from '../../graphql';

import { fetchBitcoinRates } from '../../api';
import { useNotification, validateFundingAmount } from '../../utils';
import { IFundingTx, IProject } from '../../interfaces';
import { fundingStages, IFundingStages, stageList } from '../../constants';

import {
	Text, HStack, Modal, ModalOverlay, ModalContent, NumberInput,
	ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input,
	NumberInputField, NumberIncrementStepper, NumberInputStepper, NumberDecrementStepper,
} from '@chakra-ui/react';

const initialFunding = {
	id: '',
	invoiceId: '',
	status: 'unpaid',
	amount: 0,
	paymentRequest: '',
	address: '',
	canceled: false,
	comment: '',
	paidAt: '',
	onChain: false,
};

let fundInterval: any;

// if (fundState === fundingStages.form) {

export const ContributeButton = ({ project }: { project: IProject }) => {
	const [amount, setAmount] = useState(0);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { toast } = useNotification();
	const [fundingTx, setFundingTx] = useState<IFundingTx>(initialFunding);
	const [fundState, setFundState] = useState<IFundingStages>(fundingStages.form);

	const handleCloseButton = () => {
		setFundState(fundingStages.form);
		onClose();
	};

	const gotoNextStage = () => {
		const currentIndex = stageList.indexOf(fundState);
		const nextState = stageList[currentIndex + 1];
		setFundState(nextState);
	};

	/*
    * BTC RATE LOGIC
    */
	const [btcRate, setBtcRate] = useState(0);
	useEffect(() => {
		getBitcoinRates();
	}, []);

	const getBitcoinRates = async () => {
		const response: any = await fetchBitcoinRates();
		const satoshirate = response.rates.USD * 0.00000001;
		setBtcRate(satoshirate);
	};

	/*
    * FUNDING LOGIC
    */
	// STATES
	const [fundProject, {
		data,
		// Loading: fundLoading,
	}] = useMutation(MUTATION_FUND_PROJECT);

	const [getFunding, { data: fundData }] = useLazyQuery(QUERY_GET_FUNDING,
		{
			variables: { fundingTxId: fundingTx.id },
			fetchPolicy: 'network-only',
		},
	);

	// EFFECTS
	useEffect(() => {
		if (fundData && fundData.getFundingTx) {
			console.log('FUND DATA: ', fundData);

			if (fundData.getFundingTx.status === 'paid') {
				clearInterval(fundInterval);
				gotoNextStage();
			}
		}
	}, [fundData]);

	useEffect(() => {
		if (data && data.fundProject && data.fundProject.success && fundState !== fundingStages.started) {
			console.log('FUNDING DATA: ', data.fundProject);
			setFundingTx(data.fundProject.fundingTx);
			gotoNextStage();
		}
	}, [data]);

	useEffect(() => {
		if (fundState === fundingStages.completed || fundState === fundingStages.canceled) {
			clearInterval(fundInterval);
		}

		if (fundState === fundingStages.started) {
			console.log(fundState);

			fundInterval = setInterval(getFunding, 2000);
		}
	}, [fundState]);

	const handleFund = async () => {
		try {
			// TODO: change the variables to an input of type IFundingInput
			const errorMessage = validateFundingAmount(amount, btcRate);
			if (errorMessage) {
				toast({
					title: 'Bad funding input',
					description: errorMessage,
					status: 'error',
				});
			}

			await fundProject({
				variables: {
					input: {
						projectId: project.id,
						donationAmount: amount,
					},
				},
			});
			gotoNextStage();
		} catch (_) {
			toast({
				title: 'Something went wrong',
				description: 'Please refresh the page and try again',
				status: 'error',
			});
		}
	};

	/*
    *   MODALS
    */

	const renderFormModal = () => (
		<>
			<ButtonComponent borderRadius="4px" backgroundColor="brand-bgGrey2" width="100%" my={3} onClick={onOpen}>
            Contribute to this grant
			</ButtonComponent>
			<Modal closeOnOverlayClick={false} onClose={handleCloseButton} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Comment and contribute</ModalHeader>
					<ModalCloseButton onClick={() => setAmount(0)} />
					<ModalBody>
						<HStack>
							<Text>Amount</Text>
							<SatoshiIcon/>
						</HStack>
						<NumberInput
							name="amount"
							onChange={valueString => setAmount(parseInt(valueString, 10))}
							inputMode="numeric"
							focusBorderColor="#20ECC7"
							min={1}
							isRequired={true}
						>
							<NumberInputField placeholder={'sats'} />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Text mt={5}>Comment</Text>
						<Input
							name="comment"
							placeholder="Add a comment..."
							focusBorderColor="#20ECC7"
							py={10}
						/>
						<Text fontWeight="bold" mt={10}>Where do the funds go?</Text>
						<Text>Geyser will custody the grant funds until the recepients are established.</Text>
					</ModalBody>
					<ModalFooter>
						<ButtonComponent
							primary
							width="100%"
							onClick={() => handleFund()}
							disabled={amount <= 0}
						>
                        Contribute
						</ButtonComponent>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);

	const renderInvoiceModal = () => (
		<Modal closeOnOverlayClick={false} onClose={handleCloseButton} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Pay with lightning invoice</ModalHeader>
				<ModalCloseButton onClick={handleCloseButton} />
				<QrPage
					comment={fundingTx.comment}
					title={project.title}
					amount={fundingTx.amount}
					owners={project.owners.map(owner => owner.user.username)}
					qrCode={fundingTx.paymentRequest}
					handleCloseButton={handleCloseButton}
				/>
			</ModalContent>
		</Modal>
	);

	const renderSuccessModal = () => (
		<Modal closeOnOverlayClick={false} onClose={handleCloseButton} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Pay with lightning invoice</ModalHeader>
				<ModalCloseButton onClick={handleCloseButton} />
				<SuccessPage amount={fundingTx.amount} handleCloseButton={handleCloseButton} />;
			</ModalContent>
		</Modal>
	);

	const renderModal = () => {
		switch (fundState) {
			case fundingStages.started:
				return renderInvoiceModal();

			case fundingStages.completed:
				return renderSuccessModal();

			default:
				return renderFormModal();
		}
	};

	return renderModal();

	// A if (step === 2) {
	// 	return (
	// 		<>
	// 			<ButtonComponent
	// 				borderRadius="4px"
	// 				backgroundColor="brand-bgGrey2"
	// 				width="100%"
	// 				my={3}
	// 				onClick={onOpen}
	// 			>
	// 			Contribute to this grant
	// 			</ButtonComponent>

	// 			<Modal closeOnOverlayClick={false} onClose={handleCloseButton} isOpen={isOpen} isCentered>
	// 				<ModalOverlay />
	// 				<ModalContent>
	// 					<ModalHeader>Success!</ModalHeader>
	// 					<ModalCloseButton onClick={() => {
	// 						setStep(0);
	// 						setAmount(0);
	// 						onClose();
	// 					}} />
	// 					<ModalBody>
	// 						<Image src={Confetti} margin="0 auto" width="100%"/>
	// 					</ModalBody>
	// 					<ModalFooter>
	// 						<ButtonComponent primary width="100%" onClick={() => {
	// 							setStep(0);
	// 							setAmount(0);
	// 							onClose();
	// 						}}>Close</ButtonComponent>
	// 					</ModalFooter>
	// 				</ModalContent>
	// 			</Modal>
	// 		</>
	// 	);
	// }

	// return (
	// 	<>
	// 	</>
	// );
};
