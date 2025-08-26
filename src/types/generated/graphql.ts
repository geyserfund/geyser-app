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
  project: Project;
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

export type ActivityResource = Contribution | Entry | Post | Project | ProjectGoal | ProjectReward;

export enum ActivityResourceType {
  Contribution = 'CONTRIBUTION',
  Post = 'POST',
  Project = 'PROJECT',
  ProjectGoal = 'PROJECT_GOAL',
  ProjectReward = 'PROJECT_REWARD'
}

export type Ambassador = {
  __typename?: 'Ambassador';
  contributionsCount: Scalars['Int']['output'];
  contributionsSum: Scalars['BigInt']['output'];
  id: Scalars['BigInt']['output'];
  payoutRate: Scalars['Float']['output'];
  user: User;
};

export type AmbassadorAddInput = {
  heroId: Scalars['String']['input'];
  payoutRate: Scalars['Float']['input'];
  projectId: Scalars['BigInt']['input'];
};

export type AmbassadorStats = HeroStats & {
  __typename?: 'AmbassadorStats';
  contributionsCount: Scalars['Int']['output'];
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  /** Number of projects shared by the User. */
  projectsCount: Scalars['Int']['output'];
  rank: Scalars['Int']['output'];
};

export type AmbassadorUpdateInput = {
  /** The payout rate for the ambassador, value between 0 and 99. */
  payoutRate: Scalars['Float']['input'];
  projectId: Scalars['BigInt']['input'];
  userId: Scalars['BigInt']['input'];
};

export enum AmountCurrency {
  Btcsat = 'BTCSAT',
  Usdcent = 'USDCENT'
}

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
  contributionId?: InputMaybe<Scalars['BigInt']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
};

export enum BaseCurrency {
  Btc = 'BTC'
}

export type BitcoinPaymentMethods = {
  __typename?: 'BitcoinPaymentMethods';
  lightning: LightningPaymentMethods;
  onChain: OnChainPaymentMethods;
};

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

export type ConnectionDetails = LightningAddressConnectionDetails | LndConnectionDetailsPrivate | LndConnectionDetailsPublic | NwcConnectionDetailsPrivate;

export type Contribution = {
  __typename?: 'Contribution';
  amount: Scalars['Int']['output'];
  bitcoinQuote?: Maybe<BitcoinQuote>;
  comment?: Maybe<Scalars['String']['output']>;
  confirmedAt?: Maybe<Scalars['Date']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  /** Creator's email address. Only visible to the contributor. */
  creatorEmail?: Maybe<Scalars['String']['output']>;
  creatorTaxProfile?: Maybe<UserTaxProfile>;
  donationAmount: Scalars['Int']['output'];
  /** Contributor's email address. Only visible to the project owner. */
  email?: Maybe<Scalars['String']['output']>;
  funder: Funder;
  id: Scalars['BigInt']['output'];
  isAnonymous: Scalars['Boolean']['output'];
  isSubscription: Scalars['Boolean']['output'];
  media?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  payments: Array<Payment>;
  privateComment?: Maybe<Scalars['String']['output']>;
  projectGoalId?: Maybe<Scalars['BigInt']['output']>;
  projectId: Scalars['BigInt']['output'];
  sourceResource?: Maybe<SourceResource>;
  status: ContributionStatus;
  /** Private reference code viewable only by the Funder and the ProjectOwner related to this Contribution */
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ContributionCreateInput = {
  ambassadorHeroId?: InputMaybe<Scalars['String']['input']>;
  /** Set to true if the funder wishes to remain anonymous. The user will still be associated to the contribution. */
  anonymous: Scalars['Boolean']['input'];
  donationAmount: Scalars['Int']['input'];
  /** The percentage of the donation that will be tipped to Geyser, between 0 and 100. */
  geyserTipPercentage?: InputMaybe<Scalars['Float']['input']>;
  metadataInput?: InputMaybe<ContributionMetadataInput>;
  orderInput?: InputMaybe<OrderContributionInput>;
  paymentsInput?: InputMaybe<ContributionPaymentsInput>;
  projectGoalId?: InputMaybe<Scalars['BigInt']['input']>;
  projectId: Scalars['BigInt']['input'];
  referrerHeroId?: InputMaybe<Scalars['String']['input']>;
  /** The resource from which the contribution is being created. */
  sourceResourceInput: ResourceInput;
};

export type ContributionEmailUpdateInput = {
  contributionId: Scalars['BigInt']['input'];
  email: Scalars['String']['input'];
};

export type ContributionFiatPaymentDetails = {
  __typename?: 'ContributionFiatPaymentDetails';
  stripeClientSecret: Scalars['String']['output'];
};

export type ContributionFiatPaymentDetailsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  stripe: ContributionFiatPaymentDetailsStripeInput;
};

export type ContributionFiatPaymentDetailsStripeInput = {
  returnUrl: Scalars['String']['input'];
};

export type ContributionFiatSwapPaymentDetails = {
  __typename?: 'ContributionFiatSwapPaymentDetails';
  checkoutUrl: Scalars['String']['output'];
};

export type ContributionFiatSwapPaymentDetailsBanxaInput = {
  fiatCurrency: Scalars['String']['input'];
  returnUrl: Scalars['String']['input'];
};

export type ContributionFiatSwapPaymentDetailsBoltzInput = {
  swapPublicKey: Scalars['String']['input'];
};

export type ContributionFiatSwapPaymentDetailsInput = {
  banxa: ContributionFiatSwapPaymentDetailsBanxaInput;
  create?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContributionLightningPaymentDetails = {
  __typename?: 'ContributionLightningPaymentDetails';
  lightningInvoiceId: Scalars['String']['output'];
  paymentRequest: Scalars['String']['output'];
};

export type ContributionLightningPaymentDetailsInput = {
  create?: InputMaybe<Scalars['Boolean']['input']>;
  zapRequest?: InputMaybe<Scalars['String']['input']>;
};

export type ContributionMetadataInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  followProject?: InputMaybe<Scalars['Boolean']['input']>;
  media?: InputMaybe<Scalars['String']['input']>;
  privateComment?: InputMaybe<Scalars['String']['input']>;
  subscribeToGeyserEmails?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContributionMutationResponse = {
  __typename?: 'ContributionMutationResponse';
  contribution: Contribution;
  payments: ContributionPaymentsDetails;
};

export type ContributionOnChainSwapPaymentDetails = {
  __typename?: 'ContributionOnChainSwapPaymentDetails';
  address: Scalars['String']['output'];
  swapJson: Scalars['String']['output'];
};

export type ContributionOnChainSwapPaymentDetailsInput = {
  boltz: ContributionFiatSwapPaymentDetailsBoltzInput;
  create?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContributionPaymentsAddInput = {
  contributionId: Scalars['BigInt']['input'];
  paymentsInput: ContributionPaymentsInput;
};

export type ContributionPaymentsAddResponse = {
  __typename?: 'ContributionPaymentsAddResponse';
  payments: ContributionPaymentsDetails;
};

export type ContributionPaymentsDetails = {
  __typename?: 'ContributionPaymentsDetails';
  fiat?: Maybe<ContributionFiatPaymentDetails>;
  fiatSwap?: Maybe<ContributionFiatSwapPaymentDetails>;
  lightning?: Maybe<ContributionLightningPaymentDetails>;
  onChainSwap?: Maybe<ContributionOnChainSwapPaymentDetails>;
};

export type ContributionPaymentsInput = {
  fiat?: InputMaybe<ContributionFiatPaymentDetailsInput>;
  fiatSwap?: InputMaybe<ContributionFiatSwapPaymentDetailsInput>;
  lightning?: InputMaybe<ContributionLightningPaymentDetailsInput>;
  onChainSwap?: InputMaybe<ContributionOnChainSwapPaymentDetailsInput>;
};

export enum ContributionStatus {
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export type ContributionStatusUpdatedInput = {
  contributionId?: InputMaybe<Scalars['BigInt']['input']>;
  projectId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type ContributionStatusUpdatedSubscriptionResponse = {
  __typename?: 'ContributionStatusUpdatedSubscriptionResponse';
  contribution: Contribution;
};

export type ContributionsGetResponse = {
  __typename?: 'ContributionsGetResponse';
  contributions: Array<Contribution>;
  pagination?: Maybe<CursorPaginationResponse>;
};

export type ContributionsSummary = {
  __typename?: 'ContributionsSummary';
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  contributorsCount: Scalars['Int']['output'];
};

export enum ContributionsSummaryPeriod {
  AllTime = 'ALL_TIME',
  Month = 'MONTH',
  Week = 'WEEK'
}

export enum ContributionsWhereContributionStatus {
  Confirmed = 'CONFIRMED'
}

export type ContributorContributionsSummary = {
  __typename?: 'ContributorContributionsSummary';
  commentsCount: Scalars['Int']['output'];
  contributionsCount: Scalars['Int']['output'];
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
};

export type ContributorStats = HeroStats & {
  __typename?: 'ContributorStats';
  contributionsCount: Scalars['Int']['output'];
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  /** Number of projects contributed to by the User. */
  projectsCount: Scalars['Int']['output'];
  rank: Scalars['Int']['output'];
};

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
  markdown?: InputMaybe<Scalars['String']['input']>;
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
  /** Project header images */
  images: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** Boolean flag to indicate if the project can be promoted. */
  promotionsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
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
  confirmationMessage?: InputMaybe<Scalars['String']['input']>;
  /** Cost of the reward, currently only in USD cents */
  cost: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  estimatedAvailabilityDate?: InputMaybe<Scalars['Date']['input']>;
  estimatedDeliveryInWeeks?: InputMaybe<Scalars['Int']['input']>;
  hasShipping: Scalars['Boolean']['input'];
  images: Array<Scalars['String']['input']>;
  isAddon?: InputMaybe<Scalars['Boolean']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  maxClaimable?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  preOrder?: InputMaybe<Scalars['Boolean']['input']>;
  privateCommentPrompts: Array<PrivateCommentPrompt>;
  projectId: Scalars['BigInt']['input'];
  shippingConfigId?: InputMaybe<Scalars['BigInt']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProjectShippingConfigInput = {
  globalShipping: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  projectId: Scalars['BigInt']['input'];
  shippingRates: Array<UpdateProjectShippingFeeRateInput>;
  type: ProjectShippingConfigType;
};

export type CreateProjectSubscriptionPlanInput = {
  amount: Scalars['Int']['input'];
  currency: SubscriptionCurrencyType;
  description?: InputMaybe<Scalars['String']['input']>;
  intervalType: UserSubscriptionInterval;
  name: Scalars['String']['input'];
  projectId: Scalars['BigInt']['input'];
};

export type CreateUserSubscriptionInput = {
  projectSubscriptionPlanId: Scalars['BigInt']['input'];
  userId: Scalars['BigInt']['input'];
};

export type CreateWalletInput = {
  feePercentage: Scalars['Float']['input'];
  lightningAddressConnectionDetailsInput?: InputMaybe<LightningAddressConnectionDetailsCreateInput>;
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  nwcConnectionDetailsInput?: InputMaybe<NwcConnectionDetailsCreateInput>;
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

export type CreatorStats = HeroStats & {
  __typename?: 'CreatorStats';
  contributionsCount: Scalars['Int']['output'];
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  /** Number of projects created by the User. */
  projectsCount: Scalars['Int']['output'];
  rank: Scalars['Int']['output'];
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

export type EmailSendOptionsInput = {
  projectRewardUUIDs?: InputMaybe<Array<Scalars['String']['input']>>;
  segment: EmailSubscriberSegment;
};

export enum EmailSubscriberSegment {
  Contributors = 'CONTRIBUTORS',
  Followers = 'FOLLOWERS',
  RewardBuyers = 'REWARD_BUYERS'
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
  /** Contributions that were created from the Entry's page. */
  contributions: Array<Contribution>;
  createdAt: Scalars['String']['output'];
  /** User that created the Entry. */
  creator: User;
  /** Short description of the Entry. */
  description: Scalars['String']['output'];
  /** Number of funders that were created from the Entry's page. */
  fundersCount: Scalars['Int']['output'];
  id: Scalars['BigInt']['output'];
  /** Header image of the Entry. */
  image?: Maybe<Scalars['String']['output']>;
  markdown?: Maybe<Scalars['String']['output']>;
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
  externalLink?: Maybe<Scalars['String']['output']>;
  externalUsername: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  public: Scalars['Boolean']['output'];
};

export enum FeeCurrency {
  Btcsat = 'BTCSAT',
  Usdcent = 'USDCENT'
}

export type FiatPaymentMethods = {
  __typename?: 'FiatPaymentMethods';
  banxa: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  stripe: Scalars['Boolean']['output'];
};

export type FiatSwapPaymentDetails = {
  __typename?: 'FiatSwapPaymentDetails';
  lightningInvoiceId: Scalars['String']['output'];
  lightningInvoiceStatus: LightningInvoiceStatus;
  swapId: Scalars['String']['output'];
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
  /** Funder's contributions. */
  contributions: Array<Contribution>;
  /** Contribution's funding summary, possibly in different time ranges. */
  contributionsSummary?: Maybe<ContributorContributionsSummary>;
  id: Scalars['BigInt']['output'];
  orders: Array<Order>;
  /** Contributor's rank in the project. */
  rank?: Maybe<Scalars['Int']['output']>;
  /** Number of (confirmed) times a Funder funded a particular project. */
  timesFunded?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
};


/** The Funder type contains a User's funding details over a particular project. */
export type FunderContributionsArgs = {
  input?: InputMaybe<GetContributorContributionsInput>;
};


/** The Funder type contains a User's funding details over a particular project. */
export type FunderContributionsSummaryArgs = {
  period?: InputMaybe<ContributionsSummaryPeriod>;
};

export type FunderRewardGraphSum = GraphSumData & {
  __typename?: 'FunderRewardGraphSum';
  dateTime: Scalars['Date']['output'];
  rewardId: Scalars['BigInt']['output'];
  rewardName: Scalars['String']['output'];
  sum: Scalars['Int']['output'];
};

export enum FundingResourceType {
  Activity = 'activity',
  Entry = 'entry',
  Project = 'project',
  User = 'user'
}

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

export type GetContributionsInput = {
  orderBy?: InputMaybe<GetContributionsOrderByInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<GetContributionsWhereInput>;
};

export type GetContributionsOrderByInput = {
  createdAt: OrderByOptions;
};

export type GetContributionsWhereInput = {
  NOT?: InputMaybe<GetContributionsWhereInput>;
  OR?: InputMaybe<Array<InputMaybe<GetContributionsWhereInput>>>;
  dateRange?: InputMaybe<DateRangeInput>;
  funderId?: InputMaybe<Scalars['BigInt']['input']>;
  projectId?: InputMaybe<Scalars['BigInt']['input']>;
  sourceResourceInput?: InputMaybe<ResourceInput>;
  status?: InputMaybe<ContributionsWhereContributionStatus>;
};

export type GetContributorContributionsInput = {
  where?: InputMaybe<GetContributorContributionsWhereInput>;
};

export type GetContributorContributionsWhereInput = {
  status?: InputMaybe<ContributionStatus>;
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
  id?: InputMaybe<Scalars['BigInt']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type GetProjectRewardsInput = {
  where: GetProjectRewardsWhereInput;
};

export type GetProjectRewardsWhereInput = {
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

export type GeyserPromotionsContributionStats = {
  __typename?: 'GeyserPromotionsContributionStats';
  contributionsCount: Scalars['Int']['output'];
  contributionsSum: Scalars['BigInt']['output'];
  contributionsSumUsd: Scalars['Float']['output'];
};

export type GeyserPromotionsContributionStatsInput = {
  where: GeyserPromotionsContributionStatsWhereInput;
};

export type GeyserPromotionsContributionStatsWhereInput = {
  projectId: Scalars['BigInt']['input'];
};

export type GlobalAmbassadorLeaderboardRow = {
  __typename?: 'GlobalAmbassadorLeaderboardRow';
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  projectsCount: Scalars['Int']['output'];
  userGuardianType?: Maybe<GuardianType>;
  userHeroId?: Maybe<Scalars['String']['output']>;
  userId: Scalars['BigInt']['output'];
  userImageUrl?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type GlobalContributorLeaderboardRow = {
  __typename?: 'GlobalContributorLeaderboardRow';
  contributionsCount: Scalars['Int']['output'];
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  projectsContributedCount: Scalars['Int']['output'];
  userGuardianType?: Maybe<GuardianType>;
  userHeroId?: Maybe<Scalars['String']['output']>;
  userId: Scalars['BigInt']['output'];
  userImageUrl?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type GlobalCreatorLeaderboardRow = {
  __typename?: 'GlobalCreatorLeaderboardRow';
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  projectsCount: Scalars['Int']['output'];
  userGuardianType?: Maybe<GuardianType>;
  userHeroId?: Maybe<Scalars['String']['output']>;
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

export type GrantGuardiansFunding = {
  __typename?: 'GrantGuardiansFunding';
  contributedTotal: Scalars['BigInt']['output'];
  contributorsCount: Scalars['BigInt']['output'];
};

export type GrantStatistics = {
  __typename?: 'GrantStatistics';
  /** Statistic about the grant applicants */
  applicants?: Maybe<GrantStatisticsApplicant>;
  grantGuardiansFunding: GrantGuardiansFunding;
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

export type GraphData = {
  dateTime: Scalars['Date']['output'];
  value: Scalars['Int']['output'];
};

export type GraphSumData = {
  dateTime: Scalars['Date']['output'];
  sum: Scalars['Int']['output'];
};

export type GuardianResult = {
  __typename?: 'GuardianResult';
  guardianType: GuardianType;
  soldCount: Scalars['Int']['output'];
  users: Array<GuardianUser>;
};

export enum GuardianType {
  King = 'KING',
  Knight = 'KNIGHT',
  Legend = 'LEGEND',
  Warrior = 'WARRIOR'
}

export type GuardianUser = {
  __typename?: 'GuardianUser';
  guardianType: Scalars['String']['output'];
  heroId: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  userId: Scalars['BigInt']['output'];
  username: Scalars['String']['output'];
};

export type GuardianUsersGetInput = {
  where?: InputMaybe<GuardianUsersGetWhereInput>;
};

export type GuardianUsersGetResponse = {
  __typename?: 'GuardianUsersGetResponse';
  guardianUsers: Array<GuardianResult>;
};

export type GuardianUsersGetWhereInput = {
  guardianType: GuardianType;
};

export type HeroStats = {
  contributionsCount: Scalars['Int']['output'];
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  projectsCount: Scalars['Int']['output'];
  rank: Scalars['Int']['output'];
};

export type LeaderboardGlobalAmbassadorsGetInput = {
  /** The period to return the leaderboard for. */
  period: LeaderboardPeriod;
  /** The number of top contributors to return. */
  top: Scalars['Int']['input'];
};

export type LeaderboardGlobalContributorsGetInput = {
  /** The period to return the leaderboard for. */
  period: LeaderboardPeriod;
  /** The number of top contributors to return. */
  top: Scalars['Int']['input'];
};

export type LeaderboardGlobalCreatorsGetInput = {
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

export enum LegalEntityType {
  Company = 'COMPANY',
  NonProfit = 'NON_PROFIT',
  Person = 'PERSON'
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

export enum LightningInvoiceStatus {
  Canceled = 'CANCELED',
  Paid = 'PAID',
  Unpaid = 'UNPAID'
}

export type LightningPaymentDetails = {
  __typename?: 'LightningPaymentDetails';
  lightningInvoiceId: Scalars['String']['output'];
  lightningInvoiceStatus: LightningInvoiceStatus;
  zapRequest?: Maybe<Scalars['String']['output']>;
};

export type LightningPaymentMethods = {
  __typename?: 'LightningPaymentMethods';
  bolt11: Scalars['Boolean']['output'];
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
  ambassadorAdd?: Maybe<Ambassador>;
  ambassadorUpdate?: Maybe<Ambassador>;
  claimBadge: UserBadge;
  contributionCreate: ContributionMutationResponse;
  contributionEmailUpdate: Contribution;
  contributionPaymentsAdd: ContributionPaymentsAddResponse;
  /** @deprecated Use postCreate instead */
  createEntry: Entry;
  createProject: Project;
  creatorNotificationConfigurationValueUpdate?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated Use postDelete instead */
  deleteEntry: Entry;
  grantApply: GrantApplicant;
  orderStatusUpdate?: Maybe<Order>;
  paymentCancel: PaymentCancelResponse;
  paymentConfirm: PaymentConfirmResponse;
  paymentFail: PaymentFailResponse;
  paymentInvoiceCancel: PaymentInvoiceCancelResponse;
  paymentPend: PaymentPendResponse;
  podcastKeysendContributionCreate: PodcastKeysendContributionCreateResponse;
  postCreate: Post;
  postDelete: Post;
  postPublish: Post;
  postRepostOnNostr: PostRepostOnNostrResponse;
  postSendByEmail: PostSendByEmailResponse;
  postUpdate: Post;
  projectClose: Project;
  projectDelete: ProjectDeleteResponse;
  projectFollow: Scalars['Boolean']['output'];
  projectGoalCreate: Array<ProjectGoal>;
  projectGoalDelete: ProjectGoalDeleteResponse;
  /** Only returns ProjectGoals that are in progress */
  projectGoalOrderingUpdate: Array<ProjectGoal>;
  projectGoalUpdate: ProjectGoal;
  projectPreLaunch: Project;
  projectPublish: Project;
  projectPutInReview: Project;
  projectRewardCreate: ProjectReward;
  projectRewardCurrencyUpdate: Array<ProjectReward>;
  /** Soft deletes the reward. */
  projectRewardDelete: Scalars['Boolean']['output'];
  projectRewardUpdate: ProjectReward;
  projectShippingConfigCreate: ShippingConfig;
  projectShippingConfigUpdate: ShippingConfig;
  projectStatusUpdate: Project;
  projectSubscriptionPlanCreate: ProjectSubscriptionPlan;
  projectSubscriptionPlanDelete: Scalars['Boolean']['output'];
  projectSubscriptionPlanUpdate: ProjectSubscriptionPlan;
  projectTagAdd: Array<Tag>;
  projectTagRemove: Array<Tag>;
  projectUnfollow: Scalars['Boolean']['output'];
  /** @deprecated Use postPublish instead */
  publishEntry: Entry;
  publishNostrEvent?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Sends an OTP to the user's email address and responds with a token that can be used, together with the OTP, to two-factor authenticate
   * a request made by the client.
   */
  sendOTPByEmail: OtpResponse;
  shippingAddressCreate: ShippingAddress;
  tagCreate: Tag;
  unlinkExternalAccount: User;
  /** @deprecated Use postUpdate instead */
  updateEntry: Entry;
  updateProject: Project;
  updateUser: User;
  updateWalletState: Wallet;
  userBadgeAward: UserBadge;
  userDelete: DeleteUserResponse;
  userEmailUpdate: User;
  userEmailVerify: Scalars['Boolean']['output'];
  userNotificationConfigurationValueUpdate?: Maybe<Scalars['Boolean']['output']>;
  userSubscriptionCancel: UserSubscription;
  userSubscriptionUpdate: UserSubscription;
  userTaxProfileUpdate: UserTaxProfile;
  userVerificationTokenGenerate: UserVerificationTokenGenerateResponse;
  walletCreate: Wallet;
  walletDelete: Scalars['Boolean']['output'];
  /** This operation is currently not supported. */
  walletUpdate: Wallet;
};


export type MutationAmbassadorAddArgs = {
  input: AmbassadorAddInput;
};


export type MutationAmbassadorUpdateArgs = {
  input: AmbassadorUpdateInput;
};


export type MutationClaimBadgeArgs = {
  input: BadgeClaimInput;
};


export type MutationContributionCreateArgs = {
  input: ContributionCreateInput;
};


export type MutationContributionEmailUpdateArgs = {
  input?: InputMaybe<ContributionEmailUpdateInput>;
};


export type MutationContributionPaymentsAddArgs = {
  input: ContributionPaymentsAddInput;
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


export type MutationGrantApplyArgs = {
  input?: InputMaybe<GrantApplyInput>;
};


export type MutationOrderStatusUpdateArgs = {
  input: OrderStatusUpdateInput;
};


export type MutationPaymentCancelArgs = {
  input: PaymentCancelInput;
};


export type MutationPaymentConfirmArgs = {
  input: PaymentConfirmInput;
};


export type MutationPaymentFailArgs = {
  input: PaymentFailInput;
};


export type MutationPaymentInvoiceCancelArgs = {
  invoiceId: Scalars['String']['input'];
};


export type MutationPaymentPendArgs = {
  input: PaymentPendInput;
};


export type MutationPodcastKeysendContributionCreateArgs = {
  input: PodcastKeysendContributionCreateInput;
};


export type MutationPostCreateArgs = {
  input: PostCreateInput;
};


export type MutationPostDeleteArgs = {
  id: Scalars['BigInt']['input'];
};


export type MutationPostPublishArgs = {
  input: PostPublishInput;
};


export type MutationPostRepostOnNostrArgs = {
  input: PostRepostOnNostrInput;
};


export type MutationPostSendByEmailArgs = {
  input: PostSendByEmailInput;
};


export type MutationPostUpdateArgs = {
  input: PostUpdateInput;
};


export type MutationProjectCloseArgs = {
  input: ProjectCloseMutationInput;
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


export type MutationProjectPreLaunchArgs = {
  input: ProjectPreLaunchMutationInput;
};


export type MutationProjectPublishArgs = {
  input: ProjectPublishMutationInput;
};


export type MutationProjectPutInReviewArgs = {
  input: ProjectPutInReviewMutationInput;
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


export type MutationProjectShippingConfigCreateArgs = {
  input: CreateProjectShippingConfigInput;
};


export type MutationProjectShippingConfigUpdateArgs = {
  input: UpdateProjectShippingConfigInput;
};


export type MutationProjectStatusUpdateArgs = {
  input: ProjectStatusUpdate;
};


export type MutationProjectSubscriptionPlanCreateArgs = {
  input: CreateProjectSubscriptionPlanInput;
};


export type MutationProjectSubscriptionPlanDeleteArgs = {
  id: Scalars['BigInt']['input'];
};


export type MutationProjectSubscriptionPlanUpdateArgs = {
  input: UpdateProjectSubscriptionPlanInput;
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


export type MutationPublishNostrEventArgs = {
  event: Scalars['String']['input'];
};


export type MutationSendOtpByEmailArgs = {
  input: SendOtpByEmailInput;
};


export type MutationShippingAddressCreateArgs = {
  input: ShippingAddressCreateInput;
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


export type MutationUserSubscriptionCancelArgs = {
  id: Scalars['BigInt']['input'];
};


export type MutationUserSubscriptionUpdateArgs = {
  input: UpdateUserSubscriptionInput;
};


export type MutationUserTaxProfileUpdateArgs = {
  input: UserTaxProfileUpdateInput;
};


export type MutationUserVerificationTokenGenerateArgs = {
  input: UserVerificationTokenGenerateInput;
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

export type NwcConnectionDetailsCreateInput = {
  nwcUrl: Scalars['String']['input'];
};

export type NwcConnectionDetailsPrivate = {
  __typename?: 'NWCConnectionDetailsPrivate';
  nwcUrl?: Maybe<Scalars['String']['output']>;
};

export type NwcConnectionDetailsPublic = {
  __typename?: 'NWCConnectionDetailsPublic';
  nwcUrl?: Maybe<Scalars['String']['output']>;
};

export type NwcConnectionDetailsUpdateInput = {
  nwcUrl: Scalars['String']['input'];
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

export type OnChainPaymentMethods = {
  __typename?: 'OnChainPaymentMethods';
  boltzSwap: Scalars['Boolean']['output'];
  native: Scalars['Boolean']['output'];
};

export type OnChainSwapPaymentDetails = {
  __typename?: 'OnChainSwapPaymentDetails';
  lightningInvoiceId: Scalars['String']['output'];
  lightningInvoiceStatus: LightningInvoiceStatus;
  onChainAddress: Scalars['String']['output'];
  onChainTxId?: Maybe<Scalars['String']['output']>;
  swapId: Scalars['String']['output'];
};

export type OnChainTxInput = {
  id: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  confirmedAt?: Maybe<Scalars['Date']['output']>;
  contribution: Contribution;
  createdAt: Scalars['Date']['output'];
  deliveredAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['BigInt']['output'];
  items: Array<OrderItem>;
  itemsTotalInSats: Scalars['Int']['output'];
  project: Project;
  referenceCode: Scalars['String']['output'];
  shippedAt?: Maybe<Scalars['Date']['output']>;
  shippingAddress?: Maybe<ShippingAddress>;
  shippingFeeTotalInSats: Scalars['Int']['output'];
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

export type OrderContributionInput = {
  /**
   * Quote used client-side to compute the order total. That quote will be used unless the slippage exceeds
   * a pre-defined threshold.
   */
  bitcoinQuote?: InputMaybe<OrderBitcoinQuoteInput>;
  items: Array<OrderItemInput>;
  shippingAddressId?: InputMaybe<Scalars['String']['input']>;
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
  ProjectReward = 'PROJECT_REWARD',
  ProjectSubscriptionPlan = 'PROJECT_SUBSCRIPTION_PLAN'
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
  userId?: InputMaybe<Scalars['BigInt']['input']>;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
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

export type Payment = {
  __typename?: 'Payment';
  accountingAmountDue: Scalars['Int']['output'];
  accountingAmountPaid: Scalars['Int']['output'];
  ambassadorUserId?: Maybe<Scalars['BigInt']['output']>;
  baseAccountingAmount: Scalars['Int']['output'];
  canceledAt?: Maybe<Scalars['Date']['output']>;
  contributionPodcastKeysendId?: Maybe<Scalars['BigInt']['output']>;
  contributionUUID: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  failureReason?: Maybe<Scalars['String']['output']>;
  fees: Array<PaymentFee>;
  funder: Funder;
  id: Scalars['BigInt']['output'];
  method?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['Date']['output']>;
  paymentAmount: Scalars['Int']['output'];
  paymentCurrency: PaymentCurrency;
  paymentDetails: PaymentDetails;
  paymentType: PaymentType;
  payoutAmount: Scalars['Int']['output'];
  payoutCurrency: PayoutCurrency;
  projectId: Scalars['BigInt']['output'];
  status: PaymentStatus;
  updatedAt: Scalars['Date']['output'];
  userSubscriptionId?: Maybe<Scalars['BigInt']['output']>;
  uuid: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type PaymentCancelInput = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
  invoiceId?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentCancelResponse = {
  __typename?: 'PaymentCancelResponse';
  id: Scalars['BigInt']['output'];
  success: Scalars['Boolean']['output'];
};

export type PaymentConfirmInput = {
  amount: Scalars['Int']['input'];
  amountCurrency: AmountCurrency;
  invoiceId?: InputMaybe<Scalars['String']['input']>;
  subscription?: InputMaybe<SubscriptionPaymentConfirmationInput>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentConfirmResponse = {
  __typename?: 'PaymentConfirmResponse';
  id: Scalars['BigInt']['output'];
  success: Scalars['Boolean']['output'];
};

export enum PaymentCurrency {
  Btcsat = 'BTCSAT',
  Usdcent = 'USDCENT'
}

export type PaymentDetails = FiatSwapPaymentDetails | LightningPaymentDetails | OnChainSwapPaymentDetails;

export type PaymentFailInput = {
  failureReason?: InputMaybe<Scalars['String']['input']>;
  invoiceId?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentFailResponse = {
  __typename?: 'PaymentFailResponse';
  id: Scalars['BigInt']['output'];
  success: Scalars['Boolean']['output'];
};

export type PaymentFee = {
  __typename?: 'PaymentFee';
  description?: Maybe<Scalars['String']['output']>;
  external?: Maybe<Scalars['Boolean']['output']>;
  feeAmount: Scalars['Int']['output'];
  feeCurrency: FeeCurrency;
  feePayer?: Maybe<PaymentFeePayer>;
  feeType?: Maybe<PaymentFeeType>;
};

export enum PaymentFeePayer {
  Contributor = 'CONTRIBUTOR',
  Creator = 'CREATOR'
}

export enum PaymentFeeType {
  AffiliatePartner = 'AFFILIATE_PARTNER',
  Ambassador = 'AMBASSADOR',
  Partner = 'PARTNER',
  Payment = 'PAYMENT',
  Platform = 'PLATFORM',
  Promotion = 'PROMOTION',
  Shipping = 'SHIPPING',
  Tip = 'TIP'
}

export type PaymentGetInput = {
  invoiceId?: InputMaybe<Scalars['String']['input']>;
  onChainSwapId?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentInvoiceCancelResponse = {
  __typename?: 'PaymentInvoiceCancelResponse';
  id: Scalars['BigInt']['output'];
  success: Scalars['Boolean']['output'];
};

export enum PaymentInvoiceSanctionCheckStatus {
  Failed = 'FAILED',
  Passed = 'PASSED',
  Pending = 'PENDING'
}

export type PaymentInvoiceSanctionCheckStatusGetInput = {
  invoiceId: Scalars['String']['input'];
};

export type PaymentInvoiceSanctionCheckStatusResponse = {
  __typename?: 'PaymentInvoiceSanctionCheckStatusResponse';
  status: PaymentInvoiceSanctionCheckStatus;
};

export type PaymentMethods = {
  __typename?: 'PaymentMethods';
  bitcoin: BitcoinPaymentMethods;
  fiat: FiatPaymentMethods;
};

export type PaymentPendInput = {
  amount: Scalars['Int']['input'];
  amountCurrency: AmountCurrency;
  invoiceId?: InputMaybe<Scalars['String']['input']>;
  onChainSwap?: InputMaybe<PaymentPendOnChainSwapInput>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentPendOnChainSwapInput = {
  tx?: InputMaybe<OnChainTxInput>;
};

export type PaymentPendResponse = {
  __typename?: 'PaymentPendResponse';
  id: Scalars['BigInt']['output'];
  success: Scalars['Boolean']['output'];
};

export enum PaymentStatus {
  Canceled = 'CANCELED',
  Failed = 'FAILED',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  Pending = 'PENDING',
  Unpaid = 'UNPAID'
}

export type PaymentStatusUpdatedInput = {
  contributionUUID?: InputMaybe<Scalars['String']['input']>;
};

export enum PaymentType {
  Fiat = 'FIAT',
  FiatSwap = 'FIAT_SWAP',
  Lightning = 'LIGHTNING',
  LightningPodcastKeysend = 'LIGHTNING_PODCAST_KEYSEND',
  OnChainSwap = 'ON_CHAIN_SWAP'
}

export enum PayoutCurrency {
  Btcsat = 'BTCSAT',
  Usdcent = 'USDCENT'
}

export type PodcastKeysendContributionCreateInput = {
  amount: Scalars['Int']['input'];
  appName: Scalars['String']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  externalUsername?: InputMaybe<Scalars['String']['input']>;
  paidAt: Scalars['Date']['input'];
  privateComment?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['BigInt']['input'];
};

export type PodcastKeysendContributionCreateResponse = {
  __typename?: 'PodcastKeysendContributionCreateResponse';
  id: Scalars['BigInt']['output'];
  success: Scalars['Boolean']['output'];
};

export type Post = {
  __typename?: 'Post';
  /** Total amount of satoshis funded from the Post's page. */
  amountFunded: Scalars['Int']['output'];
  content?: Maybe<Scalars['String']['output']>;
  /** Contributions that were created from the Post's page. */
  contributions: Array<Contribution>;
  createdAt: Scalars['String']['output'];
  /** User that created the Post. */
  creator: User;
  /** Short description of the Post. */
  description: Scalars['String']['output'];
  /** Number of funders that were created from the Post's page. */
  fundersCount: Scalars['Int']['output'];
  id: Scalars['BigInt']['output'];
  /** Header image of the Post. */
  image?: Maybe<Scalars['String']['output']>;
  markdown?: Maybe<Scalars['String']['output']>;
  postType?: Maybe<PostType>;
  /** Project within which the Post was created. */
  project?: Maybe<Project>;
  /** Goals linked to this Post. */
  projectGoals: ProjectGoals;
  /** Rewards linked to this Post. */
  projectRewards: Array<ProjectReward>;
  publishedAt?: Maybe<Scalars['String']['output']>;
  /** Date when the Post was sent by email. */
  sentByEmailAt?: Maybe<Scalars['Date']['output']>;
  status: PostStatus;
  /** Title of the Post. */
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PostCreateInput = {
  /** Short description of the Post. */
  description: Scalars['String']['input'];
  /** Header image of the Post. */
  image?: InputMaybe<Scalars['String']['input']>;
  markdown?: InputMaybe<Scalars['String']['input']>;
  postType?: InputMaybe<PostType>;
  projectGoalIds: Array<Scalars['BigInt']['input']>;
  projectId: Scalars['BigInt']['input'];
  projectRewardUUIDs: Array<Scalars['String']['input']>;
  /** Title of the Post. */
  title: Scalars['String']['input'];
};

export type PostEmailSegmentSizeGetInput = {
  emailSendOptions: EmailSendOptionsInput;
  projectId: Scalars['BigInt']['input'];
};

export type PostGetInput = {
  orderBy?: InputMaybe<PostGetOrderByInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<PostGetWhereInput>;
};

export type PostGetOrderByInput = {
  publishedAt?: InputMaybe<OrderByOptions>;
};

export type PostGetWhereInput = {
  projectId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type PostPublishInput = {
  emailSendOptions?: InputMaybe<EmailSendOptionsInput>;
  postId: Scalars['BigInt']['input'];
};

export type PostPublishedSubscriptionResponse = {
  __typename?: 'PostPublishedSubscriptionResponse';
  post: Post;
};

export type PostRepostOnNostrInput = {
  event: Scalars['String']['input'];
  postId: Scalars['BigInt']['input'];
};

export type PostRepostOnNostrResponse = {
  __typename?: 'PostRepostOnNostrResponse';
  success: Scalars['Boolean']['output'];
};

export type PostSendByEmailInput = {
  emailSendOptions: EmailSendOptionsInput;
  postId: Scalars['BigInt']['input'];
};

export type PostSendByEmailResponse = {
  __typename?: 'PostSendByEmailResponse';
  recipientCount?: Maybe<Scalars['Int']['output']>;
};

export enum PostStatus {
  Deleted = 'deleted',
  Published = 'published',
  Unpublished = 'unpublished'
}

export enum PostType {
  Announcement = 'ANNOUNCEMENT',
  BehindTheScenes = 'BEHIND_THE_SCENES',
  FeedbackRequest = 'FEEDBACK_REQUEST',
  GoalReached = 'GOAL_REACHED',
  GoalUpdate = 'GOAL_UPDATE',
  Impact = 'IMPACT',
  NewGoal = 'NEW_GOAL',
  NewReward = 'NEW_REWARD',
  RewardUpdate = 'REWARD_UPDATE'
}

export type PostUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  /** Header image of the Entry. */
  image?: InputMaybe<Scalars['String']['input']>;
  markdown?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['BigInt']['input'];
  postType?: InputMaybe<PostType>;
  projectGoalIds: Array<Scalars['BigInt']['input']>;
  projectRewardUUIDs: Array<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum PrivateCommentPrompt {
  LightningAddress = 'LIGHTNING_ADDRESS',
  NostrNpub = 'NOSTR_NPUB',
  ProjectRewardSpecs = 'PROJECT_REWARD_SPECS'
}

export type ProfileNotificationSettings = {
  __typename?: 'ProfileNotificationSettings';
  creatorSettings: Array<CreatorNotificationSettings>;
  userSettings: UserNotificationSettings;
};

export type Project = {
  __typename?: 'Project';
  ambassadors: ProjectAmbassadorsConnection;
  /** Total amount raised by the project, in satoshis. */
  balance: Scalars['Int']['output'];
  balanceUsdCent: Scalars['Int']['output'];
  /** Boolean flag to indicate if the project can be deleted. */
  canDelete: Scalars['Boolean']['output'];
  category?: Maybe<ProjectCategory>;
  contributions: Array<Contribution>;
  contributionsCount?: Maybe<Scalars['Int']['output']>;
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
  goalsCount?: Maybe<Scalars['Int']['output']>;
  /** Returns the project's grant applications. */
  grantApplications: Array<GrantApplicant>;
  id: Scalars['BigInt']['output'];
  /**
   * Project header images.
   * @deprecated Use images instead.
   */
  image?: Maybe<Scalars['String']['output']>;
  images: Array<Scalars['String']['output']>;
  keys: ProjectKeys;
  launchedAt?: Maybe<Scalars['Date']['output']>;
  links: Array<Scalars['String']['output']>;
  location?: Maybe<Location>;
  /** @deprecated milestones are deprecated, use the goals instead */
  milestones: Array<Milestone>;
  /** Unique name for the project. Used for the project URL and lightning address. */
  name: Scalars['String']['output'];
  owners: Array<Owner>;
  paidLaunch?: Maybe<Scalars['Boolean']['output']>;
  paymentMethods: PaymentMethods;
  /**
   * By default, returns all the posts of a project, both published and unpublished but not deleted.
   * To filter the result set, an explicit input can be passed that specifies a value of true or false for the published field.
   * An unpublished post is only returned if the requesting user is the creator of the post.
   */
  posts: Array<Post>;
  preLaunchExpiresAt?: Maybe<Scalars['Date']['output']>;
  preLaunchedAt?: Maybe<Scalars['Date']['output']>;
  /** Boolean flag to indicate if the project can be promoted. */
  promotionsEnabled?: Maybe<Scalars['Boolean']['output']>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  rewardBuyersCount?: Maybe<Scalars['Int']['output']>;
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
  subCategory?: Maybe<ProjectSubCategory>;
  subscribersCount?: Maybe<Scalars['Int']['output']>;
  tags: Array<Tag>;
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


export type ProjectPostsArgs = {
  input?: InputMaybe<ProjectPostsGetInput>;
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

/** Edge type for Project ambassadors */
export type ProjectAmbassadorEdge = {
  __typename?: 'ProjectAmbassadorEdge';
  /** Cursor for pagination */
  cursor: Scalars['String']['output'];
  /** The ambassador node */
  node: Ambassador;
};

export type ProjectAmbassadorsConnection = {
  __typename?: 'ProjectAmbassadorsConnection';
  /** List of ambassador edges */
  edges: Array<ProjectAmbassadorEdge>;
  /**
   * Information about the pagination of ambassadors
   * @deprecated pagination is not implemented on this query yet
   */
  pageInfo: PageInfo;
  /** Aggregated data about ambassadors */
  stats: ProjectAmbassadorsStats;
};

/** Statistics about project ambassadors */
export type ProjectAmbassadorsStats = {
  __typename?: 'ProjectAmbassadorsStats';
  /** Total number of contributions enabled by ambassadors */
  contributionsCount: Scalars['Int']['output'];
  /** Total amount in satoshis enabled by ambassadors */
  contributionsSum: Scalars['BigInt']['output'];
  /** Total number of ambassadors */
  count: Scalars['Int']['output'];
};

export enum ProjectCategory {
  Advocacy = 'ADVOCACY',
  Cause = 'CAUSE',
  Community = 'COMMUNITY',
  Culture = 'CULTURE',
  Education = 'EDUCATION',
  Other = 'OTHER',
  Tool = 'TOOL'
}

export type ProjectCloseMutationInput = {
  projectId: Scalars['BigInt']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
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
  /** Project contribution over the given datetime range grouped by day, or month. */
  graph: Array<ProjectContributionsStatsGraphData>;
  total: Scalars['Int']['output'];
  totalUsd: Scalars['Float']['output'];
};

export type ProjectContributionsStatsBase = {
  __typename?: 'ProjectContributionsStatsBase';
  contributions: ProjectContributionsStats;
  contributionsGroupedByMethod: Array<ProjectContributionsGroupedByMethodStats>;
};

export type ProjectContributionsStatsGraphData = {
  __typename?: 'ProjectContributionsStatsGraphData';
  graphData?: Maybe<Array<ProjectContributionsStatsGraphDataAmount>>;
  statType: ProjectContributionsStatsGraphDataStatType;
};

export type ProjectContributionsStatsGraphDataAmount = GraphData & {
  __typename?: 'ProjectContributionsStatsGraphDataAmount';
  dateTime: Scalars['Date']['output'];
  value: Scalars['Int']['output'];
};

export enum ProjectContributionsStatsGraphDataStatType {
  Sum = 'SUM'
}

export type ProjectCountriesGetInput = {
  category?: InputMaybe<ProjectCategory>;
  subCategory?: InputMaybe<ProjectSubCategory>;
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
  posts: Array<Post>;
  progress: Scalars['Float']['output'];
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

export type ProjectLeaderboardAmbassadorsGetInput = {
  period: ProjectLeaderboardPeriod;
  projectId: Scalars['BigInt']['input'];
  top: Scalars['Int']['input'];
};

export type ProjectLeaderboardAmbassadorsRow = {
  __typename?: 'ProjectLeaderboardAmbassadorsRow';
  contributionsCount: Scalars['Int']['output'];
  contributionsTotal: Scalars['Int']['output'];
  contributionsTotalUsd: Scalars['Float']['output'];
  projectsCount: Scalars['Int']['output'];
  user?: Maybe<User>;
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
  contributionsSummary?: Maybe<ContributionsSummary>;
  /** The project details */
  project: Project;
};

export type ProjectMostFundedByCategory = {
  __typename?: 'ProjectMostFundedByCategory';
  category?: Maybe<Scalars['String']['output']>;
  projects: Array<ProjectMostFunded>;
  subCategory?: Maybe<Scalars['String']['output']>;
};

export type ProjectMostFundedByTag = {
  __typename?: 'ProjectMostFundedByTag';
  projects: Array<ProjectMostFunded>;
  tagId: Scalars['Int']['output'];
};

export type ProjectPostsGetInput = {
  where?: InputMaybe<ProjectPostsGetWhereInput>;
};

export type ProjectPostsGetWhereInput = {
  published?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectPreLaunchMutationInput = {
  projectId: Scalars['BigInt']['input'];
};

export type ProjectPublishMutationInput = {
  projectId: Scalars['BigInt']['input'];
};

export type ProjectPutInReviewMutationInput = {
  projectId: Scalars['BigInt']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectRegionsGetResult = {
  __typename?: 'ProjectRegionsGetResult';
  count: Scalars['Int']['output'];
  region: Scalars['String']['output'];
};

export type ProjectReward = {
  __typename?: 'ProjectReward';
  /** Category of ProjectReward */
  category?: Maybe<Scalars['String']['output']>;
  /** Confirmation message for the reward */
  confirmationMessage?: Maybe<Scalars['String']['output']>;
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
  /** Estimated delivery time from the time of purchase */
  estimatedDeliveryInWeeks?: Maybe<Scalars['Int']['output']>;
  /** Boolean value to indicate whether this reward requires shipping */
  hasShipping: Scalars['Boolean']['output'];
  id: Scalars['BigInt']['output'];
  /**
   * Project reward images.
   * @deprecated Use images instead.
   */
  image?: Maybe<Scalars['String']['output']>;
  images: Array<Scalars['String']['output']>;
  /** Boolean value to indicate whether this reward is an addon */
  isAddon: Scalars['Boolean']['output'];
  /** Boolean value to indicate whether this reward is hidden */
  isHidden: Scalars['Boolean']['output'];
  /** Maximum times the item can be purchased */
  maxClaimable?: Maybe<Scalars['Int']['output']>;
  /** Name of the reward. */
  name: Scalars['String']['output'];
  /** Posts for the reward */
  posts: Array<Post>;
  /** Boolean value to indicate whether this reward is in development or ready to ship */
  preOrder: Scalars['Boolean']['output'];
  /** Private comment prompts for the reward */
  privateCommentPrompts: Array<PrivateCommentPrompt>;
  /** Boolean value to indicate whether this reward requires shipping */
  project: Project;
  /** Currency in which the reward cost is stored. */
  rewardCurrency: RewardCurrency;
  sentByEmailAt?: Maybe<Scalars['Date']['output']>;
  /** Shipping rates for the reward. */
  shippingConfig?: Maybe<ShippingConfig>;
  /** Short description of the reward. */
  shortDescription?: Maybe<Scalars['String']['output']>;
  /** Number of times this Project Reward was sold. */
  sold: Scalars['Int']['output'];
  soldOut: Scalars['Boolean']['output'];
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

export type ProjectRewardTrendingMonthlyGetRow = {
  __typename?: 'ProjectRewardTrendingMonthlyGetRow';
  count: Scalars['Int']['output'];
  projectReward: ProjectReward;
};

export type ProjectRewardTrendingQuarterlyGetRow = {
  __typename?: 'ProjectRewardTrendingQuarterlyGetRow';
  count: Scalars['Int']['output'];
  projectReward: ProjectReward;
};

export type ProjectRewardTrendingWeeklyGetRow = {
  __typename?: 'ProjectRewardTrendingWeeklyGetRow';
  count: Scalars['Int']['output'];
  projectReward: ProjectReward;
};

export type ProjectRewardsGroupedByRewardIdStats = {
  __typename?: 'ProjectRewardsGroupedByRewardIdStats';
  count: Scalars['Int']['output'];
  projectReward: ProjectRewardsGroupedByRewardIdStatsProjectReward;
};

export type ProjectRewardsGroupedByRewardIdStatsProjectReward = {
  __typename?: 'ProjectRewardsGroupedByRewardIdStatsProjectReward';
  id: Scalars['BigInt']['output'];
  image?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Scalars['String']['output']>;
  maxClaimable?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  sold: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type ProjectRewardsStats = {
  __typename?: 'ProjectRewardsStats';
  count: Scalars['Int']['output'];
};

export enum ProjectShippingConfigType {
  Flat = 'FLAT',
  Incremental = 'INCREMENTAL',
  PerUnit = 'PER_UNIT'
}

export type ProjectShippingConfigsGetInput = {
  projectId: Scalars['BigInt']['input'];
};

export type ProjectShippingRate = {
  __typename?: 'ProjectShippingRate';
  baseRate: Scalars['Int']['output'];
  country: Scalars['String']['output'];
  incrementRate: Scalars['Int']['output'];
  sameAsDefault?: Maybe<Scalars['Boolean']['output']>;
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
  /** @deprecated will be deprecated */
  projectViews?: Maybe<ProjectViewStats>;
};

export enum ProjectStatus {
  Active = 'active',
  Closed = 'closed',
  Deleted = 'deleted',
  Draft = 'draft',
  InReview = 'in_review',
  Inactive = 'inactive',
  PreLaunch = 'pre_launch'
}

export type ProjectStatusUpdate = {
  projectId: Scalars['BigInt']['input'];
  status: ProjectStatus;
};

export enum ProjectSubCategory {
  App = 'APP',
  Art = 'ART',
  Book = 'BOOK',
  CircularEconomy = 'CIRCULAR_ECONOMY',
  Collectible = 'COLLECTIBLE',
  ContentCreator = 'CONTENT_CREATOR',
  Course = 'COURSE',
  Event = 'EVENT',
  Film = 'FILM',
  Fundraiser = 'FUNDRAISER',
  Game = 'GAME',
  HackerSpace = 'HACKER_SPACE',
  Hardware = 'HARDWARE',
  Humanitarian = 'HUMANITARIAN',
  Journalism = 'JOURNALISM',
  LegalFund = 'LEGAL_FUND',
  Lobby = 'LOBBY',
  Medical = 'MEDICAL',
  Meetup = 'MEETUP',
  Music = 'MUSIC',
  OsSoftware = 'OS_SOFTWARE',
  Other = 'OTHER',
  Podcast = 'PODCAST',
  Promotion = 'PROMOTION',
  Travel = 'TRAVEL'
}

export type ProjectSubscriptionPlan = {
  __typename?: 'ProjectSubscriptionPlan';
  cost: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  currency: SubscriptionCurrencyType;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  interval: UserSubscriptionInterval;
  name: Scalars['String']['output'];
  projectId: Scalars['BigInt']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type ProjectSubscriptionPlansInput = {
  where: ProjectSubscriptionPlansWhereInput;
};

export type ProjectSubscriptionPlansWhereInput = {
  projectId: Scalars['BigInt']['input'];
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
  category?: InputMaybe<ProjectCategory>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  ids?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Unique name for the project. Used for the project URL and lightning address. */
  name?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProjectStatus>;
  statuses?: InputMaybe<Array<ProjectStatus>>;
  subCategory?: InputMaybe<ProjectSubCategory>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  type?: InputMaybe<ProjectType>;
};

export type ProjectsMostFundedByCategoryInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  range: ProjectsMostFundedByCategoryRange;
  subCategory?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum ProjectsMostFundedByCategoryRange {
  Week = 'WEEK'
}

export type ProjectsMostFundedByTagInput = {
  range: ProjectsMostFundedByTagRange;
  tagIds: Array<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum ProjectsMostFundedByTagRange {
  Week = 'WEEK'
}

export enum ProjectsOrderByField {
  Balance = 'balance',
  CreatedAt = 'createdAt',
  LaunchedAt = 'launchedAt'
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
  badges: Array<Badge>;
  contribution: Contribution;
  contributionsGet?: Maybe<ContributionsGetResponse>;
  contributor: Funder;
  currencyQuoteGet: CurrencyQuoteGetResponse;
  entry?: Maybe<Entry>;
  fundersGet: Array<Funder>;
  getDashboardFunders: Array<Funder>;
  /** Returns all published entries (deprecated, use posts instead) */
  getEntries: Array<Entry>;
  /**
   * Returns the public key of the Lightning node linked to a project, if there is one.
   * @deprecated No longer supported
   */
  getProjectPubkey?: Maybe<Scalars['String']['output']>;
  getProjectReward: ProjectReward;
  getSignedUploadUrl: SignedUploadUrl;
  getWallet: Wallet;
  geyserPromotionsContributionStats: GeyserPromotionsContributionStats;
  grant: Grant;
  grantStatistics: GrantStatistics;
  grants: Array<Grant>;
  guardianUsersGet?: Maybe<GuardianUsersGetResponse>;
  leaderboardGlobalAmbassadorsGet: Array<GlobalAmbassadorLeaderboardRow>;
  leaderboardGlobalContributorsGet: Array<GlobalContributorLeaderboardRow>;
  leaderboardGlobalCreatorsGet: Array<GlobalCreatorLeaderboardRow>;
  leaderboardGlobalProjectsGet: Array<GlobalProjectLeaderboardRow>;
  lightningAddressVerify: LightningAddressVerifyResponse;
  me?: Maybe<User>;
  orderGet?: Maybe<Order>;
  ordersGet?: Maybe<OrdersGetResponse>;
  ordersStatsGet: OrdersStatsBase;
  payment: Payment;
  paymentInvoiceSanctionCheckStatusGet: PaymentInvoiceSanctionCheckStatusResponse;
  post?: Maybe<Post>;
  postEmailSegmentSizeGet: Scalars['Int']['output'];
  /** Returns all published posts */
  posts: Array<Post>;
  projectCountriesGet: Array<ProjectCountriesGetResult>;
  projectGet?: Maybe<Project>;
  projectGoal: ProjectGoal;
  projectGoals: ProjectGoals;
  projectLeaderboardAmbassadorsGet: Array<ProjectLeaderboardAmbassadorsRow>;
  projectLeaderboardContributorsGet: Array<ProjectLeaderboardContributorsRow>;
  projectNotificationSettingsGet: CreatorNotificationSettings;
  projectRegionsGet: Array<ProjectRegionsGetResult>;
  projectRewardCategoriesGet: Array<Scalars['String']['output']>;
  projectRewardGet: ProjectReward;
  projectRewardsGet: Array<ProjectReward>;
  projectRewardsTrendingMonthlyGet: Array<ProjectRewardTrendingMonthlyGetRow>;
  projectRewardsTrendingQuarterlyGet: Array<ProjectRewardTrendingQuarterlyGetRow>;
  projectRewardsTrendingWeeklyGet: Array<ProjectRewardTrendingWeeklyGetRow>;
  projectShippingConfigsGet: Array<ShippingConfig>;
  projectStatsGet: ProjectStats;
  projectSubscriptionPlan?: Maybe<ProjectSubscriptionPlan>;
  projectSubscriptionPlans: Array<ProjectSubscriptionPlan>;
  /** By default, returns a list of all active projects. */
  projectsGet: ProjectsResponse;
  projectsMostFundedByCategory: Array<ProjectMostFundedByCategory>;
  projectsMostFundedByTag: Array<ProjectMostFundedByTag>;
  projectsSummary: ProjectsSummary;
  shippingAddressesGet: Array<ShippingAddress>;
  statusCheck: Scalars['Boolean']['output'];
  tagsGet: Array<TagsGetResult>;
  tagsMostFundedGet: Array<TagsMostFundedGetResult>;
  user: User;
  userBadge?: Maybe<UserBadge>;
  userBadges: Array<UserBadge>;
  userEmailIsAvailable: Scalars['Boolean']['output'];
  userEmailIsValid: UserEmailIsValidResponse;
  userIpCountry: Scalars['String']['output'];
  userNotificationSettingsGet: ProfileNotificationSettings;
  userSubscription?: Maybe<UserSubscription>;
  userSubscriptions: Array<UserSubscription>;
};


export type QueryActivitiesCountGroupedByProjectArgs = {
  input: ActivitiesCountGroupedByProjectInput;
};


export type QueryActivitiesGetArgs = {
  input?: InputMaybe<GetActivitiesInput>;
};


export type QueryContributionArgs = {
  id?: InputMaybe<Scalars['BigInt']['input']>;
};


export type QueryContributionsGetArgs = {
  input?: InputMaybe<GetContributionsInput>;
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


export type QueryGeyserPromotionsContributionStatsArgs = {
  input: GeyserPromotionsContributionStatsInput;
};


export type QueryGrantArgs = {
  input: GrantGetInput;
};


export type QueryGuardianUsersGetArgs = {
  input: GuardianUsersGetInput;
};


export type QueryLeaderboardGlobalAmbassadorsGetArgs = {
  input: LeaderboardGlobalAmbassadorsGetInput;
};


export type QueryLeaderboardGlobalContributorsGetArgs = {
  input: LeaderboardGlobalContributorsGetInput;
};


export type QueryLeaderboardGlobalCreatorsGetArgs = {
  input: LeaderboardGlobalCreatorsGetInput;
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


export type QueryPaymentArgs = {
  input: PaymentGetInput;
};


export type QueryPaymentInvoiceSanctionCheckStatusGetArgs = {
  input: PaymentInvoiceSanctionCheckStatusGetInput;
};


export type QueryPostArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryPostEmailSegmentSizeGetArgs = {
  input: PostEmailSegmentSizeGetInput;
};


export type QueryPostsArgs = {
  input?: InputMaybe<GetEntriesInput>;
};


export type QueryProjectCountriesGetArgs = {
  input?: InputMaybe<ProjectCountriesGetInput>;
};


export type QueryProjectGetArgs = {
  where: UniqueProjectQueryInput;
};


export type QueryProjectGoalArgs = {
  projectGoalId: Scalars['BigInt']['input'];
};


export type QueryProjectGoalsArgs = {
  input: GetProjectGoalsInput;
};


export type QueryProjectLeaderboardAmbassadorsGetArgs = {
  input: ProjectLeaderboardAmbassadorsGetInput;
};


export type QueryProjectLeaderboardContributorsGetArgs = {
  input: ProjectLeaderboardContributorsGetInput;
};


export type QueryProjectNotificationSettingsGetArgs = {
  projectId: Scalars['BigInt']['input'];
};


export type QueryProjectRewardGetArgs = {
  input: GetProjectRewardInput;
};


export type QueryProjectRewardsGetArgs = {
  input: GetProjectRewardsInput;
};


export type QueryProjectShippingConfigsGetArgs = {
  input: ProjectShippingConfigsGetInput;
};


export type QueryProjectStatsGetArgs = {
  input: GetProjectStatsInput;
};


export type QueryProjectSubscriptionPlanArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryProjectSubscriptionPlansArgs = {
  input: ProjectSubscriptionPlansInput;
};


export type QueryProjectsGetArgs = {
  input?: InputMaybe<ProjectsGetQueryInput>;
};


export type QueryProjectsMostFundedByCategoryArgs = {
  input: ProjectsMostFundedByCategoryInput;
};


export type QueryProjectsMostFundedByTagArgs = {
  input: ProjectsMostFundedByTagInput;
};


export type QueryShippingAddressesGetArgs = {
  input: ShippingAddressesGetInput;
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


export type QueryUserEmailIsAvailableArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserEmailIsValidArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserNotificationSettingsGetArgs = {
  userId: Scalars['BigInt']['input'];
};


export type QueryUserSubscriptionArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryUserSubscriptionsArgs = {
  input: UserSubscriptionsInput;
};

export enum QuoteCurrency {
  Usd = 'USD'
}

export type ResourceInput = {
  resourceId: Scalars['String']['input'];
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

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
  addressLines: Array<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
};

export type ShippingAddressCreateInput = {
  addressLines: Array<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
};

export type ShippingAddressesGetInput = {
  userId: Scalars['BigInt']['input'];
};

export type ShippingConfig = {
  __typename?: 'ShippingConfig';
  globalShipping: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['BigInt']['output']>;
  name: Scalars['String']['output'];
  shippingRates?: Maybe<Array<ProjectShippingRate>>;
  type: ProjectShippingConfigType;
};

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

export type SourceResource = Activity | Entry | Project;

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

export type StripeCheckoutSessionInput = {
  returnUrl: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']['output']>;
  activityCreated: Activity;
  contributionStatusUpdated: ContributionStatusUpdatedSubscriptionResponse;
  entryPublished: EntryPublishedSubscriptionResponse;
  paymentStatusUpdated: Payment;
  postPublished: PostPublishedSubscriptionResponse;
  projectActivated: ProjectActivatedSubscriptionResponse;
};


export type SubscriptionActivityCreatedArgs = {
  input?: InputMaybe<ActivityCreatedSubscriptionInput>;
};


export type SubscriptionContributionStatusUpdatedArgs = {
  input?: InputMaybe<ContributionStatusUpdatedInput>;
};


export type SubscriptionPaymentStatusUpdatedArgs = {
  input: PaymentStatusUpdatedInput;
};

export enum SubscriptionCurrencyType {
  Usdcent = 'USDCENT'
}

export type SubscriptionPaymentConfirmationInput = {
  stripeSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  userSubscriptionUuid: Scalars['String']['input'];
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
  markdown?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  /** Project category */
  category?: InputMaybe<ProjectCategory>;
  /** Project ISO3166 country code */
  countryCode?: InputMaybe<Scalars['String']['input']>;
  /** Description of the project. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Project header images. */
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Project links */
  links?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Project name, used both for the project URL, project lightning address and NIP05. */
  name?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['BigInt']['input'];
  /** Boolean flag to indicate if the project can be promoted. */
  promotionsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Project region */
  region?: InputMaybe<Scalars['String']['input']>;
  /** The currency used to price rewards for the project. Currently only USDCENT supported. Should become an Enum. */
  rewardCurrency?: InputMaybe<RewardCurrency>;
  /** A short description of the project. */
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  /** Project sub-category */
  subCategory?: InputMaybe<ProjectSubCategory>;
  /** Project thumbnail image. */
  thumbnailImage?: InputMaybe<Scalars['String']['input']>;
  /** Public title of the project. */
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProjectType>;
};

export type UpdateProjectRewardInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  confirmationMessage?: InputMaybe<Scalars['String']['input']>;
  /** Cost of the reward, priced in USD cents */
  cost?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  estimatedAvailabilityDate?: InputMaybe<Scalars['Date']['input']>;
  estimatedDeliveryInWeeks?: InputMaybe<Scalars['Int']['input']>;
  hasShipping?: InputMaybe<Scalars['Boolean']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  isAddon?: InputMaybe<Scalars['Boolean']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  maxClaimable?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preOrder?: InputMaybe<Scalars['Boolean']['input']>;
  privateCommentPrompts?: InputMaybe<Array<PrivateCommentPrompt>>;
  projectRewardId: Scalars['BigInt']['input'];
  shippingConfigId?: InputMaybe<Scalars['BigInt']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectShippingConfigInput = {
  globalShipping: Scalars['Boolean']['input'];
  id: Scalars['BigInt']['input'];
  name: Scalars['String']['input'];
  shippingRates: Array<UpdateProjectShippingFeeRateInput>;
  type: ProjectShippingConfigType;
};

export type UpdateProjectShippingFeeRateInput = {
  baseRate: Scalars['Int']['input'];
  country: Scalars['String']['input'];
  incrementRate: Scalars['Int']['input'];
  sameAsDefault: Scalars['Boolean']['input'];
};

export type UpdateProjectSubscriptionPlanInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<SubscriptionCurrencyType>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  intervalType?: InputMaybe<UserSubscriptionInterval>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['BigInt']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserSubscriptionInput = {
  id: Scalars['BigInt']['input'];
  status?: InputMaybe<UserSubscriptionStatus>;
};

export type UpdateWalletInput = {
  feePercentage?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['BigInt']['input'];
  lightningAddressConnectionDetailsInput?: InputMaybe<LightningAddressConnectionDetailsUpdateInput>;
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  nwcConnectionDetailsInput?: InputMaybe<NwcConnectionDetailsUpdateInput>;
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
  complianceDetails: UserComplianceDetails;
  /** Returns a user's contributions across all projects. */
  contributions: Array<Contribution>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerifiedAt?: Maybe<Scalars['Date']['output']>;
  /** The type of entity that the User is in real life. For example, a person, a company, or a non-profit. */
  entityType?: Maybe<UserEntityType>;
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
  guardianType?: Maybe<GuardianType>;
  hasSocialAccount: Scalars['Boolean']['output'];
  heroId: Scalars['String']['output'];
  heroStats: UserHeroStats;
  id: Scalars['BigInt']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isEmailVerified: Scalars['Boolean']['output'];
  orders?: Maybe<Array<Order>>;
  ownerOf: Array<OwnerOf>;
  /**
   * By default, returns all the posts of a user, both published and unpublished but not deleted.
   * To filter the result set, an explicit input can be passed that specifies a value of true or false for the published field.
   * An unpublished post is only returned if the requesting user is the creator of the post.
   */
  posts: Array<Post>;
  /** Details on the participation of a User in a project. */
  projectContributions: Array<UserProjectContribution>;
  projectFollows: Array<Project>;
  /**
   * Returns the projects of a user. By default, this field returns all the projects for that user, both draft and non-draft.
   * To filter the result set, an explicit input can be passed that specifies a value of the status field.
   */
  projects: Array<Project>;
  /** @deprecated Use heroStats.rank instead */
  ranking?: Maybe<Scalars['BigInt']['output']>;
  taxProfile?: Maybe<UserTaxProfile>;
  taxProfileId?: Maybe<Scalars['BigInt']['output']>;
  username: Scalars['String']['output'];
  wallet?: Maybe<Wallet>;
};


export type UserContributionsArgs = {
  input?: InputMaybe<UserContributionsInput>;
};


export type UserEntriesArgs = {
  input?: InputMaybe<UserEntriesGetInput>;
};


export type UserPostsArgs = {
  input?: InputMaybe<UserPostsGetInput>;
};


export type UserProjectsArgs = {
  input?: InputMaybe<UserProjectsGetInput>;
};

export type UserBadge = {
  __typename?: 'UserBadge';
  badge: Badge;
  badgeAwardEventId?: Maybe<Scalars['String']['output']>;
  contributionId?: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['BigInt']['output'];
  status?: Maybe<UserBadgeStatus>;
  updatedAt: Scalars['Date']['output'];
  userId: Scalars['BigInt']['output'];
};

export enum UserBadgeStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING'
}

export type UserComplianceDetails = {
  __typename?: 'UserComplianceDetails';
  contributionLimits: UserContributionLimits;
  currentVerificationLevel: UserVerificationLevelStatus;
  verificationLevels: Array<UserVerificationLevelStatus>;
  verifiedDetails: UserVerifiedDetails;
};

export type UserContributionLimit = {
  __typename?: 'UserContributionLimit';
  limit: Scalars['Float']['output'];
  nextReset: Scalars['Date']['output'];
  reached: Scalars['Boolean']['output'];
  remaining: Scalars['Float']['output'];
};

export type UserContributionLimits = {
  __typename?: 'UserContributionLimits';
  monthly: UserContributionLimit;
};

export type UserContributionsInput = {
  pagination?: InputMaybe<PaginationInput>;
};

export type UserEmailIsValidResponse = {
  __typename?: 'UserEmailIsValidResponse';
  isAvailable: Scalars['Boolean']['output'];
  isDeliverable: Scalars['Boolean']['output'];
  isValid: Scalars['Boolean']['output'];
  reason?: Maybe<Scalars['String']['output']>;
};

export type UserEmailUpdateInput = {
  email: Scalars['String']['input'];
  /** The two-factor authentication input is required if the user already has an email set. */
  twoFAInput?: InputMaybe<TwoFaInput>;
};

export enum UserEntityType {
  Company = 'COMPANY',
  NonProfit = 'NON_PROFIT',
  Person = 'PERSON'
}

export type UserEntriesGetInput = {
  where?: InputMaybe<UserEntriesGetWhereInput>;
};

export type UserEntriesGetWhereInput = {
  published?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserGetInput = {
  heroId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
};

export type UserHeroStats = {
  __typename?: 'UserHeroStats';
  ambassadorStats: AmbassadorStats;
  contributorStats: ContributorStats;
  creatorStats: CreatorStats;
};

export type UserNotificationSettings = {
  __typename?: 'UserNotificationSettings';
  notificationSettings: Array<NotificationSettings>;
  userId: Scalars['BigInt']['output'];
};

export type UserPostsGetInput = {
  where?: InputMaybe<UserPostsGetWhereInput>;
};

export type UserPostsGetWhereInput = {
  published?: InputMaybe<Scalars['Boolean']['input']>;
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

export type UserSubscription = {
  __typename?: 'UserSubscription';
  canceledAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['BigInt']['output'];
  nextBillingDate: Scalars['Date']['output'];
  projectSubscriptionPlan: ProjectSubscriptionPlan;
  startDate: Scalars['Date']['output'];
  status: UserSubscriptionStatus;
  updatedAt: Scalars['Date']['output'];
};

export enum UserSubscriptionInterval {
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export enum UserSubscriptionStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Paused = 'PAUSED'
}

export type UserSubscriptionsInput = {
  where: UserSubscriptionsWhereInput;
};

export type UserSubscriptionsWhereInput = {
  userId: Scalars['BigInt']['input'];
};

export type UserTaxProfile = {
  __typename?: 'UserTaxProfile';
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  legalEntityType: LegalEntityType;
  state?: Maybe<Scalars['String']['output']>;
  taxId?: Maybe<Scalars['String']['output']>;
  userId: Scalars['BigInt']['output'];
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type UserTaxProfileUpdateInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  legalEntityType: LegalEntityType;
  state?: InputMaybe<Scalars['String']['input']>;
  taxId?: InputMaybe<Scalars['String']['input']>;
};

export enum UserVerificationLevel {
  Level_0 = 'LEVEL_0',
  Level_1 = 'LEVEL_1',
  Level_2 = 'LEVEL_2',
  Level_3 = 'LEVEL_3'
}

export enum UserVerificationLevelInput {
  Level_2 = 'LEVEL_2',
  Level_3 = 'LEVEL_3'
}

export type UserVerificationLevelStatus = {
  __typename?: 'UserVerificationLevelStatus';
  level: UserVerificationLevel;
  status: UserVerificationStatus;
  verifiedAt?: Maybe<Scalars['Date']['output']>;
};

export enum UserVerificationStatus {
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED'
}

export type UserVerificationTokenGenerateInput = {
  verificationLevel: UserVerificationLevelInput;
};

export type UserVerificationTokenGenerateResponse = {
  __typename?: 'UserVerificationTokenGenerateResponse';
  token: Scalars['String']['output'];
  verificationLevel: UserVerificationLevel;
};

export type UserVerifiedDetails = {
  __typename?: 'UserVerifiedDetails';
  email?: Maybe<VerificationResult>;
  identity?: Maybe<VerificationResult>;
  phoneNumber?: Maybe<VerificationResult>;
};

export type VerificationResult = {
  __typename?: 'VerificationResult';
  verified?: Maybe<Scalars['Boolean']['output']>;
  verifiedAt?: Maybe<Scalars['Date']['output']>;
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
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  ActivityResource: ( Omit<Contribution, 'bitcoinQuote' | 'payments' | 'sourceResource'> & { bitcoinQuote?: Maybe<_RefType['BitcoinQuote']>, payments: Array<_RefType['Payment']>, sourceResource?: Maybe<_RefType['SourceResource']> } ) | ( Omit<Entry, 'contributions' | 'creator' | 'project'> & { contributions: Array<_RefType['Contribution']>, creator: _RefType['User'], project?: Maybe<_RefType['Project']> } ) | ( Omit<Post, 'contributions' | 'creator' | 'project'> & { contributions: Array<_RefType['Contribution']>, creator: _RefType['User'], project?: Maybe<_RefType['Project']> } ) | ( Omit<Project, 'ambassadors' | 'contributions' | 'entries' | 'followers' | 'grantApplications' | 'owners' | 'sponsors' | 'wallets'> & { ambassadors: _RefType['ProjectAmbassadorsConnection'], contributions: Array<_RefType['Contribution']>, entries: Array<_RefType['Entry']>, followers: Array<_RefType['User']>, grantApplications: Array<_RefType['GrantApplicant']>, owners: Array<_RefType['Owner']>, sponsors: Array<_RefType['Sponsor']>, wallets: Array<_RefType['Wallet']> } ) | ( ProjectGoal ) | ( Omit<ProjectReward, 'project'> & { project: _RefType['Project'] } );
  ConnectionDetails: ( LightningAddressConnectionDetails ) | ( LndConnectionDetailsPrivate ) | ( LndConnectionDetailsPublic ) | ( NwcConnectionDetailsPrivate );
  Grant: ( Omit<BoardVoteGrant, 'applicants' | 'boardMembers' | 'sponsors'> & { applicants: Array<_RefType['GrantApplicant']>, boardMembers: Array<_RefType['GrantBoardMember']>, sponsors: Array<_RefType['Sponsor']> } ) | ( Omit<CommunityVoteGrant, 'applicants' | 'sponsors'> & { applicants: Array<_RefType['GrantApplicant']>, sponsors: Array<_RefType['Sponsor']> } );
  PaymentDetails: ( FiatSwapPaymentDetails ) | ( LightningPaymentDetails ) | ( OnChainSwapPaymentDetails );
  SourceResource: ( Omit<Activity, 'project' | 'resource'> & { project: _RefType['Project'], resource: _RefType['ActivityResource'] } ) | ( Omit<Entry, 'contributions' | 'creator' | 'project'> & { contributions: Array<_RefType['Contribution']>, creator: _RefType['User'], project?: Maybe<_RefType['Project']> } ) | ( Omit<Project, 'ambassadors' | 'contributions' | 'entries' | 'followers' | 'grantApplications' | 'owners' | 'sponsors' | 'wallets'> & { ambassadors: _RefType['ProjectAmbassadorsConnection'], contributions: Array<_RefType['Contribution']>, entries: Array<_RefType['Entry']>, followers: Array<_RefType['User']>, grantApplications: Array<_RefType['GrantApplicant']>, owners: Array<_RefType['Owner']>, sponsors: Array<_RefType['Sponsor']>, wallets: Array<_RefType['Wallet']> } );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  GraphData: ( ProjectContributionsStatsGraphDataAmount );
  GraphSumData: ( FunderRewardGraphSum );
  HeroStats: ( AmbassadorStats ) | ( ContributorStats ) | ( CreatorStats );
  LndConnectionDetails: never;
  MutationResponse: ( DeleteUserResponse ) | ( ProjectDeleteResponse ) | ( ProjectGoalDeleteResponse );
  StatsInterface: ( ProjectContributionsGroupedByMethodStats ) | ( ProjectContributionsStats );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ActivitiesCountGroupedByProjectInput: ActivitiesCountGroupedByProjectInput;
  ActivitiesGetResponse: ResolverTypeWrapper<Omit<ActivitiesGetResponse, 'activities'> & { activities: Array<ResolversTypes['Activity']> }>;
  Activity: ResolverTypeWrapper<Omit<Activity, 'project' | 'resource'> & { project: ResolversTypes['Project'], resource: ResolversTypes['ActivityResource'] }>;
  ActivityCreatedSubscriptionInput: ActivityCreatedSubscriptionInput;
  ActivityCreatedSubscriptionWhereInput: ActivityCreatedSubscriptionWhereInput;
  ActivityFeedName: ActivityFeedName;
  ActivityResource: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ActivityResource']>;
  ActivityResourceType: ActivityResourceType;
  Ambassador: ResolverTypeWrapper<Omit<Ambassador, 'user'> & { user: ResolversTypes['User'] }>;
  AmbassadorAddInput: AmbassadorAddInput;
  AmbassadorStats: ResolverTypeWrapper<AmbassadorStats>;
  AmbassadorUpdateInput: AmbassadorUpdateInput;
  AmountCurrency: AmountCurrency;
  AmountSummary: ResolverTypeWrapper<AmountSummary>;
  AnalyticsGroupByInterval: AnalyticsGroupByInterval;
  Badge: ResolverTypeWrapper<Badge>;
  BadgeClaimInput: BadgeClaimInput;
  BadgesGetInput: BadgesGetInput;
  BadgesGetWhereInput: BadgesGetWhereInput;
  BaseCurrency: BaseCurrency;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BitcoinPaymentMethods: ResolverTypeWrapper<BitcoinPaymentMethods>;
  BitcoinQuote: ResolverTypeWrapper<BitcoinQuote>;
  BoardVoteGrant: ResolverTypeWrapper<Omit<BoardVoteGrant, 'applicants' | 'boardMembers' | 'sponsors'> & { applicants: Array<ResolversTypes['GrantApplicant']>, boardMembers: Array<ResolversTypes['GrantBoardMember']>, sponsors: Array<ResolversTypes['Sponsor']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CommunityVoteGrant: ResolverTypeWrapper<Omit<CommunityVoteGrant, 'applicants' | 'sponsors'> & { applicants: Array<ResolversTypes['GrantApplicant']>, sponsors: Array<ResolversTypes['Sponsor']> }>;
  CompetitionVoteGrantVoteSummary: ResolverTypeWrapper<CompetitionVoteGrantVoteSummary>;
  ConnectionDetails: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ConnectionDetails']>;
  Contribution: ResolverTypeWrapper<Omit<Contribution, 'bitcoinQuote' | 'payments' | 'sourceResource'> & { bitcoinQuote?: Maybe<ResolversTypes['BitcoinQuote']>, payments: Array<ResolversTypes['Payment']>, sourceResource?: Maybe<ResolversTypes['SourceResource']> }>;
  ContributionCreateInput: ContributionCreateInput;
  ContributionEmailUpdateInput: ContributionEmailUpdateInput;
  ContributionFiatPaymentDetails: ResolverTypeWrapper<ContributionFiatPaymentDetails>;
  ContributionFiatPaymentDetailsInput: ContributionFiatPaymentDetailsInput;
  ContributionFiatPaymentDetailsStripeInput: ContributionFiatPaymentDetailsStripeInput;
  ContributionFiatSwapPaymentDetails: ResolverTypeWrapper<ContributionFiatSwapPaymentDetails>;
  ContributionFiatSwapPaymentDetailsBanxaInput: ContributionFiatSwapPaymentDetailsBanxaInput;
  ContributionFiatSwapPaymentDetailsBoltzInput: ContributionFiatSwapPaymentDetailsBoltzInput;
  ContributionFiatSwapPaymentDetailsInput: ContributionFiatSwapPaymentDetailsInput;
  ContributionLightningPaymentDetails: ResolverTypeWrapper<ContributionLightningPaymentDetails>;
  ContributionLightningPaymentDetailsInput: ContributionLightningPaymentDetailsInput;
  ContributionMetadataInput: ContributionMetadataInput;
  ContributionMutationResponse: ResolverTypeWrapper<Omit<ContributionMutationResponse, 'contribution'> & { contribution: ResolversTypes['Contribution'] }>;
  ContributionOnChainSwapPaymentDetails: ResolverTypeWrapper<ContributionOnChainSwapPaymentDetails>;
  ContributionOnChainSwapPaymentDetailsInput: ContributionOnChainSwapPaymentDetailsInput;
  ContributionPaymentsAddInput: ContributionPaymentsAddInput;
  ContributionPaymentsAddResponse: ResolverTypeWrapper<ContributionPaymentsAddResponse>;
  ContributionPaymentsDetails: ResolverTypeWrapper<ContributionPaymentsDetails>;
  ContributionPaymentsInput: ContributionPaymentsInput;
  ContributionStatus: ContributionStatus;
  ContributionStatusUpdatedInput: ContributionStatusUpdatedInput;
  ContributionStatusUpdatedSubscriptionResponse: ResolverTypeWrapper<Omit<ContributionStatusUpdatedSubscriptionResponse, 'contribution'> & { contribution: ResolversTypes['Contribution'] }>;
  ContributionsGetResponse: ResolverTypeWrapper<Omit<ContributionsGetResponse, 'contributions'> & { contributions: Array<ResolversTypes['Contribution']> }>;
  ContributionsSummary: ResolverTypeWrapper<ContributionsSummary>;
  ContributionsSummaryPeriod: ContributionsSummaryPeriod;
  ContributionsWhereContributionStatus: ContributionsWhereContributionStatus;
  ContributorContributionsSummary: ResolverTypeWrapper<ContributorContributionsSummary>;
  ContributorStats: ResolverTypeWrapper<ContributorStats>;
  Country: ResolverTypeWrapper<Country>;
  CreateEntryInput: CreateEntryInput;
  CreateProjectInput: CreateProjectInput;
  CreateProjectRewardInput: CreateProjectRewardInput;
  CreateProjectShippingConfigInput: CreateProjectShippingConfigInput;
  CreateProjectSubscriptionPlanInput: CreateProjectSubscriptionPlanInput;
  CreateUserSubscriptionInput: CreateUserSubscriptionInput;
  CreateWalletInput: CreateWalletInput;
  CreatorNotificationSettings: ResolverTypeWrapper<CreatorNotificationSettings>;
  CreatorNotificationSettingsProject: ResolverTypeWrapper<CreatorNotificationSettingsProject>;
  CreatorStats: ResolverTypeWrapper<CreatorStats>;
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
  EmailSendOptionsInput: EmailSendOptionsInput;
  EmailSubscriberSegment: EmailSubscriberSegment;
  EmailVerifyInput: EmailVerifyInput;
  Entry: ResolverTypeWrapper<Omit<Entry, 'contributions' | 'creator' | 'project'> & { contributions: Array<ResolversTypes['Contribution']>, creator: ResolversTypes['User'], project?: Maybe<ResolversTypes['Project']> }>;
  EntryPublishedSubscriptionResponse: ResolverTypeWrapper<Omit<EntryPublishedSubscriptionResponse, 'entry'> & { entry: ResolversTypes['Entry'] }>;
  EntryStatus: EntryStatus;
  EntryType: EntryType;
  ExternalAccount: ResolverTypeWrapper<ExternalAccount>;
  FeeCurrency: FeeCurrency;
  FiatPaymentMethods: ResolverTypeWrapper<FiatPaymentMethods>;
  FiatSwapPaymentDetails: ResolverTypeWrapper<FiatSwapPaymentDetails>;
  FileUploadInput: FileUploadInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Funder: ResolverTypeWrapper<Omit<Funder, 'contributions' | 'user'> & { contributions: Array<ResolversTypes['Contribution']>, user?: Maybe<ResolversTypes['User']> }>;
  FunderRewardGraphSum: ResolverTypeWrapper<FunderRewardGraphSum>;
  FundingResourceType: FundingResourceType;
  GetActivitiesInput: GetActivitiesInput;
  GetActivityOrderByInput: GetActivityOrderByInput;
  GetActivityPaginationInput: GetActivityPaginationInput;
  GetActivityWhereInput: GetActivityWhereInput;
  GetContributionsInput: GetContributionsInput;
  GetContributionsOrderByInput: GetContributionsOrderByInput;
  GetContributionsWhereInput: GetContributionsWhereInput;
  GetContributorContributionsInput: GetContributorContributionsInput;
  GetContributorContributionsWhereInput: GetContributorContributionsWhereInput;
  GetContributorInput: GetContributorInput;
  GetDashboardFundersWhereInput: GetDashboardFundersWhereInput;
  GetEntriesInput: GetEntriesInput;
  GetEntriesOrderByInput: GetEntriesOrderByInput;
  GetEntriesWhereInput: GetEntriesWhereInput;
  GetFunderWhereInput: GetFunderWhereInput;
  GetFundersInput: GetFundersInput;
  GetFundersOrderByInput: GetFundersOrderByInput;
  GetProjectGoalsInput: GetProjectGoalsInput;
  GetProjectOrdersStatsInput: GetProjectOrdersStatsInput;
  GetProjectOrdersStatsWhereInput: GetProjectOrdersStatsWhereInput;
  GetProjectRewardInput: GetProjectRewardInput;
  GetProjectRewardWhereInput: GetProjectRewardWhereInput;
  GetProjectRewardsInput: GetProjectRewardsInput;
  GetProjectRewardsWhereInput: GetProjectRewardsWhereInput;
  GetProjectStatsInput: GetProjectStatsInput;
  GetProjectStatsWhereInput: GetProjectStatsWhereInput;
  GeyserPromotionsContributionStats: ResolverTypeWrapper<GeyserPromotionsContributionStats>;
  GeyserPromotionsContributionStatsInput: GeyserPromotionsContributionStatsInput;
  GeyserPromotionsContributionStatsWhereInput: GeyserPromotionsContributionStatsWhereInput;
  GlobalAmbassadorLeaderboardRow: ResolverTypeWrapper<GlobalAmbassadorLeaderboardRow>;
  GlobalContributorLeaderboardRow: ResolverTypeWrapper<GlobalContributorLeaderboardRow>;
  GlobalCreatorLeaderboardRow: ResolverTypeWrapper<GlobalCreatorLeaderboardRow>;
  GlobalProjectLeaderboardRow: ResolverTypeWrapper<GlobalProjectLeaderboardRow>;
  Grant: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Grant']>;
  GrantApplicant: ResolverTypeWrapper<Omit<GrantApplicant, 'contributors' | 'grant' | 'project'> & { contributors: Array<ResolversTypes['GrantApplicantContributor']>, grant: ResolversTypes['Grant'], project: ResolversTypes['Project'] }>;
  GrantApplicantContributor: ResolverTypeWrapper<Omit<GrantApplicantContributor, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
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
  GrantBoardMember: ResolverTypeWrapper<Omit<GrantBoardMember, 'user'> & { user: ResolversTypes['User'] }>;
  GrantGetInput: GrantGetInput;
  GrantGetWhereInput: GrantGetWhereInput;
  GrantGuardiansFunding: ResolverTypeWrapper<GrantGuardiansFunding>;
  GrantStatistics: ResolverTypeWrapper<GrantStatistics>;
  GrantStatisticsApplicant: ResolverTypeWrapper<GrantStatisticsApplicant>;
  GrantStatisticsGrant: ResolverTypeWrapper<GrantStatisticsGrant>;
  GrantStatus: ResolverTypeWrapper<GrantStatus>;
  GrantStatusEnum: GrantStatusEnum;
  GrantType: GrantType;
  GraphData: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['GraphData']>;
  GraphSumData: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['GraphSumData']>;
  GuardianResult: ResolverTypeWrapper<GuardianResult>;
  GuardianType: GuardianType;
  GuardianUser: ResolverTypeWrapper<GuardianUser>;
  GuardianUsersGetInput: GuardianUsersGetInput;
  GuardianUsersGetResponse: ResolverTypeWrapper<GuardianUsersGetResponse>;
  GuardianUsersGetWhereInput: GuardianUsersGetWhereInput;
  HeroStats: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['HeroStats']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LeaderboardGlobalAmbassadorsGetInput: LeaderboardGlobalAmbassadorsGetInput;
  LeaderboardGlobalContributorsGetInput: LeaderboardGlobalContributorsGetInput;
  LeaderboardGlobalCreatorsGetInput: LeaderboardGlobalCreatorsGetInput;
  LeaderboardGlobalProjectsGetInput: LeaderboardGlobalProjectsGetInput;
  LeaderboardPeriod: LeaderboardPeriod;
  LegalEntityType: LegalEntityType;
  LightningAddressConnectionDetails: ResolverTypeWrapper<LightningAddressConnectionDetails>;
  LightningAddressConnectionDetailsCreateInput: LightningAddressConnectionDetailsCreateInput;
  LightningAddressConnectionDetailsUpdateInput: LightningAddressConnectionDetailsUpdateInput;
  LightningAddressContributionLimits: ResolverTypeWrapper<LightningAddressContributionLimits>;
  LightningAddressVerifyResponse: ResolverTypeWrapper<LightningAddressVerifyResponse>;
  LightningInvoiceStatus: LightningInvoiceStatus;
  LightningPaymentDetails: ResolverTypeWrapper<LightningPaymentDetails>;
  LightningPaymentMethods: ResolverTypeWrapper<LightningPaymentMethods>;
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
  NWCConnectionDetailsCreateInput: NwcConnectionDetailsCreateInput;
  NWCConnectionDetailsPrivate: ResolverTypeWrapper<NwcConnectionDetailsPrivate>;
  NWCConnectionDetailsPublic: ResolverTypeWrapper<NwcConnectionDetailsPublic>;
  NWCConnectionDetailsUpdateInput: NwcConnectionDetailsUpdateInput;
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
  OnChainPaymentMethods: ResolverTypeWrapper<OnChainPaymentMethods>;
  OnChainSwapPaymentDetails: ResolverTypeWrapper<OnChainSwapPaymentDetails>;
  OnChainTxInput: OnChainTxInput;
  Order: ResolverTypeWrapper<Omit<Order, 'contribution' | 'project' | 'user'> & { contribution: ResolversTypes['Contribution'], project: ResolversTypes['Project'], user?: Maybe<ResolversTypes['User']> }>;
  OrderBitcoinQuoteInput: OrderBitcoinQuoteInput;
  OrderByDirection: OrderByDirection;
  OrderByOptions: OrderByOptions;
  OrderContributionInput: OrderContributionInput;
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
  Owner: ResolverTypeWrapper<Omit<Owner, 'user'> & { user: ResolversTypes['User'] }>;
  OwnerOf: ResolverTypeWrapper<Omit<OwnerOf, 'owner' | 'project'> & { owner?: Maybe<ResolversTypes['Owner']>, project?: Maybe<ResolversTypes['Project']> }>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PageViewCountGraph: ResolverTypeWrapper<PageViewCountGraph>;
  PaginationCursor: ResolverTypeWrapper<PaginationCursor>;
  PaginationInput: PaginationInput;
  Payment: ResolverTypeWrapper<Omit<Payment, 'fees' | 'paymentDetails'> & { fees: Array<ResolversTypes['PaymentFee']>, paymentDetails: ResolversTypes['PaymentDetails'] }>;
  PaymentCancelInput: PaymentCancelInput;
  PaymentCancelResponse: ResolverTypeWrapper<PaymentCancelResponse>;
  PaymentConfirmInput: PaymentConfirmInput;
  PaymentConfirmResponse: ResolverTypeWrapper<PaymentConfirmResponse>;
  PaymentCurrency: PaymentCurrency;
  PaymentDetails: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['PaymentDetails']>;
  PaymentFailInput: PaymentFailInput;
  PaymentFailResponse: ResolverTypeWrapper<PaymentFailResponse>;
  PaymentFee: ResolverTypeWrapper<PaymentFee>;
  PaymentFeePayer: PaymentFeePayer;
  PaymentFeeType: PaymentFeeType;
  PaymentGetInput: PaymentGetInput;
  PaymentInvoiceCancelResponse: ResolverTypeWrapper<PaymentInvoiceCancelResponse>;
  PaymentInvoiceSanctionCheckStatus: PaymentInvoiceSanctionCheckStatus;
  PaymentInvoiceSanctionCheckStatusGetInput: PaymentInvoiceSanctionCheckStatusGetInput;
  PaymentInvoiceSanctionCheckStatusResponse: ResolverTypeWrapper<PaymentInvoiceSanctionCheckStatusResponse>;
  PaymentMethods: ResolverTypeWrapper<PaymentMethods>;
  PaymentPendInput: PaymentPendInput;
  PaymentPendOnChainSwapInput: PaymentPendOnChainSwapInput;
  PaymentPendResponse: ResolverTypeWrapper<PaymentPendResponse>;
  PaymentStatus: PaymentStatus;
  PaymentStatusUpdatedInput: PaymentStatusUpdatedInput;
  PaymentType: PaymentType;
  PayoutCurrency: PayoutCurrency;
  PodcastKeysendContributionCreateInput: PodcastKeysendContributionCreateInput;
  PodcastKeysendContributionCreateResponse: ResolverTypeWrapper<PodcastKeysendContributionCreateResponse>;
  Post: ResolverTypeWrapper<Omit<Post, 'contributions' | 'creator' | 'project'> & { contributions: Array<ResolversTypes['Contribution']>, creator: ResolversTypes['User'], project?: Maybe<ResolversTypes['Project']> }>;
  PostCreateInput: PostCreateInput;
  PostEmailSegmentSizeGetInput: PostEmailSegmentSizeGetInput;
  PostGetInput: PostGetInput;
  PostGetOrderByInput: PostGetOrderByInput;
  PostGetWhereInput: PostGetWhereInput;
  PostPublishInput: PostPublishInput;
  PostPublishedSubscriptionResponse: ResolverTypeWrapper<PostPublishedSubscriptionResponse>;
  PostRepostOnNostrInput: PostRepostOnNostrInput;
  PostRepostOnNostrResponse: ResolverTypeWrapper<PostRepostOnNostrResponse>;
  PostSendByEmailInput: PostSendByEmailInput;
  PostSendByEmailResponse: ResolverTypeWrapper<PostSendByEmailResponse>;
  PostStatus: PostStatus;
  PostType: PostType;
  PostUpdateInput: PostUpdateInput;
  PrivateCommentPrompt: PrivateCommentPrompt;
  ProfileNotificationSettings: ResolverTypeWrapper<ProfileNotificationSettings>;
  Project: ResolverTypeWrapper<Omit<Project, 'ambassadors' | 'contributions' | 'entries' | 'followers' | 'grantApplications' | 'owners' | 'sponsors' | 'wallets'> & { ambassadors: ResolversTypes['ProjectAmbassadorsConnection'], contributions: Array<ResolversTypes['Contribution']>, entries: Array<ResolversTypes['Entry']>, followers: Array<ResolversTypes['User']>, grantApplications: Array<ResolversTypes['GrantApplicant']>, owners: Array<ResolversTypes['Owner']>, sponsors: Array<ResolversTypes['Sponsor']>, wallets: Array<ResolversTypes['Wallet']> }>;
  ProjectActivatedSubscriptionResponse: ResolverTypeWrapper<Omit<ProjectActivatedSubscriptionResponse, 'project'> & { project: ResolversTypes['Project'] }>;
  ProjectActivitiesCount: ResolverTypeWrapper<Omit<ProjectActivitiesCount, 'project'> & { project: ResolversTypes['Project'] }>;
  ProjectAmbassadorEdge: ResolverTypeWrapper<Omit<ProjectAmbassadorEdge, 'node'> & { node: ResolversTypes['Ambassador'] }>;
  ProjectAmbassadorsConnection: ResolverTypeWrapper<Omit<ProjectAmbassadorsConnection, 'edges'> & { edges: Array<ResolversTypes['ProjectAmbassadorEdge']> }>;
  ProjectAmbassadorsStats: ResolverTypeWrapper<ProjectAmbassadorsStats>;
  ProjectCategory: ProjectCategory;
  ProjectCloseMutationInput: ProjectCloseMutationInput;
  ProjectContributionsGroupedByMethodStats: ResolverTypeWrapper<ProjectContributionsGroupedByMethodStats>;
  ProjectContributionsStats: ResolverTypeWrapper<ProjectContributionsStats>;
  ProjectContributionsStatsBase: ResolverTypeWrapper<ProjectContributionsStatsBase>;
  ProjectContributionsStatsGraphData: ResolverTypeWrapper<ProjectContributionsStatsGraphData>;
  ProjectContributionsStatsGraphDataAmount: ResolverTypeWrapper<ProjectContributionsStatsGraphDataAmount>;
  ProjectContributionsStatsGraphDataStatType: ProjectContributionsStatsGraphDataStatType;
  ProjectCountriesGetInput: ProjectCountriesGetInput;
  ProjectCountriesGetResult: ResolverTypeWrapper<ProjectCountriesGetResult>;
  ProjectDeleteResponse: ResolverTypeWrapper<ProjectDeleteResponse>;
  ProjectEntriesGetInput: ProjectEntriesGetInput;
  ProjectEntriesGetWhereInput: ProjectEntriesGetWhereInput;
  ProjectFollowMutationInput: ProjectFollowMutationInput;
  ProjectFollowerStats: ResolverTypeWrapper<ProjectFollowerStats>;
  ProjectFunderRewardStats: ResolverTypeWrapper<ProjectFunderRewardStats>;
  ProjectFunderStats: ResolverTypeWrapper<ProjectFunderStats>;
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
  ProjectLeaderboardAmbassadorsGetInput: ProjectLeaderboardAmbassadorsGetInput;
  ProjectLeaderboardAmbassadorsRow: ResolverTypeWrapper<Omit<ProjectLeaderboardAmbassadorsRow, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  ProjectLeaderboardContributorsGetInput: ProjectLeaderboardContributorsGetInput;
  ProjectLeaderboardContributorsRow: ResolverTypeWrapper<Omit<ProjectLeaderboardContributorsRow, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  ProjectLeaderboardPeriod: ProjectLeaderboardPeriod;
  ProjectLinkMutationInput: ProjectLinkMutationInput;
  ProjectMostFunded: ResolverTypeWrapper<Omit<ProjectMostFunded, 'project'> & { project: ResolversTypes['Project'] }>;
  ProjectMostFundedByCategory: ResolverTypeWrapper<Omit<ProjectMostFundedByCategory, 'projects'> & { projects: Array<ResolversTypes['ProjectMostFunded']> }>;
  ProjectMostFundedByTag: ResolverTypeWrapper<Omit<ProjectMostFundedByTag, 'projects'> & { projects: Array<ResolversTypes['ProjectMostFunded']> }>;
  ProjectPostsGetInput: ProjectPostsGetInput;
  ProjectPostsGetWhereInput: ProjectPostsGetWhereInput;
  ProjectPreLaunchMutationInput: ProjectPreLaunchMutationInput;
  ProjectPublishMutationInput: ProjectPublishMutationInput;
  ProjectPutInReviewMutationInput: ProjectPutInReviewMutationInput;
  ProjectRegionsGetResult: ResolverTypeWrapper<ProjectRegionsGetResult>;
  ProjectReward: ResolverTypeWrapper<Omit<ProjectReward, 'project'> & { project: ResolversTypes['Project'] }>;
  ProjectRewardCurrencyUpdate: ProjectRewardCurrencyUpdate;
  ProjectRewardCurrencyUpdateRewardsInput: ProjectRewardCurrencyUpdateRewardsInput;
  ProjectRewardTrendingMonthlyGetRow: ResolverTypeWrapper<ProjectRewardTrendingMonthlyGetRow>;
  ProjectRewardTrendingQuarterlyGetRow: ResolverTypeWrapper<ProjectRewardTrendingQuarterlyGetRow>;
  ProjectRewardTrendingWeeklyGetRow: ResolverTypeWrapper<ProjectRewardTrendingWeeklyGetRow>;
  ProjectRewardsGroupedByRewardIdStats: ResolverTypeWrapper<ProjectRewardsGroupedByRewardIdStats>;
  ProjectRewardsGroupedByRewardIdStatsProjectReward: ResolverTypeWrapper<ProjectRewardsGroupedByRewardIdStatsProjectReward>;
  ProjectRewardsStats: ResolverTypeWrapper<ProjectRewardsStats>;
  ProjectShippingConfigType: ProjectShippingConfigType;
  ProjectShippingConfigsGetInput: ProjectShippingConfigsGetInput;
  ProjectShippingRate: ResolverTypeWrapper<ProjectShippingRate>;
  ProjectStatistics: ResolverTypeWrapper<ProjectStatistics>;
  ProjectStats: ResolverTypeWrapper<ProjectStats>;
  ProjectStatsBase: ResolverTypeWrapper<ProjectStatsBase>;
  ProjectStatus: ProjectStatus;
  ProjectStatusUpdate: ProjectStatusUpdate;
  ProjectSubCategory: ProjectSubCategory;
  ProjectSubscriptionPlan: ResolverTypeWrapper<ProjectSubscriptionPlan>;
  ProjectSubscriptionPlansInput: ProjectSubscriptionPlansInput;
  ProjectSubscriptionPlansWhereInput: ProjectSubscriptionPlansWhereInput;
  ProjectTagMutationInput: ProjectTagMutationInput;
  ProjectType: ProjectType;
  ProjectViewBaseStats: ResolverTypeWrapper<ProjectViewBaseStats>;
  ProjectViewStats: ResolverTypeWrapper<ProjectViewStats>;
  ProjectsGetQueryInput: ProjectsGetQueryInput;
  ProjectsGetWhereInput: ProjectsGetWhereInput;
  ProjectsMostFundedByCategoryInput: ProjectsMostFundedByCategoryInput;
  ProjectsMostFundedByCategoryRange: ProjectsMostFundedByCategoryRange;
  ProjectsMostFundedByTagInput: ProjectsMostFundedByTagInput;
  ProjectsMostFundedByTagRange: ProjectsMostFundedByTagRange;
  ProjectsOrderByField: ProjectsOrderByField;
  ProjectsOrderByInput: ProjectsOrderByInput;
  ProjectsResponse: ResolverTypeWrapper<Omit<ProjectsResponse, 'projects'> & { projects: Array<ResolversTypes['Project']> }>;
  ProjectsSummary: ResolverTypeWrapper<ProjectsSummary>;
  Query: ResolverTypeWrapper<{}>;
  QuoteCurrency: QuoteCurrency;
  ResourceInput: ResourceInput;
  RewardCurrency: RewardCurrency;
  SendOtpByEmailInput: SendOtpByEmailInput;
  SettingValueType: SettingValueType;
  ShippingAddress: ResolverTypeWrapper<ShippingAddress>;
  ShippingAddressCreateInput: ShippingAddressCreateInput;
  ShippingAddressesGetInput: ShippingAddressesGetInput;
  ShippingConfig: ResolverTypeWrapper<ShippingConfig>;
  ShippingDestination: ShippingDestination;
  SignedUploadUrl: ResolverTypeWrapper<SignedUploadUrl>;
  SourceResource: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SourceResource']>;
  Sponsor: ResolverTypeWrapper<Omit<Sponsor, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  SponsorStatus: SponsorStatus;
  StatsInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['StatsInterface']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StripeCheckoutSessionInput: StripeCheckoutSessionInput;
  Subscription: ResolverTypeWrapper<{}>;
  SubscriptionCurrencyType: SubscriptionCurrencyType;
  SubscriptionPaymentConfirmationInput: SubscriptionPaymentConfirmationInput;
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
  UpdateProjectShippingConfigInput: UpdateProjectShippingConfigInput;
  UpdateProjectShippingFeeRateInput: UpdateProjectShippingFeeRateInput;
  UpdateProjectSubscriptionPlanInput: UpdateProjectSubscriptionPlanInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserSubscriptionInput: UpdateUserSubscriptionInput;
  UpdateWalletInput: UpdateWalletInput;
  UpdateWalletStateInput: UpdateWalletStateInput;
  User: ResolverTypeWrapper<Omit<User, 'contributions' | 'entries' | 'ownerOf' | 'projectFollows' | 'projects' | 'wallet'> & { contributions: Array<ResolversTypes['Contribution']>, entries: Array<ResolversTypes['Entry']>, ownerOf: Array<ResolversTypes['OwnerOf']>, projectFollows: Array<ResolversTypes['Project']>, projects: Array<ResolversTypes['Project']>, wallet?: Maybe<ResolversTypes['Wallet']> }>;
  UserBadge: ResolverTypeWrapper<UserBadge>;
  UserBadgeStatus: UserBadgeStatus;
  UserComplianceDetails: ResolverTypeWrapper<UserComplianceDetails>;
  UserContributionLimit: ResolverTypeWrapper<UserContributionLimit>;
  UserContributionLimits: ResolverTypeWrapper<UserContributionLimits>;
  UserContributionsInput: UserContributionsInput;
  UserEmailIsValidResponse: ResolverTypeWrapper<UserEmailIsValidResponse>;
  UserEmailUpdateInput: UserEmailUpdateInput;
  UserEntityType: UserEntityType;
  UserEntriesGetInput: UserEntriesGetInput;
  UserEntriesGetWhereInput: UserEntriesGetWhereInput;
  UserGetInput: UserGetInput;
  UserHeroStats: ResolverTypeWrapper<UserHeroStats>;
  UserNotificationSettings: ResolverTypeWrapper<UserNotificationSettings>;
  UserPostsGetInput: UserPostsGetInput;
  UserPostsGetWhereInput: UserPostsGetWhereInput;
  UserProjectContribution: ResolverTypeWrapper<Omit<UserProjectContribution, 'project'> & { project: ResolversTypes['Project'] }>;
  UserProjectsGetInput: UserProjectsGetInput;
  UserProjectsGetWhereInput: UserProjectsGetWhereInput;
  UserSubscription: ResolverTypeWrapper<UserSubscription>;
  UserSubscriptionInterval: UserSubscriptionInterval;
  UserSubscriptionStatus: UserSubscriptionStatus;
  UserSubscriptionsInput: UserSubscriptionsInput;
  UserSubscriptionsWhereInput: UserSubscriptionsWhereInput;
  UserTaxProfile: ResolverTypeWrapper<UserTaxProfile>;
  UserTaxProfileUpdateInput: UserTaxProfileUpdateInput;
  UserVerificationLevel: UserVerificationLevel;
  UserVerificationLevelInput: UserVerificationLevelInput;
  UserVerificationLevelStatus: ResolverTypeWrapper<UserVerificationLevelStatus>;
  UserVerificationStatus: UserVerificationStatus;
  UserVerificationTokenGenerateInput: UserVerificationTokenGenerateInput;
  UserVerificationTokenGenerateResponse: ResolverTypeWrapper<UserVerificationTokenGenerateResponse>;
  UserVerifiedDetails: ResolverTypeWrapper<UserVerifiedDetails>;
  VerificationResult: ResolverTypeWrapper<VerificationResult>;
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
  ActivitiesGetResponse: Omit<ActivitiesGetResponse, 'activities'> & { activities: Array<ResolversParentTypes['Activity']> };
  Activity: Omit<Activity, 'project' | 'resource'> & { project: ResolversParentTypes['Project'], resource: ResolversParentTypes['ActivityResource'] };
  ActivityCreatedSubscriptionInput: ActivityCreatedSubscriptionInput;
  ActivityCreatedSubscriptionWhereInput: ActivityCreatedSubscriptionWhereInput;
  ActivityResource: ResolversUnionTypes<ResolversParentTypes>['ActivityResource'];
  Ambassador: Omit<Ambassador, 'user'> & { user: ResolversParentTypes['User'] };
  AmbassadorAddInput: AmbassadorAddInput;
  AmbassadorStats: AmbassadorStats;
  AmbassadorUpdateInput: AmbassadorUpdateInput;
  AmountSummary: AmountSummary;
  Badge: Badge;
  BadgeClaimInput: BadgeClaimInput;
  BadgesGetInput: BadgesGetInput;
  BadgesGetWhereInput: BadgesGetWhereInput;
  BigInt: Scalars['BigInt']['output'];
  BitcoinPaymentMethods: BitcoinPaymentMethods;
  BitcoinQuote: BitcoinQuote;
  BoardVoteGrant: Omit<BoardVoteGrant, 'applicants' | 'boardMembers' | 'sponsors'> & { applicants: Array<ResolversParentTypes['GrantApplicant']>, boardMembers: Array<ResolversParentTypes['GrantBoardMember']>, sponsors: Array<ResolversParentTypes['Sponsor']> };
  Boolean: Scalars['Boolean']['output'];
  CommunityVoteGrant: Omit<CommunityVoteGrant, 'applicants' | 'sponsors'> & { applicants: Array<ResolversParentTypes['GrantApplicant']>, sponsors: Array<ResolversParentTypes['Sponsor']> };
  CompetitionVoteGrantVoteSummary: CompetitionVoteGrantVoteSummary;
  ConnectionDetails: ResolversUnionTypes<ResolversParentTypes>['ConnectionDetails'];
  Contribution: Omit<Contribution, 'bitcoinQuote' | 'payments' | 'sourceResource'> & { bitcoinQuote?: Maybe<ResolversParentTypes['BitcoinQuote']>, payments: Array<ResolversParentTypes['Payment']>, sourceResource?: Maybe<ResolversParentTypes['SourceResource']> };
  ContributionCreateInput: ContributionCreateInput;
  ContributionEmailUpdateInput: ContributionEmailUpdateInput;
  ContributionFiatPaymentDetails: ContributionFiatPaymentDetails;
  ContributionFiatPaymentDetailsInput: ContributionFiatPaymentDetailsInput;
  ContributionFiatPaymentDetailsStripeInput: ContributionFiatPaymentDetailsStripeInput;
  ContributionFiatSwapPaymentDetails: ContributionFiatSwapPaymentDetails;
  ContributionFiatSwapPaymentDetailsBanxaInput: ContributionFiatSwapPaymentDetailsBanxaInput;
  ContributionFiatSwapPaymentDetailsBoltzInput: ContributionFiatSwapPaymentDetailsBoltzInput;
  ContributionFiatSwapPaymentDetailsInput: ContributionFiatSwapPaymentDetailsInput;
  ContributionLightningPaymentDetails: ContributionLightningPaymentDetails;
  ContributionLightningPaymentDetailsInput: ContributionLightningPaymentDetailsInput;
  ContributionMetadataInput: ContributionMetadataInput;
  ContributionMutationResponse: Omit<ContributionMutationResponse, 'contribution'> & { contribution: ResolversParentTypes['Contribution'] };
  ContributionOnChainSwapPaymentDetails: ContributionOnChainSwapPaymentDetails;
  ContributionOnChainSwapPaymentDetailsInput: ContributionOnChainSwapPaymentDetailsInput;
  ContributionPaymentsAddInput: ContributionPaymentsAddInput;
  ContributionPaymentsAddResponse: ContributionPaymentsAddResponse;
  ContributionPaymentsDetails: ContributionPaymentsDetails;
  ContributionPaymentsInput: ContributionPaymentsInput;
  ContributionStatusUpdatedInput: ContributionStatusUpdatedInput;
  ContributionStatusUpdatedSubscriptionResponse: Omit<ContributionStatusUpdatedSubscriptionResponse, 'contribution'> & { contribution: ResolversParentTypes['Contribution'] };
  ContributionsGetResponse: Omit<ContributionsGetResponse, 'contributions'> & { contributions: Array<ResolversParentTypes['Contribution']> };
  ContributionsSummary: ContributionsSummary;
  ContributorContributionsSummary: ContributorContributionsSummary;
  ContributorStats: ContributorStats;
  Country: Country;
  CreateEntryInput: CreateEntryInput;
  CreateProjectInput: CreateProjectInput;
  CreateProjectRewardInput: CreateProjectRewardInput;
  CreateProjectShippingConfigInput: CreateProjectShippingConfigInput;
  CreateProjectSubscriptionPlanInput: CreateProjectSubscriptionPlanInput;
  CreateUserSubscriptionInput: CreateUserSubscriptionInput;
  CreateWalletInput: CreateWalletInput;
  CreatorNotificationSettings: CreatorNotificationSettings;
  CreatorNotificationSettingsProject: CreatorNotificationSettingsProject;
  CreatorStats: CreatorStats;
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
  EmailSendOptionsInput: EmailSendOptionsInput;
  EmailVerifyInput: EmailVerifyInput;
  Entry: Omit<Entry, 'contributions' | 'creator' | 'project'> & { contributions: Array<ResolversParentTypes['Contribution']>, creator: ResolversParentTypes['User'], project?: Maybe<ResolversParentTypes['Project']> };
  EntryPublishedSubscriptionResponse: Omit<EntryPublishedSubscriptionResponse, 'entry'> & { entry: ResolversParentTypes['Entry'] };
  ExternalAccount: ExternalAccount;
  FiatPaymentMethods: FiatPaymentMethods;
  FiatSwapPaymentDetails: FiatSwapPaymentDetails;
  FileUploadInput: FileUploadInput;
  Float: Scalars['Float']['output'];
  Funder: Omit<Funder, 'contributions' | 'user'> & { contributions: Array<ResolversParentTypes['Contribution']>, user?: Maybe<ResolversParentTypes['User']> };
  FunderRewardGraphSum: FunderRewardGraphSum;
  GetActivitiesInput: GetActivitiesInput;
  GetActivityOrderByInput: GetActivityOrderByInput;
  GetActivityPaginationInput: GetActivityPaginationInput;
  GetActivityWhereInput: GetActivityWhereInput;
  GetContributionsInput: GetContributionsInput;
  GetContributionsOrderByInput: GetContributionsOrderByInput;
  GetContributionsWhereInput: GetContributionsWhereInput;
  GetContributorContributionsInput: GetContributorContributionsInput;
  GetContributorContributionsWhereInput: GetContributorContributionsWhereInput;
  GetContributorInput: GetContributorInput;
  GetDashboardFundersWhereInput: GetDashboardFundersWhereInput;
  GetEntriesInput: GetEntriesInput;
  GetEntriesOrderByInput: GetEntriesOrderByInput;
  GetEntriesWhereInput: GetEntriesWhereInput;
  GetFunderWhereInput: GetFunderWhereInput;
  GetFundersInput: GetFundersInput;
  GetFundersOrderByInput: GetFundersOrderByInput;
  GetProjectGoalsInput: GetProjectGoalsInput;
  GetProjectOrdersStatsInput: GetProjectOrdersStatsInput;
  GetProjectOrdersStatsWhereInput: GetProjectOrdersStatsWhereInput;
  GetProjectRewardInput: GetProjectRewardInput;
  GetProjectRewardWhereInput: GetProjectRewardWhereInput;
  GetProjectRewardsInput: GetProjectRewardsInput;
  GetProjectRewardsWhereInput: GetProjectRewardsWhereInput;
  GetProjectStatsInput: GetProjectStatsInput;
  GetProjectStatsWhereInput: GetProjectStatsWhereInput;
  GeyserPromotionsContributionStats: GeyserPromotionsContributionStats;
  GeyserPromotionsContributionStatsInput: GeyserPromotionsContributionStatsInput;
  GeyserPromotionsContributionStatsWhereInput: GeyserPromotionsContributionStatsWhereInput;
  GlobalAmbassadorLeaderboardRow: GlobalAmbassadorLeaderboardRow;
  GlobalContributorLeaderboardRow: GlobalContributorLeaderboardRow;
  GlobalCreatorLeaderboardRow: GlobalCreatorLeaderboardRow;
  GlobalProjectLeaderboardRow: GlobalProjectLeaderboardRow;
  Grant: ResolversUnionTypes<ResolversParentTypes>['Grant'];
  GrantApplicant: Omit<GrantApplicant, 'contributors' | 'grant' | 'project'> & { contributors: Array<ResolversParentTypes['GrantApplicantContributor']>, grant: ResolversParentTypes['Grant'], project: ResolversParentTypes['Project'] };
  GrantApplicantContributor: Omit<GrantApplicantContributor, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  GrantApplicantContributorInput: GrantApplicantContributorInput;
  GrantApplicantContributorWhereInput: GrantApplicantContributorWhereInput;
  GrantApplicantFunding: GrantApplicantFunding;
  GrantApplicantsGetInput: GrantApplicantsGetInput;
  GrantApplicantsGetOrderByInput: GrantApplicantsGetOrderByInput;
  GrantApplicantsGetWhereInput: GrantApplicantsGetWhereInput;
  GrantApplyInput: GrantApplyInput;
  GrantBoardMember: Omit<GrantBoardMember, 'user'> & { user: ResolversParentTypes['User'] };
  GrantGetInput: GrantGetInput;
  GrantGetWhereInput: GrantGetWhereInput;
  GrantGuardiansFunding: GrantGuardiansFunding;
  GrantStatistics: GrantStatistics;
  GrantStatisticsApplicant: GrantStatisticsApplicant;
  GrantStatisticsGrant: GrantStatisticsGrant;
  GrantStatus: GrantStatus;
  GraphData: ResolversInterfaceTypes<ResolversParentTypes>['GraphData'];
  GraphSumData: ResolversInterfaceTypes<ResolversParentTypes>['GraphSumData'];
  GuardianResult: GuardianResult;
  GuardianUser: GuardianUser;
  GuardianUsersGetInput: GuardianUsersGetInput;
  GuardianUsersGetResponse: GuardianUsersGetResponse;
  GuardianUsersGetWhereInput: GuardianUsersGetWhereInput;
  HeroStats: ResolversInterfaceTypes<ResolversParentTypes>['HeroStats'];
  Int: Scalars['Int']['output'];
  LeaderboardGlobalAmbassadorsGetInput: LeaderboardGlobalAmbassadorsGetInput;
  LeaderboardGlobalContributorsGetInput: LeaderboardGlobalContributorsGetInput;
  LeaderboardGlobalCreatorsGetInput: LeaderboardGlobalCreatorsGetInput;
  LeaderboardGlobalProjectsGetInput: LeaderboardGlobalProjectsGetInput;
  LightningAddressConnectionDetails: LightningAddressConnectionDetails;
  LightningAddressConnectionDetailsCreateInput: LightningAddressConnectionDetailsCreateInput;
  LightningAddressConnectionDetailsUpdateInput: LightningAddressConnectionDetailsUpdateInput;
  LightningAddressContributionLimits: LightningAddressContributionLimits;
  LightningAddressVerifyResponse: LightningAddressVerifyResponse;
  LightningPaymentDetails: LightningPaymentDetails;
  LightningPaymentMethods: LightningPaymentMethods;
  LndConnectionDetails: ResolversInterfaceTypes<ResolversParentTypes>['LndConnectionDetails'];
  LndConnectionDetailsCreateInput: LndConnectionDetailsCreateInput;
  LndConnectionDetailsPrivate: LndConnectionDetailsPrivate;
  LndConnectionDetailsPublic: LndConnectionDetailsPublic;
  LndConnectionDetailsUpdateInput: LndConnectionDetailsUpdateInput;
  Location: Location;
  Milestone: Milestone;
  Mutation: {};
  MutationResponse: ResolversInterfaceTypes<ResolversParentTypes>['MutationResponse'];
  NWCConnectionDetailsCreateInput: NwcConnectionDetailsCreateInput;
  NWCConnectionDetailsPrivate: NwcConnectionDetailsPrivate;
  NWCConnectionDetailsPublic: NwcConnectionDetailsPublic;
  NWCConnectionDetailsUpdateInput: NwcConnectionDetailsUpdateInput;
  NostrKeys: NostrKeys;
  NostrPrivateKey: NostrPrivateKey;
  NostrPublicKey: NostrPublicKey;
  NotificationConfiguration: NotificationConfiguration;
  NotificationSettings: NotificationSettings;
  OTPInput: OtpInput;
  OTPLoginInput: OtpLoginInput;
  OTPResponse: OtpResponse;
  OffsetBasedPaginationInput: OffsetBasedPaginationInput;
  OnChainPaymentMethods: OnChainPaymentMethods;
  OnChainSwapPaymentDetails: OnChainSwapPaymentDetails;
  OnChainTxInput: OnChainTxInput;
  Order: Omit<Order, 'contribution' | 'project' | 'user'> & { contribution: ResolversParentTypes['Contribution'], project: ResolversParentTypes['Project'], user?: Maybe<ResolversParentTypes['User']> };
  OrderBitcoinQuoteInput: OrderBitcoinQuoteInput;
  OrderContributionInput: OrderContributionInput;
  OrderItem: OrderItem;
  OrderItemInput: OrderItemInput;
  OrderStatusUpdateInput: OrderStatusUpdateInput;
  OrdersGetInput: OrdersGetInput;
  OrdersGetOrderByInput: OrdersGetOrderByInput;
  OrdersGetResponse: OrdersGetResponse;
  OrdersGetWhereInput: OrdersGetWhereInput;
  OrdersStatsBase: OrdersStatsBase;
  Owner: Omit<Owner, 'user'> & { user: ResolversParentTypes['User'] };
  OwnerOf: Omit<OwnerOf, 'owner' | 'project'> & { owner?: Maybe<ResolversParentTypes['Owner']>, project?: Maybe<ResolversParentTypes['Project']> };
  PageInfo: PageInfo;
  PageViewCountGraph: PageViewCountGraph;
  PaginationCursor: PaginationCursor;
  PaginationInput: PaginationInput;
  Payment: Omit<Payment, 'fees' | 'paymentDetails'> & { fees: Array<ResolversParentTypes['PaymentFee']>, paymentDetails: ResolversParentTypes['PaymentDetails'] };
  PaymentCancelInput: PaymentCancelInput;
  PaymentCancelResponse: PaymentCancelResponse;
  PaymentConfirmInput: PaymentConfirmInput;
  PaymentConfirmResponse: PaymentConfirmResponse;
  PaymentDetails: ResolversUnionTypes<ResolversParentTypes>['PaymentDetails'];
  PaymentFailInput: PaymentFailInput;
  PaymentFailResponse: PaymentFailResponse;
  PaymentFee: PaymentFee;
  PaymentGetInput: PaymentGetInput;
  PaymentInvoiceCancelResponse: PaymentInvoiceCancelResponse;
  PaymentInvoiceSanctionCheckStatusGetInput: PaymentInvoiceSanctionCheckStatusGetInput;
  PaymentInvoiceSanctionCheckStatusResponse: PaymentInvoiceSanctionCheckStatusResponse;
  PaymentMethods: PaymentMethods;
  PaymentPendInput: PaymentPendInput;
  PaymentPendOnChainSwapInput: PaymentPendOnChainSwapInput;
  PaymentPendResponse: PaymentPendResponse;
  PaymentStatusUpdatedInput: PaymentStatusUpdatedInput;
  PodcastKeysendContributionCreateInput: PodcastKeysendContributionCreateInput;
  PodcastKeysendContributionCreateResponse: PodcastKeysendContributionCreateResponse;
  Post: Omit<Post, 'contributions' | 'creator' | 'project'> & { contributions: Array<ResolversParentTypes['Contribution']>, creator: ResolversParentTypes['User'], project?: Maybe<ResolversParentTypes['Project']> };
  PostCreateInput: PostCreateInput;
  PostEmailSegmentSizeGetInput: PostEmailSegmentSizeGetInput;
  PostGetInput: PostGetInput;
  PostGetOrderByInput: PostGetOrderByInput;
  PostGetWhereInput: PostGetWhereInput;
  PostPublishInput: PostPublishInput;
  PostPublishedSubscriptionResponse: PostPublishedSubscriptionResponse;
  PostRepostOnNostrInput: PostRepostOnNostrInput;
  PostRepostOnNostrResponse: PostRepostOnNostrResponse;
  PostSendByEmailInput: PostSendByEmailInput;
  PostSendByEmailResponse: PostSendByEmailResponse;
  PostUpdateInput: PostUpdateInput;
  ProfileNotificationSettings: ProfileNotificationSettings;
  Project: Omit<Project, 'ambassadors' | 'contributions' | 'entries' | 'followers' | 'grantApplications' | 'owners' | 'sponsors' | 'wallets'> & { ambassadors: ResolversParentTypes['ProjectAmbassadorsConnection'], contributions: Array<ResolversParentTypes['Contribution']>, entries: Array<ResolversParentTypes['Entry']>, followers: Array<ResolversParentTypes['User']>, grantApplications: Array<ResolversParentTypes['GrantApplicant']>, owners: Array<ResolversParentTypes['Owner']>, sponsors: Array<ResolversParentTypes['Sponsor']>, wallets: Array<ResolversParentTypes['Wallet']> };
  ProjectActivatedSubscriptionResponse: Omit<ProjectActivatedSubscriptionResponse, 'project'> & { project: ResolversParentTypes['Project'] };
  ProjectActivitiesCount: Omit<ProjectActivitiesCount, 'project'> & { project: ResolversParentTypes['Project'] };
  ProjectAmbassadorEdge: Omit<ProjectAmbassadorEdge, 'node'> & { node: ResolversParentTypes['Ambassador'] };
  ProjectAmbassadorsConnection: Omit<ProjectAmbassadorsConnection, 'edges'> & { edges: Array<ResolversParentTypes['ProjectAmbassadorEdge']> };
  ProjectAmbassadorsStats: ProjectAmbassadorsStats;
  ProjectCloseMutationInput: ProjectCloseMutationInput;
  ProjectContributionsGroupedByMethodStats: ProjectContributionsGroupedByMethodStats;
  ProjectContributionsStats: ProjectContributionsStats;
  ProjectContributionsStatsBase: ProjectContributionsStatsBase;
  ProjectContributionsStatsGraphData: ProjectContributionsStatsGraphData;
  ProjectContributionsStatsGraphDataAmount: ProjectContributionsStatsGraphDataAmount;
  ProjectCountriesGetInput: ProjectCountriesGetInput;
  ProjectCountriesGetResult: ProjectCountriesGetResult;
  ProjectDeleteResponse: ProjectDeleteResponse;
  ProjectEntriesGetInput: ProjectEntriesGetInput;
  ProjectEntriesGetWhereInput: ProjectEntriesGetWhereInput;
  ProjectFollowMutationInput: ProjectFollowMutationInput;
  ProjectFollowerStats: ProjectFollowerStats;
  ProjectFunderRewardStats: ProjectFunderRewardStats;
  ProjectFunderStats: ProjectFunderStats;
  ProjectGoal: ProjectGoal;
  ProjectGoalCreateInput: ProjectGoalCreateInput;
  ProjectGoalDeleteResponse: ProjectGoalDeleteResponse;
  ProjectGoalOrderingUpdateInput: ProjectGoalOrderingUpdateInput;
  ProjectGoalUpdateInput: ProjectGoalUpdateInput;
  ProjectGoals: ProjectGoals;
  ProjectGrantApplicationsInput: ProjectGrantApplicationsInput;
  ProjectGrantApplicationsWhereInput: ProjectGrantApplicationsWhereInput;
  ProjectKeys: ProjectKeys;
  ProjectLeaderboardAmbassadorsGetInput: ProjectLeaderboardAmbassadorsGetInput;
  ProjectLeaderboardAmbassadorsRow: Omit<ProjectLeaderboardAmbassadorsRow, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  ProjectLeaderboardContributorsGetInput: ProjectLeaderboardContributorsGetInput;
  ProjectLeaderboardContributorsRow: Omit<ProjectLeaderboardContributorsRow, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  ProjectLinkMutationInput: ProjectLinkMutationInput;
  ProjectMostFunded: Omit<ProjectMostFunded, 'project'> & { project: ResolversParentTypes['Project'] };
  ProjectMostFundedByCategory: Omit<ProjectMostFundedByCategory, 'projects'> & { projects: Array<ResolversParentTypes['ProjectMostFunded']> };
  ProjectMostFundedByTag: Omit<ProjectMostFundedByTag, 'projects'> & { projects: Array<ResolversParentTypes['ProjectMostFunded']> };
  ProjectPostsGetInput: ProjectPostsGetInput;
  ProjectPostsGetWhereInput: ProjectPostsGetWhereInput;
  ProjectPreLaunchMutationInput: ProjectPreLaunchMutationInput;
  ProjectPublishMutationInput: ProjectPublishMutationInput;
  ProjectPutInReviewMutationInput: ProjectPutInReviewMutationInput;
  ProjectRegionsGetResult: ProjectRegionsGetResult;
  ProjectReward: Omit<ProjectReward, 'project'> & { project: ResolversParentTypes['Project'] };
  ProjectRewardCurrencyUpdate: ProjectRewardCurrencyUpdate;
  ProjectRewardCurrencyUpdateRewardsInput: ProjectRewardCurrencyUpdateRewardsInput;
  ProjectRewardTrendingMonthlyGetRow: ProjectRewardTrendingMonthlyGetRow;
  ProjectRewardTrendingQuarterlyGetRow: ProjectRewardTrendingQuarterlyGetRow;
  ProjectRewardTrendingWeeklyGetRow: ProjectRewardTrendingWeeklyGetRow;
  ProjectRewardsGroupedByRewardIdStats: ProjectRewardsGroupedByRewardIdStats;
  ProjectRewardsGroupedByRewardIdStatsProjectReward: ProjectRewardsGroupedByRewardIdStatsProjectReward;
  ProjectRewardsStats: ProjectRewardsStats;
  ProjectShippingConfigsGetInput: ProjectShippingConfigsGetInput;
  ProjectShippingRate: ProjectShippingRate;
  ProjectStatistics: ProjectStatistics;
  ProjectStats: ProjectStats;
  ProjectStatsBase: ProjectStatsBase;
  ProjectStatusUpdate: ProjectStatusUpdate;
  ProjectSubscriptionPlan: ProjectSubscriptionPlan;
  ProjectSubscriptionPlansInput: ProjectSubscriptionPlansInput;
  ProjectSubscriptionPlansWhereInput: ProjectSubscriptionPlansWhereInput;
  ProjectTagMutationInput: ProjectTagMutationInput;
  ProjectViewBaseStats: ProjectViewBaseStats;
  ProjectViewStats: ProjectViewStats;
  ProjectsGetQueryInput: ProjectsGetQueryInput;
  ProjectsGetWhereInput: ProjectsGetWhereInput;
  ProjectsMostFundedByCategoryInput: ProjectsMostFundedByCategoryInput;
  ProjectsMostFundedByTagInput: ProjectsMostFundedByTagInput;
  ProjectsOrderByInput: ProjectsOrderByInput;
  ProjectsResponse: Omit<ProjectsResponse, 'projects'> & { projects: Array<ResolversParentTypes['Project']> };
  ProjectsSummary: ProjectsSummary;
  Query: {};
  ResourceInput: ResourceInput;
  SendOtpByEmailInput: SendOtpByEmailInput;
  ShippingAddress: ShippingAddress;
  ShippingAddressCreateInput: ShippingAddressCreateInput;
  ShippingAddressesGetInput: ShippingAddressesGetInput;
  ShippingConfig: ShippingConfig;
  SignedUploadUrl: SignedUploadUrl;
  SourceResource: ResolversUnionTypes<ResolversParentTypes>['SourceResource'];
  Sponsor: Omit<Sponsor, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  StatsInterface: ResolversInterfaceTypes<ResolversParentTypes>['StatsInterface'];
  String: Scalars['String']['output'];
  StripeCheckoutSessionInput: StripeCheckoutSessionInput;
  Subscription: {};
  SubscriptionPaymentConfirmationInput: SubscriptionPaymentConfirmationInput;
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
  UpdateProjectShippingConfigInput: UpdateProjectShippingConfigInput;
  UpdateProjectShippingFeeRateInput: UpdateProjectShippingFeeRateInput;
  UpdateProjectSubscriptionPlanInput: UpdateProjectSubscriptionPlanInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserSubscriptionInput: UpdateUserSubscriptionInput;
  UpdateWalletInput: UpdateWalletInput;
  UpdateWalletStateInput: UpdateWalletStateInput;
  User: Omit<User, 'contributions' | 'entries' | 'ownerOf' | 'projectFollows' | 'projects' | 'wallet'> & { contributions: Array<ResolversParentTypes['Contribution']>, entries: Array<ResolversParentTypes['Entry']>, ownerOf: Array<ResolversParentTypes['OwnerOf']>, projectFollows: Array<ResolversParentTypes['Project']>, projects: Array<ResolversParentTypes['Project']>, wallet?: Maybe<ResolversParentTypes['Wallet']> };
  UserBadge: UserBadge;
  UserComplianceDetails: UserComplianceDetails;
  UserContributionLimit: UserContributionLimit;
  UserContributionLimits: UserContributionLimits;
  UserContributionsInput: UserContributionsInput;
  UserEmailIsValidResponse: UserEmailIsValidResponse;
  UserEmailUpdateInput: UserEmailUpdateInput;
  UserEntriesGetInput: UserEntriesGetInput;
  UserEntriesGetWhereInput: UserEntriesGetWhereInput;
  UserGetInput: UserGetInput;
  UserHeroStats: UserHeroStats;
  UserNotificationSettings: UserNotificationSettings;
  UserPostsGetInput: UserPostsGetInput;
  UserPostsGetWhereInput: UserPostsGetWhereInput;
  UserProjectContribution: Omit<UserProjectContribution, 'project'> & { project: ResolversParentTypes['Project'] };
  UserProjectsGetInput: UserProjectsGetInput;
  UserProjectsGetWhereInput: UserProjectsGetWhereInput;
  UserSubscription: UserSubscription;
  UserSubscriptionsInput: UserSubscriptionsInput;
  UserSubscriptionsWhereInput: UserSubscriptionsWhereInput;
  UserTaxProfile: UserTaxProfile;
  UserTaxProfileUpdateInput: UserTaxProfileUpdateInput;
  UserVerificationLevelStatus: UserVerificationLevelStatus;
  UserVerificationTokenGenerateInput: UserVerificationTokenGenerateInput;
  UserVerificationTokenGenerateResponse: UserVerificationTokenGenerateResponse;
  UserVerifiedDetails: UserVerifiedDetails;
  VerificationResult: VerificationResult;
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
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  resource?: Resolver<ResolversTypes['ActivityResource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityResourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActivityResource'] = ResolversParentTypes['ActivityResource']> = {
  __resolveType: TypeResolveFn<'Contribution' | 'Entry' | 'Post' | 'Project' | 'ProjectGoal' | 'ProjectReward', ParentType, ContextType>;
};

export type AmbassadorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ambassador'] = ResolversParentTypes['Ambassador']> = {
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsSum?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  payoutRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AmbassadorStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AmbassadorStats'] = ResolversParentTypes['AmbassadorStats']> = {
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projectsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type BitcoinPaymentMethodsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BitcoinPaymentMethods'] = ResolversParentTypes['BitcoinPaymentMethods']> = {
  lightning?: Resolver<ResolversTypes['LightningPaymentMethods'], ParentType, ContextType>;
  onChain?: Resolver<ResolversTypes['OnChainPaymentMethods'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  __resolveType: TypeResolveFn<'LightningAddressConnectionDetails' | 'LndConnectionDetailsPrivate' | 'LndConnectionDetailsPublic' | 'NWCConnectionDetailsPrivate', ParentType, ContextType>;
};

export type ContributionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contribution'] = ResolversParentTypes['Contribution']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bitcoinQuote?: Resolver<Maybe<ResolversTypes['BitcoinQuote']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  confirmedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creatorEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creatorTaxProfile?: Resolver<Maybe<ResolversTypes['UserTaxProfile']>, ParentType, ContextType>;
  donationAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  funder?: Resolver<ResolversTypes['Funder'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  isAnonymous?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSubscription?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  media?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  payments?: Resolver<Array<ResolversTypes['Payment']>, ParentType, ContextType>;
  privateComment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectGoalId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sourceResource?: Resolver<Maybe<ResolversTypes['SourceResource']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ContributionStatus'], ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributionFiatPaymentDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionFiatPaymentDetails'] = ResolversParentTypes['ContributionFiatPaymentDetails']> = {
  stripeClientSecret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributionFiatSwapPaymentDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionFiatSwapPaymentDetails'] = ResolversParentTypes['ContributionFiatSwapPaymentDetails']> = {
  checkoutUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributionLightningPaymentDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionLightningPaymentDetails'] = ResolversParentTypes['ContributionLightningPaymentDetails']> = {
  lightningInvoiceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentRequest?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributionMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionMutationResponse'] = ResolversParentTypes['ContributionMutationResponse']> = {
  contribution?: Resolver<ResolversTypes['Contribution'], ParentType, ContextType>;
  payments?: Resolver<ResolversTypes['ContributionPaymentsDetails'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributionOnChainSwapPaymentDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionOnChainSwapPaymentDetails'] = ResolversParentTypes['ContributionOnChainSwapPaymentDetails']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  swapJson?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributionPaymentsAddResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionPaymentsAddResponse'] = ResolversParentTypes['ContributionPaymentsAddResponse']> = {
  payments?: Resolver<ResolversTypes['ContributionPaymentsDetails'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributionPaymentsDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionPaymentsDetails'] = ResolversParentTypes['ContributionPaymentsDetails']> = {
  fiat?: Resolver<Maybe<ResolversTypes['ContributionFiatPaymentDetails']>, ParentType, ContextType>;
  fiatSwap?: Resolver<Maybe<ResolversTypes['ContributionFiatSwapPaymentDetails']>, ParentType, ContextType>;
  lightning?: Resolver<Maybe<ResolversTypes['ContributionLightningPaymentDetails']>, ParentType, ContextType>;
  onChainSwap?: Resolver<Maybe<ResolversTypes['ContributionOnChainSwapPaymentDetails']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributionStatusUpdatedSubscriptionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionStatusUpdatedSubscriptionResponse'] = ResolversParentTypes['ContributionStatusUpdatedSubscriptionResponse']> = {
  contribution?: Resolver<ResolversTypes['Contribution'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributionsGetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionsGetResponse'] = ResolversParentTypes['ContributionsGetResponse']> = {
  contributions?: Resolver<Array<ResolversTypes['Contribution']>, ParentType, ContextType>;
  pagination?: Resolver<Maybe<ResolversTypes['CursorPaginationResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributionsSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionsSummary'] = ResolversParentTypes['ContributionsSummary']> = {
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  contributorsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributorContributionsSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributorContributionsSummary'] = ResolversParentTypes['ContributorContributionsSummary']> = {
  commentsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributorStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributorStats'] = ResolversParentTypes['ContributorStats']> = {
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projectsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type CreatorStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorStats'] = ResolversParentTypes['CreatorStats']> = {
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projectsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  contributions?: Resolver<Array<ResolversTypes['Contribution']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fundersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  markdown?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  externalLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalUsername?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FiatPaymentMethodsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FiatPaymentMethods'] = ResolversParentTypes['FiatPaymentMethods']> = {
  banxa?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  stripe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FiatSwapPaymentDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FiatSwapPaymentDetails'] = ResolversParentTypes['FiatSwapPaymentDetails']> = {
  lightningInvoiceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lightningInvoiceStatus?: Resolver<ResolversTypes['LightningInvoiceStatus'], ParentType, ContextType>;
  swapId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FunderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Funder'] = ResolversParentTypes['Funder']> = {
  amountFunded?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  confirmedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  contributions?: Resolver<Array<ResolversTypes['Contribution']>, ParentType, ContextType, Partial<FunderContributionsArgs>>;
  contributionsSummary?: Resolver<Maybe<ResolversTypes['ContributorContributionsSummary']>, ParentType, ContextType, Partial<FunderContributionsSummaryArgs>>;
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

export type GeyserPromotionsContributionStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeyserPromotionsContributionStats'] = ResolversParentTypes['GeyserPromotionsContributionStats']> = {
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsSum?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  contributionsSumUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalAmbassadorLeaderboardRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalAmbassadorLeaderboardRow'] = ResolversParentTypes['GlobalAmbassadorLeaderboardRow']> = {
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projectsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userGuardianType?: Resolver<Maybe<ResolversTypes['GuardianType']>, ParentType, ContextType>;
  userHeroId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  userImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalContributorLeaderboardRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalContributorLeaderboardRow'] = ResolversParentTypes['GlobalContributorLeaderboardRow']> = {
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projectsContributedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userGuardianType?: Resolver<Maybe<ResolversTypes['GuardianType']>, ParentType, ContextType>;
  userHeroId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  userImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalCreatorLeaderboardRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalCreatorLeaderboardRow'] = ResolversParentTypes['GlobalCreatorLeaderboardRow']> = {
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projectsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userGuardianType?: Resolver<Maybe<ResolversTypes['GuardianType']>, ParentType, ContextType>;
  userHeroId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type GrantGuardiansFundingResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrantGuardiansFunding'] = ResolversParentTypes['GrantGuardiansFunding']> = {
  contributedTotal?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  contributorsCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GrantStatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GrantStatistics'] = ResolversParentTypes['GrantStatistics']> = {
  applicants?: Resolver<Maybe<ResolversTypes['GrantStatisticsApplicant']>, ParentType, ContextType>;
  grantGuardiansFunding?: Resolver<ResolversTypes['GrantGuardiansFunding'], ParentType, ContextType>;
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

export type GraphDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphData'] = ResolversParentTypes['GraphData']> = {
  __resolveType: TypeResolveFn<'ProjectContributionsStatsGraphDataAmount', ParentType, ContextType>;
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type GraphSumDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphSumData'] = ResolversParentTypes['GraphSumData']> = {
  __resolveType: TypeResolveFn<'FunderRewardGraphSum', ParentType, ContextType>;
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  sum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type GuardianResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuardianResult'] = ResolversParentTypes['GuardianResult']> = {
  guardianType?: Resolver<ResolversTypes['GuardianType'], ParentType, ContextType>;
  soldCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['GuardianUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuardianUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuardianUser'] = ResolversParentTypes['GuardianUser']> = {
  guardianType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  heroId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuardianUsersGetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuardianUsersGetResponse'] = ResolversParentTypes['GuardianUsersGetResponse']> = {
  guardianUsers?: Resolver<Array<ResolversTypes['GuardianResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HeroStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['HeroStats'] = ResolversParentTypes['HeroStats']> = {
  __resolveType: TypeResolveFn<'AmbassadorStats' | 'ContributorStats' | 'CreatorStats', ParentType, ContextType>;
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projectsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type LightningPaymentDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LightningPaymentDetails'] = ResolversParentTypes['LightningPaymentDetails']> = {
  lightningInvoiceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lightningInvoiceStatus?: Resolver<ResolversTypes['LightningInvoiceStatus'], ParentType, ContextType>;
  zapRequest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LightningPaymentMethodsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LightningPaymentMethods'] = ResolversParentTypes['LightningPaymentMethods']> = {
  bolt11?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
  ambassadorAdd?: Resolver<Maybe<ResolversTypes['Ambassador']>, ParentType, ContextType, RequireFields<MutationAmbassadorAddArgs, 'input'>>;
  ambassadorUpdate?: Resolver<Maybe<ResolversTypes['Ambassador']>, ParentType, ContextType, RequireFields<MutationAmbassadorUpdateArgs, 'input'>>;
  claimBadge?: Resolver<ResolversTypes['UserBadge'], ParentType, ContextType, RequireFields<MutationClaimBadgeArgs, 'input'>>;
  contributionCreate?: Resolver<ResolversTypes['ContributionMutationResponse'], ParentType, ContextType, RequireFields<MutationContributionCreateArgs, 'input'>>;
  contributionEmailUpdate?: Resolver<ResolversTypes['Contribution'], ParentType, ContextType, Partial<MutationContributionEmailUpdateArgs>>;
  contributionPaymentsAdd?: Resolver<ResolversTypes['ContributionPaymentsAddResponse'], ParentType, ContextType, RequireFields<MutationContributionPaymentsAddArgs, 'input'>>;
  createEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationCreateEntryArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  creatorNotificationConfigurationValueUpdate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreatorNotificationConfigurationValueUpdateArgs, 'creatorNotificationConfigurationId' | 'value'>>;
  deleteEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationDeleteEntryArgs, 'id'>>;
  grantApply?: Resolver<ResolversTypes['GrantApplicant'], ParentType, ContextType, Partial<MutationGrantApplyArgs>>;
  orderStatusUpdate?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationOrderStatusUpdateArgs, 'input'>>;
  paymentCancel?: Resolver<ResolversTypes['PaymentCancelResponse'], ParentType, ContextType, RequireFields<MutationPaymentCancelArgs, 'input'>>;
  paymentConfirm?: Resolver<ResolversTypes['PaymentConfirmResponse'], ParentType, ContextType, RequireFields<MutationPaymentConfirmArgs, 'input'>>;
  paymentFail?: Resolver<ResolversTypes['PaymentFailResponse'], ParentType, ContextType, RequireFields<MutationPaymentFailArgs, 'input'>>;
  paymentInvoiceCancel?: Resolver<ResolversTypes['PaymentInvoiceCancelResponse'], ParentType, ContextType, RequireFields<MutationPaymentInvoiceCancelArgs, 'invoiceId'>>;
  paymentPend?: Resolver<ResolversTypes['PaymentPendResponse'], ParentType, ContextType, RequireFields<MutationPaymentPendArgs, 'input'>>;
  podcastKeysendContributionCreate?: Resolver<ResolversTypes['PodcastKeysendContributionCreateResponse'], ParentType, ContextType, RequireFields<MutationPodcastKeysendContributionCreateArgs, 'input'>>;
  postCreate?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationPostCreateArgs, 'input'>>;
  postDelete?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationPostDeleteArgs, 'id'>>;
  postPublish?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationPostPublishArgs, 'input'>>;
  postRepostOnNostr?: Resolver<ResolversTypes['PostRepostOnNostrResponse'], ParentType, ContextType, RequireFields<MutationPostRepostOnNostrArgs, 'input'>>;
  postSendByEmail?: Resolver<ResolversTypes['PostSendByEmailResponse'], ParentType, ContextType, RequireFields<MutationPostSendByEmailArgs, 'input'>>;
  postUpdate?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationPostUpdateArgs, 'input'>>;
  projectClose?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationProjectCloseArgs, 'input'>>;
  projectDelete?: Resolver<ResolversTypes['ProjectDeleteResponse'], ParentType, ContextType, RequireFields<MutationProjectDeleteArgs, 'input'>>;
  projectFollow?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationProjectFollowArgs, 'input'>>;
  projectGoalCreate?: Resolver<Array<ResolversTypes['ProjectGoal']>, ParentType, ContextType, RequireFields<MutationProjectGoalCreateArgs, 'input'>>;
  projectGoalDelete?: Resolver<ResolversTypes['ProjectGoalDeleteResponse'], ParentType, ContextType, RequireFields<MutationProjectGoalDeleteArgs, 'projectGoalId'>>;
  projectGoalOrderingUpdate?: Resolver<Array<ResolversTypes['ProjectGoal']>, ParentType, ContextType, RequireFields<MutationProjectGoalOrderingUpdateArgs, 'input'>>;
  projectGoalUpdate?: Resolver<ResolversTypes['ProjectGoal'], ParentType, ContextType, RequireFields<MutationProjectGoalUpdateArgs, 'input'>>;
  projectPreLaunch?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationProjectPreLaunchArgs, 'input'>>;
  projectPublish?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationProjectPublishArgs, 'input'>>;
  projectPutInReview?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationProjectPutInReviewArgs, 'input'>>;
  projectRewardCreate?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType, RequireFields<MutationProjectRewardCreateArgs, 'input'>>;
  projectRewardCurrencyUpdate?: Resolver<Array<ResolversTypes['ProjectReward']>, ParentType, ContextType, RequireFields<MutationProjectRewardCurrencyUpdateArgs, 'input'>>;
  projectRewardDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationProjectRewardDeleteArgs, 'input'>>;
  projectRewardUpdate?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType, RequireFields<MutationProjectRewardUpdateArgs, 'input'>>;
  projectShippingConfigCreate?: Resolver<ResolversTypes['ShippingConfig'], ParentType, ContextType, RequireFields<MutationProjectShippingConfigCreateArgs, 'input'>>;
  projectShippingConfigUpdate?: Resolver<ResolversTypes['ShippingConfig'], ParentType, ContextType, RequireFields<MutationProjectShippingConfigUpdateArgs, 'input'>>;
  projectStatusUpdate?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationProjectStatusUpdateArgs, 'input'>>;
  projectSubscriptionPlanCreate?: Resolver<ResolversTypes['ProjectSubscriptionPlan'], ParentType, ContextType, RequireFields<MutationProjectSubscriptionPlanCreateArgs, 'input'>>;
  projectSubscriptionPlanDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationProjectSubscriptionPlanDeleteArgs, 'id'>>;
  projectSubscriptionPlanUpdate?: Resolver<ResolversTypes['ProjectSubscriptionPlan'], ParentType, ContextType, RequireFields<MutationProjectSubscriptionPlanUpdateArgs, 'input'>>;
  projectTagAdd?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationProjectTagAddArgs, 'input'>>;
  projectTagRemove?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationProjectTagRemoveArgs, 'input'>>;
  projectUnfollow?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationProjectUnfollowArgs, 'input'>>;
  publishEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationPublishEntryArgs, 'id'>>;
  publishNostrEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPublishNostrEventArgs, 'event'>>;
  sendOTPByEmail?: Resolver<ResolversTypes['OTPResponse'], ParentType, ContextType, RequireFields<MutationSendOtpByEmailArgs, 'input'>>;
  shippingAddressCreate?: Resolver<ResolversTypes['ShippingAddress'], ParentType, ContextType, RequireFields<MutationShippingAddressCreateArgs, 'input'>>;
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
  userSubscriptionCancel?: Resolver<ResolversTypes['UserSubscription'], ParentType, ContextType, RequireFields<MutationUserSubscriptionCancelArgs, 'id'>>;
  userSubscriptionUpdate?: Resolver<ResolversTypes['UserSubscription'], ParentType, ContextType, RequireFields<MutationUserSubscriptionUpdateArgs, 'input'>>;
  userTaxProfileUpdate?: Resolver<ResolversTypes['UserTaxProfile'], ParentType, ContextType, RequireFields<MutationUserTaxProfileUpdateArgs, 'input'>>;
  userVerificationTokenGenerate?: Resolver<ResolversTypes['UserVerificationTokenGenerateResponse'], ParentType, ContextType, RequireFields<MutationUserVerificationTokenGenerateArgs, 'input'>>;
  walletCreate?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<MutationWalletCreateArgs, 'input'>>;
  walletDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationWalletDeleteArgs, 'id'>>;
  walletUpdate?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<MutationWalletUpdateArgs, 'input'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'DeleteUserResponse' | 'ProjectDeleteResponse' | 'ProjectGoalDeleteResponse', ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type NwcConnectionDetailsPrivateResolvers<ContextType = any, ParentType extends ResolversParentTypes['NWCConnectionDetailsPrivate'] = ResolversParentTypes['NWCConnectionDetailsPrivate']> = {
  nwcUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NwcConnectionDetailsPublicResolvers<ContextType = any, ParentType extends ResolversParentTypes['NWCConnectionDetailsPublic'] = ResolversParentTypes['NWCConnectionDetailsPublic']> = {
  nwcUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type OnChainPaymentMethodsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OnChainPaymentMethods'] = ResolversParentTypes['OnChainPaymentMethods']> = {
  boltzSwap?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  native?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OnChainSwapPaymentDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OnChainSwapPaymentDetails'] = ResolversParentTypes['OnChainSwapPaymentDetails']> = {
  lightningInvoiceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lightningInvoiceStatus?: Resolver<ResolversTypes['LightningInvoiceStatus'], ParentType, ContextType>;
  onChainAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  onChainTxId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  swapId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  confirmedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  contribution?: Resolver<ResolversTypes['Contribution'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deliveredAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  itemsTotalInSats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  referenceCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  shippingAddress?: Resolver<Maybe<ResolversTypes['ShippingAddress']>, ParentType, ContextType>;
  shippingFeeTotalInSats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type PaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  accountingAmountDue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  accountingAmountPaid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ambassadorUserId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  baseAccountingAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  canceledAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  contributionPodcastKeysendId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  contributionUUID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  failureReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fees?: Resolver<Array<ResolversTypes['PaymentFee']>, ParentType, ContextType>;
  funder?: Resolver<ResolversTypes['Funder'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  paymentAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  paymentCurrency?: Resolver<ResolversTypes['PaymentCurrency'], ParentType, ContextType>;
  paymentDetails?: Resolver<ResolversTypes['PaymentDetails'], ParentType, ContextType>;
  paymentType?: Resolver<ResolversTypes['PaymentType'], ParentType, ContextType>;
  payoutAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  payoutCurrency?: Resolver<ResolversTypes['PayoutCurrency'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['PaymentStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  userSubscriptionId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentCancelResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentCancelResponse'] = ResolversParentTypes['PaymentCancelResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentConfirmResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentConfirmResponse'] = ResolversParentTypes['PaymentConfirmResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentDetails'] = ResolversParentTypes['PaymentDetails']> = {
  __resolveType: TypeResolveFn<'FiatSwapPaymentDetails' | 'LightningPaymentDetails' | 'OnChainSwapPaymentDetails', ParentType, ContextType>;
};

export type PaymentFailResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentFailResponse'] = ResolversParentTypes['PaymentFailResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentFeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentFee'] = ResolversParentTypes['PaymentFee']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  external?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  feeAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  feeCurrency?: Resolver<ResolversTypes['FeeCurrency'], ParentType, ContextType>;
  feePayer?: Resolver<Maybe<ResolversTypes['PaymentFeePayer']>, ParentType, ContextType>;
  feeType?: Resolver<Maybe<ResolversTypes['PaymentFeeType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentInvoiceCancelResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentInvoiceCancelResponse'] = ResolversParentTypes['PaymentInvoiceCancelResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentInvoiceSanctionCheckStatusResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentInvoiceSanctionCheckStatusResponse'] = ResolversParentTypes['PaymentInvoiceSanctionCheckStatusResponse']> = {
  status?: Resolver<ResolversTypes['PaymentInvoiceSanctionCheckStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentMethodsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentMethods'] = ResolversParentTypes['PaymentMethods']> = {
  bitcoin?: Resolver<ResolversTypes['BitcoinPaymentMethods'], ParentType, ContextType>;
  fiat?: Resolver<ResolversTypes['FiatPaymentMethods'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentPendResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentPendResponse'] = ResolversParentTypes['PaymentPendResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PodcastKeysendContributionCreateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PodcastKeysendContributionCreateResponse'] = ResolversParentTypes['PodcastKeysendContributionCreateResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  amountFunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contributions?: Resolver<Array<ResolversTypes['Contribution']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fundersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  markdown?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postType?: Resolver<Maybe<ResolversTypes['PostType']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectGoals?: Resolver<ResolversTypes['ProjectGoals'], ParentType, ContextType>;
  projectRewards?: Resolver<Array<ResolversTypes['ProjectReward']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sentByEmailAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['PostStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostPublishedSubscriptionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostPublishedSubscriptionResponse'] = ResolversParentTypes['PostPublishedSubscriptionResponse']> = {
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostRepostOnNostrResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostRepostOnNostrResponse'] = ResolversParentTypes['PostRepostOnNostrResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostSendByEmailResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostSendByEmailResponse'] = ResolversParentTypes['PostSendByEmailResponse']> = {
  recipientCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileNotificationSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileNotificationSettings'] = ResolversParentTypes['ProfileNotificationSettings']> = {
  creatorSettings?: Resolver<Array<ResolversTypes['CreatorNotificationSettings']>, ParentType, ContextType>;
  userSettings?: Resolver<ResolversTypes['UserNotificationSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  ambassadors?: Resolver<ResolversTypes['ProjectAmbassadorsConnection'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  balanceUsdCent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  canDelete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['ProjectCategory']>, ParentType, ContextType>;
  contributions?: Resolver<Array<ResolversTypes['Contribution']>, ParentType, ContextType>;
  contributionsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultGoalId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, Partial<ProjectEntriesArgs>>;
  entriesCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  followers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  followersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  funders?: Resolver<Array<ResolversTypes['Funder']>, ParentType, ContextType>;
  fundersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  goalsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  grantApplications?: Resolver<Array<ResolversTypes['GrantApplicant']>, ParentType, ContextType, Partial<ProjectGrantApplicationsArgs>>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  keys?: Resolver<ResolversTypes['ProjectKeys'], ParentType, ContextType>;
  launchedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  links?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  milestones?: Resolver<Array<ResolversTypes['Milestone']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owners?: Resolver<Array<ResolversTypes['Owner']>, ParentType, ContextType>;
  paidLaunch?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  paymentMethods?: Resolver<ResolversTypes['PaymentMethods'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<ProjectPostsArgs>>;
  preLaunchExpiresAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  preLaunchedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  promotionsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rejectionReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rewardBuyersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rewardCurrency?: Resolver<Maybe<ResolversTypes['RewardCurrency']>, ParentType, ContextType>;
  rewards?: Resolver<Array<ResolversTypes['ProjectReward']>, ParentType, ContextType>;
  rewardsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shortDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sponsors?: Resolver<Array<ResolversTypes['Sponsor']>, ParentType, ContextType>;
  statistics?: Resolver<Maybe<ResolversTypes['ProjectStatistics']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ProjectStatus']>, ParentType, ContextType>;
  subCategory?: Resolver<Maybe<ResolversTypes['ProjectSubCategory']>, ParentType, ContextType>;
  subscribersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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

export type ProjectAmbassadorEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectAmbassadorEdge'] = ResolversParentTypes['ProjectAmbassadorEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Ambassador'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectAmbassadorsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectAmbassadorsConnection'] = ResolversParentTypes['ProjectAmbassadorsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ProjectAmbassadorEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['ProjectAmbassadorsStats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectAmbassadorsStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectAmbassadorsStats'] = ResolversParentTypes['ProjectAmbassadorsStats']> = {
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsSum?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  graph?: Resolver<Array<ResolversTypes['ProjectContributionsStatsGraphData']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectContributionsStatsBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectContributionsStatsBase'] = ResolversParentTypes['ProjectContributionsStatsBase']> = {
  contributions?: Resolver<ResolversTypes['ProjectContributionsStats'], ParentType, ContextType>;
  contributionsGroupedByMethod?: Resolver<Array<ResolversTypes['ProjectContributionsGroupedByMethodStats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectContributionsStatsGraphDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectContributionsStatsGraphData'] = ResolversParentTypes['ProjectContributionsStatsGraphData']> = {
  graphData?: Resolver<Maybe<Array<ResolversTypes['ProjectContributionsStatsGraphDataAmount']>>, ParentType, ContextType>;
  statType?: Resolver<ResolversTypes['ProjectContributionsStatsGraphDataStatType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectContributionsStatsGraphDataAmountResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectContributionsStatsGraphDataAmount'] = ResolversParentTypes['ProjectContributionsStatsGraphDataAmount']> = {
  dateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type ProjectGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectGoal'] = ResolversParentTypes['ProjectGoal']> = {
  amountContributed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['ProjectGoalCurrency'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emojiUnifiedCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasReceivedContribution?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  progress?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
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

export type ProjectLeaderboardAmbassadorsRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectLeaderboardAmbassadorsRow'] = ResolversParentTypes['ProjectLeaderboardAmbassadorsRow']> = {
  contributionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contributionsTotalUsd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projectsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
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
  contributionsSummary?: Resolver<Maybe<ResolversTypes['ContributionsSummary']>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMostFundedByCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectMostFundedByCategory'] = ResolversParentTypes['ProjectMostFundedByCategory']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['ProjectMostFunded']>, ParentType, ContextType>;
  subCategory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  confirmationMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedAvailabilityDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  estimatedDeliveryInWeeks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hasShipping?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  isAddon?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  maxClaimable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  preOrder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  privateCommentPrompts?: Resolver<Array<ResolversTypes['PrivateCommentPrompt']>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  rewardCurrency?: Resolver<ResolversTypes['RewardCurrency'], ParentType, ContextType>;
  sentByEmailAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  shippingConfig?: Resolver<Maybe<ResolversTypes['ShippingConfig']>, ParentType, ContextType>;
  shortDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  soldOut?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardTrendingMonthlyGetRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectRewardTrendingMonthlyGetRow'] = ResolversParentTypes['ProjectRewardTrendingMonthlyGetRow']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  projectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardTrendingQuarterlyGetRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectRewardTrendingQuarterlyGetRow'] = ResolversParentTypes['ProjectRewardTrendingQuarterlyGetRow']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  projectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardTrendingWeeklyGetRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectRewardTrendingWeeklyGetRow'] = ResolversParentTypes['ProjectRewardTrendingWeeklyGetRow']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  projectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardsGroupedByRewardIdStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectRewardsGroupedByRewardIdStats'] = ResolversParentTypes['ProjectRewardsGroupedByRewardIdStats']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  projectReward?: Resolver<ResolversTypes['ProjectRewardsGroupedByRewardIdStatsProjectReward'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardsGroupedByRewardIdStatsProjectRewardResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectRewardsGroupedByRewardIdStatsProjectReward'] = ResolversParentTypes['ProjectRewardsGroupedByRewardIdStatsProjectReward']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxClaimable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardsStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectRewardsStats'] = ResolversParentTypes['ProjectRewardsStats']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectShippingRateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectShippingRate'] = ResolversParentTypes['ProjectShippingRate']> = {
  baseRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  incrementRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sameAsDefault?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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
  projectViews?: Resolver<Maybe<ResolversTypes['ProjectViewStats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectSubscriptionPlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectSubscriptionPlan'] = ResolversParentTypes['ProjectSubscriptionPlan']> = {
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['SubscriptionCurrencyType'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  interval?: Resolver<ResolversTypes['UserSubscriptionInterval'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
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
  badges?: Resolver<Array<ResolversTypes['Badge']>, ParentType, ContextType>;
  contribution?: Resolver<ResolversTypes['Contribution'], ParentType, ContextType, Partial<QueryContributionArgs>>;
  contributionsGet?: Resolver<Maybe<ResolversTypes['ContributionsGetResponse']>, ParentType, ContextType, Partial<QueryContributionsGetArgs>>;
  contributor?: Resolver<ResolversTypes['Funder'], ParentType, ContextType, RequireFields<QueryContributorArgs, 'input'>>;
  currencyQuoteGet?: Resolver<ResolversTypes['CurrencyQuoteGetResponse'], ParentType, ContextType, RequireFields<QueryCurrencyQuoteGetArgs, 'input'>>;
  entry?: Resolver<Maybe<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryEntryArgs, 'id'>>;
  fundersGet?: Resolver<Array<ResolversTypes['Funder']>, ParentType, ContextType, RequireFields<QueryFundersGetArgs, 'input'>>;
  getDashboardFunders?: Resolver<Array<ResolversTypes['Funder']>, ParentType, ContextType, Partial<QueryGetDashboardFundersArgs>>;
  getEntries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, Partial<QueryGetEntriesArgs>>;
  getProjectPubkey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetProjectPubkeyArgs, 'projectId'>>;
  getProjectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType, RequireFields<QueryGetProjectRewardArgs, 'id'>>;
  getSignedUploadUrl?: Resolver<ResolversTypes['SignedUploadUrl'], ParentType, ContextType, RequireFields<QueryGetSignedUploadUrlArgs, 'input'>>;
  getWallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<QueryGetWalletArgs, 'id'>>;
  geyserPromotionsContributionStats?: Resolver<ResolversTypes['GeyserPromotionsContributionStats'], ParentType, ContextType, RequireFields<QueryGeyserPromotionsContributionStatsArgs, 'input'>>;
  grant?: Resolver<ResolversTypes['Grant'], ParentType, ContextType, RequireFields<QueryGrantArgs, 'input'>>;
  grantStatistics?: Resolver<ResolversTypes['GrantStatistics'], ParentType, ContextType>;
  grants?: Resolver<Array<ResolversTypes['Grant']>, ParentType, ContextType>;
  guardianUsersGet?: Resolver<Maybe<ResolversTypes['GuardianUsersGetResponse']>, ParentType, ContextType, RequireFields<QueryGuardianUsersGetArgs, 'input'>>;
  leaderboardGlobalAmbassadorsGet?: Resolver<Array<ResolversTypes['GlobalAmbassadorLeaderboardRow']>, ParentType, ContextType, RequireFields<QueryLeaderboardGlobalAmbassadorsGetArgs, 'input'>>;
  leaderboardGlobalContributorsGet?: Resolver<Array<ResolversTypes['GlobalContributorLeaderboardRow']>, ParentType, ContextType, RequireFields<QueryLeaderboardGlobalContributorsGetArgs, 'input'>>;
  leaderboardGlobalCreatorsGet?: Resolver<Array<ResolversTypes['GlobalCreatorLeaderboardRow']>, ParentType, ContextType, RequireFields<QueryLeaderboardGlobalCreatorsGetArgs, 'input'>>;
  leaderboardGlobalProjectsGet?: Resolver<Array<ResolversTypes['GlobalProjectLeaderboardRow']>, ParentType, ContextType, RequireFields<QueryLeaderboardGlobalProjectsGetArgs, 'input'>>;
  lightningAddressVerify?: Resolver<ResolversTypes['LightningAddressVerifyResponse'], ParentType, ContextType, Partial<QueryLightningAddressVerifyArgs>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  orderGet?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrderGetArgs, 'where'>>;
  ordersGet?: Resolver<Maybe<ResolversTypes['OrdersGetResponse']>, ParentType, ContextType, RequireFields<QueryOrdersGetArgs, 'input'>>;
  ordersStatsGet?: Resolver<ResolversTypes['OrdersStatsBase'], ParentType, ContextType, RequireFields<QueryOrdersStatsGetArgs, 'input'>>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType, RequireFields<QueryPaymentArgs, 'input'>>;
  paymentInvoiceSanctionCheckStatusGet?: Resolver<ResolversTypes['PaymentInvoiceSanctionCheckStatusResponse'], ParentType, ContextType, RequireFields<QueryPaymentInvoiceSanctionCheckStatusGetArgs, 'input'>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  postEmailSegmentSizeGet?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryPostEmailSegmentSizeGetArgs, 'input'>>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<QueryPostsArgs>>;
  projectCountriesGet?: Resolver<Array<ResolversTypes['ProjectCountriesGetResult']>, ParentType, ContextType, Partial<QueryProjectCountriesGetArgs>>;
  projectGet?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectGetArgs, 'where'>>;
  projectGoal?: Resolver<ResolversTypes['ProjectGoal'], ParentType, ContextType, RequireFields<QueryProjectGoalArgs, 'projectGoalId'>>;
  projectGoals?: Resolver<ResolversTypes['ProjectGoals'], ParentType, ContextType, RequireFields<QueryProjectGoalsArgs, 'input'>>;
  projectLeaderboardAmbassadorsGet?: Resolver<Array<ResolversTypes['ProjectLeaderboardAmbassadorsRow']>, ParentType, ContextType, RequireFields<QueryProjectLeaderboardAmbassadorsGetArgs, 'input'>>;
  projectLeaderboardContributorsGet?: Resolver<Array<ResolversTypes['ProjectLeaderboardContributorsRow']>, ParentType, ContextType, RequireFields<QueryProjectLeaderboardContributorsGetArgs, 'input'>>;
  projectNotificationSettingsGet?: Resolver<ResolversTypes['CreatorNotificationSettings'], ParentType, ContextType, RequireFields<QueryProjectNotificationSettingsGetArgs, 'projectId'>>;
  projectRegionsGet?: Resolver<Array<ResolversTypes['ProjectRegionsGetResult']>, ParentType, ContextType>;
  projectRewardCategoriesGet?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  projectRewardGet?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType, RequireFields<QueryProjectRewardGetArgs, 'input'>>;
  projectRewardsGet?: Resolver<Array<ResolversTypes['ProjectReward']>, ParentType, ContextType, RequireFields<QueryProjectRewardsGetArgs, 'input'>>;
  projectRewardsTrendingMonthlyGet?: Resolver<Array<ResolversTypes['ProjectRewardTrendingMonthlyGetRow']>, ParentType, ContextType>;
  projectRewardsTrendingQuarterlyGet?: Resolver<Array<ResolversTypes['ProjectRewardTrendingQuarterlyGetRow']>, ParentType, ContextType>;
  projectRewardsTrendingWeeklyGet?: Resolver<Array<ResolversTypes['ProjectRewardTrendingWeeklyGetRow']>, ParentType, ContextType>;
  projectShippingConfigsGet?: Resolver<Array<ResolversTypes['ShippingConfig']>, ParentType, ContextType, RequireFields<QueryProjectShippingConfigsGetArgs, 'input'>>;
  projectStatsGet?: Resolver<ResolversTypes['ProjectStats'], ParentType, ContextType, RequireFields<QueryProjectStatsGetArgs, 'input'>>;
  projectSubscriptionPlan?: Resolver<Maybe<ResolversTypes['ProjectSubscriptionPlan']>, ParentType, ContextType, RequireFields<QueryProjectSubscriptionPlanArgs, 'id'>>;
  projectSubscriptionPlans?: Resolver<Array<ResolversTypes['ProjectSubscriptionPlan']>, ParentType, ContextType, RequireFields<QueryProjectSubscriptionPlansArgs, 'input'>>;
  projectsGet?: Resolver<ResolversTypes['ProjectsResponse'], ParentType, ContextType, Partial<QueryProjectsGetArgs>>;
  projectsMostFundedByCategory?: Resolver<Array<ResolversTypes['ProjectMostFundedByCategory']>, ParentType, ContextType, RequireFields<QueryProjectsMostFundedByCategoryArgs, 'input'>>;
  projectsMostFundedByTag?: Resolver<Array<ResolversTypes['ProjectMostFundedByTag']>, ParentType, ContextType, RequireFields<QueryProjectsMostFundedByTagArgs, 'input'>>;
  projectsSummary?: Resolver<ResolversTypes['ProjectsSummary'], ParentType, ContextType>;
  shippingAddressesGet?: Resolver<Array<ResolversTypes['ShippingAddress']>, ParentType, ContextType, RequireFields<QueryShippingAddressesGetArgs, 'input'>>;
  statusCheck?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tagsGet?: Resolver<Array<ResolversTypes['TagsGetResult']>, ParentType, ContextType>;
  tagsMostFundedGet?: Resolver<Array<ResolversTypes['TagsMostFundedGetResult']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'where'>>;
  userBadge?: Resolver<Maybe<ResolversTypes['UserBadge']>, ParentType, ContextType, RequireFields<QueryUserBadgeArgs, 'userBadgeId'>>;
  userBadges?: Resolver<Array<ResolversTypes['UserBadge']>, ParentType, ContextType, RequireFields<QueryUserBadgesArgs, 'input'>>;
  userEmailIsAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryUserEmailIsAvailableArgs, 'email'>>;
  userEmailIsValid?: Resolver<ResolversTypes['UserEmailIsValidResponse'], ParentType, ContextType, RequireFields<QueryUserEmailIsValidArgs, 'email'>>;
  userIpCountry?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userNotificationSettingsGet?: Resolver<ResolversTypes['ProfileNotificationSettings'], ParentType, ContextType, RequireFields<QueryUserNotificationSettingsGetArgs, 'userId'>>;
  userSubscription?: Resolver<Maybe<ResolversTypes['UserSubscription']>, ParentType, ContextType, RequireFields<QueryUserSubscriptionArgs, 'id'>>;
  userSubscriptions?: Resolver<Array<ResolversTypes['UserSubscription']>, ParentType, ContextType, RequireFields<QueryUserSubscriptionsArgs, 'input'>>;
};

export type ShippingAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingAddress'] = ResolversParentTypes['ShippingAddress']> = {
  addressLines?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingConfig'] = ResolversParentTypes['ShippingConfig']> = {
  globalShipping?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingRates?: Resolver<Maybe<Array<ResolversTypes['ProjectShippingRate']>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ProjectShippingConfigType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignedUploadUrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignedUploadUrl'] = ResolversParentTypes['SignedUploadUrl']> = {
  distributionUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uploadUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SourceResourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['SourceResource'] = ResolversParentTypes['SourceResource']> = {
  __resolveType: TypeResolveFn<'Activity' | 'Entry' | 'Project', ParentType, ContextType>;
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
  activityCreated?: SubscriptionResolver<ResolversTypes['Activity'], "activityCreated", ParentType, ContextType, Partial<SubscriptionActivityCreatedArgs>>;
  contributionStatusUpdated?: SubscriptionResolver<ResolversTypes['ContributionStatusUpdatedSubscriptionResponse'], "contributionStatusUpdated", ParentType, ContextType, Partial<SubscriptionContributionStatusUpdatedArgs>>;
  entryPublished?: SubscriptionResolver<ResolversTypes['EntryPublishedSubscriptionResponse'], "entryPublished", ParentType, ContextType>;
  paymentStatusUpdated?: SubscriptionResolver<ResolversTypes['Payment'], "paymentStatusUpdated", ParentType, ContextType, RequireFields<SubscriptionPaymentStatusUpdatedArgs, 'input'>>;
  postPublished?: SubscriptionResolver<ResolversTypes['PostPublishedSubscriptionResponse'], "postPublished", ParentType, ContextType>;
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
  complianceDetails?: Resolver<ResolversTypes['UserComplianceDetails'], ParentType, ContextType>;
  contributions?: Resolver<Array<ResolversTypes['Contribution']>, ParentType, ContextType, Partial<UserContributionsArgs>>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailVerifiedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  entityType?: Resolver<Maybe<ResolversTypes['UserEntityType']>, ParentType, ContextType>;
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, Partial<UserEntriesArgs>>;
  externalAccounts?: Resolver<Array<ResolversTypes['ExternalAccount']>, ParentType, ContextType>;
  guardianType?: Resolver<Maybe<ResolversTypes['GuardianType']>, ParentType, ContextType>;
  hasSocialAccount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  heroId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  heroStats?: Resolver<ResolversTypes['UserHeroStats'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isEmailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>;
  ownerOf?: Resolver<Array<ResolversTypes['OwnerOf']>, ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<UserPostsArgs>>;
  projectContributions?: Resolver<Array<ResolversTypes['UserProjectContribution']>, ParentType, ContextType>;
  projectFollows?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, Partial<UserProjectsArgs>>;
  ranking?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  taxProfile?: Resolver<Maybe<ResolversTypes['UserTaxProfile']>, ParentType, ContextType>;
  taxProfileId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserBadgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBadge'] = ResolversParentTypes['UserBadge']> = {
  badge?: Resolver<ResolversTypes['Badge'], ParentType, ContextType>;
  badgeAwardEventId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contributionId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['UserBadgeStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserComplianceDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserComplianceDetails'] = ResolversParentTypes['UserComplianceDetails']> = {
  contributionLimits?: Resolver<ResolversTypes['UserContributionLimits'], ParentType, ContextType>;
  currentVerificationLevel?: Resolver<ResolversTypes['UserVerificationLevelStatus'], ParentType, ContextType>;
  verificationLevels?: Resolver<Array<ResolversTypes['UserVerificationLevelStatus']>, ParentType, ContextType>;
  verifiedDetails?: Resolver<ResolversTypes['UserVerifiedDetails'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserContributionLimitResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserContributionLimit'] = ResolversParentTypes['UserContributionLimit']> = {
  limit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  nextReset?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  reached?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  remaining?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserContributionLimitsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserContributionLimits'] = ResolversParentTypes['UserContributionLimits']> = {
  monthly?: Resolver<ResolversTypes['UserContributionLimit'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEmailIsValidResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEmailIsValidResponse'] = ResolversParentTypes['UserEmailIsValidResponse']> = {
  isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isDeliverable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isValid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserHeroStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserHeroStats'] = ResolversParentTypes['UserHeroStats']> = {
  ambassadorStats?: Resolver<ResolversTypes['AmbassadorStats'], ParentType, ContextType>;
  contributorStats?: Resolver<ResolversTypes['ContributorStats'], ParentType, ContextType>;
  creatorStats?: Resolver<ResolversTypes['CreatorStats'], ParentType, ContextType>;
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

export type UserSubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSubscription'] = ResolversParentTypes['UserSubscription']> = {
  canceledAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nextBillingDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  projectSubscriptionPlan?: Resolver<ResolversTypes['ProjectSubscriptionPlan'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UserSubscriptionStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserTaxProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserTaxProfile'] = ResolversParentTypes['UserTaxProfile']> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  legalEntityType?: Resolver<ResolversTypes['LegalEntityType'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserVerificationLevelStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserVerificationLevelStatus'] = ResolversParentTypes['UserVerificationLevelStatus']> = {
  level?: Resolver<ResolversTypes['UserVerificationLevel'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UserVerificationStatus'], ParentType, ContextType>;
  verifiedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserVerificationTokenGenerateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserVerificationTokenGenerateResponse'] = ResolversParentTypes['UserVerificationTokenGenerateResponse']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verificationLevel?: Resolver<ResolversTypes['UserVerificationLevel'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserVerifiedDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserVerifiedDetails'] = ResolversParentTypes['UserVerifiedDetails']> = {
  email?: Resolver<Maybe<ResolversTypes['VerificationResult']>, ParentType, ContextType>;
  identity?: Resolver<Maybe<ResolversTypes['VerificationResult']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['VerificationResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerificationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerificationResult'] = ResolversParentTypes['VerificationResult']> = {
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  verifiedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
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
  Ambassador?: AmbassadorResolvers<ContextType>;
  AmbassadorStats?: AmbassadorStatsResolvers<ContextType>;
  AmountSummary?: AmountSummaryResolvers<ContextType>;
  Badge?: BadgeResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  BitcoinPaymentMethods?: BitcoinPaymentMethodsResolvers<ContextType>;
  BitcoinQuote?: BitcoinQuoteResolvers<ContextType>;
  BoardVoteGrant?: BoardVoteGrantResolvers<ContextType>;
  CommunityVoteGrant?: CommunityVoteGrantResolvers<ContextType>;
  CompetitionVoteGrantVoteSummary?: CompetitionVoteGrantVoteSummaryResolvers<ContextType>;
  ConnectionDetails?: ConnectionDetailsResolvers<ContextType>;
  Contribution?: ContributionResolvers<ContextType>;
  ContributionFiatPaymentDetails?: ContributionFiatPaymentDetailsResolvers<ContextType>;
  ContributionFiatSwapPaymentDetails?: ContributionFiatSwapPaymentDetailsResolvers<ContextType>;
  ContributionLightningPaymentDetails?: ContributionLightningPaymentDetailsResolvers<ContextType>;
  ContributionMutationResponse?: ContributionMutationResponseResolvers<ContextType>;
  ContributionOnChainSwapPaymentDetails?: ContributionOnChainSwapPaymentDetailsResolvers<ContextType>;
  ContributionPaymentsAddResponse?: ContributionPaymentsAddResponseResolvers<ContextType>;
  ContributionPaymentsDetails?: ContributionPaymentsDetailsResolvers<ContextType>;
  ContributionStatusUpdatedSubscriptionResponse?: ContributionStatusUpdatedSubscriptionResponseResolvers<ContextType>;
  ContributionsGetResponse?: ContributionsGetResponseResolvers<ContextType>;
  ContributionsSummary?: ContributionsSummaryResolvers<ContextType>;
  ContributorContributionsSummary?: ContributorContributionsSummaryResolvers<ContextType>;
  ContributorStats?: ContributorStatsResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  CreatorNotificationSettings?: CreatorNotificationSettingsResolvers<ContextType>;
  CreatorNotificationSettingsProject?: CreatorNotificationSettingsProjectResolvers<ContextType>;
  CreatorStats?: CreatorStatsResolvers<ContextType>;
  CurrencyQuoteGetResponse?: CurrencyQuoteGetResponseResolvers<ContextType>;
  CursorPaginationResponse?: CursorPaginationResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DatetimeRange?: DatetimeRangeResolvers<ContextType>;
  DeleteUserResponse?: DeleteUserResponseResolvers<ContextType>;
  Entry?: EntryResolvers<ContextType>;
  EntryPublishedSubscriptionResponse?: EntryPublishedSubscriptionResponseResolvers<ContextType>;
  ExternalAccount?: ExternalAccountResolvers<ContextType>;
  FiatPaymentMethods?: FiatPaymentMethodsResolvers<ContextType>;
  FiatSwapPaymentDetails?: FiatSwapPaymentDetailsResolvers<ContextType>;
  Funder?: FunderResolvers<ContextType>;
  FunderRewardGraphSum?: FunderRewardGraphSumResolvers<ContextType>;
  GeyserPromotionsContributionStats?: GeyserPromotionsContributionStatsResolvers<ContextType>;
  GlobalAmbassadorLeaderboardRow?: GlobalAmbassadorLeaderboardRowResolvers<ContextType>;
  GlobalContributorLeaderboardRow?: GlobalContributorLeaderboardRowResolvers<ContextType>;
  GlobalCreatorLeaderboardRow?: GlobalCreatorLeaderboardRowResolvers<ContextType>;
  GlobalProjectLeaderboardRow?: GlobalProjectLeaderboardRowResolvers<ContextType>;
  Grant?: GrantResolvers<ContextType>;
  GrantApplicant?: GrantApplicantResolvers<ContextType>;
  GrantApplicantContributor?: GrantApplicantContributorResolvers<ContextType>;
  GrantApplicantFunding?: GrantApplicantFundingResolvers<ContextType>;
  GrantBoardMember?: GrantBoardMemberResolvers<ContextType>;
  GrantGuardiansFunding?: GrantGuardiansFundingResolvers<ContextType>;
  GrantStatistics?: GrantStatisticsResolvers<ContextType>;
  GrantStatisticsApplicant?: GrantStatisticsApplicantResolvers<ContextType>;
  GrantStatisticsGrant?: GrantStatisticsGrantResolvers<ContextType>;
  GrantStatus?: GrantStatusResolvers<ContextType>;
  GraphData?: GraphDataResolvers<ContextType>;
  GraphSumData?: GraphSumDataResolvers<ContextType>;
  GuardianResult?: GuardianResultResolvers<ContextType>;
  GuardianUser?: GuardianUserResolvers<ContextType>;
  GuardianUsersGetResponse?: GuardianUsersGetResponseResolvers<ContextType>;
  HeroStats?: HeroStatsResolvers<ContextType>;
  LightningAddressConnectionDetails?: LightningAddressConnectionDetailsResolvers<ContextType>;
  LightningAddressContributionLimits?: LightningAddressContributionLimitsResolvers<ContextType>;
  LightningAddressVerifyResponse?: LightningAddressVerifyResponseResolvers<ContextType>;
  LightningPaymentDetails?: LightningPaymentDetailsResolvers<ContextType>;
  LightningPaymentMethods?: LightningPaymentMethodsResolvers<ContextType>;
  LndConnectionDetails?: LndConnectionDetailsResolvers<ContextType>;
  LndConnectionDetailsPrivate?: LndConnectionDetailsPrivateResolvers<ContextType>;
  LndConnectionDetailsPublic?: LndConnectionDetailsPublicResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Milestone?: MilestoneResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  NWCConnectionDetailsPrivate?: NwcConnectionDetailsPrivateResolvers<ContextType>;
  NWCConnectionDetailsPublic?: NwcConnectionDetailsPublicResolvers<ContextType>;
  NostrKeys?: NostrKeysResolvers<ContextType>;
  NostrPrivateKey?: NostrPrivateKeyResolvers<ContextType>;
  NostrPublicKey?: NostrPublicKeyResolvers<ContextType>;
  NotificationConfiguration?: NotificationConfigurationResolvers<ContextType>;
  NotificationSettings?: NotificationSettingsResolvers<ContextType>;
  OTPResponse?: OtpResponseResolvers<ContextType>;
  OnChainPaymentMethods?: OnChainPaymentMethodsResolvers<ContextType>;
  OnChainSwapPaymentDetails?: OnChainSwapPaymentDetailsResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  OrdersGetResponse?: OrdersGetResponseResolvers<ContextType>;
  OrdersStatsBase?: OrdersStatsBaseResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  OwnerOf?: OwnerOfResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PageViewCountGraph?: PageViewCountGraphResolvers<ContextType>;
  PaginationCursor?: PaginationCursorResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  PaymentCancelResponse?: PaymentCancelResponseResolvers<ContextType>;
  PaymentConfirmResponse?: PaymentConfirmResponseResolvers<ContextType>;
  PaymentDetails?: PaymentDetailsResolvers<ContextType>;
  PaymentFailResponse?: PaymentFailResponseResolvers<ContextType>;
  PaymentFee?: PaymentFeeResolvers<ContextType>;
  PaymentInvoiceCancelResponse?: PaymentInvoiceCancelResponseResolvers<ContextType>;
  PaymentInvoiceSanctionCheckStatusResponse?: PaymentInvoiceSanctionCheckStatusResponseResolvers<ContextType>;
  PaymentMethods?: PaymentMethodsResolvers<ContextType>;
  PaymentPendResponse?: PaymentPendResponseResolvers<ContextType>;
  PodcastKeysendContributionCreateResponse?: PodcastKeysendContributionCreateResponseResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostPublishedSubscriptionResponse?: PostPublishedSubscriptionResponseResolvers<ContextType>;
  PostRepostOnNostrResponse?: PostRepostOnNostrResponseResolvers<ContextType>;
  PostSendByEmailResponse?: PostSendByEmailResponseResolvers<ContextType>;
  ProfileNotificationSettings?: ProfileNotificationSettingsResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectActivatedSubscriptionResponse?: ProjectActivatedSubscriptionResponseResolvers<ContextType>;
  ProjectActivitiesCount?: ProjectActivitiesCountResolvers<ContextType>;
  ProjectAmbassadorEdge?: ProjectAmbassadorEdgeResolvers<ContextType>;
  ProjectAmbassadorsConnection?: ProjectAmbassadorsConnectionResolvers<ContextType>;
  ProjectAmbassadorsStats?: ProjectAmbassadorsStatsResolvers<ContextType>;
  ProjectContributionsGroupedByMethodStats?: ProjectContributionsGroupedByMethodStatsResolvers<ContextType>;
  ProjectContributionsStats?: ProjectContributionsStatsResolvers<ContextType>;
  ProjectContributionsStatsBase?: ProjectContributionsStatsBaseResolvers<ContextType>;
  ProjectContributionsStatsGraphData?: ProjectContributionsStatsGraphDataResolvers<ContextType>;
  ProjectContributionsStatsGraphDataAmount?: ProjectContributionsStatsGraphDataAmountResolvers<ContextType>;
  ProjectCountriesGetResult?: ProjectCountriesGetResultResolvers<ContextType>;
  ProjectDeleteResponse?: ProjectDeleteResponseResolvers<ContextType>;
  ProjectFollowerStats?: ProjectFollowerStatsResolvers<ContextType>;
  ProjectFunderRewardStats?: ProjectFunderRewardStatsResolvers<ContextType>;
  ProjectFunderStats?: ProjectFunderStatsResolvers<ContextType>;
  ProjectGoal?: ProjectGoalResolvers<ContextType>;
  ProjectGoalDeleteResponse?: ProjectGoalDeleteResponseResolvers<ContextType>;
  ProjectGoals?: ProjectGoalsResolvers<ContextType>;
  ProjectKeys?: ProjectKeysResolvers<ContextType>;
  ProjectLeaderboardAmbassadorsRow?: ProjectLeaderboardAmbassadorsRowResolvers<ContextType>;
  ProjectLeaderboardContributorsRow?: ProjectLeaderboardContributorsRowResolvers<ContextType>;
  ProjectMostFunded?: ProjectMostFundedResolvers<ContextType>;
  ProjectMostFundedByCategory?: ProjectMostFundedByCategoryResolvers<ContextType>;
  ProjectMostFundedByTag?: ProjectMostFundedByTagResolvers<ContextType>;
  ProjectRegionsGetResult?: ProjectRegionsGetResultResolvers<ContextType>;
  ProjectReward?: ProjectRewardResolvers<ContextType>;
  ProjectRewardTrendingMonthlyGetRow?: ProjectRewardTrendingMonthlyGetRowResolvers<ContextType>;
  ProjectRewardTrendingQuarterlyGetRow?: ProjectRewardTrendingQuarterlyGetRowResolvers<ContextType>;
  ProjectRewardTrendingWeeklyGetRow?: ProjectRewardTrendingWeeklyGetRowResolvers<ContextType>;
  ProjectRewardsGroupedByRewardIdStats?: ProjectRewardsGroupedByRewardIdStatsResolvers<ContextType>;
  ProjectRewardsGroupedByRewardIdStatsProjectReward?: ProjectRewardsGroupedByRewardIdStatsProjectRewardResolvers<ContextType>;
  ProjectRewardsStats?: ProjectRewardsStatsResolvers<ContextType>;
  ProjectShippingRate?: ProjectShippingRateResolvers<ContextType>;
  ProjectStatistics?: ProjectStatisticsResolvers<ContextType>;
  ProjectStats?: ProjectStatsResolvers<ContextType>;
  ProjectStatsBase?: ProjectStatsBaseResolvers<ContextType>;
  ProjectSubscriptionPlan?: ProjectSubscriptionPlanResolvers<ContextType>;
  ProjectViewBaseStats?: ProjectViewBaseStatsResolvers<ContextType>;
  ProjectViewStats?: ProjectViewStatsResolvers<ContextType>;
  ProjectsResponse?: ProjectsResponseResolvers<ContextType>;
  ProjectsSummary?: ProjectsSummaryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShippingAddress?: ShippingAddressResolvers<ContextType>;
  ShippingConfig?: ShippingConfigResolvers<ContextType>;
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
  UserComplianceDetails?: UserComplianceDetailsResolvers<ContextType>;
  UserContributionLimit?: UserContributionLimitResolvers<ContextType>;
  UserContributionLimits?: UserContributionLimitsResolvers<ContextType>;
  UserEmailIsValidResponse?: UserEmailIsValidResponseResolvers<ContextType>;
  UserHeroStats?: UserHeroStatsResolvers<ContextType>;
  UserNotificationSettings?: UserNotificationSettingsResolvers<ContextType>;
  UserProjectContribution?: UserProjectContributionResolvers<ContextType>;
  UserSubscription?: UserSubscriptionResolvers<ContextType>;
  UserTaxProfile?: UserTaxProfileResolvers<ContextType>;
  UserVerificationLevelStatus?: UserVerificationLevelStatusResolvers<ContextType>;
  UserVerificationTokenGenerateResponse?: UserVerificationTokenGenerateResponseResolvers<ContextType>;
  UserVerifiedDetails?: UserVerifiedDetailsResolvers<ContextType>;
  VerificationResult?: VerificationResultResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
  WalletContributionLimits?: WalletContributionLimitsResolvers<ContextType>;
  WalletLimits?: WalletLimitsResolvers<ContextType>;
  WalletOffChainContributionLimits?: WalletOffChainContributionLimitsResolvers<ContextType>;
  WalletOnChainContributionLimits?: WalletOnChainContributionLimitsResolvers<ContextType>;
  WalletState?: WalletStateResolvers<ContextType>;
};


export type EmailUpdateUserFragment = { __typename?: 'User', email?: string | null, isEmailVerified: boolean, id: any };

export type OtpResponseFragment = { __typename?: 'OTPResponse', otpVerificationToken: string, expiresAt: any };

export type ProjectDefaultGoalFragment = { __typename?: 'ProjectGoal', id: any, title: string, targetAmount: number, currency: ProjectGoalCurrency, amountContributed: number };

export type ProjectGoalFragment = { __typename?: 'ProjectGoal', id: any, title: string, description?: string | null, targetAmount: number, currency: ProjectGoalCurrency, status: ProjectGoalStatus, projectId: any, amountContributed: number, createdAt: any, updatedAt: any, completedAt?: any | null, hasReceivedContribution: boolean, emojiUnifiedCode?: string | null };

export type BoardVoteGrantsFragmentFragment = { __typename?: 'BoardVoteGrant', id: any, title: string, name: string, image?: string | null, shortDescription: string, description?: string | null, balance: number, status: GrantStatusEnum, type: GrantType, applicants: Array<{ __typename?: 'GrantApplicant', id: any }>, statuses: Array<{ __typename?: 'GrantStatus', status: GrantStatusEnum, endAt?: any | null, startAt: any }>, sponsors: Array<{ __typename?: 'Sponsor', id: any, name: string, url?: string | null, image?: string | null, status: SponsorStatus, createdAt: any }> };

export type CommunityVoteGrantsFragmentFragment = { __typename?: 'CommunityVoteGrant', id: any, title: string, name: string, image?: string | null, shortDescription: string, description?: string | null, balance: number, status: GrantStatusEnum, type: GrantType, votingSystem: VotingSystem, distributionSystem: DistributionSystem, applicants: Array<{ __typename?: 'GrantApplicant', id: any }>, statuses: Array<{ __typename?: 'GrantStatus', status: GrantStatusEnum, endAt?: any | null, startAt: any }>, sponsors: Array<{ __typename?: 'Sponsor', id: any, name: string, url?: string | null, image?: string | null, status: SponsorStatus, createdAt: any }>, votes: { __typename?: 'CompetitionVoteGrantVoteSummary', voteCount: number, voterCount: number } };

export type BoardVoteGrantFragmentFragment = { __typename?: 'BoardVoteGrant', id: any, title: string, name: string, shortDescription: string, description?: string | null, balance: number, status: GrantStatusEnum, image?: string | null, type: GrantType, statuses: Array<{ __typename?: 'GrantStatus', status: GrantStatusEnum, endAt?: any | null, startAt: any }>, applicants: Array<{ __typename?: 'GrantApplicant', contributorsCount: number, status: GrantApplicantStatus, contributors: Array<{ __typename?: 'GrantApplicantContributor', amount: number, timesContributed: number, user?: { __typename?: 'User', id: any, imageUrl?: string | null } | null }>, project: { __typename?: 'Project', id: any, name: string, title: string, thumbnailImage?: string | null, shortDescription?: string | null, description?: string | null, wallets: Array<{ __typename?: 'Wallet', id: any }> }, funding: { __typename?: 'GrantApplicantFunding', communityFunding: number, grantAmount: number, grantAmountDistributed: number } }>, sponsors: Array<{ __typename?: 'Sponsor', id: any, name: string, url?: string | null, image?: string | null, status: SponsorStatus, createdAt: any }>, boardMembers: Array<{ __typename?: 'GrantBoardMember', user: { __typename?: 'User', username: string, imageUrl?: string | null, id: any, externalAccounts: Array<{ __typename?: 'ExternalAccount', accountType: string, externalId: string, externalUsername: string, id: any, public: boolean }> } }> };

export type CommunityVoteGrantFragmentFragment = { __typename?: 'CommunityVoteGrant', id: any, title: string, name: string, shortDescription: string, description?: string | null, balance: number, status: GrantStatusEnum, image?: string | null, type: GrantType, votingSystem: VotingSystem, distributionSystem: DistributionSystem, statuses: Array<{ __typename?: 'GrantStatus', status: GrantStatusEnum, endAt?: any | null, startAt: any }>, applicants: Array<{ __typename?: 'GrantApplicant', contributorsCount: number, status: GrantApplicantStatus, voteCount: number, contributors: Array<{ __typename?: 'GrantApplicantContributor', amount: number, timesContributed: number, voteCount: number, user?: { __typename?: 'User', id: any, imageUrl?: string | null, username: string } | null }>, project: { __typename?: 'Project', id: any, name: string, title: string, thumbnailImage?: string | null, shortDescription?: string | null, description?: string | null, wallets: Array<{ __typename?: 'Wallet', id: any }> }, funding: { __typename?: 'GrantApplicantFunding', communityFunding: number, grantAmount: number, grantAmountDistributed: number } }>, sponsors: Array<{ __typename?: 'Sponsor', id: any, name: string, url?: string | null, image?: string | null, status: SponsorStatus, createdAt: any }>, votes: { __typename?: 'CompetitionVoteGrantVoteSummary', voteCount: number, voterCount: number } };

export type PaginationFragment = { __typename?: 'CursorPaginationResponse', take?: number | null, count?: number | null, cursor?: { __typename?: 'PaginationCursor', id?: any | null } | null };

export type ProjectForOwnerFragment = { __typename?: 'Project', id: any, name: string, images: Array<string>, thumbnailImage?: string | null, title: string, status?: ProjectStatus | null, createdAt: string };

export type ProjectWalletFragment = { __typename?: 'Wallet', id: any, name?: string | null, feePercentage?: number | null, state: { __typename?: 'WalletState', status: WalletStatus, statusCode: WalletStatusCode }, connectionDetails: { __typename?: 'LightningAddressConnectionDetails', lightningAddress: string } | { __typename?: 'LndConnectionDetailsPrivate', macaroon: string, tlsCertificate?: string | null, hostname: string, grpcPort: number, lndNodeType: LndNodeType, pubkey?: string | null } | { __typename?: 'LndConnectionDetailsPublic', pubkey?: string | null } | { __typename?: 'NWCConnectionDetailsPrivate' } };

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

export type UnlinkExternalAccountMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type UnlinkExternalAccountMutation = { __typename?: 'Mutation', unlinkExternalAccount: { __typename?: 'User', id: any, username: string, imageUrl?: string | null, externalAccounts: Array<{ __typename?: 'ExternalAccount', id: any, accountType: string, externalUsername: string, externalId: string, public: boolean }> } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename: 'User', id: any, bio?: string | null, email?: string | null, username: string, imageUrl?: string | null, wallet?: { __typename?: 'Wallet', connectionDetails: { __typename?: 'LightningAddressConnectionDetails', lightningAddress: string } | { __typename?: 'LndConnectionDetailsPrivate' } | { __typename?: 'LndConnectionDetailsPublic' } | { __typename?: 'NWCConnectionDetailsPrivate' } } | null } };

export type UserDeleteMutationVariables = Exact<{ [key: string]: never; }>;


export type UserDeleteMutation = { __typename?: 'Mutation', userDelete: { __typename?: 'DeleteUserResponse', message?: string | null, success: boolean } };

export type SignedUploadUrlQueryVariables = Exact<{
  input: FileUploadInput;
}>;


export type SignedUploadUrlQuery = { __typename?: 'Query', getSignedUploadUrl: { __typename?: 'SignedUploadUrl', uploadUrl: string, distributionUrl: string } };

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

export type GrantGetQueryVariables = Exact<{
  input: GrantGetInput;
}>;


export type GrantGetQuery = { __typename?: 'Query', grant: { __typename?: 'BoardVoteGrant', applicants: Array<{ __typename?: 'GrantApplicant', project: { __typename?: 'Project', name: string, id: any } }> } | { __typename?: 'CommunityVoteGrant', applicants: Array<{ __typename?: 'GrantApplicant', project: { __typename?: 'Project', name: string, id: any } }> } };

export type LightningAddressVerifyQueryVariables = Exact<{
  lightningAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type LightningAddressVerifyQuery = { __typename?: 'Query', lightningAddressVerify: { __typename?: 'LightningAddressVerifyResponse', reason?: string | null, valid: boolean, limits?: { __typename?: 'LightningAddressContributionLimits', max?: number | null, min?: number | null } | null } };

export type WalletLimitQueryVariables = Exact<{
  getWalletId: Scalars['BigInt']['input'];
}>;


export type WalletLimitQuery = { __typename?: 'Query', getWallet: { __typename?: 'Wallet', limits?: { __typename?: 'WalletLimits', contribution?: { __typename?: 'WalletContributionLimits', max?: number | null, min?: number | null } | null } | null } };

export type ExternalAccountFragment = { __typename?: 'ExternalAccount', id: any, accountType: string, externalUsername: string, externalId: string, externalLink?: string | null, public: boolean };

export type ProjectOwnerUserFragment = { __typename?: 'User', id: any, username: string, imageUrl?: string | null, email?: string | null, ranking?: any | null, isEmailVerified: boolean, hasSocialAccount: boolean, externalAccounts: Array<(
    { __typename?: 'ExternalAccount' }
    & ExternalAccountFragment
  )> };

export type UserComplianceDetailsFragment = { __typename?: 'UserComplianceDetails', contributionLimits: { __typename?: 'UserContributionLimits', monthly: { __typename?: 'UserContributionLimit', limit: number, reached: boolean, remaining: number } }, currentVerificationLevel: { __typename?: 'UserVerificationLevelStatus', level: UserVerificationLevel, status: UserVerificationStatus, verifiedAt?: any | null }, verifiedDetails: { __typename?: 'UserVerifiedDetails', email?: { __typename?: 'VerificationResult', verified?: boolean | null, verifiedAt?: any | null } | null, identity?: { __typename?: 'VerificationResult', verified?: boolean | null, verifiedAt?: any | null } | null, phoneNumber?: { __typename?: 'VerificationResult', verified?: boolean | null, verifiedAt?: any | null } | null } };

export type UserMeFragment = { __typename?: 'User', id: any, username: string, heroId: string, guardianType?: GuardianType | null, imageUrl?: string | null, email?: string | null, ranking?: any | null, isEmailVerified: boolean, hasSocialAccount: boolean, complianceDetails: (
    { __typename?: 'UserComplianceDetails' }
    & UserComplianceDetailsFragment
  ), externalAccounts: Array<(
    { __typename?: 'ExternalAccount' }
    & ExternalAccountFragment
  )>, ownerOf: Array<{ __typename?: 'OwnerOf', project?: (
      { __typename?: 'Project' }
      & ProjectForOwnerFragment
    ) | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: (
    { __typename?: 'User' }
    & UserMeFragment
  ) | null };

export type MeProjectFollowsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeProjectFollowsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: any, projectFollows: Array<{ __typename?: 'Project', id: any, title: string, status?: ProjectStatus | null, thumbnailImage?: string | null, name: string }> } | null };

export type ProjectForLandingPageFragment = { __typename?: 'Project', id: any, name: string, balance: number, balanceUsdCent: number, fundersCount?: number | null, thumbnailImage?: string | null, shortDescription?: string | null, title: string, status?: ProjectStatus | null, owners: Array<{ __typename?: 'Owner', id: any, user: { __typename?: 'User', id: any, taxProfile?: { __typename?: 'UserTaxProfile', legalEntityType: LegalEntityType, verified?: boolean | null, country?: string | null } | null } }> };

export type ProjectForLaunchpadPageFragment = { __typename?: 'Project', id: any, name: string, thumbnailImage?: string | null, shortDescription?: string | null, title: string, status?: ProjectStatus | null, preLaunchedAt?: any | null, preLaunchExpiresAt?: any | null, balanceUsdCent: number, category?: ProjectCategory | null, subCategory?: ProjectSubCategory | null, owners: Array<{ __typename?: 'Owner', id: any, user: { __typename?: 'User', id: any, taxProfile?: { __typename?: 'UserTaxProfile', legalEntityType: LegalEntityType, verified?: boolean | null, country?: string | null } | null } }> };

export type ProjectForMyProjectsFragment = { __typename?: 'Project', id: any, name: string, balance: number, fundersCount?: number | null, thumbnailImage?: string | null, title: string, shortDescription?: string | null, createdAt: string, status?: ProjectStatus | null, rewardsCount?: number | null, followersCount?: number | null, balanceUsdCent: number, wallets: Array<{ __typename?: 'Wallet', id: any, name?: string | null, state: { __typename?: 'WalletState', status: WalletStatus, statusCode: WalletStatusCode } }> };

export type RewardForLandingPageFragment = { __typename?: 'ProjectReward', id: any, uuid: string, images: Array<string>, cost: number, name: string, shortDescription?: string | null, project: { __typename?: 'Project', rewardCurrency?: RewardCurrency | null, id: any, name: string, title: string, thumbnailImage?: string | null } };

export type RewardForProductsPageFragment = { __typename?: 'ProjectReward', id: any, uuid: string, images: Array<string>, cost: number, name: string, shortDescription?: string | null, project: { __typename?: 'Project', rewardCurrency?: RewardCurrency | null, id: any, name: string, title: string, thumbnailImage?: string | null, category?: ProjectCategory | null, subCategory?: ProjectSubCategory | null } };

export type ActivitiesGetQueryVariables = Exact<{
  input?: InputMaybe<GetActivitiesInput>;
}>;


export type ActivitiesGetQuery = { __typename?: 'Query', activitiesGet: { __typename?: 'ActivitiesGetResponse', activities: Array<{ __typename?: 'Activity', id: string, createdAt: any, activityType: string }> } };

export type ProjectsSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsSummaryQuery = { __typename?: 'Query', projectsSummary: { __typename?: 'ProjectsSummary', fundedTotal?: any | null, fundersCount?: number | null, projectsCount?: number | null } };

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

export type ProjectsMostFundedByCategoryQueryVariables = Exact<{
  input: ProjectsMostFundedByCategoryInput;
}>;


export type ProjectsMostFundedByCategoryQuery = { __typename?: 'Query', projectsMostFundedByCategory: Array<{ __typename?: 'ProjectMostFundedByCategory', category?: string | null, subCategory?: string | null, projects: Array<{ __typename?: 'ProjectMostFunded', project: (
        { __typename?: 'Project' }
        & ProjectForLandingPageFragment
      ), contributionsSummary?: { __typename?: 'ContributionsSummary', contributionsTotalUsd: number, contributionsTotal: number } | null }> }> };

export type ProjectsForLandingPageQueryVariables = Exact<{
  input?: InputMaybe<ProjectsGetQueryInput>;
}>;


export type ProjectsForLandingPageQuery = { __typename?: 'Query', projectsGet: { __typename?: 'ProjectsResponse', projects: Array<(
      { __typename?: 'Project' }
      & ProjectForLandingPageFragment
    )> } };

export type ProjectsForLaunchpadPageQueryVariables = Exact<{
  input?: InputMaybe<ProjectsGetQueryInput>;
}>;


export type ProjectsForLaunchpadPageQuery = { __typename?: 'Query', projectsGet: { __typename?: 'ProjectsResponse', projects: Array<(
      { __typename?: 'Project' }
      & ProjectForLaunchpadPageFragment
    )> } };

export type ProjectsForMyProjectsQueryVariables = Exact<{
  where: UserGetInput;
}>;


export type ProjectsForMyProjectsQuery = { __typename?: 'Query', user: { __typename?: 'User', ownerOf: Array<{ __typename?: 'OwnerOf', project?: (
        { __typename?: 'Project' }
        & ProjectForMyProjectsFragment
      ) | null }> } };

export type ProjectRewardsTrendingWeeklyGetQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectRewardsTrendingWeeklyGetQuery = { __typename?: 'Query', projectRewardsTrendingWeeklyGet: Array<{ __typename?: 'ProjectRewardTrendingWeeklyGetRow', count: number, projectReward: (
      { __typename?: 'ProjectReward' }
      & RewardForLandingPageFragment
    ) }> };

export type ProjectRewardsTrendingQuarterlyGetQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectRewardsTrendingQuarterlyGetQuery = { __typename?: 'Query', projectRewardsTrendingQuarterlyGet: Array<{ __typename?: 'ProjectRewardTrendingQuarterlyGetRow', count: number, projectReward: (
      { __typename?: 'ProjectReward' }
      & RewardForProductsPageFragment
    ) }> };

export type TagsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsGetQuery = { __typename?: 'Query', tagsGet: Array<{ __typename?: 'TagsGetResult', label: string, id: number, count: number }> };

export type ProjectCountriesGetQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectCountriesGetQuery = { __typename?: 'Query', projectCountriesGet: Array<{ __typename?: 'ProjectCountriesGetResult', count: number, country: { __typename?: 'Country', code: string, name: string } }> };

export type ProjectRegionsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectRegionsGetQuery = { __typename?: 'Query', projectRegionsGet: Array<{ __typename?: 'ProjectRegionsGetResult', count: number, region: string }> };

export type TagsMostFundedGetQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsMostFundedGetQuery = { __typename?: 'Query', tagsMostFundedGet: Array<{ __typename?: 'TagsMostFundedGetResult', id: number, label: string }> };

export type ActivityFeedFragmentFragment = { __typename?: 'Activity', activityType: string, createdAt: any, id: string, project: { __typename?: 'Project', id: any, title: string, name: string, thumbnailImage?: string | null }, resource: { __typename?: 'Contribution', id: any, amount: number, projectId: any, isAnonymous: boolean, comment?: string | null, funder: { __typename?: 'Funder', user?: { __typename?: 'User', id: any, username: string, imageUrl?: string | null, guardianType?: GuardianType | null } | null } } | { __typename?: 'Entry', id: any, title: string, content?: string | null, entryDescription: string, entryImage?: string | null } | { __typename?: 'Post', id: any, title: string, markdown?: string | null, entryDescription: string, entryImage?: string | null } | { __typename?: 'Project', id: any, title: string, name: string, thumbnailImage?: string | null } | { __typename?: 'ProjectGoal', id: any, currency: ProjectGoalCurrency, title: string, targetAmount: number, status: ProjectGoalStatus, goalDescription?: string | null } | { __typename?: 'ProjectReward', id: any, uuid: string, category?: string | null, cost: number, rewardCurrency: RewardCurrency, sold: number, stock?: number | null, projectRewardDescription?: string | null, projectRewardImage: Array<string> } };

export type ActivityFeedQueryVariables = Exact<{
  input: GetActivitiesInput;
}>;


export type ActivityFeedQuery = { __typename?: 'Query', activitiesGet: { __typename?: 'ActivitiesGetResponse', activities: Array<(
      { __typename?: 'Activity' }
      & ActivityFeedFragmentFragment
    )>, pagination?: { __typename?: 'CursorPaginationResponse', take?: number | null, count?: number | null, cursor?: { __typename?: 'PaginationCursor', id?: any | null } | null } | null } };

export type SummaryBannerFragmentFragment = { __typename?: 'ProjectsSummary', fundedTotal?: any | null, fundersCount?: number | null, projectsCount?: number | null };

export type TopAmbassadorsFragmentFragment = { __typename?: 'GlobalAmbassadorLeaderboardRow', contributionsTotal: number, contributionsTotalUsd: number, projectsCount: number, userId: any, userHeroId?: string | null, userGuardianType?: GuardianType | null, userImageUrl?: string | null, username: string };

export type TopContributorsFragmentFragment = { __typename?: 'GlobalContributorLeaderboardRow', contributionsCount: number, contributionsTotal: number, contributionsTotalUsd: number, projectsContributedCount: number, userId: any, userHeroId?: string | null, userGuardianType?: GuardianType | null, username: string, userImageUrl?: string | null };

export type TopCreatorsFragmentFragment = { __typename?: 'GlobalCreatorLeaderboardRow', contributionsTotal: number, contributionsTotalUsd: number, projectsCount: number, userId: any, userHeroId?: string | null, userGuardianType?: GuardianType | null, userImageUrl?: string | null, username: string };

export type TopProjectsFragmentFragment = { __typename?: 'GlobalProjectLeaderboardRow', projectName: string, projectTitle: string, projectThumbnailUrl?: string | null, contributionsTotal: number, contributionsTotalUsd: number, contributionsCount: number, contributorsCount: number };

export type LeaderboardGlobalAmbassadorsGetQueryVariables = Exact<{
  input: LeaderboardGlobalAmbassadorsGetInput;
}>;


export type LeaderboardGlobalAmbassadorsGetQuery = { __typename?: 'Query', leaderboardGlobalAmbassadorsGet: Array<(
    { __typename?: 'GlobalAmbassadorLeaderboardRow' }
    & TopAmbassadorsFragmentFragment
  )> };

export type LeaderboardGlobalContributorsQueryVariables = Exact<{
  input: LeaderboardGlobalContributorsGetInput;
}>;


export type LeaderboardGlobalContributorsQuery = { __typename?: 'Query', leaderboardGlobalContributorsGet: Array<(
    { __typename?: 'GlobalContributorLeaderboardRow' }
    & TopContributorsFragmentFragment
  )> };

export type LeaderboardGlobalCreatorsGetQueryVariables = Exact<{
  input: LeaderboardGlobalCreatorsGetInput;
}>;


export type LeaderboardGlobalCreatorsGetQuery = { __typename?: 'Query', leaderboardGlobalCreatorsGet: Array<(
    { __typename?: 'GlobalCreatorLeaderboardRow' }
    & TopCreatorsFragmentFragment
  )> };

export type LeaderboardGlobalProjectsQueryVariables = Exact<{
  input: LeaderboardGlobalProjectsGetInput;
}>;


export type LeaderboardGlobalProjectsQuery = { __typename?: 'Query', leaderboardGlobalProjectsGet: Array<(
    { __typename?: 'GlobalProjectLeaderboardRow' }
    & TopProjectsFragmentFragment
  )> };

export type FollowedProjectsActivitiesCountFragmentFragment = { __typename?: 'ProjectActivitiesCount', count: number, project: { __typename?: 'Project', id: any, name: string, thumbnailImage?: string | null, title: string } };

export type OrdersStatsFragmentFragment = { __typename?: 'OrdersStatsBase', projectRewards: { __typename?: 'ProjectRewardsStats', count: number }, projectRewardsGroupedByProjectRewardId: Array<{ __typename?: 'ProjectRewardsGroupedByRewardIdStats', count: number, projectReward: { __typename?: 'ProjectRewardsGroupedByRewardIdStatsProjectReward', id: any, uuid: string, name: string, image?: string | null, sold: number, maxClaimable?: number | null } }> };

export type ProjectContributionsStatsFragment = { __typename?: 'ProjectContributionsStatsBase', contributions: { __typename?: 'ProjectContributionsStats', total: number, totalUsd: number } };

export type ProjectStatsFragment = { __typename?: 'ProjectStats', current?: { __typename?: 'ProjectStatsBase', projectContributionsStats?: (
      { __typename?: 'ProjectContributionsStatsBase' }
      & ProjectContributionsStatsFragment
    ) | null } | null };

export type ActivitiesCountGroupedByProjectQueryVariables = Exact<{
  input: ActivitiesCountGroupedByProjectInput;
}>;


export type ActivitiesCountGroupedByProjectQuery = { __typename?: 'Query', activitiesCountGroupedByProject: Array<(
    { __typename?: 'ProjectActivitiesCount' }
    & FollowedProjectsActivitiesCountFragmentFragment
  )> };

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

export type GrantProjectQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type GrantProjectQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', subscribersCount?: number | null } | null };

export type GrantStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GrantStatisticsQuery = { __typename?: 'Query', grantStatistics: { __typename?: 'GrantStatistics', grants?: { __typename?: 'GrantStatisticsGrant', amountFunded: number, amountGranted: number, count: number } | null, applicants?: { __typename?: 'GrantStatisticsApplicant', countFunded: number } | null, grantGuardiansFunding: { __typename?: 'GrantGuardiansFunding', contributedTotal: any, contributorsCount: any } } };

export type GuardianProjectRewardFragment = { __typename?: 'ProjectReward', id: any, uuid: string, name: string, cost: number, images: Array<string>, description?: string | null, shortDescription?: string | null, maxClaimable?: number | null, sold: number, rewardCurrency: RewardCurrency, isHidden: boolean };

export type GuardianUserFragment = { __typename?: 'GuardianUser', guardianType: string, heroId: string, imageUrl?: string | null, userId: any, username: string };

export type GuardianResultFragment = { __typename?: 'GuardianResult', guardianType: GuardianType, soldCount: number, users: Array<(
    { __typename?: 'GuardianUser' }
    & GuardianUserFragment
  )> };

export type GuardianProjectRewardsGetQueryVariables = Exact<{
  input: GetProjectRewardsInput;
}>;


export type GuardianProjectRewardsGetQuery = { __typename?: 'Query', projectRewardsGet: Array<(
    { __typename?: 'ProjectReward' }
    & GuardianProjectRewardFragment
  )> };

export type GuardianUsersGetQueryVariables = Exact<{
  input: GuardianUsersGetInput;
}>;


export type GuardianUsersGetQuery = { __typename?: 'Query', guardianUsersGet?: { __typename?: 'GuardianUsersGetResponse', guardianUsers: Array<(
      { __typename?: 'GuardianResult' }
      & GuardianResultFragment
    )> } | null };

export type BitcoinQuoteFragment = { __typename?: 'BitcoinQuote', quote: number, quoteCurrency: QuoteCurrency };

export type UserProjectFunderFragment = { __typename?: 'Funder', amountFunded?: number | null, confirmedAt?: any | null, confirmed: boolean, id: any, contributions: Array<{ __typename?: 'Contribution', id: any, amount: number, comment?: string | null, media?: string | null, confirmedAt?: any | null, bitcoinQuote?: (
      { __typename?: 'BitcoinQuote' }
      & BitcoinQuoteFragment
    ) | null }> };

export type UserProjectContributionFragment = { __typename?: 'Contribution', id: any, amount: number, comment?: string | null, media?: string | null, confirmedAt?: any | null, projectId: any, bitcoinQuote?: (
    { __typename?: 'BitcoinQuote' }
    & BitcoinQuoteFragment
  ) | null };

export type ProfileOrderItemFragment = { __typename?: 'OrderItem', quantity: number, unitPriceInSats: number, item: { __typename?: 'ProjectReward', id: any, name: string, cost: number, rewardCurrency: RewardCurrency, description?: string | null, images: Array<string>, category?: string | null } };

export type ProfileOrderFragment = { __typename?: 'Order', id: any, referenceCode: string, totalInSats: number, status: string, confirmedAt?: any | null, updatedAt: any, items: Array<(
    { __typename?: 'OrderItem' }
    & ProfileOrderItemFragment
  )>, contribution: { __typename?: 'Contribution', id: any, amount: number, status: ContributionStatus, bitcoinQuote?: { __typename?: 'BitcoinQuote', quote: number, quoteCurrency: QuoteCurrency } | null, sourceResource?: { __typename?: 'Activity' } | { __typename?: 'Entry' } | (
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

export type ProjectForProfilePageFragment = { __typename?: 'Project', id: any, name: string, balance: number, fundersCount?: number | null, thumbnailImage?: string | null, title: string, shortDescription?: string | null, createdAt: string, status?: ProjectStatus | null, rejectionReason?: string | null, rewardsCount?: number | null, wallets: Array<{ __typename?: 'Wallet', id: any, name?: string | null, state: { __typename?: 'WalletState', status: WalletStatus, statusCode: WalletStatusCode } }> };

export type ProjectForProfileContributionsFragment = { __typename?: 'Project', id: any, name: string, title: string, thumbnailImage?: string | null };

export type ProjectNotificationSettingsFragment = { __typename?: 'CreatorNotificationSettings', userId: any, project: { __typename?: 'CreatorNotificationSettingsProject', id: any, title: string, image?: string | null }, notificationSettings: Array<{ __typename?: 'NotificationSettings', notificationType: string, isEnabled: boolean, configurations: Array<{ __typename?: 'NotificationConfiguration', id: any, name: string, description?: string | null, value: string, type?: SettingValueType | null, options: Array<string> }> }> };

export type BadgeFragment = { __typename?: 'Badge', id: string, name: string, thumb: string, uniqueName: string, image: string, description: string, createdAt: any };

export type UserBadgeFragment = { __typename?: 'UserBadge', id: any, userId: any, updatedAt: any, status?: UserBadgeStatus | null, contributionId?: any | null, createdAt: any, badgeAwardEventId?: string | null, badge: (
    { __typename?: 'Badge' }
    & BadgeFragment
  ) };

export type UserForProfilePageFragment = { __typename?: 'User', id: any, bio?: string | null, heroId: string, username: string, imageUrl?: string | null, ranking?: any | null, guardianType?: GuardianType | null, isEmailVerified: boolean, externalAccounts: Array<(
    { __typename?: 'ExternalAccount' }
    & ExternalAccountFragment
  )>, complianceDetails: { __typename?: 'UserComplianceDetails', verifiedDetails: { __typename?: 'UserVerifiedDetails', email?: { __typename?: 'VerificationResult', verified?: boolean | null, verifiedAt?: any | null } | null, identity?: { __typename?: 'VerificationResult', verified?: boolean | null, verifiedAt?: any | null } | null, phoneNumber?: { __typename?: 'VerificationResult', verified?: boolean | null, verifiedAt?: any | null } | null } } };

export type UserTaxProfileFragment = { __typename?: 'UserTaxProfile', id: any, userId: any, legalEntityType: LegalEntityType, fullName?: string | null, country?: string | null, state?: string | null, taxId?: string | null, verified?: boolean | null };

export type UserSubscriptionFragment = { __typename?: 'UserSubscription', canceledAt?: any | null, createdAt: any, id: any, nextBillingDate: any, startDate: any, status: UserSubscriptionStatus, updatedAt: any, projectSubscriptionPlan: { __typename?: 'ProjectSubscriptionPlan', id: any, projectId: any, name: string, cost: number, interval: UserSubscriptionInterval, currency: SubscriptionCurrencyType } };

export type UserWalletConnectionDetailsFragment = { __typename?: 'Wallet', id: any, connectionDetails: { __typename?: 'LightningAddressConnectionDetails', lightningAddress: string } | { __typename?: 'LndConnectionDetailsPrivate', tlsCertificate?: string | null, pubkey?: string | null, macaroon: string, lndNodeType: LndNodeType, hostname: string, grpcPort: number } | { __typename?: 'LndConnectionDetailsPublic', pubkey?: string | null } | { __typename?: 'NWCConnectionDetailsPrivate', nwcUrl?: string | null } };

export type CancelUserSubscriptionMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type CancelUserSubscriptionMutation = { __typename?: 'Mutation', userSubscriptionCancel: (
    { __typename?: 'UserSubscription' }
    & UserSubscriptionFragment
  ) };

export type CreatorNotificationsSettingsUpdateMutationVariables = Exact<{
  creatorNotificationConfigurationId: Scalars['BigInt']['input'];
  value: Scalars['String']['input'];
}>;


export type CreatorNotificationsSettingsUpdateMutation = { __typename?: 'Mutation', creatorNotificationConfigurationValueUpdate?: boolean | null };

export type UserTaxProfileUpdateMutationVariables = Exact<{
  input: UserTaxProfileUpdateInput;
}>;


export type UserTaxProfileUpdateMutation = { __typename?: 'Mutation', userTaxProfileUpdate: (
    { __typename?: 'UserTaxProfile' }
    & UserTaxProfileFragment
  ) };

export type UserNotificationsSettingsUpdateMutationVariables = Exact<{
  userNotificationConfigurationId: Scalars['BigInt']['input'];
  value: Scalars['String']['input'];
}>;


export type UserNotificationsSettingsUpdateMutation = { __typename?: 'Mutation', userNotificationConfigurationValueUpdate?: boolean | null };

export type BadgesQueryVariables = Exact<{ [key: string]: never; }>;


export type BadgesQuery = { __typename?: 'Query', badges: Array<(
    { __typename?: 'Badge' }
    & BadgeFragment
  )> };

export type UserBadgesQueryVariables = Exact<{
  input: BadgesGetInput;
}>;


export type UserBadgesQuery = { __typename?: 'Query', userBadges: Array<(
    { __typename?: 'UserBadge' }
    & UserBadgeFragment
  )> };

export type UserOrdersGetQueryVariables = Exact<{
  input: OrdersGetInput;
}>;


export type UserOrdersGetQuery = { __typename?: 'Query', ordersGet?: { __typename?: 'OrdersGetResponse', orders: Array<(
      { __typename?: 'Order' }
      & ProfileOrderFragment
    )>, pagination?: { __typename?: 'CursorPaginationResponse', count?: number | null, take?: number | null, cursor?: { __typename?: 'PaginationCursor', id?: any | null } | null } | null } | null };

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

export type ProjectForProfileContributionsQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectForProfileContributionsQuery = { __typename?: 'Query', projectGet?: (
    { __typename?: 'Project' }
    & ProjectForProfileContributionsFragment
  ) | null };

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
  input?: InputMaybe<UserContributionsInput>;
}>;


export type UserProfileContributionsQuery = { __typename?: 'Query', user: { __typename?: 'User', id: any, contributions: Array<(
      { __typename?: 'Contribution' }
      & UserProjectContributionFragment
    )> } };

export type UserHeroStatsQueryVariables = Exact<{
  where: UserGetInput;
}>;


export type UserHeroStatsQuery = { __typename?: 'Query', user: { __typename?: 'User', heroStats: { __typename?: 'UserHeroStats', ambassadorStats: { __typename?: 'AmbassadorStats', contributionsCount: number, contributionsTotalUsd: number, contributionsTotal: number, projectsCount: number, rank: number }, contributorStats: { __typename?: 'ContributorStats', contributionsCount: number, contributionsTotalUsd: number, contributionsTotal: number, projectsCount: number, rank: number }, creatorStats: { __typename?: 'CreatorStats', contributionsCount: number, contributionsTotalUsd: number, contributionsTotal: number, projectsCount: number, rank: number } } } };

export type UserWalletQueryVariables = Exact<{
  where: UserGetInput;
}>;


export type UserWalletQuery = { __typename?: 'Query', user: { __typename?: 'User', wallet?: (
      { __typename?: 'Wallet' }
      & UserWalletConnectionDetailsFragment
    ) | null } };

export type UserTaxProfileQueryVariables = Exact<{
  where: UserGetInput;
}>;


export type UserTaxProfileQuery = { __typename?: 'Query', user: { __typename?: 'User', taxProfile?: (
      { __typename?: 'UserTaxProfile' }
      & UserTaxProfileFragment
    ) | null } };

export type UserSubscriptionsQueryVariables = Exact<{
  input: UserSubscriptionsInput;
}>;


export type UserSubscriptionsQuery = { __typename?: 'Query', userSubscriptions: Array<(
    { __typename?: 'UserSubscription' }
    & UserSubscriptionFragment
  )> };

export type FundingContributionFragment = { __typename?: 'Contribution', id: any, uuid?: string | null, amount: number, status: ContributionStatus, comment?: string | null, media?: string | null, confirmedAt?: any | null, projectId: any, creatorEmail?: string | null, createdAt?: any | null, isAnonymous: boolean, isSubscription: boolean, bitcoinQuote?: { __typename?: 'BitcoinQuote', quote: number, quoteCurrency: QuoteCurrency } | null, payments: Array<(
    { __typename?: 'Payment' }
    & FundingContributionPaymentFragment
  )>, funder: (
    { __typename?: 'Funder' }
    & ProjectFunderFragment
  ) };

export type OrderContributionFragment = { __typename?: 'Contribution', id: any, status: ContributionStatus, donationAmount: number, amount: number, email?: string | null, uuid?: string | null, confirmedAt?: any | null, privateComment?: string | null, bitcoinQuote?: { __typename?: 'BitcoinQuote', quoteCurrency: QuoteCurrency, quote: number } | null, funder: { __typename?: 'Funder', user?: { __typename?: 'User', id: any, imageUrl?: string | null, username: string, externalAccounts: Array<{ __typename?: 'ExternalAccount', id: any, externalUsername: string, externalId: string, accountType: string, public: boolean }> } | null }, order?: { __typename?: 'Order', id: any, referenceCode: string, totalInSats: number, items: Array<(
      { __typename?: 'OrderItem' }
      & OrderItemFragment
    )> } | null };

export type ProjectContributionFragment = { __typename?: 'Contribution', id: any, amount: number, media?: string | null, comment?: string | null, confirmedAt?: any | null, projectGoalId?: any | null, bitcoinQuote?: { __typename?: 'BitcoinQuote', quote: number, quoteCurrency: QuoteCurrency } | null, funder: { __typename?: 'Funder', id: any, timesFunded?: number | null, user?: (
      { __typename?: 'User' }
      & UserAvatarFragment
    ) | null } };

export type FundingContributionSubscriptionFragment = { __typename?: 'Contribution', id: any, uuid?: string | null, status: ContributionStatus, projectGoalId?: any | null };

export type ContributionWithInvoiceStatusFragment = { __typename?: 'Contribution', id: any, uuid?: string | null, status: ContributionStatus, creatorEmail?: string | null, isAnonymous: boolean };

export type ContributionForDownloadInvoiceFragment = { __typename?: 'Contribution', id: any, donationAmount: number, amount: number, uuid?: string | null, creatorEmail?: string | null, projectId: any, confirmedAt?: any | null, createdAt?: any | null, status: ContributionStatus, funder: { __typename?: 'Funder', user?: { __typename?: 'User', username: string, email?: string | null, taxProfile?: { __typename?: 'UserTaxProfile', fullName?: string | null, taxId?: string | null } | null } | null }, order?: { __typename?: 'Order', totalInSats: number, items: Array<{ __typename?: 'OrderItem', quantity: number, unitPriceInSats: number, item: { __typename?: 'ProjectReward', name: string } }> } | null, creatorTaxProfile?: { __typename?: 'UserTaxProfile', fullName?: string | null, taxId?: string | null } | null, bitcoinQuote?: { __typename?: 'BitcoinQuote', quote: number, quoteCurrency: QuoteCurrency } | null, payments: Array<{ __typename?: 'Payment', status: PaymentStatus, uuid: string, fees: Array<{ __typename?: 'PaymentFee', description?: string | null, feeType?: PaymentFeeType | null, feeAmount: number, external?: boolean | null, feeCurrency: FeeCurrency }> }> };

export type ProjectEntryFragment = { __typename?: 'Entry', id: any, title: string, description: string, image?: string | null, type: EntryType, fundersCount: number, amountFunded: number, status: EntryStatus, createdAt: string, publishedAt?: string | null };

export type ProjectEntryViewFragment = { __typename?: 'Entry', id: any, title: string, description: string, image?: string | null, type: EntryType, fundersCount: number, amountFunded: number, status: EntryStatus, createdAt: string, publishedAt?: string | null, content?: string | null, markdown?: string | null };

export type ProjectFunderFragment = { __typename?: 'Funder', id: any, amountFunded?: number | null, timesFunded?: number | null, confirmedAt?: any | null, user?: (
    { __typename?: 'User' }
    & UserAvatarFragment
  ) | null };

export type ProjectLeaderboardContributorsFragment = { __typename?: 'ProjectLeaderboardContributorsRow', funderId: any, contributionsTotalUsd: number, contributionsTotal: number, contributionsCount: number, commentsCount: number, user?: (
    { __typename?: 'User' }
    & UserAvatarFragment
  ) | null };

export type ProjectLeaderboardAmbassadorsFragment = { __typename?: 'ProjectLeaderboardAmbassadorsRow', contributionsTotal: number, contributionsTotalUsd: number, projectsCount: number, user?: (
    { __typename?: 'User' }
    & UserAvatarFragment
  ) | null };

export type UserContributorFragment = { __typename?: 'Funder', id: any, rank?: number | null, user?: (
    { __typename?: 'User' }
    & UserAvatarFragment
  ) | null };

export type ContributorContributionsSummaryFragment = { __typename?: 'ContributorContributionsSummary', contributionsTotalUsd: number, contributionsTotal: number, contributionsCount: number, commentsCount: number };

export type ProjectGoalsFragment = { __typename?: 'ProjectGoal', id: any, title: string, description?: string | null, targetAmount: number, currency: ProjectGoalCurrency, status: ProjectGoalStatus, projectId: any, amountContributed: number, progress: number, createdAt: any, updatedAt: any, completedAt?: any | null, hasReceivedContribution: boolean, emojiUnifiedCode?: string | null };

export type ProjectGrantApplicantFragment = { __typename?: 'GrantApplicant', id: any, status: GrantApplicantStatus, grant: { __typename?: 'BoardVoteGrant' } | { __typename?: 'CommunityVoteGrant', id: any, votingSystem: VotingSystem, type: GrantType, name: string, title: string, status: GrantStatusEnum } };

export type OrderItemFragment = { __typename?: 'OrderItem', quantity: number, unitPriceInSats: number, item: { __typename?: 'ProjectReward', id: any, name: string, cost: number, rewardCurrency: RewardCurrency, category?: string | null } };

export type OrderFragment = { __typename?: 'Order', confirmedAt?: any | null, createdAt: any, deliveredAt?: any | null, id: any, shippedAt?: any | null, status: string, totalInSats: number, shippingFeeTotalInSats: number, itemsTotalInSats: number, updatedAt: any, user?: { __typename?: 'User', id: any, imageUrl?: string | null, username: string, email?: string | null } | null, items: Array<(
    { __typename?: 'OrderItem' }
    & OrderItemFragment
  )>, contribution: { __typename?: 'Contribution', id: any, amount: number, donationAmount: number, email?: string | null, isAnonymous: boolean, status: ContributionStatus, uuid?: string | null, privateComment?: string | null, bitcoinQuote?: { __typename?: 'BitcoinQuote', quoteCurrency: QuoteCurrency, quote: number } | null }, shippingAddress?: (
    { __typename?: 'ShippingAddress' }
    & ShippingAddressFragment
  ) | null };

export type ContributionLightningPaymentDetailsFragment = { __typename?: 'ContributionLightningPaymentDetails', lightningInvoiceId: string, paymentRequest: string };

export type ContributionOnChainSwapPaymentDetailsFragment = { __typename?: 'ContributionOnChainSwapPaymentDetails', address: string, swapJson: string };

export type ContributionFiatPaymentDetailsFragment = { __typename?: 'ContributionFiatPaymentDetails', stripeClientSecret: string };

export type ContributionFiatSwapPaymentDetailsFragment = { __typename?: 'ContributionFiatSwapPaymentDetails', checkoutUrl: string };

export type FundingContributionPaymentDetailsFragment = { __typename?: 'ContributionPaymentsDetails', lightning?: (
    { __typename?: 'ContributionLightningPaymentDetails' }
    & ContributionLightningPaymentDetailsFragment
  ) | null, onChainSwap?: (
    { __typename?: 'ContributionOnChainSwapPaymentDetails' }
    & ContributionOnChainSwapPaymentDetailsFragment
  ) | null, fiat?: (
    { __typename?: 'ContributionFiatPaymentDetails' }
    & ContributionFiatPaymentDetailsFragment
  ) | null, fiatSwap?: (
    { __typename?: 'ContributionFiatSwapPaymentDetails' }
    & ContributionFiatSwapPaymentDetailsFragment
  ) | null };

export type FundingContributionPaymentFragment = { __typename?: 'Payment', id: any, method?: string | null, paymentAmount: number, status: PaymentStatus, userSubscriptionId?: any | null };

export type PaymentSubscriptionFragment = { __typename?: 'Payment', id: any, status: PaymentStatus, paymentType: PaymentType, contributionUUID: string, failureReason?: string | null };

export type ProjectPaymentMethodsFragment = { __typename?: 'PaymentMethods', fiat: { __typename?: 'FiatPaymentMethods', stripe: boolean } };

export type ProjectSubscriptionPlansFragment = { __typename?: 'ProjectSubscriptionPlan', cost: number, currency: SubscriptionCurrencyType, description?: string | null, id: any, name: string, interval: UserSubscriptionInterval, projectId: any };

export type ProjectPostFragment = { __typename?: 'Post', id: any, title: string, description: string, image?: string | null, content?: string | null, postType?: PostType | null, fundersCount: number, amountFunded: number, status: PostStatus, createdAt: string, publishedAt?: string | null, sentByEmailAt?: any | null };

export type ProjectPostViewFragment = { __typename?: 'Post', id: any, title: string, description: string, image?: string | null, postType?: PostType | null, fundersCount: number, amountFunded: number, status: PostStatus, createdAt: string, publishedAt?: string | null, content?: string | null, markdown?: string | null, sentByEmailAt?: any | null, projectRewards: Array<(
    { __typename?: 'ProjectReward' }
    & PostPageProjectRewardFragment
  )>, projectGoals: { __typename?: 'ProjectGoals', inProgress: Array<(
      { __typename?: 'ProjectGoal' }
      & ProjectGoalsFragment
    )>, completed: Array<(
      { __typename?: 'ProjectGoal' }
      & ProjectGoalsFragment
    )> } };

export type ProjectFragment = { __typename?: 'Project', id: any, title: string, name: string, type: ProjectType, shortDescription?: string | null, description?: string | null, defaultGoalId?: any | null, balance: number, balanceUsdCent: number, createdAt: string, updatedAt: string, images: Array<string>, thumbnailImage?: string | null, links: Array<string>, status?: ProjectStatus | null, rewardCurrency?: RewardCurrency | null, fundersCount?: number | null, contributionsCount?: number | null };

export type ProjectNostrKeysFragment = { __typename?: 'Project', id: any, name: string, keys: { __typename?: 'ProjectKeys', nostrKeys: { __typename?: 'NostrKeys', privateKey?: { __typename?: 'NostrPrivateKey', nsec: string } | null, publicKey: { __typename?: 'NostrPublicKey', npub: string } } } };

export type ProjectAvatarFragment = { __typename?: 'Project', id: any, name: string, thumbnailImage?: string | null, title: string };

export type ProjectLocationFragment = { __typename?: 'Location', region?: string | null, country?: { __typename?: 'Country', code: string, name: string } | null };

export type ProjectKeysFragment = { __typename?: 'ProjectKeys', nostrKeys: { __typename?: 'NostrKeys', publicKey: { __typename?: 'NostrPublicKey', hex: string, npub: string } } };

export type ProjectPageBodyFragment = { __typename?: 'Project', id: any, name: string, title: string, type: ProjectType, thumbnailImage?: string | null, images: Array<string>, shortDescription?: string | null, description?: string | null, balance: number, balanceUsdCent: number, defaultGoalId?: any | null, status?: ProjectStatus | null, rewardCurrency?: RewardCurrency | null, createdAt: string, launchedAt?: any | null, preLaunchedAt?: any | null, preLaunchExpiresAt?: any | null, paidLaunch?: boolean | null, goalsCount?: number | null, rewardsCount?: number | null, entriesCount?: number | null, promotionsEnabled?: boolean | null, followersCount?: number | null, rejectionReason?: string | null, keys: (
    { __typename?: 'ProjectKeys' }
    & ProjectKeysFragment
  ), owners: Array<{ __typename?: 'Owner', id: any, user: (
      { __typename?: 'User' }
      & ProjectPageCreatorFragment
    ) }>, paymentMethods: (
    { __typename?: 'PaymentMethods' }
    & ProjectPaymentMethodsFragment
  ) };

export type ProjectPageDetailsFragment = { __typename?: 'Project', id: any, name: string, category?: ProjectCategory | null, subCategory?: ProjectSubCategory | null, links: Array<string>, location?: (
    { __typename?: 'Location' }
    & ProjectLocationFragment
  ) | null, tags: Array<{ __typename?: 'Tag', id: number, label: string }> };

export type ProjectHeaderSummaryFragment = { __typename?: 'Project', followersCount?: number | null, fundersCount?: number | null, contributionsCount?: number | null };

export type ProjectUpdateFragment = { __typename?: 'Project', id: any, title: string, name: string, shortDescription?: string | null, description?: string | null, images: Array<string>, thumbnailImage?: string | null, promotionsEnabled?: boolean | null, status?: ProjectStatus | null, links: Array<string>, category?: ProjectCategory | null, subCategory?: ProjectSubCategory | null, rewardCurrency?: RewardCurrency | null, location?: { __typename?: 'Location', region?: string | null, country?: { __typename?: 'Country', name: string, code: string } | null } | null };

export type ProjectStatsForInsightsPageFragment = { __typename?: 'ProjectStats', current?: { __typename?: 'ProjectStatsBase', projectViews?: { __typename?: 'ProjectViewStats', viewCount: number, visitorCount: number, referrers: Array<{ __typename?: 'ProjectViewBaseStats', value: string, viewCount: number, visitorCount: number }>, regions: Array<{ __typename?: 'ProjectViewBaseStats', value: string, viewCount: number, visitorCount: number }> } | null, projectFunderRewards?: { __typename?: 'ProjectFunderRewardStats', quantitySum: number } | null, projectFunders?: { __typename?: 'ProjectFunderStats', count: number } | null, projectContributionsStats?: { __typename?: 'ProjectContributionsStatsBase', contributions: { __typename?: 'ProjectContributionsStats', count: number, total: number, totalUsd: number } } | null } | null, prevTimeRange?: { __typename?: 'ProjectStatsBase', projectViews?: { __typename?: 'ProjectViewStats', viewCount: number, visitorCount: number } | null, projectFunderRewards?: { __typename?: 'ProjectFunderRewardStats', quantitySum: number } | null, projectFunders?: { __typename?: 'ProjectFunderStats', count: number } | null, projectContributionsStats?: { __typename?: 'ProjectContributionsStatsBase', contributions: { __typename?: 'ProjectContributionsStats', count: number, total: number, totalUsd: number } } | null } | null };

export type ProjectHistoryStatsFragment = { __typename?: 'ProjectStats', current?: { __typename?: 'ProjectStatsBase', projectContributionsStats?: { __typename?: 'ProjectContributionsStatsBase', contributions: { __typename?: 'ProjectContributionsStats', graph: Array<{ __typename?: 'ProjectContributionsStatsGraphData', statType: ProjectContributionsStatsGraphDataStatType, graphData?: Array<{ __typename?: 'ProjectContributionsStatsGraphDataAmount', value: number, dateTime: any }> | null }> } } | null, projectViews?: { __typename?: 'ProjectViewStats', visitorGraph: Array<{ __typename?: 'PageViewCountGraph', viewCount: number, visitorCount: number, dateTime: any } | null> } | null } | null };

export type ProjectRewardSoldGraphStatsFragment = { __typename?: 'ProjectStats', current?: { __typename?: 'ProjectStatsBase', projectFunderRewards?: { __typename?: 'ProjectFunderRewardStats', quantityGraph?: Array<{ __typename?: 'FunderRewardGraphSum', dateTime: any, rewardId: any, rewardName: string, sum: number } | null> | null } | null } | null };

export type ProjectFundingMethodStatsFragment = { __typename?: 'ProjectStats', current?: { __typename?: 'ProjectStatsBase', projectContributionsStats?: { __typename?: 'ProjectContributionsStatsBase', contributionsGroupedByMethod: Array<{ __typename?: 'ProjectContributionsGroupedByMethodStats', count: number, method: string, total: number, totalUsd: number }> } | null } | null };

export type ProjectRewardFragment = { __typename?: 'ProjectReward', id: any, uuid: string, name: string, description?: string | null, shortDescription?: string | null, cost: number, images: Array<string>, deleted: boolean, stock?: number | null, sold: number, hasShipping: boolean, maxClaimable?: number | null, rewardCurrency: RewardCurrency, isAddon: boolean, isHidden: boolean, category?: string | null, preOrder: boolean, estimatedAvailabilityDate?: any | null, estimatedDeliveryInWeeks?: number | null, confirmationMessage?: string | null, privateCommentPrompts: Array<PrivateCommentPrompt>, createdAt: any, shippingConfig?: (
    { __typename?: 'ShippingConfig' }
    & ShippingConfigFragment
  ) | null, posts: Array<{ __typename?: 'Post', id: any, title: string, postType?: PostType | null, description: string, createdAt: string }> };

export type PostPageProjectRewardFragment = { __typename?: 'ProjectReward', id: any, uuid: string, name: string, images: Array<string>, shortDescription?: string | null, cost: number };

export type ShippingRateFragment = { __typename?: 'ProjectShippingRate', baseRate: number, country: string, incrementRate: number, sameAsDefault?: boolean | null };

export type ShippingConfigFragment = { __typename?: 'ShippingConfig', id?: any | null, globalShipping: boolean, name: string, type: ProjectShippingConfigType, shippingRates?: Array<(
    { __typename?: 'ProjectShippingRate' }
    & ShippingRateFragment
  )> | null };

export type ShippingAddressFragment = { __typename?: 'ShippingAddress', id: string, postalCode: string, state?: string | null, fullName: string, country: string, city: string, addressLines: Array<string> };

export type ProjectPageCreatorFragment = { __typename?: 'User', id: any, imageUrl?: string | null, username: string, email?: string | null, guardianType?: GuardianType | null, externalAccounts: Array<{ __typename?: 'ExternalAccount', accountType: string, externalUsername: string, externalId: string, id: any, public: boolean }>, taxProfile?: { __typename?: 'UserTaxProfile', id: any, country?: string | null, legalEntityType: LegalEntityType, verified?: boolean | null } | null, complianceDetails: { __typename?: 'UserComplianceDetails', verifiedDetails: { __typename?: 'UserVerifiedDetails', email?: { __typename?: 'VerificationResult', verified?: boolean | null, verifiedAt?: any | null } | null, identity?: { __typename?: 'VerificationResult', verified?: boolean | null, verifiedAt?: any | null } | null, phoneNumber?: { __typename?: 'VerificationResult', verified?: boolean | null, verifiedAt?: any | null } | null } } };

export type UserAvatarFragment = { __typename?: 'User', id: any, imageUrl?: string | null, username: string, heroId: string, guardianType?: GuardianType | null };

export type ProjectOwnerUserForInvoiceFragment = { __typename?: 'User', id: any, username: string, complianceDetails: { __typename?: 'UserComplianceDetails', verifiedDetails: { __typename?: 'UserVerifiedDetails', identity?: { __typename?: 'VerificationResult', verifiedAt?: any | null, verified?: boolean | null } | null } } };

export type WalletContributionLimitsFragment = { __typename?: 'WalletContributionLimits', min?: number | null, max?: number | null, offChain?: { __typename?: 'WalletOffChainContributionLimits', min?: number | null, max?: number | null } | null, onChain?: { __typename?: 'WalletOnChainContributionLimits', min?: number | null, max?: number | null } | null };

export type ProjectPageWalletFragment = { __typename?: 'Wallet', id: any, name?: string | null, feePercentage?: number | null, limits?: { __typename?: 'WalletLimits', contribution?: (
      { __typename?: 'WalletContributionLimits' }
      & WalletContributionLimitsFragment
    ) | null } | null, state: { __typename?: 'WalletState', status: WalletStatus, statusCode: WalletStatusCode } };

export type ProjectWalletConnectionDetailsFragment = { __typename?: 'Wallet', id: any, connectionDetails: { __typename?: 'LightningAddressConnectionDetails', lightningAddress: string } | { __typename?: 'LndConnectionDetailsPrivate', tlsCertificate?: string | null, pubkey?: string | null, macaroon: string, lndNodeType: LndNodeType, hostname: string, grpcPort: number } | { __typename?: 'LndConnectionDetailsPublic', pubkey?: string | null } | { __typename?: 'NWCConnectionDetailsPrivate', nwcUrl?: string | null } };

export type ProjectPageWalletCreationDetailsFragment = (
  { __typename?: 'Wallet' }
  & ProjectPageWalletFragment
  & ProjectWalletConnectionDetailsFragment
);

export type AmbassadorAddMutationVariables = Exact<{
  input: AmbassadorAddInput;
}>;


export type AmbassadorAddMutation = { __typename?: 'Mutation', ambassadorAdd?: { __typename?: 'Ambassador', id: any, payoutRate: number, user: { __typename?: 'User', id: any, username: string } } | null };

export type AmbassadorUpdateMutationVariables = Exact<{
  input: AmbassadorUpdateInput;
}>;


export type AmbassadorUpdateMutation = { __typename?: 'Mutation', ambassadorUpdate?: { __typename?: 'Ambassador', id: any, payoutRate: number } | null };

export type ContributionCreateMutationVariables = Exact<{
  input: ContributionCreateInput;
}>;


export type ContributionCreateMutation = { __typename?: 'Mutation', contributionCreate: { __typename?: 'ContributionMutationResponse', contribution: (
      { __typename?: 'Contribution' }
      & FundingContributionFragment
    ), payments: (
      { __typename?: 'ContributionPaymentsDetails' }
      & FundingContributionPaymentDetailsFragment
    ) } };

export type ContributionEmailUpdateMutationVariables = Exact<{
  input?: InputMaybe<ContributionEmailUpdateInput>;
}>;


export type ContributionEmailUpdateMutation = { __typename?: 'Mutation', contributionEmailUpdate: { __typename?: 'Contribution', id: any, email?: string | null } };

export type FundingFiatSwapPaymentCreateMutationVariables = Exact<{
  input: ContributionPaymentsAddInput;
}>;


export type FundingFiatSwapPaymentCreateMutation = { __typename?: 'Mutation', contributionPaymentsAdd: { __typename?: 'ContributionPaymentsAddResponse', payments: { __typename?: 'ContributionPaymentsDetails', fiatSwap?: { __typename?: 'ContributionFiatSwapPaymentDetails', checkoutUrl: string } | null } } };

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

export type PostRepostOnNostrMutationVariables = Exact<{
  input: PostRepostOnNostrInput;
}>;


export type PostRepostOnNostrMutation = { __typename?: 'Mutation', postRepostOnNostr: { __typename?: 'PostRepostOnNostrResponse', success: boolean } };

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

export type PostDeleteMutationVariables = Exact<{
  postDeleteId: Scalars['BigInt']['input'];
}>;


export type PostDeleteMutation = { __typename?: 'Mutation', postDelete: { __typename?: 'Post', id: any, title: string } };

export type PostCreateMutationVariables = Exact<{
  input: PostCreateInput;
}>;


export type PostCreateMutation = { __typename?: 'Mutation', postCreate: (
    { __typename?: 'Post' }
    & ProjectPostViewFragment
  ) };

export type PostUpdateMutationVariables = Exact<{
  input: PostUpdateInput;
}>;


export type PostUpdateMutation = { __typename?: 'Mutation', postUpdate: (
    { __typename?: 'Post' }
    & ProjectPostViewFragment
  ) };

export type PostPublishMutationVariables = Exact<{
  input: PostPublishInput;
}>;


export type PostPublishMutation = { __typename?: 'Mutation', postPublish: (
    { __typename?: 'Post' }
    & ProjectPostViewFragment
  ) };

export type PostSendByEmailMutationVariables = Exact<{
  input: PostSendByEmailInput;
}>;


export type PostSendByEmailMutation = { __typename?: 'Mutation', postSendByEmail: { __typename?: 'PostSendByEmailResponse', recipientCount?: number | null } };

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

export type ProjectPreLaunchMutationVariables = Exact<{
  input: ProjectPreLaunchMutationInput;
}>;


export type ProjectPreLaunchMutation = { __typename?: 'Mutation', projectPreLaunch: { __typename?: 'Project', id: any, name: string, status?: ProjectStatus | null } };

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

export type PublishNostrEventMutationVariables = Exact<{
  event: Scalars['String']['input'];
}>;


export type PublishNostrEventMutation = { __typename?: 'Mutation', publishNostrEvent?: boolean | null };

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

export type ProjectShippingConfigCreateMutationVariables = Exact<{
  input: CreateProjectShippingConfigInput;
}>;


export type ProjectShippingConfigCreateMutation = { __typename?: 'Mutation', projectShippingConfigCreate: (
    { __typename?: 'ShippingConfig' }
    & ShippingConfigFragment
  ) };

export type ProjectShippingConfigUpdateMutationVariables = Exact<{
  input: UpdateProjectShippingConfigInput;
}>;


export type ProjectShippingConfigUpdateMutation = { __typename?: 'Mutation', projectShippingConfigUpdate: (
    { __typename?: 'ShippingConfig' }
    & ShippingConfigFragment
  ) };

export type ShippingAddressCreateMutationVariables = Exact<{
  input: ShippingAddressCreateInput;
}>;


export type ShippingAddressCreateMutation = { __typename?: 'Mutation', shippingAddressCreate: (
    { __typename?: 'ShippingAddress' }
    & ShippingAddressFragment
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

export type UserVerificationTokenGenerateMutationVariables = Exact<{
  input: UserVerificationTokenGenerateInput;
}>;


export type UserVerificationTokenGenerateMutation = { __typename?: 'Mutation', userVerificationTokenGenerate: { __typename?: 'UserVerificationTokenGenerateResponse', token: string, verificationLevel: UserVerificationLevel } };

export type CreateWalletMutationVariables = Exact<{
  input: CreateWalletInput;
}>;


export type CreateWalletMutation = { __typename?: 'Mutation', walletCreate: (
    { __typename?: 'Wallet' }
    & ProjectPageWalletCreationDetailsFragment
  ) };

export type UpdateWalletMutationVariables = Exact<{
  input: UpdateWalletInput;
}>;


export type UpdateWalletMutation = { __typename?: 'Mutation', walletUpdate: (
    { __typename?: 'Wallet' }
    & ProjectWalletConnectionDetailsFragment
  ) };

export type GeyserPromotionsContributionStatsQueryVariables = Exact<{
  input: GeyserPromotionsContributionStatsInput;
}>;


export type GeyserPromotionsContributionStatsQuery = { __typename?: 'Query', geyserPromotionsContributionStats: { __typename?: 'GeyserPromotionsContributionStats', contributionsCount: number, contributionsSum: any, contributionsSumUsd: number } };

export type ProjectAmbassadorStatsQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectAmbassadorStatsQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', ambassadors: { __typename?: 'ProjectAmbassadorsConnection', stats: { __typename?: 'ProjectAmbassadorsStats', contributionsCount: number, contributionsSum: any, count: number } } } | null };

export type ProjectAmbassadorListQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectAmbassadorListQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', ambassadors: { __typename?: 'ProjectAmbassadorsConnection', edges: Array<{ __typename?: 'ProjectAmbassadorEdge', node: { __typename?: 'Ambassador', id: any, payoutRate: number, contributionsCount: number, user: { __typename?: 'User', imageUrl?: string | null, username: string, heroId: string, id: any } } }> } } | null };

export type OrderContributionsGetQueryVariables = Exact<{
  input?: InputMaybe<GetContributionsInput>;
}>;


export type OrderContributionsGetQuery = { __typename?: 'Query', contributionsGet?: { __typename?: 'ContributionsGetResponse', pagination?: (
      { __typename?: 'CursorPaginationResponse' }
      & PaginationFragment
    ) | null, contributions: Array<(
      { __typename?: 'Contribution' }
      & OrderContributionFragment
    )> } | null };

export type ContributionWithInvoiceStatusGetQueryVariables = Exact<{
  contributionId: Scalars['BigInt']['input'];
}>;


export type ContributionWithInvoiceStatusGetQuery = { __typename?: 'Query', contribution: (
    { __typename?: 'Contribution' }
    & ContributionWithInvoiceStatusFragment
  ) };

export type ContributionForDownloadInvoiceGetQueryVariables = Exact<{
  contributionId: Scalars['BigInt']['input'];
}>;


export type ContributionForDownloadInvoiceGetQuery = { __typename?: 'Query', contribution: (
    { __typename?: 'Contribution' }
    & ContributionForDownloadInvoiceFragment
  ) };

export type ProjectPageContributionsGetQueryVariables = Exact<{
  input?: InputMaybe<GetContributionsInput>;
}>;


export type ProjectPageContributionsGetQuery = { __typename?: 'Query', contributionsGet?: { __typename?: 'ContributionsGetResponse', contributions: Array<(
      { __typename?: 'Contribution' }
      & ProjectContributionFragment
    )> } | null };

export type UserEmailIsAvailableQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserEmailIsAvailableQuery = { __typename?: 'Query', userEmailIsAvailable: boolean };

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

export type ProjectFollowersQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectFollowersQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', followers: Array<(
      { __typename?: 'User' }
      & UserAvatarFragment
    )> } | null };

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

export type ProjectLeaderboardAmbassadorsGetQueryVariables = Exact<{
  input: ProjectLeaderboardAmbassadorsGetInput;
}>;


export type ProjectLeaderboardAmbassadorsGetQuery = { __typename?: 'Query', projectLeaderboardAmbassadorsGet: Array<(
    { __typename?: 'ProjectLeaderboardAmbassadorsRow' }
    & ProjectLeaderboardAmbassadorsFragment
  )> };

export type ProjectUserContributorQueryVariables = Exact<{
  input: GetContributorInput;
  period?: InputMaybe<ContributionsSummaryPeriod>;
}>;


export type ProjectUserContributorQuery = { __typename?: 'Query', contributor: (
    { __typename?: 'Funder', contributionsSummary?: (
      { __typename?: 'ContributorContributionsSummary' }
      & ContributorContributionsSummaryFragment
    ) | null }
    & UserContributorFragment
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

export type ProjectGoalQueryVariables = Exact<{
  input: Scalars['BigInt']['input'];
}>;


export type ProjectGoalQuery = { __typename?: 'Query', projectGoal: (
    { __typename?: 'ProjectGoal', posts: Array<{ __typename?: 'Post', id: any, title: string, postType?: PostType | null, description: string, createdAt: string }> }
    & ProjectGoalsFragment
  ) };

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

export type ProjectPostsQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
  input?: InputMaybe<ProjectPostsGetInput>;
}>;


export type ProjectPostsQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', id: any, posts: Array<(
      { __typename?: 'Post' }
      & ProjectPostFragment
    )> } | null };

export type ProjectUnplublishedPostsQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectUnplublishedPostsQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', id: any, posts: Array<(
      { __typename?: 'Post' }
      & ProjectPostFragment
    )> } | null };

export type ProjectPostQueryVariables = Exact<{
  postId: Scalars['BigInt']['input'];
}>;


export type ProjectPostQuery = { __typename?: 'Query', post?: (
    { __typename?: 'Post' }
    & ProjectPostViewFragment
  ) | null };

export type PostEmailSegmentSizeGetQueryVariables = Exact<{
  input: PostEmailSegmentSizeGetInput;
}>;


export type PostEmailSegmentSizeGetQuery = { __typename?: 'Query', postEmailSegmentSizeGet: number };

export type ProjectByNameOrIdQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
  input?: InputMaybe<ProjectEntriesGetInput>;
}>;


export type ProjectByNameOrIdQuery = { __typename?: 'Query', projectGet?: (
    { __typename?: 'Project' }
    & ProjectFragment
  ) | null };

export type ProjectByNameForNameCheckQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectByNameForNameCheckQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', id: any, name: string } | null };

export type ProjectNostrKeysQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type ProjectNostrKeysQuery = { __typename?: 'Query', projectGet?: (
    { __typename?: 'Project' }
    & ProjectNostrKeysFragment
  ) | null };

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

export type ProjectGrantApplicationsQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
  input?: InputMaybe<ProjectGrantApplicationsInput>;
}>;


export type ProjectGrantApplicationsQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', grantApplications: Array<(
      { __typename?: 'GrantApplicant' }
      & ProjectGrantApplicantFragment
    )> } | null };

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

export type ProjectSubscriptionPlansQueryVariables = Exact<{
  input: ProjectSubscriptionPlansInput;
}>;


export type ProjectSubscriptionPlansQuery = { __typename?: 'Query', projectSubscriptionPlans: Array<(
    { __typename?: 'ProjectSubscriptionPlan' }
    & ProjectSubscriptionPlansFragment
  )> };

export type ProjectRewardsQueryVariables = Exact<{
  input: GetProjectRewardsInput;
}>;


export type ProjectRewardsQuery = { __typename?: 'Query', projectRewardsGet: Array<(
    { __typename?: 'ProjectReward' }
    & ProjectRewardFragment
  )> };

export type ProjectRewardGetQueryVariables = Exact<{
  input: GetProjectRewardInput;
}>;


export type ProjectRewardGetQuery = { __typename?: 'Query', projectRewardGet: (
    { __typename?: 'ProjectReward' }
    & ProjectRewardFragment
  ) };

export type RewardCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type RewardCategoriesQuery = { __typename?: 'Query', projectRewardCategoriesGet: Array<string> };

export type ProjectShippingConfigsGetQueryVariables = Exact<{
  input: ProjectShippingConfigsGetInput;
}>;


export type ProjectShippingConfigsGetQuery = { __typename?: 'Query', projectShippingConfigsGet: Array<(
    { __typename?: 'ShippingConfig' }
    & ShippingConfigFragment
  )> };

export type ShippingAddressesGetQueryVariables = Exact<{
  input: ShippingAddressesGetInput;
}>;


export type ShippingAddressesGetQuery = { __typename?: 'Query', shippingAddressesGet: Array<(
    { __typename?: 'ShippingAddress' }
    & ShippingAddressFragment
  )> };

export type GetUserIpCountryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserIpCountryQuery = { __typename?: 'Query', userIpCountry: string };

export type GetProjectOwnerUserForInvoiceQueryVariables = Exact<{
  where: UniqueProjectQueryInput;
}>;


export type GetProjectOwnerUserForInvoiceQuery = { __typename?: 'Query', projectGet?: { __typename?: 'Project', owners: Array<{ __typename?: 'Owner', id: any, user: (
        { __typename?: 'User' }
        & ProjectOwnerUserForInvoiceFragment
      ) }> } | null };

export type FundingContributionStatusUpdatedSubscriptionVariables = Exact<{
  input?: InputMaybe<ContributionStatusUpdatedInput>;
}>;


export type FundingContributionStatusUpdatedSubscription = { __typename?: 'Subscription', contributionStatusUpdated: { __typename?: 'ContributionStatusUpdatedSubscriptionResponse', contribution: (
      { __typename?: 'Contribution' }
      & FundingContributionSubscriptionFragment
    ) } };

export type ProjectContributionSubscriptionVariables = Exact<{
  input?: InputMaybe<ContributionStatusUpdatedInput>;
}>;


export type ProjectContributionSubscription = { __typename?: 'Subscription', contributionStatusUpdated: { __typename?: 'ContributionStatusUpdatedSubscriptionResponse', contribution: (
      { __typename?: 'Contribution' }
      & ProjectContributionFragment
    ) } };

export type PaymentStatusUpdatedSubscriptionVariables = Exact<{
  input: PaymentStatusUpdatedInput;
}>;


export type PaymentStatusUpdatedSubscription = { __typename?: 'Subscription', paymentStatusUpdated: (
    { __typename?: 'Payment' }
    & PaymentSubscriptionFragment
  ) };

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
  completedAt
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
  applicants {
    id
  }
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
  applicants {
    id
  }
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
export const PaginationFragmentDoc = gql`
    fragment Pagination on CursorPaginationResponse {
  take
  cursor {
    id
  }
  count
}
    `;
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
export const ExternalAccountFragmentDoc = gql`
    fragment ExternalAccount on ExternalAccount {
  id
  accountType
  externalUsername
  externalId
  externalLink
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
export const UserComplianceDetailsFragmentDoc = gql`
    fragment UserComplianceDetails on UserComplianceDetails {
  contributionLimits {
    monthly {
      limit
      reached
      remaining
    }
  }
  currentVerificationLevel {
    level
    status
    verifiedAt
  }
  verifiedDetails {
    email {
      verified
      verifiedAt
    }
    identity {
      verified
      verifiedAt
    }
    phoneNumber {
      verified
      verifiedAt
    }
  }
}
    `;
export const ProjectForOwnerFragmentDoc = gql`
    fragment ProjectForOwner on Project {
  id
  name
  images
  thumbnailImage
  title
  status
  createdAt
}
    `;
export const UserMeFragmentDoc = gql`
    fragment UserMe on User {
  id
  username
  heroId
  guardianType
  imageUrl
  email
  ranking
  isEmailVerified
  hasSocialAccount
  complianceDetails {
    ...UserComplianceDetails
  }
  externalAccounts {
    ...ExternalAccount
  }
  ownerOf {
    project {
      ...ProjectForOwner
    }
  }
}
    ${UserComplianceDetailsFragmentDoc}
${ExternalAccountFragmentDoc}
${ProjectForOwnerFragmentDoc}`;
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
  balance
  balanceUsdCent
  owners {
    id
    user {
      id
      taxProfile {
        legalEntityType
        verified
        country
      }
    }
  }
}
    `;
export const ProjectForLaunchpadPageFragmentDoc = gql`
    fragment ProjectForLaunchpadPage on Project {
  id
  name
  thumbnailImage
  shortDescription
  title
  status
  preLaunchedAt
  preLaunchExpiresAt
  balanceUsdCent
  category
  subCategory
  owners {
    id
    user {
      id
      taxProfile {
        legalEntityType
        verified
        country
      }
    }
  }
}
    `;
export const ProjectForMyProjectsFragmentDoc = gql`
    fragment ProjectForMyProjects on Project {
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
  followersCount
  balanceUsdCent
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
export const RewardForLandingPageFragmentDoc = gql`
    fragment RewardForLandingPage on ProjectReward {
  id
  uuid
  images
  cost
  name
  shortDescription
  project {
    rewardCurrency
    id
    name
    title
    thumbnailImage
  }
}
    `;
export const RewardForProductsPageFragmentDoc = gql`
    fragment RewardForProductsPage on ProjectReward {
  id
  uuid
  images
  cost
  name
  shortDescription
  project {
    rewardCurrency
    id
    name
    title
    thumbnailImage
    category
    subCategory
  }
}
    `;
export const ActivityFeedFragmentFragmentDoc = gql`
    fragment ActivityFeedFragment on Activity {
  activityType
  createdAt
  id
  project {
    id
    title
    name
    thumbnailImage
  }
  resource {
    ... on Project {
      id
      title
      name
      thumbnailImage
    }
    ... on Entry {
      id
      title
      entryDescription: description
      content
      entryImage: image
    }
    ... on Post {
      id
      title
      entryDescription: description
      markdown
      entryImage: image
    }
    ... on Contribution {
      id
      amount
      projectId
      isAnonymous
      comment
      funder {
        user {
          id
          username
          imageUrl
          guardianType
        }
      }
    }
    ... on ProjectReward {
      id
      uuid
      category
      cost
      projectRewardDescription: description
      rewardCurrency
      sold
      stock
      projectRewardImage: images
    }
    ... on ProjectGoal {
      id
      currency
      goalDescription: description
      title
      targetAmount
      status
    }
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
export const TopAmbassadorsFragmentFragmentDoc = gql`
    fragment TopAmbassadorsFragment on GlobalAmbassadorLeaderboardRow {
  contributionsTotal
  contributionsTotalUsd
  projectsCount
  userId
  userHeroId
  userGuardianType
  userImageUrl
  username
}
    `;
export const TopContributorsFragmentFragmentDoc = gql`
    fragment TopContributorsFragment on GlobalContributorLeaderboardRow {
  contributionsCount
  contributionsTotal
  contributionsTotalUsd
  projectsContributedCount
  userId
  userHeroId
  userGuardianType
  username
  userImageUrl
}
    `;
export const TopCreatorsFragmentFragmentDoc = gql`
    fragment TopCreatorsFragment on GlobalCreatorLeaderboardRow {
  contributionsTotal
  contributionsTotalUsd
  projectsCount
  userId
  userHeroId
  userGuardianType
  userImageUrl
  username
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
export const FollowedProjectsActivitiesCountFragmentFragmentDoc = gql`
    fragment FollowedProjectsActivitiesCountFragment on ProjectActivitiesCount {
  count
  project {
    id
    name
    thumbnailImage
    title
  }
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
      uuid
      name
      image
      sold
      maxClaimable
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
export const GuardianProjectRewardFragmentDoc = gql`
    fragment GuardianProjectReward on ProjectReward {
  id
  uuid
  name
  cost
  images
  description
  shortDescription
  maxClaimable
  sold
  rewardCurrency
  isHidden
}
    `;
export const GuardianUserFragmentDoc = gql`
    fragment GuardianUser on GuardianUser {
  guardianType
  heroId
  imageUrl
  userId
  username
}
    `;
export const GuardianResultFragmentDoc = gql`
    fragment GuardianResult on GuardianResult {
  guardianType
  soldCount
  users {
    ...GuardianUser
  }
}
    ${GuardianUserFragmentDoc}`;
export const BitcoinQuoteFragmentDoc = gql`
    fragment BitcoinQuote on BitcoinQuote {
  quote
  quoteCurrency
}
    `;
export const UserProjectFunderFragmentDoc = gql`
    fragment UserProjectFunder on Funder {
  amountFunded
  confirmedAt
  confirmed
  id
  contributions {
    id
    amount
    comment
    media
    confirmedAt
    bitcoinQuote {
      ...BitcoinQuote
    }
  }
}
    ${BitcoinQuoteFragmentDoc}`;
export const UserProjectContributionFragmentDoc = gql`
    fragment UserProjectContribution on Contribution {
  id
  amount
  comment
  media
  confirmedAt
  projectId
  bitcoinQuote {
    ...BitcoinQuote
  }
}
    ${BitcoinQuoteFragmentDoc}`;
export const ProfileOrderItemFragmentDoc = gql`
    fragment ProfileOrderItem on OrderItem {
  item {
    id
    name
    cost
    rewardCurrency
    description
    images
    category
  }
  quantity
  unitPriceInSats
}
    `;
export const ProjectAvatarFragmentDoc = gql`
    fragment ProjectAvatar on Project {
  id
  name
  thumbnailImage
  title
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
  contribution {
    id
    bitcoinQuote {
      quote
      quoteCurrency
    }
    amount
    status
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
  rejectionReason
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
export const ProjectForProfileContributionsFragmentDoc = gql`
    fragment ProjectForProfileContributions on Project {
  id
  name
  title
  thumbnailImage
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
export const BadgeFragmentDoc = gql`
    fragment Badge on Badge {
  id
  name
  thumb
  uniqueName
  image
  description
  createdAt
}
    `;
export const UserBadgeFragmentDoc = gql`
    fragment UserBadge on UserBadge {
  id
  userId
  updatedAt
  status
  contributionId
  createdAt
  badgeAwardEventId
  badge {
    ...Badge
  }
}
    ${BadgeFragmentDoc}`;
export const UserForProfilePageFragmentDoc = gql`
    fragment UserForProfilePage on User {
  id
  bio
  heroId
  username
  imageUrl
  ranking
  guardianType
  isEmailVerified
  externalAccounts {
    ...ExternalAccount
  }
  complianceDetails {
    verifiedDetails {
      email {
        verified
        verifiedAt
      }
      identity {
        verified
        verifiedAt
      }
      phoneNumber {
        verified
        verifiedAt
      }
    }
  }
}
    ${ExternalAccountFragmentDoc}`;
export const UserTaxProfileFragmentDoc = gql`
    fragment UserTaxProfile on UserTaxProfile {
  id
  userId
  legalEntityType
  fullName
  country
  state
  taxId
  verified
}
    `;
export const UserSubscriptionFragmentDoc = gql`
    fragment UserSubscription on UserSubscription {
  canceledAt
  createdAt
  id
  nextBillingDate
  startDate
  status
  updatedAt
  projectSubscriptionPlan {
    id
    projectId
    name
    cost
    interval
    currency
  }
}
    `;
export const UserWalletConnectionDetailsFragmentDoc = gql`
    fragment UserWalletConnectionDetails on Wallet {
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
    ... on NWCConnectionDetailsPrivate {
      nwcUrl
    }
  }
}
    `;
export const FundingContributionPaymentFragmentDoc = gql`
    fragment FundingContributionPayment on Payment {
  id
  method
  paymentAmount
  status
  userSubscriptionId
}
    `;
export const UserAvatarFragmentDoc = gql`
    fragment UserAvatar on User {
  id
  imageUrl
  username
  heroId
  guardianType
}
    `;
export const ProjectFunderFragmentDoc = gql`
    fragment ProjectFunder on Funder {
  id
  amountFunded
  timesFunded
  confirmedAt
  user {
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;
export const FundingContributionFragmentDoc = gql`
    fragment FundingContribution on Contribution {
  id
  uuid
  amount
  status
  comment
  media
  confirmedAt
  projectId
  creatorEmail
  createdAt
  isAnonymous
  isSubscription
  bitcoinQuote {
    quote
    quoteCurrency
  }
  payments {
    ...FundingContributionPayment
  }
  funder {
    ...ProjectFunder
  }
}
    ${FundingContributionPaymentFragmentDoc}
${ProjectFunderFragmentDoc}`;
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
export const OrderContributionFragmentDoc = gql`
    fragment OrderContribution on Contribution {
  id
  status
  donationAmount
  amount
  email
  uuid
  confirmedAt
  privateComment
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
export const ProjectContributionFragmentDoc = gql`
    fragment ProjectContribution on Contribution {
  id
  amount
  media
  comment
  confirmedAt
  projectGoalId
  bitcoinQuote {
    quote
    quoteCurrency
  }
  funder {
    id
    timesFunded
    user {
      ...UserAvatar
    }
  }
}
    ${UserAvatarFragmentDoc}`;
export const FundingContributionSubscriptionFragmentDoc = gql`
    fragment FundingContributionSubscription on Contribution {
  id
  uuid
  status
  projectGoalId
}
    `;
export const ContributionWithInvoiceStatusFragmentDoc = gql`
    fragment ContributionWithInvoiceStatus on Contribution {
  id
  uuid
  status
  creatorEmail
  isAnonymous
}
    `;
export const ContributionForDownloadInvoiceFragmentDoc = gql`
    fragment ContributionForDownloadInvoice on Contribution {
  id
  donationAmount
  amount
  uuid
  creatorEmail
  funder {
    user {
      username
      email
      taxProfile {
        fullName
        taxId
      }
    }
  }
  projectId
  confirmedAt
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
  creatorTaxProfile {
    fullName
    taxId
  }
  status
  bitcoinQuote {
    quote
    quoteCurrency
  }
  payments {
    status
    uuid
    fees {
      description
      feeType
      feeAmount
      external
      feeCurrency
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
  markdown
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
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;
export const ProjectLeaderboardAmbassadorsFragmentDoc = gql`
    fragment ProjectLeaderboardAmbassadors on ProjectLeaderboardAmbassadorsRow {
  contributionsTotal
  contributionsTotalUsd
  projectsCount
  user {
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;
export const UserContributorFragmentDoc = gql`
    fragment UserContributor on Funder {
  id
  rank
  user {
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;
export const ContributorContributionsSummaryFragmentDoc = gql`
    fragment ContributorContributionsSummary on ContributorContributionsSummary {
  contributionsTotalUsd
  contributionsTotal
  contributionsCount
  commentsCount
}
    `;
export const ProjectGrantApplicantFragmentDoc = gql`
    fragment ProjectGrantApplicant on GrantApplicant {
  id
  status
  grant {
    ... on CommunityVoteGrant {
      id
      votingSystem
      type
      name
      title
      status
    }
  }
}
    `;
export const ShippingAddressFragmentDoc = gql`
    fragment ShippingAddress on ShippingAddress {
  id
  postalCode
  state
  fullName
  country
  city
  addressLines
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
  shippingFeeTotalInSats
  itemsTotalInSats
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
  contribution {
    id
    bitcoinQuote {
      quoteCurrency
      quote
    }
    amount
    donationAmount
    email
    isAnonymous
    status
    uuid
    privateComment
  }
  shippingAddress {
    ...ShippingAddress
  }
}
    ${OrderItemFragmentDoc}
${ShippingAddressFragmentDoc}`;
export const ContributionLightningPaymentDetailsFragmentDoc = gql`
    fragment ContributionLightningPaymentDetails on ContributionLightningPaymentDetails {
  lightningInvoiceId
  paymentRequest
}
    `;
export const ContributionOnChainSwapPaymentDetailsFragmentDoc = gql`
    fragment ContributionOnChainSwapPaymentDetails on ContributionOnChainSwapPaymentDetails {
  address
  swapJson
}
    `;
export const ContributionFiatPaymentDetailsFragmentDoc = gql`
    fragment ContributionFiatPaymentDetails on ContributionFiatPaymentDetails {
  stripeClientSecret
}
    `;
export const ContributionFiatSwapPaymentDetailsFragmentDoc = gql`
    fragment ContributionFiatSwapPaymentDetails on ContributionFiatSwapPaymentDetails {
  checkoutUrl
}
    `;
export const FundingContributionPaymentDetailsFragmentDoc = gql`
    fragment FundingContributionPaymentDetails on ContributionPaymentsDetails {
  lightning {
    ...ContributionLightningPaymentDetails
  }
  onChainSwap {
    ...ContributionOnChainSwapPaymentDetails
  }
  fiat {
    ...ContributionFiatPaymentDetails
  }
  fiatSwap {
    ...ContributionFiatSwapPaymentDetails
  }
}
    ${ContributionLightningPaymentDetailsFragmentDoc}
${ContributionOnChainSwapPaymentDetailsFragmentDoc}
${ContributionFiatPaymentDetailsFragmentDoc}
${ContributionFiatSwapPaymentDetailsFragmentDoc}`;
export const PaymentSubscriptionFragmentDoc = gql`
    fragment PaymentSubscription on Payment {
  id
  status
  paymentType
  contributionUUID
  failureReason
}
    `;
export const ProjectSubscriptionPlansFragmentDoc = gql`
    fragment ProjectSubscriptionPlans on ProjectSubscriptionPlan {
  cost
  currency
  description
  id
  name
  interval
  projectId
}
    `;
export const ProjectPostFragmentDoc = gql`
    fragment ProjectPost on Post {
  id
  title
  description
  image
  content
  postType
  fundersCount
  amountFunded
  status
  createdAt
  publishedAt
  sentByEmailAt
}
    `;
export const PostPageProjectRewardFragmentDoc = gql`
    fragment PostPageProjectReward on ProjectReward {
  id
  uuid
  name
  images
  shortDescription
  cost
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
  progress
  createdAt
  updatedAt
  completedAt
  hasReceivedContribution
  emojiUnifiedCode
}
    `;
export const ProjectPostViewFragmentDoc = gql`
    fragment ProjectPostView on Post {
  id
  title
  description
  image
  postType
  fundersCount
  amountFunded
  status
  createdAt
  publishedAt
  content
  markdown
  sentByEmailAt
  projectRewards {
    ...PostPageProjectReward
  }
  projectGoals {
    inProgress {
      ...ProjectGoals
    }
    completed {
      ...ProjectGoals
    }
  }
}
    ${PostPageProjectRewardFragmentDoc}
${ProjectGoalsFragmentDoc}`;
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
  images
  thumbnailImage
  links
  status
  rewardCurrency
  fundersCount
  contributionsCount
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
export const ProjectPageCreatorFragmentDoc = gql`
    fragment ProjectPageCreator on User {
  id
  imageUrl
  username
  email
  guardianType
  externalAccounts {
    accountType
    externalUsername
    externalId
    id
    public
  }
  taxProfile {
    id
    country
    legalEntityType
    verified
  }
  complianceDetails {
    verifiedDetails {
      email {
        verified
        verifiedAt
      }
      identity {
        verified
        verifiedAt
      }
      phoneNumber {
        verified
        verifiedAt
      }
    }
  }
}
    `;
export const ProjectPaymentMethodsFragmentDoc = gql`
    fragment ProjectPaymentMethods on PaymentMethods {
  fiat {
    stripe
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
  images
  shortDescription
  description
  balance
  balanceUsdCent
  defaultGoalId
  status
  rewardCurrency
  createdAt
  launchedAt
  preLaunchedAt
  preLaunchExpiresAt
  paidLaunch
  goalsCount
  rewardsCount
  entriesCount
  promotionsEnabled
  followersCount
  rejectionReason
  keys {
    ...ProjectKeys
  }
  owners {
    id
    user {
      ...ProjectPageCreator
    }
  }
  paymentMethods {
    ...ProjectPaymentMethods
  }
}
    ${ProjectKeysFragmentDoc}
${ProjectPageCreatorFragmentDoc}
${ProjectPaymentMethodsFragmentDoc}`;
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
  category
  subCategory
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
  contributionsCount
}
    `;
export const ProjectUpdateFragmentDoc = gql`
    fragment ProjectUpdate on Project {
  id
  title
  name
  shortDescription
  description
  images
  thumbnailImage
  promotionsEnabled
  location {
    country {
      name
      code
    }
    region
  }
  status
  links
  category
  subCategory
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
    projectContributionsStats {
      contributions {
        count
        total
        totalUsd
      }
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
    projectContributionsStats {
      contributions {
        count
        total
        totalUsd
      }
    }
  }
}
    `;
export const ProjectHistoryStatsFragmentDoc = gql`
    fragment ProjectHistoryStats on ProjectStats {
  current {
    projectContributionsStats {
      contributions {
        graph {
          statType
          graphData {
            value
            dateTime
          }
        }
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
    projectContributionsStats {
      contributionsGroupedByMethod {
        count
        method
        total
        totalUsd
      }
    }
  }
}
    `;
export const ShippingRateFragmentDoc = gql`
    fragment ShippingRate on ProjectShippingRate {
  baseRate
  country
  incrementRate
  sameAsDefault
}
    `;
export const ShippingConfigFragmentDoc = gql`
    fragment ShippingConfig on ShippingConfig {
  id
  globalShipping
  name
  type
  shippingRates {
    ...ShippingRate
  }
}
    ${ShippingRateFragmentDoc}`;
export const ProjectRewardFragmentDoc = gql`
    fragment ProjectReward on ProjectReward {
  id
  uuid
  name
  description
  shortDescription
  cost
  images
  deleted
  stock
  sold
  hasShipping
  maxClaimable
  rewardCurrency
  isAddon
  isHidden
  category
  preOrder
  estimatedAvailabilityDate
  estimatedDeliveryInWeeks
  confirmationMessage
  privateCommentPrompts
  createdAt
  shippingConfig {
    ...ShippingConfig
  }
  posts {
    id
    title
    postType
    description
    createdAt
  }
}
    ${ShippingConfigFragmentDoc}`;
export const ProjectOwnerUserForInvoiceFragmentDoc = gql`
    fragment ProjectOwnerUserForInvoice on User {
  id
  username
  complianceDetails {
    verifiedDetails {
      identity {
        verifiedAt
        verified
      }
    }
  }
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
    ... on NWCConnectionDetailsPrivate {
      nwcUrl
    }
  }
}
    `;
export const ProjectPageWalletCreationDetailsFragmentDoc = gql`
    fragment ProjectPageWalletCreationDetails on Wallet {
  ...ProjectPageWallet
  ...ProjectWalletConnectionDetails
}
    ${ProjectPageWalletFragmentDoc}
${ProjectWalletConnectionDetailsFragmentDoc}`;
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
export function useSignedUploadUrlSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>(SignedUploadUrlDocument, options);
        }
export type SignedUploadUrlQueryHookResult = ReturnType<typeof useSignedUploadUrlQuery>;
export type SignedUploadUrlLazyQueryHookResult = ReturnType<typeof useSignedUploadUrlLazyQuery>;
export type SignedUploadUrlSuspenseQueryHookResult = ReturnType<typeof useSignedUploadUrlSuspenseQuery>;
export type SignedUploadUrlQueryResult = Apollo.QueryResult<SignedUploadUrlQuery, SignedUploadUrlQueryVariables>;
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
export function useProjectDefaultGoalSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectDefaultGoalQuery, ProjectDefaultGoalQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectGoalsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectGoalsQuery, ProjectGoalsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useGrantsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GrantsQuery, GrantsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useGrantSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GrantQuery, GrantQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GrantQuery, GrantQueryVariables>(GrantDocument, options);
        }
export type GrantQueryHookResult = ReturnType<typeof useGrantQuery>;
export type GrantLazyQueryHookResult = ReturnType<typeof useGrantLazyQuery>;
export type GrantSuspenseQueryHookResult = ReturnType<typeof useGrantSuspenseQuery>;
export type GrantQueryResult = Apollo.QueryResult<GrantQuery, GrantQueryVariables>;
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
export function useGrantGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GrantGetQuery, GrantGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GrantGetQuery, GrantGetQueryVariables>(GrantGetDocument, options);
        }
export type GrantGetQueryHookResult = ReturnType<typeof useGrantGetQuery>;
export type GrantGetLazyQueryHookResult = ReturnType<typeof useGrantGetLazyQuery>;
export type GrantGetSuspenseQueryHookResult = ReturnType<typeof useGrantGetSuspenseQuery>;
export type GrantGetQueryResult = Apollo.QueryResult<GrantGetQuery, GrantGetQueryVariables>;
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
export function useLightningAddressVerifySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LightningAddressVerifyQuery, LightningAddressVerifyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useWalletLimitSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<WalletLimitQuery, WalletLimitQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WalletLimitQuery, WalletLimitQueryVariables>(WalletLimitDocument, options);
        }
export type WalletLimitQueryHookResult = ReturnType<typeof useWalletLimitQuery>;
export type WalletLimitLazyQueryHookResult = ReturnType<typeof useWalletLimitLazyQuery>;
export type WalletLimitSuspenseQueryHookResult = ReturnType<typeof useWalletLimitSuspenseQuery>;
export type WalletLimitQueryResult = Apollo.QueryResult<WalletLimitQuery, WalletLimitQueryVariables>;
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
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
      status
      thumbnailImage
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
export function useMeProjectFollowsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>(MeProjectFollowsDocument, options);
        }
export type MeProjectFollowsQueryHookResult = ReturnType<typeof useMeProjectFollowsQuery>;
export type MeProjectFollowsLazyQueryHookResult = ReturnType<typeof useMeProjectFollowsLazyQuery>;
export type MeProjectFollowsSuspenseQueryHookResult = ReturnType<typeof useMeProjectFollowsSuspenseQuery>;
export type MeProjectFollowsQueryResult = Apollo.QueryResult<MeProjectFollowsQuery, MeProjectFollowsQueryVariables>;
export const ActivitiesGetDocument = gql`
    query ActivitiesGet($input: GetActivitiesInput) {
  activitiesGet(input: $input) {
    activities {
      id
      createdAt
      activityType
    }
  }
}
    `;

/**
 * __useActivitiesGetQuery__
 *
 * To run a query within a React component, call `useActivitiesGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivitiesGetQuery(baseOptions?: Apollo.QueryHookOptions<ActivitiesGetQuery, ActivitiesGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesGetQuery, ActivitiesGetQueryVariables>(ActivitiesGetDocument, options);
      }
export function useActivitiesGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesGetQuery, ActivitiesGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesGetQuery, ActivitiesGetQueryVariables>(ActivitiesGetDocument, options);
        }
export function useActivitiesGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActivitiesGetQuery, ActivitiesGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivitiesGetQuery, ActivitiesGetQueryVariables>(ActivitiesGetDocument, options);
        }
export type ActivitiesGetQueryHookResult = ReturnType<typeof useActivitiesGetQuery>;
export type ActivitiesGetLazyQueryHookResult = ReturnType<typeof useActivitiesGetLazyQuery>;
export type ActivitiesGetSuspenseQueryHookResult = ReturnType<typeof useActivitiesGetSuspenseQuery>;
export type ActivitiesGetQueryResult = Apollo.QueryResult<ActivitiesGetQuery, ActivitiesGetQueryVariables>;
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
export function useProjectsSummarySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>(ProjectsSummaryDocument, options);
        }
export type ProjectsSummaryQueryHookResult = ReturnType<typeof useProjectsSummaryQuery>;
export type ProjectsSummaryLazyQueryHookResult = ReturnType<typeof useProjectsSummaryLazyQuery>;
export type ProjectsSummarySuspenseQueryHookResult = ReturnType<typeof useProjectsSummarySuspenseQuery>;
export type ProjectsSummaryQueryResult = Apollo.QueryResult<ProjectsSummaryQuery, ProjectsSummaryQueryVariables>;
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
export function useFeaturedProjectForLandingPageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FeaturedProjectForLandingPageQuery, FeaturedProjectForLandingPageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectsMostFundedByTagSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsMostFundedByTagQuery, ProjectsMostFundedByTagQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsMostFundedByTagQuery, ProjectsMostFundedByTagQueryVariables>(ProjectsMostFundedByTagDocument, options);
        }
export type ProjectsMostFundedByTagQueryHookResult = ReturnType<typeof useProjectsMostFundedByTagQuery>;
export type ProjectsMostFundedByTagLazyQueryHookResult = ReturnType<typeof useProjectsMostFundedByTagLazyQuery>;
export type ProjectsMostFundedByTagSuspenseQueryHookResult = ReturnType<typeof useProjectsMostFundedByTagSuspenseQuery>;
export type ProjectsMostFundedByTagQueryResult = Apollo.QueryResult<ProjectsMostFundedByTagQuery, ProjectsMostFundedByTagQueryVariables>;
export const ProjectsMostFundedByCategoryDocument = gql`
    query ProjectsMostFundedByCategory($input: ProjectsMostFundedByCategoryInput!) {
  projectsMostFundedByCategory(input: $input) {
    category
    subCategory
    projects {
      project {
        ...ProjectForLandingPage
      }
      contributionsSummary {
        contributionsTotalUsd
        contributionsTotal
      }
    }
  }
}
    ${ProjectForLandingPageFragmentDoc}`;

/**
 * __useProjectsMostFundedByCategoryQuery__
 *
 * To run a query within a React component, call `useProjectsMostFundedByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsMostFundedByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsMostFundedByCategoryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectsMostFundedByCategoryQuery(baseOptions: Apollo.QueryHookOptions<ProjectsMostFundedByCategoryQuery, ProjectsMostFundedByCategoryQueryVariables> & ({ variables: ProjectsMostFundedByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsMostFundedByCategoryQuery, ProjectsMostFundedByCategoryQueryVariables>(ProjectsMostFundedByCategoryDocument, options);
      }
export function useProjectsMostFundedByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsMostFundedByCategoryQuery, ProjectsMostFundedByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsMostFundedByCategoryQuery, ProjectsMostFundedByCategoryQueryVariables>(ProjectsMostFundedByCategoryDocument, options);
        }
export function useProjectsMostFundedByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsMostFundedByCategoryQuery, ProjectsMostFundedByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsMostFundedByCategoryQuery, ProjectsMostFundedByCategoryQueryVariables>(ProjectsMostFundedByCategoryDocument, options);
        }
export type ProjectsMostFundedByCategoryQueryHookResult = ReturnType<typeof useProjectsMostFundedByCategoryQuery>;
export type ProjectsMostFundedByCategoryLazyQueryHookResult = ReturnType<typeof useProjectsMostFundedByCategoryLazyQuery>;
export type ProjectsMostFundedByCategorySuspenseQueryHookResult = ReturnType<typeof useProjectsMostFundedByCategorySuspenseQuery>;
export type ProjectsMostFundedByCategoryQueryResult = Apollo.QueryResult<ProjectsMostFundedByCategoryQuery, ProjectsMostFundedByCategoryQueryVariables>;
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
export function useProjectsForLandingPageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>(ProjectsForLandingPageDocument, options);
        }
export type ProjectsForLandingPageQueryHookResult = ReturnType<typeof useProjectsForLandingPageQuery>;
export type ProjectsForLandingPageLazyQueryHookResult = ReturnType<typeof useProjectsForLandingPageLazyQuery>;
export type ProjectsForLandingPageSuspenseQueryHookResult = ReturnType<typeof useProjectsForLandingPageSuspenseQuery>;
export type ProjectsForLandingPageQueryResult = Apollo.QueryResult<ProjectsForLandingPageQuery, ProjectsForLandingPageQueryVariables>;
export const ProjectsForLaunchpadPageDocument = gql`
    query ProjectsForLaunchpadPage($input: ProjectsGetQueryInput) {
  projectsGet(input: $input) {
    projects {
      ...ProjectForLaunchpadPage
    }
  }
}
    ${ProjectForLaunchpadPageFragmentDoc}`;

/**
 * __useProjectsForLaunchpadPageQuery__
 *
 * To run a query within a React component, call `useProjectsForLaunchpadPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsForLaunchpadPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsForLaunchpadPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectsForLaunchpadPageQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsForLaunchpadPageQuery, ProjectsForLaunchpadPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsForLaunchpadPageQuery, ProjectsForLaunchpadPageQueryVariables>(ProjectsForLaunchpadPageDocument, options);
      }
export function useProjectsForLaunchpadPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsForLaunchpadPageQuery, ProjectsForLaunchpadPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsForLaunchpadPageQuery, ProjectsForLaunchpadPageQueryVariables>(ProjectsForLaunchpadPageDocument, options);
        }
export function useProjectsForLaunchpadPageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsForLaunchpadPageQuery, ProjectsForLaunchpadPageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsForLaunchpadPageQuery, ProjectsForLaunchpadPageQueryVariables>(ProjectsForLaunchpadPageDocument, options);
        }
export type ProjectsForLaunchpadPageQueryHookResult = ReturnType<typeof useProjectsForLaunchpadPageQuery>;
export type ProjectsForLaunchpadPageLazyQueryHookResult = ReturnType<typeof useProjectsForLaunchpadPageLazyQuery>;
export type ProjectsForLaunchpadPageSuspenseQueryHookResult = ReturnType<typeof useProjectsForLaunchpadPageSuspenseQuery>;
export type ProjectsForLaunchpadPageQueryResult = Apollo.QueryResult<ProjectsForLaunchpadPageQuery, ProjectsForLaunchpadPageQueryVariables>;
export const ProjectsForMyProjectsDocument = gql`
    query ProjectsForMyProjects($where: UserGetInput!) {
  user(where: $where) {
    ownerOf {
      project {
        ...ProjectForMyProjects
      }
    }
  }
}
    ${ProjectForMyProjectsFragmentDoc}`;

/**
 * __useProjectsForMyProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsForMyProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsForMyProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsForMyProjectsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectsForMyProjectsQuery(baseOptions: Apollo.QueryHookOptions<ProjectsForMyProjectsQuery, ProjectsForMyProjectsQueryVariables> & ({ variables: ProjectsForMyProjectsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsForMyProjectsQuery, ProjectsForMyProjectsQueryVariables>(ProjectsForMyProjectsDocument, options);
      }
export function useProjectsForMyProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsForMyProjectsQuery, ProjectsForMyProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsForMyProjectsQuery, ProjectsForMyProjectsQueryVariables>(ProjectsForMyProjectsDocument, options);
        }
export function useProjectsForMyProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsForMyProjectsQuery, ProjectsForMyProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsForMyProjectsQuery, ProjectsForMyProjectsQueryVariables>(ProjectsForMyProjectsDocument, options);
        }
export type ProjectsForMyProjectsQueryHookResult = ReturnType<typeof useProjectsForMyProjectsQuery>;
export type ProjectsForMyProjectsLazyQueryHookResult = ReturnType<typeof useProjectsForMyProjectsLazyQuery>;
export type ProjectsForMyProjectsSuspenseQueryHookResult = ReturnType<typeof useProjectsForMyProjectsSuspenseQuery>;
export type ProjectsForMyProjectsQueryResult = Apollo.QueryResult<ProjectsForMyProjectsQuery, ProjectsForMyProjectsQueryVariables>;
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
export function useProjectRewardsTrendingWeeklyGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectRewardsTrendingWeeklyGetQuery, ProjectRewardsTrendingWeeklyGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectRewardsTrendingWeeklyGetQuery, ProjectRewardsTrendingWeeklyGetQueryVariables>(ProjectRewardsTrendingWeeklyGetDocument, options);
        }
export type ProjectRewardsTrendingWeeklyGetQueryHookResult = ReturnType<typeof useProjectRewardsTrendingWeeklyGetQuery>;
export type ProjectRewardsTrendingWeeklyGetLazyQueryHookResult = ReturnType<typeof useProjectRewardsTrendingWeeklyGetLazyQuery>;
export type ProjectRewardsTrendingWeeklyGetSuspenseQueryHookResult = ReturnType<typeof useProjectRewardsTrendingWeeklyGetSuspenseQuery>;
export type ProjectRewardsTrendingWeeklyGetQueryResult = Apollo.QueryResult<ProjectRewardsTrendingWeeklyGetQuery, ProjectRewardsTrendingWeeklyGetQueryVariables>;
export const ProjectRewardsTrendingQuarterlyGetDocument = gql`
    query ProjectRewardsTrendingQuarterlyGet {
  projectRewardsTrendingQuarterlyGet {
    count
    projectReward {
      ...RewardForProductsPage
    }
  }
}
    ${RewardForProductsPageFragmentDoc}`;

/**
 * __useProjectRewardsTrendingQuarterlyGetQuery__
 *
 * To run a query within a React component, call `useProjectRewardsTrendingQuarterlyGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectRewardsTrendingQuarterlyGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectRewardsTrendingQuarterlyGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectRewardsTrendingQuarterlyGetQuery(baseOptions?: Apollo.QueryHookOptions<ProjectRewardsTrendingQuarterlyGetQuery, ProjectRewardsTrendingQuarterlyGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectRewardsTrendingQuarterlyGetQuery, ProjectRewardsTrendingQuarterlyGetQueryVariables>(ProjectRewardsTrendingQuarterlyGetDocument, options);
      }
export function useProjectRewardsTrendingQuarterlyGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectRewardsTrendingQuarterlyGetQuery, ProjectRewardsTrendingQuarterlyGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectRewardsTrendingQuarterlyGetQuery, ProjectRewardsTrendingQuarterlyGetQueryVariables>(ProjectRewardsTrendingQuarterlyGetDocument, options);
        }
export function useProjectRewardsTrendingQuarterlyGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectRewardsTrendingQuarterlyGetQuery, ProjectRewardsTrendingQuarterlyGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectRewardsTrendingQuarterlyGetQuery, ProjectRewardsTrendingQuarterlyGetQueryVariables>(ProjectRewardsTrendingQuarterlyGetDocument, options);
        }
export type ProjectRewardsTrendingQuarterlyGetQueryHookResult = ReturnType<typeof useProjectRewardsTrendingQuarterlyGetQuery>;
export type ProjectRewardsTrendingQuarterlyGetLazyQueryHookResult = ReturnType<typeof useProjectRewardsTrendingQuarterlyGetLazyQuery>;
export type ProjectRewardsTrendingQuarterlyGetSuspenseQueryHookResult = ReturnType<typeof useProjectRewardsTrendingQuarterlyGetSuspenseQuery>;
export type ProjectRewardsTrendingQuarterlyGetQueryResult = Apollo.QueryResult<ProjectRewardsTrendingQuarterlyGetQuery, ProjectRewardsTrendingQuarterlyGetQueryVariables>;
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
export function useTagsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TagsGetQuery, TagsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectCountriesGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectCountriesGetQuery, ProjectCountriesGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectRegionsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectRegionsGetQuery, ProjectRegionsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useTagsMostFundedGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TagsMostFundedGetQuery, TagsMostFundedGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagsMostFundedGetQuery, TagsMostFundedGetQueryVariables>(TagsMostFundedGetDocument, options);
        }
export type TagsMostFundedGetQueryHookResult = ReturnType<typeof useTagsMostFundedGetQuery>;
export type TagsMostFundedGetLazyQueryHookResult = ReturnType<typeof useTagsMostFundedGetLazyQuery>;
export type TagsMostFundedGetSuspenseQueryHookResult = ReturnType<typeof useTagsMostFundedGetSuspenseQuery>;
export type TagsMostFundedGetQueryResult = Apollo.QueryResult<TagsMostFundedGetQuery, TagsMostFundedGetQueryVariables>;
export const ActivityFeedDocument = gql`
    query ActivityFeed($input: GetActivitiesInput!) {
  activitiesGet(input: $input) {
    activities {
      ...ActivityFeedFragment
    }
    pagination {
      take
      cursor {
        id
      }
      count
    }
  }
}
    ${ActivityFeedFragmentFragmentDoc}`;

/**
 * __useActivityFeedQuery__
 *
 * To run a query within a React component, call `useActivityFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivityFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityFeedQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivityFeedQuery(baseOptions: Apollo.QueryHookOptions<ActivityFeedQuery, ActivityFeedQueryVariables> & ({ variables: ActivityFeedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivityFeedQuery, ActivityFeedQueryVariables>(ActivityFeedDocument, options);
      }
export function useActivityFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivityFeedQuery, ActivityFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivityFeedQuery, ActivityFeedQueryVariables>(ActivityFeedDocument, options);
        }
export function useActivityFeedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActivityFeedQuery, ActivityFeedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivityFeedQuery, ActivityFeedQueryVariables>(ActivityFeedDocument, options);
        }
export type ActivityFeedQueryHookResult = ReturnType<typeof useActivityFeedQuery>;
export type ActivityFeedLazyQueryHookResult = ReturnType<typeof useActivityFeedLazyQuery>;
export type ActivityFeedSuspenseQueryHookResult = ReturnType<typeof useActivityFeedSuspenseQuery>;
export type ActivityFeedQueryResult = Apollo.QueryResult<ActivityFeedQuery, ActivityFeedQueryVariables>;
export const LeaderboardGlobalAmbassadorsGetDocument = gql`
    query LeaderboardGlobalAmbassadorsGet($input: LeaderboardGlobalAmbassadorsGetInput!) {
  leaderboardGlobalAmbassadorsGet(input: $input) {
    ...TopAmbassadorsFragment
  }
}
    ${TopAmbassadorsFragmentFragmentDoc}`;

/**
 * __useLeaderboardGlobalAmbassadorsGetQuery__
 *
 * To run a query within a React component, call `useLeaderboardGlobalAmbassadorsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeaderboardGlobalAmbassadorsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeaderboardGlobalAmbassadorsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLeaderboardGlobalAmbassadorsGetQuery(baseOptions: Apollo.QueryHookOptions<LeaderboardGlobalAmbassadorsGetQuery, LeaderboardGlobalAmbassadorsGetQueryVariables> & ({ variables: LeaderboardGlobalAmbassadorsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LeaderboardGlobalAmbassadorsGetQuery, LeaderboardGlobalAmbassadorsGetQueryVariables>(LeaderboardGlobalAmbassadorsGetDocument, options);
      }
export function useLeaderboardGlobalAmbassadorsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LeaderboardGlobalAmbassadorsGetQuery, LeaderboardGlobalAmbassadorsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LeaderboardGlobalAmbassadorsGetQuery, LeaderboardGlobalAmbassadorsGetQueryVariables>(LeaderboardGlobalAmbassadorsGetDocument, options);
        }
export function useLeaderboardGlobalAmbassadorsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LeaderboardGlobalAmbassadorsGetQuery, LeaderboardGlobalAmbassadorsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LeaderboardGlobalAmbassadorsGetQuery, LeaderboardGlobalAmbassadorsGetQueryVariables>(LeaderboardGlobalAmbassadorsGetDocument, options);
        }
export type LeaderboardGlobalAmbassadorsGetQueryHookResult = ReturnType<typeof useLeaderboardGlobalAmbassadorsGetQuery>;
export type LeaderboardGlobalAmbassadorsGetLazyQueryHookResult = ReturnType<typeof useLeaderboardGlobalAmbassadorsGetLazyQuery>;
export type LeaderboardGlobalAmbassadorsGetSuspenseQueryHookResult = ReturnType<typeof useLeaderboardGlobalAmbassadorsGetSuspenseQuery>;
export type LeaderboardGlobalAmbassadorsGetQueryResult = Apollo.QueryResult<LeaderboardGlobalAmbassadorsGetQuery, LeaderboardGlobalAmbassadorsGetQueryVariables>;
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
export function useLeaderboardGlobalContributorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables>(LeaderboardGlobalContributorsDocument, options);
        }
export type LeaderboardGlobalContributorsQueryHookResult = ReturnType<typeof useLeaderboardGlobalContributorsQuery>;
export type LeaderboardGlobalContributorsLazyQueryHookResult = ReturnType<typeof useLeaderboardGlobalContributorsLazyQuery>;
export type LeaderboardGlobalContributorsSuspenseQueryHookResult = ReturnType<typeof useLeaderboardGlobalContributorsSuspenseQuery>;
export type LeaderboardGlobalContributorsQueryResult = Apollo.QueryResult<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables>;
export const LeaderboardGlobalCreatorsGetDocument = gql`
    query LeaderboardGlobalCreatorsGet($input: LeaderboardGlobalCreatorsGetInput!) {
  leaderboardGlobalCreatorsGet(input: $input) {
    ...TopCreatorsFragment
  }
}
    ${TopCreatorsFragmentFragmentDoc}`;

/**
 * __useLeaderboardGlobalCreatorsGetQuery__
 *
 * To run a query within a React component, call `useLeaderboardGlobalCreatorsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeaderboardGlobalCreatorsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeaderboardGlobalCreatorsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLeaderboardGlobalCreatorsGetQuery(baseOptions: Apollo.QueryHookOptions<LeaderboardGlobalCreatorsGetQuery, LeaderboardGlobalCreatorsGetQueryVariables> & ({ variables: LeaderboardGlobalCreatorsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LeaderboardGlobalCreatorsGetQuery, LeaderboardGlobalCreatorsGetQueryVariables>(LeaderboardGlobalCreatorsGetDocument, options);
      }
export function useLeaderboardGlobalCreatorsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LeaderboardGlobalCreatorsGetQuery, LeaderboardGlobalCreatorsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LeaderboardGlobalCreatorsGetQuery, LeaderboardGlobalCreatorsGetQueryVariables>(LeaderboardGlobalCreatorsGetDocument, options);
        }
export function useLeaderboardGlobalCreatorsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LeaderboardGlobalCreatorsGetQuery, LeaderboardGlobalCreatorsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LeaderboardGlobalCreatorsGetQuery, LeaderboardGlobalCreatorsGetQueryVariables>(LeaderboardGlobalCreatorsGetDocument, options);
        }
export type LeaderboardGlobalCreatorsGetQueryHookResult = ReturnType<typeof useLeaderboardGlobalCreatorsGetQuery>;
export type LeaderboardGlobalCreatorsGetLazyQueryHookResult = ReturnType<typeof useLeaderboardGlobalCreatorsGetLazyQuery>;
export type LeaderboardGlobalCreatorsGetSuspenseQueryHookResult = ReturnType<typeof useLeaderboardGlobalCreatorsGetSuspenseQuery>;
export type LeaderboardGlobalCreatorsGetQueryResult = Apollo.QueryResult<LeaderboardGlobalCreatorsGetQuery, LeaderboardGlobalCreatorsGetQueryVariables>;
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
export function useLeaderboardGlobalProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables>(LeaderboardGlobalProjectsDocument, options);
        }
export type LeaderboardGlobalProjectsQueryHookResult = ReturnType<typeof useLeaderboardGlobalProjectsQuery>;
export type LeaderboardGlobalProjectsLazyQueryHookResult = ReturnType<typeof useLeaderboardGlobalProjectsLazyQuery>;
export type LeaderboardGlobalProjectsSuspenseQueryHookResult = ReturnType<typeof useLeaderboardGlobalProjectsSuspenseQuery>;
export type LeaderboardGlobalProjectsQueryResult = Apollo.QueryResult<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables>;
export const ActivitiesCountGroupedByProjectDocument = gql`
    query ActivitiesCountGroupedByProject($input: ActivitiesCountGroupedByProjectInput!) {
  activitiesCountGroupedByProject(input: $input) {
    ...FollowedProjectsActivitiesCountFragment
  }
}
    ${FollowedProjectsActivitiesCountFragmentFragmentDoc}`;

/**
 * __useActivitiesCountGroupedByProjectQuery__
 *
 * To run a query within a React component, call `useActivitiesCountGroupedByProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesCountGroupedByProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesCountGroupedByProjectQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivitiesCountGroupedByProjectQuery(baseOptions: Apollo.QueryHookOptions<ActivitiesCountGroupedByProjectQuery, ActivitiesCountGroupedByProjectQueryVariables> & ({ variables: ActivitiesCountGroupedByProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesCountGroupedByProjectQuery, ActivitiesCountGroupedByProjectQueryVariables>(ActivitiesCountGroupedByProjectDocument, options);
      }
export function useActivitiesCountGroupedByProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesCountGroupedByProjectQuery, ActivitiesCountGroupedByProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesCountGroupedByProjectQuery, ActivitiesCountGroupedByProjectQueryVariables>(ActivitiesCountGroupedByProjectDocument, options);
        }
export function useActivitiesCountGroupedByProjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActivitiesCountGroupedByProjectQuery, ActivitiesCountGroupedByProjectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivitiesCountGroupedByProjectQuery, ActivitiesCountGroupedByProjectQueryVariables>(ActivitiesCountGroupedByProjectDocument, options);
        }
export type ActivitiesCountGroupedByProjectQueryHookResult = ReturnType<typeof useActivitiesCountGroupedByProjectQuery>;
export type ActivitiesCountGroupedByProjectLazyQueryHookResult = ReturnType<typeof useActivitiesCountGroupedByProjectLazyQuery>;
export type ActivitiesCountGroupedByProjectSuspenseQueryHookResult = ReturnType<typeof useActivitiesCountGroupedByProjectSuspenseQuery>;
export type ActivitiesCountGroupedByProjectQueryResult = Apollo.QueryResult<ActivitiesCountGroupedByProjectQuery, ActivitiesCountGroupedByProjectQueryVariables>;
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
export function useOrdersStatsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrdersStatsGetQuery, OrdersStatsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectStatsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectStatsGetQuery, ProjectStatsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectStatsGetQuery, ProjectStatsGetQueryVariables>(ProjectStatsGetDocument, options);
        }
export type ProjectStatsGetQueryHookResult = ReturnType<typeof useProjectStatsGetQuery>;
export type ProjectStatsGetLazyQueryHookResult = ReturnType<typeof useProjectStatsGetLazyQuery>;
export type ProjectStatsGetSuspenseQueryHookResult = ReturnType<typeof useProjectStatsGetSuspenseQuery>;
export type ProjectStatsGetQueryResult = Apollo.QueryResult<ProjectStatsGetQuery, ProjectStatsGetQueryVariables>;
export const GrantProjectDocument = gql`
    query GrantProject($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    subscribersCount
  }
}
    `;

/**
 * __useGrantProjectQuery__
 *
 * To run a query within a React component, call `useGrantProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGrantProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGrantProjectQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGrantProjectQuery(baseOptions: Apollo.QueryHookOptions<GrantProjectQuery, GrantProjectQueryVariables> & ({ variables: GrantProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GrantProjectQuery, GrantProjectQueryVariables>(GrantProjectDocument, options);
      }
export function useGrantProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrantProjectQuery, GrantProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GrantProjectQuery, GrantProjectQueryVariables>(GrantProjectDocument, options);
        }
export function useGrantProjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GrantProjectQuery, GrantProjectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GrantProjectQuery, GrantProjectQueryVariables>(GrantProjectDocument, options);
        }
export type GrantProjectQueryHookResult = ReturnType<typeof useGrantProjectQuery>;
export type GrantProjectLazyQueryHookResult = ReturnType<typeof useGrantProjectLazyQuery>;
export type GrantProjectSuspenseQueryHookResult = ReturnType<typeof useGrantProjectSuspenseQuery>;
export type GrantProjectQueryResult = Apollo.QueryResult<GrantProjectQuery, GrantProjectQueryVariables>;
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
    grantGuardiansFunding {
      contributedTotal
      contributorsCount
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
export function useGrantStatisticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GrantStatisticsQuery, GrantStatisticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GrantStatisticsQuery, GrantStatisticsQueryVariables>(GrantStatisticsDocument, options);
        }
export type GrantStatisticsQueryHookResult = ReturnType<typeof useGrantStatisticsQuery>;
export type GrantStatisticsLazyQueryHookResult = ReturnType<typeof useGrantStatisticsLazyQuery>;
export type GrantStatisticsSuspenseQueryHookResult = ReturnType<typeof useGrantStatisticsSuspenseQuery>;
export type GrantStatisticsQueryResult = Apollo.QueryResult<GrantStatisticsQuery, GrantStatisticsQueryVariables>;
export const GuardianProjectRewardsGetDocument = gql`
    query GuardianProjectRewardsGet($input: GetProjectRewardsInput!) {
  projectRewardsGet(input: $input) {
    ...GuardianProjectReward
  }
}
    ${GuardianProjectRewardFragmentDoc}`;

/**
 * __useGuardianProjectRewardsGetQuery__
 *
 * To run a query within a React component, call `useGuardianProjectRewardsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuardianProjectRewardsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuardianProjectRewardsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGuardianProjectRewardsGetQuery(baseOptions: Apollo.QueryHookOptions<GuardianProjectRewardsGetQuery, GuardianProjectRewardsGetQueryVariables> & ({ variables: GuardianProjectRewardsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GuardianProjectRewardsGetQuery, GuardianProjectRewardsGetQueryVariables>(GuardianProjectRewardsGetDocument, options);
      }
export function useGuardianProjectRewardsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GuardianProjectRewardsGetQuery, GuardianProjectRewardsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GuardianProjectRewardsGetQuery, GuardianProjectRewardsGetQueryVariables>(GuardianProjectRewardsGetDocument, options);
        }
export function useGuardianProjectRewardsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GuardianProjectRewardsGetQuery, GuardianProjectRewardsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GuardianProjectRewardsGetQuery, GuardianProjectRewardsGetQueryVariables>(GuardianProjectRewardsGetDocument, options);
        }
export type GuardianProjectRewardsGetQueryHookResult = ReturnType<typeof useGuardianProjectRewardsGetQuery>;
export type GuardianProjectRewardsGetLazyQueryHookResult = ReturnType<typeof useGuardianProjectRewardsGetLazyQuery>;
export type GuardianProjectRewardsGetSuspenseQueryHookResult = ReturnType<typeof useGuardianProjectRewardsGetSuspenseQuery>;
export type GuardianProjectRewardsGetQueryResult = Apollo.QueryResult<GuardianProjectRewardsGetQuery, GuardianProjectRewardsGetQueryVariables>;
export const GuardianUsersGetDocument = gql`
    query GuardianUsersGet($input: GuardianUsersGetInput!) {
  guardianUsersGet(input: $input) {
    guardianUsers {
      ...GuardianResult
    }
  }
}
    ${GuardianResultFragmentDoc}`;

/**
 * __useGuardianUsersGetQuery__
 *
 * To run a query within a React component, call `useGuardianUsersGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuardianUsersGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuardianUsersGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGuardianUsersGetQuery(baseOptions: Apollo.QueryHookOptions<GuardianUsersGetQuery, GuardianUsersGetQueryVariables> & ({ variables: GuardianUsersGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GuardianUsersGetQuery, GuardianUsersGetQueryVariables>(GuardianUsersGetDocument, options);
      }
export function useGuardianUsersGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GuardianUsersGetQuery, GuardianUsersGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GuardianUsersGetQuery, GuardianUsersGetQueryVariables>(GuardianUsersGetDocument, options);
        }
export function useGuardianUsersGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GuardianUsersGetQuery, GuardianUsersGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GuardianUsersGetQuery, GuardianUsersGetQueryVariables>(GuardianUsersGetDocument, options);
        }
export type GuardianUsersGetQueryHookResult = ReturnType<typeof useGuardianUsersGetQuery>;
export type GuardianUsersGetLazyQueryHookResult = ReturnType<typeof useGuardianUsersGetLazyQuery>;
export type GuardianUsersGetSuspenseQueryHookResult = ReturnType<typeof useGuardianUsersGetSuspenseQuery>;
export type GuardianUsersGetQueryResult = Apollo.QueryResult<GuardianUsersGetQuery, GuardianUsersGetQueryVariables>;
export const CancelUserSubscriptionDocument = gql`
    mutation CancelUserSubscription($id: BigInt!) {
  userSubscriptionCancel(id: $id) {
    ...UserSubscription
  }
}
    ${UserSubscriptionFragmentDoc}`;
export type CancelUserSubscriptionMutationFn = Apollo.MutationFunction<CancelUserSubscriptionMutation, CancelUserSubscriptionMutationVariables>;

/**
 * __useCancelUserSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelUserSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelUserSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelUserSubscriptionMutation, { data, loading, error }] = useCancelUserSubscriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelUserSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CancelUserSubscriptionMutation, CancelUserSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelUserSubscriptionMutation, CancelUserSubscriptionMutationVariables>(CancelUserSubscriptionDocument, options);
      }
export type CancelUserSubscriptionMutationHookResult = ReturnType<typeof useCancelUserSubscriptionMutation>;
export type CancelUserSubscriptionMutationResult = Apollo.MutationResult<CancelUserSubscriptionMutation>;
export type CancelUserSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelUserSubscriptionMutation, CancelUserSubscriptionMutationVariables>;
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
export const UserTaxProfileUpdateDocument = gql`
    mutation UserTaxProfileUpdate($input: UserTaxProfileUpdateInput!) {
  userTaxProfileUpdate(input: $input) {
    ...UserTaxProfile
  }
}
    ${UserTaxProfileFragmentDoc}`;
export type UserTaxProfileUpdateMutationFn = Apollo.MutationFunction<UserTaxProfileUpdateMutation, UserTaxProfileUpdateMutationVariables>;

/**
 * __useUserTaxProfileUpdateMutation__
 *
 * To run a mutation, you first call `useUserTaxProfileUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserTaxProfileUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userTaxProfileUpdateMutation, { data, loading, error }] = useUserTaxProfileUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserTaxProfileUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UserTaxProfileUpdateMutation, UserTaxProfileUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserTaxProfileUpdateMutation, UserTaxProfileUpdateMutationVariables>(UserTaxProfileUpdateDocument, options);
      }
export type UserTaxProfileUpdateMutationHookResult = ReturnType<typeof useUserTaxProfileUpdateMutation>;
export type UserTaxProfileUpdateMutationResult = Apollo.MutationResult<UserTaxProfileUpdateMutation>;
export type UserTaxProfileUpdateMutationOptions = Apollo.BaseMutationOptions<UserTaxProfileUpdateMutation, UserTaxProfileUpdateMutationVariables>;
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
export const BadgesDocument = gql`
    query Badges {
  badges {
    ...Badge
  }
}
    ${BadgeFragmentDoc}`;

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
export function useBadgesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BadgesQuery, BadgesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BadgesQuery, BadgesQueryVariables>(BadgesDocument, options);
        }
export type BadgesQueryHookResult = ReturnType<typeof useBadgesQuery>;
export type BadgesLazyQueryHookResult = ReturnType<typeof useBadgesLazyQuery>;
export type BadgesSuspenseQueryHookResult = ReturnType<typeof useBadgesSuspenseQuery>;
export type BadgesQueryResult = Apollo.QueryResult<BadgesQuery, BadgesQueryVariables>;
export const UserBadgesDocument = gql`
    query UserBadges($input: BadgesGetInput!) {
  userBadges(input: $input) {
    ...UserBadge
  }
}
    ${UserBadgeFragmentDoc}`;

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
export function useUserBadgesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserBadgesQuery, UserBadgesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserBadgesQuery, UserBadgesQueryVariables>(UserBadgesDocument, options);
        }
export type UserBadgesQueryHookResult = ReturnType<typeof useUserBadgesQuery>;
export type UserBadgesLazyQueryHookResult = ReturnType<typeof useUserBadgesLazyQuery>;
export type UserBadgesSuspenseQueryHookResult = ReturnType<typeof useUserBadgesSuspenseQuery>;
export type UserBadgesQueryResult = Apollo.QueryResult<UserBadgesQuery, UserBadgesQueryVariables>;
export const UserOrdersGetDocument = gql`
    query UserOrdersGet($input: OrdersGetInput!) {
  ordersGet(input: $input) {
    orders {
      ...ProfileOrder
    }
    pagination {
      count
      take
      cursor {
        id
      }
    }
  }
}
    ${ProfileOrderFragmentDoc}`;

/**
 * __useUserOrdersGetQuery__
 *
 * To run a query within a React component, call `useUserOrdersGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOrdersGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOrdersGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserOrdersGetQuery(baseOptions: Apollo.QueryHookOptions<UserOrdersGetQuery, UserOrdersGetQueryVariables> & ({ variables: UserOrdersGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserOrdersGetQuery, UserOrdersGetQueryVariables>(UserOrdersGetDocument, options);
      }
export function useUserOrdersGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserOrdersGetQuery, UserOrdersGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserOrdersGetQuery, UserOrdersGetQueryVariables>(UserOrdersGetDocument, options);
        }
export function useUserOrdersGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserOrdersGetQuery, UserOrdersGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserOrdersGetQuery, UserOrdersGetQueryVariables>(UserOrdersGetDocument, options);
        }
export type UserOrdersGetQueryHookResult = ReturnType<typeof useUserOrdersGetQuery>;
export type UserOrdersGetLazyQueryHookResult = ReturnType<typeof useUserOrdersGetLazyQuery>;
export type UserOrdersGetSuspenseQueryHookResult = ReturnType<typeof useUserOrdersGetSuspenseQuery>;
export type UserOrdersGetQueryResult = Apollo.QueryResult<UserOrdersGetQuery, UserOrdersGetQueryVariables>;
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
export function useProfileNotificationsSettingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProfileNotificationsSettingsQuery, ProfileNotificationsSettingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useUserNotificationsSettingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserNotificationsSettingsQuery, UserNotificationsSettingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectNotificationSettingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectNotificationSettingsQuery, ProjectNotificationSettingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectNotificationSettingsQuery, ProjectNotificationSettingsQueryVariables>(ProjectNotificationSettingsDocument, options);
        }
export type ProjectNotificationSettingsQueryHookResult = ReturnType<typeof useProjectNotificationSettingsQuery>;
export type ProjectNotificationSettingsLazyQueryHookResult = ReturnType<typeof useProjectNotificationSettingsLazyQuery>;
export type ProjectNotificationSettingsSuspenseQueryHookResult = ReturnType<typeof useProjectNotificationSettingsSuspenseQuery>;
export type ProjectNotificationSettingsQueryResult = Apollo.QueryResult<ProjectNotificationSettingsQuery, ProjectNotificationSettingsQueryVariables>;
export const ProjectForProfileContributionsDocument = gql`
    query ProjectForProfileContributions($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    ...ProjectForProfileContributions
  }
}
    ${ProjectForProfileContributionsFragmentDoc}`;

/**
 * __useProjectForProfileContributionsQuery__
 *
 * To run a query within a React component, call `useProjectForProfileContributionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectForProfileContributionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectForProfileContributionsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectForProfileContributionsQuery(baseOptions: Apollo.QueryHookOptions<ProjectForProfileContributionsQuery, ProjectForProfileContributionsQueryVariables> & ({ variables: ProjectForProfileContributionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectForProfileContributionsQuery, ProjectForProfileContributionsQueryVariables>(ProjectForProfileContributionsDocument, options);
      }
export function useProjectForProfileContributionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectForProfileContributionsQuery, ProjectForProfileContributionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectForProfileContributionsQuery, ProjectForProfileContributionsQueryVariables>(ProjectForProfileContributionsDocument, options);
        }
export function useProjectForProfileContributionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectForProfileContributionsQuery, ProjectForProfileContributionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectForProfileContributionsQuery, ProjectForProfileContributionsQueryVariables>(ProjectForProfileContributionsDocument, options);
        }
export type ProjectForProfileContributionsQueryHookResult = ReturnType<typeof useProjectForProfileContributionsQuery>;
export type ProjectForProfileContributionsLazyQueryHookResult = ReturnType<typeof useProjectForProfileContributionsLazyQuery>;
export type ProjectForProfileContributionsSuspenseQueryHookResult = ReturnType<typeof useProjectForProfileContributionsSuspenseQuery>;
export type ProjectForProfileContributionsQueryResult = Apollo.QueryResult<ProjectForProfileContributionsQuery, ProjectForProfileContributionsQueryVariables>;
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
export function useUserForProfilePageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserForProfilePageQuery, UserForProfilePageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useUserProfileProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserProfileProjectsQuery, UserProfileProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useUserFollowedProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>(UserFollowedProjectsDocument, options);
        }
export type UserFollowedProjectsQueryHookResult = ReturnType<typeof useUserFollowedProjectsQuery>;
export type UserFollowedProjectsLazyQueryHookResult = ReturnType<typeof useUserFollowedProjectsLazyQuery>;
export type UserFollowedProjectsSuspenseQueryHookResult = ReturnType<typeof useUserFollowedProjectsSuspenseQuery>;
export type UserFollowedProjectsQueryResult = Apollo.QueryResult<UserFollowedProjectsQuery, UserFollowedProjectsQueryVariables>;
export const UserProfileContributionsDocument = gql`
    query UserProfileContributions($where: UserGetInput!, $input: UserContributionsInput) {
  user(where: $where) {
    id
    contributions(input: $input) {
      ...UserProjectContribution
    }
  }
}
    ${UserProjectContributionFragmentDoc}`;

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
 *      input: // value for 'input'
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
export function useUserProfileContributionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>(UserProfileContributionsDocument, options);
        }
export type UserProfileContributionsQueryHookResult = ReturnType<typeof useUserProfileContributionsQuery>;
export type UserProfileContributionsLazyQueryHookResult = ReturnType<typeof useUserProfileContributionsLazyQuery>;
export type UserProfileContributionsSuspenseQueryHookResult = ReturnType<typeof useUserProfileContributionsSuspenseQuery>;
export type UserProfileContributionsQueryResult = Apollo.QueryResult<UserProfileContributionsQuery, UserProfileContributionsQueryVariables>;
export const UserHeroStatsDocument = gql`
    query UserHeroStats($where: UserGetInput!) {
  user(where: $where) {
    heroStats {
      ambassadorStats {
        contributionsCount
        contributionsTotalUsd
        contributionsTotal
        projectsCount
        rank
      }
      contributorStats {
        contributionsCount
        contributionsTotalUsd
        contributionsTotal
        projectsCount
        rank
      }
      creatorStats {
        contributionsCount
        contributionsTotalUsd
        contributionsTotal
        projectsCount
        rank
      }
    }
  }
}
    `;

/**
 * __useUserHeroStatsQuery__
 *
 * To run a query within a React component, call `useUserHeroStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserHeroStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserHeroStatsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserHeroStatsQuery(baseOptions: Apollo.QueryHookOptions<UserHeroStatsQuery, UserHeroStatsQueryVariables> & ({ variables: UserHeroStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserHeroStatsQuery, UserHeroStatsQueryVariables>(UserHeroStatsDocument, options);
      }
export function useUserHeroStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserHeroStatsQuery, UserHeroStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserHeroStatsQuery, UserHeroStatsQueryVariables>(UserHeroStatsDocument, options);
        }
export function useUserHeroStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserHeroStatsQuery, UserHeroStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserHeroStatsQuery, UserHeroStatsQueryVariables>(UserHeroStatsDocument, options);
        }
export type UserHeroStatsQueryHookResult = ReturnType<typeof useUserHeroStatsQuery>;
export type UserHeroStatsLazyQueryHookResult = ReturnType<typeof useUserHeroStatsLazyQuery>;
export type UserHeroStatsSuspenseQueryHookResult = ReturnType<typeof useUserHeroStatsSuspenseQuery>;
export type UserHeroStatsQueryResult = Apollo.QueryResult<UserHeroStatsQuery, UserHeroStatsQueryVariables>;
export const UserWalletDocument = gql`
    query UserWallet($where: UserGetInput!) {
  user(where: $where) {
    wallet {
      ...UserWalletConnectionDetails
    }
  }
}
    ${UserWalletConnectionDetailsFragmentDoc}`;

/**
 * __useUserWalletQuery__
 *
 * To run a query within a React component, call `useUserWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWalletQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserWalletQuery(baseOptions: Apollo.QueryHookOptions<UserWalletQuery, UserWalletQueryVariables> & ({ variables: UserWalletQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserWalletQuery, UserWalletQueryVariables>(UserWalletDocument, options);
      }
export function useUserWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserWalletQuery, UserWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserWalletQuery, UserWalletQueryVariables>(UserWalletDocument, options);
        }
export function useUserWalletSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserWalletQuery, UserWalletQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserWalletQuery, UserWalletQueryVariables>(UserWalletDocument, options);
        }
export type UserWalletQueryHookResult = ReturnType<typeof useUserWalletQuery>;
export type UserWalletLazyQueryHookResult = ReturnType<typeof useUserWalletLazyQuery>;
export type UserWalletSuspenseQueryHookResult = ReturnType<typeof useUserWalletSuspenseQuery>;
export type UserWalletQueryResult = Apollo.QueryResult<UserWalletQuery, UserWalletQueryVariables>;
export const UserTaxProfileDocument = gql`
    query UserTaxProfile($where: UserGetInput!) {
  user(where: $where) {
    taxProfile {
      ...UserTaxProfile
    }
  }
}
    ${UserTaxProfileFragmentDoc}`;

/**
 * __useUserTaxProfileQuery__
 *
 * To run a query within a React component, call `useUserTaxProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTaxProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTaxProfileQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserTaxProfileQuery(baseOptions: Apollo.QueryHookOptions<UserTaxProfileQuery, UserTaxProfileQueryVariables> & ({ variables: UserTaxProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTaxProfileQuery, UserTaxProfileQueryVariables>(UserTaxProfileDocument, options);
      }
export function useUserTaxProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTaxProfileQuery, UserTaxProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTaxProfileQuery, UserTaxProfileQueryVariables>(UserTaxProfileDocument, options);
        }
export function useUserTaxProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserTaxProfileQuery, UserTaxProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserTaxProfileQuery, UserTaxProfileQueryVariables>(UserTaxProfileDocument, options);
        }
export type UserTaxProfileQueryHookResult = ReturnType<typeof useUserTaxProfileQuery>;
export type UserTaxProfileLazyQueryHookResult = ReturnType<typeof useUserTaxProfileLazyQuery>;
export type UserTaxProfileSuspenseQueryHookResult = ReturnType<typeof useUserTaxProfileSuspenseQuery>;
export type UserTaxProfileQueryResult = Apollo.QueryResult<UserTaxProfileQuery, UserTaxProfileQueryVariables>;
export const UserSubscriptionsDocument = gql`
    query UserSubscriptions($input: UserSubscriptionsInput!) {
  userSubscriptions(input: $input) {
    ...UserSubscription
  }
}
    ${UserSubscriptionFragmentDoc}`;

/**
 * __useUserSubscriptionsQuery__
 *
 * To run a query within a React component, call `useUserSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSubscriptionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserSubscriptionsQuery(baseOptions: Apollo.QueryHookOptions<UserSubscriptionsQuery, UserSubscriptionsQueryVariables> & ({ variables: UserSubscriptionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>(UserSubscriptionsDocument, options);
      }
export function useUserSubscriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>(UserSubscriptionsDocument, options);
        }
export function useUserSubscriptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>(UserSubscriptionsDocument, options);
        }
export type UserSubscriptionsQueryHookResult = ReturnType<typeof useUserSubscriptionsQuery>;
export type UserSubscriptionsLazyQueryHookResult = ReturnType<typeof useUserSubscriptionsLazyQuery>;
export type UserSubscriptionsSuspenseQueryHookResult = ReturnType<typeof useUserSubscriptionsSuspenseQuery>;
export type UserSubscriptionsQueryResult = Apollo.QueryResult<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>;
export const AmbassadorAddDocument = gql`
    mutation AmbassadorAdd($input: AmbassadorAddInput!) {
  ambassadorAdd(input: $input) {
    id
    payoutRate
    user {
      id
      username
    }
  }
}
    `;
export type AmbassadorAddMutationFn = Apollo.MutationFunction<AmbassadorAddMutation, AmbassadorAddMutationVariables>;

/**
 * __useAmbassadorAddMutation__
 *
 * To run a mutation, you first call `useAmbassadorAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAmbassadorAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ambassadorAddMutation, { data, loading, error }] = useAmbassadorAddMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAmbassadorAddMutation(baseOptions?: Apollo.MutationHookOptions<AmbassadorAddMutation, AmbassadorAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AmbassadorAddMutation, AmbassadorAddMutationVariables>(AmbassadorAddDocument, options);
      }
export type AmbassadorAddMutationHookResult = ReturnType<typeof useAmbassadorAddMutation>;
export type AmbassadorAddMutationResult = Apollo.MutationResult<AmbassadorAddMutation>;
export type AmbassadorAddMutationOptions = Apollo.BaseMutationOptions<AmbassadorAddMutation, AmbassadorAddMutationVariables>;
export const AmbassadorUpdateDocument = gql`
    mutation AmbassadorUpdate($input: AmbassadorUpdateInput!) {
  ambassadorUpdate(input: $input) {
    id
    payoutRate
  }
}
    `;
export type AmbassadorUpdateMutationFn = Apollo.MutationFunction<AmbassadorUpdateMutation, AmbassadorUpdateMutationVariables>;

/**
 * __useAmbassadorUpdateMutation__
 *
 * To run a mutation, you first call `useAmbassadorUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAmbassadorUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ambassadorUpdateMutation, { data, loading, error }] = useAmbassadorUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAmbassadorUpdateMutation(baseOptions?: Apollo.MutationHookOptions<AmbassadorUpdateMutation, AmbassadorUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AmbassadorUpdateMutation, AmbassadorUpdateMutationVariables>(AmbassadorUpdateDocument, options);
      }
export type AmbassadorUpdateMutationHookResult = ReturnType<typeof useAmbassadorUpdateMutation>;
export type AmbassadorUpdateMutationResult = Apollo.MutationResult<AmbassadorUpdateMutation>;
export type AmbassadorUpdateMutationOptions = Apollo.BaseMutationOptions<AmbassadorUpdateMutation, AmbassadorUpdateMutationVariables>;
export const ContributionCreateDocument = gql`
    mutation ContributionCreate($input: ContributionCreateInput!) {
  contributionCreate(input: $input) {
    contribution {
      ...FundingContribution
    }
    payments {
      ...FundingContributionPaymentDetails
    }
  }
}
    ${FundingContributionFragmentDoc}
${FundingContributionPaymentDetailsFragmentDoc}`;
export type ContributionCreateMutationFn = Apollo.MutationFunction<ContributionCreateMutation, ContributionCreateMutationVariables>;

/**
 * __useContributionCreateMutation__
 *
 * To run a mutation, you first call `useContributionCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContributionCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contributionCreateMutation, { data, loading, error }] = useContributionCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContributionCreateMutation(baseOptions?: Apollo.MutationHookOptions<ContributionCreateMutation, ContributionCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ContributionCreateMutation, ContributionCreateMutationVariables>(ContributionCreateDocument, options);
      }
export type ContributionCreateMutationHookResult = ReturnType<typeof useContributionCreateMutation>;
export type ContributionCreateMutationResult = Apollo.MutationResult<ContributionCreateMutation>;
export type ContributionCreateMutationOptions = Apollo.BaseMutationOptions<ContributionCreateMutation, ContributionCreateMutationVariables>;
export const ContributionEmailUpdateDocument = gql`
    mutation ContributionEmailUpdate($input: ContributionEmailUpdateInput) {
  contributionEmailUpdate(input: $input) {
    id
    email
  }
}
    `;
export type ContributionEmailUpdateMutationFn = Apollo.MutationFunction<ContributionEmailUpdateMutation, ContributionEmailUpdateMutationVariables>;

/**
 * __useContributionEmailUpdateMutation__
 *
 * To run a mutation, you first call `useContributionEmailUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContributionEmailUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contributionEmailUpdateMutation, { data, loading, error }] = useContributionEmailUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContributionEmailUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ContributionEmailUpdateMutation, ContributionEmailUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ContributionEmailUpdateMutation, ContributionEmailUpdateMutationVariables>(ContributionEmailUpdateDocument, options);
      }
export type ContributionEmailUpdateMutationHookResult = ReturnType<typeof useContributionEmailUpdateMutation>;
export type ContributionEmailUpdateMutationResult = Apollo.MutationResult<ContributionEmailUpdateMutation>;
export type ContributionEmailUpdateMutationOptions = Apollo.BaseMutationOptions<ContributionEmailUpdateMutation, ContributionEmailUpdateMutationVariables>;
export const FundingFiatSwapPaymentCreateDocument = gql`
    mutation FundingFiatSwapPaymentCreate($input: ContributionPaymentsAddInput!) {
  contributionPaymentsAdd(input: $input) {
    payments {
      fiatSwap {
        checkoutUrl
      }
    }
  }
}
    `;
export type FundingFiatSwapPaymentCreateMutationFn = Apollo.MutationFunction<FundingFiatSwapPaymentCreateMutation, FundingFiatSwapPaymentCreateMutationVariables>;

/**
 * __useFundingFiatSwapPaymentCreateMutation__
 *
 * To run a mutation, you first call `useFundingFiatSwapPaymentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFundingFiatSwapPaymentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fundingFiatSwapPaymentCreateMutation, { data, loading, error }] = useFundingFiatSwapPaymentCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFundingFiatSwapPaymentCreateMutation(baseOptions?: Apollo.MutationHookOptions<FundingFiatSwapPaymentCreateMutation, FundingFiatSwapPaymentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FundingFiatSwapPaymentCreateMutation, FundingFiatSwapPaymentCreateMutationVariables>(FundingFiatSwapPaymentCreateDocument, options);
      }
export type FundingFiatSwapPaymentCreateMutationHookResult = ReturnType<typeof useFundingFiatSwapPaymentCreateMutation>;
export type FundingFiatSwapPaymentCreateMutationResult = Apollo.MutationResult<FundingFiatSwapPaymentCreateMutation>;
export type FundingFiatSwapPaymentCreateMutationOptions = Apollo.BaseMutationOptions<FundingFiatSwapPaymentCreateMutation, FundingFiatSwapPaymentCreateMutationVariables>;
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
export const PostRepostOnNostrDocument = gql`
    mutation PostRepostOnNostr($input: PostRepostOnNostrInput!) {
  postRepostOnNostr(input: $input) {
    success
  }
}
    `;
export type PostRepostOnNostrMutationFn = Apollo.MutationFunction<PostRepostOnNostrMutation, PostRepostOnNostrMutationVariables>;

/**
 * __usePostRepostOnNostrMutation__
 *
 * To run a mutation, you first call `usePostRepostOnNostrMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostRepostOnNostrMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postRepostOnNostrMutation, { data, loading, error }] = usePostRepostOnNostrMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostRepostOnNostrMutation(baseOptions?: Apollo.MutationHookOptions<PostRepostOnNostrMutation, PostRepostOnNostrMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostRepostOnNostrMutation, PostRepostOnNostrMutationVariables>(PostRepostOnNostrDocument, options);
      }
export type PostRepostOnNostrMutationHookResult = ReturnType<typeof usePostRepostOnNostrMutation>;
export type PostRepostOnNostrMutationResult = Apollo.MutationResult<PostRepostOnNostrMutation>;
export type PostRepostOnNostrMutationOptions = Apollo.BaseMutationOptions<PostRepostOnNostrMutation, PostRepostOnNostrMutationVariables>;
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
export const PostDeleteDocument = gql`
    mutation PostDelete($postDeleteId: BigInt!) {
  postDelete(id: $postDeleteId) {
    id
    title
  }
}
    `;
export type PostDeleteMutationFn = Apollo.MutationFunction<PostDeleteMutation, PostDeleteMutationVariables>;

/**
 * __usePostDeleteMutation__
 *
 * To run a mutation, you first call `usePostDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postDeleteMutation, { data, loading, error }] = usePostDeleteMutation({
 *   variables: {
 *      postDeleteId: // value for 'postDeleteId'
 *   },
 * });
 */
export function usePostDeleteMutation(baseOptions?: Apollo.MutationHookOptions<PostDeleteMutation, PostDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostDeleteMutation, PostDeleteMutationVariables>(PostDeleteDocument, options);
      }
export type PostDeleteMutationHookResult = ReturnType<typeof usePostDeleteMutation>;
export type PostDeleteMutationResult = Apollo.MutationResult<PostDeleteMutation>;
export type PostDeleteMutationOptions = Apollo.BaseMutationOptions<PostDeleteMutation, PostDeleteMutationVariables>;
export const PostCreateDocument = gql`
    mutation PostCreate($input: PostCreateInput!) {
  postCreate(input: $input) {
    ...ProjectPostView
  }
}
    ${ProjectPostViewFragmentDoc}`;
export type PostCreateMutationFn = Apollo.MutationFunction<PostCreateMutation, PostCreateMutationVariables>;

/**
 * __usePostCreateMutation__
 *
 * To run a mutation, you first call `usePostCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postCreateMutation, { data, loading, error }] = usePostCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostCreateMutation(baseOptions?: Apollo.MutationHookOptions<PostCreateMutation, PostCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostCreateMutation, PostCreateMutationVariables>(PostCreateDocument, options);
      }
export type PostCreateMutationHookResult = ReturnType<typeof usePostCreateMutation>;
export type PostCreateMutationResult = Apollo.MutationResult<PostCreateMutation>;
export type PostCreateMutationOptions = Apollo.BaseMutationOptions<PostCreateMutation, PostCreateMutationVariables>;
export const PostUpdateDocument = gql`
    mutation PostUpdate($input: PostUpdateInput!) {
  postUpdate(input: $input) {
    ...ProjectPostView
  }
}
    ${ProjectPostViewFragmentDoc}`;
export type PostUpdateMutationFn = Apollo.MutationFunction<PostUpdateMutation, PostUpdateMutationVariables>;

/**
 * __usePostUpdateMutation__
 *
 * To run a mutation, you first call `usePostUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postUpdateMutation, { data, loading, error }] = usePostUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostUpdateMutation(baseOptions?: Apollo.MutationHookOptions<PostUpdateMutation, PostUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostUpdateMutation, PostUpdateMutationVariables>(PostUpdateDocument, options);
      }
export type PostUpdateMutationHookResult = ReturnType<typeof usePostUpdateMutation>;
export type PostUpdateMutationResult = Apollo.MutationResult<PostUpdateMutation>;
export type PostUpdateMutationOptions = Apollo.BaseMutationOptions<PostUpdateMutation, PostUpdateMutationVariables>;
export const PostPublishDocument = gql`
    mutation PostPublish($input: PostPublishInput!) {
  postPublish(input: $input) {
    ...ProjectPostView
  }
}
    ${ProjectPostViewFragmentDoc}`;
export type PostPublishMutationFn = Apollo.MutationFunction<PostPublishMutation, PostPublishMutationVariables>;

/**
 * __usePostPublishMutation__
 *
 * To run a mutation, you first call `usePostPublishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostPublishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postPublishMutation, { data, loading, error }] = usePostPublishMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostPublishMutation(baseOptions?: Apollo.MutationHookOptions<PostPublishMutation, PostPublishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostPublishMutation, PostPublishMutationVariables>(PostPublishDocument, options);
      }
export type PostPublishMutationHookResult = ReturnType<typeof usePostPublishMutation>;
export type PostPublishMutationResult = Apollo.MutationResult<PostPublishMutation>;
export type PostPublishMutationOptions = Apollo.BaseMutationOptions<PostPublishMutation, PostPublishMutationVariables>;
export const PostSendByEmailDocument = gql`
    mutation PostSendByEmail($input: PostSendByEmailInput!) {
  postSendByEmail(input: $input) {
    recipientCount
  }
}
    `;
export type PostSendByEmailMutationFn = Apollo.MutationFunction<PostSendByEmailMutation, PostSendByEmailMutationVariables>;

/**
 * __usePostSendByEmailMutation__
 *
 * To run a mutation, you first call `usePostSendByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostSendByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postSendByEmailMutation, { data, loading, error }] = usePostSendByEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostSendByEmailMutation(baseOptions?: Apollo.MutationHookOptions<PostSendByEmailMutation, PostSendByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostSendByEmailMutation, PostSendByEmailMutationVariables>(PostSendByEmailDocument, options);
      }
export type PostSendByEmailMutationHookResult = ReturnType<typeof usePostSendByEmailMutation>;
export type PostSendByEmailMutationResult = Apollo.MutationResult<PostSendByEmailMutation>;
export type PostSendByEmailMutationOptions = Apollo.BaseMutationOptions<PostSendByEmailMutation, PostSendByEmailMutationVariables>;
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
export const ProjectPreLaunchDocument = gql`
    mutation ProjectPreLaunch($input: ProjectPreLaunchMutationInput!) {
  projectPreLaunch(input: $input) {
    id
    name
    status
  }
}
    `;
export type ProjectPreLaunchMutationFn = Apollo.MutationFunction<ProjectPreLaunchMutation, ProjectPreLaunchMutationVariables>;

/**
 * __useProjectPreLaunchMutation__
 *
 * To run a mutation, you first call `useProjectPreLaunchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectPreLaunchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectPreLaunchMutation, { data, loading, error }] = useProjectPreLaunchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectPreLaunchMutation(baseOptions?: Apollo.MutationHookOptions<ProjectPreLaunchMutation, ProjectPreLaunchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectPreLaunchMutation, ProjectPreLaunchMutationVariables>(ProjectPreLaunchDocument, options);
      }
export type ProjectPreLaunchMutationHookResult = ReturnType<typeof useProjectPreLaunchMutation>;
export type ProjectPreLaunchMutationResult = Apollo.MutationResult<ProjectPreLaunchMutation>;
export type ProjectPreLaunchMutationOptions = Apollo.BaseMutationOptions<ProjectPreLaunchMutation, ProjectPreLaunchMutationVariables>;
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
export const PublishNostrEventDocument = gql`
    mutation PublishNostrEvent($event: String!) {
  publishNostrEvent(event: $event)
}
    `;
export type PublishNostrEventMutationFn = Apollo.MutationFunction<PublishNostrEventMutation, PublishNostrEventMutationVariables>;

/**
 * __usePublishNostrEventMutation__
 *
 * To run a mutation, you first call `usePublishNostrEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishNostrEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishNostrEventMutation, { data, loading, error }] = usePublishNostrEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function usePublishNostrEventMutation(baseOptions?: Apollo.MutationHookOptions<PublishNostrEventMutation, PublishNostrEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishNostrEventMutation, PublishNostrEventMutationVariables>(PublishNostrEventDocument, options);
      }
export type PublishNostrEventMutationHookResult = ReturnType<typeof usePublishNostrEventMutation>;
export type PublishNostrEventMutationResult = Apollo.MutationResult<PublishNostrEventMutation>;
export type PublishNostrEventMutationOptions = Apollo.BaseMutationOptions<PublishNostrEventMutation, PublishNostrEventMutationVariables>;
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
export const ProjectShippingConfigCreateDocument = gql`
    mutation ProjectShippingConfigCreate($input: CreateProjectShippingConfigInput!) {
  projectShippingConfigCreate(input: $input) {
    ...ShippingConfig
  }
}
    ${ShippingConfigFragmentDoc}`;
export type ProjectShippingConfigCreateMutationFn = Apollo.MutationFunction<ProjectShippingConfigCreateMutation, ProjectShippingConfigCreateMutationVariables>;

/**
 * __useProjectShippingConfigCreateMutation__
 *
 * To run a mutation, you first call `useProjectShippingConfigCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectShippingConfigCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectShippingConfigCreateMutation, { data, loading, error }] = useProjectShippingConfigCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectShippingConfigCreateMutation(baseOptions?: Apollo.MutationHookOptions<ProjectShippingConfigCreateMutation, ProjectShippingConfigCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectShippingConfigCreateMutation, ProjectShippingConfigCreateMutationVariables>(ProjectShippingConfigCreateDocument, options);
      }
export type ProjectShippingConfigCreateMutationHookResult = ReturnType<typeof useProjectShippingConfigCreateMutation>;
export type ProjectShippingConfigCreateMutationResult = Apollo.MutationResult<ProjectShippingConfigCreateMutation>;
export type ProjectShippingConfigCreateMutationOptions = Apollo.BaseMutationOptions<ProjectShippingConfigCreateMutation, ProjectShippingConfigCreateMutationVariables>;
export const ProjectShippingConfigUpdateDocument = gql`
    mutation ProjectShippingConfigUpdate($input: UpdateProjectShippingConfigInput!) {
  projectShippingConfigUpdate(input: $input) {
    ...ShippingConfig
  }
}
    ${ShippingConfigFragmentDoc}`;
export type ProjectShippingConfigUpdateMutationFn = Apollo.MutationFunction<ProjectShippingConfigUpdateMutation, ProjectShippingConfigUpdateMutationVariables>;

/**
 * __useProjectShippingConfigUpdateMutation__
 *
 * To run a mutation, you first call `useProjectShippingConfigUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectShippingConfigUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectShippingConfigUpdateMutation, { data, loading, error }] = useProjectShippingConfigUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectShippingConfigUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ProjectShippingConfigUpdateMutation, ProjectShippingConfigUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectShippingConfigUpdateMutation, ProjectShippingConfigUpdateMutationVariables>(ProjectShippingConfigUpdateDocument, options);
      }
export type ProjectShippingConfigUpdateMutationHookResult = ReturnType<typeof useProjectShippingConfigUpdateMutation>;
export type ProjectShippingConfigUpdateMutationResult = Apollo.MutationResult<ProjectShippingConfigUpdateMutation>;
export type ProjectShippingConfigUpdateMutationOptions = Apollo.BaseMutationOptions<ProjectShippingConfigUpdateMutation, ProjectShippingConfigUpdateMutationVariables>;
export const ShippingAddressCreateDocument = gql`
    mutation ShippingAddressCreate($input: ShippingAddressCreateInput!) {
  shippingAddressCreate(input: $input) {
    ...ShippingAddress
  }
}
    ${ShippingAddressFragmentDoc}`;
export type ShippingAddressCreateMutationFn = Apollo.MutationFunction<ShippingAddressCreateMutation, ShippingAddressCreateMutationVariables>;

/**
 * __useShippingAddressCreateMutation__
 *
 * To run a mutation, you first call `useShippingAddressCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShippingAddressCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shippingAddressCreateMutation, { data, loading, error }] = useShippingAddressCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useShippingAddressCreateMutation(baseOptions?: Apollo.MutationHookOptions<ShippingAddressCreateMutation, ShippingAddressCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShippingAddressCreateMutation, ShippingAddressCreateMutationVariables>(ShippingAddressCreateDocument, options);
      }
export type ShippingAddressCreateMutationHookResult = ReturnType<typeof useShippingAddressCreateMutation>;
export type ShippingAddressCreateMutationResult = Apollo.MutationResult<ShippingAddressCreateMutation>;
export type ShippingAddressCreateMutationOptions = Apollo.BaseMutationOptions<ShippingAddressCreateMutation, ShippingAddressCreateMutationVariables>;
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
export const UserVerificationTokenGenerateDocument = gql`
    mutation UserVerificationTokenGenerate($input: UserVerificationTokenGenerateInput!) {
  userVerificationTokenGenerate(input: $input) {
    token
    verificationLevel
  }
}
    `;
export type UserVerificationTokenGenerateMutationFn = Apollo.MutationFunction<UserVerificationTokenGenerateMutation, UserVerificationTokenGenerateMutationVariables>;

/**
 * __useUserVerificationTokenGenerateMutation__
 *
 * To run a mutation, you first call `useUserVerificationTokenGenerateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserVerificationTokenGenerateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userVerificationTokenGenerateMutation, { data, loading, error }] = useUserVerificationTokenGenerateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserVerificationTokenGenerateMutation(baseOptions?: Apollo.MutationHookOptions<UserVerificationTokenGenerateMutation, UserVerificationTokenGenerateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserVerificationTokenGenerateMutation, UserVerificationTokenGenerateMutationVariables>(UserVerificationTokenGenerateDocument, options);
      }
export type UserVerificationTokenGenerateMutationHookResult = ReturnType<typeof useUserVerificationTokenGenerateMutation>;
export type UserVerificationTokenGenerateMutationResult = Apollo.MutationResult<UserVerificationTokenGenerateMutation>;
export type UserVerificationTokenGenerateMutationOptions = Apollo.BaseMutationOptions<UserVerificationTokenGenerateMutation, UserVerificationTokenGenerateMutationVariables>;
export const CreateWalletDocument = gql`
    mutation CreateWallet($input: CreateWalletInput!) {
  walletCreate(input: $input) {
    ...ProjectPageWalletCreationDetails
  }
}
    ${ProjectPageWalletCreationDetailsFragmentDoc}`;
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
export const GeyserPromotionsContributionStatsDocument = gql`
    query GeyserPromotionsContributionStats($input: GeyserPromotionsContributionStatsInput!) {
  geyserPromotionsContributionStats(input: $input) {
    contributionsCount
    contributionsSum
    contributionsSumUsd
  }
}
    `;

/**
 * __useGeyserPromotionsContributionStatsQuery__
 *
 * To run a query within a React component, call `useGeyserPromotionsContributionStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeyserPromotionsContributionStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeyserPromotionsContributionStatsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGeyserPromotionsContributionStatsQuery(baseOptions: Apollo.QueryHookOptions<GeyserPromotionsContributionStatsQuery, GeyserPromotionsContributionStatsQueryVariables> & ({ variables: GeyserPromotionsContributionStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeyserPromotionsContributionStatsQuery, GeyserPromotionsContributionStatsQueryVariables>(GeyserPromotionsContributionStatsDocument, options);
      }
export function useGeyserPromotionsContributionStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeyserPromotionsContributionStatsQuery, GeyserPromotionsContributionStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeyserPromotionsContributionStatsQuery, GeyserPromotionsContributionStatsQueryVariables>(GeyserPromotionsContributionStatsDocument, options);
        }
export function useGeyserPromotionsContributionStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GeyserPromotionsContributionStatsQuery, GeyserPromotionsContributionStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GeyserPromotionsContributionStatsQuery, GeyserPromotionsContributionStatsQueryVariables>(GeyserPromotionsContributionStatsDocument, options);
        }
export type GeyserPromotionsContributionStatsQueryHookResult = ReturnType<typeof useGeyserPromotionsContributionStatsQuery>;
export type GeyserPromotionsContributionStatsLazyQueryHookResult = ReturnType<typeof useGeyserPromotionsContributionStatsLazyQuery>;
export type GeyserPromotionsContributionStatsSuspenseQueryHookResult = ReturnType<typeof useGeyserPromotionsContributionStatsSuspenseQuery>;
export type GeyserPromotionsContributionStatsQueryResult = Apollo.QueryResult<GeyserPromotionsContributionStatsQuery, GeyserPromotionsContributionStatsQueryVariables>;
export const ProjectAmbassadorStatsDocument = gql`
    query ProjectAmbassadorStats($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    ambassadors {
      stats {
        contributionsCount
        contributionsSum
        count
      }
    }
  }
}
    `;

/**
 * __useProjectAmbassadorStatsQuery__
 *
 * To run a query within a React component, call `useProjectAmbassadorStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectAmbassadorStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectAmbassadorStatsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectAmbassadorStatsQuery(baseOptions: Apollo.QueryHookOptions<ProjectAmbassadorStatsQuery, ProjectAmbassadorStatsQueryVariables> & ({ variables: ProjectAmbassadorStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectAmbassadorStatsQuery, ProjectAmbassadorStatsQueryVariables>(ProjectAmbassadorStatsDocument, options);
      }
export function useProjectAmbassadorStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectAmbassadorStatsQuery, ProjectAmbassadorStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectAmbassadorStatsQuery, ProjectAmbassadorStatsQueryVariables>(ProjectAmbassadorStatsDocument, options);
        }
export function useProjectAmbassadorStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectAmbassadorStatsQuery, ProjectAmbassadorStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectAmbassadorStatsQuery, ProjectAmbassadorStatsQueryVariables>(ProjectAmbassadorStatsDocument, options);
        }
export type ProjectAmbassadorStatsQueryHookResult = ReturnType<typeof useProjectAmbassadorStatsQuery>;
export type ProjectAmbassadorStatsLazyQueryHookResult = ReturnType<typeof useProjectAmbassadorStatsLazyQuery>;
export type ProjectAmbassadorStatsSuspenseQueryHookResult = ReturnType<typeof useProjectAmbassadorStatsSuspenseQuery>;
export type ProjectAmbassadorStatsQueryResult = Apollo.QueryResult<ProjectAmbassadorStatsQuery, ProjectAmbassadorStatsQueryVariables>;
export const ProjectAmbassadorListDocument = gql`
    query ProjectAmbassadorList($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    ambassadors {
      edges {
        node {
          id
          payoutRate
          contributionsCount
          user {
            imageUrl
            username
            heroId
            id
          }
        }
      }
    }
  }
}
    `;

/**
 * __useProjectAmbassadorListQuery__
 *
 * To run a query within a React component, call `useProjectAmbassadorListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectAmbassadorListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectAmbassadorListQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectAmbassadorListQuery(baseOptions: Apollo.QueryHookOptions<ProjectAmbassadorListQuery, ProjectAmbassadorListQueryVariables> & ({ variables: ProjectAmbassadorListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectAmbassadorListQuery, ProjectAmbassadorListQueryVariables>(ProjectAmbassadorListDocument, options);
      }
export function useProjectAmbassadorListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectAmbassadorListQuery, ProjectAmbassadorListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectAmbassadorListQuery, ProjectAmbassadorListQueryVariables>(ProjectAmbassadorListDocument, options);
        }
export function useProjectAmbassadorListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectAmbassadorListQuery, ProjectAmbassadorListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectAmbassadorListQuery, ProjectAmbassadorListQueryVariables>(ProjectAmbassadorListDocument, options);
        }
export type ProjectAmbassadorListQueryHookResult = ReturnType<typeof useProjectAmbassadorListQuery>;
export type ProjectAmbassadorListLazyQueryHookResult = ReturnType<typeof useProjectAmbassadorListLazyQuery>;
export type ProjectAmbassadorListSuspenseQueryHookResult = ReturnType<typeof useProjectAmbassadorListSuspenseQuery>;
export type ProjectAmbassadorListQueryResult = Apollo.QueryResult<ProjectAmbassadorListQuery, ProjectAmbassadorListQueryVariables>;
export const OrderContributionsGetDocument = gql`
    query OrderContributionsGet($input: GetContributionsInput) {
  contributionsGet(input: $input) {
    pagination {
      ...Pagination
    }
    contributions {
      ...OrderContribution
    }
  }
}
    ${PaginationFragmentDoc}
${OrderContributionFragmentDoc}`;

/**
 * __useOrderContributionsGetQuery__
 *
 * To run a query within a React component, call `useOrderContributionsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderContributionsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderContributionsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderContributionsGetQuery(baseOptions?: Apollo.QueryHookOptions<OrderContributionsGetQuery, OrderContributionsGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderContributionsGetQuery, OrderContributionsGetQueryVariables>(OrderContributionsGetDocument, options);
      }
export function useOrderContributionsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderContributionsGetQuery, OrderContributionsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderContributionsGetQuery, OrderContributionsGetQueryVariables>(OrderContributionsGetDocument, options);
        }
export function useOrderContributionsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderContributionsGetQuery, OrderContributionsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderContributionsGetQuery, OrderContributionsGetQueryVariables>(OrderContributionsGetDocument, options);
        }
export type OrderContributionsGetQueryHookResult = ReturnType<typeof useOrderContributionsGetQuery>;
export type OrderContributionsGetLazyQueryHookResult = ReturnType<typeof useOrderContributionsGetLazyQuery>;
export type OrderContributionsGetSuspenseQueryHookResult = ReturnType<typeof useOrderContributionsGetSuspenseQuery>;
export type OrderContributionsGetQueryResult = Apollo.QueryResult<OrderContributionsGetQuery, OrderContributionsGetQueryVariables>;
export const ContributionWithInvoiceStatusGetDocument = gql`
    query ContributionWithInvoiceStatusGet($contributionId: BigInt!) {
  contribution(id: $contributionId) {
    ...ContributionWithInvoiceStatus
  }
}
    ${ContributionWithInvoiceStatusFragmentDoc}`;

/**
 * __useContributionWithInvoiceStatusGetQuery__
 *
 * To run a query within a React component, call `useContributionWithInvoiceStatusGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useContributionWithInvoiceStatusGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContributionWithInvoiceStatusGetQuery({
 *   variables: {
 *      contributionId: // value for 'contributionId'
 *   },
 * });
 */
export function useContributionWithInvoiceStatusGetQuery(baseOptions: Apollo.QueryHookOptions<ContributionWithInvoiceStatusGetQuery, ContributionWithInvoiceStatusGetQueryVariables> & ({ variables: ContributionWithInvoiceStatusGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContributionWithInvoiceStatusGetQuery, ContributionWithInvoiceStatusGetQueryVariables>(ContributionWithInvoiceStatusGetDocument, options);
      }
export function useContributionWithInvoiceStatusGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContributionWithInvoiceStatusGetQuery, ContributionWithInvoiceStatusGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContributionWithInvoiceStatusGetQuery, ContributionWithInvoiceStatusGetQueryVariables>(ContributionWithInvoiceStatusGetDocument, options);
        }
export function useContributionWithInvoiceStatusGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ContributionWithInvoiceStatusGetQuery, ContributionWithInvoiceStatusGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContributionWithInvoiceStatusGetQuery, ContributionWithInvoiceStatusGetQueryVariables>(ContributionWithInvoiceStatusGetDocument, options);
        }
export type ContributionWithInvoiceStatusGetQueryHookResult = ReturnType<typeof useContributionWithInvoiceStatusGetQuery>;
export type ContributionWithInvoiceStatusGetLazyQueryHookResult = ReturnType<typeof useContributionWithInvoiceStatusGetLazyQuery>;
export type ContributionWithInvoiceStatusGetSuspenseQueryHookResult = ReturnType<typeof useContributionWithInvoiceStatusGetSuspenseQuery>;
export type ContributionWithInvoiceStatusGetQueryResult = Apollo.QueryResult<ContributionWithInvoiceStatusGetQuery, ContributionWithInvoiceStatusGetQueryVariables>;
export const ContributionForDownloadInvoiceGetDocument = gql`
    query ContributionForDownloadInvoiceGet($contributionId: BigInt!) {
  contribution(id: $contributionId) {
    ...ContributionForDownloadInvoice
  }
}
    ${ContributionForDownloadInvoiceFragmentDoc}`;

/**
 * __useContributionForDownloadInvoiceGetQuery__
 *
 * To run a query within a React component, call `useContributionForDownloadInvoiceGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useContributionForDownloadInvoiceGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContributionForDownloadInvoiceGetQuery({
 *   variables: {
 *      contributionId: // value for 'contributionId'
 *   },
 * });
 */
export function useContributionForDownloadInvoiceGetQuery(baseOptions: Apollo.QueryHookOptions<ContributionForDownloadInvoiceGetQuery, ContributionForDownloadInvoiceGetQueryVariables> & ({ variables: ContributionForDownloadInvoiceGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContributionForDownloadInvoiceGetQuery, ContributionForDownloadInvoiceGetQueryVariables>(ContributionForDownloadInvoiceGetDocument, options);
      }
export function useContributionForDownloadInvoiceGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContributionForDownloadInvoiceGetQuery, ContributionForDownloadInvoiceGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContributionForDownloadInvoiceGetQuery, ContributionForDownloadInvoiceGetQueryVariables>(ContributionForDownloadInvoiceGetDocument, options);
        }
export function useContributionForDownloadInvoiceGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ContributionForDownloadInvoiceGetQuery, ContributionForDownloadInvoiceGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContributionForDownloadInvoiceGetQuery, ContributionForDownloadInvoiceGetQueryVariables>(ContributionForDownloadInvoiceGetDocument, options);
        }
export type ContributionForDownloadInvoiceGetQueryHookResult = ReturnType<typeof useContributionForDownloadInvoiceGetQuery>;
export type ContributionForDownloadInvoiceGetLazyQueryHookResult = ReturnType<typeof useContributionForDownloadInvoiceGetLazyQuery>;
export type ContributionForDownloadInvoiceGetSuspenseQueryHookResult = ReturnType<typeof useContributionForDownloadInvoiceGetSuspenseQuery>;
export type ContributionForDownloadInvoiceGetQueryResult = Apollo.QueryResult<ContributionForDownloadInvoiceGetQuery, ContributionForDownloadInvoiceGetQueryVariables>;
export const ProjectPageContributionsGetDocument = gql`
    query ProjectPageContributionsGet($input: GetContributionsInput) {
  contributionsGet(input: $input) {
    contributions {
      ...ProjectContribution
    }
  }
}
    ${ProjectContributionFragmentDoc}`;

/**
 * __useProjectPageContributionsGetQuery__
 *
 * To run a query within a React component, call `useProjectPageContributionsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPageContributionsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPageContributionsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectPageContributionsGetQuery(baseOptions?: Apollo.QueryHookOptions<ProjectPageContributionsGetQuery, ProjectPageContributionsGetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPageContributionsGetQuery, ProjectPageContributionsGetQueryVariables>(ProjectPageContributionsGetDocument, options);
      }
export function useProjectPageContributionsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPageContributionsGetQuery, ProjectPageContributionsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPageContributionsGetQuery, ProjectPageContributionsGetQueryVariables>(ProjectPageContributionsGetDocument, options);
        }
export function useProjectPageContributionsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectPageContributionsGetQuery, ProjectPageContributionsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectPageContributionsGetQuery, ProjectPageContributionsGetQueryVariables>(ProjectPageContributionsGetDocument, options);
        }
export type ProjectPageContributionsGetQueryHookResult = ReturnType<typeof useProjectPageContributionsGetQuery>;
export type ProjectPageContributionsGetLazyQueryHookResult = ReturnType<typeof useProjectPageContributionsGetLazyQuery>;
export type ProjectPageContributionsGetSuspenseQueryHookResult = ReturnType<typeof useProjectPageContributionsGetSuspenseQuery>;
export type ProjectPageContributionsGetQueryResult = Apollo.QueryResult<ProjectPageContributionsGetQuery, ProjectPageContributionsGetQueryVariables>;
export const UserEmailIsAvailableDocument = gql`
    query UserEmailIsAvailable($email: String!) {
  userEmailIsAvailable(email: $email)
}
    `;

/**
 * __useUserEmailIsAvailableQuery__
 *
 * To run a query within a React component, call `useUserEmailIsAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserEmailIsAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserEmailIsAvailableQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserEmailIsAvailableQuery(baseOptions: Apollo.QueryHookOptions<UserEmailIsAvailableQuery, UserEmailIsAvailableQueryVariables> & ({ variables: UserEmailIsAvailableQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserEmailIsAvailableQuery, UserEmailIsAvailableQueryVariables>(UserEmailIsAvailableDocument, options);
      }
export function useUserEmailIsAvailableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserEmailIsAvailableQuery, UserEmailIsAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserEmailIsAvailableQuery, UserEmailIsAvailableQueryVariables>(UserEmailIsAvailableDocument, options);
        }
export function useUserEmailIsAvailableSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserEmailIsAvailableQuery, UserEmailIsAvailableQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserEmailIsAvailableQuery, UserEmailIsAvailableQueryVariables>(UserEmailIsAvailableDocument, options);
        }
export type UserEmailIsAvailableQueryHookResult = ReturnType<typeof useUserEmailIsAvailableQuery>;
export type UserEmailIsAvailableLazyQueryHookResult = ReturnType<typeof useUserEmailIsAvailableLazyQuery>;
export type UserEmailIsAvailableSuspenseQueryHookResult = ReturnType<typeof useUserEmailIsAvailableSuspenseQuery>;
export type UserEmailIsAvailableQueryResult = Apollo.QueryResult<UserEmailIsAvailableQuery, UserEmailIsAvailableQueryVariables>;
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
export function useProjectEntriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectEntriesQuery, ProjectEntriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectUnplublishedEntriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectUnplublishedEntriesQuery, ProjectUnplublishedEntriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectEntrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectEntryQuery, ProjectEntryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectEntryQuery, ProjectEntryQueryVariables>(ProjectEntryDocument, options);
        }
export type ProjectEntryQueryHookResult = ReturnType<typeof useProjectEntryQuery>;
export type ProjectEntryLazyQueryHookResult = ReturnType<typeof useProjectEntryLazyQuery>;
export type ProjectEntrySuspenseQueryHookResult = ReturnType<typeof useProjectEntrySuspenseQuery>;
export type ProjectEntryQueryResult = Apollo.QueryResult<ProjectEntryQuery, ProjectEntryQueryVariables>;
export const ProjectFollowersDocument = gql`
    query ProjectFollowers($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    followers {
      ...UserAvatar
    }
  }
}
    ${UserAvatarFragmentDoc}`;

/**
 * __useProjectFollowersQuery__
 *
 * To run a query within a React component, call `useProjectFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectFollowersQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectFollowersQuery(baseOptions: Apollo.QueryHookOptions<ProjectFollowersQuery, ProjectFollowersQueryVariables> & ({ variables: ProjectFollowersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectFollowersQuery, ProjectFollowersQueryVariables>(ProjectFollowersDocument, options);
      }
export function useProjectFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectFollowersQuery, ProjectFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectFollowersQuery, ProjectFollowersQueryVariables>(ProjectFollowersDocument, options);
        }
export function useProjectFollowersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectFollowersQuery, ProjectFollowersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectFollowersQuery, ProjectFollowersQueryVariables>(ProjectFollowersDocument, options);
        }
export type ProjectFollowersQueryHookResult = ReturnType<typeof useProjectFollowersQuery>;
export type ProjectFollowersLazyQueryHookResult = ReturnType<typeof useProjectFollowersLazyQuery>;
export type ProjectFollowersSuspenseQueryHookResult = ReturnType<typeof useProjectFollowersSuspenseQuery>;
export type ProjectFollowersQueryResult = Apollo.QueryResult<ProjectFollowersQuery, ProjectFollowersQueryVariables>;
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
export function useProjectPageFundersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectPageFundersQuery, ProjectPageFundersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectLeaderboardContributorsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectLeaderboardContributorsGetQuery, ProjectLeaderboardContributorsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectLeaderboardContributorsGetQuery, ProjectLeaderboardContributorsGetQueryVariables>(ProjectLeaderboardContributorsGetDocument, options);
        }
export type ProjectLeaderboardContributorsGetQueryHookResult = ReturnType<typeof useProjectLeaderboardContributorsGetQuery>;
export type ProjectLeaderboardContributorsGetLazyQueryHookResult = ReturnType<typeof useProjectLeaderboardContributorsGetLazyQuery>;
export type ProjectLeaderboardContributorsGetSuspenseQueryHookResult = ReturnType<typeof useProjectLeaderboardContributorsGetSuspenseQuery>;
export type ProjectLeaderboardContributorsGetQueryResult = Apollo.QueryResult<ProjectLeaderboardContributorsGetQuery, ProjectLeaderboardContributorsGetQueryVariables>;
export const ProjectLeaderboardAmbassadorsGetDocument = gql`
    query ProjectLeaderboardAmbassadorsGet($input: ProjectLeaderboardAmbassadorsGetInput!) {
  projectLeaderboardAmbassadorsGet(input: $input) {
    ...ProjectLeaderboardAmbassadors
  }
}
    ${ProjectLeaderboardAmbassadorsFragmentDoc}`;

/**
 * __useProjectLeaderboardAmbassadorsGetQuery__
 *
 * To run a query within a React component, call `useProjectLeaderboardAmbassadorsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectLeaderboardAmbassadorsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectLeaderboardAmbassadorsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectLeaderboardAmbassadorsGetQuery(baseOptions: Apollo.QueryHookOptions<ProjectLeaderboardAmbassadorsGetQuery, ProjectLeaderboardAmbassadorsGetQueryVariables> & ({ variables: ProjectLeaderboardAmbassadorsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectLeaderboardAmbassadorsGetQuery, ProjectLeaderboardAmbassadorsGetQueryVariables>(ProjectLeaderboardAmbassadorsGetDocument, options);
      }
export function useProjectLeaderboardAmbassadorsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectLeaderboardAmbassadorsGetQuery, ProjectLeaderboardAmbassadorsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectLeaderboardAmbassadorsGetQuery, ProjectLeaderboardAmbassadorsGetQueryVariables>(ProjectLeaderboardAmbassadorsGetDocument, options);
        }
export function useProjectLeaderboardAmbassadorsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectLeaderboardAmbassadorsGetQuery, ProjectLeaderboardAmbassadorsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectLeaderboardAmbassadorsGetQuery, ProjectLeaderboardAmbassadorsGetQueryVariables>(ProjectLeaderboardAmbassadorsGetDocument, options);
        }
export type ProjectLeaderboardAmbassadorsGetQueryHookResult = ReturnType<typeof useProjectLeaderboardAmbassadorsGetQuery>;
export type ProjectLeaderboardAmbassadorsGetLazyQueryHookResult = ReturnType<typeof useProjectLeaderboardAmbassadorsGetLazyQuery>;
export type ProjectLeaderboardAmbassadorsGetSuspenseQueryHookResult = ReturnType<typeof useProjectLeaderboardAmbassadorsGetSuspenseQuery>;
export type ProjectLeaderboardAmbassadorsGetQueryResult = Apollo.QueryResult<ProjectLeaderboardAmbassadorsGetQuery, ProjectLeaderboardAmbassadorsGetQueryVariables>;
export const ProjectUserContributorDocument = gql`
    query ProjectUserContributor($input: GetContributorInput!, $period: ContributionsSummaryPeriod) {
  contributor(input: $input) {
    ...UserContributor
    contributionsSummary(period: $period) {
      ...ContributorContributionsSummary
    }
  }
}
    ${UserContributorFragmentDoc}
${ContributorContributionsSummaryFragmentDoc}`;

/**
 * __useProjectUserContributorQuery__
 *
 * To run a query within a React component, call `useProjectUserContributorQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectUserContributorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectUserContributorQuery({
 *   variables: {
 *      input: // value for 'input'
 *      period: // value for 'period'
 *   },
 * });
 */
export function useProjectUserContributorQuery(baseOptions: Apollo.QueryHookOptions<ProjectUserContributorQuery, ProjectUserContributorQueryVariables> & ({ variables: ProjectUserContributorQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectUserContributorQuery, ProjectUserContributorQueryVariables>(ProjectUserContributorDocument, options);
      }
export function useProjectUserContributorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectUserContributorQuery, ProjectUserContributorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectUserContributorQuery, ProjectUserContributorQueryVariables>(ProjectUserContributorDocument, options);
        }
export function useProjectUserContributorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectUserContributorQuery, ProjectUserContributorQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectUserContributorQuery, ProjectUserContributorQueryVariables>(ProjectUserContributorDocument, options);
        }
export type ProjectUserContributorQueryHookResult = ReturnType<typeof useProjectUserContributorQuery>;
export type ProjectUserContributorLazyQueryHookResult = ReturnType<typeof useProjectUserContributorLazyQuery>;
export type ProjectUserContributorSuspenseQueryHookResult = ReturnType<typeof useProjectUserContributorSuspenseQuery>;
export type ProjectUserContributorQueryResult = Apollo.QueryResult<ProjectUserContributorQuery, ProjectUserContributorQueryVariables>;
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
export function useProjectInProgressGoalsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectInProgressGoalsQuery, ProjectInProgressGoalsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectCompletedGoalsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectCompletedGoalsQuery, ProjectCompletedGoalsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectCompletedGoalsQuery, ProjectCompletedGoalsQueryVariables>(ProjectCompletedGoalsDocument, options);
        }
export type ProjectCompletedGoalsQueryHookResult = ReturnType<typeof useProjectCompletedGoalsQuery>;
export type ProjectCompletedGoalsLazyQueryHookResult = ReturnType<typeof useProjectCompletedGoalsLazyQuery>;
export type ProjectCompletedGoalsSuspenseQueryHookResult = ReturnType<typeof useProjectCompletedGoalsSuspenseQuery>;
export type ProjectCompletedGoalsQueryResult = Apollo.QueryResult<ProjectCompletedGoalsQuery, ProjectCompletedGoalsQueryVariables>;
export const ProjectGoalDocument = gql`
    query ProjectGoal($input: BigInt!) {
  projectGoal(projectGoalId: $input) {
    posts {
      id
      title
      postType
      description
      createdAt
    }
    ...ProjectGoals
  }
}
    ${ProjectGoalsFragmentDoc}`;

/**
 * __useProjectGoalQuery__
 *
 * To run a query within a React component, call `useProjectGoalQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectGoalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectGoalQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectGoalQuery(baseOptions: Apollo.QueryHookOptions<ProjectGoalQuery, ProjectGoalQueryVariables> & ({ variables: ProjectGoalQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectGoalQuery, ProjectGoalQueryVariables>(ProjectGoalDocument, options);
      }
export function useProjectGoalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectGoalQuery, ProjectGoalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectGoalQuery, ProjectGoalQueryVariables>(ProjectGoalDocument, options);
        }
export function useProjectGoalSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectGoalQuery, ProjectGoalQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectGoalQuery, ProjectGoalQueryVariables>(ProjectGoalDocument, options);
        }
export type ProjectGoalQueryHookResult = ReturnType<typeof useProjectGoalQuery>;
export type ProjectGoalLazyQueryHookResult = ReturnType<typeof useProjectGoalLazyQuery>;
export type ProjectGoalSuspenseQueryHookResult = ReturnType<typeof useProjectGoalSuspenseQuery>;
export type ProjectGoalQueryResult = Apollo.QueryResult<ProjectGoalQuery, ProjectGoalQueryVariables>;
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
export function useOrdersGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrdersGetQuery, OrdersGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrdersGetQuery, OrdersGetQueryVariables>(OrdersGetDocument, options);
        }
export type OrdersGetQueryHookResult = ReturnType<typeof useOrdersGetQuery>;
export type OrdersGetLazyQueryHookResult = ReturnType<typeof useOrdersGetLazyQuery>;
export type OrdersGetSuspenseQueryHookResult = ReturnType<typeof useOrdersGetSuspenseQuery>;
export type OrdersGetQueryResult = Apollo.QueryResult<OrdersGetQuery, OrdersGetQueryVariables>;
export const ProjectPostsDocument = gql`
    query ProjectPosts($where: UniqueProjectQueryInput!, $input: ProjectPostsGetInput) {
  projectGet(where: $where) {
    id
    posts(input: $input) {
      ...ProjectPost
    }
  }
}
    ${ProjectPostFragmentDoc}`;

/**
 * __useProjectPostsQuery__
 *
 * To run a query within a React component, call `useProjectPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPostsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectPostsQuery(baseOptions: Apollo.QueryHookOptions<ProjectPostsQuery, ProjectPostsQueryVariables> & ({ variables: ProjectPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPostsQuery, ProjectPostsQueryVariables>(ProjectPostsDocument, options);
      }
export function useProjectPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPostsQuery, ProjectPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPostsQuery, ProjectPostsQueryVariables>(ProjectPostsDocument, options);
        }
export function useProjectPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectPostsQuery, ProjectPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectPostsQuery, ProjectPostsQueryVariables>(ProjectPostsDocument, options);
        }
export type ProjectPostsQueryHookResult = ReturnType<typeof useProjectPostsQuery>;
export type ProjectPostsLazyQueryHookResult = ReturnType<typeof useProjectPostsLazyQuery>;
export type ProjectPostsSuspenseQueryHookResult = ReturnType<typeof useProjectPostsSuspenseQuery>;
export type ProjectPostsQueryResult = Apollo.QueryResult<ProjectPostsQuery, ProjectPostsQueryVariables>;
export const ProjectUnplublishedPostsDocument = gql`
    query ProjectUnplublishedPosts($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    id
    posts: posts(input: {where: {published: false}}) {
      ...ProjectPost
    }
  }
}
    ${ProjectPostFragmentDoc}`;

/**
 * __useProjectUnplublishedPostsQuery__
 *
 * To run a query within a React component, call `useProjectUnplublishedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectUnplublishedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectUnplublishedPostsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectUnplublishedPostsQuery(baseOptions: Apollo.QueryHookOptions<ProjectUnplublishedPostsQuery, ProjectUnplublishedPostsQueryVariables> & ({ variables: ProjectUnplublishedPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectUnplublishedPostsQuery, ProjectUnplublishedPostsQueryVariables>(ProjectUnplublishedPostsDocument, options);
      }
export function useProjectUnplublishedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectUnplublishedPostsQuery, ProjectUnplublishedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectUnplublishedPostsQuery, ProjectUnplublishedPostsQueryVariables>(ProjectUnplublishedPostsDocument, options);
        }
export function useProjectUnplublishedPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectUnplublishedPostsQuery, ProjectUnplublishedPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectUnplublishedPostsQuery, ProjectUnplublishedPostsQueryVariables>(ProjectUnplublishedPostsDocument, options);
        }
export type ProjectUnplublishedPostsQueryHookResult = ReturnType<typeof useProjectUnplublishedPostsQuery>;
export type ProjectUnplublishedPostsLazyQueryHookResult = ReturnType<typeof useProjectUnplublishedPostsLazyQuery>;
export type ProjectUnplublishedPostsSuspenseQueryHookResult = ReturnType<typeof useProjectUnplublishedPostsSuspenseQuery>;
export type ProjectUnplublishedPostsQueryResult = Apollo.QueryResult<ProjectUnplublishedPostsQuery, ProjectUnplublishedPostsQueryVariables>;
export const ProjectPostDocument = gql`
    query ProjectPost($postId: BigInt!) {
  post(id: $postId) {
    ...ProjectPostView
  }
}
    ${ProjectPostViewFragmentDoc}`;

/**
 * __useProjectPostQuery__
 *
 * To run a query within a React component, call `useProjectPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useProjectPostQuery(baseOptions: Apollo.QueryHookOptions<ProjectPostQuery, ProjectPostQueryVariables> & ({ variables: ProjectPostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectPostQuery, ProjectPostQueryVariables>(ProjectPostDocument, options);
      }
export function useProjectPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPostQuery, ProjectPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectPostQuery, ProjectPostQueryVariables>(ProjectPostDocument, options);
        }
export function useProjectPostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectPostQuery, ProjectPostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectPostQuery, ProjectPostQueryVariables>(ProjectPostDocument, options);
        }
export type ProjectPostQueryHookResult = ReturnType<typeof useProjectPostQuery>;
export type ProjectPostLazyQueryHookResult = ReturnType<typeof useProjectPostLazyQuery>;
export type ProjectPostSuspenseQueryHookResult = ReturnType<typeof useProjectPostSuspenseQuery>;
export type ProjectPostQueryResult = Apollo.QueryResult<ProjectPostQuery, ProjectPostQueryVariables>;
export const PostEmailSegmentSizeGetDocument = gql`
    query PostEmailSegmentSizeGet($input: PostEmailSegmentSizeGetInput!) {
  postEmailSegmentSizeGet(input: $input)
}
    `;

/**
 * __usePostEmailSegmentSizeGetQuery__
 *
 * To run a query within a React component, call `usePostEmailSegmentSizeGetQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostEmailSegmentSizeGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostEmailSegmentSizeGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostEmailSegmentSizeGetQuery(baseOptions: Apollo.QueryHookOptions<PostEmailSegmentSizeGetQuery, PostEmailSegmentSizeGetQueryVariables> & ({ variables: PostEmailSegmentSizeGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostEmailSegmentSizeGetQuery, PostEmailSegmentSizeGetQueryVariables>(PostEmailSegmentSizeGetDocument, options);
      }
export function usePostEmailSegmentSizeGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostEmailSegmentSizeGetQuery, PostEmailSegmentSizeGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostEmailSegmentSizeGetQuery, PostEmailSegmentSizeGetQueryVariables>(PostEmailSegmentSizeGetDocument, options);
        }
export function usePostEmailSegmentSizeGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostEmailSegmentSizeGetQuery, PostEmailSegmentSizeGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostEmailSegmentSizeGetQuery, PostEmailSegmentSizeGetQueryVariables>(PostEmailSegmentSizeGetDocument, options);
        }
export type PostEmailSegmentSizeGetQueryHookResult = ReturnType<typeof usePostEmailSegmentSizeGetQuery>;
export type PostEmailSegmentSizeGetLazyQueryHookResult = ReturnType<typeof usePostEmailSegmentSizeGetLazyQuery>;
export type PostEmailSegmentSizeGetSuspenseQueryHookResult = ReturnType<typeof usePostEmailSegmentSizeGetSuspenseQuery>;
export type PostEmailSegmentSizeGetQueryResult = Apollo.QueryResult<PostEmailSegmentSizeGetQuery, PostEmailSegmentSizeGetQueryVariables>;
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
export function useProjectByNameOrIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>(ProjectByNameOrIdDocument, options);
        }
export type ProjectByNameOrIdQueryHookResult = ReturnType<typeof useProjectByNameOrIdQuery>;
export type ProjectByNameOrIdLazyQueryHookResult = ReturnType<typeof useProjectByNameOrIdLazyQuery>;
export type ProjectByNameOrIdSuspenseQueryHookResult = ReturnType<typeof useProjectByNameOrIdSuspenseQuery>;
export type ProjectByNameOrIdQueryResult = Apollo.QueryResult<ProjectByNameOrIdQuery, ProjectByNameOrIdQueryVariables>;
export const ProjectByNameForNameCheckDocument = gql`
    query ProjectByNameForNameCheck($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    id
    name
  }
}
    `;

/**
 * __useProjectByNameForNameCheckQuery__
 *
 * To run a query within a React component, call `useProjectByNameForNameCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectByNameForNameCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectByNameForNameCheckQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectByNameForNameCheckQuery(baseOptions: Apollo.QueryHookOptions<ProjectByNameForNameCheckQuery, ProjectByNameForNameCheckQueryVariables> & ({ variables: ProjectByNameForNameCheckQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectByNameForNameCheckQuery, ProjectByNameForNameCheckQueryVariables>(ProjectByNameForNameCheckDocument, options);
      }
export function useProjectByNameForNameCheckLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectByNameForNameCheckQuery, ProjectByNameForNameCheckQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectByNameForNameCheckQuery, ProjectByNameForNameCheckQueryVariables>(ProjectByNameForNameCheckDocument, options);
        }
export function useProjectByNameForNameCheckSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectByNameForNameCheckQuery, ProjectByNameForNameCheckQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectByNameForNameCheckQuery, ProjectByNameForNameCheckQueryVariables>(ProjectByNameForNameCheckDocument, options);
        }
export type ProjectByNameForNameCheckQueryHookResult = ReturnType<typeof useProjectByNameForNameCheckQuery>;
export type ProjectByNameForNameCheckLazyQueryHookResult = ReturnType<typeof useProjectByNameForNameCheckLazyQuery>;
export type ProjectByNameForNameCheckSuspenseQueryHookResult = ReturnType<typeof useProjectByNameForNameCheckSuspenseQuery>;
export type ProjectByNameForNameCheckQueryResult = Apollo.QueryResult<ProjectByNameForNameCheckQuery, ProjectByNameForNameCheckQueryVariables>;
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
export function useProjectNostrKeysSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>(ProjectNostrKeysDocument, options);
        }
export type ProjectNostrKeysQueryHookResult = ReturnType<typeof useProjectNostrKeysQuery>;
export type ProjectNostrKeysLazyQueryHookResult = ReturnType<typeof useProjectNostrKeysLazyQuery>;
export type ProjectNostrKeysSuspenseQueryHookResult = ReturnType<typeof useProjectNostrKeysSuspenseQuery>;
export type ProjectNostrKeysQueryResult = Apollo.QueryResult<ProjectNostrKeysQuery, ProjectNostrKeysQueryVariables>;
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
export function useProjectPageBodySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectPageBodyQuery, ProjectPageBodyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectPageDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectPageDetailsQuery, ProjectPageDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectPageDetailsQuery, ProjectPageDetailsQueryVariables>(ProjectPageDetailsDocument, options);
        }
export type ProjectPageDetailsQueryHookResult = ReturnType<typeof useProjectPageDetailsQuery>;
export type ProjectPageDetailsLazyQueryHookResult = ReturnType<typeof useProjectPageDetailsLazyQuery>;
export type ProjectPageDetailsSuspenseQueryHookResult = ReturnType<typeof useProjectPageDetailsSuspenseQuery>;
export type ProjectPageDetailsQueryResult = Apollo.QueryResult<ProjectPageDetailsQuery, ProjectPageDetailsQueryVariables>;
export const ProjectGrantApplicationsDocument = gql`
    query ProjectGrantApplications($where: UniqueProjectQueryInput!, $input: ProjectGrantApplicationsInput) {
  projectGet(where: $where) {
    grantApplications(input: $input) {
      ...ProjectGrantApplicant
    }
  }
}
    ${ProjectGrantApplicantFragmentDoc}`;

/**
 * __useProjectGrantApplicationsQuery__
 *
 * To run a query within a React component, call `useProjectGrantApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectGrantApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectGrantApplicationsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectGrantApplicationsQuery(baseOptions: Apollo.QueryHookOptions<ProjectGrantApplicationsQuery, ProjectGrantApplicationsQueryVariables> & ({ variables: ProjectGrantApplicationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectGrantApplicationsQuery, ProjectGrantApplicationsQueryVariables>(ProjectGrantApplicationsDocument, options);
      }
export function useProjectGrantApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectGrantApplicationsQuery, ProjectGrantApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectGrantApplicationsQuery, ProjectGrantApplicationsQueryVariables>(ProjectGrantApplicationsDocument, options);
        }
export function useProjectGrantApplicationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectGrantApplicationsQuery, ProjectGrantApplicationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectGrantApplicationsQuery, ProjectGrantApplicationsQueryVariables>(ProjectGrantApplicationsDocument, options);
        }
export type ProjectGrantApplicationsQueryHookResult = ReturnType<typeof useProjectGrantApplicationsQuery>;
export type ProjectGrantApplicationsLazyQueryHookResult = ReturnType<typeof useProjectGrantApplicationsLazyQuery>;
export type ProjectGrantApplicationsSuspenseQueryHookResult = ReturnType<typeof useProjectGrantApplicationsSuspenseQuery>;
export type ProjectGrantApplicationsQueryResult = Apollo.QueryResult<ProjectGrantApplicationsQuery, ProjectGrantApplicationsQueryVariables>;
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
export function useProjectPageHeaderSummarySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectPageHeaderSummaryQuery, ProjectPageHeaderSummaryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectPageWalletsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectPageWalletsQuery, ProjectPageWalletsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectWalletConnectionDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectWalletConnectionDetailsQuery, ProjectWalletConnectionDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectStatsGetInsightSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectStatsGetInsightQuery, ProjectStatsGetInsightQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectHistoryStatsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectHistoryStatsGetQuery, ProjectHistoryStatsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectRewardSoldGraphStatsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectRewardSoldGraphStatsGetQuery, ProjectRewardSoldGraphStatsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
export function useProjectFundingMethodStatsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>(ProjectFundingMethodStatsGetDocument, options);
        }
export type ProjectFundingMethodStatsGetQueryHookResult = ReturnType<typeof useProjectFundingMethodStatsGetQuery>;
export type ProjectFundingMethodStatsGetLazyQueryHookResult = ReturnType<typeof useProjectFundingMethodStatsGetLazyQuery>;
export type ProjectFundingMethodStatsGetSuspenseQueryHookResult = ReturnType<typeof useProjectFundingMethodStatsGetSuspenseQuery>;
export type ProjectFundingMethodStatsGetQueryResult = Apollo.QueryResult<ProjectFundingMethodStatsGetQuery, ProjectFundingMethodStatsGetQueryVariables>;
export const ProjectSubscriptionPlansDocument = gql`
    query ProjectSubscriptionPlans($input: ProjectSubscriptionPlansInput!) {
  projectSubscriptionPlans(input: $input) {
    ...ProjectSubscriptionPlans
  }
}
    ${ProjectSubscriptionPlansFragmentDoc}`;

/**
 * __useProjectSubscriptionPlansQuery__
 *
 * To run a query within a React component, call `useProjectSubscriptionPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectSubscriptionPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectSubscriptionPlansQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectSubscriptionPlansQuery(baseOptions: Apollo.QueryHookOptions<ProjectSubscriptionPlansQuery, ProjectSubscriptionPlansQueryVariables> & ({ variables: ProjectSubscriptionPlansQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectSubscriptionPlansQuery, ProjectSubscriptionPlansQueryVariables>(ProjectSubscriptionPlansDocument, options);
      }
export function useProjectSubscriptionPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectSubscriptionPlansQuery, ProjectSubscriptionPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectSubscriptionPlansQuery, ProjectSubscriptionPlansQueryVariables>(ProjectSubscriptionPlansDocument, options);
        }
export function useProjectSubscriptionPlansSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectSubscriptionPlansQuery, ProjectSubscriptionPlansQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectSubscriptionPlansQuery, ProjectSubscriptionPlansQueryVariables>(ProjectSubscriptionPlansDocument, options);
        }
export type ProjectSubscriptionPlansQueryHookResult = ReturnType<typeof useProjectSubscriptionPlansQuery>;
export type ProjectSubscriptionPlansLazyQueryHookResult = ReturnType<typeof useProjectSubscriptionPlansLazyQuery>;
export type ProjectSubscriptionPlansSuspenseQueryHookResult = ReturnType<typeof useProjectSubscriptionPlansSuspenseQuery>;
export type ProjectSubscriptionPlansQueryResult = Apollo.QueryResult<ProjectSubscriptionPlansQuery, ProjectSubscriptionPlansQueryVariables>;
export const ProjectRewardsDocument = gql`
    query ProjectRewards($input: GetProjectRewardsInput!) {
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
export function useProjectRewardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectRewardsQuery, ProjectRewardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectRewardsQuery, ProjectRewardsQueryVariables>(ProjectRewardsDocument, options);
        }
export type ProjectRewardsQueryHookResult = ReturnType<typeof useProjectRewardsQuery>;
export type ProjectRewardsLazyQueryHookResult = ReturnType<typeof useProjectRewardsLazyQuery>;
export type ProjectRewardsSuspenseQueryHookResult = ReturnType<typeof useProjectRewardsSuspenseQuery>;
export type ProjectRewardsQueryResult = Apollo.QueryResult<ProjectRewardsQuery, ProjectRewardsQueryVariables>;
export const ProjectRewardGetDocument = gql`
    query ProjectRewardGet($input: GetProjectRewardInput!) {
  projectRewardGet(input: $input) {
    ...ProjectReward
  }
}
    ${ProjectRewardFragmentDoc}`;

/**
 * __useProjectRewardGetQuery__
 *
 * To run a query within a React component, call `useProjectRewardGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectRewardGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectRewardGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectRewardGetQuery(baseOptions: Apollo.QueryHookOptions<ProjectRewardGetQuery, ProjectRewardGetQueryVariables> & ({ variables: ProjectRewardGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectRewardGetQuery, ProjectRewardGetQueryVariables>(ProjectRewardGetDocument, options);
      }
export function useProjectRewardGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectRewardGetQuery, ProjectRewardGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectRewardGetQuery, ProjectRewardGetQueryVariables>(ProjectRewardGetDocument, options);
        }
export function useProjectRewardGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectRewardGetQuery, ProjectRewardGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectRewardGetQuery, ProjectRewardGetQueryVariables>(ProjectRewardGetDocument, options);
        }
export type ProjectRewardGetQueryHookResult = ReturnType<typeof useProjectRewardGetQuery>;
export type ProjectRewardGetLazyQueryHookResult = ReturnType<typeof useProjectRewardGetLazyQuery>;
export type ProjectRewardGetSuspenseQueryHookResult = ReturnType<typeof useProjectRewardGetSuspenseQuery>;
export type ProjectRewardGetQueryResult = Apollo.QueryResult<ProjectRewardGetQuery, ProjectRewardGetQueryVariables>;
export const RewardCategoriesDocument = gql`
    query RewardCategories {
  projectRewardCategoriesGet
}
    `;

/**
 * __useRewardCategoriesQuery__
 *
 * To run a query within a React component, call `useRewardCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRewardCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRewardCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRewardCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<RewardCategoriesQuery, RewardCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RewardCategoriesQuery, RewardCategoriesQueryVariables>(RewardCategoriesDocument, options);
      }
export function useRewardCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RewardCategoriesQuery, RewardCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RewardCategoriesQuery, RewardCategoriesQueryVariables>(RewardCategoriesDocument, options);
        }
export function useRewardCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RewardCategoriesQuery, RewardCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RewardCategoriesQuery, RewardCategoriesQueryVariables>(RewardCategoriesDocument, options);
        }
export type RewardCategoriesQueryHookResult = ReturnType<typeof useRewardCategoriesQuery>;
export type RewardCategoriesLazyQueryHookResult = ReturnType<typeof useRewardCategoriesLazyQuery>;
export type RewardCategoriesSuspenseQueryHookResult = ReturnType<typeof useRewardCategoriesSuspenseQuery>;
export type RewardCategoriesQueryResult = Apollo.QueryResult<RewardCategoriesQuery, RewardCategoriesQueryVariables>;
export const ProjectShippingConfigsGetDocument = gql`
    query ProjectShippingConfigsGet($input: ProjectShippingConfigsGetInput!) {
  projectShippingConfigsGet(input: $input) {
    ...ShippingConfig
  }
}
    ${ShippingConfigFragmentDoc}`;

/**
 * __useProjectShippingConfigsGetQuery__
 *
 * To run a query within a React component, call `useProjectShippingConfigsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectShippingConfigsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectShippingConfigsGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectShippingConfigsGetQuery(baseOptions: Apollo.QueryHookOptions<ProjectShippingConfigsGetQuery, ProjectShippingConfigsGetQueryVariables> & ({ variables: ProjectShippingConfigsGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectShippingConfigsGetQuery, ProjectShippingConfigsGetQueryVariables>(ProjectShippingConfigsGetDocument, options);
      }
export function useProjectShippingConfigsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectShippingConfigsGetQuery, ProjectShippingConfigsGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectShippingConfigsGetQuery, ProjectShippingConfigsGetQueryVariables>(ProjectShippingConfigsGetDocument, options);
        }
export function useProjectShippingConfigsGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectShippingConfigsGetQuery, ProjectShippingConfigsGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectShippingConfigsGetQuery, ProjectShippingConfigsGetQueryVariables>(ProjectShippingConfigsGetDocument, options);
        }
export type ProjectShippingConfigsGetQueryHookResult = ReturnType<typeof useProjectShippingConfigsGetQuery>;
export type ProjectShippingConfigsGetLazyQueryHookResult = ReturnType<typeof useProjectShippingConfigsGetLazyQuery>;
export type ProjectShippingConfigsGetSuspenseQueryHookResult = ReturnType<typeof useProjectShippingConfigsGetSuspenseQuery>;
export type ProjectShippingConfigsGetQueryResult = Apollo.QueryResult<ProjectShippingConfigsGetQuery, ProjectShippingConfigsGetQueryVariables>;
export const ShippingAddressesGetDocument = gql`
    query ShippingAddressesGet($input: ShippingAddressesGetInput!) {
  shippingAddressesGet(input: $input) {
    ...ShippingAddress
  }
}
    ${ShippingAddressFragmentDoc}`;

/**
 * __useShippingAddressesGetQuery__
 *
 * To run a query within a React component, call `useShippingAddressesGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useShippingAddressesGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShippingAddressesGetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useShippingAddressesGetQuery(baseOptions: Apollo.QueryHookOptions<ShippingAddressesGetQuery, ShippingAddressesGetQueryVariables> & ({ variables: ShippingAddressesGetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShippingAddressesGetQuery, ShippingAddressesGetQueryVariables>(ShippingAddressesGetDocument, options);
      }
export function useShippingAddressesGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShippingAddressesGetQuery, ShippingAddressesGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShippingAddressesGetQuery, ShippingAddressesGetQueryVariables>(ShippingAddressesGetDocument, options);
        }
export function useShippingAddressesGetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ShippingAddressesGetQuery, ShippingAddressesGetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ShippingAddressesGetQuery, ShippingAddressesGetQueryVariables>(ShippingAddressesGetDocument, options);
        }
export type ShippingAddressesGetQueryHookResult = ReturnType<typeof useShippingAddressesGetQuery>;
export type ShippingAddressesGetLazyQueryHookResult = ReturnType<typeof useShippingAddressesGetLazyQuery>;
export type ShippingAddressesGetSuspenseQueryHookResult = ReturnType<typeof useShippingAddressesGetSuspenseQuery>;
export type ShippingAddressesGetQueryResult = Apollo.QueryResult<ShippingAddressesGetQuery, ShippingAddressesGetQueryVariables>;
export const GetUserIpCountryDocument = gql`
    query GetUserIpCountry {
  userIpCountry
}
    `;

/**
 * __useGetUserIpCountryQuery__
 *
 * To run a query within a React component, call `useGetUserIpCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIpCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIpCountryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserIpCountryQuery(baseOptions?: Apollo.QueryHookOptions<GetUserIpCountryQuery, GetUserIpCountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserIpCountryQuery, GetUserIpCountryQueryVariables>(GetUserIpCountryDocument, options);
      }
export function useGetUserIpCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserIpCountryQuery, GetUserIpCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserIpCountryQuery, GetUserIpCountryQueryVariables>(GetUserIpCountryDocument, options);
        }
export function useGetUserIpCountrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserIpCountryQuery, GetUserIpCountryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserIpCountryQuery, GetUserIpCountryQueryVariables>(GetUserIpCountryDocument, options);
        }
export type GetUserIpCountryQueryHookResult = ReturnType<typeof useGetUserIpCountryQuery>;
export type GetUserIpCountryLazyQueryHookResult = ReturnType<typeof useGetUserIpCountryLazyQuery>;
export type GetUserIpCountrySuspenseQueryHookResult = ReturnType<typeof useGetUserIpCountrySuspenseQuery>;
export type GetUserIpCountryQueryResult = Apollo.QueryResult<GetUserIpCountryQuery, GetUserIpCountryQueryVariables>;
export const GetProjectOwnerUserForInvoiceDocument = gql`
    query GetProjectOwnerUserForInvoice($where: UniqueProjectQueryInput!) {
  projectGet(where: $where) {
    owners {
      id
      user {
        ...ProjectOwnerUserForInvoice
      }
    }
  }
}
    ${ProjectOwnerUserForInvoiceFragmentDoc}`;

/**
 * __useGetProjectOwnerUserForInvoiceQuery__
 *
 * To run a query within a React component, call `useGetProjectOwnerUserForInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectOwnerUserForInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectOwnerUserForInvoiceQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetProjectOwnerUserForInvoiceQuery(baseOptions: Apollo.QueryHookOptions<GetProjectOwnerUserForInvoiceQuery, GetProjectOwnerUserForInvoiceQueryVariables> & ({ variables: GetProjectOwnerUserForInvoiceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectOwnerUserForInvoiceQuery, GetProjectOwnerUserForInvoiceQueryVariables>(GetProjectOwnerUserForInvoiceDocument, options);
      }
export function useGetProjectOwnerUserForInvoiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectOwnerUserForInvoiceQuery, GetProjectOwnerUserForInvoiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectOwnerUserForInvoiceQuery, GetProjectOwnerUserForInvoiceQueryVariables>(GetProjectOwnerUserForInvoiceDocument, options);
        }
export function useGetProjectOwnerUserForInvoiceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectOwnerUserForInvoiceQuery, GetProjectOwnerUserForInvoiceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectOwnerUserForInvoiceQuery, GetProjectOwnerUserForInvoiceQueryVariables>(GetProjectOwnerUserForInvoiceDocument, options);
        }
export type GetProjectOwnerUserForInvoiceQueryHookResult = ReturnType<typeof useGetProjectOwnerUserForInvoiceQuery>;
export type GetProjectOwnerUserForInvoiceLazyQueryHookResult = ReturnType<typeof useGetProjectOwnerUserForInvoiceLazyQuery>;
export type GetProjectOwnerUserForInvoiceSuspenseQueryHookResult = ReturnType<typeof useGetProjectOwnerUserForInvoiceSuspenseQuery>;
export type GetProjectOwnerUserForInvoiceQueryResult = Apollo.QueryResult<GetProjectOwnerUserForInvoiceQuery, GetProjectOwnerUserForInvoiceQueryVariables>;
export const FundingContributionStatusUpdatedDocument = gql`
    subscription FundingContributionStatusUpdated($input: ContributionStatusUpdatedInput) {
  contributionStatusUpdated(input: $input) {
    contribution {
      ...FundingContributionSubscription
    }
  }
}
    ${FundingContributionSubscriptionFragmentDoc}`;

/**
 * __useFundingContributionStatusUpdatedSubscription__
 *
 * To run a query within a React component, call `useFundingContributionStatusUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFundingContributionStatusUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFundingContributionStatusUpdatedSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFundingContributionStatusUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<FundingContributionStatusUpdatedSubscription, FundingContributionStatusUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FundingContributionStatusUpdatedSubscription, FundingContributionStatusUpdatedSubscriptionVariables>(FundingContributionStatusUpdatedDocument, options);
      }
export type FundingContributionStatusUpdatedSubscriptionHookResult = ReturnType<typeof useFundingContributionStatusUpdatedSubscription>;
export type FundingContributionStatusUpdatedSubscriptionResult = Apollo.SubscriptionResult<FundingContributionStatusUpdatedSubscription>;
export const ProjectContributionDocument = gql`
    subscription ProjectContribution($input: ContributionStatusUpdatedInput) {
  contributionStatusUpdated(input: $input) {
    contribution {
      ...ProjectContribution
    }
  }
}
    ${ProjectContributionFragmentDoc}`;

/**
 * __useProjectContributionSubscription__
 *
 * To run a query within a React component, call `useProjectContributionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useProjectContributionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectContributionSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectContributionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ProjectContributionSubscription, ProjectContributionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ProjectContributionSubscription, ProjectContributionSubscriptionVariables>(ProjectContributionDocument, options);
      }
export type ProjectContributionSubscriptionHookResult = ReturnType<typeof useProjectContributionSubscription>;
export type ProjectContributionSubscriptionResult = Apollo.SubscriptionResult<ProjectContributionSubscription>;
export const PaymentStatusUpdatedDocument = gql`
    subscription PaymentStatusUpdated($input: PaymentStatusUpdatedInput!) {
  paymentStatusUpdated(input: $input) {
    ...PaymentSubscription
  }
}
    ${PaymentSubscriptionFragmentDoc}`;

/**
 * __usePaymentStatusUpdatedSubscription__
 *
 * To run a query within a React component, call `usePaymentStatusUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePaymentStatusUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentStatusUpdatedSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentStatusUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<PaymentStatusUpdatedSubscription, PaymentStatusUpdatedSubscriptionVariables> & ({ variables: PaymentStatusUpdatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PaymentStatusUpdatedSubscription, PaymentStatusUpdatedSubscriptionVariables>(PaymentStatusUpdatedDocument, options);
      }
export type PaymentStatusUpdatedSubscriptionHookResult = ReturnType<typeof usePaymentStatusUpdatedSubscription>;
export type PaymentStatusUpdatedSubscriptionResult = Apollo.SubscriptionResult<PaymentStatusUpdatedSubscription>;