import React from 'react';
import { CircularProgress } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import {BsCurrencyBitcoin} from 'react-icons/bs';
import { isDarkMode } from '../../utils';
import { SatoshiIcon } from '../icons';
import { createUseStyles } from 'react-jss';
import Loader from '../ui/Loader';

interface ICircularFundProgress {
	amount: number;
	goal: number;
	rate: number
	loading: boolean;
}

const useStyles = createUseStyles({
	circularProgress: {
		borderRadius: '50%',
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15))',
		'& .amount-label-sat': {
			display: 'flex',
			alignItems: 'flex-start',
			justifyContent: 'center',
		},
		'& .amount-label-usd': {
			display: 'none',
		},
		'&:hover': {
			'& .amount-label-sat': {
				display: 'none',
			},
			'& .amount-label-usd': {
				display: 'block',
			},
		},

	},
	satoshi: {
		marginRight: '5px',
	},
});

export const CircularFundProgress = ({ goal, rate, amount, loading }: ICircularFundProgress) => {
	const classes = useStyles();
	const isDark = isDarkMode();
	const amountUSD = (amount * rate).toFixed(2);
	const percentage = (parseFloat(amountUSD) / goal) * 100;

	let bitCoins = 0;

	if (amount >= 1000000) {
		bitCoins = parseFloat((amount / 100000000).toFixed(4));
	}

	// Const percentage = 100;

	const getDisplayPercent = (percent: number) => {
		if (percent < 1) {
			return percent.toFixed(2);
		}

		return percent.toFixed();
	};

	const getStat = () => (
		<Stat textAlign="center" borderRadius="50%">
			<StatLabel fontSize="12px" color={isDark ? 'brand.textWhite' : 'brand.textGrey'}>Funded</StatLabel>
			<StatNumber className="amount-label-sat" position="relative">
				{
					bitCoins ? <>
						<BsCurrencyBitcoin fontSize="30px"/>{bitCoins}
					</>
						: <>
							<SatoshiIcon isDark={isDark} className={classes.satoshi}/> {amount}
						</>

				}

			</StatNumber>
			<StatNumber className="amount-label-usd" position="relative">{'$'}{amountUSD} </StatNumber>
			<StatHelpText fontSize="12px" color={isDark ? 'brand.textWhite' : 'brand.textGrey'}>{`${getDisplayPercent(percentage)}% of ${goal} goal`}</StatHelpText>
		</Stat>
	);

	return (
		<>{!percentage
			? <Loader />

			: percentage < 100
				? <CircularProgress
					isIndeterminate={loading}
					className={classes.circularProgress}
					value={percentage}
					size="208px"
					thickness="6px"
					color="brand.primary"
					filter="drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15))"
				>
					<Box position="absolute" fontSize="12px">
						{getStat()}
					</Box>
				</CircularProgress>
				: <Box display="flex" justifyContent="center" alignItems="center" width="208px" height="208px" padding="16px">
					<Box width="176px" height="176px" backgroundColor="brand.primary" borderRadius="50%" padding="10px" className={classes.circularProgress}>
						{getStat()}
					</Box>
				</Box>}
		</>
	);
};
