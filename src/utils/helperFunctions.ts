
export const commaFormatted = (amount: number) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
