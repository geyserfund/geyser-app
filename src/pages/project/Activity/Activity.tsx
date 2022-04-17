import React, { useContext, useEffect, useState } from 'react';
import { RejectionError, WebLNProvider } from 'webln';
import { ConnectTwitter } from '../../../components/molecules';
import { Card } from '../../../components/ui';
import {
	IFundingTx,
	IProject,
	IProjectFunding,
	IRewardFundingInput,
	IDonationFundingInput,
	IFundingAmounts,
} from '../../../interfaces';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { MUTATION_FUND, MUTATION_FUND_WITH_REWARD, QUERY_PROJECT_FUNDING_DATA } from '../../../graphql';
import { QUERY_GET_FUNDING } from '../../../graphql';
import { SuccessPage } from './SuccessPage';
import { QrPage } from './QrPage';
import { isDarkMode, isMobileMode, useNotification, sha256 } from '../../../utils';
import { PaymentPage } from './PaymentPage';
import { AuthContext } from '../../../context';
import Loader from '../../../components/ui/Loader';
import { useDisclosure } from '@chakra-ui/react';
import classNames from 'classnames';
import { useStyles } from './styles';
import { InfoPage } from './InfoPage';
import { fundingStages, IFundingStages, stageList } from '../../../constants';
import {useFundState} from '../../../hooks';
import { useBtcContext } from '../../../context/btc';

interface IActivityProps {
	project: IProject
	detailOpen: boolean
	setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
}

let fundInterval: any;

const initialAmounts = {
	total: 0,
	donationAmount: 0,
	shippingCost: 0,
	rewardsCost: 0,
};

const initialFunding = {
	id: '',
	uuid: '',
	invoiceId: '',
	status: 'unpaid',
	amount: 0,
	paymentRequest: '',
	address: '',
	canceled: false,
	comment: '',
	paidAt: '',
	onChain: false,
	funder: {
		amountFunded: 0,
		timesFunded: 0,
		confirmed: false,
		confirmedAt: '',
		badges: [],
	},
};

