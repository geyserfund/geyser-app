import { IProject, IProjectContribution } from '.';

export interface IUser {
  id: number;
  username: string;
  imageUrl: string;
  email?: string;
  externalAccounts: IUserExternalAccount[];
}

export interface IUserProfile {
  id: number;
  username: string;
  imageUrl: string;
  externalAccounts: IUserExternalAccount[];
  contributions: IProjectContribution[];
  ownerOf: {
    project: IProject;
  }[];
}

export interface IUserExternalAccount {
  id: number;
  type: string;
  externalUsername: string;
  externalId: string;
  public: boolean;
}
