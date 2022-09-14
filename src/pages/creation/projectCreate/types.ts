
export type TProjectDetails = {
	title: string
	name: string
	image: string
	description: string
	email: string
}

export type TMilestone = {
	id?: string;
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

export type TNodeInput = {
	name: string;
	isVoltage?: boolean;
	hostname: string;
	publicKey: string;
	invoiceMacaroon: string;
	tlsCert: string;
	grpc: string;
}
