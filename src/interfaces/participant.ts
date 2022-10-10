import { IUserProfile } from './user';

export interface IParticipant {
  user: IUserProfile;
  confirmed: boolean;
}

export interface IFunder {
  id: number;
  amountFunded: number;
  timesFunded: number;
  user?: IUserProfile;
  badges: IBadge[];
  confirmedAt: string;
}

export interface IBadge {
  badge: string;
  description: string;
}

export interface ISponsor {
  id: number;
  name: string;
  user?: IUserProfile;
  image?: string;
  url?: string;
  confirmed: boolean;
}

export interface IGrantee {
  id: number;
  url: string;
  name: string;
}

export interface IAvatarMetadata {
  username?: string;
  appName?: string;
  image?: string;
  link?: string;
}
