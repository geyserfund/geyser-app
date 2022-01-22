import React from 'react';
import { CircularProgress } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
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
			display: 'block',
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
		position: 'absolute',
		top: 0,

	},
});

export const CircularFundProgress = ({ goal, rate, amount, loading }: ICircularFundProgress) => {
	const classes = useStyles();
	const isDark = isDarkMode();
	const goalUSD = (goal * rate).toFixed(2);
	const amountUSD = (amount * rate).toFixed(2);
	const percentage = (parseFloat(amountUSD) / parseFloat(goalUSD)) * 100;
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
			<StatNumber className="amount-label-sat" position="relative">{amount} <SatoshiIcon isDark={isDark} wrapperClass={classes.satoshi} /></StatNumber>
			<StatNumber className="amount-label-usd" position="relative">{'$'}{amountUSD} </StatNumber>
			<StatHelpText fontSize="12px" color={isDark ? 'brand.textWhite' : 'brand.textGrey'}>{`${getDisplayPercent(percentage)}% of ${goalUSD} goal`}</StatHelpText>
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
