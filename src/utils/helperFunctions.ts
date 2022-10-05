
export const commaFormatted = (amount: number) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getShortAmountLabel = (amount: number) => {
	if (amount < 1000) {
		return `${amount}`;
	}

	if (amount >= 1000 && amount < 1000000) {
		const newAmount = Math.round(amount / 1000);
		return `${newAmount}K`;
	}

	if (amount >= 1000000 && amount < 1000000000) {
		const newAmount = Math.round(amount / 1000000);
		return `${newAmount}M`;
	}

	if (amount >= 1000000000 && amount < 1000000000000) {
		const newAmount = Math.round(amount / 1000000000);
		return `${newAmount}B`;
	}

	if (amount >= 1000000000000 && amount < 10000000000000000) {
		const newAmount = Math.round(amount / 1000000000000);
		return `${newAmount}T`;
	}
};

export const validateFundingAmount = (amount: number, btcRate: number) => {
	if (amount * btcRate > 10000) {
		return 'Payment above $10000 is not allowed at the moment. Please update the amount, or contact us for donating a higher amount';
	}

	if (amount < 1) {
		return 'Payment below 1 sats is not allowed at the moment. Please update the amount';
	}
};

export const randomIntFromInterval = (min: number, max: number) => Math.floor((Math.random() * (max - min + 1)) + min);
