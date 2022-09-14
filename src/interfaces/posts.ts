import { IUser } from './user';

export interface IPostCreateInput {
	projectId?: number;
	type: string;
	content?: string;
	image?: string;
	description?: string;
	title?: string;
}

export interface IPostUpdateInput {
	entryId: number;
	title?: string;
	description?: string;
	image?: string;
	content?: string;
}

export type TPostData = {
	id: number
    title: string;
    description: string;
    image: string;
    published: string;
	content: string;
	fundersCount: number;
    amountFunded: number
    createdAt: string
    updatedAt: string
    publishedAt: string
    type:string
    creator: IUser
    project: {
      id: number
      title: string
      name: string
    }
}
