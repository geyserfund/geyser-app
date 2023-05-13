import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
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
  amount_Float_NotNull_min_1: any
  amount_Float_min_1: any
  comment_String_maxLength_280: any
  cost_Int_NotNull_min_0: any
  cost_Int_NotNull_min_1_max_1000000: any
  description_String_NotNull_maxLength_250: any
  description_String_NotNull_maxLength_2200: any
  description_String_NotNull_maxLength_4000: any
  description_String_maxLength_250: any
  description_String_maxLength_2200: any
  description_String_maxLength_4000: any
  donationAmount_Int_NotNull_min_1: any
  email_String_NotNull_format_email: any
  email_String_format_email: any
  fundingGoal_Int_min_1: any
  link_String_NotNull_format_uri: any
  links_List_String_NotNull_format_uri: any
  name_String_NotNull_maxLength_100: any
  name_String_NotNull_minLength_3_maxLength_60: any
  name_String_NotNull_minLength_3_maxLength_280: any
  name_String_maxLength_100: any
  name_String_minLength_3_maxLength_280: any
  name_String_minLength_5_maxLength_60: any
  pubkey_String_minLength_66_maxLength_66: any
  quantity_Int_NotNull_min_1: any
  rewardsCost_Int_NotNull_min_0: any
  shortDescription_String_maxLength_500: any
  stock_Int_min_0: any
  title_String_NotNull_maxLength_60: any
  title_String_NotNull_maxLength_150: any
  title_String_maxLength_60: any
  title_String_maxLength_150: any
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
  description: Scalars['description_String_NotNull_maxLength_2200']
  /** Header image of the Entry. */
  image?: InputMaybe<Scalars['String']>
  projectId: Scalars['BigInt']
  /** Title of the Entry. */
  title: Scalars['title_String_NotNull_maxLength_150']
  type: EntryType
}

export type CreateProjectInput = {
  /** Project ISO3166 country code */
  countryCode?: InputMaybe<Scalars['String']>
  /** A short description of the project. */
  description: Scalars['description_String_NotNull_maxLength_4000']
  email: Scalars['email_String_NotNull_format_email']
  expiresAt?: InputMaybe<Scalars['Date']>
  fundingGoal?: InputMaybe<Scalars['fundingGoal_Int_min_1']>
  /** Main project image. */
  image?: InputMaybe<Scalars['String']>
  name: Scalars['name_String_NotNull_minLength_3_maxLength_60']
  /** Project region */
  region?: InputMaybe<Scalars['String']>
  /** The currency used to price rewards for the project. Currently only USDCENT supported. */
  rewardCurrency?: InputMaybe<RewardCurrency>
  shortDescription?: InputMaybe<
    Scalars['shortDescription_String_maxLength_500']
  >
  thumbnailImage?: InputMaybe<Scalars['String']>
  /** Public title of the project. */
  title: Scalars['title_String_NotNull_maxLength_60']
  type?: InputMaybe<ProjectType>
}

export type CreateProjectMilestoneInput = {
  /** Amount the project balance must reach to consider the milestone completed, in satoshis. */
  amount: Scalars['amount_Float_NotNull_min_1']
  description: Scalars['description_String_NotNull_maxLength_250']
  name: Scalars['name_String_NotNull_maxLength_100']
  projectId: Scalars['BigInt']
}

export type CreateProjectRewardInput = {
  /** Cost of the reward, currently only in USD cents */
  cost: Scalars['cost_Int_NotNull_min_1_max_1000000']
  /** Currency used for the cost */
  costCurrency: RewardCurrency
  description: Scalars['description_String_NotNull_maxLength_250']
  image?: InputMaybe<Scalars['String']>
  name: Scalars['name_String_NotNull_maxLength_100']
  projectId: Scalars['BigInt']
  stock?: InputMaybe<Scalars['stock_Int_min_0']>
}

export type CreateWalletInput = {
  lightningAddressConnectionDetailsInput?: InputMaybe<LightningAddressConnectionDetailsCreateInput>
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsCreateInput>
  name?: InputMaybe<Scalars['name_String_minLength_5_maxLength_60']>
  resourceInput: WalletResourceInput
}

export enum Currency {
  Usdcent = 'USDCENT',
}

export type CursorInput = {
  id: Scalars['Int']
}

export type CursorInputString = {
  id: Scalars['String']
}

export type DonationFundingInput = {
  /** The donation amount, in satoshis. */
  donationAmount: Scalars['donationAmount_Int_NotNull_min_1']
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
  description: Scalars['description_String_NotNull_maxLength_2200']
  /** Number of funders that were created from the Entry's page. */
  fundersCount: Scalars['Int']
  /** Funding transactions that were created from the Entry's page. */
  fundingTxs: Array<FundingTx>
  id: Scalars['BigInt']
  /** Header image of the Entry. */
  image?: Maybe<Scalars['String']>
  /** Project within which the Entry was created. */
  project?: Maybe<Project>
  /** @deprecated This field was replaced by the status field and will eventually be removed. */
  published: Scalars['Boolean']
  publishedAt?: Maybe<Scalars['String']>
  status: EntryStatus
  /** Title of the Entry. */
  title: Scalars['title_String_NotNull_maxLength_60']
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
  anonymous: Scalars['Boolean']
  donationInput?: InputMaybe<DonationFundingInput>
  metadataInput?: InputMaybe<FundingMetadataInput>
  projectId: Scalars['BigInt']
  rewardInput?: InputMaybe<RewardFundingInput>
  /** The resource from which the funding transaction is being created. */
  sourceResourceInput: ResourceInput
}

export type FundingMetadataInput = {
  comment?: InputMaybe<Scalars['comment_String_maxLength_280']>
  email?: InputMaybe<Scalars['email_String_format_email']>
  media?: InputMaybe<Scalars['String']>
}

export enum FundingMethod {
  GeyserQr = 'geyser_qr',
  LnAddress = 'ln_address',
  LnurlPay = 'lnurl_pay',
  PodcastKeysend = 'podcast_keysend',
}

export type FundingMutationResponse = {
  __typename?: 'FundingMutationResponse'
  amountSummary?: Maybe<AmountSummary>
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
  Pending = 'pending',
  Unpaid = 'unpaid',
}

export type FundingTx = {
  __typename?: 'FundingTx'
  address?: Maybe<Scalars['String']>
  amount: Scalars['Int']
  comment?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  funder: Funder
  id: Scalars['BigInt']
  invoiceId: Scalars['String']
  invoiceStatus: InvoiceStatus
  media?: Maybe<Scalars['String']>
  method?: Maybe<FundingMethod>
  onChain: Scalars['Boolean']
  paidAt?: Maybe<Scalars['Date']>
  paymentRequest?: Maybe<Scalars['String']>
  projectId: Scalars['BigInt']
  source: Scalars['String']
  sourceResource?: Maybe<SourceResource>
  status: FundingStatus
  uuid: Scalars['String']
}

export type FundingTxConfirmedSubscriptionResponse = {
  __typename?: 'FundingTxConfirmedSubscriptionResponse'
  fundingTx: FundingTx
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
  confirmed?: InputMaybe<Scalars['Boolean']>
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
  method?: InputMaybe<Scalars['String']>
  projectId?: InputMaybe<Scalars['BigInt']>
  sourceResourceInput?: InputMaybe<ResourceInput>
}

export type GetProjectRewardInput = {
  where: GetProjectRewardWhereInput
}

export type GetProjectRewardWhereInput = {
  deleted?: InputMaybe<Scalars['Boolean']>
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
  pubkey?: InputMaybe<Scalars['pubkey_String_minLength_66_maxLength_66']>
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
  pubkey?: Maybe<Scalars['pubkey_String_minLength_66_maxLength_66']>
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: Maybe<Scalars['String']>
}

