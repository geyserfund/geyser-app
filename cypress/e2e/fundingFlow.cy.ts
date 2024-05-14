import { geyserUrl } from '../contants'
import { onChainRefundFlow, onChainSuccessFlow, testLightningSuccessFlow } from './funding'

describe('Testing Project with lightning node', () => {
  beforeEach(() => {
    cy.visit(`${geyserUrl}/project/lndtestproject`, {
      onBeforeLoad(win: Window): void {
        cy.spy(win.navigator.clipboard, 'writeText').as('copy')
      },
    })
  })

  testLightningSuccessFlow()
  onChainSuccessFlow()
  onChainRefundFlow()
})

describe('Testing Project with lightning wallet', () => {
  beforeEach(() => {
    cy.visit(`${geyserUrl}/project/lightningtestproject`, {
      onBeforeLoad(win: Window): void {
        cy.spy(win.navigator.clipboard, 'writeText').as('copy')
      },
    })
  })
  testLightningSuccessFlow()
  onChainSuccessFlow()
  onChainRefundFlow()
})
