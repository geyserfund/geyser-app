import { gql } from '@apollo/client'

import { FRAGMENT_SHIPPING_CONFIG } from '../fragments/shippingConfigFragment.ts'

export const MUTATION_CREATE_SHIPPING_CONFIG = gql`
  ${FRAGMENT_SHIPPING_CONFIG}
  mutation ProjectShippingConfigCreate($input: CreateProjectShippingConfigInput!) {
    projectShippingConfigCreate(input: $input) {
      ...ShippingConfig
    }
  }
`

export const MUTATION_UPDATE_SHIPPING_CONFIG = gql`
  ${FRAGMENT_SHIPPING_CONFIG}
  mutation ProjectShippingConfigUpdate($input: UpdateProjectShippingConfigInput!) {
    projectShippingConfigUpdate(input: $input) {
      ...ShippingConfig
    }
  }
`
