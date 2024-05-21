export const clickContribute = () => {
  cy.get('button').contains('Contribute').click()
}

export const selectRewardAndHitCheckout = () => {
  cy.get('button').contains('Select item').click()
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

export const clickOnchainQrTab = () => {
  cy.get('button').contains('Onchain').click()
  cy.get('button').contains('Download & Continue').click()
}

export const clickCopyOnChainButton = () => {
  cy.get('#copy-onchain-address-button').realClick()
}

export const clickCopyLightningInvoiceButton = () => {
  cy.get('#copy-lightning-invoice-button').realClick()
  cy.get('#copy-lightning-invoice-button').realClick()
}

export const enterRefundAddressAndClickRefund = (comment: string) => {
  cy.get('#refund-address-input').type(comment)
  cy.get('#initiate-refund-button').realClick()
}
