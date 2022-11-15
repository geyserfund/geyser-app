import { gql } from '@apollo/client';

/**
 * Custom client-side extensions (AKA mocks) for mocking and
 * augmenting the back-end schema
 *
 * See: https://www.apollographql.com/docs/react/development-testing/client-schema-mocking/
 */
export const customClientTypeDefs = gql`
  type LightningAddressConnectionDetailsCreateInput {
    lightningAddress: String!
  }

  extend type CreateWalletInput {
    lightningAddressConnectionDetailsInput: LightningAddressConnectionDetailsCreateInput
  }
`;
