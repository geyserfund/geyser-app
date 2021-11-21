import { Box, Divider, Heading, HStack, VStack } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import TweetEmbed from 'react-tweet-embed';
import { IdComponent } from '../../components/molecules';
import { Card, ImageBar, TwitterSkeleton } from '../../components/ui';
import { IProject, IProjectUser } from '../../interfaces';
import { getDaysAgo, getTwitterID, isDarkMode, isMobileMode } from '../../utils';

const useStyles = createUseStyles({
	twitter: {
		maxWidth: 450,
		'.twitter-widget-0': {
			width: '200px !important',
		},
	},
	aboutText: {
		width: '100%',
		fontSize: '14px',
	},
});

interface IActivityProps {
	project: IProject
}

export const Details = ({ project }: IActivityProps) => {
	const classes = useStyles();

	const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)');
	const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

	const [twitterLoading, settwitterLoading] = useState(true);
	const isDark = isDarkMode();
	const isMobile = isMobileMode();

	const handleSuccess = () => {
		settwitterLoading(false);
		console.log('checking success');
	};

	const componentPadding = isMobile ? '20px 10px 0px 10px' : '20px 40px 0px 40px';

	return (
		<Card
			backgroundColor={isDark ? 'brand.bgDark' : 'brand.bgGrey'}
			flex={3}
			borderRadius={isMobile ? '22px' : '22px 0px 0px 22px'}
			height="100%"
			overflow="hidden"
		>
			<Box padding={componentPadding}>
				<Text fontSize="16px"> Project: </Text>
				<Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
					<Heading fontSize="28px" fontWeight="normal">
						{project.title}
					</Heading>
					<Text>{`Created ${getDaysAgo(project.createdAt)} ago`}</Text>
				</Box>
			</Box>
			<Divider orientation="horizontal" borderBottomWidth="2px" borderColor="rgba(196, 196, 196, 0.4)" margin="5px 0px" />
			<Box padding={componentPadding} height={isMobile ? 'calc(100% - 150px)' : 'calc(100% - 100px)'} overflowY="auto" marginBottom="100px">
				{
					twitterLoading
					&& <TwitterSkeleton />}
				<Box minWidth={'300px'} maxWidth={isLargerThan1100 ? 'auto' : isLargerThan1000 ? 400 : 320}>
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
							userName={project.owner.user.username}
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
									userName={ambassador.user.username}
									fullName={ambassador.user.username}
									twitter
									badge="ambassador"
								/>
							))
						}

					</HStack>
				</VStack>
				<VStack spacing="5px" alignItems="left" marginTop="20px">
					<ImageBar />
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

			</Box>
		</Card>
	);
};

export default Details;
