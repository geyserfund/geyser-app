import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
	{
		key: 'description1',
		title: '',
		body: [
			'BTCJune Presents… That Puro Signal aims to bring a unique perspective to the Bitcoin space. With so many thoughtful and intelligent paths bitcoiners have taken to explore and disseminate knowledge, I found that there was a lack of a recap or a weekly “best of Bitcoin” podcast and thought I could contribute to the network in this area. I also wanted to make these bitcoinerisms fun to listen to and have a love for freeform radio— namely WFMU, East Village Radio, Intergalactic FM, and WPRB in Princeton. With the unique opportunity to build a new, different, more self-directed world that Bitcoins offers, That Puro Signal, wants to be the soundtrack for this new world.',
			'On BTCJune Presents… That Puro Signal, you’ll find exotic music from around the world including 70s Iranian garage rock, psychedelia from the plains of Africa, 60s ska/reggae, latin soul and funk, funny and tongue-in-cheek show tunes, excerpts from vintage advertisements and so much more! You’ll find all of this layered over my favorite excerpts from my favorite podcasts and videos posted on Bitcoin Twitter. Come hear me make fun of plebs for their testical tanning, learn their regenerative farming and ranching practices, take their bone broth challenges, and passionately view whatever else they’re disrespecting.',
			'Be sure to listen on the Fountain App ([Fountain.FM](https://fountain.fm/)) where I’ll be splitting Bitcoin tips to participating listeners and artists.',
			'The BITCOIN Value 4 Value model is used here with the help of the amazing [@fountain_app](https://twitter.com/fountain_app) and [@Breez_Tech](https://twitter.com/Breez_Tech). All shows split with [@AdoptingBTC](https://twitter.com/AdoptingBTC) [@beefinitiative](https://twitter.com/beefinitiative) and [@BTCKindergarten](https://twitter.com/BTCKindergarten). All bitcoin boosts in the apps will be acknowledged on following show. LFG!!!',
			'**#IAMBUILDING**',
		],

		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'About me',
		body: [
			'I’m an artist and designer who has experienced all extremes of fiat culture. From deep poverty and the excessive lifestyle and ensuing trauma it activates to a radical transformation into a low time preference lifestyle. I just want to keep my head down and bring to life the rich oral history that Bitcoin has itself reanimated. Grateful for the signal and want to enhance it.',
		],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: '',
	idea: 'Transform That Puro Signal from a radio program into an animated/collage dance program: a Hyperbitcoinized Soul Train.',
	ownerIntro: '',
	blocks: projectBlocks,
};

const projectName: string = 'bitcoinjune';

export const BitcoinJune = { projectBlocks, projectDetails, projectName };
