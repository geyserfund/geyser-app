import { SATOSHIS_IN_BTC } from '../../shared/constants'
import { Satoshis } from '../../types/types'

export function convertToBTC(satoshis: Satoshis): number {
  return satoshis / SATOSHIS_IN_BTC
}
