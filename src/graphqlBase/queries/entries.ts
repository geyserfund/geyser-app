import { gql } from '@apollo/client'

export const QUERY_SIGNED_UPLOAD_URL = gql`
  query SignedUploadUrl($input: FileUploadInput!) {
    getSignedUploadUrl(input: $input) {
      uploadUrl
      distributionUrl
    }
  }
`
