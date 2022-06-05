import { Box, Skeleton, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { IProject } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { ProjectCard } from './ProjectCard';
interface IProjectBars {
    projects: IProject[]
    loading: boolean
}

const useStyles = createUseStyles({
	container: {
		width: '100%',
		position: 'relative',
	},
	containerMobile: {
		width: '100%',
		position: 'relative',
		'& .chakra-wrap__list': {
			margin: '0px',
		},
	},
	boxonLeft: {
		background: 'none',
		position: 'absolute',
		height: '100%',
		width: '5px',
		top: '0px',
		left: '-50px',
		webkitBoxShadow: '22px 0px 25px 0px rgba(0,0,0,0.45)',
		boxShadow: '22px 0px 25px 0px rgba(0,0,0,0.45)',
		borderRadius: '10px',
		zIndex: 9,
	},
	boxonRight: {
		background: 'none',
		position: 'absolute',
		height: '100%',
		width: '5px',
		top: '0px',
		right: '-50px',
		webkitBoxShadow: '-22px 0px 25px 0px rgba(0,0,0,0.45)',
		boxShadow: '-22px 0px 25px 0px rgba(0,0,0,0.45)',
		borderRadius: '10px',
		zIndex: 9,

	},
});

export const ProjectBars = ({projects, loading}:IProjectBars) => {
	const isMobile = isMobileMode();

	const classes = useStyles();

	if (loading) {
		return <ProjectBarsSkeleton />;
	}

	return (
		<Box className={isMobile ? classes.containerMobile : classes.container}>
			<Wrap paddingY="0px" width="100%" justify={ isMobile ? 'center' : 'flex-start'} spacing="30px" >
				{ projects.map((project: IProject) => (
					<WrapItem key={project.id}>
						<ProjectCard
							open
							title={project.title}
							name={project.name}
							project={project}
							imgSrc={project.media[0]}
							marginLeft="0px !important"
						/>
					</WrapItem>

				))
				}
			</Wrap>
		</Box>
	);
};

export const ProjectBarsSkeleton = () => {
	const isMobile = isMobileMode();
	const classes = useStyles();

	return (
		<Box className={isMobile ? classes.containerMobile : classes.container}>
			<Wrap paddingY="10px" width="100%" overflow="hidden" justify="space-around" spacing="30px" >
				<Skeleton borderRadius="10px" height="240px" width="300px" />
				<Skeleton borderRadius="10px" height="240px" width="300px" />
				<Skeleton borderRadius="10px" height="240px" width="300px" />
				<Skeleton borderRadius="10px" height="240px" width="300px" />
			</Wrap>
		</Box>
	);
};
