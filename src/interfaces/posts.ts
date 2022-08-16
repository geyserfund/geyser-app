export interface IPostCreateInput {
	projectIds?: number[];
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
