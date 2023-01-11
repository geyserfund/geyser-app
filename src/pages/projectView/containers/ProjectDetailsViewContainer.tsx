import React, { createContext, useContext, useState } from 'react';
import { useFundingFormState } from '../../../hooks';
import {
  FundingResourceType,
  Project,
  ProjectReward,
} from '../../../types/generated/graphql';
import { Head } from '../../../utils/Head';
import { ProjectActivityPanel } from '../ActivityPanel/ProjectActivityPanel';
import { ProjectDetailsMainBodyContainer } from '../ProjectDetailsMainBodyContainer';

type Props = {
  project: Project;
  fundingFlow: any;
  resourceType?: string;
  resourceId?: number;
};

export enum MobileViews {
  description = 'description',
  contribution = 'contribution',
  leaderboard = 'leaderBoard',
  funding = 'funding',
}

type MobileViewContextProps = {
  view: MobileViews;
  setView: (view: MobileViews) => void;
};

const defaultMobileViewContext = {
  view: MobileViews.description,
  setView: (view: MobileViews) => {},
};

export const MobileViewContext = createContext<MobileViewContextProps>(
  defaultMobileViewContext,
);

export const useMobileView = () => useContext(MobileViewContext);

export const ProjectDetailsViewContainer = ({
  project,
  fundingFlow,
}: Props) => {
  const [detailOpen, setDetailOpen] = useState(true);
  const [mobileView, setMobileView] = useState<MobileViews>(
    MobileViews.description,
  );

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
    <MobileViewContext.Provider
      value={{ view: mobileView, setView: setMobileView }}
    >
      <Head
        title={project.title}
        description={project.description}
        image={project.image || ''}
        type="article"
      />

      <ProjectDetailsMainBodyContainer
        {...{
          project,
          fundState,
          setFundState,
          updateReward: fundForm.updateReward,
        }}
      />

      <ProjectActivityPanel
        project={project}
        {...{ fundingFlow, fundForm }}
        resourceType={FundingResourceType.Project}
        resourceId={project.id}
      />
    </MobileViewContext.Provider>
  );
};
