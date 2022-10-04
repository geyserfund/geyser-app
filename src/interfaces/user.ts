import { IProjectContribution } from '.';

export interface IUser {
  id: number;
  username: string;
  imageUrl: string;
  email?: string;
  externalAccounts: IUserExternalAccount[];
}

export interface IProfileUser {
  id: number;
  username: string;
  imageUrl: string;
  externalAccounts: IUserExternalAccount[];
  contributions: IProjectContribution[];
  ownerOf: {
    project: IProfileProject;
  }[];
}

export interface IUserExternalAccount {
  id: number;
  type: string;
  externalUsername: string;
  externalId: string;
  public: boolean;
}

export interface IProfileProject {
  id: string;
  title: string;
  name: string;
  description: string;
  balance: number;
  fundingGoal: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  media: string[];
  expiresAt: string;
  creationConfirmed: boolean;
  funders: {
    id: string;
  }[];
  owners: {
    id: string;
    user: {
      imageUrl: string;
    };
  }[];
}
