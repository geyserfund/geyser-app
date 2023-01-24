import { useBtcContext } from '../context/btc';
import { Satoshis, USDCents, USDollars } from '../types/types';

export const useBTCConverter = () => {
  const { btcRate } = useBtcContext();

  const getUSDAmount = (satoshis: Satoshis): USDollars => {
    return (satoshis * btcRate) as USDollars;
  };

  const getUSDCentsAmount = (satoshis: Satoshis): USDCents => {
    return (satoshis * btcRate * 100) as USDCents;
  };

  const getSatoshisFromUSDCents = (usdCents: USDCents): Satoshis => {
    return Math.round(usdCents / 100 / btcRate) as Satoshis;
  };

  return {
    getUSDAmount,
    getUSDCentsAmount,
    getSatoshisFromUSDCents,
  };
};
