/** Returns whether a project is a circular grant. */
export const isCircularGrantProject = (project: { isCircularGrant?: boolean | null }) =>
  Boolean(project.isCircularGrant)
