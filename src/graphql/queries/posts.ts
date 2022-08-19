import { gql } from '@apollo/client';

export const QUERY_GET_POST = gql`
query Entry($id: BigInt!) {
	entry(id: $id) {
	  id
	  title
	  description
	  image
	  content
	  published
	  type
	}
  }
`;

export const QUERY_GET_SIGNED_URL = gql`
	query Query {
		getSignedUploadUrl {
		uploadUrl
		distributionUrl
		}
	}
`;

