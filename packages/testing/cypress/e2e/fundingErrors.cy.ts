import {
  clickContribute,
  clickToggleDonationInput,
  enterAmountAndHitCheckout,
  enterCommentAndHitCheckout,
} from '../actions/funding'
import { commentScreenIsVisible, fundingAmountScreenIsVisible } from '../assertions/funding'
import { ApolloErrors, GEYSER_URL, LND_TEST_PROJECT_NAME } from '../contants'
import { ErrorExtensionType, interceptFundingWithError } from '../utils/funding'

const FUNDING_AMOUNT = 60000
const FUNDING_COMMENT = 'This was the test comment'

describe('When fund mutation fails', () => {
  beforeEach(() => {
    cy.log('chekcing geyser url', GEYSER_URL)
    cy.visit(`${GEYSER_URL}/project/${LND_TEST_PROJECT_NAME}`)
  })

  context('when invoice is higher than limit', () => {
    it('should show wallet max error page', () => {
      errorFlowForFundingMutation({
        code: ApolloErrors.INVALID_FUNDING_AMOUNT,
        maxAmount: 50000,
      })
      cy.get('h2').contains('Receiver’s Wallet Transaction Above Maximum Limit').should('be.visible')
    })
  })

  context('when invoice is lower than limit', () => {
    it('should show wallet min error page', () => {
      errorFlowForFundingMutation({
        code: ApolloErrors.INVALID_FUNDING_AMOUNT,
        minAmount: 80000,
      })

      cy.get('h2').contains('Receiver’s Wallet Transaction Below Minimum Limit').should('be.visible')
    })
  })

  context('when wallet is unreachable', () => {
    it('should show wallet unreachable error page', () => {
      errorFlowForFundingMutation({
        code: ApolloErrors.WALLET_UNREACHABLE,
      })

      cy.get('h2').contains('Wallet Unreachable').should('be.visible')
    })
  })

  context('when project is inactive', () => {
    it('should show project inactive error page', () => {
      errorFlowForFundingMutation({
        code: ApolloErrors.NON_ACTIVE_PROJECT,
      })

      cy.get('h2').contains('Inactive Project').should('be.visible')
    })
  })

  context('when reward is unavilable', () => {
    it('should show reward outofstock error page', () => {
      errorFlowForFundingMutation({
        code: ApolloErrors.REWARD_OUT_OF_STOCK,
      })

      cy.get('h2').contains('Products Out of Stock').should('be.visible')
    })
  })

  context('when server responds with internal server error', () => {
    it('should show general error page', () => {
      errorFlowForFundingMutation({
        code: ApolloErrors.INTERNAL_SERVER_ERROR,
      })

      cy.get('h2').contains('An Error Occured').should('be.visible')
    })
  })
})

const errorFlowForFundingMutation = (errorExtension: ErrorExtensionType) => {
  clickContribute()
  fundingAmountScreenIsVisible()

  clickToggleDonationInput()
  enterAmountAndHitCheckout(FUNDING_AMOUNT)
  commentScreenIsVisible()

  interceptFundingWithError(errorExtension)

  enterCommentAndHitCheckout(FUNDING_COMMENT)
}
