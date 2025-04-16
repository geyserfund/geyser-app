import { ApolloErrors } from '../contants'
import { aliasQuery, hasOperationName, interceptGraphql } from './graphql'

export type ErrorExtensionType = {
  code: ApolloErrors
  maxAmount?: number
  minAmount?: number
}

export const interceptFundingWithError = (extensions: ErrorExtensionType) => {
  interceptGraphql((req) => {
    aliasQuery(req, 'ContributionCreate')

    if (hasOperationName(req, 'ContributionCreate')) {
      req.reply({
        body: {
          data: null,
          errors: [
            {
              extensions,
            },
          ],
        },
      })

      return
    }

    req.continue()
  }).as('Graphql')
}
