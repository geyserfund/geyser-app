import { useLazyQuery } from '@apollo/client';
import { Box, Text } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation, useParams } from 'react-router';
import Loader from '../../components/ui/Loader';
import { customHistory } from '../../config';
import { QUERY_GET_PROJECT } from '../../graphql';
import { isDarkMode, isMobileMode } from '../../utils';
import { NotFound } from '../notFound';
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
	const { state } = useLocation<{ loggedOut?: boolean }>();

	useEffect(() => {
		try {
			getProject();
		} catch (_) {
			customHistory.push('/not-found');
		}
	}, [state]);

	const [getProject, { loading, error, data }] = useLazyQuery(QUERY_GET_PROJECT,
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

	if (error || !data || !data.getProjectByName.success) {
		console.log('checking error', error);
		console.log('checking data', data);
		return <NotFound />;
	}

	const { project } = data && data.getProjectByName;

	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100%"
			>
				<Box
					width="100%"
					height="-webkit-fill-available"
					display="flex"
					overflow="hidden"
				>{
						isMobile ? (
							<Tabs width="100%" colorScheme="blackAlpha" backgroundColor="brand.bgGrey">
								<TabList className={classes.tabListContainer}>
									<Tab flex={1}><Text width="100%" textAlign="left" fontSize="20px" color={isDarkMode() ? 'brand.textWhite' : 'brand.textBlack'}>Project</Text></Tab>
									<Tab flex={1}><Text width="100%" textAlign="right" fontSize="20px" color={isDarkMode() ? 'brand.textWhite' : 'brand.textBlack'}>Fund</Text></Tab>
								</TabList>

								<TabPanels height="-webkit-fill-available" >
									<TabPanel padding="0px" height="-webkit-fill-available" >
										<Details project={project} />
									</TabPanel>
									<TabPanel padding="0px" height="-webkit-fill-available" >
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
		</>
	);
};
