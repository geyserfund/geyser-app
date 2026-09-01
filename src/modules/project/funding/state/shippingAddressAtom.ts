import { atom } from 'jotai'

import { ShippingAddress } from '@/types/index.ts'

/** @deprecated Shipping addresses are no longer collected during reward-free funding. */
export const shippingAddressAtom = atom<Omit<ShippingAddress, 'id'> & { id?: ShippingAddress['id'] }>()

/** @deprecated Shipping addresses are no longer collected during reward-free funding. */
export const shippingCountryAtom = atom<string>()

/** @deprecated Retained for historical funding state consumers. */
export const isShippingAddressValidAtom = atom(true)

/** @deprecated Shipping addresses are no longer collected during reward-free funding. */
export const resetShippingAddressAtom = atom(null, (_, set) => {
  set(shippingAddressAtom, undefined)
  set(isShippingAddressValidAtom, true)
})
