import React from 'react';

import { Box } from '@chakra-ui/react';
import { IProject } from '../../interfaces';
import { LiveProject, LiveProjectSkeleton } from './LiveProject';
import { createUseStyles } from 'react-jss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ISwipeLiveProject {
    projects: IProject[]
    loading: boolean
}

const useStyles = createUseStyles({
	swiper: {
		width: '100%',
	},
});

export const SwipeLiveProject = ({projects, loading}: ISwipeLiveProject) => {
	console.log('checking', projects, loading);
	const classes = useStyles();

	const settings = {
		dots: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	if (loading) {
		return <LiveProjectSkeleton />;
	}

	return (
		<Box className={classes.swiper}>
			<Slider {...settings}>
				{projects.map((project:IProject) => (
					<LiveProject key={project.id} project={project}/>
				))}
			</Slider>
		</Box>
	);
};
