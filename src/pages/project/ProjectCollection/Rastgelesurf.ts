import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
	{
		key: 'description1',
		title: '',
		body: [
			'Our goal is to join the ranks of Bitcoin Beach El Zonte, the_surfer_kids, Bitcoin Lake and Bitcoin Jungle. Turkey has a very brief history (12 years) of wave surfing. Even though Black Sea is very suitable for wave surfing, riptides were feared by the population living on the Black Sea shores. Turkey being a peninsula and having shores on the Mediterranean, Aegean and the Black Sea has a lot of potential to grow the sport. Wave surfing federation is still being established and as Rastgele Surf we want to lead future surf schools and set an example of creating Bitcoin and surfing communities in Turkey.',
		],
		images: [1],
		blockType: 'PL',
	},
	{
		key: 'description2',
		title: '',
		body: [
			'Rastgele Surf currently holds surfing and yoga camps during the season and already provides free lessons to kids with its limited resources. We want to expand our abilities and teach more people to surf and use bitcoin for payments and savings. As Turkey has a very inflationary currency it will benefit people a lot to understand Bitcoin in depth.',
			'Aside from surfing and yoga classes we provide food and beverages, parking spots, beach gazebos, sunbeds and bungalows on the premises. A 5% discount will be applied for all services that are paid in Bitcoin.',
		],
		images: [2],
		blockType: 'PL',
	},
	{
		key: 'description3',
		title: '',
		body: [
			'We are time cost averaging (updated version of dca)  a good portion of our profits every Monday. ',
			'The staff will have the option to get paid in Bitcoin. ',
			'There will be Turkish Bitcoin books for sale in our shop. Turkish translations of The Bitcoin Standard, The Little Bitcoin Book, 21 Lessons, The Bullish Case for Bitcoin and Bitcoin Money will be offered. ',
			'We have the current beach rented out until 20th of June 2023, we are willing to extend the lease, however in case we can’t settle an agreement with the landlord we will just spawn on a new beach Temporary Autonomous Zone style ;D',
		],
		images: [3],
		blockType: 'PL',
	},
	{
		key: 'rewards',
		title: 'Rewards',
		body: [
			'**$50**: help a kid catch her/his first wave (a video of a kid riding a wave and saying thank you mentioning your name)',
			'**$500 to $800**: gift a Surfboard for those in need locally produced with your logo on it, from 5\'0 to 8\'0 boards.',
		],
		images: [4],
		blockType: 'PL',
	},
	{
		key: 'rewards2',
		title: 'Use Of Funds',
		body: [
			'For donation between 10$ and 50$, 100% of the amount will be added to the tipbox to be split amongst employees.',
			'Part of the contributions will go towards the prize pool of the 2nd Surfing Competition that will be held with the contribution of all the 6 surfing schools located on the Turkey Black Sea Shore.',
			'Bonus perk: On January 3rd of every year for the next 5 years, 2.5% of all profits made from surboard sales will be donated to bitcoin developers listed on [BitcoinDevList](https://bitcoindevlist.com/).',
		],
		images: [5],
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'About us',
		body: [
			'We are a young couple; Bengisu is a yoga instructor and Tolga represented the Turkish National Team in 2020 ISA Surfing Games in Japan. We both are training for national titles. We dedicate our lives to providing yoga&surf camps and manufacturing surfboards.',
		],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: '',
	idea: 'Bring together Bitcoin and surfing on the coast of the black sea',
	ownerIntro: 'We are a young couple; Bengisu is a yoga instructor and Tolga represented the Turkish National Team in 2020 ISA Surfing Games in Japan.',
	blocks: projectBlocks,
};

const projectName: string = 'rastgelesurf';

export const Rastgelesurf = { projectBlocks, projectDetails, projectName };
