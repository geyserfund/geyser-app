import { gql } from '@apollo/client';

export const MUTATION_CREATE_WALLET = gql`
mutation UpdateProject($input: CreateWalletInput) {
	createWallet(input: $input) {
	  id
	  name
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
      "lndNodeType": null,
	  "pubkey": null
    },
    "name": null
  }
}
*/

export const MUTATION_UPDATE_WALLET = gql`
mutation UpdateWallet($input: UpdateWalletInput) {
	updateWallet(input: $input) {
	  id
	  name
	}
  }
`;
/*
{
	"input": {
	  "id": null,
	  "name": null,
	  "lndConnectionDetailsInput": {
		"macaroon": null,
		"tlsCertificate": null,
		"hostname": null,
		"grpcPort": null,
		"pubkey": null
	  }
	}
  }

  */
