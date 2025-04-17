import {
  FundFormType,
  FundingProjectState,
} from '../../../../../../../src/modules/project/funding/state/fundingFormAtom.ts' // Adjust path if needed
import {
  ProjectRewardFragment,
  ProjectSubscriptionPlansFragment,
  RewardCurrency,
  ShippingDestination,
  SubscriptionCurrencyType,
  UserSubscriptionInterval,
  WalletState,
} from '../../../../../../../src/types'

// --- Mocks ---
export const mockUsdRate = 50000

// Define mock rewards
export const mockRewardsFull: ProjectRewardFragment[] = [
  {
    id: '101', // String ID
    cost: 1000,
    hasShipping: false,
    __typename: 'ProjectReward',
    uuid: 'uuid-101',
    name: 'USD Reward 1 String ID',
    description: 'Desc 101',
    images: [],
    privateCommentPrompts: [],
    stock: null,
    deleted: false,
    sold: 0,
    rewardCurrency: RewardCurrency.Usdcent,
    isAddon: false,
    isHidden: false,
    preOrder: false,
    posts: [],
  },
  {
    id: 102, // Number ID
    cost: 20000,
    hasShipping: false,
    __typename: 'ProjectReward',
    uuid: 'uuid-102',
    name: 'USD Reward 2 Number ID',
    description: 'Desc 102',
    images: [],
    privateCommentPrompts: [],
    stock: null,
    deleted: false,
    sold: 0,
    rewardCurrency: RewardCurrency.Usdcent,
    isAddon: false,
    isHidden: false,
    preOrder: false,
    posts: [],
  },
  {
    id: 103, // Number ID
    cost: 500,
    hasShipping: true,
    __typename: 'ProjectReward',
    uuid: 'uuid-103',
    name: 'USD Reward 3 Shipping',
    description: 'Desc 103',
    images: [],
    privateCommentPrompts: [],
    stock: null,
    deleted: false,
    sold: 0,
    rewardCurrency: RewardCurrency.Usdcent,
    isAddon: false,
    isHidden: false,
    preOrder: false,
    posts: [],
  },
]

// Define minimal mock subscriptions for testing calculation logic
export const mockSubscriptionsMinimal: ProjectSubscriptionPlansFragment[] = [
  {
    id: 201,
    name: 'Monthly USD Supporter',
    cost: 500, // $5.00
    currency: 'USDCENT' as SubscriptionCurrencyType, // Use string literal + cast
    interval: UserSubscriptionInterval.Monthly,
    projectId: 1,
  },
  {
    id: 202,
    name: 'Annual SATS Backer',
    cost: 100000, // 100,000 sats
    currency: 'BTCSAT' as SubscriptionCurrencyType, // Use string literal + cast
    interval: UserSubscriptionInterval.Yearly,
    projectId: 1,
  },
]

// Mock project data using the minimal subscriptions
export const mockProjectDataUsd: FundingProjectState = {
  id: 1,
  name: 'usd-project',
  title: 'USD Project',
  rewardCurrency: RewardCurrency.Usdcent,
  paymentMethods: {
    fiat: { stripe: false, __typename: 'FiatPaymentMethods' },
    __typename: 'PaymentMethods',
  },
  owners: [],
  rewards: mockRewardsFull,
  wallet: {
    id: 'wallet1',
    limits: { contribution: { min: 100, max: 10000000, onChain: { min: 5000, max: 5000000 } } },
    state: 'Ready' as unknown as WalletState,
    __typename: 'Wallet',
  },
  subscriptions: mockSubscriptionsMinimal,
}

// Create a separate mock for a project using SATS rewards
export const mockProjectDataSats: FundingProjectState = {
  ...mockProjectDataUsd,
  id: 2,
  name: 'Test Project SATS Rewards',
  rewardCurrency: RewardCurrency.Btcsat, // Project uses SATS for rewards
  rewards: mockRewardsFull,
  subscriptions: mockSubscriptionsMinimal, // Use minimal subscriptions
}

// Initial state used by tests
export const initialTestState: FundFormType = {
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
    cost: 0,
    subscriptionId: undefined,
    currency: SubscriptionCurrencyType.Usdcent,
    interval: UserSubscriptionInterval.Monthly,
    name: '',
  },
  rewardCurrency: RewardCurrency.Usdcent,
  needsShipping: false,
  shippingDestination: ShippingDestination.National,
  geyserTipPercent: 2.1,
}
