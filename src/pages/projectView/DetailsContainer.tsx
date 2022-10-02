import { Box, VStack } from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { fadeOut, slideInLeft } from '../../css';
import { IProject } from '../../interfaces';
import { isDarkMode, isMobileMode } from '../../utils';
import { IFundingStages } from '../../constants';
import { Footer, ProjectMobileMenu } from '../../components/molecules';
import { fundingStages } from '../../constants';
import { DetailsCard } from './DetailsCard';
import { ProjectAccesories } from './ProjectAccesories';
import { TupdateReward } from '../../hooks';

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
		height: '100%',
		paddingTop: isMobile ? '61px' : '71px',
		overflowY: 'scroll',
		WebkitOverflowScrolling: 'touch',
		display: 'flex',
		flexDirection: 'column',
	}),
	...slideInLeft,
	...fadeOut,
});

interface IActivityProps {
	project: IProject
	detailOpen: boolean
	setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
  fundState: IFundingStages;
	setFundState: React.Dispatch<React.SetStateAction<IFundingStages>>
	updateReward: TupdateReward
}

export const DetailsContainer = ({ project, detailOpen, setDetailOpen, fundState, setFundState, updateReward }: IActivityProps) => {
	const isMobile = isMobileMode();
	const isDark = isDarkMode();

	const [fadeStarted, setFadeStarted] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [showMobileMenu, setShowMobileMenu] = useState(true);
	const scrollDiv = useRef(document.createElement('div'));

	const classes = useStyles({ isMobile, detailOpen, fadeStarted });

	const handleViewClick = () => {
		setDetailOpen(false);
		setFadeStarted(true);
		setTimeout(() => {
			setFadeStarted(false);
		}, 500);
	};

	const handleFundClick = () => {
		setFundState(fundingStages.form);
		setDetailOpen(false);
		setFadeStarted(true);
		setTimeout(() => {
			setFadeStarted(false);
		}, 500);
	};

	return (
		<Box
			className={classNames(classes.container, {
				[classes.slideInLeft]: isMobile && detailOpen,
				[classes.fadeOut]: isMobile && fadeStarted,
			})}
			backgroundColor={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey4'}
			flex={!isMobile ? 3 : undefined}
			height="100%"
			w="100%"
			flexDirection="column"
			overflow="hidden"
		>
			<Box className={classes.detailsContainer} id="project-scroll-container" ref={scrollDiv} onScroll={() => {
				if (isMobile) {
					if (scrollDiv.current.scrollTop > scrollPosition) {
						setShowMobileMenu(false);
					} else {
						setShowMobileMenu(true);
					}

					setScrollPosition(scrollDiv.current.scrollTop);
				}
			}}>
				<ProjectMobileMenu showMobileMenu={showMobileMenu} fundButtonFunction={handleFundClick} handleViewClick={handleViewClick} viewName="Activity" />
				<VStack alignItems="center" width="100%" flex="1">
					<VStack
						spacing="20px"
						alignItems="left"
						marginTop={isMobile ? '0px' : '20px'}
						maxWidth="1000px"
						w="100%"
						padding={isMobile ? '20px 10px 50px 10px' : '0px 40px 70px 40px'}
					>
						<DetailsCard project={project} setFundState={setFundState} />
						<ProjectAccesories project={project} fundState={fundState} setFundState={setFundState} updateReward={updateReward}/>
					</VStack >
				</VStack >
				<Footer />
			</Box>
		</Box>
	);
};

