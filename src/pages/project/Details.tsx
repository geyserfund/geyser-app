import { Box, Divider, Heading } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { IProject } from '../../interfaces';
import { getDaysAgo, isDarkMode, isMobileMode } from '../../utils';
import { Default, King } from './ProjectLayout';

type Rules = 'twitter' | 'aboutText' | 'detailsContainer'

interface IStyles {
	isMobile?: boolean;
}

const useStyles = createUseStyles<Rules, IStyles >({
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
	detailsContainer: ({isMobile}: IStyles) => ({
		padding: isMobile ? '20px 10px 0px 10px' : '20px 40px 0px 40px',
		height: isMobile ? '-webkit-calc(100% - 120px)' : '-webkit-calc(100% - 90px)',
		fallbacks: [
			{height: isMobile ? 'calc(100% - 120px)' : 'calc(100% - 90px)'},
		],
		overflowY: 'scroll',
		WebkitOverflowScrolling: 'touch',
	}),
});

interface IActivityProps {
	project: IProject
}

export const Details = ({ project }: IActivityProps) => {
	const isMobile = isMobileMode();
	const componentPadding = isMobile ? '20px 10px 0px 10px' : '20px 40px 0px 40px';
	const classes = useStyles({isMobile});

	const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)');
	const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

	const [twitterLoading, settwitterLoading] = useState(true);
	const isDark = isDarkMode();

	const handleSuccess = () => {
		settwitterLoading(false);
	};

	const getRender = () => {
		if (project.name === 'bitcoin-conference-in-lagos') {
			return <King />;
		}

		return <Default
			{...{
				twitterLoading,
				isLargerThan1100,
				isLargerThan1000,
				isDark,
				classes,
				project,
				handleSuccess,
			}}
		/>;
	};

	return (
		<Box
			backgroundColor={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey2'}
			flex={3}
			height="100%"
			display="flex"
			flexDirection="column"
			overflow="hidden"
		>
			<Box padding={componentPadding}>
				{!isMobile && <Text fontSize="16px"> Project: </Text>}
				<Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
					<Heading fontSize={isMobile ? '23px' : '28px'} fontWeight="normal">
						{project.title}
					</Heading>
					<Text>{`Created ${getDaysAgo(project.createdAt)} ago`}</Text>
				</Box>
			</Box>
			<Divider orientation="horizontal" borderBottomWidth="2px" borderColor="rgba(196, 196, 196, 0.4)" margin="5px 0px" />
			<Box className={classes.detailsContainer} id="project-scoll-container" >
				{
					getRender()
				}
			</Box>
		</Box>
	);
};

export default Details;
