import { useQuery } from '@apollo/client';
import { Box, Text } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import Cookies from 'js-cookie';

import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router';
import Loader from '../../components/ui/Loader';
import { QUERY_GET_PROJECT } from '../../graphql';
import { isDarkMode, isMobileMode } from '../../utils';
import Activity from './Activity/Activity';
import Details from './Details';

const useStyles = createUseStyles({
	tabListContainer: {
		margin: '0px 10px',
		'& button': {
			paddingLeft: 0,
			paddingRight: 0,
			borderBottomWidth: '3px',
			boxShadow: 'none !important',
		},

	},
});

export const Project = () => {
	const classes = useStyles();
	const isMobile = isMobileMode();

	const { projectId } = useParams<{ projectId: string }>();

	const { loading, error, data } = useQuery(QUERY_GET_PROJECT,
		{
			variables: { name: projectId },
		},
	);

	useEffect(() => {
		console.log('checking accessToken', Cookies.get('accessToken')); // => 'value'
		console.log('checking refreshToken', Cookies.get('refreshToken')); // => 'value'
	}, []);

	if (loading) {
		return (
			<Loader />
		);
	}

	if (error || !data.getProjectByName.success) {
		return <Text> Something went wrong, Please refresh</Text>;
	}

	const { project } = data.getProjectByName;

	console.log('checking data', loading, error, data);

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
		>
			<Box
				width="100%"
				maxWidth="1400px"
				height="-webkit-fill-available"
				margin={isMobile ? 0 : '20px 30px'}
				padding="10px"
				display="flex"
				overflow="hidden"
			>{
					isMobile ? (
						<Tabs width="100%" colorScheme="blackAlpha">
							<TabList className={classes.tabListContainer}>
								<Tab flex={1}><Text width="100%" textAlign="left" fontSize="24px" color={isDarkMode() ? 'brand.textWhite' : 'brand.textBlack'}>Project</Text></Tab>
								<Tab flex={1}><Text width="100%" textAlign="right" fontSize="24px" color={isDarkMode() ? 'brand.textWhite' : 'brand.textBlack'}>Fund</Text></Tab>
							</TabList>

							<TabPanels height="-webkit-fill-available" >
								<TabPanel padding="10px 0px" height="-webkit-fill-available" >
									<Details project={project} />
								</TabPanel>
								<TabPanel padding="10px 0px" height="-webkit-fill-available" >
									<Activity project={project} />
								</TabPanel>

							</TabPanels>
						</Tabs>
					) : (
						<>
							<Details project={project} />
							<Activity project={project} />
						</>
					)
				}

			</Box>
		</Box>
	);
};
