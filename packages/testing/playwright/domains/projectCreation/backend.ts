import type { APIRequestContext } from '@playwright/test'

import { ENV } from '../shared/constants'

const PROJECT_REVIEW_SUBMIT_MUTATION = `
  mutation ProjectReviewSubmitForE2E($input: ProjectReviewSubmitInput!) {
    projectReviewSubmit(input: $input) {
      id
      status
      projectId
    }
  }
`

type ProjectReviewSubmitGraphqlResponse = {
  data?: {
    projectReviewSubmit?: {
      id: string
      status: string
      projectId: string
    }
  }
  errors?: Array<{ message?: string }>
}

/**
 * Accept a project review via direct backend GraphQL call using the dev/staging custom JWT header.
 */
export const acceptProjectReviewViaJwt = async (
  request: APIRequestContext,
  input: { projectId: string; reviewSubmitJwt: string },
) => {
  const response = await request.post(`${ENV.API_URL}/graphql`, {
    headers: {
      'content-type': 'application/json',
      'x-project-review-submit-jwt': input.reviewSubmitJwt,
    },
    failOnStatusCode: false,
    data: {
      query: PROJECT_REVIEW_SUBMIT_MUTATION,
      variables: {
        input: {
          projectId: Number(input.projectId),
          status: 'ACCEPTED',
        },
      },
    },
  })

  if (!response.ok()) {
    throw new Error(`projectReviewSubmit request failed with HTTP ${response.status()}`)
  }

  const body = (await response.json()) as ProjectReviewSubmitGraphqlResponse
  if (body.errors?.length) {
    const errorMessages = body.errors.map((error) => error.message || 'Unknown GraphQL error').join('; ')
    throw new Error(`projectReviewSubmit returned GraphQL errors: ${errorMessages}`)
  }

  const status = body.data?.projectReviewSubmit?.status
  if (status !== 'ACCEPTED') {
    throw new Error(`projectReviewSubmit did not return ACCEPTED status. Received: ${status || 'missing'}`)
  }
}
