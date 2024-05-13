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

const FUNDING_AMOUNT = 60000
const FUNDING_COMMENT = 'This was the test comment'

describe('Testing Project with lightning node', () => {
  beforeEach(() => {
    cy.visit(`${geyserUrl}/project/lndtestproject`, {
      onBeforeLoad(win: Window): void {
        cy.spy(win.navigator.clipboard, 'writeText').as('copy')
      },
    })
  })

  textLightningSuccessFlow()
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

const textLightningSuccessFlow = () => {
  context('When lightning invoice payment is sent correctly', () => {
    it('Paymnent successfull through lightning', () => {
      clickContribute()
      fundingAmountScreenIsVisible()

      enterAmountAndHitCheckout(FUNDING_AMOUNT)
      commentScreenIsVisible()

      enterCommentAndHitCheckout(FUNDING_COMMENT)
      lightningQrScreenIsVisible()

      clickCopyLightningInvoiceButton()

      cy.get('@copy')
        .its('lastCall.args.0')
        .then((value) => {
          const payLightningOptions = payLightningInvoice(value)
          cy.request(payLightningOptions).then(() => {
            successScreenIsVisible()
          })
        })
    })
  })
}

const onChainSuccessFlow = () => {
  context('When onchain amount paid is correct', () => {
    it('Should show onChain success screen', () => {
      clickContribute()
      fundingAmountScreenIsVisible()

      enterAmountAndHitCheckout(FUNDING_AMOUNT)
      commentScreenIsVisible()

      enterCommentAndHitCheckout(FUNDING_COMMENT)
      lightningQrScreenIsVisible()

      clickOnchainQrTab()
      onChainQrScreenIsVisible()

      clickCopyOnChainButton()

      cy.get('@copy')
        .its('lastCall.args.0')
        .then((value) => {
          const onChainAddress = value.split(':')[1].split('?')[0]
          const payOnchain = payOnChainOptions(onChainAddress, FUNDING_AMOUNT)
          cy.request(payOnchain).then((response) => {
            onChainTransactionProcessingScreenIsVisible()

            const mineBlock = mineBlockOptions()
            cy.request(mineBlock).then(() => {
              successScreenIsVisible()
            })
          })
        })
    })
  })
}

const onChainRefundFlow = () => {
  context('when onchain amount paid is short', () => {
    it('Should show refund initiated', () => {
      clickContribute()
      fundingAmountScreenIsVisible()

      enterAmountAndHitCheckout(FUNDING_AMOUNT)
      commentScreenIsVisible()

      enterCommentAndHitCheckout(FUNDING_COMMENT)
      lightningQrScreenIsVisible()

      clickOnchainQrTab()
      onChainQrScreenIsVisible()

      clickCopyOnChainButton()

      cy.get('@copy')
        .its('lastCall.args.0')
        .then((value) => {
          const onChainAddress = value.split(':')[1].split('?')[0]
          const payOnchain = payOnChainOptions(onChainAddress, FUNDING_AMOUNT - 1000)
          cy.request(payOnchain).then((response) => {
            transactionFailedScreenIsVisible()

            enterRefundAddressAndClickRefund(MINE_BLOCK_ADDRESS)

            refundInitiatedScreenIsVisible()
          })
        })
    })
  })
}
