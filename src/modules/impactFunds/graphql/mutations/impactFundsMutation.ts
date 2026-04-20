import { gql } from '@apollo/client'

export const MUTATION_IMPACT_FUND_APPLY = gql`
  mutation ImpactFundApply($input: ImpactFundApplyInput!) {
    impactFundApply(input: $input) {
      id
      impactFundId
      status
    }
  }
`
