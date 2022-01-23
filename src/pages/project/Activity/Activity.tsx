import { Box, Text, VStack } from '@chakra-ui/layout';
import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { RiLinkUnlinkM } from 'react-icons/ri';
import { SatoshiIcon } from '../../../components/icons';
import { CircularFundProgress } from '../../../components/molecules';
import { IdBar } from '../../../components/molecules/IdBar';
import { ButtonComponent, Card, FundingStatus } from '../../../components/ui';
import { IFundingTx, IProject, IProjectFunding } from '../../../interfaces';
import { useLazyQuery, useMutation } from '@apollo/client';
import { MUTATION_FUND_PROJECT } from '../../../graphql/mutations/fund';
import { QUERY_GET_FUNDING } from '../../../graphql';
import { SuccessPage } from './SuccessPage';
import { QrPage } from './QrPage';
import { getCountDown, isDarkMode, isMobileMode, useNotification } from '../../../utils';
import { PaymentPage } from './PaymentPage';
import { AuthContext } from '../../../context';
import Loader from '../../../components/ui/Loader';

interface IActivityProps {
	project: IProject
}

const initialFunding = {
	id: '',
	invoiceId: '',
	paid: false,
	amount: 0,
	paymentRequest: '',
	canceled: false,
};
let fundInterval: any;
const Activity = ({ project }: IActivityProps) => {
	const [fundPage, setFundpage] = useState(true);
	const [completedFunding, setCompletedFunding] = useState(false);
	const [startedFunding, setStartedFunding] = useState(false);
	const [btcRate, setBtcRate] = useState(0);
	const [amount, setAmount] = useState(0);
	const [comment, setComment] = useState('');
	const [anonymous, setAnonymous] = useState(true);
	const [fundingTx, setFundingTx] = useState<IFundingTx>(initialFunding);
	const [copy, setCopy] = useState(false);
	const [funders, setfunders] = useState<IProjectFunding[]>([]);
	const [countDown, setCountDown] = useState('');

	const { user, twitterOnOpen } = useContext(AuthContext);

	const { toast } = useNotification();

	const [fundProject, {
		data,
		loading: fundLoading,
	}] = useMutation(MUTATION_FUND_PROJECT);

	const [getFunding, { data: fundData, loading }] = useLazyQuery(QUERY_GET_FUNDING,
		{
			variables: { fundingTxId: fundingTx.id },
			fetchPolicy: 'network-only',
		},
	);

	const handleCountDown = () => {
		const countDown = getCountDown(project.expiresAt);
		setCountDown(countDown);
	};

	useEffect(() => {
		const interval = setInterval(handleCountDown, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [project.expiresAt]);

	useEffect(() => {
		if (project && project.fundingTxs) {
			const unsortedFunders = [...project.fundingTxs];
			if (unsortedFunders.length > 0) {
				unsortedFunders.sort((a, b) => parseInt(b.paidAt, 10) - parseInt(a.paidAt, 10));
				setfunders(unsortedFunders);
			}
		}
	}, [project.fundingTxs]);

	useEffect(() => {
		if (user && user.id) {
			setAnonymous(false);
		}
	}, [user]);

	useEffect(() => {
		if (!anonymous && (!user || !user.id)) {
			twitterOnOpen();
		}
	}, [anonymous]);

	useEffect(() => {
		if (fundData && fundData.getFundingTx) {
			if (fundData.getFundingTx.paid) {
				setfunders([fundData.getFundingTx, ...funders]);
				clearInterval(fundInterval);
				setCompletedFunding(true);
			}
		}
	}, [fundData]);

	useEffect(() => {
		if (completedFunding) {
			clearInterval(fundInterval);
		}

		if (startedFunding && !completedFunding) {
			fundInterval = setInterval(getFunding, 2000);
		}
	}, [startedFunding, completedFunding]);

	useEffect(() => {
		getBitcoinRates();
	}, []);

	useEffect(() => {
		if (data && data.fundProject && data.fundProject.success) {
			setFundingTx(data.fundProject.fundingTx);
			setStartedFunding(true);
			setCompletedFunding(false);
		}
	}, [data]);

	const isDark = isDarkMode();
	const isMobile = isMobileMode();

	const getBitcoinRates = async () => {
		const response: any = (await fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC'));
		const responseJson = await response.json();
		const satoshirate = responseJson.data.rates.USD * 0.00000001;
		setBtcRate(satoshirate);
	};

	const handleFundProject = () => {
		setFundpage(false);
	};

	const handleCloseButton = () => {
		setFundpage(true);
		setCompletedFunding(false);
		setStartedFunding(false);
	};

	const handleFund = async () => {
		try {
			await fundProject({
				variables: {
					projectId: project.id,
					amount,
					comment,
					anonymous,
				},
			});
		} catch (_) {
			toast({
				title: 'Something went wrong',
				description: 'Please refresh the page and try again',
				status: 'error',
			});
		}
	};

	const shareProjectWithfriends = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopy(true);
		setTimeout(() => {
			setCopy(false);
		}, 5000);
	};

	const infoPage = () => (
		<VStack
			padding={isMobile ? '10px 0px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			margin="10px 15px"
		>
			<FundingStatus open={true} />

			<CircularFundProgress loading={loading} rate={btcRate} goal={project.fundingGoal} amount={project.balance} />
			<Text>{`COUNTDOWN: ${countDown}`}</Text>
			<ButtonComponent
				primary
				standard
				leftIcon={<SatoshiIcon />}
				width="100%"
				onClick={handleFundProject}
			>
				Fund this project
			</ButtonComponent>
			<ButtonComponent
				standard
				leftIcon={copy ? <RiLinkUnlinkM /> : <HiOutlineSpeakerphone fontSize="20px" />}
				width="100%"
				onClick={shareProjectWithfriends}
			>
				{copy ? 'Project Link Copied' : 'Share project with friends'}
			</ButtonComponent>
			<Box width="100%" display="flex" flexDirection="column" alignItems="start" overflow="hidden" height="-webkit-fill-available">
				<Text fontSize="16px" marginBottom="10px" marginTop="10px">
					{`Project Backers ${funders.length ? `( ${funders.length} )` : ''}`}
				</Text>
				<VStack spacing={'8px'} width="100%" overflow="auto" height="calc(100% - 60px)" paddingBottom="30px">
					{
						funders.map((funder, index) => (
							<IdBar key={index} funder={funder} />
						))
					}
				</VStack>

			</Box>
		</VStack>);

	return (
		<Card
			flex={2}
			maxWidth={isMobile ? 'auto' : '450px'}
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
			alignItems="center"
			backgroundColor={isDark ? 'brand.bgGreyDark' : 'white'}
		>

			{fundLoading ? <Loader />
				: completedFunding ? <SuccessPage amount={amount} handleCloseButton={handleCloseButton} />
					: startedFunding ? <QrPage
						comment={comment}
						title={project.title}
						amount={amount}
						owner={project.owner.user.username}
						qrCode={fundingTx.paymentRequest}
						handleCloseButton={handleCloseButton}
					/>
						: fundPage ? infoPage()
							: <PaymentPage
								{...{
									isMobile,
									handleCloseButton,
									btcRate,
									amount,
									setAmount,
									comment,
									setComment,
									anonymous,
									setAnonymous,
									handleFund,
								}}
							/>
			}

		</Card>
	);
};

export default Activity;
