import { gql } from '@apollo/client'

export const FRAGMENT_SHIPPING_RATE = gql`
  fragment ShippingRate on ProjectShippingRate {
    baseRate
    country
    incrementRate
    sameAsDefault
  }
`
export const FRAGMENT_SHIPPING_CONFIG = gql`
  ${FRAGMENT_SHIPPING_RATE}
  fragment ShippingConfig on ShippingConfig {
    id
    globalShipping
    name
    type
    shippingRates {
      ...ShippingRate
    }
  }
`

export const FRAGMENT_SHIPPING_ADDRESS = gql`
  fragment ShippingAddress on ShippingAddress {
    id
    postalCode
    state
    fullName
    country
    city
    addressLines
  }
`
