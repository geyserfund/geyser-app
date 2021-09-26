import { Box, Text } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

import React from 'react';
import { createUseStyles } from 'react-jss';
import { isMobileMode } from '../../utils';
import { Activity } from './Activity';
import { Details } from './Details';
const useStyles = createUseStyles({
	tabListContainer: {
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
				padding={'20px 10px'}
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
								<TabPanel padding="0px" height="-webkit-fill-available" overflow="hidden">
									<Details />
								</TabPanel>
								<TabPanel padding="0px" height="-webkit-fill-available" overflow="hidden">
									<Activity />
								</TabPanel>

							</TabPanels>
						</Tabs>
					) : (
						<>
							<Details />
							<Activity />
						</>
					)
				}

			</Box>
		</Box>
	);
};
