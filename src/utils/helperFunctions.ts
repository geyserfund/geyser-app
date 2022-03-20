
export const commaFormatted = (amount: number) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getShortAmountLabel = (amount: number) => {
	if (amount < 1000) {
		return `${amount}`;
	}

	if (amount > 1000 && amount < 1000000) {
		const newAmount = Math.round(amount / 1000);
		return `${newAmount}K`;
	}

	if (amount > 1000000 && amount < 1000000000) {
		const newAmount = Math.round(amount / 1000000);
		return `${newAmount}M`;
	}

	if (amount > 1000000000 && amount < 1000000000000) {
		const newAmount = Math.round(amount / 1000000);
		return `${newAmount}B`;
	}

	return '';
};
