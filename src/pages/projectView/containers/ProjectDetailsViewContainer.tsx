import React from 'react';
import { useFundingFormState } from '../../../hooks';
import { Project, ProjectReward } from '../../../types/generated/graphql';
import { Head } from '../../../utils/Head';
import { ProjectActivityPanel } from '../ActivityPanel/ProjectActivityPanel';
import { ProjectDetailsMainBodyContainer } from '../ProjectDetailsMainBodyContainer';

type Props = {
  project: Project;
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
  const fundForm = useFundingFormState({
    /*
     * Passing an empty array as fallback would probably make
     * more sense but I think at the moment most checks look
     * for an undefined value.
     */
    rewards: (project.rewards as ProjectReward[]) || undefined,
  });

  const { setFundState, fundState } = fundingFlow;

  return (
    <>
      <Head
        title={project.title}
        description={project.description}
        image={project.image || ''}
        type="article"
      />

      <ProjectDetailsMainBodyContainer
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
