import { SATOSHIS_IN_BTC } from '../../constants';
import { Satoshi } from '../../types/types';

export function convertToBTC(satoshis: Satoshi) {
  return satoshis * SATOSHIS_IN_BTC;
}
