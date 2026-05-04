/** Live-backend health checks for Playwright suites that rely on real services. */

import type { APIRequestContext } from '@playwright/test'

import { ENV } from './constants'

type BackendCheckOptions = {
  requireAuth?: boolean
  timeoutMs?: number
}

type BackendCheckResult = {
  ok: boolean
  reason?: string
}

const GRAPHQL_HEALTH_QUERY = {
  query: '{ __typename }',
}

export const getApiOriginFromAppUrl = (appUrl: string): string => {
  const parsed = new URL(appUrl)
  const host = parsed.hostname.startsWith('api.') ? parsed.hostname : `api.${parsed.hostname}`
  return `${parsed.protocol}//${host}`
}

const isUnavailableStatus = (status: number) => status === 404 || status >= 500

const checkGraphql = async (
  request: APIRequestContext,
  apiOrigin: string,
  timeoutMs: number,
): Promise<BackendCheckResult> => {
  try {
    const response = await request.post(`${apiOrigin}/graphql`, {
      data: GRAPHQL_HEALTH_QUERY,
      timeout: timeoutMs,
      failOnStatusCode: false,
    })

    const status = response.status()

    if (isUnavailableStatus(status)) {
      return { ok: false, reason: `GraphQL returned ${status}` }
    }

    return { ok: true }
  } catch (error) {
    return { ok: false, reason: `GraphQL request failed: ${String(error)}` }
  }
}

const checkAuth = async (request: APIRequestContext, apiOrigin: string, timeoutMs: number): Promise<BackendCheckResult> => {
  try {
    const response = await request.get(`${apiOrigin}/auth/auth-token`, {
      timeout: timeoutMs,
      failOnStatusCode: false,
    })
    const status = response.status()

    // 401 is acceptable here (unauthenticated but auth service is online).
    if (status === 401) {
      return { ok: true }
    }

    if (isUnavailableStatus(status)) {
      return { ok: false, reason: `Auth returned ${status}` }
    }

    return { ok: true }
  } catch (error) {
    return { ok: false, reason: `Auth request failed: ${String(error)}` }
  }
}

/** Check live backend availability for suites that rely on real services. */
export const checkLiveBackendAvailability = async (
  request: APIRequestContext,
  options: BackendCheckOptions = {},
): Promise<BackendCheckResult> => {
  const { requireAuth = false, timeoutMs = 8000 } = options
  const apiOrigin = ENV.API_URL || getApiOriginFromAppUrl(ENV.APP_URL)

  const graphql = await checkGraphql(request, apiOrigin, timeoutMs)
  if (!graphql.ok) {
    return graphql
  }

  if (!requireAuth) {
    return { ok: true }
  }

  return checkAuth(request, apiOrigin, timeoutMs)
}
