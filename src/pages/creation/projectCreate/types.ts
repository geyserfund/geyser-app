
export type TProjectDetails = {
	title: string
	name: string
	image: string
	description: string
	email: string
}

export type TMilestone = {
	id?: number;
	name: string;
	projectId?: number;
	description: string;
	amount: number
}

export type TRewards = {
	id?: number;
	name: string;
	description: string;
	projectId?: number;
	cost: number;
	image?: string;
}

export type TNodeInput = {
	name: string;
	isVoltage?: boolean;
	hostname: string;
	publicKey: string;
	invoiceMacaroon: string;
	tlsCert: string;
	grpc: string;
}
