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
  const { clickSignIn, selectNostrAuth } = await import('./actions')
  const getAvatar = () => page.getByTestId('user-profile-avatar')
  const getSignInButton = () => page.getByRole('button', { name: /^Sign in$/i }).first()
  const getMyProjectsLink = () => page.getByRole('link', { name: /My projects/i }).first()
  const getAvatarLink = () => page.getByRole('link', { name: /avatar/i }).first()
  const getProfileMenuButton = () => page.getByRole('button', { name: /Open profile menu/i }).first()
  const getNostrOption = () => page.getByRole('button', { name: /Nostr|Connect with Nostr/i }).first()
  const isAlreadyLoggedIn = async () => {
    const avatarVisible = await getAvatar().isVisible().catch(() => false)
    if (avatarVisible) {
      return true
    }

    const signInVisible = await getSignInButton().isVisible().catch(() => false)
    if (signInVisible) {
      return false
    }

    const avatarLinkVisible = await getAvatarLink().isVisible().catch(() => false)
    if (avatarLinkVisible) {
      return true
    }

    const myProjectsVisible = await getMyProjectsLink().isVisible().catch(() => false)
    if (myProjectsVisible) {
      return true
    }

    return getProfileMenuButton().isVisible().catch(() => false)
  }

  if (await isAlreadyLoggedIn()) {
    return
  }

  const waitForLoggedInState = async () => {
    const timeoutAt = Date.now() + 35000
    while (Date.now() < timeoutAt) {
      if (await isAlreadyLoggedIn()) {
        return
      }
      await page.waitForTimeout(500)
    }
    throw new Error('Timed out waiting for logged-in UI state')
  }

  let lastError: unknown

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await clickSignIn(page)
      await getNostrOption().waitFor({ state: 'visible', timeout: 15000 })
      await selectNostrAuth(page)
      await waitForLoggedInState()
      await page.waitForTimeout(500)
      return
    } catch (error) {
      lastError = error

      if (attempt < 3) {
        if (await isAlreadyLoggedIn()) {
          return
        }
        await page.keyboard.press('Escape').catch(() => undefined)
        await page.goto('/', { waitUntil: 'domcontentloaded' }).catch(() => undefined)
        await page.waitForTimeout(1000)
        continue
      }
    }
  }

  throw new Error(`Real Nostr login failed after 3 attempts: ${String(lastError)}`)
}

/** Setup real auth (call before page.goto) */
export const setupRealAuth = async (page: Page) => {
  await setupRealNostrExtension(page)
  // Do NOT mock any endpoints - all requests hit real backend
}
