import { IUser } from './user';

export interface IEntryCreateInput {
  projectId?: number;
  type: string;
  content?: string;
  image?: string;
  description?: string;
  title?: string;
}

export interface IEntryUpdateInput {
  entryId: number;
  title?: string;
  description?: string;
  image?: string;
  content?: string;
}

/**
 * Corresponds to https://github.com/geyserfund/geyser-server/blob/fa64826471/src/typeDefs/entry.ts#L47
 */
export type TEntryData = {
  id: number;
  title: string;
  description: string;
  image: string;
  published: string;
  content: string;
  fundersCount: number;
  amountFunded: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  type: string;
  creator: IUser;
  project: {
    id: number;
    title: string;
    name: string;
  };
};
