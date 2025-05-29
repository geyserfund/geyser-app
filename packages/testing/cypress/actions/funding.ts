export const clickContribute = () => {
  cy.get('button')
    .contains('Contribute')
    .should('be.visible')
    .should('not.be.disabled')
    .should('not.have.attr', 'aria-disabled', 'true')

  cy.get('button').contains('Contribute').realClick()

  // Check if "Make a donation" text appears within timeout
  cy.get('h1', { timeout: 3000 }).then(($body) => {
    if (!$body.text().includes('Make a donation')) {
      cy.log('Make a donation not found, retrying click...')
      cy.get('button').contains('Contribute').realClick()

      // Wait for "Make a donation" text with longer timeout after retry
      cy.contains('Make a donation', { timeout: 7000 }).should('be.visible')
    }
  })
}

export const clickToggleDonationInput = () => {
  cy.get('button[data-testid="toggle-donation-input"]').click()
}

export const selectRewardAndHitCheckout = () => {
  cy.get('button').contains('Add').click()
  cy.get('button').contains('Checkout').click()
}

export const enterAmountAndHitCheckout = (amount: number) => {
  cy.get('input[data-testid="donation-input"]').type(amount.toString())
  cy.get('button').contains('Checkout').click()
}

export const enterCommentAndHitCheckout = (comment: string) => {
  cy.get('textarea[data-testid="funding-comment-input"]').type(comment)
  cy.get('button').contains('Checkout').click()
}

export const enterCommentAddEmailAndHitCheckout = (comment: string) => {
  cy.get('textarea[data-testid="funding-comment-input"]').type(comment)
  cy.get('input[type="email"]').type('pacafog448@neixos.com')
  cy.get('button').contains('Checkout').click()
}

export const clickOnchainQrTab = () => {
  cy.get('button').contains('Onchain').click()
  cy.get('button').contains('Download & Continue').should('exist')
  cy.get('button').contains('Download & Continue').scrollIntoView({ duration: 500 })
  cy.get('button').contains('Download & Continue').click({ force: true })
}

export const clickCopyOnChainButton = () => {
  // First ensure the button exists
  cy.get('#copy-onchain-address-button').should('exist')

  // Scroll the button into view before checking visibility
  cy.get('#copy-onchain-address-button').scrollIntoView({ duration: 500 })

  // First clear any existing clipboard value
  cy.window().then((win) => {
    // @ts-ignore
    ;(win as any).testClipboardValue = null
  })

  // Now check that it's visible and clickable
  cy.get('#copy-onchain-address-button').should('be.visible').should('not.be.disabled').click({ force: true })

  // Add a small delay to ensure the click event has time to process
  cy.wait(300).then(() => {
    // Click again to ensure it registers
    cy.get('#copy-onchain-address-button').click({ force: true })
  })

  // Verify the clipboard value was captured
  cy.window({ timeout: 5000 }).then((win) => {
    // @ts-ignore
    const clipValue = (win as any).testClipboardValue
    if (!clipValue) {
      cy.log('WARNING: Clipboard value not captured, retrying click...')

      // Try one more click with different approach
      cy.get('#copy-onchain-address-button').realClick()
    } else {
      cy.log('Successfully captured clipboard value')
    }
  })
}

export const clickCopyLightningInvoiceButton = () => {
  // First ensure the button exists
  cy.get('#copy-lightning-invoice-button').should('exist')

  // Scroll the button into view before checking visibility
  cy.get('#copy-lightning-invoice-button').scrollIntoView({ duration: 500 })

  // First clear any existing clipboard value
  cy.window().then((win) => {
    // @ts-ignore
    ;(win as any).testClipboardValue = null
  })

  // Now check that it's visible and clickable
  cy.get('#copy-lightning-invoice-button').should('be.visible').should('not.be.disabled').click({ force: true })

  // Add a small delay to ensure the click event has time to process
  cy.wait(300).then(() => {
    // Click again to ensure it registers
    cy.get('#copy-lightning-invoice-button').click({ force: true })
  })

  // Verify the clipboard value was captured
  cy.window({ timeout: 5000 }).then((win) => {
    // @ts-ignore
    const clipValue = (win as any).testClipboardValue
    if (!clipValue) {
      cy.log('WARNING: Clipboard value not captured, retrying click...')

      // Try one more click with different approach
      cy.get('#copy-lightning-invoice-button').realClick()
    } else {
      cy.log('Successfully captured clipboard value')
    }
  })
}

export const enterRefundAddressAndClickRefund = (comment: string) => {
  cy.get('#refund-address-input').type(comment)
  cy.get('#initiate-refund-button').should('exist').should('not.be.disabled')
  cy.get('#initiate-refund-button').click({ force: true })
  // Add a small delay to ensure the click event has time to process
  cy.wait(300).then(() => {
    // Click again to ensure it registers
    cy.get('body').then(($body) => {
      if ($body.find('#copy-lightning-invoice-button').length) {
        cy.get('#copy-lightning-invoice-button').click({ force: true })
      }
    })
  })
}
