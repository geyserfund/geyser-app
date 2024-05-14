import {
  clickContribute,
  clickCopyLightningInvoiceButton,
  clickCopyOnChainButton,
  clickOnchainQrTab,
  enterAmountAndHitCheckout,
  enterCommentAndHitCheckout,
  enterRefundAddressAndClickRefund,
} from '../actions/funding'
import {
  commentScreenIsVisible,
  fundingAmountScreenIsVisible,
  lightningQrScreenIsVisible,
  onChainQrScreenIsVisible,
  onChainTransactionProcessingScreenIsVisible,
  refundInitiatedScreenIsVisible,
  successScreenIsVisible,
  transactionFailedScreenIsVisible,
} from '../assertions/funding'
import { geyserUrl, MINE_BLOCK_ADDRESS } from '../contants'
import { mineBlockOptions, payLightningInvoice, payOnChainOptions } from '../utils/lncli'
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
})
