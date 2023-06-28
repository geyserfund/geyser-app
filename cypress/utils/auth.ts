import { RouteHandler } from 'cypress/types/net-stubbing'

export const interceptNostr = (handler: RouteHandler) => {
  return cy.intercept('POST', '*/nostr', handler)
}

export const openConnectPopup = () => {
  cy.get('button').contains('Connect').click()
  cy.get('p').contains('Connect').should('be.visible')
}
