import React, { useEffect, useState } from 'react';

import { Box, Image } from '@chakra-ui/react';
import { IProject } from '../../interfaces';
import { LiveProject, LiveProjectSkeleton } from './LiveProject';
import { createUseStyles } from 'react-jss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GeyserArrow from '../../assets/geyserarrow.png';
import GeyserArrow2 from '../../assets/geyserarrow2.png';
import { fadeIn, fadeOut, slideInLeftDynamic, slideOutRightDynamic } from '../../css';
import classNames from 'classnames';
import { isMobileMode } from '../../utils';
interface ISwipeLiveProject {
    projects: IProject[]
    loading: boolean
}

const useStyles = createUseStyles({
	swiper: {
		maxWidth: '1280px',
		paddingBottom: '40px',
		'& .slick-dots': {
			bottom: '-50px',
		},
	},
	arrowContainer: {
		// BackgroundColor: 'rgba(0,0,0,0.2)',
		paddingLeft: '5px',
		flex: 1,
		height: '40px',
		width: '40px',
		backgroundColor: 'transparent',
		// BoxShadow: '0px 0px 9.51722px rgba(0, 0, 0, 0.11)',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// Width: '50%',
		position: 'absolute',
		right: '-20px',
		top: 'calc(50% - 20px)',
		'&:hover': {
			backgroundColor: 'white',
			boxShadow: '0px 0px 9.51722px rgba(0, 0, 0, 0.11)',
			transition: 'background-color 1000s linear',
			cursor: 'pointer',
		},
		overflow: 'hidden',
	},
	arrowContainerLeft: {
		left: '-20px',
		top: 'calc(50% - 20px)',
		transform: 'rotate(180deg)',
		zIndex: 9,
	},
	arrowImage: {
		height: '30px',
	},
	arrowImageRotate: {
		height: '30px',
		transform: 'rotate(180deg) ',
	},
	noDisplay: {
		display: 'none',
	},
	...fadeIn,
	...fadeOut,
	...slideInLeftDynamic(100, 0.2),
	...slideOutRightDynamic(100, 0.2),

});

export const SwipeLiveProject = ({projects, loading}: ISwipeLiveProject) => {
	const isMobile = isMobileMode();

	const classes = useStyles();

	const settings = {
		dots: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: isMobile ? <NullArrow /> : <SampleNextArrow />,
		prevArrow: isMobile ? <NullArrow /> : <SamplePrevArrow />,
	};

	if (loading) {
		return <LiveProjectSkeleton />;
	}

	return (
		// <HStack>
		<Box className={classes.swiper} width={isMobile ? '100%' : '90%'}>
			<Slider {...settings}>
				{projects.map((project:IProject) => (
					<LiveProject key={project.id} project={project}/>
				))}
			</Slider>
		</Box>
		// 	<SampleNextArrow onClick={handleNextClick}/>
		// </HStack>

	);
};

export const SampleNextArrow = (props:any) => {
	const { onClick } = props;

	const classes = useStyles();
	const [hover, setHover] = useState(false);

	const [transition, setTransition] = useState(false);

	useEffect(() => {
		if (hover && !transition) {
			setTimeout(() => {
				setTransition(true);
			}, 200);
		}

		if (transition && !hover) {
			setTimeout(() => {
				setTransition(false);
			}, 200);
		}
	}, [hover, transition]);

	return (
		<Box
			// ClassName={className}
			className={classNames(classes.arrowContainer)}
			onClick={onClick}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{	<Image
				className={classNames(classes.arrowImage, {
					[classes.slideInLeftDynamic]: hover && transition,
					[classes.slideOutRightDynamic]: !hover,
					[classes.noDisplay]: !transition,
				})}
				src={GeyserArrow}
				height="100%"/>}
			<Image
				className={ classNames(classes.arrowImage, {
					[classes.slideOutRightDynamic]: hover && !transition,
					[classes.slideInLeftDynamic]: !hover && !transition,
					[classes.noDisplay]: transition,
				})}
				src={GeyserArrow2}
				height="100%"/>

		</Box>
	);
};

export const SamplePrevArrow = (props:any) => {
	const { onClick } = props;

	const classes = useStyles();
	const [hover, setHover] = useState(false);

	const [transition, setTransition] = useState(false);

	useEffect(() => {
		if (hover && !transition) {
			setTimeout(() => {
				setTransition(true);
			}, 200);
		}

		if (transition && !hover) {
			setTimeout(() => {
				setTransition(false);
			}, 200);
		}
	}, [hover, transition]);

	return (
		<Box
			// ClassName={className}
			className={classNames(classes.arrowContainer, classes.arrowContainerLeft)}
			onClick={onClick}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{	<Image
				className={classNames(classes.arrowImage, {
					[classes.slideInLeftDynamic]: hover && transition,
					[classes.slideOutRightDynamic]: !hover,
					[classes.noDisplay]: !transition,
				})}
				src={GeyserArrow}
				height="100%"/>}
			<Image
				className={ classNames(classes.arrowImage, {
					[classes.slideOutRightDynamic]: hover && !transition,
					[classes.slideInLeftDynamic]: !hover && !transition,
					[classes.noDisplay]: transition,
				})}
				src={GeyserArrow2}
				height="100%"/>

		</Box>
	);
};

const NullArrow = () => (
	null
);
