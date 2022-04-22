import { HStack } from '@chakra-ui/react';
import React from 'react';
import { IProject } from '../../interfaces';
import Loader from '../ui/Loader';
import { ProjectCard } from './ProjectCard';

interface IProjectBars {
    projects: IProject[]
    loading: boolean
}

export const ProjectBars = ({projects, loading}:IProjectBars) => {
	if (loading) {
		return <HStack justifyContent="center" alignItems="center" height="230px">
			<Loader />;
		</HStack>;
	}

	return (
		<HStack>
			{ projects.map((project: IProject) => (
				<ProjectCard
					key={project.id}
					open
					title={project.title}
					name={project.name}
					project={project}
					imgSrc={project.media[0]}
				/>
			))
			}
		</HStack>
	);
};
