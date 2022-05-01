import { IProjectBlock, IProjectDetail } from '../../../interfaces';

const projectBlocks: IProjectBlock[] = [{
	key: 'title1',
	title: '',
	body: [
		'I plan on going street to street enlightening youths about bitcoin and lightning.',
		' I noticed that the key to massive adoption of bitcoin and lightning in Nigeria is by talking to youths in the street who are ready to listen and sharing Satoshis with them if they are new to Bitcoin. I will also share satoshis to bitcoiners who answer some certain questions. I also plan on teaching them easy ways to stack satoshis like thundr games e.t.c.. i believe Nigeria can transform from an underdeveloped country to a super developed country with the help of bitcoin and lightning. I would love all bitcoiners around the world who buy this idea and vision to help support massively and make it a reality. I plan on sharing 80% of the SATs donated to the street and the remaining 20% for transportation and feeding. ',
		' Thanks.',
		'I also plan on hosting another Bitcoin Conference as we hosted the 1st Lagos Bitcoin Conference, but this time we are hosting it at Kwara state around the University of Ilorin. I would love to host it in the next two months.',
	],
	blockType: 'PL',
},
{
	key: 'aboutMe',
	title: 'About me',
	body: [
		'A visionary, game changer, speaker, author, mentor, bitcoin investor, and dedicated entrepreneur. Apata Johnson is on a mission to shift our culture, and won\'t stop until his vision becomes a reality. Johnson can\'t stand traditional education, and feels our society isn\'t doing enough to educate, teach, and train our youth on how to REALLY thrive in this tough new age economy. He\'s taken it upon himself to guide and educate our millennials on what it takes to not only succeed, but thrive. Johnson\'s aim is to make Nigeria, Africa and the World a cryptocurrency world [ Bitcoin and lightning world]. Johnson has seen a lot of success over the years, but even more failure. He\'s used his past to design his ideal future, and has dedicated the last 4 years to helping people maximize their potentials, and also create bitcoin awareness across all social media.  Johnson is the C.E.O of LUMINOUS EXCHANGE',
	],
	images: [0],
	blockType: 'PL',
}];

const projectDetails: IProjectDetail = {
	problem: 'Financial illiteracy among youths in Nigeria',
	idea: 'Teaching youths financial literacy with Bitcoin and lightning',
	ownerIntro: 'I’m Apata Johnson. I’m a visionary, a dedicated entrepreneur, who loves technology. As a thinker, and someone who cherish technology I can say that Bitcoin is the next big thing, I have hope that with Bitcoin we change the way we view money in Nigeria and the world as a whole. And how, with Bitcoin, Nigeria will transform from an underdeveloped nation to a super developed nation. I’m just a freedom lover and I feel Nigeria needs bitcoin.',
	blocks: projectBlocks,
};

const projectName: string = 'the-bitcoin-game';

export const Apata = {projectBlocks, projectDetails, projectName};
