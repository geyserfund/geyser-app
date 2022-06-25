import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
	{
		key: 'description1',
		title: '',
		body: [
			'Namaste Bitcoin Family,',
			'My name is Paco, and I am crazy enough to want to travel to 40 countries in 400 days, only with Bitcoin. Bear with me please, here’s why.',
		],
		youtube: 'twjTUa8njRo',
		blockType: 'PL',
	},
	{
		key: 'description2',
		title: '',
		body: [
			'I am a self-motivated traveller and I have been couch-surfing for the last 6 years.',
			'In 2007 when I came to India for education, $1=38rs, and now it’s 2021, $1=76rs.',
			'In 2000 Argentina was $1 = 1Peso,',
			'In 2018 during my travels, it was $1 = 25 Pesos,',
			'2021 the same $1 = 100 Pesos. 2022 = 200 Pesos',
			'You know how the story goes. You guys know it way better than me.',
			'Throughout my journey, over the years I have seen the plights of citizens in these hyperinflating regions. Folks, running like crazy every day to make their ends meet.',
		],
		images: [0],
		blockType: 'PL',
	},
	{
		key: 'description3',
		title: '',
		body: [
			'Recently a friend of mine gave me the book “The Bitcoin Standard” and I have been going down the rabbit hole ever since.Over my study in the last few weeks, it went like a blaze, and I could see how many experiences I had from my past travels were correlated with the plights of the fiat currency world.',
			'I came to believe that “sound money”, that people can take their own custody of, is necessary for a working society, and Bitcoin is a possible way to achieve that.Although I don’t know much about how it works under the hood, I feel at home looking at the ethos and dreams of the Bitcoin community, striving for a bitcoinized world.And I wanna be part of that story.',
		],
		blockType: 'PL',
	},
	{
		key: 'description4',
		title: '',
		body: [
			'My past travels and experiences provided me a direct path to achieve that. I have been running around the world since I was 24. I will run again, and this time I will do it with Bitcoin while vlogging my entire journey. I will spend in Bitcoin, I will earn in Bitcoin, I will receive your love in Bitcoin, and I will talk about Bitcoin and try to convince whoever I can to accept Bitcoin from me as a payment.',
			'And most importantly I will come and meet with all you Bitcoiners out there in the world and share the love. No matter where you are, I am gonna find you, and I am gonna hug you.',

		],
		images: [1],
		blockType: 'PL',
	},
	{
		key: 'description4',
		title: '',
		body: [
			'So come along on this wild ride with me.Support me with donations, arrangements, hosting, or just prayers and kind words.',
			'One day we will meet each other at the dawn of HyperBitcoinzation, at the end of our current Fiat Tyranny.Till then keep fighting the good fight.',
			'Over and out.',
			'Paco de la India.',

		],
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'About me',
		body: [
			'In 2013 I was introduced to Couchsurfing and I started hosting over 25 travelers from all over the world in 1 little room in Muscat, Oman. They taught me about Sabbatical, and I jumped right away.',
			'In 2015, I quit my job, and with only $7000 in my pocket, thinking I will take a 6-month sabbatical, next thing you know 24 countries later, it’s been 1200 days. I went about running in over 250 cities. I really love running and eating. I guess it’s just the right mix. Run eat Repeat.',
			'I had couchsurfed with over 350 families during my journey.',
			'I started my travels from India to Indonesia to Papua New Guinea',
			'I ran out of money in 6 months but had just landed in the USA, so I kept moving, volunteering, doing small jobs, and continued traveling coast to coast from San Francisco to Miami.',
			'I then went through Mexico, El Salvador, Guatemala.I was a volunteer at a school in Guatemala for 3 weeks.',
			'I was teaching English in Colombia, Dumpster Diving in Ecuador, Selling peanuts in Peru.',
			'A guide and wood logger in Chile & writing names in Hindi in Argentina.',
			'As such, I was bartering my way throughout the journey.This wouldn’t have been possible without the support of the Couch Surfing Community and the lovely people I met throughout my journey.I have plenty of stories to share.As of now, I share 3 stories / week on my Instagram channel – www.instagram.com / runeverycity',
			'I started the journey of Vlogging i.e.Paco de la India and sold masks, gloves & cigarettes during the Lockdown.',
			'I trekked to Everest Base Camp, Nepal – once in a lifetime experience and started a drop service business to assist folks around the country with videos, logos, websites, etc.	',
		],
		images: [2],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: '',
	idea: 'Travel 40 countries by using Bitcoin. The purpose of the journey is to show through travel vlogs that there is mass adoption and host bitcoin meetups for mass awareness and to show humans are kind.',
	ownerIntro: 'Anonymal is the first Modern Heavy Metal band to sing exclusively about Bitcoin history, philosophy and goals.',
	blocks: projectBlocks,
};

const projectName: string = 'run-with-bitcoin';

export const Paco = { projectBlocks, projectDetails, projectName };
