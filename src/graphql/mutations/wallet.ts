import { gql } from '@apollo/client';

export const MUTATION_CREATE_WALLET = gql`
mutation UpdateProject($input: CreateWalletInput) {
	createWallet(input: $input) {
	  id
	  name
	  connectionDetails {
		... on LndConnectionDetails {
		  macaroon
		  tlsCertificate
		  hostname
		  grpcPort
		}
	  }
	}
  }
`;
/*
{
  "input": {
    "resourceInput": {
      "resourceId": null,
      "resourceType": null
    },
    "lndConnectionDetailsInput": {
      "macaroon": null,
      "tlsCertificate": null,
      "hostname": null,
      "grpcPort": null,
      "lndNodeType": null
    },
    "name": null
  }
}
*/