/** Public node details visible by anyone. */
export type LndConnectionDetailsPublic = {
  __typename?: 'LndConnectionDetailsPublic'
  pubkey?: Maybe<Scalars['pubkey_String_minLength_66_maxLength_66']>
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
  pubkey?: InputMaybe<Scalars['pubkey_String_minLength_66_maxLength_66']>
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

export type Mutation = {
  __typename?: 'Mutation'
  _?: Maybe<Scalars['Boolean']>
  claimBadge: UserBadge
  createEntry: Entry
  createProject: Project
  createProjectMilestone: ProjectMilestone
  createProjectReward: ProjectReward
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
  projectFollow: Scalars['Boolean']
  projectStatusUpdate: Project
  projectTagAdd: Array<Tag>
  projectTagRemove: Array<Tag>
  projectUnfollow: Scalars['Boolean']
  /** Makes the Entry public. */
  publishEntry: Entry
  tagCreate: Tag
  unlinkExternalAccount: User
  updateEntry: Entry
  updateProject: Project
  updateProjectMilestone: ProjectMilestone
  updateProjectReward: ProjectReward
  updateUser: User
  /** This operation is currently not supported. */
  updateWallet: Wallet
  updateWalletState: Wallet
  userBadgeAward: UserBadge
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

export type MutationCreateProjectRewardArgs = {
  input: CreateProjectRewardInput
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

export type MutationProjectFollowArgs = {
  input: ProjectFollowMutationInput
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

export type MutationUpdateProjectRewardArgs = {
  input: UpdateProjectRewardInput
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

export type MutationWalletDeleteArgs = {
  id: Scalars['BigInt']
}

export type OffsetBasedPaginationInput = {
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export enum OrderByOptions {
  Asc = 'asc',
  Desc = 'desc',
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
  description?: Maybe<Scalars['description_String_maxLength_4000']>
  /**
   * By default, returns all the entries of a project, both published and unpublished but not deleted.
   * To filter the result set, an explicit input can be passed that specifies a value of true or false for the published field.
   * An unpublished entry is only returned if the requesting user is the creator of the entry.
   */
  entries: Array<Entry>
  expiresAt?: Maybe<Scalars['String']>
  followers: Array<User>
  funders: Array<Funder>
  fundersCount?: Maybe<Scalars['Int']>
  fundingGoal?: Maybe<Scalars['fundingGoal_Int_min_1']>
  fundingTxs: Array<FundingTx>
  fundingTxsCount?: Maybe<Scalars['Int']>
  /** Returns the project's grant applications. */
  grants: Array<GrantApplicant>
  id: Scalars['BigInt']
  image?: Maybe<Scalars['String']>
  links: Array<Scalars['String']>
  location?: Maybe<Location>
  /** @deprecated Field no longer supported */
  media: Array<Scalars['String']>
  milestones: Array<ProjectMilestone>
  /** Unique name for the project. Used for the project URL and lightning address. */
  name: Scalars['name_String_NotNull_minLength_3_maxLength_280']
  owners: Array<Owner>
  rewardCurrency?: Maybe<RewardCurrency>
  rewards: Array<ProjectReward>
  /** Short description of the project. */
  shortDescription?: Maybe<Scalars['shortDescription_String_maxLength_500']>
  /** @deprecated Field no longer supported */
  sponsors: Array<Sponsor>
  /** Returns summary statistics on the Project views and visitors. */
  statistics?: Maybe<ProjectStatistics>
  status?: Maybe<ProjectStatus>
  tags: Array<Tag>
  /** Main project image. */
  thumbnailImage?: Maybe<Scalars['String']>
  /** Public title of the project. */
  title: Scalars['title_String_NotNull_maxLength_60']
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

export type ProjectEntriesGetInput = {
  where?: InputMaybe<ProjectEntriesGetWhereInput>
}

export type ProjectEntriesGetWhereInput = {
  published?: InputMaybe<Scalars['Boolean']>
}

export type ProjectFollowMutationInput = {
  projectId: Scalars['BigInt']
}

export type ProjectLinkMutationInput = {
  link: Scalars['link_String_NotNull_format_uri']
  projectId: Scalars['BigInt']
}

export type ProjectMilestone = {
  __typename?: 'ProjectMilestone'
  /** Amount the project balance must reach to consider the milestone completed, in satoshis. */
  amount: Scalars['Float']
  description?: Maybe<Scalars['description_String_maxLength_250']>
  id: Scalars['BigInt']
  name: Scalars['name_String_NotNull_maxLength_100']
}

export type ProjectRegionsGetResult = {
  __typename?: 'ProjectRegionsGetResult'
  count: Scalars['Int']
  region: Scalars['String']
}

export type ProjectReward = {
  __typename?: 'ProjectReward'
  /** Cost of the reward, priced in USD cents. */
  cost: Scalars['Int']
  /**
   * Whether the reward is deleted or not. Deleted rewards should not appear in the funding flow. Moreover, deleted
   * rewards should only be visible by the project owner and the users that purchased it.
   */
  deleted: Scalars['Boolean']
  /** Short description of the reward. */
  description?: Maybe<Scalars['description_String_maxLength_250']>
  id: Scalars['BigInt']
  /** Image of the reward. */
  image?: Maybe<Scalars['String']>
  /** Name of the reward. */
  name: Scalars['name_String_NotNull_maxLength_100']
  project: Project
  sold: Scalars['Int']
  stock?: Maybe<Scalars['Int']>
}

export type ProjectStatistics = {
  __typename?: 'ProjectStatistics'
  totalPageviews: Scalars['Int']
  totalVisitors: Scalars['Int']
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

export type ProjectWhereInput = {
  countryCode?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['BigInt']>
  /** Unique name for the project. Used for the project URL and lightning address. */
  name?: InputMaybe<Scalars['name_String_minLength_3_maxLength_280']>
  region?: InputMaybe<Scalars['String']>
  search?: InputMaybe<Scalars['String']>
  status?: InputMaybe<ProjectStatus>
  tagIds?: InputMaybe<Array<Scalars['Int']>>
  type?: InputMaybe<ProjectType>
}

export type ProjectsGetQueryInput = {
  /**
   * Takes an array of Project OrderBy options. When passing multiple ordering options, each option must
   * be passed in a separate object in the array. This ensures consistent ordering of the orderBy options in the
   * result set.
   */
  orderBy?: InputMaybe<Array<InputMaybe<ProjectsOrderByInput>>>
  pagination?: InputMaybe<PaginationInput>
  where?: InputMaybe<ProjectWhereInput>
}

export type ProjectsOrderByInput = {
  balance?: InputMaybe<OrderByOptions>
  createdAt?: InputMaybe<OrderByOptions>
}

export type ProjectsResponse = {
  __typename?: 'ProjectsResponse'
  projects: Array<Project>
  summary?: Maybe<ProjectsSummary>
}

export type ProjectsSummary = {
  __typename?: 'ProjectsSummary'
  /** Total of satoshis raised by projects on the platform. */
  fundedTotal?: Maybe<Scalars['Int']>
  /** Total number of funders on the platform. */
  fundersCount?: Maybe<Scalars['Int']>
  /** Total number of projects ever created on the platform. */
  projectsCount?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  _?: Maybe<Scalars['Boolean']>
  badges: Array<Badge>
  entry?: Maybe<Entry>
  fundingTx: FundingTx
  /** Returns all activities. */
  getActivities: Array<Activity>
  getDashboardFunders: Array<Funder>
  /** Returns all published entries. */
  getEntries: Array<Entry>
  getFunders: Array<Funder>
  getFundingTxs: Array<FundingTx>
  /** Returns the public key of the Lightning node linked to a project, if there is one. */
  getProjectPubkey?: Maybe<Scalars['String']>
  getProjectReward: ProjectReward
  getProjectRewards: Array<ProjectReward>
  getSignedUploadUrl: SignedUploadUrl
  getWallet: Wallet
  grant: Grant
  grantStatistics: GrantStatistics
  grants: Array<Grant>
  lightningAddressVerify: LightningAddressVerifyResponse
  me?: Maybe<User>
  project?: Maybe<Project>
  projectCountriesGet: Array<ProjectCountriesGetResult>
  projectRegionsGet: Array<ProjectRegionsGetResult>
  /** By default, returns a list of all active projects. */
  projects: ProjectsResponse
  projectsMostFundedOfTheWeekGet: Array<ProjectsMostFundedOfTheWeekGet>
  /** Returns summary statistics of all projects, both current and past. */
  projectsSummary: ProjectsSummary
  statusCheck: Scalars['Boolean']
  tagsGet: Array<TagsGetResult>
  user: User
  userBadge?: Maybe<UserBadge>
  userBadges: Array<UserBadge>
}

export type QueryEntryArgs = {
  id: Scalars['BigInt']
}

export type QueryFundingTxArgs = {
  id: Scalars['BigInt']
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

export type QueryGetFundersArgs = {
  input: GetFundersInput
}

export type QueryGetFundingTxsArgs = {
  input?: InputMaybe<GetFundingTxsInput>
}

export type QueryGetProjectPubkeyArgs = {
  projectId: Scalars['BigInt']
}

export type QueryGetProjectRewardArgs = {
  id: Scalars['BigInt']
}

export type QueryGetProjectRewardsArgs = {
  input: GetProjectRewardInput
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

export type QueryProjectArgs = {
  where: UniqueProjectQueryInput
}

export type QueryProjectsArgs = {
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

export type ResourceInput = {
  resourceId: Scalars['BigInt']
  resourceType: FundingResourceType
}

export enum RewardCurrency {
  Usdcent = 'USDCENT',
}

export type RewardFundingInput = {
  rewards: Array<RewardInput>
  /**
   * Total cost of rewards, in satoshis. This amount will be used for the invoice  unless there is more than 1%
   * slippage with the reward cost calculated in the backend.
   */
  rewardsCost: Scalars['rewardsCost_Int_NotNull_min_0']
  shipping?: InputMaybe<ShippingInput>
}

export type RewardInput = {
  id: Scalars['BigInt']
  /** Number of times a reward was selected. */
  quantity: Scalars['quantity_Int_NotNull_min_1']
}

export enum ShippingDestination {
  International = 'international',
  National = 'national',
}

export type ShippingInput = {
  /** The shipping cost, in satoshis. */
  cost: Scalars['cost_Int_NotNull_min_0']
  destination: ShippingDestination
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
  fundingTxConfirmed: FundingTxConfirmedSubscriptionResponse
  projectActivated: ProjectActivatedSubscriptionResponse
}

export type SubscriptionActivityCreatedArgs = {
  input?: InputMaybe<ActivityCreatedSubscriptionInput>
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

export type UniqueProjectQueryInput = {
  id?: InputMaybe<Scalars['BigInt']>
  /** Unique name for the project. Used for the project URL and lightning address. */
  name?: InputMaybe<Scalars['name_String_minLength_3_maxLength_280']>
}

export type UpdateEntryInput = {
  content?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['description_String_maxLength_2200']>
  entryId: Scalars['BigInt']
  /** Header image of the Entry. */
  image?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['title_String_maxLength_150']>
}

export type UpdateProjectInput = {
  /** Project ISO3166 country code */
  countryCode?: InputMaybe<Scalars['String']>
  /** Description of the project. */
  description?: InputMaybe<Scalars['description_String_maxLength_4000']>
  expiresAt?: InputMaybe<Scalars['Date']>
  fundingGoal?: InputMaybe<Scalars['fundingGoal_Int_min_1']>
  /** Main project image. */
  image?: InputMaybe<Scalars['String']>
  /** Project links */
  links?: InputMaybe<Array<Scalars['links_List_String_NotNull_format_uri']>>
  projectId: Scalars['BigInt']
  /** Project region */
  region?: InputMaybe<Scalars['String']>
  /** The currency used to price rewards for the project. Currently only USDCENT supported. Should become an Enum. */
  rewardCurrency?: InputMaybe<RewardCurrency>
  /** A short description of the project. */
  shortDescription?: InputMaybe<
    Scalars['shortDescription_String_maxLength_500']
  >
  /** Current status of the project */
  status?: InputMaybe<ProjectStatus>
  /** Project header image. */
  thumbnailImage?: InputMaybe<Scalars['String']>
  /** Public title of the project. */
  title?: InputMaybe<Scalars['title_String_maxLength_60']>
  type?: InputMaybe<ProjectType>
}

export type UpdateProjectMilestoneInput = {
  /** Amount the project balance must reach to consider the milestone completed, in satoshis. */
  amount?: InputMaybe<Scalars['amount_Float_min_1']>
  description?: InputMaybe<Scalars['description_String_maxLength_250']>
  name?: InputMaybe<Scalars['name_String_maxLength_100']>
  projectMilestoneId: Scalars['BigInt']
}

export type UpdateProjectRewardInput = {
  /** Cost of the reward, priced in USD cents */
  cost: Scalars['cost_Int_NotNull_min_1_max_1000000']
  /** Currency used for the cost */
  costCurrency: RewardCurrency
  /** Soft deletes the reward. */
  deleted?: InputMaybe<Scalars['Boolean']>
  description?: InputMaybe<Scalars['description_String_maxLength_250']>
  image?: InputMaybe<Scalars['String']>
  name: Scalars['name_String_NotNull_maxLength_100']
  projectRewardId: Scalars['BigInt']
  stock?: InputMaybe<Scalars['stock_Int_min_0']>
}

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['email_String_format_email']>
  id: Scalars['BigInt']
  imageUrl?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
}

export type UpdateWalletInput = {
  id: Scalars['BigInt']
  lightningAddressConnectionDetailsInput?: InputMaybe<LightningAddressConnectionDetailsUpdateInput>
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsUpdateInput>
  name?: InputMaybe<Scalars['name_String_minLength_5_maxLength_60']>
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
  ownerOf: Array<OwnerOf>
  projectFollows: Array<Project>
  /**
   * Returns the projects of a user. By default, this field returns all the projects for that user, both draft and non-draft.
   * To filter the result set, an explicit input can be passed that specifies a value of the status field.
   */
  projects: Array<Project>
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
  name?: Maybe<Scalars['name_String_minLength_5_maxLength_60']>
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

export type GetDashboardFundersInput = {
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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
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

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
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
    | (Omit<FundingTx, 'sourceResource'> & {
        sourceResource?: Maybe<ResolversTypes['SourceResource']>
      })
    | Project
    | ProjectReward
  ConnectionDetails:
    | LightningAddressConnectionDetails
    | LndConnectionDetailsPrivate
    | LndConnectionDetailsPublic
  SourceResource: Entry | Project
}

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Activity: ResolverTypeWrapper<
    Omit<Activity, 'resource'> & {
      resource: ResolversTypes['ActivityResource']
    }
  >
  ActivityCreatedSubscriptionInput: ActivityCreatedSubscriptionInput
  ActivityCreatedSubscriptionWhereInput: ActivityCreatedSubscriptionWhereInput
  ActivityResource: ResolverTypeWrapper<ResolversUnionTypes['ActivityResource']>
  ActivityResourceType: ActivityResourceType
  Ambassador: ResolverTypeWrapper<Ambassador>
  AmountSummary: ResolverTypeWrapper<AmountSummary>
  Badge: ResolverTypeWrapper<Badge>
  BadgeClaimInput: BadgeClaimInput
  BadgesGetInput: BadgesGetInput
  BadgesGetWhereInput: BadgesGetWhereInput
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  ConnectionDetails: ResolverTypeWrapper<
    ResolversUnionTypes['ConnectionDetails']
  >
  Country: ResolverTypeWrapper<Country>
  CreateEntryInput: CreateEntryInput
  CreateProjectInput: CreateProjectInput
  CreateProjectMilestoneInput: CreateProjectMilestoneInput
  CreateProjectRewardInput: CreateProjectRewardInput
  CreateWalletInput: CreateWalletInput
  Currency: Currency
  CursorInput: CursorInput
  CursorInputString: CursorInputString
  Date: ResolverTypeWrapper<Scalars['Date']>
  DonationFundingInput: DonationFundingInput
  Entry: ResolverTypeWrapper<Entry>
  EntryPublishedSubscriptionResponse: ResolverTypeWrapper<EntryPublishedSubscriptionResponse>
  EntryStatus: EntryStatus
  EntryType: EntryType
  ExternalAccount: ResolverTypeWrapper<ExternalAccount>
  FileUploadInput: FileUploadInput
  Float: ResolverTypeWrapper<Scalars['Float']>
  Funder: ResolverTypeWrapper<Funder>
  FunderReward: ResolverTypeWrapper<FunderReward>
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
    Omit<FundingTx, 'sourceResource'> & {
      sourceResource?: Maybe<ResolversTypes['SourceResource']>
    }
  >
  FundingTxConfirmedSubscriptionResponse: ResolverTypeWrapper<FundingTxConfirmedSubscriptionResponse>
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
  GetProjectsMostFundedOfTheWeekInput: GetProjectsMostFundedOfTheWeekInput
  Grant: ResolverTypeWrapper<Grant>
  GrantApplicant: ResolverTypeWrapper<GrantApplicant>
  GrantApplicantFunding: ResolverTypeWrapper<GrantApplicantFunding>
  GrantApplicantStatus: GrantApplicantStatus
  GrantApplyInput: GrantApplyInput
  GrantGetInput: GrantGetInput
  GrantGetWhereInput: GrantGetWhereInput
  GrantStatistics: ResolverTypeWrapper<GrantStatistics>
  GrantStatisticsApplicant: ResolverTypeWrapper<GrantStatisticsApplicant>
  GrantStatisticsGrant: ResolverTypeWrapper<GrantStatisticsGrant>
  GrantStatus: ResolverTypeWrapper<GrantStatus>
  GrantStatusEnum: GrantStatusEnum
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
  Mutation: ResolverTypeWrapper<{}>
  OffsetBasedPaginationInput: OffsetBasedPaginationInput
  OrderByOptions: OrderByOptions
  Owner: ResolverTypeWrapper<Owner>
  OwnerOf: ResolverTypeWrapper<OwnerOf>
  PaginationInput: PaginationInput
  Project: ResolverTypeWrapper<Project>
  ProjectActivatedSubscriptionResponse: ResolverTypeWrapper<ProjectActivatedSubscriptionResponse>
  ProjectCountriesGetResult: ResolverTypeWrapper<ProjectCountriesGetResult>
  ProjectEntriesGetInput: ProjectEntriesGetInput
  ProjectEntriesGetWhereInput: ProjectEntriesGetWhereInput
  ProjectFollowMutationInput: ProjectFollowMutationInput
  ProjectLinkMutationInput: ProjectLinkMutationInput
  ProjectMilestone: ResolverTypeWrapper<ProjectMilestone>
  ProjectRegionsGetResult: ResolverTypeWrapper<ProjectRegionsGetResult>
  ProjectReward: ResolverTypeWrapper<ProjectReward>
  ProjectStatistics: ResolverTypeWrapper<ProjectStatistics>
  ProjectStatus: ProjectStatus
  ProjectStatusUpdate: ProjectStatusUpdate
  ProjectTagMutationInput: ProjectTagMutationInput
  ProjectType: ProjectType
  ProjectWhereInput: ProjectWhereInput
  ProjectsGetQueryInput: ProjectsGetQueryInput
  ProjectsOrderByInput: ProjectsOrderByInput
  ProjectsResponse: ResolverTypeWrapper<ProjectsResponse>
  ProjectsSummary: ResolverTypeWrapper<ProjectsSummary>
  Query: ResolverTypeWrapper<{}>
  ResourceInput: ResourceInput
  RewardCurrency: RewardCurrency
  RewardFundingInput: RewardFundingInput
  RewardInput: RewardInput
  ShippingDestination: ShippingDestination
  ShippingInput: ShippingInput
  SignedUploadUrl: ResolverTypeWrapper<SignedUploadUrl>
  SourceResource: ResolverTypeWrapper<ResolversUnionTypes['SourceResource']>
  Sponsor: ResolverTypeWrapper<Sponsor>
  SponsorStatus: SponsorStatus
  String: ResolverTypeWrapper<Scalars['String']>
  Subscription: ResolverTypeWrapper<{}>
  Tag: ResolverTypeWrapper<Tag>
  TagCreateInput: TagCreateInput
  TagsGetResult: ResolverTypeWrapper<TagsGetResult>
  UniqueProjectQueryInput: UniqueProjectQueryInput
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
  UserEntriesGetInput: UserEntriesGetInput
  UserEntriesGetWhereInput: UserEntriesGetWhereInput
  UserGetInput: UserGetInput
  UserProjectContribution: ResolverTypeWrapper<UserProjectContribution>
  UserProjectsGetInput: UserProjectsGetInput
  UserProjectsGetWhereInput: UserProjectsGetWhereInput
  Wallet: ResolverTypeWrapper<
    Omit<Wallet, 'connectionDetails'> & {
      connectionDetails: ResolversTypes['ConnectionDetails']
    }
  >
  WalletResourceInput: WalletResourceInput
  WalletResourceType: WalletResourceType
  WalletState: ResolverTypeWrapper<WalletState>
  WalletStatus: WalletStatus
  WalletStatusCode: WalletStatusCode
  amount_Float_NotNull_min_1: ResolverTypeWrapper<
    Scalars['amount_Float_NotNull_min_1']
  >
  amount_Float_min_1: ResolverTypeWrapper<Scalars['amount_Float_min_1']>
  comment_String_maxLength_280: ResolverTypeWrapper<
    Scalars['comment_String_maxLength_280']
  >
  cost_Int_NotNull_min_0: ResolverTypeWrapper<Scalars['cost_Int_NotNull_min_0']>
  cost_Int_NotNull_min_1_max_1000000: ResolverTypeWrapper<
    Scalars['cost_Int_NotNull_min_1_max_1000000']
  >
  description_String_NotNull_maxLength_250: ResolverTypeWrapper<
    Scalars['description_String_NotNull_maxLength_250']
  >
  description_String_NotNull_maxLength_2200: ResolverTypeWrapper<
    Scalars['description_String_NotNull_maxLength_2200']
  >
  description_String_NotNull_maxLength_4000: ResolverTypeWrapper<
    Scalars['description_String_NotNull_maxLength_4000']
  >
  description_String_maxLength_250: ResolverTypeWrapper<
    Scalars['description_String_maxLength_250']
  >
  description_String_maxLength_2200: ResolverTypeWrapper<
    Scalars['description_String_maxLength_2200']
  >
  description_String_maxLength_4000: ResolverTypeWrapper<
    Scalars['description_String_maxLength_4000']
  >
  donationAmount_Int_NotNull_min_1: ResolverTypeWrapper<
    Scalars['donationAmount_Int_NotNull_min_1']
  >
  email_String_NotNull_format_email: ResolverTypeWrapper<
    Scalars['email_String_NotNull_format_email']
  >
  email_String_format_email: ResolverTypeWrapper<
    Scalars['email_String_format_email']
  >
  fundingGoal_Int_min_1: ResolverTypeWrapper<Scalars['fundingGoal_Int_min_1']>
  getDashboardFundersInput: GetDashboardFundersInput
  link_String_NotNull_format_uri: ResolverTypeWrapper<
    Scalars['link_String_NotNull_format_uri']
  >
  links_List_String_NotNull_format_uri: ResolverTypeWrapper<
    Scalars['links_List_String_NotNull_format_uri']
  >
  name_String_NotNull_maxLength_100: ResolverTypeWrapper<
    Scalars['name_String_NotNull_maxLength_100']
  >
  name_String_NotNull_minLength_3_maxLength_60: ResolverTypeWrapper<
    Scalars['name_String_NotNull_minLength_3_maxLength_60']
  >
  name_String_NotNull_minLength_3_maxLength_280: ResolverTypeWrapper<
    Scalars['name_String_NotNull_minLength_3_maxLength_280']
  >
  name_String_maxLength_100: ResolverTypeWrapper<
    Scalars['name_String_maxLength_100']
  >
  name_String_minLength_3_maxLength_280: ResolverTypeWrapper<
    Scalars['name_String_minLength_3_maxLength_280']
  >
  name_String_minLength_5_maxLength_60: ResolverTypeWrapper<
    Scalars['name_String_minLength_5_maxLength_60']
  >
  projectsMostFundedOfTheWeekGet: ResolverTypeWrapper<ProjectsMostFundedOfTheWeekGet>
  pubkey_String_minLength_66_maxLength_66: ResolverTypeWrapper<
    Scalars['pubkey_String_minLength_66_maxLength_66']
  >
  quantity_Int_NotNull_min_1: ResolverTypeWrapper<
    Scalars['quantity_Int_NotNull_min_1']
  >
  rewardsCost_Int_NotNull_min_0: ResolverTypeWrapper<
    Scalars['rewardsCost_Int_NotNull_min_0']
  >
  shortDescription_String_maxLength_500: ResolverTypeWrapper<
    Scalars['shortDescription_String_maxLength_500']
  >
  stock_Int_min_0: ResolverTypeWrapper<Scalars['stock_Int_min_0']>
  title_String_NotNull_maxLength_60: ResolverTypeWrapper<
    Scalars['title_String_NotNull_maxLength_60']
  >
  title_String_NotNull_maxLength_150: ResolverTypeWrapper<
    Scalars['title_String_NotNull_maxLength_150']
  >
  title_String_maxLength_60: ResolverTypeWrapper<
    Scalars['title_String_maxLength_60']
  >
  title_String_maxLength_150: ResolverTypeWrapper<
    Scalars['title_String_maxLength_150']
  >
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Activity: Omit<Activity, 'resource'> & {
    resource: ResolversParentTypes['ActivityResource']
  }
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
  Boolean: Scalars['Boolean']
  ConnectionDetails: ResolversUnionTypes['ConnectionDetails']
  Country: Country
  CreateEntryInput: CreateEntryInput
  CreateProjectInput: CreateProjectInput
  CreateProjectMilestoneInput: CreateProjectMilestoneInput
  CreateProjectRewardInput: CreateProjectRewardInput
  CreateWalletInput: CreateWalletInput
  CursorInput: CursorInput
  CursorInputString: CursorInputString
  Date: Scalars['Date']
  DonationFundingInput: DonationFundingInput
  Entry: Entry
  EntryPublishedSubscriptionResponse: EntryPublishedSubscriptionResponse
  ExternalAccount: ExternalAccount
  FileUploadInput: FileUploadInput
  Float: Scalars['Float']
  Funder: Funder
  FunderReward: FunderReward
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
  FundingTx: Omit<FundingTx, 'sourceResource'> & {
    sourceResource?: Maybe<ResolversParentTypes['SourceResource']>
  }
  FundingTxConfirmedSubscriptionResponse: FundingTxConfirmedSubscriptionResponse
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
  GetProjectsMostFundedOfTheWeekInput: GetProjectsMostFundedOfTheWeekInput
  Grant: Grant
  GrantApplicant: GrantApplicant
  GrantApplicantFunding: GrantApplicantFunding
  GrantApplyInput: GrantApplyInput
  GrantGetInput: GrantGetInput
  GrantGetWhereInput: GrantGetWhereInput
  GrantStatistics: GrantStatistics
  GrantStatisticsApplicant: GrantStatisticsApplicant
  GrantStatisticsGrant: GrantStatisticsGrant
  GrantStatus: GrantStatus
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
  OffsetBasedPaginationInput: OffsetBasedPaginationInput
  Owner: Owner
  OwnerOf: OwnerOf
  PaginationInput: PaginationInput
  Project: Project
  ProjectActivatedSubscriptionResponse: ProjectActivatedSubscriptionResponse
  ProjectCountriesGetResult: ProjectCountriesGetResult
  ProjectEntriesGetInput: ProjectEntriesGetInput
  ProjectEntriesGetWhereInput: ProjectEntriesGetWhereInput
  ProjectFollowMutationInput: ProjectFollowMutationInput
  ProjectLinkMutationInput: ProjectLinkMutationInput
  ProjectMilestone: ProjectMilestone
  ProjectRegionsGetResult: ProjectRegionsGetResult
  ProjectReward: ProjectReward
  ProjectStatistics: ProjectStatistics
  ProjectStatusUpdate: ProjectStatusUpdate
  ProjectTagMutationInput: ProjectTagMutationInput
  ProjectWhereInput: ProjectWhereInput
  ProjectsGetQueryInput: ProjectsGetQueryInput
  ProjectsOrderByInput: ProjectsOrderByInput
  ProjectsResponse: ProjectsResponse
  ProjectsSummary: ProjectsSummary
  Query: {}
  ResourceInput: ResourceInput
  RewardFundingInput: RewardFundingInput
  RewardInput: RewardInput
  ShippingInput: ShippingInput
  SignedUploadUrl: SignedUploadUrl
  SourceResource: ResolversUnionTypes['SourceResource']
  Sponsor: Sponsor
  String: Scalars['String']
  Subscription: {}
  Tag: Tag
  TagCreateInput: TagCreateInput
  TagsGetResult: TagsGetResult
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
  UserEntriesGetInput: UserEntriesGetInput
  UserEntriesGetWhereInput: UserEntriesGetWhereInput
  UserGetInput: UserGetInput
  UserProjectContribution: UserProjectContribution
  UserProjectsGetInput: UserProjectsGetInput
  UserProjectsGetWhereInput: UserProjectsGetWhereInput
  Wallet: Omit<Wallet, 'connectionDetails'> & {
    connectionDetails: ResolversParentTypes['ConnectionDetails']
  }
  WalletResourceInput: WalletResourceInput
  WalletState: WalletState
  amount_Float_NotNull_min_1: Scalars['amount_Float_NotNull_min_1']
  amount_Float_min_1: Scalars['amount_Float_min_1']
  comment_String_maxLength_280: Scalars['comment_String_maxLength_280']
  cost_Int_NotNull_min_0: Scalars['cost_Int_NotNull_min_0']
  cost_Int_NotNull_min_1_max_1000000: Scalars['cost_Int_NotNull_min_1_max_1000000']
  description_String_NotNull_maxLength_250: Scalars['description_String_NotNull_maxLength_250']
  description_String_NotNull_maxLength_2200: Scalars['description_String_NotNull_maxLength_2200']
  description_String_NotNull_maxLength_4000: Scalars['description_String_NotNull_maxLength_4000']
  description_String_maxLength_250: Scalars['description_String_maxLength_250']
  description_String_maxLength_2200: Scalars['description_String_maxLength_2200']
  description_String_maxLength_4000: Scalars['description_String_maxLength_4000']
  donationAmount_Int_NotNull_min_1: Scalars['donationAmount_Int_NotNull_min_1']
  email_String_NotNull_format_email: Scalars['email_String_NotNull_format_email']
  email_String_format_email: Scalars['email_String_format_email']
  fundingGoal_Int_min_1: Scalars['fundingGoal_Int_min_1']
  getDashboardFundersInput: GetDashboardFundersInput
  link_String_NotNull_format_uri: Scalars['link_String_NotNull_format_uri']
  links_List_String_NotNull_format_uri: Scalars['links_List_String_NotNull_format_uri']
  name_String_NotNull_maxLength_100: Scalars['name_String_NotNull_maxLength_100']
  name_String_NotNull_minLength_3_maxLength_60: Scalars['name_String_NotNull_minLength_3_maxLength_60']
  name_String_NotNull_minLength_3_maxLength_280: Scalars['name_String_NotNull_minLength_3_maxLength_280']
  name_String_maxLength_100: Scalars['name_String_maxLength_100']
  name_String_minLength_3_maxLength_280: Scalars['name_String_minLength_3_maxLength_280']
  name_String_minLength_5_maxLength_60: Scalars['name_String_minLength_5_maxLength_60']
  projectsMostFundedOfTheWeekGet: ProjectsMostFundedOfTheWeekGet
  pubkey_String_minLength_66_maxLength_66: Scalars['pubkey_String_minLength_66_maxLength_66']
  quantity_Int_NotNull_min_1: Scalars['quantity_Int_NotNull_min_1']
  rewardsCost_Int_NotNull_min_0: Scalars['rewardsCost_Int_NotNull_min_0']
  shortDescription_String_maxLength_500: Scalars['shortDescription_String_maxLength_500']
  stock_Int_min_0: Scalars['stock_Int_min_0']
  title_String_NotNull_maxLength_60: Scalars['title_String_NotNull_maxLength_60']
  title_String_NotNull_maxLength_150: Scalars['title_String_NotNull_maxLength_150']
  title_String_maxLength_60: Scalars['title_String_maxLength_60']
  title_String_maxLength_150: Scalars['title_String_maxLength_150']
}

export type ConstraintDirectiveArgs = {
  contains?: Maybe<Scalars['String']>
  endsWith?: Maybe<Scalars['String']>
  exclusiveMax?: Maybe<Scalars['Float']>
  exclusiveMin?: Maybe<Scalars['Float']>
  format?: Maybe<Scalars['String']>
  max?: Maybe<Scalars['Float']>
  maxLength?: Maybe<Scalars['Int']>
  min?: Maybe<Scalars['Float']>
  minLength?: Maybe<Scalars['Int']>
  multipleOf?: Maybe<Scalars['Float']>
  notContains?: Maybe<Scalars['String']>
  pattern?: Maybe<Scalars['String']>
  startsWith?: Maybe<Scalars['String']>
  uniqueTypeName?: Maybe<Scalars['String']>
}

export type ConstraintDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = ConstraintDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type ActivityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity'],
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  resource?: Resolver<
    ResolversTypes['ActivityResource'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ActivityResourceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityResource'] = ResolversParentTypes['ActivityResource'],
> = {
  __resolveType: TypeResolveFn<
    'Entry' | 'FundingTx' | 'Project' | 'ProjectReward',
    ParentType,
    ContextType
  >
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

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt'
}

export type ConnectionDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConnectionDetails'] = ResolversParentTypes['ConnectionDetails'],
> = {
  __resolveType: TypeResolveFn<
    | 'LightningAddressConnectionDetails'
    | 'LndConnectionDetailsPrivate'
    | 'LndConnectionDetailsPublic',
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

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type EntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry'],
> = {
  amountFunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  description?: Resolver<
    ResolversTypes['description_String_NotNull_maxLength_2200'],
    ParentType,
    ContextType
  >
  fundersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  fundingTxs?: Resolver<
    Array<ResolversTypes['FundingTx']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  publishedAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  status?: Resolver<ResolversTypes['EntryStatus'], ParentType, ContextType>
  title?: Resolver<
    ResolversTypes['title_String_NotNull_maxLength_60'],
    ParentType,
    ContextType
  >
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
  fundingTxs?: Resolver<
    Array<ResolversTypes['FundingTx']>,
    ParentType,
    ContextType,
    Partial<FunderFundingTxsArgs>
  >
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  rewards?: Resolver<
    Array<ResolversTypes['FunderReward']>,
    ParentType,
    ContextType
  >
  timesFunded?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FunderRewardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FunderReward'] = ResolversParentTypes['FunderReward'],
> = {
  projectReward?: Resolver<
    ResolversTypes['ProjectReward'],
    ParentType,
    ContextType
  >
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
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
  missedSettleEvents?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingMutationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingMutationResponse'] = ResolversParentTypes['FundingMutationResponse'],
> = {
  amountSummary?: Resolver<
    Maybe<ResolversTypes['AmountSummary']>,
    ParentType,
    ContextType
  >
  fundingTx?: Resolver<
    Maybe<ResolversTypes['FundingTx']>,
    ParentType,
    ContextType
  >
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
  fundingTx?: Resolver<
    Maybe<ResolversTypes['FundingTx']>,
    ParentType,
    ContextType
  >
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
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  funder?: Resolver<ResolversTypes['Funder'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  invoiceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  invoiceStatus?: Resolver<
    ResolversTypes['InvoiceStatus'],
    ParentType,
    ContextType
  >
  media?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  method?: Resolver<
    Maybe<ResolversTypes['FundingMethod']>,
    ParentType,
    ContextType
  >
  onChain?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  paidAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  paymentRequest?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  projectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  sourceResource?: Resolver<
    Maybe<ResolversTypes['SourceResource']>,
    ParentType,
    ContextType
  >
  status?: Resolver<ResolversTypes['FundingStatus'], ParentType, ContextType>
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FundingTxConfirmedSubscriptionResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingTxConfirmedSubscriptionResponse'] = ResolversParentTypes['FundingTxConfirmedSubscriptionResponse'],
> = {
  fundingTx?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType>
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
  applicants?: Resolver<
    Array<ResolversTypes['GrantApplicant']>,
    ParentType,
    ContextType
  >
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  shortDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  sponsors?: Resolver<Array<ResolversTypes['Sponsor']>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['GrantStatusEnum'], ParentType, ContextType>
  statuses?: Resolver<
    Array<ResolversTypes['GrantStatus']>,
    ParentType,
    ContextType
  >
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantApplicantResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GrantApplicant'] = ResolversParentTypes['GrantApplicant'],
> = {
  funding?: Resolver<
    ResolversTypes['GrantApplicantFunding'],
    ParentType,
    ContextType
  >
  grant?: Resolver<ResolversTypes['Grant'], ParentType, ContextType>
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  status?: Resolver<
    ResolversTypes['GrantApplicantStatus'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantApplicantFundingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GrantApplicantFunding'] = ResolversParentTypes['GrantApplicantFunding'],
> = {
  communityFunding?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  grantAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  grantAmountDistributed?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GrantStatisticsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GrantStatistics'] = ResolversParentTypes['GrantStatistics'],
> = {
  applicants?: Resolver<
    Maybe<ResolversTypes['GrantStatisticsApplicant']>,
    ParentType,
    ContextType
  >
  grants?: Resolver<
    Maybe<ResolversTypes['GrantStatisticsGrant']>,
    ParentType,
    ContextType
  >
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
  tlsCertificate?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
}

export type LndConnectionDetailsPrivateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LndConnectionDetailsPrivate'] = ResolversParentTypes['LndConnectionDetailsPrivate'],
> = {
  grpcPort?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  hostname?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  lndNodeType?: Resolver<ResolversTypes['LndNodeType'], ParentType, ContextType>
  macaroon?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  pubkey?: Resolver<
    Maybe<ResolversTypes['pubkey_String_minLength_66_maxLength_66']>,
    ParentType,
    ContextType
  >
  tlsCertificate?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LndConnectionDetailsPublicResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LndConnectionDetailsPublic'] = ResolversParentTypes['LndConnectionDetailsPublic'],
> = {
  pubkey?: Resolver<
    Maybe<ResolversTypes['pubkey_String_minLength_66_maxLength_66']>,
    ParentType,
    ContextType
  >
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
  createProjectReward?: Resolver<
    ResolversTypes['ProjectReward'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateProjectRewardArgs, 'input'>
  >
  createWallet?: Resolver<
    ResolversTypes['Wallet'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateWalletArgs, 'input'>
  >
  deleteEntry?: Resolver<
    ResolversTypes['Entry'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEntryArgs, 'id'>
  >
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
  grantApply?: Resolver<
    ResolversTypes['GrantApplicant'],
    ParentType,
    ContextType,
    Partial<MutationGrantApplyArgs>
  >
  projectFollow?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationProjectFollowArgs, 'input'>
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
  tagCreate?: Resolver<
    ResolversTypes['Tag'],
    ParentType,
    ContextType,
    RequireFields<MutationTagCreateArgs, 'input'>
  >
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
  updateProjectReward?: Resolver<
    ResolversTypes['ProjectReward'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProjectRewardArgs, 'input'>
  >
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'input'>
  >
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
  walletDelete?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationWalletDeleteArgs, 'id'>
  >
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

export type ProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project'],
> = {
  ambassadors?: Resolver<
    Array<ResolversTypes['Ambassador']>,
    ParentType,
    ContextType
  >
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  canDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['description_String_maxLength_4000']>,
    ParentType,
    ContextType
  >
  entries?: Resolver<
    Array<ResolversTypes['Entry']>,
    ParentType,
    ContextType,
    Partial<ProjectEntriesArgs>
  >
  expiresAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  followers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  funders?: Resolver<Array<ResolversTypes['Funder']>, ParentType, ContextType>
  fundersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  fundingGoal?: Resolver<
    Maybe<ResolversTypes['fundingGoal_Int_min_1']>,
    ParentType,
    ContextType
  >
  fundingTxs?: Resolver<
    Array<ResolversTypes['FundingTx']>,
    ParentType,
    ContextType
  >
  fundingTxsCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  grants?: Resolver<
    Array<ResolversTypes['GrantApplicant']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  links?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  location?: Resolver<
    Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType
  >
  media?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  milestones?: Resolver<
    Array<ResolversTypes['ProjectMilestone']>,
    ParentType,
    ContextType
  >
  name?: Resolver<
    ResolversTypes['name_String_NotNull_minLength_3_maxLength_280'],
    ParentType,
    ContextType
  >
  owners?: Resolver<Array<ResolversTypes['Owner']>, ParentType, ContextType>
  rewardCurrency?: Resolver<
    Maybe<ResolversTypes['RewardCurrency']>,
    ParentType,
    ContextType
  >
  rewards?: Resolver<
    Array<ResolversTypes['ProjectReward']>,
    ParentType,
    ContextType
  >
  shortDescription?: Resolver<
    Maybe<ResolversTypes['shortDescription_String_maxLength_500']>,
    ParentType,
    ContextType
  >
  sponsors?: Resolver<Array<ResolversTypes['Sponsor']>, ParentType, ContextType>
  statistics?: Resolver<
    Maybe<ResolversTypes['ProjectStatistics']>,
    ParentType,
    ContextType
  >
  status?: Resolver<
    Maybe<ResolversTypes['ProjectStatus']>,
    ParentType,
    ContextType
  >
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>
  thumbnailImage?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  title?: Resolver<
    ResolversTypes['title_String_NotNull_maxLength_60'],
    ParentType,
    ContextType
  >
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

export type ProjectMilestoneResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectMilestone'] = ResolversParentTypes['ProjectMilestone'],
> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['description_String_maxLength_250']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  name?: Resolver<
    ResolversTypes['name_String_NotNull_maxLength_100'],
    ParentType,
    ContextType
  >
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
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['description_String_maxLength_250']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<
    ResolversTypes['name_String_NotNull_maxLength_100'],
    ParentType,
    ContextType
  >
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>
  sold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
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

export type ProjectsResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectsResponse'] = ResolversParentTypes['ProjectsResponse'],
> = {
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>
  summary?: Resolver<
    Maybe<ResolversTypes['ProjectsSummary']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectsSummaryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectsSummary'] = ResolversParentTypes['ProjectsSummary'],
> = {
  fundedTotal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  fundersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  projectsCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  badges?: Resolver<Array<ResolversTypes['Badge']>, ParentType, ContextType>
  entry?: Resolver<
    Maybe<ResolversTypes['Entry']>,
    ParentType,
    ContextType,
    RequireFields<QueryEntryArgs, 'id'>
  >
  fundingTx?: Resolver<
    ResolversTypes['FundingTx'],
    ParentType,
    ContextType,
    RequireFields<QueryFundingTxArgs, 'id'>
  >
  getActivities?: Resolver<
    Array<ResolversTypes['Activity']>,
    ParentType,
    ContextType,
    Partial<QueryGetActivitiesArgs>
  >
  getDashboardFunders?: Resolver<
    Array<ResolversTypes['Funder']>,
    ParentType,
    ContextType,
    Partial<QueryGetDashboardFundersArgs>
  >
  getEntries?: Resolver<
    Array<ResolversTypes['Entry']>,
    ParentType,
    ContextType,
    Partial<QueryGetEntriesArgs>
  >
  getFunders?: Resolver<
    Array<ResolversTypes['Funder']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetFundersArgs, 'input'>
  >
  getFundingTxs?: Resolver<
    Array<ResolversTypes['FundingTx']>,
    ParentType,
    ContextType,
    Partial<QueryGetFundingTxsArgs>
  >
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
  getProjectRewards?: Resolver<
    Array<ResolversTypes['ProjectReward']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetProjectRewardsArgs, 'input'>
  >
  getSignedUploadUrl?: Resolver<
    ResolversTypes['SignedUploadUrl'],
    ParentType,
    ContextType,
    RequireFields<QueryGetSignedUploadUrlArgs, 'input'>
  >
  getWallet?: Resolver<
    ResolversTypes['Wallet'],
    ParentType,
    ContextType,
    RequireFields<QueryGetWalletArgs, 'id'>
  >
  grant?: Resolver<
    ResolversTypes['Grant'],
    ParentType,
    ContextType,
    RequireFields<QueryGrantArgs, 'input'>
  >
  grantStatistics?: Resolver<
    ResolversTypes['GrantStatistics'],
    ParentType,
    ContextType
  >
  grants?: Resolver<Array<ResolversTypes['Grant']>, ParentType, ContextType>
  lightningAddressVerify?: Resolver<
    ResolversTypes['LightningAddressVerifyResponse'],
    ParentType,
    ContextType,
    Partial<QueryLightningAddressVerifyArgs>
  >
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  project?: Resolver<
    Maybe<ResolversTypes['Project']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectArgs, 'where'>
  >
  projectCountriesGet?: Resolver<
    Array<ResolversTypes['ProjectCountriesGetResult']>,
    ParentType,
    ContextType
  >
  projectRegionsGet?: Resolver<
    Array<ResolversTypes['ProjectRegionsGetResult']>,
    ParentType,
    ContextType
  >
  projects?: Resolver<
    ResolversTypes['ProjectsResponse'],
    ParentType,
    ContextType,
    Partial<QueryProjectsArgs>
  >
  projectsMostFundedOfTheWeekGet?: Resolver<
    Array<ResolversTypes['projectsMostFundedOfTheWeekGet']>,
    ParentType,
    ContextType,
    Partial<QueryProjectsMostFundedOfTheWeekGetArgs>
  >
  projectsSummary?: Resolver<
    ResolversTypes['ProjectsSummary'],
    ParentType,
    ContextType
  >
  statusCheck?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  tagsGet?: Resolver<
    Array<ResolversTypes['TagsGetResult']>,
    ParentType,
    ContextType
  >
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'where'>
  >
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
  _?: SubscriptionResolver<
    Maybe<ResolversTypes['Boolean']>,
    '_',
    ParentType,
    ContextType
  >
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
  fundingTxConfirmed?: SubscriptionResolver<
    ResolversTypes['FundingTxConfirmedSubscriptionResponse'],
    'fundingTxConfirmed',
    ParentType,
    ContextType
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
  contributions?: Resolver<
    Array<ResolversTypes['UserProjectContribution']>,
    ParentType,
    ContextType
  >
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  entries?: Resolver<
    Array<ResolversTypes['Entry']>,
    ParentType,
    ContextType,
    Partial<UserEntriesArgs>
  >
  externalAccounts?: Resolver<
    Array<ResolversTypes['ExternalAccount']>,
    ParentType,
    ContextType
  >
  fundingTxs?: Resolver<
    Array<ResolversTypes['FundingTx']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  ownerOf?: Resolver<Array<ResolversTypes['OwnerOf']>, ParentType, ContextType>
  projectFollows?: Resolver<
    Array<ResolversTypes['Project']>,
    ParentType,
    ContextType
  >
  projects?: Resolver<
    Array<ResolversTypes['Project']>,
    ParentType,
    ContextType,
    Partial<UserProjectsArgs>
  >
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  wallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserBadgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserBadge'] = ResolversParentTypes['UserBadge'],
> = {
  badge?: Resolver<ResolversTypes['Badge'], ParentType, ContextType>
  badgeAwardEventId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  fundingTxId?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  status?: Resolver<
    Maybe<ResolversTypes['UserBadgeStatus']>,
    ParentType,
    ContextType
  >
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
  connectionDetails?: Resolver<
    ResolversTypes['ConnectionDetails'],
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  name?: Resolver<
    Maybe<ResolversTypes['name_String_minLength_5_maxLength_60']>,
    ParentType,
    ContextType
  >
  state?: Resolver<ResolversTypes['WalletState'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type WalletStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WalletState'] = ResolversParentTypes['WalletState'],
> = {
  status?: Resolver<ResolversTypes['WalletStatus'], ParentType, ContextType>
  statusCode?: Resolver<
    ResolversTypes['WalletStatusCode'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface Amount_Float_NotNull_Min_1ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['amount_Float_NotNull_min_1'],
    any
  > {
  name: 'amount_Float_NotNull_min_1'
}

export interface Amount_Float_Min_1ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['amount_Float_min_1'], any> {
  name: 'amount_Float_min_1'
}

export interface Comment_String_MaxLength_280ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['comment_String_maxLength_280'],
    any
  > {
  name: 'comment_String_maxLength_280'
}

export interface Cost_Int_NotNull_Min_0ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['cost_Int_NotNull_min_0'],
    any
  > {
  name: 'cost_Int_NotNull_min_0'
}

export interface Cost_Int_NotNull_Min_1_Max_1000000ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['cost_Int_NotNull_min_1_max_1000000'],
    any
  > {
  name: 'cost_Int_NotNull_min_1_max_1000000'
}

export interface Description_String_NotNull_MaxLength_250ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['description_String_NotNull_maxLength_250'],
    any
  > {
  name: 'description_String_NotNull_maxLength_250'
}

export interface Description_String_NotNull_MaxLength_2200ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['description_String_NotNull_maxLength_2200'],
    any
  > {
  name: 'description_String_NotNull_maxLength_2200'
}

export interface Description_String_NotNull_MaxLength_4000ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['description_String_NotNull_maxLength_4000'],
    any
  > {
  name: 'description_String_NotNull_maxLength_4000'
}

export interface Description_String_MaxLength_250ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['description_String_maxLength_250'],
    any
  > {
  name: 'description_String_maxLength_250'
}

export interface Description_String_MaxLength_2200ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['description_String_maxLength_2200'],
    any
  > {
  name: 'description_String_maxLength_2200'
}

export interface Description_String_MaxLength_4000ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['description_String_maxLength_4000'],
    any
  > {
  name: 'description_String_maxLength_4000'
}

export interface DonationAmount_Int_NotNull_Min_1ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['donationAmount_Int_NotNull_min_1'],
    any
  > {
  name: 'donationAmount_Int_NotNull_min_1'
}

export interface Email_String_NotNull_Format_EmailScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['email_String_NotNull_format_email'],
    any
  > {
  name: 'email_String_NotNull_format_email'
}

export interface Email_String_Format_EmailScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['email_String_format_email'],
    any
  > {
  name: 'email_String_format_email'
}

export interface FundingGoal_Int_Min_1ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['fundingGoal_Int_min_1'],
    any
  > {
  name: 'fundingGoal_Int_min_1'
}

export interface Link_String_NotNull_Format_UriScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['link_String_NotNull_format_uri'],
    any
  > {
  name: 'link_String_NotNull_format_uri'
}

export interface Links_List_String_NotNull_Format_UriScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['links_List_String_NotNull_format_uri'],
    any
  > {
  name: 'links_List_String_NotNull_format_uri'
}

export interface Name_String_NotNull_MaxLength_100ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_NotNull_maxLength_100'],
    any
  > {
  name: 'name_String_NotNull_maxLength_100'
}

export interface Name_String_NotNull_MinLength_3_MaxLength_60ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_NotNull_minLength_3_maxLength_60'],
    any
  > {
  name: 'name_String_NotNull_minLength_3_maxLength_60'
}

export interface Name_String_NotNull_MinLength_3_MaxLength_280ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_NotNull_minLength_3_maxLength_280'],
    any
  > {
  name: 'name_String_NotNull_minLength_3_maxLength_280'
}

export interface Name_String_MaxLength_100ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_maxLength_100'],
    any
  > {
  name: 'name_String_maxLength_100'
}

export interface Name_String_MinLength_3_MaxLength_280ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_minLength_3_maxLength_280'],
    any
  > {
  name: 'name_String_minLength_3_maxLength_280'
}

export interface Name_String_MinLength_5_MaxLength_60ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_minLength_5_maxLength_60'],
    any
  > {
  name: 'name_String_minLength_5_maxLength_60'
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

export interface Pubkey_String_MinLength_66_MaxLength_66ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['pubkey_String_minLength_66_maxLength_66'],
    any
  > {
  name: 'pubkey_String_minLength_66_maxLength_66'
}

export interface Quantity_Int_NotNull_Min_1ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['quantity_Int_NotNull_min_1'],
    any
  > {
  name: 'quantity_Int_NotNull_min_1'
}

export interface RewardsCost_Int_NotNull_Min_0ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['rewardsCost_Int_NotNull_min_0'],
    any
  > {
  name: 'rewardsCost_Int_NotNull_min_0'
}

export interface ShortDescription_String_MaxLength_500ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['shortDescription_String_maxLength_500'],
    any
  > {
  name: 'shortDescription_String_maxLength_500'
}

export interface Stock_Int_Min_0ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['stock_Int_min_0'], any> {
  name: 'stock_Int_min_0'
}

export interface Title_String_NotNull_MaxLength_60ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['title_String_NotNull_maxLength_60'],
    any
  > {
  name: 'title_String_NotNull_maxLength_60'
}

export interface Title_String_NotNull_MaxLength_150ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['title_String_NotNull_maxLength_150'],
    any
  > {
  name: 'title_String_NotNull_maxLength_150'
}

export interface Title_String_MaxLength_60ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['title_String_maxLength_60'],
    any
  > {
  name: 'title_String_maxLength_60'
}

export interface Title_String_MaxLength_150ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['title_String_maxLength_150'],
    any
  > {
  name: 'title_String_maxLength_150'
}

export type Resolvers<ContextType = any> = {
  Activity?: ActivityResolvers<ContextType>
  ActivityResource?: ActivityResourceResolvers<ContextType>
  Ambassador?: AmbassadorResolvers<ContextType>
  AmountSummary?: AmountSummaryResolvers<ContextType>
  Badge?: BadgeResolvers<ContextType>
  BigInt?: GraphQLScalarType
  ConnectionDetails?: ConnectionDetailsResolvers<ContextType>
  Country?: CountryResolvers<ContextType>
  Date?: GraphQLScalarType
  Entry?: EntryResolvers<ContextType>
  EntryPublishedSubscriptionResponse?: EntryPublishedSubscriptionResponseResolvers<ContextType>
  ExternalAccount?: ExternalAccountResolvers<ContextType>
  Funder?: FunderResolvers<ContextType>
  FunderReward?: FunderRewardResolvers<ContextType>
  FundingCancelResponse?: FundingCancelResponseResolvers<ContextType>
  FundingConfirmResponse?: FundingConfirmResponseResolvers<ContextType>
  FundingMutationResponse?: FundingMutationResponseResolvers<ContextType>
  FundingPendingResponse?: FundingPendingResponseResolvers<ContextType>
  FundingQueryResponse?: FundingQueryResponseResolvers<ContextType>
  FundingTx?: FundingTxResolvers<ContextType>
  FundingTxConfirmedSubscriptionResponse?: FundingTxConfirmedSubscriptionResponseResolvers<ContextType>
  FundinginvoiceCancel?: FundinginvoiceCancelResolvers<ContextType>
  Grant?: GrantResolvers<ContextType>
  GrantApplicant?: GrantApplicantResolvers<ContextType>
  GrantApplicantFunding?: GrantApplicantFundingResolvers<ContextType>
  GrantStatistics?: GrantStatisticsResolvers<ContextType>
  GrantStatisticsApplicant?: GrantStatisticsApplicantResolvers<ContextType>
  GrantStatisticsGrant?: GrantStatisticsGrantResolvers<ContextType>
  GrantStatus?: GrantStatusResolvers<ContextType>
  LightningAddressConnectionDetails?: LightningAddressConnectionDetailsResolvers<ContextType>
  LightningAddressVerifyResponse?: LightningAddressVerifyResponseResolvers<ContextType>
  LndConnectionDetails?: LndConnectionDetailsResolvers<ContextType>
  LndConnectionDetailsPrivate?: LndConnectionDetailsPrivateResolvers<ContextType>
  LndConnectionDetailsPublic?: LndConnectionDetailsPublicResolvers<ContextType>
  Location?: LocationResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Owner?: OwnerResolvers<ContextType>
  OwnerOf?: OwnerOfResolvers<ContextType>
  Project?: ProjectResolvers<ContextType>
  ProjectActivatedSubscriptionResponse?: ProjectActivatedSubscriptionResponseResolvers<ContextType>
  ProjectCountriesGetResult?: ProjectCountriesGetResultResolvers<ContextType>
  ProjectMilestone?: ProjectMilestoneResolvers<ContextType>
  ProjectRegionsGetResult?: ProjectRegionsGetResultResolvers<ContextType>
  ProjectReward?: ProjectRewardResolvers<ContextType>
  ProjectStatistics?: ProjectStatisticsResolvers<ContextType>
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
  amount_Float_NotNull_min_1?: GraphQLScalarType
  amount_Float_min_1?: GraphQLScalarType
  comment_String_maxLength_280?: GraphQLScalarType
  cost_Int_NotNull_min_0?: GraphQLScalarType
  cost_Int_NotNull_min_1_max_1000000?: GraphQLScalarType
  description_String_NotNull_maxLength_250?: GraphQLScalarType
  description_String_NotNull_maxLength_2200?: GraphQLScalarType
  description_String_NotNull_maxLength_4000?: GraphQLScalarType
  description_String_maxLength_250?: GraphQLScalarType
  description_String_maxLength_2200?: GraphQLScalarType
  description_String_maxLength_4000?: GraphQLScalarType
  donationAmount_Int_NotNull_min_1?: GraphQLScalarType
  email_String_NotNull_format_email?: GraphQLScalarType
  email_String_format_email?: GraphQLScalarType
  fundingGoal_Int_min_1?: GraphQLScalarType
  link_String_NotNull_format_uri?: GraphQLScalarType
  links_List_String_NotNull_format_uri?: GraphQLScalarType
  name_String_NotNull_maxLength_100?: GraphQLScalarType
  name_String_NotNull_minLength_3_maxLength_60?: GraphQLScalarType
  name_String_NotNull_minLength_3_maxLength_280?: GraphQLScalarType
  name_String_maxLength_100?: GraphQLScalarType
  name_String_minLength_3_maxLength_280?: GraphQLScalarType
  name_String_minLength_5_maxLength_60?: GraphQLScalarType
  projectsMostFundedOfTheWeekGet?: ProjectsMostFundedOfTheWeekGetResolvers<ContextType>
  pubkey_String_minLength_66_maxLength_66?: GraphQLScalarType
  quantity_Int_NotNull_min_1?: GraphQLScalarType
  rewardsCost_Int_NotNull_min_0?: GraphQLScalarType
  shortDescription_String_maxLength_500?: GraphQLScalarType
  stock_Int_min_0?: GraphQLScalarType
  title_String_NotNull_maxLength_60?: GraphQLScalarType
  title_String_NotNull_maxLength_150?: GraphQLScalarType
  title_String_maxLength_60?: GraphQLScalarType
  title_String_maxLength_150?: GraphQLScalarType
}

export type DirectiveResolvers<ContextType = any> = {
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>
}

export type EntryFragment = {
  __typename?: 'Entry'
  id: any
  title: any
  description: any
  image?: string | null
  published: boolean
  content?: string | null
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
  status: EntryStatus
  fundersCount: number
  amountFunded: number
  type: EntryType
  creator: { __typename?: 'User' } & UserForAvatarFragment
  project?: {
    __typename?: 'Project'
    id: any
    title: any
    name: any
    image?: string | null
  } | null
}

export type EntryForLandingPageFragment = {
  __typename?: 'Entry'
  amountFunded: number
  id: any
  image?: string | null
  title: any
  entryFundersCount: number
  entryDescription: any
  project?: {
    __typename?: 'Project'
    id: any
    name: any
    thumbnailImage?: string | null
    title: any
  } | null
  creator: { __typename?: 'User' } & UserForAvatarFragment
}

export type EntryForProjectFragment = {
  __typename?: 'Entry'
  id: any
  title: any
  description: any
  image?: string | null
  type: EntryType
  fundersCount: number
  amountFunded: number
  published: boolean
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
    | {
        __typename?: 'Entry'
        createdAt: string
        id: any
        image?: string | null
        title: any
      }
    | {
        __typename?: 'Project'
        id: any
        name: any
        title: any
        image?: string | null
        createdAt: string
        thumbnailImage?: string | null
      }
    | null
}

export type FundingTxWithInvoiceStatusFragment = {
  __typename?: 'FundingTx'
  id: any
  invoiceId: string
  status: FundingStatus
  onChain: boolean
  invoiceStatus: InvoiceStatus
  paymentRequest?: string | null
}

export type FundingTxFragment = {
  __typename?: 'FundingTx'
  id: any
  uuid: string
  invoiceId: string
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
    } | null
  }
}

export type ProjectForLandingPageFragment = {
  __typename?: 'Project'
  id: any
  name: any
  balance: number
  createdAt: string
  fundersCount?: number | null
  fundingTxsCount?: number | null
  thumbnailImage?: string | null
  shortDescription?: any | null
  title: any
  status?: ProjectStatus | null
  tags: Array<{ __typename?: 'Tag'; id: number; label: string }>
  owners: Array<{
    __typename?: 'Owner'
    id: any
    user: {
      __typename?: 'User'
      id: any
      username: string
      imageUrl?: string | null
    }
  }>
}

export type ProjectRewardForLandingPageFragment = {
  __typename?: 'ProjectReward'
  cost: number
  description?: any | null
  id: any
  image?: string | null
  sold: number
  stock?: number | null
  rewardName: any
  rewardProject: {
    __typename?: 'Project'
    id: any
    name: any
    title: any
    rewardCurrency?: RewardCurrency | null
    owners: Array<{
      __typename?: 'Owner'
      id: any
      user: {
        __typename?: 'User'
        id: any
        username: string
        imageUrl?: string | null
      }
    }>
  }
}

export type ProjectRewardForCreateUpdateFragment = {
  __typename?: 'ProjectReward'
  id: any
  name: any
  description?: any | null
  cost: number
  image?: string | null
  deleted: boolean
  stock?: number | null
  sold: number
}

export type ProjectFragment = {
  __typename?: 'Project'
  id: any
  title: any
  name: any
  type: ProjectType
  shortDescription?: any | null
  description?: any | null
  balance: number
  fundingGoal?: any | null
  createdAt: string
  updatedAt: string
  expiresAt?: string | null
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
  owners: Array<{
    __typename?: 'Owner'
    id: any
    user: {
      __typename?: 'User'
      id: any
      username: string
      imageUrl?: string | null
    }
  }>
  rewards: Array<
    { __typename?: 'ProjectReward' } & ProjectRewardForCreateUpdateFragment
  >
  ambassadors: Array<{
    __typename?: 'Ambassador'
    id: any
    confirmed: boolean
    user: {
      __typename?: 'User'
      id: any
      username: string
      imageUrl?: string | null
    }
  }>
  sponsors: Array<{
    __typename?: 'Sponsor'
    id: any
    url?: string | null
    image?: string | null
    user?: {
      __typename?: 'User'
      id: any
      username: string
      imageUrl?: string | null
    } | null
  }>
  funders: Array<{
    __typename?: 'Funder'
    id: any
    amountFunded?: number | null
    confirmed: boolean
    confirmedAt?: any | null
    timesFunded?: number | null
    user?: {
      __typename?: 'User'
      id: any
      username: string
      imageUrl?: string | null
      email?: string | null
    } | null
  }>
  milestones: Array<{
    __typename?: 'ProjectMilestone'
    id: any
    name: any
    description?: any | null
    amount: number
  }>
  entries: Array<{ __typename?: 'Entry' } & EntryForProjectFragment>
  wallets: Array<{
    __typename?: 'Wallet'
    id: any
    name?: any | null
    state: {
      __typename?: 'WalletState'
      status: WalletStatus
      statusCode: WalletStatusCode
    }
    connectionDetails:
      | {
          __typename?: 'LightningAddressConnectionDetails'
          lightningAddress: string
        }
      | {
          __typename?: 'LndConnectionDetailsPrivate'
          macaroon: string
          tlsCertificate?: string | null
          hostname: string
          grpcPort: number
          lndNodeType: LndNodeType
          pubkey?: any | null
        }
      | { __typename?: 'LndConnectionDetailsPublic'; pubkey?: any | null }
  }>
}

export type UserForAvatarFragment = {
  __typename?: 'User'
  id: any
  imageUrl?: string | null
  username: string
}

export type UserBadgeAwardMutationVariables = Exact<{
  userBadgeId: Scalars['BigInt']
}>

export type UserBadgeAwardMutation = {
  __typename?: 'Mutation'
  userBadgeAward: {
    __typename?: 'UserBadge'
    badgeAwardEventId?: string | null
  }
}

export type CreateEntryMutationVariables = Exact<{
  input: CreateEntryInput
}>

export type CreateEntryMutation = {
  __typename?: 'Mutation'
  createEntry: {
    __typename?: 'Entry'
    id: any
    published: boolean
    createdAt: string
    type: EntryType
    title: any
    description: any
    image?: string | null
    content?: string | null
    publishedAt?: string | null
    project?: { __typename?: 'Project'; id: any; title: any; name: any } | null
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
    published: boolean
    createdAt: string
    type: EntryType
    title: any
    description: any
    image?: string | null
    content?: string | null
    publishedAt?: string | null
    project?: { __typename?: 'Project'; id: any; title: any; name: any } | null
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
    published: boolean
    createdAt: string
    type: EntryType
    title: any
    description: any
    image?: string | null
    content?: string | null
    publishedAt?: string | null
    project?: { __typename?: 'Project'; id: any; title: any; name: any } | null
  }
}

export type DeleteEntryMutationVariables = Exact<{
  deleteEntryId: Scalars['BigInt']
}>

export type DeleteEntryMutation = {
  __typename?: 'Mutation'
  deleteEntry: { __typename?: 'Entry'; id: any; title: any }
}

export type FundMutationVariables = Exact<{
  input: FundingInput
}>

export type FundMutation = {
  __typename?: 'Mutation'
  fund: {
    __typename?: 'FundingMutationResponse'
    fundingTx?: ({ __typename?: 'FundingTx' } & FundingTxFragment) | null
    amountSummary?: {
      __typename?: 'AmountSummary'
      total: number
      donationAmount: number
      shippingCost: number
      rewardsCost: number
    } | null
  }
}

export type RefreshFundingInvoiceMutationVariables = Exact<{
  fundingTxID: Scalars['BigInt']
}>

export type RefreshFundingInvoiceMutation = {
  __typename?: 'Mutation'
  fundingInvoiceRefresh: {
    __typename?: 'FundingTx'
  } & FundingTxWithInvoiceStatusFragment
}

export type FundingInvoiceCancelMutationVariables = Exact<{
  invoiceId: Scalars['String']
}>

export type FundingInvoiceCancelMutation = {
  __typename?: 'Mutation'
  fundingInvoiceCancel: {
    __typename?: 'FundinginvoiceCancel'
    id: any
    success: boolean
  }
}

export type GrantApplyMutationVariables = Exact<{
  input?: InputMaybe<GrantApplyInput>
}>

export type GrantApplyMutation = {
  __typename?: 'Mutation'
  grantApply: { __typename?: 'GrantApplicant'; status: GrantApplicantStatus }
}

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput
}>

export type CreateProjectMutation = {
  __typename?: 'Mutation'
  createProject: {
    __typename?: 'Project'
    id: any
    title: any
    name: any
    description?: any | null
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
    title: any
    name: any
    shortDescription?: any | null
    description?: any | null
    image?: string | null
    thumbnailImage?: string | null
    status?: ProjectStatus | null
    links: Array<string>
    expiresAt?: string | null
    location?: {
      __typename?: 'Location'
      region?: string | null
      country?: { __typename?: 'Country'; name: string; code: string } | null
    } | null
  }
}

export type CreateProjectRewardMutationVariables = Exact<{
  input: CreateProjectRewardInput
}>

export type CreateProjectRewardMutation = {
  __typename?: 'Mutation'
  createProjectReward: {
    __typename?: 'ProjectReward'
  } & ProjectRewardForCreateUpdateFragment
}

export type UpdateProjectRewardMutationVariables = Exact<{
  input: UpdateProjectRewardInput
}>

export type UpdateProjectRewardMutation = {
  __typename?: 'Mutation'
  updateProjectReward: {
    __typename?: 'ProjectReward'
  } & ProjectRewardForCreateUpdateFragment
}

export type CreateProjectMilestoneMutationVariables = Exact<{
  input?: InputMaybe<CreateProjectMilestoneInput>
}>

export type CreateProjectMilestoneMutation = {
  __typename?: 'Mutation'
  createProjectMilestone: {
    __typename?: 'ProjectMilestone'
    id: any
    name: any
    description?: any | null
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
    name: any
    description?: any | null
    amount: number
  }
}

export type DeleteProjectMilestoneMutationVariables = Exact<{
  projectMilestoneId: Scalars['BigInt']
}>

export type DeleteProjectMilestoneMutation = {
  __typename?: 'Mutation'
  deleteProjectMilestone: boolean
}

export type ProjectFollowMutationVariables = Exact<{
  input: ProjectFollowMutationInput
}>

export type ProjectFollowMutation = {
  __typename?: 'Mutation'
  projectFollow: boolean
}

export type ProjectUnfollowMutationVariables = Exact<{
  input: ProjectFollowMutationInput
}>

export type ProjectUnfollowMutation = {
  __typename?: 'Mutation'
  projectUnfollow: boolean
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
        | {
            __typename?: 'LightningAddressConnectionDetails'
            lightningAddress: string
          }
        | { __typename?: 'LndConnectionDetailsPrivate' }
        | { __typename?: 'LndConnectionDetailsPublic' }
    } | null
  }
}

export type CreateWalletMutationVariables = Exact<{
  input: CreateWalletInput
}>

export type CreateWalletMutation = {
  __typename?: 'Mutation'
  createWallet: { __typename?: 'Wallet'; id: any; name?: any | null }
}

export type UpdateWalletMutationVariables = Exact<{
  input: UpdateWalletInput
}>

export type UpdateWalletMutation = {
  __typename?: 'Mutation'
  updateWallet: { __typename?: 'Wallet'; id: any; name?: any | null }
}

export type WalletDeleteMutationVariables = Exact<{
  walletId: Scalars['BigInt']
}>

export type WalletDeleteMutation = {
  __typename?: 'Mutation'
  walletDelete: boolean
}

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
  getActivities: Array<
    { __typename?: 'Activity' } & ActivityForLandingPageFragment
  >
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

export type EntryQuery = {
  __typename?: 'Query'
  entry?: ({ __typename?: 'Entry' } & EntryFragment) | null
}

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
    title: any
    description: any
    image?: string | null
    published: boolean
    content?: string | null
    createdAt: string
    updatedAt: string
    publishedAt?: string | null
    fundersCount: number
    status: EntryStatus
    type: EntryType
    creator: {
      __typename?: 'User'
      id: any
      username: string
      imageUrl?: string | null
    }
    project?: {
      __typename?: 'Project'
      id: any
      title: any
      name: any
      owners: Array<{
        __typename?: 'Owner'
        user: { __typename?: 'User'; id: any }
      }>
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
    title: any
    description: any
    image?: string | null
    fundersCount: number
    amountFunded: number
    type: EntryType
    published: boolean
    project?: {
      __typename?: 'Project'
      title: any
      name: any
      image?: string | null
    } | null
  }>
}

export type SignedUploadUrlQueryVariables = Exact<{
  input: FileUploadInput
}>

export type SignedUploadUrlQuery = {
  __typename?: 'Query'
  getSignedUploadUrl: {
    __typename?: 'SignedUploadUrl'
    uploadUrl: string
    distributionUrl: string
  }
}

export type GetFundingTxQueryVariables = Exact<{
  id: Scalars['BigInt']
}>

export type GetFundingTxQuery = {
  __typename?: 'Query'
  fundingTx: { __typename?: 'FundingTx' } & FundingTxFragment
}

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
    | {
        __typename?: 'Entry'
        id: any
        createdAt: string
        image?: string | null
      }
    | {
        __typename?: 'Project'
        id: any
        createdAt: string
        name: any
        title: any
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
  getFundingTxs: Array<
    { __typename?: 'FundingTx' } & FundingTxForLandingPageFragment
  >
}

export type FundingTxForUserContributionQueryVariables = Exact<{
  fundingTxId: Scalars['BigInt']
}>

export type FundingTxForUserContributionQuery = {
  __typename?: 'Query'
  fundingTx: { __typename?: 'FundingTx' } & FundingTxForUserContributionFragment
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
    statuses: Array<{
      __typename?: 'GrantStatus'
      status: GrantStatusEnum
      endAt?: any | null
      startAt: any
    }>
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
    statuses: Array<{
      __typename?: 'GrantStatus'
      status: GrantStatusEnum
      endAt?: any | null
      startAt: any
    }>
    applicants: Array<{
      __typename?: 'GrantApplicant'
      status: GrantApplicantStatus
      project: {
        __typename?: 'Project'
        id: any
        name: any
        title: any
        thumbnailImage?: string | null
        shortDescription?: any | null
        description?: any | null
        funders: Array<{
          __typename?: 'Funder'
          id: any
          confirmedAt?: any | null
          user?: {
            __typename?: 'User'
            id: any
            username: string
            imageUrl?: string | null
          } | null
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
    grants?: {
      __typename?: 'GrantStatisticsGrant'
      amountFunded: number
      amountGranted: number
      count: number
    } | null
    applicants?: {
      __typename?: 'GrantStatisticsApplicant'
      countFunded: number
    } | null
  }
}

export type ProjectByNameOrIdQueryVariables = Exact<{
  where: UniqueProjectQueryInput
  input?: InputMaybe<ProjectEntriesGetInput>
}>

export type ProjectByNameOrIdQuery = {
  __typename?: 'Query'
  project?: ({ __typename?: 'Project' } & ProjectFragment) | null
}

export type ProjectFundingDataQueryVariables = Exact<{
  where: UniqueProjectQueryInput
}>

export type ProjectFundingDataQuery = {
  __typename?: 'Query'
  project?: {
    __typename?: 'Project'
    funders: Array<{
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
      } | null
    }>
  } | null
}

export type ProjectsQueryVariables = Exact<{
  input?: InputMaybe<ProjectsGetQueryInput>
}>

export type ProjectsQuery = {
  __typename?: 'Query'
  projects: {
    __typename?: 'ProjectsResponse'
    projects: Array<{
      __typename?: 'Project'
      id: any
      title: any
      name: any
      description?: any | null
      balance: number
      fundingGoal?: any | null
      createdAt: string
      expiresAt?: string | null
      status?: ProjectStatus | null
      media: Array<string>
      image?: string | null
    }>
  }
}

export type ProjectsFullQueryVariables = Exact<{
  input?: InputMaybe<ProjectsGetQueryInput>
}>

export type ProjectsFullQuery = {
  __typename?: 'Query'
  projects: {
    __typename?: 'ProjectsResponse'
    projects: Array<{
      __typename?: 'Project'
      id: any
      title: any
      name: any
      type: ProjectType
      shortDescription?: any | null
      description?: any | null
      balance: number
      fundingGoal?: any | null
      createdAt: string
      updatedAt: string
      expiresAt?: string | null
      thumbnailImage?: string | null
      image?: string | null
      status?: ProjectStatus | null
      media: Array<string>
      owners: Array<{
        __typename?: 'Owner'
        id: any
        user: {
          __typename?: 'User'
          id: any
          username: string
          imageUrl?: string | null
        }
      }>
      funders: Array<{
        __typename?: 'Funder'
        id: any
        confirmed: boolean
        user?: {
          __typename?: 'User'
          id: any
          username: string
          imageUrl?: string | null
        } | null
      }>
      wallets: Array<{
        __typename?: 'Wallet'
        state: {
          __typename?: 'WalletState'
          status: WalletStatus
          statusCode: WalletStatusCode
        }
      }>
    }>
  }
}

export type ProjectsSummaryQueryVariables = Exact<{ [key: string]: never }>

export type ProjectsSummaryQuery = {
  __typename?: 'Query'
  projectsSummary: {
    __typename?: 'ProjectsSummary'
    fundedTotal?: number | null
    fundersCount?: number | null
    projectsCount?: number | null
  }
}

export type ProjectUnplublishedEntriesQueryVariables = Exact<{
  where: UniqueProjectQueryInput
}>

export type ProjectUnplublishedEntriesQuery = {
  __typename?: 'Query'
  project?: {
    __typename?: 'Project'
    entries: Array<{ __typename?: 'Entry' } & EntryForProjectFragment>
  } | null
}

export type ProjectDashboardDataQueryVariables = Exact<{
  where: UniqueProjectQueryInput
}>

export type ProjectDashboardDataQuery = {
  __typename?: 'Query'
  project?: {
    __typename?: 'Project'
    unpublishedEntries: Array<
      { __typename?: 'Entry' } & EntryForProjectFragment
    >
    publishedEntries: Array<{ __typename?: 'Entry' } & EntryForProjectFragment>
    statistics?: {
      __typename?: 'ProjectStatistics'
      totalVisitors: number
    } | null
  } | null
}

export type ProjectFundersQueryVariables = Exact<{
  input: GetFundersInput
}>

export type ProjectFundersQuery = {
  __typename?: 'Query'
  getFunders: Array<{
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
  }>
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
    user?: {
      __typename?: 'User'
      id: any
      username: string
      imageUrl?: string | null
    } | null
    fundingTxs: Array<{ __typename?: 'FundingTx'; email?: string | null }>
    rewards: Array<{
      __typename?: 'FunderReward'
      quantity: number
      projectReward: { __typename?: 'ProjectReward'; id: any; name: any }
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
  projects: {
    __typename?: 'ProjectsResponse'
    projects: Array<{ __typename?: 'Project' } & ProjectForLandingPageFragment>
  }
}

export type FeaturedProjectForLandingPageQueryVariables = Exact<{
  where: UniqueProjectQueryInput
}>

export type FeaturedProjectForLandingPageQuery = {
  __typename?: 'Query'
  project?: ({ __typename?: 'Project' } & ProjectForLandingPageFragment) | null
}

export type TagsGetQueryVariables = Exact<{ [key: string]: never }>

export type TagsGetQuery = {
  __typename?: 'Query'
  tagsGet: Array<{
    __typename?: 'TagsGetResult'
    label: string
    id: number
    count: number
  }>
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
  projectRegionsGet: Array<{
    __typename?: 'ProjectRegionsGetResult'
    count: number
    region: string
  }>
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id: any
    username: string
    imageUrl?: string | null
    email?: string | null
    externalAccounts: Array<{
      __typename?: 'ExternalAccount'
      id: any
      accountType: string
      externalUsername: string
      externalId: string
      public: boolean
    }>
    ownerOf: Array<{
      __typename?: 'OwnerOf'
      project?: {
        __typename?: 'Project'
        id: any
        name: any
        image?: string | null
        thumbnailImage?: string | null
        title: any
        status?: ProjectStatus | null
      } | null
    }>
  } | null
}

export type MeProjectFollowsQueryVariables = Exact<{ [key: string]: never }>

export type MeProjectFollowsQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    projectFollows: Array<{
      __typename?: 'Project'
      id: any
      title: any
      name: any
    }>
  } | null
}

export type UserProfileQueryVariables = Exact<{
  where: UserGetInput
}>

export type UserProfileQuery = {
  __typename?: 'Query'
  user: {
    __typename: 'User'
    id: any
    username: string
    bio?: string | null
    imageUrl?: string | null
    wallet?: {
      __typename?: 'Wallet'
      id: any
      connectionDetails:
        | {
            __typename?: 'LightningAddressConnectionDetails'
            lightningAddress: string
          }
        | { __typename?: 'LndConnectionDetailsPrivate' }
        | { __typename?: 'LndConnectionDetailsPublic' }
    } | null
    externalAccounts: Array<{
      __typename?: 'ExternalAccount'
      id: any
      accountType: string
      externalUsername: string
      externalId: string
      public: boolean
    }>
    contributions: Array<{
      __typename?: 'UserProjectContribution'
      isAmbassador: boolean
      isFunder: boolean
      isSponsor: boolean
      funder?: {
        __typename?: 'Funder'
        id: any
        amountFunded?: number | null
        timesFunded?: number | null
        confirmedAt?: any | null
      } | null
      project: {
        __typename?: 'Project'
        id: any
        title: any
        name: any
        description?: any | null
        media: Array<string>
        createdAt: string
        status?: ProjectStatus | null
      }
    }>
    ownerOf: Array<{
      __typename?: 'OwnerOf'
      project?: { __typename?: 'Project'; id: any } | null
    }>
    projectFollows: Array<{ __typename?: 'Project'; id: any }>
  }
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
      project?:
        | ({ __typename?: 'Project' } & ProjectForLandingPageFragment)
        | null
    }>
  }
}

export type UserFollowedProjectsQueryVariables = Exact<{
  where: UserGetInput
}>

export type UserFollowedProjectsQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    projectFollows: Array<
      { __typename?: 'Project' } & ProjectForLandingPageFragment
    >
  }
}

export type LightningAddressVerifyQueryVariables = Exact<{
  lightningAddress?: InputMaybe<Scalars['String']>
}>

export type LightningAddressVerifyQuery = {
  __typename?: 'Query'
  lightningAddressVerify: {
    __typename?: 'LightningAddressVerifyResponse'
    reason?: string | null
    valid: boolean
  }
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

export const UserForAvatarFragmentDoc = gql`
  fragment UserForAvatar on User {
    id
    imageUrl
    username
  }
`
export const EntryFragmentDoc = gql`
  fragment Entry on Entry {
    id
    title
    description
    image
    published
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
    invoiceId
    status
    onChain
    invoiceStatus
    invoiceStatus
    paymentRequest
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
    published
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
    fundingGoal
    createdAt
    updatedAt
    expiresAt
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
        id
        username
        imageUrl
      }
    }
    rewards {
      ...ProjectRewardForCreateUpdate
    }
    ambassadors {
      id
      confirmed
      user {
        id
        username
        imageUrl
      }
    }
    sponsors {
      id
      url
      image
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
        email
      }
      amountFunded
      confirmed
      confirmedAt
      timesFunded
    }
    milestones {
      id
      name
      description
      amount
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
  }
  ${ProjectRewardForCreateUpdateFragmentDoc}
  ${EntryForProjectFragmentDoc}
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
    createdAt
    fundersCount
    fundingTxsCount
    thumbnailImage
    shortDescription
    tags {
      id
      label
    }
    title
    status
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
export type UserBadgeAwardMutationFn = Apollo.MutationFunction<
  UserBadgeAwardMutation,
  UserBadgeAwardMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    UserBadgeAwardMutation,
    UserBadgeAwardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UserBadgeAwardMutation,
    UserBadgeAwardMutationVariables
  >(UserBadgeAwardDocument, options)
}
export type UserBadgeAwardMutationHookResult = ReturnType<
  typeof useUserBadgeAwardMutation
>
export type UserBadgeAwardMutationResult =
  Apollo.MutationResult<UserBadgeAwardMutation>
export type UserBadgeAwardMutationOptions = Apollo.BaseMutationOptions<
  UserBadgeAwardMutation,
  UserBadgeAwardMutationVariables
>
export const CreateEntryDocument = gql`
  mutation CreateEntry($input: CreateEntryInput!) {
    createEntry(input: $input) {
      id
      published
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
export type CreateEntryMutationFn = Apollo.MutationFunction<
  CreateEntryMutation,
  CreateEntryMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    CreateEntryMutation,
    CreateEntryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(
    CreateEntryDocument,
    options,
  )
}
export type CreateEntryMutationHookResult = ReturnType<
  typeof useCreateEntryMutation
>
export type CreateEntryMutationResult =
  Apollo.MutationResult<CreateEntryMutation>
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<
  CreateEntryMutation,
  CreateEntryMutationVariables
>
export const UpdateEntryDocument = gql`
  mutation UpdateEntry($input: UpdateEntryInput!) {
    updateEntry(input: $input) {
      id
      published
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
export type UpdateEntryMutationFn = Apollo.MutationFunction<
  UpdateEntryMutation,
  UpdateEntryMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEntryMutation,
    UpdateEntryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateEntryMutation, UpdateEntryMutationVariables>(
    UpdateEntryDocument,
    options,
  )
}
export type UpdateEntryMutationHookResult = ReturnType<
  typeof useUpdateEntryMutation
>
export type UpdateEntryMutationResult =
  Apollo.MutationResult<UpdateEntryMutation>
export type UpdateEntryMutationOptions = Apollo.BaseMutationOptions<
  UpdateEntryMutation,
  UpdateEntryMutationVariables
>
export const PublishEntryDocument = gql`
  mutation PublishEntry($id: BigInt!) {
    publishEntry(id: $id) {
      id
      published
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
export type PublishEntryMutationFn = Apollo.MutationFunction<
  PublishEntryMutation,
  PublishEntryMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    PublishEntryMutation,
    PublishEntryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    PublishEntryMutation,
    PublishEntryMutationVariables
  >(PublishEntryDocument, options)
}
export type PublishEntryMutationHookResult = ReturnType<
  typeof usePublishEntryMutation
>
export type PublishEntryMutationResult =
  Apollo.MutationResult<PublishEntryMutation>
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
export type DeleteEntryMutationFn = Apollo.MutationFunction<
  DeleteEntryMutation,
  DeleteEntryMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    DeleteEntryMutation,
    DeleteEntryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(
    DeleteEntryDocument,
    options,
  )
}
export type DeleteEntryMutationHookResult = ReturnType<
  typeof useDeleteEntryMutation
>
export type DeleteEntryMutationResult =
  Apollo.MutationResult<DeleteEntryMutation>
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<
  DeleteEntryMutation,
  DeleteEntryMutationVariables
>
export const FundDocument = gql`
  mutation Fund($input: FundingInput!) {
    fund(input: $input) {
      fundingTx {
        ...FundingTx
      }
      amountSummary {
        total
        donationAmount
        shippingCost
        rewardsCost
      }
    }
  }
  ${FundingTxFragmentDoc}
`
export type FundMutationFn = Apollo.MutationFunction<
  FundMutation,
  FundMutationVariables
>

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
export function useFundMutation(
  baseOptions?: Apollo.MutationHookOptions<FundMutation, FundMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<FundMutation, FundMutationVariables>(
    FundDocument,
    options,
  )
}
export type FundMutationHookResult = ReturnType<typeof useFundMutation>
export type FundMutationResult = Apollo.MutationResult<FundMutation>
export type FundMutationOptions = Apollo.BaseMutationOptions<
  FundMutation,
  FundMutationVariables
>
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
  baseOptions?: Apollo.MutationHookOptions<
    RefreshFundingInvoiceMutation,
    RefreshFundingInvoiceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RefreshFundingInvoiceMutation,
    RefreshFundingInvoiceMutationVariables
  >(RefreshFundingInvoiceDocument, options)
}
export type RefreshFundingInvoiceMutationHookResult = ReturnType<
  typeof useRefreshFundingInvoiceMutation
>
export type RefreshFundingInvoiceMutationResult =
  Apollo.MutationResult<RefreshFundingInvoiceMutation>
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
  baseOptions?: Apollo.MutationHookOptions<
    FundingInvoiceCancelMutation,
    FundingInvoiceCancelMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    FundingInvoiceCancelMutation,
    FundingInvoiceCancelMutationVariables
  >(FundingInvoiceCancelDocument, options)
}
export type FundingInvoiceCancelMutationHookResult = ReturnType<
  typeof useFundingInvoiceCancelMutation
>
export type FundingInvoiceCancelMutationResult =
  Apollo.MutationResult<FundingInvoiceCancelMutation>
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
export type GrantApplyMutationFn = Apollo.MutationFunction<
  GrantApplyMutation,
  GrantApplyMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    GrantApplyMutation,
    GrantApplyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<GrantApplyMutation, GrantApplyMutationVariables>(
    GrantApplyDocument,
    options,
  )
}
export type GrantApplyMutationHookResult = ReturnType<
  typeof useGrantApplyMutation
>
export type GrantApplyMutationResult = Apollo.MutationResult<GrantApplyMutation>
export type GrantApplyMutationOptions = Apollo.BaseMutationOptions<
  GrantApplyMutation,
  GrantApplyMutationVariables
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
export type CreateProjectMutationFn = Apollo.MutationFunction<
  CreateProjectMutation,
  CreateProjectMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CreateProjectDocument, options)
}
export type CreateProjectMutationHookResult = ReturnType<
  typeof useCreateProjectMutation
>
export type CreateProjectMutationResult =
  Apollo.MutationResult<CreateProjectMutation>
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
      expiresAt
    }
  }
`
export type UpdateProjectMutationFn = Apollo.MutationFunction<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UpdateProjectDocument, options)
}
export type UpdateProjectMutationHookResult = ReturnType<
  typeof useUpdateProjectMutation
>
export type UpdateProjectMutationResult =
  Apollo.MutationResult<UpdateProjectMutation>
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>
export const CreateProjectRewardDocument = gql`
  mutation CreateProjectReward($input: CreateProjectRewardInput!) {
    createProjectReward(input: $input) {
      ...ProjectRewardForCreateUpdate
    }
  }
  ${ProjectRewardForCreateUpdateFragmentDoc}
`
export type CreateProjectRewardMutationFn = Apollo.MutationFunction<
  CreateProjectRewardMutation,
  CreateProjectRewardMutationVariables
>

/**
 * __useCreateProjectRewardMutation__
 *
 * To run a mutation, you first call `useCreateProjectRewardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectRewardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectRewardMutation, { data, loading, error }] = useCreateProjectRewardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectRewardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProjectRewardMutation,
    CreateProjectRewardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateProjectRewardMutation,
    CreateProjectRewardMutationVariables
  >(CreateProjectRewardDocument, options)
}
export type CreateProjectRewardMutationHookResult = ReturnType<
  typeof useCreateProjectRewardMutation
>
export type CreateProjectRewardMutationResult =
  Apollo.MutationResult<CreateProjectRewardMutation>
export type CreateProjectRewardMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectRewardMutation,
  CreateProjectRewardMutationVariables
>
export const UpdateProjectRewardDocument = gql`
  mutation UpdateProjectReward($input: UpdateProjectRewardInput!) {
    updateProjectReward(input: $input) {
      ...ProjectRewardForCreateUpdate
    }
  }
  ${ProjectRewardForCreateUpdateFragmentDoc}
`
export type UpdateProjectRewardMutationFn = Apollo.MutationFunction<
  UpdateProjectRewardMutation,
  UpdateProjectRewardMutationVariables
>

/**
 * __useUpdateProjectRewardMutation__
 *
 * To run a mutation, you first call `useUpdateProjectRewardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectRewardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectRewardMutation, { data, loading, error }] = useUpdateProjectRewardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectRewardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProjectRewardMutation,
    UpdateProjectRewardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateProjectRewardMutation,
    UpdateProjectRewardMutationVariables
  >(UpdateProjectRewardDocument, options)
}
export type UpdateProjectRewardMutationHookResult = ReturnType<
  typeof useUpdateProjectRewardMutation
>
export type UpdateProjectRewardMutationResult =
  Apollo.MutationResult<UpdateProjectRewardMutation>
export type UpdateProjectRewardMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectRewardMutation,
  UpdateProjectRewardMutationVariables
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
  baseOptions?: Apollo.MutationHookOptions<
    CreateProjectMilestoneMutation,
    CreateProjectMilestoneMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateProjectMilestoneMutation,
    CreateProjectMilestoneMutationVariables
  >(CreateProjectMilestoneDocument, options)
}
export type CreateProjectMilestoneMutationHookResult = ReturnType<
  typeof useCreateProjectMilestoneMutation
>
export type CreateProjectMilestoneMutationResult =
  Apollo.MutationResult<CreateProjectMilestoneMutation>
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
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProjectMilestoneMutation,
    UpdateProjectMilestoneMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateProjectMilestoneMutation,
    UpdateProjectMilestoneMutationVariables
  >(UpdateProjectMilestoneDocument, options)
}
export type UpdateProjectMilestoneMutationHookResult = ReturnType<
  typeof useUpdateProjectMilestoneMutation
>
export type UpdateProjectMilestoneMutationResult =
  Apollo.MutationResult<UpdateProjectMilestoneMutation>
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
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProjectMilestoneMutation,
    DeleteProjectMilestoneMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteProjectMilestoneMutation,
    DeleteProjectMilestoneMutationVariables
  >(DeleteProjectMilestoneDocument, options)
}
export type DeleteProjectMilestoneMutationHookResult = ReturnType<
  typeof useDeleteProjectMilestoneMutation
>
export type DeleteProjectMilestoneMutationResult =
  Apollo.MutationResult<DeleteProjectMilestoneMutation>
export type DeleteProjectMilestoneMutationOptions = Apollo.BaseMutationOptions<
  DeleteProjectMilestoneMutation,
  DeleteProjectMilestoneMutationVariables
>
export const ProjectFollowDocument = gql`
  mutation ProjectFollow($input: ProjectFollowMutationInput!) {
    projectFollow(input: $input)
  }
`
export type ProjectFollowMutationFn = Apollo.MutationFunction<
  ProjectFollowMutation,
  ProjectFollowMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    ProjectFollowMutation,
    ProjectFollowMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ProjectFollowMutation,
    ProjectFollowMutationVariables
  >(ProjectFollowDocument, options)
}
export type ProjectFollowMutationHookResult = ReturnType<
  typeof useProjectFollowMutation
>
export type ProjectFollowMutationResult =
  Apollo.MutationResult<ProjectFollowMutation>
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
  baseOptions?: Apollo.MutationHookOptions<
    ProjectUnfollowMutation,
    ProjectUnfollowMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ProjectUnfollowMutation,
    ProjectUnfollowMutationVariables
  >(ProjectUnfollowDocument, options)
}
export type ProjectUnfollowMutationHookResult = ReturnType<
  typeof useProjectUnfollowMutation
>
export type ProjectUnfollowMutationResult =
  Apollo.MutationResult<ProjectUnfollowMutation>
export type ProjectUnfollowMutationOptions = Apollo.BaseMutationOptions<
  ProjectUnfollowMutation,
  ProjectUnfollowMutationVariables
>
export const ProjectTagAddDocument = gql`
  mutation ProjectTagAdd($input: ProjectTagMutationInput!) {
    projectTagAdd(input: $input) {
      id
      label
    }
  }
`
export type ProjectTagAddMutationFn = Apollo.MutationFunction<
  ProjectTagAddMutation,
  ProjectTagAddMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    ProjectTagAddMutation,
    ProjectTagAddMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ProjectTagAddMutation,
    ProjectTagAddMutationVariables
  >(ProjectTagAddDocument, options)
}
export type ProjectTagAddMutationHookResult = ReturnType<
  typeof useProjectTagAddMutation
>
export type ProjectTagAddMutationResult =
  Apollo.MutationResult<ProjectTagAddMutation>
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
  baseOptions?: Apollo.MutationHookOptions<
    ProjectTagRemoveMutation,
    ProjectTagRemoveMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ProjectTagRemoveMutation,
    ProjectTagRemoveMutationVariables
  >(ProjectTagRemoveDocument, options)
}
export type ProjectTagRemoveMutationHookResult = ReturnType<
  typeof useProjectTagRemoveMutation
>
export type ProjectTagRemoveMutationResult =
  Apollo.MutationResult<ProjectTagRemoveMutation>
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
  baseOptions?: Apollo.MutationHookOptions<
    ProjectTagCreateMutation,
    ProjectTagCreateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ProjectTagCreateMutation,
    ProjectTagCreateMutationVariables
  >(ProjectTagCreateDocument, options)
}
export type ProjectTagCreateMutationHookResult = ReturnType<
  typeof useProjectTagCreateMutation
>
export type ProjectTagCreateMutationResult =
  Apollo.MutationResult<ProjectTagCreateMutation>
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
  baseOptions?: Apollo.MutationHookOptions<
    UnlinkExternalAccountMutation,
    UnlinkExternalAccountMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UnlinkExternalAccountMutation,
    UnlinkExternalAccountMutationVariables
  >(UnlinkExternalAccountDocument, options)
}
export type UnlinkExternalAccountMutationHookResult = ReturnType<
  typeof useUnlinkExternalAccountMutation
>
export type UnlinkExternalAccountMutationResult =
  Apollo.MutationResult<UnlinkExternalAccountMutation>
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
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  )
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const CreateWalletDocument = gql`
  mutation CreateWallet($input: CreateWalletInput!) {
    createWallet(input: $input) {
      id
      name
    }
  }
`
export type CreateWalletMutationFn = Apollo.MutationFunction<
  CreateWalletMutation,
  CreateWalletMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    CreateWalletMutation,
    CreateWalletMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateWalletMutation,
    CreateWalletMutationVariables
  >(CreateWalletDocument, options)
}
export type CreateWalletMutationHookResult = ReturnType<
  typeof useCreateWalletMutation
>
export type CreateWalletMutationResult =
  Apollo.MutationResult<CreateWalletMutation>
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
export type UpdateWalletMutationFn = Apollo.MutationFunction<
  UpdateWalletMutation,
  UpdateWalletMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    UpdateWalletMutation,
    UpdateWalletMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateWalletMutation,
    UpdateWalletMutationVariables
  >(UpdateWalletDocument, options)
}
export type UpdateWalletMutationHookResult = ReturnType<
  typeof useUpdateWalletMutation
>
export type UpdateWalletMutationResult =
  Apollo.MutationResult<UpdateWalletMutation>
export type UpdateWalletMutationOptions = Apollo.BaseMutationOptions<
  UpdateWalletMutation,
  UpdateWalletMutationVariables
>
export const WalletDeleteDocument = gql`
  mutation WalletDelete($walletId: BigInt!) {
    walletDelete(id: $walletId)
  }
`
export type WalletDeleteMutationFn = Apollo.MutationFunction<
  WalletDeleteMutation,
  WalletDeleteMutationVariables
>

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
  baseOptions?: Apollo.MutationHookOptions<
    WalletDeleteMutation,
    WalletDeleteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    WalletDeleteMutation,
    WalletDeleteMutationVariables
  >(WalletDeleteDocument, options)
}
export type WalletDeleteMutationHookResult = ReturnType<
  typeof useWalletDeleteMutation
>
export type WalletDeleteMutationResult =
  Apollo.MutationResult<WalletDeleteMutation>
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
  baseOptions?: Apollo.QueryHookOptions<
    ActivitiesForLandingPageQuery,
    ActivitiesForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ActivitiesForLandingPageQuery,
    ActivitiesForLandingPageQueryVariables
  >(ActivitiesForLandingPageDocument, options)
}
export function useActivitiesForLandingPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ActivitiesForLandingPageQuery,
    ActivitiesForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ActivitiesForLandingPageQuery,
    ActivitiesForLandingPageQueryVariables
  >(ActivitiesForLandingPageDocument, options)
}
export type ActivitiesForLandingPageQueryHookResult = ReturnType<
  typeof useActivitiesForLandingPageQuery
>
export type ActivitiesForLandingPageLazyQueryHookResult = ReturnType<
  typeof useActivitiesForLandingPageLazyQuery
>
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
export function useBadgesQuery(
  baseOptions?: Apollo.QueryHookOptions<BadgesQuery, BadgesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<BadgesQuery, BadgesQueryVariables>(
    BadgesDocument,
    options,
  )
}
export function useBadgesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BadgesQuery, BadgesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<BadgesQuery, BadgesQueryVariables>(
    BadgesDocument,
    options,
  )
}
export type BadgesQueryHookResult = ReturnType<typeof useBadgesQuery>
export type BadgesLazyQueryHookResult = ReturnType<typeof useBadgesLazyQuery>
export type BadgesQueryResult = Apollo.QueryResult<
  BadgesQuery,
  BadgesQueryVariables
>
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
export function useUserBadgesQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserBadgesQuery,
    UserBadgesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserBadgesQuery, UserBadgesQueryVariables>(
    UserBadgesDocument,
    options,
  )
}
export function useUserBadgesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserBadgesQuery,
    UserBadgesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserBadgesQuery, UserBadgesQueryVariables>(
    UserBadgesDocument,
    options,
  )
}
export type UserBadgesQueryHookResult = ReturnType<typeof useUserBadgesQuery>
export type UserBadgesLazyQueryHookResult = ReturnType<
  typeof useUserBadgesLazyQuery
>
export type UserBadgesQueryResult = Apollo.QueryResult<
  UserBadgesQuery,
  UserBadgesQueryVariables
>
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
export function useEntryQuery(
  baseOptions: Apollo.QueryHookOptions<EntryQuery, EntryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EntryQuery, EntryQueryVariables>(
    EntryDocument,
    options,
  )
}
export function useEntryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EntryQuery, EntryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<EntryQuery, EntryQueryVariables>(
    EntryDocument,
    options,
  )
}
export type EntryQueryHookResult = ReturnType<typeof useEntryQuery>
export type EntryLazyQueryHookResult = ReturnType<typeof useEntryLazyQuery>
export type EntryQueryResult = Apollo.QueryResult<
  EntryQuery,
  EntryQueryVariables
>
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
  baseOptions: Apollo.QueryHookOptions<
    EntryForLandingPageQuery,
    EntryForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    EntryForLandingPageQuery,
    EntryForLandingPageQueryVariables
  >(EntryForLandingPageDocument, options)
}
export function useEntryForLandingPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EntryForLandingPageQuery,
    EntryForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    EntryForLandingPageQuery,
    EntryForLandingPageQueryVariables
  >(EntryForLandingPageDocument, options)
}
export type EntryForLandingPageQueryHookResult = ReturnType<
  typeof useEntryForLandingPageQuery
>
export type EntryForLandingPageLazyQueryHookResult = ReturnType<
  typeof useEntryForLandingPageLazyQuery
>
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
      published
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
  baseOptions: Apollo.QueryHookOptions<
    EntryWithOwnersQuery,
    EntryWithOwnersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EntryWithOwnersQuery, EntryWithOwnersQueryVariables>(
    EntryWithOwnersDocument,
    options,
  )
}
export function useEntryWithOwnersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EntryWithOwnersQuery,
    EntryWithOwnersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    EntryWithOwnersQuery,
    EntryWithOwnersQueryVariables
  >(EntryWithOwnersDocument, options)
}
export type EntryWithOwnersQueryHookResult = ReturnType<
  typeof useEntryWithOwnersQuery
>
export type EntryWithOwnersLazyQueryHookResult = ReturnType<
  typeof useEntryWithOwnersLazyQuery
>
export type EntryWithOwnersQueryResult = Apollo.QueryResult<
  EntryWithOwnersQuery,
  EntryWithOwnersQueryVariables
>
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
      published
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
export function useEntriesQuery(
  baseOptions: Apollo.QueryHookOptions<EntriesQuery, EntriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EntriesQuery, EntriesQueryVariables>(
    EntriesDocument,
    options,
  )
}
export function useEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EntriesQuery,
    EntriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<EntriesQuery, EntriesQueryVariables>(
    EntriesDocument,
    options,
  )
}
export type EntriesQueryHookResult = ReturnType<typeof useEntriesQuery>
export type EntriesLazyQueryHookResult = ReturnType<typeof useEntriesLazyQuery>
export type EntriesQueryResult = Apollo.QueryResult<
  EntriesQuery,
  EntriesQueryVariables
>
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
  baseOptions: Apollo.QueryHookOptions<
    SignedUploadUrlQuery,
    SignedUploadUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>(
    SignedUploadUrlDocument,
    options,
  )
}
export function useSignedUploadUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SignedUploadUrlQuery,
    SignedUploadUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    SignedUploadUrlQuery,
    SignedUploadUrlQueryVariables
  >(SignedUploadUrlDocument, options)
}
export type SignedUploadUrlQueryHookResult = ReturnType<
  typeof useSignedUploadUrlQuery
>
export type SignedUploadUrlLazyQueryHookResult = ReturnType<
  typeof useSignedUploadUrlLazyQuery
>
export type SignedUploadUrlQueryResult = Apollo.QueryResult<
  SignedUploadUrlQuery,
  SignedUploadUrlQueryVariables
>
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
  baseOptions: Apollo.QueryHookOptions<
    GetFundingTxQuery,
    GetFundingTxQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFundingTxQuery, GetFundingTxQueryVariables>(
    GetFundingTxDocument,
    options,
  )
}
export function useGetFundingTxLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFundingTxQuery,
    GetFundingTxQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFundingTxQuery, GetFundingTxQueryVariables>(
    GetFundingTxDocument,
    options,
  )
}
export type GetFundingTxQueryHookResult = ReturnType<
  typeof useGetFundingTxQuery
>
export type GetFundingTxLazyQueryHookResult = ReturnType<
  typeof useGetFundingTxLazyQuery
>
export type GetFundingTxQueryResult = Apollo.QueryResult<
  GetFundingTxQuery,
  GetFundingTxQueryVariables
>
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
  baseOptions: Apollo.QueryHookOptions<
    FundingTxWithInvoiceStatusQuery,
    FundingTxWithInvoiceStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    FundingTxWithInvoiceStatusQuery,
    FundingTxWithInvoiceStatusQueryVariables
  >(FundingTxWithInvoiceStatusDocument, options)
}
export function useFundingTxWithInvoiceStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FundingTxWithInvoiceStatusQuery,
    FundingTxWithInvoiceStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    FundingTxWithInvoiceStatusQuery,
    FundingTxWithInvoiceStatusQueryVariables
  >(FundingTxWithInvoiceStatusDocument, options)
}
export type FundingTxWithInvoiceStatusQueryHookResult = ReturnType<
  typeof useFundingTxWithInvoiceStatusQuery
>
export type FundingTxWithInvoiceStatusLazyQueryHookResult = ReturnType<
  typeof useFundingTxWithInvoiceStatusLazyQuery
>
export type FundingTxWithInvoiceStatusQueryResult = Apollo.QueryResult<
  FundingTxWithInvoiceStatusQuery,
  FundingTxWithInvoiceStatusQueryVariables
>
export const FundingTxsForLandingPageDocument = gql`
  query FundingTxsForLandingPage($input: GetFundingTxsInput) {
    getFundingTxs(input: $input) {
      ...FundingTxForLandingPage
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
  baseOptions?: Apollo.QueryHookOptions<
    FundingTxsForLandingPageQuery,
    FundingTxsForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    FundingTxsForLandingPageQuery,
    FundingTxsForLandingPageQueryVariables
  >(FundingTxsForLandingPageDocument, options)
}
export function useFundingTxsForLandingPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FundingTxsForLandingPageQuery,
    FundingTxsForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    FundingTxsForLandingPageQuery,
    FundingTxsForLandingPageQueryVariables
  >(FundingTxsForLandingPageDocument, options)
}
export type FundingTxsForLandingPageQueryHookResult = ReturnType<
  typeof useFundingTxsForLandingPageQuery
>
export type FundingTxsForLandingPageLazyQueryHookResult = ReturnType<
  typeof useFundingTxsForLandingPageLazyQuery
>
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
  baseOptions: Apollo.QueryHookOptions<
    FundingTxForUserContributionQuery,
    FundingTxForUserContributionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    FundingTxForUserContributionQuery,
    FundingTxForUserContributionQueryVariables
  >(FundingTxForUserContributionDocument, options)
}
export function useFundingTxForUserContributionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FundingTxForUserContributionQuery,
    FundingTxForUserContributionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    FundingTxForUserContributionQuery,
    FundingTxForUserContributionQueryVariables
  >(FundingTxForUserContributionDocument, options)
}
export type FundingTxForUserContributionQueryHookResult = ReturnType<
  typeof useFundingTxForUserContributionQuery
>
export type FundingTxForUserContributionLazyQueryHookResult = ReturnType<
  typeof useFundingTxForUserContributionLazyQuery
>
export type FundingTxForUserContributionQueryResult = Apollo.QueryResult<
  FundingTxForUserContributionQuery,
  FundingTxForUserContributionQueryVariables
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
export function useGrantsQuery(
  baseOptions?: Apollo.QueryHookOptions<GrantsQuery, GrantsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GrantsQuery, GrantsQueryVariables>(
    GrantsDocument,
    options,
  )
}
export function useGrantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GrantsQuery, GrantsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GrantsQuery, GrantsQueryVariables>(
    GrantsDocument,
    options,
  )
}
export type GrantsQueryHookResult = ReturnType<typeof useGrantsQuery>
export type GrantsLazyQueryHookResult = ReturnType<typeof useGrantsLazyQuery>
export type GrantsQueryResult = Apollo.QueryResult<
  GrantsQuery,
  GrantsQueryVariables
>
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
export function useGrantQuery(
  baseOptions: Apollo.QueryHookOptions<GrantQuery, GrantQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GrantQuery, GrantQueryVariables>(
    GrantDocument,
    options,
  )
}
export function useGrantLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GrantQuery, GrantQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GrantQuery, GrantQueryVariables>(
    GrantDocument,
    options,
  )
}
export type GrantQueryHookResult = ReturnType<typeof useGrantQuery>
export type GrantLazyQueryHookResult = ReturnType<typeof useGrantLazyQuery>
export type GrantQueryResult = Apollo.QueryResult<
  GrantQuery,
  GrantQueryVariables
>
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
  baseOptions?: Apollo.QueryHookOptions<
    GrantStatisticsQuery,
    GrantStatisticsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GrantStatisticsQuery, GrantStatisticsQueryVariables>(
    GrantStatisticsDocument,
    options,
  )
}
export function useGrantStatisticsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GrantStatisticsQuery,
    GrantStatisticsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GrantStatisticsQuery,
    GrantStatisticsQueryVariables
  >(GrantStatisticsDocument, options)
}
export type GrantStatisticsQueryHookResult = ReturnType<
  typeof useGrantStatisticsQuery
>
export type GrantStatisticsLazyQueryHookResult = ReturnType<
  typeof useGrantStatisticsLazyQuery
>
export type GrantStatisticsQueryResult = Apollo.QueryResult<
  GrantStatisticsQuery,
  GrantStatisticsQueryVariables
>
export const ProjectByNameOrIdDocument = gql`
  query ProjectByNameOrId(
    $where: UniqueProjectQueryInput!
    $input: ProjectEntriesGetInput
  ) {
    project(where: $where) {
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
  baseOptions: Apollo.QueryHookOptions<
    ProjectByNameOrIdQuery,
    ProjectByNameOrIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ProjectByNameOrIdQuery,
    ProjectByNameOrIdQueryVariables
  >(ProjectByNameOrIdDocument, options)
}
export function useProjectByNameOrIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectByNameOrIdQuery,
    ProjectByNameOrIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ProjectByNameOrIdQuery,
    ProjectByNameOrIdQueryVariables
  >(ProjectByNameOrIdDocument, options)
}
export type ProjectByNameOrIdQueryHookResult = ReturnType<
  typeof useProjectByNameOrIdQuery
>
export type ProjectByNameOrIdLazyQueryHookResult = ReturnType<
  typeof useProjectByNameOrIdLazyQuery
>
export type ProjectByNameOrIdQueryResult = Apollo.QueryResult<
  ProjectByNameOrIdQuery,
  ProjectByNameOrIdQueryVariables
>
export const ProjectFundingDataDocument = gql`
  query ProjectFundingData($where: UniqueProjectQueryInput!) {
    project(where: $where) {
      funders {
        id
        user {
          id
          username
          imageUrl
        }
        amountFunded
        timesFunded
        confirmedAt
      }
    }
  }
`

/**
 * __useProjectFundingDataQuery__
 *
 * To run a query within a React component, call `useProjectFundingDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectFundingDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectFundingDataQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectFundingDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    ProjectFundingDataQuery,
    ProjectFundingDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ProjectFundingDataQuery,
    ProjectFundingDataQueryVariables
  >(ProjectFundingDataDocument, options)
}
export function useProjectFundingDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectFundingDataQuery,
    ProjectFundingDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ProjectFundingDataQuery,
    ProjectFundingDataQueryVariables
  >(ProjectFundingDataDocument, options)
}
export type ProjectFundingDataQueryHookResult = ReturnType<
  typeof useProjectFundingDataQuery
>
export type ProjectFundingDataLazyQueryHookResult = ReturnType<
  typeof useProjectFundingDataLazyQuery
>
export type ProjectFundingDataQueryResult = Apollo.QueryResult<
  ProjectFundingDataQuery,
  ProjectFundingDataQueryVariables
>
export const ProjectsDocument = gql`
  query Projects($input: ProjectsGetQueryInput) {
    projects(input: $input) {
      projects {
        id
        title
        name
        description
        balance
        fundingGoal
        createdAt
        expiresAt
        status
        media
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
export function useProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  )
}
export function useProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsQuery,
    ProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  )
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>
export type ProjectsLazyQueryHookResult = ReturnType<
  typeof useProjectsLazyQuery
>
export type ProjectsQueryResult = Apollo.QueryResult<
  ProjectsQuery,
  ProjectsQueryVariables
>
export const ProjectsFullDocument = gql`
  query ProjectsFull($input: ProjectsGetQueryInput) {
    projects(input: $input) {
      projects {
        id
        title
        name
        type
        shortDescription
        description
        balance
        fundingGoal
        createdAt
        updatedAt
        expiresAt
        thumbnailImage
        image
        status
        media
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
  baseOptions?: Apollo.QueryHookOptions<
    ProjectsFullQuery,
    ProjectsFullQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsFullQuery, ProjectsFullQueryVariables>(
    ProjectsFullDocument,
    options,
  )
}
export function useProjectsFullLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsFullQuery,
    ProjectsFullQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsFullQuery, ProjectsFullQueryVariables>(
    ProjectsFullDocument,
    options,
  )
}
export type ProjectsFullQueryHookResult = ReturnType<
  typeof useProjectsFullQuery
>
export type ProjectsFullLazyQueryHookResult = ReturnType<
  typeof useProjectsFullLazyQuery
>
export type ProjectsFullQueryResult = Apollo.QueryResult<
  ProjectsFullQuery,
  ProjectsFullQueryVariables
>
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
  baseOptions?: Apollo.QueryHookOptions<
    ProjectsSummaryQuery,
    ProjectsSummaryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>(
    ProjectsSummaryDocument,
    options,
  )
}
export function useProjectsSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsSummaryQuery,
    ProjectsSummaryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ProjectsSummaryQuery,
    ProjectsSummaryQueryVariables
  >(ProjectsSummaryDocument, options)
}
export type ProjectsSummaryQueryHookResult = ReturnType<
  typeof useProjectsSummaryQuery
>
export type ProjectsSummaryLazyQueryHookResult = ReturnType<
  typeof useProjectsSummaryLazyQuery
>
export type ProjectsSummaryQueryResult = Apollo.QueryResult<
  ProjectsSummaryQuery,
  ProjectsSummaryQueryVariables
>
export const ProjectUnplublishedEntriesDocument = gql`
  query ProjectUnplublishedEntries($where: UniqueProjectQueryInput!) {
    project(where: $where) {
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
  baseOptions: Apollo.QueryHookOptions<
    ProjectUnplublishedEntriesQuery,
    ProjectUnplublishedEntriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ProjectUnplublishedEntriesQuery,
    ProjectUnplublishedEntriesQueryVariables
  >(ProjectUnplublishedEntriesDocument, options)
}
export function useProjectUnplublishedEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectUnplublishedEntriesQuery,
    ProjectUnplublishedEntriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ProjectUnplublishedEntriesQuery,
    ProjectUnplublishedEntriesQueryVariables
  >(ProjectUnplublishedEntriesDocument, options)
}
export type ProjectUnplublishedEntriesQueryHookResult = ReturnType<
  typeof useProjectUnplublishedEntriesQuery
>
export type ProjectUnplublishedEntriesLazyQueryHookResult = ReturnType<
  typeof useProjectUnplublishedEntriesLazyQuery
>
export type ProjectUnplublishedEntriesQueryResult = Apollo.QueryResult<
  ProjectUnplublishedEntriesQuery,
  ProjectUnplublishedEntriesQueryVariables
>
export const ProjectDashboardDataDocument = gql`
  query ProjectDashboardData($where: UniqueProjectQueryInput!) {
    project(where: $where) {
      unpublishedEntries: entries(input: { where: { published: false } }) {
        ...EntryForProject
      }
      publishedEntries: entries(input: { where: { published: true } }) {
        ...EntryForProject
      }
      statistics {
        totalVisitors
      }
    }
  }
  ${EntryForProjectFragmentDoc}
`

/**
 * __useProjectDashboardDataQuery__
 *
 * To run a query within a React component, call `useProjectDashboardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDashboardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDashboardDataQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectDashboardDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    ProjectDashboardDataQuery,
    ProjectDashboardDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ProjectDashboardDataQuery,
    ProjectDashboardDataQueryVariables
  >(ProjectDashboardDataDocument, options)
}
export function useProjectDashboardDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectDashboardDataQuery,
    ProjectDashboardDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ProjectDashboardDataQuery,
    ProjectDashboardDataQueryVariables
  >(ProjectDashboardDataDocument, options)
}
export type ProjectDashboardDataQueryHookResult = ReturnType<
  typeof useProjectDashboardDataQuery
>
export type ProjectDashboardDataLazyQueryHookResult = ReturnType<
  typeof useProjectDashboardDataLazyQuery
>
export type ProjectDashboardDataQueryResult = Apollo.QueryResult<
  ProjectDashboardDataQuery,
  ProjectDashboardDataQueryVariables
>
export const ProjectFundersDocument = gql`
  query ProjectFunders($input: GetFundersInput!) {
    getFunders(input: $input) {
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
  }
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
  baseOptions: Apollo.QueryHookOptions<
    ProjectFundersQuery,
    ProjectFundersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectFundersQuery, ProjectFundersQueryVariables>(
    ProjectFundersDocument,
    options,
  )
}
export function useProjectFundersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectFundersQuery,
    ProjectFundersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectFundersQuery, ProjectFundersQueryVariables>(
    ProjectFundersDocument,
    options,
  )
}
export type ProjectFundersQueryHookResult = ReturnType<
  typeof useProjectFundersQuery
>
export type ProjectFundersLazyQueryHookResult = ReturnType<
  typeof useProjectFundersLazyQuery
>
export type ProjectFundersQueryResult = Apollo.QueryResult<
  ProjectFundersQuery,
  ProjectFundersQueryVariables
>
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
  baseOptions?: Apollo.QueryHookOptions<
    ProjectDashboardFundersQuery,
    ProjectDashboardFundersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ProjectDashboardFundersQuery,
    ProjectDashboardFundersQueryVariables
  >(ProjectDashboardFundersDocument, options)
}
export function useProjectDashboardFundersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectDashboardFundersQuery,
    ProjectDashboardFundersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ProjectDashboardFundersQuery,
    ProjectDashboardFundersQueryVariables
  >(ProjectDashboardFundersDocument, options)
}
export type ProjectDashboardFundersQueryHookResult = ReturnType<
  typeof useProjectDashboardFundersQuery
>
export type ProjectDashboardFundersLazyQueryHookResult = ReturnType<
  typeof useProjectDashboardFundersLazyQuery
>
export type ProjectDashboardFundersQueryResult = Apollo.QueryResult<
  ProjectDashboardFundersQuery,
  ProjectDashboardFundersQueryVariables
>
export const ProjectsMostFundedOfTheWeekGetDocument = gql`
  query ProjectsMostFundedOfTheWeekGet(
    $input: GetProjectsMostFundedOfTheWeekInput
  ) {
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
  return Apollo.useQuery<
    ProjectsMostFundedOfTheWeekGetQuery,
    ProjectsMostFundedOfTheWeekGetQueryVariables
  >(ProjectsMostFundedOfTheWeekGetDocument, options)
}
export function useProjectsMostFundedOfTheWeekGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsMostFundedOfTheWeekGetQuery,
    ProjectsMostFundedOfTheWeekGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ProjectsMostFundedOfTheWeekGetQuery,
    ProjectsMostFundedOfTheWeekGetQueryVariables
  >(ProjectsMostFundedOfTheWeekGetDocument, options)
}
export type ProjectsMostFundedOfTheWeekGetQueryHookResult = ReturnType<
  typeof useProjectsMostFundedOfTheWeekGetQuery
>
export type ProjectsMostFundedOfTheWeekGetLazyQueryHookResult = ReturnType<
  typeof useProjectsMostFundedOfTheWeekGetLazyQuery
>
export type ProjectsMostFundedOfTheWeekGetQueryResult = Apollo.QueryResult<
  ProjectsMostFundedOfTheWeekGetQuery,
  ProjectsMostFundedOfTheWeekGetQueryVariables
>
export const ProjectsForLandingPageDocument = gql`
  query ProjectsForLandingPage($input: ProjectsGetQueryInput) {
    projects(input: $input) {
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
  baseOptions?: Apollo.QueryHookOptions<
    ProjectsForLandingPageQuery,
    ProjectsForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ProjectsForLandingPageQuery,
    ProjectsForLandingPageQueryVariables
  >(ProjectsForLandingPageDocument, options)
}
export function useProjectsForLandingPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsForLandingPageQuery,
    ProjectsForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ProjectsForLandingPageQuery,
    ProjectsForLandingPageQueryVariables
  >(ProjectsForLandingPageDocument, options)
}
export type ProjectsForLandingPageQueryHookResult = ReturnType<
  typeof useProjectsForLandingPageQuery
>
export type ProjectsForLandingPageLazyQueryHookResult = ReturnType<
  typeof useProjectsForLandingPageLazyQuery
>
export type ProjectsForLandingPageQueryResult = Apollo.QueryResult<
  ProjectsForLandingPageQuery,
  ProjectsForLandingPageQueryVariables
>
export const FeaturedProjectForLandingPageDocument = gql`
  query FeaturedProjectForLandingPage($where: UniqueProjectQueryInput!) {
    project(where: $where) {
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
  baseOptions: Apollo.QueryHookOptions<
    FeaturedProjectForLandingPageQuery,
    FeaturedProjectForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    FeaturedProjectForLandingPageQuery,
    FeaturedProjectForLandingPageQueryVariables
  >(FeaturedProjectForLandingPageDocument, options)
}
export function useFeaturedProjectForLandingPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FeaturedProjectForLandingPageQuery,
    FeaturedProjectForLandingPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    FeaturedProjectForLandingPageQuery,
    FeaturedProjectForLandingPageQueryVariables
  >(FeaturedProjectForLandingPageDocument, options)
}
export type FeaturedProjectForLandingPageQueryHookResult = ReturnType<
  typeof useFeaturedProjectForLandingPageQuery
>
export type FeaturedProjectForLandingPageLazyQueryHookResult = ReturnType<
  typeof useFeaturedProjectForLandingPageLazyQuery
>
export type FeaturedProjectForLandingPageQueryResult = Apollo.QueryResult<
  FeaturedProjectForLandingPageQuery,
  FeaturedProjectForLandingPageQueryVariables
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
export function useTagsGetQuery(
  baseOptions?: Apollo.QueryHookOptions<TagsGetQuery, TagsGetQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TagsGetQuery, TagsGetQueryVariables>(
    TagsGetDocument,
    options,
  )
}
export function useTagsGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TagsGetQuery,
    TagsGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TagsGetQuery, TagsGetQueryVariables>(
    TagsGetDocument,
    options,
  )
}
export type TagsGetQueryHookResult = ReturnType<typeof useTagsGetQuery>
export type TagsGetLazyQueryHookResult = ReturnType<typeof useTagsGetLazyQuery>
export type TagsGetQueryResult = Apollo.QueryResult<
  TagsGetQuery,
  TagsGetQueryVariables
>
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
  baseOptions?: Apollo.QueryHookOptions<
    ProjectCountriesGetQuery,
    ProjectCountriesGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ProjectCountriesGetQuery,
    ProjectCountriesGetQueryVariables
  >(ProjectCountriesGetDocument, options)
}
export function useProjectCountriesGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectCountriesGetQuery,
    ProjectCountriesGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ProjectCountriesGetQuery,
    ProjectCountriesGetQueryVariables
  >(ProjectCountriesGetDocument, options)
}
export type ProjectCountriesGetQueryHookResult = ReturnType<
  typeof useProjectCountriesGetQuery
>
export type ProjectCountriesGetLazyQueryHookResult = ReturnType<
  typeof useProjectCountriesGetLazyQuery
>
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
  baseOptions?: Apollo.QueryHookOptions<
    ProjectRegionsGetQuery,
    ProjectRegionsGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ProjectRegionsGetQuery,
    ProjectRegionsGetQueryVariables
  >(ProjectRegionsGetDocument, options)
}
export function useProjectRegionsGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectRegionsGetQuery,
    ProjectRegionsGetQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ProjectRegionsGetQuery,
    ProjectRegionsGetQueryVariables
  >(ProjectRegionsGetDocument, options)
}
export type ProjectRegionsGetQueryHookResult = ReturnType<
  typeof useProjectRegionsGetQuery
>
export type ProjectRegionsGetLazyQueryHookResult = ReturnType<
  typeof useProjectRegionsGetLazyQuery
>
export type ProjectRegionsGetQueryResult = Apollo.QueryResult<
  ProjectRegionsGetQuery,
  ProjectRegionsGetQueryVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      username
      imageUrl
      email
      externalAccounts {
        id
        accountType
        externalUsername
        externalId
        public
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
  }
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
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
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
  baseOptions?: Apollo.QueryHookOptions<
    MeProjectFollowsQuery,
    MeProjectFollowsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>(
    MeProjectFollowsDocument,
    options,
  )
}
export function useMeProjectFollowsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MeProjectFollowsQuery,
    MeProjectFollowsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    MeProjectFollowsQuery,
    MeProjectFollowsQueryVariables
  >(MeProjectFollowsDocument, options)
}
export type MeProjectFollowsQueryHookResult = ReturnType<
  typeof useMeProjectFollowsQuery
>
export type MeProjectFollowsLazyQueryHookResult = ReturnType<
  typeof useMeProjectFollowsLazyQuery
>
export type MeProjectFollowsQueryResult = Apollo.QueryResult<
  MeProjectFollowsQuery,
  MeProjectFollowsQueryVariables
>
export const UserProfileDocument = gql`
  query UserProfile($where: UserGetInput!) {
    user(where: $where) {
      __typename
      id
      username
      bio
      imageUrl
      wallet {
        id
        connectionDetails {
          ... on LightningAddressConnectionDetails {
            lightningAddress
          }
        }
      }
      externalAccounts {
        id
        accountType
        externalUsername
        externalId
        public
      }
      contributions {
        isAmbassador
        isFunder
        isSponsor
        funder {
          id
          amountFunded
          timesFunded
          confirmedAt
        }
        project {
          id
          title
          name
          description
          media
          createdAt
          status
        }
      }
      ownerOf {
        project {
          id
        }
      }
      projectFollows {
        id
      }
    }
  }
`

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserProfileQuery,
    UserProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    options,
  )
}
export function useUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserProfileQuery,
    UserProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    options,
  )
}
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>
export type UserProfileLazyQueryHookResult = ReturnType<
  typeof useUserProfileLazyQuery
>
export type UserProfileQueryResult = Apollo.QueryResult<
  UserProfileQuery,
  UserProfileQueryVariables
>
export const UserProfileProjectsDocument = gql`
  query UserProfileProjects($where: UserGetInput!) {
    user(where: $where) {
      ownerOf {
        project {
          ...ProjectForLandingPage
        }
      }
    }
  }
  ${ProjectForLandingPageFragmentDoc}
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
  baseOptions: Apollo.QueryHookOptions<
    UserProfileProjectsQuery,
    UserProfileProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    UserProfileProjectsQuery,
    UserProfileProjectsQueryVariables
  >(UserProfileProjectsDocument, options)
}
export function useUserProfileProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserProfileProjectsQuery,
    UserProfileProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    UserProfileProjectsQuery,
    UserProfileProjectsQueryVariables
  >(UserProfileProjectsDocument, options)
}
export type UserProfileProjectsQueryHookResult = ReturnType<
  typeof useUserProfileProjectsQuery
>
export type UserProfileProjectsLazyQueryHookResult = ReturnType<
  typeof useUserProfileProjectsLazyQuery
>
export type UserProfileProjectsQueryResult = Apollo.QueryResult<
  UserProfileProjectsQuery,
  UserProfileProjectsQueryVariables
>
export const UserFollowedProjectsDocument = gql`
  query UserFollowedProjects($where: UserGetInput!) {
    user(where: $where) {
      projectFollows {
        ...ProjectForLandingPage
      }
    }
  }
  ${ProjectForLandingPageFragmentDoc}
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
  baseOptions: Apollo.QueryHookOptions<
    UserFollowedProjectsQuery,
    UserFollowedProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    UserFollowedProjectsQuery,
    UserFollowedProjectsQueryVariables
  >(UserFollowedProjectsDocument, options)
}
export function useUserFollowedProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserFollowedProjectsQuery,
    UserFollowedProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    UserFollowedProjectsQuery,
    UserFollowedProjectsQueryVariables
  >(UserFollowedProjectsDocument, options)
}
export type UserFollowedProjectsQueryHookResult = ReturnType<
  typeof useUserFollowedProjectsQuery
>
export type UserFollowedProjectsLazyQueryHookResult = ReturnType<
  typeof useUserFollowedProjectsLazyQuery
>
export type UserFollowedProjectsQueryResult = Apollo.QueryResult<
  UserFollowedProjectsQuery,
  UserFollowedProjectsQueryVariables
>
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
  baseOptions?: Apollo.QueryHookOptions<
    LightningAddressVerifyQuery,
    LightningAddressVerifyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    LightningAddressVerifyQuery,
    LightningAddressVerifyQueryVariables
  >(LightningAddressVerifyDocument, options)
}
export function useLightningAddressVerifyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LightningAddressVerifyQuery,
    LightningAddressVerifyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    LightningAddressVerifyQuery,
    LightningAddressVerifyQueryVariables
  >(LightningAddressVerifyDocument, options)
}
export type LightningAddressVerifyQueryHookResult = ReturnType<
  typeof useLightningAddressVerifyQuery
>
export type LightningAddressVerifyLazyQueryHookResult = ReturnType<
  typeof useLightningAddressVerifyLazyQuery
>
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
  baseOptions?: Apollo.SubscriptionHookOptions<
    ActivityCreatedSubscription,
    ActivityCreatedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    ActivityCreatedSubscription,
    ActivityCreatedSubscriptionVariables
  >(ActivityCreatedDocument, options)
}
export type ActivityCreatedSubscriptionHookResult = ReturnType<
  typeof useActivityCreatedSubscription
>
export type ActivityCreatedSubscriptionResult =
  Apollo.SubscriptionResult<ActivityCreatedSubscription>
