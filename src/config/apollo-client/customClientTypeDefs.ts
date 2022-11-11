import { gql } from '@apollo/client';

export const customClientTypeDefs = gql`
  type LightningAddressConnectionDetailsCreateInput {
    lightningAddress: String!
  }

  extend type CreateWalletInput {
    lightningAddressConnectionDetailsInput: LightningAddressConnectionDetailsCreateInput
  }
`;
