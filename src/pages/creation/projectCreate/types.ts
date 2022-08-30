export type TProjectDetails = {
	title: string
	image: string
	description: string
	email: string
}

export type TMilestone = {
	name: string;
	projectId: string;
	description: string;
	amount: number
}

export type TRewards = {
	id?: string;
	name: string;
	description: string;
	projectId: string;
	cost: number;
	image?: string;
}
