export const fundingAmountScreenIsVisible = () => {
  cy.get('h1').contains('Make a donation', { timeout: 10000 }).should('be.visible')
  cy.get('input[data-testid="donation-input"]').should('be.visible')
}

export const commentScreenIsVisible = () => {
  cy.get('h1').contains('Public comment').should('be.visible')
}

export const lightningQrScreenIsVisible = () => {
  cy.get('canvas', { timeout: 10000 }).should('have.id', 'qr-code') // This is the QR code
  cy.get('#copy-lightning-invoice-button').should('exist')
}

export const onChainQrScreenIsVisible = () => {
  cy.get('canvas').should('have.id', 'qr-code') // This is the QR code
  cy.get('#copy-onchain-address-button').should('exist')

  cy.get('#onchain-transaction-processing-card').should('not.exist')
}

export const onChainTransactionProcessingScreenIsVisible = () => {
  cy.get('#onchain-transaction-processing-card', { timeout: 15000 }).should('exist')
  cy.get('#successful-contribution-banner').should('not.exist')
}

export const successScreenIsVisible = () => {
  cy.get('#successful-contribution-banner', { timeout: 15000 }).should('exist')
}

export const transactionFailedScreenIsVisible = () => {
  cy.get('#transaction-failed-card', { timeout: 15000 }).should('exist')
  cy.get('#refund-address-input').should('exist')
  cy.get('#initiate-refund-button').should('exist')
}

export const refundInitiatedScreenIsVisible = () => {
  cy.get('#refund-initiated-card', { timeout: 15000 }).should('exist')
}
