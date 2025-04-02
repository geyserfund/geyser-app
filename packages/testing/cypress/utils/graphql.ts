import { CyHttpMessages, RouteHandler } from 'cypress/types/net-stubbing'

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req: CyHttpMessages.IncomingHttpRequest, operationName: string) => {
  return req.body?.operationName && req.body?.operationName === operationName
}

// Alias query if operationName matches
export const aliasQuery = (req: CyHttpMessages.IncomingHttpRequest, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = operationName
  }
}

// Alias mutation if operationName matches
export const aliasMutation = (req: CyHttpMessages.IncomingHttpRequest, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = operationName
  }
}

export const interceptGraphql = (handler: RouteHandler) => {
  return cy.intercept('POST', '/graphql', handler)
}
