import { ApolloCache } from '@apollo/client'

import { toInt } from '@/utils'

import { QUERY_PROJECT_PAGE_BODY } from '../../graphql/queries/projectQuery'

type ProjectBodyCacheUpdateInput = {
  projectName: string
  addReward?: boolean
  removeReward?: boolean
  addPost?: boolean
  removePost?: boolean
  addGoal?: boolean
  removeGoal?: boolean
}

export const updateProjectBodyCache = (
  cache: ApolloCache<any>,
  { projectName, addReward, removeReward, addPost, removePost, addGoal, removeGoal }: ProjectBodyCacheUpdateInput,
) => {
  cache.updateQuery(
    {
      query: QUERY_PROJECT_PAGE_BODY,
      variables: {
        where: {
          name: projectName,
        },
      },
    },
    (data) => ({
      projectGet: {
        ...data.projectGet,
        ...(addReward && { rewardsCount: toInt(data.projectGet.rewardsCount) + 1 }),
        ...(removeReward && { rewardsCount: toInt(data.projectGet.rewardsCount) - 1 }),
        ...(addPost && { entriesCount: toInt(data.projectGet.entriesCount) + 1 }),
        ...(removePost && { entriesCount: toInt(data.projectGet.entriesCount) - 1 }),
        ...(addGoal && { goalsCount: toInt(data.projectGet.goalsCount) + 1 }),
        ...(removeGoal && { goalsCount: toInt(data.projectGet.goalsCount) - 1 }),
      },
    }),
  )
}
