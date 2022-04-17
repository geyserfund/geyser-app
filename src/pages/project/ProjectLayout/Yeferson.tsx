import {
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Footer } from '../../../components/molecules';
import { IProject, IProjectBlock, IProjectDetail, IProjectUpdate } from '../../../interfaces';
import { OwnerSponsorCard, DetailsBlock, SponsorBlock, UpdatesBlock } from '../ProjectComponent';

export const Yeferson = ({ project }: { project: IProject}) => {
	const projectBlocks: IProjectBlock[] = [
		{
			key: 'idea',
			title: 'The idea',
			body: [
				'A classic space arcade game with awesome pixel art graphics with in-game Bitcoin Lightning rewards.',
			],
			blockType: 'PL',
		},
		{
			key: 'about',
			title: 'About the game',
			body: [
				'**Lightning Rebel** is a cryptogame in the arcade genre, based on a space adventure with retro pixel art graphics with in-game Bitcoin Lightning rewards. ',
				'The player will control a spaceship that will have to face an army of enemy ships. Each enemy ship counts to accumulate points and claim rewards in Satoshis. All your earnings can be withdrawn directly to any Lightning wallet.',
				'This game is a space adventure trip with deep retro vibe. Get the thrill of playing to win at any time of the day!',
			],
			images: [project.media[1]],
			blockType: 'PL',
		},
		{
			key: 'where',
			title: 'Where to play',
			body: [
				'This videogame will have a free to win mobile version on the Google Play Store and a premium version for PC. The said version will be available on the **Elixir Launcher**, a Play to Earn (P2E) gaming platform belonging to the P2E videogame development company Satoshi Games.',
				'Difference between, the mobile version and the PC version.',
				'- The mobile version will be free but comes with advertisements, which will represent the main income for the team that develops this project.',
				'- The PC version will not have any kind of advertising, however, the game will cost $6. You can also pre-purchase it now with a 50% discount on [Elixir](https://elixir.app/).',

			],
			blockType: 'PL',
		},
		{
			key: 'when',
			title: 'When does the game launch?',
			body: [
				'The launch date is June 20, 2022. Premium Funders will have access to the game on June 10th.',
			],
			images: [project.media[2]],
			blockType: 'PL',
		},
		{
			key: 'why',
			title: 'Why donate?',
			body: [
				'By donating and contributing to this game you’ll support us in developing this and more Bitcoin games for you. ',
				'You’ll be able to access rewards:',
				'- **Access to first contest:** Be part of a game competition where you can win Sats.',
				'- **Premium: Access to contest + Early access + More: ** Access private beta version of the game weeks before release (June 10) and access to private  Discord channel.',
			],
			blockType: 'PL',
		},
		{
			key: 'mission',
			title: 'Our mission',
			body: [
				'At DCS we want to bring fun to the Bitcoin community and Bitcoin to the gaming community!',
				'Through retro games, we want to make our players feel like they are traveling back in time.',
				'Bringing fun and Satoshis in the hands of everyone is our priority!',
			],
			blockType: 'UL',
		},
		{
			key: 'community',
			title: 'Community Links',
			body: [
				'Twitter: @district_p2e',
				'Instagram: @distritocstudios',
				'Facebook: @distritocstudios',
			],
			images: [project.media[3]],
			blockType: 'UL',
		},
		{
			key: 'demo',
			title: 'Demo Video',
			body: [
				'[Youtube Demo Video](https://www.youtube.com/watch?v=88QjMXzPPg0&t=14s)',
			],
			blockType: 'PL',
		},
		{
			key: 'aboutTeam',
			title: 'About the team',
			body: [
				'This game is being developed by the Venezuelan startup DCS, Distrito c Studios, which was founded by Yeferson Peña, Hernán Colmenares and Josué Valentín. ',
				'We are three retro-loving Latin Geeks who love the freedom of bitcoin and the speed of the lightning network. Above all, we want our players to have a good time and earn some Bitcoin. We won\'t make you a millionaire, but we will contribute to Friday pizza. 🍕',
			],
			blockType: 'PL',
		},
	];

	const projectUpdates: IProjectUpdate[] = [];

	const projectDetails: IProjectDetail = {
		problem: '',
		idea: 'A digital card game that is fun, allows you to earn satoshis, and teaches you about the principles, history and philosophy of Bitcoin. ',
		ownerIntro: 'I’m a former professional football player with an entrepreneurial heart and passionate about Bitcoin since 2013',
		blocks: projectBlocks,
	};

	const renderUpdates = () => {
		if (projectUpdates && projectUpdates.length > 0) {
			return projectUpdates.map((update: IProjectUpdate) => <UpdatesBlock key={update.updateTitle} projectUpdate={update}/>,
			);
		}
	};

	return (
		<VStack alignItems="center" width="100%">
			<VStack spacing="20px" alignItems="left" marginTop="20px" paddingBottom="50px" maxWidth="780px">
				<OwnerSponsorCard
					images={project.media}
					owner={project.owners[0]}
					ambassadors={project.ambassadors}
					sponsors={project.sponsors}
					ownerIntro={projectDetails.ownerIntro}
					problem={projectDetails.problem}
					idea={projectDetails.idea}
				/>
				<DetailsBlock projectDetails={projectDetails} />
				{ renderUpdates() }
				<SponsorBlock sponsors={project.sponsors}/>
			</VStack >
			<Footer />
		</VStack >
	);
};
