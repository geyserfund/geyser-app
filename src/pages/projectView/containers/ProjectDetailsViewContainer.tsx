import React from 'react';
import { useFundState } from '../../../hooks';
import { IProject } from '../../../interfaces';
import { Head } from '../../../utils/Head';
import { ProjectActivityPanel } from '../ActivityPanel/ProjectActivityPanel';
import { DetailsContainer } from '../DetailsContainer';

type Props = {
  project: IProject;
  detailOpen: boolean;
  fundingFlow: any;
  setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resourceType?: string;
  resourceId?: number;
};

export const ProjectDetailsViewContainer = ({
  project,
  detailOpen,
  setDetailOpen,
  fundingFlow,
}: Props) => {
  const fundForm = useFundState({ rewards: project.rewards });
  const { setFundState, fundState } = fundingFlow;

  return (
    <>
      <Head
        title={project.title}
        description={project.description}
        image={project.image}
        type="article"
      />

      <DetailsContainer
        {...{
          project,
          detailOpen,
          setDetailOpen,
          fundState,
          setFundState,
          updateReward: fundForm.updateReward,
        }}
      />

      <ProjectActivityPanel
        project={project}
        {...{ detailOpen, setDetailOpen, fundingFlow, fundForm }}
      />
    </>
  );
};
