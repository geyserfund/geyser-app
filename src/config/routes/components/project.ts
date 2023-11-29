import { RouteObject } from 'react-router-dom'

import { getPath, PathName } from '../../../constants'
import { renderPrivateRoute } from '../PrivateRoute'

const Project = () => import('../../../pages/projectView')

export const projectRoutes: RouteObject = {
  path: getPath('project', PathName.projectId),
  async lazy() {
    const ProjectView = await Project().then((m) => m.ProjectView)
    return { Component: ProjectView }
  },
  children: [
    {
      path: getPath('project', PathName.projectId),
      async lazy() {
        const ProjectBodyLayout = await Project().then(
          (m) => m.ProjectBodyLayout,
        )
        return { Component: ProjectBodyLayout }
      },

      children: [
        {
          index: true,
          async lazy() {
            const ProjectMainBody = await Project().then(
              (m) => m.ProjectMainBody,
            )
            return { Component: ProjectMainBody }
          },
        },
        {
          path: getPath('projectRewards', PathName.projectId),
          async lazy() {
            const MainBodyRewards = await Project().then(
              (m) => m.MainBodyRewards,
            )
            return { Component: MainBodyRewards }
          },
        },
        {
          path: getPath('projectEntries', PathName.projectId),
          async lazy() {
            const MainBodyEntries = await Project().then(
              (m) => m.MainBodyEntries,
            )
            return { Component: MainBodyEntries }
          },
        },

        {
          path: getPath('projectMilestones', PathName.projectId),
          async lazy() {
            const MainBodyMilestones = await Project().then(
              (m) => m.MainBodyMilestones,
            )
            return { Component: MainBodyMilestones }
          },
        },
      ],
    },
    {
      path: getPath('project', PathName.projectId),
      async lazy() {
        const ProjectCreatorViews = await Project().then(
          (m) => m.ProjectCreatorViews,
        )
        return { Component: ProjectCreatorViews }
      },
      children: [
        {
          path: getPath('projectOverview', PathName.projectId),
          async lazy() {
            const ProjectCreatorOverview = await Project().then(
              (m) => m.ProjectCreatorOverview,
            )
            return {
              element: renderPrivateRoute(ProjectCreatorOverview),
            }
          },
        },
        {
          path: getPath('projectInsights', PathName.projectId),
          async lazy() {
            const ProjectCreatorInsights = await Project().then(
              (m) => m.ProjectCreatorInsights,
            )
            return {
              element: renderPrivateRoute(ProjectCreatorInsights),
            }
          },
        },
        {
          path: getPath('projectContributors', PathName.projectId),
          async lazy() {
            const ProjectCreatorContributors = await Project().then(
              (m) => m.ProjectCreatorContributors,
            )
            return {
              element: renderPrivateRoute(ProjectCreatorContributors),
            }
          },
        },
      ],
    },
  ],
}
