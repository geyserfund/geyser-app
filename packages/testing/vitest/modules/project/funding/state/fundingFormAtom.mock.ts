import {
  FundFormType,
  FundingProjectState,
} from '../../../../../../../src/modules/project/funding/state/fundingFormAtom.ts'
import {
  ProjectSubscriptionPlan,
  recurringFundingModes,
  recurringIntervals,
} from '../../../../../../../src/modules/project/recurring/graphql'
import { QuoteCurrency, RewardCurrency, ShippingDestination, WalletState } from '../../../../../../../src/types'

// --- Mocks ---
export const mockUsdRate = 50000

export const mockBitcoinQuote = {
  quote: mockUsdRate,
  quoteCurrency: QuoteCurrency.Usd,
}

// Define minimal mock subscriptions for testing subscription calculations
export const mockSubscriptionsMinimal: ProjectSubscriptionPlan[] = [
  {
    id: '201',
    name: 'Monthly USD Supporter',
    amountUsdCent: 500,
    amountBtcSat: 20000,
    interval: recurringIntervals.monthly,
    projectId: '1',
  },
  {
    id: '202',
    name: 'Annual SATS Backer',
    amountUsdCent: 2500,
    amountBtcSat: 100000,
    interval: recurringIntervals.yearly,
    projectId: '1',
  },
]

// Mock project data using the minimal subscriptions
export const mockProjectDataUsd: FundingProjectState = {
  id: 1,
  name: 'usd-project',
  title: 'USD Project',
  isRecoverableGrant: false,
  rewardCurrency: RewardCurrency.Usdcent,
  paymentMethods: {
    fiat: { enabled: false, stripe: false, __typename: 'FiatPaymentMethods' },
    managedRecoverableGrant: {
      stripe: false,
      strikeLightning: false,
      strikeOnChain: false,
      __typename: 'ManagedRecoverableGrantPaymentMethods',
    },
    __typename: 'PaymentMethods',
  },
  owners: [],
  rewards: [],
  wallet: {
    id: 'wallet1',
    limits: { contribution: { min: 100, max: 10000000, onChain: { min: 5000, max: 5000000 } } },
    state: 'Ready' as unknown as WalletState,
    __typename: 'Wallet',
  },
  subscriptions: mockSubscriptionsMinimal,
}

// Initial state used by tests
export const initialTestState: FundFormType = {
  fundingMode: recurringFundingModes.oneTime,
  recurringInterval: recurringIntervals.monthly,
  donationAmount: 0,
  donationAmountUsdCent: 0,
  shippingCost: 0,
  comment: '',
  privateComment: '',
  email: '',
  media: '',
  followProject: true,
  subscribeToGeyserEmails: false,
  rewardsByIDAndCount: undefined,
  subscription: {
    subscriptionId: undefined,
    interval: recurringIntervals.monthly,
    name: '',
    amountUsdCent: 0,
    amountBtcSat: 0,
  },
  rewardCurrency: RewardCurrency.Usdcent,
  needsShipping: false,
  shippingDestination: ShippingDestination.National,
  geyserTipPercent: 2.1,
  guardianBadges: [],
}