const Activity = ({ project, detailOpen, setDetailOpen }: IActivityProps) => {
	const { user } = useContext(AuthContext);

	const {btcRate} = useBtcContext();
	const { toast } = useNotification();
	const isDark = isDarkMode();
	const isMobile = isMobileMode();

	const [fundState, setFundState] = useState<IFundingStages>(fundingStages.initial);

	console.log('PROJECT REWARDS:', project.rewards);

	const {state, setTarget, setState, updateReward, resetForm} = useFundState({rewards: project.rewards});

	const [fundingTx, setFundingTx] = useState<IFundingTx>({ ...initialFunding, funder: { ...initialFunding.funder, user } });
	const [amounts, setAmounts] = useState<IFundingAmounts>(initialAmounts);
	const [fundingTxs, setFundingTxs] = useState<IProjectFunding[]>([]);
	const { isOpen: twitterisOpen, onOpen: twitterOnOpen, onClose: twitterOnClose } = useDisclosure();
	const [fadeStarted, setFadeStarted] = useState(false);

	const classes = useStyles({ isMobile, detailOpen, fadeStarted });

	const { loading: loadingFundingData, error, data: fundingData } = useQuery(
		QUERY_PROJECT_FUNDING_DATA,
		{
			variables: { where: { id: project.id } },
		},
	);

	const [fundProject, {
		data, loading: fundLoading,
	}] = project.type === 'reward' ? useMutation(MUTATION_FUND_WITH_REWARD) : useMutation(MUTATION_FUND);

	const [getFunding, { data: funding, loading }] = useLazyQuery(QUERY_GET_FUNDING,
		{
			variables: { id: fundingTx.id },
			fetchPolicy: 'network-only',
		},
	);

	useEffect(() => {
		if (fundingData && fundingData.project.fundingTxs) {
			setFundingTxs(fundingData.project.fundingTxs);
		}
	}, [fundingData]);

	useEffect(() => {
		if (loadingFundingData) {
			setFundState(fundingStages.loading);
		} else {
			setFundState(fundingStages.initial);
		}
	}, [loadingFundingData]);

	useEffect(() => {
		if (error) {
			toast({
				title: 'Something went wrong',
				description: 'Please refresh the page',
				status: 'error',
			});
		}
	}, [error]);

	useEffect(() => {
		if (user && user.id) {
			setState('anonymous', false);
		}
	}, [user]);

	useEffect(() => {
		if (!state.anonymous && (!user || !user.id)) {
			twitterOnOpen();
			setState('anonymous', true);
		}
	}, [state.anonymous]);

	useEffect(() => {
		console.log('FUNDING:', funding);

		if (funding && funding.fundingTx) {
			if (funding.fundingTx.status === 'paid' || funding.fundingTx.status === 'pending') {
				const newTransactions = funding.fundingTx.status === 'pending' ? fundingTxs : [funding.fundingTx, ...fundingTxs];
				setFundingTx(funding.fundingTx);
				setFundingTxs(newTransactions);
				clearInterval(fundInterval);
				gotoNextStage();
			}
		}
	}, [funding]);

	useEffect(() => {
		if (fundState === fundingStages.completed || fundState === fundingStages.canceled || fundState) {
			clearInterval(fundInterval);
		}

		if (fundState === fundingStages.started) {
			const requestWebLNPayment = async () => {
				console.log('Check WebLN');

				const { webln }: { webln: WebLNProvider } = window as any;
				if (!webln) {
					throw new Error('no provider');
				}

				await webln.enable();
				const { preimage } = await webln.sendPayment(fundingTx.paymentRequest);
				const paymentHash = await sha256(preimage);
				return paymentHash;
			};

			requestWebLNPayment().then(paymentHash => {
				// Check preimage
				if (paymentHash === fundingTx.invoiceId) {
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

	useEffect(() => {
		if (data && fundState === fundingStages.form) {
			if (data.fundWithReward && data.fundWithReward.fundingTx && data.fundWithReward.amountSummary) {
				setFundingTx(data.fundWithReward.fundingTx);
				setAmounts(data.fundWithReward.amountSummary);
				gotoNextStage();
			} else if (data.fund && data.fund.fundingTx && data.fund.amountSummary) {
				setFundingTx(data.fund.fundingTx);
				setAmounts(data.fund.amountSummary);
				gotoNextStage();
			}
		}
	}, [data]);

	const handleFundProject = () => {
		gotoNextStage();
	};

	const handleCloseButton = () => {
		setFundState(fundingStages.initial);
		resetForm();
	};

	const handleFund = async () => {
		try {
			let input;

			if (project.type === 'reward') {
				const { amount, email, rewardsCost, rewards, ...formData } = state;
				const rewardsArray = Object.keys(rewards).map(key => ({
					projectRewardId: parseInt(key, 10),
					quantity: rewards[key],
				}));
				const filteredRewards = rewardsArray.filter(reward => reward.quantity !== 0);
				input = {
					projectId: Number(project.id),
					...formData,
					email: email || null,
					rewards: filteredRewards,
					rewardsCost: Math.round(rewardsCost / btcRate),
				} as IRewardFundingInput;
			} else {
				const { donationAmount, comment, anonymous } = state;
				input = {
					projectId: Number(project.id),
					donationAmount,
					comment,
					anonymous,
				} as IDonationFundingInput;
			}

			await fundProject({ variables: { input } });
			gotoNextStage();
		} catch (_) {
			toast({
				title: 'Something went wrong',
				description: 'Please refresh the page and try again',
				status: 'error',
			});
		}
	};

	const handleFundClick = () => {
		setFadeStarted(true);
		setDetailOpen(true);
		setTimeout(() => {
			setFadeStarted(false);
		}, 500);
	};

	const gotoNextStage = () => {
		const currentIndex = stageList.indexOf(fundState);
		const nextState = stageList[currentIndex + 1];
		setFundState(nextState);
	};

	const renderActivity = () => {
		switch (fundState) {
			case fundingStages.loading:
				return <Loader />;
			case fundingStages.initial:
				return <InfoPage
					{...{
						project,
						handleFundClick,
						handleFundProject,
						loading,
						btcRate,
						fundingTxs,
					}}
				/>;
			case fundingStages.form:
				return <PaymentPage
					{...{
						fundLoading,
						isMobile,
						handleCloseButton,
						btcRate,
						state,
						setState,
						setTarget,
						updateReward,
						handleFund,
						rewards: project.rewards,
						type: project.type,
						name: project.name,
					}}
				/>;
			case fundingStages.started:
				return 	<QrPage
					state={state}
					project={project}
					fundingTx={fundingTx}
					amounts={amounts}
					handleCloseButton={handleCloseButton}
				/>;
			case fundingStages.completed:
				return <SuccessPage state={state} fundingTx={fundingTx} handleCloseButton={handleCloseButton} />;

			default:
				return null;
		}
	};

	console.log('checking fund state', fundState);

	return (
		<>
			<Card
				className={classNames(classes.container, {
					[classes.slideInRight]: isMobile && !detailOpen,
					[classes.fadeOut]: isMobile && fadeStarted,
				})}
				flex={!isMobile ? 2 : undefined}
				maxWidth={isMobile ? 'auto' : '450px'}
				width={isMobile ? '100%' : undefined}
				flexDirection="column"
				justifyContent="flex-start"
				alignItems="center"
				backgroundColor={isDark ? 'brand.bgGreyDark' : 'white'}
				height="100%"
			>
				{renderActivity()}
			</Card>
			<ConnectTwitter
				isOpen={twitterisOpen}
				onClose={twitterOnClose}
			/>
		</>
	);
};

export default Activity;
