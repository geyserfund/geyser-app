import { useBtcContext } from '../context/btc';
import { Satoshis, USDCents, USDollars } from '../types/types';

export const useBTCConverter = () => {
  const { btcRate } = useBtcContext();

  const getUSDAmount = (satoshis: Satoshis): USDollars => {
    return satoshis * btcRate;
  };

  const getUSDCentsAmount = (satoshis: Satoshis): USDCents => {
    return satoshis * btcRate * 100;
  };

  const getSatoshisFromUSDCents = (usdCents: USDCents): Satoshis => {
    return Math.round(usdCents / 100 / btcRate);
  };

  return {
    getUSDAmount,
    getUSDCentsAmount,
    getSatoshisFromUSDCents,
  };
};
