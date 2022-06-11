import { REACT_APP_AIR_TABLE_KEY, NODE_ENV } from '../constants';

// Export const fetchBitcoinRates = async () => {
// 	if (NODE_ENV === 'development') {
// 		return 50000;
// 	}

// 	return fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC').then(response => response.json()).then(response => response.data.rates.USD);
// };

export const fetchBitcoinRates = async () => {
	if (NODE_ENV === 'development') {
		return 50000;
	}

	return fetch('https://api-pub.bitfinex.com/v2/ticker/tBTCUSD').then(response => response.json()).then(response => response.data[6]);
};

export const createCreatorRecord = async (data:any) => {
	fetch('https://api.airtable.com/v0/appyM7XlNIWVypuP5/Subscribers%20(Funders%2BCreators)', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${REACT_APP_AIR_TABLE_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then(response => response.json());
};

