export type TcreateEntry = {
	content?: string,
	image?: string,
	description?: string,
	title?: string,
}

export type TEntry = {
	id: number,
	title: string,
	description: string,
	image: string,
	content: string,
	published: boolean,
	type: string,
}

export type IPost = {
	id?: string,
	title?: string,
	content?: string,
	description?: string,
	image?: string
}
