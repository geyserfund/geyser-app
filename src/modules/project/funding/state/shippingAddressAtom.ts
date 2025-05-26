import { atom } from 'jotai'

import { ShippingAddress } from '@/types/index.ts'

export const shippingAddressAtom = atom<Omit<ShippingAddress, 'id'> & { id?: ShippingAddress['id'] }>()

export const shippingCountryAtom = atom<string>()

export const isShippingAddressValidAtom = atom(true)

export const resetShippingAddressAtom = atom(null, (get, set) => {
  set(shippingAddressAtom, undefined)
  set(isShippingAddressValidAtom, true)
})
