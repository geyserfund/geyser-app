import {
  clickContribute,
  clickCopyLightningInvoiceButton,
  clickCopyOnChainButton,
  clickOnchainQrTab,
  clickToggleDonationInput,
  enterAmountAndHitCheckout,
  enterCommentAddEmailAndHitCheckout,
  enterCommentAndHitCheckout,
  enterRefundAddressAndClickRefund,
  selectRewardAndHitCheckout,
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
import { MINE_BLOCK_ADDRESS } from '../contants'
import { mineBlockOptions, payLightningInvoice, payOnChainOptions } from '../utils/lncli'

const ONCHAIN_FUNDING_AMOUNT = 60000
const LIGHTNING_FUNDING_AMOUNT = 1000

const ONCHAIN_FUNDING_AMOUNT_WITH_TIP = ONCHAIN_FUNDING_AMOUNT + ONCHAIN_FUNDING_AMOUNT * 0.1

const FUNDING_COMMENT = 'This was the test comment'

export const testLightningSuccessFlow = () => {
  context('When lightning invoice payment is sent correctly', () => {
    it('Payment successfull through lightning', () => {
      clickContribute()
      fundingAmountScreenIsVisible()

      clickToggleDonationInput()
      enterAmountAndHitCheckout(LIGHTNING_FUNDING_AMOUNT)
      commentScreenIsVisible()

      enterCommentAndHitCheckout(FUNDING_COMMENT)
      lightningQrScreenIsVisible()

      clickCopyLightningInvoiceButton()

      // Wait for our custom event handler to capture the clipboard value
      cy.window().then((win) => {
        // Wait for a short period to ensure our event handler has time to run
        cy.wait(500).then(() => {
          const clipboardValue = (win as any).testClipboardValue

          cy.log('DEBUG - Clipboard Value: ', clipboardValue)
          cy.task('log', `DEBUG - Clipboard Value: ${clipboardValue}`)

          const payLightningOptions = payLightningInvoice(clipboardValue)
          cy.request(payLightningOptions).then(() => {
            successScreenIsVisible()
          })
        })
      })
    })
  })
}

export const onChainSuccessFlowWithRewards = () => {
  context('When reward is selected and onchain amount paid is correct', () => {
    it('Should show onChain success screen', () => {
      clickContribute()
      fundingAmountScreenIsVisible()

      clickToggleDonationInput()
      selectRewardAndHitCheckout()
      commentScreenIsVisible()

      enterCommentAddEmailAndHitCheckout(FUNDING_COMMENT)
      lightningQrScreenIsVisible()

      clickOnchainQrTab()
      onChainQrScreenIsVisible()

      clickCopyOnChainButton()

      // Wait for our custom event handler to capture the clipboard value
      cy.window().then((win) => {
        // Wait for a short period to ensure our event handler has time to run
        cy.wait(500).then(() => {
          // @ts-ignore - testClipboardValue is added by our custom interception
          const clipboardValue = (win as any).testClipboardValue

          // Now parse the BIP21 URL in the test

          cy.task('log', `DEBUG - Clipboard Value: ${clipboardValue}`)
          const onChainAddress = clipboardValue.split(':')[1]?.split('?')[0]

          cy.task('log', `DEBUG - OnChain Address: ${onChainAddress}`)

          const payOnchain = payOnChainOptions(onChainAddress, ONCHAIN_FUNDING_AMOUNT_WITH_TIP)
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
  })
}

export const onChainSuccessFlowWithDonation = () => {
  context('When donation amount is added and onchain amount paid is correct', () => {
    it('Should show onChain success screen', () => {
      clickContribute()
      fundingAmountScreenIsVisible()

      clickToggleDonationInput()
      enterAmountAndHitCheckout(ONCHAIN_FUNDING_AMOUNT)
      commentScreenIsVisible()

      enterCommentAndHitCheckout(FUNDING_COMMENT)
      lightningQrScreenIsVisible()

      clickOnchainQrTab()
      onChainQrScreenIsVisible()

      clickCopyOnChainButton()

      // Wait for our custom event handler to capture the clipboard value
      cy.window().then((win) => {
        // Wait for a short period to ensure our event handler has time to run
        cy.wait(500).then(() => {
          // @ts-ignore - testClipboardValue is added by our custom interception
          const clipboardValue = (win as any).testClipboardValue

          // Now parse the BIP21 URL in the test
          cy.log('Full clipboard value:', clipboardValue)
          const onChainAddress = clipboardValue.split(':')[1]?.split('?')[0]

          cy.log('Extracted Bitcoin address:', onChainAddress)
          const payOnchain = payOnChainOptions(onChainAddress, ONCHAIN_FUNDING_AMOUNT_WITH_TIP)
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
  })
}

export const onChainRefundFlow = () => {
  context('when onchain amount paid is short', () => {
    it('Should show refund initiated', () => {
      clickContribute()
      fundingAmountScreenIsVisible()

      clickToggleDonationInput()
      enterAmountAndHitCheckout(ONCHAIN_FUNDING_AMOUNT)
      commentScreenIsVisible()

      enterCommentAndHitCheckout(FUNDING_COMMENT)
      lightningQrScreenIsVisible()

      clickOnchainQrTab()
      onChainQrScreenIsVisible()

      clickCopyOnChainButton()

      // Wait for our custom event handler to capture the clipboard value
      cy.window().then((win) => {
        // Wait for a short period to ensure our event handler has time to run
        cy.wait(500).then(() => {
          // @ts-ignore - testClipboardValue is added by our custom interception
          const clipboardValue = (win as any).testClipboardValue

          // Now parse the BIP21 URL in the test
          cy.log('Full clipboard value:', clipboardValue)
          const onChainAddress = clipboardValue.split(':')[1]?.split('?')[0]

          cy.log('Extracted Bitcoin address:', onChainAddress)
          const payOnchain = payOnChainOptions(onChainAddress, ONCHAIN_FUNDING_AMOUNT_WITH_TIP - 1000)
          cy.request(payOnchain).then((response) => {
            transactionFailedScreenIsVisible()

            enterRefundAddressAndClickRefund(MINE_BLOCK_ADDRESS)

            refundInitiatedScreenIsVisible()
          })
        })
      })
    })
  })
}
