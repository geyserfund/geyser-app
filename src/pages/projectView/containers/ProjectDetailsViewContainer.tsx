import React from 'react';
import { useFundState } from '../../../hooks';
import {
  Project,
  ProjectReward,
  RewardCurrency,
} from '../../../types/generated/graphql';
import { Head } from '../../../utils/Head';
import { ProjectActivityPanel } from '../ActivityPanel/ProjectActivityPanel';
import { DetailsContainer } from '../DetailsContainer';

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
  const fundForm = useFundState({
    /*
     * Passing an empty array as fallback would probalby make more sense but I think at the moment most checks look
     * for an undefined value
     */
    rewards: (project.rewards as ProjectReward[]) || undefined,
    rewardCurrency: RewardCurrency.Usd,
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
