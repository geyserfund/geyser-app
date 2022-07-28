import { Box } from '@chakra-ui/layout';
// Import { useMediaQuery } from '@chakra-ui/media-query';
import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { fadeOut, slideInLeft } from '../../css';
import { IProject } from '../../interfaces';
import { isDarkMode, isMobileMode } from '../../utils';
import { RewardBased } from './ProjectLayout';
import { IFundingStages } from '../../constants';
import { ProjectMobileMenu } from '../../components/molecules';
import { fundingStages } from '../../constants';

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
	}),
	...slideInLeft,
	...fadeOut,
});

interface IActivityProps {
	project: IProject
	detailOpen: boolean
	setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
	setFundState: React.Dispatch<React.SetStateAction<IFundingStages>>
}

export const Details = ({ project, detailOpen, setDetailOpen, setFundState }: IActivityProps) => {
	const isMobile = isMobileMode();
	const isDark = isDarkMode();

	const [fadeStarted, setFadeStarted] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [showMobileMenu, setShowMobileMenu] = useState(true);
	const scrollDiv = useRef(document.createElement('div'));

	const classes = useStyles({ isMobile, detailOpen, fadeStarted });

	const handleDescriptionClick = () => {
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
				<ProjectMobileMenu showMobileMenu={showMobileMenu} fundButtonFunction={handleFundClick} handleFundClick={handleDescriptionClick} viewName="Activity" />
				<RewardBased project={project}/>
			</Box>
		</Box>
	);
};

export default Details;
