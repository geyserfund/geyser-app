import { IProjectBlock, IProjectDetail } from '../../../interfaces';

const projectBlocks: IProjectBlock[] = [{
	key: 'title1',
	title: '',
	body: [
		'Bitcoin Ballers was born in April 2021 after falling deep into the Bitcoin rabbit hole. Through numerous Bitcoin themed skill-based competitions, lots of prizes and sats have been given out as rewards for both participating and winning. The end of 2021 saw Bitcoin Ballers host its first ever Winter Cup Festival for young people where they competed to be crowned champions and win the trophy. Ultimately, as promised during the April 2021 launch, Bitcoin Ballers is going to the Moon… But before this happens, we\'ll be orange-pilling and onboarding as many plebs as possible with more competitions, more tournaments, more teams, more cities, more countries…',
	],
	images: [4],
	blockType: 'PL',
},
{
	key: 'title2',
	title: '',
	body: [
		'By becoming a supporter of Bitcoin Ballers and helping fund our initiatives you\'ll initially help us kit out some boys & girls junior teams who will be representing us in football tournaments this summer. In addition to that, you\'ll allow us to create more fun online prize-giveaway competitions and reward participants, host more family friendly festivals, provide more equipment to coach more teams, enter more sides into football tournaments, work with and nurture talented individuals and visit more cities with our pop-up skills workshops. Our ultimate mission is to export the Bitcoin Ballers concept around the globe spreading the Clubs message… \'Bitcoin is for everyone and by studying it, understanding it, living it, you have an opportunity to become a better player, a better person... all for a better world.',
	],
	images: [2],
	blockType: 'PL',
},
{
	key: 'rewards',
	title: 'Rewards',
	body: [
		'- **Bitcoin Ballers Club replica team shirt with name or number on the back**: The Bitcoin Ballers shirt will be worn this spring/summer by youth and adult teams entering tournaments representing the club.',
		'- **Company Logo on a Bitcoin Ballers team kit and replica shirt with name and number on the back**: The Bitcoin Ballers shirt will be worn this spring/summer by youth and adult teams entering tournaments representing the club.',
	],
	images: [0],
	blockType: 'PL',
},
{
	key: 'demo',
	title: 'Video',
	body: [
		'[Youtube Video](https://www.youtube.com/watch?v=mkTD4OE0pNw)',
		'[![lightning rebel demo](https://storage.googleapis.com/geyser-projects-media/project/bitcoin-ballers/yt_thumbnail.png)](https://www.youtube.com/watch?v=mkTD4OE0pNw "Bitcoin Ballers video")',
	],
	blockType: 'PL',
},
{
	key: 'aboutMe',
	title: 'About me',
	body: [
		' A former football trainee who was fingertips away from a career in the game, always feeling at odds with a settled career in construction. Many years later after climbing the ladder into management, the decision was made in the year of the grand awakening (2020) to take a leap of faith and focus on a mission of health and wellness. This journey led to the 3rd touchpoint of Bitcoin but this time was ready to receive. After many hours of listening, reading, and talking with Bitcoiners, the idea came about to provide value back into the space with something that was close to my heart, football.',
	],
	images: [3],
	blockType: 'PL',
}];

const projectDetails: IProjectDetail = {
	problem: 'Increase awareness and understanding of money and Bitcoin, specifically relating to time, energy, value and responsibility.',
	idea: 'Promoting financial curiosity through information, competition and education using football as a medium, linking the fundamentals and principles of Bitcoin. Mainly DYOR (training), FUD busting (self-belief) & Proof Of Work (performance & personal responsibility)',
	ownerIntro: 'I\'m a former football trainee now looking to bring together football, Bitcoin and education.',
	blocks: projectBlocks,
};

const projectName: string = 'bitcoin-ballers';

export const Josias = {projectBlocks, projectDetails, projectName};
