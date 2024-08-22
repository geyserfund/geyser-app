import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  Date: { input: any; output: any; }
};

export type ActivitiesCountGroupedByProjectInput = {
  createdAt: DateRangeInput;
  feed: ActivityFeedName;
};

export type ActivitiesGetResponse = {
  __typename?: 'ActivitiesGetResponse';
  activities: Array<Activity>;
  pagination?: Maybe<CursorPaginationResponse>;
};

export type Activity = {
  __typename?: 'Activity';
  activityType: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  projectId: Scalars['BigInt']['output'];
  resource: ActivityResource;
};

export type ActivityCreatedSubscriptionInput = {
  where?: InputMaybe<ActivityCreatedSubscriptionWhereInput>;
};

export type ActivityCreatedSubscriptionWhereInput = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  feed?: InputMaybe<ActivityFeedName>;
  projectIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  region?: InputMaybe<Scalars['String']['input']>;
  resourceType?: InputMaybe<ActivityResourceType>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  userIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum ActivityFeedName {
  FollowedProjects = 'FOLLOWED_PROJECTS',
  GlobalProjects = 'GLOBAL_PROJECTS',
  MyProjects = 'MY_PROJECTS'
}

export type ActivityResource = Entry | FundingTx | Project | ProjectGoal | ProjectReward;

export enum ActivityResourceType {
  Entry = 'entry',
  FundingTx = 'funding_tx',
  Project = 'project',
  ProjectGoal = 'project_goal',
  ProjectReward = 'project_reward'
}

export type AffiliateLink = {
  __typename?: 'AffiliateLink';
  affiliateFeePercentage: Scalars['Int']['output'];
  affiliateId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  disabled?: Maybe<Scalars['Boolean']['output']>;
  disabledAt?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  label?: Maybe<Scalars['String']['output']>;
  lightningAddress: Scalars['String']['output'];
  projectId: Scalars['BigInt']['output'];
  stats?: Maybe<AffiliateStats>;
};

export type AffiliateLinkCreateInput = {
  affiliateFeePercentage: Scalars['Int']['input'];
  affiliateId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  label: Scalars['String']['input'];
  lightningAddress: Scalars['String']['input'];
  projectId: Scalars['BigInt']['input'];
};

export type AffiliatePaymentConfirmResponse = {
  __typename?: 'AffiliatePaymentConfirmResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AffiliatePayoutsStats = {
  __typename?: 'AffiliatePayoutsStats';
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AffiliateSalesStats = {
  __typename?: 'AffiliateSalesStats';
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AffiliateStats = {
  __typename?: 'AffiliateStats';
  payouts: AffiliatePayoutsStats;
  sales: AffiliateSalesStats;
};

export enum AffiliateStatus {
  Paid = 'PAID',
  Unpaid = 'UNPAID'
}

export type Ambassador = {
  __typename?: 'Ambassador';
  confirmed: Scalars['Boolean']['output'];
  id: Scalars['BigInt']['output'];
  user: User;
};

export type AmountSummary = {
  __typename?: 'AmountSummary';
  donationAmount: Scalars['Int']['output'];
  rewardsCost: Scalars['Int']['output'];
  shippingCost: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum AnalyticsGroupByInterval {
  Day = 'day',
  Month = 'month',
  Week = 'week',
  Year = 'year'
}

export type Badge = {
  __typename?: 'Badge';
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  thumb: Scalars['String']['output'];
  uniqueName: Scalars['String']['output'];
};

export type BadgeClaimInput = {
  userBadgeId: Scalars['BigInt']['input'];
};

export type BadgesGetInput = {
  where?: InputMaybe<BadgesGetWhereInput>;
};

export type BadgesGetWhereInput = {
  fundingTxId?: InputMaybe<Scalars['BigInt']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export enum BaseCurrency {
  Btc = 'BTC'
}

export type BitcoinQuote = {
  __typename?: 'BitcoinQuote';
  quote: Scalars['Float']['output'];
  quoteCurrency: QuoteCurrency;
};

export type BoardVoteGrant = {
  __typename?: 'BoardVoteGrant';
  applicants: Array<GrantApplicant>;
  balance: Scalars['Int']['output'];
  boardMembers: Array<GrantBoardMember>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  shortDescription: Scalars['String']['output'];
  sponsors: Array<Sponsor>;
  status: GrantStatusEnum;
  statuses: Array<GrantStatus>;
  title: Scalars['String']['output'];
  type: GrantType;
};


export type BoardVoteGrantApplicantsArgs = {
  input?: InputMaybe<GrantApplicantsGetInput>;
};

export type CommunityVoteGrant = {
  __typename?: 'CommunityVoteGrant';
  applicants: Array<GrantApplicant>;
  balance: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  distributionSystem: DistributionSystem;
  id: Scalars['BigInt']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  shortDescription: Scalars['String']['output'];
  sponsors: Array<Sponsor>;
  status: GrantStatusEnum;
  statuses: Array<GrantStatus>;
  title: Scalars['String']['output'];
  type: GrantType;
  votes: CompetitionVoteGrantVoteSummary;
  votingSystem: VotingSystem;
};


export type CommunityVoteGrantApplicantsArgs = {
  input?: InputMaybe<GrantApplicantsGetInput>;
};

export type CompetitionVoteGrantVoteSummary = {
  __typename?: 'CompetitionVoteGrantVoteSummary';
  voteCount: Scalars['Int']['output'];
  voterCount: Scalars['Int']['output'];
};

export type ConnectionDetails = LightningAddressConnectionDetails | LndConnectionDetailsPrivate | LndConnectionDetailsPublic;

export type Country = {
  __typename?: 'Country';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CreateEntryInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  /** Short description of the Entry. */
  description: Scalars['String']['input'];
  /** Header image of the Entry. */
  image?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['BigInt']['input'];
  /** Title of the Entry. */
  title: Scalars['String']['input'];
  type: EntryType;
};

export type CreateProjectInput = {
  /** Project ISO3166 country code */
  countryCode?: InputMaybe<Scalars['String']['input']>;
  /** A short description of the project. */
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  /** Main project image. */
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** Project region */
  region?: InputMaybe<Scalars['String']['input']>;
  /** The currency used to price rewards for the project. Currently only USDCENT supported. */
  rewardCurrency?: InputMaybe<RewardCurrency>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  thumbnailImage?: InputMaybe<Scalars['String']['input']>;
  /** Public title of the project. */
  title: Scalars['String']['input'];
  type?: InputMaybe<ProjectType>;
};

export type CreateProjectRewardInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  /** Cost of the reward, currently only in USD cents */
  cost: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  estimatedAvailabilityDate?: InputMaybe<Scalars['Date']['input']>;
  estimatedDeliveryInWeeks?: InputMaybe<Scalars['Int']['input']>;
  hasShipping: Scalars['Boolean']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  isAddon?: InputMaybe<Scalars['Boolean']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  maxClaimable?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  preOrder?: InputMaybe<Scalars['Boolean']['input']>;
  projectId: Scalars['BigInt']['input'];
};

export type CreateWalletInput = {
  feePercentage: Scalars['Float']['input'];
  lightningAddressConnectionDetailsInput?: InputMaybe<LightningAddressConnectionDetailsCreateInput>;
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  resourceInput: WalletResourceInput;
};

export type CreatorNotificationSettings = {
  __typename?: 'CreatorNotificationSettings';
  notificationSettings: Array<NotificationSettings>;
  project: CreatorNotificationSettingsProject;
  userId: Scalars['BigInt']['output'];
};

export type CreatorNotificationSettingsProject = {
  __typename?: 'CreatorNotificationSettingsProject';
  id: Scalars['BigInt']['output'];
  image?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export enum Currency {
  Usdcent = 'USDCENT'
}

export type CurrencyQuoteGetInput = {
  baseCurrency: BaseCurrency;
  quoteCurrency: QuoteCurrency;
};

export type CurrencyQuoteGetResponse = {
  __typename?: 'CurrencyQuoteGetResponse';
  baseCurrency: BaseCurrency;
  quote: Scalars['Float']['output'];
  quoteCurrency: QuoteCurrency;
  timestamp: Scalars['Date']['output'];
};

export type CursorInput = {
  id: Scalars['BigInt']['input'];
};

export type CursorInputString = {
  id: Scalars['String']['input'];
};

export type CursorPaginationResponse = {
  __typename?: 'CursorPaginationResponse';
  count?: Maybe<Scalars['Int']['output']>;
  cursor?: Maybe<PaginationCursor>;
  take?: Maybe<Scalars['Int']['output']>;
};

export type DateRangeInput = {
  endDateTime?: InputMaybe<Scalars['Date']['input']>;
  startDateTime?: InputMaybe<Scalars['Date']['input']>;
};

export type DatetimeRange = {
  __typename?: 'DatetimeRange';
  /** The end datetime for filtering the data, default is now. */
  endDateTime?: Maybe<Scalars['Date']['output']>;
  /** The start datetime for filtering the data. */
  startDateTime: Scalars['Date']['output'];
};

export type DeleteProjectInput = {
  projectId: Scalars['BigInt']['input'];
};

export type DeleteProjectRewardInput = {
  projectRewardId: Scalars['BigInt']['input'];
};

export type DeleteUserResponse = MutationResponse & {
  __typename?: 'DeleteUserResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum DistributionSystem {
  None = 'NONE',
  Proportional = 'PROPORTIONAL',
  WinnerTakeAll = 'WINNER_TAKE_ALL'
}

export type EmailVerifyInput = {
  otp: Scalars['Int']['input'];
  otpVerificationToken: Scalars['String']['input'];
};

export type Entry = {
  __typename?: 'Entry';
  /** Total amount of satoshis funded from the Entry page. */
  amountFunded: Scalars['Int']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  /** User that created the Entry. */
  creator: User;
  /** Short description of the Entry. */
  description: Scalars['String']['output'];
  /** Number of funders that were created from the Entry's page. */
  fundersCount: Scalars['Int']['output'];
  /** Funding transactions that were created from the Entry's page. */
  fundingTxs: Array<FundingTx>;
  id: Scalars['BigInt']['output'];
  /** Header image of the Entry. */
  image?: Maybe<Scalars['String']['output']>;
  /** Project within which the Entry was created. */
  project?: Maybe<Project>;
  publishedAt?: Maybe<Scalars['String']['output']>;
  status: EntryStatus;
  /** Title of the Entry. */
  title: Scalars['String']['output'];
  type: EntryType;
  updatedAt: Scalars['String']['output'];
};

export type EntryPublishedSubscriptionResponse = {
  __typename?: 'EntryPublishedSubscriptionResponse';
  entry: Entry;
};

export enum EntryStatus {
  Deleted = 'deleted',
  Published = 'published',
  Unpublished = 'unpublished'
}

export enum EntryType {
  Article = 'article',
  Podcast = 'podcast',
  Video = 'video'
}

export type ExternalAccount = {
  __typename?: 'ExternalAccount';
  accountType: Scalars['String']['output'];
  externalId: Scalars['String']['output'];
  externalUsername: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  public: Scalars['Boolean']['output'];
};

export type FileUploadInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  /** MIME type of the file. Currently only supports image types. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** The Funder type contains a User's funding details over a particular project. */
export type Funder = {
  __typename?: 'Funder';
  /** Aggregate amount funded by a Funder over all his (confirmed) funding transactions for a particular project, in satoshis. */
  amountFunded?: Maybe<Scalars['Int']['output']>;
  /** Boolean value indicating whether at least one of the funding transactions of the Funder were confirmed. */
  confirmed: Scalars['Boolean']['output'];
  /** Time at which the first confirmed funding transactions of the Funder was confirmed. */
  confirmedAt?: Maybe<Scalars['Date']['output']>;
  /** Funder's funding txs. */
  fundingTxs: Array<FundingTx>;
  id: Scalars['BigInt']['output'];
  orders: Array<Order>;
  /** Contributor's rank in the project. */
  rank?: Maybe<Scalars['Int']['output']>;
  /** Number of (confirmed) times a Funder funded a particular project. */
  timesFunded?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
};


/** The Funder type contains a User's funding details over a particular project. */
export type FunderFundingTxsArgs = {
  input?: InputMaybe<GetFunderFundingTxsInput>;
};

export type FunderRewardGraphSum = GraphSumData & {
  __typename?: 'FunderRewardGraphSum';
  dateTime: Scalars['Date']['output'];
  rewardId: Scalars['BigInt']['output'];
  rewardName: Scalars['String']['output'];
  sum: Scalars['Int']['output'];
};

export type FundingCancelInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  failureReason?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  invoiceId?: InputMaybe<Scalars['String']['input']>;
};

export type FundingCancelResponse = {
  __typename?: 'FundingCancelResponse';
  id: Scalars['BigInt']['output'];
  success: Scalars['Boolean']['output'];
};

export type FundingConfirmInput = {
  amount: Scalars['Int']['input'];
  offChain?: InputMaybe<FundingConfirmOffChainInput>;
  onChain?: InputMaybe<FundingConfirmOnChainInput>;
  paidAt: Scalars['Date']['input'];
};

export type FundingConfirmOffChainBolt11Input = {
  invoiceId: Scalars['String']['input'];
  settleIndex?: InputMaybe<Scalars['Int']['input']>;
};

export type FundingConfirmOffChainInput = {
  bolt11: FundingConfirmOffChainBolt11Input;
};

export type FundingConfirmOnChainInput = {
  address: Scalars['String']['input'];
  tx?: InputMaybe<OnChainTxInput>;
};

export type FundingConfirmResponse = {
  __typename?: 'FundingConfirmResponse';
  id: Scalars['BigInt']['output'];
  missedSettleEvents?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FundingCreateFromPodcastKeysendInput = {
  amount: Scalars['Int']['input'];
  appName: Scalars['String']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  externalUsername?: InputMaybe<Scalars['String']['input']>;
  paidAt: Scalars['Date']['input'];
  projectId: Scalars['BigInt']['input'];
};

export type FundingInput = {
  affiliateId?: InputMaybe<Scalars['String']['input']>;
  /** Set to true if the funder wishes to remain anonymous. The user will still be associated to the funding transaction. */
  anonymous: Scalars['Boolean']['input'];
  /** The donation amount, in satoshis. */
  donationAmount: Scalars['Int']['input'];
  metadataInput?: InputMaybe<FundingMetadataInput>;
  orderInput?: InputMaybe<OrderFundingInput>;
  /** The ProjectGoal linked to this funding transaction. */
  projectGoalId?: InputMaybe<Scalars['BigInt']['input']>;
  projectId: Scalars['BigInt']['input'];
  /** The resource from which the funding transaction is being created. */
  sourceResourceInput: ResourceInput;
  swapPublicKey?: InputMaybe<Scalars['String']['input']>;
};

export type FundingMetadataInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<Scalars['String']['input']>;
};

export enum FundingMethod {
  GeyserQr = 'geyser_qr',
  LnAddress = 'ln_address',
  LnurlPay = 'lnurl_pay',
  Nip57Zap = 'nip57_zap',
  PodcastKeysend = 'podcast_keysend'
}

export type FundingMutationResponse = {
  __typename?: 'FundingMutationResponse';
  fundingTx?: Maybe<FundingTx>;
  swap?: Maybe<Swap>;
};

export type FundingPendingInput = {
  amount: Scalars['Int']['input'];
  offChain?: InputMaybe<FundingPendingOffChainInput>;
  onChain?: InputMaybe<FundingPendingOnChainInput>;
};

export type FundingPendingOffChainBolt11Input = {
  invoiceId: Scalars['String']['input'];
};

export type FundingPendingOffChainInput = {
  bolt11: FundingPendingOffChainBolt11Input;
};

export type FundingPendingOnChainInput = {
  address: Scalars['String']['input'];
  tx?: InputMaybe<OnChainTxInput>;
};

export type FundingPendingResponse = {
  __typename?: 'FundingPendingResponse';
  id: Scalars['BigInt']['output'];
  success: Scalars['Boolean']['output'];
};

export type FundingQueryResponse = {
  __typename?: 'FundingQueryResponse';
  fundingTx?: Maybe<FundingTx>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum FundingResourceType {
  Entry = 'entry',
  Project = 'project',
  User = 'user'
}

export enum FundingStatus {
  Canceled = 'canceled',
  Paid = 'paid',
  PartiallyPaid = 'partially_paid',
  Pending = 'pending',
  Unpaid = 'unpaid'
}

export type FundingTx = {
  __typename?: 'FundingTx';
  address?: Maybe<Scalars['String']['output']>;
  affiliateFeeInSats?: Maybe<Scalars['Int']['output']>;
  amount: Scalars['Int']['output'];
  amountPaid: Scalars['Int']['output'];
  bitcoinQuote?: Maybe<BitcoinQuote>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  /** Creator's email address. Only visible to the contributor. */
  creatorEmail?: Maybe<Scalars['String']['output']>;
  donationAmount: Scalars['Int']['output'];
  /** Contributor's email address. Only visible to the project owner. */
  email?: Maybe<Scalars['String']['output']>;
  funder: Funder;
  fundingType: FundingType;
  id: Scalars['BigInt']['output'];
  invoiceId?: Maybe<Scalars['String']['output']>;
  invoiceStatus: InvoiceStatus;
  isAnonymous: Scalars['Boolean']['output'];
  media?: Maybe<Scalars['String']['output']>;
  method?: Maybe<FundingMethod>;
  onChain: Scalars['Boolean']['output'];
  onChainTxId?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  paidAt?: Maybe<Scalars['Date']['output']>;
  paymentRequest?: Maybe<Scalars['String']['output']>;
  projectId: Scalars['BigInt']['output'];
  source: Scalars['String']['output'];
  sourceResource?: Maybe<SourceResource>;
  status: FundingStatus;
  /** Private reference code viewable only by the Funder and the ProjectOwner related to this FundingTx */
  uuid?: Maybe<Scalars['String']['output']>;
};

export type FundingTxAmountGraph = GraphSumData & {
  __typename?: 'FundingTxAmountGraph';
  dateTime: Scalars['Date']['output'];
  sum: Scalars['Int']['output'];
};

export type FundingTxEmailUpdateInput = {
  email: Scalars['String']['input'];
  fundingTxId: Scalars['BigInt']['input'];
};

export enum FundingTxInvoiceSanctionCheckStatus {
  Failed = 'FAILED',
  Passed = 'PASSED',
  Pending = 'PENDING'
}

export type FundingTxInvoiceSanctionCheckStatusGetInput = {
  invoiceId: Scalars['String']['input'];
};

export type FundingTxInvoiceSanctionCheckStatusResponse = {
  __typename?: 'FundingTxInvoiceSanctionCheckStatusResponse';
  status: FundingTxInvoiceSanctionCheckStatus;
};

export type FundingTxMethodCount = {
  __typename?: 'FundingTxMethodCount';
  count: Scalars['Int']['output'];
  method?: Maybe<Scalars['String']['output']>;
};

export type FundingTxMethodSum = {
  __typename?: 'FundingTxMethodSum';
  method?: Maybe<Scalars['String']['output']>;
  sum: Scalars['Int']['output'];
};

export type FundingTxStatusUpdatedInput = {
  fundingTxId?: InputMaybe<Scalars['BigInt']['input']>;
  projectId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type FundingTxStatusUpdatedSubscriptionResponse = {
  __typename?: 'FundingTxStatusUpdatedSubscriptionResponse';
  fundingTx: FundingTx;
};

export type FundingTxsGetResponse = {
  __typename?: 'FundingTxsGetResponse';
  fundingTxs: Array<FundingTx>;
  pagination?: Maybe<CursorPaginationResponse>;
};

export enum FundingTxsWhereFundingStatus {
  Paid = 'paid',
  PartiallyPaid = 'partially_paid',
  Pending = 'pending'
}

export enum FundingType {
  Donation = 'DONATION',
  Purchase = 'PURCHASE'
}

export type FundinginvoiceCancel = {
  __typename?: 'FundinginvoiceCancel';
  id: Scalars['BigInt']['output'];
  success: Scalars['Boolean']['output'];
};

export type GenerateAffiliatePaymentRequestResponse = {
  __typename?: 'GenerateAffiliatePaymentRequestResponse';
  affiliatePaymentId: Scalars['BigInt']['output'];
  paymentRequest: Scalars['String']['output'];
};

export type GenerateAffiliatePaymentRequestsInput = {
  /** The invoice ID of the Hodl invoice for the associated funding tx. */
  invoiceId: Scalars['String']['input'];
};

export type GetActivitiesInput = {
  pagination?: InputMaybe<GetActivityPaginationInput>;
  where?: InputMaybe<GetActivityWhereInput>;
};

export type GetActivityOrderByInput = {
  createdAt?: InputMaybe<Scalars['Date']['input']>;
};

export type GetActivityPaginationInput = {
  cursor?: InputMaybe<CursorInputString>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetActivityWhereInput = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<DateRangeInput>;
  feed?: InputMaybe<ActivityFeedName>;
  projectIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  region?: InputMaybe<Scalars['String']['input']>;
  resourceType?: InputMaybe<ActivityResourceType>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  userIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type GetAffiliateLinksInput = {
  where: GetAffiliateLinksWhereInput;
};

export type GetAffiliateLinksWhereInput = {
  projectId: Scalars['BigInt']['input'];
};

export type GetContributorInput = {
  projectId: Scalars['BigInt']['input'];
  userId: Scalars['BigInt']['input'];
};

export type GetDashboardFundersWhereInput = {
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  projectId?: InputMaybe<Scalars['BigInt']['input']>;
  sourceResourceInput?: InputMaybe<ResourceInput>;
};

export type GetEntriesInput = {
  orderBy?: InputMaybe<GetEntriesOrderByInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<GetEntriesWhereInput>;
};

export type GetEntriesOrderByInput = {
  publishedAt?: InputMaybe<OrderByOptions>;
};

export type GetEntriesWhereInput = {
  projectId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type GetFunderFundingTxsInput = {
  where?: InputMaybe<GetFunderFundingTxsWhereInput>;
};

export type GetFunderFundingTxsWhereInput = {
  method?: InputMaybe<FundingMethod>;
  status?: InputMaybe<FundingStatus>;
};

export type GetFunderWhereInput = {
  anonymous?: InputMaybe<Scalars['Boolean']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  dateRange?: InputMaybe<DateRangeInput>;
  projectId?: InputMaybe<Scalars['BigInt']['input']>;
  sourceResourceInput?: InputMaybe<ResourceInput>;
};

export type GetFundersInput = {
  orderBy?: InputMaybe<GetFundersOrderByInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<GetFunderWhereInput>;
};

/** only one sort field can be used at one time */
export type GetFundersOrderByInput = {
  amountFunded?: InputMaybe<OrderByOptions>;
  confirmedAt?: InputMaybe<OrderByOptions>;
};

export type GetFundingTxsInput = {
  orderBy?: InputMaybe<GetFundingTxsOrderByInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<GetFundingTxsWhereInput>;
};

export type GetFundingTxsOrderByInput = {
  createdAt: OrderByOptions;
};

export type GetFundingTxsWhereInput = {
  NOT?: InputMaybe<GetFundingTxsWhereInput>;
  OR?: InputMaybe<Array<InputMaybe<GetFundingTxsWhereInput>>>;
  dateRange?: InputMaybe<DateRangeInput>;
  funderId?: InputMaybe<Scalars['BigInt']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['BigInt']['input']>;
  sourceResourceInput?: InputMaybe<ResourceInput>;
  status?: InputMaybe<FundingTxsWhereFundingStatus>;
};

export type GetProjectGoalsInput = {
  projectId: Scalars['BigInt']['input'];
  receivedContributionsInDatetimeRange?: InputMaybe<DateRangeInput>;
};

export type GetProjectOrdersStatsInput = {
  where: GetProjectOrdersStatsWhereInput;
};

export type GetProjectOrdersStatsWhereInput = {
  projectId: Scalars['BigInt']['input'];
};

export type GetProjectRewardInput = {
  where: GetProjectRewardWhereInput;
};

export type GetProjectRewardWhereInput = {
  dateRange?: InputMaybe<DateRangeInput>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  projectId: Scalars['BigInt']['input'];
};

export type GetProjectStatsInput = {
  where: GetProjectStatsWhereInput;
};

export type GetProjectStatsWhereInput = {
  dateRange?: InputMaybe<DateRangeInput>;
  groupBy?: InputMaybe<AnalyticsGroupByInterval>;
  projectId: Scalars['BigInt']['input'];
};

export type GlobalContributorLeaderboardRow = {
  __typename?: 'GlobalContributorLeaderboardRow';
  contributionsCount: Scalars['Int']['output'];
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  projectsContributedCount: Scalars['Int']['output'];
  userId: Scalars['BigInt']['output'];
  userImageUrl?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type GlobalProjectLeaderboardRow = {
  __typename?: 'GlobalProjectLeaderboardRow';
  contributionsCount: Scalars['Int']['output'];
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  contributorsCount: Scalars['Int']['output'];
  projectName: Scalars['String']['output'];
  projectThumbnailUrl?: Maybe<Scalars['String']['output']>;
  projectTitle: Scalars['String']['output'];
};

export type Grant = BoardVoteGrant | CommunityVoteGrant;

export type GrantApplicant = {
  __typename?: 'GrantApplicant';
  contributors: Array<GrantApplicantContributor>;
  contributorsCount: Scalars['Int']['output'];
  funding: GrantApplicantFunding;
  grant: Grant;
  id: Scalars['BigInt']['output'];
  project: Project;
  status: GrantApplicantStatus;
  voteCount: Scalars['Int']['output'];
};


export type GrantApplicantContributorsArgs = {
  input?: InputMaybe<GrantApplicantContributorInput>;
};

export type GrantApplicantContributor = {
  __typename?: 'GrantApplicantContributor';
  amount: Scalars['Int']['output'];
  timesContributed: Scalars['Int']['output'];
  user?: Maybe<User>;
  voteCount: Scalars['Int']['output'];
};

export type GrantApplicantContributorInput = {
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<GrantApplicantContributorWhereInput>;
};

export type GrantApplicantContributorWhereInput = {
  userId: Scalars['BigInt']['input'];
};

export type GrantApplicantFunding = {
  __typename?: 'GrantApplicantFunding';
  /** The amount of funding the grant applicant has received from the community. */
  communityFunding: Scalars['Int']['output'];
  /** The amount of grant funding the applicant is elligible for. */
  grantAmount: Scalars['Int']['output'];
  /**
   * The amount of funding that the Grant applicant has been confirmed to receive. Can only be confirmed after the
   * grant has been closed.
   */
  grantAmountDistributed: Scalars['Int']['output'];
};

export enum GrantApplicantStatus {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
  Funded = 'FUNDED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum GrantApplicantStatusFilter {
  Accepted = 'ACCEPTED',
  Funded = 'FUNDED'
}

export type GrantApplicantsGetInput = {
  orderBy?: InputMaybe<Array<GrantApplicantsGetOrderByInput>>;
  pagination?: InputMaybe<PaginationInput>;
  where: GrantApplicantsGetWhereInput;
};

export type GrantApplicantsGetOrderByInput = {
  direction: OrderByDirection;
  field: GrantApplicantsOrderByField;
};

export type GrantApplicantsGetWhereInput = {
  status?: InputMaybe<GrantApplicantStatusFilter>;
};

export enum GrantApplicantsOrderByField {
  VoteCount = 'voteCount'
}

export type GrantApplyInput = {
  grantId: Scalars['BigInt']['input'];
  projectId: Scalars['BigInt']['input'];
};

export type GrantBoardMember = {
  __typename?: 'GrantBoardMember';
  user: User;
};

export type GrantGetInput = {
  where: GrantGetWhereInput;
};

export type GrantGetWhereInput = {
  id: Scalars['BigInt']['input'];
};

export type GrantStatistics = {
  __typename?: 'GrantStatistics';
  /** Statistic about the grant applicants */
  applicants?: Maybe<GrantStatisticsApplicant>;
  /** Statistic about the grants */
  grants?: Maybe<GrantStatisticsGrant>;
};

export type GrantStatisticsApplicant = {
  __typename?: 'GrantStatisticsApplicant';
  /** Count of applicants that have been funded */
  countFunded: Scalars['Int']['output'];
};

export type GrantStatisticsGrant = {
  __typename?: 'GrantStatisticsGrant';
  /** Total amount sent to grants (in sats) */
  amountFunded: Scalars['Int']['output'];
  /** Total amount granted to projects (in sats) */
  amountGranted: Scalars['Int']['output'];
  /** Total rounds of grants */
  count: Scalars['Int']['output'];
};

export type GrantStatus = {
  __typename?: 'GrantStatus';
  endAt?: Maybe<Scalars['Date']['output']>;
  startAt: Scalars['Date']['output'];
  status: GrantStatusEnum;
};

export enum GrantStatusEnum {
  ApplicationsOpen = 'APPLICATIONS_OPEN',
  Closed = 'CLOSED',
  FundingOpen = 'FUNDING_OPEN'
}

export enum GrantType {
  BoardVote = 'BOARD_VOTE',
  CommunityVote = 'COMMUNITY_VOTE'
}

export type GraphSumData = {
  dateTime: Scalars['Date']['output'];
  sum: Scalars['Int']['output'];
};

export enum InvoiceStatus {
  Canceled = 'canceled',
  Paid = 'paid',
  Unpaid = 'unpaid'
}

export type LeaderboardGlobalContributorsGetInput = {
  /** The period to return the leaderboard for. */
  period: LeaderboardPeriod;
  /** The number of top contributors to return. */
  top: Scalars['Int']['input'];
};

export type LeaderboardGlobalProjectsGetInput = {
  /** The period to return the leaderboard for. */
  period: LeaderboardPeriod;
  /** The number of top projects to return. */
  top: Scalars['Int']['input'];
};

export enum LeaderboardPeriod {
  AllTime = 'ALL_TIME',
  Month = 'MONTH'
}

export type LightningAddressConnectionDetails = {
  __typename?: 'LightningAddressConnectionDetails';
  lightningAddress: Scalars['String']['output'];
};

export type LightningAddressConnectionDetailsCreateInput = {
  lightningAddress: Scalars['String']['input'];
};

export type LightningAddressConnectionDetailsUpdateInput = {
  lightningAddress: Scalars['String']['input'];
};

export type LightningAddressContributionLimits = {
  __typename?: 'LightningAddressContributionLimits';
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
};

export type LightningAddressVerifyResponse = {
  __typename?: 'LightningAddressVerifyResponse';
  limits?: Maybe<LightningAddressContributionLimits>;
  reason?: Maybe<Scalars['String']['output']>;
  valid: Scalars['Boolean']['output'];
};

export type LndConnectionDetails = {
  /** Port where the gRPC calls should be made. */
  grpcPort: Scalars['Int']['output'];
  /** Hostname where the gRPC calls should be made. */
  hostname: Scalars['String']['output'];
  lndNodeType: LndNodeType;
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon: Scalars['String']['output'];
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: Maybe<Scalars['String']['output']>;
};

export type LndConnectionDetailsCreateInput = {
  /** Port where the gRPC calls should be made. */
  grpcPort: Scalars['Int']['input'];
  /** Hostname where the gRPC calls should be made. */
  hostname: Scalars['String']['input'];
  lndNodeType: LndNodeType;
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon: Scalars['String']['input'];
  /** Public key of the LND node. */
  pubkey?: InputMaybe<Scalars['String']['input']>;
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: InputMaybe<Scalars['String']['input']>;
};

/** Private node details that can only be queried by the wallet owner. */
export type LndConnectionDetailsPrivate = {
  __typename?: 'LndConnectionDetailsPrivate';
  /** Port where the gRPC calls should be made. */
  grpcPort: Scalars['Int']['output'];
  /** Hostname where the gRPC calls should be made. */
  hostname: Scalars['String']['output'];
  /** Type of the LND node used. */
  lndNodeType: LndNodeType;
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon: Scalars['String']['output'];
  /** Public key of the LND node. */
  pubkey?: Maybe<Scalars['String']['output']>;
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: Maybe<Scalars['String']['output']>;
};

/** Public node details visible by anyone. */
export type LndConnectionDetailsPublic = {
  __typename?: 'LndConnectionDetailsPublic';
  pubkey?: Maybe<Scalars['String']['output']>;
};

export type LndConnectionDetailsUpdateInput = {
  /** Port where the gRPC calls should be made. */
  grpcPort?: InputMaybe<Scalars['Int']['input']>;
  /** Hostname where the gRPC calls should be made. */
  hostname?: InputMaybe<Scalars['String']['input']>;
  /** Type of the LND node. */
  lndNodeType?: InputMaybe<LndNodeType>;
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon?: InputMaybe<Scalars['String']['input']>;
  /** Public key of the LND node. */
  pubkey?: InputMaybe<Scalars['String']['input']>;
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: InputMaybe<Scalars['String']['input']>;
};

export enum LndNodeType {
  Custom = 'custom',
  Geyser = 'geyser',
  Voltage = 'voltage'
}

export type Location = {
  __typename?: 'Location';
  country?: Maybe<Country>;
  region?: Maybe<Scalars['String']['output']>;
};

export enum MfaAction {
  Login = 'LOGIN',
  ProjectWalletUpdate = 'PROJECT_WALLET_UPDATE',
  UserEmailUpdate = 'USER_EMAIL_UPDATE',
  UserEmailVerification = 'USER_EMAIL_VERIFICATION'
}

export type Milestone = {
  __typename?: 'Milestone';
  amount: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  reached?: Maybe<Scalars['Boolean']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']['output']>;
  affiliateLinkCreate: AffiliateLink;
  affiliateLinkDisable: AffiliateLink;
  affiliateLinkLabelUpdate: AffiliateLink;
  affiliatePaymentConfirm: AffiliatePaymentConfirmResponse;
  affiliatePaymentRequestGenerate: GenerateAffiliatePaymentRequestResponse;
  claimBadge: UserBadge;
  createEntry: Entry;
  createProject: Project;
  creatorNotificationConfigurationValueUpdate?: Maybe<Scalars['Boolean']['output']>;
  deleteEntry: Entry;
  fund: FundingMutationResponse;
  fundingCancel: FundingCancelResponse;
  fundingClaimAnonymous: FundingMutationResponse;
  fundingConfirm: FundingConfirmResponse;
  fundingCreateFromPodcastKeysend: FundingTx;
  fundingInvoiceCancel: FundinginvoiceCancel;
  fundingInvoiceRefresh: FundingTx;
  fundingPend: FundingPendingResponse;
  fundingTxEmailUpdate: FundingTx;
  grantApply: GrantApplicant;
  orderStatusUpdate?: Maybe<Order>;
  projectDelete: ProjectDeleteResponse;
  projectFollow: Scalars['Boolean']['output'];
  projectGoalCreate: Array<ProjectGoal>;
  projectGoalDelete: ProjectGoalDeleteResponse;
  /** Only returns ProjectGoals that are in progress */
  projectGoalOrderingUpdate: Array<ProjectGoal>;
  projectGoalUpdate: ProjectGoal;
  projectPublish: Project;
  projectRewardCreate: ProjectReward;
  projectRewardCurrencyUpdate: Array<ProjectReward>;
  /** Soft deletes the reward. */
  projectRewardDelete: Scalars['Boolean']['output'];
  projectRewardUpdate: ProjectReward;
  projectStatusUpdate: Project;
  projectTagAdd: Array<Tag>;
  projectTagRemove: Array<Tag>;
  projectUnfollow: Scalars['Boolean']['output'];
  /** Makes the Entry public. */
  publishEntry: Entry;
  /**
   * Sends an OTP to the user's email address and responds with a token that can be used, together with the OTP, to two-factor authenticate
   * a request made by the client.
   */
  sendOTPByEmail: OtpResponse;
  tagCreate: Tag;
  unlinkExternalAccount: User;
  updateEntry: Entry;
  updateProject: Project;
  updateUser: User;
  updateWalletState: Wallet;
  userBadgeAward: UserBadge;
  userDelete: DeleteUserResponse;
  userEmailUpdate: User;
  userEmailVerify: Scalars['Boolean']['output'];
  userNotificationConfigurationValueUpdate?: Maybe<Scalars['Boolean']['output']>;
  walletCreate: Wallet;
  walletDelete: Scalars['Boolean']['output'];
  /** This operation is currently not supported. */
  walletUpdate: Wallet;
};


export type MutationAffiliateLinkCreateArgs = {
  input: AffiliateLinkCreateInput;
};


export type MutationAffiliateLinkDisableArgs = {
  affiliateLinkId: Scalars['BigInt']['input'];
};


export type MutationAffiliateLinkLabelUpdateArgs = {
  affiliateLinkId: Scalars['BigInt']['input'];
  label: Scalars['String']['input'];
};


export type MutationAffiliatePaymentConfirmArgs = {
  affiliatePaymentId: Scalars['BigInt']['input'];
};


export type MutationAffiliatePaymentRequestGenerateArgs = {
  input: GenerateAffiliatePaymentRequestsInput;
};


export type MutationClaimBadgeArgs = {
  input: BadgeClaimInput;
};


export type MutationCreateEntryArgs = {
  input: CreateEntryInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreatorNotificationConfigurationValueUpdateArgs = {
  creatorNotificationConfigurationId: Scalars['BigInt']['input'];
  value: Scalars['String']['input'];
};


export type MutationDeleteEntryArgs = {
  id: Scalars['BigInt']['input'];
};


export type MutationFundArgs = {
  input: FundingInput;
};


export type MutationFundingCancelArgs = {
  input: FundingCancelInput;
};


export type MutationFundingClaimAnonymousArgs = {
  uuid: Scalars['String']['input'];
};


export type MutationFundingConfirmArgs = {
  input: FundingConfirmInput;
};


export type MutationFundingCreateFromPodcastKeysendArgs = {
  input?: InputMaybe<FundingCreateFromPodcastKeysendInput>;
};


export type MutationFundingInvoiceCancelArgs = {
  invoiceId: Scalars['String']['input'];
};


export type MutationFundingInvoiceRefreshArgs = {
  fundingTxId: Scalars['BigInt']['input'];
};


export type MutationFundingPendArgs = {
  input: FundingPendingInput;
};


export type MutationFundingTxEmailUpdateArgs = {
  input?: InputMaybe<FundingTxEmailUpdateInput>;
};


export type MutationGrantApplyArgs = {
  input?: InputMaybe<GrantApplyInput>;
};


export type MutationOrderStatusUpdateArgs = {
  input: OrderStatusUpdateInput;
};


export type MutationProjectDeleteArgs = {
  input: DeleteProjectInput;
};


export type MutationProjectFollowArgs = {
  input: ProjectFollowMutationInput;
};


export type MutationProjectGoalCreateArgs = {
  input: ProjectGoalCreateInput;
};


export type MutationProjectGoalDeleteArgs = {
  projectGoalId: Scalars['BigInt']['input'];
};


export type MutationProjectGoalOrderingUpdateArgs = {
  input: ProjectGoalOrderingUpdateInput;
};


export type MutationProjectGoalUpdateArgs = {
  input: ProjectGoalUpdateInput;
};


export type MutationProjectPublishArgs = {
  input: ProjectPublishMutationInput;
};


export type MutationProjectRewardCreateArgs = {
  input: CreateProjectRewardInput;
};


export type MutationProjectRewardCurrencyUpdateArgs = {
  input: ProjectRewardCurrencyUpdate;
};


export type MutationProjectRewardDeleteArgs = {
  input: DeleteProjectRewardInput;
};


export type MutationProjectRewardUpdateArgs = {
  input: UpdateProjectRewardInput;
};


export type MutationProjectStatusUpdateArgs = {
  input: ProjectStatusUpdate;
};


export type MutationProjectTagAddArgs = {
  input: ProjectTagMutationInput;
};


export type MutationProjectTagRemoveArgs = {
  input: ProjectTagMutationInput;
};


export type MutationProjectUnfollowArgs = {
  input: ProjectFollowMutationInput;
};


export type MutationPublishEntryArgs = {
  id: Scalars['BigInt']['input'];
};


export type MutationSendOtpByEmailArgs = {
  input: SendOtpByEmailInput;
};


export type MutationTagCreateArgs = {
  input: TagCreateInput;
};


export type MutationUnlinkExternalAccountArgs = {
  id: Scalars['BigInt']['input'];
};


export type MutationUpdateEntryArgs = {
  input: UpdateEntryInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateWalletStateArgs = {
  input: UpdateWalletStateInput;
};


export type MutationUserBadgeAwardArgs = {
  userBadgeId: Scalars['BigInt']['input'];
};


export type MutationUserEmailUpdateArgs = {
  input: UserEmailUpdateInput;
};


export type MutationUserEmailVerifyArgs = {
  input: EmailVerifyInput;
};


export type MutationUserNotificationConfigurationValueUpdateArgs = {
  userNotificationConfigurationId: Scalars['BigInt']['input'];
  value: Scalars['String']['input'];
};


export type MutationWalletCreateArgs = {
  input: CreateWalletInput;
};


export type MutationWalletDeleteArgs = {
  id: Scalars['BigInt']['input'];
};


export type MutationWalletUpdateArgs = {
  input: UpdateWalletInput;
};

export type MutationResponse = {
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type NostrKeys = {
  __typename?: 'NostrKeys';
  privateKey?: Maybe<NostrPrivateKey>;
  publicKey: NostrPublicKey;
};

export type NostrPrivateKey = {
  __typename?: 'NostrPrivateKey';
  hex: Scalars['String']['output'];
  nsec: Scalars['String']['output'];
};

export type NostrPublicKey = {
  __typename?: 'NostrPublicKey';
  hex: Scalars['String']['output'];
  npub: Scalars['String']['output'];
};

export enum NotificationChannel {
  Email = 'EMAIL'
}

export type NotificationConfiguration = {
  __typename?: 'NotificationConfiguration';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
  type?: Maybe<SettingValueType>;
  value: Scalars['String']['output'];
};

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  channel?: Maybe<NotificationChannel>;
  configurations: Array<NotificationConfiguration>;
  isEnabled: Scalars['Boolean']['output'];
  notificationType: Scalars['String']['output'];
};

export type OtpInput = {
  otp: Scalars['Int']['input'];
  otpVerificationToken: Scalars['String']['input'];
};

export type OtpLoginInput = {
  otp: Scalars['Int']['input'];
  otpVerificationToken: Scalars['String']['input'];
};

export type OtpResponse = {
  __typename?: 'OTPResponse';
  /** Expiration time of the OTP. Can be used to display a countdown to the user. */
  expiresAt: Scalars['Date']['output'];
  /** Encrypted token containing the OTP 2FA details, such as the action to be authorised and the factor used (eg: email). */
  otpVerificationToken: Scalars['String']['output'];
};

export type OffsetBasedPaginationInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type OnChainTxInput = {
  id: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  confirmedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  deliveredAt?: Maybe<Scalars['Date']['output']>;
  fundingTx: FundingTx;
  id: Scalars['BigInt']['output'];
  items: Array<OrderItem>;
  referenceCode: Scalars['String']['output'];
  shippedAt?: Maybe<Scalars['Date']['output']>;
  status: Scalars['String']['output'];
  totalInSats: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  user?: Maybe<User>;
};

export type OrderBitcoinQuoteInput = {
  quote: Scalars['Float']['input'];
  quoteCurrency: QuoteCurrency;
};

export enum OrderByDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum OrderByOptions {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderFundingInput = {
  /**
   * Quote used client-side to compute the order total. That quote will be used unless the slippage exceeds
   * a pre-defined threshold.
   */
  bitcoinQuote?: InputMaybe<OrderBitcoinQuoteInput>;
  items: Array<OrderItemInput>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  item: ProjectReward;
  quantity: Scalars['Int']['output'];
  unitPriceInSats: Scalars['Int']['output'];
};

export type OrderItemInput = {
  itemId: Scalars['BigInt']['input'];
  itemType: OrderItemType;
  /** Number of times a reward was selected. */
  quantity: Scalars['Int']['input'];
};

export enum OrderItemType {
  ProjectReward = 'PROJECT_REWARD'
}

export type OrderStatusUpdateInput = {
  orderId?: InputMaybe<Scalars['BigInt']['input']>;
  status?: InputMaybe<UpdatableOrderStatus>;
};

export type OrdersGetInput = {
  orderBy?: InputMaybe<Array<OrdersGetOrderByInput>>;
  pagination?: InputMaybe<PaginationInput>;
  where: OrdersGetWhereInput;
};

export enum OrdersGetOrderByField {
  ConfirmedAt = 'confirmedAt',
  DeliveredAt = 'deliveredAt',
  ShippedAt = 'shippedAt'
}

export type OrdersGetOrderByInput = {
  direction: OrderByDirection;
  field: OrdersGetOrderByField;
};

export type OrdersGetResponse = {
  __typename?: 'OrdersGetResponse';
  orders: Array<Order>;
  pagination?: Maybe<CursorPaginationResponse>;
};

export enum OrdersGetStatus {
  AwaitingPayment = 'AWAITING_PAYMENT',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Shipped = 'SHIPPED'
}

export type OrdersGetWhereInput = {
  projectId?: InputMaybe<Scalars['BigInt']['input']>;
  status?: InputMaybe<OrdersGetStatus>;
};

export type OrdersStatsBase = {
  __typename?: 'OrdersStatsBase';
  projectRewards: ProjectRewardsStats;
  projectRewardsGroupedByProjectRewardId: Array<ProjectRewardsGroupedByRewardIdStats>;
};

export type Owner = {
  __typename?: 'Owner';
  id: Scalars['BigInt']['output'];
  user: User;
};

export type OwnerOf = {
  __typename?: 'OwnerOf';
  owner?: Maybe<Owner>;
  project?: Maybe<Project>;
};

export type PageViewCountGraph = {
  __typename?: 'PageViewCountGraph';
  dateTime: Scalars['Date']['output'];
  viewCount: Scalars['Int']['output'];
  visitorCount: Scalars['Int']['output'];
};

export type PaginationCursor = {
  __typename?: 'PaginationCursor';
  id?: Maybe<Scalars['BigInt']['output']>;
};

/** Cursor pagination input. */
export type PaginationInput = {
  cursor?: InputMaybe<CursorInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProfileNotificationSettings = {
  __typename?: 'ProfileNotificationSettings';
  creatorSettings: Array<CreatorNotificationSettings>;
  userSettings: UserNotificationSettings;
};

export type Project = {
  __typename?: 'Project';
  /** @deprecated No longer supported */
  ambassadors: Array<Ambassador>;
  /** Total amount raised by the project, in satoshis. */
  balance: Scalars['Int']['output'];
  balanceUsdCent: Scalars['Int']['output'];
  /** Boolean flag to indicate if the project can be deleted. */
  canDelete: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  defaultGoalId?: Maybe<Scalars['BigInt']['output']>;
  /** Description of the project. */
  description?: Maybe<Scalars['String']['output']>;
  /**
   * By default, returns all the entries of a project, both published and unpublished but not deleted.
   * To filter the result set, an explicit input can be passed that specifies a value of true or false for the published field.
   * An unpublished entry is only returned if the requesting user is the creator of the entry.
   */
  entries: Array<Entry>;
  entriesCount?: Maybe<Scalars['Int']['output']>;
  followers: Array<User>;
  followersCount?: Maybe<Scalars['Int']['output']>;
  funders: Array<Funder>;
  fundersCount?: Maybe<Scalars['Int']['output']>;
  fundingTxs: Array<FundingTx>;
  fundingTxsCount?: Maybe<Scalars['Int']['output']>;
  goalsCount?: Maybe<Scalars['Int']['output']>;
  /** Returns the project's grant applications. */
  grantApplications: Array<GrantApplicant>;
  id: Scalars['BigInt']['output'];
  image?: Maybe<Scalars['String']['output']>;
  keys: ProjectKeys;
  links: Array<Scalars['String']['output']>;
  location?: Maybe<Location>;
  /** @deprecated milestones are deprecated, use the goals instead */
  milestones: Array<Milestone>;
  /** Unique name for the project. Used for the project URL and lightning address. */
  name: Scalars['String']['output'];
  owners: Array<Owner>;
  rewardCurrency?: Maybe<RewardCurrency>;
  rewards: Array<ProjectReward>;
  rewardsCount?: Maybe<Scalars['Int']['output']>;
  /** Short description of the project. */
  shortDescription?: Maybe<Scalars['String']['output']>;
  /** @deprecated No longer supported */
  sponsors: Array<Sponsor>;
  /** Returns summary statistics on the Project views and visitors. */
  statistics?: Maybe<ProjectStatistics>;
  status?: Maybe<ProjectStatus>;
  tags: Array<Tag>;
  /** Main project image. */
  thumbnailImage?: Maybe<Scalars['String']['output']>;
  /** Public title of the project. */
  title: Scalars['String']['output'];
  type: ProjectType;
  updatedAt: Scalars['String']['output'];
  /** Wallets linked to a Project. */
  wallets: Array<Wallet>;
};


export type ProjectEntriesArgs = {
  input?: InputMaybe<ProjectEntriesGetInput>;
};


export type ProjectGrantApplicationsArgs = {
  input?: InputMaybe<ProjectGrantApplicationsInput>;
};

export type ProjectActivatedSubscriptionResponse = {
  __typename?: 'ProjectActivatedSubscriptionResponse';
  project: Project;
};

export type ProjectActivitiesCount = {
  __typename?: 'ProjectActivitiesCount';
  count: Scalars['Int']['output'];
  project: Project;
};

export type ProjectContributionsGroupedByMethodStats = StatsInterface & {
  __typename?: 'ProjectContributionsGroupedByMethodStats';
  count: Scalars['Int']['output'];
  method: Scalars['String']['output'];
  total: Scalars['Int']['output'];
  totalUsd: Scalars['Float']['output'];
};

export type ProjectContributionsStats = StatsInterface & {
  __typename?: 'ProjectContributionsStats';
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalUsd: Scalars['Float']['output'];
};

export type ProjectContributionsStatsBase = {
  __typename?: 'ProjectContributionsStatsBase';
  contributions: ProjectContributionsStats;
  contributionsGroupedByMethod: Array<ProjectContributionsGroupedByMethodStats>;
};

export type ProjectCountriesGetResult = {
  __typename?: 'ProjectCountriesGetResult';
  count: Scalars['Int']['output'];
  country: Country;
};

export type ProjectDeleteResponse = MutationResponse & {
  __typename?: 'ProjectDeleteResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ProjectEntriesGetInput = {
  where?: InputMaybe<ProjectEntriesGetWhereInput>;
};

export type ProjectEntriesGetWhereInput = {
  published?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectFollowMutationInput = {
  projectId: Scalars['BigInt']['input'];
};

export type ProjectFollowerStats = {
  __typename?: 'ProjectFollowerStats';
  count: Scalars['Int']['output'];
};

export type ProjectFunderRewardStats = {
  __typename?: 'ProjectFunderRewardStats';
  /** Project rewards sold count over the given datetime range grouped by day, or month. */
  quantityGraph?: Maybe<Array<Maybe<FunderRewardGraphSum>>>;
  /** Project rewards sold count in the given datetime range. */
  quantitySum: Scalars['Int']['output'];
};

export type ProjectFunderStats = {
  __typename?: 'ProjectFunderStats';
  /** Project contributors count in the given datetime range. */
  count: Scalars['Int']['output'];
};

export type ProjectFundingTxStats = {
  __typename?: 'ProjectFundingTxStats';
  /** Project contribution over the given datetime range grouped by day, or month. */
  amountGraph?: Maybe<Array<Maybe<FundingTxAmountGraph>>>;
  /** Project contribution amount in the given datetime range. */
  amountSum?: Maybe<Scalars['Int']['output']>;
  /** Project contribution amount in USD in the given datetime range. */
  amountSumUsd?: Maybe<Scalars['Float']['output']>;
  /** Project contribution count in the given datetime range. */
  count: Scalars['Int']['output'];
  /** Project contribution count of each Funding Method in the given datetime range. */
  methodCount?: Maybe<Array<Maybe<FundingTxMethodCount>>>;
  /** Project contribution amount of each Funding Method in the given datetime range. */
  methodSum?: Maybe<Array<Maybe<FundingTxMethodSum>>>;
};

export type ProjectGoal = {
  __typename?: 'ProjectGoal';
  amountContributed: Scalars['Int']['output'];
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  currency: ProjectGoalCurrency;
  description?: Maybe<Scalars['String']['output']>;
  emojiUnifiedCode?: Maybe<Scalars['String']['output']>;
  hasReceivedContribution: Scalars['Boolean']['output'];
  id: Scalars['BigInt']['output'];
  projectId: Scalars['BigInt']['output'];
  status: ProjectGoalStatus;
  targetAmount: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type ProjectGoalCreateInput = {
  currency: ProjectGoalCurrency;
  description?: InputMaybe<Scalars['String']['input']>;
  emojiUnifiedCode?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['BigInt']['input'];
  targetAmount: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export enum ProjectGoalCurrency {
  Btcsat = 'BTCSAT',
  Usdcent = 'USDCENT'
}

export type ProjectGoalDeleteResponse = MutationResponse & {
  __typename?: 'ProjectGoalDeleteResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ProjectGoalOrderingUpdateInput = {
  projectGoalIdsOrder: Array<Scalars['BigInt']['input']>;
  projectId: Scalars['BigInt']['input'];
};

export enum ProjectGoalStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS'
}

export enum ProjectGoalStatusInCreate {
  Inactive = 'INACTIVE',
  InProgress = 'IN_PROGRESS'
}

export type ProjectGoalUpdateInput = {
  currency?: InputMaybe<ProjectGoalCurrency>;
  description?: InputMaybe<Scalars['String']['input']>;
  emojiUnifiedCode?: InputMaybe<Scalars['String']['input']>;
  projectGoalId: Scalars['BigInt']['input'];
  targetAmount?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectGoals = {
  __typename?: 'ProjectGoals';
  completed: Array<ProjectGoal>;
  inProgress: Array<ProjectGoal>;
};

export type ProjectGrantApplicationsInput = {
  where: ProjectGrantApplicationsWhereInput;
};

export type ProjectGrantApplicationsWhereInput = {
  grantStatus: ProjectGrantApplicationsWhereInputEnum;
};

export enum ProjectGrantApplicationsWhereInputEnum {
  FundingOpen = 'FUNDING_OPEN'
}

export type ProjectKeys = {
  __typename?: 'ProjectKeys';
  nostrKeys: NostrKeys;
};

export type ProjectLeaderboardContributorsGetInput = {
  period: ProjectLeaderboardPeriod;
  projectId: Scalars['BigInt']['input'];
  top: Scalars['Int']['input'];
};

export type ProjectLeaderboardContributorsRow = {
  __typename?: 'ProjectLeaderboardContributorsRow';
  commentsCount: Scalars['Int']['output'];
  contributionsCount: Scalars['Int']['output'];
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  funderId: Scalars['BigInt']['output'];
  user?: Maybe<User>;
};

export enum ProjectLeaderboardPeriod {
  AllTime = 'ALL_TIME',
  Month = 'MONTH',
  Week = 'WEEK'
}

export type ProjectLinkMutationInput = {
  link: Scalars['String']['input'];
  projectId: Scalars['BigInt']['input'];
};

export type ProjectMostFunded = {
  __typename?: 'ProjectMostFunded';
  /** The project details */
  project: Project;
};

export type ProjectMostFundedByTag = {
  __typename?: 'ProjectMostFundedByTag';
  projects: Array<ProjectMostFunded>;
  tagId: Scalars['Int']['output'];
};

export type ProjectPublishMutationInput = {
  projectId: Scalars['BigInt']['input'];
};

export type ProjectRegionsGetResult = {
  __typename?: 'ProjectRegionsGetResult';
  count: Scalars['Int']['output'];
  region: Scalars['String']['output'];
};

export type ProjectReward = {
  __typename?: 'ProjectReward';
  /**
   * Number of people that purchased the Project Reward.
   * @deprecated Use sold instead
   */
  backersCount: Scalars['Int']['output'];
  /** Category of ProjectReward */
  category?: Maybe<Scalars['String']['output']>;
  /** Cost of the reward, priced in USD cents. */
  cost: Scalars['Int']['output'];
  /** The date the creator created the reward */
  createdAt: Scalars['Date']['output'];
  /**
   * Whether the reward is deleted or not. Deleted rewards should not appear in the funding flow. Moreover, deleted
   * rewards should only be visible by the project owner and the users that purchased it.
   */
  deleted: Scalars['Boolean']['output'];
  /** Internally used to track whether a reward was soft deleted */
  deletedAt?: Maybe<Scalars['Date']['output']>;
  /** Short description of the reward. */
  description?: Maybe<Scalars['String']['output']>;
  /** Estimated availability date of a reward that is in development */
  estimatedAvailabilityDate?: Maybe<Scalars['Date']['output']>;
  estimatedDeliveryDate?: Maybe<Scalars['Date']['output']>;
  /** Estimated delivery time from the time of purchase */
  estimatedDeliveryInWeeks?: Maybe<Scalars['Int']['output']>;
  /** Boolean value to indicate whether this reward requires shipping */
  hasShipping: Scalars['Boolean']['output'];
  id: Scalars['BigInt']['output'];
  /** Image of the reward. */
  image?: Maybe<Scalars['String']['output']>;
  /** Boolean value to indicate whether this reward is an addon */
  isAddon: Scalars['Boolean']['output'];
  /** Boolean value to indicate whether this reward is hidden */
  isHidden: Scalars['Boolean']['output'];
  /** Maximum times the item can be purchased */
  maxClaimable?: Maybe<Scalars['Int']['output']>;
  /** Name of the reward. */
  name: Scalars['String']['output'];
  /** Boolean value to indicate whether this reward is in development or ready to ship */
  preOrder: Scalars['Boolean']['output'];
  /** Boolean value to indicate whether this reward requires shipping */
  project: Project;
  /** Currency in which the reward cost is stored. */
  rewardCurrency: RewardCurrency;
  rewardType?: Maybe<Scalars['String']['output']>;
  /** Number of times this Project Reward was sold. */
  sold: Scalars['Int']['output'];
  /** Tracks the stock of the reward */
  stock?: Maybe<Scalars['Int']['output']>;
  /** The last date when the creator has updated the reward */
  updatedAt: Scalars['Date']['output'];
  /** UUID for the reward, it stays consistent throughout the project reward updates (the ID does not) */
  uuid: Scalars['String']['output'];
};

export type ProjectRewardCurrencyUpdate = {
  projectId: Scalars['BigInt']['input'];
  rewardCurrency: RewardCurrency;
};

export type ProjectRewardCurrencyUpdateRewardsInput = {
  cost: Scalars['Int']['input'];
  rewardId: Scalars['BigInt']['input'];
};

export type ProjectRewardsGroupedByRewardIdStats = {
  __typename?: 'ProjectRewardsGroupedByRewardIdStats';
  count: Scalars['Int']['output'];
  projectReward: ProjectReward;
};

export type ProjectRewardsStats = {
  __typename?: 'ProjectRewardsStats';
  count: Scalars['Int']['output'];
};

export type ProjectStatistics = {
  __typename?: 'ProjectStatistics';
  totalPageviews: Scalars['Int']['output'];
  totalVisitors: Scalars['Int']['output'];
};

export type ProjectStats = {
  __typename?: 'ProjectStats';
  current?: Maybe<ProjectStatsBase>;
  datetimeRange: DatetimeRange;
  prevTimeRange?: Maybe<ProjectStatsBase>;
};

export type ProjectStatsBase = {
  __typename?: 'ProjectStatsBase';
  projectContributionsStats?: Maybe<ProjectContributionsStatsBase>;
  /** @deprecated will be deprecated */
  projectFollowers?: Maybe<ProjectFollowerStats>;
  /** @deprecated will be deprecated */
  projectFunderRewards?: Maybe<ProjectFunderRewardStats>;
  /** @deprecated will be deprecated */
  projectFunders?: Maybe<ProjectFunderStats>;
  /** @deprecated Use projectContributionsStats instead */
  projectFundingTxs?: Maybe<ProjectFundingTxStats>;
  /** @deprecated will be deprecated */
  projectViews?: Maybe<ProjectViewStats>;
};

export enum ProjectStatus {
  Active = 'active',
  Closed = 'closed',
  Deleted = 'deleted',
  Draft = 'draft',
  InReview = 'in_review',
  Inactive = 'inactive'
}

export type ProjectStatusUpdate = {
  projectId: Scalars['BigInt']['input'];
  status: ProjectStatus;
};

export type ProjectTagMutationInput = {
  projectId: Scalars['BigInt']['input'];
  tagId: Scalars['Int']['input'];
};

export enum ProjectType {
  Donation = 'donation',
  Grant = 'grant',
  Reward = 'reward'
}

export type ProjectViewBaseStats = {
  __typename?: 'ProjectViewBaseStats';
  value: Scalars['String']['output'];
  viewCount: Scalars['Int']['output'];
  visitorCount: Scalars['Int']['output'];
};

export type ProjectViewStats = {
  __typename?: 'ProjectViewStats';
  /** Project view/visitor count of each viewing country in the given datetime range. */
  countries: Array<ProjectViewBaseStats>;
  /** Project view/visitor count of each refferal platform in the given datetime range. */
  referrers: Array<ProjectViewBaseStats>;
  /** Project view/visitor count of each viewing region in the given datetime range. */
  regions: Array<ProjectViewBaseStats>;
  /** Project view count in the given datetime range. */
  viewCount: Scalars['Int']['output'];
  /** Project visitor count in the given datetime range. */
  visitorCount: Scalars['Int']['output'];
  /** Project views/visitors count over the given datetime range grouped by day, or month. */
  visitorGraph: Array<Maybe<PageViewCountGraph>>;
};

export type ProjectsGetQueryInput = {
  /**
   * Takes an array of Project OrderBy options. When passing multiple ordering options, each option must
   * be passed in a separate object in the array. This ensures consistent ordering of the orderBy options in the
   * result set.
   */
  orderBy?: InputMaybe<Array<ProjectsOrderByInput>>;
  pagination?: InputMaybe<PaginationInput>;
  where: ProjectsGetWhereInput;
};

export type ProjectsGetWhereInput = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  ids?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Unique name for the project. Used for the project URL and lightning address. */
  name?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProjectStatus>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  type?: InputMaybe<ProjectType>;
};

export type ProjectsMostFundedByTagInput = {
  range: ProjectsMostFundedByTagRange;
  tagIds: Array<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum ProjectsMostFundedByTagRange {
  Week = 'WEEK'
}

export enum ProjectsOrderByField {
  Balance = 'balance'
}

export type ProjectsOrderByInput = {
  direction: OrderByDirection;
  field: ProjectsOrderByField;
};

export type ProjectsResponse = {
  __typename?: 'ProjectsResponse';
  projects: Array<Project>;
  summary?: Maybe<ProjectsSummary>;
};

export type ProjectsSummary = {
  __typename?: 'ProjectsSummary';
  /** Total of satoshis raised by projects on the platform. */
  fundedTotal?: Maybe<Scalars['BigInt']['output']>;
  /** Total number of funders on the platform. */
  fundersCount?: Maybe<Scalars['Int']['output']>;
  /** Total number of projects ever created on the platform. */
  projectsCount?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']['output']>;
  activitiesCountGroupedByProject: Array<ProjectActivitiesCount>;
  /** Returns all activities. */
  activitiesGet: ActivitiesGetResponse;
  /** Returns all affiliate links of a project. */
  affiliateLinksGet: Array<AffiliateLink>;
  badges: Array<Badge>;
  contributor: Funder;
  currencyQuoteGet: CurrencyQuoteGetResponse;
  entry?: Maybe<Entry>;
  fundersGet: Array<Funder>;
  fundingTx: FundingTx;
  fundingTxInvoiceSanctionCheckStatusGet: FundingTxInvoiceSanctionCheckStatusResponse;
  fundingTxsGet?: Maybe<FundingTxsGetResponse>;
  getDashboardFunders: Array<Funder>;
  /** Returns all published entries. */
  getEntries: Array<Entry>;
  /** Returns the public key of the Lightning node linked to a project, if there is one. */
  getProjectPubkey?: Maybe<Scalars['String']['output']>;
  getProjectReward: ProjectReward;
  getSignedUploadUrl: SignedUploadUrl;
  getWallet: Wallet;
  grant: Grant;
  grantStatistics: GrantStatistics;
  grants: Array<Grant>;
  leaderboardGlobalContributorsGet: Array<GlobalContributorLeaderboardRow>;
  leaderboardGlobalProjectsGet: Array<GlobalProjectLeaderboardRow>;
  lightningAddressVerify: LightningAddressVerifyResponse;
  me?: Maybe<User>;
  orderGet?: Maybe<Order>;
  ordersGet?: Maybe<OrdersGetResponse>;
  ordersStatsGet: OrdersStatsBase;
  projectCountriesGet: Array<ProjectCountriesGetResult>;
  projectGet?: Maybe<Project>;
  projectGoals: ProjectGoals;
  projectLeaderboardContributorsGet: Array<ProjectLeaderboardContributorsRow>;
  projectNotificationSettingsGet: CreatorNotificationSettings;
  projectRegionsGet: Array<ProjectRegionsGetResult>;
  projectRewardCategoriesGet: Array<Scalars['String']['output']>;
  projectRewardsGet: Array<ProjectReward>;
  projectRewardsTrendingWeeklyGet: Array<ProjectRewardsGroupedByRewardIdStats>;
  projectStatsGet: ProjectStats;
  /** By default, returns a list of all active projects. */
  projectsGet: ProjectsResponse;
  projectsMostFundedByTag: Array<ProjectMostFundedByTag>;
  /** Returns summary statistics of all projects, both current and past. */
  projectsSummary: ProjectsSummary;
  statusCheck: Scalars['Boolean']['output'];
  tagsGet: Array<TagsGetResult>;
  tagsMostFundedGet: Array<TagsMostFundedGetResult>;
  user: User;
  userBadge?: Maybe<UserBadge>;
  userBadges: Array<UserBadge>;
  userNotificationSettingsGet: ProfileNotificationSettings;
};


export type QueryActivitiesCountGroupedByProjectArgs = {
  input: ActivitiesCountGroupedByProjectInput;
};


export type QueryActivitiesGetArgs = {
  input?: InputMaybe<GetActivitiesInput>;
};


export type QueryAffiliateLinksGetArgs = {
  input: GetAffiliateLinksInput;
};


export type QueryContributorArgs = {
  input: GetContributorInput;
};


export type QueryCurrencyQuoteGetArgs = {
  input: CurrencyQuoteGetInput;
};


export type QueryEntryArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryFundersGetArgs = {
  input: GetFundersInput;
};


export type QueryFundingTxArgs = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  swapId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFundingTxInvoiceSanctionCheckStatusGetArgs = {
  input: FundingTxInvoiceSanctionCheckStatusGetInput;
};


export type QueryFundingTxsGetArgs = {
  input?: InputMaybe<GetFundingTxsInput>;
};


export type QueryGetDashboardFundersArgs = {
  input?: InputMaybe<GetFundersInput>;
};


export type QueryGetEntriesArgs = {
  input?: InputMaybe<GetEntriesInput>;
};


export type QueryGetProjectPubkeyArgs = {
  projectId: Scalars['BigInt']['input'];
};


export type QueryGetProjectRewardArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryGetSignedUploadUrlArgs = {
  input: FileUploadInput;
};


export type QueryGetWalletArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryGrantArgs = {
  input: GrantGetInput;
};


export type QueryLeaderboardGlobalContributorsGetArgs = {
  input: LeaderboardGlobalContributorsGetInput;
};


export type QueryLeaderboardGlobalProjectsGetArgs = {
  input: LeaderboardGlobalProjectsGetInput;
};


export type QueryLightningAddressVerifyArgs = {
  lightningAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrderGetArgs = {
  where: UniqueOrderInput;
};


export type QueryOrdersGetArgs = {
  input: OrdersGetInput;
};


export type QueryOrdersStatsGetArgs = {
  input: GetProjectOrdersStatsInput;
};


export type QueryProjectGetArgs = {
  where: UniqueProjectQueryInput;
};


export type QueryProjectGoalsArgs = {
  input: GetProjectGoalsInput;
};


export type QueryProjectLeaderboardContributorsGetArgs = {
  input: ProjectLeaderboardContributorsGetInput;
};


export type QueryProjectNotificationSettingsGetArgs = {
  projectId: Scalars['BigInt']['input'];
};


export type QueryProjectRewardsGetArgs = {
  input: GetProjectRewardInput;
};


export type QueryProjectStatsGetArgs = {
  input: GetProjectStatsInput;
};


export type QueryProjectsGetArgs = {
  input?: InputMaybe<ProjectsGetQueryInput>;
};


export type QueryProjectsMostFundedByTagArgs = {
  input: ProjectsMostFundedByTagInput;
};


export type QueryUserArgs = {
  where: UserGetInput;
};


export type QueryUserBadgeArgs = {
  userBadgeId: Scalars['BigInt']['input'];
};


export type QueryUserBadgesArgs = {
  input: BadgesGetInput;
};


export type QueryUserNotificationSettingsGetArgs = {
  userId: Scalars['BigInt']['input'];
};

export enum QuoteCurrency {
  Usd = 'USD'
}

export type ResourceInput = {
  resourceId: Scalars['BigInt']['input'];
  resourceType: FundingResourceType;
};

export enum RewardCurrency {
  Btcsat = 'BTCSAT',
  Usdcent = 'USDCENT'
}

export type SendOtpByEmailInput = {
  action: MfaAction;
  email?: InputMaybe<Scalars['String']['input']>;
};

export enum SettingValueType {
  Boolean = 'BOOLEAN',
  Enum = 'ENUM',
  Integer = 'INTEGER',
  String = 'STRING'
}

export enum ShippingDestination {
  International = 'international',
  National = 'national'
}

export type SignedUploadUrl = {
  __typename?: 'SignedUploadUrl';
  /** Distribution URL from which the image will be served */
  distributionUrl: Scalars['String']['output'];
  /** Signed URL used by the client to upload an image */
  uploadUrl: Scalars['String']['output'];
};

export type SourceResource = Entry | Project;

export type Sponsor = {
  __typename?: 'Sponsor';
  createdAt: Scalars['Date']['output'];
  id: Scalars['BigInt']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  status: SponsorStatus;
  url?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export enum SponsorStatus {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type StatsInterface = {
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalUsd: Scalars['Float']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']['output']>;
  activityCreated: ActivityResource;
  entryPublished: EntryPublishedSubscriptionResponse;
  fundingTxStatusUpdated: FundingTxStatusUpdatedSubscriptionResponse;
  projectActivated: ProjectActivatedSubscriptionResponse;
};


export type SubscriptionActivityCreatedArgs = {
  input?: InputMaybe<ActivityCreatedSubscriptionInput>;
};


export type SubscriptionFundingTxStatusUpdatedArgs = {
  input?: InputMaybe<FundingTxStatusUpdatedInput>;
};

export type Swap = {
  __typename?: 'Swap';
  json: Scalars['String']['output'];
};

export type TotpInput = {
  totp: Scalars['Int']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
};

export type TagCreateInput = {
  label: Scalars['String']['input'];
};

export type TagsGetResult = {
  __typename?: 'TagsGetResult';
  count: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
};

export type TagsMostFundedGetResult = {
  __typename?: 'TagsMostFundedGetResult';
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
};

export type TwoFaInput = {
  OTP?: InputMaybe<OtpInput>;
  /** TOTP is not supported yet. */
  TOTP?: InputMaybe<TotpInput>;
};

export type UniqueOrderInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
};

export type UniqueProjectQueryInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  /** Unique name for the project. Used for the project URL and lightning address. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Project's Nostr Public Key in HEX format */
  nostrPublicKey?: InputMaybe<Scalars['String']['input']>;
};

export enum UpdatableOrderStatus {
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Shipped = 'SHIPPED'
}

export type UpdateEntryInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  entryId: Scalars['BigInt']['input'];
  /** Header image of the Entry. */
  image?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  /** Project ISO3166 country code */
  countryCode?: InputMaybe<Scalars['String']['input']>;
  /** Description of the project. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Main project image. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Project links */
  links?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Project name, used both for the project URL, project lightning address and NIP05. */
  name?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['BigInt']['input'];
  /** Project region */
  region?: InputMaybe<Scalars['String']['input']>;
  /** The currency used to price rewards for the project. Currently only USDCENT supported. Should become an Enum. */
  rewardCurrency?: InputMaybe<RewardCurrency>;
  /** A short description of the project. */
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  /** Current status of the project */
  status?: InputMaybe<ProjectStatus>;
  /** Project header image. */
  thumbnailImage?: InputMaybe<Scalars['String']['input']>;
  /** Public title of the project. */
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProjectType>;
};

export type UpdateProjectRewardInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  /** Cost of the reward, priced in USD cents */
  cost?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  estimatedAvailabilityDate?: InputMaybe<Scalars['Date']['input']>;
  estimatedDeliveryInWeeks?: InputMaybe<Scalars['Int']['input']>;
  hasShipping?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isAddon?: InputMaybe<Scalars['Boolean']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  maxClaimable?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preOrder?: InputMaybe<Scalars['Boolean']['input']>;
  projectRewardId: Scalars['BigInt']['input'];
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWalletInput = {
  feePercentage?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['BigInt']['input'];
  lightningAddressConnectionDetailsInput?: InputMaybe<LightningAddressConnectionDetailsUpdateInput>;
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  twoFAInput?: InputMaybe<TwoFaInput>;
};

export type UpdateWalletStateInput = {
  status: WalletStatus;
  statusCode: WalletStatusCode;
  walletId: Scalars['BigInt']['input'];
};

export type User = {
  __typename?: 'User';
  badges: Array<UserBadge>;
  bio?: Maybe<Scalars['String']['output']>;
  /** Details on the participation of a User in a project. */
  contributions: Array<UserProjectContribution>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerifiedAt?: Maybe<Scalars['Date']['output']>;
  /**
   * By default, returns all the entries of a user, both published and unpublished but not deleted.
   * To filter the result set, an explicit input can be passed that specifies a value of true or false for the published field.
   * An unpublished entry is only returned if the requesting user is the creator of the entry.
   */
  entries: Array<Entry>;
  /**
   * External accounts linked to the User. It can be a twitter account if the User linked their account. For anonymous
   * users, this field can contain the wallet or app from which they funded, eg: Fountain, Breeze, etc.
   */
  externalAccounts: Array<ExternalAccount>;
  /** Returns a user's funding transactions accross all projects. */
  fundingTxs: Array<FundingTx>;
  hasSocialAccount: Scalars['Boolean']['output'];
  id: Scalars['BigInt']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isEmailVerified: Scalars['Boolean']['output'];
  orders?: Maybe<Array<Order>>;
  ownerOf: Array<OwnerOf>;
  projectFollows: Array<Project>;
  /**
   * Returns the projects of a user. By default, this field returns all the projects for that user, both draft and non-draft.
   * To filter the result set, an explicit input can be passed that specifies a value of the status field.
   */
  projects: Array<Project>;
  ranking?: Maybe<Scalars['BigInt']['output']>;
  username: Scalars['String']['output'];
  wallet?: Maybe<Wallet>;
};


export type UserEntriesArgs = {
  input?: InputMaybe<UserEntriesGetInput>;
};


export type UserProjectsArgs = {
  input?: InputMaybe<UserProjectsGetInput>;
};

export type UserBadge = {
  __typename?: 'UserBadge';
  badge: Badge;
  badgeAwardEventId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  fundingTxId?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['BigInt']['output'];
  status?: Maybe<UserBadgeStatus>;
  updatedAt: Scalars['Date']['output'];
  userId: Scalars['BigInt']['output'];
};

export enum UserBadgeStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING'
}

export type UserEmailUpdateInput = {
  email: Scalars['String']['input'];
  /** The two-factor authentication input is required if the user already has an email set. */
  twoFAInput?: InputMaybe<TwoFaInput>;
};

export type UserEntriesGetInput = {
  where?: InputMaybe<UserEntriesGetWhereInput>;
};

export type UserEntriesGetWhereInput = {
  published?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserGetInput = {
  id: Scalars['BigInt']['input'];
};

export type UserNotificationSettings = {
  __typename?: 'UserNotificationSettings';
  notificationSettings: Array<NotificationSettings>;
  userId: Scalars['BigInt']['output'];
};

export type UserProjectContribution = {
  __typename?: 'UserProjectContribution';
  /** Funder linked to the funding contribution. Only present if the contribution was a funding contribution. */
  funder?: Maybe<Funder>;
  /**
   * Boolean value indicating if the User was an ambassador of the project.
   * @deprecated No longer supported
   */
  isAmbassador: Scalars['Boolean']['output'];
  /** Boolean value indicating if the User funded the project. */
  isFunder: Scalars['Boolean']['output'];
  /**
   * Boolean value indicating if the User was a sponsor for the project.
   * @deprecated No longer supported
   */
  isSponsor: Scalars['Boolean']['output'];
  /** Project linked to the contributions. */
  project: Project;
};

export type UserProjectsGetInput = {
  where?: InputMaybe<UserProjectsGetWhereInput>;
};

export type UserProjectsGetWhereInput = {
  status?: InputMaybe<ProjectStatus>;
};

export enum VotingSystem {
  OneToOne = 'ONE_TO_ONE',
  StepLog_10 = 'STEP_LOG_10'
}

export type Wallet = {
  __typename?: 'Wallet';
  connectionDetails: ConnectionDetails;
  /** The fee percentage applied to contributions going to this wallet. */
  feePercentage?: Maybe<Scalars['Float']['output']>;
  id: Scalars['BigInt']['output'];
  /** Funding limits on this wallet */
  limits?: Maybe<WalletLimits>;
  /** Wallet name */
  name?: Maybe<Scalars['String']['output']>;
  state: WalletState;
};

export type WalletContributionLimits = {
  __typename?: 'WalletContributionLimits';
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
  offChain?: Maybe<WalletOffChainContributionLimits>;
  onChain?: Maybe<WalletOnChainContributionLimits>;
};

export type WalletLimits = {
  __typename?: 'WalletLimits';
  contribution?: Maybe<WalletContributionLimits>;
};

export type WalletOffChainContributionLimits = {
  __typename?: 'WalletOffChainContributionLimits';
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
};

export type WalletOnChainContributionLimits = {
  __typename?: 'WalletOnChainContributionLimits';
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
};

export type WalletResourceInput = {
  resourceId: Scalars['BigInt']['input'];
  resourceType: WalletResourceType;
};

export enum WalletResourceType {
  Project = 'project',
  User = 'user'
}

export type WalletState = {
  __typename?: 'WalletState';
  /**
   * The status field is meant to be displayed in the the public view of a project to provide insight to the user
   * that wants to contribute to the project.
   */
  status: WalletStatus;
  /**
   * The status code is a more descriptive field about the wallet status. It is meant to be displayed to the
   * project creator to help them understand what is wrong with their wallet connection. The field can only be queried
   * by the project creator.
   */
  statusCode: WalletStatusCode;
};

export enum WalletStatus {
  Inactive = 'INACTIVE',
  Ok = 'OK',
  Unstable = 'UNSTABLE'
}

export enum WalletStatusCode {
  NotFound = 'NOT_FOUND',
  NoRoute = 'NO_ROUTE',
  Ok = 'OK',
  Unknown = 'UNKNOWN',
  Unreachable = 'UNREACHABLE',
  WalletLocked = 'WALLET_LOCKED'
}

export type DashboardFundersGetInput = {
  orderBy?: InputMaybe<GetFundersOrderByInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<GetDashboardFundersWhereInput>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  ActivityResource: ( Entry ) | ( Omit<FundingTx, 'sourceResource'> & { sourceResource?: Maybe<RefType['SourceResource']> } ) | ( Project ) | ( ProjectGoal ) | ( ProjectReward );
  ConnectionDetails: ( LightningAddressConnectionDetails ) | ( LndConnectionDetailsPrivate ) | ( LndConnectionDetailsPublic );
  Grant: ( BoardVoteGrant ) | ( CommunityVoteGrant );
  SourceResource: ( Entry ) | ( Project );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  GraphSumData: ( FunderRewardGraphSum ) | ( FundingTxAmountGraph );
  LndConnectionDetails: never;
  MutationResponse: ( DeleteUserResponse ) | ( ProjectDeleteResponse ) | ( ProjectGoalDeleteResponse );
  StatsInterface: ( ProjectContributionsGroupedByMethodStats ) | ( ProjectContributionsStats );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ActivitiesCountGroupedByProjectInput: ActivitiesCountGroupedByProjectInput;
  ActivitiesGetResponse: ResolverTypeWrapper<ActivitiesGetResponse>;
  Activity: ResolverTypeWrapper<Omit<Activity, 'resource'> & { resource: ResolversTypes['ActivityResource'] }>;
  ActivityCreatedSubscriptionInput: ActivityCreatedSubscriptionInput;
  ActivityCreatedSubscriptionWhereInput: ActivityCreatedSubscriptionWhereInput;
  ActivityFeedName: ActivityFeedName;
  ActivityResource: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ActivityResource']>;
  ActivityResourceType: ActivityResourceType;
  AffiliateLink: ResolverTypeWrapper<AffiliateLink>;
  AffiliateLinkCreateInput: AffiliateLinkCreateInput;
  AffiliatePaymentConfirmResponse: ResolverTypeWrapper<AffiliatePaymentConfirmResponse>;
  AffiliatePayoutsStats: ResolverTypeWrapper<AffiliatePayoutsStats>;
  AffiliateSalesStats: ResolverTypeWrapper<AffiliateSalesStats>;
  AffiliateStats: ResolverTypeWrapper<AffiliateStats>;
  AffiliateStatus: AffiliateStatus;
  Ambassador: ResolverTypeWrapper<Ambassador>;
  AmountSummary: ResolverTypeWrapper<AmountSummary>;
  AnalyticsGroupByInterval: AnalyticsGroupByInterval;
  Badge: ResolverTypeWrapper<Badge>;
  BadgeClaimInput: BadgeClaimInput;
  BadgesGetInput: BadgesGetInput;
  BadgesGetWhereInput: BadgesGetWhereInput;
  BaseCurrency: BaseCurrency;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BitcoinQuote: ResolverTypeWrapper<BitcoinQuote>;
  BoardVoteGrant: ResolverTypeWrapper<BoardVoteGrant>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CommunityVoteGrant: ResolverTypeWrapper<CommunityVoteGrant>;
  CompetitionVoteGrantVoteSummary: ResolverTypeWrapper<CompetitionVoteGrantVoteSummary>;
  ConnectionDetails: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ConnectionDetails']>;
  Country: ResolverTypeWrapper<Country>;
  CreateEntryInput: CreateEntryInput;
  CreateProjectInput: CreateProjectInput;
  CreateProjectRewardInput: CreateProjectRewardInput;
  CreateWalletInput: CreateWalletInput;
  CreatorNotificationSettings: ResolverTypeWrapper<CreatorNotificationSettings>;
  CreatorNotificationSettingsProject: ResolverTypeWrapper<CreatorNotificationSettingsProject>;
  Currency: Currency;
  CurrencyQuoteGetInput: CurrencyQuoteGetInput;
  CurrencyQuoteGetResponse: ResolverTypeWrapper<CurrencyQuoteGetResponse>;
  CursorInput: CursorInput;
  CursorInputString: CursorInputString;
  CursorPaginationResponse: ResolverTypeWrapper<CursorPaginationResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateRangeInput: DateRangeInput;
  DatetimeRange: ResolverTypeWrapper<DatetimeRange>;
  DeleteProjectInput: DeleteProjectInput;
  DeleteProjectRewardInput: DeleteProjectRewardInput;
  DeleteUserResponse: ResolverTypeWrapper<DeleteUserResponse>;
  DistributionSystem: DistributionSystem;
  EmailVerifyInput: EmailVerifyInput;
  Entry: ResolverTypeWrapper<Entry>;
  EntryPublishedSubscriptionResponse: ResolverTypeWrapper<EntryPublishedSubscriptionResponse>;
  EntryStatus: EntryStatus;
  EntryType: EntryType;
  ExternalAccount: ResolverTypeWrapper<ExternalAccount>;
  FileUploadInput: FileUploadInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Funder: ResolverTypeWrapper<Funder>;
  FunderRewardGraphSum: ResolverTypeWrapper<FunderRewardGraphSum>;
  FundingCancelInput: FundingCancelInput;
  FundingCancelResponse: ResolverTypeWrapper<FundingCancelResponse>;
  FundingConfirmInput: FundingConfirmInput;
  FundingConfirmOffChainBolt11Input: FundingConfirmOffChainBolt11Input;
  FundingConfirmOffChainInput: FundingConfirmOffChainInput;
  FundingConfirmOnChainInput: FundingConfirmOnChainInput;
  FundingConfirmResponse: ResolverTypeWrapper<FundingConfirmResponse>;
  FundingCreateFromPodcastKeysendInput: FundingCreateFromPodcastKeysendInput;
  FundingInput: FundingInput;
  FundingMetadataInput: FundingMetadataInput;
  FundingMethod: FundingMethod;
  FundingMutationResponse: ResolverTypeWrapper<FundingMutationResponse>;
  FundingPendingInput: FundingPendingInput;
  FundingPendingOffChainBolt11Input: FundingPendingOffChainBolt11Input;
  FundingPendingOffChainInput: FundingPendingOffChainInput;
  FundingPendingOnChainInput: FundingPendingOnChainInput;
  FundingPendingResponse: ResolverTypeWrapper<FundingPendingResponse>;
  FundingQueryResponse: ResolverTypeWrapper<FundingQueryResponse>;
  FundingResourceType: FundingResourceType;
  FundingStatus: FundingStatus;
  FundingTx: ResolverTypeWrapper<Omit<FundingTx, 'sourceResource'> & { sourceResource?: Maybe<ResolversTypes['SourceResource']> }>;
  FundingTxAmountGraph: ResolverTypeWrapper<FundingTxAmountGraph>;
  FundingTxEmailUpdateInput: FundingTxEmailUpdateInput;
  FundingTxInvoiceSanctionCheckStatus: FundingTxInvoiceSanctionCheckStatus;
  FundingTxInvoiceSanctionCheckStatusGetInput: FundingTxInvoiceSanctionCheckStatusGetInput;
  FundingTxInvoiceSanctionCheckStatusResponse: ResolverTypeWrapper<FundingTxInvoiceSanctionCheckStatusResponse>;
  FundingTxMethodCount: ResolverTypeWrapper<FundingTxMethodCount>;
  FundingTxMethodSum: ResolverTypeWrapper<FundingTxMethodSum>;
  FundingTxStatusUpdatedInput: FundingTxStatusUpdatedInput;
  FundingTxStatusUpdatedSubscriptionResponse: ResolverTypeWrapper<FundingTxStatusUpdatedSubscriptionResponse>;
  FundingTxsGetResponse: ResolverTypeWrapper<FundingTxsGetResponse>;
  FundingTxsWhereFundingStatus: FundingTxsWhereFundingStatus;
  FundingType: FundingType;
  FundinginvoiceCancel: ResolverTypeWrapper<FundinginvoiceCancel>;
  GenerateAffiliatePaymentRequestResponse: ResolverTypeWrapper<GenerateAffiliatePaymentRequestResponse>;
  GenerateAffiliatePaymentRequestsInput: GenerateAffiliatePaymentRequestsInput;
  GetActivitiesInput: GetActivitiesInput;
  GetActivityOrderByInput: GetActivityOrderByInput;
  GetActivityPaginationInput: GetActivityPaginationInput;
  GetActivityWhereInput: GetActivityWhereInput;
  GetAffiliateLinksInput: GetAffiliateLinksInput;
  GetAffiliateLinksWhereInput: GetAffiliateLinksWhereInput;
  GetContributorInput: GetContributorInput;
  GetDashboardFundersWhereInput: GetDashboardFundersWhereInput;
  GetEntriesInput: GetEntriesInput;
  GetEntriesOrderByInput: GetEntriesOrderByInput;
  GetEntriesWhereInput: GetEntriesWhereInput;
  GetFunderFundingTxsInput: GetFunderFundingTxsInput;
  GetFunderFundingTxsWhereInput: GetFunderFundingTxsWhereInput;
  GetFunderWhereInput: GetFunderWhereInput;
  GetFundersInput: GetFundersInput;
  GetFundersOrderByInput: GetFundersOrderByInput;
  GetFundingTxsInput: GetFundingTxsInput;
  GetFundingTxsOrderByInput: GetFundingTxsOrderByInput;
  GetFundingTxsWhereInput: GetFundingTxsWhereInput;
  GetProjectGoalsInput: GetProjectGoalsInput;
  GetProjectOrdersStatsInput: GetProjectOrdersStatsInput;
  GetProjectOrdersStatsWhereInput: GetProjectOrdersStatsWhereInput;
  GetProjectRewardInput: GetProjectRewardInput;
  GetProjectRewardWhereInput: GetProjectRewardWhereInput;
  GetProjectStatsInput: GetProjectStatsInput;
  GetProjectStatsWhereInput: GetProjectStatsWhereInput;
  GlobalContributorLeaderboardRow: ResolverTypeWrapper<GlobalContributorLeaderboardRow>;
  GlobalProjectLeaderboardRow: ResolverTypeWrapper<GlobalProjectLeaderboardRow>;
  Grant: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Grant']>;
  GrantApplicant: ResolverTypeWrapper<Omit<GrantApplicant, 'grant'> & { grant: ResolversTypes['Grant'] }>;
  GrantApplicantContributor: ResolverTypeWrapper<GrantApplicantContributor>;
  GrantApplicantContributorInput: GrantApplicantContributorInput;
  GrantApplicantContributorWhereInput: GrantApplicantContributorWhereInput;
  GrantApplicantFunding: ResolverTypeWrapper<GrantApplicantFunding>;
  GrantApplicantStatus: GrantApplicantStatus;
  GrantApplicantStatusFilter: GrantApplicantStatusFilter;
  GrantApplicantsGetInput: GrantApplicantsGetInput;
  GrantApplicantsGetOrderByInput: GrantApplicantsGetOrderByInput;
  GrantApplicantsGetWhereInput: GrantApplicantsGetWhereInput;
  GrantApplicantsOrderByField: GrantApplicantsOrderByField;
  GrantApplyInput: GrantApplyInput;
  GrantBoardMember: ResolverTypeWrapper<GrantBoardMember>;
  GrantGetInput: GrantGetInput;
  GrantGetWhereInput: GrantGetWhereInput;
  GrantStatistics: ResolverTypeWrapper<GrantStatistics>;
  GrantStatisticsApplicant: ResolverTypeWrapper<GrantStatisticsApplicant>;
  GrantStatisticsGrant: ResolverTypeWrapper<GrantStatisticsGrant>;
  GrantStatus: ResolverTypeWrapper<GrantStatus>;
  GrantStatusEnum: GrantStatusEnum;
  GrantType: GrantType;
  GraphSumData: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['GraphSumData']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InvoiceStatus: InvoiceStatus;
  LeaderboardGlobalContributorsGetInput: LeaderboardGlobalContributorsGetInput;
  LeaderboardGlobalProjectsGetInput: LeaderboardGlobalProjectsGetInput;
  LeaderboardPeriod: LeaderboardPeriod;
  LightningAddressConnectionDetails: ResolverTypeWrapper<LightningAddressConnectionDetails>;
  LightningAddressConnectionDetailsCreateInput: LightningAddressConnectionDetailsCreateInput;
  LightningAddressConnectionDetailsUpdateInput: LightningAddressConnectionDetailsUpdateInput;
  LightningAddressContributionLimits: ResolverTypeWrapper<LightningAddressContributionLimits>;
  LightningAddressVerifyResponse: ResolverTypeWrapper<LightningAddressVerifyResponse>;
  LndConnectionDetails: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['LndConnectionDetails']>;
  LndConnectionDetailsCreateInput: LndConnectionDetailsCreateInput;
  LndConnectionDetailsPrivate: ResolverTypeWrapper<LndConnectionDetailsPrivate>;
  LndConnectionDetailsPublic: ResolverTypeWrapper<LndConnectionDetailsPublic>;
  LndConnectionDetailsUpdateInput: LndConnectionDetailsUpdateInput;
  LndNodeType: LndNodeType;
  Location: ResolverTypeWrapper<Location>;
  MFAAction: MfaAction;
  Milestone: ResolverTypeWrapper<Milestone>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationResponse']>;
  NostrKeys: ResolverTypeWrapper<NostrKeys>;
  NostrPrivateKey: ResolverTypeWrapper<NostrPrivateKey>;
  NostrPublicKey: ResolverTypeWrapper<NostrPublicKey>;
  NotificationChannel: NotificationChannel;
  NotificationConfiguration: ResolverTypeWrapper<NotificationConfiguration>;
  NotificationSettings: ResolverTypeWrapper<NotificationSettings>;
  OTPInput: OtpInput;
  OTPLoginInput: OtpLoginInput;
  OTPResponse: ResolverTypeWrapper<OtpResponse>;
  OffsetBasedPaginationInput: OffsetBasedPaginationInput;
  OnChainTxInput: OnChainTxInput;
  Order: ResolverTypeWrapper<Order>;
  OrderBitcoinQuoteInput: OrderBitcoinQuoteInput;
  OrderByDirection: OrderByDirection;
  OrderByOptions: OrderByOptions;
  OrderFundingInput: OrderFundingInput;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  OrderItemInput: OrderItemInput;
  OrderItemType: OrderItemType;
  OrderStatusUpdateInput: OrderStatusUpdateInput;
  OrdersGetInput: OrdersGetInput;
  OrdersGetOrderByField: OrdersGetOrderByField;
  OrdersGetOrderByInput: OrdersGetOrderByInput;
  OrdersGetResponse: ResolverTypeWrapper<OrdersGetResponse>;
  OrdersGetStatus: OrdersGetStatus;
  OrdersGetWhereInput: OrdersGetWhereInput;
  OrdersStatsBase: ResolverTypeWrapper<OrdersStatsBase>;
  Owner: ResolverTypeWrapper<Owner>;
  OwnerOf: ResolverTypeWrapper<OwnerOf>;
  PageViewCountGraph: ResolverTypeWrapper<PageViewCountGraph>;
  PaginationCursor: ResolverTypeWrapper<PaginationCursor>;
  PaginationInput: PaginationInput;
  ProfileNotificationSettings: ResolverTypeWrapper<ProfileNotificationSettings>;
  Project: ResolverTypeWrapper<Project>;
  ProjectActivatedSubscriptionResponse: ResolverTypeWrapper<ProjectActivatedSubscriptionResponse>;
  ProjectActivitiesCount: ResolverTypeWrapper<ProjectActivitiesCount>;
  ProjectContributionsGroupedByMethodStats: ResolverTypeWrapper<ProjectContributionsGroupedByMethodStats>;
  ProjectContributionsStats: ResolverTypeWrapper<ProjectContributionsStats>;
  ProjectContributionsStatsBase: ResolverTypeWrapper<ProjectContributionsStatsBase>;
  ProjectCountriesGetResult: ResolverTypeWrapper<ProjectCountriesGetResult>;
  ProjectDeleteResponse: ResolverTypeWrapper<ProjectDeleteResponse>;
  ProjectEntriesGetInput: ProjectEntriesGetInput;
  ProjectEntriesGetWhereInput: ProjectEntriesGetWhereInput;
  ProjectFollowMutationInput: ProjectFollowMutationInput;
  ProjectFollowerStats: ResolverTypeWrapper<ProjectFollowerStats>;
  ProjectFunderRewardStats: ResolverTypeWrapper<ProjectFunderRewardStats>;
  ProjectFunderStats: ResolverTypeWrapper<ProjectFunderStats>;
  ProjectFundingTxStats: ResolverTypeWrapper<ProjectFundingTxStats>;
  ProjectGoal: ResolverTypeWrapper<ProjectGoal>;
  ProjectGoalCreateInput: ProjectGoalCreateInput;
  ProjectGoalCurrency: ProjectGoalCurrency;
  ProjectGoalDeleteResponse: ResolverTypeWrapper<ProjectGoalDeleteResponse>;
  ProjectGoalOrderingUpdateInput: ProjectGoalOrderingUpdateInput;
  ProjectGoalStatus: ProjectGoalStatus;
  ProjectGoalStatusInCreate: ProjectGoalStatusInCreate;
  ProjectGoalUpdateInput: ProjectGoalUpdateInput;
  ProjectGoals: ResolverTypeWrapper<ProjectGoals>;
  ProjectGrantApplicationsInput: ProjectGrantApplicationsInput;
  ProjectGrantApplicationsWhereInput: ProjectGrantApplicationsWhereInput;
  ProjectGrantApplicationsWhereInputEnum: ProjectGrantApplicationsWhereInputEnum;
  ProjectKeys: ResolverTypeWrapper<ProjectKeys>;
  ProjectLeaderboardContributorsGetInput: ProjectLeaderboardContributorsGetInput;
  ProjectLeaderboardContributorsRow: ResolverTypeWrapper<ProjectLeaderboardContributorsRow>;
  ProjectLeaderboardPeriod: ProjectLeaderboardPeriod;
  ProjectLinkMutationInput: ProjectLinkMutationInput;
  ProjectMostFunded: ResolverTypeWrapper<ProjectMostFunded>;
  ProjectMostFundedByTag: ResolverTypeWrapper<ProjectMostFundedByTag>;
  ProjectPublishMutationInput: ProjectPublishMutationInput;
  ProjectRegionsGetResult: ResolverTypeWrapper<ProjectRegionsGetResult>;
  ProjectReward: ResolverTypeWrapper<ProjectReward>;
  ProjectRewardCurrencyUpdate: ProjectRewardCurrencyUpdate;
  ProjectRewardCurrencyUpdateRewardsInput: ProjectRewardCurrencyUpdateRewardsInput;
  ProjectRewardsGroupedByRewardIdStats: ResolverTypeWrapper<ProjectRewardsGroupedByRewardIdStats>;
  ProjectRewardsStats: ResolverTypeWrapper<ProjectRewardsStats>;
  ProjectStatistics: ResolverTypeWrapper<ProjectStatistics>;
  ProjectStats: ResolverTypeWrapper<ProjectStats>;
  ProjectStatsBase: ResolverTypeWrapper<ProjectStatsBase>;
  ProjectStatus: ProjectStatus;
  ProjectStatusUpdate: ProjectStatusUpdate;
  ProjectTagMutationInput: ProjectTagMutationInput;
  ProjectType: ProjectType;
  ProjectViewBaseStats: ResolverTypeWrapper<ProjectViewBaseStats>;
  ProjectViewStats: ResolverTypeWrapper<ProjectViewStats>;
  ProjectsGetQueryInput: ProjectsGetQueryInput;
  ProjectsGetWhereInput: ProjectsGetWhereInput;
  ProjectsMostFundedByTagInput: ProjectsMostFundedByTagInput;
  ProjectsMostFundedByTagRange: ProjectsMostFundedByTagRange;
  ProjectsOrderByField: ProjectsOrderByField;
  ProjectsOrderByInput: ProjectsOrderByInput;
  ProjectsResponse: ResolverTypeWrapper<ProjectsResponse>;
  ProjectsSummary: ResolverTypeWrapper<ProjectsSummary>;
  Query: ResolverTypeWrapper<{}>;
  QuoteCurrency: QuoteCurrency;
  ResourceInput: ResourceInput;
  RewardCurrency: RewardCurrency;
  SendOtpByEmailInput: SendOtpByEmailInput;
  SettingValueType: SettingValueType;
  ShippingDestination: ShippingDestination;
  SignedUploadUrl: ResolverTypeWrapper<SignedUploadUrl>;
  SourceResource: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SourceResource']>;
  Sponsor: ResolverTypeWrapper<Sponsor>;
  SponsorStatus: SponsorStatus;
  StatsInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['StatsInterface']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Swap: ResolverTypeWrapper<Swap>;
  TOTPInput: TotpInput;
  Tag: ResolverTypeWrapper<Tag>;
  TagCreateInput: TagCreateInput;
  TagsGetResult: ResolverTypeWrapper<TagsGetResult>;
  TagsMostFundedGetResult: ResolverTypeWrapper<TagsMostFundedGetResult>;
  TwoFAInput: TwoFaInput;
  UniqueOrderInput: UniqueOrderInput;
  UniqueProjectQueryInput: UniqueProjectQueryInput;
  UpdatableOrderStatus: UpdatableOrderStatus;
  UpdateEntryInput: UpdateEntryInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateProjectRewardInput: UpdateProjectRewardInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWalletInput: UpdateWalletInput;
  UpdateWalletStateInput: UpdateWalletStateInput;
  User: ResolverTypeWrapper<User>;
  UserBadge: ResolverTypeWrapper<UserBadge>;
  UserBadgeStatus: UserBadgeStatus;
  UserEmailUpdateInput: UserEmailUpdateInput;
  UserEntriesGetInput: UserEntriesGetInput;
  UserEntriesGetWhereInput: UserEntriesGetWhereInput;
  UserGetInput: UserGetInput;
  UserNotificationSettings: ResolverTypeWrapper<UserNotificationSettings>;
  UserProjectContribution: ResolverTypeWrapper<UserProjectContribution>;
  UserProjectsGetInput: UserProjectsGetInput;
  UserProjectsGetWhereInput: UserProjectsGetWhereInput;
  VotingSystem: VotingSystem;
  Wallet: ResolverTypeWrapper<Omit<Wallet, 'connectionDetails'> & { connectionDetails: ResolversTypes['ConnectionDetails'] }>;
  WalletContributionLimits: ResolverTypeWrapper<WalletContributionLimits>;
  WalletLimits: ResolverTypeWrapper<WalletLimits>;
  WalletOffChainContributionLimits: ResolverTypeWrapper<WalletOffChainContributionLimits>;
  WalletOnChainContributionLimits: ResolverTypeWrapper<WalletOnChainContributionLimits>;
  WalletResourceInput: WalletResourceInput;
  WalletResourceType: WalletResourceType;
  WalletState: ResolverTypeWrapper<WalletState>;
  WalletStatus: WalletStatus;
  WalletStatusCode: WalletStatusCode;
  dashboardFundersGetInput: DashboardFundersGetInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ActivitiesCountGroupedByProjectInput: ActivitiesCountGroupedByProjectInput;
  ActivitiesGetResponse: ActivitiesGetResponse;
  Activity: Omit<Activity, 'resource'> & { resource: ResolversParentTypes['ActivityResource'] };
  ActivityCreatedSubscriptionInput: ActivityCreatedSubscriptionInput;
  ActivityCreatedSubscriptionWhereInput: ActivityCreatedSubscriptionWhereInput;
  ActivityResource: ResolversUnionTypes<ResolversParentTypes>['ActivityResource'];
  AffiliateLink: AffiliateLink;
  AffiliateLinkCreateInput: AffiliateLinkCreateInput;
  AffiliatePaymentConfirmResponse: AffiliatePaymentConfirmResponse;
  AffiliatePayoutsStats: AffiliatePayoutsStats;
  AffiliateSalesStats: AffiliateSalesStats;
  AffiliateStats: AffiliateStats;
  Ambassador: Ambassador;
  AmountSummary: AmountSummary;
  Badge: Badge;
  BadgeClaimInput: BadgeClaimInput;
  BadgesGetInput: BadgesGetInput;
  BadgesGetWhereInput: BadgesGetWhereInput;
  BigInt: Scalars['BigInt']['output'];
  BitcoinQuote: BitcoinQuote;
  BoardVoteGrant: BoardVoteGrant;
  Boolean: Scalars['Boolean']['output'];
  CommunityVoteGrant: CommunityVoteGrant;
  CompetitionVoteGrantVoteSummary: CompetitionVoteGrantVoteSummary;
  ConnectionDetails: ResolversUnionTypes<ResolversParentTypes>['ConnectionDetails'];
  Country: Country;
  CreateEntryInput: CreateEntryInput;
  CreateProjectInput: CreateProjectInput;
  CreateProjectRewardInput: CreateProjectRewardInput;
  CreateWalletInput: CreateWalletInput;
  CreatorNotificationSettings: CreatorNotificationSettings;
  CreatorNotificationSettingsProject: CreatorNotificationSettingsProject;
  CurrencyQuoteGetInput: CurrencyQuoteGetInput;
  CurrencyQuoteGetResponse: CurrencyQuoteGetResponse;
  CursorInput: CursorInput;
  CursorInputString: CursorInputString;
  CursorPaginationResponse: CursorPaginationResponse;
  Date: Scalars['Date']['output'];
  DateRangeInput: DateRangeInput;
  DatetimeRange: DatetimeRange;
  DeleteProjectInput: DeleteProjectInput;
  DeleteProjectRewardInput: DeleteProjectRewardInput;
  DeleteUserResponse: DeleteUserResponse;
  EmailVerifyInput: EmailVerifyInput;
  Entry: Entry;
  EntryPublishedSubscriptionResponse: EntryPublishedSubscriptionResponse;
  ExternalAccount: ExternalAccount;
  FileUploadInput: FileUploadInput;
  Float: Scalars['Float']['output'];
  Funder: Funder;
  FunderRewardGraphSum: FunderRewardGraphSum;
  FundingCancelInput: FundingCancelInput;
  FundingCancelResponse: FundingCancelResponse;
  FundingConfirmInput: FundingConfirmInput;
  FundingConfirmOffChainBolt11Input: FundingConfirmOffChainBolt11Input;
  FundingConfirmOffChainInput: FundingConfirmOffChainInput;
  FundingConfirmOnChainInput: FundingConfirmOnChainInput;
  FundingConfirmResponse: FundingConfirmResponse;
  FundingCreateFromPodcastKeysendInput: FundingCreateFromPodcastKeysendInput;
  FundingInput: FundingInput;
  FundingMetadataInput: FundingMetadataInput;
  FundingMutationResponse: FundingMutationResponse;
  FundingPendingInput: FundingPendingInput;
  FundingPendingOffChainBolt11Input: FundingPendingOffChainBolt11Input;
  FundingPendingOffChainInput: FundingPendingOffChainInput;
  FundingPendingOnChainInput: FundingPendingOnChainInput;
  FundingPendingResponse: FundingPendingResponse;
  FundingQueryResponse: FundingQueryResponse;
  FundingTx: Omit<FundingTx, 'sourceResource'> & { sourceResource?: Maybe<ResolversParentTypes['SourceResource']> };
  FundingTxAmountGraph: FundingTxAmountGraph;
  FundingTxEmailUpdateInput: FundingTxEmailUpdateInput;
  FundingTxInvoiceSanctionCheckStatusGetInput: FundingTxInvoiceSanctionCheckStatusGetInput;
  FundingTxInvoiceSanctionCheckStatusResponse: FundingTxInvoiceSanctionCheckStatusResponse;
  FundingTxMethodCount: FundingTxMethodCount;
  FundingTxMethodSum: FundingTxMethodSum;
  FundingTxStatusUpdatedInput: FundingTxStatusUpdatedInput;
  FundingTxStatusUpdatedSubscriptionResponse: FundingTxStatusUpdatedSubscriptionResponse;
  FundingTxsGetResponse: FundingTxsGetResponse;
  FundinginvoiceCancel: FundinginvoiceCancel;
  GenerateAffiliatePaymentRequestResponse: GenerateAffiliatePaymentRequestResponse;
  GenerateAffiliatePaymentRequestsInput: GenerateAffiliatePaymentRequestsInput;
  GetActivitiesInput: GetActivitiesInput;
  GetActivityOrderByInput: GetActivityOrderByInput;
  GetActivityPaginationInput: GetActivityPaginationInput;
  GetActivityWhereInput: GetActivityWhereInput;
  GetAffiliateLinksInput: GetAffiliateLinksInput;
  GetAffiliateLinksWhereInput: GetAffiliateLinksWhereInput;
  GetContributorInput: GetContributorInput;
  GetDashboardFundersWhereInput: GetDashboardFundersWhereInput;
  GetEntriesInput: GetEntriesInput;
  GetEntriesOrderByInput: GetEntriesOrderByInput;
  GetEntriesWhereInput: GetEntriesWhereInput;
  GetFunderFundingTxsInput: GetFunderFundingTxsInput;
  GetFunderFundingTxsWhereInput: GetFunderFundingTxsWhereInput;
  GetFunderWhereInput: GetFunderWhereInput;
  GetFundersInput: GetFundersInput;
  GetFundersOrderByInput: GetFundersOrderByInput;
  GetFundingTxsInput: GetFundingTxsInput;
  GetFundingTxsOrderByInput: GetFundingTxsOrderByInput;
  GetFundingTxsWhereInput: GetFundingTxsWhereInput;
  GetProjectGoalsInput: GetProjectGoalsInput;
  GetProjectOrdersStatsInput: GetProjectOrdersStatsInput;
  GetProjectOrdersStatsWhereInput: GetProjectOrdersStatsWhereInput;
  GetProjectRewardInput: GetProjectRewardInput;
  GetProjectRewardWhereInput: GetProjectRewardWhereInput;
  GetProjectStatsInput: GetProjectStatsInput;
  GetProjectStatsWhereInput: GetProjectStatsWhereInput;
  GlobalContributorLeaderboardRow: GlobalContributorLeaderboardRow;
  GlobalProjectLeaderboardRow: GlobalProjectLeaderboardRow;
  Grant: ResolversUnionTypes<ResolversParentTypes>['Grant'];
  GrantApplicant: Omit<GrantApplicant, 'grant'> & { grant: ResolversParentTypes['Grant'] };
  GrantApplicantContributor: GrantApplicantContributor;
  GrantApplicantContributorInput: GrantApplicantContributorInput;
  GrantApplicantContributorWhereInput: GrantApplicantContributorWhereInput;
  GrantApplicantFunding: GrantApplicantFunding;
  GrantApplicantsGetInput: GrantApplicantsGetInput;
  GrantApplicantsGetOrderByInput: GrantApplicantsGetOrderByInput;
  GrantApplicantsGetWhereInput: GrantApplicantsGetWhereInput;
  GrantApplyInput: GrantApplyInput;
  GrantBoardMember: GrantBoardMember;
  GrantGetInput: GrantGetInput;
  GrantGetWhereInput: GrantGetWhereInput;
  GrantStatistics: GrantStatistics;
  GrantStatisticsApplicant: GrantStatisticsApplicant;
  GrantStatisticsGrant: GrantStatisticsGrant;
  GrantStatus: GrantStatus;
  GraphSumData: ResolversInterfaceTypes<ResolversParentTypes>['GraphSumData'];
  Int: Scalars['Int']['output'];
  LeaderboardGlobalContributorsGetInput: LeaderboardGlobalContributorsGetInput;
  LeaderboardGlobalProjectsGetInput: LeaderboardGlobalProjectsGetInput;
  LightningAddressConnectionDetails: LightningAddressConnectionDetails;
  LightningAddressConnectionDetailsCreateInput: LightningAddressConnectionDetailsCreateInput;
  LightningAddressConnectionDetailsUpdateInput: LightningAddressConnectionDetailsUpdateInput;
  LightningAddressContributionLimits: LightningAddressContributionLimits;
  LightningAddressVerifyResponse: LightningAddressVerifyResponse;
  LndConnectionDetails: ResolversInterfaceTypes<ResolversParentTypes>['LndConnectionDetails'];
  LndConnectionDetailsCreateInput: LndConnectionDetailsCreateInput;
  LndConnectionDetailsPrivate: LndConnectionDetailsPrivate;
  LndConnectionDetailsPublic: LndConnectionDetailsPublic;
  LndConnectionDetailsUpdateInput: LndConnectionDetailsUpdateInput;
  Location: Location;
  Milestone: Milestone;
  Mutation: {};
  MutationResponse: ResolversInterfaceTypes<ResolversParentTypes>['MutationResponse'];
  NostrKeys: NostrKeys;
  NostrPrivateKey: NostrPrivateKey;
  NostrPublicKey: NostrPublicKey;
  NotificationConfiguration: NotificationConfiguration;
  NotificationSettings: NotificationSettings;
  OTPInput: OtpInput;
  OTPLoginInput: OtpLoginInput;
  OTPResponse: OtpResponse;
  OffsetBasedPaginationInput: OffsetBasedPaginationInput;
  OnChainTxInput: OnChainTxInput;
  Order: Order;
  OrderBitcoinQuoteInput: OrderBitcoinQuoteInput;
  OrderFundingInput: OrderFundingInput;
  OrderItem: OrderItem;
  OrderItemInput: OrderItemInput;
  OrderStatusUpdateInput: OrderStatusUpdateInput;
  OrdersGetInput: OrdersGetInput;
  OrdersGetOrderByInput: OrdersGetOrderByInput;
  OrdersGetResponse: OrdersGetResponse;
  OrdersGetWhereInput: OrdersGetWhereInput;
  OrdersStatsBase: OrdersStatsBase;
  Owner: Owner;
  OwnerOf: OwnerOf;
  PageViewCountGraph: PageViewCountGraph;
  PaginationCursor: PaginationCursor;
  PaginationInput: PaginationInput;
  ProfileNotificationSettings: ProfileNotificationSettings;
  Project: Project;
  ProjectActivatedSubscriptionResponse: ProjectActivatedSubscriptionResponse;
  ProjectActivitiesCount: ProjectActivitiesCount;
  ProjectContributionsGroupedByMethodStats: ProjectContributionsGroupedByMethodStats;
  ProjectContributionsStats: ProjectContributionsStats;
  ProjectContributionsStatsBase: ProjectContributionsStatsBase;
  ProjectCountriesGetResult: ProjectCountriesGetResult;
  ProjectDeleteResponse: ProjectDeleteResponse;
  ProjectEntriesGetInput: ProjectEntriesGetInput;
  ProjectEntriesGetWhereInput: ProjectEntriesGetWhereInput;
  ProjectFollowMutationInput: ProjectFollowMutationInput;
  ProjectFollowerStats: ProjectFollowerStats;
  ProjectFunderRewardStats: ProjectFunderRewardStats;
  ProjectFunderStats: ProjectFunderStats;
  ProjectFundingTxStats: ProjectFundingTxStats;
  ProjectGoal: ProjectGoal;
  ProjectGoalCreateInput: ProjectGoalCreateInput;
  ProjectGoalDeleteResponse: ProjectGoalDeleteResponse;
  ProjectGoalOrderingUpdateInput: ProjectGoalOrderingUpdateInput;
  ProjectGoalUpdateInput: ProjectGoalUpdateInput;
  ProjectGoals: ProjectGoals;
  ProjectGrantApplicationsInput: ProjectGrantApplicationsInput;
  ProjectGrantApplicationsWhereInput: ProjectGrantApplicationsWhereInput;
  ProjectKeys: ProjectKeys;
  ProjectLeaderboardContributorsGetInput: ProjectLeaderboardContributorsGetInput;
  ProjectLeaderboardContributorsRow: ProjectLeaderboardContributorsRow;
  ProjectLinkMutationInput: ProjectLinkMutationInput;
  ProjectMostFunded: ProjectMostFunded;
  ProjectMostFundedByTag: ProjectMostFundedByTag;
  ProjectPublishMutationInput: ProjectPublishMutationInput;
  ProjectRegionsGetResult: ProjectRegionsGetResult;
  ProjectReward: ProjectReward;
  ProjectRewardCurrencyUpdate: ProjectRewardCurrencyUpdate;
  ProjectRewardCurrencyUpdateRewardsInput: ProjectRewardCurrencyUpdateRewardsInput;
  ProjectRewardsGroupedByRewardIdStats: ProjectRewardsGroupedByRewardIdStats;
  ProjectRewardsStats: ProjectRewardsStats;
  ProjectStatistics: ProjectStatistics;
  ProjectStats: ProjectStats;
  ProjectStatsBase: ProjectStatsBase;
  ProjectStatusUpdate: ProjectStatusUpdate;
  ProjectTagMutationInput: ProjectTagMutationInput;
  ProjectViewBaseStats: ProjectViewBaseStats;
  ProjectViewStats: ProjectViewStats;
  ProjectsGetQueryInput: ProjectsGetQueryInput;
  ProjectsGetWhereInput: ProjectsGetWhereInput;
  ProjectsMostFundedByTagInput: ProjectsMostFundedByTagInput;
  ProjectsOrderByInput: ProjectsOrderByInput;
  ProjectsResponse: ProjectsResponse;
  ProjectsSummary: ProjectsSummary;
  Query: {};
  ResourceInput: ResourceInput;
  SendOtpByEmailInput: SendOtpByEmailInput;
  SignedUploadUrl: SignedUploadUrl;
  SourceResource: ResolversUnionTypes<ResolversParentTypes>['SourceResource'];
  Sponsor: Sponsor;
  StatsInterface: ResolversInterfaceTypes<ResolversParentTypes>['StatsInterface'];
  String: Scalars['String']['output'];
  Subscription: {};
  Swap: Swap;
  TOTPInput: TotpInput;
  Tag: Tag;
  TagCreateInput: TagCreateInput;
  TagsGetResult: TagsGetResult;
  TagsMostFundedGetResult: TagsMostFundedGetResult;
  TwoFAInput: TwoFaInput;
  UniqueOrderInput: UniqueOrderInput;
  UniqueProjectQueryInput: UniqueProjectQueryInput;
  UpdateEntryInput: UpdateEntryInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateProjectRewardInput: UpdateProjectRewardInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWalletInput: UpdateWalletInput;
  UpdateWalletStateInput: UpdateWalletStateInput;
  User: User;
  UserBadge: UserBadge;
  UserEmailUpdateInput: UserEmailUpdateInput;
  UserEntriesGetInput: UserEntriesGetInput;
  UserEntriesGetWhereInput: UserEntriesGetWhereInput;
  UserGetInput: UserGetInput;
  UserNotificationSettings: UserNotificationSettings;
  UserProjectContribution: UserProjectContribution;
  UserProjectsGetInput: UserProjectsGetInput;
  UserProjectsGetWhereInput: UserProjectsGetWhereInput;
  Wallet: Omit<Wallet, 'connectionDetails'> & { connectionDetails: ResolversParentTypes['ConnectionDetails'] };
  WalletContributionLimits: WalletContributionLimits;
  WalletLimits: WalletLimits;
  WalletOffChainContributionLimits: WalletOffChainContributionLimits;
  WalletOnChainContributionLimits: WalletOnChainContributionLimits;
  WalletResourceInput: WalletResourceInput;
  WalletState: WalletState;
  dashboardFundersGetInput: DashboardFundersGetInput;
};

export type ActivitiesGetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActivitiesGetResponse'] = ResolversParentTypes['ActivitiesGetResponse']> = {
  activities?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType>;
  pagination?: Resolver<Maybe<ResolversTypes['CursorPaginationResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']> = {
  activityType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  resource?: Resolver<ResolversTypes['ActivityResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityResourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActivityResource'] = ResolversParentTypes['ActivityResource']> = {
  __resolveType: TypeResolveFn<'Entry' | 'FundingTx' | 'Project' | 'ProjectGoal' | 'ProjectReward', ParentType, ContextType>;
};

export type AffiliateLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['AffiliateLink'] = ResolversParentTypes['AffiliateLink']> = {
  affiliateFeePercentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  affiliateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  disabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  disabledAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lightningAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['AffiliateStats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AffiliatePaymentConfirmResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AffiliatePaymentConfirmResponse'] = ResolversParentTypes['AffiliatePaymentConfirmResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AffiliatePayoutsStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AffiliatePayoutsStats'] = ResolversParentTypes['AffiliatePayoutsStats']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AffiliateSalesStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AffiliateSalesStats'] = ResolversParentTypes['AffiliateSalesStats']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AffiliateStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AffiliateStats'] = ResolversParentTypes['AffiliateStats']> = {
  payouts?: Resolver<ResolversTypes['AffiliatePayoutsStats'], ParentType, ContextType>;
  sales?: Resolver<ResolversTypes['AffiliateSalesStats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AmbassadorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ambassador'] = ResolversParentTypes['Ambassador']> = {
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AmountSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['AmountSummary'] = ResolversParentTypes['AmountSummary']> = {
  donationAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rewardsCost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shippingCost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BadgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Badge'] = ResolversParentTypes['Badge']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uniqueName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BitcoinQuoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['BitcoinQuote'] = ResolversParentTypes['BitcoinQuote']> = {
  quote?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quoteCurrency?: Resolver<ResolversTypes['QuoteCurrency'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardVoteGrantResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoardVoteGrant'] = ResolversParentTypes['BoardVoteGrant']> = {
  applicants?: Resolver<Array<ResolversTypes['GrantApplicant']>, ParentType, ContextType, Partial<BoardVoteGrantApplicantsArgs>>;
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  boardMembers?: Resolver<Array<ResolversTypes['GrantBoardMember']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sponsors?: Resolver<Array<ResolversTypes['Sponsor']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['GrantStatusEnum'], ParentType, ContextType>;
  statuses?: Resolver<Array<ResolversTypes['GrantStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['GrantType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityVoteGrantResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommunityVoteGrant'] = ResolversParentTypes['CommunityVoteGrant']> = {
  applicants?: Resolver<Array<ResolversTypes['GrantApplicant']>, ParentType, ContextType, Partial<CommunityVoteGrantApplicantsArgs>>;
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  distributionSystem?: Resolver<ResolversTypes['DistributionSystem'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sponsors?: Resolver<Array<ResolversTypes['Sponsor']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['GrantStatusEnum'], ParentType, ContextType>;
  statuses?: Resolver<Array<ResolversTypes['GrantStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['GrantType'], ParentType, ContextType>;
  votes?: Resolver<ResolversTypes['CompetitionVoteGrantVoteSummary'], ParentType, ContextType>;
  votingSystem?: Resolver<ResolversTypes['VotingSystem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompetitionVoteGrantVoteSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompetitionVoteGrantVoteSummary'] = ResolversParentTypes['CompetitionVoteGrantVoteSummary']> = {
  voteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  voterCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectionDetails'] = ResolversParentTypes['ConnectionDetails']> = {
  __resolveType: TypeResolveFn<'LightningAddressConnectionDetails' | 'LndConnectionDetailsPrivate' | 'LndConnectionDetailsPublic', ParentType, ContextType>;
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorNotificationSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorNotificationSettings'] = ResolversParentTypes['CreatorNotificationSettings']> = {
  notificationSettings?: Resolver<Array<ResolversTypes['NotificationSettings']>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes['CreatorNotificationSettingsProject'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorNotificationSettingsProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorNotificationSettingsProject'] = ResolversParentTypes['CreatorNotificationSettingsProject']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyQuoteGetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrencyQuoteGetResponse'] = ResolversParentTypes['CurrencyQuoteGetResponse']> = {
  baseCurrency?: Resolver<ResolversTypes['BaseCurrency'], ParentType, ContextType>;
  quote?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quoteCurrency?: Resolver<ResolversTypes['QuoteCurrency'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CursorPaginationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CursorPaginationResponse'] = ResolversParentTypes['CursorPaginationResponse']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['PaginationCursor']>, ParentType, ContextType>;
  take?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DatetimeRangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DatetimeRange'] = ResolversParentTypes['DatetimeRange']> = {
  endDateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  startDateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserResponse'] = ResolversParentTypes['DeleteUserResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = {
  amountFunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fundersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fundingTxs?: Resolver<Array<ResolversTypes['FundingTx']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntryStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EntryType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntryPublishedSubscriptionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EntryPublishedSubscriptionResponse'] = ResolversParentTypes['EntryPublishedSubscriptionResponse']> = {
  entry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalAccount'] = ResolversParentTypes['ExternalAccount']> = {
  accountType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externalUsername?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FunderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Funder'] = ResolversParentTypes['Funder']> = {
  amountFunded?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  confirmedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  fundingTxs?: Resolver<Array<ResolversTypes['FundingTx']>, ParentType, ContextType, Partial<FunderFundingTxsArgs>>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timesFunded?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FunderRewardGraphSumResolvers<ContextType = any, ParentType extends ResolversParentTypes['FunderRewardGraphSum'] = ResolversParentTypes['FunderRewardGraphSum']> = {
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  rewardId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rewardName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingCancelResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingCancelResponse'] = ResolversParentTypes['FundingCancelResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingConfirmResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingConfirmResponse'] = ResolversParentTypes['FundingConfirmResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  missedSettleEvents?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingMutationResponse'] = ResolversParentTypes['FundingMutationResponse']> = {
  fundingTx?: Resolver<Maybe<ResolversTypes['FundingTx']>, ParentType, ContextType>;
  swap?: Resolver<Maybe<ResolversTypes['Swap']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingPendingResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingPendingResponse'] = ResolversParentTypes['FundingPendingResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingQueryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingQueryResponse'] = ResolversParentTypes['FundingQueryResponse']> = {
  fundingTx?: Resolver<Maybe<ResolversTypes['FundingTx']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingTxResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingTx'] = ResolversParentTypes['FundingTx']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  affiliateFeeInSats?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amountPaid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bitcoinQuote?: Resolver<Maybe<ResolversTypes['BitcoinQuote']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creatorEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  donationAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  funder?: Resolver<ResolversTypes['Funder'], ParentType, ContextType>;
  fundingType?: Resolver<ResolversTypes['FundingType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  invoiceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  invoiceStatus?: Resolver<ResolversTypes['InvoiceStatus'], ParentType, ContextType>;
  isAnonymous?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  media?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  method?: Resolver<Maybe<ResolversTypes['FundingMethod']>, ParentType, ContextType>;
  onChain?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  onChainTxId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  paymentRequest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceResource?: Resolver<Maybe<ResolversTypes['SourceResource']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['FundingStatus'], ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingTxAmountGraphResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingTxAmountGraph'] = ResolversParentTypes['FundingTxAmountGraph']> = {
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  sum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingTxInvoiceSanctionCheckStatusResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingTxInvoiceSanctionCheckStatusResponse'] = ResolversParentTypes['FundingTxInvoiceSanctionCheckStatusResponse']> = {
  status?: Resolver<ResolversTypes['FundingTxInvoiceSanctionCheckStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingTxMethodCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingTxMethodCount'] = ResolversParentTypes['FundingTxMethodCount']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingTxMethodSumResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingTxMethodSum'] = ResolversParentTypes['FundingTxMethodSum']> = {
  method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingTxStatusUpdatedSubscriptionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingTxStatusUpdatedSubscriptionResponse'] = ResolversParentTypes['FundingTxStatusUpdatedSubscriptionResponse']> = {
  fundingTx?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingTxsGetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingTxsGetResponse'] = ResolversParentTypes['FundingTxsGetResponse']> = {
  fundingTxs?: Resolver<Array<ResolversTypes['FundingTx']>, ParentType, ContextType>;
  pagination?: Resolver<Maybe<ResolversTypes['CursorPaginationResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundinginvoiceCancelResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundinginvoiceCancel'] = ResolversParentTypes['FundinginvoiceCancel']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateAffiliatePaymentRequestResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenerateAffiliatePaymentRequestResponse'] = ResolversParentTypes['GenerateAffiliatePaymentRequestResponse']> = {
  affiliatePaymentId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  paymentRequest?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalContributorLeaderboardRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalContributorLeaderboardRow'] = ResolversParentTypes['GlobalContributorLeaderboardRow']> = {
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projectsContributedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  userImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalProjectLeaderboardRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalProjectLeaderboardRow'] = ResolversParentTypes['GlobalProjectLeaderboardRow']> = {
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  contributorsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  projectName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectThumbnailUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GrantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Grant'] = ResolversParentTypes['Grant']> = {
  __resolveType: TypeResolveFn<'BoardVoteGrant' | 'CommunityVoteGrant', ParentType, ContextType>;
};

export type GrantApplicantResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrantApplicant'] = ResolversParentTypes['GrantApplicant']> = {
  contributors?: Resolver<Array<ResolversTypes['GrantApplicantContributor']>, ParentType, ContextType, Partial<GrantApplicantContributorsArgs>>;
  contributorsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  funding?: Resolver<ResolversTypes['GrantApplicantFunding'], ParentType, ContextType>;
  grant?: Resolver<ResolversTypes['Grant'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['GrantApplicantStatus'], ParentType, ContextType>;
  voteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GrantApplicantContributorResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrantApplicantContributor'] = ResolversParentTypes['GrantApplicantContributor']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timesContributed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  voteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GrantApplicantFundingResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrantApplicantFunding'] = ResolversParentTypes['GrantApplicantFunding']> = {
  communityFunding?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  grantAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  grantAmountDistributed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GrantBoardMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrantBoardMember'] = ResolversParentTypes['GrantBoardMember']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GrantStatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrantStatistics'] = ResolversParentTypes['GrantStatistics']> = {
  applicants?: Resolver<Maybe<ResolversTypes['GrantStatisticsApplicant']>, ParentType, ContextType>;
  grants?: Resolver<Maybe<ResolversTypes['GrantStatisticsGrant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GrantStatisticsApplicantResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrantStatisticsApplicant'] = ResolversParentTypes['GrantStatisticsApplicant']> = {
  countFunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GrantStatisticsGrantResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrantStatisticsGrant'] = ResolversParentTypes['GrantStatisticsGrant']> = {
  amountFunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amountGranted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GrantStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrantStatus'] = ResolversParentTypes['GrantStatus']> = {
  endAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  startAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['GrantStatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphSumDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphSumData'] = ResolversParentTypes['GraphSumData']> = {
  __resolveType: TypeResolveFn<'FunderRewardGraphSum' | 'FundingTxAmountGraph', ParentType, ContextType>;
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  sum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type LightningAddressConnectionDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LightningAddressConnectionDetails'] = ResolversParentTypes['LightningAddressConnectionDetails']> = {
  lightningAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LightningAddressContributionLimitsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LightningAddressContributionLimits'] = ResolversParentTypes['LightningAddressContributionLimits']> = {
  max?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LightningAddressVerifyResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LightningAddressVerifyResponse'] = ResolversParentTypes['LightningAddressVerifyResponse']> = {
  limits?: Resolver<Maybe<ResolversTypes['LightningAddressContributionLimits']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  valid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LndConnectionDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LndConnectionDetails'] = ResolversParentTypes['LndConnectionDetails']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  grpcPort?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hostname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lndNodeType?: Resolver<ResolversTypes['LndNodeType'], ParentType, ContextType>;
  macaroon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tlsCertificate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type LndConnectionDetailsPrivateResolvers<ContextType = any, ParentType extends ResolversParentTypes['LndConnectionDetailsPrivate'] = ResolversParentTypes['LndConnectionDetailsPrivate']> = {
  grpcPort?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hostname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lndNodeType?: Resolver<ResolversTypes['LndNodeType'], ParentType, ContextType>;
  macaroon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pubkey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tlsCertificate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LndConnectionDetailsPublicResolvers<ContextType = any, ParentType extends ResolversParentTypes['LndConnectionDetailsPublic'] = ResolversParentTypes['LndConnectionDetailsPublic']> = {
  pubkey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MilestoneResolvers<ContextType = any, ParentType extends ResolversParentTypes['Milestone'] = ResolversParentTypes['Milestone']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reached?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  affiliateLinkCreate?: Resolver<ResolversTypes['AffiliateLink'], ParentType, ContextType, RequireFields<MutationAffiliateLinkCreateArgs, 'input'>>;
  affiliateLinkDisable?: Resolver<ResolversTypes['AffiliateLink'], ParentType, ContextType, RequireFields<MutationAffiliateLinkDisableArgs, 'affiliateLinkId'>>;
  affiliateLinkLabelUpdate?: Resolver<ResolversTypes['AffiliateLink'], ParentType, ContextType, RequireFields<MutationAffiliateLinkLabelUpdateArgs, 'affiliateLinkId' | 'label'>>;
  affiliatePaymentConfirm?: Resolver<ResolversTypes['AffiliatePaymentConfirmResponse'], ParentType, ContextType, RequireFields<MutationAffiliatePaymentConfirmArgs, 'affiliatePaymentId'>>;
  affiliatePaymentRequestGenerate?: Resolver<ResolversTypes['GenerateAffiliatePaymentRequestResponse'], ParentType, ContextType, RequireFields<MutationAffiliatePaymentRequestGenerateArgs, 'input'>>;
  claimBadge?: Resolver<ResolversTypes['UserBadge'], ParentType, ContextType, RequireFields<MutationClaimBadgeArgs, 'input'>>;
  createEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationCreateEntryArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  creatorNotificationConfigurationValueUpdate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreatorNotificationConfigurationValueUpdateArgs, 'creatorNotificationConfigurationId' | 'value'>>;
  deleteEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationDeleteEntryArgs, 'id'>>;
  fund?: Resolver<ResolversTypes['FundingMutationResponse'], ParentType, ContextType, RequireFields<MutationFundArgs, 'input'>>;
  fundingCancel?: Resolver<ResolversTypes['FundingCancelResponse'], ParentType, ContextType, RequireFields<MutationFundingCancelArgs, 'input'>>;
  fundingClaimAnonymous?: Resolver<ResolversTypes['FundingMutationResponse'], ParentType, ContextType, RequireFields<MutationFundingClaimAnonymousArgs, 'uuid'>>;
  fundingConfirm?: Resolver<ResolversTypes['FundingConfirmResponse'], ParentType, ContextType, RequireFields<MutationFundingConfirmArgs, 'input'>>;
  fundingCreateFromPodcastKeysend?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType, Partial<MutationFundingCreateFromPodcastKeysendArgs>>;
  fundingInvoiceCancel?: Resolver<ResolversTypes['FundinginvoiceCancel'], ParentType, ContextType, RequireFields<MutationFundingInvoiceCancelArgs, 'invoiceId'>>;
  fundingInvoiceRefresh?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType, RequireFields<MutationFundingInvoiceRefreshArgs, 'fundingTxId'>>;
  fundingPend?: Resolver<ResolversTypes['FundingPendingResponse'], ParentType, ContextType, RequireFields<MutationFundingPendArgs, 'input'>>;
  fundingTxEmailUpdate?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType, Partial<MutationFundingTxEmailUpdateArgs>>;
  grantApply?: Resolver<ResolversTypes['GrantApplicant'], ParentType, ContextType, Partial<MutationGrantApplyArgs>>;
  orderStatusUpdate?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationOrderStatusUpdateArgs, 'input'>>;
  projectDelete?: Resolver<ResolversTypes['ProjectDeleteResponse'], ParentType, ContextType, RequireFields<MutationProjectDeleteArgs, 'input'>>;
  projectFollow?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationProjectFollowArgs, 'input'>>;
  projectGoalCreate?: Resolver<Array<ResolversTypes['ProjectGoal']>, ParentType, ContextType, RequireFields<MutationProjectGoalCreateArgs, 'input'>>;
  projectGoalDelete?: Resolver<ResolversTypes['ProjectGoalDeleteResponse'], ParentType, ContextType, RequireFields<MutationProjectGoalDeleteArgs, 'projectGoalId'>>;
  projectGoalOrderingUpdate?: Resolver<Array<ResolversTypes['ProjectGoal']>, ParentType, ContextType, RequireFields<MutationProjectGoalOrderingUpdateArgs, 'input'>>;
  projectGoalUpdate?: Resolver<ResolversTypes['ProjectGoal'], ParentType, ContextType, RequireFields<MutationProjectGoalUpdateArgs, 'input'>>;
  projectPublish?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationProjectPublishArgs, 'input'>>;
  projectRewardCreate?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType, RequireFields<MutationProjectRewardCreateArgs, 'input'>>;
  projectRewardCurrencyUpdate?: Resolver<Array<ResolversTypes['ProjectReward']>, ParentType, ContextType, RequireFields<MutationProjectRewardCurrencyUpdateArgs, 'input'>>;
  projectRewardDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationProjectRewardDeleteArgs, 'input'>>;
  projectRewardUpdate?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType, RequireFields<MutationProjectRewardUpdateArgs, 'input'>>;
  projectStatusUpdate?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationProjectStatusUpdateArgs, 'input'>>;
  projectTagAdd?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationProjectTagAddArgs, 'input'>>;
  projectTagRemove?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationProjectTagRemoveArgs, 'input'>>;
  projectUnfollow?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationProjectUnfollowArgs, 'input'>>;
  publishEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationPublishEntryArgs, 'id'>>;
  sendOTPByEmail?: Resolver<ResolversTypes['OTPResponse'], ParentType, ContextType, RequireFields<MutationSendOtpByEmailArgs, 'input'>>;
  tagCreate?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationTagCreateArgs, 'input'>>;
  unlinkExternalAccount?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUnlinkExternalAccountArgs, 'id'>>;
  updateEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationUpdateEntryArgs, 'input'>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  updateWalletState?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<MutationUpdateWalletStateArgs, 'input'>>;
  userBadgeAward?: Resolver<ResolversTypes['UserBadge'], ParentType, ContextType, RequireFields<MutationUserBadgeAwardArgs, 'userBadgeId'>>;
  userDelete?: Resolver<ResolversTypes['DeleteUserResponse'], ParentType, ContextType>;
  userEmailUpdate?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUserEmailUpdateArgs, 'input'>>;
  userEmailVerify?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUserEmailVerifyArgs, 'input'>>;
  userNotificationConfigurationValueUpdate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUserNotificationConfigurationValueUpdateArgs, 'userNotificationConfigurationId' | 'value'>>;
  walletCreate?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<MutationWalletCreateArgs, 'input'>>;
  walletDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationWalletDeleteArgs, 'id'>>;
  walletUpdate?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<MutationWalletUpdateArgs, 'input'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'DeleteUserResponse' | 'ProjectDeleteResponse' | 'ProjectGoalDeleteResponse', ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type NostrKeysResolvers<ContextType = any, ParentType extends ResolversParentTypes['NostrKeys'] = ResolversParentTypes['NostrKeys']> = {
  privateKey?: Resolver<Maybe<ResolversTypes['NostrPrivateKey']>, ParentType, ContextType>;
  publicKey?: Resolver<ResolversTypes['NostrPublicKey'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NostrPrivateKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['NostrPrivateKey'] = ResolversParentTypes['NostrPrivateKey']> = {
  hex?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nsec?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NostrPublicKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['NostrPublicKey'] = ResolversParentTypes['NostrPublicKey']> = {
  hex?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  npub?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationConfiguration'] = ResolversParentTypes['NotificationConfiguration']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['SettingValueType']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationSettings'] = ResolversParentTypes['NotificationSettings']> = {
  channel?: Resolver<Maybe<ResolversTypes['NotificationChannel']>, ParentType, ContextType>;
  configurations?: Resolver<Array<ResolversTypes['NotificationConfiguration']>, ParentType, ContextType>;
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  notificationType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OtpResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OTPResponse'] = ResolversParentTypes['OTPResponse']> = {
  expiresAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  otpVerificationToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  confirmedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deliveredAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  fundingTx?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  referenceCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalInSats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
  item?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unitPriceInSats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrdersGetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrdersGetResponse'] = ResolversParentTypes['OrdersGetResponse']> = {
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  pagination?: Resolver<Maybe<ResolversTypes['CursorPaginationResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrdersStatsBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrdersStatsBase'] = ResolversParentTypes['OrdersStatsBase']> = {
  projectRewards?: Resolver<ResolversTypes['ProjectRewardsStats'], ParentType, ContextType>;
  projectRewardsGroupedByProjectRewardId?: Resolver<Array<ResolversTypes['ProjectRewardsGroupedByRewardIdStats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerOfResolvers<ContextType = any, ParentType extends ResolversParentTypes['OwnerOf'] = ResolversParentTypes['OwnerOf']> = {
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageViewCountGraphResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageViewCountGraph'] = ResolversParentTypes['PageViewCountGraph']> = {
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visitorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationCursorResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginationCursor'] = ResolversParentTypes['PaginationCursor']> = {
  id?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileNotificationSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileNotificationSettings'] = ResolversParentTypes['ProfileNotificationSettings']> = {
  creatorSettings?: Resolver<Array<ResolversTypes['CreatorNotificationSettings']>, ParentType, ContextType>;
  userSettings?: Resolver<ResolversTypes['UserNotificationSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  ambassadors?: Resolver<Array<ResolversTypes['Ambassador']>, ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  balanceUsdCent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  canDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultGoalId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, Partial<ProjectEntriesArgs>>;
  entriesCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  followers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  followersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  funders?: Resolver<Array<ResolversTypes['Funder']>, ParentType, ContextType>;
  fundersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fundingTxs?: Resolver<Array<ResolversTypes['FundingTx']>, ParentType, ContextType>;
  fundingTxsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  goalsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  grantApplications?: Resolver<Array<ResolversTypes['GrantApplicant']>, ParentType, ContextType, Partial<ProjectGrantApplicationsArgs>>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keys?: Resolver<ResolversTypes['ProjectKeys'], ParentType, ContextType>;
  links?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  milestones?: Resolver<Array<ResolversTypes['Milestone']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owners?: Resolver<Array<ResolversTypes['Owner']>, ParentType, ContextType>;
  rewardCurrency?: Resolver<Maybe<ResolversTypes['RewardCurrency']>, ParentType, ContextType>;
  rewards?: Resolver<Array<ResolversTypes['ProjectReward']>, ParentType, ContextType>;
  rewardsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shortDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sponsors?: Resolver<Array<ResolversTypes['Sponsor']>, ParentType, ContextType>;
  statistics?: Resolver<Maybe<ResolversTypes['ProjectStatistics']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ProjectStatus']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  thumbnailImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ProjectType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wallets?: Resolver<Array<ResolversTypes['Wallet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectActivatedSubscriptionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectActivatedSubscriptionResponse'] = ResolversParentTypes['ProjectActivatedSubscriptionResponse']> = {
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectActivitiesCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectActivitiesCount'] = ResolversParentTypes['ProjectActivitiesCount']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectContributionsGroupedByMethodStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectContributionsGroupedByMethodStats'] = ResolversParentTypes['ProjectContributionsGroupedByMethodStats']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  method?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectContributionsStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectContributionsStats'] = ResolversParentTypes['ProjectContributionsStats']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectContributionsStatsBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectContributionsStatsBase'] = ResolversParentTypes['ProjectContributionsStatsBase']> = {
  contributions?: Resolver<ResolversTypes['ProjectContributionsStats'], ParentType, ContextType>;
  contributionsGroupedByMethod?: Resolver<Array<ResolversTypes['ProjectContributionsGroupedByMethodStats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectCountriesGetResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectCountriesGetResult'] = ResolversParentTypes['ProjectCountriesGetResult']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectDeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectDeleteResponse'] = ResolversParentTypes['ProjectDeleteResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectFollowerStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectFollowerStats'] = ResolversParentTypes['ProjectFollowerStats']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectFunderRewardStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectFunderRewardStats'] = ResolversParentTypes['ProjectFunderRewardStats']> = {
  quantityGraph?: Resolver<Maybe<Array<Maybe<ResolversTypes['FunderRewardGraphSum']>>>, ParentType, ContextType>;
  quantitySum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectFunderStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectFunderStats'] = ResolversParentTypes['ProjectFunderStats']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectFundingTxStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectFundingTxStats'] = ResolversParentTypes['ProjectFundingTxStats']> = {
  amountGraph?: Resolver<Maybe<Array<Maybe<ResolversTypes['FundingTxAmountGraph']>>>, ParentType, ContextType>;
  amountSum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountSumUsd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  methodCount?: Resolver<Maybe<Array<Maybe<ResolversTypes['FundingTxMethodCount']>>>, ParentType, ContextType>;
  methodSum?: Resolver<Maybe<Array<Maybe<ResolversTypes['FundingTxMethodSum']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectGoal'] = ResolversParentTypes['ProjectGoal']> = {
  amountContributed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['ProjectGoalCurrency'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emojiUnifiedCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasReceivedContribution?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ProjectGoalStatus'], ParentType, ContextType>;
  targetAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectGoalDeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectGoalDeleteResponse'] = ResolversParentTypes['ProjectGoalDeleteResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectGoalsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectGoals'] = ResolversParentTypes['ProjectGoals']> = {
  completed?: Resolver<Array<ResolversTypes['ProjectGoal']>, ParentType, ContextType>;
  inProgress?: Resolver<Array<ResolversTypes['ProjectGoal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectKeysResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectKeys'] = ResolversParentTypes['ProjectKeys']> = {
  nostrKeys?: Resolver<ResolversTypes['NostrKeys'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectLeaderboardContributorsRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectLeaderboardContributorsRow'] = ResolversParentTypes['ProjectLeaderboardContributorsRow']> = {
  commentsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  funderId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMostFundedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectMostFunded'] = ResolversParentTypes['ProjectMostFunded']> = {
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMostFundedByTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectMostFundedByTag'] = ResolversParentTypes['ProjectMostFundedByTag']> = {
  projects?: Resolver<Array<ResolversTypes['ProjectMostFunded']>, ParentType, ContextType>;
  tagId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRegionsGetResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectRegionsGetResult'] = ResolversParentTypes['ProjectRegionsGetResult']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  region?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectReward'] = ResolversParentTypes['ProjectReward']> = {
  backersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedAvailabilityDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  estimatedDeliveryDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  estimatedDeliveryInWeeks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hasShipping?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAddon?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  maxClaimable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preOrder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  rewardCurrency?: Resolver<ResolversTypes['RewardCurrency'], ParentType, ContextType>;
  rewardType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardsGroupedByRewardIdStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectRewardsGroupedByRewardIdStats'] = ResolversParentTypes['ProjectRewardsGroupedByRewardIdStats']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  projectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardsStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectRewardsStats'] = ResolversParentTypes['ProjectRewardsStats']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectStatistics'] = ResolversParentTypes['ProjectStatistics']> = {
  totalPageviews?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalVisitors?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectStats'] = ResolversParentTypes['ProjectStats']> = {
  current?: Resolver<Maybe<ResolversTypes['ProjectStatsBase']>, ParentType, ContextType>;
  datetimeRange?: Resolver<ResolversTypes['DatetimeRange'], ParentType, ContextType>;
  prevTimeRange?: Resolver<Maybe<ResolversTypes['ProjectStatsBase']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStatsBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectStatsBase'] = ResolversParentTypes['ProjectStatsBase']> = {
  projectContributionsStats?: Resolver<Maybe<ResolversTypes['ProjectContributionsStatsBase']>, ParentType, ContextType>;
  projectFollowers?: Resolver<Maybe<ResolversTypes['ProjectFollowerStats']>, ParentType, ContextType>;
  projectFunderRewards?: Resolver<Maybe<ResolversTypes['ProjectFunderRewardStats']>, ParentType, ContextType>;
  projectFunders?: Resolver<Maybe<ResolversTypes['ProjectFunderStats']>, ParentType, ContextType>;
  projectFundingTxs?: Resolver<Maybe<ResolversTypes['ProjectFundingTxStats']>, ParentType, ContextType>;
  projectViews?: Resolver<Maybe<ResolversTypes['ProjectViewStats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectViewBaseStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectViewBaseStats'] = ResolversParentTypes['ProjectViewBaseStats']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visitorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectViewStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectViewStats'] = ResolversParentTypes['ProjectViewStats']> = {
  countries?: Resolver<Array<ResolversTypes['ProjectViewBaseStats']>, ParentType, ContextType>;
  referrers?: Resolver<Array<ResolversTypes['ProjectViewBaseStats']>, ParentType, ContextType>;
  regions?: Resolver<Array<ResolversTypes['ProjectViewBaseStats']>, ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visitorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visitorGraph?: Resolver<Array<Maybe<ResolversTypes['PageViewCountGraph']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectsResponse'] = ResolversParentTypes['ProjectsResponse']> = {
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['ProjectsSummary']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectsSummary'] = ResolversParentTypes['ProjectsSummary']> = {
  fundedTotal?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  fundersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  projectsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  activitiesCountGroupedByProject?: Resolver<Array<ResolversTypes['ProjectActivitiesCount']>, ParentType, ContextType, RequireFields<QueryActivitiesCountGroupedByProjectArgs, 'input'>>;
  activitiesGet?: Resolver<ResolversTypes['ActivitiesGetResponse'], ParentType, ContextType, Partial<QueryActivitiesGetArgs>>;
  affiliateLinksGet?: Resolver<Array<ResolversTypes['AffiliateLink']>, ParentType, ContextType, RequireFields<QueryAffiliateLinksGetArgs, 'input'>>;
  badges?: Resolver<Array<ResolversTypes['Badge']>, ParentType, ContextType>;
  contributor?: Resolver<ResolversTypes['Funder'], ParentType, ContextType, RequireFields<QueryContributorArgs, 'input'>>;
  currencyQuoteGet?: Resolver<ResolversTypes['CurrencyQuoteGetResponse'], ParentType, ContextType, RequireFields<QueryCurrencyQuoteGetArgs, 'input'>>;
  entry?: Resolver<Maybe<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryEntryArgs, 'id'>>;
  fundersGet?: Resolver<Array<ResolversTypes['Funder']>, ParentType, ContextType, RequireFields<QueryFundersGetArgs, 'input'>>;
  fundingTx?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType, Partial<QueryFundingTxArgs>>;
  fundingTxInvoiceSanctionCheckStatusGet?: Resolver<ResolversTypes['FundingTxInvoiceSanctionCheckStatusResponse'], ParentType, ContextType, RequireFields<QueryFundingTxInvoiceSanctionCheckStatusGetArgs, 'input'>>;
  fundingTxsGet?: Resolver<Maybe<ResolversTypes['FundingTxsGetResponse']>, ParentType, ContextType, Partial<QueryFundingTxsGetArgs>>;
  getDashboardFunders?: Resolver<Array<ResolversTypes['Funder']>, ParentType, ContextType, Partial<QueryGetDashboardFundersArgs>>;
  getEntries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, Partial<QueryGetEntriesArgs>>;
  getProjectPubkey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetProjectPubkeyArgs, 'projectId'>>;
  getProjectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType, RequireFields<QueryGetProjectRewardArgs, 'id'>>;
  getSignedUploadUrl?: Resolver<ResolversTypes['SignedUploadUrl'], ParentType, ContextType, RequireFields<QueryGetSignedUploadUrlArgs, 'input'>>;
  getWallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<QueryGetWalletArgs, 'id'>>;
  grant?: Resolver<ResolversTypes['Grant'], ParentType, ContextType, RequireFields<QueryGrantArgs, 'input'>>;
  grantStatistics?: Resolver<ResolversTypes['GrantStatistics'], ParentType, ContextType>;
  grants?: Resolver<Array<ResolversTypes['Grant']>, ParentType, ContextType>;
  leaderboardGlobalContributorsGet?: Resolver<Array<ResolversTypes['GlobalContributorLeaderboardRow']>, ParentType, ContextType, RequireFields<QueryLeaderboardGlobalContributorsGetArgs, 'input'>>;
  leaderboardGlobalProjectsGet?: Resolver<Array<ResolversTypes['GlobalProjectLeaderboardRow']>, ParentType, ContextType, RequireFields<QueryLeaderboardGlobalProjectsGetArgs, 'input'>>;
  lightningAddressVerify?: Resolver<ResolversTypes['LightningAddressVerifyResponse'], ParentType, ContextType, Partial<QueryLightningAddressVerifyArgs>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  orderGet?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrderGetArgs, 'where'>>;
  ordersGet?: Resolver<Maybe<ResolversTypes['OrdersGetResponse']>, ParentType, ContextType, RequireFields<QueryOrdersGetArgs, 'input'>>;
  ordersStatsGet?: Resolver<ResolversTypes['OrdersStatsBase'], ParentType, ContextType, RequireFields<QueryOrdersStatsGetArgs, 'input'>>;
  projectCountriesGet?: Resolver<Array<ResolversTypes['ProjectCountriesGetResult']>, ParentType, ContextType>;
  projectGet?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectGetArgs, 'where'>>;
  projectGoals?: Resolver<ResolversTypes['ProjectGoals'], ParentType, ContextType, RequireFields<QueryProjectGoalsArgs, 'input'>>;
  projectLeaderboardContributorsGet?: Resolver<Array<ResolversTypes['ProjectLeaderboardContributorsRow']>, ParentType, ContextType, RequireFields<QueryProjectLeaderboardContributorsGetArgs, 'input'>>;
  projectNotificationSettingsGet?: Resolver<ResolversTypes['CreatorNotificationSettings'], ParentType, ContextType, RequireFields<QueryProjectNotificationSettingsGetArgs, 'projectId'>>;
  projectRegionsGet?: Resolver<Array<ResolversTypes['ProjectRegionsGetResult']>, ParentType, ContextType>;
  projectRewardCategoriesGet?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  projectRewardsGet?: Resolver<Array<ResolversTypes['ProjectReward']>, ParentType, ContextType, RequireFields<QueryProjectRewardsGetArgs, 'input'>>;
  projectRewardsTrendingWeeklyGet?: Resolver<Array<ResolversTypes['ProjectRewardsGroupedByRewardIdStats']>, ParentType, ContextType>;
  projectStatsGet?: Resolver<ResolversTypes['ProjectStats'], ParentType, ContextType, RequireFields<QueryProjectStatsGetArgs, 'input'>>;
  projectsGet?: Resolver<ResolversTypes['ProjectsResponse'], ParentType, ContextType, Partial<QueryProjectsGetArgs>>;
  projectsMostFundedByTag?: Resolver<Array<ResolversTypes['ProjectMostFundedByTag']>, ParentType, ContextType, RequireFields<QueryProjectsMostFundedByTagArgs, 'input'>>;
  projectsSummary?: Resolver<ResolversTypes['ProjectsSummary'], ParentType, ContextType>;
  statusCheck?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tagsGet?: Resolver<Array<ResolversTypes['TagsGetResult']>, ParentType, ContextType>;
  tagsMostFundedGet?: Resolver<Array<ResolversTypes['TagsMostFundedGetResult']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'where'>>;
  userBadge?: Resolver<Maybe<ResolversTypes['UserBadge']>, ParentType, ContextType, RequireFields<QueryUserBadgeArgs, 'userBadgeId'>>;
  userBadges?: Resolver<Array<ResolversTypes['UserBadge']>, ParentType, ContextType, RequireFields<QueryUserBadgesArgs, 'input'>>;
  userNotificationSettingsGet?: Resolver<ResolversTypes['ProfileNotificationSettings'], ParentType, ContextType, RequireFields<QueryUserNotificationSettingsGetArgs, 'userId'>>;
};

export type SignedUploadUrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignedUploadUrl'] = ResolversParentTypes['SignedUploadUrl']> = {
  distributionUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uploadUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SourceResourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['SourceResource'] = ResolversParentTypes['SourceResource']> = {
  __resolveType: TypeResolveFn<'Entry' | 'Project', ParentType, ContextType>;
};

export type SponsorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sponsor'] = ResolversParentTypes['Sponsor']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SponsorStatus'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatsInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatsInterface'] = ResolversParentTypes['StatsInterface']> = {
  __resolveType: TypeResolveFn<'ProjectContributionsGroupedByMethodStats' | 'ProjectContributionsStats', ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "_", ParentType, ContextType>;
  activityCreated?: SubscriptionResolver<ResolversTypes['ActivityResource'], "activityCreated", ParentType, ContextType, Partial<SubscriptionActivityCreatedArgs>>;
  entryPublished?: SubscriptionResolver<ResolversTypes['EntryPublishedSubscriptionResponse'], "entryPublished", ParentType, ContextType>;
  fundingTxStatusUpdated?: SubscriptionResolver<ResolversTypes['FundingTxStatusUpdatedSubscriptionResponse'], "fundingTxStatusUpdated", ParentType, ContextType, Partial<SubscriptionFundingTxStatusUpdatedArgs>>;
  projectActivated?: SubscriptionResolver<ResolversTypes['ProjectActivatedSubscriptionResponse'], "projectActivated", ParentType, ContextType>;
};

export type SwapResolvers<ContextType = any, ParentType extends ResolversParentTypes['Swap'] = ResolversParentTypes['Swap']> = {
  json?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsGetResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagsGetResult'] = ResolversParentTypes['TagsGetResult']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsMostFundedGetResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagsMostFundedGetResult'] = ResolversParentTypes['TagsMostFundedGetResult']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  badges?: Resolver<Array<ResolversTypes['UserBadge']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contributions?: Resolver<Array<ResolversTypes['UserProjectContribution']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailVerifiedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, Partial<UserEntriesArgs>>;
  externalAccounts?: Resolver<Array<ResolversTypes['ExternalAccount']>, ParentType, ContextType>;
  fundingTxs?: Resolver<Array<ResolversTypes['FundingTx']>, ParentType, ContextType>;
  hasSocialAccount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isEmailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>;
  ownerOf?: Resolver<Array<ResolversTypes['OwnerOf']>, ParentType, ContextType>;
  projectFollows?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, Partial<UserProjectsArgs>>;
  ranking?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserBadgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBadge'] = ResolversParentTypes['UserBadge']> = {
  badge?: Resolver<ResolversTypes['Badge'], ParentType, ContextType>;
  badgeAwardEventId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  fundingTxId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['UserBadgeStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserNotificationSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNotificationSettings'] = ResolversParentTypes['UserNotificationSettings']> = {
  notificationSettings?: Resolver<Array<ResolversTypes['NotificationSettings']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProjectContributionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProjectContribution'] = ResolversParentTypes['UserProjectContribution']> = {
  funder?: Resolver<Maybe<ResolversTypes['Funder']>, ParentType, ContextType>;
  isAmbassador?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFunder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSponsor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletResolvers<ContextType = any, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = {
  connectionDetails?: Resolver<ResolversTypes['ConnectionDetails'], ParentType, ContextType>;
  feePercentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  limits?: Resolver<Maybe<ResolversTypes['WalletLimits']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['WalletState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletContributionLimitsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletContributionLimits'] = ResolversParentTypes['WalletContributionLimits']> = {
  max?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  offChain?: Resolver<Maybe<ResolversTypes['WalletOffChainContributionLimits']>, ParentType, ContextType>;
  onChain?: Resolver<Maybe<ResolversTypes['WalletOnChainContributionLimits']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletLimitsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletLimits'] = ResolversParentTypes['WalletLimits']> = {
  contribution?: Resolver<Maybe<ResolversTypes['WalletContributionLimits']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletOffChainContributionLimitsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletOffChainContributionLimits'] = ResolversParentTypes['WalletOffChainContributionLimits']> = {
  max?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletOnChainContributionLimitsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletOnChainContributionLimits'] = ResolversParentTypes['WalletOnChainContributionLimits']> = {
  max?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['WalletState'] = ResolversParentTypes['WalletState']> = {
  status?: Resolver<ResolversTypes['WalletStatus'], ParentType, ContextType>;
  statusCode?: Resolver<ResolversTypes['WalletStatusCode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ActivitiesGetResponse?: ActivitiesGetResponseResolvers<ContextType>;
  Activity?: ActivityResolvers<ContextType>;
  ActivityResource?: ActivityResourceResolvers<ContextType>;
  AffiliateLink?: AffiliateLinkResolvers<ContextType>;
  AffiliatePaymentConfirmResponse?: AffiliatePaymentConfirmResponseResolvers<ContextType>;
  AffiliatePayoutsStats?: AffiliatePayoutsStatsResolvers<ContextType>;
  AffiliateSalesStats?: AffiliateSalesStatsResolvers<ContextType>;
  AffiliateStats?: AffiliateStatsResolvers<ContextType>;
  Ambassador?: AmbassadorResolvers<ContextType>;
  AmountSummary?: AmountSummaryResolvers<ContextType>;
  Badge?: BadgeResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  BitcoinQuote?: BitcoinQuoteResolvers<ContextType>;
  BoardVoteGrant?: BoardVoteGrantResolvers<ContextType>;
  CommunityVoteGrant?: CommunityVoteGrantResolvers<ContextType>;
  CompetitionVoteGrantVoteSummary?: CompetitionVoteGrantVoteSummaryResolvers<ContextType>;
  ConnectionDetails?: ConnectionDetailsResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  CreatorNotificationSettings?: CreatorNotificationSettingsResolvers<ContextType>;
  CreatorNotificationSettingsProject?: CreatorNotificationSettingsProjectResolvers<ContextType>;
  CurrencyQuoteGetResponse?: CurrencyQuoteGetResponseResolvers<ContextType>;
  CursorPaginationResponse?: CursorPaginationResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DatetimeRange?: DatetimeRangeResolvers<ContextType>;
  DeleteUserResponse?: DeleteUserResponseResolvers<ContextType>;
  Entry?: EntryResolvers<ContextType>;
  EntryPublishedSubscriptionResponse?: EntryPublishedSubscriptionResponseResolvers<ContextType>;
  ExternalAccount?: ExternalAccountResolvers<ContextType>;
  Funder?: FunderResolvers<ContextType>;
  FunderRewardGraphSum?: FunderRewardGraphSumResolvers<ContextType>;
  FundingCancelResponse?: FundingCancelResponseResolvers<ContextType>;
  FundingConfirmResponse?: FundingConfirmResponseResolvers<ContextType>;
  FundingMutationResponse?: FundingMutationResponseResolvers<ContextType>;
  FundingPendingResponse?: FundingPendingResponseResolvers<ContextType>;
  FundingQueryResponse?: FundingQueryResponseResolvers<ContextType>;
  FundingTx?: FundingTxResolvers<ContextType>;
  FundingTxAmountGraph?: FundingTxAmountGraphResolvers<ContextType>;
  FundingTxInvoiceSanctionCheckStatusResponse?: FundingTxInvoiceSanctionCheckStatusResponseResolvers<ContextType>;
  FundingTxMethodCount?: FundingTxMethodCountResolvers<ContextType>;
  FundingTxMethodSum?: FundingTxMethodSumResolvers<ContextType>;
  FundingTxStatusUpdatedSubscriptionResponse?: FundingTxStatusUpdatedSubscriptionResponseResolvers<ContextType>;
  FundingTxsGetResponse?: FundingTxsGetResponseResolvers<ContextType>;
  FundinginvoiceCancel?: FundinginvoiceCancelResolvers<ContextType>;
  GenerateAffiliatePaymentRequestResponse?: GenerateAffiliatePaymentRequestResponseResolvers<ContextType>;
  GlobalContributorLeaderboardRow?: GlobalContributorLeaderboardRowResolvers<ContextType>;
  GlobalProjectLeaderboardRow?: GlobalProjectLeaderboardRowResolvers<ContextType>;
  Grant?: GrantResolvers<ContextType>;
  GrantApplicant?: GrantApplicantResolvers<ContextType>;
  GrantApplicantContributor?: GrantApplicantContributorResolvers<ContextType>;
  GrantApplicantFunding?: GrantApplicantFundingResolvers<ContextType>;
  GrantBoardMember?: GrantBoardMemberResolvers<ContextType>;
  GrantStatistics?: GrantStatisticsResolvers<ContextType>;
  GrantStatisticsApplicant?: GrantStatisticsApplicantResolvers<ContextType>;
  GrantStatisticsGrant?: GrantStatisticsGrantResolvers<ContextType>;
  GrantStatus?: GrantStatusResolvers<ContextType>;
  GraphSumData?: GraphSumDataResolvers<ContextType>;
  LightningAddressConnectionDetails?: LightningAddressConnectionDetailsResolvers<ContextType>;
  LightningAddressContributionLimits?: LightningAddressContributionLimitsResolvers<ContextType>;
  LightningAddressVerifyResponse?: LightningAddressVerifyResponseResolvers<ContextType>;
  LndConnectionDetails?: LndConnectionDetailsResolvers<ContextType>;
  LndConnectionDetailsPrivate?: LndConnectionDetailsPrivateResolvers<ContextType>;
  LndConnectionDetailsPublic?: LndConnectionDetailsPublicResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Milestone?: MilestoneResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  NostrKeys?: NostrKeysResolvers<ContextType>;
  NostrPrivateKey?: NostrPrivateKeyResolvers<ContextType>;
  NostrPublicKey?: NostrPublicKeyResolvers<ContextType>;
  NotificationConfiguration?: NotificationConfigurationResolvers<ContextType>;
  NotificationSettings?: NotificationSettingsResolvers<ContextType>;
  OTPResponse?: OtpResponseResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  OrdersGetResponse?: OrdersGetResponseResolvers<ContextType>;
  OrdersStatsBase?: OrdersStatsBaseResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  OwnerOf?: OwnerOfResolvers<ContextType>;
  PageViewCountGraph?: PageViewCountGraphResolvers<ContextType>;
  PaginationCursor?: PaginationCursorResolvers<ContextType>;
  ProfileNotificationSettings?: ProfileNotificationSettingsResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectActivatedSubscriptionResponse?: ProjectActivatedSubscriptionResponseResolvers<ContextType>;
  ProjectActivitiesCount?: ProjectActivitiesCountResolvers<ContextType>;
  ProjectContributionsGroupedByMethodStats?: ProjectContributionsGroupedByMethodStatsResolvers<ContextType>;
  ProjectContributionsStats?: ProjectContributionsStatsResolvers<ContextType>;
  ProjectContributionsStatsBase?: ProjectContributionsStatsBaseResolvers<ContextType>;
  ProjectCountriesGetResult?: ProjectCountriesGetResultResolvers<ContextType>;
  ProjectDeleteResponse?: ProjectDeleteResponseResolvers<ContextType>;
  ProjectFollowerStats?: ProjectFollowerStatsResolvers<ContextType>;
  ProjectFunderRewardStats?: ProjectFunderRewardStatsResolvers<ContextType>;
  ProjectFunderStats?: ProjectFunderStatsResolvers<ContextType>;
  ProjectFundingTxStats?: ProjectFundingTxStatsResolvers<ContextType>;
  ProjectGoal?: ProjectGoalResolvers<ContextType>;
  ProjectGoalDeleteResponse?: ProjectGoalDeleteResponseResolvers<ContextType>;
  ProjectGoals?: ProjectGoalsResolvers<ContextType>;
  ProjectKeys?: ProjectKeysResolvers<ContextType>;
  ProjectLeaderboardContributorsRow?: ProjectLeaderboardContributorsRowResolvers<ContextType>;
  ProjectMostFunded?: ProjectMostFundedResolvers<ContextType>;
  ProjectMostFundedByTag?: ProjectMostFundedByTagResolvers<ContextType>;
  ProjectRegionsGetResult?: ProjectRegionsGetResultResolvers<ContextType>;
  ProjectReward?: ProjectRewardResolvers<ContextType>;
  ProjectRewardsGroupedByRewardIdStats?: ProjectRewardsGroupedByRewardIdStatsResolvers<ContextType>;
  ProjectRewardsStats?: ProjectRewardsStatsResolvers<ContextType>;
  ProjectStatistics?: ProjectStatisticsResolvers<ContextType>;
  ProjectStats?: ProjectStatsResolvers<ContextType>;
  ProjectStatsBase?: ProjectStatsBaseResolvers<ContextType>;
  ProjectViewBaseStats?: ProjectViewBaseStatsResolvers<ContextType>;
  ProjectViewStats?: ProjectViewStatsResolvers<ContextType>;
  ProjectsResponse?: ProjectsResponseResolvers<ContextType>;
  ProjectsSummary?: ProjectsSummaryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignedUploadUrl?: SignedUploadUrlResolvers<ContextType>;
  SourceResource?: SourceResourceResolvers<ContextType>;
  Sponsor?: SponsorResolvers<ContextType>;
  StatsInterface?: StatsInterfaceResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Swap?: SwapResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagsGetResult?: TagsGetResultResolvers<ContextType>;
  TagsMostFundedGetResult?: TagsMostFundedGetResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserBadge?: UserBadgeResolvers<ContextType>;
  UserNotificationSettings?: UserNotificationSettingsResolvers<ContextType>;
  UserProjectContribution?: UserProjectContributionResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
  WalletContributionLimits?: WalletContributionLimitsResolvers<ContextType>;
  WalletLimits?: WalletLimitsResolvers<ContextType>;
  WalletOffChainContributionLimits?: WalletOffChainContributionLimitsResolvers<ContextType>;
  WalletOnChainContributionLimits?: WalletOnChainContributionLimitsResolvers<ContextType>;
  WalletState?: WalletStateResolvers<ContextType>;
};


export type EmailUpdateUserFragment = { __typename?: 'User', email?: string | null, isEmailVerified: boolean, id: any };

export type OtpResponseFragment = { __typename?: 'OTPResponse', otpVerificationToken: string, expiresAt: any };

export type EntryFragment = { __typename?: 'Entry', id: any, title: string, description: string, image?: string | null, status: EntryStatus, content?: string | null, createdAt: string, updatedAt: string, publishedAt?: string | null, fundersCount: number, amountFunded: number, type: EntryType, creator: (
    { __typename?: 'User' }
    & UserForAvatarFragment
  ), project?: { __typename?: 'Project', id: any, title: string, name: string, image?: string | null } | null };

export type EntryForLandingPageFragment = { __typename?: 'Entry', amountFunded: number, id: any, image?: string | null, title: string, entryFundersCount: number, entryDescription: string, project?: { __typename?: 'Project', id: any, name: string, thumbnailImage?: string | null, title: string } | null, creator: (
    { __typename?: 'User' }
    & UserForAvatarFragment
  ) };

export type EntryForProjectFragment = { __typename?: 'Entry', id: any, title: string, description: string, image?: string | null, type: EntryType, fundersCount: number, amountFunded: number, status: EntryStatus, createdAt: string, publishedAt?: string | null, creator: (
    { __typename?: 'User' }
    & UserForAvatarFragment
  ) };

export type FundingTxForLandingPageFragment = { __typename?: 'FundingTx', id: any, comment?: string | null, amount: number, paidAt?: any | null, onChain: boolean, media?: string | null, source: string, method?: FundingMethod | null, projectId: any, funder: { __typename?: 'Funder', id: any, amountFunded?: number | null, timesFunded?: number | null, confirmedAt?: any | null, user?: { __typename?: 'User', id: any, username: string, imageUrl?: string | null, externalAccounts: Array<{ __typename?: 'ExternalAccount', externalUsername: string, public: boolean, accountType: string }> } | null }, sourceResource?: { __typename?: 'Entry', createdAt: string, id: any, image?: string | null, title: string } | { __typename?: 'Project', id: any, name: string, title: string, image?: string | null, createdAt: string, thumbnailImage?: string | null } | null };

export type ProjectDefaultGoalFragment = { __typename?: 'ProjectGoal', id: any, title: string, targetAmount: number, currency: ProjectGoalCurrency, amountContributed: number };

export type ProjectGoalFragment = { __typename?: 'ProjectGoal', id: any, title: string, description?: string | null, targetAmount: number, currency: ProjectGoalCurrency, status: ProjectGoalStatus, projectId: any, amountContributed: number, createdAt: any, updatedAt: any, hasReceivedContribution: boolean, emojiUnifiedCode?: string | null };

export type BoardVoteGrantsFragmentFragment = { __typename?: 'BoardVoteGrant', id: any, title: string, name: string, image?: string | null, shortDescription: string, description?: string | null, balance: number, status: GrantStatusEnum, type: GrantType, statuses: Array<{ __typename?: 'GrantStatus', status: GrantStatusEnum, endAt?: any | null, startAt: any }>, sponsors: Array<{ __typename?: 'Sponsor', id: any, name: string, url?: string | null, image?: string | null, status: SponsorStatus, createdAt: any }> };

export type CommunityVoteGrantsFragmentFragment = { __typename?: 'CommunityVoteGrant', id: any, title: string, name: string, image?: string | null, shortDescription: string, description?: string | null, balance: number, status: GrantStatusEnum, type: GrantType, votingSystem: VotingSystem, distributionSystem: DistributionSystem, statuses: Array<{ __typename?: 'GrantStatus', status: GrantStatusEnum, endAt?: any | null, startAt: any }>, sponsors: Array<{ __typename?: 'Sponsor', id: any, name: string, url?: string | null, image?: string | null, status: SponsorStatus, createdAt: any }>, votes: { __typename?: 'CompetitionVoteGrantVoteSummary', voteCount: number, voterCount: number } };

export type BoardVoteGrantFragmentFragment = { __typename?: 'BoardVoteGrant', id: any, title: string, name: string, shortDescription: string, description?: string | null, balance: number, status: GrantStatusEnum, image?: string | null, type: GrantType, statuses: Array<{ __typename?: 'GrantStatus', status: GrantStatusEnum, endAt?: any | null, startAt: any }>, applicants: Array<{ __typename?: 'GrantApplicant', contributorsCount: number, status: GrantApplicantStatus, contributors: Array<{ __typename?: 'GrantApplicantContributor', amount: number, timesContributed: number, user?: { __typename?: 'User', id: any, imageUrl?: string | null } | null }>, project: { __typename?: 'Project', id: any, name: string, title: string, thumbnailImage?: string | null, shortDescription?: string | null, description?: string | null, wallets: Array<{ __typename?: 'Wallet', id: any }> }, funding: { __typename?: 'GrantApplicantFunding', communityFunding: number, grantAmount: number, grantAmountDistributed: number } }>, sponsors: Array<{ __typename?: 'Sponsor', id: any, name: string, url?: string | null, image?: string | null, status: SponsorStatus, createdAt: any }>, boardMembers: Array<{ __typename?: 'GrantBoardMember', user: { __typename?: 'User', username: string, imageUrl?: string | null, id: any, externalAccounts: Array<{ __typename?: 'ExternalAccount', accountType: string, externalId: string, externalUsername: string, id: any, public: boolean }> } }> };

export type CommunityVoteGrantFragmentFragment = { __typename?: 'CommunityVoteGrant', id: any, title: string, name: string, shortDescription: string, description?: string | null, balance: number, status: GrantStatusEnum, image?: string | null, type: GrantType, votingSystem: VotingSystem, distributionSystem: DistributionSystem, statuses: Array<{ __typename?: 'GrantStatus', status: GrantStatusEnum, endAt?: any | null, startAt: any }>, applicants: Array<{ __typename?: 'GrantApplicant', contributorsCount: number, status: GrantApplicantStatus, voteCount: number, contributors: Array<{ __typename?: 'GrantApplicantContributor', amount: number, timesContributed: number, voteCount: number, user?: { __typename?: 'User', id: any, imageUrl?: string | null, username: string } | null }>, project: { __typename?: 'Project', id: any, name: string, title: string, thumbnailImage?: string | null, shortDescription?: string | null, description?: string | null, wallets: Array<{ __typename?: 'Wallet', id: any }> }, funding: { __typename?: 'GrantApplicantFunding', communityFunding: number, grantAmount: number, grantAmountDistributed: number } }>, sponsors: Array<{ __typename?: 'Sponsor', id: any, name: string, url?: string | null, image?: string | null, status: SponsorStatus, createdAt: any }>, votes: { __typename?: 'CompetitionVoteGrantVoteSummary', voteCount: number, voterCount: number } };

export type OrderItemFragment = { __typename?: 'OrderItem', quantity: number, unitPriceInSats: number, item: { __typename?: 'ProjectReward', id: any, name: string, cost: number, rewardCurrency: RewardCurrency, category?: string | null } };

export type OrderFragment = { __typename?: 'Order', confirmedAt?: any | null, createdAt: any, deliveredAt?: any | null, id: any, shippedAt?: any | null, status: string, totalInSats: number, updatedAt: any, user?: { __typename?: 'User', id: any, imageUrl?: string | null, username: string, email?: string | null } | null, items: Array<(
    { __typename?: 'OrderItem' }
    & OrderItemFragment
  )>, fundingTx: { __typename?: 'FundingTx', id: any, amount: number, amountPaid: number, donationAmount: number, address?: string | null, email?: string | null, fundingType: FundingType, invoiceStatus: InvoiceStatus, isAnonymous: boolean, status: FundingStatus, uuid?: string | null, bitcoinQuote?: { __typename?: 'BitcoinQuote', quoteCurrency: QuoteCurrency, quote: number } | null } };

export type FundingTxOrderFragment = { __typename?: 'FundingTx', id: any, invoiceStatus: InvoiceStatus, donationAmount: number, amountPaid: number, amount: number, email?: string | null, paidAt?: any | null, status: FundingStatus, invoiceId?: string | null, uuid?: string | null, affiliateFeeInSats?: number | null, bitcoinQuote?: { __typename?: 'BitcoinQuote', quoteCurrency: QuoteCurrency, quote: number } | null, funder: { __typename?: 'Funder', user?: { __typename?: 'User', id: any, imageUrl?: string | null, username: string, externalAccounts: Array<{ __typename?: 'ExternalAccount', id: any, externalUsername: string, externalId: string, accountType: string, public: boolean }> } | null }, order?: { __typename?: 'Order', id: any, referenceCode: string, totalInSats: number, items: Array<(
      { __typename?: 'OrderItem' }
      & OrderItemFragment
    )> } | null };

export type PaginationFragment = { __typename?: 'CursorPaginationResponse', take?: number | null, count?: number | null, cursor?: { __typename?: 'PaginationCursor', id?: any | null } | null };

export type ProjectCommunityVoteGrantFragment = { __typename?: 'CommunityVoteGrant', id: any, status: GrantStatusEnum, title: string };

export type ProjectGrantApplicationsFragment = { __typename?: 'Project', grantApplications: Array<{ __typename?: 'GrantApplicant', id: any, status: GrantApplicantStatus, grant: { __typename?: 'BoardVoteGrant' } | (
      { __typename?: 'CommunityVoteGrant' }
      & ProjectCommunityVoteGrantFragment
    ) }> };

export type ProjectNostrKeysFragment = { __typename?: 'Project', id: any, name: string, keys: { __typename?: 'ProjectKeys', nostrKeys: { __typename?: 'NostrKeys', privateKey?: { __typename?: 'NostrPrivateKey', nsec: string } | null, publicKey: { __typename?: 'NostrPublicKey', npub: string } } } };

export type ProjectRewardForLandingPageFragment = { __typename?: 'ProjectReward', cost: number, description?: string | null, id: any, image?: string | null, sold: number, stock?: number | null, maxClaimable?: number | null, rewardName: string, rewardProject: { __typename?: 'Project', id: any, name: string, title: string, rewardCurrency?: RewardCurrency | null, owners: Array<{ __typename?: 'Owner', id: any, user: { __typename?: 'User', id: any, username: string, imageUrl?: string | null } }> } };

export type ProjectRewardForCreateUpdateFragment = { __typename?: 'ProjectReward', id: any, name: string, description?: string | null, cost: number, image?: string | null, deleted: boolean, stock?: number | null, sold: number, hasShipping: boolean, maxClaimable?: number | null, isAddon: boolean, isHidden: boolean, category?: string | null, preOrder: boolean, estimatedAvailabilityDate?: any | null, estimatedDeliveryInWeeks?: number | null };

export type ProjectFragment = (
  { __typename?: 'Project', id: any, title: string, name: string, type: ProjectType, shortDescription?: string | null, description?: string | null, defaultGoalId?: any | null, balance: number, balanceUsdCent: number, createdAt: string, updatedAt: string, image?: string | null, thumbnailImage?: string | null, links: Array<string>, status?: ProjectStatus | null, rewardCurrency?: RewardCurrency | null, fundersCount?: number | null, fundingTxsCount?: number | null, keys: (
    { __typename?: 'ProjectKeys', nostrKeys: { __typename?: 'NostrKeys', publicKey: { __typename?: 'NostrPublicKey', npub: string } } }
    & ProjectKeysFragment
  ), location?: { __typename?: 'Location', region?: string | null, country?: { __typename?: 'Country', name: string, code: string } | null } | null, tags: Array<{ __typename?: 'Tag', id: number, label: string }>, owners: Array<{ __typename?: 'Owner', id: any, user: (
      { __typename?: 'User' }
      & ProjectOwnerUserFragment
    ) }>, rewards: Array<(
    { __typename?: 'ProjectReward' }
    & ProjectRewardForCreateUpdateFragment
  )>, ambassadors: Array<{ __typename?: 'Ambassador', id: any, confirmed: boolean, user: (
      { __typename?: 'User' }
      & UserForAvatarFragment
    ) }>, sponsors: Array<{ __typename?: 'Sponsor', id: any, url?: string | null, image?: string | null, user?: (
      { __typename?: 'User' }
      & UserForAvatarFragment
    ) | null }>, entries: Array<(
    { __typename?: 'Entry' }
    & EntryForProjectFragment
  )>, wallets: Array<(
    { __typename?: 'Wallet' }
    & ProjectWalletFragment
  )>, followers: Array<{ __typename?: 'User', id: any, username: string }> }
  & ProjectGrantApplicationsFragment
);

export type ProjectForSubscriptionFragment = { __typename?: 'Project', id: any, title: string, name: string, thumbnailImage?: string | null, owners: Array<{ __typename?: 'Owner', id: any, user: (
      { __typename?: 'User' }
      & UserMeFragment
    ) }> };

export type ProjectAvatarFragment = { __typename?: 'Project', id: any, name: string, thumbnailImage?: string | null, title: string };

export type ExternalAccountFragment = { __typename?: 'ExternalAccount', id: any, accountType: string, externalUsername: string, externalId: string, public: boolean };

export type ProjectOwnerUserFragment = { __typename?: 'User', id: any, username: string, imageUrl?: string | null, email?: string | null, ranking?: any | null, isEmailVerified: boolean, hasSocialAccount: boolean, externalAccounts: Array<(
    { __typename?: 'ExternalAccount' }
    & ExternalAccountFragment
  )> };

export type UserMeFragment = { __typename?: 'User', id: any, username: string, imageUrl?: string | null, email?: string | null, ranking?: any | null, isEmailVerified: boolean, hasSocialAccount: boolean, externalAccounts: Array<(
    { __typename?: 'ExternalAccount' }
    & ExternalAccountFragment
  )>, ownerOf: Array<{ __typename?: 'OwnerOf', project?: { __typename?: 'Project', id: any, name: string, image?: string | null, thumbnailImage?: string | null, title: string, status?: ProjectStatus | null, createdAt: string } | null }> };

export type UserForAvatarFragment = { __typename?: 'User', id: any, imageUrl?: string | null, email?: string | null, username: string };

export type FunderWithUserFragment = { __typename?: 'Funder', amountFunded?: number | null, confirmed: boolean, id: any, confirmedAt?: any | null, timesFunded?: number | null, user?: { __typename?: 'User', id: any, username: string, hasSocialAccount: boolean, imageUrl?: string | null, externalAccounts: Array<{ __typename?: 'ExternalAccount', externalId: string, externalUsername: string, id: any, accountType: string }> } | null };

export type ProjectWalletFragment = { __typename?: 'Wallet', id: any, name?: string | null, feePercentage?: number | null, state: { __typename?: 'WalletState', status: WalletStatus, statusCode: WalletStatusCode }, connectionDetails: { __typename?: 'LightningAddressConnectionDetails', lightningAddress: string } | { __typename?: 'LndConnectionDetailsPrivate', macaroon: string, tlsCertificate?: string | null, hostname: string, grpcPort: number, lndNodeType: LndNodeType, pubkey?: string | null } | { __typename?: 'LndConnectionDetailsPublic', pubkey?: string | null } };

export type WalletLimitsFragment = { __typename?: 'WalletLimits', contribution?: { __typename?: 'WalletContributionLimits', min?: number | null, max?: number | null, offChain?: { __typename?: 'WalletOffChainContributionLimits', min?: number | null, max?: number | null } | null, onChain?: { __typename?: 'WalletOnChainContributionLimits', min?: number | null, max?: number | null } | null } | null };

export type UserBadgeAwardMutationVariables = Exact<{
  userBadgeId: Scalars['BigInt']['input'];
}>;


export type UserBadgeAwardMutation = { __typename?: 'Mutation', userBadgeAward: { __typename?: 'UserBadge', badgeAwardEventId?: string | null } };

export type SendOtpByEmailMutationVariables = Exact<{
  input: SendOtpByEmailInput;
}>;


export type SendOtpByEmailMutation = { __typename?: 'Mutation', sendOTPByEmail: (
    { __typename?: 'OTPResponse' }
    & OtpResponseFragment
  ) };

export type UserEmailUpdateMutationVariables = Exact<{
  input: UserEmailUpdateInput;
}>;


export type UserEmailUpdateMutation = { __typename?: 'Mutation', userEmailUpdate: (
    { __typename?: 'User' }
    & EmailUpdateUserFragment
  ) };

export type UserEmailVerifyMutationVariables = Exact<{
  input: EmailVerifyInput;
}>;


export type UserEmailVerifyMutation = { __typename?: 'Mutation', userEmailVerify: boolean };

export type GrantApplyMutationVariables = Exact<{
  input?: InputMaybe<GrantApplyInput>;
}>;


export type GrantApplyMutation = { __typename?: 'Mutation', grantApply: { __typename?: 'GrantApplicant', status: GrantApplicantStatus } };

export type OrderStatusUpdateMutationVariables = Exact<{
  input: OrderStatusUpdateInput;
}>;


export type OrderStatusUpdateMutation = { __typename?: 'Mutation', orderStatusUpdate?: { __typename?: 'Order', status: string, id: any, shippedAt?: any | null, deliveredAt?: any | null } | null };

export type FundingConfirmMutationVariables = Exact<{
  input: FundingConfirmInput;
}>;


export type FundingConfirmMutation = { __typename?: 'Mutation', fundingConfirm: { __typename?: 'FundingConfirmResponse', id: any, success: boolean } };

export type UnlinkExternalAccountMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type UnlinkExternalAccountMutation = { __typename?: 'Mutation', unlinkExternalAccount: { __typename?: 'User', id: any, username: string, imageUrl?: string | null, externalAccounts: Array<{ __typename?: 'ExternalAccount', id: any, accountType: string, externalUsername: string, externalId: string, public: boolean }> } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename: 'User', id: any, bio?: string | null, email?: string | null, username: string, imageUrl?: string | null, wallet?: { __typename?: 'Wallet', connectionDetails: { __typename?: 'LightningAddressConnectionDetails', lightningAddress: string } | { __typename?: 'LndConnectionDetailsPrivate' } | { __typename?: 'LndConnectionDetailsPublic' } } | null } };

export type UserDeleteMutationVariables = Exact<{ [key: string]: never; }>;


export type UserDeleteMutation = { __typename?: 'Mutation', userDelete: { __typename?: 'DeleteUserResponse', message?: string | null, success: boolean } };

export type ActivityForLandingPageFragment = { __typename?: 'Activity', id: string, createdAt: any, resource: (
    { __typename?: 'Entry' }
    & EntryForLandingPageFragment
  ) | (
    { __typename?: 'FundingTx' }
    & FundingTxForLandingPageFragment
  ) | (
    { __typename?: 'Project' }
    & ProjectForLandingPageFragment
  ) | { __typename?: 'ProjectGoal' } | (
    { __typename?: 'ProjectReward' }
    & ProjectRewardForLandingPageFragment
  ) };

export type ActivitiesForLandingPageQueryVariables = Exact<{
  input?: InputMaybe<GetActivitiesInput>;
}>;


export type ActivitiesForLandingPageQuery = { __typename?: 'Query', activitiesGet: { __typename?: 'ActivitiesGetResponse', activities: Array<(
      { __typename?: 'Activity' }
      & ActivityForLandingPageFragment
    )> } };

export type BadgesQueryVariables = Exact<{ [key: string]: never; }>;


export type BadgesQuery = { __typename?: 'Query', badges: Array<{ __typename?: 'Badge', createdAt: any, description: string, id: string, image: string, name: string, thumb: string, uniqueName: string }> };

export type UserBadgesQueryVariables = Exact<{
  input: BadgesGetInput;
}>;


export type UserBadgesQuery = { __typename?: 'Query', userBadges: Array<{ __typename?: 'UserBadge', userId: any, updatedAt: any, status?: UserBadgeStatus | null, id: any, fundingTxId?: any | null, createdAt: any, badgeAwardEventId?: string | null, badge: { __typename?: 'Badge', name: string, thumb: string, uniqueName: string, image: string, id: string, description: string, createdAt: any } }> };

export type EntryForLandingPageQueryVariables = Exact<{
  entryID: Scalars['BigInt']['input'];
}>;


export type EntryForLandingPageQuery = { __typename?: 'Query', entry?: (
    { __typename?: 'Entry' }
    & EntryForLandingPageFragment
  ) | null };

export type EntryWithOwnersQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type EntryWithOwnersQuery = { __typename?: 'Query', entry?: { __typename?: 'Entry', id: any, title: string, description: string, image?: string | null, status: EntryStatus, content?: string | null, createdAt: string, updatedAt: string, publishedAt?: string | null, fundersCount: number, type: EntryType, creator: { __typename?: 'User', id: any, username: string, imageUrl?: string | null }, project?: { __typename?: 'Project', id: any, title: string, name: string, owners: Array<{ __typename?: 'Owner', user: { __typename?: 'User', id: any } }> } | null } | null };

export type EntriesQueryVariables = Exact<{
  input: GetEntriesInput;
}>;


export type EntriesQuery = { __typename?: 'Query', getEntries: Array<{ __typename?: 'Entry', id: any, title: string, description: string, image?: string | null, fundersCount: number, amountFunded: number, type: EntryType, status: EntryStatus, project?: { __typename?: 'Project', title: string, name: string, image?: string | null } | null }> };

export type SignedUploadUrlQueryVariables = Exact<{
  input: FileUploadInput;
}>;


export type SignedUploadUrlQuery = { __typename?: 'Query', getSignedUploadUrl: { __typename?: 'SignedUploadUrl', uploadUrl: string, distributionUrl: string } };

export type FundingTxForUserContributionFragment = { __typename?: 'FundingTx', id: any, comment?: string | null, amount: number, paidAt?: any | null, onChain: boolean, media?: string | null, source: string, method?: FundingMethod | null, projectId: any, funder: { __typename?: 'Funder', id: any, user?: { __typename?: 'User', id: any, username: string, imageUrl?: string | null, externalAccounts: Array<{ __typename?: 'ExternalAccount', id: any, externalUsername: string, public: boolean, accountType: string }> } | null }, sourceResource?: { __typename?: 'Entry', id: any, createdAt: string, image?: string | null } | { __typename?: 'Project', id: any, createdAt: string, name: string, title: string, thumbnailImage?: string | null, image?: string | null } | null };

export type FundingTxsForLandingPageQueryVariables = Exact<{
  input?: InputMaybe<GetFundingTxsInput>;
}>;


export type FundingTxsForLandingPageQuery = { __typename?: 'Query', fundingTxsGet?: { __typename?: 'FundingTxsGetResponse', fundingTxs: Array<(
      { __typename?: 'FundingTx' }
      & FundingTxForLandingPageFragment
    )> } | null };

export type FundingTxForUserContributionQueryVariables = Exact<{
  fundingTxId: Scalars['BigInt']['input'];
}>;


export type FundingTxForUserContributionQuery = { __typename?: 'Query', fundingTx: (
    { __typename?: 'FundingTx' }
    & FundingTxForUserContributionFragment
  ) };

export type ProjectDefaultGoalQueryVariables = Exact<{
  input: GetProjectGoalsInput;
}>;


export type ProjectDefaultGoalQuery = { __typename?: 'Query', projectGoals: { __typename?: 'ProjectGoals', inProgress: Array<(
      { __typename?: 'ProjectGoal' }
      & ProjectDefaultGoalFragment
    )> } };

export type ProjectGoalsQueryVariables = Exact<{
  input: GetProjectGoalsInput;
}>;


export type ProjectGoalsQuery = { __typename?: 'Query', projectGoals: { __typename?: 'ProjectGoals', inProgress: Array<(
      { __typename?: 'ProjectGoal' }
      & ProjectGoalFragment
    )>, completed: Array<(
      { __typename?: 'ProjectGoal', completedAt?: any | null }
      & ProjectGoalFragment
    )> } };

export type GrantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GrantsQuery = { __typename?: 'Query', grants: Array<(
    { __typename?: 'BoardVoteGrant' }
    & BoardVoteGrantsFragmentFragment
  ) | (
    { __typename?: 'CommunityVoteGrant' }
    & CommunityVoteGrantsFragmentFragment
  )> };

export type GrantQueryVariables = Exact<{
  input: GrantGetInput;
}>;


export type GrantQuery = { __typename?: 'Query', grant: (
    { __typename?: 'BoardVoteGrant' }
    & BoardVoteGrantFragmentFragment
  ) | (
    { __typename?: 'CommunityVoteGrant' }
    & CommunityVoteGrantFragmentFragment
  ) };

export type GrantStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GrantStatisticsQuery = { __typename?: 'Query', grantStatistics: { __typename?: 'GrantStatistics', grants?: { __typename?: 'GrantStatisticsGrant', amountFunded: number, amountGranted: number, count: number } | null, applicants?: { __typename?: 'GrantStatisticsApplicant', countFunded: number } | null } };

export type GrantGetQueryVariables = Exact<{
  input: GrantGetInput;
}>;


export type GrantGetQuery = { __typename?: 'Query', grant: { __typename?: 'BoardVoteGrant', applicants: Array<{ __typename?: 'GrantApplicant', project: { __typename?: 'Project', name: string, id: any } }> } | { __typename?: 'CommunityVoteGrant', applicants: Array<{ __typename?: 'GrantApplicant', project: { __typename?: 'Project', name: string, id: any } }> } };

export type OrdersGetQueryVariables = Exact<{
  input: OrdersGetInput;
}>;


export type OrdersGetQuery = { __typename?: 'Query', ordersGet?: { __typename?: 'OrdersGetResponse', pagination?: (
      { __typename?: 'CursorPaginationResponse' }
      & PaginationFragment
    ) | null, orders: Array<(
      { __typename?: 'Order' }
      & OrderFragment
    )> } | null };

export type FundingTxsOrderGetQueryVariables = Exact<{
  input?: InputMaybe<GetFundingTxsInput>;
}>;


export type FundingTxsOrderGetQuery = { __typename?: 'Query', fundingTxsGet?: { __typename?: 'FundingTxsGetResponse', pagination?: (
      { __typename?: 'CursorPaginationResponse' }
      & PaginationFragment
    ) | null, fundingTxs: Array<(
      { __typename?: 'FundingTx' }
      & FundingTxOrderFragment
    )> } | null };

export type FundingTxsOrderCountGetQueryVariables = Exact<{
  input?: InputMaybe<GetFundingTxsInput>;
}>;


export type FundingTxsOrderCountGetQuery = { __typename?: 'Query', fundingTxsGet?: { __typename?: 'FundingTxsGetResponse', pagination?: (
      { __typename?: 'CursorPaginationResponse' }
      & PaginationFragment
    ) | null } | null };

export type ProjectByNameOrIdQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
  input?: InputMaybe<ProjectEntriesGetInput>;
}>;


export type ProjectByNameOrIdQuery = { __typename?: 'Query', projectGet?: (
    { __typename?: 'Project' }
    & ProjectFragment
  ) | null };

export type ProjectsForSubscriptionQueryVariables = Exact<{
  input: ProjectsGetQueryInput;
}>;


export type ProjectsForSubscriptionQuery = { __typename?: 'Query', projectsGet: { __typename?: 'ProjectsResponse', projects: Array<(
      { __typename?: 'Project' }
      & ProjectForSubscriptionFragment
    )> } };

export type ProjectsQueryVariables = Exact<{
  input?: InputMaybe<ProjectsGetQueryInput>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projectsGet: { __typename?: 'ProjectsResponse', projects: Array<{ __typename?: 'Project', id: any, title: string, name: string, description?: string | null, balance: number, createdAt: string, status?: ProjectStatus | null, image?: string | null }> } };

export type ProjectsFullQueryVariables = Exact<{
  input?: InputMaybe<ProjectsGetQueryInput>;
}>;


export type ProjectsFullQuery = { __typename?: 'Query', projectsGet: { __typename?: 'ProjectsResponse', projects: Array<{ __typename?: 'Project', id: any, title: string, name: string, type: ProjectType, shortDescription?: string | null, description?: string | null, balance: number, createdAt: string, updatedAt: string, thumbnailImage?: string | null, image?: string | null, status?: ProjectStatus | null, owners: Array<{ __typename?: 'Owner', id: any, user: { __typename?: 'User', id: any, username: string, imageUrl?: string | null } }>, funders: Array<{ __typename?: 'Funder', id: any, confirmed: boolean, user?: { __typename?: 'User', id: any, username: string, imageUrl?: string | null } | null }>, wallets: Array<{ __typename?: 'Wallet', state: { __typename?: 'WalletState', status: WalletStatus, statusCode: WalletStatusCode } }> }> } };

export type ProjectsSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsSummaryQuery = { __typename?: 'Query', projectsSummary: { __typename?: 'ProjectsSummary', fundedTotal?: any | null, fundersCount?: number | null, projectsCount?: number | null } };

export type ProjectFundersQueryVariables = Exact<{
  input: GetFundersInput;
}>;


export type ProjectFundersQuery = { __typename?: 'Query', fundersGet: Array<(
    { __typename?: 'Funder' }
    & FunderWithUserFragment
  )> };

export type ProjectNostrKeysQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectNostrKeysQuery = { __typename?: 'Query', projectGet?: (
    { __typename?: 'Project' }
    & ProjectNostrKeysFragment
  ) | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: (
    { __typename?: 'User' }
    & UserMeFragment
  ) | null };

export type MeProjectFollowsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeProjectFollowsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: any, projectFollows: Array<{ __typename?: 'Project', id: any, title: string, name: string }> } | null };

export type LightningAddressVerifyQueryVariables = Exact<{
  lightningAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type LightningAddressVerifyQuery = { __typename?: 'Query', lightningAddressVerify: { __typename?: 'LightningAddressVerifyResponse', reason?: string | null, valid: boolean, limits?: { __typename?: 'LightningAddressContributionLimits', max?: number | null, min?: number | null } | null } };

export type WalletLimitQueryVariables = Exact<{
  getWalletId: Scalars['BigInt']['input'];
}>;


export type WalletLimitQuery = { __typename?: 'Query', getWallet: { __typename?: 'Wallet', limits?: { __typename?: 'WalletLimits', contribution?: { __typename?: 'WalletContributionLimits', max?: number | null, min?: number | null } | null } | null } };

export type ActivityCreatedSubscriptionVariables = Exact<{
  input?: InputMaybe<ActivityCreatedSubscriptionInput>;
}>;


export type ActivityCreatedSubscription = { __typename?: 'Subscription', activityCreated: (
    { __typename?: 'Entry' }
    & EntryForLandingPageFragment
  ) | (
    { __typename?: 'FundingTx' }
    & FundingTxForLandingPageFragment
  ) | (
    { __typename?: 'Project' }
    & ProjectForLandingPageFragment
  ) | { __typename?: 'ProjectGoal' } | (
    { __typename?: 'ProjectReward' }
    & ProjectRewardForLandingPageFragment
  ) };

export type ProjectForLandingPageFragment = { __typename?: 'Project', id: any, name: string, balance: number, balanceUsdCent: number, fundersCount?: number | null, thumbnailImage?: string | null, shortDescription?: string | null, title: string, status?: ProjectStatus | null };

export type RewardForLandingPageFragment = { __typename?: 'ProjectReward', id: any, image?: string | null, cost: number, name: string, description?: string | null, project: { __typename?: 'Project', rewardCurrency?: RewardCurrency | null, id: any, name: string, title: string, thumbnailImage?: string | null } };

export type FeaturedProjectForLandingPageQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type FeaturedProjectForLandingPageQuery = { __typename?: 'Query', projectGet?: (
    { __typename?: 'Project' }
    & ProjectForLandingPageFragment
  ) | null };

export type ProjectsMostFundedByTagQueryVariables = Exact<{
  input: ProjectsMostFundedByTagInput;
}>;


export type ProjectsMostFundedByTagQuery = { __typename?: 'Query', projectsMostFundedByTag: Array<{ __typename?: 'ProjectMostFundedByTag', tagId: number, projects: Array<{ __typename?: 'ProjectMostFunded', project: (
        { __typename?: 'Project' }
        & ProjectForLandingPageFragment
      ) }> }> };

export type ProjectsForLandingPageQueryVariables = Exact<{
  input?: InputMaybe<ProjectsGetQueryInput>;
}>;


export type ProjectsForLandingPageQuery = { __typename?: 'Query', projectsGet: { __typename?: 'ProjectsResponse', projects: Array<(
      { __typename?: 'Project' }
      & ProjectForLandingPageFragment
    )> } };

export type ProjectRewardsTrendingWeeklyGetQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectRewardsTrendingWeeklyGetQuery = { __typename?: 'Query', projectRewardsTrendingWeeklyGet: Array<{ __typename?: 'ProjectRewardsGroupedByRewardIdStats', count: number, projectReward: (
      { __typename?: 'ProjectReward' }
      & RewardForLandingPageFragment
    ) }> };

export type TagsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsGetQuery = { __typename?: 'Query', tagsGet: Array<{ __typename?: 'TagsGetResult', label: string, id: number, count: number }> };

export type ProjectCountriesGetQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectCountriesGetQuery = { __typename?: 'Query', projectCountriesGet: Array<{ __typename?: 'ProjectCountriesGetResult', count: number, country: { __typename?: 'Country', code: string, name: string } }> };

export type ProjectRegionsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectRegionsGetQuery = { __typename?: 'Query', projectRegionsGet: Array<{ __typename?: 'ProjectRegionsGetResult', count: number, region: string }> };

export type TagsMostFundedGetQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsMostFundedGetQuery = { __typename?: 'Query', tagsMostFundedGet: Array<{ __typename?: 'TagsMostFundedGetResult', id: number, label: string }> };

export type SummaryBannerFragmentFragment = { __typename?: 'ProjectsSummary', fundedTotal?: any | null, fundersCount?: number | null, projectsCount?: number | null };

export type TopContributorsFragmentFragment = { __typename?: 'GlobalContributorLeaderboardRow', contributionsCount: number, contributionsTotal: number, contributionsTotalUsd: number, projectsContributedCount: number, userId: any, username: string, userImageUrl?: string | null };

export type TopProjectsFragmentFragment = { __typename?: 'GlobalProjectLeaderboardRow', projectName: string, projectTitle: string, projectThumbnailUrl?: string | null, contributionsTotal: number, contributionsTotalUsd: number, contributionsCount: number, contributorsCount: number };

export type LeaderboardGlobalContributorsQueryVariables = Exact<{
  input: LeaderboardGlobalContributorsGetInput;
}>;


export type LeaderboardGlobalContributorsQuery = { __typename?: 'Query', leaderboardGlobalContributorsGet: Array<(
    { __typename?: 'GlobalContributorLeaderboardRow' }
    & TopContributorsFragmentFragment
  )> };

export type LeaderboardGlobalProjectsQueryVariables = Exact<{
  input: LeaderboardGlobalProjectsGetInput;
}>;


export type LeaderboardGlobalProjectsQuery = { __typename?: 'Query', leaderboardGlobalProjectsGet: Array<(
    { __typename?: 'GlobalProjectLeaderboardRow' }
    & TopProjectsFragmentFragment
  )> };

export type OrdersStatsFragmentFragment = { __typename?: 'OrdersStatsBase', projectRewards: { __typename?: 'ProjectRewardsStats', count: number }, projectRewardsGroupedByProjectRewardId: Array<{ __typename?: 'ProjectRewardsGroupedByRewardIdStats', count: number, projectReward: { __typename?: 'ProjectReward', id: any, name: string, image?: string | null } }> };

export type ProjectContributionsStatsFragment = { __typename?: 'ProjectContributionsStatsBase', contributions: { __typename?: 'ProjectContributionsStats', total: number, totalUsd: number } };

export type ProjectStatsFragment = { __typename?: 'ProjectStats', current?: { __typename?: 'ProjectStatsBase', projectContributionsStats?: (
      { __typename?: 'ProjectContributionsStatsBase' }
      & ProjectContributionsStatsFragment
    ) | null } | null };

export type OrdersStatsGetQueryVariables = Exact<{
  input: GetProjectOrdersStatsInput;
}>;


export type OrdersStatsGetQuery = { __typename?: 'Query', ordersStatsGet: (
    { __typename?: 'OrdersStatsBase' }
    & OrdersStatsFragmentFragment
  ) };

export type ProjectStatsGetQueryVariables = Exact<{
  input: GetProjectStatsInput;
}>;


export type ProjectStatsGetQuery = { __typename?: 'Query', projectStatsGet: (
    { __typename?: 'ProjectStats' }
    & ProjectStatsFragment
  ) };

export type UserProjectFunderFragment = { __typename?: 'Funder', amountFunded?: number | null, confirmedAt?: any | null, confirmed: boolean, id: any, fundingTxs: Array<{ __typename?: 'FundingTx', amountPaid: number, comment?: string | null, media?: string | null, paidAt?: any | null, onChain: boolean }> };

export type UserProjectContributionsFragment = { __typename?: 'UserProjectContribution', project: (
    { __typename?: 'Project' }
    & ProjectAvatarFragment
  ), funder?: (
    { __typename?: 'Funder' }
    & UserProjectFunderFragment
  ) | null };

export type ProfileOrderItemFragment = { __typename?: 'OrderItem', quantity: number, unitPriceInSats: number, item: { __typename?: 'ProjectReward', id: any, name: string, cost: number, rewardCurrency: RewardCurrency, description?: string | null, image?: string | null, category?: string | null } };

export type ProfileOrderFragment = { __typename?: 'Order', id: any, referenceCode: string, totalInSats: number, status: string, confirmedAt?: any | null, updatedAt: any, items: Array<(
    { __typename?: 'OrderItem' }
    & ProfileOrderItemFragment
  )>, fundingTx: { __typename?: 'FundingTx', id: any, amountPaid: number, amount: number, status: FundingStatus, onChain: boolean, bitcoinQuote?: { __typename?: 'BitcoinQuote', quote: number, quoteCurrency: QuoteCurrency } | null, sourceResource?: { __typename?: 'Entry' } | (
      { __typename?: 'Project' }
      & ProjectAvatarFragment
    ) | null } };

export type NotificationConfigurationFragment = { __typename?: 'NotificationConfiguration', id: any, name: string, description?: string | null, value: string, type?: SettingValueType | null, options: Array<string> };

export type NotificationSettingsFragment = { __typename?: 'NotificationSettings', notificationType: string, isEnabled: boolean, configurations: Array<(
    { __typename?: 'NotificationConfiguration' }
    & NotificationConfigurationFragment
  )> };

export type ProfileNotificationsSettingsFragment = { __typename?: 'ProfileNotificationSettings', userSettings: { __typename?: 'UserNotificationSettings', userId: any, notificationSettings: Array<(
      { __typename?: 'NotificationSettings' }
      & NotificationSettingsFragment
    )> }, creatorSettings: Array<{ __typename?: 'CreatorNotificationSettings', userId: any, project: { __typename?: 'CreatorNotificationSettingsProject', id: any, title: string, image?: string | null }, notificationSettings: Array<(
      { __typename?: 'NotificationSettings' }
      & NotificationSettingsFragment
    )> }> };

export type UserNotificationsSettingsFragment = { __typename?: 'ProfileNotificationSettings', userSettings: { __typename?: 'UserNotificationSettings', userId: any, notificationSettings: Array<(
      { __typename?: 'NotificationSettings' }
      & NotificationSettingsFragment
    )> } };

export type ProjectForProfilePageFragment = { __typename?: 'Project', id: any, name: string, balance: number, fundersCount?: number | null, thumbnailImage?: string | null, title: string, shortDescription?: string | null, createdAt: string, status?: ProjectStatus | null, rewardsCount?: number | null, wallets: Array<{ __typename?: 'Wallet', id: any, name?: string | null, state: { __typename?: 'WalletState', status: WalletStatus, statusCode: WalletStatusCode } }> };

export type ProjectNotificationSettingsFragment = { __typename?: 'CreatorNotificationSettings', userId: any, project: { __typename?: 'CreatorNotificationSettingsProject', id: any, title: string, image?: string | null }, notificationSettings: Array<{ __typename?: 'NotificationSettings', notificationType: string, isEnabled: boolean, configurations: Array<{ __typename?: 'NotificationConfiguration', id: any, name: string, description?: string | null, value: string, type?: SettingValueType | null, options: Array<string> }> }> };

export type UserForProfilePageFragment = { __typename?: 'User', id: any, bio?: string | null, username: string, imageUrl?: string | null, ranking?: any | null, isEmailVerified: boolean, externalAccounts: Array<(
    { __typename?: 'ExternalAccount' }
    & ExternalAccountFragment
  )> };

export type CreatorNotificationsSettingsUpdateMutationVariables = Exact<{
  creatorNotificationConfigurationId: Scalars['BigInt']['input'];
  value: Scalars['String']['input'];
}>;


export type CreatorNotificationsSettingsUpdateMutation = { __typename?: 'Mutation', creatorNotificationConfigurationValueUpdate?: boolean | null };

export type UserNotificationsSettingsUpdateMutationVariables = Exact<{
  userNotificationConfigurationId: Scalars['BigInt']['input'];
  value: Scalars['String']['input'];
}>;


export type UserNotificationsSettingsUpdateMutation = { __typename?: 'Mutation', userNotificationConfigurationValueUpdate?: boolean | null };

export type ProfileNotificationsSettingsQueryVariables = Exact<{
  userId: Scalars['BigInt']['input'];
}>;


export type ProfileNotificationsSettingsQuery = { __typename?: 'Query', userNotificationSettingsGet: (
    { __typename?: 'ProfileNotificationSettings' }
    & ProfileNotificationsSettingsFragment
  ) };

export type UserNotificationsSettingsQueryVariables = Exact<{
  userId: Scalars['BigInt']['input'];
}>;


export type UserNotificationsSettingsQuery = { __typename?: 'Query', userNotificationSettingsGet: (
    { __typename?: 'ProfileNotificationSettings' }
    & UserNotificationsSettingsFragment
  ) };

export type ProjectNotificationSettingsQueryVariables = Exact<{
  projectId: Scalars['BigInt']['input'];
}>;


export type ProjectNotificationSettingsQuery = { __typename?: 'Query', projectNotificationSettingsGet: (
    { __typename?: 'CreatorNotificationSettings' }
    & ProjectNotificationSettingsFragment
  ) };

export type UserForProfilePageQueryVariables = Exact<{
  where: UserGetInput;
}>;


export type UserForProfilePageQuery = { __typename?: 'Query', user: (
    { __typename?: 'User' }
    & UserForProfilePageFragment
  ) };

export type UserProfileProjectsQueryVariables = Exact<{
  where: UserGetInput;
}>;


export type UserProfileProjectsQuery = { __typename?: 'Query', user: { __typename?: 'User', ownerOf: Array<{ __typename?: 'OwnerOf', project?: (
        { __typename?: 'Project' }
        & ProjectForProfilePageFragment
      ) | null }> } };

export type UserFollowedProjectsQueryVariables = Exact<{
  where: UserGetInput;
}>;


export type UserFollowedProjectsQuery = { __typename?: 'Query', user: { __typename?: 'User', projectFollows: Array<(
      { __typename?: 'Project' }
      & ProjectForProfilePageFragment
    )> } };

export type UserProfileContributionsQueryVariables = Exact<{
  where: UserGetInput;
}>;


export type UserProfileContributionsQuery = { __typename?: 'Query', user: { __typename?: 'User', contributions: Array<(
      { __typename?: 'UserProjectContribution' }
      & UserProjectContributionsFragment
    )> } };

export type UserProfileOrdersQueryVariables = Exact<{
  where: UserGetInput;
}>;


export type UserProfileOrdersQuery = { __typename?: 'Query', user: { __typename?: 'User', orders?: Array<(
      { __typename?: 'Order' }
      & ProfileOrderFragment
    )> | null } };

export type ProjectAffiliateLinkFragment = { __typename?: 'AffiliateLink', projectId: any, label?: string | null, id: any, email: string, disabledAt?: any | null, createdAt: any, disabled?: boolean | null, affiliateId?: string | null, lightningAddress: string, affiliateFeePercentage: number, stats?: { __typename?: 'AffiliateStats', sales: { __typename?: 'AffiliateSalesStats', total: number, count: number } } | null };

export type ProjectEntryFragment = { __typename?: 'Entry', id: any, title: string, description: string, image?: string | null, type: EntryType, fundersCount: number, amountFunded: number, status: EntryStatus, createdAt: string, publishedAt?: string | null };

export type ProjectEntryViewFragment = { __typename?: 'Entry', id: any, title: string, description: string, image?: string | null, type: EntryType, fundersCount: number, amountFunded: number, status: EntryStatus, createdAt: string, publishedAt?: string | null, content?: string | null };

export type ProjectFunderFragment = { __typename?: 'Funder', id: any, amountFunded?: number | null, timesFunded?: number | null, user?: { __typename?: 'User', id: any, imageUrl?: string | null, username: string } | null };

export type ProjectLeaderboardContributorsFragment = { __typename?: 'ProjectLeaderboardContributorsRow', funderId: any, contributionsTotalUsd: number, contributionsTotal: number, contributionsCount: number, commentsCount: number, user?: { __typename?: 'User', id: any, imageUrl?: string | null, username: string } | null };

export type ProjectFundingTxFragment = { __typename?: 'FundingTx', id: any, amountPaid: number, media?: string | null, comment?: string | null, paidAt?: any | null, bitcoinQuote?: { __typename?: 'BitcoinQuote', quote: number, quoteCurrency: QuoteCurrency } | null, funder: { __typename?: 'Funder', id: any, user?: (
      { __typename?: 'User' }
      & UserAvatarFragment
    ) | null } };

export type FundingTxFragment = { __typename?: 'FundingTx', id: any, uuid?: string | null, invoiceId?: string | null, paymentRequest?: string | null, amount: number, status: FundingStatus, invoiceStatus: InvoiceStatus, comment?: string | null, media?: string | null, paidAt?: any | null, onChain: boolean, address?: string | null, source: string, method?: FundingMethod | null, projectId: any, creatorEmail?: string | null, createdAt?: any | null, bitcoinQuote?: { __typename?: 'BitcoinQuote', quote: number, quoteCurrency: QuoteCurrency } | null, funder: { __typename?: 'Funder', id: any, amountFunded?: number | null, timesFunded?: number | null, confirmedAt?: any | null, user?: { __typename?: 'User', id: any, username: string, imageUrl?: string | null } | null } };

export type FundingTxWithInvoiceStatusFragment = { __typename?: 'FundingTx', id: any, uuid?: string | null, invoiceId?: string | null, status: FundingStatus, onChain: boolean, invoiceStatus: InvoiceStatus, paymentRequest?: string | null, creatorEmail?: string | null };

export type FundingTxForDownloadInvoiceFragment = { __typename?: 'FundingTx', id: any, donationAmount: number, amountPaid: number, uuid?: string | null, projectId: any, paidAt?: any | null, createdAt?: any | null, status: FundingStatus, funder: { __typename?: 'Funder', user?: { __typename?: 'User', username: string } | null }, order?: { __typename?: 'Order', totalInSats: number, items: Array<{ __typename?: 'OrderItem', quantity: number, unitPriceInSats: number, item: { __typename?: 'ProjectReward', name: string } }> } | null, bitcoinQuote?: { __typename?: 'BitcoinQuote', quote: number, quoteCurrency: QuoteCurrency } | null };

export type ProjectGoalsFragment = { __typename?: 'ProjectGoal', id: any, title: string, description?: string | null, targetAmount: number, currency: ProjectGoalCurrency, status: ProjectGoalStatus, projectId: any, amountContributed: number, createdAt: any, updatedAt: any, completedAt?: any | null, hasReceivedContribution: boolean, emojiUnifiedCode?: string | null };

export type ProjectLocationFragment = { __typename?: 'Location', region?: string | null, country?: { __typename?: 'Country', code: string, name: string } | null };

export type ProjectKeysFragment = { __typename?: 'ProjectKeys', nostrKeys: { __typename?: 'NostrKeys', publicKey: { __typename?: 'NostrPublicKey', hex: string, npub: string } } };

export type ProjectPageBodyFragment = { __typename?: 'Project', id: any, name: string, title: string, type: ProjectType, thumbnailImage?: string | null, image?: string | null, shortDescription?: string | null, description?: string | null, balance: number, balanceUsdCent: number, defaultGoalId?: any | null, status?: ProjectStatus | null, rewardCurrency?: RewardCurrency | null, createdAt: string, goalsCount?: number | null, rewardsCount?: number | null, entriesCount?: number | null, keys: (
    { __typename?: 'ProjectKeys' }
    & ProjectKeysFragment
  ), owners: Array<{ __typename?: 'Owner', id: any, user: (
      { __typename?: 'User' }
      & ProjectPageCreatorFragment
    ) }> };

export type ProjectPageDetailsFragment = { __typename?: 'Project', id: any, name: string, links: Array<string>, location?: (
    { __typename?: 'Location' }
    & ProjectLocationFragment
  ) | null, tags: Array<{ __typename?: 'Tag', id: number, label: string }> };

export type ProjectHeaderSummaryFragment = { __typename?: 'Project', followersCount?: number | null, fundersCount?: number | null, fundingTxsCount?: number | null };

export type ProjectUpdateFragment = { __typename?: 'Project', id: any, title: string, name: string, shortDescription?: string | null, description?: string | null, image?: string | null, thumbnailImage?: string | null, status?: ProjectStatus | null, links: Array<string>, rewardCurrency?: RewardCurrency | null, location?: { __typename?: 'Location', region?: string | null, country?: { __typename?: 'Country', name: string, code: string } | null } | null };

export type ProjectStatsForInsightsPageFragment = { __typename?: 'ProjectStats', current?: { __typename?: 'ProjectStatsBase', projectViews?: { __typename?: 'ProjectViewStats', viewCount: number, visitorCount: number, referrers: Array<{ __typename?: 'ProjectViewBaseStats', value: string, viewCount: number, visitorCount: number }>, regions: Array<{ __typename?: 'ProjectViewBaseStats', value: string, viewCount: number, visitorCount: number }> } | null, projectFunderRewards?: { __typename?: 'ProjectFunderRewardStats', quantitySum: number } | null, projectFunders?: { __typename?: 'ProjectFunderStats', count: number } | null, projectFundingTxs?: { __typename?: 'ProjectFundingTxStats', amountSum?: number | null, count: number } | null } | null, prevTimeRange?: { __typename?: 'ProjectStatsBase', projectViews?: { __typename?: 'ProjectViewStats', viewCount: number, visitorCount: number } | null, projectFunderRewards?: { __typename?: 'ProjectFunderRewardStats', quantitySum: number } | null, projectFunders?: { __typename?: 'ProjectFunderStats', count: number } | null, projectFundingTxs?: { __typename?: 'ProjectFundingTxStats', amountSum?: number | null, count: number } | null } | null };

export type ProjectHistoryStatsFragment = { __typename?: 'ProjectStats', current?: { __typename?: 'ProjectStatsBase', projectFundingTxs?: { __typename?: 'ProjectFundingTxStats', amountGraph?: Array<{ __typename?: 'FundingTxAmountGraph', dateTime: any, sum: number } | null> | null } | null, projectViews?: { __typename?: 'ProjectViewStats', visitorGraph: Array<{ __typename?: 'PageViewCountGraph', viewCount: number, visitorCount: number, dateTime: any } | null> } | null } | null };

export type ProjectRewardSoldGraphStatsFragment = { __typename?: 'ProjectStats', current?: { __typename?: 'ProjectStatsBase', projectFunderRewards?: { __typename?: 'ProjectFunderRewardStats', quantityGraph?: Array<{ __typename?: 'FunderRewardGraphSum', dateTime: any, rewardId: any, rewardName: string, sum: number } | null> | null } | null } | null };

export type ProjectFundingMethodStatsFragment = { __typename?: 'ProjectStats', current?: { __typename?: 'ProjectStatsBase', projectFundingTxs?: { __typename?: 'ProjectFundingTxStats', methodSum?: Array<{ __typename?: 'FundingTxMethodSum', sum: number, method?: string | null } | null> | null } | null } | null };

export type ProjectRewardFragment = { __typename?: 'ProjectReward', id: any, name: string, description?: string | null, cost: number, image?: string | null, deleted: boolean, stock?: number | null, sold: number, hasShipping: boolean, maxClaimable?: number | null, isAddon: boolean, isHidden: boolean, category?: string | null, preOrder: boolean, estimatedAvailabilityDate?: any | null, estimatedDeliveryInWeeks?: number | null };

export type ProjectPageCreatorFragment = { __typename?: 'User', id: any, imageUrl?: string | null, username: string, email?: string | null, externalAccounts: Array<{ __typename?: 'ExternalAccount', accountType: string, externalUsername: string, externalId: string, id: any, public: boolean }> };

export type UserAvatarFragment = { __typename?: 'User', id: any, imageUrl?: string | null, username: string };

export type WalletContributionLimitsFragment = { __typename?: 'WalletContributionLimits', min?: number | null, max?: number | null, offChain?: { __typename?: 'WalletOffChainContributionLimits', min?: number | null, max?: number | null } | null, onChain?: { __typename?: 'WalletOnChainContributionLimits', min?: number | null, max?: number | null } | null };

export type ProjectPageWalletFragment = { __typename?: 'Wallet', id: any, name?: string | null, feePercentage?: number | null, limits?: { __typename?: 'WalletLimits', contribution?: (
      { __typename?: 'WalletContributionLimits' }
      & WalletContributionLimitsFragment
    ) | null } | null, state: { __typename?: 'WalletState', status: WalletStatus, statusCode: WalletStatusCode } };

export type ProjectWalletConnectionDetailsFragment = { __typename?: 'Wallet', id: any, connectionDetails: { __typename?: 'LightningAddressConnectionDetails', lightningAddress: string } | { __typename?: 'LndConnectionDetailsPrivate', tlsCertificate?: string | null, pubkey?: string | null, macaroon: string, lndNodeType: LndNodeType, hostname: string, grpcPort: number } | { __typename?: 'LndConnectionDetailsPublic', pubkey?: string | null } };

export type AffiliateLinkCreateMutationVariables = Exact<{
  input: AffiliateLinkCreateInput;
}>;


export type AffiliateLinkCreateMutation = { __typename?: 'Mutation', affiliateLinkCreate: (
    { __typename?: 'AffiliateLink' }
    & ProjectAffiliateLinkFragment
  ) };

export type AffiliateLinkLabelUpdateMutationVariables = Exact<{
  affiliateLinkId: Scalars['BigInt']['input'];
  label: Scalars['String']['input'];
}>;


export type AffiliateLinkLabelUpdateMutation = { __typename?: 'Mutation', affiliateLinkLabelUpdate: (
    { __typename?: 'AffiliateLink' }
    & ProjectAffiliateLinkFragment
  ) };

export type AffiliateLinkDisableMutationVariables = Exact<{
  affiliateLinkId: Scalars['BigInt']['input'];
}>;


export type AffiliateLinkDisableMutation = { __typename?: 'Mutation', affiliateLinkDisable: { __typename?: 'AffiliateLink', id: any } };

export type DeleteEntryMutationVariables = Exact<{
  deleteEntryId: Scalars['BigInt']['input'];
}>;


export type DeleteEntryMutation = { __typename?: 'Mutation', deleteEntry: { __typename?: 'Entry', id: any, title: string } };

export type CreateEntryMutationVariables = Exact<{
  input: CreateEntryInput;
}>;


export type CreateEntryMutation = { __typename?: 'Mutation', createEntry: (
    { __typename?: 'Entry' }
    & ProjectEntryViewFragment
  ) };

export type UpdateEntryMutationVariables = Exact<{
  input: UpdateEntryInput;
}>;


export type UpdateEntryMutation = { __typename?: 'Mutation', updateEntry: (
    { __typename?: 'Entry' }
    & ProjectEntryViewFragment
  ) };

export type PublishEntryMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type PublishEntryMutation = { __typename?: 'Mutation', publishEntry: (
    { __typename?: 'Entry' }
    & ProjectEntryViewFragment
  ) };

export type FundMutationVariables = Exact<{
  input: FundingInput;
}>;


export type FundMutation = { __typename?: 'Mutation', fund: { __typename?: 'FundingMutationResponse', fundingTx?: (
      { __typename?: 'FundingTx' }
      & FundingTxFragment
    ) | null, swap?: { __typename?: 'Swap', json: string } | null } };

export type RefreshFundingInvoiceMutationVariables = Exact<{
  fundingTxID: Scalars['BigInt']['input'];
}>;


export type RefreshFundingInvoiceMutation = { __typename?: 'Mutation', fundingInvoiceRefresh: (
    { __typename?: 'FundingTx' }
    & FundingTxWithInvoiceStatusFragment
  ) };

export type FundingInvoiceCancelMutationVariables = Exact<{
  invoiceId: Scalars['String']['input'];
}>;


export type FundingInvoiceCancelMutation = { __typename?: 'Mutation', fundingInvoiceCancel: { __typename?: 'FundinginvoiceCancel', id: any, success: boolean } };

export type FundingTxEmailUpdateMutationVariables = Exact<{
  input?: InputMaybe<FundingTxEmailUpdateInput>;
}>;


export type FundingTxEmailUpdateMutation = { __typename?: 'Mutation', fundingTxEmailUpdate: { __typename?: 'FundingTx', id: any, email?: string | null } };

export type ProjectGoalOrderingUpdateMutationVariables = Exact<{
  input: ProjectGoalOrderingUpdateInput;
}>;


export type ProjectGoalOrderingUpdateMutation = { __typename?: 'Mutation', projectGoalOrderingUpdate: Array<(
    { __typename?: 'ProjectGoal' }
    & ProjectGoalsFragment
  )> };

export type ProjectGoalCreateMutationVariables = Exact<{
  input: ProjectGoalCreateInput;
}>;


export type ProjectGoalCreateMutation = { __typename?: 'Mutation', projectGoalCreate: Array<(
    { __typename?: 'ProjectGoal' }
    & ProjectGoalsFragment
  )> };

export type ProjectGoalUpdateMutationVariables = Exact<{
  input: ProjectGoalUpdateInput;
}>;


export type ProjectGoalUpdateMutation = { __typename?: 'Mutation', projectGoalUpdate: (
    { __typename?: 'ProjectGoal' }
    & ProjectGoalsFragment
  ) };

export type ProjectGoalDeleteMutationVariables = Exact<{
  projectGoalId: Scalars['BigInt']['input'];
}>;


export type ProjectGoalDeleteMutation = { __typename?: 'Mutation', projectGoalDelete: { __typename?: 'ProjectGoalDeleteResponse', success: boolean } };

export type ProjectRewardCurrencyUpdateMutationVariables = Exact<{
  input: ProjectRewardCurrencyUpdate;
}>;


export type ProjectRewardCurrencyUpdateMutation = { __typename?: 'Mutation', projectRewardCurrencyUpdate: Array<(
    { __typename?: 'ProjectReward' }
    & ProjectRewardFragment
  )> };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: (
    { __typename?: 'Project' }
    & ProjectPageBodyFragment
  ) };

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: (
    { __typename?: 'Project' }
    & ProjectUpdateFragment
  ) };

export type ProjectStatusUpdateMutationVariables = Exact<{
  input: ProjectStatusUpdate;
}>;


export type ProjectStatusUpdateMutation = { __typename?: 'Mutation', projectStatusUpdate: { __typename?: 'Project', id: any, status?: ProjectStatus | null } };

export type ProjectPublishMutationVariables = Exact<{
  input: ProjectPublishMutationInput;
}>;


export type ProjectPublishMutation = { __typename?: 'Mutation', projectPublish: { __typename?: 'Project', id: any, status?: ProjectStatus | null } };

export type ProjectDeleteMutationVariables = Exact<{
  input: DeleteProjectInput;
}>;


export type ProjectDeleteMutation = { __typename?: 'Mutation', projectDelete: { __typename?: 'ProjectDeleteResponse', message?: string | null, success: boolean } };

export type ProjectFollowMutationVariables = Exact<{
  input: ProjectFollowMutationInput;
}>;


export type ProjectFollowMutation = { __typename?: 'Mutation', projectFollow: boolean };

export type ProjectUnfollowMutationVariables = Exact<{
  input: ProjectFollowMutationInput;
}>;


export type ProjectUnfollowMutation = { __typename?: 'Mutation', projectUnfollow: boolean };

export type RewardUpdateMutationVariables = Exact<{
  input: UpdateProjectRewardInput;
}>;


export type RewardUpdateMutation = { __typename?: 'Mutation', projectRewardUpdate: (
    { __typename?: 'ProjectReward' }
    & ProjectRewardFragment
  ) };

export type RewardDeleteMutationVariables = Exact<{
  input: DeleteProjectRewardInput;
}>;


export type RewardDeleteMutation = { __typename?: 'Mutation', projectRewardDelete: boolean };

export type ProjectRewardCreateMutationVariables = Exact<{
  input: CreateProjectRewardInput;
}>;


export type ProjectRewardCreateMutation = { __typename?: 'Mutation', projectRewardCreate: (
    { __typename?: 'ProjectReward' }
    & ProjectRewardFragment
  ) };

export type ProjectTagAddMutationVariables = Exact<{
  input: ProjectTagMutationInput;
}>;


export type ProjectTagAddMutation = { __typename?: 'Mutation', projectTagAdd: Array<{ __typename?: 'Tag', id: number, label: string }> };

export type ProjectTagRemoveMutationVariables = Exact<{
  input: ProjectTagMutationInput;
}>;


export type ProjectTagRemoveMutation = { __typename?: 'Mutation', projectTagRemove: Array<{ __typename?: 'Tag', id: number, label: string }> };

export type ProjectTagCreateMutationVariables = Exact<{
  input: TagCreateInput;
}>;


export type ProjectTagCreateMutation = { __typename?: 'Mutation', tagCreate: { __typename?: 'Tag', id: number, label: string } };

export type CreateWalletMutationVariables = Exact<{
  input: CreateWalletInput;
}>;


export type CreateWalletMutation = { __typename?: 'Mutation', walletCreate: (
    { __typename?: 'Wallet' }
    & ProjectWalletConnectionDetailsFragment
  ) };

export type UpdateWalletMutationVariables = Exact<{
  input: UpdateWalletInput;
}>;


export type UpdateWalletMutation = { __typename?: 'Mutation', walletUpdate: (
    { __typename?: 'Wallet' }
    & ProjectWalletConnectionDetailsFragment
  ) };

export type AffiliateLinksGetQueryVariables = Exact<{
  input: GetAffiliateLinksInput;
}>;


export type AffiliateLinksGetQuery = { __typename?: 'Query', affiliateLinksGet: Array<(
    { __typename?: 'AffiliateLink' }
    & ProjectAffiliateLinkFragment
  )> };

export type ProjectEntriesQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
  input?: InputMaybe<ProjectEntriesGetInput>;
}>;


export type ProjectEntriesQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', id: any, entries: Array<(
      { __typename?: 'Entry' }
      & ProjectEntryFragment
    )> } | null };

export type ProjectUnplublishedEntriesQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectUnplublishedEntriesQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', id: any, entries: Array<(
      { __typename?: 'Entry' }
      & ProjectEntryFragment
    )> } | null };

export type ProjectEntryQueryVariables = Exact<{
  entryId: Scalars['BigInt']['input'];
}>;


export type ProjectEntryQuery = { __typename?: 'Query', entry?: (
    { __typename?: 'Entry' }
    & ProjectEntryViewFragment
  ) | null };

export type ProjectPageFundersQueryVariables = Exact<{
  input: GetFundersInput;
}>;


export type ProjectPageFundersQuery = { __typename?: 'Query', fundersGet: Array<(
    { __typename?: 'Funder' }
    & ProjectFunderFragment
  )> };

export type ProjectLeaderboardContributorsGetQueryVariables = Exact<{
  input: ProjectLeaderboardContributorsGetInput;
}>;


export type ProjectLeaderboardContributorsGetQuery = { __typename?: 'Query', projectLeaderboardContributorsGet: Array<(
    { __typename?: 'ProjectLeaderboardContributorsRow' }
    & ProjectLeaderboardContributorsFragment
  )> };

export type ProjectPageFundingTxQueryVariables = Exact<{
  input?: InputMaybe<GetFundingTxsInput>;
}>;


export type ProjectPageFundingTxQuery = { __typename?: 'Query', fundingTxsGet?: { __typename?: 'FundingTxsGetResponse', fundingTxs: Array<(
      { __typename?: 'FundingTx' }
      & ProjectFundingTxFragment
    )> } | null };

export type FundingTxWithInvoiceStatusQueryVariables = Exact<{
  fundingTxID: Scalars['BigInt']['input'];
}>;


export type FundingTxWithInvoiceStatusQuery = { __typename?: 'Query', fundingTx: (
    { __typename?: 'FundingTx' }
    & FundingTxWithInvoiceStatusFragment
  ) };

export type FundingTxForDownloadInvoiceQueryVariables = Exact<{
  fundingTxId: Scalars['BigInt']['input'];
}>;


export type FundingTxForDownloadInvoiceQuery = { __typename?: 'Query', fundingTx: (
    { __typename?: 'FundingTx' }
    & FundingTxForDownloadInvoiceFragment
  ) };

export type ProjectInProgressGoalsQueryVariables = Exact<{
  input: GetProjectGoalsInput;
}>;


export type ProjectInProgressGoalsQuery = { __typename?: 'Query', projectGoals: { __typename?: 'ProjectGoals', inProgress: Array<(
      { __typename?: 'ProjectGoal' }
      & ProjectGoalsFragment
    )> } };

export type ProjectCompletedGoalsQueryVariables = Exact<{
  input: GetProjectGoalsInput;
}>;


export type ProjectCompletedGoalsQuery = { __typename?: 'Query', projectGoals: { __typename?: 'ProjectGoals', completed: Array<(
      { __typename?: 'ProjectGoal' }
      & ProjectGoalsFragment
    )> } };

export type ProjectPageBodyQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectPageBodyQuery = { __typename?: 'Query', projectGet?: (
    { __typename?: 'Project' }
    & ProjectPageBodyFragment
  ) | null };

export type ProjectPageDetailsQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectPageDetailsQuery = { __typename?: 'Query', projectGet?: (
    { __typename?: 'Project' }
    & ProjectPageDetailsFragment
  ) | null };

export type ProjectPageHeaderSummaryQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectPageHeaderSummaryQuery = { __typename?: 'Query', projectGet?: (
    { __typename?: 'Project' }
    & ProjectHeaderSummaryFragment
  ) | null };

export type ProjectPageWalletsQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectPageWalletsQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', wallets: Array<(
      { __typename?: 'Wallet' }
      & ProjectPageWalletFragment
    )> } | null };

export type ProjectWalletConnectionDetailsQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectWalletConnectionDetailsQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', wallets: Array<(
      { __typename?: 'Wallet' }
      & ProjectWalletConnectionDetailsFragment
    )> } | null };

export type ProjectStatsGetInsightQueryVariables = Exact<{
  input: GetProjectStatsInput;
}>;


export type ProjectStatsGetInsightQuery = { __typename?: 'Query', projectStatsGet: (
    { __typename?: 'ProjectStats' }
    & ProjectStatsForInsightsPageFragment
  ) };

export type ProjectHistoryStatsGetQueryVariables = Exact<{
  input: GetProjectStatsInput;
}>;


export type ProjectHistoryStatsGetQuery = { __typename?: 'Query', projectStatsGet: (
    { __typename?: 'ProjectStats' }
    & ProjectHistoryStatsFragment
  ) };

export type ProjectRewardSoldGraphStatsGetQueryVariables = Exact<{
  input: GetProjectStatsInput;
}>;


export type ProjectRewardSoldGraphStatsGetQuery = { __typename?: 'Query', projectStatsGet: (
    { __typename?: 'ProjectStats' }
    & ProjectRewardSoldGraphStatsFragment
  ) };

export type ProjectFundingMethodStatsGetQueryVariables = Exact<{
  input: GetProjectStatsInput;
}>;


export type ProjectFundingMethodStatsGetQuery = { __typename?: 'Query', projectStatsGet: (
    { __typename?: 'ProjectStats' }
    & ProjectFundingMethodStatsFragment
  ) };

export type ProjectRewardsQueryVariables = Exact<{
  input: GetProjectRewardInput;
}>;


export type ProjectRewardsQuery = { __typename?: 'Query', projectRewardsGet: Array<(
    { __typename?: 'ProjectReward' }
    & ProjectRewardFragment
  )> };

export type ProjectRewardQueryVariables = Exact<{
  getProjectRewardId: Scalars['BigInt']['input'];
}>;


export type ProjectRewardQuery = { __typename?: 'Query', getProjectReward: (
    { __typename?: 'ProjectReward' }
    & ProjectRewardFragment
  ) };

export type FundingTxStatusUpdatedSubscriptionVariables = Exact<{
  input?: InputMaybe<FundingTxStatusUpdatedInput>;
}>;


export type FundingTxStatusUpdatedSubscription = { __typename?: 'Subscription', fundingTxStatusUpdated: { __typename?: 'FundingTxStatusUpdatedSubscriptionResponse', fundingTx: (
      { __typename?: 'FundingTx' }
      & FundingTxFragment
    ) } };

export const EmailUpdateUserFragmentDoc = gql`
    fragment EmailUpdateUser on User {
  email
  isEmailVerified
  id
}
    `;
export const OtpResponseFragmentDoc = gql`
    fragment OTPResponse on OTPResponse {
  otpVerificationToken
  expiresAt
}
    `;
export const UserForAvatarFragmentDoc = gql`
    fragment UserForAvatar on User {
  id
  imageUrl
  email
  username
}
    `;
export const EntryFragmentDoc = gql`
    fragment Entry on Entry {
  id
  title
  description
  image
  status
  content
  createdAt
  updatedAt
  publishedAt
  status
  fundersCount
  amountFunded
  type
  creator {
    ...UserForAvatar
  }
  project {
    id
    title
    name
    image
  }
}
    ${UserForAvatarFragmentDoc}`;
export const ProjectDefaultGoalFragmentDoc = gql`
    fragment ProjectDefaultGoal on ProjectGoal {
  id
  title
  targetAmount
  currency
  amountContributed
}
    `;
export const ProjectGoalFragmentDoc = gql`
    fragment ProjectGoal on ProjectGoal {
  id
  title
  description
  targetAmount
  currency
  status
  projectId
  amountContributed
  createdAt
  updatedAt
  hasReceivedContribution
  emojiUnifiedCode
}
    `;
export const BoardVoteGrantsFragmentFragmentDoc = gql`
    fragment BoardVoteGrantsFragment on BoardVoteGrant {
  id
  title
  name
  image
  shortDescription
  description
  balance
  status
  type
  statuses {
    status
    endAt
    startAt
  }
  sponsors {
    id
    name
    url
    image
    status
    createdAt
  }
}
    `;
export const CommunityVoteGrantsFragmentFragmentDoc = gql`
    fragment CommunityVoteGrantsFragment on CommunityVoteGrant {
  id
  title
  name
  image
  shortDescription
  description
  balance
  status
  type
  statuses {
    status
    endAt
    startAt
  }
  sponsors {
    id
    name
    url
    image
    status
    createdAt
  }
  votes {
    voteCount
    voterCount
  }
  votingSystem
  distributionSystem
}
    `;
export const BoardVoteGrantFragmentFragmentDoc = gql`
    fragment BoardVoteGrantFragment on BoardVoteGrant {
  id
  title
  name
  shortDescription
  description
  balance
  status
  image
  type
  statuses {
    status
    endAt
    startAt
  }
  applicants {
    contributorsCount
    contributors(input: {pagination: {take: 50}}) {
      user {
        id
        imageUrl
      }
      amount
      timesContributed
    }
    project {
      id
      name
      title
      thumbnailImage
      shortDescription
      description
      wallets {
        id
      }
    }
    status
    funding {
      communityFunding
      grantAmount
      grantAmountDistributed
    }
  }
  sponsors {
    id
    name
    url
    image
    status
    createdAt
  }
  boardMembers {
    user {
      username
      imageUrl
      id
      externalAccounts {
        accountType
        externalId
        externalUsername
        id
        public
      }
    }
  }
}
    `;
export const CommunityVoteGrantFragmentFragmentDoc = gql`
    fragment CommunityVoteGrantFragment on CommunityVoteGrant {
  id
  title
  name
  shortDescription
  description
  balance
  status
  image
  type
  statuses {
    status
    endAt
    startAt
  }
  applicants {
    contributorsCount
    contributors {
      user {
        id
        imageUrl
        username
      }
      amount
      timesContributed
      voteCount
    }
    project {
      id
      name
      title
      thumbnailImage
      shortDescription
      description
      wallets {
        id
      }
    }
    status
    funding {
      communityFunding
      grantAmount
      grantAmountDistributed
    }
    voteCount
  }
  sponsors {
    id
    name
    url
    image
    status
    createdAt
  }
  votes {
    voteCount
    voterCount
  }
  votingSystem
  distributionSystem
}
    `;
export const OrderItemFragmentDoc = gql`
    fragment OrderItem on OrderItem {
  item {
    id
    name
    cost
    rewardCurrency
    category
  }
  quantity
  unitPriceInSats
}
    `;
export const OrderFragmentDoc = gql`
    fragment Order on Order {
  confirmedAt
  createdAt
  deliveredAt
  id
  shippedAt
  status
  totalInSats
  updatedAt
  user {
    id
    imageUrl
    username
    email
  }
  items {
    ...OrderItem
  }
  fundingTx {
    id
    bitcoinQuote {
      quoteCurrency
      quote
    }
    amount
    amountPaid
    donationAmount
    address
    email
    fundingType
    invoiceStatus
    isAnonymous
    status
    uuid
  }
}
    ${OrderItemFragmentDoc}`;
export const FundingTxOrderFragmentDoc = gql`
    fragment FundingTxOrder on FundingTx {
  id
  invoiceStatus
  donationAmount
  amountPaid
  amount
  email
  paidAt
  status
  invoiceId
  uuid
  affiliateFeeInSats
  bitcoinQuote {
    quoteCurrency
    quote
  }
  funder {
    user {
      id
      imageUrl
      username
      externalAccounts {
        id
        externalUsername
        externalId
        accountType
        public
      }
    }
  }
  order {
    id
    referenceCode
    totalInSats
    items {
      ...OrderItem
    }
  }
}
    ${OrderItemFragmentDoc}`;
export const PaginationFragmentDoc = gql`
    fragment Pagination on CursorPaginationResponse {
  take
  cursor {
    id
  }
  count
}
    `;
export const ProjectNostrKeysFragmentDoc = gql`
    fragment ProjectNostrKeys on Project {
  id
  name
  keys {
    nostrKeys {
      privateKey {
        nsec
      }
      publicKey {
        npub
      }
    }
  }
}
    `;
export const ProjectKeysFragmentDoc = gql`
    fragment ProjectKeys on ProjectKeys {
  nostrKeys {
    publicKey {
      hex
      npub
    }
  }
}
    `;
export const ExternalAccountFragmentDoc = gql`
    fragment ExternalAccount on ExternalAccount {
  id
  accountType
  externalUsername
  externalId
  public
}
    `;
export const ProjectOwnerUserFragmentDoc = gql`
    fragment ProjectOwnerUser on User {
  id
  username
  imageUrl
  email
  ranking
  isEmailVerified
  externalAccounts {
    ...ExternalAccount
  }
  hasSocialAccount
}
    ${ExternalAccountFragmentDoc}`;
export const ProjectRewardForCreateUpdateFragmentDoc = gql`
    fragment ProjectRewardForCreateUpdate on ProjectReward {
  id
  name
  description
  cost
  image
  deleted
  stock
  sold
  hasShipping
  maxClaimable
  isAddon
  isHidden
  category
  preOrder
  estimatedAvailabilityDate
  estimatedDeliveryInWeeks
}
    `;
export const EntryForProjectFragmentDoc = gql`
    fragment EntryForProject on Entry {
  id
  title
  description
  image
  type
  fundersCount
  amountFunded
  status
  createdAt
  publishedAt
  creator {
    ...UserForAvatar
  }
}
    ${UserForAvatarFragmentDoc}`;
export const ProjectWalletFragmentDoc = gql`
    fragment ProjectWallet on Wallet {
  id
  name
  feePercentage
  state {
    status
    statusCode
  }
  connectionDetails {
    ... on LightningAddressConnectionDetails {
      lightningAddress
    }
    ... on LndConnectionDetailsPrivate {
      macaroon
      tlsCertificate
      hostname
      grpcPort
      lndNodeType
      pubkey
    }
    ... on LndConnectionDetailsPublic {
      pubkey
    }
  }
}
    `;
export const ProjectCommunityVoteGrantFragmentDoc = gql`
    fragment ProjectCommunityVoteGrant on CommunityVoteGrant {
  id
  status
  title
}
    `;
export const ProjectGrantApplicationsFragmentDoc = gql`
    fragment ProjectGrantApplications on Project {
  grantApplications {
    id
    status
    grant {
      ...ProjectCommunityVoteGrant
    }
  }
}
    ${ProjectCommunityVoteGrantFragmentDoc}`;
export const ProjectFragmentDoc = gql`
    fragment Project on Project {
  id
  title
  name
  type
  shortDescription
  description
  defaultGoalId
  balance
  balanceUsdCent
  createdAt
  updatedAt
  image
  thumbnailImage
  links
  status
  rewardCurrency
  fundersCount
  fundingTxsCount
  keys {
    ...ProjectKeys
  }
  location {
    country {
      name
      code
    }
    region
  }
  tags {
    id
    label
  }
  owners {
    id
    user {
      ...ProjectOwnerUser
    }
  }
  rewards {
    ...ProjectRewardForCreateUpdate
  }
  ambassadors {
    id
    confirmed
    user {
      ...UserForAvatar
    }
  }
  sponsors {
    id
    url
    image
    user {
      ...UserForAvatar
    }
  }
  entries(input: $input) {
    ...EntryForProject
  }
  wallets {
    ...ProjectWallet
  }
  followers {
    id
    username
  }
  keys {
    nostrKeys {
      publicKey {
        npub
      }
    }
  }
  ...ProjectGrantApplications
}
    ${ProjectKeysFragmentDoc}
${ProjectOwnerUserFragmentDoc}
${ProjectRewardForCreateUpdateFragmentDoc}
${UserForAvatarFragmentDoc}
${EntryForProjectFragmentDoc}
${ProjectWalletFragmentDoc}
${ProjectGrantApplicationsFragmentDoc}`;
export const UserMeFragmentDoc = gql`
    fragment UserMe on User {
  id
  username
  imageUrl
  email
  ranking
  isEmailVerified
  hasSocialAccount
  externalAccounts {
    ...ExternalAccount
  }
  ownerOf {
    project {
      id
      name
      image
      thumbnailImage
      title
      status
      createdAt
    }
  }
}
    ${ExternalAccountFragmentDoc}`;
export const ProjectForSubscriptionFragmentDoc = gql`
    fragment ProjectForSubscription on Project {
  id
  title
  name
  thumbnailImage
  owners {
    id
    user {
      ...UserMe
    }
  }
}
    ${UserMeFragmentDoc}`;
export const FunderWithUserFragmentDoc = gql`
    fragment FunderWithUser on Funder {
  amountFunded
  confirmed
  id
  confirmedAt
  timesFunded
  user {
    id
    username
    hasSocialAccount
    externalAccounts {
      externalId
      externalUsername
      id
      accountType
    }
    imageUrl
  }
}
    `;
export const WalletLimitsFragmentDoc = gql`
    fragment WalletLimits on WalletLimits {
  contribution {
    min
    max
    offChain {
      min
      max
    }
    onChain {
      min
      max
    }
  }
}
    `;
export const EntryForLandingPageFragmentDoc = gql`
    fragment EntryForLandingPage on Entry {
  amountFunded
  entryFundersCount: fundersCount
  entryDescription: description
  id
  image
  title
  project {
    id
    name
    thumbnailImage
    title
  }
  creator {
    ...UserForAvatar
  }
}
    ${UserForAvatarFragmentDoc}`;
export const ProjectForLandingPageFragmentDoc = gql`
    fragment ProjectForLandingPage on Project {
  id
  name
  balance
  balanceUsdCent
  fundersCount
  thumbnailImage
  shortDescription
  title
  status
}
    `;
export const FundingTxForLandingPageFragmentDoc = gql`
    fragment FundingTxForLandingPage on FundingTx {
  id
  comment
  amount
  funder {
    id
    amountFunded
    timesFunded
    confirmedAt
    user {
      id
      username
      imageUrl
      externalAccounts {
        externalUsername
        public
        accountType
      }
    }
  }
  paidAt
  onChain
  media
  source
  method
  projectId
  sourceResource {
    ... on Project {
      id
      name
      title
      image
      createdAt
      thumbnailImage
    }
    ... on Entry {
      createdAt
      id
      image
      title
    }
  }
}
    `;
export const ProjectRewardForLandingPageFragmentDoc = gql`
    fragment ProjectRewardForLandingPage on ProjectReward {
  cost
  description
  id
  image
  rewardName: name
  sold
  stock
  maxClaimable
  rewardProject: project {
    id
    name
    title
    rewardCurrency
    owners {
      id
      user {
        id
        username
        imageUrl
      }
    }
  }
}
    `;
export const ActivityForLandingPageFragmentDoc = gql`
    fragment ActivityForLandingPage on Activity {
  id
  createdAt
  resource {
    ... on Entry {
      ...EntryForLandingPage
    }
    ... on Project {
      ...ProjectForLandingPage
    }
    ... on FundingTx {
      ...FundingTxForLandingPage
    }
    ... on ProjectReward {
      ...ProjectRewardForLandingPage
    }
  }
}
    ${EntryForLandingPageFragmentDoc}
${ProjectForLandingPageFragmentDoc}
${FundingTxForLandingPageFragmentDoc}
${ProjectRewardForLandingPageFragmentDoc}`;
export const FundingTxForUserContributionFragmentDoc = gql`
    fragment FundingTxForUserContribution on FundingTx {
  id
  comment
  amount
  funder {
    id
    user {
      id
      username
      imageUrl
      externalAccounts {
        id
        externalUsername
        public
        accountType
      }
    }
  }
  paidAt
  onChain
  media
  source
  method
  projectId
  sourceResource {
    ... on Project {
      id
      createdAt
      name
      title
      thumbnailImage
      image
    }
    ... on Entry {
      id
      createdAt
      image
    }
  }
}
    `;
export const RewardForLandingPageFragmentDoc = gql`
    fragment RewardForLandingPage on ProjectReward {
  id
  image
  cost
  name
  description
  project {
    rewardCurrency
    id
    name
    title
    thumbnailImage
  }
}
    `;
export const SummaryBannerFragmentFragmentDoc = gql`
    fragment SummaryBannerFragment on ProjectsSummary {
  fundedTotal
  fundersCount
  projectsCount
}
    `;
export const TopContributorsFragmentFragmentDoc = gql`
    fragment TopContributorsFragment on GlobalContributorLeaderboardRow {
  contributionsCount
  contributionsTotal
  contributionsTotalUsd
  projectsContributedCount
  userId
  username
  userImageUrl
}
    `;
export const TopProjectsFragmentFragmentDoc = gql`
    fragment TopProjectsFragment on GlobalProjectLeaderboardRow {
  projectName
  projectTitle
  projectThumbnailUrl
  contributionsTotal
  contributionsTotalUsd
  contributionsCount
  contributorsCount
}
    `;
export const OrdersStatsFragmentFragmentDoc = gql`
    fragment OrdersStatsFragment on OrdersStatsBase {
  projectRewards {
    count
  }
  projectRewardsGroupedByProjectRewardId {
    count
    projectReward {
      id
      name
      image
    }
  }
}
    `;
export const ProjectContributionsStatsFragmentDoc = gql`
    fragment ProjectContributionsStats on ProjectContributionsStatsBase {
  contributions {
    total
    totalUsd
  }
}
    `;
export const ProjectStatsFragmentDoc = gql`
    fragment ProjectStats on ProjectStats {
  current {
    projectContributionsStats {
      ...ProjectContributionsStats
    }
  }
}
    ${ProjectContributionsStatsFragmentDoc}`;
export const ProjectAvatarFragmentDoc = gql`
    fragment ProjectAvatar on Project {
  id
  name
  thumbnailImage
  title
}
    `;
export const UserProjectFunderFragmentDoc = gql`
    fragment UserProjectFunder on Funder {
  amountFunded
  confirmedAt
  confirmed
  id
  fundingTxs {
    amountPaid
    comment
    media
    paidAt
    onChain
  }
}
    `;
export const UserProjectContributionsFragmentDoc = gql`
    fragment UserProjectContributions on UserProjectContribution {
  project {
    ...ProjectAvatar
  }
  funder {
    ...UserProjectFunder
  }
}
    ${ProjectAvatarFragmentDoc}
${UserProjectFunderFragmentDoc}`;
export const ProfileOrderItemFragmentDoc = gql`
    fragment ProfileOrderItem on OrderItem {
  item {
    id
    name
    cost
    rewardCurrency
    description
    image
    category
  }
  quantity
  unitPriceInSats
}
    `;
export const ProfileOrderFragmentDoc = gql`
    fragment ProfileOrder on Order {
  id
  referenceCode
  totalInSats
  status
  confirmedAt
  updatedAt
  items {
    ...ProfileOrderItem
  }
  fundingTx {
    id
    bitcoinQuote {
      quote
      quoteCurrency
    }
    amountPaid
    amount
    status
    onChain
    sourceResource {
      ... on Project {
        ...ProjectAvatar
      }
    }
  }
}
    ${ProfileOrderItemFragmentDoc}
${ProjectAvatarFragmentDoc}`;
export const NotificationConfigurationFragmentDoc = gql`
    fragment NotificationConfiguration on NotificationConfiguration {
  id
  name
  description
  value
  type
  options
}
    `;
export const NotificationSettingsFragmentDoc = gql`
    fragment NotificationSettings on NotificationSettings {
  notificationType
  isEnabled
  configurations {
    ...NotificationConfiguration
  }
}
    ${NotificationConfigurationFragmentDoc}`;
export const ProfileNotificationsSettingsFragmentDoc = gql`
    fragment ProfileNotificationsSettings on ProfileNotificationSettings {
  userSettings {
    userId
    notificationSettings {
      ...NotificationSettings
    }
  }
  creatorSettings {
    userId
    project {
      id
      title
      image
    }
    notificationSettings {
      ...NotificationSettings
    }
  }
}
    ${NotificationSettingsFragmentDoc}`;
export const UserNotificationsSettingsFragmentDoc = gql`
    fragment UserNotificationsSettings on ProfileNotificationSettings {
  userSettings {
    userId
    notificationSettings {
      ...NotificationSettings
    }
  }
}
    ${NotificationSettingsFragmentDoc}`;
export const ProjectForProfilePageFragmentDoc = gql`
    fragment ProjectForProfilePage on Project {
  id
  name
  balance
  fundersCount
  thumbnailImage
  title
  shortDescription
  createdAt
  status
  rewardsCount
  wallets {
    id
    name
    state {
      status
      statusCode
    }
  }
}
    `;
export const ProjectNotificationSettingsFragmentDoc = gql`
    fragment ProjectNotificationSettings on CreatorNotificationSettings {
  userId
  project {
    id
    title
    image
  }
  notificationSettings {
    notificationType
    isEnabled
    configurations {
      id
      name
      description
      value
      type
      options
    }
  }
}
    `;
export const UserForProfilePageFragmentDoc = gql`
    fragment UserForProfilePage on User {
  id
  bio
  username
  imageUrl
  ranking
  isEmailVerified
  externalAccounts {
    ...ExternalAccount
  }
}
    ${ExternalAccountFragmentDoc}`;
export const ProjectAffiliateLinkFragmentDoc = gql`
    fragment ProjectAffiliateLink on AffiliateLink {
  projectId
  label
  id
  email
  disabledAt
  createdAt
  disabled
  affiliateId
  lightningAddress
  affiliateFeePercentage
  stats {
    sales {
      total
      count
    }
  }
}
    `;
export const ProjectEntryFragmentDoc = gql`
    fragment ProjectEntry on Entry {
  id
  title
  description
  image
  type
  fundersCount
  amountFunded
  status
  createdAt
  publishedAt
}
    `;
export const ProjectEntryViewFragmentDoc = gql`
    fragment ProjectEntryView on Entry {
  id
  title
  description
  image
  type
  fundersCount
  amountFunded
  status
  createdAt
  publishedAt
  content
}
    `;
export const ProjectFunderFragmentDoc = gql`
    fragment ProjectFunder on Funder {
  id
  amountFunded
  timesFunded
  user {
    id
    imageUrl
    username
  }
}
    `;
export const ProjectLeaderboardContributorsFragmentDoc = gql`
    fragment ProjectLeaderboardContributors on ProjectLeaderboardContributorsRow {
  funderId
  contributionsTotalUsd
  contributionsTotal
  contributionsCount
  commentsCount
  user {
    id
    imageUrl
    username
  }
}
    `;
export const UserAvatarFragmentDoc = gql`
    fragment UserAvatar on User {
  id
  imageUrl
  username
}
    `;
export const ProjectFundingTxFragmentDoc = gql`
    fragment ProjectFundingTx on FundingTx {
  id
  amountPaid
  media
  comment
  paidAt
  bitcoinQuote {
    quote
    quoteCurrency
  }
  funder {
    id
    user {
      ...UserAvatar
    }
  }
}
    ${UserAvatarFragmentDoc}`;
export const FundingTxFragmentDoc = gql`
    fragment FundingTx on FundingTx {
  id
  uuid
  invoiceId
  paymentRequest
  amount
  status
  invoiceStatus
  comment
  media
  paidAt
  onChain
  address
  source
  method
  projectId
  creatorEmail
  createdAt
  bitcoinQuote {
    quote
    quoteCurrency
  }
  funder {
    id
    amountFunded
    timesFunded
    confirmedAt
    user {
      id
      username
      imageUrl
    }
  }
}
    `;
export const FundingTxWithInvoiceStatusFragmentDoc = gql`
    fragment FundingTxWithInvoiceStatus on FundingTx {
  id
  uuid
  invoiceId
  status
  onChain
  invoiceStatus
  invoiceStatus
  paymentRequest
  creatorEmail
}
    `;
export const FundingTxForDownloadInvoiceFragmentDoc = gql`
    fragment FundingTxForDownloadInvoice on FundingTx {
  id
  donationAmount
  amountPaid
  uuid
  funder {
    user {
      username
    }
  }
  projectId
  paidAt
  createdAt
  order {
    items {
      item {
        name
      }
      quantity
      unitPriceInSats
    }
    totalInSats
  }
  status
  bitcoinQuote {
    quote
    quoteCurrency
  }
}
    `;
export const ProjectGoalsFragmentDoc = gql`
    fragment ProjectGoals on ProjectGoal {
  id
  title
  description
  targetAmount
  currency
  status
  projectId
  amountContributed
  createdAt
  updatedAt
  completedAt
  hasReceivedContribution
  emojiUnifiedCode
}
    `;
export const ProjectPageCreatorFragmentDoc = gql`
    fragment ProjectPageCreator on User {
  id
  imageUrl
  username
  email
  externalAccounts {
    accountType
    externalUsername
    externalId
    id
    public
  }
}
    `;
export const ProjectPageBodyFragmentDoc = gql`
    fragment ProjectPageBody on Project {
  id
  name
  title
  type
  thumbnailImage
  image
  shortDescription
  description
  balance
  balanceUsdCent
  defaultGoalId
  status
  rewardCurrency
  createdAt
  goalsCount
  rewardsCount
  entriesCount
  keys {
    ...ProjectKeys
  }
  owners {
    id
    user {
      ...ProjectPageCreator
    }
  }
}
    ${ProjectKeysFragmentDoc}
${ProjectPageCreatorFragmentDoc}`;
export const ProjectLocationFragmentDoc = gql`
    fragment ProjectLocation on Location {
  country {
    code
    name
  }
  region
}
    `;
export const ProjectPageDetailsFragmentDoc = gql`
    fragment ProjectPageDetails on Project {
  id
  name
  links
  location {
    ...ProjectLocation
  }
  tags {
    id
    label
  }
}
    ${ProjectLocationFragmentDoc}`;
export const ProjectHeaderSummaryFragmentDoc = gql`
    fragment ProjectHeaderSummary on Project {
  followersCount
  fundersCount
  fundingTxsCount
}
    `;
export const ProjectUpdateFragmentDoc = gql`
    fragment ProjectUpdate on Project {
  id
  title
  name
  shortDescription
  description
  image
  thumbnailImage
  location {
    country {
      name
      code
    }
    region
  }
  status
  links
  rewardCurrency
}
    `;
export const ProjectStatsForInsightsPageFragmentDoc = gql`
    fragment ProjectStatsForInsightsPage on ProjectStats {
  current {
    projectViews {
      viewCount
      visitorCount
      referrers {
        value
        viewCount
        visitorCount
      }
      regions {
        value
        viewCount
        visitorCount
      }
    }
    projectFunderRewards {
      quantitySum
    }
    projectFunders {
      count
    }
    projectFundingTxs {
      amountSum
      count
    }
  }
  prevTimeRange {
    projectViews {
      viewCount
      visitorCount
    }
    projectFunderRewards {
      quantitySum
    }
    projectFunders {
      count
    }
    projectFundingTxs {
      amountSum
      count
    }
  }
}
    `;
export const ProjectHistoryStatsFragmentDoc = gql`
    fragment ProjectHistoryStats on ProjectStats {
  current {
    projectFundingTxs {
      amountGraph {
        dateTime
        sum
      }
    }
    projectViews {
      visitorGraph {
        viewCount
        visitorCount
        dateTime
      }
    }
  }
}
    `;
export const ProjectRewardSoldGraphStatsFragmentDoc = gql`
    fragment ProjectRewardSoldGraphStats on ProjectStats {
  current {
    projectFunderRewards {
      quantityGraph {
        dateTime
        rewardId
        rewardName
        sum
      }
    }
  }
}
    `;
export const ProjectFundingMethodStatsFragmentDoc = gql`
    fragment ProjectFundingMethodStats on ProjectStats {
  current {
    projectFundingTxs {
      methodSum {
        sum
        method
      }
    }
  }
}
    `;
export const ProjectRewardFragmentDoc = gql`
    fragment ProjectReward on ProjectReward {
  id
  name
  description
  cost
  image
  deleted
  stock
  sold
  hasShipping
  maxClaimable
  isAddon
  isHidden
  category
  preOrder
  estimatedAvailabilityDate
  estimatedDeliveryInWeeks
}
    `;
export const WalletContributionLimitsFragmentDoc = gql`
    fragment WalletContributionLimits on WalletContributionLimits {
  min
  max
  offChain {
    min
    max
  }
  onChain {
    min
    max
  }
}
    `;
export const ProjectPageWalletFragmentDoc = gql`
    fragment ProjectPageWallet on Wallet {
  id
  name
  feePercentage
  limits {
    contribution {
      ...WalletContributionLimits
    }
  }
  state {
    status
    statusCode
  }
}
    ${WalletContributionLimitsFragmentDoc}`;
export const ProjectWalletConnectionDetailsFragmentDoc = gql`
    fragment ProjectWalletConnectionDetails on Wallet {
  id
  connectionDetails {
    ... on LightningAddressConnectionDetails {
      lightningAddress
    }
    ... on LndConnectionDetailsPublic {
      pubkey
    }
    ... on LndConnectionDetailsPrivate {
      tlsCertificate
      pubkey
      macaroon
      lndNodeType
      hostname
      grpcPort
    }
  }
}
    `;
export const UserBadgeAwardDocument = gql`
    mutation UserBadgeAward($userBadgeId: BigInt!) {
  userBadgeAward(userBadgeId: $userBadgeId) {
    badgeAwardEventId
  }
}
    `;
export type UserBadgeAwardMutationFn = Apollo.MutationFunction<UserBadgeAwardMutation, UserBadgeAwardMutationVariables>;

/**
 * __useUserBadgeAwardMutation__
 *
 * To run a mutation, you first call `useUserBadgeAwardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserBadgeAwardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userBadgeAwardMutation, { data, loading, error }] = useUserBadgeAwardMutation({
 *   variables: {
 *      userBadgeId: // value for 'userBadgeId'
 *   },
 * });
 */
export function useUserBadgeAwardMutation(baseOptions?: Apollo.MutationHookOptions<UserBadgeAwardMutation, UserBadgeAwardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserBadgeAwardMutation, UserBadgeAwardMutationVariables>(UserBadgeAwardDocument, options);
      }
export type UserBadgeAwardMutationHookResult = ReturnType<typeof useUserBadgeAwardMutation>;
export type UserBadgeAwardMutationResult = Apollo.MutationResult<UserBadgeAwardMutation>;
export type UserBadgeAwardMutationOptions = Apollo.BaseMutationOptions<UserBadgeAwardMutation, UserBadgeAwardMutationVariables>;
export const SendOtpByEmailDocument = gql`
    mutation SendOTPByEmail($input: SendOtpByEmailInput!) {
  sendOTPByEmail(input: $input) {
    ...OTPResponse
  }
}
    ${OtpResponseFragmentDoc}`;
export type SendOtpByEmailMutationFn = Apollo.MutationFunction<SendOtpByEmailMutation, SendOtpByEmailMutationVariables>;

/**
 * __useSendOtpByEmailMutation__
 *
 * To run a mutation, you first call `useSendOtpByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpByEmailMutation, { data, loading, error }] = useSendOtpByEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendOtpByEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendOtpByEmailMutation, SendOtpByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOtpByEmailMutation, SendOtpByEmailMutationVariables>(SendOtpByEmailDocument, options);
      }
export type SendOtpByEmailMutationHookResult = ReturnType<typeof useSendOtpByEmailMutation>;
export type SendOtpByEmailMutationResult = Apollo.MutationResult<SendOtpByEmailMutation>;
export type SendOtpByEmailMutationOptions = Apollo.BaseMutationOptions<SendOtpByEmailMutation, SendOtpByEmailMutationVariables>;
export const UserEmailUpdateDocument = gql`
    mutation UserEmailUpdate($input: UserEmailUpdateInput!) {
  userEmailUpdate(input: $input) {
    ...EmailUpdateUser
  }
}
    ${EmailUpdateUserFragmentDoc}`;
export type UserEmailUpdateMutationFn = Apollo.MutationFunction<UserEmailUpdateMutation, UserEmailUpdateMutationVariables>;

/**
 * __useUserEmailUpdateMutation__
 *
 * To run a mutation, you first call `useUserEmailUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserEmailUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userEmailUpdateMutation, { data, loading, error }] = useUserEmailUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserEmailUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UserEmailUpdateMutation, UserEmailUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserEmailUpdateMutation, UserEmailUpdateMutationVariables>(UserEmailUpdateDocument, options);
      }
export type UserEmailUpdateMutationHookResult = ReturnType<typeof useUserEmailUpdateMutation>;
export type UserEmailUpdateMutationResult = Apollo.MutationResult<UserEmailUpdateMutation>;
export type UserEmailUpdateMutationOptions = Apollo.BaseMutationOptions<UserEmailUpdateMutation, UserEmailUpdateMutationVariables>;
export const UserEmailVerifyDocument = gql`
    mutation UserEmailVerify($input: EmailVerifyInput!) {
  userEmailVerify(input: $input)
}
    `;
export type UserEmailVerifyMutationFn = Apollo.MutationFunction<UserEmailVerifyMutation, UserEmailVerifyMutationVariables>;

/**
 * __useUserEmailVerifyMutation__
 *
 * To run a mutation, you first call `useUserEmailVerifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserEmailVerifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userEmailVerifyMutation, { data, loading, error }] = useUserEmailVerifyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserEmailVerifyMutation(baseOptions?: Apollo.MutationHookOptions<UserEmailVerifyMutation, UserEmailVerifyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserEmailVerifyMutation, UserEmailVerifyMutationVariables>(UserEmailVerifyDocument, options);
      }
export type UserEmailVerifyMutationHookResult = ReturnType<typeof useUserEmailVerifyMutation>;
export type UserEmailVerifyMutationResult = Apollo.MutationResult<UserEmailVerifyMutation>;
export type UserEmailVerifyMutationOptions = Apollo.BaseMutationOptions<UserEmailVerifyMutation, UserEmailVerifyMutationVariables>;
export const GrantApplyDocument = gql`
    mutation GrantApply($input: GrantApplyInput) {
  grantApply(input: $input) {
    status
  }
}
    `;
export type GrantApplyMutationFn = Apollo.MutationFunction<GrantApplyMutation, GrantApplyMutationVariables>;

/**
 * __useGrantApplyMutation__
 *
 * To run a mutation, you first call `useGrantApplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGrantApplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [grantApplyMutation, { data, loading, error }] = useGrantApplyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGrantApplyMutation(baseOptions?: Apollo.MutationHookOptions<GrantApplyMutation, GrantApplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GrantApplyMutation, GrantApplyMutationVariables>(GrantApplyDocument, options);
      }
export type GrantApplyMutationHookResult = ReturnType<typeof useGrantApplyMutation>;
export type GrantApplyMutationResult = Apollo.MutationResult<GrantApplyMutation>;
export type GrantApplyMutationOptions = Apollo.BaseMutationOptions<GrantApplyMutation, GrantApplyMutationVariables>;
export const OrderStatusUpdateDocument = gql`
    mutation OrderStatusUpdate($input: OrderStatusUpdateInput!) {
  orderStatusUpdate(input: $input) {
    status
    id
    shippedAt
    deliveredAt
  }
}
    `;
export type OrderStatusUpdateMutationFn = Apollo.MutationFunction<OrderStatusUpdateMutation, OrderStatusUpdateMutationVariables>;

/**
 * __useOrderStatusUpdateMutation__
 *
 * To run a mutation, you first call `useOrderStatusUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderStatusUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderStatusUpdateMutation, { data, loading, error }] = useOrderStatusUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderStatusUpdateMutation(baseOptions?: Apollo.MutationHookOptions<OrderStatusUpdateMutation, OrderStatusUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderStatusUpdateMutation, OrderStatusUpdateMutationVariables>(OrderStatusUpdateDocument, options);
      }
export type OrderStatusUpdateMutationHookResult = ReturnType<typeof useOrderStatusUpdateMutation>;
export type OrderStatusUpdateMutationResult = Apollo.MutationResult<OrderStatusUpdateMutation>;
export type OrderStatusUpdateMutationOptions = Apollo.BaseMutationOptions<OrderStatusUpdateMutation, OrderStatusUpdateMutationVariables>;
export const FundingConfirmDocument = gql`
    mutation FundingConfirm($input: FundingConfirmInput!) {
  fundingConfirm(input: $input) {
    id
    success
  }
}
    `;
export type FundingConfirmMutationFn = Apollo.MutationFunction<FundingConfirmMutation, FundingConfirmMutationVariables>;

/**
 * __useFundingConfirmMutation__
 *
 * To run a mutation, you first call `useFundingConfirmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFundingConfirmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fundingConfirmMutation, { data, loading, error }] = useFundingConfirmMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFundingConfirmMutation(baseOptions?: Apollo.MutationHookOptions<FundingConfirmMutation, FundingConfirmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FundingConfirmMutation, FundingConfirmMutationVariables>(FundingConfirmDocument, options);
      }
export type FundingConfirmMutationHookResult = ReturnType<typeof useFundingConfirmMutation>;
export type FundingConfirmMutationResult = Apollo.MutationResult<FundingConfirmMutation>;
export type FundingConfirmMutationOptions = Apollo.BaseMutationOptions<FundingConfirmMutation, FundingConfirmMutationVariables>;
export const UnlinkExternalAccountDocument = gql`
    mutation UnlinkExternalAccount($id: BigInt!) {
  unlinkExternalAccount(id: $id) {
    id
    username
    imageUrl
    externalAccounts {
      id
      accountType
      externalUsername
      externalId
      public
    }
  }
}
    `;
export type UnlinkExternalAccountMutationFn = Apollo.MutationFunction<UnlinkExternalAccountMutation, UnlinkExternalAccountMutationVariables>;

/**
 * __useUnlinkExternalAccountMutation__
 *
 * To run a mutation, you first call `useUnlinkExternalAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkExternalAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkExternalAccountMutation, { data, loading, error }] = useUnlinkExternalAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnlinkExternalAccountMutation(baseOptions?: Apollo.MutationHookOptions<UnlinkExternalAccountMutation, UnlinkExternalAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlinkExternalAccountMutation, UnlinkExternalAccountMutationVariables>(UnlinkExternalAccountDocument, options);
      }
export type UnlinkExternalAccountMutationHookResult = ReturnType<typeof useUnlinkExternalAccountMutation>;
export type UnlinkExternalAccountMutationResult = Apollo.MutationResult<UnlinkExternalAccountMutation>;
export type UnlinkExternalAccountMutationOptions = Apollo.BaseMutationOptions<UnlinkExternalAccountMutation, UnlinkExternalAccountMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    __typename
    id
    wallet {
      connectionDetails {
        ... on LightningAddressConnectionDetails {
          lightningAddress
        }
      }
    }
    bio
    email
    username
    imageUrl
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserDeleteDocument = gql`
    mutation UserDelete {
  userDelete {
    message
    success
  }
}
    `;
export type UserDeleteMutationFn = Apollo.MutationFunction<UserDeleteMutation, UserDeleteMutationVariables>;

/**
 * __useUserDeleteMutation__
 *
 * To run a mutation, you first call `useUserDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userDeleteMutation, { data, loading, error }] = useUserDeleteMutation({
 *   variables: {
 *   },
 * });
 */
export function useUserDeleteMutation(baseOptions?: Apollo.MutationHookOptions<UserDeleteMutation, UserDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserDeleteMutation, UserDeleteMutationVariables>(UserDeleteDocument, options);
      }
export type UserDeleteMutationHookResult = ReturnType<typeof useUserDeleteMutation>;
export type UserDeleteMutationResult = Apollo.MutationResult<UserDeleteMutation>;
export type UserDeleteMutationOptions = Apollo.BaseMutationOptions<UserDeleteMutation, UserDeleteMutationVariables>;
export const ActivitiesForLandingPageDocument = gql`
    query ActivitiesForLandingPage($input: GetActivitiesInput) {
  activitiesGet(input: $input) {
    activities {
      ...ActivityForLandingPage
    }
  }
}
    ${ActivityForLandingPageFragmentDoc}`;

/**
 * __useActivitiesForLandingPageQuery__
 *
 * To run a query within a React component, call `useActivitiesForLandingPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesForLandingPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesForLandingPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivitiesForLandingPageQuery(baseOptions?: Apollo.QueryHookOptions<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>(ActivitiesForLandingPageDocument, options);
      }
export function useActivitiesForLandingPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>(ActivitiesForLandingPageDocument, options);
        }
export function useActivitiesForLandingPageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>(ActivitiesForLandingPageDocument, options);
        }
export type ActivitiesForLandingPageQueryHookResult = ReturnType<typeof useActivitiesForLandingPageQuery>;
export type ActivitiesForLandingPageLazyQueryHookResult = ReturnType<typeof useActivitiesForLandingPageLazyQuery>;
export type ActivitiesForLandingPageSuspenseQueryHookResult = ReturnType<typeof useActivitiesForLandingPageSuspenseQuery>;
export type ActivitiesForLandingPageQueryResult = Apollo.QueryResult<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>;
export const BadgesDocument = gql`
    query Badges {
  badges {
    createdAt
    description
    id
    image
    name
    thumb
    uniqueName
  }
}
    `;

/**
 * __useBadgesQuery__
 *
 * To run a query within a React component, call `useBadgesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBadgesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBadgesQuery({
 *   variables: {
 *   },
 * });
 */
export function useBadgesQuery(baseOptions?: Apollo.QueryHookOptions<BadgesQuery, BadgesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BadgesQuery, BadgesQueryVariables>(BadgesDocument, options);
      }
export function useBadgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BadgesQuery, BadgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BadgesQuery, BadgesQueryVariables>(BadgesDocument, options);
        }
export function useBadgesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BadgesQuery, BadgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BadgesQuery, BadgesQueryVariables>(BadgesDocument, options);
        }
export type BadgesQueryHookResult = ReturnType<typeof useBadgesQuery>;
export type BadgesLazyQueryHookResult = ReturnType<typeof useBadgesLazyQuery>;
export type BadgesSuspenseQueryHookResult = ReturnType<typeof useBadgesSuspenseQuery>;
export type BadgesQueryResult = Apollo.QueryResult<BadgesQuery, BadgesQueryVariables>;
export const UserBadgesDocument = gql`
    query UserBadges($input: BadgesGetInput!) {
  userBadges(input: $input) {
    badge {
      name
      thumb
      uniqueName
      image
      id
      description
      createdAt
    }
    userId
    updatedAt
    status
    id
    fundingTxId
    createdAt
    badgeAwardEventId
  }
}
    `;

/**
 * __useUserBadgesQuery__
 *
 * To run a query within a React component, call `useUserBadgesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBadgesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBadgesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserBadgesQuery(baseOptions: Apollo.QueryHookOptions<UserBadgesQuery, UserBadgesQueryVariables> & ({ variables: UserBadgesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserBadgesQuery, UserBadgesQueryVariables>(UserBadgesDocument, options);
      }
export function useUserBadgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserBadgesQuery, UserBadgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserBadgesQuery, UserBadgesQueryVariables>(UserBadgesDocument, options);
        }
export function useUserBadgesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserBadgesQuery, UserBadgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserBadgesQuery, UserBadgesQueryVariables>(UserBadgesDocument, options);
        }
export type UserBadgesQueryHookResult = ReturnType<typeof useUserBadgesQuery>;
export type UserBadgesLazyQueryHookResult = ReturnType<typeof useUserBadgesLazyQuery>;
export type UserBadgesSuspenseQueryHookResult = ReturnType<typeof useUserBadgesSuspenseQuery>;
export type UserBadgesQueryResult = Apollo.QueryResult<UserBadgesQuery, UserBadgesQueryVariables>;
export const EntryForLandingPageDocument = gql`
    query EntryForLandingPage($entryID: BigInt!) {
  entry(id: $entryID) {
    ...EntryForLandingPage
  }
}
    ${EntryForLandingPageFragmentDoc}`;

/**
 * __useEntryForLandingPageQuery__
 *
 * To run a query within a React component, call `useEntryForLandingPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntryForLandingPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntryForLandingPageQuery({
 *   variables: {
 *      entryID: // value for 'entryID'
 *   },
 * });
 */
export function useEntryForLandingPageQuery(baseOptions: Apollo.QueryHookOptions<EntryForLandingPageQuery, EntryForLandingPageQueryVariables> & ({ variables: EntryForLandingPageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntryForLandingPageQuery, EntryForLandingPageQueryVariables>(EntryForLandingPageDocument, options);
      }
export function useEntryForLandingPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntryForLandingPageQuery, EntryForLandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntryForLandingPageQuery, EntryForLandingPageQueryVariables>(EntryForLandingPageDocument, options);
        }
export function useEntryForLandingPageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EntryForLandingPageQuery, EntryForLandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntryForLandingPageQuery, EntryForLandingPageQueryVariables>(EntryForLandingPageDocument, options);
        }
export type EntryForLandingPageQueryHookResult = ReturnType<typeof useEntryForLandingPageQuery>;
export type EntryForLandingPageLazyQueryHookResult = ReturnType<typeof useEntryForLandingPageLazyQuery>;
export type EntryForLandingPageSuspenseQueryHookResult = ReturnType<typeof useEntryForLandingPageSuspenseQuery>;
export type EntryForLandingPageQueryResult = Apollo.QueryResult<EntryForLandingPageQuery, EntryForLandingPageQueryVariables>;
export const EntryWithOwnersDocument = gql`
    query EntryWithOwners($id: BigInt!) {
  entry(id: $id) {
    id
    title
    description
    image
    status
    content
    createdAt
    updatedAt
    publishedAt
    fundersCount
    status
    type
    creator {
      id
      username
      imageUrl
    }
    project {
      id
      title
      name
      owners {
        user {
          id
        }
      }
    }
  }
}
    `;

/**
 * __useEntryWithOwnersQuery__
 *
 * To run a query within a React component, call `useEntryWithOwnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntryWithOwnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntryWithOwnersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntryWithOwnersQuery(baseOptions: Apollo.QueryHookOptions<EntryWithOwnersQuery, EntryWithOwnersQueryVariables> & ({ variables: EntryWithOwnersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>(EntryWithOwnersDocument, options);
      }
export function useEntryWithOwnersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>(EntryWithOwnersDocument, options);
        }
export function useEntryWithOwnersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>(EntryWithOwnersDocument, options);
        }
export type EntryWithOwnersQueryHookResult = ReturnType<typeof useEntryWithOwnersQuery>;
export type EntryWithOwnersLazyQueryHookResult = ReturnType<typeof useEntryWithOwnersLazyQuery>;
export type EntryWithOwnersSuspenseQueryHookResult = ReturnType<typeof useEntryWithOwnersSuspenseQuery>;
export type EntryWithOwnersQueryResult = Apollo.QueryResult<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>;
export const EntriesDocument = gql`
    query Entries($input: GetEntriesInput!) {
  getEntries(input: $input) {
    id
    title
    description
    image
    fundersCount
    amountFunded
    type
    status
    project {
      title
      name
      image
    }
  }
}
    `;

/**
 * __useEntriesQuery__
 *
 * To run a query within a React component, call `useEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEntriesQuery(baseOptions: Apollo.QueryHookOptions<EntriesQuery, EntriesQueryVariables> & ({ variables: EntriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options);
      }
export function useEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options);
        }
export function useEntriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options);
        }
export type EntriesQueryHookResult = ReturnType<typeof useEntriesQuery>;
export type EntriesLazyQueryHookResult = ReturnType<typeof useEntriesLazyQuery>;
export type EntriesSuspenseQueryHookResult = ReturnType<typeof useEntriesSuspenseQuery>;
export type EntriesQueryResult = Apollo.QueryResult<EntriesQuery, EntriesQueryVariables>;
export const SignedUploadUrlDocument = gql`
    query SignedUploadUrl($input: FileUploadInput!) {
  getSignedUploadUrl(input: $input) {
    uploadUrl
    distributionUrl
  }
}
    `;

/**
 * __useSignedUploadUrlQuery__
 *
 * To run a query within a React component, call `useSignedUploadUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignedUploadUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignedUploadUrlQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignedUploadUrlQuery(baseOptions: Apollo.QueryHookOptions<SignedUploadUrlQuery, SignedUploadUrlQueryVariables> & ({ variables: SignedUploadUrlQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>(SignedUploadUrlDocument, options);
      }
export function useSignedUploadUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>(SignedUploadUrlDocument, options);
        }
export function useSignedUploadUrlSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>(SignedUploadUrlDocument, options);
        }
export type SignedUploadUrlQueryHookResult = ReturnType<typeof useSignedUploadUrlQuery>;
export type SignedUploadUrlLazyQueryHookResult = ReturnType<typeof useSignedUploadUrlLazyQuery>;
export type SignedUploadUrlSuspenseQueryHookResult = ReturnType<typeof useSignedUploadUrlSuspenseQuery>;
export type SignedUploadUrlQueryResult = Apollo.QueryResult<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>;
export const FundingTxsForLandingPageDocument = gql`
    query FundingTxsForLandingPage($input: GetFundingTxsInput) {
  fundingTxsGet(input: $input) {
    fundingTxs {
      ...FundingTxForLandingPage
    }
  }
}
    ${FundingTxForLandingPageFragmentDoc}`;

/**
 * __useFundingTxsForLandingPageQuery__
 *
 * To run a query within a React component, call `useFundingTxsForLandingPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFundingTxsForLandingPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFundingTxsForLandingPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFundingTxsForLandingPageQuery(baseOptions?: Apollo.QueryHookOptions<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>(FundingTxsForLandingPageDocument, options);
      }
export function useFundingTxsForLandingPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>(FundingTxsForLandingPageDocument, options);
        }
export function useFundingTxsForLandingPageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>(FundingTxsForLandingPageDocument, options);
        }
export type FundingTxsForLandingPageQueryHookResult = ReturnType<typeof useFundingTxsForLandingPageQuery>;
export type FundingTxsForLandingPageLazyQueryHookResult = ReturnType<typeof useFundingTxsForLandingPageLazyQuery>;
export type FundingTxsForLandingPageSuspenseQueryHookResult = ReturnType<typeof useFundingTxsForLandingPageSuspenseQuery>;
export type FundingTxsForLandingPageQueryResult = Apollo.QueryResult<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>;
export const FundingTxForUserContributionDocument = gql`
    query FundingTxForUserContribution($fundingTxId: BigInt!) {
  fundingTx(id: $fundingTxId) {
    ...FundingTxForUserContribution
  }
}
    ${FundingTxForUserContributionFragmentDoc}`;

/**
 * __useFundingTxForUserContributionQuery__
 *
 * To run a query within a React component, call `useFundingTxForUserContributionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFundingTxForUserContributionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFundingTxForUserContributionQuery({
 *   variables: {
 *      fundingTxId: // value for 'fundingTxId'
 *   },
 * });
 */
export function useFundingTxForUserContributionQuery(baseOptions: Apollo.QueryHookOptions<FundingTxForUserContributionQuery, FundingTxForUserContributionQueryVariables> & ({ variables: FundingTxForUserContributionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FundingTxForUserContributionQuery, FundingTxForUserContributionQueryVariables>(FundingTxForUserContributionDocument, options);
      }
export function useFundingTxForUserContributionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FundingTxForUserContributionQuery, FundingTxForUserContributionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FundingTxForUserContributionQuery, FundingTxForUserContributionQueryVariables>(FundingTxForUserContributionDocument, options);
        }
export function useFundingTxForUserContributionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FundingTxForUserContributionQuery, FundingTxForUserContributionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FundingTxForUserContributionQuery, FundingTxForUserContributionQueryVariables>(FundingTxForUserContributionDocument, options);
        }
export type FundingTxForUserContributionQueryHookResult = ReturnType<typeof useFundingTxForUserContributionQuery>;
export type FundingTxForUserContributionLazyQueryHookResult = ReturnType<typeof useFundingTxForUserContributionLazyQuery>;
export type FundingTxForUserContributionSuspenseQueryHookResult = ReturnType<typeof useFundingTxForUserContributionSuspenseQuery>;
export type FundingTxForUserContributionQueryResult = Apollo.QueryResult<FundingTxForUserContributionQuery, FundingTxForUserContributionQueryVariables>;
export const ProjectDefaultGoalDocument = gql`
    query ProjectDefaultGoal($input: GetProjectGoalsInput!) {
  projectGoals(input: $input) {
    inProgress {
      ...ProjectDefaultGoal
    }
  }
}
    ${ProjectDefaultGoalFragmentDoc}`;

/**
 * __useProjectDefaultGoalQuery__
 *
 * To run a query within a React component, call `useProjectDefaultGoalQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDefaultGoalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDefaultGoalQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectDefaultGoalQuery(baseOptions: Apollo.QueryHookOptions<ProjectDefaultGoalQuery, ProjectDefaultGoalQueryVariables> & ({ variables: ProjectDefaultGoalQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDefaultGoalQuery, ProjectDefaultGoalQueryVariables>(ProjectDefaultGoalDocument, options);
      }
export function useProjectDefaultGoalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDefaultGoalQuery, ProjectDefaultGoalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDefaultGoalQuery, ProjectDefaultGoalQueryVariables>(ProjectDefaultGoalDocument, options);
        }
export function useProjectDefaultGoalSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectDefaultGoalQuery, ProjectDefaultGoalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectDefaultGoalQuery, ProjectDefaultGoalQueryVariables>(ProjectDefaultGoalDocument, options);
        }
export type ProjectDefaultGoalQueryHookResult = ReturnType<typeof useProjectDefaultGoalQuery>;
export type ProjectDefaultGoalLazyQueryHookResult = ReturnType<typeof useProjectDefaultGoalLazyQuery>;
export type ProjectDefaultGoalSuspenseQueryHookResult = ReturnType<typeof useProjectDefaultGoalSuspenseQuery>;
export type ProjectDefaultGoalQueryResult = Apollo.QueryResult<ProjectDefaultGoalQuery, ProjectDefaultGoalQueryVariables>;
export const ProjectGoalsDocument = gql`
    query ProjectGoals($input: GetProjectGoalsInput!) {
  projectGoals(input: $input) {
    inProgress {
      ...ProjectGoal
    }
    completed {
      ...ProjectGoal
      completedAt
    }
  }
}
    ${ProjectGoalFragmentDoc}`;

/**
 * __useProjectGoalsQuery__
 *
 * To run a query within a React component, call `useProjectGoalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectGoalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectGoalsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectGoalsQuery(baseOptions: Apollo.QueryHookOptions<ProjectGoalsQuery, ProjectGoalsQueryVariables> & ({ variables: ProjectGoalsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectGoalsQuery, ProjectGoalsQueryVariables>(ProjectGoalsDocument, options);
      }
export function useProjectGoalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectGoalsQuery, ProjectGoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectGoalsQuery, ProjectGoalsQueryVariables>(ProjectGoalsDocument, options);
        }
export function useProjectGoalsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectGoalsQuery, ProjectGoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectGoalsQuery, ProjectGoalsQueryVariables>(ProjectGoalsDocument, options);
        }
export type ProjectGoalsQueryHookResult = ReturnType<typeof useProjectGoalsQuery>;
export type ProjectGoalsLazyQueryHookResult = ReturnType<typeof useProjectGoalsLazyQuery>;
export type ProjectGoalsSuspenseQueryHookResult = ReturnType<typeof useProjectGoalsSuspenseQuery>;
export type ProjectGoalsQueryResult = Apollo.QueryResult<ProjectGoalsQuery, ProjectGoalsQueryVariables>;
export const GrantsDocument = gql`
    query Grants {
  grants {
    ...BoardVoteGrantsFragment
    ...CommunityVoteGrantsFragment
  }
}
    ${BoardVoteGrantsFragmentFragmentDoc}
${CommunityVoteGrantsFragmentFragmentDoc}`;

/**
 * __useGrantsQuery__
 *
 * To run a query within a React component, call `useGrantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGrantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGrantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGrantsQuery(baseOptions?: Apollo.QueryHookOptions<GrantsQuery, GrantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GrantsQuery, GrantsQueryVariables>(GrantsDocument, options);
      }
export function useGrantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrantsQuery, GrantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GrantsQuery, GrantsQueryVariables>(GrantsDocument, options);
        }
export function useGrantsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GrantsQuery, GrantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GrantsQuery, GrantsQueryVariables>(GrantsDocument, options);
        }
export type GrantsQueryHookResult = ReturnType<typeof useGrantsQuery>;
export type GrantsLazyQueryHookResult = ReturnType<typeof useGrantsLazyQuery>;
export type GrantsSuspenseQueryHookResult = ReturnType<typeof useGrantsSuspenseQuery>;
export type GrantsQueryResult = Apollo.QueryResult<GrantsQuery, GrantsQueryVariables>;
export const GrantDocument = gql`
    query Grant($input: GrantGetInput!) {
  grant(input: $input) {
    ...BoardVoteGrantFragment
    ...CommunityVoteGrantFragment
  }
}
    ${BoardVoteGrantFragmentFragmentDoc}
${CommunityVoteGrantFragmentFragmentDoc}`;

/**
 * __useGrantQuery__
 *
 * To run a query within a React component, call `useGrantQuery` and pass it any options that fit your needs.
 * When your component renders, `useGrantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGrantQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGrantQuery(baseOptions: Apollo.QueryHookOptions<GrantQuery, GrantQueryVariables> & ({ variables: GrantQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GrantQuery, GrantQueryVariables>(GrantDocument, options);
      }
export function useGrantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrantQuery, GrantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GrantQuery, GrantQueryVariables>(GrantDocument, options);
        }
export function useGrantSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GrantQuery, GrantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GrantQuery, GrantQueryVariables>(GrantDocument, options);
        }
export type GrantQueryHookResult = ReturnType<typeof useGrantQuery>;
export type GrantLazyQueryHookResult = ReturnType<typeof useGrantLazyQuery>;
export type GrantSuspenseQueryHookResult = ReturnType<typeof useGrantSuspenseQuery>;
export type GrantQueryResult = Apollo.QueryResult<GrantQuery, GrantQueryVariables>;
export const GrantStatisticsDocument = gql`
    query GrantStatistics {
  grantStatistics {
    grants {
      amountFunded
      amountGranted
      count
    }
    applicants {
      countFunded
    }
  }
}
    `;

/**
 * __useGrantStatisticsQuery__
 *
 * To run a query within a React component, call `useGrantStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGrantStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGrantStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGrantStatisticsQuery(baseOptions?: Apollo.QueryHookOptions<GrantStatisticsQuery, GrantStatisticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GrantStatisticsQuery, GrantStatisticsQueryVariables>(GrantStatisticsDocument, options);
      }
export function useGrantStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrantStatisticsQuery, GrantStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GrantStatisticsQuery, GrantStatisticsQueryVariables>(GrantStatisticsDocument, options);
        }
export function useGrantStatisticsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GrantStatisticsQuery, GrantStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GrantStatisticsQuery, GrantStatisticsQueryVariables>(GrantStatisticsDocument, options);
        }
export type GrantStatisticsQueryHookResult = ReturnType<typeof useGrantStatisticsQuery>;
export type GrantStatisticsLazyQueryHookResult = ReturnType<typeof useGrantStatisticsLazyQuery>;
export type GrantStatisticsSuspenseQueryHookResult = ReturnType<typeof useGrantStatisticsSuspenseQuery>;
export type GrantStatisticsQueryResult = Apollo.QueryResult<GrantStatisticsQuery, GrantStatisticsQueryVariables>;
export const GrantGetDocument = gql`
    query GrantGet($input: GrantGetInput!) {
  grant(input: $input) {
    ... on BoardVoteGrant {
      applicants {
        project {
          name
          id
        }
      }
    }
    ... on CommunityVoteGrant {
      applicants {
        project {
          name
          id
        }
      }
    }
  }
}
    `;

/**
 * __useGrantGetQuery__
 *
 * To run a query within a React component, call `useGrantGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGrantGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGrantGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGrantGetQuery(baseOptions: Apollo.QueryHookOptions<GrantGetQuery, GrantGetQueryVariables> & ({ variables: GrantGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GrantGetQuery, GrantGetQueryVariables>(GrantGetDocument, options);
      }
export function useGrantGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrantGetQuery, GrantGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GrantGetQuery, GrantGetQueryVariables>(GrantGetDocument, options);
        }
export function useGrantGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GrantGetQuery, GrantGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GrantGetQuery, GrantGetQueryVariables>(GrantGetDocument, options);
        }
export type GrantGetQueryHookResult = ReturnType<typeof useGrantGetQuery>;
export type GrantGetLazyQueryHookResult = ReturnType<typeof useGrantGetLazyQuery>;
export type GrantGetSuspenseQueryHookResult = ReturnType<typeof useGrantGetSuspenseQuery>;
export type GrantGetQueryResult = Apollo.QueryResult<GrantGetQuery, GrantGetQueryVariables>;
export const OrdersGetDocument = gql`
    query OrdersGet($input: OrdersGetInput!) {
  ordersGet(input: $input) {
    pagination {
      ...Pagination
    }
    orders {
      ...Order
    }
  }
}
    ${PaginationFragmentDoc}
${OrderFragmentDoc}`;

/**
 * __useOrdersGetQuery__
 *
 * To run a query within a React component, call `useOrdersGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrdersGetQuery(baseOptions: Apollo.QueryHookOptions<OrdersGetQuery, OrdersGetQueryVariables> & ({ variables: OrdersGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersGetQuery, OrdersGetQueryVariables>(OrdersGetDocument, options);
      }
export function useOrdersGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersGetQuery, OrdersGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersGetQuery, OrdersGetQueryVariables>(OrdersGetDocument, options);
        }
export function useOrdersGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrdersGetQuery, OrdersGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrdersGetQuery, OrdersGetQueryVariables>(OrdersGetDocument, options);
        }
export type OrdersGetQueryHookResult = ReturnType<typeof useOrdersGetQuery>;
export type OrdersGetLazyQueryHookResult = ReturnType<typeof useOrdersGetLazyQuery>;
export type OrdersGetSuspenseQueryHookResult = ReturnType<typeof useOrdersGetSuspenseQuery>;
export type OrdersGetQueryResult = Apollo.QueryResult<OrdersGetQuery, OrdersGetQueryVariables>;
export const FundingTxsOrderGetDocument = gql`
    query FundingTxsOrderGet($input: GetFundingTxsInput) {
  fundingTxsGet(input: $input) {
    pagination {
      ...Pagination
    }
    fundingTxs {
      ...FundingTxOrder
    }
  }
}
    ${PaginationFragmentDoc}
${FundingTxOrderFragmentDoc}`;

/**
 * __useFundingTxsOrderGetQuery__
 *
 * To run a query within a React component, call `useFundingTxsOrderGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useFundingTxsOrderGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFundingTxsOrderGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFundingTxsOrderGetQuery(baseOptions?: Apollo.QueryHookOptions<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>(FundingTxsOrderGetDocument, options);
      }
export function useFundingTxsOrderGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>(FundingTxsOrderGetDocument, options);
        }
export function useFundingTxsOrderGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>(FundingTxsOrderGetDocument, options);
        }
export type FundingTxsOrderGetQueryHookResult = ReturnType<typeof useFundingTxsOrderGetQuery>;
export type FundingTxsOrderGetLazyQueryHookResult = ReturnType<typeof useFundingTxsOrderGetLazyQuery>;
export type FundingTxsOrderGetSuspenseQueryHookResult = ReturnType<typeof useFundingTxsOrderGetSuspenseQuery>;
export type FundingTxsOrderGetQueryResult = Apollo.QueryResult<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>;
export const FundingTxsOrderCountGetDocument = gql`
    query FundingTxsOrderCountGet($input: GetFundingTxsInput) {
  fundingTxsGet(input: $input) {
    pagination {
      ...Pagination
    }
  }
}
    ${PaginationFragmentDoc}`;

/**
 * __useFundingTxsOrderCountGetQuery__
 *
 * To run a query within a React component, call `useFundingTxsOrderCountGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useFundingTxsOrderCountGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFundingTxsOrderCountGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFundingTxsOrderCountGetQuery(baseOptions?: Apollo.QueryHookOptions<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>(FundingTxsOrderCountGetDocument, options);
      }
export function useFundingTxsOrderCountGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>(FundingTxsOrderCountGetDocument, options);
        }
export function useFundingTxsOrderCountGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>(FundingTxsOrderCountGetDocument, options);
        }
export type FundingTxsOrderCountGetQueryHookResult = ReturnType<typeof useFundingTxsOrderCountGetQuery>;
export type FundingTxsOrderCountGetLazyQueryHookResult = ReturnType<typeof useFundingTxsOrderCountGetLazyQuery>;
export type FundingTxsOrderCountGetSuspenseQueryHookResult = ReturnType<typeof useFundingTxsOrderCountGetSuspenseQuery>;
export type FundingTxsOrderCountGetQueryResult = Apollo.QueryResult<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>;
export const ProjectByNameOrIdDocument = gql`
    query ProjectByNameOrId($where: UniqueProjectQueryInput!, $input: ProjectEntriesGetInput) {
  projectGet(where: $where) {
    ...Project
  }
}
    ${ProjectFragmentDoc}`;

/**
 * __useProjectByNameOrIdQuery__
 *
 * To run a query within a React component, call `useProjectByNameOrIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectByNameOrIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectByNameOrIdQuery({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectByNameOrIdQuery(baseOptions: Apollo.QueryHookOptions<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables> & ({ variables: ProjectByNameOrIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>(ProjectByNameOrIdDocument, options);
      }
export function useProjectByNameOrIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>(ProjectByNameOrIdDocument, options);
        }
export function useProjectByNameOrIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>(ProjectByNameOrIdDocument, options);
        }
export type ProjectByNameOrIdQueryHookResult = ReturnType<typeof useProjectByNameOrIdQuery>;
export type ProjectByNameOrIdLazyQueryHookResult = ReturnType<typeof useProjectByNameOrIdLazyQuery>;
export type ProjectByNameOrIdSuspenseQueryHookResult = ReturnType<typeof useProjectByNameOrIdSuspenseQuery>;
export type ProjectByNameOrIdQueryResult = Apollo.QueryResult<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>;
export const ProjectsForSubscriptionDocument = gql`
    query ProjectsForSubscription($input: ProjectsGetQueryInput!) {
  projectsGet(input: $input) {
    projects {
      ...ProjectForSubscription
    }
  }
}
    ${ProjectForSubscriptionFragmentDoc}`;

/**
 * __useProjectsForSubscriptionQuery__
 *
 * To run a query within a React component, call `useProjectsForSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsForSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsForSubscriptionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectsForSubscriptionQuery(baseOptions: Apollo.QueryHookOptions<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables> & ({ variables: ProjectsForSubscriptionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables>(ProjectsForSubscriptionDocument, options);
      }
export function useProjectsForSubscriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables>(ProjectsForSubscriptionDocument, options);
        }
export function useProjectsForSubscriptionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables>(ProjectsForSubscriptionDocument, options);
        }
export type ProjectsForSubscriptionQueryHookResult = ReturnType<typeof useProjectsForSubscriptionQuery>;
export type ProjectsForSubscriptionLazyQueryHookResult = ReturnType<typeof useProjectsForSubscriptionLazyQuery>;
export type ProjectsForSubscriptionSuspenseQueryHookResult = ReturnType<typeof useProjectsForSubscriptionSuspenseQuery>;
export type ProjectsForSubscriptionQueryResult = Apollo.QueryResult<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables>;
export const ProjectsDocument = gql`
    query Projects($input: ProjectsGetQueryInput) {
  projectsGet(input: $input) {
    projects {
      id
      title
      name
      description
      balance
      createdAt
      status
      image
    }
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export function useProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsSuspenseQueryHookResult = ReturnType<typeof useProjectsSuspenseQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const ProjectsFullDocument = gql`
    query ProjectsFull($input: ProjectsGetQueryInput) {
  projectsGet(input: $input) {
    projects {
      id
      title
      name
      type
      shortDescription
      description
      balance
      createdAt
      updatedAt
      thumbnailImage
      image
      status
      owners {
        id
        user {
          id
          username
          imageUrl
        }
      }
      funders {
        id
        user {
          id
          username
          imageUrl
        }
        confirmed
      }
      wallets {
        state {
          status
          statusCode
        }
      }
    }
  }
}
    `;

/**
 * __useProjectsFullQuery__
 *
 * To run a query within a React component, call `useProjectsFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsFullQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectsFullQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsFullQuery, ProjectsFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsFullQuery, ProjectsFullQueryVariables>(ProjectsFullDocument, options);
      }
export function useProjectsFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsFullQuery, ProjectsFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsFullQuery, ProjectsFullQueryVariables>(ProjectsFullDocument, options);
        }
export function useProjectsFullSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectsFullQuery, ProjectsFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsFullQuery, ProjectsFullQueryVariables>(ProjectsFullDocument, options);
        }
export type ProjectsFullQueryHookResult = ReturnType<typeof useProjectsFullQuery>;
export type ProjectsFullLazyQueryHookResult = ReturnType<typeof useProjectsFullLazyQuery>;
export type ProjectsFullSuspenseQueryHookResult = ReturnType<typeof useProjectsFullSuspenseQuery>;
export type ProjectsFullQueryResult = Apollo.QueryResult<ProjectsFullQuery, ProjectsFullQueryVariables>;
export const ProjectsSummaryDocument = gql`
    query ProjectsSummary {
  projectsSummary {
    fundedTotal
    fundersCount
    projectsCount
  }
}
    `;

/**
 * __useProjectsSummaryQuery__
 *
 * To run a query within a React component, call `useProjectsSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsSummaryQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>(ProjectsSummaryDocument, options);
      }
export function useProjectsSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>(ProjectsSummaryDocument, options);
        }
export function useProjectsSummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>(ProjectsSummaryDocument, options);
        }
export type ProjectsSummaryQueryHookResult = ReturnType<typeof useProjectsSummaryQuery>;
export type ProjectsSummaryLazyQueryHookResult = ReturnType<typeof useProjectsSummaryLazyQuery>;
export type ProjectsSummarySuspenseQueryHookResult = ReturnType<typeof useProjectsSummarySuspenseQuery>;
export type ProjectsSummaryQueryResult = Apollo.QueryResult<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>;
export const ProjectFundersDocument = gql`
    query ProjectFunders($input: GetFundersInput!) {
  fundersGet(input: $input) {
    ...FunderWithUser
  }
}
    ${FunderWithUserFragmentDoc}`;

/**
 * __useProjectFundersQuery__
 *
 * To run a query within a React component, call `useProjectFundersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectFundersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectFundersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectFundersQuery(baseOptions: Apollo.QueryHookOptions<ProjectFundersQuery, ProjectFundersQueryVariables> & ({ variables: ProjectFundersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectFundersQuery, ProjectFundersQueryVariables>(ProjectFundersDocument, options);
      }
export function useProjectFundersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectFundersQuery, ProjectFundersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectFundersQuery, ProjectFundersQueryVariables>(ProjectFundersDocument, options);
        }
export function useProjectFundersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectFundersQuery, ProjectFundersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectFundersQuery, ProjectFundersQueryVariables>(ProjectFundersDocument, options);
        }
export type ProjectFundersQueryHookResult = ReturnType<typeof useProjectFundersQuery>;
export type ProjectFundersLazyQueryHookResult = ReturnType<typeof useProjectFundersLazyQuery>;
export type ProjectFundersSuspenseQueryHookResult = ReturnType<typeof useProjectFundersSuspenseQuery>;
export type ProjectFundersQueryResult = Apollo.QueryResult<ProjectFundersQuery, ProjectFundersQueryVariables>;
export const ProjectNostrKeysDocument = gql`
    query ProjectNostrKeys($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    ...ProjectNostrKeys
  }
}
    ${ProjectNostrKeysFragmentDoc}`;

/**
 * __useProjectNostrKeysQuery__
 *
 * To run a query within a React component, call `useProjectNostrKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectNostrKeysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectNostrKeysQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectNostrKeysQuery(baseOptions: Apollo.QueryHookOptions<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables> & ({ variables: ProjectNostrKeysQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>(ProjectNostrKeysDocument, options);
      }
export function useProjectNostrKeysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>(ProjectNostrKeysDocument, options);
        }
export function useProjectNostrKeysSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>(ProjectNostrKeysDocument, options);
        }
export type ProjectNostrKeysQueryHookResult = ReturnType<typeof useProjectNostrKeysQuery>;
export type ProjectNostrKeysLazyQueryHookResult = ReturnType<typeof useProjectNostrKeysLazyQuery>;
export type ProjectNostrKeysSuspenseQueryHookResult = ReturnType<typeof useProjectNostrKeysSuspenseQuery>;
export type ProjectNostrKeysQueryResult = Apollo.QueryResult<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserMe
  }
}
    ${UserMeFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MeProjectFollowsDocument = gql`
    query MeProjectFollows {
  me {
    id
    projectFollows {
      id
      title
      name
    }
  }
}
    `;

/**
 * __useMeProjectFollowsQuery__
 *
 * To run a query within a React component, call `useMeProjectFollowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeProjectFollowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeProjectFollowsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeProjectFollowsQuery(baseOptions?: Apollo.QueryHookOptions<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>(MeProjectFollowsDocument, options);
      }
export function useMeProjectFollowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>(MeProjectFollowsDocument, options);
        }
export function useMeProjectFollowsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>(MeProjectFollowsDocument, options);
        }
export type MeProjectFollowsQueryHookResult = ReturnType<typeof useMeProjectFollowsQuery>;
export type MeProjectFollowsLazyQueryHookResult = ReturnType<typeof useMeProjectFollowsLazyQuery>;
export type MeProjectFollowsSuspenseQueryHookResult = ReturnType<typeof useMeProjectFollowsSuspenseQuery>;
export type MeProjectFollowsQueryResult = Apollo.QueryResult<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>;
export const LightningAddressVerifyDocument = gql`
    query LightningAddressVerify($lightningAddress: String) {
  lightningAddressVerify(lightningAddress: $lightningAddress) {
    reason
    valid
    limits {
      max
      min
    }
  }
}
    `;

/**
 * __useLightningAddressVerifyQuery__
 *
 * To run a query within a React component, call `useLightningAddressVerifyQuery` and pass it any options that fit your needs.
 * When your component renders, `useLightningAddressVerifyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLightningAddressVerifyQuery({
 *   variables: {
 *      lightningAddress: // value for 'lightningAddress'
 *   },
 * });
 */
export function useLightningAddressVerifyQuery(baseOptions?: Apollo.QueryHookOptions<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>(LightningAddressVerifyDocument, options);
      }
export function useLightningAddressVerifyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>(LightningAddressVerifyDocument, options);
        }
export function useLightningAddressVerifySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>(LightningAddressVerifyDocument, options);
        }
export type LightningAddressVerifyQueryHookResult = ReturnType<typeof useLightningAddressVerifyQuery>;
export type LightningAddressVerifyLazyQueryHookResult = ReturnType<typeof useLightningAddressVerifyLazyQuery>;
export type LightningAddressVerifySuspenseQueryHookResult = ReturnType<typeof useLightningAddressVerifySuspenseQuery>;
export type LightningAddressVerifyQueryResult = Apollo.QueryResult<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>;
export const WalletLimitDocument = gql`
    query WalletLimit($getWalletId: BigInt!) {
  getWallet(id: $getWalletId) {
    limits {
      contribution {
        max
        min
      }
    }
  }
}
    `;

/**
 * __useWalletLimitQuery__
 *
 * To run a query within a React component, call `useWalletLimitQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletLimitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletLimitQuery({
 *   variables: {
 *      getWalletId: // value for 'getWalletId'
 *   },
 * });
 */
export function useWalletLimitQuery(baseOptions: Apollo.QueryHookOptions<WalletLimitQuery, WalletLimitQueryVariables> & ({ variables: WalletLimitQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletLimitQuery, WalletLimitQueryVariables>(WalletLimitDocument, options);
      }
export function useWalletLimitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletLimitQuery, WalletLimitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletLimitQuery, WalletLimitQueryVariables>(WalletLimitDocument, options);
        }
export function useWalletLimitSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WalletLimitQuery, WalletLimitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WalletLimitQuery, WalletLimitQueryVariables>(WalletLimitDocument, options);
        }
export type WalletLimitQueryHookResult = ReturnType<typeof useWalletLimitQuery>;
export type WalletLimitLazyQueryHookResult = ReturnType<typeof useWalletLimitLazyQuery>;
export type WalletLimitSuspenseQueryHookResult = ReturnType<typeof useWalletLimitSuspenseQuery>;
export type WalletLimitQueryResult = Apollo.QueryResult<WalletLimitQuery, WalletLimitQueryVariables>;
export const ActivityCreatedDocument = gql`
    subscription ActivityCreated($input: ActivityCreatedSubscriptionInput) {
  activityCreated(input: $input) {
    ... on Entry {
      ...EntryForLandingPage
    }
    ... on Project {
      ...ProjectForLandingPage
    }
    ... on FundingTx {
      ...FundingTxForLandingPage
    }
    ... on ProjectReward {
      ...ProjectRewardForLandingPage
    }
  }
}
    ${EntryForLandingPageFragmentDoc}
${ProjectForLandingPageFragmentDoc}
${FundingTxForLandingPageFragmentDoc}
${ProjectRewardForLandingPageFragmentDoc}`;

/**
 * __useActivityCreatedSubscription__
 *
 * To run a query within a React component, call `useActivityCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useActivityCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityCreatedSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivityCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ActivityCreatedSubscription, ActivityCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ActivityCreatedSubscription, ActivityCreatedSubscriptionVariables>(ActivityCreatedDocument, options);
      }
export type ActivityCreatedSubscriptionHookResult = ReturnType<typeof useActivityCreatedSubscription>;
export type ActivityCreatedSubscriptionResult = Apollo.SubscriptionResult<ActivityCreatedSubscription>;
export const FeaturedProjectForLandingPageDocument = gql`
    query FeaturedProjectForLandingPage($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    ...ProjectForLandingPage
  }
}
    ${ProjectForLandingPageFragmentDoc}`;

/**
 * __useFeaturedProjectForLandingPageQuery__
 *
 * To run a query within a React component, call `useFeaturedProjectForLandingPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedProjectForLandingPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedProjectForLandingPageQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFeaturedProjectForLandingPageQuery(baseOptions: Apollo.QueryHookOptions<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables> & ({ variables: FeaturedProjectForLandingPageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables>(FeaturedProjectForLandingPageDocument, options);
      }
export function useFeaturedProjectForLandingPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables>(FeaturedProjectForLandingPageDocument, options);
        }
export function useFeaturedProjectForLandingPageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables>(FeaturedProjectForLandingPageDocument, options);
        }
export type FeaturedProjectForLandingPageQueryHookResult = ReturnType<typeof useFeaturedProjectForLandingPageQuery>;
export type FeaturedProjectForLandingPageLazyQueryHookResult = ReturnType<typeof useFeaturedProjectForLandingPageLazyQuery>;
export type FeaturedProjectForLandingPageSuspenseQueryHookResult = ReturnType<typeof useFeaturedProjectForLandingPageSuspenseQuery>;
export type FeaturedProjectForLandingPageQueryResult = Apollo.QueryResult<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables>;
export const ProjectsMostFundedByTagDocument = gql`
    query ProjectsMostFundedByTag($input: ProjectsMostFundedByTagInput!) {
  projectsMostFundedByTag(input: $input) {
    projects {
      project {
        ...ProjectForLandingPage
      }
    }
    tagId
  }
}
    ${ProjectForLandingPageFragmentDoc}`;

/**
 * __useProjectsMostFundedByTagQuery__
 *
 * To run a query within a React component, call `useProjectsMostFundedByTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsMostFundedByTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsMostFundedByTagQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectsMostFundedByTagQuery(baseOptions: Apollo.QueryHookOptions<ProjectsMostFundedByTagQuery, ProjectsMostFundedByTagQueryVariables> & ({ variables: ProjectsMostFundedByTagQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsMostFundedByTagQuery, ProjectsMostFundedByTagQueryVariables>(ProjectsMostFundedByTagDocument, options);
      }
export function useProjectsMostFundedByTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsMostFundedByTagQuery, ProjectsMostFundedByTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsMostFundedByTagQuery, ProjectsMostFundedByTagQueryVariables>(ProjectsMostFundedByTagDocument, options);
        }
export function useProjectsMostFundedByTagSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectsMostFundedByTagQuery, ProjectsMostFundedByTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsMostFundedByTagQuery, ProjectsMostFundedByTagQueryVariables>(ProjectsMostFundedByTagDocument, options);
        }
export type ProjectsMostFundedByTagQueryHookResult = ReturnType<typeof useProjectsMostFundedByTagQuery>;
export type ProjectsMostFundedByTagLazyQueryHookResult = ReturnType<typeof useProjectsMostFundedByTagLazyQuery>;
export type ProjectsMostFundedByTagSuspenseQueryHookResult = ReturnType<typeof useProjectsMostFundedByTagSuspenseQuery>;
export type ProjectsMostFundedByTagQueryResult = Apollo.QueryResult<ProjectsMostFundedByTagQuery, ProjectsMostFundedByTagQueryVariables>;
export const ProjectsForLandingPageDocument = gql`
    query ProjectsForLandingPage($input: ProjectsGetQueryInput) {
  projectsGet(input: $input) {
    projects {
      ...ProjectForLandingPage
    }
  }
}
    ${ProjectForLandingPageFragmentDoc}`;

/**
 * __useProjectsForLandingPageQuery__
 *
 * To run a query within a React component, call `useProjectsForLandingPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsForLandingPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsForLandingPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectsForLandingPageQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>(ProjectsForLandingPageDocument, options);
      }
export function useProjectsForLandingPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>(ProjectsForLandingPageDocument, options);
        }
export function useProjectsForLandingPageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>(ProjectsForLandingPageDocument, options);
        }
export type ProjectsForLandingPageQueryHookResult = ReturnType<typeof useProjectsForLandingPageQuery>;
export type ProjectsForLandingPageLazyQueryHookResult = ReturnType<typeof useProjectsForLandingPageLazyQuery>;
export type ProjectsForLandingPageSuspenseQueryHookResult = ReturnType<typeof useProjectsForLandingPageSuspenseQuery>;
export type ProjectsForLandingPageQueryResult = Apollo.QueryResult<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>;
export const ProjectRewardsTrendingWeeklyGetDocument = gql`
    query ProjectRewardsTrendingWeeklyGet {
  projectRewardsTrendingWeeklyGet {
    count
    projectReward {
      ...RewardForLandingPage
    }
  }
}
    ${RewardForLandingPageFragmentDoc}`;

/**
 * __useProjectRewardsTrendingWeeklyGetQuery__
 *
 * To run a query within a React component, call `useProjectRewardsTrendingWeeklyGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectRewardsTrendingWeeklyGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectRewardsTrendingWeeklyGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectRewardsTrendingWeeklyGetQuery(baseOptions?: Apollo.QueryHookOptions<ProjectRewardsTrendingWeeklyGetQuery, ProjectRewardsTrendingWeeklyGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectRewardsTrendingWeeklyGetQuery, ProjectRewardsTrendingWeeklyGetQueryVariables>(ProjectRewardsTrendingWeeklyGetDocument, options);
      }
export function useProjectRewardsTrendingWeeklyGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectRewardsTrendingWeeklyGetQuery, ProjectRewardsTrendingWeeklyGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectRewardsTrendingWeeklyGetQuery, ProjectRewardsTrendingWeeklyGetQueryVariables>(ProjectRewardsTrendingWeeklyGetDocument, options);
        }
export function useProjectRewardsTrendingWeeklyGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectRewardsTrendingWeeklyGetQuery, ProjectRewardsTrendingWeeklyGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectRewardsTrendingWeeklyGetQuery, ProjectRewardsTrendingWeeklyGetQueryVariables>(ProjectRewardsTrendingWeeklyGetDocument, options);
        }
export type ProjectRewardsTrendingWeeklyGetQueryHookResult = ReturnType<typeof useProjectRewardsTrendingWeeklyGetQuery>;
export type ProjectRewardsTrendingWeeklyGetLazyQueryHookResult = ReturnType<typeof useProjectRewardsTrendingWeeklyGetLazyQuery>;
export type ProjectRewardsTrendingWeeklyGetSuspenseQueryHookResult = ReturnType<typeof useProjectRewardsTrendingWeeklyGetSuspenseQuery>;
export type ProjectRewardsTrendingWeeklyGetQueryResult = Apollo.QueryResult<ProjectRewardsTrendingWeeklyGetQuery, ProjectRewardsTrendingWeeklyGetQueryVariables>;
export const TagsGetDocument = gql`
    query TagsGet {
  tagsGet {
    label
    id
    count
  }
}
    `;

/**
 * __useTagsGetQuery__
 *
 * To run a query within a React component, call `useTagsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsGetQuery(baseOptions?: Apollo.QueryHookOptions<TagsGetQuery, TagsGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsGetQuery, TagsGetQueryVariables>(TagsGetDocument, options);
      }
export function useTagsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsGetQuery, TagsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsGetQuery, TagsGetQueryVariables>(TagsGetDocument, options);
        }
export function useTagsGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TagsGetQuery, TagsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagsGetQuery, TagsGetQueryVariables>(TagsGetDocument, options);
        }
export type TagsGetQueryHookResult = ReturnType<typeof useTagsGetQuery>;
export type TagsGetLazyQueryHookResult = ReturnType<typeof useTagsGetLazyQuery>;
export type TagsGetSuspenseQueryHookResult = ReturnType<typeof useTagsGetSuspenseQuery>;
export type TagsGetQueryResult = Apollo.QueryResult<TagsGetQuery, TagsGetQueryVariables>;
export const ProjectCountriesGetDocument = gql`
    query ProjectCountriesGet {
  projectCountriesGet {
    count
    country {
      code
      name
    }
  }
}
    `;

/**
 * __useProjectCountriesGetQuery__
 *
 * To run a query within a React component, call `useProjectCountriesGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectCountriesGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectCountriesGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectCountriesGetQuery(baseOptions?: Apollo.QueryHookOptions<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>(ProjectCountriesGetDocument, options);
      }
export function useProjectCountriesGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>(ProjectCountriesGetDocument, options);
        }
export function useProjectCountriesGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>(ProjectCountriesGetDocument, options);
        }
export type ProjectCountriesGetQueryHookResult = ReturnType<typeof useProjectCountriesGetQuery>;
export type ProjectCountriesGetLazyQueryHookResult = ReturnType<typeof useProjectCountriesGetLazyQuery>;
export type ProjectCountriesGetSuspenseQueryHookResult = ReturnType<typeof useProjectCountriesGetSuspenseQuery>;
export type ProjectCountriesGetQueryResult = Apollo.QueryResult<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>;
export const ProjectRegionsGetDocument = gql`
    query ProjectRegionsGet {
  projectRegionsGet {
    count
    region
  }
}
    `;

/**
 * __useProjectRegionsGetQuery__
 *
 * To run a query within a React component, call `useProjectRegionsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectRegionsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectRegionsGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectRegionsGetQuery(baseOptions?: Apollo.QueryHookOptions<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>(ProjectRegionsGetDocument, options);
      }
export function useProjectRegionsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>(ProjectRegionsGetDocument, options);
        }
export function useProjectRegionsGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>(ProjectRegionsGetDocument, options);
        }
export type ProjectRegionsGetQueryHookResult = ReturnType<typeof useProjectRegionsGetQuery>;
export type ProjectRegionsGetLazyQueryHookResult = ReturnType<typeof useProjectRegionsGetLazyQuery>;
export type ProjectRegionsGetSuspenseQueryHookResult = ReturnType<typeof useProjectRegionsGetSuspenseQuery>;
export type ProjectRegionsGetQueryResult = Apollo.QueryResult<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>;
export const TagsMostFundedGetDocument = gql`
    query TagsMostFundedGet {
  tagsMostFundedGet {
    id
    label
  }
}
    `;

/**
 * __useTagsMostFundedGetQuery__
 *
 * To run a query within a React component, call `useTagsMostFundedGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsMostFundedGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsMostFundedGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsMostFundedGetQuery(baseOptions?: Apollo.QueryHookOptions<TagsMostFundedGetQuery, TagsMostFundedGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsMostFundedGetQuery, TagsMostFundedGetQueryVariables>(TagsMostFundedGetDocument, options);
      }
export function useTagsMostFundedGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsMostFundedGetQuery, TagsMostFundedGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsMostFundedGetQuery, TagsMostFundedGetQueryVariables>(TagsMostFundedGetDocument, options);
        }
export function useTagsMostFundedGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TagsMostFundedGetQuery, TagsMostFundedGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagsMostFundedGetQuery, TagsMostFundedGetQueryVariables>(TagsMostFundedGetDocument, options);
        }
export type TagsMostFundedGetQueryHookResult = ReturnType<typeof useTagsMostFundedGetQuery>;
export type TagsMostFundedGetLazyQueryHookResult = ReturnType<typeof useTagsMostFundedGetLazyQuery>;
export type TagsMostFundedGetSuspenseQueryHookResult = ReturnType<typeof useTagsMostFundedGetSuspenseQuery>;
export type TagsMostFundedGetQueryResult = Apollo.QueryResult<TagsMostFundedGetQuery, TagsMostFundedGetQueryVariables>;
export const LeaderboardGlobalContributorsDocument = gql`
    query LeaderboardGlobalContributors($input: LeaderboardGlobalContributorsGetInput!) {
  leaderboardGlobalContributorsGet(input: $input) {
    ...TopContributorsFragment
  }
}
    ${TopContributorsFragmentFragmentDoc}`;

/**
 * __useLeaderboardGlobalContributorsQuery__
 *
 * To run a query within a React component, call `useLeaderboardGlobalContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeaderboardGlobalContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeaderboardGlobalContributorsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLeaderboardGlobalContributorsQuery(baseOptions: Apollo.QueryHookOptions<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables> & ({ variables: LeaderboardGlobalContributorsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables>(LeaderboardGlobalContributorsDocument, options);
      }
export function useLeaderboardGlobalContributorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables>(LeaderboardGlobalContributorsDocument, options);
        }
export function useLeaderboardGlobalContributorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables>(LeaderboardGlobalContributorsDocument, options);
        }
export type LeaderboardGlobalContributorsQueryHookResult = ReturnType<typeof useLeaderboardGlobalContributorsQuery>;
export type LeaderboardGlobalContributorsLazyQueryHookResult = ReturnType<typeof useLeaderboardGlobalContributorsLazyQuery>;
export type LeaderboardGlobalContributorsSuspenseQueryHookResult = ReturnType<typeof useLeaderboardGlobalContributorsSuspenseQuery>;
export type LeaderboardGlobalContributorsQueryResult = Apollo.QueryResult<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables>;
export const LeaderboardGlobalProjectsDocument = gql`
    query LeaderboardGlobalProjects($input: LeaderboardGlobalProjectsGetInput!) {
  leaderboardGlobalProjectsGet(input: $input) {
    ...TopProjectsFragment
  }
}
    ${TopProjectsFragmentFragmentDoc}`;

/**
 * __useLeaderboardGlobalProjectsQuery__
 *
 * To run a query within a React component, call `useLeaderboardGlobalProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeaderboardGlobalProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeaderboardGlobalProjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLeaderboardGlobalProjectsQuery(baseOptions: Apollo.QueryHookOptions<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables> & ({ variables: LeaderboardGlobalProjectsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables>(LeaderboardGlobalProjectsDocument, options);
      }
export function useLeaderboardGlobalProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables>(LeaderboardGlobalProjectsDocument, options);
        }
export function useLeaderboardGlobalProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables>(LeaderboardGlobalProjectsDocument, options);
        }
export type LeaderboardGlobalProjectsQueryHookResult = ReturnType<typeof useLeaderboardGlobalProjectsQuery>;
export type LeaderboardGlobalProjectsLazyQueryHookResult = ReturnType<typeof useLeaderboardGlobalProjectsLazyQuery>;
export type LeaderboardGlobalProjectsSuspenseQueryHookResult = ReturnType<typeof useLeaderboardGlobalProjectsSuspenseQuery>;
export type LeaderboardGlobalProjectsQueryResult = Apollo.QueryResult<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables>;
export const OrdersStatsGetDocument = gql`
    query OrdersStatsGet($input: GetProjectOrdersStatsInput!) {
  ordersStatsGet(input: $input) {
    ...OrdersStatsFragment
  }
}
    ${OrdersStatsFragmentFragmentDoc}`;

/**
 * __useOrdersStatsGetQuery__
 *
 * To run a query within a React component, call `useOrdersStatsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersStatsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersStatsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrdersStatsGetQuery(baseOptions: Apollo.QueryHookOptions<OrdersStatsGetQuery, OrdersStatsGetQueryVariables> & ({ variables: OrdersStatsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersStatsGetQuery, OrdersStatsGetQueryVariables>(OrdersStatsGetDocument, options);
      }
export function useOrdersStatsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersStatsGetQuery, OrdersStatsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersStatsGetQuery, OrdersStatsGetQueryVariables>(OrdersStatsGetDocument, options);
        }
export function useOrdersStatsGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrdersStatsGetQuery, OrdersStatsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrdersStatsGetQuery, OrdersStatsGetQueryVariables>(OrdersStatsGetDocument, options);
        }
export type OrdersStatsGetQueryHookResult = ReturnType<typeof useOrdersStatsGetQuery>;
export type OrdersStatsGetLazyQueryHookResult = ReturnType<typeof useOrdersStatsGetLazyQuery>;
export type OrdersStatsGetSuspenseQueryHookResult = ReturnType<typeof useOrdersStatsGetSuspenseQuery>;
export type OrdersStatsGetQueryResult = Apollo.QueryResult<OrdersStatsGetQuery, OrdersStatsGetQueryVariables>;
export const ProjectStatsGetDocument = gql`
    query ProjectStatsGet($input: GetProjectStatsInput!) {
  projectStatsGet(input: $input) {
    ...ProjectStats
  }
}
    ${ProjectStatsFragmentDoc}`;

/**
 * __useProjectStatsGetQuery__
 *
 * To run a query within a React component, call `useProjectStatsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectStatsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectStatsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectStatsGetQuery(baseOptions: Apollo.QueryHookOptions<ProjectStatsGetQuery, ProjectStatsGetQueryVariables> & ({ variables: ProjectStatsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectStatsGetQuery, ProjectStatsGetQueryVariables>(ProjectStatsGetDocument, options);
      }
export function useProjectStatsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectStatsGetQuery, ProjectStatsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectStatsGetQuery, ProjectStatsGetQueryVariables>(ProjectStatsGetDocument, options);
        }
export function useProjectStatsGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectStatsGetQuery, ProjectStatsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectStatsGetQuery, ProjectStatsGetQueryVariables>(ProjectStatsGetDocument, options);
        }
export type ProjectStatsGetQueryHookResult = ReturnType<typeof useProjectStatsGetQuery>;
export type ProjectStatsGetLazyQueryHookResult = ReturnType<typeof useProjectStatsGetLazyQuery>;
export type ProjectStatsGetSuspenseQueryHookResult = ReturnType<typeof useProjectStatsGetSuspenseQuery>;
export type ProjectStatsGetQueryResult = Apollo.QueryResult<ProjectStatsGetQuery, ProjectStatsGetQueryVariables>;
export const CreatorNotificationsSettingsUpdateDocument = gql`
    mutation CreatorNotificationsSettingsUpdate($creatorNotificationConfigurationId: BigInt!, $value: String!) {
  creatorNotificationConfigurationValueUpdate(
    creatorNotificationConfigurationId: $creatorNotificationConfigurationId
    value: $value
  )
}
    `;
export type CreatorNotificationsSettingsUpdateMutationFn = Apollo.MutationFunction<CreatorNotificationsSettingsUpdateMutation, CreatorNotificationsSettingsUpdateMutationVariables>;

/**
 * __useCreatorNotificationsSettingsUpdateMutation__
 *
 * To run a mutation, you first call `useCreatorNotificationsSettingsUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatorNotificationsSettingsUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [creatorNotificationsSettingsUpdateMutation, { data, loading, error }] = useCreatorNotificationsSettingsUpdateMutation({
 *   variables: {
 *      creatorNotificationConfigurationId: // value for 'creatorNotificationConfigurationId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useCreatorNotificationsSettingsUpdateMutation(baseOptions?: Apollo.MutationHookOptions<CreatorNotificationsSettingsUpdateMutation, CreatorNotificationsSettingsUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatorNotificationsSettingsUpdateMutation, CreatorNotificationsSettingsUpdateMutationVariables>(CreatorNotificationsSettingsUpdateDocument, options);
      }
export type CreatorNotificationsSettingsUpdateMutationHookResult = ReturnType<typeof useCreatorNotificationsSettingsUpdateMutation>;
export type CreatorNotificationsSettingsUpdateMutationResult = Apollo.MutationResult<CreatorNotificationsSettingsUpdateMutation>;
export type CreatorNotificationsSettingsUpdateMutationOptions = Apollo.BaseMutationOptions<CreatorNotificationsSettingsUpdateMutation, CreatorNotificationsSettingsUpdateMutationVariables>;
export const UserNotificationsSettingsUpdateDocument = gql`
    mutation UserNotificationsSettingsUpdate($userNotificationConfigurationId: BigInt!, $value: String!) {
  userNotificationConfigurationValueUpdate(
    userNotificationConfigurationId: $userNotificationConfigurationId
    value: $value
  )
}
    `;
export type UserNotificationsSettingsUpdateMutationFn = Apollo.MutationFunction<UserNotificationsSettingsUpdateMutation, UserNotificationsSettingsUpdateMutationVariables>;

/**
 * __useUserNotificationsSettingsUpdateMutation__
 *
 * To run a mutation, you first call `useUserNotificationsSettingsUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserNotificationsSettingsUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userNotificationsSettingsUpdateMutation, { data, loading, error }] = useUserNotificationsSettingsUpdateMutation({
 *   variables: {
 *      userNotificationConfigurationId: // value for 'userNotificationConfigurationId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUserNotificationsSettingsUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UserNotificationsSettingsUpdateMutation, UserNotificationsSettingsUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserNotificationsSettingsUpdateMutation, UserNotificationsSettingsUpdateMutationVariables>(UserNotificationsSettingsUpdateDocument, options);
      }
export type UserNotificationsSettingsUpdateMutationHookResult = ReturnType<typeof useUserNotificationsSettingsUpdateMutation>;
export type UserNotificationsSettingsUpdateMutationResult = Apollo.MutationResult<UserNotificationsSettingsUpdateMutation>;
export type UserNotificationsSettingsUpdateMutationOptions = Apollo.BaseMutationOptions<UserNotificationsSettingsUpdateMutation, UserNotificationsSettingsUpdateMutationVariables>;
export const ProfileNotificationsSettingsDocument = gql`
    query ProfileNotificationsSettings($userId: BigInt!) {
  userNotificationSettingsGet(userId: $userId) {
    ...ProfileNotificationsSettings
  }
}
    ${ProfileNotificationsSettingsFragmentDoc}`;

/**
 * __useProfileNotificationsSettingsQuery__
 *
 * To run a query within a React component, call `useProfileNotificationsSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileNotificationsSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileNotificationsSettingsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useProfileNotificationsSettingsQuery(baseOptions: Apollo.QueryHookOptions<ProfileNotificationsSettingsQuery, ProfileNotificationsSettingsQueryVariables> & ({ variables: ProfileNotificationsSettingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileNotificationsSettingsQuery, ProfileNotificationsSettingsQueryVariables>(ProfileNotificationsSettingsDocument, options);
      }
export function useProfileNotificationsSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileNotificationsSettingsQuery, ProfileNotificationsSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileNotificationsSettingsQuery, ProfileNotificationsSettingsQueryVariables>(ProfileNotificationsSettingsDocument, options);
        }
export function useProfileNotificationsSettingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProfileNotificationsSettingsQuery, ProfileNotificationsSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileNotificationsSettingsQuery, ProfileNotificationsSettingsQueryVariables>(ProfileNotificationsSettingsDocument, options);
        }
export type ProfileNotificationsSettingsQueryHookResult = ReturnType<typeof useProfileNotificationsSettingsQuery>;
export type ProfileNotificationsSettingsLazyQueryHookResult = ReturnType<typeof useProfileNotificationsSettingsLazyQuery>;
export type ProfileNotificationsSettingsSuspenseQueryHookResult = ReturnType<typeof useProfileNotificationsSettingsSuspenseQuery>;
export type ProfileNotificationsSettingsQueryResult = Apollo.QueryResult<ProfileNotificationsSettingsQuery, ProfileNotificationsSettingsQueryVariables>;
export const UserNotificationsSettingsDocument = gql`
    query UserNotificationsSettings($userId: BigInt!) {
  userNotificationSettingsGet(userId: $userId) {
    ...UserNotificationsSettings
  }
}
    ${UserNotificationsSettingsFragmentDoc}`;

/**
 * __useUserNotificationsSettingsQuery__
 *
 * To run a query within a React component, call `useUserNotificationsSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserNotificationsSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserNotificationsSettingsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserNotificationsSettingsQuery(baseOptions: Apollo.QueryHookOptions<UserNotificationsSettingsQuery, UserNotificationsSettingsQueryVariables> & ({ variables: UserNotificationsSettingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserNotificationsSettingsQuery, UserNotificationsSettingsQueryVariables>(UserNotificationsSettingsDocument, options);
      }
export function useUserNotificationsSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserNotificationsSettingsQuery, UserNotificationsSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserNotificationsSettingsQuery, UserNotificationsSettingsQueryVariables>(UserNotificationsSettingsDocument, options);
        }
export function useUserNotificationsSettingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserNotificationsSettingsQuery, UserNotificationsSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserNotificationsSettingsQuery, UserNotificationsSettingsQueryVariables>(UserNotificationsSettingsDocument, options);
        }
export type UserNotificationsSettingsQueryHookResult = ReturnType<typeof useUserNotificationsSettingsQuery>;
export type UserNotificationsSettingsLazyQueryHookResult = ReturnType<typeof useUserNotificationsSettingsLazyQuery>;
export type UserNotificationsSettingsSuspenseQueryHookResult = ReturnType<typeof useUserNotificationsSettingsSuspenseQuery>;
export type UserNotificationsSettingsQueryResult = Apollo.QueryResult<UserNotificationsSettingsQuery, UserNotificationsSettingsQueryVariables>;
export const ProjectNotificationSettingsDocument = gql`
    query ProjectNotificationSettings($projectId: BigInt!) {
  projectNotificationSettingsGet(projectId: $projectId) {
    ...ProjectNotificationSettings
  }
}
    ${ProjectNotificationSettingsFragmentDoc}`;

/**
 * __useProjectNotificationSettingsQuery__
 *
 * To run a query within a React component, call `useProjectNotificationSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectNotificationSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectNotificationSettingsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectNotificationSettingsQuery(baseOptions: Apollo.QueryHookOptions<ProjectNotificationSettingsQuery, ProjectNotificationSettingsQueryVariables> & ({ variables: ProjectNotificationSettingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectNotificationSettingsQuery, ProjectNotificationSettingsQueryVariables>(ProjectNotificationSettingsDocument, options);
      }
export function useProjectNotificationSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectNotificationSettingsQuery, ProjectNotificationSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectNotificationSettingsQuery, ProjectNotificationSettingsQueryVariables>(ProjectNotificationSettingsDocument, options);
        }
export function useProjectNotificationSettingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectNotificationSettingsQuery, ProjectNotificationSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectNotificationSettingsQuery, ProjectNotificationSettingsQueryVariables>(ProjectNotificationSettingsDocument, options);
        }
export type ProjectNotificationSettingsQueryHookResult = ReturnType<typeof useProjectNotificationSettingsQuery>;
export type ProjectNotificationSettingsLazyQueryHookResult = ReturnType<typeof useProjectNotificationSettingsLazyQuery>;
export type ProjectNotificationSettingsSuspenseQueryHookResult = ReturnType<typeof useProjectNotificationSettingsSuspenseQuery>;
export type ProjectNotificationSettingsQueryResult = Apollo.QueryResult<ProjectNotificationSettingsQuery, ProjectNotificationSettingsQueryVariables>;
export const UserForProfilePageDocument = gql`
    query UserForProfilePage($where: UserGetInput!) {
  user(where: $where) {
    ...UserForProfilePage
  }
}
    ${UserForProfilePageFragmentDoc}`;

/**
 * __useUserForProfilePageQuery__
 *
 * To run a query within a React component, call `useUserForProfilePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserForProfilePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserForProfilePageQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserForProfilePageQuery(baseOptions: Apollo.QueryHookOptions<UserForProfilePageQuery, UserForProfilePageQueryVariables> & ({ variables: UserForProfilePageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserForProfilePageQuery, UserForProfilePageQueryVariables>(UserForProfilePageDocument, options);
      }
export function useUserForProfilePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserForProfilePageQuery, UserForProfilePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserForProfilePageQuery, UserForProfilePageQueryVariables>(UserForProfilePageDocument, options);
        }
export function useUserForProfilePageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserForProfilePageQuery, UserForProfilePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserForProfilePageQuery, UserForProfilePageQueryVariables>(UserForProfilePageDocument, options);
        }
export type UserForProfilePageQueryHookResult = ReturnType<typeof useUserForProfilePageQuery>;
export type UserForProfilePageLazyQueryHookResult = ReturnType<typeof useUserForProfilePageLazyQuery>;
export type UserForProfilePageSuspenseQueryHookResult = ReturnType<typeof useUserForProfilePageSuspenseQuery>;
export type UserForProfilePageQueryResult = Apollo.QueryResult<UserForProfilePageQuery, UserForProfilePageQueryVariables>;
export const UserProfileProjectsDocument = gql`
    query UserProfileProjects($where: UserGetInput!) {
  user(where: $where) {
    ownerOf {
      project {
        ...ProjectForProfilePage
      }
    }
  }
}
    ${ProjectForProfilePageFragmentDoc}`;

/**
 * __useUserProfileProjectsQuery__
 *
 * To run a query within a React component, call `useUserProfileProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileProjectsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserProfileProjectsQuery(baseOptions: Apollo.QueryHookOptions<UserProfileProjectsQuery, UserProfileProjectsQueryVariables> & ({ variables: UserProfileProjectsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>(UserProfileProjectsDocument, options);
      }
export function useUserProfileProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>(UserProfileProjectsDocument, options);
        }
export function useUserProfileProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>(UserProfileProjectsDocument, options);
        }
export type UserProfileProjectsQueryHookResult = ReturnType<typeof useUserProfileProjectsQuery>;
export type UserProfileProjectsLazyQueryHookResult = ReturnType<typeof useUserProfileProjectsLazyQuery>;
export type UserProfileProjectsSuspenseQueryHookResult = ReturnType<typeof useUserProfileProjectsSuspenseQuery>;
export type UserProfileProjectsQueryResult = Apollo.QueryResult<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>;
export const UserFollowedProjectsDocument = gql`
    query UserFollowedProjects($where: UserGetInput!) {
  user(where: $where) {
    projectFollows {
      ...ProjectForProfilePage
    }
  }
}
    ${ProjectForProfilePageFragmentDoc}`;

/**
 * __useUserFollowedProjectsQuery__
 *
 * To run a query within a React component, call `useUserFollowedProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFollowedProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFollowedProjectsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserFollowedProjectsQuery(baseOptions: Apollo.QueryHookOptions<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables> & ({ variables: UserFollowedProjectsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>(UserFollowedProjectsDocument, options);
      }
export function useUserFollowedProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>(UserFollowedProjectsDocument, options);
        }
export function useUserFollowedProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>(UserFollowedProjectsDocument, options);
        }
export type UserFollowedProjectsQueryHookResult = ReturnType<typeof useUserFollowedProjectsQuery>;
export type UserFollowedProjectsLazyQueryHookResult = ReturnType<typeof useUserFollowedProjectsLazyQuery>;
export type UserFollowedProjectsSuspenseQueryHookResult = ReturnType<typeof useUserFollowedProjectsSuspenseQuery>;
export type UserFollowedProjectsQueryResult = Apollo.QueryResult<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>;
export const UserProfileContributionsDocument = gql`
    query UserProfileContributions($where: UserGetInput!) {
  user(where: $where) {
    contributions {
      ...UserProjectContributions
    }
  }
}
    ${UserProjectContributionsFragmentDoc}`;

/**
 * __useUserProfileContributionsQuery__
 *
 * To run a query within a React component, call `useUserProfileContributionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileContributionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileContributionsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserProfileContributionsQuery(baseOptions: Apollo.QueryHookOptions<UserProfileContributionsQuery, UserProfileContributionsQueryVariables> & ({ variables: UserProfileContributionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>(UserProfileContributionsDocument, options);
      }
export function useUserProfileContributionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>(UserProfileContributionsDocument, options);
        }
export function useUserProfileContributionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>(UserProfileContributionsDocument, options);
        }
export type UserProfileContributionsQueryHookResult = ReturnType<typeof useUserProfileContributionsQuery>;
export type UserProfileContributionsLazyQueryHookResult = ReturnType<typeof useUserProfileContributionsLazyQuery>;
export type UserProfileContributionsSuspenseQueryHookResult = ReturnType<typeof useUserProfileContributionsSuspenseQuery>;
export type UserProfileContributionsQueryResult = Apollo.QueryResult<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>;
export const UserProfileOrdersDocument = gql`
    query UserProfileOrders($where: UserGetInput!) {
  user(where: $where) {
    orders {
      ...ProfileOrder
    }
  }
}
    ${ProfileOrderFragmentDoc}`;

/**
 * __useUserProfileOrdersQuery__
 *
 * To run a query within a React component, call `useUserProfileOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileOrdersQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserProfileOrdersQuery(baseOptions: Apollo.QueryHookOptions<UserProfileOrdersQuery, UserProfileOrdersQueryVariables> & ({ variables: UserProfileOrdersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>(UserProfileOrdersDocument, options);
      }
export function useUserProfileOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>(UserProfileOrdersDocument, options);
        }
export function useUserProfileOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>(UserProfileOrdersDocument, options);
        }
export type UserProfileOrdersQueryHookResult = ReturnType<typeof useUserProfileOrdersQuery>;
export type UserProfileOrdersLazyQueryHookResult = ReturnType<typeof useUserProfileOrdersLazyQuery>;
export type UserProfileOrdersSuspenseQueryHookResult = ReturnType<typeof useUserProfileOrdersSuspenseQuery>;
export type UserProfileOrdersQueryResult = Apollo.QueryResult<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>;
export const AffiliateLinkCreateDocument = gql`
    mutation AffiliateLinkCreate($input: AffiliateLinkCreateInput!) {
  affiliateLinkCreate(input: $input) {
    ...ProjectAffiliateLink
  }
}
    ${ProjectAffiliateLinkFragmentDoc}`;
export type AffiliateLinkCreateMutationFn = Apollo.MutationFunction<AffiliateLinkCreateMutation, AffiliateLinkCreateMutationVariables>;

/**
 * __useAffiliateLinkCreateMutation__
 *
 * To run a mutation, you first call `useAffiliateLinkCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAffiliateLinkCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [affiliateLinkCreateMutation, { data, loading, error }] = useAffiliateLinkCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAffiliateLinkCreateMutation(baseOptions?: Apollo.MutationHookOptions<AffiliateLinkCreateMutation, AffiliateLinkCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AffiliateLinkCreateMutation, AffiliateLinkCreateMutationVariables>(AffiliateLinkCreateDocument, options);
      }
export type AffiliateLinkCreateMutationHookResult = ReturnType<typeof useAffiliateLinkCreateMutation>;
export type AffiliateLinkCreateMutationResult = Apollo.MutationResult<AffiliateLinkCreateMutation>;
export type AffiliateLinkCreateMutationOptions = Apollo.BaseMutationOptions<AffiliateLinkCreateMutation, AffiliateLinkCreateMutationVariables>;
export const AffiliateLinkLabelUpdateDocument = gql`
    mutation AffiliateLinkLabelUpdate($affiliateLinkId: BigInt!, $label: String!) {
  affiliateLinkLabelUpdate(affiliateLinkId: $affiliateLinkId, label: $label) {
    ...ProjectAffiliateLink
  }
}
    ${ProjectAffiliateLinkFragmentDoc}`;
export type AffiliateLinkLabelUpdateMutationFn = Apollo.MutationFunction<AffiliateLinkLabelUpdateMutation, AffiliateLinkLabelUpdateMutationVariables>;

/**
 * __useAffiliateLinkLabelUpdateMutation__
 *
 * To run a mutation, you first call `useAffiliateLinkLabelUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAffiliateLinkLabelUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [affiliateLinkLabelUpdateMutation, { data, loading, error }] = useAffiliateLinkLabelUpdateMutation({
 *   variables: {
 *      affiliateLinkId: // value for 'affiliateLinkId'
 *      label: // value for 'label'
 *   },
 * });
 */
export function useAffiliateLinkLabelUpdateMutation(baseOptions?: Apollo.MutationHookOptions<AffiliateLinkLabelUpdateMutation, AffiliateLinkLabelUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AffiliateLinkLabelUpdateMutation, AffiliateLinkLabelUpdateMutationVariables>(AffiliateLinkLabelUpdateDocument, options);
      }
export type AffiliateLinkLabelUpdateMutationHookResult = ReturnType<typeof useAffiliateLinkLabelUpdateMutation>;
export type AffiliateLinkLabelUpdateMutationResult = Apollo.MutationResult<AffiliateLinkLabelUpdateMutation>;
export type AffiliateLinkLabelUpdateMutationOptions = Apollo.BaseMutationOptions<AffiliateLinkLabelUpdateMutation, AffiliateLinkLabelUpdateMutationVariables>;
export const AffiliateLinkDisableDocument = gql`
    mutation AffiliateLinkDisable($affiliateLinkId: BigInt!) {
  affiliateLinkDisable(affiliateLinkId: $affiliateLinkId) {
    id
  }
}
    `;
export type AffiliateLinkDisableMutationFn = Apollo.MutationFunction<AffiliateLinkDisableMutation, AffiliateLinkDisableMutationVariables>;

/**
 * __useAffiliateLinkDisableMutation__
 *
 * To run a mutation, you first call `useAffiliateLinkDisableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAffiliateLinkDisableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [affiliateLinkDisableMutation, { data, loading, error }] = useAffiliateLinkDisableMutation({
 *   variables: {
 *      affiliateLinkId: // value for 'affiliateLinkId'
 *   },
 * });
 */
export function useAffiliateLinkDisableMutation(baseOptions?: Apollo.MutationHookOptions<AffiliateLinkDisableMutation, AffiliateLinkDisableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AffiliateLinkDisableMutation, AffiliateLinkDisableMutationVariables>(AffiliateLinkDisableDocument, options);
      }
export type AffiliateLinkDisableMutationHookResult = ReturnType<typeof useAffiliateLinkDisableMutation>;
export type AffiliateLinkDisableMutationResult = Apollo.MutationResult<AffiliateLinkDisableMutation>;
export type AffiliateLinkDisableMutationOptions = Apollo.BaseMutationOptions<AffiliateLinkDisableMutation, AffiliateLinkDisableMutationVariables>;
export const DeleteEntryDocument = gql`
    mutation DeleteEntry($deleteEntryId: BigInt!) {
  deleteEntry(id: $deleteEntryId) {
    id
    title
  }
}
    `;
export type DeleteEntryMutationFn = Apollo.MutationFunction<DeleteEntryMutation, DeleteEntryMutationVariables>;

/**
 * __useDeleteEntryMutation__
 *
 * To run a mutation, you first call `useDeleteEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEntryMutation, { data, loading, error }] = useDeleteEntryMutation({
 *   variables: {
 *      deleteEntryId: // value for 'deleteEntryId'
 *   },
 * });
 */
export function useDeleteEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(DeleteEntryDocument, options);
      }
export type DeleteEntryMutationHookResult = ReturnType<typeof useDeleteEntryMutation>;
export type DeleteEntryMutationResult = Apollo.MutationResult<DeleteEntryMutation>;
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<DeleteEntryMutation, DeleteEntryMutationVariables>;
export const CreateEntryDocument = gql`
    mutation CreateEntry($input: CreateEntryInput!) {
  createEntry(input: $input) {
    ...ProjectEntryView
  }
}
    ${ProjectEntryViewFragmentDoc}`;
export type CreateEntryMutationFn = Apollo.MutationFunction<CreateEntryMutation, CreateEntryMutationVariables>;

/**
 * __useCreateEntryMutation__
 *
 * To run a mutation, you first call `useCreateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEntryMutation, { data, loading, error }] = useCreateEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateEntryMutation, CreateEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(CreateEntryDocument, options);
      }
export type CreateEntryMutationHookResult = ReturnType<typeof useCreateEntryMutation>;
export type CreateEntryMutationResult = Apollo.MutationResult<CreateEntryMutation>;
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables>;
export const UpdateEntryDocument = gql`
    mutation UpdateEntry($input: UpdateEntryInput!) {
  updateEntry(input: $input) {
    ...ProjectEntryView
  }
}
    ${ProjectEntryViewFragmentDoc}`;
export type UpdateEntryMutationFn = Apollo.MutationFunction<UpdateEntryMutation, UpdateEntryMutationVariables>;

/**
 * __useUpdateEntryMutation__
 *
 * To run a mutation, you first call `useUpdateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEntryMutation, { data, loading, error }] = useUpdateEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEntryMutation, UpdateEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEntryMutation, UpdateEntryMutationVariables>(UpdateEntryDocument, options);
      }
export type UpdateEntryMutationHookResult = ReturnType<typeof useUpdateEntryMutation>;
export type UpdateEntryMutationResult = Apollo.MutationResult<UpdateEntryMutation>;
export type UpdateEntryMutationOptions = Apollo.BaseMutationOptions<UpdateEntryMutation, UpdateEntryMutationVariables>;
export const PublishEntryDocument = gql`
    mutation PublishEntry($id: BigInt!) {
  publishEntry(id: $id) {
    ...ProjectEntryView
  }
}
    ${ProjectEntryViewFragmentDoc}`;
export type PublishEntryMutationFn = Apollo.MutationFunction<PublishEntryMutation, PublishEntryMutationVariables>;

/**
 * __usePublishEntryMutation__
 *
 * To run a mutation, you first call `usePublishEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishEntryMutation, { data, loading, error }] = usePublishEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublishEntryMutation(baseOptions?: Apollo.MutationHookOptions<PublishEntryMutation, PublishEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishEntryMutation, PublishEntryMutationVariables>(PublishEntryDocument, options);
      }
export type PublishEntryMutationHookResult = ReturnType<typeof usePublishEntryMutation>;
export type PublishEntryMutationResult = Apollo.MutationResult<PublishEntryMutation>;
export type PublishEntryMutationOptions = Apollo.BaseMutationOptions<PublishEntryMutation, PublishEntryMutationVariables>;
export const FundDocument = gql`
    mutation Fund($input: FundingInput!) {
  fund(input: $input) {
    fundingTx {
      ...FundingTx
    }
    swap {
      json
    }
  }
}
    ${FundingTxFragmentDoc}`;
export type FundMutationFn = Apollo.MutationFunction<FundMutation, FundMutationVariables>;

/**
 * __useFundMutation__
 *
 * To run a mutation, you first call `useFundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fundMutation, { data, loading, error }] = useFundMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFundMutation(baseOptions?: Apollo.MutationHookOptions<FundMutation, FundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FundMutation, FundMutationVariables>(FundDocument, options);
      }
export type FundMutationHookResult = ReturnType<typeof useFundMutation>;
export type FundMutationResult = Apollo.MutationResult<FundMutation>;
export type FundMutationOptions = Apollo.BaseMutationOptions<FundMutation, FundMutationVariables>;
export const RefreshFundingInvoiceDocument = gql`
    mutation RefreshFundingInvoice($fundingTxID: BigInt!) {
  fundingInvoiceRefresh(fundingTxId: $fundingTxID) {
    ...FundingTxWithInvoiceStatus
  }
}
    ${FundingTxWithInvoiceStatusFragmentDoc}`;
export type RefreshFundingInvoiceMutationFn = Apollo.MutationFunction<RefreshFundingInvoiceMutation, RefreshFundingInvoiceMutationVariables>;

/**
 * __useRefreshFundingInvoiceMutation__
 *
 * To run a mutation, you first call `useRefreshFundingInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshFundingInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshFundingInvoiceMutation, { data, loading, error }] = useRefreshFundingInvoiceMutation({
 *   variables: {
 *      fundingTxID: // value for 'fundingTxID'
 *   },
 * });
 */
export function useRefreshFundingInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<RefreshFundingInvoiceMutation, RefreshFundingInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshFundingInvoiceMutation, RefreshFundingInvoiceMutationVariables>(RefreshFundingInvoiceDocument, options);
      }
export type RefreshFundingInvoiceMutationHookResult = ReturnType<typeof useRefreshFundingInvoiceMutation>;
export type RefreshFundingInvoiceMutationResult = Apollo.MutationResult<RefreshFundingInvoiceMutation>;
export type RefreshFundingInvoiceMutationOptions = Apollo.BaseMutationOptions<RefreshFundingInvoiceMutation, RefreshFundingInvoiceMutationVariables>;
export const FundingInvoiceCancelDocument = gql`
    mutation FundingInvoiceCancel($invoiceId: String!) {
  fundingInvoiceCancel(invoiceId: $invoiceId) {
    id
    success
  }
}
    `;
export type FundingInvoiceCancelMutationFn = Apollo.MutationFunction<FundingInvoiceCancelMutation, FundingInvoiceCancelMutationVariables>;

/**
 * __useFundingInvoiceCancelMutation__
 *
 * To run a mutation, you first call `useFundingInvoiceCancelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFundingInvoiceCancelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fundingInvoiceCancelMutation, { data, loading, error }] = useFundingInvoiceCancelMutation({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *   },
 * });
 */
export function useFundingInvoiceCancelMutation(baseOptions?: Apollo.MutationHookOptions<FundingInvoiceCancelMutation, FundingInvoiceCancelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FundingInvoiceCancelMutation, FundingInvoiceCancelMutationVariables>(FundingInvoiceCancelDocument, options);
      }
export type FundingInvoiceCancelMutationHookResult = ReturnType<typeof useFundingInvoiceCancelMutation>;
export type FundingInvoiceCancelMutationResult = Apollo.MutationResult<FundingInvoiceCancelMutation>;
export type FundingInvoiceCancelMutationOptions = Apollo.BaseMutationOptions<FundingInvoiceCancelMutation, FundingInvoiceCancelMutationVariables>;
export const FundingTxEmailUpdateDocument = gql`
    mutation FundingTxEmailUpdate($input: FundingTxEmailUpdateInput) {
  fundingTxEmailUpdate(input: $input) {
    id
    email
  }
}
    `;
export type FundingTxEmailUpdateMutationFn = Apollo.MutationFunction<FundingTxEmailUpdateMutation, FundingTxEmailUpdateMutationVariables>;

/**
 * __useFundingTxEmailUpdateMutation__
 *
 * To run a mutation, you first call `useFundingTxEmailUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFundingTxEmailUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fundingTxEmailUpdateMutation, { data, loading, error }] = useFundingTxEmailUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFundingTxEmailUpdateMutation(baseOptions?: Apollo.MutationHookOptions<FundingTxEmailUpdateMutation, FundingTxEmailUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FundingTxEmailUpdateMutation, FundingTxEmailUpdateMutationVariables>(FundingTxEmailUpdateDocument, options);
      }
export type FundingTxEmailUpdateMutationHookResult = ReturnType<typeof useFundingTxEmailUpdateMutation>;
export type FundingTxEmailUpdateMutationResult = Apollo.MutationResult<FundingTxEmailUpdateMutation>;
export type FundingTxEmailUpdateMutationOptions = Apollo.BaseMutationOptions<FundingTxEmailUpdateMutation, FundingTxEmailUpdateMutationVariables>;
export const ProjectGoalOrderingUpdateDocument = gql`
    mutation ProjectGoalOrderingUpdate($input: ProjectGoalOrderingUpdateInput!) {
  projectGoalOrderingUpdate(input: $input) {
    ...ProjectGoals
  }
}
    ${ProjectGoalsFragmentDoc}`;
export type ProjectGoalOrderingUpdateMutationFn = Apollo.MutationFunction<ProjectGoalOrderingUpdateMutation, ProjectGoalOrderingUpdateMutationVariables>;

/**
 * __useProjectGoalOrderingUpdateMutation__
 *
 * To run a mutation, you first call `useProjectGoalOrderingUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectGoalOrderingUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectGoalOrderingUpdateMutation, { data, loading, error }] = useProjectGoalOrderingUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectGoalOrderingUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ProjectGoalOrderingUpdateMutation, ProjectGoalOrderingUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectGoalOrderingUpdateMutation, ProjectGoalOrderingUpdateMutationVariables>(ProjectGoalOrderingUpdateDocument, options);
      }
export type ProjectGoalOrderingUpdateMutationHookResult = ReturnType<typeof useProjectGoalOrderingUpdateMutation>;
export type ProjectGoalOrderingUpdateMutationResult = Apollo.MutationResult<ProjectGoalOrderingUpdateMutation>;
export type ProjectGoalOrderingUpdateMutationOptions = Apollo.BaseMutationOptions<ProjectGoalOrderingUpdateMutation, ProjectGoalOrderingUpdateMutationVariables>;
export const ProjectGoalCreateDocument = gql`
    mutation ProjectGoalCreate($input: ProjectGoalCreateInput!) {
  projectGoalCreate(input: $input) {
    ...ProjectGoals
  }
}
    ${ProjectGoalsFragmentDoc}`;
export type ProjectGoalCreateMutationFn = Apollo.MutationFunction<ProjectGoalCreateMutation, ProjectGoalCreateMutationVariables>;

/**
 * __useProjectGoalCreateMutation__
 *
 * To run a mutation, you first call `useProjectGoalCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectGoalCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectGoalCreateMutation, { data, loading, error }] = useProjectGoalCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectGoalCreateMutation(baseOptions?: Apollo.MutationHookOptions<ProjectGoalCreateMutation, ProjectGoalCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectGoalCreateMutation, ProjectGoalCreateMutationVariables>(ProjectGoalCreateDocument, options);
      }
export type ProjectGoalCreateMutationHookResult = ReturnType<typeof useProjectGoalCreateMutation>;
export type ProjectGoalCreateMutationResult = Apollo.MutationResult<ProjectGoalCreateMutation>;
export type ProjectGoalCreateMutationOptions = Apollo.BaseMutationOptions<ProjectGoalCreateMutation, ProjectGoalCreateMutationVariables>;
export const ProjectGoalUpdateDocument = gql`
    mutation ProjectGoalUpdate($input: ProjectGoalUpdateInput!) {
  projectGoalUpdate(input: $input) {
    ...ProjectGoals
  }
}
    ${ProjectGoalsFragmentDoc}`;
export type ProjectGoalUpdateMutationFn = Apollo.MutationFunction<ProjectGoalUpdateMutation, ProjectGoalUpdateMutationVariables>;

/**
 * __useProjectGoalUpdateMutation__
 *
 * To run a mutation, you first call `useProjectGoalUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectGoalUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectGoalUpdateMutation, { data, loading, error }] = useProjectGoalUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectGoalUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ProjectGoalUpdateMutation, ProjectGoalUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectGoalUpdateMutation, ProjectGoalUpdateMutationVariables>(ProjectGoalUpdateDocument, options);
      }
export type ProjectGoalUpdateMutationHookResult = ReturnType<typeof useProjectGoalUpdateMutation>;
export type ProjectGoalUpdateMutationResult = Apollo.MutationResult<ProjectGoalUpdateMutation>;
export type ProjectGoalUpdateMutationOptions = Apollo.BaseMutationOptions<ProjectGoalUpdateMutation, ProjectGoalUpdateMutationVariables>;
export const ProjectGoalDeleteDocument = gql`
    mutation ProjectGoalDelete($projectGoalId: BigInt!) {
  projectGoalDelete(projectGoalId: $projectGoalId) {
    success
  }
}
    `;
export type ProjectGoalDeleteMutationFn = Apollo.MutationFunction<ProjectGoalDeleteMutation, ProjectGoalDeleteMutationVariables>;

/**
 * __useProjectGoalDeleteMutation__
 *
 * To run a mutation, you first call `useProjectGoalDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectGoalDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectGoalDeleteMutation, { data, loading, error }] = useProjectGoalDeleteMutation({
 *   variables: {
 *      projectGoalId: // value for 'projectGoalId'
 *   },
 * });
 */
export function useProjectGoalDeleteMutation(baseOptions?: Apollo.MutationHookOptions<ProjectGoalDeleteMutation, ProjectGoalDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectGoalDeleteMutation, ProjectGoalDeleteMutationVariables>(ProjectGoalDeleteDocument, options);
      }
export type ProjectGoalDeleteMutationHookResult = ReturnType<typeof useProjectGoalDeleteMutation>;
export type ProjectGoalDeleteMutationResult = Apollo.MutationResult<ProjectGoalDeleteMutation>;
export type ProjectGoalDeleteMutationOptions = Apollo.BaseMutationOptions<ProjectGoalDeleteMutation, ProjectGoalDeleteMutationVariables>;
export const ProjectRewardCurrencyUpdateDocument = gql`
    mutation ProjectRewardCurrencyUpdate($input: ProjectRewardCurrencyUpdate!) {
  projectRewardCurrencyUpdate(input: $input) {
    ...ProjectReward
  }
}
    ${ProjectRewardFragmentDoc}`;
export type ProjectRewardCurrencyUpdateMutationFn = Apollo.MutationFunction<ProjectRewardCurrencyUpdateMutation, ProjectRewardCurrencyUpdateMutationVariables>;

/**
 * __useProjectRewardCurrencyUpdateMutation__
 *
 * To run a mutation, you first call `useProjectRewardCurrencyUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectRewardCurrencyUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectRewardCurrencyUpdateMutation, { data, loading, error }] = useProjectRewardCurrencyUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectRewardCurrencyUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ProjectRewardCurrencyUpdateMutation, ProjectRewardCurrencyUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectRewardCurrencyUpdateMutation, ProjectRewardCurrencyUpdateMutationVariables>(ProjectRewardCurrencyUpdateDocument, options);
      }
export type ProjectRewardCurrencyUpdateMutationHookResult = ReturnType<typeof useProjectRewardCurrencyUpdateMutation>;
export type ProjectRewardCurrencyUpdateMutationResult = Apollo.MutationResult<ProjectRewardCurrencyUpdateMutation>;
export type ProjectRewardCurrencyUpdateMutationOptions = Apollo.BaseMutationOptions<ProjectRewardCurrencyUpdateMutation, ProjectRewardCurrencyUpdateMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    ...ProjectPageBody
  }
}
    ${ProjectPageBodyFragmentDoc}`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    ...ProjectUpdate
  }
}
    ${ProjectUpdateFragmentDoc}`;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const ProjectStatusUpdateDocument = gql`
    mutation ProjectStatusUpdate($input: ProjectStatusUpdate!) {
  projectStatusUpdate(input: $input) {
    id
    status
  }
}
    `;
export type ProjectStatusUpdateMutationFn = Apollo.MutationFunction<ProjectStatusUpdateMutation, ProjectStatusUpdateMutationVariables>;

/**
 * __useProjectStatusUpdateMutation__
 *
 * To run a mutation, you first call `useProjectStatusUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectStatusUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectStatusUpdateMutation, { data, loading, error }] = useProjectStatusUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectStatusUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ProjectStatusUpdateMutation, ProjectStatusUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectStatusUpdateMutation, ProjectStatusUpdateMutationVariables>(ProjectStatusUpdateDocument, options);
      }
export type ProjectStatusUpdateMutationHookResult = ReturnType<typeof useProjectStatusUpdateMutation>;
export type ProjectStatusUpdateMutationResult = Apollo.MutationResult<ProjectStatusUpdateMutation>;
export type ProjectStatusUpdateMutationOptions = Apollo.BaseMutationOptions<ProjectStatusUpdateMutation, ProjectStatusUpdateMutationVariables>;
export const ProjectPublishDocument = gql`
    mutation ProjectPublish($input: ProjectPublishMutationInput!) {
  projectPublish(input: $input) {
    id
    status
  }
}
    `;
export type ProjectPublishMutationFn = Apollo.MutationFunction<ProjectPublishMutation, ProjectPublishMutationVariables>;

/**
 * __useProjectPublishMutation__
 *
 * To run a mutation, you first call `useProjectPublishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectPublishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectPublishMutation, { data, loading, error }] = useProjectPublishMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectPublishMutation(baseOptions?: Apollo.MutationHookOptions<ProjectPublishMutation, ProjectPublishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectPublishMutation, ProjectPublishMutationVariables>(ProjectPublishDocument, options);
      }
export type ProjectPublishMutationHookResult = ReturnType<typeof useProjectPublishMutation>;
export type ProjectPublishMutationResult = Apollo.MutationResult<ProjectPublishMutation>;
export type ProjectPublishMutationOptions = Apollo.BaseMutationOptions<ProjectPublishMutation, ProjectPublishMutationVariables>;
export const ProjectDeleteDocument = gql`
    mutation ProjectDelete($input: DeleteProjectInput!) {
  projectDelete(input: $input) {
    message
    success
  }
}
    `;
export type ProjectDeleteMutationFn = Apollo.MutationFunction<ProjectDeleteMutation, ProjectDeleteMutationVariables>;

/**
 * __useProjectDeleteMutation__
 *
 * To run a mutation, you first call `useProjectDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectDeleteMutation, { data, loading, error }] = useProjectDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectDeleteMutation(baseOptions?: Apollo.MutationHookOptions<ProjectDeleteMutation, ProjectDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectDeleteMutation, ProjectDeleteMutationVariables>(ProjectDeleteDocument, options);
      }
export type ProjectDeleteMutationHookResult = ReturnType<typeof useProjectDeleteMutation>;
export type ProjectDeleteMutationResult = Apollo.MutationResult<ProjectDeleteMutation>;
export type ProjectDeleteMutationOptions = Apollo.BaseMutationOptions<ProjectDeleteMutation, ProjectDeleteMutationVariables>;
export const ProjectFollowDocument = gql`
    mutation ProjectFollow($input: ProjectFollowMutationInput!) {
  projectFollow(input: $input)
}
    `;
export type ProjectFollowMutationFn = Apollo.MutationFunction<ProjectFollowMutation, ProjectFollowMutationVariables>;

/**
 * __useProjectFollowMutation__
 *
 * To run a mutation, you first call `useProjectFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectFollowMutation, { data, loading, error }] = useProjectFollowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectFollowMutation(baseOptions?: Apollo.MutationHookOptions<ProjectFollowMutation, ProjectFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectFollowMutation, ProjectFollowMutationVariables>(ProjectFollowDocument, options);
      }
export type ProjectFollowMutationHookResult = ReturnType<typeof useProjectFollowMutation>;
export type ProjectFollowMutationResult = Apollo.MutationResult<ProjectFollowMutation>;
export type ProjectFollowMutationOptions = Apollo.BaseMutationOptions<ProjectFollowMutation, ProjectFollowMutationVariables>;
export const ProjectUnfollowDocument = gql`
    mutation ProjectUnfollow($input: ProjectFollowMutationInput!) {
  projectUnfollow(input: $input)
}
    `;
export type ProjectUnfollowMutationFn = Apollo.MutationFunction<ProjectUnfollowMutation, ProjectUnfollowMutationVariables>;

/**
 * __useProjectUnfollowMutation__
 *
 * To run a mutation, you first call `useProjectUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectUnfollowMutation, { data, loading, error }] = useProjectUnfollowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<ProjectUnfollowMutation, ProjectUnfollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectUnfollowMutation, ProjectUnfollowMutationVariables>(ProjectUnfollowDocument, options);
      }
export type ProjectUnfollowMutationHookResult = ReturnType<typeof useProjectUnfollowMutation>;
export type ProjectUnfollowMutationResult = Apollo.MutationResult<ProjectUnfollowMutation>;
export type ProjectUnfollowMutationOptions = Apollo.BaseMutationOptions<ProjectUnfollowMutation, ProjectUnfollowMutationVariables>;
export const RewardUpdateDocument = gql`
    mutation RewardUpdate($input: UpdateProjectRewardInput!) {
  projectRewardUpdate(input: $input) {
    ...ProjectReward
  }
}
    ${ProjectRewardFragmentDoc}`;
export type RewardUpdateMutationFn = Apollo.MutationFunction<RewardUpdateMutation, RewardUpdateMutationVariables>;

/**
 * __useRewardUpdateMutation__
 *
 * To run a mutation, you first call `useRewardUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRewardUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rewardUpdateMutation, { data, loading, error }] = useRewardUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRewardUpdateMutation(baseOptions?: Apollo.MutationHookOptions<RewardUpdateMutation, RewardUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RewardUpdateMutation, RewardUpdateMutationVariables>(RewardUpdateDocument, options);
      }
export type RewardUpdateMutationHookResult = ReturnType<typeof useRewardUpdateMutation>;
export type RewardUpdateMutationResult = Apollo.MutationResult<RewardUpdateMutation>;
export type RewardUpdateMutationOptions = Apollo.BaseMutationOptions<RewardUpdateMutation, RewardUpdateMutationVariables>;
export const RewardDeleteDocument = gql`
    mutation RewardDelete($input: DeleteProjectRewardInput!) {
  projectRewardDelete(input: $input)
}
    `;
export type RewardDeleteMutationFn = Apollo.MutationFunction<RewardDeleteMutation, RewardDeleteMutationVariables>;

/**
 * __useRewardDeleteMutation__
 *
 * To run a mutation, you first call `useRewardDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRewardDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rewardDeleteMutation, { data, loading, error }] = useRewardDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRewardDeleteMutation(baseOptions?: Apollo.MutationHookOptions<RewardDeleteMutation, RewardDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RewardDeleteMutation, RewardDeleteMutationVariables>(RewardDeleteDocument, options);
      }
export type RewardDeleteMutationHookResult = ReturnType<typeof useRewardDeleteMutation>;
export type RewardDeleteMutationResult = Apollo.MutationResult<RewardDeleteMutation>;
export type RewardDeleteMutationOptions = Apollo.BaseMutationOptions<RewardDeleteMutation, RewardDeleteMutationVariables>;
export const ProjectRewardCreateDocument = gql`
    mutation ProjectRewardCreate($input: CreateProjectRewardInput!) {
  projectRewardCreate(input: $input) {
    ...ProjectReward
  }
}
    ${ProjectRewardFragmentDoc}`;
export type ProjectRewardCreateMutationFn = Apollo.MutationFunction<ProjectRewardCreateMutation, ProjectRewardCreateMutationVariables>;

/**
 * __useProjectRewardCreateMutation__
 *
 * To run a mutation, you first call `useProjectRewardCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectRewardCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectRewardCreateMutation, { data, loading, error }] = useProjectRewardCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectRewardCreateMutation(baseOptions?: Apollo.MutationHookOptions<ProjectRewardCreateMutation, ProjectRewardCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectRewardCreateMutation, ProjectRewardCreateMutationVariables>(ProjectRewardCreateDocument, options);
      }
export type ProjectRewardCreateMutationHookResult = ReturnType<typeof useProjectRewardCreateMutation>;
export type ProjectRewardCreateMutationResult = Apollo.MutationResult<ProjectRewardCreateMutation>;
export type ProjectRewardCreateMutationOptions = Apollo.BaseMutationOptions<ProjectRewardCreateMutation, ProjectRewardCreateMutationVariables>;
export const ProjectTagAddDocument = gql`
    mutation ProjectTagAdd($input: ProjectTagMutationInput!) {
  projectTagAdd(input: $input) {
    id
    label
  }
}
    `;
export type ProjectTagAddMutationFn = Apollo.MutationFunction<ProjectTagAddMutation, ProjectTagAddMutationVariables>;

/**
 * __useProjectTagAddMutation__
 *
 * To run a mutation, you first call `useProjectTagAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectTagAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectTagAddMutation, { data, loading, error }] = useProjectTagAddMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectTagAddMutation(baseOptions?: Apollo.MutationHookOptions<ProjectTagAddMutation, ProjectTagAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectTagAddMutation, ProjectTagAddMutationVariables>(ProjectTagAddDocument, options);
      }
export type ProjectTagAddMutationHookResult = ReturnType<typeof useProjectTagAddMutation>;
export type ProjectTagAddMutationResult = Apollo.MutationResult<ProjectTagAddMutation>;
export type ProjectTagAddMutationOptions = Apollo.BaseMutationOptions<ProjectTagAddMutation, ProjectTagAddMutationVariables>;
export const ProjectTagRemoveDocument = gql`
    mutation ProjectTagRemove($input: ProjectTagMutationInput!) {
  projectTagRemove(input: $input) {
    id
    label
  }
}
    `;
export type ProjectTagRemoveMutationFn = Apollo.MutationFunction<ProjectTagRemoveMutation, ProjectTagRemoveMutationVariables>;

/**
 * __useProjectTagRemoveMutation__
 *
 * To run a mutation, you first call `useProjectTagRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectTagRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectTagRemoveMutation, { data, loading, error }] = useProjectTagRemoveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectTagRemoveMutation(baseOptions?: Apollo.MutationHookOptions<ProjectTagRemoveMutation, ProjectTagRemoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectTagRemoveMutation, ProjectTagRemoveMutationVariables>(ProjectTagRemoveDocument, options);
      }
export type ProjectTagRemoveMutationHookResult = ReturnType<typeof useProjectTagRemoveMutation>;
export type ProjectTagRemoveMutationResult = Apollo.MutationResult<ProjectTagRemoveMutation>;
export type ProjectTagRemoveMutationOptions = Apollo.BaseMutationOptions<ProjectTagRemoveMutation, ProjectTagRemoveMutationVariables>;
export const ProjectTagCreateDocument = gql`
    mutation ProjectTagCreate($input: TagCreateInput!) {
  tagCreate(input: $input) {
    id
    label
  }
}
    `;
export type ProjectTagCreateMutationFn = Apollo.MutationFunction<ProjectTagCreateMutation, ProjectTagCreateMutationVariables>;

/**
 * __useProjectTagCreateMutation__
 *
 * To run a mutation, you first call `useProjectTagCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectTagCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectTagCreateMutation, { data, loading, error }] = useProjectTagCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectTagCreateMutation(baseOptions?: Apollo.MutationHookOptions<ProjectTagCreateMutation, ProjectTagCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectTagCreateMutation, ProjectTagCreateMutationVariables>(ProjectTagCreateDocument, options);
      }
export type ProjectTagCreateMutationHookResult = ReturnType<typeof useProjectTagCreateMutation>;
export type ProjectTagCreateMutationResult = Apollo.MutationResult<ProjectTagCreateMutation>;
export type ProjectTagCreateMutationOptions = Apollo.BaseMutationOptions<ProjectTagCreateMutation, ProjectTagCreateMutationVariables>;
export const CreateWalletDocument = gql`
    mutation CreateWallet($input: CreateWalletInput!) {
  walletCreate(input: $input) {
    ...ProjectWalletConnectionDetails
  }
}
    ${ProjectWalletConnectionDetailsFragmentDoc}`;
export type CreateWalletMutationFn = Apollo.MutationFunction<CreateWalletMutation, CreateWalletMutationVariables>;

/**
 * __useCreateWalletMutation__
 *
 * To run a mutation, you first call `useCreateWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWalletMutation, { data, loading, error }] = useCreateWalletMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWalletMutation(baseOptions?: Apollo.MutationHookOptions<CreateWalletMutation, CreateWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWalletMutation, CreateWalletMutationVariables>(CreateWalletDocument, options);
      }
export type CreateWalletMutationHookResult = ReturnType<typeof useCreateWalletMutation>;
export type CreateWalletMutationResult = Apollo.MutationResult<CreateWalletMutation>;
export type CreateWalletMutationOptions = Apollo.BaseMutationOptions<CreateWalletMutation, CreateWalletMutationVariables>;
export const UpdateWalletDocument = gql`
    mutation UpdateWallet($input: UpdateWalletInput!) {
  walletUpdate(input: $input) {
    ...ProjectWalletConnectionDetails
  }
}
    ${ProjectWalletConnectionDetailsFragmentDoc}`;
export type UpdateWalletMutationFn = Apollo.MutationFunction<UpdateWalletMutation, UpdateWalletMutationVariables>;

/**
 * __useUpdateWalletMutation__
 *
 * To run a mutation, you first call `useUpdateWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWalletMutation, { data, loading, error }] = useUpdateWalletMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWalletMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWalletMutation, UpdateWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWalletMutation, UpdateWalletMutationVariables>(UpdateWalletDocument, options);
      }
export type UpdateWalletMutationHookResult = ReturnType<typeof useUpdateWalletMutation>;
export type UpdateWalletMutationResult = Apollo.MutationResult<UpdateWalletMutation>;
export type UpdateWalletMutationOptions = Apollo.BaseMutationOptions<UpdateWalletMutation, UpdateWalletMutationVariables>;
export const AffiliateLinksGetDocument = gql`
    query AffiliateLinksGet($input: GetAffiliateLinksInput!) {
  affiliateLinksGet(input: $input) {
    ...ProjectAffiliateLink
  }
}
    ${ProjectAffiliateLinkFragmentDoc}`;

/**
 * __useAffiliateLinksGetQuery__
 *
 * To run a query within a React component, call `useAffiliateLinksGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useAffiliateLinksGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAffiliateLinksGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAffiliateLinksGetQuery(baseOptions: Apollo.QueryHookOptions<AffiliateLinksGetQuery, AffiliateLinksGetQueryVariables> & ({ variables: AffiliateLinksGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AffiliateLinksGetQuery, AffiliateLinksGetQueryVariables>(AffiliateLinksGetDocument, options);
      }
export function useAffiliateLinksGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AffiliateLinksGetQuery, AffiliateLinksGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AffiliateLinksGetQuery, AffiliateLinksGetQueryVariables>(AffiliateLinksGetDocument, options);
        }
export function useAffiliateLinksGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AffiliateLinksGetQuery, AffiliateLinksGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AffiliateLinksGetQuery, AffiliateLinksGetQueryVariables>(AffiliateLinksGetDocument, options);
        }
export type AffiliateLinksGetQueryHookResult = ReturnType<typeof useAffiliateLinksGetQuery>;
export type AffiliateLinksGetLazyQueryHookResult = ReturnType<typeof useAffiliateLinksGetLazyQuery>;
export type AffiliateLinksGetSuspenseQueryHookResult = ReturnType<typeof useAffiliateLinksGetSuspenseQuery>;
export type AffiliateLinksGetQueryResult = Apollo.QueryResult<AffiliateLinksGetQuery, AffiliateLinksGetQueryVariables>;
export const ProjectEntriesDocument = gql`
    query ProjectEntries($where: UniqueProjectQueryInput!, $input: ProjectEntriesGetInput) {
  projectGet(where: $where) {
    id
    entries(input: $input) {
      ...ProjectEntry
    }
  }
}
    ${ProjectEntryFragmentDoc}`;

/**
 * __useProjectEntriesQuery__
 *
 * To run a query within a React component, call `useProjectEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectEntriesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectEntriesQuery(baseOptions: Apollo.QueryHookOptions<ProjectEntriesQuery, ProjectEntriesQueryVariables> & ({ variables: ProjectEntriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectEntriesQuery, ProjectEntriesQueryVariables>(ProjectEntriesDocument, options);
      }
export function useProjectEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectEntriesQuery, ProjectEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectEntriesQuery, ProjectEntriesQueryVariables>(ProjectEntriesDocument, options);
        }
export function useProjectEntriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectEntriesQuery, ProjectEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectEntriesQuery, ProjectEntriesQueryVariables>(ProjectEntriesDocument, options);
        }
export type ProjectEntriesQueryHookResult = ReturnType<typeof useProjectEntriesQuery>;
export type ProjectEntriesLazyQueryHookResult = ReturnType<typeof useProjectEntriesLazyQuery>;
export type ProjectEntriesSuspenseQueryHookResult = ReturnType<typeof useProjectEntriesSuspenseQuery>;
export type ProjectEntriesQueryResult = Apollo.QueryResult<ProjectEntriesQuery, ProjectEntriesQueryVariables>;
export const ProjectUnplublishedEntriesDocument = gql`
    query ProjectUnplublishedEntries($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    id
    entries: entries(input: {where: {published: false}}) {
      ...ProjectEntry
    }
  }
}
    ${ProjectEntryFragmentDoc}`;

/**
 * __useProjectUnplublishedEntriesQuery__
 *
 * To run a query within a React component, call `useProjectUnplublishedEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectUnplublishedEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectUnplublishedEntriesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectUnplublishedEntriesQuery(baseOptions: Apollo.QueryHookOptions<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables> & ({ variables: ProjectUnplublishedEntriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>(ProjectUnplublishedEntriesDocument, options);
      }
export function useProjectUnplublishedEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>(ProjectUnplublishedEntriesDocument, options);
        }
export function useProjectUnplublishedEntriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>(ProjectUnplublishedEntriesDocument, options);
        }
export type ProjectUnplublishedEntriesQueryHookResult = ReturnType<typeof useProjectUnplublishedEntriesQuery>;
export type ProjectUnplublishedEntriesLazyQueryHookResult = ReturnType<typeof useProjectUnplublishedEntriesLazyQuery>;
export type ProjectUnplublishedEntriesSuspenseQueryHookResult = ReturnType<typeof useProjectUnplublishedEntriesSuspenseQuery>;
export type ProjectUnplublishedEntriesQueryResult = Apollo.QueryResult<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>;
export const ProjectEntryDocument = gql`
    query ProjectEntry($entryId: BigInt!) {
  entry(id: $entryId) {
    ...ProjectEntryView
  }
}
    ${ProjectEntryViewFragmentDoc}`;

/**
 * __useProjectEntryQuery__
 *
 * To run a query within a React component, call `useProjectEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectEntryQuery({
 *   variables: {
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useProjectEntryQuery(baseOptions: Apollo.QueryHookOptions<ProjectEntryQuery, ProjectEntryQueryVariables> & ({ variables: ProjectEntryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectEntryQuery, ProjectEntryQueryVariables>(ProjectEntryDocument, options);
      }
export function useProjectEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectEntryQuery, ProjectEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectEntryQuery, ProjectEntryQueryVariables>(ProjectEntryDocument, options);
        }
export function useProjectEntrySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectEntryQuery, ProjectEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectEntryQuery, ProjectEntryQueryVariables>(ProjectEntryDocument, options);
        }
export type ProjectEntryQueryHookResult = ReturnType<typeof useProjectEntryQuery>;
export type ProjectEntryLazyQueryHookResult = ReturnType<typeof useProjectEntryLazyQuery>;
export type ProjectEntrySuspenseQueryHookResult = ReturnType<typeof useProjectEntrySuspenseQuery>;
export type ProjectEntryQueryResult = Apollo.QueryResult<ProjectEntryQuery, ProjectEntryQueryVariables>;
export const ProjectPageFundersDocument = gql`
    query ProjectPageFunders($input: GetFundersInput!) {
  fundersGet(input: $input) {
    ...ProjectFunder
  }
}
    ${ProjectFunderFragmentDoc}`;

/**
 * __useProjectPageFundersQuery__
 *
 * To run a query within a React component, call `useProjectPageFundersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPageFundersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPageFundersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectPageFundersQuery(baseOptions: Apollo.QueryHookOptions<ProjectPageFundersQuery, ProjectPageFundersQueryVariables> & ({ variables: ProjectPageFundersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPageFundersQuery, ProjectPageFundersQueryVariables>(ProjectPageFundersDocument, options);
      }
export function useProjectPageFundersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPageFundersQuery, ProjectPageFundersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPageFundersQuery, ProjectPageFundersQueryVariables>(ProjectPageFundersDocument, options);
        }
export function useProjectPageFundersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectPageFundersQuery, ProjectPageFundersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectPageFundersQuery, ProjectPageFundersQueryVariables>(ProjectPageFundersDocument, options);
        }
export type ProjectPageFundersQueryHookResult = ReturnType<typeof useProjectPageFundersQuery>;
export type ProjectPageFundersLazyQueryHookResult = ReturnType<typeof useProjectPageFundersLazyQuery>;
export type ProjectPageFundersSuspenseQueryHookResult = ReturnType<typeof useProjectPageFundersSuspenseQuery>;
export type ProjectPageFundersQueryResult = Apollo.QueryResult<ProjectPageFundersQuery, ProjectPageFundersQueryVariables>;
export const ProjectLeaderboardContributorsGetDocument = gql`
    query ProjectLeaderboardContributorsGet($input: ProjectLeaderboardContributorsGetInput!) {
  projectLeaderboardContributorsGet(input: $input) {
    ...ProjectLeaderboardContributors
  }
}
    ${ProjectLeaderboardContributorsFragmentDoc}`;

/**
 * __useProjectLeaderboardContributorsGetQuery__
 *
 * To run a query within a React component, call `useProjectLeaderboardContributorsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectLeaderboardContributorsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectLeaderboardContributorsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectLeaderboardContributorsGetQuery(baseOptions: Apollo.QueryHookOptions<ProjectLeaderboardContributorsGetQuery, ProjectLeaderboardContributorsGetQueryVariables> & ({ variables: ProjectLeaderboardContributorsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectLeaderboardContributorsGetQuery, ProjectLeaderboardContributorsGetQueryVariables>(ProjectLeaderboardContributorsGetDocument, options);
      }
export function useProjectLeaderboardContributorsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectLeaderboardContributorsGetQuery, ProjectLeaderboardContributorsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectLeaderboardContributorsGetQuery, ProjectLeaderboardContributorsGetQueryVariables>(ProjectLeaderboardContributorsGetDocument, options);
        }
export function useProjectLeaderboardContributorsGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectLeaderboardContributorsGetQuery, ProjectLeaderboardContributorsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectLeaderboardContributorsGetQuery, ProjectLeaderboardContributorsGetQueryVariables>(ProjectLeaderboardContributorsGetDocument, options);
        }
export type ProjectLeaderboardContributorsGetQueryHookResult = ReturnType<typeof useProjectLeaderboardContributorsGetQuery>;
export type ProjectLeaderboardContributorsGetLazyQueryHookResult = ReturnType<typeof useProjectLeaderboardContributorsGetLazyQuery>;
export type ProjectLeaderboardContributorsGetSuspenseQueryHookResult = ReturnType<typeof useProjectLeaderboardContributorsGetSuspenseQuery>;
export type ProjectLeaderboardContributorsGetQueryResult = Apollo.QueryResult<ProjectLeaderboardContributorsGetQuery, ProjectLeaderboardContributorsGetQueryVariables>;
export const ProjectPageFundingTxDocument = gql`
    query ProjectPageFundingTx($input: GetFundingTxsInput) {
  fundingTxsGet(input: $input) {
    fundingTxs {
      ...ProjectFundingTx
    }
  }
}
    ${ProjectFundingTxFragmentDoc}`;

/**
 * __useProjectPageFundingTxQuery__
 *
 * To run a query within a React component, call `useProjectPageFundingTxQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPageFundingTxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPageFundingTxQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectPageFundingTxQuery(baseOptions?: Apollo.QueryHookOptions<ProjectPageFundingTxQuery, ProjectPageFundingTxQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPageFundingTxQuery, ProjectPageFundingTxQueryVariables>(ProjectPageFundingTxDocument, options);
      }
export function useProjectPageFundingTxLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPageFundingTxQuery, ProjectPageFundingTxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPageFundingTxQuery, ProjectPageFundingTxQueryVariables>(ProjectPageFundingTxDocument, options);
        }
export function useProjectPageFundingTxSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectPageFundingTxQuery, ProjectPageFundingTxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectPageFundingTxQuery, ProjectPageFundingTxQueryVariables>(ProjectPageFundingTxDocument, options);
        }
export type ProjectPageFundingTxQueryHookResult = ReturnType<typeof useProjectPageFundingTxQuery>;
export type ProjectPageFundingTxLazyQueryHookResult = ReturnType<typeof useProjectPageFundingTxLazyQuery>;
export type ProjectPageFundingTxSuspenseQueryHookResult = ReturnType<typeof useProjectPageFundingTxSuspenseQuery>;
export type ProjectPageFundingTxQueryResult = Apollo.QueryResult<ProjectPageFundingTxQuery, ProjectPageFundingTxQueryVariables>;
export const FundingTxWithInvoiceStatusDocument = gql`
    query FundingTxWithInvoiceStatus($fundingTxID: BigInt!) {
  fundingTx(id: $fundingTxID) {
    ...FundingTxWithInvoiceStatus
  }
}
    ${FundingTxWithInvoiceStatusFragmentDoc}`;

/**
 * __useFundingTxWithInvoiceStatusQuery__
 *
 * To run a query within a React component, call `useFundingTxWithInvoiceStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useFundingTxWithInvoiceStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFundingTxWithInvoiceStatusQuery({
 *   variables: {
 *      fundingTxID: // value for 'fundingTxID'
 *   },
 * });
 */
export function useFundingTxWithInvoiceStatusQuery(baseOptions: Apollo.QueryHookOptions<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables> & ({ variables: FundingTxWithInvoiceStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables>(FundingTxWithInvoiceStatusDocument, options);
      }
export function useFundingTxWithInvoiceStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables>(FundingTxWithInvoiceStatusDocument, options);
        }
export function useFundingTxWithInvoiceStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables>(FundingTxWithInvoiceStatusDocument, options);
        }
export type FundingTxWithInvoiceStatusQueryHookResult = ReturnType<typeof useFundingTxWithInvoiceStatusQuery>;
export type FundingTxWithInvoiceStatusLazyQueryHookResult = ReturnType<typeof useFundingTxWithInvoiceStatusLazyQuery>;
export type FundingTxWithInvoiceStatusSuspenseQueryHookResult = ReturnType<typeof useFundingTxWithInvoiceStatusSuspenseQuery>;
export type FundingTxWithInvoiceStatusQueryResult = Apollo.QueryResult<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables>;
export const FundingTxForDownloadInvoiceDocument = gql`
    query FundingTxForDownloadInvoice($fundingTxId: BigInt!) {
  fundingTx(id: $fundingTxId) {
    ...FundingTxForDownloadInvoice
  }
}
    ${FundingTxForDownloadInvoiceFragmentDoc}`;

/**
 * __useFundingTxForDownloadInvoiceQuery__
 *
 * To run a query within a React component, call `useFundingTxForDownloadInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useFundingTxForDownloadInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFundingTxForDownloadInvoiceQuery({
 *   variables: {
 *      fundingTxId: // value for 'fundingTxId'
 *   },
 * });
 */
export function useFundingTxForDownloadInvoiceQuery(baseOptions: Apollo.QueryHookOptions<FundingTxForDownloadInvoiceQuery, FundingTxForDownloadInvoiceQueryVariables> & ({ variables: FundingTxForDownloadInvoiceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FundingTxForDownloadInvoiceQuery, FundingTxForDownloadInvoiceQueryVariables>(FundingTxForDownloadInvoiceDocument, options);
      }
export function useFundingTxForDownloadInvoiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FundingTxForDownloadInvoiceQuery, FundingTxForDownloadInvoiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FundingTxForDownloadInvoiceQuery, FundingTxForDownloadInvoiceQueryVariables>(FundingTxForDownloadInvoiceDocument, options);
        }
export function useFundingTxForDownloadInvoiceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FundingTxForDownloadInvoiceQuery, FundingTxForDownloadInvoiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FundingTxForDownloadInvoiceQuery, FundingTxForDownloadInvoiceQueryVariables>(FundingTxForDownloadInvoiceDocument, options);
        }
export type FundingTxForDownloadInvoiceQueryHookResult = ReturnType<typeof useFundingTxForDownloadInvoiceQuery>;
export type FundingTxForDownloadInvoiceLazyQueryHookResult = ReturnType<typeof useFundingTxForDownloadInvoiceLazyQuery>;
export type FundingTxForDownloadInvoiceSuspenseQueryHookResult = ReturnType<typeof useFundingTxForDownloadInvoiceSuspenseQuery>;
export type FundingTxForDownloadInvoiceQueryResult = Apollo.QueryResult<FundingTxForDownloadInvoiceQuery, FundingTxForDownloadInvoiceQueryVariables>;
export const ProjectInProgressGoalsDocument = gql`
    query ProjectInProgressGoals($input: GetProjectGoalsInput!) {
  projectGoals(input: $input) {
    inProgress {
      ...ProjectGoals
    }
  }
}
    ${ProjectGoalsFragmentDoc}`;

/**
 * __useProjectInProgressGoalsQuery__
 *
 * To run a query within a React component, call `useProjectInProgressGoalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectInProgressGoalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectInProgressGoalsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectInProgressGoalsQuery(baseOptions: Apollo.QueryHookOptions<ProjectInProgressGoalsQuery, ProjectInProgressGoalsQueryVariables> & ({ variables: ProjectInProgressGoalsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectInProgressGoalsQuery, ProjectInProgressGoalsQueryVariables>(ProjectInProgressGoalsDocument, options);
      }
export function useProjectInProgressGoalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectInProgressGoalsQuery, ProjectInProgressGoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectInProgressGoalsQuery, ProjectInProgressGoalsQueryVariables>(ProjectInProgressGoalsDocument, options);
        }
export function useProjectInProgressGoalsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectInProgressGoalsQuery, ProjectInProgressGoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectInProgressGoalsQuery, ProjectInProgressGoalsQueryVariables>(ProjectInProgressGoalsDocument, options);
        }
export type ProjectInProgressGoalsQueryHookResult = ReturnType<typeof useProjectInProgressGoalsQuery>;
export type ProjectInProgressGoalsLazyQueryHookResult = ReturnType<typeof useProjectInProgressGoalsLazyQuery>;
export type ProjectInProgressGoalsSuspenseQueryHookResult = ReturnType<typeof useProjectInProgressGoalsSuspenseQuery>;
export type ProjectInProgressGoalsQueryResult = Apollo.QueryResult<ProjectInProgressGoalsQuery, ProjectInProgressGoalsQueryVariables>;
export const ProjectCompletedGoalsDocument = gql`
    query ProjectCompletedGoals($input: GetProjectGoalsInput!) {
  projectGoals(input: $input) {
    completed {
      ...ProjectGoals
    }
  }
}
    ${ProjectGoalsFragmentDoc}`;

/**
 * __useProjectCompletedGoalsQuery__
 *
 * To run a query within a React component, call `useProjectCompletedGoalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectCompletedGoalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectCompletedGoalsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectCompletedGoalsQuery(baseOptions: Apollo.QueryHookOptions<ProjectCompletedGoalsQuery, ProjectCompletedGoalsQueryVariables> & ({ variables: ProjectCompletedGoalsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectCompletedGoalsQuery, ProjectCompletedGoalsQueryVariables>(ProjectCompletedGoalsDocument, options);
      }
export function useProjectCompletedGoalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectCompletedGoalsQuery, ProjectCompletedGoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectCompletedGoalsQuery, ProjectCompletedGoalsQueryVariables>(ProjectCompletedGoalsDocument, options);
        }
export function useProjectCompletedGoalsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectCompletedGoalsQuery, ProjectCompletedGoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectCompletedGoalsQuery, ProjectCompletedGoalsQueryVariables>(ProjectCompletedGoalsDocument, options);
        }
export type ProjectCompletedGoalsQueryHookResult = ReturnType<typeof useProjectCompletedGoalsQuery>;
export type ProjectCompletedGoalsLazyQueryHookResult = ReturnType<typeof useProjectCompletedGoalsLazyQuery>;
export type ProjectCompletedGoalsSuspenseQueryHookResult = ReturnType<typeof useProjectCompletedGoalsSuspenseQuery>;
export type ProjectCompletedGoalsQueryResult = Apollo.QueryResult<ProjectCompletedGoalsQuery, ProjectCompletedGoalsQueryVariables>;
export const ProjectPageBodyDocument = gql`
    query ProjectPageBody($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    ...ProjectPageBody
  }
}
    ${ProjectPageBodyFragmentDoc}`;

/**
 * __useProjectPageBodyQuery__
 *
 * To run a query within a React component, call `useProjectPageBodyQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPageBodyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPageBodyQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectPageBodyQuery(baseOptions: Apollo.QueryHookOptions<ProjectPageBodyQuery, ProjectPageBodyQueryVariables> & ({ variables: ProjectPageBodyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPageBodyQuery, ProjectPageBodyQueryVariables>(ProjectPageBodyDocument, options);
      }
export function useProjectPageBodyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPageBodyQuery, ProjectPageBodyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPageBodyQuery, ProjectPageBodyQueryVariables>(ProjectPageBodyDocument, options);
        }
export function useProjectPageBodySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectPageBodyQuery, ProjectPageBodyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectPageBodyQuery, ProjectPageBodyQueryVariables>(ProjectPageBodyDocument, options);
        }
export type ProjectPageBodyQueryHookResult = ReturnType<typeof useProjectPageBodyQuery>;
export type ProjectPageBodyLazyQueryHookResult = ReturnType<typeof useProjectPageBodyLazyQuery>;
export type ProjectPageBodySuspenseQueryHookResult = ReturnType<typeof useProjectPageBodySuspenseQuery>;
export type ProjectPageBodyQueryResult = Apollo.QueryResult<ProjectPageBodyQuery, ProjectPageBodyQueryVariables>;
export const ProjectPageDetailsDocument = gql`
    query ProjectPageDetails($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    ...ProjectPageDetails
  }
}
    ${ProjectPageDetailsFragmentDoc}`;

/**
 * __useProjectPageDetailsQuery__
 *
 * To run a query within a React component, call `useProjectPageDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPageDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPageDetailsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectPageDetailsQuery(baseOptions: Apollo.QueryHookOptions<ProjectPageDetailsQuery, ProjectPageDetailsQueryVariables> & ({ variables: ProjectPageDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPageDetailsQuery, ProjectPageDetailsQueryVariables>(ProjectPageDetailsDocument, options);
      }
export function useProjectPageDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPageDetailsQuery, ProjectPageDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPageDetailsQuery, ProjectPageDetailsQueryVariables>(ProjectPageDetailsDocument, options);
        }
export function useProjectPageDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectPageDetailsQuery, ProjectPageDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectPageDetailsQuery, ProjectPageDetailsQueryVariables>(ProjectPageDetailsDocument, options);
        }
export type ProjectPageDetailsQueryHookResult = ReturnType<typeof useProjectPageDetailsQuery>;
export type ProjectPageDetailsLazyQueryHookResult = ReturnType<typeof useProjectPageDetailsLazyQuery>;
export type ProjectPageDetailsSuspenseQueryHookResult = ReturnType<typeof useProjectPageDetailsSuspenseQuery>;
export type ProjectPageDetailsQueryResult = Apollo.QueryResult<ProjectPageDetailsQuery, ProjectPageDetailsQueryVariables>;
export const ProjectPageHeaderSummaryDocument = gql`
    query ProjectPageHeaderSummary($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    ...ProjectHeaderSummary
  }
}
    ${ProjectHeaderSummaryFragmentDoc}`;

/**
 * __useProjectPageHeaderSummaryQuery__
 *
 * To run a query within a React component, call `useProjectPageHeaderSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPageHeaderSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPageHeaderSummaryQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectPageHeaderSummaryQuery(baseOptions: Apollo.QueryHookOptions<ProjectPageHeaderSummaryQuery, ProjectPageHeaderSummaryQueryVariables> & ({ variables: ProjectPageHeaderSummaryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPageHeaderSummaryQuery, ProjectPageHeaderSummaryQueryVariables>(ProjectPageHeaderSummaryDocument, options);
      }
export function useProjectPageHeaderSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPageHeaderSummaryQuery, ProjectPageHeaderSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPageHeaderSummaryQuery, ProjectPageHeaderSummaryQueryVariables>(ProjectPageHeaderSummaryDocument, options);
        }
export function useProjectPageHeaderSummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectPageHeaderSummaryQuery, ProjectPageHeaderSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectPageHeaderSummaryQuery, ProjectPageHeaderSummaryQueryVariables>(ProjectPageHeaderSummaryDocument, options);
        }
export type ProjectPageHeaderSummaryQueryHookResult = ReturnType<typeof useProjectPageHeaderSummaryQuery>;
export type ProjectPageHeaderSummaryLazyQueryHookResult = ReturnType<typeof useProjectPageHeaderSummaryLazyQuery>;
export type ProjectPageHeaderSummarySuspenseQueryHookResult = ReturnType<typeof useProjectPageHeaderSummarySuspenseQuery>;
export type ProjectPageHeaderSummaryQueryResult = Apollo.QueryResult<ProjectPageHeaderSummaryQuery, ProjectPageHeaderSummaryQueryVariables>;
export const ProjectPageWalletsDocument = gql`
    query ProjectPageWallets($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    wallets {
      ...ProjectPageWallet
    }
  }
}
    ${ProjectPageWalletFragmentDoc}`;

/**
 * __useProjectPageWalletsQuery__
 *
 * To run a query within a React component, call `useProjectPageWalletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPageWalletsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPageWalletsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectPageWalletsQuery(baseOptions: Apollo.QueryHookOptions<ProjectPageWalletsQuery, ProjectPageWalletsQueryVariables> & ({ variables: ProjectPageWalletsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPageWalletsQuery, ProjectPageWalletsQueryVariables>(ProjectPageWalletsDocument, options);
      }
export function useProjectPageWalletsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPageWalletsQuery, ProjectPageWalletsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPageWalletsQuery, ProjectPageWalletsQueryVariables>(ProjectPageWalletsDocument, options);
        }
export function useProjectPageWalletsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectPageWalletsQuery, ProjectPageWalletsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectPageWalletsQuery, ProjectPageWalletsQueryVariables>(ProjectPageWalletsDocument, options);
        }
export type ProjectPageWalletsQueryHookResult = ReturnType<typeof useProjectPageWalletsQuery>;
export type ProjectPageWalletsLazyQueryHookResult = ReturnType<typeof useProjectPageWalletsLazyQuery>;
export type ProjectPageWalletsSuspenseQueryHookResult = ReturnType<typeof useProjectPageWalletsSuspenseQuery>;
export type ProjectPageWalletsQueryResult = Apollo.QueryResult<ProjectPageWalletsQuery, ProjectPageWalletsQueryVariables>;
export const ProjectWalletConnectionDetailsDocument = gql`
    query ProjectWalletConnectionDetails($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    wallets {
      ...ProjectWalletConnectionDetails
    }
  }
}
    ${ProjectWalletConnectionDetailsFragmentDoc}`;

/**
 * __useProjectWalletConnectionDetailsQuery__
 *
 * To run a query within a React component, call `useProjectWalletConnectionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectWalletConnectionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectWalletConnectionDetailsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectWalletConnectionDetailsQuery(baseOptions: Apollo.QueryHookOptions<ProjectWalletConnectionDetailsQuery, ProjectWalletConnectionDetailsQueryVariables> & ({ variables: ProjectWalletConnectionDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectWalletConnectionDetailsQuery, ProjectWalletConnectionDetailsQueryVariables>(ProjectWalletConnectionDetailsDocument, options);
      }
export function useProjectWalletConnectionDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectWalletConnectionDetailsQuery, ProjectWalletConnectionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectWalletConnectionDetailsQuery, ProjectWalletConnectionDetailsQueryVariables>(ProjectWalletConnectionDetailsDocument, options);
        }
export function useProjectWalletConnectionDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectWalletConnectionDetailsQuery, ProjectWalletConnectionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectWalletConnectionDetailsQuery, ProjectWalletConnectionDetailsQueryVariables>(ProjectWalletConnectionDetailsDocument, options);
        }
export type ProjectWalletConnectionDetailsQueryHookResult = ReturnType<typeof useProjectWalletConnectionDetailsQuery>;
export type ProjectWalletConnectionDetailsLazyQueryHookResult = ReturnType<typeof useProjectWalletConnectionDetailsLazyQuery>;
export type ProjectWalletConnectionDetailsSuspenseQueryHookResult = ReturnType<typeof useProjectWalletConnectionDetailsSuspenseQuery>;
export type ProjectWalletConnectionDetailsQueryResult = Apollo.QueryResult<ProjectWalletConnectionDetailsQuery, ProjectWalletConnectionDetailsQueryVariables>;
export const ProjectStatsGetInsightDocument = gql`
    query ProjectStatsGetInsight($input: GetProjectStatsInput!) {
  projectStatsGet(input: $input) {
    ...ProjectStatsForInsightsPage
  }
}
    ${ProjectStatsForInsightsPageFragmentDoc}`;

/**
 * __useProjectStatsGetInsightQuery__
 *
 * To run a query within a React component, call `useProjectStatsGetInsightQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectStatsGetInsightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectStatsGetInsightQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectStatsGetInsightQuery(baseOptions: Apollo.QueryHookOptions<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables> & ({ variables: ProjectStatsGetInsightQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>(ProjectStatsGetInsightDocument, options);
      }
export function useProjectStatsGetInsightLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>(ProjectStatsGetInsightDocument, options);
        }
export function useProjectStatsGetInsightSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>(ProjectStatsGetInsightDocument, options);
        }
export type ProjectStatsGetInsightQueryHookResult = ReturnType<typeof useProjectStatsGetInsightQuery>;
export type ProjectStatsGetInsightLazyQueryHookResult = ReturnType<typeof useProjectStatsGetInsightLazyQuery>;
export type ProjectStatsGetInsightSuspenseQueryHookResult = ReturnType<typeof useProjectStatsGetInsightSuspenseQuery>;
export type ProjectStatsGetInsightQueryResult = Apollo.QueryResult<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>;
export const ProjectHistoryStatsGetDocument = gql`
    query ProjectHistoryStatsGet($input: GetProjectStatsInput!) {
  projectStatsGet(input: $input) {
    ...ProjectHistoryStats
  }
}
    ${ProjectHistoryStatsFragmentDoc}`;

/**
 * __useProjectHistoryStatsGetQuery__
 *
 * To run a query within a React component, call `useProjectHistoryStatsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectHistoryStatsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectHistoryStatsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectHistoryStatsGetQuery(baseOptions: Apollo.QueryHookOptions<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables> & ({ variables: ProjectHistoryStatsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>(ProjectHistoryStatsGetDocument, options);
      }
export function useProjectHistoryStatsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>(ProjectHistoryStatsGetDocument, options);
        }
export function useProjectHistoryStatsGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>(ProjectHistoryStatsGetDocument, options);
        }
export type ProjectHistoryStatsGetQueryHookResult = ReturnType<typeof useProjectHistoryStatsGetQuery>;
export type ProjectHistoryStatsGetLazyQueryHookResult = ReturnType<typeof useProjectHistoryStatsGetLazyQuery>;
export type ProjectHistoryStatsGetSuspenseQueryHookResult = ReturnType<typeof useProjectHistoryStatsGetSuspenseQuery>;
export type ProjectHistoryStatsGetQueryResult = Apollo.QueryResult<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>;
export const ProjectRewardSoldGraphStatsGetDocument = gql`
    query ProjectRewardSoldGraphStatsGet($input: GetProjectStatsInput!) {
  projectStatsGet(input: $input) {
    ...ProjectRewardSoldGraphStats
  }
}
    ${ProjectRewardSoldGraphStatsFragmentDoc}`;

/**
 * __useProjectRewardSoldGraphStatsGetQuery__
 *
 * To run a query within a React component, call `useProjectRewardSoldGraphStatsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectRewardSoldGraphStatsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectRewardSoldGraphStatsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectRewardSoldGraphStatsGetQuery(baseOptions: Apollo.QueryHookOptions<ProjectRewardSoldGraphStatsGetQuery, ProjectRewardSoldGraphStatsGetQueryVariables> & ({ variables: ProjectRewardSoldGraphStatsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectRewardSoldGraphStatsGetQuery, ProjectRewardSoldGraphStatsGetQueryVariables>(ProjectRewardSoldGraphStatsGetDocument, options);
      }
export function useProjectRewardSoldGraphStatsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectRewardSoldGraphStatsGetQuery, ProjectRewardSoldGraphStatsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectRewardSoldGraphStatsGetQuery, ProjectRewardSoldGraphStatsGetQueryVariables>(ProjectRewardSoldGraphStatsGetDocument, options);
        }
export function useProjectRewardSoldGraphStatsGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectRewardSoldGraphStatsGetQuery, ProjectRewardSoldGraphStatsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectRewardSoldGraphStatsGetQuery, ProjectRewardSoldGraphStatsGetQueryVariables>(ProjectRewardSoldGraphStatsGetDocument, options);
        }
export type ProjectRewardSoldGraphStatsGetQueryHookResult = ReturnType<typeof useProjectRewardSoldGraphStatsGetQuery>;
export type ProjectRewardSoldGraphStatsGetLazyQueryHookResult = ReturnType<typeof useProjectRewardSoldGraphStatsGetLazyQuery>;
export type ProjectRewardSoldGraphStatsGetSuspenseQueryHookResult = ReturnType<typeof useProjectRewardSoldGraphStatsGetSuspenseQuery>;
export type ProjectRewardSoldGraphStatsGetQueryResult = Apollo.QueryResult<ProjectRewardSoldGraphStatsGetQuery, ProjectRewardSoldGraphStatsGetQueryVariables>;
export const ProjectFundingMethodStatsGetDocument = gql`
    query ProjectFundingMethodStatsGet($input: GetProjectStatsInput!) {
  projectStatsGet(input: $input) {
    ...ProjectFundingMethodStats
  }
}
    ${ProjectFundingMethodStatsFragmentDoc}`;

/**
 * __useProjectFundingMethodStatsGetQuery__
 *
 * To run a query within a React component, call `useProjectFundingMethodStatsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectFundingMethodStatsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectFundingMethodStatsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectFundingMethodStatsGetQuery(baseOptions: Apollo.QueryHookOptions<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables> & ({ variables: ProjectFundingMethodStatsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>(ProjectFundingMethodStatsGetDocument, options);
      }
export function useProjectFundingMethodStatsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>(ProjectFundingMethodStatsGetDocument, options);
        }
export function useProjectFundingMethodStatsGetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>(ProjectFundingMethodStatsGetDocument, options);
        }
export type ProjectFundingMethodStatsGetQueryHookResult = ReturnType<typeof useProjectFundingMethodStatsGetQuery>;
export type ProjectFundingMethodStatsGetLazyQueryHookResult = ReturnType<typeof useProjectFundingMethodStatsGetLazyQuery>;
export type ProjectFundingMethodStatsGetSuspenseQueryHookResult = ReturnType<typeof useProjectFundingMethodStatsGetSuspenseQuery>;
export type ProjectFundingMethodStatsGetQueryResult = Apollo.QueryResult<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>;
export const ProjectRewardsDocument = gql`
    query ProjectRewards($input: GetProjectRewardInput!) {
  projectRewardsGet(input: $input) {
    ...ProjectReward
  }
}
    ${ProjectRewardFragmentDoc}`;

/**
 * __useProjectRewardsQuery__
 *
 * To run a query within a React component, call `useProjectRewardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectRewardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectRewardsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectRewardsQuery(baseOptions: Apollo.QueryHookOptions<ProjectRewardsQuery, ProjectRewardsQueryVariables> & ({ variables: ProjectRewardsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectRewardsQuery, ProjectRewardsQueryVariables>(ProjectRewardsDocument, options);
      }
export function useProjectRewardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectRewardsQuery, ProjectRewardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectRewardsQuery, ProjectRewardsQueryVariables>(ProjectRewardsDocument, options);
        }
export function useProjectRewardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectRewardsQuery, ProjectRewardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectRewardsQuery, ProjectRewardsQueryVariables>(ProjectRewardsDocument, options);
        }
export type ProjectRewardsQueryHookResult = ReturnType<typeof useProjectRewardsQuery>;
export type ProjectRewardsLazyQueryHookResult = ReturnType<typeof useProjectRewardsLazyQuery>;
export type ProjectRewardsSuspenseQueryHookResult = ReturnType<typeof useProjectRewardsSuspenseQuery>;
export type ProjectRewardsQueryResult = Apollo.QueryResult<ProjectRewardsQuery, ProjectRewardsQueryVariables>;
export const ProjectRewardDocument = gql`
    query ProjectReward($getProjectRewardId: BigInt!) {
  getProjectReward(id: $getProjectRewardId) {
    ...ProjectReward
  }
}
    ${ProjectRewardFragmentDoc}`;

/**
 * __useProjectRewardQuery__
 *
 * To run a query within a React component, call `useProjectRewardQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectRewardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectRewardQuery({
 *   variables: {
 *      getProjectRewardId: // value for 'getProjectRewardId'
 *   },
 * });
 */
export function useProjectRewardQuery(baseOptions: Apollo.QueryHookOptions<ProjectRewardQuery, ProjectRewardQueryVariables> & ({ variables: ProjectRewardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectRewardQuery, ProjectRewardQueryVariables>(ProjectRewardDocument, options);
      }
export function useProjectRewardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectRewardQuery, ProjectRewardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectRewardQuery, ProjectRewardQueryVariables>(ProjectRewardDocument, options);
        }
export function useProjectRewardSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectRewardQuery, ProjectRewardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectRewardQuery, ProjectRewardQueryVariables>(ProjectRewardDocument, options);
        }
export type ProjectRewardQueryHookResult = ReturnType<typeof useProjectRewardQuery>;
export type ProjectRewardLazyQueryHookResult = ReturnType<typeof useProjectRewardLazyQuery>;
export type ProjectRewardSuspenseQueryHookResult = ReturnType<typeof useProjectRewardSuspenseQuery>;
export type ProjectRewardQueryResult = Apollo.QueryResult<ProjectRewardQuery, ProjectRewardQueryVariables>;
export const FundingTxStatusUpdatedDocument = gql`
    subscription FundingTxStatusUpdated($input: FundingTxStatusUpdatedInput) {
  fundingTxStatusUpdated(input: $input) {
    fundingTx {
      ...FundingTx
    }
  }
}
    ${FundingTxFragmentDoc}`;

/**
 * __useFundingTxStatusUpdatedSubscription__
 *
 * To run a query within a React component, call `useFundingTxStatusUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFundingTxStatusUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFundingTxStatusUpdatedSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFundingTxStatusUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<FundingTxStatusUpdatedSubscription, FundingTxStatusUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FundingTxStatusUpdatedSubscription, FundingTxStatusUpdatedSubscriptionVariables>(FundingTxStatusUpdatedDocument, options);
      }
export type FundingTxStatusUpdatedSubscriptionHookResult = ReturnType<typeof useFundingTxStatusUpdatedSubscription>;
export type FundingTxStatusUpdatedSubscriptionResult = Apollo.SubscriptionResult<FundingTxStatusUpdatedSubscription>;