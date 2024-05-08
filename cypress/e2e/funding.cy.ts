import { cli } from 'cypress'

import {
  clickContribute,
  clickOnchainQrTab,
  enterAmountAndHitCheckout,
  enterCommentAndHitCheckout,
} from '../actions/funding'
import { geyserUrl } from '../contants'
import { getDropdownButton, loginWithNostr, logoutUser, openConnectPopup } from '../utils/auth'
import { aliasQuery, hasOperationName, interceptGraphql } from '../utils/graphql'

/**
 * THIS IS THE NOSTR EVENT USED FOR TESTING THIS MODULE
  {
    "id": "d0d5289d90e8ffd7ebff068ffd93e1a84b69f1b890a3055d5039b353e73ca46f",
    "pubkey": "217ac0828c448c1e68c2e781df89884bcae16a1e79fe6df267863155ab789c02",
    // npub1y9avpq5vgjxpu6xzu7qalzvgf09wz6s708lxmun8scc4t2mcnspqrmt40y
    // nsec1smf92mawwjfluyj8neww9xllwyeq88dhu70zuvdyc54mq9hg286ql40vtq
    "created_at": 1688585029,
    "kind": 1,
    "tags": [],
    "content": "hello",
    "sig": "5d097183ae4b599a83f6f78249bc35be58c6d58ce35d0c4ca165a41f980902378437711c288d9f3410741009b8459e65e824f927ca8f8072247de93144fa51fd"
  }
 */

describe('Invoice Generation LND', () => {
  beforeEach(() => {
    cy.visit(`${geyserUrl}/project/lndtestproject`)
  })

  // it('Should open up donation form', () => {
  //   clickContribute()

  //   cy.get('p').contains('Make a donation').should('be.visible')
  //   cy.get('input[data-testid="donation-input"]').should('be.visible')
  // })

  // it('Should open up comments screen', () => {
  //   clickContribute()
  //   enterAmountAndHitCheckout()

  //   cy.get('p').contains('Public comment').should('be.visible')
  // })

  // it('Should show lightning qr screen', async () => {
  //   clickContribute()
  //   enterAmountAndHitCheckout()
  //   enterCommentAndHitCheckout()

  //   cy.get('canvas').should('have.id', 'qr-code') // This is the QR code
  //   cy.get('button').contains('Copy lightning invoice').should('be.visible')
  // })

  // it('Should show onChain qr screen', async () => {
  //   clickContribute()
  //   enterAmountAndHitCheckout()
  //   enterCommentAndHitCheckout()
  //   clickOnchainQrTab()

  //   cy.get('canvas').should('have.id', 'qr-code') // This is the QR code
  //   cy.get('button').contains('Copy onchain address').should('be.visible')
  // })

  it('Should show onChain success screen', async () => {
    clickContribute()
    enterAmountAndHitCheckout()
    enterCommentAndHitCheckout()
    clickOnchainQrTab()

    cy.get('canvas').should('have.id', 'qr-code') // This is the QR code
    cy.get('button').contains('Copy onchain address').should('be.visible')

    cy.get('button').contains('Copy onchain address').click()
    cy.window()
      .its('navigator.clipboard')
      .then((clipboard) => {
        const value = clipboard.readText()
        cy.task('log', `checking values: ${value}`)
      })

    cy.get('h3').contains('Transaction is being processed...').should('not.be.visible')

    // cy.request(payOnChain('bcrt1q2q03za80s5pua75srnqn0dujfr2qp9km7jfmnn', 60000))

    cy.get('h3').contains('Transaction is being processed...').should('be.visible')
  })

  //   it('Should login with nostr', () => {
  //     getDropdownButton().find('img').should('not.exist')

  //     loginWithNostr()

  //     getDropdownButton().find('img').should('exist')
  //   })

  //   it('Should login and logout', () => {
  //     loginWithNostr()

  //     getDropdownButton().find('img').should('exist')

  //     logoutUser()

  //     getDropdownButton().find('img').should('not.exist')
  //   })
})
