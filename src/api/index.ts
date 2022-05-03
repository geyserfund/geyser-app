import { REACT_APP_AIR_TABLE_KEY } from '../constants';

export const fetchBitcoinRates = async () => fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC').then(response => response.json()).then(response => response.data);

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

