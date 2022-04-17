
import { gql } from '@apollo/client';

export const ME = gql`
query Me {
  me {
    id
    username
    imageUrl
    twitterHandle
    connectedTwitter
  }
}
`;

