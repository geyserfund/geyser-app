import { useEffect, useState } from 'react';
import { fetchBitcoinRates } from '../api';

interface IuseBitcoinRates {
	loading: boolean
	btcRate: number
}

export const useBitcoinRates = ():IuseBitcoinRates => {
	const [btcRate, setBtcRate] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getBitcoinRates = async () => {
			setLoading(true);
			const response: any = await fetchBitcoinRates();
			console.log('chcking rates', response);
			const satoshirate = response.rates.USD * 0.00000001;
			setBtcRate(satoshirate);
			setLoading(false);
		};

		getBitcoinRates();
	}, []);

	return {loading, btcRate};
};
