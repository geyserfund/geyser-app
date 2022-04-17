import { gql } from '@apollo/client';

export const MUTATION_SUBMIT_GRANTEE = gql`
mutation SubmitGrantee($projectId: BigInt!, $name: String!, $url: String!) {
  submitGrantee(projectId: $projectId, name: $name, url: $url) {
    grantees {
      id
      name
      url
    }
  }
}
`;

