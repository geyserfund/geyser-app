/** Funding domain types */

export type FundingDetailsOptions = {
  comment: string
  email?: string
}

export type PaymentMethod = 'lightning' | 'onchain'

/** Onchain payment details parsed from BIP21 URI */
export type OnchainPaymentDetails = {
  address: string
  amountSats: number
}
