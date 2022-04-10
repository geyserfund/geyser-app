import {
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Footer } from '../../../components/molecules';
import { IProject, IProjectBlock, IProjectDetail, IProjectUpdate } from '../../../interfaces';
import { OwnerSponsorCard, DetailsBlock, SponsorBlock, UpdatesBlock } from '../ProjectComponent';

export const Toni = ({ project }: { project: IProject}) => {
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
			'Genesis Liberation Day is a challenging digital card game which focuses on teaching players the key principles of Bitcoin. In this play-to-learn game, when players beat their opponents they will be able to unlock Bitcoin Lessons focused on the origins of Bitcoin, its philosophy, its technology and much more.',
			'[Presentation PDF](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/93416c08-eab0-479b-a9c0-3f955f5e4fa4/presentacion.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220410T214513Z&X-Amz-Expires=86400&X-Amz-Signature=490b0868d9a5e992f09e622b8306f99848aa05a706a9001e64cac20d52d0d428&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22presentacion.pdf%22&x-id=GetObject)',
			'[Fast Guide PDF](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f90912b5-171c-4798-8955-cf0f0cdad9e9/Fast_guide.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220410T214820Z&X-Amz-Expires=86400&X-Amz-Signature=3d648660c367b22e95fcd355b455b97c359fc43790bf19e212db82da1f79a31c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Fast_guide.pdf%22&x-id=GetObject)',
		],
		blockType: 'PL',
	},
	{
		key: 'includes',
		title: 'What the funds will be used for',
		body: [
			'- Improve design',
			'- integrate micro bets',
			'- Integrate micro rewards and medals',
			'- Integrate tiers',
			'- Create more Bitcoin lessons for Play to Learn mode',
			'- Develop app for ios and android',
			'- Build community',
		],
		blockType: 'PL',
	},
	{
		key: 'rewards',
		title: 'Rewards',
		body: [
			'- **Board Game (125k satoshis)**: Enjoy an Extra Life forever on top of the standard 3 lives you get in the game. There will be a total of 10,000 EELs and a secondary market to trade them.',
		],
		blockType: 'PL',
	},
	{
		key: 'objectives',
		title: 'Objectives',
		body: [
			'- Improve design',
			'- integrate micro bets',
			'- Integrate micro rewards and medals',
			'- Integrate tiers',
			'- Create more Bitcoin lessons for Play to Learn mode',
			'- Develop app for iOS and Android',
			'- Build community',
		],
		images: [project.media[7]],
		blockType: 'PL',
	},
	{
		key: 'aboutMe',
		title: 'About me',
		body: [
			'My name is Toni Moral. I was a professional football player in Spain with an entrepreneurial heart. I have been passionate about Bitcoin since 2013, and I’ve always focused on building products on top of it. I started with using proof of existence (timestamping), then with tokenization on the Colored Coins protocol. More recently my team and I created [Watafan.com](http://watafan.com/) (2018), the first NFT platform built on a Bitcoin sidechain (RSK). And with the development of the Lightning Network so many new possibilities opened up for gaming, so we built Day of Genesis. Day of Genesis brings fun and learning together, by leveraging the power of Lightning. By building it, we hope that with fun and play, we can spread Bitcoin to the world. Join us!',
		],
		blockType: 'PL',
	}];

	const projectUpdates: IProjectUpdate[] = [];

	const projectDetails: IProjectDetail = {
		problem: '',
		idea: 'A digital card game that is fun, allows you to earn, and teaches you about the principles, history and philosophy of Bitcoin. ',
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
