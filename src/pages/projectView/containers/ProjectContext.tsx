import { createContext, useContext, useState } from 'react';

import { Project } from '../../../types/generated/graphql';

export enum MobileViews {
  description = 'description',
  contribution = 'contribution',
  leaderboard = 'leaderBoard',
  funding = 'funding',
}

type ProjectContextProps = {
  mobileView: MobileViews;
  setMobileView: (view: MobileViews) => void;
  project: Project;
};

const defaultProjectContext = {
  mobileView: MobileViews.description,
  setMobileView(view: MobileViews) {},
  project: {} as Project,
};

export const ProjectContext = createContext<ProjectContextProps>(
  defaultProjectContext,
);

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) => {
  const [mobileView, setMobileView] = useState<MobileViews>(
    MobileViews.description,
  );

  return (
    <ProjectContext.Provider value={{ mobileView, setMobileView, project }}>
      {children}
    </ProjectContext.Provider>
  );
};
