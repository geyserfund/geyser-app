import { useBtcContext } from '../context/btc';
import { Satoshi } from '../types/types';

export const useBTCConverter = () => {
  const { btcRate } = useBtcContext();

  const getUSDAmount = (satoshis: Satoshi) => {
    return satoshis * btcRate;
  };

  return {
    getUSDAmount,
  };
};
