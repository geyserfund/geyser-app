export const fundingAmountScreenIsVisible = () => {
  cy.get('p').contains('Make a donation', { timeout: 10000 }).should('be.visible')
  cy.get('input[data-testid="donation-input"]').should('be.visible')
}

export const commentScreenIsVisible = () => {
  cy.get('p').contains('Public comment').should('be.visible')
}

export const lightningQrScreenIsVisible = () => {
  cy.get('canvas').should('have.id', 'qr-code') // This is the QR code
  cy.get('#copy-lightning-invoice-button').should('be.visible')
}

export const onChainQrScreenIsVisible = () => {
  cy.get('canvas').should('have.id', 'qr-code') // This is the QR code
  cy.get('#copy-onchain-address-button').should('be.visible')

  cy.get('#onchain-transaction-processing-card').should('not.exist')
}

export const onChainTransactionProcessingScreenIsVisible = () => {
  cy.get('#onchain-transaction-processing-card', { timeout: 10000 }).should('exist')
  cy.get('#successful-contribution-banner').should('not.exist')
}

export const successScreenIsVisible = () => {
  cy.get('#successful-contribution-banner', { timeout: 10000 }).should('exist')
}

export const transactionFailedScreenIsVisible = () => {
  cy.get('#transaction-failed-card', { timeout: 10000 }).should('exist')
  cy.get('#refund-address-input').should('exist')
  cy.get('#initiate-refund-button').should('exist')
}

export const refundInitiatedScreenIsVisible = () => {
  cy.get('#refund-initiated-card', { timeout: 10000 }).should('exist')
}
