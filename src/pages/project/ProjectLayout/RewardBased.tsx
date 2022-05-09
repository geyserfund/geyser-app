import {
	VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IProjectUpdate, IProject } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { OwnerSponsorCard, DetailsBlock, SponsorBlock, UpdatesBlock } from '../ProjectComponent';
import ProjectColl, { IProjectData } from '../ProjectCollection';

export const RewardBased = ({ project }: { project: IProject}) => {
	const [projectData, setProjectData] = useState<IProjectData>();

	useEffect(() => {
		if (project.name) {
			const currentProject = ProjectColl[project.name];
			if (currentProject) {
				setProjectData(currentProject);
			}
		}
	}, [project.name]);

	const isMobile = isMobileMode();

	if (!projectData) {
		return null;
	}

	const {projectDetails, projectUpdates} = projectData;

	const renderUpdates = () => {
		if (projectUpdates && projectUpdates.length > 0) {
			return projectUpdates.map((update: IProjectUpdate) => <UpdatesBlock key={update.updateTitle} projectUpdate={update} media={project.media}/>,
			);
		}
	};

	return (
		<VStack alignItems="center" width="100%" >
			<VStack
				spacing="20px"
				alignItems="left"
				marginTop={isMobile ? '0px' : '20px'}
				maxWidth="820px"
				padding={isMobile ? '20px 10px 50px 10px' : '20px 40px 70px 40px'}
			>
				<OwnerSponsorCard
					images={project.media}
					owner={project.owners[0]}
					ambassadors={project.ambassadors}
					sponsors={project.sponsors}
					ownerIntro={projectDetails.ownerIntro}
					problem={projectDetails.problem}
					idea={projectDetails.idea}
				/>
				<DetailsBlock projectDetails={projectDetails} media={project.media} />
				{ renderUpdates() }
				<SponsorBlock sponsors={project.sponsors}/>
			</VStack >
		</VStack >
	);
};
