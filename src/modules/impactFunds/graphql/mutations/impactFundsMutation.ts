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

export const MUTATION_IMPACT_FUND_APPLICATION_UPDATE = gql`
  mutation ImpactFundApplicationUpdate($input: ImpactFundApplicationUpdateInput!) {
    impactFundApplicationUpdate(input: $input) {
      id
      status
      fundingModel
    }
  }
`

export const MUTATION_IMPACT_FUND_APPLICATION_FUNDING_SET = gql`
  mutation ImpactFundApplicationFundingSet($input: ImpactFundApplicationFundingSetInput!) {
    impactFundApplicationFundingSet(input: $input) {
      id
      amountAwardedInSats
      contributionUuid
      awardedAt
    }
  }
`

export const MUTATION_IMPACT_FUND_APPLICATION_NOTE_CREATE = gql`
  mutation ImpactFundApplicationNoteCreate($input: ImpactFundApplicationNoteCreateInput!) {
    impactFundApplicationNoteCreate(input: $input) {
      id
      applicationId
      authorUserId
      body
      createdAt
      updatedAt
      canEdit
      author {
        id
        username
        imageUrl
      }
    }
  }
`

export const MUTATION_IMPACT_FUND_APPLICATION_NOTE_UPDATE = gql`
  mutation ImpactFundApplicationNoteUpdate($input: ImpactFundApplicationNoteUpdateInput!) {
    impactFundApplicationNoteUpdate(input: $input) {
      id
      applicationId
      authorUserId
      body
      createdAt
      updatedAt
      canEdit
      author {
        id
        username
        imageUrl
      }
    }
  }
`
