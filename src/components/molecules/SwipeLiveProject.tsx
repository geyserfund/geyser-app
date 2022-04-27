import React, { useState } from 'react';

import { Box, Image } from '@chakra-ui/react';
import { IProject } from '../../interfaces';
import { LiveProject, LiveProjectSkeleton } from './LiveProject';
import { createUseStyles } from 'react-jss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GeyserArrow2 from '../../assets/geyserarrow2.png';
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
			'& li': {
				margin: '0px 10px',
			},
			'& button': {
				'&:before': {
					fontSize: '15px',
				},
			},
		},

	},
	arrowContainer: {
		paddingLeft: '5px',
		flex: 1,
		height: '40px',
		width: '40px',
		background: 'transparent',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: '-40px',
		top: 'calc(50% - 20px)',
		'&:hover': {
			background: 'white',
			boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;',
			cursor: 'pointer',
		},
		overflow: 'hidden',
	},
	arrowContainerLeft: {
		left: '-40px',
		top: 'calc(50% - 20px)',
		zIndex: 9,
	},
	clicked: {
		boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px !important',
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
		<Box className={classes.swiper} width={isMobile ? '100%' : '90%'}>
			<Slider {...settings}>
				{projects.map((project:IProject) => (
					<LiveProject key={project.id} project={project}/>
				))}
			</Slider>
		</Box>

	);
};

export const SampleNextArrow = (props:any) => {
	const { onClick } = props;

	const classes = useStyles();
	const [click, setClick] = useState(false);

	return (
		<Box
			className={classNames(classes.arrowContainer, {
				[classes.clicked]: click,
			})}
			onClick={onClick}
			onMouseDown={() => setClick(true)}
			onMouseUp={() => setClick(false)}
		>
			<Image
				className={classes.arrowImage}
				src={GeyserArrow2}
				filter="grayscale(100%)"
				height="100%"
			/>
		</Box>
	);
};

export const SamplePrevArrow = (props:any) => {
	const { onClick } = props;

	const classes = useStyles();
	const [click, setClick] = useState(false);

	return (
		<Box
			className={classNames(classes.arrowContainer, classes.arrowContainerLeft, {
				[classes.clicked]: click,
			})}
			onClick={onClick}
			onMouseDown={() => setClick(true)}
			onMouseUp={() => setClick(false)}
		>
			<Image
				className={classes.arrowImage}
				paddingLeft="7px"
				transform="rotate(180deg)"
				src={GeyserArrow2}
				filter="grayscale(100%)"
				height="100%"
			/>
		</Box>
	);
};

const NullArrow = () => (
	null
);
