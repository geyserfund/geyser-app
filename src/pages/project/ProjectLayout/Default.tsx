/* eslint-disable capitalized-comments */
// import { Box, HStack, VStack } from '@chakra-ui/layout';
import { HStack, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import React from 'react';
// import TweetEmbed from 'react-tweet-embed';
import { IdComponent } from '../../../components/molecules';
import { ImageBar, TwitterSkeleton } from '../../../components/ui';
import { IParticipant } from '../../../interfaces';
// import { getTwitterID } from '../../../utils';

export const Default = ({
	twitterLoading,
	// isLargerThan1100,
	// isLargerThan1000,
	// isDark,
	classes,
	project,
	// handleSuccess,
}: any) => {
	const images = [
		'https://picsum.photos/200/300',
		'https://picsum.photos/400/500',
		'https://picsum.photos/600/600',
		'https://picsum.photos/900/400',
		'https://picsum.photos/700/300',
	];

	return (
		<>
			{
				twitterLoading
				&& <TwitterSkeleton />}
			{/* <Box minWidth="300px" maxWidth={isLargerThan1100 ? 'auto' : isLargerThan1000 ? 400 : 320}>
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

			</Box> */}

			<VStack spacing="5px" alignItems="left" marginTop="20px">
				<HStack spacing="10px" display="flex" flexWrap="wrap">
					<Text fontSize="16px">Project Owner:</Text>
					{
						project.owners.map((owner: IParticipant) => (
							<IdComponent
								key={owner.user.id}
								URL={owner.user.imageUrl}
								username={owner.user.username}
								fullName={owner.user.username}
								twitter
							/>
						))
					}
				</HStack>
				<HStack spacing="10px" display="flex" flexWrap="wrap">
					<Text fontSize="16px">Ambassador:</Text>
					{
						project.ambassadors.map((ambassador: IParticipant) => (
							<IdComponent
								key={ambassador.user.id}
								URL={'https://bit.ly/dan-abramov'}
								username={ambassador.user.username}
								fullName={ambassador.user.username}
								twitter
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

