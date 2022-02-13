export const fetchBitcoinRates = async () => fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC').then(response => response.json()).then(response => response.data);
