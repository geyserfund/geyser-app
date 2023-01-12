import React, { createContext, useContext, useState } from 'react';
import { useListenerState } from '../../../hooks';
import { Project } from '../../../types/generated/graphql';

export enum MobileViews {
  description = 'description',
  contribution = 'contribution',
  leaderboard = 'leaderBoard',
  funding = 'funding',
}

type ProjectContextProps = {
  loading: boolean;
  mobileView: MobileViews;
  setMobileView: (view: MobileViews) => void;
  project: Project;
};

const defaultProjectContext = {
  loading: false,
  mobileView: MobileViews.description,
  setMobileView: (view: MobileViews) => {},
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
  const [mobileView, _setMobileView] = useState<MobileViews>(
    MobileViews.description,
  );

  const [loading, setLoading] = useState(false);

  const setMobileView = (value: MobileViews) => {
    setLoading(true);
    _setMobileView(value);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <ProjectContext.Provider
      value={{ loading, mobileView, setMobileView, project }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
