import { Box, HStack, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import React from 'react';
import TweetEmbed from 'react-tweet-embed';
import { IdComponent } from '../../../components/molecules';
import { ImageBar, TwitterSkeleton } from '../../../components/ui';
import { IProjectUser } from '../../../interfaces';
import { getTwitterID } from '../../../utils';

export const Default = ({
	twitterLoading,
	isLargerThan1100,
	isLargerThan1000,
	isDark,
	classes,
	project,
	handleSuccess,
}: any) => {
	const images = [
		{
			original: 'https://picsum.photos/200/300',
			thumbnail: 'https://picsum.photos/200/300',
		},
		{
			original: 'https://picsum.photos/400/500',
			thumbnail: 'https://picsum.photos/400/500',
		},
		{
			original: 'https://picsum.photos/600/600',
			thumbnail: 'https://picsum.photos/600/600',
		},
		{
			original: 'https://picsum.photos/900/400',
			thumbnail: 'https://picsum.photos/900/400',
		},
		{
			original: 'https://picsum.photos/900/400',
			thumbnail: 'https://picsum.photos/900/400',
		},
		{
			original: 'https://picsum.photos/700/300',
			thumbnail: 'https://picsum.photos/700/300',
		},
		{
			original: 'https://picsum.photos/900/400',
			thumbnail: 'https://picsum.photos/900/400',
		},
		{
			original: 'https://picsum.photos/900/400',
			thumbnail: 'https://picsum.photos/900/400',
		},
		{
			original: 'https://picsum.photos/900/400',
			thumbnail: 'https://picsum.photos/900/400',
		},

	];

	return (
		<>
			{
				twitterLoading
				&& <TwitterSkeleton />}
			<Box minWidth="300px" maxWidth={isLargerThan1100 ? 'auto' : isLargerThan1000 ? 400 : 320}>
				{
					isDark
						? <TweetEmbed
							className={classes.twitter}
							id={getTwitterID(project.originUrl)}
							options={{ cards: 'hidden', conversation: 'none', theme: 'dark' }}
							onTweetLoadSuccess={handleSuccess}
						/>
						: <TweetEmbed
							className={classes.twitter}
							id={getTwitterID(project.originUrl)}
							options={{ cards: 'hidden', conversation: 'none', theme: 'light' }}
							onTweetLoadSuccess={handleSuccess}
						/>
				}

			</Box>

			<VStack spacing="5px" alignItems="left" marginTop="20px">
				<HStack spacing="10px" display="flex" flexWrap="wrap">
					<Text fontSize="16px">Project Owner:</Text>
					<IdComponent
						URL={project.owner.user.picture}
						username={project.owner.user.username}
						fullName={project.owner.user.username}
						twitter
						badge="owner"
					/>
				</HStack>
				<HStack spacing="10px" display="flex" flexWrap="wrap">
					<Text fontSize="16px">Ambassador:</Text>
					{
						project.ambassadors.map((ambassador: IProjectUser) => (
							<IdComponent
								key={ambassador.user.id}
								URL={'https://bit.ly/dan-abramov'}
								username={ambassador.user.username}
								fullName={ambassador.user.username}
								twitter
								badge="ambassador"
							/>
						))
					}

				</HStack>
			</VStack>
			<VStack spacing="5px" alignItems="left" marginTop="20px">
				<ImageBar images={images} />
			</VStack>
			<VStack spacing="10px" marginTop="15px" display="flex" flexDirection="column" alignItems="flex-start">
				<Text fontSize="16px">About</Text>
				<Text
				/* Default options */
					lines={3}
					more={<><br />Show more</>}
					less="Show less"
					className={classes.aboutText}
					// AnchorClass="my-anchor-css-class"
					// OnClick={this.executeOnClick}
					expanded={false}
				// Width={280}
				// TruncatedEndingComponent={'... '}
				>
					{project.description}
				</Text>
			</VStack>

		</>
	);
};

