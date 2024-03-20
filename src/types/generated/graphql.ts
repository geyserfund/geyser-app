import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Add BigInt functionality */
  BigInt: any
  /** Date custom scalar type */
  Date: any
}

export type Activity = {
  __typename?: 'Activity'
  createdAt: Scalars['Date']
  id: Scalars['String']
  resource: ActivityResource
}

export type ActivityCreatedSubscriptionInput = {
  where?: InputMaybe<ActivityCreatedSubscriptionWhereInput>
}

export type ActivityCreatedSubscriptionWhereInput = {
  countryCode?: InputMaybe<Scalars['String']>
  projectIds?: InputMaybe<Array<Scalars['BigInt']>>
  region?: InputMaybe<Scalars['String']>
  resourceType?: InputMaybe<ActivityResourceType>
  tagIds?: InputMaybe<Array<Scalars['Int']>>
  userIds?: InputMaybe<Array<Scalars['BigInt']>>
}

export type ActivityResource = Entry | FundingTx | Project | ProjectReward

export enum ActivityResourceType {
  Entry = 'entry',
  FundingTx = 'funding_tx',
  Project = 'project',
  ProjectReward = 'project_reward',
}

export type Ambassador = {
  __typename?: 'Ambassador'
  confirmed: Scalars['Boolean']
  id: Scalars['BigInt']
  user: User
}

export type AmountSummary = {
  __typename?: 'AmountSummary'
  donationAmount: Scalars['Int']
  rewardsCost: Scalars['Int']
  shippingCost: Scalars['Int']
  total: Scalars['Int']
}

export enum AnalyticsGroupByInterval {
  Day = 'day',
  Month = 'month',
  Week = 'week',
  Year = 'year',
}

export type Badge = {
  __typename?: 'Badge'
  createdAt: Scalars['Date']
  description: Scalars['String']
  id: Scalars['String']
  image: Scalars['String']
  name: Scalars['String']
  thumb: Scalars['String']
  uniqueName: Scalars['String']
}

export type BadgeClaimInput = {
  userBadgeId: Scalars['BigInt']
}

export type BadgesGetInput = {
  where?: InputMaybe<BadgesGetWhereInput>
}

export type BadgesGetWhereInput = {
  fundingTxId?: InputMaybe<Scalars['BigInt']>
  userId?: InputMaybe<Scalars['BigInt']>
}

export enum BaseCurrency {
  Btc = 'BTC',
}

export type BitcoinQuote = {
  __typename?: 'BitcoinQuote'
  quote: Scalars['Float']
  quoteCurrency: QuoteCurrency
}

export type ConnectionDetails =
  | LightningAddressConnectionDetails
  | LndConnectionDetailsPrivate
  | LndConnectionDetailsPublic

export type Country = {
  __typename?: 'Country'
  code: Scalars['String']
  name: Scalars['String']
}

export type CreateEntryInput = {
  content?: InputMaybe<Scalars['String']>
  /** Short description of the Entry. */
  description: Scalars['String']
  /** Header image of the Entry. */
  image?: InputMaybe<Scalars['String']>
  projectId: Scalars['BigInt']
  /** Title of the Entry. */
  title: Scalars['String']
  type: EntryType
}

export type CreateProjectInput = {
  /** Project ISO3166 country code */
  countryCode?: InputMaybe<Scalars['String']>
  /** A short description of the project. */
  description: Scalars['String']
  email: Scalars['String']
  /** Main project image. */
  image?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  /** Project region */
  region?: InputMaybe<Scalars['String']>
  /** The currency used to price rewards for the project. Currently only USDCENT supported. */
  rewardCurrency?: InputMaybe<RewardCurrency>
  shortDescription?: InputMaybe<Scalars['String']>
  thumbnailImage?: InputMaybe<Scalars['String']>
  /** Public title of the project. */
  title: Scalars['String']
  type?: InputMaybe<ProjectType>
}

export type CreateProjectMilestoneInput = {
  /** Amount the project balance must reach to consider the milestone completed, in satoshis. */
  amount: Scalars['Int']
  description: Scalars['String']
  name: Scalars['String']
  projectId: Scalars['BigInt']
}

export type CreateProjectRewardInput = {
  category?: InputMaybe<Scalars['String']>
  /** Cost of the reward, currently only in USD cents */
  cost: Scalars['Int']
  description?: InputMaybe<Scalars['String']>
  estimatedAvailabilityDate?: InputMaybe<Scalars['Date']>
  estimatedDeliveryInWeeks?: InputMaybe<Scalars['Int']>
  hasShipping: Scalars['Boolean']
  image?: InputMaybe<Scalars['String']>
  isAddon?: InputMaybe<Scalars['Boolean']>
  isHidden?: InputMaybe<Scalars['Boolean']>
  maxClaimable?: InputMaybe<Scalars['Int']>
  name: Scalars['String']
  preOrder?: InputMaybe<Scalars['Boolean']>
  projectId: Scalars['BigInt']
}

export type CreateWalletInput = {
  lightningAddressConnectionDetailsInput?: InputMaybe<LightningAddressConnectionDetailsCreateInput>
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsCreateInput>
  name?: InputMaybe<Scalars['String']>
  resourceInput: WalletResourceInput
}

export enum Currency {
  Usdcent = 'USDCENT',
}

export type CurrencyQuoteGetInput = {
  baseCurrency: BaseCurrency
  quoteCurrency: QuoteCurrency
}

export type CurrencyQuoteGetResponse = {
  __typename?: 'CurrencyQuoteGetResponse'
  baseCurrency: BaseCurrency
  quote: Scalars['Float']
  quoteCurrency: QuoteCurrency
  timestamp: Scalars['Date']
}

export type CursorInput = {
  id: Scalars['BigInt']
}

export type CursorInputString = {
  id: Scalars['String']
}

export type CursorPaginationResponse = {
  __typename?: 'CursorPaginationResponse'
  count?: Maybe<Scalars['Int']>
  cursor?: Maybe<PaginationCursor>
  take?: Maybe<Scalars['Int']>
}

export type DateRangeInput = {
  endDateTime?: InputMaybe<Scalars['Date']>
  startDateTime?: InputMaybe<Scalars['Date']>
}

export type DatetimeRange = {
  __typename?: 'DatetimeRange'
  /** The end datetime for filtering the data, default is now. */
  endDateTime?: Maybe<Scalars['Date']>
  /** The start datetime for filtering the data. */
  startDateTime: Scalars['Date']
}

export type DeleteProjectInput = {
  projectId: Scalars['BigInt']
}

export type DeleteProjectRewardInput = {
  projectRewardId: Scalars['BigInt']
}

export type DeleteUserResponse = MutationResponse & {
  __typename?: 'DeleteUserResponse'
  message?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
}

export type EmailVerifyInput = {
  otp: Scalars['Int']
  otpVerificationToken: Scalars['String']
}

export type Entry = {
  __typename?: 'Entry'
  /** Total amount of satoshis funded from the Entry page. */
  amountFunded: Scalars['Int']
  content?: Maybe<Scalars['String']>
  createdAt: Scalars['String']
  /** User that created the Entry. */
  creator: User
  /** Short description of the Entry. */
  description: Scalars['String']
  /** Number of funders that were created from the Entry's page. */
  fundersCount: Scalars['Int']
  /** Funding transactions that were created from the Entry's page. */
  fundingTxs: Array<FundingTx>
  id: Scalars['BigInt']
  /** Header image of the Entry. */
  image?: Maybe<Scalars['String']>
  /** Project within which the Entry was created. */
  project?: Maybe<Project>
  publishedAt?: Maybe<Scalars['String']>
  status: EntryStatus
  /** Title of the Entry. */
  title: Scalars['String']
  type: EntryType
  updatedAt: Scalars['String']
}

export type EntryPublishedSubscriptionResponse = {
  __typename?: 'EntryPublishedSubscriptionResponse'
  entry: Entry
}

export enum EntryStatus {
  Deleted = 'deleted',
  Published = 'published',
  Unpublished = 'unpublished',
}

export enum EntryType {
  Article = 'article',
  Podcast = 'podcast',
  Video = 'video',
}

export type ExternalAccount = {
  __typename?: 'ExternalAccount'
  accountType: Scalars['String']
  externalId: Scalars['String']
  externalUsername: Scalars['String']
  id: Scalars['BigInt']
  public: Scalars['Boolean']
}

export type FileUploadInput = {
  name?: InputMaybe<Scalars['String']>
  /** MIME type of the file. Currently only supports image types. */
  type?: InputMaybe<Scalars['String']>
}

/** The Funder type contains a User's funding details over a particular project. */
export type Funder = {
  __typename?: 'Funder'
  /** Aggregate amount funded by a Funder over all his (confirmed) funding transactions for a particular project, in satoshis. */
  amountFunded?: Maybe<Scalars['Int']>
  /** Boolean value indicating whether at least one of the funding transactions of the Funder were confirmed. */
  confirmed: Scalars['Boolean']
  /** Time at which the first confirmed funding transactions of the Funder was confirmed. */
  confirmedAt?: Maybe<Scalars['Date']>
  /** Funder's funding txs. */
  fundingTxs: Array<FundingTx>
  id: Scalars['BigInt']
  orders: Array<Order>
  /** @deprecated Use 'orders' instead. */
  rewards: Array<FunderReward>
  /** Number of (confirmed) times a Funder funded a particular project. */
  timesFunded?: Maybe<Scalars['Int']>
  user?: Maybe<User>
}

/** The Funder type contains a User's funding details over a particular project. */
export type FunderFundingTxsArgs = {
  input?: InputMaybe<GetFunderFundingTxsInput>
}

export type FunderReward = {
  __typename?: 'FunderReward'
  projectReward: ProjectReward
  quantity: Scalars['Int']
}

export type FunderRewardGraphSum = GraphSumData & {
  __typename?: 'FunderRewardGraphSum'
  dateTime: Scalars['Date']
  rewardId: Scalars['BigInt']
  rewardName: Scalars['String']
  sum: Scalars['Int']
}

export type FundingCancelInput = {
  address?: InputMaybe<Scalars['String']>
  failureReason?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['BigInt']>
  invoiceId?: InputMaybe<Scalars['String']>
}

export type FundingCancelResponse = {
  __typename?: 'FundingCancelResponse'
  id: Scalars['BigInt']
  success: Scalars['Boolean']
}

export type FundingConfirmInput = {
  amount: Scalars['Int']
  offChain?: InputMaybe<FundingConfirmOffChainInput>
  onChain?: InputMaybe<FundingConfirmOnChainInput>
  paidAt: Scalars['Date']
}

export type FundingConfirmOffChainBolt11Input = {
  invoiceId: Scalars['String']
  settleIndex?: InputMaybe<Scalars['Int']>
}

export type FundingConfirmOffChainInput = {
  bolt11: FundingConfirmOffChainBolt11Input
}

export type FundingConfirmOnChainInput = {
  address?: InputMaybe<Scalars['String']>
}

export type FundingConfirmResponse = {
  __typename?: 'FundingConfirmResponse'
  id: Scalars['BigInt']
  missedSettleEvents?: Maybe<Scalars['Int']>
  success: Scalars['Boolean']
}

export type FundingCreateFromPodcastKeysendInput = {
  amount: Scalars['Int']
  appName: Scalars['String']
  comment?: InputMaybe<Scalars['String']>
  externalId?: InputMaybe<Scalars['String']>
  externalUsername?: InputMaybe<Scalars['String']>
  paidAt: Scalars['Date']
  projectId: Scalars['BigInt']
}

export type FundingInput = {
  /** Set to true if the funder wishes to remain anonymous. The user will still be associated to the funding transaction. */
  anonymous: Scalars['Boolean']
  /** The donation amount, in satoshis. */
  donationAmount: Scalars['Int']
  metadataInput?: InputMaybe<FundingMetadataInput>
  orderInput?: InputMaybe<OrderFundingInput>
  projectId: Scalars['BigInt']
  /** The resource from which the funding transaction is being created. */
  sourceResourceInput: ResourceInput
}

export type FundingMetadataInput = {
  comment?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  media?: InputMaybe<Scalars['String']>
}

export enum FundingMethod {
  GeyserQr = 'geyser_qr',
  LnAddress = 'ln_address',
  LnurlPay = 'lnurl_pay',
  Nip57Zap = 'nip57_zap',
  PodcastKeysend = 'podcast_keysend',
}

export type FundingMutationResponse = {
  __typename?: 'FundingMutationResponse'
  fundingTx?: Maybe<FundingTx>
}

export type FundingPendingInput = {
  amount: Scalars['Int']
  offChain?: InputMaybe<FundingPendingOffChainInput>
  onChain?: InputMaybe<FundingPendingOnChainInput>
}

export type FundingPendingOffChainBolt11Input = {
  invoiceId: Scalars['String']
}

export type FundingPendingOffChainInput = {
  bolt11: FundingPendingOffChainBolt11Input
}

export type FundingPendingOnChainInput = {
  address?: InputMaybe<Scalars['String']>
}

export type FundingPendingResponse = {
  __typename?: 'FundingPendingResponse'
  id: Scalars['BigInt']
  success: Scalars['Boolean']
}

export type FundingQueryResponse = {
  __typename?: 'FundingQueryResponse'
  fundingTx?: Maybe<FundingTx>
  message: Scalars['String']
  success: Scalars['Boolean']
}

export enum FundingResourceType {
  Entry = 'entry',
  Project = 'project',
  User = 'user',
}

export enum FundingStatus {
  Canceled = 'canceled',
  Paid = 'paid',
  PartiallyPaid = 'partially_paid',
  Pending = 'pending',
  Unpaid = 'unpaid',
}

export type FundingTx = {
  __typename?: 'FundingTx'
  address?: Maybe<Scalars['String']>
  amount: Scalars['Int']
  amountPaid: Scalars['Int']
  bitcoinQuote?: Maybe<BitcoinQuote>
  comment?: Maybe<Scalars['String']>
  /** Creator's email address. Only visible to the contributor. */
  creatorEmail?: Maybe<Scalars['String']>
  donationAmount: Scalars['Int']
  /** Contributor's email address. Only visible to the project owner. */
  email?: Maybe<Scalars['String']>
  funder: Funder
  fundingType: FundingType
  id: Scalars['BigInt']
  invoiceId?: Maybe<Scalars['String']>
  invoiceStatus: InvoiceStatus
  isAnonymous: Scalars['Boolean']
  media?: Maybe<Scalars['String']>
  method?: Maybe<FundingMethod>
  onChain: Scalars['Boolean']
  order?: Maybe<Order>
  paidAt?: Maybe<Scalars['Date']>
  paymentRequest?: Maybe<Scalars['String']>
  projectId: Scalars['BigInt']
  source: Scalars['String']
  sourceResource?: Maybe<SourceResource>
  status: FundingStatus
  /** Private reference code viewable only by the Funder and the ProjectOwner related to this FundingTx */
  uuid?: Maybe<Scalars['String']>
}

export type FundingTxAmountGraph = GraphSumData & {
  __typename?: 'FundingTxAmountGraph'
  dateTime: Scalars['Date']
  sum: Scalars['Int']
}

export type FundingTxMethodCount = {
  __typename?: 'FundingTxMethodCount'
  count: Scalars['Int']
  method?: Maybe<Scalars['String']>
}

export type FundingTxMethodSum = {
  __typename?: 'FundingTxMethodSum'
  method?: Maybe<Scalars['String']>
  sum: Scalars['Int']
}

export type FundingTxStatusUpdatedInput = {
  fundingTxId?: InputMaybe<Scalars['BigInt']>
  projectId?: InputMaybe<Scalars['BigInt']>
}

export type FundingTxStatusUpdatedSubscriptionResponse = {
  __typename?: 'FundingTxStatusUpdatedSubscriptionResponse'
  fundingTx: FundingTx
}

export type FundingTxsGetResponse = {
  __typename?: 'FundingTxsGetResponse'
  fundingTxs: Array<FundingTx>
  pagination?: Maybe<CursorPaginationResponse>
}

export enum FundingTxsWhereFundingStatus {
  Paid = 'paid',
  PartiallyPaid = 'partially_paid',
  Pending = 'pending',
}

export enum FundingType {
  Donation = 'DONATION',
  Purchase = 'PURCHASE',
}

export type FundinginvoiceCancel = {
  __typename?: 'FundinginvoiceCancel'
  id: Scalars['BigInt']
  success: Scalars['Boolean']
}

export type GetActivitiesInput = {
  pagination?: InputMaybe<GetActivityPaginationInput>
  where?: InputMaybe<GetActivityWhereInput>
}

export type GetActivityOrderByInput = {
  createdAt?: InputMaybe<Scalars['Date']>
}

export type GetActivityPaginationInput = {
  cursor?: InputMaybe<CursorInputString>
  take?: InputMaybe<Scalars['Int']>
}

export type GetActivityWhereInput = {
  countryCode?: InputMaybe<Scalars['String']>
  projectIds?: InputMaybe<Array<Scalars['BigInt']>>
  region?: InputMaybe<Scalars['String']>
  resourceType?: InputMaybe<ActivityResourceType>
  tagIds?: InputMaybe<Array<Scalars['Int']>>
  userIds?: InputMaybe<Array<Scalars['BigInt']>>
}

export type GetDashboardFundersWhereInput = {
  confirmed?: InputMaybe<Scalars['Boolean']>
  projectId?: InputMaybe<Scalars['BigInt']>
  sourceResourceInput?: InputMaybe<ResourceInput>
}

export type GetEntriesInput = {
  orderBy?: InputMaybe<GetEntriesOrderByInput>
  pagination?: InputMaybe<PaginationInput>
  where?: InputMaybe<GetEntriesWhereInput>
}

export type GetEntriesOrderByInput = {
  publishedAt?: InputMaybe<OrderByOptions>
}

export type GetEntriesWhereInput = {
  projectId?: InputMaybe<Scalars['BigInt']>
}

export type GetFunderFundingTxsInput = {
  where?: InputMaybe<GetFunderFundingTxsWhereInput>
}

export type GetFunderFundingTxsWhereInput = {
  method?: InputMaybe<FundingMethod>
  status?: InputMaybe<FundingStatus>
}

export type GetFunderWhereInput = {
  anonymous?: InputMaybe<Scalars['Boolean']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  dateRange?: InputMaybe<DateRangeInput>
  projectId?: InputMaybe<Scalars['BigInt']>
  sourceResourceInput?: InputMaybe<ResourceInput>
}

export type GetFundersInput = {
  orderBy?: InputMaybe<GetFundersOrderByInput>
  pagination?: InputMaybe<PaginationInput>
  where?: InputMaybe<GetFunderWhereInput>
}

/** only one sort field can be used at one time */
export type GetFundersOrderByInput = {
  amountFunded?: InputMaybe<OrderByOptions>
  confirmedAt?: InputMaybe<OrderByOptions>
}

export type GetFundingTxsInput = {
  orderBy?: InputMaybe<GetFundingTxsOrderByInput>
  pagination?: InputMaybe<PaginationInput>
  where?: InputMaybe<GetFundingTxsWhereInput>
}

export type GetFundingTxsOrderByInput = {
  createdAt: OrderByOptions
  /** @deprecated Use createdAt instead. */
  paidAt?: InputMaybe<OrderByOptions>
}

export type GetFundingTxsWhereInput = {
  NOT?: InputMaybe<GetFundingTxsWhereInput>
  OR?: InputMaybe<Array<InputMaybe<GetFundingTxsWhereInput>>>
  dateRange?: InputMaybe<DateRangeInput>
  method?: InputMaybe<Scalars['String']>
  projectId?: InputMaybe<Scalars['BigInt']>
  sourceResourceInput?: InputMaybe<ResourceInput>
  status?: InputMaybe<FundingTxsWhereFundingStatus>
}

export type GetProjectRewardInput = {
  where: GetProjectRewardWhereInput
}

export type GetProjectRewardWhereInput = {
  dateRange?: InputMaybe<DateRangeInput>
  deleted?: InputMaybe<Scalars['Boolean']>
  projectId: Scalars['BigInt']
}

export type GetProjectStatsInput = {
  where: GetProjectStatsWhereInput
}

export type GetProjectStatsWhereInput = {
  dateRange?: InputMaybe<DateRangeInput>
  groupBy?: InputMaybe<AnalyticsGroupByInterval>
  projectId: Scalars['BigInt']
}

export type GetProjectsMostFundedOfTheWeekInput = {
  tagIds?: InputMaybe<Array<Scalars['Int']>>
  take?: InputMaybe<Scalars['Int']>
}

export type Grant = {
  __typename?: 'Grant'
  applicants: Array<GrantApplicant>
  balance: Scalars['Int']
  boardMembers: Array<GrantBoardMember>
  description?: Maybe<Scalars['String']>
  id: Scalars['BigInt']
  image?: Maybe<Scalars['String']>
  name: Scalars['String']
  shortDescription: Scalars['String']
  sponsors: Array<Sponsor>
  status: GrantStatusEnum
  statuses: Array<GrantStatus>
  title: Scalars['String']
}

export type GrantApplicant = {
  __typename?: 'GrantApplicant'
  funding: GrantApplicantFunding
  grant: Grant
  project: Project
  status: GrantApplicantStatus
}

export type GrantApplicantFunding = {
  __typename?: 'GrantApplicantFunding'
  /** The amount of funding the grant applicant has received from the community. */
  communityFunding: Scalars['Int']
  /** The amount of grant funding the applicant is elligible for. */
  grantAmount: Scalars['Int']
  /**
   * The amount of funding that the Grant applicant has been confirmed to receive. Can only be confirmed after the
   * grant has been closed.
   */
  grantAmountDistributed: Scalars['Int']
}

export enum GrantApplicantStatus {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
  Funded = 'FUNDED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type GrantApplyInput = {
  grantId: Scalars['BigInt']
  projectId: Scalars['BigInt']
}

export type GrantBoardMember = {
  __typename?: 'GrantBoardMember'
  user: User
}

export type GrantGetInput = {
  where: GrantGetWhereInput
}

export type GrantGetWhereInput = {
  id: Scalars['BigInt']
}

export type GrantStatistics = {
  __typename?: 'GrantStatistics'
  /** Statistic about the grant applicants */
  applicants?: Maybe<GrantStatisticsApplicant>
  /** Statistic about the grants */
  grants?: Maybe<GrantStatisticsGrant>
}

export type GrantStatisticsApplicant = {
  __typename?: 'GrantStatisticsApplicant'
  /** Count of applicants that have been funded */
  countFunded: Scalars['Int']
}

export type GrantStatisticsGrant = {
  __typename?: 'GrantStatisticsGrant'
  /** Total amount sent to grants (in sats) */
  amountFunded: Scalars['Int']
  /** Total amount granted to projects (in sats) */
  amountGranted: Scalars['Int']
  /** Total rounds of grants */
  count: Scalars['Int']
}

export type GrantStatus = {
  __typename?: 'GrantStatus'
  endAt?: Maybe<Scalars['Date']>
  startAt: Scalars['Date']
  status: GrantStatusEnum
}

export enum GrantStatusEnum {
  ApplicationsOpen = 'APPLICATIONS_OPEN',
  Closed = 'CLOSED',
  FundingOpen = 'FUNDING_OPEN',
}

export type GraphSumData = {
  dateTime: Scalars['Date']
  sum: Scalars['Int']
}

export enum InvoiceStatus {
  Canceled = 'canceled',
  Paid = 'paid',
  Unpaid = 'unpaid',
}

export type LightningAddressConnectionDetails = {
  __typename?: 'LightningAddressConnectionDetails'
  lightningAddress: Scalars['String']
}

export type LightningAddressConnectionDetailsCreateInput = {
  lightningAddress: Scalars['String']
}

export type LightningAddressConnectionDetailsUpdateInput = {
  lightningAddress: Scalars['String']
}

export type LightningAddressVerifyResponse = {
  __typename?: 'LightningAddressVerifyResponse'
  reason?: Maybe<Scalars['String']>
  valid: Scalars['Boolean']
}

export type LndConnectionDetails = {
  /** Port where the gRPC calls should be made. */
  grpcPort: Scalars['Int']
  /** Hostname where the gRPC calls should be made. */
  hostname: Scalars['String']
  lndNodeType: LndNodeType
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon: Scalars['String']
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: Maybe<Scalars['String']>
}

export type LndConnectionDetailsCreateInput = {
  /** Port where the gRPC calls should be made. */
  grpcPort: Scalars['Int']
  /** Hostname where the gRPC calls should be made. */
  hostname: Scalars['String']
  lndNodeType: LndNodeType
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon: Scalars['String']
  /** Public key of the LND node. */
  pubkey?: InputMaybe<Scalars['String']>
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: InputMaybe<Scalars['String']>
}

/** Private node details that can only be queried by the wallet owner. */
export type LndConnectionDetailsPrivate = {
  __typename?: 'LndConnectionDetailsPrivate'
  /** Port where the gRPC calls should be made. */
  grpcPort: Scalars['Int']
  /** Hostname where the gRPC calls should be made. */
  hostname: Scalars['String']
  /** Type of the LND node used. */
  lndNodeType: LndNodeType
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon: Scalars['String']
  /** Public key of the LND node. */
  pubkey?: Maybe<Scalars['String']>
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: Maybe<Scalars['String']>
}

/** Public node details visible by anyone. */
export type LndConnectionDetailsPublic = {
  __typename?: 'LndConnectionDetailsPublic'
  pubkey?: Maybe<Scalars['String']>
}

export type LndConnectionDetailsUpdateInput = {
  /** Port where the gRPC calls should be made. */
  grpcPort?: InputMaybe<Scalars['Int']>
  /** Hostname where the gRPC calls should be made. */
  hostname?: InputMaybe<Scalars['String']>
  /** Type of the LND node. */
  lndNodeType?: InputMaybe<LndNodeType>
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon?: InputMaybe<Scalars['String']>
  /** Public key of the LND node. */
  pubkey?: InputMaybe<Scalars['String']>
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: InputMaybe<Scalars['String']>
}

export enum LndNodeType {
  Custom = 'custom',
  Geyser = 'geyser',
  Voltage = 'voltage',
}

export type Location = {
  __typename?: 'Location'
  country?: Maybe<Country>
  region?: Maybe<Scalars['String']>
}

export enum MfaAction {
  Login = 'LOGIN',
  ProjectWalletUpdate = 'PROJECT_WALLET_UPDATE',
  UserEmailUpdate = 'USER_EMAIL_UPDATE',
  UserEmailVerification = 'USER_EMAIL_VERIFICATION',
}

export type Mutation = {
  __typename?: 'Mutation'
  _?: Maybe<Scalars['Boolean']>
  claimBadge: UserBadge
  createEntry: Entry
  createProject: Project
  createProjectMilestone: ProjectMilestone
  createWallet: Wallet
  deleteEntry: Entry
  deleteProjectMilestone: Scalars['Boolean']
  fund: FundingMutationResponse
  fundingCancel: FundingCancelResponse
  fundingClaimAnonymous: FundingMutationResponse
  fundingConfirm: FundingConfirmResponse
  fundingCreateFromPodcastKeysend: FundingTx
  fundingInvoiceCancel: FundinginvoiceCancel
  fundingInvoiceRefresh: FundingTx
  fundingPend: FundingPendingResponse
  grantApply: GrantApplicant
  orderStatusUpdate?: Maybe<Order>
  projectDelete: ProjectDeleteResponse
  projectFollow: Scalars['Boolean']
  projectPublish: Project
  projectRewardCreate: ProjectReward
  projectRewardCurrencyUpdate: Array<ProjectReward>
  /** Soft deletes the reward. */
  projectRewardDelete: Scalars['Boolean']
  projectRewardUpdate: ProjectReward
  projectStatusUpdate: Project
  projectTagAdd: Array<Tag>
  projectTagRemove: Array<Tag>
  projectUnfollow: Scalars['Boolean']
  /** Makes the Entry public. */
  publishEntry: Entry
  /**
   * Sends an OTP to the user's email address and responds with a token that can be used, together with the OTP, to two-factor authenticate
   * a request made by the client.
   */
  sendOTPByEmail: OtpResponse
  tagCreate: Tag
  unlinkExternalAccount: User
  updateEntry: Entry
  updateProject: Project
  updateProjectMilestone: ProjectMilestone
  updateUser: User
  /** This operation is currently not supported. */
  updateWallet: Wallet
  updateWalletState: Wallet
  userBadgeAward: UserBadge
  userDelete: DeleteUserResponse
  userEmailUpdate: User
  userEmailVerify: Scalars['Boolean']
  walletDelete: Scalars['Boolean']
}

export type MutationClaimBadgeArgs = {
  input: BadgeClaimInput
}

export type MutationCreateEntryArgs = {
  input: CreateEntryInput
}

export type MutationCreateProjectArgs = {
  input: CreateProjectInput
}

export type MutationCreateProjectMilestoneArgs = {
  input?: InputMaybe<CreateProjectMilestoneInput>
}

export type MutationCreateWalletArgs = {
  input: CreateWalletInput
}

export type MutationDeleteEntryArgs = {
  id: Scalars['BigInt']
}

export type MutationDeleteProjectMilestoneArgs = {
  projectMilestoneId: Scalars['BigInt']
}

export type MutationFundArgs = {
  input: FundingInput
}

export type MutationFundingCancelArgs = {
  input: FundingCancelInput
}

export type MutationFundingClaimAnonymousArgs = {
  uuid: Scalars['String']
}

export type MutationFundingConfirmArgs = {
  input: FundingConfirmInput
}

export type MutationFundingCreateFromPodcastKeysendArgs = {
  input?: InputMaybe<FundingCreateFromPodcastKeysendInput>
}

export type MutationFundingInvoiceCancelArgs = {
  invoiceId: Scalars['String']
}

export type MutationFundingInvoiceRefreshArgs = {
  fundingTxId: Scalars['BigInt']
}

export type MutationFundingPendArgs = {
  input: FundingPendingInput
}

export type MutationGrantApplyArgs = {
  input?: InputMaybe<GrantApplyInput>
}

export type MutationOrderStatusUpdateArgs = {
  input: OrderStatusUpdateInput
}

export type MutationProjectDeleteArgs = {
  input: DeleteProjectInput
}

export type MutationProjectFollowArgs = {
  input: ProjectFollowMutationInput
}

export type MutationProjectPublishArgs = {
  input: ProjectPublishMutationInput
}

export type MutationProjectRewardCreateArgs = {
  input: CreateProjectRewardInput
}

export type MutationProjectRewardCurrencyUpdateArgs = {
  input: ProjectRewardCurrencyUpdate
}

export type MutationProjectRewardDeleteArgs = {
  input: DeleteProjectRewardInput
}

export type MutationProjectRewardUpdateArgs = {
  input: UpdateProjectRewardInput
}

export type MutationProjectStatusUpdateArgs = {
  input: ProjectStatusUpdate
}

export type MutationProjectTagAddArgs = {
  input: ProjectTagMutationInput
}

export type MutationProjectTagRemoveArgs = {
  input: ProjectTagMutationInput
}

export type MutationProjectUnfollowArgs = {
  input: ProjectFollowMutationInput
}

export type MutationPublishEntryArgs = {
  id: Scalars['BigInt']
}

export type MutationSendOtpByEmailArgs = {
  input: SendOtpByEmailInput
}

export type MutationTagCreateArgs = {
  input: TagCreateInput
}

export type MutationUnlinkExternalAccountArgs = {
  id: Scalars['BigInt']
}

export type MutationUpdateEntryArgs = {
  input: UpdateEntryInput
}

export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput
}

