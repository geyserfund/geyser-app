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

const PROJECT_FUNDING_STRATEGY_UPDATE_MUTATION = `
  mutation ProjectFundingStrategyUpdateForE2E($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
      fundingStrategy
      aonGoal {
        goalAmount
        goalDurationInDays
      }
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

type ProjectFundingStrategyUpdateGraphqlResponse = {
  data?: {
    updateProject?: {
      id: string
      fundingStrategy?: string | null
      aonGoal?: {
        goalAmount: number
        goalDurationInDays: number
      } | null
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

export const updateProjectFundingStrategyViaGraphql = async (
  request: APIRequestContext,
  input: { projectId: string; fundingStrategy: 'ALL_OR_NOTHING' | 'TAKE_IT_ALL' },
) => {
  const response = await request.post(`${ENV.API_URL}/graphql`, {
    headers: {
      'content-type': 'application/json',
    },
    failOnStatusCode: false,
    data: {
      query: PROJECT_FUNDING_STRATEGY_UPDATE_MUTATION,
      variables: {
        input: {
          projectId: Number(input.projectId),
          fundingStrategy: input.fundingStrategy,
        },
      },
    },
  })

  if (!response.ok()) {
    throw new Error(`updateProject fundingStrategy request failed with HTTP ${response.status()}`)
  }

  const body = (await response.json()) as ProjectFundingStrategyUpdateGraphqlResponse
  if (body.errors?.length) {
    const errorMessages = body.errors.map((error) => error.message || 'Unknown GraphQL error').join('; ')
    throw new Error(`updateProject fundingStrategy returned GraphQL errors: ${errorMessages}`)
  }

  const fundingStrategy = body.data?.updateProject?.fundingStrategy
  if (fundingStrategy !== input.fundingStrategy) {
    throw new Error(
      `updateProject fundingStrategy did not return ${input.fundingStrategy}. Received: ${
        fundingStrategy || 'missing'
      }`,
    )
  }
}

export const updateProjectAonGoalViaGraphql = async (
  request: APIRequestContext,
  input: { projectId: string; amountSats: number; duration: number; usdQuote?: number },
) => {
  const response = await request.post(`${ENV.API_URL}/graphql`, {
    headers: {
      'content-type': 'application/json',
    },
    failOnStatusCode: false,
    data: {
      query: PROJECT_FUNDING_STRATEGY_UPDATE_MUTATION,
      variables: {
        input: {
          projectId: Number(input.projectId),
          fundingStrategy: 'ALL_OR_NOTHING',
          lastCreationStep: 'FUNDING_GOAL',
          aonGoal: {
            aonGoalAmount: {
              aonGoalInSats: input.amountSats,
              aonGoalUsdQuote: input.usdQuote ?? 100000,
            },
            aonGoalDurationInDays: input.duration,
          },
        },
      },
    },
  })

  if (!response.ok()) {
    throw new Error(`updateProject AON goal request failed with HTTP ${response.status()}`)
  }

  const body = (await response.json()) as ProjectFundingStrategyUpdateGraphqlResponse
  if (body.errors?.length) {
    const errorMessages = body.errors.map((error) => error.message || 'Unknown GraphQL error').join('; ')
    throw new Error(`updateProject AON goal returned GraphQL errors: ${errorMessages}`)
  }

  const project = body.data?.updateProject
  if (project?.fundingStrategy !== 'ALL_OR_NOTHING') {
    throw new Error(
      `updateProject AON goal did not return ALL_OR_NOTHING. Received: ${project?.fundingStrategy || 'missing'}`,
    )
  }

  if (project.aonGoal?.goalAmount !== input.amountSats || project.aonGoal.goalDurationInDays !== input.duration) {
    throw new Error(
      `updateProject AON goal did not persist expected values. Received amount ${
        project.aonGoal?.goalAmount || 'missing'
      }, duration ${project.aonGoal?.goalDurationInDays || 'missing'}`,
    )
  }
}
