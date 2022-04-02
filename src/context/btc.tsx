import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchBitcoinRates } from '../api';

const defaultContext = {
	btcRate: 0,
};

interface IBtcContext {
	btcRate: number;
}

export const BtcContext = createContext<IBtcContext>(defaultContext);

export const BtcProvider = ({ children }: { children: React.ReactNode }) => {
	const [btcRate, setBtcRate] = useState(0);

	useEffect(() => {
		const getBitcoinRates = async () => {
			const response: any = await fetchBitcoinRates();
			const satoshirate = response.rates.USD * 0.00000001;
			setBtcRate(satoshirate);
		};

		getBitcoinRates();
	}, []);

	return (
		<BtcContext.Provider value={{ btcRate }}>
			{children}
		</BtcContext.Provider>
	);
};

export const useBtcContext = () => useContext(BtcContext);
