import { visitProject } from '../actions/funding'
import { GEYSER_URL, LIGHTNING_TEST_PROJECT_NAME, LND_TEST_PROJECT_NAME } from '../contants'
import { onChainRefundFlow, onChainSuccessFlow, testLightningSuccessFlow } from './funding'

describe('Testing Project with lightning node', () => {
  context('When lightning invoice payment is sent correctly', () => {
    before(() => {
      visitProject(LND_TEST_PROJECT_NAME)
    })
    it('Payment successfull through lightning', () => {
      testLightningSuccessFlow()
    })
  })

  context('When onchain amount paid is correct', () => {
    before(() => {
      visitProject(LND_TEST_PROJECT_NAME)
    })
    it('Should show onChain success screen', () => {
      onChainSuccessFlow()
    })
  })

  context('when onchain amount paid is short', () => {
    before(() => {
      visitProject(LND_TEST_PROJECT_NAME)
    })
    it('Should show refund initiated', () => {
      onChainRefundFlow()
    })
  })
})

describe('Testing Project with lightning wallet', () => {
  context('When lightning invoice payment is sent correctly', () => {
    before(() => {
      visitProject(LND_TEST_PROJECT_NAME)
    })
    it('Payment successfull through lightning', () => {
      testLightningSuccessFlow()
    })
  })
})
