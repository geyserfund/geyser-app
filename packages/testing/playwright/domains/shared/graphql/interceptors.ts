/** GraphQL interception utilities for Playwright tests */

import { Page, Route } from '@playwright/test'

/** Check if a GraphQL request has a specific operation name */
export const hasOperationName = (requestBody: any, operationName: string): boolean => {
  return requestBody?.operationName === operationName
}

/** Type for GraphQL request handler */
type GraphQLHandler = (route: Route, operationName: string, variables: any) => Promise<void> | void

/** Intercept GraphQL requests and handle them with a custom handler */
export const interceptGraphql = async (page: Page, handler: GraphQLHandler) => {
  await page.route('**/graphql', async (route) => {
    const request = route.request()
    const postData = request.postDataJSON()
    const operationName = postData?.operationName || ''
    const variables = postData?.variables || {}
    
    await handler(route, operationName, variables)
  })
}

/** Helper to create a successful GraphQL response */
export const createGraphQLResponse = (data: any) => {
  return {
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ data }),
  }
}

/** Helper to create a GraphQL error response */
export const createGraphQLError = (message: string, extensions?: Record<string, any>) => {
  return {
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      errors: [
        {
          message,
          extensions: extensions || {},
        },
      ],
    }),
  }
}

/** Mock a specific GraphQL query with a response */
export const mockGraphQLQuery = async (
  page: Page,
  operationName: string,
  response: any,
) => {
  await page.route('**/graphql', async (route) => {
    const request = route.request()
    const postData = request.postDataJSON()
    
    if (hasOperationName(postData, operationName)) {
      await route.fulfill(createGraphQLResponse(response))
    } else {
      await route.continue()
    }
  })
}

/** Mock a specific GraphQL mutation with a response */
export const mockGraphQLMutation = async (
  page: Page,
  operationName: string,
  response: any,
) => {
  await mockGraphQLQuery(page, operationName, response)
}
