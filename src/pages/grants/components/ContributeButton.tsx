/* eslint-disable capitalized-comments */
import { RejectionError, WebLNProvider } from 'webln';
import { useMutation, useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import { QrInvoice } from './QrInvoice';
import { BubbleCursor } from './BubbleCursor';
import { PaymentSuccess } from './PaymentSuccess';
import { ButtonComponent, Linkin } from '../../../components/ui';
import Loader from '../../../components/ui/Loader';
import { SatoshiIcon } from '../../../components/icons';
import { REACT_APP_API_ENDPOINT } from '../../../constants';
import { SiTwitter } from 'react-icons/si';
import Icon from '@chakra-ui/icon';

import {
	MUTATION_FUND,
	QUERY_GET_FUNDING,
} from '../../../graphql';

import { fetchBitcoinRates } from '../../../api';
import { useNotification, validateFundingAmount, sha256 } from '../../../utils';
import { IDonationFundingInput, IFundingTx, IProject } from '../../../interfaces';
import { fundingStages, IFundingStages, stageList } from '../../../constants';

import {
	Text, HStack, Modal, ModalOverlay, ModalContent, NumberInput,
	ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Textarea,
	NumberInputField, NumberIncrementStepper, NumberInputStepper, NumberDecrementStepper, Box, Button, Link,
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

interface ContributeProps {
	project: IProject,
	confettiEffects: React.Dispatch<React.SetStateAction<boolean>>,
	buttonStyle: string,
	sats?: number,
	setSats?: React.Dispatch<React.SetStateAction<number>>,
	clearCloseButton?: React.Dispatch<React.SetStateAction<boolean>>,
}

export const ContributeButton = ({ project, confettiEffects, buttonStyle, sats, setSats, clearCloseButton }: ContributeProps) => {
	const [amount, setAmount] = useState(sats || 0);

	useEffect(() => {
		setAmount(sats || 0);
	}, [sats]);

	const [comment, setComment] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { toast } = useNotification();
	const [fundingTx, setFundingTx] = useState<IFundingTx>(initialFunding);
	const [fundState, setFundState] = useState<IFundingStages>(fundingStages.form);
	const [appearAs, setAppearAs] = useState('anonymous');

	const buttonType = buttonStyle;

	const handleCloseButton = () => {
		setFundState(fundingStages.form);
		setAmount(0);
		setComment('');
		clearInterval(fundInterval);

		if (setSats && clearCloseButton) {
			setSats(0);
			clearCloseButton(false);
		}

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
	}] = useMutation(MUTATION_FUND);

	const [getFunding, { data: fundData }] = useLazyQuery(QUERY_GET_FUNDING,
		{
			variables: { fundingTxId: fundingTx.id },
			fetchPolicy: 'network-only',
		},
	);

	// EFFECTS
	useEffect(() => {
		if (fundData && fundData.getFundingTx) {
			if (fundData.getFundingTx.status === 'paid') {
				confettiEffects(true);
				clearInterval(fundInterval);
				gotoNextStage();
			}
		}
	}, [fundData]);

	useEffect(() => {
		if (data && data.fundProject && data.fundProject.success && fundState !== fundingStages.started) {
			setFundingTx(data.fundProject.fundingTx);
			gotoNextStage();
		}
	}, [data]);

	useEffect(() => {
		if (fundState === fundingStages.completed || fundState === fundingStages.canceled) {
			clearInterval(fundInterval);
		}

		if (fundState === fundingStages.started) {
			const requestPayment = async () => {
				const { webln }: { webln: WebLNProvider } = window as any;
				if (!webln) {
					throw new Error('no provider');
				}

				await webln.enable();
				const { preimage } = await webln.sendPayment(fundingTx.paymentRequest);
				const paymentHash = await sha256(preimage);
				return paymentHash;
			};

			requestPayment().then(paymentHash => {
				// Check preimage
				if (paymentHash === fundingTx.invoiceId) {
					confettiEffects(true);
					gotoNextStage();
				} else {
					throw new Error('wrong preimage');
				}
			}).catch(error => {
				if (error.message === 'no provider') {
					//
				} else if (error.message === 'wrong preimage') {
					toast({
						title: 'Wrong payment preimage',
						description: 'The payment preimage returned by the WebLN provider did not match the payment hash.',
						status: 'error',
					});
				} else if (error.constructor === RejectionError || error.message === 'User rejected') {
					toast({
						title: 'Requested operation declined',
						description: 'Please use the invoice instead.',
						status: 'info',
					});
				} else {
					console.log(error);
					toast({
						title: 'Oops! Something went wrong with WebLN.',
						description: 'Please use the invoice instead.',
						status: 'error',
					});
				}

				fundInterval = setInterval(getFunding, 2000);
			});
		}
	}, [fundState]);

	const handleFund = async () => {
		try {
			// eslint-disable-next-line no-warning-comments
			// TODO: change the variables to an input of type IFundingInput
			const errorMessage = validateFundingAmount(amount, btcRate);
			if (errorMessage) {
				toast({
					title: 'Bad funding input',
					description: errorMessage,
					status: 'error',
				});
			}

			confettiEffects(false);
			setFundState(fundingStages.loading);

			const input: IDonationFundingInput = {
				projectId: Number(project.id),
				comment,
				donationAmount: amount,
				anonymous: appearAs === 'anonymous',
			};

			await fundProject({ variables: { input } });
			setFundState(fundingStages.form);
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
			{buttonType === 'main'
				? <ButtonComponent borderRadius="4px" backgroundColor="brand-bgGrey2" width="100%" my={3} onClick={onOpen}>
            Contribute to this grant
				</ButtonComponent> : 	<ButtonComponent primary margin="0 auto" onClick={() => {
					// setAmount();
					onOpen();
				}}>
					<Box display="flex" justifyContent="center" alignItems="center">Send <SatoshiIcon scale={0.8} mx={1}/> {sats}</Box>
				</ButtonComponent>}
			<Modal closeOnOverlayClick={false} onClose={handleCloseButton} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<BubbleCursor/>
					<ModalHeader textAlign="center">Comment and contribute</ModalHeader>
					<ModalCloseButton onClick={handleCloseButton} />
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
							min={0}
							isRequired={true}
							defaultValue={`${amount}`}
						>
							<NumberInputField placeholder={'sats'} />
							<NumberInputStepper id="increments">
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Text mt={5}>Comment (optional)</Text>
						<Textarea
							name="comment"
							onChange={event => setComment(event.target.value) }
							placeholder="Add a comment..."
							focusBorderColor="#20ECC7"
							resize="none"
							size="sm"
							rounded="md"
						/>
						<Box display="flex" justifyContent="center" alignItems="center" mt={4} border="2px solid #E9E9E9" rounded="md">
							<Button backgroundColor={appearAs === 'anonymous' ? '#E9E9E9' : 'white'} fontSize="xs" width="50%" rounded="none" onClick={() => setAppearAs('anonymous')} >Appear as anonymous</Button>
							<Linkin width="50%" href={`${REACT_APP_API_ENDPOINT}/auth/twitter`} display="flex" justifyContent="center" alignItems="center">
								<ButtonComponent width="100%" backgroundColor={appearAs === 'anonymous' ? 'white' : '#E9E9E9'} fontSize="xs" rounded="none" leftIcon={<Icon as={SiTwitter} />} onClick={() => setAppearAs('profile')}>Verify Twitter</ButtonComponent>
							</Linkin>
						</Box>
						<Text fontWeight="bold" mt={6}>Where do the funds go?</Text>
						<Text>The funds are secured by the Grant Board until they are sent to the selected projects at the end of the donation period.</Text>
					</ModalBody>
					<ModalFooter>
						<ButtonComponent
							primary
							width="100%"
							onClick={() => {
								if (clearCloseButton) {
									clearCloseButton(true);
								}

								handleFund();
							}}
							disabled={amount <= 0}
						>
            Contribute
						</ButtonComponent>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);

	const renderLoadingModal = () => (
		<Modal closeOnOverlayClick={false} onClose={handleCloseButton} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<BubbleCursor/>
				<ModalHeader textAlign="center">⚡ Creating invoice...</ModalHeader>
				<ModalBody>
					<Box py={10}>
						<Loader/>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);

	const renderInvoiceModal = () => (
		<Modal closeOnOverlayClick={false} onClose={handleCloseButton} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<BubbleCursor/>
				<ModalHeader textAlign="center">🌩️ Pay with lightning invoice</ModalHeader>
				<ModalCloseButton onClick={handleCloseButton} />
				<Text width="90%" fontSize="xs" margin="0 auto">Pay with any lightning wallet by scanning or copying the invoice below, or download the <Link isExternal href="https://getalby.com" textDecoration="underline">Alby</Link> extention to pay directly from your browser.</Text>
				<QrInvoice
					comment={fundingTx.comment}
					title={project.title}
					amount={fundingTx.amount}
					owners={project.owners.map(owner => owner.user.username)}
					qrCode={fundingTx.paymentRequest}
					handleCloseButton={handleCloseButton}
					invoiceCancelled={fundingTx.canceled}
				/>
			</ModalContent>
		</Modal>
	);

	const renderSuccessModal = () => (
		<Modal closeOnOverlayClick={false} onClose={handleCloseButton} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<BubbleCursor/>
				<ModalHeader textAlign="center">Success!</ModalHeader>
				<ModalCloseButton onClick={handleCloseButton} />
				<PaymentSuccess amount={fundingTx.amount} grant={project.title}/>
			</ModalContent>
		</Modal>
	);

	const renderModal = () => {
		switch (fundState) {
			case fundingStages.loading:
				return renderLoadingModal();

			case fundingStages.started:
				return renderInvoiceModal();

			case fundingStages.completed:
				return renderSuccessModal();

			default:
				return renderFormModal();
		}
	};

	return renderModal();
};
