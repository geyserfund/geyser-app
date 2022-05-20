import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { SatoshiIcon } from '../icons';
import { commaFormatted } from '../../utils/helperFunctions';
import { BsCurrencyBitcoin } from 'react-icons/bs';

interface INoGoalFundAmount {
	balance: number,
	rate: number,
}

export const NoGoalFundAmount = ({balance, rate}:INoGoalFundAmount) => {
	const [hover, setHover] = useState(false);

	let bitCoins = 0;

	if (balance >= 1000000) {
		bitCoins = parseFloat((balance / 100000000).toFixed(4));
	}

	return (
		<Box>
			<Box display="flex" justifyContent="center" alignItems="center" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
				{hover
					? <>
						<Text color="brand.primary" fontSize="40px" mr={1}>$</Text><Text color="brand.primary" fontWeight="bold" fontSize="5xl">{(balance * rate).toFixed(2)}</Text>
					</>
					: bitCoins ? <>
						<BsCurrencyBitcoin fontSize="40px" color="#20ECC7" /><Text color="brand.primary" fontWeight="bold" fontSize="5xl">{bitCoins}</Text>
					</>
						: <>
							<SatoshiIcon scale={1.5} color="brand.primary" mr={1} /><Text color="brand.primary" fontWeight="bold" fontSize="5xl">{commaFormatted(balance)}</Text>
						</>

				}
			</Box>
			<Text color="brand.textGrey" fontSize="xs" textAlign="center">RAISED</Text>
		</Box>

	);
};
