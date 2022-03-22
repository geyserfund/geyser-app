
import { gql } from '@apollo/client';

export const QUERY_GET_USER = gql`
query GetUser {
    getUser {
      id
      username
      imageUrl
      twitterHandle
      connectedTwitter
    }
  }
`;

