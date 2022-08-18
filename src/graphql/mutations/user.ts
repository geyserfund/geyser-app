import { gql } from '@apollo/client';

export const MUTATION_UNLINK_ACCOUNT = gql`
mutation UnlinkExternalAccount($id: BigInt!) {
  unlinkExternalAccount(id: $id) {
    id
    username
    imageUrl
    externalAccounts {
      id
      type
      externalUsername
      externalId
      public
    }
  }
}`;
