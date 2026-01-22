/** Real Nostr authentication (without mocks) for E2E testing */

import { Page } from '@playwright/test'
import { readFileSync } from 'fs'
import { join } from 'path'

import { TEST_NOSTR_USER } from '../shared/constants'

/** Inject bundled nostr-tools into browser context */
export const injectNostrBundle = async (page: Page) => {
  const bundlePath = join(__dirname, '../../bundles/nostr-tools.bundle.js')
  const bundleCode = readFileSync(bundlePath, 'utf-8')

  await page.addInitScript(bundleCode)
}

/** Setup real Nostr extension with actual cryptographic signing */
export const setupRealNostrExtension = async (page: Page, nsec: string = TEST_NOSTR_USER.nsec) => {
  // First inject the nostr-tools bundle
  await injectNostrBundle(page)

  // Then setup window.nostr with real signing using the bundle
  await page.addInitScript(
    ({ nsecKey }) => {
      const { nip19, getPublicKey, getEventHash, signEvent } = (window as any).NostrToolsBundle

      // Decode nsec to get private key
      const { data: privateKey } = nip19.decode(nsecKey)
      const pubkey = getPublicKey(privateKey)

      // Create real window.nostr implementation
      ;(window as any).nostr = {
        getPublicKey: async () => {
          console.log('[window.nostr] getPublicKey called, returning:', pubkey)
          return pubkey
        },
        signEvent: async (event: any) => {
          console.log('[window.nostr] signEvent called with event:', JSON.stringify(event, null, 2))
          
          // Set pubkey if not already set
          if (!event.pubkey) {
            event.pubkey = pubkey
            console.log('[window.nostr] Set pubkey:', pubkey)
          }

          // Compute event ID (hash)
          event.id = getEventHash(event)
          console.log('[window.nostr] Computed event ID:', event.id)

          // Sign the event
          event.sig = signEvent(event, privateKey)
          console.log('[window.nostr] Generated signature:', event.sig)
          console.log('[window.nostr] Complete signed event:', JSON.stringify(event, null, 2))

          return event
        },
      }
    },
    { nsecKey: nsec },
  )
}

/** Real login flow - authenticates with actual backend */
export const loginWithRealNostr = async (page: Page) => {
  // Import actions from existing module
  const { clickSignIn, selectNostrAuth } = await import('./actions')

  // Enable console logging for debugging
  page.on('console', (msg) => {
    console.log(`[BROWSER ${msg.type()}]:`, msg.text())
  })

  // Log page errors
  page.on('pageerror', (error) => {
    console.error('[PAGE ERROR]:', error.message)
  })

  // Track auth failures
  const authFailures: string[] = []

  // Log network activity
  page.on('request', (request) => {
    if (request.url().includes('/auth') || request.url().includes('/graphql')) {
      console.log(`[REQUEST] ${request.method()} ${request.url()}`)
    }
  })

  page.on('response', async (response) => {
    if (response.url().includes('/auth') || response.url().includes('/graphql')) {
      console.log(`[RESPONSE] ${response.status()} ${response.url()}`)
      
      // Capture auth failures
      if (response.url().includes('/auth/nostr') && response.status() >= 400) {
        try {
          const body = await response.text()
          authFailures.push(`${response.status()}: ${body}`)
          console.error(`[AUTH FAILED] ${response.status()}`, body)
        } catch (e) {
          authFailures.push(`${response.status()}: Unable to read response`)
        }
      }
    }
  })

  // Click Sign In button
  console.log('[TEST] Clicking Sign In button...')
  await clickSignIn(page)

  // Wait for Connect popup
  console.log('[TEST] Waiting for Connect popup...')
  await page.getByText('Connect').waitFor({ state: 'visible', timeout: 5000 })

  // Click Nostr authentication button
  console.log('[TEST] Clicking Nostr button...')
  await selectNostrAuth(page)

  try {
    // Wait for the FIRST /auth/nostr call (get event template)
    console.log('[TEST] Waiting for initial /auth/nostr request (get event)...')
    await page.waitForResponse(
      (response) =>
        response.url().includes('/auth/nostr') &&
        !response.url().includes('token=') && // First call has NO token
        response.status() === 200,
      { timeout: 10000 },
    )
    console.log('[TEST] ✓ Initial /auth/nostr received')

    // Wait for the SECOND /auth/nostr call (with signed event token)
    console.log('[TEST] Waiting for authenticated /auth/nostr?token=... request...')
    await page.waitForResponse(
      (response) =>
        response.url().includes('/auth/nostr') &&
        response.url().includes('token=') && // Second call HAS token
        response.status() === 200,
      { timeout: 15000 }, // Longer timeout for signing + network
    )
    console.log('[TEST] ✓ Authentication completed successfully')

    // Wait for GraphQL Me query to complete (with real user data)
    console.log('[TEST] Waiting for GraphQL Me query...')
    await page.waitForResponse(
      (response) =>
        response.url().includes('/graphql') &&
        response.status() === 200 &&
        response.request().postDataJSON()?.operationName === 'Me',
      { timeout: 10000 },
    )
    console.log('[TEST] ✓ GraphQL Me query completed')
  } catch (error) {
    // Provide detailed error message if auth failed
    if (authFailures.length > 0) {
      throw new Error(`Authentication failed: ${authFailures.join('; ')}. Original error: ${error}`)
    }
    throw error
  }

  // Small delay for UI state updates
  await page.waitForTimeout(1000)
  console.log('[TEST] ✓ Login flow completed successfully')
}

/** Setup real auth (call before page.goto) */
export const setupRealAuth = async (page: Page) => {
  await setupRealNostrExtension(page)
  // Do NOT mock any endpoints - all requests hit real backend
}
