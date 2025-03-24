export const clickContribute = () => {
  cy.get('button')
    .contains('Contribute')
    .should('be.visible')
    .should('not.be.disabled')
    .should('not.have.attr', 'aria-disabled', 'true')

  cy.get('button').contains('Contribute').realClick()
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
  cy.get('button').contains('Download & Continue').click()
}

export const clickCopyOnChainButton = () => {
  // First ensure the button exists
  cy.get('#copy-onchain-address-button').should('exist')

  // Scroll the button into view before checking visibility
  cy.get('#copy-onchain-address-button').scrollIntoView({ duration: 500 })

  // Now check that it's visible and clickable
  cy.get('#copy-onchain-address-button').should('be.visible').should('not.be.disabled').click({ force: true })
}

export const clickCopyLightningInvoiceButton = () => {
  // First ensure the button exists
  cy.get('#copy-lightning-invoice-button').should('exist')

  // Scroll the button into view before checking visibility
  cy.get('#copy-lightning-invoice-button').scrollIntoView({ duration: 500 })

  // Now check that it's visible and clickable
  cy.get('#copy-lightning-invoice-button').should('be.visible').should('not.be.disabled').click({ force: true })
}

export const enterRefundAddressAndClickRefund = (comment: string) => {
  cy.get('#refund-address-input').type(comment)
  cy.get('#initiate-refund-button').realClick()
}
