import { CONTRIBUTOR_LND_ENDPOINT, GEYSER_URL, LIGHTNING_TEST_PROJECT_NAME, LND_TEST_PROJECT_NAME } from '../contants'
import {
  onChainRefundFlow,
  onChainSuccessFlowWithDonation,
  onChainSuccessFlowWithRewards,
  testLightningSuccessFlow,
} from './funding'

// Helper function to set up Bitcoin address interception
function setupBitcoinAddressInterception() {
  cy.window().then((win) => {
    // Add an event listener to expose the clipboard value when it's available
    win.document.addEventListener('clipboard-value-available', (e) => {
      // @ts-ignore - This is a custom property for testing
      ;(win as any).testClipboardValue = (e as any).detail?.value || ''
    })

    // Inject a script to intercept the copy operation
    const script = win.document.createElement('script')
    script.textContent = `
      // Make sure we have a place to store the clipboard value
      window.testClipboardValue = null;

      // Intercept clipboard operations for testing
      const originalClipboardWrite = navigator.clipboard.writeText;
      navigator.clipboard.writeText = function(text) {
        // Store the complete text on the window for tests to access
        window.testClipboardValue = text;
        
        // Dispatch an event to notify our Cypress test
        document.dispatchEvent(new CustomEvent('clipboard-value-available', { 
          detail: { value: text } 
        }));
        
        // Call the original function
        return originalClipboardWrite.apply(this, arguments);
      };
    `
    win.document.head.appendChild(script)

    // Also override the clipboard spy setup
    cy.spy(win.navigator.clipboard, 'writeText').as('copy')
  })
}

// describe('Testing Project with lightning node', () => {
//   beforeEach(() => {
//     cy.visit(`${GEYSER_URL}/project/${LND_TEST_PROJECT_NAME}`)
//     setupBitcoinAddressInterception()
//   })

//   testLightningSuccessFlow()
//   onChainSuccessFlowWithRewards()
//   onChainSuccessFlowWithDonation()
//   onChainRefundFlow()
// })

describe(`Testing Project with lightning wallet LIGHTNING_TEST_PROJECT_NAME: ${LIGHTNING_TEST_PROJECT_NAME}, CONTRIBUTOR_LND_ENDPOINT:${CONTRIBUTOR_LND_ENDPOINT}`, () => {
  beforeEach(() => {
    cy.visit(`${GEYSER_URL}/project/${LIGHTNING_TEST_PROJECT_NAME}`)

    cy.window().then((win) => {
      cy.spy(win.navigator.clipboard, 'writeText').as('copy')
    })
  })
  testLightningSuccessFlow()
  // onChainSuccessFlowWithRewards()
  // onChainSuccessFlowWithDonation()
  // onChainRefundFlow()
})
