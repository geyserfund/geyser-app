import { IUser } from './user';

export interface IParticipant {
  user: IUser;
  confirmed: boolean;
}

export interface IFunder {
  id: number;
  amountFunded: number;
  timesFunded: number;
  user?: IUser;
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
  user?: IUser;
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
