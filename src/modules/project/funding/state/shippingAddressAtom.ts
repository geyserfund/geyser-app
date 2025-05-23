import { atom } from 'jotai'

import { ShippingAddress } from '@/types/index.ts'

export const shippingAddressAtom = atom<ShippingAddress>()

export const resetShippingAddressAtom = atom(null, (get, set) => {
  set(shippingAddressAtom, undefined)
})
