/** Authentication mocking utilities for Playwright tests */

import { Page } from '@playwright/test'
import { TEST_NOSTR_USER } from '../shared/constants'
import { createGraphQLResponse } from '../shared/graphql/interceptors'

/** Mock user data for GraphQL Me query */
export const mockUserData = {
  __typename: 'User',
  id: 1,
  email: 'test@geyser.fund',
  username: 'testusername',
  imageUrl: 'https://storage.googleapis.com/geyser-projects-media/app/logo.png',
  externalAccounts: [],
  contributions: [],
  ownerOf: [],
  entries: [],
  projectContributions: [],
  projects: [],
  projectFollows: [],
  badges: [],
  isEmailVerified: true,
}

/** Mock Nostr browser extension (window.nostr) */
export const mockNostrExtension = async (page: Page) => {
  await page.addInitScript((nostrUser) => {
    // @ts-ignore - Adding window.nostr for testing
    window.nostr = {
      signEvent: () => ({
        sig: nostrUser.signature,
      }),
      getPublicKey: () => nostrUser.pubkey,
    }
  }, TEST_NOSTR_USER)
}

/** Mock POST /auth/nostr endpoint */
export const mockNostrAuthEndpoint = async (page: Page) => {
  // Mock initial POST to /auth/nostr
  await page.route('**/auth/nostr', async (route) => {
    const request = route.request()
    
    if (request.method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          event: {
            id: TEST_NOSTR_USER.eventId,
            pubkey: TEST_NOSTR_USER.pubkey,
            created_at: 1688585029,
            kind: 1,
            tags: [],
            content: 'hello',
          },
        }),
      })
    } else if (request.method() === 'GET') {
      await route.fulfill({
        status: 200,
      })
    } else {
      await route.continue()
    }
  })

  // Mock the auth token endpoint
  await page.route('**/auth/nostr?token=*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    })
  })
}

/** Mock GraphQL Me query with user data */
export const mockGraphQLMe = async (page: Page, userData = mockUserData) => {
  await page.route('**/graphql', async (route) => {
    const request = route.request()
    const postData = request.postDataJSON()
    
    if (postData?.operationName === 'Me') {
      await route.fulfill(
        createGraphQLResponse({
          me: userData,
        }),
      )
    } else {
      await route.continue()
    }
  })
}

/** Mock GraphQL Me query returning null (logged out state) */
export const mockGraphQLMeLoggedOut = async (page: Page) => {
  await page.route('**/graphql', async (route) => {
    const request = route.request()
    const postData = request.postDataJSON()
    
    if (postData?.operationName === 'Me') {
      await route.fulfill(
        createGraphQLResponse({
          me: null,
        }),
      )
    } else {
      await route.continue()
    }
  })
}

/** Setup initial mocks needed for Nostr authentication (before opening popup) */
export const setupNostrAuthMocks = async (page: Page) => {
  await mockNostrExtension(page)
  await mockNostrAuthEndpoint(page)
  // NOTE: Do NOT set up GraphQL Me mock here!
  // The GraphQL mock should be set up AFTER opening the auth popup
  // but BEFORE clicking the Nostr button. This ensures:
  // 1. Initial page load gets real API response (naturally logged out)
  // 2. After auth flow starts, mock returns logged-in user
}
