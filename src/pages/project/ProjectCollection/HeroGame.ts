import { IProjectBlock, IProjectDetail } from '../../../interfaces';

const projectBlocks: IProjectBlock[] = [
	{
		key: 'heading',
		title: 'HERO OF BITCOIN - The Game',
		body: [],
		blockType: 'PL',
		images: [1],
	},
	{
		key: 'story',
		title: 'Story',
		body: [
			'Hero of Bitcoin the game is a story inspired by Bitcoin culture and is set in the beautiful Bitcoin-sovereign nation of El Salvador. You will be taken to iconic places such as Bitcoin Beach, the volcano and more, all the way to the bank\'s doorstep.',
			'The game follows the journey of a young man called Hero, a new bitcoiner, who journeys to El Salvador wanting to help the Bitcoin fight on the frontlines. You will need to help President Bukele and other bitcoiners to ensure sh*tcoiners, bears, bankers and more do not stand in the way of Bitcoin adoption.',
		],
		images: [13, 11],
		blockType: 'PL',
	},
	{
		key: 'body1',
		title: '',
		body: [
			'Enjoy all this with stunning 8-bit graphics on a high resolution 160 x 144 pixel screen and stereo sound!!',
			'[WATCH THE INTRO HERE:](https://photos.app.goo.gl/CAkUGoMVXLuKaJoZ8)',
		],
		blockType: 'PL',
	},
	{
		key: 'features',
		title: 'Features',
		body: [],
		blockType: 'PL',
	},
	{
		key: 'features1',
		title: '',
		body: [
			'The game is a platformer similar to classic Mario games although different.',
			'There will be 21 bitcoin hidden throughout the game, what happens when you collect them all? You will have to find out.',
			'Story elements will have hand drawn pixel art pictures.',
		],
		images: [15, 4, 12],
		blockType: 'PL',
	},
	{
		key: 'features2',
		title: '',
		body: [
			'You will meet famous bitcoiners on your journey. (eg Greg Foss, Max Keiser and Stacy Herbert)',
		],
		images: [8, 9, 10],
		blockType: 'PL',
	},
	{
		key: 'features3',
		title: '',
		body: [
			'Your weapon and armor will become stronger as the story progresses.',
		],
		images: [6],
		blockType: 'PL',
	},
	{
		key: 'features1',
		title: '',
		body: [
			'There will be different enemies and bosses that are based off the real enemies of bitcoiners. (eg. PermaBear)',
			'The game cart will work on a Gameboy, Pocket, Color, Advanced, SP and even on the Super Gameboy for the Super Nintendo. It will be 4 shades of gray on the Gameboy and Pocket, but for those with a color screen it will display in color.',
			'There are more features planned and will be announced over the games development. Please look forward to it!',
		],
		images: [3, 2],
		blockType: 'PL',
	},
	{
		key: 'development',
		title: 'DEVELOPMENT',
		body: [
			'Currently the game is about 30% done. The game has been tested for all the basic gameplay mechanics and has been tested on a real gameboy.',
			'Development will have a few different phases:',
			'PHASE 1: Physical Gameboy version + box and manual/artbook + more. This initial run will be for Geyser supporters only and will be the only version to include a small amount of real bitcoin unlockable in the game.This game has strong language and is not suitable for children.',
			'PHASE 2: An android, iphone and Windows version will be created along with a kid-friendly version. ',
			'PHASE 3: If there is enough interest the game will be translated into Spanish which may also have a physical release. Anything is possible here, this can be expanded to other languages and platforms as needed.',
		],
		blockType: 'PL',
	},
	{
		key: 'rewards',
		title: 'GEYSER REWARDS',
		body: [
			'These are not quite ready yet and will be put up on Geyser once the game gets closer to completion. Here’s an example of what you most likely will be able to unlock:',
			'- Name in credits. (Any amount of donation)',
			'- The game cart only with plastic case protector. ',
			'- The game with plastic case protector, box and manual.',
			'- Put yourself in the game as an NPC.',
			'- Put your company building/shop in the game.',
			'- Sponsorship tiers. Eg. logo on box, intro screen, ending credits, in game, etc.',

		],
		blockType: 'PL',
	},
	{
		key: 'sponsors',
		title: 'SPONSORS',
		body: [
			'If you would like to sponsor this project early in some way please contact me at heroofbtc@gmail.com',
		],
		images: [5],
		blockType: 'PL',
	},
	{
		key: 'sponsors2',
		title: '',
		body: [
			'Special thanks to Lightning Prints for sponsoring this project with their amazing stickers!',
			'Please support them here:',
			'[Twitter:](https://twitter.com/ln_prints)',
			'[Website:](https://lightning-prints.com/)',

		],
		images: [14],
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'About me',
		body: [
			'Hero of Bitcoin is a bitcoin maximalist who believes that we need to bring back the golden age of gaming for the golden age of money, which is Bitcoin. Before creating this game, he was a Bitcoin only artist. His skills and knowledge of Bitcoin serve him well in his journey to create this unique, entertaining, nostalgic and at times educational game. You can find me on twitter at https://twitter.com/HeroOfBitcoin or contact me by email at heroofbtc@gmail.com',
			'Twitter QR Code',
		],
		images: [7],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: '',
	idea: 'Creating a Bitcoin inspired video game that works on a real Gameboy, as well as android and Desktop.',
	ownerIntro: 'Hero of Bitcoin is a bitcoin maximalist who believes that we need to bring back the golden age of gaming',
	blocks: projectBlocks,
};

const projectName: string = 'heroofbitcoin';

export const HeroGame = { projectBlocks, projectDetails, projectName };
