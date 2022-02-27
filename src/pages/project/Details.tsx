import { Box, Divider, Heading, HStack } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import { Button, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { fadeOut, slideInLeft } from '../../css';
import { IProject } from '../../interfaces';
import { getDaysAgo, isDarkMode, isMobileMode } from '../../utils';
import { Default, King } from './ProjectLayout';

type Rules = string

interface IStyles {
	isMobile: boolean;
	detailOpen: boolean;
	fadeStarted: boolean;
}

const useStyles = createUseStyles<Rules, IStyles>({
	container: ({ isMobile, detailOpen, fadeStarted }: IStyles) => ({
		display: (!isMobile || detailOpen || fadeStarted) ? 'flex' : 'none',
		position: fadeStarted ? 'absolute' : 'relative',
		top: fadeStarted ? 0 : undefined,
		left: fadeStarted ? 0 : undefined,
	}),
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
	detailsContainer: ({ isMobile }: IStyles) => ({
		padding: isMobile ? '20px 10px 10px 10px' : '20px 40px 0px 40px',
		height: isMobile ? '-webkit-calc(100% - 80px)' : '-webkit-calc(100% - 62px)',
		fallbacks: [
			{ height: isMobile ? 'calc(100% - 80px)' : 'calc(100% - 62px)' },
		],
		overflowY: 'scroll',
		WebkitOverflowScrolling: 'touch',
	}),
	headerContainer: ({ isMobile }: IStyles) => ({
		display: 'flex',
		width: '100%',
		flexDirection: isMobile ? 'column' : 'row',
		alignItems: isMobile ? 'flex-start' : 'center',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	}),
	fundButton: {
		height: '55px',
		width: '100px',
		paddingLeft: '25px',
		borderBottomLeftRadius: '40px',
		borderTopLeftRadius: '40px',
		borderBottomRightRadius: 0,
		borderTopRightRadius: 0,
		backgroundColor: colors.primary,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
	},
	...slideInLeft,
	...fadeOut,
});

interface IActivityProps {
	project: IProject
	detailOpen: boolean
	setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Details = ({ project, detailOpen, setDetailOpen }: IActivityProps) => {
	const isMobile = isMobileMode();
	const isDark = isDarkMode();

	const componentPadding = isMobile ? '5px 0px 5px 10px' : '20px 40px 5px 40px';
	const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)');
	const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

	const [twitterLoading, settwitterLoading] = useState(true);
	const [fadeStarted, setFadeStarted] = useState(false);

	const classes = useStyles({ isMobile, detailOpen, fadeStarted });

	const handleSuccess = () => {
		settwitterLoading(false);
	};

	const handleFundClick = () => {
		setDetailOpen(false);
		setFadeStarted(true);
		setTimeout(() => {
			setFadeStarted(false);
		}, 500);
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
			className={classNames(classes.container, {
				[classes.slideInLeft]: isMobile && detailOpen,
				[classes.fadeOut]: isMobile && fadeStarted,
			})}
			backgroundColor={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey2'}
			flex={!isMobile ? 3 : undefined}
			height="100%"
			flexDirection="column"
			overflow="hidden"
		>
			<HStack padding={componentPadding} justifyContent="space-between">
				<Box className={classes.headerContainer} >
					<Heading fontSize={isMobile ? '18px' : '28px'} fontWeight="normal">
						{project.title}
					</Heading>
					<Text fontSize={isMobile ? '11px' : '14px'}>{`Created ${getDaysAgo(project.createdAt)} ago`}</Text>
				</Box>
				{isMobile && <Button className={classes.fundButton} onClick={handleFundClick}>
					<Text fontSize="12px">Fund now</Text>
				</Button>}
			</HStack>

			<Divider orientation="horizontal" borderBottomWidth="2px" borderColor="rgba(196, 196, 196, 0.4)" margin="1px 0px" />
			<Box className={classes.detailsContainer} id="project-scoll-container" >
				{
					getRender()
				}
			</Box>
		</Box>
	);
};

export default Details;
