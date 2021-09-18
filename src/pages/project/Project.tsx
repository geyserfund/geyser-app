import { Box, Divider, Heading, HStack, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import TweetEmbed from 'react-tweet-embed';
import { IdComponent } from '../../components/molecules';
import { Card, TwitterSkeleton } from '../../components/ui';
import { Activity } from './Activity';

const useStyles = createUseStyles({
	twitter: {
		maxWidth: 450,
	},
});

export const Project = () => {
	const classes = useStyles();
	const ProjectName = 'The Hut in El Salvador';

	const [twitterLoading, settwitterLoading] = useState(true);

	const handleSuccess = () => {
		settwitterLoading(false);
		console.log('checking success');
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
		>
			<Card
				width="85%"
				height="-webkit-fill-available"
				margin="40px 0px"
				display="flex"
				overflow="hidden"
			>
				<Box backgroundColor="brand.bgGrey" flex={3} >
					<Box padding="20px 40px 0px 40px">
						<Text> Project: </Text>
						<Box display="flex" alignItems="center" justifyContent="space-between">
							<Heading fontSize="28px" fontWeight="normal">
								{ProjectName}
							</Heading>
							<Text>Created 1 Week ago</Text>
						</Box>
					</Box>
					<Divider orientation="horizontal" borderBottomWidth="2px" borderColor="rgba(196, 196, 196, 0.4)" margin="5px 0px" />
					<Box padding="20px 40px">
						{
							twitterLoading
								&& <TwitterSkeleton /> }
						<TweetEmbed
							className={classes.twitter}
							id="1435353835573293058"
							options={{ cards: 'hidden', conversation: 'none' }}
							onTweetLoadSuccess={handleSuccess}
						/>
						<VStack spacing="5px" alignItems="left">
							<HStack spacing="10px" display="flex">
								<Text>Project Owner:</Text>
								<IdComponent
									URL={'https://bit.ly/dan-abramov'}
									userName={'danAbramov'}
									fullName="Dan Abrahmov"
									twitter
									badge="ambassador"
								/>
							</HStack>
							<HStack spacing="10px" display="flex">
								<Text>Ambassador:</Text>
								<IdComponent
									URL={'https://bit.ly/dan-abramov'}
									userName={'danAbramov'}
									fullName="Dan Abrahmov"
									twitter
									badge="ambassador"
								/>
							</HStack>
						</VStack>

					</Box>
				</Box>
				<Activity />

			</Card>
		</Box>
	);
};
