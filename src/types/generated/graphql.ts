import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
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
  cost_Float_NotNull_min_1_max_1000000: any;
  cost_Int_NotNull_min_0: any;
  description_String_NotNull_maxLength_250: any;
  description_String_NotNull_maxLength_2200: any;
  description_String_maxLength_250: any;
  description_String_maxLength_2200: any;
  donationAmount_Int_NotNull_min_1: any;
  email_String_NotNull_format_email: any;
  email_String_format_email: any;
  fundingGoal_Int_min_1: any;
  name_String_NotNull_maxLength_100: any;
  name_String_NotNull_minLength_5_maxLength_60: any;
  name_String_NotNull_minLength_5_maxLength_280: any;
  name_String_maxLength_100: any;
  name_String_minLength_5_maxLength_60: any;
  name_String_minLength_5_maxLength_280: any;
  pubkey_String_NotNull_minLength_66_maxLength_66: any;
  pubkey_String_minLength_66_maxLength_66: any;
  quantity_Int_NotNull_min_1: any;
  rewardsCost_Int_NotNull_min_0: any;
  stock_Int_min_0: any;
  title_String_NotNull_maxLength_60: any;
  title_String_NotNull_maxLength_150: any;
  title_String_maxLength_60: any;
  title_String_maxLength_150: any;
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

export type ConnectionDetails =
  | LndConnectionDetailsPrivate
  | LndConnectionDetailsPublic;

export type CreateEntryInput = {
  content?: InputMaybe<Scalars['String']>;
  /** Short description of the Entry. */
  description: Scalars['description_String_NotNull_maxLength_2200'];
  /** Header image of the Entry. */
  image?: InputMaybe<Scalars['String']>;
  projectId: Scalars['BigInt'];
  /** Title of the Entry. */
  title: Scalars['title_String_NotNull_maxLength_150'];
  type: EntryType;
};

export type CreateGranteeInput = {
  name: Scalars['String'];
  projectId: Scalars['BigInt'];
  url: Scalars['String'];
};

export type CreateProjectInput = {
  /** A short description of the project. */
  description: Scalars['description_String_NotNull_maxLength_2200'];
  email: Scalars['email_String_NotNull_format_email'];
  expiresAt?: InputMaybe<Scalars['String']>;
  fundingGoal?: InputMaybe<Scalars['fundingGoal_Int_min_1']>;
  /** Main project image. */
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['name_String_NotNull_minLength_5_maxLength_60'];
  /** The currency used to price rewards for the project. Currently only USD supported. Should become an Enum. */
  rewardCurrency?: InputMaybe<RewardCurrency>;
  /** Public title of the project. */
  title: Scalars['title_String_NotNull_maxLength_60'];
  type?: InputMaybe<ProjectType>;
};

export type CreateProjectMilestoneInput = {
  /** Amount the project balance must reach to consider the milestone completed, in satoshis. */
  amount: Scalars['amount_Float_NotNull_min_1'];
  description: Scalars['description_String_NotNull_maxLength_250'];
  name: Scalars['name_String_NotNull_maxLength_100'];
  projectId: Scalars['BigInt'];
};

export type CreateProjectRewardInput = {
  /** Cost of the reward, priced in USD cents */
  cost: Scalars['cost_Float_NotNull_min_1_max_1000000'];
  description: Scalars['description_String_NotNull_maxLength_250'];
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['name_String_NotNull_maxLength_100'];
  projectId: Scalars['BigInt'];
  stock?: InputMaybe<Scalars['stock_Int_min_0']>;
};

export type CreateWalletInput = {
  lndConnectionDetailsInput?: InputMaybe<LndConnectionDetailsCreateInput>;
  name?: InputMaybe<Scalars['name_String_minLength_5_maxLength_60']>;
  resourceInput: ResourceInput;
};

export enum Currency {
  Usd = 'usd',
}

export type CursorInput = {
  id: Scalars['Int'];
};

export type DonationFundingInput = {
  /** The donation amount, in satoshis. */
  donationAmount: Scalars['donationAmount_Int_NotNull_min_1'];
};

export type Entry = {
  __typename?: 'Entry';
  /** Total amount of satoshis funded from the Entry page. */
  amountFunded: Scalars['Int'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  /** User that created the Entry. */
  creator: User;
  /** Short description of the Entry. */
  description: Scalars['description_String_NotNull_maxLength_2200'];
  /** Number of funders that were created from the Entry's page. */
  fundersCount: Scalars['Int'];
  /** Funding transactions that were created from the Entry's page. */
  fundingTxs: Array<Maybe<FundingTx>>;
  id: Scalars['BigInt'];
  /** Header image of the Entry. */
  image?: Maybe<Scalars['String']>;
  /** Project within which the Entry was created. */
  project?: Maybe<Project>;
  /** @deprecated This field was replaced by the status field and will eventually be removed. */
  published: Scalars['Boolean'];
  publishedAt?: Maybe<Scalars['String']>;
  status: EntryStatus;
  /** Title of the Entry. */
  title: Scalars['title_String_NotNull_maxLength_60'];
  type: EntryType;
  updatedAt: Scalars['String'];
};

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
  __typename?: 'ExternalAccount';
  externalId: Scalars['String'];
  externalUsername: Scalars['String'];
  id: Scalars['BigInt'];
  public: Scalars['Boolean'];
  type: Scalars['String'];
};

export type FileUploadInput = {
  name?: InputMaybe<Scalars['String']>;
  /** MIME type of the file. Currently only supports image types. */
  type?: InputMaybe<Scalars['String']>;
};

/** The Funder type contains a User's funding details over a particular project. */
export type Funder = {
  __typename?: 'Funder';
  /** Aggregate amount funded by a Funder over all his (confirmed) funding transactions for a particular project, in satoshis. */
  amountFunded?: Maybe<Scalars['Int']>;
  /** Boolean value indicating whether at least one of the funding transactions of the Funder were confirmed. */
  confirmed: Scalars['Boolean'];
  /** Time at which the first confirmed funding transactions of the Funder was confirmed. */
  confirmedAt?: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  rewards: Array<Maybe<FunderReward>>;
  /** Number of (confirmed) times a Funder funded a particular project. */
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
  /** The resource from which the funding transaction is being created. */
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
  User = 'user',
}

