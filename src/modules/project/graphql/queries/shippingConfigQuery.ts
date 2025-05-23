import { gql } from '@apollo/client'

import { FRAGMENT_SHIPPING_CONFIG } from '../fragments/shippingConfigFragment.ts'

export const QUERY_PROJECT_REWARDS = gql`
  ${FRAGMENT_SHIPPING_CONFIG}
  query ProjectShippingConfigsGet($input: ProjectShippingConfigsGetInput!) {
    projectShippingConfigsGet(input: $input) {
      ...ShippingConfig
    }
  }
`
