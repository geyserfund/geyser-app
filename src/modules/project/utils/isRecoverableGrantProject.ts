/** Returns whether a project is a recoverable grant. */
export const isRecoverableGrantProject = (project: { isRecoverableGrant?: boolean | null }) =>
  Boolean(project.isRecoverableGrant)