export enum FundingStatus {
  Canceled = 'canceled',
  Paid = 'paid',
  Pending = 'pending',
  Unpaid = 'unpaid',
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

export type LndConnectionDetails = {
  /** Port where the gRPC calls should be made. */
  grpcPort: Scalars['Int'];
  /** Hostname where the gRPC calls should be made. */
  hostname: Scalars['String'];
  lndNodeType: LndNodeType;
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon: Scalars['String'];
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: Maybe<Scalars['String']>;
};

export type LndConnectionDetailsCreateInput = {
  /** Port where the gRPC calls should be made. */
  grpcPort: Scalars['Int'];
  /** Hostname where the gRPC calls should be made. */
  hostname: Scalars['String'];
  lndNodeType: LndNodeType;
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon: Scalars['String'];
  /** Public key of the LND node. */
  pubkey: Scalars['pubkey_String_NotNull_minLength_66_maxLength_66'];
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: InputMaybe<Scalars['String']>;
};

/** Private node details that can only be queried by the wallet owner. */
export type LndConnectionDetailsPrivate = {
  __typename?: 'LndConnectionDetailsPrivate';
  /** Port where the gRPC calls should be made. */
  grpcPort: Scalars['Int'];
  /** Hostname where the gRPC calls should be made. */
  hostname: Scalars['String'];
  /** Type of the LND node used. */
  lndNodeType: LndNodeType;
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon: Scalars['String'];
  /** Public key of the LND node. */
  pubkey: Scalars['pubkey_String_NotNull_minLength_66_maxLength_66'];
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: Maybe<Scalars['String']>;
};

/** Public node details visible by anyone. */
export type LndConnectionDetailsPublic = {
  __typename?: 'LndConnectionDetailsPublic';
  pubkey: Scalars['pubkey_String_NotNull_minLength_66_maxLength_66'];
};

export type LndConnectionDetailsUpdateInput = {
  /** Port where the gRPC calls should be made. */
  grpcPort?: InputMaybe<Scalars['Int']>;
  /** Hostname where the gRPC calls should be made. */
  hostname?: InputMaybe<Scalars['String']>;
  /** Invoice macaroon for authenticating gRPC calls to the LND node. */
  macaroon?: InputMaybe<Scalars['String']>;
  /** Public key of the LND node. */
  pubkey?: InputMaybe<Scalars['pubkey_String_minLength_66_maxLength_66']>;
  /** TLS certificate for the LND node (optional for Voltage nodes). */
  tlsCertificate?: InputMaybe<Scalars['String']>;
};

export enum LndNodeType {
  Custom = 'custom',
  Geyser = 'geyser',
  Voltage = 'voltage',
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
  deleteEntry: Entry;
  deleteProjectMilestone: Scalars['Boolean'];
  fund: FundingMutationResponse;
  fundingCancel: FundingCancelResponse;
  fundingClaimAnonymous: FundingMutationResponse;
  fundingConfirm: FundingConfirmResponse;
  fundingCreateFromPodcastKeysend: FundingTx;
  fundingPend: FundingPendingResponse;
  /** Makes the Entry public. */
  publishEntry: Entry;
  unlinkExternalAccount: User;
  updateEntry: Entry;
  updateProject: Project;
  updateProjectMilestone: ProjectMilestone;
  updateProjectReward: ProjectReward;
  updateUser: User;
  /** This operation is currently not supported. */
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

export type MutationDeleteEntryArgs = {
  id: Scalars['BigInt'];
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

export type OffsetBasedPaginationInput = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export enum OrderByOptions {
  Asc = 'asc',
  Desc = 'desc',
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

/** Cursor pagination input. */
export type PaginationInput = {
  cursor?: InputMaybe<CursorInput>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Project = {
  __typename?: 'Project';
  /** @deprecated this field will soon be replaced by the status field */
  active: Scalars['Boolean'];
  /** @deprecated Field no longer supported */
  ambassadors: Array<Maybe<Ambassador>>;
  /** Total amount raised by the project, in satoshis. */
  balance: Scalars['Int'];
  createdAt: Scalars['String'];
  /** A short description of the project. */
  description?: Maybe<Scalars['description_String_maxLength_2200']>;
  /** @deprecated this field will soon be replaced by the status field */
  draft: Scalars['Boolean'];
  /**
   * By default, returns all the entries of a project, both published and unpublished but not deleted.
   * To filter the result set, an explicit input can be passed that specifies a value of true or false for the published field.
   * An unpublished entry is only returned if the requesting user is the creator of the entry.
   */
  entries: Array<Maybe<Entry>>;
  expiresAt?: Maybe<Scalars['String']>;
  funders: Array<Maybe<Funder>>;
  fundingGoal?: Maybe<Scalars['fundingGoal_Int_min_1']>;
  fundingTxs?: Maybe<Array<Maybe<FundingTx>>>;
  /** @deprecated Field no longer supported */
  grantees: Array<Maybe<Grantee>>;
  id: Scalars['BigInt'];
  /** Main project image. */
  image?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  media: Array<Maybe<Scalars['String']>>;
  milestones?: Maybe<Array<Maybe<ProjectMilestone>>>;
  /** Unique name for the project. Used for the project URL and lightning address. */
  name: Scalars['name_String_NotNull_minLength_5_maxLength_280'];
  owners: Array<Owner>;
  rewardCurrency?: Maybe<RewardCurrency>;
  rewards?: Maybe<Array<Maybe<ProjectReward>>>;
  /** @deprecated Field no longer supported */
  sponsors: Array<Maybe<Sponsor>>;
  /** Returns summary statistics on the Project views and visitors. */
  statistics?: Maybe<ProjectStatistics>;
  /** Public title of the project. */
  title: Scalars['title_String_NotNull_maxLength_60'];
  type: ProjectType;
  updatedAt: Scalars['String'];
  /** Wallets linked to a Project. */
  wallets: Array<Wallet>;
};

export type ProjectEntriesArgs = {
  input?: InputMaybe<ProjectEntriesGetInput>;
};

export type ProjectEntriesGetInput = {
  where?: InputMaybe<ProjectEntriesGetWhereInput>;
};

export type ProjectEntriesGetWhereInput = {
  published?: InputMaybe<Scalars['Boolean']>;
};

export type ProjectMilestone = {
  __typename?: 'ProjectMilestone';
  /** Amount the project balance must reach to consider the milestone completed, in satoshis. */
  amount: Scalars['Float'];
  description?: Maybe<Scalars['description_String_maxLength_250']>;
  id: Scalars['BigInt'];
  name: Scalars['name_String_NotNull_maxLength_100'];
};

export type ProjectReward = {
  __typename?: 'ProjectReward';
  /** @deprecated Deprecated field please use 'sold' instead */
  backers: Scalars['Int'];
  /** Cost of the reward, priced in USD cents. */
  cost: Scalars['Int'];
  /**
   * Whether the reward is deleted or not. Deleted rewards should not appear in the funding flow. Moreover, deleted
   * rewards should only be visible by the project owner and the users that purchased it.
   */
  deleted: Scalars['Boolean'];
  /** Short description of the reward. */
  description?: Maybe<Scalars['description_String_maxLength_250']>;
  id: Scalars['BigInt'];
  /** Image of the reward. */
  image?: Maybe<Scalars['String']>;
  /** Name of the reward. */
  name: Scalars['name_String_NotNull_maxLength_100'];
  sold: Scalars['Int'];
  stock: Scalars['Int'];
};

export type ProjectStatistics = {
  __typename?: 'ProjectStatistics';
  totalPageviews: Scalars['Int'];
  totalVisitors: Scalars['Int'];
};

export enum ProjectStatus {
  Active = 'active',
  Deleted = 'deleted',
  Draft = 'draft',
}

export enum ProjectType {
  Donation = 'donation',
  Grant = 'grant',
  Reward = 'reward',
}

export type ProjectWhereInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['BigInt']>;
  /** Unique name for the project. Used for the project URL and lightning address. */
  name?: InputMaybe<Scalars['name_String_minLength_5_maxLength_280']>;
  type?: InputMaybe<ProjectType>;
};

export type ProjectsGetQueryInput = {
  /**
   * Takes an array of Project OrderBy options. When passing multiple ordering options, each option must
   * be passed in a separate object in the array. This ensures consistent ordering of the orderBy options in the
   * result set.
   */
  orderBy?: InputMaybe<Array<InputMaybe<ProjectsOrderByInput>>>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<ProjectWhereInput>;
};

export type ProjectsOrderByInput = {
  balance?: InputMaybe<OrderByOptions>;
  createdAt?: InputMaybe<OrderByOptions>;
};

export type ProjectsResponse = {
  __typename?: 'ProjectsResponse';
  projects: Array<Maybe<Project>>;
  summary?: Maybe<ProjectsSummary>;
};

export type ProjectsSummary = {
  __typename?: 'ProjectsSummary';
  /** Total of satoshis raised by projects on the platform. */
  fundedTotal?: Maybe<Scalars['Int']>;
  /** Total number of funders on the platform. */
  fundersCount?: Maybe<Scalars['Int']>;
  /** Total number of projects ever created on the platform. */
  projectsCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  entry: Entry;
  fundingTx: FundingTx;
  /** Returns all published entries. */
  getEntries: Array<Maybe<Entry>>;
  getFunders: Array<Maybe<Funder>>;
  getFundingTxs: Array<Maybe<FundingTx>>;
  /** Returns the public key of the Lightning node linked to a project, if there is one. */
  getProjectPubkey?: Maybe<Scalars['String']>;
  getProjectReward: ProjectReward;
  getProjectRewards: Array<Maybe<ProjectReward>>;
  getSignedUploadUrl: SignedUploadUrl;
  getWallet: Wallet;
  me?: Maybe<User>;
  project?: Maybe<Project>;
  /** By default, returns a list of all active projects. */
  projects: ProjectsResponse;
  /** Returns summary statistics of all projects, both current and past. */
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
  where: UserGetInput;
};

export type ResourceInput = {
  resourceId: Scalars['BigInt'];
  resourceType: FundingResourceType;
};

export enum RewardCurrency {
  Usd = 'usd',
}

export type RewardFundingInput = {
  rewards: Array<RewardInput>;
  /**
   * Total cost of rewards, in satoshis. This amount will be used for the invoice  unless there is more than 1%
   * slippage with the reward cost calculated in the backend.
   */
  rewardsCost: Scalars['rewardsCost_Int_NotNull_min_0'];
  shipping?: InputMaybe<ShippingInput>;
};

export type RewardInput = {
  id: Scalars['BigInt'];
  /** Number of times a reward was selected. */
  quantity: Scalars['quantity_Int_NotNull_min_1'];
};

export enum ShippingDestination {
  International = 'international',
  National = 'national',
}

export type ShippingInput = {
  /** The shipping cost, in satoshis. */
  cost: Scalars['cost_Int_NotNull_min_0'];
  destination: ShippingDestination;
};

export type SignedUploadUrl = {
  __typename?: 'SignedUploadUrl';
  /** Distribution URL from which the image will be served */
  distributionUrl: Scalars['String'];
  /** Signed URL used by the client to upload an image */
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
  /** Unique name for the project. Used for the project URL and lightning address. */
  name?: InputMaybe<Scalars['name_String_minLength_5_maxLength_280']>;
};

export type UpdateEntryInput = {
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['description_String_maxLength_2200']>;
  entryId: Scalars['BigInt'];
  /** Header image of the Entry. */
  image?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['title_String_maxLength_150']>;
};

export type UpdateProjectInput = {
  /** @deprecated this field will soon be replaced by the status field */
  active?: InputMaybe<Scalars['Boolean']>;
  /** A short description of the project. */
  description?: InputMaybe<Scalars['description_String_maxLength_2200']>;
  /** @deprecated this field will soon be replaced by the status field */
  draft?: InputMaybe<Scalars['Boolean']>;
  expiresAt?: InputMaybe<Scalars['String']>;
  fundingGoal?: InputMaybe<Scalars['fundingGoal_Int_min_1']>;
  /** Main project image. */
  image?: InputMaybe<Scalars['String']>;
  projectId: Scalars['BigInt'];
  /** The currency used to price rewards for the project. Currently only USD supported. Should become an Enum. */
  rewardCurrency?: InputMaybe<Scalars['String']>;
  /** Current status of the project, either active, draft or deleted. */
  status?: InputMaybe<ProjectStatus>;
  /** Public title of the project. */
  title?: InputMaybe<Scalars['title_String_maxLength_60']>;
  type?: InputMaybe<ProjectType>;
};

export type UpdateProjectMilestoneInput = {
  /** Amount the project balance must reach to consider the milestone completed, in satoshis. */
  amount?: InputMaybe<Scalars['amount_Float_min_1']>;
  description?: InputMaybe<Scalars['description_String_maxLength_250']>;
  name?: InputMaybe<Scalars['name_String_maxLength_100']>;
  projectMilestoneId: Scalars['BigInt'];
};

export type UpdateProjectRewardInput = {
  /** Cost of the reward, priced in USD cents */
  cost: Scalars['cost_Float_NotNull_min_1_max_1000000'];
  /** Soft deletes the reward. */
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['description_String_maxLength_250']>;
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['name_String_NotNull_maxLength_100'];
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
  name?: InputMaybe<Scalars['name_String_minLength_5_maxLength_60']>;
};

export type User = {
  __typename?: 'User';
  /** Details on the participation of a User in a project. */
  contributions: Array<Maybe<UserProjectContribution>>;
  email?: Maybe<Scalars['String']>;
  /**
   * By default, returns all the entries of a user, both published and unpublished but not deleted.
   * To filter the result set, an explicit input can be passed that specifies a value of true or false for the published field.
   * An unpublished entry is only returned if the requesting user is the creator of the entry.
   */
  entries: Array<Maybe<Entry>>;
  /**
   * External accounts linked to the User. It can be a twitter account if the User linked their account. For anonymous
   * users, this field can contain the wallet or app from which they funded, eg: Fountain, Breeze, etc.
   */
  externalAccounts: Array<Maybe<ExternalAccount>>;
  /** Returns a user's funding transactions accross all projects. */
  fundingTxs: Array<Maybe<FundingTx>>;
  id: Scalars['BigInt'];
  imageUrl?: Maybe<Scalars['String']>;
  ownerOf: Array<Maybe<OwnerOf>>;
  /**
   * Returns the projects of a user. By default, this field returns all the projects for that user, both draft and non-draft.
   * To filter the result set, an explicit input can be passed that specifies a value of true or false for the draft field.
   * An unpublished project is only returned if the requesting user is the owner of the project.
   */
  projects: Array<Maybe<Project>>;
  username: Scalars['String'];
};

export type UserEntriesArgs = {
  input?: InputMaybe<UserEntriesGetInput>;
};

export type UserProjectsArgs = {
  input?: InputMaybe<UserProjectsGetInput>;
};

export type UserEntriesGetInput = {
  where?: InputMaybe<UserEntriesGetWhereInput>;
};

export type UserEntriesGetWhereInput = {
  published?: InputMaybe<Scalars['Boolean']>;
};

export type UserGetInput = {
  id: Scalars['BigInt'];
};

export type UserProjectContribution = {
  __typename?: 'UserProjectContribution';
  /** Funder linked to the funding contribution. Only present if the contribution was a funding contribution. */
  funder?: Maybe<Funder>;
  /**
   * Boolean value indicating if the User was an ambassador of the project.
   * @deprecated Field no longer supported
   */
  isAmbassador: Scalars['Boolean'];
  /** Boolean value indicating if the User funded the project. */
  isFunder: Scalars['Boolean'];
  /**
   * Boolean value indicating if the User was a sponsor for the project.
   * @deprecated Field no longer supported
   */
  isSponsor: Scalars['Boolean'];
  /** Project linked to the contributions. */
  project: Project;
};

export type UserProjectsGetInput = {
  where?: InputMaybe<UserProjectsGetWhereInput>;
};

export type UserProjectsGetWhereInput = {
  draft?: InputMaybe<Scalars['Boolean']>;
};

export type Wallet = {
  __typename?: 'Wallet';
  connectionDetails: ConnectionDetails;
  id: Scalars['BigInt'];
  /** Wallet name */
  name: Scalars['name_String_NotNull_minLength_5_maxLength_60'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

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
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

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
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

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
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Ambassador: ResolverTypeWrapper<Ambassador>;
  AmountSummary: ResolverTypeWrapper<AmountSummary>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ConnectionDetails:
    | ResolversTypes['LndConnectionDetailsPrivate']
    | ResolversTypes['LndConnectionDetailsPublic'];
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
  EntryStatus: EntryStatus;
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
  FundingTx: ResolverTypeWrapper<
    Omit<FundingTx, 'sourceResource'> & {
      sourceResource?: Maybe<ResolversTypes['SourceResource']>;
    }
  >;
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
  LndConnectionDetails: never;
  LndConnectionDetailsCreateInput: LndConnectionDetailsCreateInput;
  LndConnectionDetailsPrivate: ResolverTypeWrapper<LndConnectionDetailsPrivate>;
  LndConnectionDetailsPublic: ResolverTypeWrapper<LndConnectionDetailsPublic>;
  LndConnectionDetailsUpdateInput: LndConnectionDetailsUpdateInput;
  LndNodeType: LndNodeType;
  Mutation: ResolverTypeWrapper<{}>;
  OffsetBasedPaginationInput: OffsetBasedPaginationInput;
  OrderByOptions: OrderByOptions;
  Owner: ResolverTypeWrapper<Owner>;
  OwnerOf: ResolverTypeWrapper<OwnerOf>;
  PaginationInput: PaginationInput;
  Project: ResolverTypeWrapper<Project>;
  ProjectEntriesGetInput: ProjectEntriesGetInput;
  ProjectEntriesGetWhereInput: ProjectEntriesGetWhereInput;
  ProjectMilestone: ResolverTypeWrapper<ProjectMilestone>;
  ProjectReward: ResolverTypeWrapper<ProjectReward>;
  ProjectStatistics: ResolverTypeWrapper<ProjectStatistics>;
  ProjectStatus: ProjectStatus;
  ProjectType: ProjectType;
  ProjectWhereInput: ProjectWhereInput;
  ProjectsGetQueryInput: ProjectsGetQueryInput;
  ProjectsOrderByInput: ProjectsOrderByInput;
  ProjectsResponse: ResolverTypeWrapper<ProjectsResponse>;
  ProjectsSummary: ResolverTypeWrapper<ProjectsSummary>;
  Query: ResolverTypeWrapper<{}>;
  ResourceInput: ResourceInput;
  RewardCurrency: RewardCurrency;
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
  UserEntriesGetInput: UserEntriesGetInput;
  UserEntriesGetWhereInput: UserEntriesGetWhereInput;
  UserGetInput: UserGetInput;
  UserProjectContribution: ResolverTypeWrapper<UserProjectContribution>;
  UserProjectsGetInput: UserProjectsGetInput;
  UserProjectsGetWhereInput: UserProjectsGetWhereInput;
  Wallet: ResolverTypeWrapper<
    Omit<Wallet, 'connectionDetails'> & {
      connectionDetails: ResolversTypes['ConnectionDetails'];
    }
  >;
  amount_Float_NotNull_min_1: ResolverTypeWrapper<
    Scalars['amount_Float_NotNull_min_1']
  >;
  amount_Float_min_1: ResolverTypeWrapper<Scalars['amount_Float_min_1']>;
  comment_String_maxLength_280: ResolverTypeWrapper<
    Scalars['comment_String_maxLength_280']
  >;
  cost_Float_NotNull_min_1_max_1000000: ResolverTypeWrapper<
    Scalars['cost_Float_NotNull_min_1_max_1000000']
  >;
  cost_Int_NotNull_min_0: ResolverTypeWrapper<
    Scalars['cost_Int_NotNull_min_0']
  >;
  description_String_NotNull_maxLength_250: ResolverTypeWrapper<
    Scalars['description_String_NotNull_maxLength_250']
  >;
  description_String_NotNull_maxLength_2200: ResolverTypeWrapper<
    Scalars['description_String_NotNull_maxLength_2200']
  >;
  description_String_maxLength_250: ResolverTypeWrapper<
    Scalars['description_String_maxLength_250']
  >;
  description_String_maxLength_2200: ResolverTypeWrapper<
    Scalars['description_String_maxLength_2200']
  >;
  donationAmount_Int_NotNull_min_1: ResolverTypeWrapper<
    Scalars['donationAmount_Int_NotNull_min_1']
  >;
  email_String_NotNull_format_email: ResolverTypeWrapper<
    Scalars['email_String_NotNull_format_email']
  >;
  email_String_format_email: ResolverTypeWrapper<
    Scalars['email_String_format_email']
  >;
  fundingGoal_Int_min_1: ResolverTypeWrapper<Scalars['fundingGoal_Int_min_1']>;
  name_String_NotNull_maxLength_100: ResolverTypeWrapper<
    Scalars['name_String_NotNull_maxLength_100']
  >;
  name_String_NotNull_minLength_5_maxLength_60: ResolverTypeWrapper<
    Scalars['name_String_NotNull_minLength_5_maxLength_60']
  >;
  name_String_NotNull_minLength_5_maxLength_280: ResolverTypeWrapper<
    Scalars['name_String_NotNull_minLength_5_maxLength_280']
  >;
  name_String_maxLength_100: ResolverTypeWrapper<
    Scalars['name_String_maxLength_100']
  >;
  name_String_minLength_5_maxLength_60: ResolverTypeWrapper<
    Scalars['name_String_minLength_5_maxLength_60']
  >;
  name_String_minLength_5_maxLength_280: ResolverTypeWrapper<
    Scalars['name_String_minLength_5_maxLength_280']
  >;
  pubkey_String_NotNull_minLength_66_maxLength_66: ResolverTypeWrapper<
    Scalars['pubkey_String_NotNull_minLength_66_maxLength_66']
  >;
  pubkey_String_minLength_66_maxLength_66: ResolverTypeWrapper<
    Scalars['pubkey_String_minLength_66_maxLength_66']
  >;
  quantity_Int_NotNull_min_1: ResolverTypeWrapper<
    Scalars['quantity_Int_NotNull_min_1']
  >;
  rewardsCost_Int_NotNull_min_0: ResolverTypeWrapper<
    Scalars['rewardsCost_Int_NotNull_min_0']
  >;
  stock_Int_min_0: ResolverTypeWrapper<Scalars['stock_Int_min_0']>;
  title_String_NotNull_maxLength_60: ResolverTypeWrapper<
    Scalars['title_String_NotNull_maxLength_60']
  >;
  title_String_NotNull_maxLength_150: ResolverTypeWrapper<
    Scalars['title_String_NotNull_maxLength_150']
  >;
  title_String_maxLength_60: ResolverTypeWrapper<
    Scalars['title_String_maxLength_60']
  >;
  title_String_maxLength_150: ResolverTypeWrapper<
    Scalars['title_String_maxLength_150']
  >;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Ambassador: Ambassador;
  AmountSummary: AmountSummary;
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  ConnectionDetails:
    | ResolversParentTypes['LndConnectionDetailsPrivate']
    | ResolversParentTypes['LndConnectionDetailsPublic'];
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
  FundingTx: Omit<FundingTx, 'sourceResource'> & {
    sourceResource?: Maybe<ResolversParentTypes['SourceResource']>;
  };
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
  LndConnectionDetails: never;
  LndConnectionDetailsCreateInput: LndConnectionDetailsCreateInput;
  LndConnectionDetailsPrivate: LndConnectionDetailsPrivate;
  LndConnectionDetailsPublic: LndConnectionDetailsPublic;
  LndConnectionDetailsUpdateInput: LndConnectionDetailsUpdateInput;
  Mutation: {};
  OffsetBasedPaginationInput: OffsetBasedPaginationInput;
  Owner: Owner;
  OwnerOf: OwnerOf;
  PaginationInput: PaginationInput;
  Project: Project;
  ProjectEntriesGetInput: ProjectEntriesGetInput;
  ProjectEntriesGetWhereInput: ProjectEntriesGetWhereInput;
  ProjectMilestone: ProjectMilestone;
  ProjectReward: ProjectReward;
  ProjectStatistics: ProjectStatistics;
  ProjectWhereInput: ProjectWhereInput;
  ProjectsGetQueryInput: ProjectsGetQueryInput;
  ProjectsOrderByInput: ProjectsOrderByInput;
  ProjectsResponse: ProjectsResponse;
  ProjectsSummary: ProjectsSummary;
  Query: {};
  ResourceInput: ResourceInput;
  RewardFundingInput: RewardFundingInput;
  RewardInput: RewardInput;
  ShippingInput: ShippingInput;
  SignedUploadUrl: SignedUploadUrl;
  SourceResource:
    | ResolversParentTypes['Entry']
    | ResolversParentTypes['Project'];
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
  UserEntriesGetInput: UserEntriesGetInput;
  UserEntriesGetWhereInput: UserEntriesGetWhereInput;
  UserGetInput: UserGetInput;
  UserProjectContribution: UserProjectContribution;
  UserProjectsGetInput: UserProjectsGetInput;
  UserProjectsGetWhereInput: UserProjectsGetWhereInput;
  Wallet: Omit<Wallet, 'connectionDetails'> & {
    connectionDetails: ResolversParentTypes['ConnectionDetails'];
  };
  amount_Float_NotNull_min_1: Scalars['amount_Float_NotNull_min_1'];
  amount_Float_min_1: Scalars['amount_Float_min_1'];
  comment_String_maxLength_280: Scalars['comment_String_maxLength_280'];
  cost_Float_NotNull_min_1_max_1000000: Scalars['cost_Float_NotNull_min_1_max_1000000'];
  cost_Int_NotNull_min_0: Scalars['cost_Int_NotNull_min_0'];
  description_String_NotNull_maxLength_250: Scalars['description_String_NotNull_maxLength_250'];
  description_String_NotNull_maxLength_2200: Scalars['description_String_NotNull_maxLength_2200'];
  description_String_maxLength_250: Scalars['description_String_maxLength_250'];
  description_String_maxLength_2200: Scalars['description_String_maxLength_2200'];
  donationAmount_Int_NotNull_min_1: Scalars['donationAmount_Int_NotNull_min_1'];
  email_String_NotNull_format_email: Scalars['email_String_NotNull_format_email'];
  email_String_format_email: Scalars['email_String_format_email'];
  fundingGoal_Int_min_1: Scalars['fundingGoal_Int_min_1'];
  name_String_NotNull_maxLength_100: Scalars['name_String_NotNull_maxLength_100'];
  name_String_NotNull_minLength_5_maxLength_60: Scalars['name_String_NotNull_minLength_5_maxLength_60'];
  name_String_NotNull_minLength_5_maxLength_280: Scalars['name_String_NotNull_minLength_5_maxLength_280'];
  name_String_maxLength_100: Scalars['name_String_maxLength_100'];
  name_String_minLength_5_maxLength_60: Scalars['name_String_minLength_5_maxLength_60'];
  name_String_minLength_5_maxLength_280: Scalars['name_String_minLength_5_maxLength_280'];
  pubkey_String_NotNull_minLength_66_maxLength_66: Scalars['pubkey_String_NotNull_minLength_66_maxLength_66'];
  pubkey_String_minLength_66_maxLength_66: Scalars['pubkey_String_minLength_66_maxLength_66'];
  quantity_Int_NotNull_min_1: Scalars['quantity_Int_NotNull_min_1'];
  rewardsCost_Int_NotNull_min_0: Scalars['rewardsCost_Int_NotNull_min_0'];
  stock_Int_min_0: Scalars['stock_Int_min_0'];
  title_String_NotNull_maxLength_60: Scalars['title_String_NotNull_maxLength_60'];
  title_String_NotNull_maxLength_150: Scalars['title_String_NotNull_maxLength_150'];
  title_String_maxLength_60: Scalars['title_String_maxLength_60'];
  title_String_maxLength_150: Scalars['title_String_maxLength_150'];
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

export type ConstraintDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = ConstraintDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AmbassadorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Ambassador'] = ResolversParentTypes['Ambassador'],
> = {
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AmountSummaryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AmountSummary'] = ResolversParentTypes['AmountSummary'],
> = {
  donationAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rewardsCost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shippingCost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type ConnectionDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConnectionDetails'] = ResolversParentTypes['ConnectionDetails'],
> = {
  __resolveType: TypeResolveFn<
    'LndConnectionDetailsPrivate' | 'LndConnectionDetailsPublic',
    ParentType,
    ContextType
  >;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry'],
> = {
  amountFunded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<
    ResolversTypes['description_String_NotNull_maxLength_2200'],
    ParentType,
    ContextType
  >;
  fundersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fundingTxs?: Resolver<
    Array<Maybe<ResolversTypes['FundingTx']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  publishedAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes['EntryStatus'], ParentType, ContextType>;
  title?: Resolver<
    ResolversTypes['title_String_NotNull_maxLength_60'],
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['EntryType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalAccountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ExternalAccount'] = ResolversParentTypes['ExternalAccount'],
> = {
  externalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externalUsername?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FunderResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Funder'] = ResolversParentTypes['Funder'],
> = {
  amountFunded?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  confirmedAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rewards?: Resolver<
    Array<Maybe<ResolversTypes['FunderReward']>>,
    ParentType,
    ContextType
  >;
  timesFunded?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FunderRewardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FunderReward'] = ResolversParentTypes['FunderReward'],
> = {
  projectReward?: Resolver<
    ResolversTypes['ProjectReward'],
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingCancelResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingCancelResponse'] = ResolversParentTypes['FundingCancelResponse'],
> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingConfirmResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingConfirmResponse'] = ResolversParentTypes['FundingConfirmResponse'],
> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  missedSettleEvents?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingMutationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingMutationResponse'] = ResolversParentTypes['FundingMutationResponse'],
> = {
  amountSummary?: Resolver<
    Maybe<ResolversTypes['AmountSummary']>,
    ParentType,
    ContextType
  >;
  fundingTx?: Resolver<
    Maybe<ResolversTypes['FundingTx']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingPendingResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingPendingResponse'] = ResolversParentTypes['FundingPendingResponse'],
> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingQueryResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingQueryResponse'] = ResolversParentTypes['FundingQueryResponse'],
> = {
  fundingTx?: Resolver<
    Maybe<ResolversTypes['FundingTx']>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FundingTxResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FundingTx'] = ResolversParentTypes['FundingTx'],
> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  funder?: Resolver<ResolversTypes['Funder'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  invoiceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  media?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  onChain?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  paymentRequest?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceResource?: Resolver<
    Maybe<ResolversTypes['SourceResource']>,
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes['FundingStatus'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GranteeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Grantee'] = ResolversParentTypes['Grantee'],
> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GranteeSubmissionResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GranteeSubmissionResponse'] = ResolversParentTypes['GranteeSubmissionResponse'],
> = {
  grantees?: Resolver<
    Array<Maybe<ResolversTypes['Grantee']>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LndConnectionDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LndConnectionDetails'] = ResolversParentTypes['LndConnectionDetails'],
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  grpcPort?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hostname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lndNodeType?: Resolver<
    ResolversTypes['LndNodeType'],
    ParentType,
    ContextType
  >;
  macaroon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tlsCertificate?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
};

export type LndConnectionDetailsPrivateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LndConnectionDetailsPrivate'] = ResolversParentTypes['LndConnectionDetailsPrivate'],
> = {
  grpcPort?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hostname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lndNodeType?: Resolver<
    ResolversTypes['LndNodeType'],
    ParentType,
    ContextType
  >;
  macaroon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pubkey?: Resolver<
    ResolversTypes['pubkey_String_NotNull_minLength_66_maxLength_66'],
    ParentType,
    ContextType
  >;
  tlsCertificate?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LndConnectionDetailsPublicResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LndConnectionDetailsPublic'] = ResolversParentTypes['LndConnectionDetailsPublic'],
> = {
  pubkey?: Resolver<
    ResolversTypes['pubkey_String_NotNull_minLength_66_maxLength_66'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  confirmAmbassador?: Resolver<
    ResolversTypes['Ambassador'],
    ParentType,
    ContextType,
    RequireFields<MutationConfirmAmbassadorArgs, 'id'>
  >;
  createAmbassador?: Resolver<
    ResolversTypes['Ambassador'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAmbassadorArgs, 'projectId'>
  >;
  createEntry?: Resolver<
    ResolversTypes['Entry'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateEntryArgs, 'input'>
  >;
  createGrantee?: Resolver<
    ResolversTypes['Grantee'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateGranteeArgs, 'input'>
  >;
  createProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateProjectArgs, 'input'>
  >;
  createProjectMilestone?: Resolver<
    ResolversTypes['ProjectMilestone'],
    ParentType,
    ContextType,
    Partial<MutationCreateProjectMilestoneArgs>
  >;
  createProjectReward?: Resolver<
    ResolversTypes['ProjectReward'],
    ParentType,
    ContextType,
    Partial<MutationCreateProjectRewardArgs>
  >;
  createSponsor?: Resolver<
    ResolversTypes['Sponsor'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSponsorArgs, 'projectId'>
  >;
  createWallet?: Resolver<
    ResolversTypes['Wallet'],
    ParentType,
    ContextType,
    Partial<MutationCreateWalletArgs>
  >;
  deleteEntry?: Resolver<
    ResolversTypes['Entry'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEntryArgs, 'id'>
  >;
  deleteProjectMilestone?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectMilestoneArgs, 'projectMilestoneId'>
  >;
  fund?: Resolver<
    ResolversTypes['FundingMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationFundArgs, 'input'>
  >;
  fundingCancel?: Resolver<
    ResolversTypes['FundingCancelResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationFundingCancelArgs, 'id'>
  >;
  fundingClaimAnonymous?: Resolver<
    ResolversTypes['FundingMutationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationFundingClaimAnonymousArgs, 'uuid'>
  >;
  fundingConfirm?: Resolver<
    ResolversTypes['FundingConfirmResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationFundingConfirmArgs, 'input'>
  >;
  fundingCreateFromPodcastKeysend?: Resolver<
    ResolversTypes['FundingTx'],
    ParentType,
    ContextType,
    Partial<MutationFundingCreateFromPodcastKeysendArgs>
  >;
  fundingPend?: Resolver<
    ResolversTypes['FundingPendingResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationFundingPendArgs, 'input'>
  >;
  publishEntry?: Resolver<
    ResolversTypes['Entry'],
    ParentType,
    ContextType,
    RequireFields<MutationPublishEntryArgs, 'id'>
  >;
  unlinkExternalAccount?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUnlinkExternalAccountArgs, 'id'>
  >;
  updateEntry?: Resolver<
    ResolversTypes['Entry'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEntryArgs, 'input'>
  >;
  updateProject?: Resolver<
    ResolversTypes['Project'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProjectArgs, 'input'>
  >;
  updateProjectMilestone?: Resolver<
    ResolversTypes['ProjectMilestone'],
    ParentType,
    ContextType,
    Partial<MutationUpdateProjectMilestoneArgs>
  >;
  updateProjectReward?: Resolver<
    ResolversTypes['ProjectReward'],
    ParentType,
    ContextType,
    Partial<MutationUpdateProjectRewardArgs>
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    Partial<MutationUpdateUserArgs>
  >;
  updateWallet?: Resolver<
    ResolversTypes['Wallet'],
    ParentType,
    ContextType,
    Partial<MutationUpdateWalletArgs>
  >;
};

export type OwnerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner'],
> = {
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerOfResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OwnerOf'] = ResolversParentTypes['OwnerOf'],
> = {
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project'],
> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ambassadors?: Resolver<
    Array<Maybe<ResolversTypes['Ambassador']>>,
    ParentType,
    ContextType
  >;
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['description_String_maxLength_2200']>,
    ParentType,
    ContextType
  >;
  draft?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  entries?: Resolver<
    Array<Maybe<ResolversTypes['Entry']>>,
    ParentType,
    ContextType,
    Partial<ProjectEntriesArgs>
  >;
  expiresAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  funders?: Resolver<
    Array<Maybe<ResolversTypes['Funder']>>,
    ParentType,
    ContextType
  >;
  fundingGoal?: Resolver<
    Maybe<ResolversTypes['fundingGoal_Int_min_1']>,
    ParentType,
    ContextType
  >;
  fundingTxs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['FundingTx']>>>,
    ParentType,
    ContextType
  >;
  grantees?: Resolver<
    Array<Maybe<ResolversTypes['Grantee']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  media?: Resolver<
    Array<Maybe<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  milestones?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ProjectMilestone']>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<
    ResolversTypes['name_String_NotNull_minLength_5_maxLength_280'],
    ParentType,
    ContextType
  >;
  owners?: Resolver<Array<ResolversTypes['Owner']>, ParentType, ContextType>;
  rewardCurrency?: Resolver<
    Maybe<ResolversTypes['RewardCurrency']>,
    ParentType,
    ContextType
  >;
  rewards?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ProjectReward']>>>,
    ParentType,
    ContextType
  >;
  sponsors?: Resolver<
    Array<Maybe<ResolversTypes['Sponsor']>>,
    ParentType,
    ContextType
  >;
  statistics?: Resolver<
    Maybe<ResolversTypes['ProjectStatistics']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<
    ResolversTypes['title_String_NotNull_maxLength_60'],
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['ProjectType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wallets?: Resolver<Array<ResolversTypes['Wallet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMilestoneResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectMilestone'] = ResolversParentTypes['ProjectMilestone'],
> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['description_String_maxLength_250']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<
    ResolversTypes['name_String_NotNull_maxLength_100'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectRewardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectReward'] = ResolversParentTypes['ProjectReward'],
> = {
  backers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['description_String_maxLength_250']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<
    ResolversTypes['name_String_NotNull_maxLength_100'],
    ParentType,
    ContextType
  >;
  sold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStatisticsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectStatistics'] = ResolversParentTypes['ProjectStatistics'],
> = {
  totalPageviews?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalVisitors?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectsResponse'] = ResolversParentTypes['ProjectsResponse'],
> = {
  projects?: Resolver<
    Array<Maybe<ResolversTypes['Project']>>,
    ParentType,
    ContextType
  >;
  summary?: Resolver<
    Maybe<ResolversTypes['ProjectsSummary']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsSummaryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectsSummary'] = ResolversParentTypes['ProjectsSummary'],
> = {
  fundedTotal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fundersCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  projectsCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  entry?: Resolver<
    ResolversTypes['Entry'],
    ParentType,
    ContextType,
    RequireFields<QueryEntryArgs, 'id'>
  >;
  fundingTx?: Resolver<
    ResolversTypes['FundingTx'],
    ParentType,
    ContextType,
    RequireFields<QueryFundingTxArgs, 'id'>
  >;
  getEntries?: Resolver<
    Array<Maybe<ResolversTypes['Entry']>>,
    ParentType,
    ContextType,
    Partial<QueryGetEntriesArgs>
  >;
  getFunders?: Resolver<
    Array<Maybe<ResolversTypes['Funder']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetFundersArgs, 'input'>
  >;
  getFundingTxs?: Resolver<
    Array<Maybe<ResolversTypes['FundingTx']>>,
    ParentType,
    ContextType,
    Partial<QueryGetFundingTxsArgs>
  >;
  getProjectPubkey?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetProjectPubkeyArgs, 'projectId'>
  >;
  getProjectReward?: Resolver<
    ResolversTypes['ProjectReward'],
    ParentType,
    ContextType,
    RequireFields<QueryGetProjectRewardArgs, 'id'>
  >;
  getProjectRewards?: Resolver<
    Array<Maybe<ResolversTypes['ProjectReward']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetProjectRewardsArgs, 'input'>
  >;
  getSignedUploadUrl?: Resolver<
    ResolversTypes['SignedUploadUrl'],
    ParentType,
    ContextType,
    RequireFields<QueryGetSignedUploadUrlArgs, 'input'>
  >;
  getWallet?: Resolver<
    ResolversTypes['Wallet'],
    ParentType,
    ContextType,
    RequireFields<QueryGetWalletArgs, 'id'>
  >;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  project?: Resolver<
    Maybe<ResolversTypes['Project']>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectArgs, 'where'>
  >;
  projects?: Resolver<
    ResolversTypes['ProjectsResponse'],
    ParentType,
    ContextType,
    Partial<QueryProjectsArgs>
  >;
  projectsSummary?: Resolver<
    ResolversTypes['ProjectsSummary'],
    ParentType,
    ContextType
  >;
  statusCheck?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'where'>
  >;
};

export type SignedUploadUrlResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SignedUploadUrl'] = ResolversParentTypes['SignedUploadUrl'],
> = {
  distributionUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uploadUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SourceResourceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SourceResource'] = ResolversParentTypes['SourceResource'],
> = {
  __resolveType: TypeResolveFn<'Entry' | 'Project', ParentType, ContextType>;
};

export type SponsorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Sponsor'] = ResolversParentTypes['Sponsor'],
> = {
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = {
  _?: SubscriptionResolver<
    Maybe<ResolversTypes['Boolean']>,
    '_',
    ParentType,
    ContextType
  >;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  contributions?: Resolver<
    Array<Maybe<ResolversTypes['UserProjectContribution']>>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entries?: Resolver<
    Array<Maybe<ResolversTypes['Entry']>>,
    ParentType,
    ContextType,
    Partial<UserEntriesArgs>
  >;
  externalAccounts?: Resolver<
    Array<Maybe<ResolversTypes['ExternalAccount']>>,
    ParentType,
    ContextType
  >;
  fundingTxs?: Resolver<
    Array<Maybe<ResolversTypes['FundingTx']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerOf?: Resolver<
    Array<Maybe<ResolversTypes['OwnerOf']>>,
    ParentType,
    ContextType
  >;
  projects?: Resolver<
    Array<Maybe<ResolversTypes['Project']>>,
    ParentType,
    ContextType,
    Partial<UserProjectsArgs>
  >;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProjectContributionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserProjectContribution'] = ResolversParentTypes['UserProjectContribution'],
> = {
  funder?: Resolver<Maybe<ResolversTypes['Funder']>, ParentType, ContextType>;
  isAmbassador?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFunder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSponsor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet'],
> = {
  connectionDetails?: Resolver<
    ResolversTypes['ConnectionDetails'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<
    ResolversTypes['name_String_NotNull_minLength_5_maxLength_60'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Amount_Float_NotNull_Min_1ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['amount_Float_NotNull_min_1'],
    any
  > {
  name: 'amount_Float_NotNull_min_1';
}

export interface Amount_Float_Min_1ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['amount_Float_min_1'], any> {
  name: 'amount_Float_min_1';
}

export interface Comment_String_MaxLength_280ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['comment_String_maxLength_280'],
    any
  > {
  name: 'comment_String_maxLength_280';
}

export interface Cost_Float_NotNull_Min_1_Max_1000000ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['cost_Float_NotNull_min_1_max_1000000'],
    any
  > {
  name: 'cost_Float_NotNull_min_1_max_1000000';
}

export interface Cost_Int_NotNull_Min_0ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['cost_Int_NotNull_min_0'],
    any
  > {
  name: 'cost_Int_NotNull_min_0';
}

export interface Description_String_NotNull_MaxLength_250ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['description_String_NotNull_maxLength_250'],
    any
  > {
  name: 'description_String_NotNull_maxLength_250';
}

export interface Description_String_NotNull_MaxLength_2200ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['description_String_NotNull_maxLength_2200'],
    any
  > {
  name: 'description_String_NotNull_maxLength_2200';
}

export interface Description_String_MaxLength_250ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['description_String_maxLength_250'],
    any
  > {
  name: 'description_String_maxLength_250';
}

export interface Description_String_MaxLength_2200ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['description_String_maxLength_2200'],
    any
  > {
  name: 'description_String_maxLength_2200';
}

export interface DonationAmount_Int_NotNull_Min_1ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['donationAmount_Int_NotNull_min_1'],
    any
  > {
  name: 'donationAmount_Int_NotNull_min_1';
}

export interface Email_String_NotNull_Format_EmailScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['email_String_NotNull_format_email'],
    any
  > {
  name: 'email_String_NotNull_format_email';
}

export interface Email_String_Format_EmailScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['email_String_format_email'],
    any
  > {
  name: 'email_String_format_email';
}

export interface FundingGoal_Int_Min_1ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['fundingGoal_Int_min_1'],
    any
  > {
  name: 'fundingGoal_Int_min_1';
}

export interface Name_String_NotNull_MaxLength_100ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_NotNull_maxLength_100'],
    any
  > {
  name: 'name_String_NotNull_maxLength_100';
}

export interface Name_String_NotNull_MinLength_5_MaxLength_60ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_NotNull_minLength_5_maxLength_60'],
    any
  > {
  name: 'name_String_NotNull_minLength_5_maxLength_60';
}

export interface Name_String_NotNull_MinLength_5_MaxLength_280ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_NotNull_minLength_5_maxLength_280'],
    any
  > {
  name: 'name_String_NotNull_minLength_5_maxLength_280';
}

export interface Name_String_MaxLength_100ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_maxLength_100'],
    any
  > {
  name: 'name_String_maxLength_100';
}

export interface Name_String_MinLength_5_MaxLength_60ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_minLength_5_maxLength_60'],
    any
  > {
  name: 'name_String_minLength_5_maxLength_60';
}

export interface Name_String_MinLength_5_MaxLength_280ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['name_String_minLength_5_maxLength_280'],
    any
  > {
  name: 'name_String_minLength_5_maxLength_280';
}

export interface Pubkey_String_NotNull_MinLength_66_MaxLength_66ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['pubkey_String_NotNull_minLength_66_maxLength_66'],
    any
  > {
  name: 'pubkey_String_NotNull_minLength_66_maxLength_66';
}

export interface Pubkey_String_MinLength_66_MaxLength_66ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['pubkey_String_minLength_66_maxLength_66'],
    any
  > {
  name: 'pubkey_String_minLength_66_maxLength_66';
}

export interface Quantity_Int_NotNull_Min_1ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['quantity_Int_NotNull_min_1'],
    any
  > {
  name: 'quantity_Int_NotNull_min_1';
}

export interface RewardsCost_Int_NotNull_Min_0ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['rewardsCost_Int_NotNull_min_0'],
    any
  > {
  name: 'rewardsCost_Int_NotNull_min_0';
}

export interface Stock_Int_Min_0ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['stock_Int_min_0'], any> {
  name: 'stock_Int_min_0';
}

export interface Title_String_NotNull_MaxLength_60ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['title_String_NotNull_maxLength_60'],
    any
  > {
  name: 'title_String_NotNull_maxLength_60';
}

export interface Title_String_NotNull_MaxLength_150ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['title_String_NotNull_maxLength_150'],
    any
  > {
  name: 'title_String_NotNull_maxLength_150';
}

export interface Title_String_MaxLength_60ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['title_String_maxLength_60'],
    any
  > {
  name: 'title_String_maxLength_60';
}

export interface Title_String_MaxLength_150ScalarConfig
  extends GraphQLScalarTypeConfig<
    ResolversTypes['title_String_maxLength_150'],
    any
  > {
  name: 'title_String_maxLength_150';
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
  cost_Float_NotNull_min_1_max_1000000?: GraphQLScalarType;
  cost_Int_NotNull_min_0?: GraphQLScalarType;
  description_String_NotNull_maxLength_250?: GraphQLScalarType;
  description_String_NotNull_maxLength_2200?: GraphQLScalarType;
  description_String_maxLength_250?: GraphQLScalarType;
  description_String_maxLength_2200?: GraphQLScalarType;
  donationAmount_Int_NotNull_min_1?: GraphQLScalarType;
  email_String_NotNull_format_email?: GraphQLScalarType;
  email_String_format_email?: GraphQLScalarType;
  fundingGoal_Int_min_1?: GraphQLScalarType;
  name_String_NotNull_maxLength_100?: GraphQLScalarType;
  name_String_NotNull_minLength_5_maxLength_60?: GraphQLScalarType;
  name_String_NotNull_minLength_5_maxLength_280?: GraphQLScalarType;
  name_String_maxLength_100?: GraphQLScalarType;
  name_String_minLength_5_maxLength_60?: GraphQLScalarType;
  name_String_minLength_5_maxLength_280?: GraphQLScalarType;
  pubkey_String_NotNull_minLength_66_maxLength_66?: GraphQLScalarType;
  pubkey_String_minLength_66_maxLength_66?: GraphQLScalarType;
  quantity_Int_NotNull_min_1?: GraphQLScalarType;
  rewardsCost_Int_NotNull_min_0?: GraphQLScalarType;
  stock_Int_min_0?: GraphQLScalarType;
  title_String_NotNull_maxLength_60?: GraphQLScalarType;
  title_String_NotNull_maxLength_150?: GraphQLScalarType;
  title_String_maxLength_60?: GraphQLScalarType;
  title_String_maxLength_150?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = any> = {
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>;
};
