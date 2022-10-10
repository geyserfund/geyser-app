import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Add BigInt functionality */
  BigInt: any;
  /** Date custom scalar type */
  Date: any;
  amount_Float_NotNull_min_1: any;
  amount_Float_min_1: any;
  comment_String_maxLength_280: any;
  cost_Float_NotNull_min_1_max_50000000: any;
  cost_Int_NotNull_min_0_max_1500000: any;
  donationAmount_Int_NotNull_min_1_max_15000000: any;
  email_String_format_email: any;
  fundingGoal_Int_min_1: any;
  name_String_NotNull_minLength_5_maxLength_280: any;
  quantity_Int_NotNull_min_1: any;
  rewardsCost_Int_NotNull_min_0_max_15000000: any;
  stock_Int_min_0: any;
  title_String_NotNull_maxLength_50: any;
};

export type Ambassador = {
  __typename?: 'Ambassador';
  confirmed: Scalars['Boolean'];
  id: Scalars['BigInt'];
  user: User;
};

export type AmountSummary = {
  __typename?: 'AmountSummary';
  donationAmount: Scalars['Int'];
  rewardsCost: Scalars['Int'];
  shippingCost: Scalars['Int'];
  total: Scalars['Int'];
};

export type ConnectionDetails = LndConnectionDetailsPrivate | LndConnectionDetailsPublic;

export type CreateEntryInput = {
  content?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  projectId: Scalars['BigInt'];
  title: Scalars['String'];
  type: EntryType;
};

export type CreateGranteeInput = {
  name: Scalars['String'];
  projectId: Scalars['BigInt'];
  url: Scalars['String'];
};

export type CreateProjectInput = {
  description: Scalars['String'];
  email: Scalars['String'];
  expiresAt?: InputMaybe<Scalars['String']>;
  fundingGoal?: InputMaybe<Scalars['fundingGoal_Int_min_1']>;
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['name_String_NotNull_minLength_5_maxLength_280'];
  rewardCurrency?: InputMaybe<Scalars['String']>;
  title: Scalars['title_String_NotNull_maxLength_50'];
  type?: InputMaybe<ProjectType>;
};

export type CreateProjectMilestoneInput = {
  amount: Scalars['amount_Float_NotNull_min_1'];
  description: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['BigInt'];
};

export type CreateProjectRewardInput = {
  cost: Scalars['cost_Float_NotNull_min_1_max_50000000'];
  description: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectId: Scalars['BigInt'];
  stock?: InputMaybe<Scalars['stock_Int_min_0']>;
};

export type CreateWalletInput = {
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsCreateInput>;
  name?: InputMaybe<Scalars['String']>;
  resourceInput: ResourceInput;
};

export enum Currency {
  Usd = 'usd'
}

export type CursorInput = {
  id: Scalars['Int'];
};

export type DonationFundingInput = {
  donationAmount: Scalars['donationAmount_Int_NotNull_min_1_max_15000000'];
};

