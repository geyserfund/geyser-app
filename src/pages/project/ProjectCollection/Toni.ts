import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [{
	key: 'problem',
	title: 'The problem',
	body: [
		'Newcomers to the Crypto world start learning about shitcoins, DeFi, Metaverses and NFTs instead of learning about Bitcoin, its history and the problem it tries to solve. We think it is crucial to know why and how this technology emerged, and most importantly, using Bitcoin establishes the base to develop great products.',
	],
	blockType: 'PL',
},
{
	key: 'idea',
	title: 'The idea',
	body: [
		'Day Of Genesis is a challenging digital card game which focuses on teaching players the key principles of Bitcoin. In this play-to-learn game, when players beat their opponents they will be able to unlock Bitcoin Lessons focused on the origins of Bitcoin, its philosophy, its technology and much more.',
		'Login and payments (micro bets and micro rewards) will work fully with the Lightning Network.',
		' It is a very competitive and thrilling game. Fast and agile. Fun and powerful. And play-to-learn mode is a very innovative method to bring newcomers to Bitcoin and teach them the most important aspects of the technology in a fun way.',
		'The game concept is based on a ‘Deck-building’ and ‘Push Your Luck’ format, and game modes include: playing against an AI (play-to-learn mode), playing online in a multiplayer mode (1vs1) and tournaments (CUP). ',
	],
	images: [2],
	blockType: 'PL',
},
{
	key: 'earn',
	title: 'PLAY TO LEARN',
	body: [
		'Play against an AI. It unlocks a new Bitcoin lesson every time you win a game. Earn some medals and Satoshis as you go.',
	],
	blockType: 'PL',
},
{
	key: '1v1',
	title: '1VS1 (winner takes all)',
	body: [
		'Every player deposits some Satoshis in the pot. Winner takes all (minus a fee).',
	],
	blockType: 'PL',
},
{
	key: 'cup',
	title: 'CUP',
	body: [
		'Competition among a few players in tournament mode. Every player will deposit some Satoshis in the pot. Winner takes all (minus a fee).',
	],
	blockType: 'PL',
},
{
	key: 'medals',
	title: 'MEDALS',
	body: [
		'Achieve some goals to earn medals. They will bring you status and special prizes. Collect 3 different medals from every hero to place yourself on a Tier. There will be 6 Tiers.',
	],
	images: [10],
	blockType: 'PL',
},
{
	key: 'tiers',
	title: 'TIERS',
	body: [
		'Players will promote to a higher Tier as they get more medals. Some % of the total fees generated during the games will be distributed among players positioned on Tiers.',
	],
	blockType: 'PL',
},
{
	key: 'eel',
	title: 'EXTERNAL EXTRA LIFE (EEL)',
	body: [
		'Players start the game with 3 lives, and they are given the chance to buy an extra life if they loose all three. That fresh new money will be added to the pot and delivered to the final winner. Players who purchase an Eternal Extra Life are guaranteed 4 lives forever.',
	],
	blockType: 'PL',
},
{
	key: 'top',
	title: 'TOP CONTRIBUTORS',
	body: [
		'Contributors of +125k Satoshis will receive a right for an Eternal Extra Life and will get access to the closed beta version right away! THE CLOSE BETA IS ALREADY AVAILABLE.',
		'[Presentation PDF](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e11e3a18-9320-4eb8-946d-e37100ee0d64/presentation.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220416T084431Z&X-Amz-Expires=86400&X-Amz-Signature=30c2055b33dcacc3b2c0e8525c31fe5ebae2c63367c62889322ee2abdab0bfd4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22presentation.pdf%22&x-id=GetObject)',
		'[Fast Guide PDF](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f90912b5-171c-4798-8955-cf0f0cdad9e9/Fast_guide.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220410T214820Z&X-Amz-Expires=86400&X-Amz-Signature=3d648660c367b22e95fcd355b455b97c359fc43790bf19e212db82da1f79a31c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Fast_guide.pdf%22&x-id=GetObject)',
	],
	blockType: 'PL',
},
{
	key: 'includes',
	title: 'What the funds will be used for',
	body: [
		'- Upgrading game design',
		'- Integrating micro bets',
		'- Integrate micro rewards and medals',
		'- Integrate tiers',
		'- Create more Bitcoin lessons for Play to Learn mode',
		'- Develop app for iOS and Android',
		'- Build community',
	],
	blockType: 'PL',
},
{
	key: 'rewards',
	title: 'Rewards',
	body: [
		'**PRO license + Eternal Extra Life (EEL) + Early Access to the game ($50)**',
		'Enjoy an Extra Life forever on top of the standard 3 lives you get in the game, and get access to the closed beta version of the game right away!',
		'The Pro License includes:',
		'- Avatar',
		'- Vs Pro mode ',
		'- CUP mode ',
		'- Vs and CUP medals ',
		'- Access to Tiers that allow players to get revenue shares',
		'**There will be a maximum of 10,000 license issued**',
	],
	blockType: 'PL',
	images: [9],
},
{
	key: 'aboutMe',
	title: 'About me',
	body: [
		'My name is Toni Moral. I was a professional football player in Spain with an entrepreneurial heart. I have been passionate about Bitcoin since 2013, and I’ve always focused on building products on top of it. I started with using proof of existence (timestamping), then with tokenization on the Colored Coins protocol. More recently my team and I created [Watafan.com](http://watafan.com/) (2018), the first NFT platform built on a Bitcoin sidechain (RSK). And with the development of the Lightning Network so many new possibilities opened up for gaming, so we built Day of Genesis. Day of Genesis brings fun and learning together, by leveraging the power of Lightning. By building it, we hope that with fun and play, we can spread Bitcoin to the world. Join us!',
	],
	blockType: 'PL',
}];

const projectDetails: IProjectDetail = {
	problem: '',
	idea: 'A digital card game that is fun, allows you to earn satoshis, and teaches you about the principles, history and philosophy of Bitcoin. ',
	ownerIntro: 'I’m a former professional football player with an entrepreneurial heart and passionate about Bitcoin since 2013',
	blocks: projectBlocks,
};
const projectName: string = 'dayofgenesis';

export const Toni = {projectBlocks, projectDetails, projectName};
