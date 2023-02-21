import { gql } from '@apollo/client'

export const QUERY_PROJECT_FOR_LANDING_PAGE = gql`
  query ProjectsMostFundedOfTheWeekGet(
    $input: GetProjectsMostFundedOfTheWeekInput
  ) {
    projectsMostFundedOfTheWeekGet(input: $input) {
      project {
        id
        name
        balance
        createdAt
        fundersCount
        fundingTxsCount
        thumbnailImage
        tags {
          id
          label
        }
        title
        status
        owners {
          id
          user {
            id
            username
            imageUrl
          }
        }
      }
    }
  }
`

// {
//     "input": {
//       "pagination": {
//         "cursor": {
//           "id": null
//         },
//         "take": null
//       },
//       "orderBy": [
//         {
//           "balance": null,
//           "createdAt": null
//         }
//       ],
//       "where": {
//         "countryCode": null,
//         "id": null,
//         "name": null,
//         "region": null,
//         "search": null,
//         "status": null,
//         "tagIds": null,
//         "type": null
//       }
//     }
//   }
