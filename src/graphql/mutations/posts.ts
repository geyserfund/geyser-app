import { gql } from '@apollo/client';

export const MUTATION_CREATE_POST = gql`
mutation Mutation($input: CreateEntryInput!) {
	createEntry(input: $input) {
	  id
	  published
	  createdAt
	  type
	  title
	  description
	  image
	  publishedAt
	  projects {
		id
		title
		name
	  }
	}
  }
`;

export const MUTATION_UPDATE_POST = gql`

mutation UpdateEntry($input: UpdateEntryInput!) {
	updateEntry(input: $input) {
		id
		published
		createdAt
		type
		title
		description
		image
		publishedAt
		projects {
		  id
		  title
		  name
		}	  
	}
}
`;