export type Entry = {
  __typename?: 'Entry';
  amountFunded: Scalars['Int'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  creator: User;
  description: Scalars['String'];
  fundersCount: Scalars['Int'];
  fundingTxs: Array<Maybe<FundingTx>>;
  id: Scalars['BigInt'];
  image?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  published: Scalars['Boolean'];
  publishedAt?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: EntryType;
  updatedAt: Scalars['String'];
};

export enum EntryType {
  Article = 'article',
  Podcast = 'podcast',
  Video = 'video'
}

export type ExternalAccount = {
  __typename?: 'ExternalAccount';
  externalId: Scalars['String'];
  externalUsername: Scalars['String'];
  id: Scalars['BigInt'];
  public: Scalars['Boolean'];
  type: Scalars['String'];
};

export type FileUploadInput = {
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Funder = {
  __typename?: 'Funder';
  amountFunded?: Maybe<Scalars['Int']>;
  confirmed: Scalars['Boolean'];
  confirmedAt?: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  rewards: Array<Maybe<FunderReward>>;
  timesFunded?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
};

export type FunderReward = {
  __typename?: 'FunderReward';
  projectReward: ProjectReward;
  quantity: Scalars['Int'];
};

export type FundingCancelResponse = {
  __typename?: 'FundingCancelResponse';
  id: Scalars['BigInt'];
  success: Scalars['Boolean'];
};

export type FundingConfirmInput = {
  amount: Scalars['Int'];
  offChain?: InputMaybe<FundingConfirmOffChainInput>;
  onChain?: InputMaybe<FundingConfirmOnChainInput>;
  paidAt: Scalars['Date'];
};

export type FundingConfirmOffChainBolt11Input = {
  invoiceId: Scalars['String'];
  settleIndex: Scalars['Int'];
};

export type FundingConfirmOffChainInput = {
  bolt11: FundingConfirmOffChainBolt11Input;
};

export type FundingConfirmOnChainInput = {
  address: Scalars['String'];
};

export type FundingConfirmResponse = {
  __typename?: 'FundingConfirmResponse';
  id: Scalars['BigInt'];
  missedSettleEvents: Scalars['Int'];
  success: Scalars['Boolean'];
};

export type FundingCreateFromPodcastKeysendInput = {
  amount: Scalars['Int'];
  appName: Scalars['String'];
  comment?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['String']>;
  externalUsername?: InputMaybe<Scalars['String']>;
  paidAt: Scalars['Date'];
  projectId: Scalars['BigInt'];
};

export type FundingInput = {
  anonymous: Scalars['Boolean'];
  donationInput?: InputMaybe<DonationFundingInput>;
  metadataInput?: InputMaybe<FundingMetadataInput>;
  projectId: Scalars['BigInt'];
  rewardInput?: InputMaybe<RewardFundingInput>;
  sourceResourceInput: ResourceInput;
};

export type FundingMetadataInput = {
  comment?: InputMaybe<Scalars['comment_String_maxLength_280']>;
  email?: InputMaybe<Scalars['email_String_format_email']>;
  media?: InputMaybe<Scalars['String']>;
};

export type FundingMutationResponse = {
  __typename?: 'FundingMutationResponse';
  amountSummary?: Maybe<AmountSummary>;
  fundingTx?: Maybe<FundingTx>;
};

export type FundingPendingInput = {
  onChain: FundingPendingOnChainInput;
};

export type FundingPendingOnChainInput = {
  address: Scalars['String'];
};

export type FundingPendingResponse = {
  __typename?: 'FundingPendingResponse';
  id: Scalars['BigInt'];
  success: Scalars['Boolean'];
};

export type FundingQueryResponse = {
  __typename?: 'FundingQueryResponse';
  fundingTx?: Maybe<FundingTx>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export enum FundingResourceType {
  Entry = 'entry',
  Project = 'project',
  User = 'user'
}

export enum FundingStatus {
  Canceled = 'canceled',
  Paid = 'paid',
  Pending = 'pending',
  Unpaid = 'unpaid'
}

export type FundingTx = {
  __typename?: 'FundingTx';
  address?: Maybe<Scalars['String']>;
  amount: Scalars['Int'];
  comment?: Maybe<Scalars['String']>;
  funder: Funder;
  id: Scalars['BigInt'];
  invoiceId: Scalars['String'];
  media?: Maybe<Scalars['String']>;
  onChain: Scalars['Boolean'];
  paidAt?: Maybe<Scalars['Date']>;
  paymentRequest?: Maybe<Scalars['String']>;
  source: Scalars['String'];
  sourceResource?: Maybe<SourceResource>;
  status: FundingStatus;
  uuid: Scalars['String'];
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
  projectId?: InputMaybe<Scalars['BigInt']>;
};

export type GetFunderWhereInput = {
  confirmed?: InputMaybe<Scalars['Boolean']>;
  sourceResourceInput?: InputMaybe<ResourceInput>;
};

export type GetFundersInput = {
  orderBy?: InputMaybe<GetFundersOrderByInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<GetFunderWhereInput>;
};

export type GetFundersOrderByInput = {
  amountFunded: OrderByOptions;
};

export type GetFundingTxsInput = {
  orderBy?: InputMaybe<GetFundingTxsOrderByInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<GetFundingTxsWhereInput>;
};

export type GetFundingTxsOrderByInput = {
  paidAt: OrderByOptions;
};

export type GetFundingTxsWhereInput = {
  sourceResourceInput?: InputMaybe<ResourceInput>;
};

export type GetProjectRewardInput = {
  where: GetProjectRewardWhereInput;
};

export type GetProjectRewardWhereInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  projectId: Scalars['BigInt'];
};

export type Grantee = {
  __typename?: 'Grantee';
  id: Scalars['BigInt'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type GranteeSubmissionResponse = {
  __typename?: 'GranteeSubmissionResponse';
  grantees: Array<Maybe<Grantee>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Like = {
  __typename?: 'Like';
  user: User;
};

export type LndConnectionDetails = {
  grpcPort: Scalars['Int'];
  hostname: Scalars['String'];
  lndNodeType: LndNodeType;
  macaroon: Scalars['String'];
  tlsCertificate?: Maybe<Scalars['String']>;
};

export type LndConnectionDetailsCreateInput = {
  grpcPort: Scalars['Int'];
  hostname: Scalars['String'];
  lndNodeType: LndNodeType;
  macaroon: Scalars['String'];
  pubkey: Scalars['String'];
  tlsCertificate?: InputMaybe<Scalars['String']>;
};

export type LndConnectionDetailsPrivate = {
  __typename?: 'LndConnectionDetailsPrivate';
  grpcPort: Scalars['Int'];
  hostname: Scalars['String'];
  lndNodeType: LndNodeType;
  macaroon: Scalars['String'];
  pubkey: Scalars['String'];
  tlsCertificate?: Maybe<Scalars['String']>;
};

export type LndConnectionDetailsPublic = {
  __typename?: 'LndConnectionDetailsPublic';
  pubkey: Scalars['String'];
};

export type LndConnectionDetailsUpdateInput = {
  grpcPort?: InputMaybe<Scalars['Int']>;
  hostname?: InputMaybe<Scalars['String']>;
  macaroon?: InputMaybe<Scalars['String']>;
  pubkey?: InputMaybe<Scalars['String']>;
  tlsCertificate?: InputMaybe<Scalars['String']>;
};

export enum LndNodeType {
  Custom = 'custom',
  Geyser = 'geyser',
  Voltage = 'voltage'
}

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  confirmAmbassador: Ambassador;
  createAmbassador: Ambassador;
  createEntry: Entry;
  createGrantee: Grantee;
  createProject: Project;
  createProjectMilestone: ProjectMilestone;
  createProjectReward: ProjectReward;
  createSponsor: Sponsor;
  createWallet: Wallet;
  deleteProjectMilestone: Scalars['Boolean'];
  fund: FundingMutationResponse;
  fundingCancel: FundingCancelResponse;
  fundingClaimAnonymous: FundingMutationResponse;
  fundingConfirm: FundingConfirmResponse;
  fundingCreateFromPodcastKeysend: FundingTx;
  fundingPend: FundingPendingResponse;
  publishEntry: Entry;
  unlinkExternalAccount: User;
  updateEntry: Entry;
  updateProject: Project;
  updateProjectMilestone: ProjectMilestone;
  updateProjectReward: ProjectReward;
  updateUser: User;
  updateWallet: Wallet;
};


export type MutationConfirmAmbassadorArgs = {
  id: Scalars['BigInt'];
};


export type MutationCreateAmbassadorArgs = {
  projectId: Scalars['BigInt'];
};


export type MutationCreateEntryArgs = {
  input: CreateEntryInput;
};


export type MutationCreateGranteeArgs = {
  input: CreateGranteeInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateProjectMilestoneArgs = {
  input?: InputMaybe<CreateProjectMilestoneInput>;
};


export type MutationCreateProjectRewardArgs = {
  input?: InputMaybe<CreateProjectRewardInput>;
};


export type MutationCreateSponsorArgs = {
  projectId: Scalars['BigInt'];
};


export type MutationCreateWalletArgs = {
  input?: InputMaybe<CreateWalletInput>;
};


export type MutationDeleteProjectMilestoneArgs = {
  projectMilestoneId: Scalars['BigInt'];
};


export type MutationFundArgs = {
  input: FundingInput;
};


export type MutationFundingCancelArgs = {
  id: Scalars['BigInt'];
};


export type MutationFundingClaimAnonymousArgs = {
  uuid: Scalars['String'];
};


export type MutationFundingConfirmArgs = {
  input: FundingConfirmInput;
};


export type MutationFundingCreateFromPodcastKeysendArgs = {
  input?: InputMaybe<FundingCreateFromPodcastKeysendInput>;
};


export type MutationFundingPendArgs = {
  input: FundingPendingInput;
};


export type MutationPublishEntryArgs = {
  id: Scalars['BigInt'];
};


export type MutationUnlinkExternalAccountArgs = {
  id: Scalars['BigInt'];
};


export type MutationUpdateEntryArgs = {
  input: UpdateEntryInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateProjectMilestoneArgs = {
  input?: InputMaybe<UpdateProjectMilestoneInput>;
};


export type MutationUpdateProjectRewardArgs = {
  input?: InputMaybe<UpdateProjectRewardInput>;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUserInput>;
};


export type MutationUpdateWalletArgs = {
  input?: InputMaybe<UpdateWalletInput>;
};

export enum OrderByOptions {
  Asc = 'asc',
  Desc = 'desc'
}

export type Owner = {
  __typename?: 'Owner';
  id: Scalars['BigInt'];
  user: User;
};

export type OwnerOf = {
  __typename?: 'OwnerOf';
  owner?: Maybe<Owner>;
  project?: Maybe<Project>;
};

export type PaginationInput = {
  cursor?: InputMaybe<CursorInput>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Project = {
  __typename?: 'Project';
  active: Scalars['Boolean'];
  ambassadors: Array<Maybe<Ambassador>>;
  balance: Scalars['Int'];
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  draft: Scalars['Boolean'];
  entries: Array<Entry>;
  expiresAt?: Maybe<Scalars['String']>;
  funders: Array<Maybe<Funder>>;
  fundingGoal?: Maybe<Scalars['fundingGoal_Int_min_1']>;
  fundingTxs?: Maybe<Array<Maybe<FundingTx>>>;
  grantees: Array<Maybe<Grantee>>;
  id: Scalars['BigInt'];
  image?: Maybe<Scalars['String']>;
  likes: Array<Maybe<Like>>;
  media: Array<Maybe<Scalars['String']>>;
  milestones?: Maybe<Array<Maybe<ProjectMilestone>>>;
  name: Scalars['String'];
  owners: Array<Maybe<Owner>>;
  rewards?: Maybe<Array<Maybe<ProjectReward>>>;
  sponsors: Array<Maybe<Sponsor>>;
  statistics?: Maybe<ProjectStatistics>;
  title: Scalars['String'];
  type: ProjectType;
  updatedAt: Scalars['String'];
  wallets: Array<Wallet>;
};

export type ProjectMilestone = {
  __typename?: 'ProjectMilestone';
  amount: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  name: Scalars['String'];
};

export type ProjectOrderByInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
};

export type ProjectReward = {
  __typename?: 'ProjectReward';
  /** @deprecated Deprecated field please use 'sold' instead */
  backers: Scalars['Int'];
  cost: Scalars['Float'];
  deleted: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  sold: Scalars['Int'];
  stock: Scalars['Int'];
};

export type ProjectStatistics = {
  __typename?: 'ProjectStatistics';
  totalPageviews: Scalars['Int'];
  totalVisitors: Scalars['Int'];
};

export enum ProjectType {
  Donation = 'donation',
  Grant = 'grant',
  Reward = 'reward'
}

export type ProjectWhereInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['BigInt']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type ProjectsGetQueryInput = {
  orderBy?: InputMaybe<ProjectOrderByInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<ProjectWhereInput>;
};

export type ProjectsResponse = {
  __typename?: 'ProjectsResponse';
  projects: Array<Maybe<Project>>;
  summary?: Maybe<ProjectsSummary>;
};

export type ProjectsSummary = {
  __typename?: 'ProjectsSummary';
  fundedTotal?: Maybe<Scalars['Int']>;
  fundersCount?: Maybe<Scalars['Int']>;
  projectsCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  entry: Entry;
  fundingTx: FundingTx;
  getEntries: Array<Maybe<Entry>>;
  getFunders: Array<Maybe<Funder>>;
  getFundingTxs: Array<Maybe<FundingTx>>;
  getProjectPubkey?: Maybe<Scalars['String']>;
  getProjectReward: ProjectReward;
  getProjectRewards: Array<Maybe<ProjectReward>>;
  getSignedUploadUrl: SignedUploadUrl;
  getWallet: Wallet;
  me?: Maybe<User>;
  project?: Maybe<Project>;
  projects: ProjectsResponse;
  projectsSummary: ProjectsSummary;
  statusCheck: Scalars['Boolean'];
  user: User;
};


export type QueryEntryArgs = {
  id: Scalars['BigInt'];
};


export type QueryFundingTxArgs = {
  id: Scalars['BigInt'];
};


export type QueryGetEntriesArgs = {
  input?: InputMaybe<GetEntriesInput>;
};


export type QueryGetFundersArgs = {
  input: GetFundersInput;
};


export type QueryGetFundingTxsArgs = {
  input?: InputMaybe<GetFundingTxsInput>;
};


export type QueryGetProjectPubkeyArgs = {
  projectId: Scalars['BigInt'];
};


export type QueryGetProjectRewardArgs = {
  id: Scalars['BigInt'];
};


export type QueryGetProjectRewardsArgs = {
  input: GetProjectRewardInput;
};


export type QueryGetSignedUploadUrlArgs = {
  input: FileUploadInput;
};


export type QueryGetWalletArgs = {
  id: Scalars['BigInt'];
};


export type QueryProjectArgs = {
  where: UniqueProjectQueryInput;
};


export type QueryProjectsArgs = {
  input?: InputMaybe<ProjectsGetQueryInput>;
};


export type QueryUserArgs = {
  where?: InputMaybe<UserQueryInput>;
};

export type ResourceInput = {
  resourceId: Scalars['BigInt'];
  resourceType: FundingResourceType;
};

export type RewardFundingInput = {
  rewards: Array<RewardInput>;
  rewardsCost: Scalars['rewardsCost_Int_NotNull_min_0_max_15000000'];
  shipping?: InputMaybe<ShippingInput>;
};

export type RewardInput = {
  id: Scalars['BigInt'];
  quantity: Scalars['quantity_Int_NotNull_min_1'];
};

export enum ShippingDestination {
  International = 'international',
  National = 'national'
}

export type ShippingInput = {
  cost: Scalars['cost_Int_NotNull_min_0_max_1500000'];
  destination: ShippingDestination;
};

export type SignedUploadUrl = {
  __typename?: 'SignedUploadUrl';
  distributionUrl: Scalars['String'];
  uploadUrl: Scalars['String'];
};

export type SourceResource = Entry | Project;

export type Sponsor = {
  __typename?: 'Sponsor';
  confirmed: Scalars['Boolean'];
  id: Scalars['BigInt'];
  image?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
};

export type UniqueProjectQueryInput = {
  id?: InputMaybe<Scalars['BigInt']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateEntryInput = {
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  entryId: Scalars['BigInt'];
  image?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  draft?: InputMaybe<Scalars['Boolean']>;
  expiresAt?: InputMaybe<Scalars['String']>;
  fundingGoal?: InputMaybe<Scalars['fundingGoal_Int_min_1']>;
  image?: InputMaybe<Scalars['String']>;
  projectId: Scalars['BigInt'];
  rewardCurrency?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ProjectType>;
};

export type UpdateProjectMilestoneInput = {
  amount?: InputMaybe<Scalars['amount_Float_min_1']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  projectMilestoneId: Scalars['BigInt'];
};

export type UpdateProjectRewardInput = {
  cost: Scalars['cost_Float_NotNull_min_1_max_50000000'];
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectRewardId: Scalars['BigInt'];
  stock?: InputMaybe<Scalars['stock_Int_min_0']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['email_String_format_email']>;
  id: Scalars['BigInt'];
  imageUrl?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateWalletInput = {
  id: Scalars['BigInt'];
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsUpdateInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  contributions: Array<Maybe<UserProjectContribution>>;
  email?: Maybe<Scalars['String']>;
  externalAccounts: Array<Maybe<ExternalAccount>>;
  id: Scalars['BigInt'];
  imageUrl?: Maybe<Scalars['String']>;
  ownerOf: Array<Maybe<OwnerOf>>;
  username: Scalars['String'];
};

export type UserProjectContribution = {
  __typename?: 'UserProjectContribution';
  funder?: Maybe<Funder>;
  isAmbassador: Scalars['Boolean'];
  isFunder: Scalars['Boolean'];
  isSponsor: Scalars['Boolean'];
  project: Project;
};

export type UserQueryInput = {
  id?: InputMaybe<Scalars['BigInt']>;
};

export type Wallet = {
  __typename?: 'Wallet';
  connectionDetails: ConnectionDetails;
  id: Scalars['BigInt'];
  name: Scalars['String'];
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

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Ambassador: ResolverTypeWrapper<Ambassador>;
  AmountSummary: ResolverTypeWrapper<AmountSummary>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ConnectionDetails: ResolversTypes['LndConnectionDetailsPrivate'] | ResolversTypes['LndConnectionDetailsPublic'];
  CreateEntryInput: CreateEntryInput;
  CreateGranteeInput: CreateGranteeInput;
  CreateProjectInput: CreateProjectInput;
  CreateProjectMilestoneInput: CreateProjectMilestoneInput;
  CreateProjectRewardInput: CreateProjectRewardInput;
  CreateWalletInput: CreateWalletInput;
  Currency: Currency;
  CursorInput: CursorInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DonationFundingInput: DonationFundingInput;
  Entry: ResolverTypeWrapper<Entry>;
  EntryType: EntryType;
  ExternalAccount: ResolverTypeWrapper<ExternalAccount>;
  FileUploadInput: FileUploadInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Funder: ResolverTypeWrapper<Funder>;
  FunderReward: ResolverTypeWrapper<FunderReward>;
  FundingCancelResponse: ResolverTypeWrapper<FundingCancelResponse>;
  FundingConfirmInput: FundingConfirmInput;
  FundingConfirmOffChainBolt11Input: FundingConfirmOffChainBolt11Input;
  FundingConfirmOffChainInput: FundingConfirmOffChainInput;
  FundingConfirmOnChainInput: FundingConfirmOnChainInput;
  FundingConfirmResponse: ResolverTypeWrapper<FundingConfirmResponse>;
  FundingCreateFromPodcastKeysendInput: FundingCreateFromPodcastKeysendInput;
  FundingInput: FundingInput;
  FundingMetadataInput: FundingMetadataInput;
  FundingMutationResponse: ResolverTypeWrapper<FundingMutationResponse>;
  FundingPendingInput: FundingPendingInput;
  FundingPendingOnChainInput: FundingPendingOnChainInput;
  FundingPendingResponse: ResolverTypeWrapper<FundingPendingResponse>;
  FundingQueryResponse: ResolverTypeWrapper<FundingQueryResponse>;
  FundingResourceType: FundingResourceType;
  FundingStatus: FundingStatus;
  FundingTx: ResolverTypeWrapper<Omit<FundingTx, 'sourceResource'> & { sourceResource?: Maybe<ResolversTypes['SourceResource']> }>;
  GetEntriesInput: GetEntriesInput;
  GetEntriesOrderByInput: GetEntriesOrderByInput;
  GetEntriesWhereInput: GetEntriesWhereInput;
  GetFunderWhereInput: GetFunderWhereInput;
  GetFundersInput: GetFundersInput;
  GetFundersOrderByInput: GetFundersOrderByInput;
  GetFundingTxsInput: GetFundingTxsInput;
  GetFundingTxsOrderByInput: GetFundingTxsOrderByInput;
  GetFundingTxsWhereInput: GetFundingTxsWhereInput;
  GetProjectRewardInput: GetProjectRewardInput;
  GetProjectRewardWhereInput: GetProjectRewardWhereInput;
  Grantee: ResolverTypeWrapper<Grantee>;
  GranteeSubmissionResponse: ResolverTypeWrapper<GranteeSubmissionResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Like: ResolverTypeWrapper<Like>;
  LndConnectionDetails: never;
  LndConnectionDetailsCreateInput: LndConnectionDetailsCreateInput;
  LndConnectionDetailsPrivate: ResolverTypeWrapper<LndConnectionDetailsPrivate>;
  LndConnectionDetailsPublic: ResolverTypeWrapper<LndConnectionDetailsPublic>;
  LndConnectionDetailsUpdateInput: LndConnectionDetailsUpdateInput;
  LndNodeType: LndNodeType;
  Mutation: ResolverTypeWrapper<{}>;
  OrderByOptions: OrderByOptions;
  Owner: ResolverTypeWrapper<Owner>;
  OwnerOf: ResolverTypeWrapper<OwnerOf>;
  PaginationInput: PaginationInput;
  Project: ResolverTypeWrapper<Project>;
  ProjectMilestone: ResolverTypeWrapper<ProjectMilestone>;
  ProjectOrderByInput: ProjectOrderByInput;
  ProjectReward: ResolverTypeWrapper<ProjectReward>;
  ProjectStatistics: ResolverTypeWrapper<ProjectStatistics>;
  ProjectType: ProjectType;
  ProjectWhereInput: ProjectWhereInput;
  ProjectsGetQueryInput: ProjectsGetQueryInput;
  ProjectsResponse: ResolverTypeWrapper<ProjectsResponse>;
  ProjectsSummary: ResolverTypeWrapper<ProjectsSummary>;
  Query: ResolverTypeWrapper<{}>;
  ResourceInput: ResourceInput;
  RewardFundingInput: RewardFundingInput;
  RewardInput: RewardInput;
  ShippingDestination: ShippingDestination;
  ShippingInput: ShippingInput;
  SignedUploadUrl: ResolverTypeWrapper<SignedUploadUrl>;
  SourceResource: ResolversTypes['Entry'] | ResolversTypes['Project'];
  Sponsor: ResolverTypeWrapper<Sponsor>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  UniqueProjectQueryInput: UniqueProjectQueryInput;
  UpdateEntryInput: UpdateEntryInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateProjectMilestoneInput: UpdateProjectMilestoneInput;
  UpdateProjectRewardInput: UpdateProjectRewardInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWalletInput: UpdateWalletInput;
  User: ResolverTypeWrapper<User>;
  UserProjectContribution: ResolverTypeWrapper<UserProjectContribution>;
  UserQueryInput: UserQueryInput;
  Wallet: ResolverTypeWrapper<Omit<Wallet, 'connectionDetails'> & { connectionDetails: ResolversTypes['ConnectionDetails'] }>;
  amount_Float_NotNull_min_1: ResolverTypeWrapper<Scalars['amount_Float_NotNull_min_1']>;
  amount_Float_min_1: ResolverTypeWrapper<Scalars['amount_Float_min_1']>;
  comment_String_maxLength_280: ResolverTypeWrapper<Scalars['comment_String_maxLength_280']>;
  cost_Float_NotNull_min_1_max_50000000: ResolverTypeWrapper<Scalars['cost_Float_NotNull_min_1_max_50000000']>;
  cost_Int_NotNull_min_0_max_1500000: ResolverTypeWrapper<Scalars['cost_Int_NotNull_min_0_max_1500000']>;
  donationAmount_Int_NotNull_min_1_max_15000000: ResolverTypeWrapper<Scalars['donationAmount_Int_NotNull_min_1_max_15000000']>;
  email_String_format_email: ResolverTypeWrapper<Scalars['email_String_format_email']>;
  fundingGoal_Int_min_1: ResolverTypeWrapper<Scalars['fundingGoal_Int_min_1']>;
  name_String_NotNull_minLength_5_maxLength_280: ResolverTypeWrapper<Scalars['name_String_NotNull_minLength_5_maxLength_280']>;
  quantity_Int_NotNull_min_1: ResolverTypeWrapper<Scalars['quantity_Int_NotNull_min_1']>;
  rewardsCost_Int_NotNull_min_0_max_15000000: ResolverTypeWrapper<Scalars['rewardsCost_Int_NotNull_min_0_max_15000000']>;
  stock_Int_min_0: ResolverTypeWrapper<Scalars['stock_Int_min_0']>;
  title_String_NotNull_maxLength_50: ResolverTypeWrapper<Scalars['title_String_NotNull_maxLength_50']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Ambassador: Ambassador;
  AmountSummary: AmountSummary;
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  ConnectionDetails: ResolversParentTypes['LndConnectionDetailsPrivate'] | ResolversParentTypes['LndConnectionDetailsPublic'];
  CreateEntryInput: CreateEntryInput;
  CreateGranteeInput: CreateGranteeInput;
  CreateProjectInput: CreateProjectInput;
  CreateProjectMilestoneInput: CreateProjectMilestoneInput;
  CreateProjectRewardInput: CreateProjectRewardInput;
  CreateWalletInput: CreateWalletInput;
  CursorInput: CursorInput;
  Date: Scalars['Date'];
  DonationFundingInput: DonationFundingInput;
  Entry: Entry;
  ExternalAccount: ExternalAccount;
  FileUploadInput: FileUploadInput;
  Float: Scalars['Float'];
  Funder: Funder;
  FunderReward: FunderReward;
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
  FundingPendingOnChainInput: FundingPendingOnChainInput;
  FundingPendingResponse: FundingPendingResponse;
  FundingQueryResponse: FundingQueryResponse;
  FundingTx: Omit<FundingTx, 'sourceResource'> & { sourceResource?: Maybe<ResolversParentTypes['SourceResource']> };
  GetEntriesInput: GetEntriesInput;
  GetEntriesOrderByInput: GetEntriesOrderByInput;
  GetEntriesWhereInput: GetEntriesWhereInput;
  GetFunderWhereInput: GetFunderWhereInput;
  GetFundersInput: GetFundersInput;
  GetFundersOrderByInput: GetFundersOrderByInput;
  GetFundingTxsInput: GetFundingTxsInput;
  GetFundingTxsOrderByInput: GetFundingTxsOrderByInput;
  GetFundingTxsWhereInput: GetFundingTxsWhereInput;
  GetProjectRewardInput: GetProjectRewardInput;
  GetProjectRewardWhereInput: GetProjectRewardWhereInput;
  Grantee: Grantee;
  GranteeSubmissionResponse: GranteeSubmissionResponse;
  Int: Scalars['Int'];
  Like: Like;
  LndConnectionDetails: never;
  LndConnectionDetailsCreateInput: LndConnectionDetailsCreateInput;
  LndConnectionDetailsPrivate: LndConnectionDetailsPrivate;
  LndConnectionDetailsPublic: LndConnectionDetailsPublic;
  LndConnectionDetailsUpdateInput: LndConnectionDetailsUpdateInput;
  Mutation: {};
  Owner: Owner;
  OwnerOf: OwnerOf;
  PaginationInput: PaginationInput;
  Project: Project;
  ProjectMilestone: ProjectMilestone;
  ProjectOrderByInput: ProjectOrderByInput;
  ProjectReward: ProjectReward;
  ProjectStatistics: ProjectStatistics;
  ProjectWhereInput: ProjectWhereInput;
  ProjectsGetQueryInput: ProjectsGetQueryInput;
  ProjectsResponse: ProjectsResponse;
  ProjectsSummary: ProjectsSummary;
  Query: {};
  ResourceInput: ResourceInput;
  RewardFundingInput: RewardFundingInput;
  RewardInput: RewardInput;
  ShippingInput: ShippingInput;
  SignedUploadUrl: SignedUploadUrl;
  SourceResource: ResolversParentTypes['Entry'] | ResolversParentTypes['Project'];
  Sponsor: Sponsor;
  String: Scalars['String'];
  Subscription: {};
  UniqueProjectQueryInput: UniqueProjectQueryInput;
  UpdateEntryInput: UpdateEntryInput;
  UpdateProjectInput: UpdateProjectInput;
  UpdateProjectMilestoneInput: UpdateProjectMilestoneInput;
  UpdateProjectRewardInput: UpdateProjectRewardInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWalletInput: UpdateWalletInput;
  User: User;
  UserProjectContribution: UserProjectContribution;
  UserQueryInput: UserQueryInput;
  Wallet: Omit<Wallet, 'connectionDetails'> & { connectionDetails: ResolversParentTypes['ConnectionDetails'] };
  amount_Float_NotNull_min_1: Scalars['amount_Float_NotNull_min_1'];
  amount_Float_min_1: Scalars['amount_Float_min_1'];
  comment_String_maxLength_280: Scalars['comment_String_maxLength_280'];
  cost_Float_NotNull_min_1_max_50000000: Scalars['cost_Float_NotNull_min_1_max_50000000'];
  cost_Int_NotNull_min_0_max_1500000: Scalars['cost_Int_NotNull_min_0_max_1500000'];
  donationAmount_Int_NotNull_min_1_max_15000000: Scalars['donationAmount_Int_NotNull_min_1_max_15000000'];
  email_String_format_email: Scalars['email_String_format_email'];
  fundingGoal_Int_min_1: Scalars['fundingGoal_Int_min_1'];
  name_String_NotNull_minLength_5_maxLength_280: Scalars['name_String_NotNull_minLength_5_maxLength_280'];
  quantity_Int_NotNull_min_1: Scalars['quantity_Int_NotNull_min_1'];
  rewardsCost_Int_NotNull_min_0_max_15000000: Scalars['rewardsCost_Int_NotNull_min_0_max_15000000'];
  stock_Int_min_0: Scalars['stock_Int_min_0'];
  title_String_NotNull_maxLength_50: Scalars['title_String_NotNull_maxLength_50'];
};

export type ConstraintDirectiveArgs = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  exclusiveMax?: Maybe<Scalars['Float']>;
  exclusiveMin?: Maybe<Scalars['Float']>;
  format?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  maxLength?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Float']>;
  minLength?: Maybe<Scalars['Int']>;
  multipleOf?: Maybe<Scalars['Float']>;
  notContains?: Maybe<Scalars['String']>;
  pattern?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  uniqueTypeName?: Maybe<Scalars['String']>;
};

export type ConstraintDirectiveResolver<Result, Parent, ContextType = any, Args = ConstraintDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

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

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type ConnectionDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectionDetails'] = ResolversParentTypes['ConnectionDetails']> = {
  __resolveType: TypeResolveFn<'LndConnectionDetailsPrivate' | 'LndConnectionDetailsPublic', ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = {
  amountFunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fundersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fundingTxs?: Resolver<Array<Maybe<ResolversTypes['FundingTx']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EntryType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalAccount'] = ResolversParentTypes['ExternalAccount']> = {
  externalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externalUsername?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FunderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Funder'] = ResolversParentTypes['Funder']> = {
  amountFunded?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  confirmedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rewards?: Resolver<Array<Maybe<ResolversTypes['FunderReward']>>, ParentType, ContextType>;
  timesFunded?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FunderRewardResolvers<ContextType = any, ParentType extends ResolversParentTypes['FunderReward'] = ResolversParentTypes['FunderReward']> = {
  projectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingCancelResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingCancelResponse'] = ResolversParentTypes['FundingCancelResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingConfirmResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingConfirmResponse'] = ResolversParentTypes['FundingConfirmResponse']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  missedSettleEvents?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundingMutationResponse'] = ResolversParentTypes['FundingMutationResponse']> = {
  amountSummary?: Resolver<Maybe<ResolversTypes['AmountSummary']>, ParentType, ContextType>;
  fundingTx?: Resolver<Maybe<ResolversTypes['FundingTx']>, ParentType, ContextType>;
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
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  funder?: Resolver<ResolversTypes['Funder'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  invoiceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  media?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  onChain?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  paymentRequest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceResource?: Resolver<Maybe<ResolversTypes['SourceResource']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['FundingStatus'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GranteeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Grantee'] = ResolversParentTypes['Grantee']> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GranteeSubmissionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GranteeSubmissionResponse'] = ResolversParentTypes['GranteeSubmissionResponse']> = {
  grantees?: Resolver<Array<Maybe<ResolversTypes['Grantee']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
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
  pubkey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tlsCertificate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LndConnectionDetailsPublicResolvers<ContextType = any, ParentType extends ResolversParentTypes['LndConnectionDetailsPublic'] = ResolversParentTypes['LndConnectionDetailsPublic']> = {
  pubkey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  confirmAmbassador?: Resolver<ResolversTypes['Ambassador'], ParentType, ContextType, RequireFields<MutationConfirmAmbassadorArgs, 'id'>>;
  createAmbassador?: Resolver<ResolversTypes['Ambassador'], ParentType, ContextType, RequireFields<MutationCreateAmbassadorArgs, 'projectId'>>;
  createEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationCreateEntryArgs, 'input'>>;
  createGrantee?: Resolver<ResolversTypes['Grantee'], ParentType, ContextType, RequireFields<MutationCreateGranteeArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  createProjectMilestone?: Resolver<ResolversTypes['ProjectMilestone'], ParentType, ContextType, Partial<MutationCreateProjectMilestoneArgs>>;
  createProjectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType, Partial<MutationCreateProjectRewardArgs>>;
  createSponsor?: Resolver<ResolversTypes['Sponsor'], ParentType, ContextType, RequireFields<MutationCreateSponsorArgs, 'projectId'>>;
  createWallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, Partial<MutationCreateWalletArgs>>;
  deleteProjectMilestone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProjectMilestoneArgs, 'projectMilestoneId'>>;
  fund?: Resolver<ResolversTypes['FundingMutationResponse'], ParentType, ContextType, RequireFields<MutationFundArgs, 'input'>>;
  fundingCancel?: Resolver<ResolversTypes['FundingCancelResponse'], ParentType, ContextType, RequireFields<MutationFundingCancelArgs, 'id'>>;
  fundingClaimAnonymous?: Resolver<ResolversTypes['FundingMutationResponse'], ParentType, ContextType, RequireFields<MutationFundingClaimAnonymousArgs, 'uuid'>>;
  fundingConfirm?: Resolver<ResolversTypes['FundingConfirmResponse'], ParentType, ContextType, RequireFields<MutationFundingConfirmArgs, 'input'>>;
  fundingCreateFromPodcastKeysend?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType, Partial<MutationFundingCreateFromPodcastKeysendArgs>>;
  fundingPend?: Resolver<ResolversTypes['FundingPendingResponse'], ParentType, ContextType, RequireFields<MutationFundingPendArgs, 'input'>>;
  publishEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationPublishEntryArgs, 'id'>>;
  unlinkExternalAccount?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUnlinkExternalAccountArgs, 'id'>>;
  updateEntry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<MutationUpdateEntryArgs, 'input'>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'input'>>;
  updateProjectMilestone?: Resolver<ResolversTypes['ProjectMilestone'], ParentType, ContextType, Partial<MutationUpdateProjectMilestoneArgs>>;
  updateProjectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType, Partial<MutationUpdateProjectRewardArgs>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
  updateWallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, Partial<MutationUpdateWalletArgs>>;
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

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ambassadors?: Resolver<Array<Maybe<ResolversTypes['Ambassador']>>, ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  draft?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType>;
  expiresAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  funders?: Resolver<Array<Maybe<ResolversTypes['Funder']>>, ParentType, ContextType>;
  fundingGoal?: Resolver<Maybe<ResolversTypes['fundingGoal_Int_min_1']>, ParentType, ContextType>;
  fundingTxs?: Resolver<Maybe<Array<Maybe<ResolversTypes['FundingTx']>>>, ParentType, ContextType>;
  grantees?: Resolver<Array<Maybe<ResolversTypes['Grantee']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likes?: Resolver<Array<Maybe<ResolversTypes['Like']>>, ParentType, ContextType>;
  media?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  milestones?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectMilestone']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owners?: Resolver<Array<Maybe<ResolversTypes['Owner']>>, ParentType, ContextType>;
  rewards?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectReward']>>>, ParentType, ContextType>;
  sponsors?: Resolver<Array<Maybe<ResolversTypes['Sponsor']>>, ParentType, ContextType>;
  statistics?: Resolver<Maybe<ResolversTypes['ProjectStatistics']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ProjectType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wallets?: Resolver<Array<ResolversTypes['Wallet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMilestoneResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectMilestone'] = ResolversParentTypes['ProjectMilestone']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectReward'] = ResolversParentTypes['ProjectReward']> = {
  backers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectStatistics'] = ResolversParentTypes['ProjectStatistics']> = {
  totalPageviews?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalVisitors?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectsResponse'] = ResolversParentTypes['ProjectsResponse']> = {
  projects?: Resolver<Array<Maybe<ResolversTypes['Project']>>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['ProjectsSummary']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectsSummary'] = ResolversParentTypes['ProjectsSummary']> = {
  fundedTotal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fundersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  projectsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  entry?: Resolver<ResolversTypes['Entry'], ParentType, ContextType, RequireFields<QueryEntryArgs, 'id'>>;
  fundingTx?: Resolver<ResolversTypes['FundingTx'], ParentType, ContextType, RequireFields<QueryFundingTxArgs, 'id'>>;
  getEntries?: Resolver<Array<Maybe<ResolversTypes['Entry']>>, ParentType, ContextType, Partial<QueryGetEntriesArgs>>;
  getFunders?: Resolver<Array<Maybe<ResolversTypes['Funder']>>, ParentType, ContextType, RequireFields<QueryGetFundersArgs, 'input'>>;
  getFundingTxs?: Resolver<Array<Maybe<ResolversTypes['FundingTx']>>, ParentType, ContextType, Partial<QueryGetFundingTxsArgs>>;
  getProjectPubkey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetProjectPubkeyArgs, 'projectId'>>;
  getProjectReward?: Resolver<ResolversTypes['ProjectReward'], ParentType, ContextType, RequireFields<QueryGetProjectRewardArgs, 'id'>>;
  getProjectRewards?: Resolver<Array<Maybe<ResolversTypes['ProjectReward']>>, ParentType, ContextType, RequireFields<QueryGetProjectRewardsArgs, 'input'>>;
  getSignedUploadUrl?: Resolver<ResolversTypes['SignedUploadUrl'], ParentType, ContextType, RequireFields<QueryGetSignedUploadUrlArgs, 'input'>>;
  getWallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<QueryGetWalletArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'where'>>;
  projects?: Resolver<ResolversTypes['ProjectsResponse'], ParentType, ContextType, Partial<QueryProjectsArgs>>;
  projectsSummary?: Resolver<ResolversTypes['ProjectsSummary'], ParentType, ContextType>;
  statusCheck?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<QueryUserArgs>>;
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
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "_", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  contributions?: Resolver<Array<Maybe<ResolversTypes['UserProjectContribution']>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalAccounts?: Resolver<Array<Maybe<ResolversTypes['ExternalAccount']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerOf?: Resolver<Array<Maybe<ResolversTypes['OwnerOf']>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Amount_Float_NotNull_Min_1ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['amount_Float_NotNull_min_1'], any> {
  name: 'amount_Float_NotNull_min_1';
}

export interface Amount_Float_Min_1ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['amount_Float_min_1'], any> {
  name: 'amount_Float_min_1';
}

export interface Comment_String_MaxLength_280ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['comment_String_maxLength_280'], any> {
  name: 'comment_String_maxLength_280';
}

export interface Cost_Float_NotNull_Min_1_Max_50000000ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['cost_Float_NotNull_min_1_max_50000000'], any> {
  name: 'cost_Float_NotNull_min_1_max_50000000';
}

export interface Cost_Int_NotNull_Min_0_Max_1500000ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['cost_Int_NotNull_min_0_max_1500000'], any> {
  name: 'cost_Int_NotNull_min_0_max_1500000';
}

export interface DonationAmount_Int_NotNull_Min_1_Max_15000000ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['donationAmount_Int_NotNull_min_1_max_15000000'], any> {
  name: 'donationAmount_Int_NotNull_min_1_max_15000000';
}

export interface Email_String_Format_EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['email_String_format_email'], any> {
  name: 'email_String_format_email';
}

export interface FundingGoal_Int_Min_1ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['fundingGoal_Int_min_1'], any> {
  name: 'fundingGoal_Int_min_1';
}

export interface Name_String_NotNull_MinLength_5_MaxLength_280ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['name_String_NotNull_minLength_5_maxLength_280'], any> {
  name: 'name_String_NotNull_minLength_5_maxLength_280';
}

export interface Quantity_Int_NotNull_Min_1ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['quantity_Int_NotNull_min_1'], any> {
  name: 'quantity_Int_NotNull_min_1';
}

export interface RewardsCost_Int_NotNull_Min_0_Max_15000000ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['rewardsCost_Int_NotNull_min_0_max_15000000'], any> {
  name: 'rewardsCost_Int_NotNull_min_0_max_15000000';
}

export interface Stock_Int_Min_0ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['stock_Int_min_0'], any> {
  name: 'stock_Int_min_0';
}

export interface Title_String_NotNull_MaxLength_50ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['title_String_NotNull_maxLength_50'], any> {
  name: 'title_String_NotNull_maxLength_50';
}

export type Resolvers<ContextType = any> = {
  Ambassador?: AmbassadorResolvers<ContextType>;
  AmountSummary?: AmountSummaryResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  ConnectionDetails?: ConnectionDetailsResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Entry?: EntryResolvers<ContextType>;
  ExternalAccount?: ExternalAccountResolvers<ContextType>;
  Funder?: FunderResolvers<ContextType>;
  FunderReward?: FunderRewardResolvers<ContextType>;
  FundingCancelResponse?: FundingCancelResponseResolvers<ContextType>;
  FundingConfirmResponse?: FundingConfirmResponseResolvers<ContextType>;
  FundingMutationResponse?: FundingMutationResponseResolvers<ContextType>;
  FundingPendingResponse?: FundingPendingResponseResolvers<ContextType>;
  FundingQueryResponse?: FundingQueryResponseResolvers<ContextType>;
  FundingTx?: FundingTxResolvers<ContextType>;
  Grantee?: GranteeResolvers<ContextType>;
  GranteeSubmissionResponse?: GranteeSubmissionResponseResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  LndConnectionDetails?: LndConnectionDetailsResolvers<ContextType>;
  LndConnectionDetailsPrivate?: LndConnectionDetailsPrivateResolvers<ContextType>;
  LndConnectionDetailsPublic?: LndConnectionDetailsPublicResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  OwnerOf?: OwnerOfResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectMilestone?: ProjectMilestoneResolvers<ContextType>;
  ProjectReward?: ProjectRewardResolvers<ContextType>;
  ProjectStatistics?: ProjectStatisticsResolvers<ContextType>;
  ProjectsResponse?: ProjectsResponseResolvers<ContextType>;
  ProjectsSummary?: ProjectsSummaryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignedUploadUrl?: SignedUploadUrlResolvers<ContextType>;
  SourceResource?: SourceResourceResolvers<ContextType>;
  Sponsor?: SponsorResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserProjectContribution?: UserProjectContributionResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
  amount_Float_NotNull_min_1?: GraphQLScalarType;
  amount_Float_min_1?: GraphQLScalarType;
  comment_String_maxLength_280?: GraphQLScalarType;
  cost_Float_NotNull_min_1_max_50000000?: GraphQLScalarType;
  cost_Int_NotNull_min_0_max_1500000?: GraphQLScalarType;
  donationAmount_Int_NotNull_min_1_max_15000000?: GraphQLScalarType;
  email_String_format_email?: GraphQLScalarType;
  fundingGoal_Int_min_1?: GraphQLScalarType;
  name_String_NotNull_minLength_5_maxLength_280?: GraphQLScalarType;
  quantity_Int_NotNull_min_1?: GraphQLScalarType;
  rewardsCost_Int_NotNull_min_0_max_15000000?: GraphQLScalarType;
  stock_Int_min_0?: GraphQLScalarType;
  title_String_NotNull_maxLength_50?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = any> = {
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>;
};
