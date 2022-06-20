import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
	{
		key: 'podcast',
		title: '',
		body: [],
		podcast: 'https://soundcloud.com/user-44010708/the-anatomy-of-bitcoin-006?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
		blockType: 'PL',
	},
	{
		key: 'description1',
		title: 'Project Description',
		body: [
			'A documentary and comprehensive tour through the bitcoin protocol. This production will evolve in the utmost openness to allow spontaneous contributions: creative, monetary, or management.',
		],
		tweet: '1516198702192513031',
		blockType: 'PL',
	},
	{
		key: 'description2',
		title: '',
		body: [
			'The main audience for this film are bitcoiners, appealing to their sense of elevation, as well as those interested in learning more about it. Inviting anyone interested to participate in the first community effort in the representation of the metaphysical in bitcoin.',
		],
		tweet: '1471139596348149769',
		blockType: 'PL',
	},
	{
		key: 'description3',
		title: '',
		body: [
			'To stay true to the bitcoin protocol, and deliver the best and most accurate representation, the project will let itself be guided by the network rules themselves. All visual elements should have a distinct purpose and avoid ambiguity and redundancy as much as possible.',
			'The narrative will guide the user through all aspects of bitcoin, from network configurations, to the way bits are sorted in signatures.',
		],
		tweet: '1456277121903435776',
		blockType: 'PL',
	},
	{
		key: 'description4',
		title: '',
		body: [
			'Looking for contributors in the community that can add value to the film by adding their own interests and skills to the project. If successful, this film will help bitcoiners visualize and understand each component and their function.',
			'Similar attempts have been successful at illustrating the universe in relation to the human scale. This film aims at representing bitcoin with the same precision.',
		],
		tweet: '1423485594089443330',
		blockType: 'PL',
	},
	{
		key: 'rewards',
		title: 'Rewards',
		body: [
			'- **Contributor Credit**  Price: 100k Sats. “Special thanks to…” mention',
			'- **Sponsor Credit**  Price: 10M Sats. “Produced with the support of…” mention',
			'- **Executive Producer Credit**  Price: 50M Sats. “Produced by” with Logo',
		],
		tweet: '1417668364244242436',
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'Who am I?',
		body: [
			'I’m a bitcoiner trying to emulate Satoshi’s practices and methods applied in the deployment and development of bitcoin.',
		],
		blockType: 'PL',
	},
];

const projectDetails: IProjectDetail = {
	problem: 'Non technical users and pre-coiners have no entertaining way to learn the technical side of bitcoin and are hesitant to dig deeper.',
	idea: 'Establish a compelling narrative in long form film to educate and connect the viewer to the rules of the bitcoin protocol using real data and stunning visuals.',
	ownerIntro: 'I’m a bitcoiner trying to emulate Satoshi’s practices and methods applied in the deployment and development of bitcoin.',
	blocks: projectBlocks,
};

const projectName: string = 'anatomy-of-bitcoin';

export const Pedro = {projectBlocks, projectDetails, projectName};
