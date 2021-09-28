import { Box, Text } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

import React, { lazy, Suspense } from 'react';
import { createUseStyles } from 'react-jss';
import { Fallback } from '../../components/ui';
import { isMobileMode } from '../../utils';

const Activity = lazy(() => import('./Activity'));
const Details = lazy(() => import('./Details'));

const useStyles = createUseStyles({
	tabListContainer: {
		margin: '0px 10px',
		'& button': {
			paddingLeft: 0,
			paddingRight: 0,
			// BorderColor: 'black',
			borderBottomWidth: '3px',
			boxShadow: 'none !important',
		},

	},
});

export const Project = () => {
	const classes = useStyles();
	const isMobile = isMobileMode();
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
				// Padding="10px"
				display="flex"
				overflow="hidden"
			>{
					isMobile ? (
						<Tabs width="100%" colorScheme="blackAlpha">
							<TabList className={classes.tabListContainer}>
								<Tab flex={1}><Text width="100%" textAlign="left" fontSize="24px" color="brand.textBlack">Project</Text></Tab>
								<Tab flex={1}><Text width="100%" textAlign="right" fontSize="24px" color="brand.textBlack">Activity</Text></Tab>
							</TabList>

							<TabPanels height="-webkit-fill-available" overflow="hidden">
								<TabPanel padding="10px 0px" height="-webkit-fill-available" overflow="hidden">
									<Suspense fallback={Fallback}>
										<Details />
									</Suspense>
								</TabPanel>
								<TabPanel padding="10px 0px" height="-webkit-fill-available" overflow="hidden">
									<Suspense fallback={Fallback}>
										<Activity />
									</Suspense>
								</TabPanel>

							</TabPanels>
						</Tabs>
					) : (
						<Suspense fallback={Fallback}>
							<Details />
							<Activity />
						</Suspense>
					)
				}

			</Box>
		</Box>
	);
};
