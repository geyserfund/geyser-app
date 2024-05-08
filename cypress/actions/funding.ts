// export const interceptNostr = (handler: RouteHandler) => {
//   return cy.intercept('GET', '/auth/nostr', handler).as('NostrAuth')
// }

export const clickContribute = () => {
  cy.get('button').contains('Contribute').click()
}

export const enterAmountAndHitCheckout = () => {
  cy.get('input[data-testid="donation-input"]').type('600000')
  cy.get('button').contains('Checkout').click()
}

export const enterCommentAndHitCheckout = () => {
  cy.get('textarea[data-testid="funding-comment-input"]').type('This is a test comment')
  cy.get('button').contains('Checkout').click()
}

export const clickOnchainQrTab = () => {
  cy.get('button').contains('Onchain').click()
  cy.get('button').contains('Download & Continue').click()
}
