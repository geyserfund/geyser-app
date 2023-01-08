import { gql } from '@apollo/client';

export const ENTRY_PUBLICATION_SUBSCRIPTION = gql`
  subscription EntryPublicationSubscritpion {
    entryPublished {
      entry {
        id
        title
        description
        image
        fundersCount
        amountFunded
        type
        published

        project {
          title
          name
          image
        }
      }
    }
  }
`;
