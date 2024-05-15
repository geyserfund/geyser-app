import { GEYSER_URL, LIGHTNING_TEST_PROJECT_NAME, LND_TEST_PROJECT_NAME } from '../contants'
import { onChainRefundFlow, onChainSuccessFlow, testLightningSuccessFlow } from './funding'

describe('Testing Project with lightning node', () => {
  beforeEach(() => {
    cy.visit(`${GEYSER_URL}/project/${LND_TEST_PROJECT_NAME}`, {
      onBeforeLoad(win: Window): void {
        cy.spy(win.navigator.clipboard, 'writeText').as('copy')
      },
    })
  })

  context('When lightning invoice payment is sent correctly', () => {
    it('Payment successfull through lightning', () => {
      testLightningSuccessFlow()
    })
  })

  context('When onchain amount paid is correct', () => {
    it('Should show onChain success screen', () => {
      onChainSuccessFlow()
    })
  })

  context('when onchain amount paid is short', () => {
    it('Should show refund initiated', () => {
      onChainRefundFlow()
    })
  })
})

describe('Testing Project with lightning wallet', () => {
  beforeEach(() => {
    cy.visit(`${GEYSER_URL}/project/${LIGHTNING_TEST_PROJECT_NAME}`, {
      onBeforeLoad(win: Window): void {
        cy.spy(win.navigator.clipboard, 'writeText').as('copy')
      },
    })
  })
  context('When lightning invoice payment is sent correctly', () => {
    it('Payment successfull through lightning', () => {
      testLightningSuccessFlow()
    })
  })
})
