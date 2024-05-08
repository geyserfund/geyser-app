// export const interceptNostr = (handler: RouteHandler) => {
//   return cy.intercept('GET', '/auth/nostr', handler).as('NostrAuth')
// }

export const clickContribute = () => {
  cy.get('button').contains('Contribute').click()
}
