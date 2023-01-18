import { Project, ProjectStatus } from '../../types/generated/graphql';

export const isProjectActive = (project: Project) => {
  return project.status === ProjectStatus.Active;
};
