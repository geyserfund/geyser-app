import { GEYSER_URL, LIGHTNING_TEST_PROJECT_NAME, LND_TEST_PROJECT_NAME } from '../contants'
import {
  onChainRefundFlow,
  onChainSuccessFlowWithDonation,
  onChainSuccessFlowWithRewards,
  testLightningSuccessFlow,
} from './funding'

describe('Testing Project with lightning node', () => {
  beforeEach(() => {
    cy.visit(`${GEYSER_URL}/project/${LND_TEST_PROJECT_NAME}`)

    cy.window().then((win) => {
      cy.spy(win.navigator.clipboard, 'writeText').as('copy')
    })
  })

  testLightningSuccessFlow()
  onChainSuccessFlowWithRewards()
  onChainSuccessFlowWithDonation()
  onChainRefundFlow()
})

describe('Testing Project with lightning wallet', () => {
  beforeEach(() => {
    cy.visit(`${GEYSER_URL}/project/${LIGHTNING_TEST_PROJECT_NAME}`)

    cy.window().then((win) => {
      cy.spy(win.navigator.clipboard, 'writeText').as('copy')
    })
  })
  testLightningSuccessFlow()
  onChainSuccessFlowWithRewards()
  onChainSuccessFlowWithDonation()
  onChainRefundFlow()
})
