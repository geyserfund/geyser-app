import { useBtcContext } from '../context/btc';
import { Satoshi } from '../types/types';

export const useBTCConverter = () => {
  const { btcRate } = useBtcContext();

  const getUSDAmount = (satoshis: Satoshi) => {
    return satoshis * btcRate;
  };

  const getUSDCentsAmount = (satoshis: Satoshi) => {
    return satoshis * btcRate * 100;
  };

  const getSatoshisAmount = (usdCents: number) => {
    return usdCents / 100 / btcRate;
  };

  return {
    getUSDAmount,
    getUSDCentsAmount,
    getSatoshisAmount,
  };
};