export type MutationUpdateProjectMilestoneArgs = {
  input?: InputMaybe<UpdateProjectMilestoneInput>
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationUpdateWalletArgs = {
  input: UpdateWalletInput
}

export type MutationUpdateWalletStateArgs = {
  input: UpdateWalletStateInput
}

export type MutationUserBadgeAwardArgs = {
  userBadgeId: Scalars['BigInt']
}

export type MutationUserEmailUpdateArgs = {
  input: UserEmailUpdateInput
}

export type MutationUserEmailVerifyArgs = {
  input: EmailVerifyInput
}

export type MutationWalletDeleteArgs = {
  id: Scalars['BigInt']
}

export type MutationResponse = {
  message?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
}

export type NostrKeys = {
  __typename?: 'NostrKeys'
  privateKey?: Maybe<NostrPrivateKey>
  publicKey: NostrPublicKey
}

export type NostrPrivateKey = {
  __typename?: 'NostrPrivateKey'
  hex: Scalars['String']
  nsec: Scalars['String']
}

export type NostrPublicKey = {
  __typename?: 'NostrPublicKey'
  hex: Scalars['String']
  npub: Scalars['String']
}

export type OtpInput = {
  otp: Scalars['Int']
  otpVerificationToken: Scalars['String']
}

export type OtpLoginInput = {
  otp: Scalars['Int']
  otpVerificationToken: Scalars['String']
}

export type OtpResponse = {
  __typename?: 'OTPResponse'
  /** Expiration time of the OTP. Can be used to display a countdown to the user. */
  expiresAt: Scalars['Date']
  /** Encrypted token containing the OTP 2FA details, such as the action to be authorised and the factor used (eg: email). */
  otpVerificationToken: Scalars['String']
}

export type OffsetBasedPaginationInput = {
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type Order = {
  __typename?: 'Order'
  confirmedAt?: Maybe<Scalars['Date']>
  createdAt: Scalars['Date']
  deliveredAt?: Maybe<Scalars['Date']>
  fundingTx: FundingTx
  id: Scalars['BigInt']
  items: Array<OrderItem>
  referenceCode: Scalars['String']
  shippedAt?: Maybe<Scalars['Date']>
  status: Scalars['String']
  totalInSats: Scalars['Int']
  updatedAt: Scalars['Date']
  user?: Maybe<User>
}

export type OrderBitcoinQuoteInput = {
  quote: Scalars['Float']
  quoteCurrency: QuoteCurrency
}

export enum OrderByDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum OrderByOptions {
  Asc = 'asc',
  Desc = 'desc',
}

export type OrderFundingInput = {
  /**
   * Quote used client-side to compute the order total. That quote will be used unless the slippage exceeds
   * a pre-defined threshold.
   */
  bitcoinQuote?: InputMaybe<OrderBitcoinQuoteInput>
  items: Array<OrderItemInput>
}

export type OrderItem = {
  __typename?: 'OrderItem'
  item: ProjectReward
  quantity: Scalars['Int']
  unitPriceInSats: Scalars['Int']
}

export type OrderItemInput = {
  itemId: Scalars['BigInt']
  itemType: OrderItemType
  /** Number of times a reward was selected. */
  quantity: Scalars['Int']
}

export enum OrderItemType {
  ProjectReward = 'PROJECT_REWARD',
}

export type OrderStatusUpdateInput = {
  orderId?: InputMaybe<Scalars['BigInt']>
  status?: InputMaybe<UpdatableOrderStatus>
}

export type OrdersGetInput = {
  orderBy?: InputMaybe<Array<OrdersGetOrderByInput>>
  pagination?: InputMaybe<PaginationInput>
  where: OrdersGetWhereInput
}

export enum OrdersGetOrderByField {
  ConfirmedAt = 'confirmedAt',
  DeliveredAt = 'deliveredAt',
  ShippedAt = 'shippedAt',
}

export type OrdersGetOrderByInput = {
  direction: OrderByDirection
  field: OrdersGetOrderByField
}

export type OrdersGetResponse = {
  __typename?: 'OrdersGetResponse'
  orders: Array<Order>
  pagination?: Maybe<CursorPaginationResponse>
}

export enum OrdersGetStatus {
  AwaitingPayment = 'AWAITING_PAYMENT',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Shipped = 'SHIPPED',
}

export type OrdersGetWhereInput = {
  projectId?: InputMaybe<Scalars['BigInt']>
  status?: InputMaybe<OrdersGetStatus>
}

export type Owner = {
  __typename?: 'Owner'
  id: Scalars['BigInt']
  user: User
}

export type OwnerOf = {
  __typename?: 'OwnerOf'
  owner?: Maybe<Owner>
  project?: Maybe<Project>
}

export type PageViewCountGraph = {
  __typename?: 'PageViewCountGraph'
  dateTime: Scalars['Date']
  viewCount: Scalars['Int']
  visitorCount: Scalars['Int']
}

export type PaginationCursor = {
  __typename?: 'PaginationCursor'
  id?: Maybe<Scalars['BigInt']>
}

/** Cursor pagination input. */
export type PaginationInput = {
  cursor?: InputMaybe<CursorInput>
  take?: InputMaybe<Scalars['Int']>
}

export type Project = {
  __typename?: 'Project'
  /** @deprecated Field no longer supported */
  ambassadors: Array<Ambassador>
  /** Total amount raised by the project, in satoshis. */
  balance: Scalars['Int']
  /** Boolean flag to indicate if the project can be deleted. */
  canDelete: Scalars['Boolean']
  createdAt: Scalars['String']
  /** Description of the project. */
  description?: Maybe<Scalars['String']>
  /**
   * By default, returns all the entries of a project, both published and unpublished but not deleted.
   * To filter the result set, an explicit input can be passed that specifies a value of true or false for the published field.
   * An unpublished entry is only returned if the requesting user is the creator of the entry.
   */
  entries: Array<Entry>
  followers: Array<User>
  funders: Array<Funder>
  fundersCount?: Maybe<Scalars['Int']>
  fundingTxs: Array<FundingTx>
  fundingTxsCount?: Maybe<Scalars['Int']>
  /** Returns the project's grant applications. */
  grants: Array<GrantApplicant>
  id: Scalars['BigInt']
  image?: Maybe<Scalars['String']>
  keys: ProjectKeys
  links: Array<Scalars['String']>
  location?: Maybe<Location>
  milestones: Array<ProjectMilestone>
  /** Unique name for the project. Used for the project URL and lightning address. */
  name: Scalars['String']
  owners: Array<Owner>
  rewardCurrency?: Maybe<RewardCurrency>
  rewards: Array<ProjectReward>
  /** Short description of the project. */
  shortDescription?: Maybe<Scalars['String']>
  /** @deprecated Field no longer supported */
  sponsors: Array<Sponsor>
  /** Returns summary statistics on the Project views and visitors. */
  statistics?: Maybe<ProjectStatistics>
  status?: Maybe<ProjectStatus>
  tags: Array<Tag>
  /** Main project image. */
  thumbnailImage?: Maybe<Scalars['String']>
  /** Public title of the project. */
  title: Scalars['String']
  type: ProjectType
  updatedAt: Scalars['String']
  /** Wallets linked to a Project. */
  wallets: Array<Wallet>
}

export type ProjectEntriesArgs = {
  input?: InputMaybe<ProjectEntriesGetInput>
}

export type ProjectActivatedSubscriptionResponse = {
  __typename?: 'ProjectActivatedSubscriptionResponse'
  project: Project
}

export type ProjectCountriesGetResult = {
  __typename?: 'ProjectCountriesGetResult'
  count: Scalars['Int']
  country: Country
}

export type ProjectDeleteResponse = MutationResponse & {
  __typename?: 'ProjectDeleteResponse'
  message?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
}

export type ProjectEntriesGetInput = {
  where?: InputMaybe<ProjectEntriesGetWhereInput>
}

export type ProjectEntriesGetWhereInput = {
  published?: InputMaybe<Scalars['Boolean']>
}

export type ProjectFollowMutationInput = {
  projectId: Scalars['BigInt']
}

export type ProjectFunderRewardStats = {
  __typename?: 'ProjectFunderRewardStats'
  /** Project rewards sold count over the given datetime range grouped by day, or month. */
  quantityGraph?: Maybe<Array<Maybe<FunderRewardGraphSum>>>
  /** Project rewards sold count in the given datetime range. */
  quantitySum: Scalars['Int']
}

export type ProjectFunderStats = {
  __typename?: 'ProjectFunderStats'
  /** Project contributors count in the given datetime range. */
  count: Scalars['Int']
}

export type ProjectFundingTxStats = {
  __typename?: 'ProjectFundingTxStats'
  /** Project contribution over the given datetime range grouped by day, or month. */
  amountGraph?: Maybe<Array<Maybe<FundingTxAmountGraph>>>
  /** Project contribution amount in the given datetime range. */
  amountSum?: Maybe<Scalars['Int']>
  /** Project contribution count in the given datetime range. */
  count: Scalars['Int']
  /** Project contribution count of each Funding Method in the given datetime range. */
  methodCount?: Maybe<Array<Maybe<FundingTxMethodCount>>>
  /** Project contribution amount of each Funding Method in the given datetime range. */
  methodSum?: Maybe<Array<Maybe<FundingTxMethodSum>>>
}

export type ProjectKeys = {
  __typename?: 'ProjectKeys'
  nostrKeys: NostrKeys
}

export type ProjectLinkMutationInput = {
  link: Scalars['String']
  projectId: Scalars['BigInt']
}

export type ProjectMilestone = {
  __typename?: 'ProjectMilestone'
  /** Amount the project balance must reach to consider the milestone completed, in satoshis. */
  amount: Scalars['Float']
  description?: Maybe<Scalars['String']>
  id: Scalars['BigInt']
  name: Scalars['String']
  reached: Scalars['Boolean']
}

export type ProjectPublishMutationInput = {
  projectId: Scalars['BigInt']
}

export type ProjectRegionsGetResult = {
  __typename?: 'ProjectRegionsGetResult'
  count: Scalars['Int']
  region: Scalars['String']
}

export type ProjectReward = {
  __typename?: 'ProjectReward'
  /**
   * Number of people that purchased the Project Reward.
   * @deprecated Use sold instead
   */
  backersCount: Scalars['Int']
  /** Category of ProjectReward */
  category?: Maybe<Scalars['String']>
  /** Cost of the reward, priced in USD cents. */
  cost: Scalars['Int']
  /** The date the creator created the reward */
  createdAt: Scalars['Date']
  /**
   * Whether the reward is deleted or not. Deleted rewards should not appear in the funding flow. Moreover, deleted
   * rewards should only be visible by the project owner and the users that purchased it.
   */
  deleted: Scalars['Boolean']
  /** Internally used to track whether a reward was soft deleted */
  deletedAt?: Maybe<Scalars['Date']>
  /** Short description of the reward. */
  description?: Maybe<Scalars['String']>
  /** Estimated availability date of a reward that is in development */
  estimatedAvailabilityDate?: Maybe<Scalars['Date']>
  estimatedDeliveryDate?: Maybe<Scalars['Date']>
  /** Estimated delivery time from the time of purchase */
  estimatedDeliveryInWeeks?: Maybe<Scalars['Int']>
  /** Boolean value to indicate whether this reward requires shipping */
  hasShipping: Scalars['Boolean']
  id: Scalars['BigInt']
  /** Image of the reward. */
  image?: Maybe<Scalars['String']>
  /** Boolean value to indicate whether this reward is an addon */
  isAddon: Scalars['Boolean']
  /** Boolean value to indicate whether this reward is hidden */
  isHidden: Scalars['Boolean']
  /** Maximum times the item can be purchased */
  maxClaimable?: Maybe<Scalars['Int']>
  /** Name of the reward. */
  name: Scalars['String']
  /** Boolean value to indicate whether this reward is in development or ready to ship */
  preOrder: Scalars['Boolean']
  /** Boolean value to indicate whether this reward requires shipping */
  project: Project
  /** Currency in which the reward cost is stored. */
  rewardCurrency: RewardCurrency
  rewardType?: Maybe<Scalars['String']>
  /** Number of times this Project Reward was sold. */
  sold: Scalars['Int']
  /** Tracks the stock of the reward */
  stock?: Maybe<Scalars['Int']>
  /** The last date when the creator has updated the reward */
  updatedAt: Scalars['Date']
  /** UUID for the reward, it stays consistent throughout the project reward updates (the ID does not) */
  uuid: Scalars['String']
}

export type ProjectRewardCurrencyUpdate = {
  projectId: Scalars['BigInt']
  rewardCurrency: RewardCurrency
}

export type ProjectRewardCurrencyUpdateRewardsInput = {
  cost: Scalars['Int']
  rewardId: Scalars['BigInt']
}

export type ProjectStatistics = {
  __typename?: 'ProjectStatistics'
  totalPageviews: Scalars['Int']
  totalVisitors: Scalars['Int']
}

export type ProjectStats = {
  __typename?: 'ProjectStats'
  current?: Maybe<ProjectStatsBase>
  datetimeRange: DatetimeRange
  prevTimeRange?: Maybe<ProjectStatsBase>
}

export type ProjectStatsBase = {
  __typename?: 'ProjectStatsBase'
  projectFunderRewards?: Maybe<ProjectFunderRewardStats>
  projectFunders?: Maybe<ProjectFunderStats>
  projectFundingTxs?: Maybe<ProjectFundingTxStats>
  projectViews?: Maybe<ProjectViewStats>
}

export enum ProjectStatus {
  Active = 'active',
  Deleted = 'deleted',
  Draft = 'draft',
  Inactive = 'inactive',
}

export type ProjectStatusUpdate = {
  projectId: Scalars['BigInt']
  status: ProjectStatus
}

export type ProjectTagMutationInput = {
  projectId: Scalars['BigInt']
  tagId: Scalars['Int']
}

export enum ProjectType {
  Donation = 'donation',
  Grant = 'grant',
  Reward = 'reward',
}

export type ProjectViewBaseStats = {
  __typename?: 'ProjectViewBaseStats'
  value: Scalars['String']
  viewCount: Scalars['Int']
  visitorCount: Scalars['Int']
}

export type ProjectViewStats = {
  __typename?: 'ProjectViewStats'
  /** Project view/visitor count of each viewing country in the given datetime range. */
  countries: Array<ProjectViewBaseStats>
  /** Project view/visitor count of each refferal platform in the given datetime range. */
  referrers: Array<ProjectViewBaseStats>
  /** Project view/visitor count of each viewing region in the given datetime range. */
  regions: Array<ProjectViewBaseStats>
  /** Project view count in the given datetime range. */
  viewCount: Scalars['Int']
  /** Project visitor count in the given datetime range. */
  visitorCount: Scalars['Int']
  /** Project views/visitors count over the given datetime range grouped by day, or month. */
  visitorGraph: Array<Maybe<PageViewCountGraph>>
}

export type ProjectsGetQueryInput = {
  /**
   * Takes an array of Project OrderBy options. When passing multiple ordering options, each option must
   * be passed in a separate object in the array. This ensures consistent ordering of the orderBy options in the
   * result set.
   */
  orderBy?: InputMaybe<Array<ProjectsOrderByInput>>
  pagination?: InputMaybe<PaginationInput>
  where: ProjectsGetWhereInput
}

export type ProjectsGetWhereInput = {
  countryCode?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['BigInt']>
  ids?: InputMaybe<Array<Scalars['BigInt']>>
  /** Unique name for the project. Used for the project URL and lightning address. */
  name?: InputMaybe<Scalars['String']>
  region?: InputMaybe<Scalars['String']>
  search?: InputMaybe<Scalars['String']>
  status?: InputMaybe<ProjectStatus>
  tagIds?: InputMaybe<Array<Scalars['Int']>>
  type?: InputMaybe<ProjectType>
}

export enum ProjectsOrderByField {
  Balance = 'balance',
}

export type ProjectsOrderByInput = {
  direction: OrderByDirection
  field: ProjectsOrderByField
}

export type ProjectsResponse = {
  __typename?: 'ProjectsResponse'
  projects: Array<Project>
  summary?: Maybe<ProjectsSummary>
}

export type ProjectsSummary = {
  __typename?: 'ProjectsSummary'
  /** Total of satoshis raised by projects on the platform. */
  fundedTotal?: Maybe<Scalars['BigInt']>
  /** Total number of funders on the platform. */
  fundersCount?: Maybe<Scalars['Int']>
  /** Total number of projects ever created on the platform. */
  projectsCount?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  _?: Maybe<Scalars['Boolean']>
  badges: Array<Badge>
  currencyQuoteGet: CurrencyQuoteGetResponse
  entry?: Maybe<Entry>
  fundersGet: Array<Funder>
  fundingTx: FundingTx
  fundingTxsGet?: Maybe<FundingTxsGetResponse>
  /** Returns all activities. */
  getActivities: Array<Activity>
  getDashboardFunders: Array<Funder>
  /** Returns all published entries. */
  getEntries: Array<Entry>
  /** Returns the public key of the Lightning node linked to a project, if there is one. */
  getProjectPubkey?: Maybe<Scalars['String']>
  getProjectReward: ProjectReward
  getSignedUploadUrl: SignedUploadUrl
  getWallet: Wallet
  grant: Grant
  grantStatistics: GrantStatistics
  grants: Array<Grant>
  lightningAddressVerify: LightningAddressVerifyResponse
  me?: Maybe<User>
  orderGet?: Maybe<Order>
  ordersGet?: Maybe<OrdersGetResponse>
  projectCountriesGet: Array<ProjectCountriesGetResult>
  projectGet?: Maybe<Project>
  projectRegionsGet: Array<ProjectRegionsGetResult>
  projectRewardCategoriesGet: Array<Scalars['String']>
  projectRewardsGet: Array<ProjectReward>
  projectStatsGet: ProjectStats
  /** By default, returns a list of all active projects. */
  projectsGet: ProjectsResponse
  projectsMostFundedOfTheWeekGet: Array<ProjectsMostFundedOfTheWeekGet>
  /** Returns summary statistics of all projects, both current and past. */
  projectsSummary: ProjectsSummary
  statusCheck: Scalars['Boolean']
  tagsGet: Array<TagsGetResult>
  user: User
  userBadge?: Maybe<UserBadge>
  userBadges: Array<UserBadge>
}

export type QueryCurrencyQuoteGetArgs = {
  input: CurrencyQuoteGetInput
}

export type QueryEntryArgs = {
  id: Scalars['BigInt']
}

export type QueryFundersGetArgs = {
  input: GetFundersInput
}

export type QueryFundingTxArgs = {
  id: Scalars['BigInt']
}

export type QueryFundingTxsGetArgs = {
  input?: InputMaybe<GetFundingTxsInput>
}

export type QueryGetActivitiesArgs = {
  input?: InputMaybe<GetActivitiesInput>
}

export type QueryGetDashboardFundersArgs = {
  input?: InputMaybe<GetFundersInput>
}

export type QueryGetEntriesArgs = {
  input?: InputMaybe<GetEntriesInput>
}

export type QueryGetProjectPubkeyArgs = {
  projectId: Scalars['BigInt']
}

export type QueryGetProjectRewardArgs = {
  id: Scalars['BigInt']
}

export type QueryGetSignedUploadUrlArgs = {
  input: FileUploadInput
}

export type QueryGetWalletArgs = {
  id: Scalars['BigInt']
}

export type QueryGrantArgs = {
  input: GrantGetInput
}

export type QueryLightningAddressVerifyArgs = {
  lightningAddress?: InputMaybe<Scalars['String']>
}

export type QueryOrderGetArgs = {
  where: UniqueOrderInput
}

export type QueryOrdersGetArgs = {
  input: OrdersGetInput
}

export type QueryProjectGetArgs = {
  where: UniqueProjectQueryInput
}

export type QueryProjectRewardsGetArgs = {
  input: GetProjectRewardInput
}

export type QueryProjectStatsGetArgs = {
  input: GetProjectStatsInput
}

export type QueryProjectsGetArgs = {
  input?: InputMaybe<ProjectsGetQueryInput>
}

export type QueryProjectsMostFundedOfTheWeekGetArgs = {
  input?: InputMaybe<GetProjectsMostFundedOfTheWeekInput>
}

export type QueryUserArgs = {
  where: UserGetInput
}

export type QueryUserBadgeArgs = {
  userBadgeId: Scalars['BigInt']
}

export type QueryUserBadgesArgs = {
  input: BadgesGetInput
}

export enum QuoteCurrency {
  Usd = 'USD',
}

export type ResourceInput = {
  resourceId: Scalars['BigInt']
  resourceType: FundingResourceType
}

export enum RewardCurrency {
  Btcsat = 'BTCSAT',
  Usdcent = 'USDCENT',
}

export type SendOtpByEmailInput = {
  action: MfaAction
  email?: InputMaybe<Scalars['String']>
}

export enum ShippingDestination {
  International = 'international',
  National = 'national',
}

export type SignedUploadUrl = {
  __typename?: 'SignedUploadUrl'
  /** Distribution URL from which the image will be served */
  distributionUrl: Scalars['String']
  /** Signed URL used by the client to upload an image */
  uploadUrl: Scalars['String']
}

export type SourceResource = Entry | Project

export type Sponsor = {
  __typename?: 'Sponsor'
  createdAt: Scalars['Date']
  id: Scalars['BigInt']
  image?: Maybe<Scalars['String']>
  name: Scalars['String']
  status: SponsorStatus
  url?: Maybe<Scalars['String']>
  user?: Maybe<User>
}

export enum SponsorStatus {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type Subscription = {
  __typename?: 'Subscription'
  _?: Maybe<Scalars['Boolean']>
  activityCreated: ActivityResource
  entryPublished: EntryPublishedSubscriptionResponse
  fundingTxStatusUpdated: FundingTxStatusUpdatedSubscriptionResponse
  projectActivated: ProjectActivatedSubscriptionResponse
}

export type SubscriptionActivityCreatedArgs = {
  input?: InputMaybe<ActivityCreatedSubscriptionInput>
}

export type SubscriptionFundingTxStatusUpdatedArgs = {
  input?: InputMaybe<FundingTxStatusUpdatedInput>
}

export type TotpInput = {
  totp: Scalars['Int']
}

export type Tag = {
  __typename?: 'Tag'
  id: Scalars['Int']
  label: Scalars['String']
}

export type TagCreateInput = {
  label: Scalars['String']
}

export type TagsGetResult = {
  __typename?: 'TagsGetResult'
  count: Scalars['Int']
  id: Scalars['Int']
  label: Scalars['String']
}

export type TwoFaInput = {
  OTP?: InputMaybe<OtpInput>
  /** TOTP is not supported yet. */
  TOTP?: InputMaybe<TotpInput>
}

export type UniqueOrderInput = {
  id?: InputMaybe<Scalars['BigInt']>
}

export type UniqueProjectQueryInput = {
  id?: InputMaybe<Scalars['BigInt']>
  /** Unique name for the project. Used for the project URL and lightning address. */
  name?: InputMaybe<Scalars['String']>
  /** Project's Nostr Public Key in HEX format */
  nostrPublicKey?: InputMaybe<Scalars['String']>
}

export enum UpdatableOrderStatus {
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Shipped = 'SHIPPED',
}

export type UpdateEntryInput = {
  content?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  entryId: Scalars['BigInt']
  /** Header image of the Entry. */
  image?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateProjectInput = {
  /** Project ISO3166 country code */
  countryCode?: InputMaybe<Scalars['String']>
  /** Description of the project. */
  description?: InputMaybe<Scalars['String']>
  /** Main project image. */
  image?: InputMaybe<Scalars['String']>
  /** Project links */
  links?: InputMaybe<Array<Scalars['String']>>
  /** Project name, used both for the project URL, project lightning address and NIP05. */
  name?: InputMaybe<Scalars['String']>
  projectId: Scalars['BigInt']
  /** Project region */
  region?: InputMaybe<Scalars['String']>
  /** The currency used to price rewards for the project. Currently only USDCENT supported. Should become an Enum. */
  rewardCurrency?: InputMaybe<RewardCurrency>
  /** A short description of the project. */
  shortDescription?: InputMaybe<Scalars['String']>
  /** Current status of the project */
  status?: InputMaybe<ProjectStatus>
  /** Project header image. */
  thumbnailImage?: InputMaybe<Scalars['String']>
  /** Public title of the project. */
  title?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ProjectType>
}

export type UpdateProjectMilestoneInput = {
  /** Amount the project balance must reach to consider the milestone completed, in satoshis. */
  amount?: InputMaybe<Scalars['Int']>
  description?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  projectMilestoneId: Scalars['BigInt']
}

export type UpdateProjectRewardInput = {
  category?: InputMaybe<Scalars['String']>
  /** Cost of the reward, priced in USD cents */
  cost?: InputMaybe<Scalars['Int']>
  description?: InputMaybe<Scalars['String']>
  estimatedAvailabilityDate?: InputMaybe<Scalars['Date']>
  estimatedDeliveryInWeeks?: InputMaybe<Scalars['Int']>
  hasShipping?: InputMaybe<Scalars['Boolean']>
  image?: InputMaybe<Scalars['String']>
  isAddon?: InputMaybe<Scalars['Boolean']>
  isHidden?: InputMaybe<Scalars['Boolean']>
  maxClaimable?: InputMaybe<Scalars['Int']>
  name?: InputMaybe<Scalars['String']>
  preOrder?: InputMaybe<Scalars['Boolean']>
  projectRewardId: Scalars['BigInt']
}

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>
  id: Scalars['BigInt']
  imageUrl?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
}

export type UpdateWalletInput = {
  id: Scalars['BigInt']
  lightningAddressConnectionDetailsInput?: InputMaybe<LightningAddressConnectionDetailsUpdateInput>
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsUpdateInput>
  name?: InputMaybe<Scalars['String']>
  twoFAInput?: InputMaybe<TwoFaInput>
}

export type UpdateWalletStateInput = {
  status: WalletStatus
  statusCode: WalletStatusCode
  walletId: Scalars['BigInt']
}

export type User = {
  __typename?: 'User'
  badges: Array<UserBadge>
  bio?: Maybe<Scalars['String']>
  /** Details on the participation of a User in a project. */
  contributions: Array<UserProjectContribution>
  email?: Maybe<Scalars['String']>
  emailVerifiedAt?: Maybe<Scalars['Date']>
  /**
   * By default, returns all the entries of a user, both published and unpublished but not deleted.
   * To filter the result set, an explicit input can be passed that specifies a value of true or false for the published field.
   * An unpublished entry is only returned if the requesting user is the creator of the entry.
   */
  entries: Array<Entry>
  /**
   * External accounts linked to the User. It can be a twitter account if the User linked their account. For anonymous
   * users, this field can contain the wallet or app from which they funded, eg: Fountain, Breeze, etc.
   */
  externalAccounts: Array<ExternalAccount>
  /** Returns a user's funding transactions accross all projects. */
  fundingTxs: Array<FundingTx>
  id: Scalars['BigInt']
  imageUrl?: Maybe<Scalars['String']>
  isEmailVerified: Scalars['Boolean']
  orders?: Maybe<Array<Order>>
  ownerOf: Array<OwnerOf>
  projectFollows: Array<Project>
  /**
   * Returns the projects of a user. By default, this field returns all the projects for that user, both draft and non-draft.
   * To filter the result set, an explicit input can be passed that specifies a value of the status field.
   */
  projects: Array<Project>
  ranking?: Maybe<Scalars['BigInt']>
  username: Scalars['String']
  wallet?: Maybe<Wallet>
}

export type UserEntriesArgs = {
  input?: InputMaybe<UserEntriesGetInput>
}

export type UserProjectsArgs = {
  input?: InputMaybe<UserProjectsGetInput>
}

export type UserBadge = {
  __typename?: 'UserBadge'
  badge: Badge
  badgeAwardEventId?: Maybe<Scalars['String']>
  createdAt: Scalars['Date']
  fundingTxId?: Maybe<Scalars['BigInt']>
  id: Scalars['BigInt']
  status?: Maybe<UserBadgeStatus>
  updatedAt: Scalars['Date']
  userId: Scalars['BigInt']
}

export enum UserBadgeStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
}

export type UserEmailUpdateInput = {
  email: Scalars['String']
  /** The two-factor authentication input is required if the user already has an email set. */
  twoFAInput?: InputMaybe<TwoFaInput>
}

export type UserEntriesGetInput = {
  where?: InputMaybe<UserEntriesGetWhereInput>
}

export type UserEntriesGetWhereInput = {
  published?: InputMaybe<Scalars['Boolean']>
}

export type UserGetInput = {
  id: Scalars['BigInt']
}

export type UserProjectContribution = {
  __typename?: 'UserProjectContribution'
  /** Funder linked to the funding contribution. Only present if the contribution was a funding contribution. */
  funder?: Maybe<Funder>
  /**
   * Boolean value indicating if the User was an ambassador of the project.
   * @deprecated Field no longer supported
   */
  isAmbassador: Scalars['Boolean']
  /** Boolean value indicating if the User funded the project. */
  isFunder: Scalars['Boolean']
  /**
   * Boolean value indicating if the User was a sponsor for the project.
   * @deprecated Field no longer supported
   */
  isSponsor: Scalars['Boolean']
  /** Project linked to the contributions. */
  project: Project
}

export type UserProjectsGetInput = {
  where?: InputMaybe<UserProjectsGetWhereInput>
}

export type UserProjectsGetWhereInput = {
  status?: InputMaybe<ProjectStatus>
}

export type Wallet = {
  __typename?: 'Wallet'
  connectionDetails: ConnectionDetails
  id: Scalars['BigInt']
  /** Wallet name */
  name?: Maybe<Scalars['String']>
  state: WalletState
}

export type WalletResourceInput = {
  resourceId: Scalars['BigInt']
  resourceType: WalletResourceType
}

export enum WalletResourceType {
  Project = 'project',
  User = 'user',
}

export type WalletState = {
  __typename?: 'WalletState'
  /**
   * The status field is meant to be displayed in the the public view of a project to provide insight to the user
   * that wants to contribute to the project.
   */
  status: WalletStatus
  /**
   * The status code is a more descriptive field about the wallet status. It is meant to be displayed to the
   * project creator to help them understand what is wrong with their wallet connection. The field can only be queried
   * by the project creator.
   */
  statusCode: WalletStatusCode
}

export enum WalletStatus {
  Inactive = 'INACTIVE',
  Ok = 'OK',
  Unstable = 'UNSTABLE',
}

export enum WalletStatusCode {
  NotFound = 'NOT_FOUND',
  NoRoute = 'NO_ROUTE',
  Ok = 'OK',
  Unknown = 'UNKNOWN',
  Unreachable = 'UNREACHABLE',
  WalletLocked = 'WALLET_LOCKED',
}

export type DashboardFundersGetInput = {
  orderBy?: InputMaybe<GetFundersOrderByInput>
  pagination?: InputMaybe<PaginationInput>
  where?: InputMaybe<GetDashboardFundersWhereInput>
}

export type ProjectsMostFundedOfTheWeekGet = {
  __typename?: 'projectsMostFundedOfTheWeekGet'
  fundersCount: Scalars['Int']
  fundingAmount: Scalars['BigInt']
  project: Project
  tagId?: Maybe<Scalars['Int']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping of union types */
export type ResolversUnionTypes = {
  ActivityResource:
    | Entry
    | (Omit<FundingTx, 'sourceResource'> & { sourceResource?: Maybe<ResolversTypes['SourceResource']> })
    | Project
    | ProjectReward
  ConnectionDetails: LightningAddressConnectionDetails | LndConnectionDetailsPrivate | LndConnectionDetailsPublic
  SourceResource: Entry | Project
}

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Activity: ResolverTypeWrapper<Omit<Activity, 'resource'> & { resource: ResolversTypes['ActivityResource'] }>
  ActivityCreatedSubscriptionInput: ActivityCreatedSubscriptionInput
  ActivityCreatedSubscriptionWhereInput: ActivityCreatedSubscriptionWhereInput
  ActivityResource: ResolverTypeWrapper<ResolversUnionTypes['ActivityResource']>
  ActivityResourceType: ActivityResourceType
  Ambassador: ResolverTypeWrapper<Ambassador>
  AmountSummary: ResolverTypeWrapper<AmountSummary>
  AnalyticsGroupByInterval: AnalyticsGroupByInterval
  Badge: ResolverTypeWrapper<Badge>
  BadgeClaimInput: BadgeClaimInput
  BadgesGetInput: BadgesGetInput
  BadgesGetWhereInput: BadgesGetWhereInput
  BaseCurrency: BaseCurrency
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>
  BitcoinQuote: ResolverTypeWrapper<BitcoinQuote>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  ConnectionDetails: ResolverTypeWrapper<ResolversUnionTypes['ConnectionDetails']>
  Country: ResolverTypeWrapper<Country>
  CreateEntryInput: CreateEntryInput
  CreateProjectInput: CreateProjectInput
  CreateProjectMilestoneInput: CreateProjectMilestoneInput
  CreateProjectRewardInput: CreateProjectRewardInput
  CreateWalletInput: CreateWalletInput
  Currency: Currency
  CurrencyQuoteGetInput: CurrencyQuoteGetInput
  CurrencyQuoteGetResponse: ResolverTypeWrapper<CurrencyQuoteGetResponse>
  CursorInput: CursorInput
  CursorInputString: CursorInputString
  CursorPaginationResponse: ResolverTypeWrapper<CursorPaginationResponse>
  Date: ResolverTypeWrapper<Scalars['Date']>
  DateRangeInput: DateRangeInput
  DatetimeRange: ResolverTypeWrapper<DatetimeRange>
  DeleteProjectInput: DeleteProjectInput
  DeleteProjectRewardInput: DeleteProjectRewardInput
  DeleteUserResponse: ResolverTypeWrapper<DeleteUserResponse>
  EmailVerifyInput: EmailVerifyInput
  Entry: ResolverTypeWrapper<Entry>
  EntryPublishedSubscriptionResponse: ResolverTypeWrapper<EntryPublishedSubscriptionResponse>
  EntryStatus: EntryStatus
  EntryType: EntryType
  ExternalAccount: ResolverTypeWrapper<ExternalAccount>
  FileUploadInput: FileUploadInput
  Float: ResolverTypeWrapper<Scalars['Float']>
  Funder: ResolverTypeWrapper<Funder>
  FunderReward: ResolverTypeWrapper<FunderReward>
  FunderRewardGraphSum: ResolverTypeWrapper<FunderRewardGraphSum>
  FundingCancelInput: FundingCancelInput
  FundingCancelResponse: ResolverTypeWrapper<FundingCancelResponse>
  FundingConfirmInput: FundingConfirmInput
  FundingConfirmOffChainBolt11Input: FundingConfirmOffChainBolt11Input
  FundingConfirmOffChainInput: FundingConfirmOffChainInput
  FundingConfirmOnChainInput: FundingConfirmOnChainInput
  FundingConfirmResponse: ResolverTypeWrapper<FundingConfirmResponse>
  FundingCreateFromPodcastKeysendInput: FundingCreateFromPodcastKeysendInput
  FundingInput: FundingInput
  FundingMetadataInput: FundingMetadataInput
  FundingMethod: FundingMethod
  FundingMutationResponse: ResolverTypeWrapper<FundingMutationResponse>
  FundingPendingInput: FundingPendingInput
  FundingPendingOffChainBolt11Input: FundingPendingOffChainBolt11Input
  FundingPendingOffChainInput: FundingPendingOffChainInput
  FundingPendingOnChainInput: FundingPendingOnChainInput
  FundingPendingResponse: ResolverTypeWrapper<FundingPendingResponse>
  FundingQueryResponse: ResolverTypeWrapper<FundingQueryResponse>
  FundingResourceType: FundingResourceType
  FundingStatus: FundingStatus
  FundingTx: ResolverTypeWrapper<
    Omit<FundingTx, 'sourceResource'> & { sourceResource?: Maybe<ResolversTypes['SourceResource']> }
  >
  FundingTxAmountGraph: ResolverTypeWrapper<FundingTxAmountGraph>
  FundingTxMethodCount: ResolverTypeWrapper<FundingTxMethodCount>
  FundingTxMethodSum: ResolverTypeWrapper<FundingTxMethodSum>
  FundingTxStatusUpdatedInput: FundingTxStatusUpdatedInput
  FundingTxStatusUpdatedSubscriptionResponse: ResolverTypeWrapper<FundingTxStatusUpdatedSubscriptionResponse>
  FundingTxsGetResponse: ResolverTypeWrapper<FundingTxsGetResponse>
  FundingTxsWhereFundingStatus: FundingTxsWhereFundingStatus
  FundingType: FundingType
  FundinginvoiceCancel: ResolverTypeWrapper<FundinginvoiceCancel>
  GetActivitiesInput: GetActivitiesInput
  GetActivityOrderByInput: GetActivityOrderByInput
  GetActivityPaginationInput: GetActivityPaginationInput
  GetActivityWhereInput: GetActivityWhereInput
  GetDashboardFundersWhereInput: GetDashboardFundersWhereInput
  GetEntriesInput: GetEntriesInput
  GetEntriesOrderByInput: GetEntriesOrderByInput
  GetEntriesWhereInput: GetEntriesWhereInput
  GetFunderFundingTxsInput: GetFunderFundingTxsInput
  GetFunderFundingTxsWhereInput: GetFunderFundingTxsWhereInput
  GetFunderWhereInput: GetFunderWhereInput
  GetFundersInput: GetFundersInput
  GetFundersOrderByInput: GetFundersOrderByInput
  GetFundingTxsInput: GetFundingTxsInput
  GetFundingTxsOrderByInput: GetFundingTxsOrderByInput
  GetFundingTxsWhereInput: GetFundingTxsWhereInput
  GetProjectRewardInput: GetProjectRewardInput
  GetProjectRewardWhereInput: GetProjectRewardWhereInput
  GetProjectStatsInput: GetProjectStatsInput
  GetProjectStatsWhereInput: GetProjectStatsWhereInput
  GetProjectsMostFundedOfTheWeekInput: GetProjectsMostFundedOfTheWeekInput
  Grant: ResolverTypeWrapper<Grant>
  GrantApplicant: ResolverTypeWrapper<GrantApplicant>
  GrantApplicantFunding: ResolverTypeWrapper<GrantApplicantFunding>
  GrantApplicantStatus: GrantApplicantStatus
  GrantApplyInput: GrantApplyInput
  GrantBoardMember: ResolverTypeWrapper<GrantBoardMember>
  GrantGetInput: GrantGetInput
  GrantGetWhereInput: GrantGetWhereInput
  GrantStatistics: ResolverTypeWrapper<GrantStatistics>
  GrantStatisticsApplicant: ResolverTypeWrapper<GrantStatisticsApplicant>
  GrantStatisticsGrant: ResolverTypeWrapper<GrantStatisticsGrant>
  GrantStatus: ResolverTypeWrapper<GrantStatus>
  GrantStatusEnum: GrantStatusEnum
  GraphSumData: ResolversTypes['FunderRewardGraphSum'] | ResolversTypes['FundingTxAmountGraph']
  Int: ResolverTypeWrapper<Scalars['Int']>
  InvoiceStatus: InvoiceStatus
  LightningAddressConnectionDetails: ResolverTypeWrapper<LightningAddressConnectionDetails>
  LightningAddressConnectionDetailsCreateInput: LightningAddressConnectionDetailsCreateInput
  LightningAddressConnectionDetailsUpdateInput: LightningAddressConnectionDetailsUpdateInput
  LightningAddressVerifyResponse: ResolverTypeWrapper<LightningAddressVerifyResponse>
  LndConnectionDetails: never
  LndConnectionDetailsCreateInput: LndConnectionDetailsCreateInput
  LndConnectionDetailsPrivate: ResolverTypeWrapper<LndConnectionDetailsPrivate>
  LndConnectionDetailsPublic: ResolverTypeWrapper<LndConnectionDetailsPublic>
  LndConnectionDetailsUpdateInput: LndConnectionDetailsUpdateInput
  LndNodeType: LndNodeType
  Location: ResolverTypeWrapper<Location>
  MFAAction: MfaAction
  Mutation: ResolverTypeWrapper<{}>
  MutationResponse: ResolversTypes['DeleteUserResponse'] | ResolversTypes['ProjectDeleteResponse']
  NostrKeys: ResolverTypeWrapper<NostrKeys>
  NostrPrivateKey: ResolverTypeWrapper<NostrPrivateKey>
  NostrPublicKey: ResolverTypeWrapper<NostrPublicKey>
  OTPInput: OtpInput
  OTPLoginInput: OtpLoginInput
  OTPResponse: ResolverTypeWrapper<OtpResponse>
  OffsetBasedPaginationInput: OffsetBasedPaginationInput
  Order: ResolverTypeWrapper<Order>
  OrderBitcoinQuoteInput: OrderBitcoinQuoteInput
  OrderByDirection: OrderByDirection
  OrderByOptions: OrderByOptions
  OrderFundingInput: OrderFundingInput
  OrderItem: ResolverTypeWrapper<OrderItem>
  OrderItemInput: OrderItemInput
  OrderItemType: OrderItemType
  OrderStatusUpdateInput: OrderStatusUpdateInput
  OrdersGetInput: OrdersGetInput
  OrdersGetOrderByField: OrdersGetOrderByField
  OrdersGetOrderByInput: OrdersGetOrderByInput
  OrdersGetResponse: ResolverTypeWrapper<OrdersGetResponse>
  OrdersGetStatus: OrdersGetStatus
  OrdersGetWhereInput: OrdersGetWhereInput
  Owner: ResolverTypeWrapper<Owner>
  OwnerOf: ResolverTypeWrapper<OwnerOf>
  PageViewCountGraph: ResolverTypeWrapper<PageViewCountGraph>
  PaginationCursor: ResolverTypeWrapper<PaginationCursor>
  PaginationInput: PaginationInput
  Project: ResolverTypeWrapper<Project>
  ProjectActivatedSubscriptionResponse: ResolverTypeWrapper<ProjectActivatedSubscriptionResponse>
  ProjectCountriesGetResult: ResolverTypeWrapper<ProjectCountriesGetResult>
  ProjectDeleteResponse: ResolverTypeWrapper<ProjectDeleteResponse>
  ProjectEntriesGetInput: ProjectEntriesGetInput
  ProjectEntriesGetWhereInput: ProjectEntriesGetWhereInput
  ProjectFollowMutationInput: ProjectFollowMutationInput
  ProjectFunderRewardStats: ResolverTypeWrapper<ProjectFunderRewardStats>
  ProjectFunderStats: ResolverTypeWrapper<ProjectFunderStats>
  ProjectFundingTxStats: ResolverTypeWrapper<ProjectFundingTxStats>
  ProjectKeys: ResolverTypeWrapper<ProjectKeys>
  ProjectLinkMutationInput: ProjectLinkMutationInput
  ProjectMilestone: ResolverTypeWrapper<ProjectMilestone>
  ProjectPublishMutationInput: ProjectPublishMutationInput
  ProjectRegionsGetResult: ResolverTypeWrapper<ProjectRegionsGetResult>
  ProjectReward: ResolverTypeWrapper<ProjectReward>
  ProjectRewardCurrencyUpdate: ProjectRewardCurrencyUpdate
  ProjectRewardCurrencyUpdateRewardsInput: ProjectRewardCurrencyUpdateRewardsInput
  ProjectStatistics: ResolverTypeWrapper<ProjectStatistics>
  ProjectStats: ResolverTypeWrapper<ProjectStats>
  ProjectStatsBase: ResolverTypeWrapper<ProjectStatsBase>
  ProjectStatus: ProjectStatus
  ProjectStatusUpdate: ProjectStatusUpdate
  ProjectTagMutationInput: ProjectTagMutationInput
  ProjectType: ProjectType
  ProjectViewBaseStats: ResolverTypeWrapper<ProjectViewBaseStats>
  ProjectViewStats: ResolverTypeWrapper<ProjectViewStats>
  ProjectsGetQueryInput: ProjectsGetQueryInput
  ProjectsGetWhereInput: ProjectsGetWhereInput
  ProjectsOrderByField: ProjectsOrderByField
  ProjectsOrderByInput: ProjectsOrderByInput
  ProjectsResponse: ResolverTypeWrapper<ProjectsResponse>
  ProjectsSummary: ResolverTypeWrapper<ProjectsSummary>
  Query: ResolverTypeWrapper<{}>
  QuoteCurrency: QuoteCurrency
  ResourceInput: ResourceInput
  RewardCurrency: RewardCurrency
  SendOtpByEmailInput: SendOtpByEmailInput
  ShippingDestination: ShippingDestination
  SignedUploadUrl: ResolverTypeWrapper<SignedUploadUrl>
  SourceResource: ResolverTypeWrapper<ResolversUnionTypes['SourceResource']>
  Sponsor: ResolverTypeWrapper<Sponsor>
  SponsorStatus: SponsorStatus
  String: ResolverTypeWrapper<Scalars['String']>
  Subscription: ResolverTypeWrapper<{}>
  TOTPInput: TotpInput
  Tag: ResolverTypeWrapper<Tag>
  TagCreateInput: TagCreateInput
  TagsGetResult: ResolverTypeWrapper<TagsGetResult>
  TwoFAInput: TwoFaInput
  UniqueOrderInput: UniqueOrderInput
  UniqueProjectQueryInput: UniqueProjectQueryInput
  UpdatableOrderStatus: UpdatableOrderStatus
  UpdateEntryInput: UpdateEntryInput
  UpdateProjectInput: UpdateProjectInput
  UpdateProjectMilestoneInput: UpdateProjectMilestoneInput
  UpdateProjectRewardInput: UpdateProjectRewardInput
  UpdateUserInput: UpdateUserInput
  UpdateWalletInput: UpdateWalletInput
  UpdateWalletStateInput: UpdateWalletStateInput
  User: ResolverTypeWrapper<User>
  UserBadge: ResolverTypeWrapper<UserBadge>
  UserBadgeStatus: UserBadgeStatus
  UserEmailUpdateInput: UserEmailUpdateInput
  UserEntriesGetInput: UserEntriesGetInput
  UserEntriesGetWhereInput: UserEntriesGetWhereInput
  UserGetInput: UserGetInput
  UserProjectContribution: ResolverTypeWrapper<UserProjectContribution>
  UserProjectsGetInput: UserProjectsGetInput
  UserProjectsGetWhereInput: UserProjectsGetWhereInput
  Wallet: ResolverTypeWrapper<
    Omit<Wallet, 'connectionDetails'> & { connectionDetails: ResolversTypes['ConnectionDetails'] }
  >
  WalletResourceInput: WalletResourceInput
  WalletResourceType: WalletResourceType
  WalletState: ResolverTypeWrapper<WalletState>
  WalletStatus: WalletStatus
  WalletStatusCode: WalletStatusCode
  dashboardFundersGetInput: DashboardFundersGetInput
  projectsMostFundedOfTheWeekGet: ResolverTypeWrapper<ProjectsMostFundedOfTheWeekGet>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Activity: Omit<Activity, 'resource'> & { resource: ResolversParentTypes['ActivityResource'] }
  ActivityCreatedSubscriptionInput: ActivityCreatedSubscriptionInput
  ActivityCreatedSubscriptionWhereInput: ActivityCreatedSubscriptionWhereInput
  ActivityResource: ResolversUnionTypes['ActivityResource']
  Ambassador: Ambassador
  AmountSummary: AmountSummary
  Badge: Badge
  BadgeClaimInput: BadgeClaimInput
  BadgesGetInput: BadgesGetInput
  BadgesGetWhereInput: BadgesGetWhereInput
  BigInt: Scalars['BigInt']
  BitcoinQuote: BitcoinQuote
  Boolean: Scalars['Boolean']
  ConnectionDetails: ResolversUnionTypes['ConnectionDetails']
  Country: Country
  CreateEntryInput: CreateEntryInput
  CreateProjectInput: CreateProjectInput
  CreateProjectMilestoneInput: CreateProjectMilestoneInput
  CreateProjectRewardInput: CreateProjectRewardInput
  CreateWalletInput: CreateWalletInput
  CurrencyQuoteGetInput: CurrencyQuoteGetInput
  CurrencyQuoteGetResponse: CurrencyQuoteGetResponse
  CursorInput: CursorInput
  CursorInputString: CursorInputString
  CursorPaginationResponse: CursorPaginationResponse
  Date: Scalars['Date']
  DateRangeInput: DateRangeInput
  DatetimeRange: DatetimeRange
  DeleteProjectInput: DeleteProjectInput
  DeleteProjectRewardInput: DeleteProjectRewardInput
  DeleteUserResponse: DeleteUserResponse
  EmailVerifyInput: EmailVerifyInput
  Entry: Entry
  EntryPublishedSubscriptionResponse: EntryPublishedSubscriptionResponse
  ExternalAccount: ExternalAccount
  FileUploadInput: FileUploadInput
  Float: Scalars['Float']
  Funder: Funder
  FunderReward: FunderReward
  FunderRewardGraphSum: FunderRewardGraphSum
  FundingCancelInput: FundingCancelInput
  FundingCancelResponse: FundingCancelResponse
  FundingConfirmInput: FundingConfirmInput
  FundingConfirmOffChainBolt11Input: FundingConfirmOffChainBolt11Input
  FundingConfirmOffChainInput: FundingConfirmOffChainInput
  FundingConfirmOnChainInput: FundingConfirmOnChainInput
  FundingConfirmResponse: FundingConfirmResponse
  FundingCreateFromPodcastKeysendInput: FundingCreateFromPodcastKeysendInput
  FundingInput: FundingInput
  FundingMetadataInput: FundingMetadataInput
  FundingMutationResponse: FundingMutationResponse
  FundingPendingInput: FundingPendingInput
  FundingPendingOffChainBolt11Input: FundingPendingOffChainBolt11Input
  FundingPendingOffChainInput: FundingPendingOffChainInput
  FundingPendingOnChainInput: FundingPendingOnChainInput
  FundingPendingResponse: FundingPendingResponse
  FundingQueryResponse: FundingQueryResponse
  FundingTx: Omit<FundingTx, 'sourceResource'> & { sourceResource?: Maybe<ResolversParentTypes['SourceResource']> }
  FundingTxAmountGraph: FundingTxAmountGraph
  FundingTxMethodCount: FundingTxMethodCount
  FundingTxMethodSum: FundingTxMethodSum
  FundingTxStatusUpdatedInput: FundingTxStatusUpdatedInput
  FundingTxStatusUpdatedSubscriptionResponse: FundingTxStatusUpdatedSubscriptionResponse
  FundingTxsGetResponse: FundingTxsGetResponse
  FundinginvoiceCancel: FundinginvoiceCancel
  GetActivitiesInput: GetActivitiesInput
  GetActivityOrderByInput: GetActivityOrderByInput
  GetActivityPaginationInput: GetActivityPaginationInput
  GetActivityWhereInput: GetActivityWhereInput
  GetDashboardFundersWhereInput: GetDashboardFundersWhereInput
  GetEntriesInput: GetEntriesInput
  GetEntriesOrderByInput: GetEntriesOrderByInput
  GetEntriesWhereInput: GetEntriesWhereInput
  GetFunderFundingTxsInput: GetFunderFundingTxsInput
  GetFunderFundingTxsWhereInput: GetFunderFundingTxsWhereInput
  GetFunderWhereInput: GetFunderWhereInput
  GetFundersInput: GetFundersInput
  GetFundersOrderByInput: GetFundersOrderByInput
  GetFundingTxsInput: GetFundingTxsInput
  GetFundingTxsOrderByInput: GetFundingTxsOrderByInput
  GetFundingTxsWhereInput: GetFundingTxsWhereInput
  GetProjectRewardInput: GetProjectRewardInput
  GetProjectRewardWhereInput: GetProjectRewardWhereInput
  GetProjectStatsInput: GetProjectStatsInput
  GetProjectStatsWhereInput: GetProjectStatsWhereInput
  GetProjectsMostFundedOfTheWeekInput: GetProjectsMostFundedOfTheWeekInput
  Grant: Grant
  GrantApplicant: GrantApplicant
  GrantApplicantFunding: GrantApplicantFunding
  GrantApplyInput: GrantApplyInput
  GrantBoardMember: GrantBoardMember
  GrantGetInput: GrantGetInput
  GrantGetWhereInput: GrantGetWhereInput
  GrantStatistics: GrantStatistics
  GrantStatisticsApplicant: GrantStatisticsApplicant
  GrantStatisticsGrant: GrantStatisticsGrant
  GrantStatus: GrantStatus
  GraphSumData: ResolversParentTypes['FunderRewardGraphSum'] | ResolversParentTypes['FundingTxAmountGraph']
  Int: Scalars['Int']
  LightningAddressConnectionDetails: LightningAddressConnectionDetails
  LightningAddressConnectionDetailsCreateInput: LightningAddressConnectionDetailsCreateInput
  LightningAddressConnectionDetailsUpdateInput: LightningAddressConnectionDetailsUpdateInput
  LightningAddressVerifyResponse: LightningAddressVerifyResponse
  LndConnectionDetails: never
  LndConnectionDetailsCreateInput: LndConnectionDetailsCreateInput
  LndConnectionDetailsPrivate: LndConnectionDetailsPrivate
  LndConnectionDetailsPublic: LndConnectionDetailsPublic
  LndConnectionDetailsUpdateInput: LndConnectionDetailsUpdateInput
  Location: Location
  Mutation: {}
  MutationResponse: ResolversParentTypes['DeleteUserResponse'] | ResolversParentTypes['ProjectDeleteResponse']
  NostrKeys: NostrKeys
  NostrPrivateKey: NostrPrivateKey
  NostrPublicKey: NostrPublicKey
  OTPInput: OtpInput
  OTPLoginInput: OtpLoginInput
  OTPResponse: OtpResponse
  OffsetBasedPaginationInput: OffsetBasedPaginationInput
  Order: Order
  OrderBitcoinQuoteInput: OrderBitcoinQuoteInput
  OrderFundingInput: OrderFundingInput
  OrderItem: OrderItem
  OrderItemInput: OrderItemInput
  OrderStatusUpdateInput: OrderStatusUpdateInput
  OrdersGetInput: OrdersGetInput
  OrdersGetOrderByInput: OrdersGetOrderByInput
  OrdersGetResponse: OrdersGetResponse
  OrdersGetWhereInput: OrdersGetWhereInput
  Owner: Owner
  OwnerOf: OwnerOf
  PageViewCountGraph: PageViewCountGraph
  PaginationCursor: PaginationCursor
  PaginationInput: PaginationInput
  Project: Project
  ProjectActivatedSubscriptionResponse: ProjectActivatedSubscriptionResponse
  ProjectCountriesGetResult: ProjectCountriesGetResult
  ProjectDeleteResponse: ProjectDeleteResponse
  ProjectEntriesGetInput: ProjectEntriesGetInput
  ProjectEntriesGetWhereInput: ProjectEntriesGetWhereInput
  ProjectFollowMutationInput: ProjectFollowMutationInput
  ProjectFunderRewardStats: ProjectFunderRewardStats
  ProjectFunderStats: ProjectFunderStats
  ProjectFundingTxStats: ProjectFundingTxStats
  ProjectKeys: ProjectKeys
  ProjectLinkMutationInput: ProjectLinkMutationInput
  ProjectMilestone: ProjectMilestone
  ProjectPublishMutationInput: ProjectPublishMutationInput
  ProjectRegionsGetResult: ProjectRegionsGetResult
  ProjectReward: ProjectReward
  ProjectRewardCurrencyUpdate: ProjectRewardCurrencyUpdate
  ProjectRewardCurrencyUpdateRewardsInput: ProjectRewardCurrencyUpdateRewardsInput
  ProjectStatistics: ProjectStatistics
  ProjectStats: ProjectStats
  ProjectStatsBase: ProjectStatsBase
  ProjectStatusUpdate: ProjectStatusUpdate
  ProjectTagMutationInput: ProjectTagMutationInput
  ProjectViewBaseStats: ProjectViewBaseStats
  ProjectViewStats: ProjectViewStats
  ProjectsGetQueryInput: ProjectsGetQueryInput
  ProjectsGetWhereInput: ProjectsGetWhereInput
  ProjectsOrderByInput: ProjectsOrderByInput
  ProjectsResponse: ProjectsResponse
  ProjectsSummary: ProjectsSummary
  Query: {}
  ResourceInput: ResourceInput
  SendOtpByEmailInput: SendOtpByEmailInput
  SignedUploadUrl: SignedUploadUrl
  SourceResource: ResolversUnionTypes['SourceResource']
  Sponsor: Sponsor
  String: Scalars['String']
  Subscription: {}
  TOTPInput: TotpInput
  Tag: Tag
  TagCreateInput: TagCreateInput
  TagsGetResult: TagsGetResult
  TwoFAInput: TwoFaInput
  UniqueOrderInput: UniqueOrderInput
  UniqueProjectQueryInput: UniqueProjectQueryInput
  UpdateEntryInput: UpdateEntryInput
  UpdateProjectInput: UpdateProjectInput
  UpdateProjectMilestoneInput: UpdateProjectMilestoneInput
  UpdateProjectRewardInput: UpdateProjectRewardInput
  UpdateUserInput: UpdateUserInput
  UpdateWalletInput: UpdateWalletInput
  UpdateWalletStateInput: UpdateWalletStateInput
  User: User
  UserBadge: UserBadge
  UserEmailUpdateInput: UserEmailUpdateInput
  UserEntriesGetInput: UserEntriesGetInput
  UserEntriesGetWhereInput: UserEntriesGetWhereInput
  UserGetInput: UserGetInput
  UserProjectContribution: UserProjectContribution
  UserProjectsGetInput: UserProjectsGetInput
  UserProjectsGetWhereInput: UserProjectsGetWhereInput
  Wallet: Omit<Wallet, 'connectionDetails'> & { connectionDetails: ResolversParentTypes['ConnectionDetails'] }
  WalletResourceInput: WalletResourceInput
  WalletState: WalletState
  dashboardFundersGetInput: DashboardFundersGetInput
  projectsMostFundedOfTheWeekGet: ProjectsMostFundedOfTheWeekGet
}

export type ActivityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity'],
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  resource?: Resolver<ResolversTypes['ActivityResource'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ActivityResourceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityResource'] = ResolversParentTypes['ActivityResource'],
> = {
  __resolveType: TypeResolveFn<'Entry' | 'FundingTx' | 'Project' | 'ProjectReward', ParentType, ContextType>
}

export type AmbassadorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Ambassador'] = ResolversParentTypes['Ambassador'],
> = {
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AmountSummaryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AmountSummary'] = ResolversParentTypes['AmountSummary'],
> = {
  donationAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  rewardsCost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  shippingCost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type BadgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Badge'] = ResolversParentTypes['Badge'],
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  uniqueName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt'
}

export type BitcoinQuoteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BitcoinQuote'] = ResolversParentTypes['BitcoinQuote'],
> = {
  quote?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  quoteCurrency?: Resolver<ResolversTypes['QuoteCurrency'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ConnectionDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConnectionDetails'] = ResolversParentTypes['ConnectionDetails'],
> = {
  __resolveType: TypeResolveFn<
    'LightningAddressConnectionDetails' | 'LndConnectionDetailsPrivate' | 'LndConnectionDetailsPublic',
    ParentType,
    ContextType
  >
}

export type CountryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country'],
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CurrencyQuoteGetResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CurrencyQuoteGetResponse'] = ResolversParentTypes['CurrencyQuoteGetResponse'],
> = {
  baseCurrency?: Resolver<ResolversTypes['BaseCurrency'], ParentType, ContextType>
  quote?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  quoteCurrency?: Resolver<ResolversTypes['QuoteCurrency'], ParentType, ContextType>
  timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CursorPaginationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CursorPaginationResponse'] = ResolversParentTypes['CursorPaginationResponse'],
> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  cursor?: Resolver<Maybe<ResolversTypes['PaginationCursor']>, ParentType, ContextType>
  take?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type DatetimeRangeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DatetimeRange'] = ResolversParentTypes['DatetimeRange'],
> = {
  endDateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  startDateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteUserResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteUserResponse'] = ResolversParentTypes['DeleteUserResponse'],
> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry'],
> = {
  amountFunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  fundersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  fundingTxs?: Resolver<Array<ResolversTypes['FundingTx']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['EntryStatus'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['EntryType'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type EntryPublishedSubscriptionResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EntryPublishedSubscriptionResponse'] = ResolversParentTypes['EntryPublishedSubscriptionResponse'],
> = {
  entry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ExternalAccountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ExternalAccount'] = ResolversParentTypes['ExternalAccount'],
> = {
  accountType?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  externalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  externalUsername?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FunderResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Funder'] = ResolversParentTypes['Funder'],
> = {
  amountFunded?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  confirmedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  fundingTxs?: Resolver<Array<ResolversTypes['FundingTx']>, ParentType, ContextType, Partial<FunderFundingTxsArgs>>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>
  rewards?: Resolver<Array<ResolversTypes['FunderReward']>, ParentType, ContextType>
  timesFunded?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FunderRewardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FunderReward'] = ResolversParentTypes['FunderReward'],
> = {
  projectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType>
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FunderRewardGraphSumResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FunderRewardGraphSum'] = ResolversParentTypes['FunderRewardGraphSum'],
> = {
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  rewardId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  rewardName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  sum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingCancelResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingCancelResponse'] = ResolversParentTypes['FundingCancelResponse'],
> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingConfirmResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingConfirmResponse'] = ResolversParentTypes['FundingConfirmResponse'],
> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  missedSettleEvents?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingMutationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingMutationResponse'] = ResolversParentTypes['FundingMutationResponse'],
> = {
  fundingTx?: Resolver<Maybe<ResolversTypes['FundingTx']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingPendingResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingPendingResponse'] = ResolversParentTypes['FundingPendingResponse'],
> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingQueryResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingQueryResponse'] = ResolversParentTypes['FundingQueryResponse'],
> = {
  fundingTx?: Resolver<Maybe<ResolversTypes['FundingTx']>, ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingTxResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingTx'] = ResolversParentTypes['FundingTx'],
> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  amountPaid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  bitcoinQuote?: Resolver<Maybe<ResolversTypes['BitcoinQuote']>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  creatorEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  donationAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  funder?: Resolver<ResolversTypes['Funder'], ParentType, ContextType>
  fundingType?: Resolver<ResolversTypes['FundingType'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  invoiceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  invoiceStatus?: Resolver<ResolversTypes['InvoiceStatus'], ParentType, ContextType>
  isAnonymous?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  media?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  method?: Resolver<Maybe<ResolversTypes['FundingMethod']>, ParentType, ContextType>
  onChain?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>
  paidAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  paymentRequest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  projectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  sourceResource?: Resolver<Maybe<ResolversTypes['SourceResource']>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['FundingStatus'], ParentType, ContextType>
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingTxAmountGraphResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingTxAmountGraph'] = ResolversParentTypes['FundingTxAmountGraph'],
> = {
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  sum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingTxMethodCountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingTxMethodCount'] = ResolversParentTypes['FundingTxMethodCount'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingTxMethodSumResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingTxMethodSum'] = ResolversParentTypes['FundingTxMethodSum'],
> = {
  method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  sum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingTxStatusUpdatedSubscriptionResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingTxStatusUpdatedSubscriptionResponse'] = ResolversParentTypes['FundingTxStatusUpdatedSubscriptionResponse'],
> = {
  fundingTx?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingTxsGetResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingTxsGetResponse'] = ResolversParentTypes['FundingTxsGetResponse'],
> = {
  fundingTxs?: Resolver<Array<ResolversTypes['FundingTx']>, ParentType, ContextType>
  pagination?: Resolver<Maybe<ResolversTypes['CursorPaginationResponse']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundinginvoiceCancelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundinginvoiceCancel'] = ResolversParentTypes['FundinginvoiceCancel'],
> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Grant'] = ResolversParentTypes['Grant'],
> = {
  applicants?: Resolver<Array<ResolversTypes['GrantApplicant']>, ParentType, ContextType>
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  boardMembers?: Resolver<Array<ResolversTypes['GrantBoardMember']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  shortDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  sponsors?: Resolver<Array<ResolversTypes['Sponsor']>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['GrantStatusEnum'], ParentType, ContextType>
  statuses?: Resolver<Array<ResolversTypes['GrantStatus']>, ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantApplicantResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GrantApplicant'] = ResolversParentTypes['GrantApplicant'],
> = {
  funding?: Resolver<ResolversTypes['GrantApplicantFunding'], ParentType, ContextType>
  grant?: Resolver<ResolversTypes['Grant'], ParentType, ContextType>
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['GrantApplicantStatus'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantApplicantFundingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GrantApplicantFunding'] = ResolversParentTypes['GrantApplicantFunding'],
> = {
  communityFunding?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  grantAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  grantAmountDistributed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantBoardMemberResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GrantBoardMember'] = ResolversParentTypes['GrantBoardMember'],
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantStatisticsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GrantStatistics'] = ResolversParentTypes['GrantStatistics'],
> = {
  applicants?: Resolver<Maybe<ResolversTypes['GrantStatisticsApplicant']>, ParentType, ContextType>
  grants?: Resolver<Maybe<ResolversTypes['GrantStatisticsGrant']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantStatisticsApplicantResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GrantStatisticsApplicant'] = ResolversParentTypes['GrantStatisticsApplicant'],
> = {
  countFunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantStatisticsGrantResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GrantStatisticsGrant'] = ResolversParentTypes['GrantStatisticsGrant'],
> = {
  amountFunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  amountGranted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantStatusResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GrantStatus'] = ResolversParentTypes['GrantStatus'],
> = {
  endAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  startAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['GrantStatusEnum'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GraphSumDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GraphSumData'] = ResolversParentTypes['GraphSumData'],
> = {
  __resolveType: TypeResolveFn<'FunderRewardGraphSum' | 'FundingTxAmountGraph', ParentType, ContextType>
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  sum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type LightningAddressConnectionDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LightningAddressConnectionDetails'] = ResolversParentTypes['LightningAddressConnectionDetails'],
> = {
  lightningAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LightningAddressVerifyResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LightningAddressVerifyResponse'] = ResolversParentTypes['LightningAddressVerifyResponse'],
> = {
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  valid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LndConnectionDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LndConnectionDetails'] = ResolversParentTypes['LndConnectionDetails'],
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>
  grpcPort?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  hostname?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  lndNodeType?: Resolver<ResolversTypes['LndNodeType'], ParentType, ContextType>
  macaroon?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  tlsCertificate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type LndConnectionDetailsPrivateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LndConnectionDetailsPrivate'] = ResolversParentTypes['LndConnectionDetailsPrivate'],
> = {
  grpcPort?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  hostname?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  lndNodeType?: Resolver<ResolversTypes['LndNodeType'], ParentType, ContextType>
  macaroon?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  pubkey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  tlsCertificate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LndConnectionDetailsPublicResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LndConnectionDetailsPublic'] = ResolversParentTypes['LndConnectionDetailsPublic'],
> = {
  pubkey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location'],
> = {
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  claimBadge?: Resolver<
    ResolversTypes['UserBadge'],
    ParentType,
    ContextType,
    RequireFields<MutationClaimBadgeArgs, 'input'>
  >
  createEntry?: Resolver<
    ResolversTypes['Entry'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateEntryArgs, 'input'>
  >
  createProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateProjectArgs, 'input'>
  >
  createProjectMilestone?: Resolver<
    ResolversTypes['ProjectMilestone'],
    ParentType,
    ContextType,
    Partial<MutationCreateProjectMilestoneArgs>
  >
  createWallet?: Resolver<
    ResolversTypes['Wallet'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateWalletArgs, 'input'>
  >
  deleteEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationDeleteEntryArgs, 'id'>>
  deleteProjectMilestone?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectMilestoneArgs, 'projectMilestoneId'>
  >
  fund?: Resolver<
    ResolversTypes['FundingMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationFundArgs, 'input'>
  >
  fundingCancel?: Resolver<
    ResolversTypes['FundingCancelResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationFundingCancelArgs, 'input'>
  >
  fundingClaimAnonymous?: Resolver<
    ResolversTypes['FundingMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationFundingClaimAnonymousArgs, 'uuid'>
  >
  fundingConfirm?: Resolver<
    ResolversTypes['FundingConfirmResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationFundingConfirmArgs, 'input'>
  >
  fundingCreateFromPodcastKeysend?: Resolver<
    ResolversTypes['FundingTx'],
    ParentType,
    ContextType,
    Partial<MutationFundingCreateFromPodcastKeysendArgs>
  >
  fundingInvoiceCancel?: Resolver<
    ResolversTypes['FundinginvoiceCancel'],
    ParentType,
    ContextType,
    RequireFields<MutationFundingInvoiceCancelArgs, 'invoiceId'>
  >
  fundingInvoiceRefresh?: Resolver<
    ResolversTypes['FundingTx'],
    ParentType,
    ContextType,
    RequireFields<MutationFundingInvoiceRefreshArgs, 'fundingTxId'>
  >
  fundingPend?: Resolver<
    ResolversTypes['FundingPendingResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationFundingPendArgs, 'input'>
  >
  grantApply?: Resolver<ResolversTypes['GrantApplicant'], ParentType, ContextType, Partial<MutationGrantApplyArgs>>
  orderStatusUpdate?: Resolver<
    Maybe<ResolversTypes['Order']>,
    ParentType,
    ContextType,
    RequireFields<MutationOrderStatusUpdateArgs, 'input'>
  >
  projectDelete?: Resolver<
    ResolversTypes['ProjectDeleteResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationProjectDeleteArgs, 'input'>
  >
  projectFollow?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationProjectFollowArgs, 'input'>
  >
  projectPublish?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<MutationProjectPublishArgs, 'input'>
  >
  projectRewardCreate?: Resolver<
    ResolversTypes['ProjectReward'],
    ParentType,
    ContextType,
    RequireFields<MutationProjectRewardCreateArgs, 'input'>
  >
  projectRewardCurrencyUpdate?: Resolver<
    Array<ResolversTypes['ProjectReward']>,
    ParentType,
    ContextType,
    RequireFields<MutationProjectRewardCurrencyUpdateArgs, 'input'>
  >
  projectRewardDelete?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationProjectRewardDeleteArgs, 'input'>
  >
  projectRewardUpdate?: Resolver<
    ResolversTypes['ProjectReward'],
    ParentType,
    ContextType,
    RequireFields<MutationProjectRewardUpdateArgs, 'input'>
  >
  projectStatusUpdate?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<MutationProjectStatusUpdateArgs, 'input'>
  >
  projectTagAdd?: Resolver<
    Array<ResolversTypes['Tag']>,
    ParentType,
    ContextType,
    RequireFields<MutationProjectTagAddArgs, 'input'>
  >
  projectTagRemove?: Resolver<
    Array<ResolversTypes['Tag']>,
    ParentType,
    ContextType,
    RequireFields<MutationProjectTagRemoveArgs, 'input'>
  >
  projectUnfollow?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationProjectUnfollowArgs, 'input'>
  >
  publishEntry?: Resolver<
    ResolversTypes['Entry'],
    ParentType,
    ContextType,
    RequireFields<MutationPublishEntryArgs, 'id'>
  >
  sendOTPByEmail?: Resolver<
    ResolversTypes['OTPResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSendOtpByEmailArgs, 'input'>
  >
  tagCreate?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationTagCreateArgs, 'input'>>
  unlinkExternalAccount?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUnlinkExternalAccountArgs, 'id'>
  >
  updateEntry?: Resolver<
    ResolversTypes['Entry'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEntryArgs, 'input'>
  >
  updateProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProjectArgs, 'input'>
  >
  updateProjectMilestone?: Resolver<
    ResolversTypes['ProjectMilestone'],
    ParentType,
    ContextType,
    Partial<MutationUpdateProjectMilestoneArgs>
  >
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>
  updateWallet?: Resolver<
    ResolversTypes['Wallet'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateWalletArgs, 'input'>
  >
  updateWalletState?: Resolver<
    ResolversTypes['Wallet'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateWalletStateArgs, 'input'>
  >
  userBadgeAward?: Resolver<
    ResolversTypes['UserBadge'],
    ParentType,
    ContextType,
    RequireFields<MutationUserBadgeAwardArgs, 'userBadgeId'>
  >
  userDelete?: Resolver<ResolversTypes['DeleteUserResponse'], ParentType, ContextType>
  userEmailUpdate?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUserEmailUpdateArgs, 'input'>
  >
  userEmailVerify?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationUserEmailVerifyArgs, 'input'>
  >
  walletDelete?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationWalletDeleteArgs, 'id'>
  >
}

export type MutationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse'],
> = {
  __resolveType: TypeResolveFn<'DeleteUserResponse' | 'ProjectDeleteResponse', ParentType, ContextType>
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
}

export type NostrKeysResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['NostrKeys'] = ResolversParentTypes['NostrKeys'],
> = {
  privateKey?: Resolver<Maybe<ResolversTypes['NostrPrivateKey']>, ParentType, ContextType>
  publicKey?: Resolver<ResolversTypes['NostrPublicKey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type NostrPrivateKeyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['NostrPrivateKey'] = ResolversParentTypes['NostrPrivateKey'],
> = {
  hex?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  nsec?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type NostrPublicKeyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['NostrPublicKey'] = ResolversParentTypes['NostrPublicKey'],
> = {
  hex?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  npub?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OtpResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OTPResponse'] = ResolversParentTypes['OTPResponse'],
> = {
  expiresAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  otpVerificationToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OrderResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order'],
> = {
  confirmedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  deliveredAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  fundingTx?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  items?: Resolver<Array<ResolversTypes['OrderItem']>, ParentType, ContextType>
  referenceCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  shippedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  totalInSats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OrderItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem'],
> = {
  item?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType>
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  unitPriceInSats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OrdersGetResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrdersGetResponse'] = ResolversParentTypes['OrdersGetResponse'],
> = {
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>
  pagination?: Resolver<Maybe<ResolversTypes['CursorPaginationResponse']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OwnerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner'],
> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OwnerOfResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OwnerOf'] = ResolversParentTypes['OwnerOf'],
> = {
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType>
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PageViewCountGraphResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageViewCountGraph'] = ResolversParentTypes['PageViewCountGraph'],
> = {
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  visitorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PaginationCursorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginationCursor'] = ResolversParentTypes['PaginationCursor'],
> = {
  id?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project'],
> = {
  ambassadors?: Resolver<Array<ResolversTypes['Ambassador']>, ParentType, ContextType>
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  canDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, Partial<ProjectEntriesArgs>>
  followers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  funders?: Resolver<Array<ResolversTypes['Funder']>, ParentType, ContextType>
  fundersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  fundingTxs?: Resolver<Array<ResolversTypes['FundingTx']>, ParentType, ContextType>
  fundingTxsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  grants?: Resolver<Array<ResolversTypes['GrantApplicant']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  keys?: Resolver<ResolversTypes['ProjectKeys'], ParentType, ContextType>
  links?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>
  milestones?: Resolver<Array<ResolversTypes['ProjectMilestone']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  owners?: Resolver<Array<ResolversTypes['Owner']>, ParentType, ContextType>
  rewardCurrency?: Resolver<Maybe<ResolversTypes['RewardCurrency']>, ParentType, ContextType>
  rewards?: Resolver<Array<ResolversTypes['ProjectReward']>, ParentType, ContextType>
  shortDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  sponsors?: Resolver<Array<ResolversTypes['Sponsor']>, ParentType, ContextType>
  statistics?: Resolver<Maybe<ResolversTypes['ProjectStatistics']>, ParentType, ContextType>
  status?: Resolver<Maybe<ResolversTypes['ProjectStatus']>, ParentType, ContextType>
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>
  thumbnailImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['ProjectType'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  wallets?: Resolver<Array<ResolversTypes['Wallet']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectActivatedSubscriptionResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectActivatedSubscriptionResponse'] = ResolversParentTypes['ProjectActivatedSubscriptionResponse'],
> = {
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectCountriesGetResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectCountriesGetResult'] = ResolversParentTypes['ProjectCountriesGetResult'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectDeleteResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectDeleteResponse'] = ResolversParentTypes['ProjectDeleteResponse'],
> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectFunderRewardStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectFunderRewardStats'] = ResolversParentTypes['ProjectFunderRewardStats'],
> = {
  quantityGraph?: Resolver<Maybe<Array<Maybe<ResolversTypes['FunderRewardGraphSum']>>>, ParentType, ContextType>
  quantitySum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectFunderStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectFunderStats'] = ResolversParentTypes['ProjectFunderStats'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectFundingTxStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectFundingTxStats'] = ResolversParentTypes['ProjectFundingTxStats'],
> = {
  amountGraph?: Resolver<Maybe<Array<Maybe<ResolversTypes['FundingTxAmountGraph']>>>, ParentType, ContextType>
  amountSum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  methodCount?: Resolver<Maybe<Array<Maybe<ResolversTypes['FundingTxMethodCount']>>>, ParentType, ContextType>
  methodSum?: Resolver<Maybe<Array<Maybe<ResolversTypes['FundingTxMethodSum']>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectKeysResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectKeys'] = ResolversParentTypes['ProjectKeys'],
> = {
  nostrKeys?: Resolver<ResolversTypes['NostrKeys'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectMilestoneResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectMilestone'] = ResolversParentTypes['ProjectMilestone'],
> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  reached?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectRegionsGetResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectRegionsGetResult'] = ResolversParentTypes['ProjectRegionsGetResult'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  region?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectRewardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectReward'] = ResolversParentTypes['ProjectReward'],
> = {
  backersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  deletedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  estimatedAvailabilityDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  estimatedDeliveryDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  estimatedDeliveryInWeeks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  hasShipping?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  isAddon?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  maxClaimable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  preOrder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  rewardCurrency?: Resolver<ResolversTypes['RewardCurrency'], ParentType, ContextType>
  rewardType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  sold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectStatisticsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectStatistics'] = ResolversParentTypes['ProjectStatistics'],
> = {
  totalPageviews?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  totalVisitors?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectStats'] = ResolversParentTypes['ProjectStats'],
> = {
  current?: Resolver<Maybe<ResolversTypes['ProjectStatsBase']>, ParentType, ContextType>
  datetimeRange?: Resolver<ResolversTypes['DatetimeRange'], ParentType, ContextType>
  prevTimeRange?: Resolver<Maybe<ResolversTypes['ProjectStatsBase']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectStatsBaseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectStatsBase'] = ResolversParentTypes['ProjectStatsBase'],
> = {
  projectFunderRewards?: Resolver<Maybe<ResolversTypes['ProjectFunderRewardStats']>, ParentType, ContextType>
  projectFunders?: Resolver<Maybe<ResolversTypes['ProjectFunderStats']>, ParentType, ContextType>
  projectFundingTxs?: Resolver<Maybe<ResolversTypes['ProjectFundingTxStats']>, ParentType, ContextType>
  projectViews?: Resolver<Maybe<ResolversTypes['ProjectViewStats']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectViewBaseStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectViewBaseStats'] = ResolversParentTypes['ProjectViewBaseStats'],
> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  visitorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectViewStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectViewStats'] = ResolversParentTypes['ProjectViewStats'],
> = {
  countries?: Resolver<Array<ResolversTypes['ProjectViewBaseStats']>, ParentType, ContextType>
  referrers?: Resolver<Array<ResolversTypes['ProjectViewBaseStats']>, ParentType, ContextType>
  regions?: Resolver<Array<ResolversTypes['ProjectViewBaseStats']>, ParentType, ContextType>
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  visitorCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  visitorGraph?: Resolver<Array<Maybe<ResolversTypes['PageViewCountGraph']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectsResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectsResponse'] = ResolversParentTypes['ProjectsResponse'],
> = {
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>
  summary?: Resolver<Maybe<ResolversTypes['ProjectsSummary']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectsSummaryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectsSummary'] = ResolversParentTypes['ProjectsSummary'],
> = {
  fundedTotal?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>
  fundersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  projectsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  badges?: Resolver<Array<ResolversTypes['Badge']>, ParentType, ContextType>
  currencyQuoteGet?: Resolver<
    ResolversTypes['CurrencyQuoteGetResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryCurrencyQuoteGetArgs, 'input'>
  >
  entry?: Resolver<Maybe<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryEntryArgs, 'id'>>
  fundersGet?: Resolver<
    Array<ResolversTypes['Funder']>,
    ParentType,
    ContextType,
    RequireFields<QueryFundersGetArgs, 'input'>
  >
  fundingTx?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType, RequireFields<QueryFundingTxArgs, 'id'>>
  fundingTxsGet?: Resolver<
    Maybe<ResolversTypes['FundingTxsGetResponse']>,
    ParentType,
    ContextType,
    Partial<QueryFundingTxsGetArgs>
  >
  getActivities?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType, Partial<QueryGetActivitiesArgs>>
  getDashboardFunders?: Resolver<
    Array<ResolversTypes['Funder']>,
    ParentType,
    ContextType,
    Partial<QueryGetDashboardFundersArgs>
  >
  getEntries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, Partial<QueryGetEntriesArgs>>
  getProjectPubkey?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetProjectPubkeyArgs, 'projectId'>
  >
  getProjectReward?: Resolver<
    ResolversTypes['ProjectReward'],
    ParentType,
    ContextType,
    RequireFields<QueryGetProjectRewardArgs, 'id'>
  >
  getSignedUploadUrl?: Resolver<
    ResolversTypes['SignedUploadUrl'],
    ParentType,
    ContextType,
    RequireFields<QueryGetSignedUploadUrlArgs, 'input'>
  >
  getWallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<QueryGetWalletArgs, 'id'>>
  grant?: Resolver<ResolversTypes['Grant'], ParentType, ContextType, RequireFields<QueryGrantArgs, 'input'>>
  grantStatistics?: Resolver<ResolversTypes['GrantStatistics'], ParentType, ContextType>
  grants?: Resolver<Array<ResolversTypes['Grant']>, ParentType, ContextType>
  lightningAddressVerify?: Resolver<
    ResolversTypes['LightningAddressVerifyResponse'],
    ParentType,
    ContextType,
    Partial<QueryLightningAddressVerifyArgs>
  >
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  orderGet?: Resolver<
    Maybe<ResolversTypes['Order']>,
    ParentType,
    ContextType,
    RequireFields<QueryOrderGetArgs, 'where'>
  >
  ordersGet?: Resolver<
    Maybe<ResolversTypes['OrdersGetResponse']>,
    ParentType,
    ContextType,
    RequireFields<QueryOrdersGetArgs, 'input'>
  >
  projectCountriesGet?: Resolver<Array<ResolversTypes['ProjectCountriesGetResult']>, ParentType, ContextType>
  projectGet?: Resolver<
    Maybe<ResolversTypes['Project']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectGetArgs, 'where'>
  >
  projectRegionsGet?: Resolver<Array<ResolversTypes['ProjectRegionsGetResult']>, ParentType, ContextType>
  projectRewardCategoriesGet?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  projectRewardsGet?: Resolver<
    Array<ResolversTypes['ProjectReward']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectRewardsGetArgs, 'input'>
  >
  projectStatsGet?: Resolver<
    ResolversTypes['ProjectStats'],
    ParentType,
    ContextType,
    RequireFields<QueryProjectStatsGetArgs, 'input'>
  >
  projectsGet?: Resolver<ResolversTypes['ProjectsResponse'], ParentType, ContextType, Partial<QueryProjectsGetArgs>>
  projectsMostFundedOfTheWeekGet?: Resolver<
    Array<ResolversTypes['projectsMostFundedOfTheWeekGet']>,
    ParentType,
    ContextType,
    Partial<QueryProjectsMostFundedOfTheWeekGetArgs>
  >
  projectsSummary?: Resolver<ResolversTypes['ProjectsSummary'], ParentType, ContextType>
  statusCheck?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  tagsGet?: Resolver<Array<ResolversTypes['TagsGetResult']>, ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'where'>>
  userBadge?: Resolver<
    Maybe<ResolversTypes['UserBadge']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserBadgeArgs, 'userBadgeId'>
  >
  userBadges?: Resolver<
    Array<ResolversTypes['UserBadge']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserBadgesArgs, 'input'>
  >
}

export type SignedUploadUrlResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SignedUploadUrl'] = ResolversParentTypes['SignedUploadUrl'],
> = {
  distributionUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  uploadUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SourceResourceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SourceResource'] = ResolversParentTypes['SourceResource'],
> = {
  __resolveType: TypeResolveFn<'Entry' | 'Project', ParentType, ContextType>
}

export type SponsorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Sponsor'] = ResolversParentTypes['Sponsor'],
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['SponsorStatus'], ParentType, ContextType>
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = {
  _?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, '_', ParentType, ContextType>
  activityCreated?: SubscriptionResolver<
    ResolversTypes['ActivityResource'],
    'activityCreated',
    ParentType,
    ContextType,
    Partial<SubscriptionActivityCreatedArgs>
  >
  entryPublished?: SubscriptionResolver<
    ResolversTypes['EntryPublishedSubscriptionResponse'],
    'entryPublished',
    ParentType,
    ContextType
  >
  fundingTxStatusUpdated?: SubscriptionResolver<
    ResolversTypes['FundingTxStatusUpdatedSubscriptionResponse'],
    'fundingTxStatusUpdated',
    ParentType,
    ContextType,
    Partial<SubscriptionFundingTxStatusUpdatedArgs>
  >
  projectActivated?: SubscriptionResolver<
    ResolversTypes['ProjectActivatedSubscriptionResponse'],
    'projectActivated',
    ParentType,
    ContextType
  >
}

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TagsGetResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TagsGetResult'] = ResolversParentTypes['TagsGetResult'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  badges?: Resolver<Array<ResolversTypes['UserBadge']>, ParentType, ContextType>
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  contributions?: Resolver<Array<ResolversTypes['UserProjectContribution']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  emailVerifiedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, Partial<UserEntriesArgs>>
  externalAccounts?: Resolver<Array<ResolversTypes['ExternalAccount']>, ParentType, ContextType>
  fundingTxs?: Resolver<Array<ResolversTypes['FundingTx']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  isEmailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>
  ownerOf?: Resolver<Array<ResolversTypes['OwnerOf']>, ParentType, ContextType>
  projectFollows?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, Partial<UserProjectsArgs>>
  ranking?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  wallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserBadgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserBadge'] = ResolversParentTypes['UserBadge'],
> = {
  badge?: Resolver<ResolversTypes['Badge'], ParentType, ContextType>
  badgeAwardEventId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  fundingTxId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  status?: Resolver<Maybe<ResolversTypes['UserBadgeStatus']>, ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserProjectContributionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserProjectContribution'] = ResolversParentTypes['UserProjectContribution'],
> = {
  funder?: Resolver<Maybe<ResolversTypes['Funder']>, ParentType, ContextType>
  isAmbassador?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isFunder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isSponsor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type WalletResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet'],
> = {
  connectionDetails?: Resolver<ResolversTypes['ConnectionDetails'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  state?: Resolver<ResolversTypes['WalletState'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type WalletStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WalletState'] = ResolversParentTypes['WalletState'],
> = {
  status?: Resolver<ResolversTypes['WalletStatus'], ParentType, ContextType>
  statusCode?: Resolver<ResolversTypes['WalletStatusCode'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectsMostFundedOfTheWeekGetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['projectsMostFundedOfTheWeekGet'] = ResolversParentTypes['projectsMostFundedOfTheWeekGet'],
> = {
  fundersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  fundingAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  tagId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Activity?: ActivityResolvers<ContextType>
  ActivityResource?: ActivityResourceResolvers<ContextType>
  Ambassador?: AmbassadorResolvers<ContextType>
  AmountSummary?: AmountSummaryResolvers<ContextType>
  Badge?: BadgeResolvers<ContextType>
  BigInt?: GraphQLScalarType
  BitcoinQuote?: BitcoinQuoteResolvers<ContextType>
  ConnectionDetails?: ConnectionDetailsResolvers<ContextType>
  Country?: CountryResolvers<ContextType>
  CurrencyQuoteGetResponse?: CurrencyQuoteGetResponseResolvers<ContextType>
  CursorPaginationResponse?: CursorPaginationResponseResolvers<ContextType>
  Date?: GraphQLScalarType
  DatetimeRange?: DatetimeRangeResolvers<ContextType>
  DeleteUserResponse?: DeleteUserResponseResolvers<ContextType>
  Entry?: EntryResolvers<ContextType>
  EntryPublishedSubscriptionResponse?: EntryPublishedSubscriptionResponseResolvers<ContextType>
  ExternalAccount?: ExternalAccountResolvers<ContextType>
  Funder?: FunderResolvers<ContextType>
  FunderReward?: FunderRewardResolvers<ContextType>
  FunderRewardGraphSum?: FunderRewardGraphSumResolvers<ContextType>
  FundingCancelResponse?: FundingCancelResponseResolvers<ContextType>
  FundingConfirmResponse?: FundingConfirmResponseResolvers<ContextType>
  FundingMutationResponse?: FundingMutationResponseResolvers<ContextType>
  FundingPendingResponse?: FundingPendingResponseResolvers<ContextType>
  FundingQueryResponse?: FundingQueryResponseResolvers<ContextType>
  FundingTx?: FundingTxResolvers<ContextType>
  FundingTxAmountGraph?: FundingTxAmountGraphResolvers<ContextType>
  FundingTxMethodCount?: FundingTxMethodCountResolvers<ContextType>
  FundingTxMethodSum?: FundingTxMethodSumResolvers<ContextType>
  FundingTxStatusUpdatedSubscriptionResponse?: FundingTxStatusUpdatedSubscriptionResponseResolvers<ContextType>
  FundingTxsGetResponse?: FundingTxsGetResponseResolvers<ContextType>
  FundinginvoiceCancel?: FundinginvoiceCancelResolvers<ContextType>
  Grant?: GrantResolvers<ContextType>
  GrantApplicant?: GrantApplicantResolvers<ContextType>
  GrantApplicantFunding?: GrantApplicantFundingResolvers<ContextType>
  GrantBoardMember?: GrantBoardMemberResolvers<ContextType>
  GrantStatistics?: GrantStatisticsResolvers<ContextType>
  GrantStatisticsApplicant?: GrantStatisticsApplicantResolvers<ContextType>
  GrantStatisticsGrant?: GrantStatisticsGrantResolvers<ContextType>
  GrantStatus?: GrantStatusResolvers<ContextType>
  GraphSumData?: GraphSumDataResolvers<ContextType>
  LightningAddressConnectionDetails?: LightningAddressConnectionDetailsResolvers<ContextType>
  LightningAddressVerifyResponse?: LightningAddressVerifyResponseResolvers<ContextType>
  LndConnectionDetails?: LndConnectionDetailsResolvers<ContextType>
  LndConnectionDetailsPrivate?: LndConnectionDetailsPrivateResolvers<ContextType>
  LndConnectionDetailsPublic?: LndConnectionDetailsPublicResolvers<ContextType>
  Location?: LocationResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  MutationResponse?: MutationResponseResolvers<ContextType>
  NostrKeys?: NostrKeysResolvers<ContextType>
  NostrPrivateKey?: NostrPrivateKeyResolvers<ContextType>
  NostrPublicKey?: NostrPublicKeyResolvers<ContextType>
  OTPResponse?: OtpResponseResolvers<ContextType>
  Order?: OrderResolvers<ContextType>
  OrderItem?: OrderItemResolvers<ContextType>
  OrdersGetResponse?: OrdersGetResponseResolvers<ContextType>
  Owner?: OwnerResolvers<ContextType>
  OwnerOf?: OwnerOfResolvers<ContextType>
  PageViewCountGraph?: PageViewCountGraphResolvers<ContextType>
  PaginationCursor?: PaginationCursorResolvers<ContextType>
  Project?: ProjectResolvers<ContextType>
  ProjectActivatedSubscriptionResponse?: ProjectActivatedSubscriptionResponseResolvers<ContextType>
  ProjectCountriesGetResult?: ProjectCountriesGetResultResolvers<ContextType>
  ProjectDeleteResponse?: ProjectDeleteResponseResolvers<ContextType>
  ProjectFunderRewardStats?: ProjectFunderRewardStatsResolvers<ContextType>
  ProjectFunderStats?: ProjectFunderStatsResolvers<ContextType>
  ProjectFundingTxStats?: ProjectFundingTxStatsResolvers<ContextType>
  ProjectKeys?: ProjectKeysResolvers<ContextType>
  ProjectMilestone?: ProjectMilestoneResolvers<ContextType>
  ProjectRegionsGetResult?: ProjectRegionsGetResultResolvers<ContextType>
  ProjectReward?: ProjectRewardResolvers<ContextType>
  ProjectStatistics?: ProjectStatisticsResolvers<ContextType>
  ProjectStats?: ProjectStatsResolvers<ContextType>
  ProjectStatsBase?: ProjectStatsBaseResolvers<ContextType>
  ProjectViewBaseStats?: ProjectViewBaseStatsResolvers<ContextType>
  ProjectViewStats?: ProjectViewStatsResolvers<ContextType>
  ProjectsResponse?: ProjectsResponseResolvers<ContextType>
  ProjectsSummary?: ProjectsSummaryResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  SignedUploadUrl?: SignedUploadUrlResolvers<ContextType>
  SourceResource?: SourceResourceResolvers<ContextType>
  Sponsor?: SponsorResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Tag?: TagResolvers<ContextType>
  TagsGetResult?: TagsGetResultResolvers<ContextType>
  User?: UserResolvers<ContextType>
  UserBadge?: UserBadgeResolvers<ContextType>
  UserProjectContribution?: UserProjectContributionResolvers<ContextType>
  Wallet?: WalletResolvers<ContextType>
  WalletState?: WalletStateResolvers<ContextType>
  projectsMostFundedOfTheWeekGet?: ProjectsMostFundedOfTheWeekGetResolvers<ContextType>
}

export type EmailUpdateUserFragment = { __typename?: 'User'; email?: string | null; isEmailVerified: boolean; id: any }

export type OtpResponseFragment = { __typename?: 'OTPResponse'; otpVerificationToken: string; expiresAt: any }

export type EntryFragment = {
  __typename?: 'Entry'
  id: any
  title: string
  description: string
  image?: string | null
  status: EntryStatus
  content?: string | null
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
  fundersCount: number
  amountFunded: number
  type: EntryType
  creator: { __typename?: 'User' } & UserForAvatarFragment
  project?: { __typename?: 'Project'; id: any; title: string; name: string; image?: string | null } | null
}

export type EntryForLandingPageFragment = {
  __typename?: 'Entry'
  amountFunded: number
  id: any
  image?: string | null
  title: string
  entryFundersCount: number
  entryDescription: string
  project?: { __typename?: 'Project'; id: any; name: string; thumbnailImage?: string | null; title: string } | null
  creator: { __typename?: 'User' } & UserForAvatarFragment
}

export type EntryForProjectFragment = {
  __typename?: 'Entry'
  id: any
  title: string
  description: string
  image?: string | null
  type: EntryType
  fundersCount: number
  amountFunded: number
  status: EntryStatus
  createdAt: string
  publishedAt?: string | null
  creator: { __typename?: 'User' } & UserForAvatarFragment
}

export type FundingTxForLandingPageFragment = {
  __typename?: 'FundingTx'
  id: any
  comment?: string | null
  amount: number
  paidAt?: any | null
  onChain: boolean
  media?: string | null
  source: string
  method?: FundingMethod | null
  projectId: any
  funder: {
    __typename?: 'Funder'
    id: any
    amountFunded?: number | null
    timesFunded?: number | null
    confirmedAt?: any | null
    user?: {
      __typename?: 'User'
      id: any
      username: string
      imageUrl?: string | null
      externalAccounts: Array<{
        __typename?: 'ExternalAccount'
        externalUsername: string
        public: boolean
        accountType: string
      }>
    } | null
  }
  sourceResource?:
    | { __typename?: 'Entry'; createdAt: string; id: any; image?: string | null; title: string }
    | {
        __typename?: 'Project'
        id: any
        name: string
        title: string
        image?: string | null
        createdAt: string
        thumbnailImage?: string | null
      }
    | null
}

export type FundingTxWithInvoiceStatusFragment = {
  __typename?: 'FundingTx'
  id: any
  uuid?: string | null
  invoiceId?: string | null
  status: FundingStatus
  onChain: boolean
  invoiceStatus: InvoiceStatus
  paymentRequest?: string | null
  creatorEmail?: string | null
}

export type FundingTxFragment = {
  __typename?: 'FundingTx'
  id: any
  uuid?: string | null
  invoiceId?: string | null
  paymentRequest?: string | null
  amount: number
  status: FundingStatus
  invoiceStatus: InvoiceStatus
  comment?: string | null
  media?: string | null
  paidAt?: any | null
  onChain: boolean
  address?: string | null
  source: string
  method?: FundingMethod | null
  projectId: any
  creatorEmail?: string | null
  funder: {
    __typename?: 'Funder'
    id: any
    amountFunded?: number | null
    timesFunded?: number | null
    confirmedAt?: any | null
    user?: { __typename?: 'User'; id: any; username: string; imageUrl?: string | null } | null
  }
}

export type FundingTxForDownloadInvoiceFragment = {
  __typename?: 'FundingTx'
  id: any
  donationAmount: number
  amountPaid: number
  uuid?: string | null
  projectId: any
  paidAt?: any | null
  status: FundingStatus
  funder: { __typename?: 'Funder'; user?: { __typename?: 'User'; username: string } | null }
  order?: {
    __typename?: 'Order'
    totalInSats: number
    items: Array<{
      __typename?: 'OrderItem'
      quantity: number
      unitPriceInSats: number
      item: { __typename?: 'ProjectReward'; name: string }
    }>
  } | null
  bitcoinQuote?: { __typename?: 'BitcoinQuote'; quote: number; quoteCurrency: QuoteCurrency } | null
}

export type OrderItemFragment = {
  __typename?: 'OrderItem'
  quantity: number
  unitPriceInSats: number
  item: {
    __typename?: 'ProjectReward'
    id: any
    name: string
    cost: number
    rewardCurrency: RewardCurrency
    category?: string | null
  }
}

export type OrderFragment = {
  __typename?: 'Order'
  confirmedAt?: any | null
  createdAt: any
  deliveredAt?: any | null
  id: any
  shippedAt?: any | null
  status: string
  totalInSats: number
  updatedAt: any
  user?: { __typename?: 'User'; id: any; imageUrl?: string | null; username: string; email?: string | null } | null
  items: Array<{ __typename?: 'OrderItem' } & OrderItemFragment>
  fundingTx: {
    __typename?: 'FundingTx'
    id: any
    amount: number
    amountPaid: number
    donationAmount: number
    address?: string | null
    email?: string | null
    fundingType: FundingType
    invoiceStatus: InvoiceStatus
    isAnonymous: boolean
    status: FundingStatus
    uuid?: string | null
    bitcoinQuote?: { __typename?: 'BitcoinQuote'; quoteCurrency: QuoteCurrency; quote: number } | null
  }
}

export type FundingTxOrderFragment = {
  __typename?: 'FundingTx'
  id: any
  invoiceStatus: InvoiceStatus
  donationAmount: number
  amountPaid: number
  amount: number
  email?: string | null
  paidAt?: any | null
  status: FundingStatus
  invoiceId?: string | null
  uuid?: string | null
  bitcoinQuote?: { __typename?: 'BitcoinQuote'; quoteCurrency: QuoteCurrency; quote: number } | null
  funder: {
    __typename?: 'Funder'
    user?: {
      __typename?: 'User'
      id: any
      imageUrl?: string | null
      username: string
      externalAccounts: Array<{
        __typename?: 'ExternalAccount'
        id: any
        externalUsername: string
        externalId: string
        accountType: string
        public: boolean
      }>
    } | null
  }
  order?: {
    __typename?: 'Order'
    id: any
    referenceCode: string
    totalInSats: number
    items: Array<{ __typename?: 'OrderItem' } & OrderItemFragment>
  } | null
}

export type ProfileOrderItemFragment = {
  __typename?: 'OrderItem'
  quantity: number
  unitPriceInSats: number
  item: {
    __typename?: 'ProjectReward'
    id: any
    name: string
    cost: number
    rewardCurrency: RewardCurrency
    description?: string | null
    image?: string | null
    category?: string | null
  }
}

export type ProfileOrderFragment = {
  __typename?: 'Order'
  id: any
  referenceCode: string
  totalInSats: number
  status: string
  confirmedAt?: any | null
  updatedAt: any
  items: Array<{ __typename?: 'OrderItem' } & ProfileOrderItemFragment>
  fundingTx: {
    __typename?: 'FundingTx'
    id: any
    amountPaid: number
    amount: number
    status: FundingStatus
    onChain: boolean
    bitcoinQuote?: { __typename?: 'BitcoinQuote'; quote: number; quoteCurrency: QuoteCurrency } | null
    sourceResource?: { __typename?: 'Entry' } | ({ __typename?: 'Project' } & ProjectAvatarFragment) | null
  }
}

export type PaginationFragment = {
  __typename?: 'CursorPaginationResponse'
  take?: number | null
  count?: number | null
  cursor?: { __typename?: 'PaginationCursor'; id?: any | null } | null
}

export type ProjectNostrKeysFragment = {
  __typename?: 'Project'
  id: any
  name: string
  keys: {
    __typename?: 'ProjectKeys'
    nostrKeys: {
      __typename?: 'NostrKeys'
      privateKey?: { __typename?: 'NostrPrivateKey'; nsec: string } | null
      publicKey: { __typename?: 'NostrPublicKey'; npub: string }
    }
  }
}

export type ProjectForLandingPageFragment = {
  __typename?: 'Project'
  id: any
  name: string
  balance: number
  fundersCount?: number | null
  thumbnailImage?: string | null
  shortDescription?: string | null
  title: string
  owners: Array<{
    __typename?: 'Owner'
    id: any
    user: { __typename?: 'User'; id: any; username: string; imageUrl?: string | null }
  }>
}

export type ProjectForProfilePageFragment = {
  __typename?: 'Project'
  id: any
  name: string
  balance: number
  fundersCount?: number | null
  thumbnailImage?: string | null
  title: string
  shortDescription?: string | null
  createdAt: string
  status?: ProjectStatus | null
  wallets: Array<{
    __typename?: 'Wallet'
    id: any
    name?: string | null
    state: { __typename?: 'WalletState'; status: WalletStatus; statusCode: WalletStatusCode }
  }>
}

export type ProjectRewardForLandingPageFragment = {
  __typename?: 'ProjectReward'
  cost: number
  description?: string | null
  id: any
  image?: string | null
  sold: number
  stock?: number | null
  maxClaimable?: number | null
  rewardName: string
  rewardProject: {
    __typename?: 'Project'
    id: any
    name: string
    title: string
    rewardCurrency?: RewardCurrency | null
    owners: Array<{
      __typename?: 'Owner'
      id: any
      user: { __typename?: 'User'; id: any; username: string; imageUrl?: string | null }
    }>
  }
}

export type ProjectRewardForCreateUpdateFragment = {
  __typename?: 'ProjectReward'
  id: any
  name: string
  description?: string | null
  cost: number
  image?: string | null
  deleted: boolean
  stock?: number | null
  sold: number
  hasShipping: boolean
  maxClaimable?: number | null
  isAddon: boolean
  isHidden: boolean
  category?: string | null
  preOrder: boolean
  estimatedAvailabilityDate?: any | null
  estimatedDeliveryInWeeks?: number | null
}

export type ProjectFragment = {
  __typename?: 'Project'
  id: any
  title: string
  name: string
  type: ProjectType
  shortDescription?: string | null
  description?: string | null
  balance: number
  createdAt: string
  updatedAt: string
  image?: string | null
  thumbnailImage?: string | null
  links: Array<string>
  status?: ProjectStatus | null
  rewardCurrency?: RewardCurrency | null
  fundersCount?: number | null
  fundingTxsCount?: number | null
  location?: {
    __typename?: 'Location'
    region?: string | null
    country?: { __typename?: 'Country'; name: string; code: string } | null
  } | null
  tags: Array<{ __typename?: 'Tag'; id: number; label: string }>
  owners: Array<{ __typename?: 'Owner'; id: any; user: { __typename?: 'User' } & ProjectOwnerUserFragment }>
  rewards: Array<{ __typename?: 'ProjectReward' } & ProjectRewardForCreateUpdateFragment>
  ambassadors: Array<{
    __typename?: 'Ambassador'
    id: any
    confirmed: boolean
    user: { __typename?: 'User' } & UserForAvatarFragment
  }>
  sponsors: Array<{
    __typename?: 'Sponsor'
    id: any
    url?: string | null
    image?: string | null
    user?: ({ __typename?: 'User' } & UserForAvatarFragment) | null
  }>
  milestones: Array<{
    __typename?: 'ProjectMilestone'
    id: any
    name: string
    description?: string | null
    amount: number
    reached: boolean
  }>
  entries: Array<{ __typename?: 'Entry' } & EntryForProjectFragment>
  wallets: Array<{
    __typename?: 'Wallet'
    id: any
    name?: string | null
    state: { __typename?: 'WalletState'; status: WalletStatus; statusCode: WalletStatusCode }
    connectionDetails:
      | { __typename?: 'LightningAddressConnectionDetails'; lightningAddress: string }
      | {
          __typename?: 'LndConnectionDetailsPrivate'
          macaroon: string
          tlsCertificate?: string | null
          hostname: string
          grpcPort: number
          lndNodeType: LndNodeType
          pubkey?: string | null
        }
      | { __typename?: 'LndConnectionDetailsPublic'; pubkey?: string | null }
  }>
  followers: Array<{ __typename?: 'User'; id: any; username: string }>
  keys: {
    __typename?: 'ProjectKeys'
    nostrKeys: { __typename?: 'NostrKeys'; publicKey: { __typename?: 'NostrPublicKey'; npub: string } }
  }
}

export type ProjectForSubscriptionFragment = {
  __typename?: 'Project'
  id: any
  title: string
  name: string
  thumbnailImage?: string | null
  owners: Array<{ __typename?: 'Owner'; id: any; user: { __typename?: 'User' } & UserMeFragment }>
}

export type ProjectAvatarFragment = {
  __typename?: 'Project'
  id: any
  name: string
  thumbnailImage?: string | null
  title: string
}

export type ProjectStatsForInsightsPageFragment = {
  __typename?: 'ProjectStats'
  current?: {
    __typename?: 'ProjectStatsBase'
    projectViews?: {
      __typename?: 'ProjectViewStats'
      viewCount: number
      visitorCount: number
      referrers: Array<{ __typename?: 'ProjectViewBaseStats'; value: string; viewCount: number; visitorCount: number }>
      regions: Array<{ __typename?: 'ProjectViewBaseStats'; value: string; viewCount: number; visitorCount: number }>
    } | null
    projectFunderRewards?: { __typename?: 'ProjectFunderRewardStats'; quantitySum: number } | null
    projectFunders?: { __typename?: 'ProjectFunderStats'; count: number } | null
    projectFundingTxs?: { __typename?: 'ProjectFundingTxStats'; amountSum?: number | null; count: number } | null
  } | null
  prevTimeRange?: {
    __typename?: 'ProjectStatsBase'
    projectViews?: { __typename?: 'ProjectViewStats'; viewCount: number; visitorCount: number } | null
    projectFunderRewards?: { __typename?: 'ProjectFunderRewardStats'; quantitySum: number } | null
    projectFunders?: { __typename?: 'ProjectFunderStats'; count: number } | null
    projectFundingTxs?: { __typename?: 'ProjectFundingTxStats'; amountSum?: number | null; count: number } | null
  } | null
}

export type ProjectHistoryStatsFragment = {
  __typename?: 'ProjectStats'
  current?: {
    __typename?: 'ProjectStatsBase'
    projectFundingTxs?: {
      __typename?: 'ProjectFundingTxStats'
      amountGraph?: Array<{ __typename?: 'FundingTxAmountGraph'; dateTime: any; sum: number } | null> | null
    } | null
    projectViews?: {
      __typename?: 'ProjectViewStats'
      visitorGraph: Array<{
        __typename?: 'PageViewCountGraph'
        viewCount: number
        visitorCount: number
        dateTime: any
      } | null>
    } | null
  } | null
}

export type ProjectRewardSoldGraphStatsFragment = {
  __typename?: 'ProjectStats'
  current?: {
    __typename?: 'ProjectStatsBase'
    projectFunderRewards?: {
      __typename?: 'ProjectFunderRewardStats'
      quantityGraph?: Array<{
        __typename?: 'FunderRewardGraphSum'
        dateTime: any
        rewardId: any
        rewardName: string
        sum: number
      } | null> | null
    } | null
  } | null
}

export type ProjectFundingMethodStatsFragment = {
  __typename?: 'ProjectStats'
  current?: {
    __typename?: 'ProjectStatsBase'
    projectFundingTxs?: {
      __typename?: 'ProjectFundingTxStats'
      methodSum?: Array<{ __typename?: 'FundingTxMethodSum'; sum: number; method?: string | null } | null> | null
    } | null
  } | null
}

export type ExternalAccountFragment = {
  __typename?: 'ExternalAccount'
  id: any
  accountType: string
  externalUsername: string
  externalId: string
  public: boolean
}

export type ProjectOwnerUserFragment = {
  __typename?: 'User'
  id: any
  username: string
  imageUrl?: string | null
  email?: string | null
  ranking?: any | null
  isEmailVerified: boolean
  externalAccounts: Array<{ __typename?: 'ExternalAccount' } & ExternalAccountFragment>
}

export type UserMeFragment = {
  __typename?: 'User'
  id: any
  username: string
  imageUrl?: string | null
  email?: string | null
  ranking?: any | null
  isEmailVerified: boolean
  externalAccounts: Array<{ __typename?: 'ExternalAccount' } & ExternalAccountFragment>
  ownerOf: Array<{
    __typename?: 'OwnerOf'
    project?: {
      __typename?: 'Project'
      id: any
      name: string
      image?: string | null
      thumbnailImage?: string | null
      title: string
      status?: ProjectStatus | null
    } | null
  }>
}

export type UserForProfilePageFragment = {
  __typename?: 'User'
  id: any
  bio?: string | null
  username: string
  imageUrl?: string | null
  ranking?: any | null
  isEmailVerified: boolean
  externalAccounts: Array<{ __typename?: 'ExternalAccount' } & ExternalAccountFragment>
}

export type UserForAvatarFragment = {
  __typename?: 'User'
  id: any
  imageUrl?: string | null
  email?: string | null
  username: string
}

export type FunderWithUserFragment = {
  __typename?: 'Funder'
  amountFunded?: number | null
  confirmed: boolean
  id: any
  confirmedAt?: any | null
  timesFunded?: number | null
  user?: {
    __typename?: 'User'
    id: any
    username: string
    imageUrl?: string | null
    externalAccounts: Array<{
      __typename?: 'ExternalAccount'
      externalId: string
      externalUsername: string
      id: any
      accountType: string
    }>
  } | null
}

export type UserProjectContributionsFragment = {
  __typename?: 'UserProjectContribution'
  project: { __typename?: 'Project' } & ProjectAvatarFragment
  funder?: {
    __typename?: 'Funder'
    amountFunded?: number | null
    confirmedAt?: any | null
    confirmed: boolean
    id: any
    fundingTxs: Array<{
      __typename?: 'FundingTx'
      amountPaid: number
      comment?: string | null
      media?: string | null
      paidAt?: any | null
      onChain: boolean
    }>
  } | null
}

export type UserBadgeAwardMutationVariables = Exact<{
  userBadgeId: Scalars['BigInt']
}>

export type UserBadgeAwardMutation = {
  __typename?: 'Mutation'
  userBadgeAward: { __typename?: 'UserBadge'; badgeAwardEventId?: string | null }
}

export type SendOtpByEmailMutationVariables = Exact<{
  input: SendOtpByEmailInput
}>

export type SendOtpByEmailMutation = {
  __typename?: 'Mutation'
  sendOTPByEmail: { __typename?: 'OTPResponse' } & OtpResponseFragment
}

export type UserEmailUpdateMutationVariables = Exact<{
  input: UserEmailUpdateInput
}>

export type UserEmailUpdateMutation = {
  __typename?: 'Mutation'
  userEmailUpdate: { __typename?: 'User' } & EmailUpdateUserFragment
}

export type UserEmailVerifyMutationVariables = Exact<{
  input: EmailVerifyInput
}>

export type UserEmailVerifyMutation = { __typename?: 'Mutation'; userEmailVerify: boolean }

export type CreateEntryMutationVariables = Exact<{
  input: CreateEntryInput
}>

export type CreateEntryMutation = {
  __typename?: 'Mutation'
  createEntry: {
    __typename?: 'Entry'
    id: any
    status: EntryStatus
    createdAt: string
    type: EntryType
    title: string
    description: string
    image?: string | null
    content?: string | null
    publishedAt?: string | null
    project?: { __typename?: 'Project'; id: any; title: string; name: string } | null
  }
}

export type UpdateEntryMutationVariables = Exact<{
  input: UpdateEntryInput
}>

export type UpdateEntryMutation = {
  __typename?: 'Mutation'
  updateEntry: {
    __typename?: 'Entry'
    id: any
    status: EntryStatus
    createdAt: string
    type: EntryType
    title: string
    description: string
    image?: string | null
    content?: string | null
    publishedAt?: string | null
    project?: { __typename?: 'Project'; id: any; title: string; name: string } | null
  }
}

export type PublishEntryMutationVariables = Exact<{
  id: Scalars['BigInt']
}>

export type PublishEntryMutation = {
  __typename?: 'Mutation'
  publishEntry: {
    __typename?: 'Entry'
    id: any
    status: EntryStatus
    createdAt: string
    type: EntryType
    title: string
    description: string
    image?: string | null
    content?: string | null
    publishedAt?: string | null
    project?: { __typename?: 'Project'; id: any; title: string; name: string } | null
  }
}

export type DeleteEntryMutationVariables = Exact<{
  deleteEntryId: Scalars['BigInt']
}>

export type DeleteEntryMutation = {
  __typename?: 'Mutation'
  deleteEntry: { __typename?: 'Entry'; id: any; title: string }
}

export type FundMutationVariables = Exact<{
  input: FundingInput
}>

export type FundMutation = {
  __typename?: 'Mutation'
  fund: {
    __typename?: 'FundingMutationResponse'
    fundingTx?: ({ __typename?: 'FundingTx' } & FundingTxFragment) | null
  }
}

export type RefreshFundingInvoiceMutationVariables = Exact<{
  fundingTxID: Scalars['BigInt']
}>

export type RefreshFundingInvoiceMutation = {
  __typename?: 'Mutation'
  fundingInvoiceRefresh: { __typename?: 'FundingTx' } & FundingTxWithInvoiceStatusFragment
}

export type FundingInvoiceCancelMutationVariables = Exact<{
  invoiceId: Scalars['String']
}>

export type FundingInvoiceCancelMutation = {
  __typename?: 'Mutation'
  fundingInvoiceCancel: { __typename?: 'FundinginvoiceCancel'; id: any; success: boolean }
}

export type GrantApplyMutationVariables = Exact<{
  input?: InputMaybe<GrantApplyInput>
}>

export type GrantApplyMutation = {
  __typename?: 'Mutation'
  grantApply: { __typename?: 'GrantApplicant'; status: GrantApplicantStatus }
}

export type OrderStatusUpdateMutationVariables = Exact<{
  input: OrderStatusUpdateInput
}>

export type OrderStatusUpdateMutation = {
  __typename?: 'Mutation'
  orderStatusUpdate?: {
    __typename?: 'Order'
    status: string
    id: any
    shippedAt?: any | null
    deliveredAt?: any | null
  } | null
}

export type FundingConfirmMutationVariables = Exact<{
  input: FundingConfirmInput
}>

export type FundingConfirmMutation = {
  __typename?: 'Mutation'
  fundingConfirm: { __typename?: 'FundingConfirmResponse'; id: any; success: boolean }
}

export type ProjectPublishMutationVariables = Exact<{
  input: ProjectPublishMutationInput
}>

export type ProjectPublishMutation = { __typename?: 'Mutation'; projectPublish: { __typename?: 'Project'; id: any } }

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput
}>

export type CreateProjectMutation = {
  __typename?: 'Mutation'
  createProject: {
    __typename?: 'Project'
    id: any
    title: string
    name: string
    description?: string | null
    status?: ProjectStatus | null
    type: ProjectType
    image?: string | null
    owners: Array<{
      __typename?: 'Owner'
      id: any
      user: {
        __typename?: 'User'
        id: any
        ownerOf: Array<{
          __typename?: 'OwnerOf'
          owner?: { __typename?: 'Owner'; id: any } | null
          project?: { __typename?: 'Project'; id: any } | null
        }>
      }
    }>
  }
}

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput
}>

export type UpdateProjectMutation = {
  __typename?: 'Mutation'
  updateProject: {
    __typename?: 'Project'
    id: any
    title: string
    name: string
    shortDescription?: string | null
    description?: string | null
    image?: string | null
    thumbnailImage?: string | null
    status?: ProjectStatus | null
    links: Array<string>
    location?: {
      __typename?: 'Location'
      region?: string | null
      country?: { __typename?: 'Country'; name: string; code: string } | null
    } | null
  }
}

export type ProjectRewardCurrencyUpdateMutationVariables = Exact<{
  input: ProjectRewardCurrencyUpdate
}>

export type ProjectRewardCurrencyUpdateMutation = {
  __typename?: 'Mutation'
  projectRewardCurrencyUpdate: Array<{ __typename?: 'ProjectReward' } & ProjectRewardForCreateUpdateFragment>
}

export type ProjectRewardCreateMutationVariables = Exact<{
  input: CreateProjectRewardInput
}>

export type ProjectRewardCreateMutation = {
  __typename?: 'Mutation'
  projectRewardCreate: { __typename?: 'ProjectReward' } & ProjectRewardForCreateUpdateFragment
}

export type ProjectRewardUpdateMutationVariables = Exact<{
  input: UpdateProjectRewardInput
}>

export type ProjectRewardUpdateMutation = {
  __typename?: 'Mutation'
  projectRewardUpdate: { __typename?: 'ProjectReward' } & ProjectRewardForCreateUpdateFragment
}

export type ProjectRewardDeleteMutationVariables = Exact<{
  input: DeleteProjectRewardInput
}>

export type ProjectRewardDeleteMutation = { __typename?: 'Mutation'; projectRewardDelete: boolean }

export type CreateProjectMilestoneMutationVariables = Exact<{
  input?: InputMaybe<CreateProjectMilestoneInput>
}>

export type CreateProjectMilestoneMutation = {
  __typename?: 'Mutation'
  createProjectMilestone: {
    __typename?: 'ProjectMilestone'
    id: any
    name: string
    description?: string | null
    amount: number
  }
}

export type UpdateProjectMilestoneMutationVariables = Exact<{
  input?: InputMaybe<UpdateProjectMilestoneInput>
}>

export type UpdateProjectMilestoneMutation = {
  __typename?: 'Mutation'
  updateProjectMilestone: {
    __typename?: 'ProjectMilestone'
    id: any
    name: string
    description?: string | null
    amount: number
  }
}

export type DeleteProjectMilestoneMutationVariables = Exact<{
  projectMilestoneId: Scalars['BigInt']
}>

export type DeleteProjectMilestoneMutation = { __typename?: 'Mutation'; deleteProjectMilestone: boolean }

export type ProjectFollowMutationVariables = Exact<{
  input: ProjectFollowMutationInput
}>

export type ProjectFollowMutation = { __typename?: 'Mutation'; projectFollow: boolean }

export type ProjectUnfollowMutationVariables = Exact<{
  input: ProjectFollowMutationInput
}>

export type ProjectUnfollowMutation = { __typename?: 'Mutation'; projectUnfollow: boolean }

export type ProjectDeleteMutationVariables = Exact<{
  input: DeleteProjectInput
}>

export type ProjectDeleteMutation = {
  __typename?: 'Mutation'
  projectDelete: { __typename?: 'ProjectDeleteResponse'; message?: string | null; success: boolean }
}

export type ProjectTagAddMutationVariables = Exact<{
  input: ProjectTagMutationInput
}>

export type ProjectTagAddMutation = {
  __typename?: 'Mutation'
  projectTagAdd: Array<{ __typename?: 'Tag'; id: number; label: string }>
}

export type ProjectTagRemoveMutationVariables = Exact<{
  input: ProjectTagMutationInput
}>

export type ProjectTagRemoveMutation = {
  __typename?: 'Mutation'
  projectTagRemove: Array<{ __typename?: 'Tag'; id: number; label: string }>
}

export type ProjectTagCreateMutationVariables = Exact<{
  input: TagCreateInput
}>

export type ProjectTagCreateMutation = {
  __typename?: 'Mutation'
  tagCreate: { __typename?: 'Tag'; id: number; label: string }
}

export type UnlinkExternalAccountMutationVariables = Exact<{
  id: Scalars['BigInt']
}>

export type UnlinkExternalAccountMutation = {
  __typename?: 'Mutation'
  unlinkExternalAccount: {
    __typename?: 'User'
    id: any
    username: string
    imageUrl?: string | null
    externalAccounts: Array<{
      __typename?: 'ExternalAccount'
      id: any
      accountType: string
      externalUsername: string
      externalId: string
      public: boolean
    }>
  }
}

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: {
    __typename: 'User'
    id: any
    bio?: string | null
    email?: string | null
    username: string
    imageUrl?: string | null
    wallet?: {
      __typename?: 'Wallet'
      connectionDetails:
        | { __typename?: 'LightningAddressConnectionDetails'; lightningAddress: string }
        | { __typename?: 'LndConnectionDetailsPrivate' }
        | { __typename?: 'LndConnectionDetailsPublic' }
    } | null
  }
}

export type UserDeleteMutationVariables = Exact<{ [key: string]: never }>

export type UserDeleteMutation = {
  __typename?: 'Mutation'
  userDelete: { __typename?: 'DeleteUserResponse'; message?: string | null; success: boolean }
}

export type CreateWalletMutationVariables = Exact<{
  input: CreateWalletInput
}>

export type CreateWalletMutation = {
  __typename?: 'Mutation'
  createWallet: { __typename?: 'Wallet'; id: any; name?: string | null }
}

export type UpdateWalletMutationVariables = Exact<{
  input: UpdateWalletInput
}>

export type UpdateWalletMutation = {
  __typename?: 'Mutation'
  updateWallet: { __typename?: 'Wallet'; id: any; name?: string | null }
}

export type WalletDeleteMutationVariables = Exact<{
  walletId: Scalars['BigInt']
}>

export type WalletDeleteMutation = { __typename?: 'Mutation'; walletDelete: boolean }

export type ActivityForLandingPageFragment = {
  __typename?: 'Activity'
  id: string
  createdAt: any
  resource:
    | ({ __typename?: 'Entry' } & EntryForLandingPageFragment)
    | ({ __typename?: 'FundingTx' } & FundingTxForLandingPageFragment)
    | ({ __typename?: 'Project' } & ProjectForLandingPageFragment)
    | ({ __typename?: 'ProjectReward' } & ProjectRewardForLandingPageFragment)
}

export type ActivitiesForLandingPageQueryVariables = Exact<{
  input?: InputMaybe<GetActivitiesInput>
}>

export type ActivitiesForLandingPageQuery = {
  __typename?: 'Query'
  getActivities: Array<{ __typename?: 'Activity' } & ActivityForLandingPageFragment>
}

export type BadgesQueryVariables = Exact<{ [key: string]: never }>

export type BadgesQuery = {
  __typename?: 'Query'
  badges: Array<{
    __typename?: 'Badge'
    createdAt: any
    description: string
    id: string
    image: string
    name: string
    thumb: string
    uniqueName: string
  }>
}

export type UserBadgesQueryVariables = Exact<{
  input: BadgesGetInput
}>

export type UserBadgesQuery = {
  __typename?: 'Query'
  userBadges: Array<{
    __typename?: 'UserBadge'
    userId: any
    updatedAt: any
    status?: UserBadgeStatus | null
    id: any
    fundingTxId?: any | null
    createdAt: any
    badgeAwardEventId?: string | null
    badge: {
      __typename?: 'Badge'
      name: string
      thumb: string
      uniqueName: string
      image: string
      id: string
      description: string
      createdAt: any
    }
  }>
}

export type EntryQueryVariables = Exact<{
  id: Scalars['BigInt']
}>

export type EntryQuery = { __typename?: 'Query'; entry?: ({ __typename?: 'Entry' } & EntryFragment) | null }

export type EntryForLandingPageQueryVariables = Exact<{
  entryID: Scalars['BigInt']
}>

export type EntryForLandingPageQuery = {
  __typename?: 'Query'
  entry?: ({ __typename?: 'Entry' } & EntryForLandingPageFragment) | null
}

export type EntryWithOwnersQueryVariables = Exact<{
  id: Scalars['BigInt']
}>

export type EntryWithOwnersQuery = {
  __typename?: 'Query'
  entry?: {
    __typename?: 'Entry'
    id: any
    title: string
    description: string
    image?: string | null
    status: EntryStatus
    content?: string | null
    createdAt: string
    updatedAt: string
    publishedAt?: string | null
    fundersCount: number
    type: EntryType
    creator: { __typename?: 'User'; id: any; username: string; imageUrl?: string | null }
    project?: {
      __typename?: 'Project'
      id: any
      title: string
      name: string
      owners: Array<{ __typename?: 'Owner'; user: { __typename?: 'User'; id: any } }>
    } | null
  } | null
}

export type EntriesQueryVariables = Exact<{
  input: GetEntriesInput
}>

export type EntriesQuery = {
  __typename?: 'Query'
  getEntries: Array<{
    __typename?: 'Entry'
    id: any
    title: string
    description: string
    image?: string | null
    fundersCount: number
    amountFunded: number
    type: EntryType
    status: EntryStatus
    project?: { __typename?: 'Project'; title: string; name: string; image?: string | null } | null
  }>
}

export type SignedUploadUrlQueryVariables = Exact<{
  input: FileUploadInput
}>

export type SignedUploadUrlQuery = {
  __typename?: 'Query'
  getSignedUploadUrl: { __typename?: 'SignedUploadUrl'; uploadUrl: string; distributionUrl: string }
}

export type GetFundingTxQueryVariables = Exact<{
  id: Scalars['BigInt']
}>

export type GetFundingTxQuery = { __typename?: 'Query'; fundingTx: { __typename?: 'FundingTx' } & FundingTxFragment }

export type FundingTxForUserContributionFragment = {
  __typename?: 'FundingTx'
  id: any
  comment?: string | null
  amount: number
  paidAt?: any | null
  onChain: boolean
  media?: string | null
  source: string
  method?: FundingMethod | null
  projectId: any
  funder: {
    __typename?: 'Funder'
    id: any
    user?: {
      __typename?: 'User'
      id: any
      username: string
      imageUrl?: string | null
      externalAccounts: Array<{
        __typename?: 'ExternalAccount'
        id: any
        externalUsername: string
        public: boolean
        accountType: string
      }>
    } | null
  }
  sourceResource?:
    | { __typename?: 'Entry'; id: any; createdAt: string; image?: string | null }
    | {
        __typename?: 'Project'
        id: any
        createdAt: string
        name: string
        title: string
        thumbnailImage?: string | null
        image?: string | null
      }
    | null
}

export type FundingTxWithInvoiceStatusQueryVariables = Exact<{
  fundingTxID: Scalars['BigInt']
}>

export type FundingTxWithInvoiceStatusQuery = {
  __typename?: 'Query'
  fundingTx: { __typename?: 'FundingTx' } & FundingTxWithInvoiceStatusFragment
}

export type FundingTxsForLandingPageQueryVariables = Exact<{
  input?: InputMaybe<GetFundingTxsInput>
}>

export type FundingTxsForLandingPageQuery = {
  __typename?: 'Query'
  fundingTxsGet?: {
    __typename?: 'FundingTxsGetResponse'
    fundingTxs: Array<{ __typename?: 'FundingTx' } & FundingTxForLandingPageFragment>
  } | null
}

export type FundingTxForUserContributionQueryVariables = Exact<{
  fundingTxId: Scalars['BigInt']
}>

export type FundingTxForUserContributionQuery = {
  __typename?: 'Query'
  fundingTx: { __typename?: 'FundingTx' } & FundingTxForUserContributionFragment
}

export type FundingTxForDownloadInvoiceQueryVariables = Exact<{
  fundingTxId: Scalars['BigInt']
}>

export type FundingTxForDownloadInvoiceQuery = {
  __typename?: 'Query'
  fundingTx: { __typename?: 'FundingTx' } & FundingTxForDownloadInvoiceFragment
}

export type GrantsQueryVariables = Exact<{ [key: string]: never }>

export type GrantsQuery = {
  __typename?: 'Query'
  grants: Array<{
    __typename?: 'Grant'
    id: any
    title: string
    name: string
    shortDescription: string
    description?: string | null
    status: GrantStatusEnum
    image?: string | null
    balance: number
    statuses: Array<{ __typename?: 'GrantStatus'; status: GrantStatusEnum; endAt?: any | null; startAt: any }>
    applicants: Array<{
      __typename?: 'GrantApplicant'
      status: GrantApplicantStatus
      funding: {
        __typename?: 'GrantApplicantFunding'
        communityFunding: number
        grantAmount: number
        grantAmountDistributed: number
      }
    }>
    sponsors: Array<{
      __typename?: 'Sponsor'
      id: any
      name: string
      url?: string | null
      image?: string | null
      status: SponsorStatus
      createdAt: any
    }>
  }>
}

export type GrantQueryVariables = Exact<{
  input: GrantGetInput
}>

export type GrantQuery = {
  __typename?: 'Query'
  grant: {
    __typename?: 'Grant'
    id: any
    title: string
    name: string
    shortDescription: string
    description?: string | null
    balance: number
    status: GrantStatusEnum
    image?: string | null
    statuses: Array<{ __typename?: 'GrantStatus'; status: GrantStatusEnum; endAt?: any | null; startAt: any }>
    boardMembers: Array<{
      __typename?: 'GrantBoardMember'
      user: {
        __typename?: 'User'
        username: string
        imageUrl?: string | null
        id: any
        externalAccounts: Array<{
          __typename?: 'ExternalAccount'
          accountType: string
          externalId: string
          externalUsername: string
          id: any
          public: boolean
        }>
      }
    }>
    applicants: Array<{
      __typename?: 'GrantApplicant'
      status: GrantApplicantStatus
      project: {
        __typename?: 'Project'
        id: any
        name: string
        title: string
        thumbnailImage?: string | null
        shortDescription?: string | null
        description?: string | null
        funders: Array<{
          __typename?: 'Funder'
          id: any
          confirmedAt?: any | null
          user?: { __typename?: 'User'; id: any; username: string; imageUrl?: string | null } | null
        }>
      }
      funding: {
        __typename?: 'GrantApplicantFunding'
        communityFunding: number
        grantAmount: number
        grantAmountDistributed: number
      }
    }>
    sponsors: Array<{
      __typename?: 'Sponsor'
      id: any
      name: string
      url?: string | null
      image?: string | null
      status: SponsorStatus
      createdAt: any
    }>
  }
}

export type GrantStatisticsQueryVariables = Exact<{ [key: string]: never }>

export type GrantStatisticsQuery = {
  __typename?: 'Query'
  grantStatistics: {
    __typename?: 'GrantStatistics'
    grants?: { __typename?: 'GrantStatisticsGrant'; amountFunded: number; amountGranted: number; count: number } | null
    applicants?: { __typename?: 'GrantStatisticsApplicant'; countFunded: number } | null
  }
}

export type OrdersGetQueryVariables = Exact<{
  input: OrdersGetInput
}>

export type OrdersGetQuery = {
  __typename?: 'Query'
  ordersGet?: {
    __typename?: 'OrdersGetResponse'
    pagination?: ({ __typename?: 'CursorPaginationResponse' } & PaginationFragment) | null
    orders: Array<{ __typename?: 'Order' } & OrderFragment>
  } | null
}

export type FundingTxsOrderGetQueryVariables = Exact<{
  input?: InputMaybe<GetFundingTxsInput>
}>

export type FundingTxsOrderGetQuery = {
  __typename?: 'Query'
  fundingTxsGet?: {
    __typename?: 'FundingTxsGetResponse'
    pagination?: ({ __typename?: 'CursorPaginationResponse' } & PaginationFragment) | null
    fundingTxs: Array<{ __typename?: 'FundingTx' } & FundingTxOrderFragment>
  } | null
}

export type FundingTxsOrderCountGetQueryVariables = Exact<{
  input?: InputMaybe<GetFundingTxsInput>
}>

export type FundingTxsOrderCountGetQuery = {
  __typename?: 'Query'
  fundingTxsGet?: {
    __typename?: 'FundingTxsGetResponse'
    pagination?: ({ __typename?: 'CursorPaginationResponse' } & PaginationFragment) | null
  } | null
}

export type ProjectByNameOrIdQueryVariables = Exact<{
  where: UniqueProjectQueryInput
  input?: InputMaybe<ProjectEntriesGetInput>
}>

export type ProjectByNameOrIdQuery = {
  __typename?: 'Query'
  projectGet?: ({ __typename?: 'Project' } & ProjectFragment) | null
}

export type ProjectsForSubscriptionQueryVariables = Exact<{
  input: ProjectsGetQueryInput
}>

export type ProjectsForSubscriptionQuery = {
  __typename?: 'Query'
  projectsGet: {
    __typename?: 'ProjectsResponse'
    projects: Array<{ __typename?: 'Project' } & ProjectForSubscriptionFragment>
  }
}

export type ProjectsQueryVariables = Exact<{
  input?: InputMaybe<ProjectsGetQueryInput>
}>

export type ProjectsQuery = {
  __typename?: 'Query'
  projectsGet: {
    __typename?: 'ProjectsResponse'
    projects: Array<{
      __typename?: 'Project'
      id: any
      title: string
      name: string
      description?: string | null
      balance: number
      createdAt: string
      status?: ProjectStatus | null
      image?: string | null
    }>
  }
}

export type ProjectsFullQueryVariables = Exact<{
  input?: InputMaybe<ProjectsGetQueryInput>
}>

export type ProjectsFullQuery = {
  __typename?: 'Query'
  projectsGet: {
    __typename?: 'ProjectsResponse'
    projects: Array<{
      __typename?: 'Project'
      id: any
      title: string
      name: string
      type: ProjectType
      shortDescription?: string | null
      description?: string | null
      balance: number
      createdAt: string
      updatedAt: string
      thumbnailImage?: string | null
      image?: string | null
      status?: ProjectStatus | null
      owners: Array<{
        __typename?: 'Owner'
        id: any
        user: { __typename?: 'User'; id: any; username: string; imageUrl?: string | null }
      }>
      funders: Array<{
        __typename?: 'Funder'
        id: any
        confirmed: boolean
        user?: { __typename?: 'User'; id: any; username: string; imageUrl?: string | null } | null
      }>
      wallets: Array<{
        __typename?: 'Wallet'
        state: { __typename?: 'WalletState'; status: WalletStatus; statusCode: WalletStatusCode }
      }>
    }>
  }
}

export type ProjectsSummaryQueryVariables = Exact<{ [key: string]: never }>

export type ProjectsSummaryQuery = {
  __typename?: 'Query'
  projectsSummary: {
    __typename?: 'ProjectsSummary'
    fundedTotal?: any | null
    fundersCount?: number | null
    projectsCount?: number | null
  }
}

export type ProjectUnplublishedEntriesQueryVariables = Exact<{
  where: UniqueProjectQueryInput
}>

export type ProjectUnplublishedEntriesQuery = {
  __typename?: 'Query'
  projectGet?: { __typename?: 'Project'; entries: Array<{ __typename?: 'Entry' } & EntryForProjectFragment> } | null
}

export type ProjectFundersQueryVariables = Exact<{
  input: GetFundersInput
}>

export type ProjectFundersQuery = {
  __typename?: 'Query'
  fundersGet: Array<{ __typename?: 'Funder' } & FunderWithUserFragment>
}

export type ProjectDashboardFundersQueryVariables = Exact<{
  input?: InputMaybe<GetFundersInput>
}>

export type ProjectDashboardFundersQuery = {
  __typename?: 'Query'
  getDashboardFunders: Array<{
    __typename?: 'Funder'
    id: any
    amountFunded?: number | null
    confirmed: boolean
    confirmedAt?: any | null
    timesFunded?: number | null
    user?: { __typename?: 'User'; id: any; username: string; imageUrl?: string | null } | null
    fundingTxs: Array<{ __typename?: 'FundingTx'; email?: string | null; amount: number; uuid?: string | null }>
    rewards: Array<{
      __typename?: 'FunderReward'
      quantity: number
      projectReward: { __typename?: 'ProjectReward'; id: any; name: string }
    }>
  }>
}

export type ProjectsMostFundedOfTheWeekGetQueryVariables = Exact<{
  input?: InputMaybe<GetProjectsMostFundedOfTheWeekInput>
}>

export type ProjectsMostFundedOfTheWeekGetQuery = {
  __typename?: 'Query'
  projectsMostFundedOfTheWeekGet: Array<{
    __typename?: 'projectsMostFundedOfTheWeekGet'
    project: { __typename?: 'Project' } & ProjectForLandingPageFragment
  }>
}

export type ProjectsForLandingPageQueryVariables = Exact<{
  input?: InputMaybe<ProjectsGetQueryInput>
}>

export type ProjectsForLandingPageQuery = {
  __typename?: 'Query'
  projectsGet: {
    __typename?: 'ProjectsResponse'
    projects: Array<{ __typename?: 'Project' } & ProjectForLandingPageFragment>
  }
}

export type FeaturedProjectForLandingPageQueryVariables = Exact<{
  where: UniqueProjectQueryInput
}>

export type FeaturedProjectForLandingPageQuery = {
  __typename?: 'Query'
  projectGet?: ({ __typename?: 'Project' } & ProjectForLandingPageFragment) | null
}

export type ProjectNostrKeysQueryVariables = Exact<{
  where: UniqueProjectQueryInput
}>

export type ProjectNostrKeysQuery = {
  __typename?: 'Query'
  projectGet?: ({ __typename?: 'Project' } & ProjectNostrKeysFragment) | null
}

export type ProjectStatsGetInsightQueryVariables = Exact<{
  input: GetProjectStatsInput
}>

export type ProjectStatsGetInsightQuery = {
  __typename?: 'Query'
  projectStatsGet: { __typename?: 'ProjectStats' } & ProjectStatsForInsightsPageFragment
}

export type ProjectHistoryStatsGetQueryVariables = Exact<{
  input: GetProjectStatsInput
}>

export type ProjectHistoryStatsGetQuery = {
  __typename?: 'Query'
  projectStatsGet: { __typename?: 'ProjectStats' } & ProjectHistoryStatsFragment
}

export type ProjectRewardSoldGraphStatsGetQueryVariables = Exact<{
  input: GetProjectStatsInput
}>

export type ProjectRewardSoldGraphStatsGetQuery = {
  __typename?: 'Query'
  projectStatsGet: { __typename?: 'ProjectStats' } & ProjectRewardSoldGraphStatsFragment
}

export type ProjectFundingMethodStatsGetQueryVariables = Exact<{
  input: GetProjectStatsInput
}>

export type ProjectFundingMethodStatsGetQuery = {
  __typename?: 'Query'
  projectStatsGet: { __typename?: 'ProjectStats' } & ProjectFundingMethodStatsFragment
}

export type TagsGetQueryVariables = Exact<{ [key: string]: never }>

export type TagsGetQuery = {
  __typename?: 'Query'
  tagsGet: Array<{ __typename?: 'TagsGetResult'; label: string; id: number; count: number }>
}

export type ProjectCountriesGetQueryVariables = Exact<{ [key: string]: never }>

export type ProjectCountriesGetQuery = {
  __typename?: 'Query'
  projectCountriesGet: Array<{
    __typename?: 'ProjectCountriesGetResult'
    count: number
    country: { __typename?: 'Country'; code: string; name: string }
  }>
}

export type ProjectRegionsGetQueryVariables = Exact<{ [key: string]: never }>

export type ProjectRegionsGetQuery = {
  __typename?: 'Query'
  projectRegionsGet: Array<{ __typename?: 'ProjectRegionsGetResult'; count: number; region: string }>
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query'; me?: ({ __typename?: 'User' } & UserMeFragment) | null }

export type MeProjectFollowsQueryVariables = Exact<{ [key: string]: never }>

export type MeProjectFollowsQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    projectFollows: Array<{ __typename?: 'Project'; id: any; title: string; name: string }>
  } | null
}

export type UserForProfilePageQueryVariables = Exact<{
  where: UserGetInput
}>

export type UserForProfilePageQuery = {
  __typename?: 'Query'
  user: { __typename?: 'User' } & UserForProfilePageFragment
}

export type UserProfileProjectsQueryVariables = Exact<{
  where: UserGetInput
}>

export type UserProfileProjectsQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    ownerOf: Array<{
      __typename?: 'OwnerOf'
      project?: ({ __typename?: 'Project' } & ProjectForProfilePageFragment) | null
    }>
  }
}

export type UserFollowedProjectsQueryVariables = Exact<{
  where: UserGetInput
}>

export type UserFollowedProjectsQuery = {
  __typename?: 'Query'
  user: { __typename?: 'User'; projectFollows: Array<{ __typename?: 'Project' } & ProjectForProfilePageFragment> }
}

export type UserProfileContributionsQueryVariables = Exact<{
  where: UserGetInput
}>

export type UserProfileContributionsQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    contributions: Array<{ __typename?: 'UserProjectContribution' } & UserProjectContributionsFragment>
  }
}

export type UserProfileOrdersQueryVariables = Exact<{
  where: UserGetInput
}>

export type UserProfileOrdersQuery = {
  __typename?: 'Query'
  user: { __typename?: 'User'; orders?: Array<{ __typename?: 'Order' } & ProfileOrderFragment> | null }
}

export type LightningAddressVerifyQueryVariables = Exact<{
  lightningAddress?: InputMaybe<Scalars['String']>
}>

export type LightningAddressVerifyQuery = {
  __typename?: 'Query'
  lightningAddressVerify: { __typename?: 'LightningAddressVerifyResponse'; reason?: string | null; valid: boolean }
}

export type ActivityCreatedSubscriptionVariables = Exact<{
  input?: InputMaybe<ActivityCreatedSubscriptionInput>
}>

export type ActivityCreatedSubscription = {
  __typename?: 'Subscription'
  activityCreated:
    | ({ __typename?: 'Entry' } & EntryForLandingPageFragment)
    | ({ __typename?: 'FundingTx' } & FundingTxForLandingPageFragment)
    | ({ __typename?: 'Project' } & ProjectForLandingPageFragment)
    | ({ __typename?: 'ProjectReward' } & ProjectRewardForLandingPageFragment)
}

export type FundingTxStatusUpdatedSubscriptionVariables = Exact<{
  input?: InputMaybe<FundingTxStatusUpdatedInput>
}>

export type FundingTxStatusUpdatedSubscription = {
  __typename?: 'Subscription'
  fundingTxStatusUpdated: {
    __typename?: 'FundingTxStatusUpdatedSubscriptionResponse'
    fundingTx: { __typename?: 'FundingTx' } & FundingTxFragment
  }
}

export const EmailUpdateUserFragmentDoc = gql`
  fragment EmailUpdateUser on User {
    email
    isEmailVerified
    id
  }
`
export const OtpResponseFragmentDoc = gql`
  fragment OTPResponse on OTPResponse {
    otpVerificationToken
    expiresAt
  }
`
export const UserForAvatarFragmentDoc = gql`
  fragment UserForAvatar on User {
    id
    imageUrl
    email
    username
  }
`
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
  ${UserForAvatarFragmentDoc}
`
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
`
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
`
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
`
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
`
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
  ${OrderItemFragmentDoc}
`
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
  ${OrderItemFragmentDoc}
`
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
`
export const ProjectAvatarFragmentDoc = gql`
  fragment ProjectAvatar on Project {
    id
    name
    thumbnailImage
    title
  }
`
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
  ${ProjectAvatarFragmentDoc}
`
export const PaginationFragmentDoc = gql`
  fragment Pagination on CursorPaginationResponse {
    take
    cursor {
      id
    }
    count
  }
`
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
`
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
    wallets {
      id
      name
      state {
        status
        statusCode
      }
    }
  }
`
export const ExternalAccountFragmentDoc = gql`
  fragment ExternalAccount on ExternalAccount {
    id
    accountType
    externalUsername
    externalId
    public
  }
`
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
  }
  ${ExternalAccountFragmentDoc}
`
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
`
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
  ${UserForAvatarFragmentDoc}
`
export const ProjectFragmentDoc = gql`
  fragment Project on Project {
    id
    title
    name
    type
    shortDescription
    description
    balance
    createdAt
    updatedAt
    image
    thumbnailImage
    links
    status
    rewardCurrency
    fundersCount
    fundingTxsCount
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
    milestones {
      id
      name
      description
      amount
      reached
    }
    entries(input: $input) {
      ...EntryForProject
    }
    wallets {
      id
      name
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
  }
  ${ProjectOwnerUserFragmentDoc}
  ${ProjectRewardForCreateUpdateFragmentDoc}
  ${UserForAvatarFragmentDoc}
  ${EntryForProjectFragmentDoc}
`
export const UserMeFragmentDoc = gql`
  fragment UserMe on User {
    id
    username
    imageUrl
    email
    ranking
    isEmailVerified
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
      }
    }
  }
  ${ExternalAccountFragmentDoc}
`
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
  ${UserMeFragmentDoc}
`
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
`
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
`
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
`
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
`
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
  ${ExternalAccountFragmentDoc}
`
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
      externalAccounts {
        externalId
        externalUsername
        id
        accountType
      }
      imageUrl
    }
  }
`
export const UserProjectContributionsFragmentDoc = gql`
  fragment UserProjectContributions on UserProjectContribution {
    project {
      ...ProjectAvatar
    }
    funder {
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
  }
  ${ProjectAvatarFragmentDoc}
`
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
  ${UserForAvatarFragmentDoc}
`
export const ProjectForLandingPageFragmentDoc = gql`
  fragment ProjectForLandingPage on Project {
    id
    name
    balance
    fundersCount
    thumbnailImage
    shortDescription
    title
    owners {
      id
      user {
        id
        username
        imageUrl
      }
    }
  }
`
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
`
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
`
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
  ${ProjectRewardForLandingPageFragmentDoc}
`
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
`
export const UserBadgeAwardDocument = gql`
  mutation UserBadgeAward($userBadgeId: BigInt!) {
    userBadgeAward(userBadgeId: $userBadgeId) {
      badgeAwardEventId
    }
  }
`
export type UserBadgeAwardMutationFn = Apollo.MutationFunction<UserBadgeAwardMutation, UserBadgeAwardMutationVariables>

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
export function useUserBadgeAwardMutation(
  baseOptions?: Apollo.MutationHookOptions<UserBadgeAwardMutation, UserBadgeAwardMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UserBadgeAwardMutation, UserBadgeAwardMutationVariables>(UserBadgeAwardDocument, options)
}
export type UserBadgeAwardMutationHookResult = ReturnType<typeof useUserBadgeAwardMutation>
export type UserBadgeAwardMutationResult = Apollo.MutationResult<UserBadgeAwardMutation>
export type UserBadgeAwardMutationOptions = Apollo.BaseMutationOptions<
  UserBadgeAwardMutation,
  UserBadgeAwardMutationVariables
>
export const SendOtpByEmailDocument = gql`
  mutation SendOTPByEmail($input: SendOtpByEmailInput!) {
    sendOTPByEmail(input: $input) {
      ...OTPResponse
    }
  }
  ${OtpResponseFragmentDoc}
`
export type SendOtpByEmailMutationFn = Apollo.MutationFunction<SendOtpByEmailMutation, SendOtpByEmailMutationVariables>

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
export function useSendOtpByEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<SendOtpByEmailMutation, SendOtpByEmailMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SendOtpByEmailMutation, SendOtpByEmailMutationVariables>(SendOtpByEmailDocument, options)
}
export type SendOtpByEmailMutationHookResult = ReturnType<typeof useSendOtpByEmailMutation>
export type SendOtpByEmailMutationResult = Apollo.MutationResult<SendOtpByEmailMutation>
export type SendOtpByEmailMutationOptions = Apollo.BaseMutationOptions<
  SendOtpByEmailMutation,
  SendOtpByEmailMutationVariables
>
export const UserEmailUpdateDocument = gql`
  mutation UserEmailUpdate($input: UserEmailUpdateInput!) {
    userEmailUpdate(input: $input) {
      ...EmailUpdateUser
    }
  }
  ${EmailUpdateUserFragmentDoc}
`
export type UserEmailUpdateMutationFn = Apollo.MutationFunction<
  UserEmailUpdateMutation,
  UserEmailUpdateMutationVariables
>

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
export function useUserEmailUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<UserEmailUpdateMutation, UserEmailUpdateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UserEmailUpdateMutation, UserEmailUpdateMutationVariables>(UserEmailUpdateDocument, options)
}
export type UserEmailUpdateMutationHookResult = ReturnType<typeof useUserEmailUpdateMutation>
export type UserEmailUpdateMutationResult = Apollo.MutationResult<UserEmailUpdateMutation>
export type UserEmailUpdateMutationOptions = Apollo.BaseMutationOptions<
  UserEmailUpdateMutation,
  UserEmailUpdateMutationVariables
>
export const UserEmailVerifyDocument = gql`
  mutation UserEmailVerify($input: EmailVerifyInput!) {
    userEmailVerify(input: $input)
  }
`
export type UserEmailVerifyMutationFn = Apollo.MutationFunction<
  UserEmailVerifyMutation,
  UserEmailVerifyMutationVariables
>

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
export function useUserEmailVerifyMutation(
  baseOptions?: Apollo.MutationHookOptions<UserEmailVerifyMutation, UserEmailVerifyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UserEmailVerifyMutation, UserEmailVerifyMutationVariables>(UserEmailVerifyDocument, options)
}
export type UserEmailVerifyMutationHookResult = ReturnType<typeof useUserEmailVerifyMutation>
export type UserEmailVerifyMutationResult = Apollo.MutationResult<UserEmailVerifyMutation>
export type UserEmailVerifyMutationOptions = Apollo.BaseMutationOptions<
  UserEmailVerifyMutation,
  UserEmailVerifyMutationVariables
>
export const CreateEntryDocument = gql`
  mutation CreateEntry($input: CreateEntryInput!) {
    createEntry(input: $input) {
      id
      status
      createdAt
      type
      title
      description
      image
      content
      publishedAt
      project {
        id
        title
        name
      }
    }
  }
`
export type CreateEntryMutationFn = Apollo.MutationFunction<CreateEntryMutation, CreateEntryMutationVariables>

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
export function useCreateEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateEntryMutation, CreateEntryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(CreateEntryDocument, options)
}
export type CreateEntryMutationHookResult = ReturnType<typeof useCreateEntryMutation>
export type CreateEntryMutationResult = Apollo.MutationResult<CreateEntryMutation>
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables>
export const UpdateEntryDocument = gql`
  mutation UpdateEntry($input: UpdateEntryInput!) {
    updateEntry(input: $input) {
      id
      status
      createdAt
      type
      title
      description
      image
      content
      publishedAt
      project {
        id
        title
        name
      }
    }
  }
`
export type UpdateEntryMutationFn = Apollo.MutationFunction<UpdateEntryMutation, UpdateEntryMutationVariables>

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
export function useUpdateEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateEntryMutation, UpdateEntryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateEntryMutation, UpdateEntryMutationVariables>(UpdateEntryDocument, options)
}
export type UpdateEntryMutationHookResult = ReturnType<typeof useUpdateEntryMutation>
export type UpdateEntryMutationResult = Apollo.MutationResult<UpdateEntryMutation>
export type UpdateEntryMutationOptions = Apollo.BaseMutationOptions<UpdateEntryMutation, UpdateEntryMutationVariables>
export const PublishEntryDocument = gql`
  mutation PublishEntry($id: BigInt!) {
    publishEntry(id: $id) {
      id
      status
      createdAt
      type
      title
      description
      image
      content
      publishedAt
      project {
        id
        title
        name
      }
    }
  }
`
export type PublishEntryMutationFn = Apollo.MutationFunction<PublishEntryMutation, PublishEntryMutationVariables>

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
export function usePublishEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<PublishEntryMutation, PublishEntryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<PublishEntryMutation, PublishEntryMutationVariables>(PublishEntryDocument, options)
}
export type PublishEntryMutationHookResult = ReturnType<typeof usePublishEntryMutation>
export type PublishEntryMutationResult = Apollo.MutationResult<PublishEntryMutation>
export type PublishEntryMutationOptions = Apollo.BaseMutationOptions<
  PublishEntryMutation,
  PublishEntryMutationVariables
>
export const DeleteEntryDocument = gql`
  mutation DeleteEntry($deleteEntryId: BigInt!) {
    deleteEntry(id: $deleteEntryId) {
      id
      title
    }
  }
`
export type DeleteEntryMutationFn = Apollo.MutationFunction<DeleteEntryMutation, DeleteEntryMutationVariables>

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
export function useDeleteEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(DeleteEntryDocument, options)
}
export type DeleteEntryMutationHookResult = ReturnType<typeof useDeleteEntryMutation>
export type DeleteEntryMutationResult = Apollo.MutationResult<DeleteEntryMutation>
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<DeleteEntryMutation, DeleteEntryMutationVariables>
export const FundDocument = gql`
  mutation Fund($input: FundingInput!) {
    fund(input: $input) {
      fundingTx {
        ...FundingTx
      }
    }
  }
  ${FundingTxFragmentDoc}
`
export type FundMutationFn = Apollo.MutationFunction<FundMutation, FundMutationVariables>

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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<FundMutation, FundMutationVariables>(FundDocument, options)
}
export type FundMutationHookResult = ReturnType<typeof useFundMutation>
export type FundMutationResult = Apollo.MutationResult<FundMutation>
export type FundMutationOptions = Apollo.BaseMutationOptions<FundMutation, FundMutationVariables>
export const RefreshFundingInvoiceDocument = gql`
  mutation RefreshFundingInvoice($fundingTxID: BigInt!) {
    fundingInvoiceRefresh(fundingTxId: $fundingTxID) {
      ...FundingTxWithInvoiceStatus
    }
  }
  ${FundingTxWithInvoiceStatusFragmentDoc}
`
export type RefreshFundingInvoiceMutationFn = Apollo.MutationFunction<
  RefreshFundingInvoiceMutation,
  RefreshFundingInvoiceMutationVariables
>

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
export function useRefreshFundingInvoiceMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshFundingInvoiceMutation, RefreshFundingInvoiceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RefreshFundingInvoiceMutation, RefreshFundingInvoiceMutationVariables>(
    RefreshFundingInvoiceDocument,
    options,
  )
}
export type RefreshFundingInvoiceMutationHookResult = ReturnType<typeof useRefreshFundingInvoiceMutation>
export type RefreshFundingInvoiceMutationResult = Apollo.MutationResult<RefreshFundingInvoiceMutation>
export type RefreshFundingInvoiceMutationOptions = Apollo.BaseMutationOptions<
  RefreshFundingInvoiceMutation,
  RefreshFundingInvoiceMutationVariables
>
export const FundingInvoiceCancelDocument = gql`
  mutation FundingInvoiceCancel($invoiceId: String!) {
    fundingInvoiceCancel(invoiceId: $invoiceId) {
      id
      success
    }
  }
`
export type FundingInvoiceCancelMutationFn = Apollo.MutationFunction<
  FundingInvoiceCancelMutation,
  FundingInvoiceCancelMutationVariables
>

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
export function useFundingInvoiceCancelMutation(
  baseOptions?: Apollo.MutationHookOptions<FundingInvoiceCancelMutation, FundingInvoiceCancelMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<FundingInvoiceCancelMutation, FundingInvoiceCancelMutationVariables>(
    FundingInvoiceCancelDocument,
    options,
  )
}
export type FundingInvoiceCancelMutationHookResult = ReturnType<typeof useFundingInvoiceCancelMutation>
export type FundingInvoiceCancelMutationResult = Apollo.MutationResult<FundingInvoiceCancelMutation>
export type FundingInvoiceCancelMutationOptions = Apollo.BaseMutationOptions<
  FundingInvoiceCancelMutation,
  FundingInvoiceCancelMutationVariables
>
export const GrantApplyDocument = gql`
  mutation GrantApply($input: GrantApplyInput) {
    grantApply(input: $input) {
      status
    }
  }
`
export type GrantApplyMutationFn = Apollo.MutationFunction<GrantApplyMutation, GrantApplyMutationVariables>

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
export function useGrantApplyMutation(
  baseOptions?: Apollo.MutationHookOptions<GrantApplyMutation, GrantApplyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<GrantApplyMutation, GrantApplyMutationVariables>(GrantApplyDocument, options)
}
export type GrantApplyMutationHookResult = ReturnType<typeof useGrantApplyMutation>
export type GrantApplyMutationResult = Apollo.MutationResult<GrantApplyMutation>
export type GrantApplyMutationOptions = Apollo.BaseMutationOptions<GrantApplyMutation, GrantApplyMutationVariables>
export const OrderStatusUpdateDocument = gql`
  mutation OrderStatusUpdate($input: OrderStatusUpdateInput!) {
    orderStatusUpdate(input: $input) {
      status
      id
      shippedAt
      deliveredAt
    }
  }
`
export type OrderStatusUpdateMutationFn = Apollo.MutationFunction<
  OrderStatusUpdateMutation,
  OrderStatusUpdateMutationVariables
>

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
export function useOrderStatusUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<OrderStatusUpdateMutation, OrderStatusUpdateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<OrderStatusUpdateMutation, OrderStatusUpdateMutationVariables>(
    OrderStatusUpdateDocument,
    options,
  )
}
export type OrderStatusUpdateMutationHookResult = ReturnType<typeof useOrderStatusUpdateMutation>
export type OrderStatusUpdateMutationResult = Apollo.MutationResult<OrderStatusUpdateMutation>
export type OrderStatusUpdateMutationOptions = Apollo.BaseMutationOptions<
  OrderStatusUpdateMutation,
  OrderStatusUpdateMutationVariables
>
export const FundingConfirmDocument = gql`
  mutation FundingConfirm($input: FundingConfirmInput!) {
    fundingConfirm(input: $input) {
      id
      success
    }
  }
`
export type FundingConfirmMutationFn = Apollo.MutationFunction<FundingConfirmMutation, FundingConfirmMutationVariables>

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
export function useFundingConfirmMutation(
  baseOptions?: Apollo.MutationHookOptions<FundingConfirmMutation, FundingConfirmMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<FundingConfirmMutation, FundingConfirmMutationVariables>(FundingConfirmDocument, options)
}
export type FundingConfirmMutationHookResult = ReturnType<typeof useFundingConfirmMutation>
export type FundingConfirmMutationResult = Apollo.MutationResult<FundingConfirmMutation>
export type FundingConfirmMutationOptions = Apollo.BaseMutationOptions<
  FundingConfirmMutation,
  FundingConfirmMutationVariables
>
export const ProjectPublishDocument = gql`
  mutation ProjectPublish($input: ProjectPublishMutationInput!) {
    projectPublish(input: $input) {
      id
    }
  }
`
export type ProjectPublishMutationFn = Apollo.MutationFunction<ProjectPublishMutation, ProjectPublishMutationVariables>

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
export function useProjectPublishMutation(
  baseOptions?: Apollo.MutationHookOptions<ProjectPublishMutation, ProjectPublishMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectPublishMutation, ProjectPublishMutationVariables>(ProjectPublishDocument, options)
}
export type ProjectPublishMutationHookResult = ReturnType<typeof useProjectPublishMutation>
export type ProjectPublishMutationResult = Apollo.MutationResult<ProjectPublishMutation>
export type ProjectPublishMutationOptions = Apollo.BaseMutationOptions<
  ProjectPublishMutation,
  ProjectPublishMutationVariables
>
export const CreateProjectDocument = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      title
      name
      description
      status
      type
      image
      owners {
        id
        user {
          id
          ownerOf {
            owner {
              id
            }
            project {
              id
            }
          }
        }
      }
    }
  }
`
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>

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
export function useCreateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options)
}
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectMutation,
  CreateProjectMutationVariables
>
export const UpdateProjectDocument = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
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
    }
  }
`
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>

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
export function useUpdateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options)
}
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>
export const ProjectRewardCurrencyUpdateDocument = gql`
  mutation ProjectRewardCurrencyUpdate($input: ProjectRewardCurrencyUpdate!) {
    projectRewardCurrencyUpdate(input: $input) {
      ...ProjectRewardForCreateUpdate
    }
  }
  ${ProjectRewardForCreateUpdateFragmentDoc}
`
export type ProjectRewardCurrencyUpdateMutationFn = Apollo.MutationFunction<
  ProjectRewardCurrencyUpdateMutation,
  ProjectRewardCurrencyUpdateMutationVariables
>

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
export function useProjectRewardCurrencyUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ProjectRewardCurrencyUpdateMutation,
    ProjectRewardCurrencyUpdateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectRewardCurrencyUpdateMutation, ProjectRewardCurrencyUpdateMutationVariables>(
    ProjectRewardCurrencyUpdateDocument,
    options,
  )
}
export type ProjectRewardCurrencyUpdateMutationHookResult = ReturnType<typeof useProjectRewardCurrencyUpdateMutation>
export type ProjectRewardCurrencyUpdateMutationResult = Apollo.MutationResult<ProjectRewardCurrencyUpdateMutation>
export type ProjectRewardCurrencyUpdateMutationOptions = Apollo.BaseMutationOptions<
  ProjectRewardCurrencyUpdateMutation,
  ProjectRewardCurrencyUpdateMutationVariables
>
export const ProjectRewardCreateDocument = gql`
  mutation ProjectRewardCreate($input: CreateProjectRewardInput!) {
    projectRewardCreate(input: $input) {
      ...ProjectRewardForCreateUpdate
    }
  }
  ${ProjectRewardForCreateUpdateFragmentDoc}
`
export type ProjectRewardCreateMutationFn = Apollo.MutationFunction<
  ProjectRewardCreateMutation,
  ProjectRewardCreateMutationVariables
>

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
export function useProjectRewardCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<ProjectRewardCreateMutation, ProjectRewardCreateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectRewardCreateMutation, ProjectRewardCreateMutationVariables>(
    ProjectRewardCreateDocument,
    options,
  )
}
export type ProjectRewardCreateMutationHookResult = ReturnType<typeof useProjectRewardCreateMutation>
export type ProjectRewardCreateMutationResult = Apollo.MutationResult<ProjectRewardCreateMutation>
export type ProjectRewardCreateMutationOptions = Apollo.BaseMutationOptions<
  ProjectRewardCreateMutation,
  ProjectRewardCreateMutationVariables
>
export const ProjectRewardUpdateDocument = gql`
  mutation ProjectRewardUpdate($input: UpdateProjectRewardInput!) {
    projectRewardUpdate(input: $input) {
      ...ProjectRewardForCreateUpdate
    }
  }
  ${ProjectRewardForCreateUpdateFragmentDoc}
`
export type ProjectRewardUpdateMutationFn = Apollo.MutationFunction<
  ProjectRewardUpdateMutation,
  ProjectRewardUpdateMutationVariables
>

/**
 * __useProjectRewardUpdateMutation__
 *
 * To run a mutation, you first call `useProjectRewardUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectRewardUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectRewardUpdateMutation, { data, loading, error }] = useProjectRewardUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectRewardUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<ProjectRewardUpdateMutation, ProjectRewardUpdateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectRewardUpdateMutation, ProjectRewardUpdateMutationVariables>(
    ProjectRewardUpdateDocument,
    options,
  )
}
export type ProjectRewardUpdateMutationHookResult = ReturnType<typeof useProjectRewardUpdateMutation>
export type ProjectRewardUpdateMutationResult = Apollo.MutationResult<ProjectRewardUpdateMutation>
export type ProjectRewardUpdateMutationOptions = Apollo.BaseMutationOptions<
  ProjectRewardUpdateMutation,
  ProjectRewardUpdateMutationVariables
>
export const ProjectRewardDeleteDocument = gql`
  mutation ProjectRewardDelete($input: DeleteProjectRewardInput!) {
    projectRewardDelete(input: $input)
  }
`
export type ProjectRewardDeleteMutationFn = Apollo.MutationFunction<
  ProjectRewardDeleteMutation,
  ProjectRewardDeleteMutationVariables
>

/**
 * __useProjectRewardDeleteMutation__
 *
 * To run a mutation, you first call `useProjectRewardDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectRewardDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectRewardDeleteMutation, { data, loading, error }] = useProjectRewardDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectRewardDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<ProjectRewardDeleteMutation, ProjectRewardDeleteMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectRewardDeleteMutation, ProjectRewardDeleteMutationVariables>(
    ProjectRewardDeleteDocument,
    options,
  )
}
export type ProjectRewardDeleteMutationHookResult = ReturnType<typeof useProjectRewardDeleteMutation>
export type ProjectRewardDeleteMutationResult = Apollo.MutationResult<ProjectRewardDeleteMutation>
export type ProjectRewardDeleteMutationOptions = Apollo.BaseMutationOptions<
  ProjectRewardDeleteMutation,
  ProjectRewardDeleteMutationVariables
>
export const CreateProjectMilestoneDocument = gql`
  mutation CreateProjectMilestone($input: CreateProjectMilestoneInput) {
    createProjectMilestone(input: $input) {
      id
      name
      description
      amount
    }
  }
`
export type CreateProjectMilestoneMutationFn = Apollo.MutationFunction<
  CreateProjectMilestoneMutation,
  CreateProjectMilestoneMutationVariables
>

/**
 * __useCreateProjectMilestoneMutation__
 *
 * To run a mutation, you first call `useCreateProjectMilestoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMilestoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMilestoneMutation, { data, loading, error }] = useCreateProjectMilestoneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMilestoneMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateProjectMilestoneMutation, CreateProjectMilestoneMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateProjectMilestoneMutation, CreateProjectMilestoneMutationVariables>(
    CreateProjectMilestoneDocument,
    options,
  )
}
export type CreateProjectMilestoneMutationHookResult = ReturnType<typeof useCreateProjectMilestoneMutation>
export type CreateProjectMilestoneMutationResult = Apollo.MutationResult<CreateProjectMilestoneMutation>
export type CreateProjectMilestoneMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectMilestoneMutation,
  CreateProjectMilestoneMutationVariables
>
export const UpdateProjectMilestoneDocument = gql`
  mutation UpdateProjectMilestone($input: UpdateProjectMilestoneInput) {
    updateProjectMilestone(input: $input) {
      id
      name
      description
      amount
    }
  }
`
export type UpdateProjectMilestoneMutationFn = Apollo.MutationFunction<
  UpdateProjectMilestoneMutation,
  UpdateProjectMilestoneMutationVariables
>

/**
 * __useUpdateProjectMilestoneMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMilestoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMilestoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMilestoneMutation, { data, loading, error }] = useUpdateProjectMilestoneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMilestoneMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProjectMilestoneMutation, UpdateProjectMilestoneMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateProjectMilestoneMutation, UpdateProjectMilestoneMutationVariables>(
    UpdateProjectMilestoneDocument,
    options,
  )
}
export type UpdateProjectMilestoneMutationHookResult = ReturnType<typeof useUpdateProjectMilestoneMutation>
export type UpdateProjectMilestoneMutationResult = Apollo.MutationResult<UpdateProjectMilestoneMutation>
export type UpdateProjectMilestoneMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectMilestoneMutation,
  UpdateProjectMilestoneMutationVariables
>
export const DeleteProjectMilestoneDocument = gql`
  mutation DeleteProjectMilestone($projectMilestoneId: BigInt!) {
    deleteProjectMilestone(projectMilestoneId: $projectMilestoneId)
  }
`
export type DeleteProjectMilestoneMutationFn = Apollo.MutationFunction<
  DeleteProjectMilestoneMutation,
  DeleteProjectMilestoneMutationVariables
>

/**
 * __useDeleteProjectMilestoneMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMilestoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMilestoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMilestoneMutation, { data, loading, error }] = useDeleteProjectMilestoneMutation({
 *   variables: {
 *      projectMilestoneId: // value for 'projectMilestoneId'
 *   },
 * });
 */
export function useDeleteProjectMilestoneMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteProjectMilestoneMutation, DeleteProjectMilestoneMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteProjectMilestoneMutation, DeleteProjectMilestoneMutationVariables>(
    DeleteProjectMilestoneDocument,
    options,
  )
}
export type DeleteProjectMilestoneMutationHookResult = ReturnType<typeof useDeleteProjectMilestoneMutation>
export type DeleteProjectMilestoneMutationResult = Apollo.MutationResult<DeleteProjectMilestoneMutation>
export type DeleteProjectMilestoneMutationOptions = Apollo.BaseMutationOptions<
  DeleteProjectMilestoneMutation,
  DeleteProjectMilestoneMutationVariables
>
export const ProjectFollowDocument = gql`
  mutation ProjectFollow($input: ProjectFollowMutationInput!) {
    projectFollow(input: $input)
  }
`
export type ProjectFollowMutationFn = Apollo.MutationFunction<ProjectFollowMutation, ProjectFollowMutationVariables>

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
export function useProjectFollowMutation(
  baseOptions?: Apollo.MutationHookOptions<ProjectFollowMutation, ProjectFollowMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectFollowMutation, ProjectFollowMutationVariables>(ProjectFollowDocument, options)
}
export type ProjectFollowMutationHookResult = ReturnType<typeof useProjectFollowMutation>
export type ProjectFollowMutationResult = Apollo.MutationResult<ProjectFollowMutation>
export type ProjectFollowMutationOptions = Apollo.BaseMutationOptions<
  ProjectFollowMutation,
  ProjectFollowMutationVariables
>
export const ProjectUnfollowDocument = gql`
  mutation ProjectUnfollow($input: ProjectFollowMutationInput!) {
    projectUnfollow(input: $input)
  }
`
export type ProjectUnfollowMutationFn = Apollo.MutationFunction<
  ProjectUnfollowMutation,
  ProjectUnfollowMutationVariables
>

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
export function useProjectUnfollowMutation(
  baseOptions?: Apollo.MutationHookOptions<ProjectUnfollowMutation, ProjectUnfollowMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectUnfollowMutation, ProjectUnfollowMutationVariables>(ProjectUnfollowDocument, options)
}
export type ProjectUnfollowMutationHookResult = ReturnType<typeof useProjectUnfollowMutation>
export type ProjectUnfollowMutationResult = Apollo.MutationResult<ProjectUnfollowMutation>
export type ProjectUnfollowMutationOptions = Apollo.BaseMutationOptions<
  ProjectUnfollowMutation,
  ProjectUnfollowMutationVariables
>
export const ProjectDeleteDocument = gql`
  mutation ProjectDelete($input: DeleteProjectInput!) {
    projectDelete(input: $input) {
      message
      success
    }
  }
`
export type ProjectDeleteMutationFn = Apollo.MutationFunction<ProjectDeleteMutation, ProjectDeleteMutationVariables>

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
export function useProjectDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<ProjectDeleteMutation, ProjectDeleteMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectDeleteMutation, ProjectDeleteMutationVariables>(ProjectDeleteDocument, options)
}
export type ProjectDeleteMutationHookResult = ReturnType<typeof useProjectDeleteMutation>
export type ProjectDeleteMutationResult = Apollo.MutationResult<ProjectDeleteMutation>
export type ProjectDeleteMutationOptions = Apollo.BaseMutationOptions<
  ProjectDeleteMutation,
  ProjectDeleteMutationVariables
>
export const ProjectTagAddDocument = gql`
  mutation ProjectTagAdd($input: ProjectTagMutationInput!) {
    projectTagAdd(input: $input) {
      id
      label
    }
  }
`
export type ProjectTagAddMutationFn = Apollo.MutationFunction<ProjectTagAddMutation, ProjectTagAddMutationVariables>

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
export function useProjectTagAddMutation(
  baseOptions?: Apollo.MutationHookOptions<ProjectTagAddMutation, ProjectTagAddMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectTagAddMutation, ProjectTagAddMutationVariables>(ProjectTagAddDocument, options)
}
export type ProjectTagAddMutationHookResult = ReturnType<typeof useProjectTagAddMutation>
export type ProjectTagAddMutationResult = Apollo.MutationResult<ProjectTagAddMutation>
export type ProjectTagAddMutationOptions = Apollo.BaseMutationOptions<
  ProjectTagAddMutation,
  ProjectTagAddMutationVariables
>
export const ProjectTagRemoveDocument = gql`
  mutation ProjectTagRemove($input: ProjectTagMutationInput!) {
    projectTagRemove(input: $input) {
      id
      label
    }
  }
`
export type ProjectTagRemoveMutationFn = Apollo.MutationFunction<
  ProjectTagRemoveMutation,
  ProjectTagRemoveMutationVariables
>

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
export function useProjectTagRemoveMutation(
  baseOptions?: Apollo.MutationHookOptions<ProjectTagRemoveMutation, ProjectTagRemoveMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectTagRemoveMutation, ProjectTagRemoveMutationVariables>(
    ProjectTagRemoveDocument,
    options,
  )
}
export type ProjectTagRemoveMutationHookResult = ReturnType<typeof useProjectTagRemoveMutation>
export type ProjectTagRemoveMutationResult = Apollo.MutationResult<ProjectTagRemoveMutation>
export type ProjectTagRemoveMutationOptions = Apollo.BaseMutationOptions<
  ProjectTagRemoveMutation,
  ProjectTagRemoveMutationVariables
>
export const ProjectTagCreateDocument = gql`
  mutation ProjectTagCreate($input: TagCreateInput!) {
    tagCreate(input: $input) {
      id
      label
    }
  }
`
export type ProjectTagCreateMutationFn = Apollo.MutationFunction<
  ProjectTagCreateMutation,
  ProjectTagCreateMutationVariables
>

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
export function useProjectTagCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<ProjectTagCreateMutation, ProjectTagCreateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ProjectTagCreateMutation, ProjectTagCreateMutationVariables>(
    ProjectTagCreateDocument,
    options,
  )
}
export type ProjectTagCreateMutationHookResult = ReturnType<typeof useProjectTagCreateMutation>
export type ProjectTagCreateMutationResult = Apollo.MutationResult<ProjectTagCreateMutation>
export type ProjectTagCreateMutationOptions = Apollo.BaseMutationOptions<
  ProjectTagCreateMutation,
  ProjectTagCreateMutationVariables
>
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
`
export type UnlinkExternalAccountMutationFn = Apollo.MutationFunction<
  UnlinkExternalAccountMutation,
  UnlinkExternalAccountMutationVariables
>

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
export function useUnlinkExternalAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<UnlinkExternalAccountMutation, UnlinkExternalAccountMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UnlinkExternalAccountMutation, UnlinkExternalAccountMutationVariables>(
    UnlinkExternalAccountDocument,
    options,
  )
}
export type UnlinkExternalAccountMutationHookResult = ReturnType<typeof useUnlinkExternalAccountMutation>
export type UnlinkExternalAccountMutationResult = Apollo.MutationResult<UnlinkExternalAccountMutation>
export type UnlinkExternalAccountMutationOptions = Apollo.BaseMutationOptions<
  UnlinkExternalAccountMutation,
  UnlinkExternalAccountMutationVariables
>
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
`
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>

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
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options)
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>
export const UserDeleteDocument = gql`
  mutation UserDelete {
    userDelete {
      message
      success
    }
  }
`
export type UserDeleteMutationFn = Apollo.MutationFunction<UserDeleteMutation, UserDeleteMutationVariables>

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
export function useUserDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<UserDeleteMutation, UserDeleteMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UserDeleteMutation, UserDeleteMutationVariables>(UserDeleteDocument, options)
}
export type UserDeleteMutationHookResult = ReturnType<typeof useUserDeleteMutation>
export type UserDeleteMutationResult = Apollo.MutationResult<UserDeleteMutation>
export type UserDeleteMutationOptions = Apollo.BaseMutationOptions<UserDeleteMutation, UserDeleteMutationVariables>
export const CreateWalletDocument = gql`
  mutation CreateWallet($input: CreateWalletInput!) {
    createWallet(input: $input) {
      id
      name
    }
  }
`
export type CreateWalletMutationFn = Apollo.MutationFunction<CreateWalletMutation, CreateWalletMutationVariables>

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
export function useCreateWalletMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateWalletMutation, CreateWalletMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateWalletMutation, CreateWalletMutationVariables>(CreateWalletDocument, options)
}
export type CreateWalletMutationHookResult = ReturnType<typeof useCreateWalletMutation>
export type CreateWalletMutationResult = Apollo.MutationResult<CreateWalletMutation>
export type CreateWalletMutationOptions = Apollo.BaseMutationOptions<
  CreateWalletMutation,
  CreateWalletMutationVariables
>
export const UpdateWalletDocument = gql`
  mutation UpdateWallet($input: UpdateWalletInput!) {
    updateWallet(input: $input) {
      id
      name
    }
  }
`
export type UpdateWalletMutationFn = Apollo.MutationFunction<UpdateWalletMutation, UpdateWalletMutationVariables>

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
export function useUpdateWalletMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateWalletMutation, UpdateWalletMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateWalletMutation, UpdateWalletMutationVariables>(UpdateWalletDocument, options)
}
export type UpdateWalletMutationHookResult = ReturnType<typeof useUpdateWalletMutation>
export type UpdateWalletMutationResult = Apollo.MutationResult<UpdateWalletMutation>
export type UpdateWalletMutationOptions = Apollo.BaseMutationOptions<
  UpdateWalletMutation,
  UpdateWalletMutationVariables
>
export const WalletDeleteDocument = gql`
  mutation WalletDelete($walletId: BigInt!) {
    walletDelete(id: $walletId)
  }
`
export type WalletDeleteMutationFn = Apollo.MutationFunction<WalletDeleteMutation, WalletDeleteMutationVariables>

/**
 * __useWalletDeleteMutation__
 *
 * To run a mutation, you first call `useWalletDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWalletDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [walletDeleteMutation, { data, loading, error }] = useWalletDeleteMutation({
 *   variables: {
 *      walletId: // value for 'walletId'
 *   },
 * });
 */
export function useWalletDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<WalletDeleteMutation, WalletDeleteMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<WalletDeleteMutation, WalletDeleteMutationVariables>(WalletDeleteDocument, options)
}
export type WalletDeleteMutationHookResult = ReturnType<typeof useWalletDeleteMutation>
export type WalletDeleteMutationResult = Apollo.MutationResult<WalletDeleteMutation>
export type WalletDeleteMutationOptions = Apollo.BaseMutationOptions<
  WalletDeleteMutation,
  WalletDeleteMutationVariables
>
export const ActivitiesForLandingPageDocument = gql`
  query ActivitiesForLandingPage($input: GetActivitiesInput) {
    getActivities(input: $input) {
      ...ActivityForLandingPage
    }
  }
  ${ActivityForLandingPageFragmentDoc}
`

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
export function useActivitiesForLandingPageQuery(
  baseOptions?: Apollo.QueryHookOptions<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>(
    ActivitiesForLandingPageDocument,
    options,
  )
}
export function useActivitiesForLandingPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ActivitiesForLandingPageQuery, ActivitiesForLandingPageQueryVariables>(
    ActivitiesForLandingPageDocument,
    options,
  )
}
export type ActivitiesForLandingPageQueryHookResult = ReturnType<typeof useActivitiesForLandingPageQuery>
export type ActivitiesForLandingPageLazyQueryHookResult = ReturnType<typeof useActivitiesForLandingPageLazyQuery>
export type ActivitiesForLandingPageQueryResult = Apollo.QueryResult<
  ActivitiesForLandingPageQuery,
  ActivitiesForLandingPageQueryVariables
>
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
`

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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<BadgesQuery, BadgesQueryVariables>(BadgesDocument, options)
}
export function useBadgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BadgesQuery, BadgesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<BadgesQuery, BadgesQueryVariables>(BadgesDocument, options)
}
export type BadgesQueryHookResult = ReturnType<typeof useBadgesQuery>
export type BadgesLazyQueryHookResult = ReturnType<typeof useBadgesLazyQuery>
export type BadgesQueryResult = Apollo.QueryResult<BadgesQuery, BadgesQueryVariables>
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
`

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
export function useUserBadgesQuery(baseOptions: Apollo.QueryHookOptions<UserBadgesQuery, UserBadgesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserBadgesQuery, UserBadgesQueryVariables>(UserBadgesDocument, options)
}
export function useUserBadgesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserBadgesQuery, UserBadgesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserBadgesQuery, UserBadgesQueryVariables>(UserBadgesDocument, options)
}
export type UserBadgesQueryHookResult = ReturnType<typeof useUserBadgesQuery>
export type UserBadgesLazyQueryHookResult = ReturnType<typeof useUserBadgesLazyQuery>
export type UserBadgesQueryResult = Apollo.QueryResult<UserBadgesQuery, UserBadgesQueryVariables>
export const EntryDocument = gql`
  query Entry($id: BigInt!) {
    entry(id: $id) {
      ...Entry
    }
  }
  ${EntryFragmentDoc}
`

/**
 * __useEntryQuery__
 *
 * To run a query within a React component, call `useEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntryQuery(baseOptions: Apollo.QueryHookOptions<EntryQuery, EntryQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options)
}
export function useEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntryQuery, EntryQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options)
}
export type EntryQueryHookResult = ReturnType<typeof useEntryQuery>
export type EntryLazyQueryHookResult = ReturnType<typeof useEntryLazyQuery>
export type EntryQueryResult = Apollo.QueryResult<EntryQuery, EntryQueryVariables>
export const EntryForLandingPageDocument = gql`
  query EntryForLandingPage($entryID: BigInt!) {
    entry(id: $entryID) {
      ...EntryForLandingPage
    }
  }
  ${EntryForLandingPageFragmentDoc}
`

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
export function useEntryForLandingPageQuery(
  baseOptions: Apollo.QueryHookOptions<EntryForLandingPageQuery, EntryForLandingPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EntryForLandingPageQuery, EntryForLandingPageQueryVariables>(
    EntryForLandingPageDocument,
    options,
  )
}
export function useEntryForLandingPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EntryForLandingPageQuery, EntryForLandingPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<EntryForLandingPageQuery, EntryForLandingPageQueryVariables>(
    EntryForLandingPageDocument,
    options,
  )
}
export type EntryForLandingPageQueryHookResult = ReturnType<typeof useEntryForLandingPageQuery>
export type EntryForLandingPageLazyQueryHookResult = ReturnType<typeof useEntryForLandingPageLazyQuery>
export type EntryForLandingPageQueryResult = Apollo.QueryResult<
  EntryForLandingPageQuery,
  EntryForLandingPageQueryVariables
>
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
`

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
export function useEntryWithOwnersQuery(
  baseOptions: Apollo.QueryHookOptions<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>(EntryWithOwnersDocument, options)
}
export function useEntryWithOwnersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>(EntryWithOwnersDocument, options)
}
export type EntryWithOwnersQueryHookResult = ReturnType<typeof useEntryWithOwnersQuery>
export type EntryWithOwnersLazyQueryHookResult = ReturnType<typeof useEntryWithOwnersLazyQuery>
export type EntryWithOwnersQueryResult = Apollo.QueryResult<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>
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
`

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
export function useEntriesQuery(baseOptions: Apollo.QueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options)
}
export function useEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options)
}
export type EntriesQueryHookResult = ReturnType<typeof useEntriesQuery>
export type EntriesLazyQueryHookResult = ReturnType<typeof useEntriesLazyQuery>
export type EntriesQueryResult = Apollo.QueryResult<EntriesQuery, EntriesQueryVariables>
export const SignedUploadUrlDocument = gql`
  query SignedUploadUrl($input: FileUploadInput!) {
    getSignedUploadUrl(input: $input) {
      uploadUrl
      distributionUrl
    }
  }
`

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
export function useSignedUploadUrlQuery(
  baseOptions: Apollo.QueryHookOptions<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>(SignedUploadUrlDocument, options)
}
export function useSignedUploadUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>(SignedUploadUrlDocument, options)
}
export type SignedUploadUrlQueryHookResult = ReturnType<typeof useSignedUploadUrlQuery>
export type SignedUploadUrlLazyQueryHookResult = ReturnType<typeof useSignedUploadUrlLazyQuery>
export type SignedUploadUrlQueryResult = Apollo.QueryResult<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>
export const GetFundingTxDocument = gql`
  query GetFundingTx($id: BigInt!) {
    fundingTx(id: $id) {
      ...FundingTx
    }
  }
  ${FundingTxFragmentDoc}
`

/**
 * __useGetFundingTxQuery__
 *
 * To run a query within a React component, call `useGetFundingTxQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFundingTxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFundingTxQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFundingTxQuery(
  baseOptions: Apollo.QueryHookOptions<GetFundingTxQuery, GetFundingTxQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFundingTxQuery, GetFundingTxQueryVariables>(GetFundingTxDocument, options)
}
export function useGetFundingTxLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetFundingTxQuery, GetFundingTxQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFundingTxQuery, GetFundingTxQueryVariables>(GetFundingTxDocument, options)
}
export type GetFundingTxQueryHookResult = ReturnType<typeof useGetFundingTxQuery>
export type GetFundingTxLazyQueryHookResult = ReturnType<typeof useGetFundingTxLazyQuery>
export type GetFundingTxQueryResult = Apollo.QueryResult<GetFundingTxQuery, GetFundingTxQueryVariables>
export const FundingTxWithInvoiceStatusDocument = gql`
  query FundingTxWithInvoiceStatus($fundingTxID: BigInt!) {
    fundingTx(id: $fundingTxID) {
      ...FundingTxWithInvoiceStatus
    }
  }
  ${FundingTxWithInvoiceStatusFragmentDoc}
`

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
export function useFundingTxWithInvoiceStatusQuery(
  baseOptions: Apollo.QueryHookOptions<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables>(
    FundingTxWithInvoiceStatusDocument,
    options,
  )
}
export function useFundingTxWithInvoiceStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FundingTxWithInvoiceStatusQuery, FundingTxWithInvoiceStatusQueryVariables>(
    FundingTxWithInvoiceStatusDocument,
    options,
  )
}
export type FundingTxWithInvoiceStatusQueryHookResult = ReturnType<typeof useFundingTxWithInvoiceStatusQuery>
export type FundingTxWithInvoiceStatusLazyQueryHookResult = ReturnType<typeof useFundingTxWithInvoiceStatusLazyQuery>
export type FundingTxWithInvoiceStatusQueryResult = Apollo.QueryResult<
  FundingTxWithInvoiceStatusQuery,
  FundingTxWithInvoiceStatusQueryVariables
>
export const FundingTxsForLandingPageDocument = gql`
  query FundingTxsForLandingPage($input: GetFundingTxsInput) {
    fundingTxsGet(input: $input) {
      fundingTxs {
        ...FundingTxForLandingPage
      }
    }
  }
  ${FundingTxForLandingPageFragmentDoc}
`

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
export function useFundingTxsForLandingPageQuery(
  baseOptions?: Apollo.QueryHookOptions<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>(
    FundingTxsForLandingPageDocument,
    options,
  )
}
export function useFundingTxsForLandingPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FundingTxsForLandingPageQuery, FundingTxsForLandingPageQueryVariables>(
    FundingTxsForLandingPageDocument,
    options,
  )
}
export type FundingTxsForLandingPageQueryHookResult = ReturnType<typeof useFundingTxsForLandingPageQuery>
export type FundingTxsForLandingPageLazyQueryHookResult = ReturnType<typeof useFundingTxsForLandingPageLazyQuery>
export type FundingTxsForLandingPageQueryResult = Apollo.QueryResult<
  FundingTxsForLandingPageQuery,
  FundingTxsForLandingPageQueryVariables
>
export const FundingTxForUserContributionDocument = gql`
  query FundingTxForUserContribution($fundingTxId: BigInt!) {
    fundingTx(id: $fundingTxId) {
      ...FundingTxForUserContribution
    }
  }
  ${FundingTxForUserContributionFragmentDoc}
`

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
export function useFundingTxForUserContributionQuery(
  baseOptions: Apollo.QueryHookOptions<FundingTxForUserContributionQuery, FundingTxForUserContributionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FundingTxForUserContributionQuery, FundingTxForUserContributionQueryVariables>(
    FundingTxForUserContributionDocument,
    options,
  )
}
export function useFundingTxForUserContributionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FundingTxForUserContributionQuery,
    FundingTxForUserContributionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FundingTxForUserContributionQuery, FundingTxForUserContributionQueryVariables>(
    FundingTxForUserContributionDocument,
    options,
  )
}
export type FundingTxForUserContributionQueryHookResult = ReturnType<typeof useFundingTxForUserContributionQuery>
export type FundingTxForUserContributionLazyQueryHookResult = ReturnType<
  typeof useFundingTxForUserContributionLazyQuery
>
export type FundingTxForUserContributionQueryResult = Apollo.QueryResult<
  FundingTxForUserContributionQuery,
  FundingTxForUserContributionQueryVariables
>
export const FundingTxForDownloadInvoiceDocument = gql`
  query FundingTxForDownloadInvoice($fundingTxId: BigInt!) {
    fundingTx(id: $fundingTxId) {
      ...FundingTxForDownloadInvoice
    }
  }
  ${FundingTxForDownloadInvoiceFragmentDoc}
`

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
export function useFundingTxForDownloadInvoiceQuery(
  baseOptions: Apollo.QueryHookOptions<FundingTxForDownloadInvoiceQuery, FundingTxForDownloadInvoiceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FundingTxForDownloadInvoiceQuery, FundingTxForDownloadInvoiceQueryVariables>(
    FundingTxForDownloadInvoiceDocument,
    options,
  )
}
export function useFundingTxForDownloadInvoiceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FundingTxForDownloadInvoiceQuery,
    FundingTxForDownloadInvoiceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FundingTxForDownloadInvoiceQuery, FundingTxForDownloadInvoiceQueryVariables>(
    FundingTxForDownloadInvoiceDocument,
    options,
  )
}
export type FundingTxForDownloadInvoiceQueryHookResult = ReturnType<typeof useFundingTxForDownloadInvoiceQuery>
export type FundingTxForDownloadInvoiceLazyQueryHookResult = ReturnType<typeof useFundingTxForDownloadInvoiceLazyQuery>
export type FundingTxForDownloadInvoiceQueryResult = Apollo.QueryResult<
  FundingTxForDownloadInvoiceQuery,
  FundingTxForDownloadInvoiceQueryVariables
>
export const GrantsDocument = gql`
  query Grants {
    grants {
      id
      title
      name
      shortDescription
      description
      status
      image
      balance
      statuses {
        status
        endAt
        startAt
      }
      applicants {
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
    }
  }
`

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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GrantsQuery, GrantsQueryVariables>(GrantsDocument, options)
}
export function useGrantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrantsQuery, GrantsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GrantsQuery, GrantsQueryVariables>(GrantsDocument, options)
}
export type GrantsQueryHookResult = ReturnType<typeof useGrantsQuery>
export type GrantsLazyQueryHookResult = ReturnType<typeof useGrantsLazyQuery>
export type GrantsQueryResult = Apollo.QueryResult<GrantsQuery, GrantsQueryVariables>
export const GrantDocument = gql`
  query Grant($input: GrantGetInput!) {
    grant(input: $input) {
      id
      title
      name
      shortDescription
      description
      balance
      status
      image
      statuses {
        status
        endAt
        startAt
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
      applicants {
        project {
          id
          name
          title
          thumbnailImage
          shortDescription
          description
          funders {
            id
            confirmedAt
            user {
              id
              username
              imageUrl
            }
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
    }
  }
`

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
export function useGrantQuery(baseOptions: Apollo.QueryHookOptions<GrantQuery, GrantQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GrantQuery, GrantQueryVariables>(GrantDocument, options)
}
export function useGrantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrantQuery, GrantQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GrantQuery, GrantQueryVariables>(GrantDocument, options)
}
export type GrantQueryHookResult = ReturnType<typeof useGrantQuery>
export type GrantLazyQueryHookResult = ReturnType<typeof useGrantLazyQuery>
export type GrantQueryResult = Apollo.QueryResult<GrantQuery, GrantQueryVariables>
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
`

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
export function useGrantStatisticsQuery(
  baseOptions?: Apollo.QueryHookOptions<GrantStatisticsQuery, GrantStatisticsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GrantStatisticsQuery, GrantStatisticsQueryVariables>(GrantStatisticsDocument, options)
}
export function useGrantStatisticsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GrantStatisticsQuery, GrantStatisticsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GrantStatisticsQuery, GrantStatisticsQueryVariables>(GrantStatisticsDocument, options)
}
export type GrantStatisticsQueryHookResult = ReturnType<typeof useGrantStatisticsQuery>
export type GrantStatisticsLazyQueryHookResult = ReturnType<typeof useGrantStatisticsLazyQuery>
export type GrantStatisticsQueryResult = Apollo.QueryResult<GrantStatisticsQuery, GrantStatisticsQueryVariables>
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
  ${OrderFragmentDoc}
`

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
export function useOrdersGetQuery(baseOptions: Apollo.QueryHookOptions<OrdersGetQuery, OrdersGetQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<OrdersGetQuery, OrdersGetQueryVariables>(OrdersGetDocument, options)
}
export function useOrdersGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OrdersGetQuery, OrdersGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<OrdersGetQuery, OrdersGetQueryVariables>(OrdersGetDocument, options)
}
export type OrdersGetQueryHookResult = ReturnType<typeof useOrdersGetQuery>
export type OrdersGetLazyQueryHookResult = ReturnType<typeof useOrdersGetLazyQuery>
export type OrdersGetQueryResult = Apollo.QueryResult<OrdersGetQuery, OrdersGetQueryVariables>
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
  ${FundingTxOrderFragmentDoc}
`

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
export function useFundingTxsOrderGetQuery(
  baseOptions?: Apollo.QueryHookOptions<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>(FundingTxsOrderGetDocument, options)
}
export function useFundingTxsOrderGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FundingTxsOrderGetQuery, FundingTxsOrderGetQueryVariables>(
    FundingTxsOrderGetDocument,
    options,
  )
}
export type FundingTxsOrderGetQueryHookResult = ReturnType<typeof useFundingTxsOrderGetQuery>
export type FundingTxsOrderGetLazyQueryHookResult = ReturnType<typeof useFundingTxsOrderGetLazyQuery>
export type FundingTxsOrderGetQueryResult = Apollo.QueryResult<
  FundingTxsOrderGetQuery,
  FundingTxsOrderGetQueryVariables
>
export const FundingTxsOrderCountGetDocument = gql`
  query FundingTxsOrderCountGet($input: GetFundingTxsInput) {
    fundingTxsGet(input: $input) {
      pagination {
        ...Pagination
      }
    }
  }
  ${PaginationFragmentDoc}
`

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
export function useFundingTxsOrderCountGetQuery(
  baseOptions?: Apollo.QueryHookOptions<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>(
    FundingTxsOrderCountGetDocument,
    options,
  )
}
export function useFundingTxsOrderCountGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FundingTxsOrderCountGetQuery, FundingTxsOrderCountGetQueryVariables>(
    FundingTxsOrderCountGetDocument,
    options,
  )
}
export type FundingTxsOrderCountGetQueryHookResult = ReturnType<typeof useFundingTxsOrderCountGetQuery>
export type FundingTxsOrderCountGetLazyQueryHookResult = ReturnType<typeof useFundingTxsOrderCountGetLazyQuery>
export type FundingTxsOrderCountGetQueryResult = Apollo.QueryResult<
  FundingTxsOrderCountGetQuery,
  FundingTxsOrderCountGetQueryVariables
>
export const ProjectByNameOrIdDocument = gql`
  query ProjectByNameOrId($where: UniqueProjectQueryInput!, $input: ProjectEntriesGetInput) {
    projectGet(where: $where) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

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
export function useProjectByNameOrIdQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>(ProjectByNameOrIdDocument, options)
}
export function useProjectByNameOrIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>(
    ProjectByNameOrIdDocument,
    options,
  )
}
export type ProjectByNameOrIdQueryHookResult = ReturnType<typeof useProjectByNameOrIdQuery>
export type ProjectByNameOrIdLazyQueryHookResult = ReturnType<typeof useProjectByNameOrIdLazyQuery>
export type ProjectByNameOrIdQueryResult = Apollo.QueryResult<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>
export const ProjectsForSubscriptionDocument = gql`
  query ProjectsForSubscription($input: ProjectsGetQueryInput!) {
    projectsGet(input: $input) {
      projects {
        ...ProjectForSubscription
      }
    }
  }
  ${ProjectForSubscriptionFragmentDoc}
`

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
export function useProjectsForSubscriptionQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables>(
    ProjectsForSubscriptionDocument,
    options,
  )
}
export function useProjectsForSubscriptionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsForSubscriptionQuery, ProjectsForSubscriptionQueryVariables>(
    ProjectsForSubscriptionDocument,
    options,
  )
}
export type ProjectsForSubscriptionQueryHookResult = ReturnType<typeof useProjectsForSubscriptionQuery>
export type ProjectsForSubscriptionLazyQueryHookResult = ReturnType<typeof useProjectsForSubscriptionLazyQuery>
export type ProjectsForSubscriptionQueryResult = Apollo.QueryResult<
  ProjectsForSubscriptionQuery,
  ProjectsForSubscriptionQueryVariables
>
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
`

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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options)
}
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options)
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>
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
`

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
export function useProjectsFullQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectsFullQuery, ProjectsFullQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsFullQuery, ProjectsFullQueryVariables>(ProjectsFullDocument, options)
}
export function useProjectsFullLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectsFullQuery, ProjectsFullQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsFullQuery, ProjectsFullQueryVariables>(ProjectsFullDocument, options)
}
export type ProjectsFullQueryHookResult = ReturnType<typeof useProjectsFullQuery>
export type ProjectsFullLazyQueryHookResult = ReturnType<typeof useProjectsFullLazyQuery>
export type ProjectsFullQueryResult = Apollo.QueryResult<ProjectsFullQuery, ProjectsFullQueryVariables>
export const ProjectsSummaryDocument = gql`
  query ProjectsSummary {
    projectsSummary {
      fundedTotal
      fundersCount
      projectsCount
    }
  }
`

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
export function useProjectsSummaryQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>(ProjectsSummaryDocument, options)
}
export function useProjectsSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>(ProjectsSummaryDocument, options)
}
export type ProjectsSummaryQueryHookResult = ReturnType<typeof useProjectsSummaryQuery>
export type ProjectsSummaryLazyQueryHookResult = ReturnType<typeof useProjectsSummaryLazyQuery>
export type ProjectsSummaryQueryResult = Apollo.QueryResult<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>
export const ProjectUnplublishedEntriesDocument = gql`
  query ProjectUnplublishedEntries($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      entries: entries(input: { where: { published: false } }) {
        ...EntryForProject
      }
    }
  }
  ${EntryForProjectFragmentDoc}
`

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
export function useProjectUnplublishedEntriesQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>(
    ProjectUnplublishedEntriesDocument,
    options,
  )
}
export function useProjectUnplublishedEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>(
    ProjectUnplublishedEntriesDocument,
    options,
  )
}
export type ProjectUnplublishedEntriesQueryHookResult = ReturnType<typeof useProjectUnplublishedEntriesQuery>
export type ProjectUnplublishedEntriesLazyQueryHookResult = ReturnType<typeof useProjectUnplublishedEntriesLazyQuery>
export type ProjectUnplublishedEntriesQueryResult = Apollo.QueryResult<
  ProjectUnplublishedEntriesQuery,
  ProjectUnplublishedEntriesQueryVariables
>
export const ProjectFundersDocument = gql`
  query ProjectFunders($input: GetFundersInput!) {
    fundersGet(input: $input) {
      ...FunderWithUser
    }
  }
  ${FunderWithUserFragmentDoc}
`

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
export function useProjectFundersQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectFundersQuery, ProjectFundersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectFundersQuery, ProjectFundersQueryVariables>(ProjectFundersDocument, options)
}
export function useProjectFundersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectFundersQuery, ProjectFundersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectFundersQuery, ProjectFundersQueryVariables>(ProjectFundersDocument, options)
}
export type ProjectFundersQueryHookResult = ReturnType<typeof useProjectFundersQuery>
export type ProjectFundersLazyQueryHookResult = ReturnType<typeof useProjectFundersLazyQuery>
export type ProjectFundersQueryResult = Apollo.QueryResult<ProjectFundersQuery, ProjectFundersQueryVariables>
export const ProjectDashboardFundersDocument = gql`
  query ProjectDashboardFunders($input: GetFundersInput) {
    getDashboardFunders(input: $input) {
      id
      user {
        id
        username
        imageUrl
      }
      fundingTxs {
        email
        amount
        uuid
      }
      rewards {
        quantity
        projectReward {
          id
          name
        }
      }
      amountFunded
      confirmed
      confirmedAt
      timesFunded
    }
  }
`

/**
 * __useProjectDashboardFundersQuery__
 *
 * To run a query within a React component, call `useProjectDashboardFundersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDashboardFundersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDashboardFundersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectDashboardFundersQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectDashboardFundersQuery, ProjectDashboardFundersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectDashboardFundersQuery, ProjectDashboardFundersQueryVariables>(
    ProjectDashboardFundersDocument,
    options,
  )
}
export function useProjectDashboardFundersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectDashboardFundersQuery, ProjectDashboardFundersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectDashboardFundersQuery, ProjectDashboardFundersQueryVariables>(
    ProjectDashboardFundersDocument,
    options,
  )
}
export type ProjectDashboardFundersQueryHookResult = ReturnType<typeof useProjectDashboardFundersQuery>
export type ProjectDashboardFundersLazyQueryHookResult = ReturnType<typeof useProjectDashboardFundersLazyQuery>
export type ProjectDashboardFundersQueryResult = Apollo.QueryResult<
  ProjectDashboardFundersQuery,
  ProjectDashboardFundersQueryVariables
>
export const ProjectsMostFundedOfTheWeekGetDocument = gql`
  query ProjectsMostFundedOfTheWeekGet($input: GetProjectsMostFundedOfTheWeekInput) {
    projectsMostFundedOfTheWeekGet(input: $input) {
      project {
        ...ProjectForLandingPage
      }
    }
  }
  ${ProjectForLandingPageFragmentDoc}
`

/**
 * __useProjectsMostFundedOfTheWeekGetQuery__
 *
 * To run a query within a React component, call `useProjectsMostFundedOfTheWeekGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsMostFundedOfTheWeekGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsMostFundedOfTheWeekGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectsMostFundedOfTheWeekGetQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProjectsMostFundedOfTheWeekGetQuery,
    ProjectsMostFundedOfTheWeekGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsMostFundedOfTheWeekGetQuery, ProjectsMostFundedOfTheWeekGetQueryVariables>(
    ProjectsMostFundedOfTheWeekGetDocument,
    options,
  )
}
export function useProjectsMostFundedOfTheWeekGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsMostFundedOfTheWeekGetQuery,
    ProjectsMostFundedOfTheWeekGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsMostFundedOfTheWeekGetQuery, ProjectsMostFundedOfTheWeekGetQueryVariables>(
    ProjectsMostFundedOfTheWeekGetDocument,
    options,
  )
}
export type ProjectsMostFundedOfTheWeekGetQueryHookResult = ReturnType<typeof useProjectsMostFundedOfTheWeekGetQuery>
export type ProjectsMostFundedOfTheWeekGetLazyQueryHookResult = ReturnType<
  typeof useProjectsMostFundedOfTheWeekGetLazyQuery
>
export type ProjectsMostFundedOfTheWeekGetQueryResult = Apollo.QueryResult<
  ProjectsMostFundedOfTheWeekGetQuery,
  ProjectsMostFundedOfTheWeekGetQueryVariables
>
export const ProjectsForLandingPageDocument = gql`
  query ProjectsForLandingPage($input: ProjectsGetQueryInput) {
    projectsGet(input: $input) {
      projects {
        ...ProjectForLandingPage
      }
    }
  }
  ${ProjectForLandingPageFragmentDoc}
`

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
export function useProjectsForLandingPageQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>(
    ProjectsForLandingPageDocument,
    options,
  )
}
export function useProjectsForLandingPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>(
    ProjectsForLandingPageDocument,
    options,
  )
}
export type ProjectsForLandingPageQueryHookResult = ReturnType<typeof useProjectsForLandingPageQuery>
export type ProjectsForLandingPageLazyQueryHookResult = ReturnType<typeof useProjectsForLandingPageLazyQuery>
export type ProjectsForLandingPageQueryResult = Apollo.QueryResult<
  ProjectsForLandingPageQuery,
  ProjectsForLandingPageQueryVariables
>
export const FeaturedProjectForLandingPageDocument = gql`
  query FeaturedProjectForLandingPage($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectForLandingPage
    }
  }
  ${ProjectForLandingPageFragmentDoc}
`

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
export function useFeaturedProjectForLandingPageQuery(
  baseOptions: Apollo.QueryHookOptions<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables>(
    FeaturedProjectForLandingPageDocument,
    options,
  )
}
export function useFeaturedProjectForLandingPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FeaturedProjectForLandingPageQuery,
    FeaturedProjectForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables>(
    FeaturedProjectForLandingPageDocument,
    options,
  )
}
export type FeaturedProjectForLandingPageQueryHookResult = ReturnType<typeof useFeaturedProjectForLandingPageQuery>
export type FeaturedProjectForLandingPageLazyQueryHookResult = ReturnType<
  typeof useFeaturedProjectForLandingPageLazyQuery
>
export type FeaturedProjectForLandingPageQueryResult = Apollo.QueryResult<
  FeaturedProjectForLandingPageQuery,
  FeaturedProjectForLandingPageQueryVariables
>
export const ProjectNostrKeysDocument = gql`
  query ProjectNostrKeys($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectNostrKeys
    }
  }
  ${ProjectNostrKeysFragmentDoc}
`

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
export function useProjectNostrKeysQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>(ProjectNostrKeysDocument, options)
}
export function useProjectNostrKeysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>(ProjectNostrKeysDocument, options)
}
export type ProjectNostrKeysQueryHookResult = ReturnType<typeof useProjectNostrKeysQuery>
export type ProjectNostrKeysLazyQueryHookResult = ReturnType<typeof useProjectNostrKeysLazyQuery>
export type ProjectNostrKeysQueryResult = Apollo.QueryResult<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>
export const ProjectStatsGetInsightDocument = gql`
  query ProjectStatsGetInsight($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectStatsForInsightsPage
    }
  }
  ${ProjectStatsForInsightsPageFragmentDoc}
`

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
export function useProjectStatsGetInsightQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>(
    ProjectStatsGetInsightDocument,
    options,
  )
}
export function useProjectStatsGetInsightLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>(
    ProjectStatsGetInsightDocument,
    options,
  )
}
export type ProjectStatsGetInsightQueryHookResult = ReturnType<typeof useProjectStatsGetInsightQuery>
export type ProjectStatsGetInsightLazyQueryHookResult = ReturnType<typeof useProjectStatsGetInsightLazyQuery>
export type ProjectStatsGetInsightQueryResult = Apollo.QueryResult<
  ProjectStatsGetInsightQuery,
  ProjectStatsGetInsightQueryVariables
>
export const ProjectHistoryStatsGetDocument = gql`
  query ProjectHistoryStatsGet($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectHistoryStats
    }
  }
  ${ProjectHistoryStatsFragmentDoc}
`

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
export function useProjectHistoryStatsGetQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>(
    ProjectHistoryStatsGetDocument,
    options,
  )
}
export function useProjectHistoryStatsGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>(
    ProjectHistoryStatsGetDocument,
    options,
  )
}
export type ProjectHistoryStatsGetQueryHookResult = ReturnType<typeof useProjectHistoryStatsGetQuery>
export type ProjectHistoryStatsGetLazyQueryHookResult = ReturnType<typeof useProjectHistoryStatsGetLazyQuery>
export type ProjectHistoryStatsGetQueryResult = Apollo.QueryResult<
  ProjectHistoryStatsGetQuery,
  ProjectHistoryStatsGetQueryVariables
>
export const ProjectRewardSoldGraphStatsGetDocument = gql`
  query ProjectRewardSoldGraphStatsGet($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectRewardSoldGraphStats
    }
  }
  ${ProjectRewardSoldGraphStatsFragmentDoc}
`

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
export function useProjectRewardSoldGraphStatsGetQuery(
  baseOptions: Apollo.QueryHookOptions<
    ProjectRewardSoldGraphStatsGetQuery,
    ProjectRewardSoldGraphStatsGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectRewardSoldGraphStatsGetQuery, ProjectRewardSoldGraphStatsGetQueryVariables>(
    ProjectRewardSoldGraphStatsGetDocument,
    options,
  )
}
export function useProjectRewardSoldGraphStatsGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectRewardSoldGraphStatsGetQuery,
    ProjectRewardSoldGraphStatsGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectRewardSoldGraphStatsGetQuery, ProjectRewardSoldGraphStatsGetQueryVariables>(
    ProjectRewardSoldGraphStatsGetDocument,
    options,
  )
}
export type ProjectRewardSoldGraphStatsGetQueryHookResult = ReturnType<typeof useProjectRewardSoldGraphStatsGetQuery>
export type ProjectRewardSoldGraphStatsGetLazyQueryHookResult = ReturnType<
  typeof useProjectRewardSoldGraphStatsGetLazyQuery
>
export type ProjectRewardSoldGraphStatsGetQueryResult = Apollo.QueryResult<
  ProjectRewardSoldGraphStatsGetQuery,
  ProjectRewardSoldGraphStatsGetQueryVariables
>
export const ProjectFundingMethodStatsGetDocument = gql`
  query ProjectFundingMethodStatsGet($input: GetProjectStatsInput!) {
    projectStatsGet(input: $input) {
      ...ProjectFundingMethodStats
    }
  }
  ${ProjectFundingMethodStatsFragmentDoc}
`

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
export function useProjectFundingMethodStatsGetQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>(
    ProjectFundingMethodStatsGetDocument,
    options,
  )
}
export function useProjectFundingMethodStatsGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectFundingMethodStatsGetQuery,
    ProjectFundingMethodStatsGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>(
    ProjectFundingMethodStatsGetDocument,
    options,
  )
}
export type ProjectFundingMethodStatsGetQueryHookResult = ReturnType<typeof useProjectFundingMethodStatsGetQuery>
export type ProjectFundingMethodStatsGetLazyQueryHookResult = ReturnType<
  typeof useProjectFundingMethodStatsGetLazyQuery
>
export type ProjectFundingMethodStatsGetQueryResult = Apollo.QueryResult<
  ProjectFundingMethodStatsGetQuery,
  ProjectFundingMethodStatsGetQueryVariables
>
export const TagsGetDocument = gql`
  query TagsGet {
    tagsGet {
      label
      id
      count
    }
  }
`

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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TagsGetQuery, TagsGetQueryVariables>(TagsGetDocument, options)
}
export function useTagsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsGetQuery, TagsGetQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TagsGetQuery, TagsGetQueryVariables>(TagsGetDocument, options)
}
export type TagsGetQueryHookResult = ReturnType<typeof useTagsGetQuery>
export type TagsGetLazyQueryHookResult = ReturnType<typeof useTagsGetLazyQuery>
export type TagsGetQueryResult = Apollo.QueryResult<TagsGetQuery, TagsGetQueryVariables>
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
`

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
export function useProjectCountriesGetQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>(
    ProjectCountriesGetDocument,
    options,
  )
}
export function useProjectCountriesGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>(
    ProjectCountriesGetDocument,
    options,
  )
}
export type ProjectCountriesGetQueryHookResult = ReturnType<typeof useProjectCountriesGetQuery>
export type ProjectCountriesGetLazyQueryHookResult = ReturnType<typeof useProjectCountriesGetLazyQuery>
export type ProjectCountriesGetQueryResult = Apollo.QueryResult<
  ProjectCountriesGetQuery,
  ProjectCountriesGetQueryVariables
>
export const ProjectRegionsGetDocument = gql`
  query ProjectRegionsGet {
    projectRegionsGet {
      count
      region
    }
  }
`

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
export function useProjectRegionsGetQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>(ProjectRegionsGetDocument, options)
}
export function useProjectRegionsGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>(
    ProjectRegionsGetDocument,
    options,
  )
}
export type ProjectRegionsGetQueryHookResult = ReturnType<typeof useProjectRegionsGetQuery>
export type ProjectRegionsGetLazyQueryHookResult = ReturnType<typeof useProjectRegionsGetLazyQuery>
export type ProjectRegionsGetQueryResult = Apollo.QueryResult<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>
export const MeDocument = gql`
  query Me {
    me {
      ...UserMe
    }
  }
  ${UserMeFragmentDoc}
`

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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const MeProjectFollowsDocument = gql`
  query MeProjectFollows {
    me {
      projectFollows {
        id
        title
        name
      }
    }
  }
`

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
export function useMeProjectFollowsQuery(
  baseOptions?: Apollo.QueryHookOptions<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>(MeProjectFollowsDocument, options)
}
export function useMeProjectFollowsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>(MeProjectFollowsDocument, options)
}
export type MeProjectFollowsQueryHookResult = ReturnType<typeof useMeProjectFollowsQuery>
export type MeProjectFollowsLazyQueryHookResult = ReturnType<typeof useMeProjectFollowsLazyQuery>
export type MeProjectFollowsQueryResult = Apollo.QueryResult<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>
export const UserForProfilePageDocument = gql`
  query UserForProfilePage($where: UserGetInput!) {
    user(where: $where) {
      ...UserForProfilePage
    }
  }
  ${UserForProfilePageFragmentDoc}
`

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
export function useUserForProfilePageQuery(
  baseOptions: Apollo.QueryHookOptions<UserForProfilePageQuery, UserForProfilePageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserForProfilePageQuery, UserForProfilePageQueryVariables>(UserForProfilePageDocument, options)
}
export function useUserForProfilePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserForProfilePageQuery, UserForProfilePageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserForProfilePageQuery, UserForProfilePageQueryVariables>(
    UserForProfilePageDocument,
    options,
  )
}
export type UserForProfilePageQueryHookResult = ReturnType<typeof useUserForProfilePageQuery>
export type UserForProfilePageLazyQueryHookResult = ReturnType<typeof useUserForProfilePageLazyQuery>
export type UserForProfilePageQueryResult = Apollo.QueryResult<
  UserForProfilePageQuery,
  UserForProfilePageQueryVariables
>
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
  ${ProjectForProfilePageFragmentDoc}
`

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
export function useUserProfileProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>(
    UserProfileProjectsDocument,
    options,
  )
}
export function useUserProfileProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>(
    UserProfileProjectsDocument,
    options,
  )
}
export type UserProfileProjectsQueryHookResult = ReturnType<typeof useUserProfileProjectsQuery>
export type UserProfileProjectsLazyQueryHookResult = ReturnType<typeof useUserProfileProjectsLazyQuery>
export type UserProfileProjectsQueryResult = Apollo.QueryResult<
  UserProfileProjectsQuery,
  UserProfileProjectsQueryVariables
>
export const UserFollowedProjectsDocument = gql`
  query UserFollowedProjects($where: UserGetInput!) {
    user(where: $where) {
      projectFollows {
        ...ProjectForProfilePage
      }
    }
  }
  ${ProjectForProfilePageFragmentDoc}
`

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
export function useUserFollowedProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>(
    UserFollowedProjectsDocument,
    options,
  )
}
export function useUserFollowedProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>(
    UserFollowedProjectsDocument,
    options,
  )
}
export type UserFollowedProjectsQueryHookResult = ReturnType<typeof useUserFollowedProjectsQuery>
export type UserFollowedProjectsLazyQueryHookResult = ReturnType<typeof useUserFollowedProjectsLazyQuery>
export type UserFollowedProjectsQueryResult = Apollo.QueryResult<
  UserFollowedProjectsQuery,
  UserFollowedProjectsQueryVariables
>
export const UserProfileContributionsDocument = gql`
  query UserProfileContributions($where: UserGetInput!) {
    user(where: $where) {
      contributions {
        ...UserProjectContributions
      }
    }
  }
  ${UserProjectContributionsFragmentDoc}
`

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
export function useUserProfileContributionsQuery(
  baseOptions: Apollo.QueryHookOptions<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>(
    UserProfileContributionsDocument,
    options,
  )
}
export function useUserProfileContributionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>(
    UserProfileContributionsDocument,
    options,
  )
}
export type UserProfileContributionsQueryHookResult = ReturnType<typeof useUserProfileContributionsQuery>
export type UserProfileContributionsLazyQueryHookResult = ReturnType<typeof useUserProfileContributionsLazyQuery>
export type UserProfileContributionsQueryResult = Apollo.QueryResult<
  UserProfileContributionsQuery,
  UserProfileContributionsQueryVariables
>
export const UserProfileOrdersDocument = gql`
  query UserProfileOrders($where: UserGetInput!) {
    user(where: $where) {
      orders {
        ...ProfileOrder
      }
    }
  }
  ${ProfileOrderFragmentDoc}
`

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
export function useUserProfileOrdersQuery(
  baseOptions: Apollo.QueryHookOptions<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>(UserProfileOrdersDocument, options)
}
export function useUserProfileOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>(
    UserProfileOrdersDocument,
    options,
  )
}
export type UserProfileOrdersQueryHookResult = ReturnType<typeof useUserProfileOrdersQuery>
export type UserProfileOrdersLazyQueryHookResult = ReturnType<typeof useUserProfileOrdersLazyQuery>
export type UserProfileOrdersQueryResult = Apollo.QueryResult<UserProfileOrdersQuery, UserProfileOrdersQueryVariables>
export const LightningAddressVerifyDocument = gql`
  query LightningAddressVerify($lightningAddress: String) {
    lightningAddressVerify(lightningAddress: $lightningAddress) {
      reason
      valid
    }
  }
`

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
export function useLightningAddressVerifyQuery(
  baseOptions?: Apollo.QueryHookOptions<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>(
    LightningAddressVerifyDocument,
    options,
  )
}
export function useLightningAddressVerifyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>(
    LightningAddressVerifyDocument,
    options,
  )
}
export type LightningAddressVerifyQueryHookResult = ReturnType<typeof useLightningAddressVerifyQuery>
export type LightningAddressVerifyLazyQueryHookResult = ReturnType<typeof useLightningAddressVerifyLazyQuery>
export type LightningAddressVerifyQueryResult = Apollo.QueryResult<
  LightningAddressVerifyQuery,
  LightningAddressVerifyQueryVariables
>
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
  ${ProjectRewardForLandingPageFragmentDoc}
`

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
export function useActivityCreatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<ActivityCreatedSubscription, ActivityCreatedSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<ActivityCreatedSubscription, ActivityCreatedSubscriptionVariables>(
    ActivityCreatedDocument,
    options,
  )
}
export type ActivityCreatedSubscriptionHookResult = ReturnType<typeof useActivityCreatedSubscription>
export type ActivityCreatedSubscriptionResult = Apollo.SubscriptionResult<ActivityCreatedSubscription>
export const FundingTxStatusUpdatedDocument = gql`
  subscription FundingTxStatusUpdated($input: FundingTxStatusUpdatedInput) {
    fundingTxStatusUpdated(input: $input) {
      fundingTx {
        ...FundingTx
      }
    }
  }
  ${FundingTxFragmentDoc}
`

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
export function useFundingTxStatusUpdatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    FundingTxStatusUpdatedSubscription,
    FundingTxStatusUpdatedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<FundingTxStatusUpdatedSubscription, FundingTxStatusUpdatedSubscriptionVariables>(
    FundingTxStatusUpdatedDocument,
    options,
  )
}
export type FundingTxStatusUpdatedSubscriptionHookResult = ReturnType<typeof useFundingTxStatusUpdatedSubscription>
export type FundingTxStatusUpdatedSubscriptionResult = Apollo.SubscriptionResult<FundingTxStatusUpdatedSubscription>
