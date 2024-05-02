import { atom, useAtom, useAtomValue } from 'jotai'

export enum PaymentMethods {
  lightning = 'LIGHTNING',
  onChain = 'ONCHAIN',
}

export const paymentMethodAtom = atom(PaymentMethods.lightning)
export const usePaymentMethodAtom = () => useAtom(paymentMethodAtom)

const isLightingMethodAtom = atom((get) => get(paymentMethodAtom) === PaymentMethods.lightning)
export const useIsLightingMethodAtom = () => useAtomValue(isLightingMethodAtom)
