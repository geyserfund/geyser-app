import { gql } from '@apollo/client'

import { FRAGMENT_SHIPPING_ADDRESS, FRAGMENT_SHIPPING_CONFIG } from '../fragments/shippingFragment.ts'

export const QUERY_PROJECT_SHIPPING_CONFIGS = gql`
  ${FRAGMENT_SHIPPING_CONFIG}
  query ProjectShippingConfigsGet($input: ProjectShippingConfigsGetInput!) {
    projectShippingConfigsGet(input: $input) {
      ...ShippingConfig
    }
  }
`

export const QUERY_SHIPPING_ADDRESS_GET = gql`
  ${FRAGMENT_SHIPPING_ADDRESS}
  query ShippingAddressesGet($input: ShippingAddressesGetInput!) {
    shippingAddressesGet(input: $input) {
      ...ShippingAddress
    }
  }
`
