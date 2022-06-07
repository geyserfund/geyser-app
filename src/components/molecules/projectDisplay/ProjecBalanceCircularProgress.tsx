import React, { useState } from 'react';
import { CircularProgress } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import { isDarkMode } from '../../../utils';
import { SatoshiIcon } from '../../icons';
import { createUseStyles } from 'react-jss';
import { commaFormatted } from '../../../utils/helperFunctions';

interface IProjectBalanceCircularProgress {
	balance: number;
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
			alignItems: 'flex-start',
			justifyContent: 'center',
		},

	},
	satoshi: {
		marginRight: '5px',
	},
});

const BTCBalance = ({ balance }: { balance: number }) => {
	const isDark = isDarkMode();
	const classes = useStyles();
	const displaySatoshis = balance < 1000000;

	return (
		displaySatoshis
			? <><SatoshiIcon isDark={isDark} className={classes.satoshi} /> {commaFormatted(balance)}</>
			: <><BsCurrencyBitcoin fontSize="30px" />{parseFloat((balance / 100000000).toFixed(4))}</>
	);
};

export const ProjectBalanceCircularProgress = ({ goal, rate, balance, loading }: IProjectBalanceCircularProgress) => {
	const classes = useStyles();
	const isDark = isDarkMode();
	const balanceUSD = (balance * rate).toFixed(2);
	const percentage = (parseFloat(balanceUSD) / goal) * 100;

	const [display, setDisplay] = useState(false);

	const getDisplayPercent = (percent: number) => {
		if (percent < 1) {
			return percent.toFixed(2);
		}

		return percent.toFixed();
	};

	const handleClick = () => {
		setDisplay(!display);
	};

	const handleMouseOver = () => {
		setDisplay(true);
		setTimeout(() => {
			setDisplay(false);
		}, 5000);
	};

	const getStat = () => (
		<Stat textAlign="center" borderRadius="50%" >
			<StatLabel fontSize="12px" color={isDark ? 'brand.textWhite' : 'brand.textGrey'}>Raised</StatLabel>
			<StatNumber className="amount-label-sat" position="relative" display={!display ? 'flex' : 'none'}>
				<BTCBalance balance={balance}/>
			</StatNumber>
			<StatNumber className="amount-label-usd" display={display ? 'block' : 'none'} position="relative">{'$'}{balanceUSD} </StatNumber>
			<StatHelpText fontSize="12px" color={isDark ? 'brand.textWhite' : 'brand.textGrey'}>{`${getDisplayPercent(percentage)}% of $${commaFormatted(goal)}`}</StatHelpText>
		</Stat>
	);

	return (
		<>{percentage < 100
			? <CircularProgress
				onMouseOver={handleMouseOver}
				onMouseOut={handleClick}
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
