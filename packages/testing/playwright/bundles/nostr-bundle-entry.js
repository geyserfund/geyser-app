/** Entry point for nostr-tools bundle - exports only what we need for testing */

import { nip19, getPublicKey, getEventHash, signEvent } from 'nostr-tools'

// Export to global window object for use in Playwright browser context
window.NostrToolsBundle = {
  nip19,
  getPublicKey,
  getEventHash,
  signEvent,
}
