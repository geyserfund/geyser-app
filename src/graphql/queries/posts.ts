import { gql } from '@apollo/client';

export const QUERY_GET_POST = gql`
query Entry($id: BigInt!) {
	entry(id: $id) {
		id
		title
		description
		image
		published
	  content
		createdAt
		updatedAt
		publishedAt
		type
		creator {
		  id
		  username
		  imageUrl
		}
		project {
		  id
		  title
		  name
		}
	}
  }
`;

export const QUERY_GET_SIGNED_URL = gql`
query GetSignedUploadUrl($input: FileUploadInput!) {
	getSignedUploadUrl(input: $input) {
		uploadUrl
		distributionUrl
		}
	}
`;
