import { ApolloCache, ApolloClient } from '@apollo/client'

import { ProjectPageBodyQuery } from '@/types'
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
  addFollowers?: boolean
  removeFollowers?: boolean
}

export const updateProjectItemCountCache = (
  cache: ApolloCache<any>,
  {
    projectName,
    addReward,
    removeReward,
    addPost,
    removePost,
    addGoal,
    removeGoal,
    addFollowers,
    removeFollowers,
  }: ProjectBodyCacheUpdateInput,
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
      projectGet: data?.projectGet
        ? {
            ...data.projectGet,
            ...(addReward && { rewardsCount: toInt(data.projectGet.rewardsCount) + 1 }),
            ...(removeReward && { rewardsCount: toInt(data.projectGet.rewardsCount) - 1 }),
            ...(addPost && { entriesCount: toInt(data.projectGet.entriesCount) + 1 }),
            ...(removePost && { entriesCount: toInt(data.projectGet.entriesCount) - 1 }),
            ...(addGoal && { goalsCount: toInt(data.projectGet.goalsCount) + 1 }),
            ...(removeGoal && { goalsCount: toInt(data.projectGet.goalsCount) - 1 }),
            ...(addFollowers && { followersCount: toInt(data.projectGet.followersCount) + 1 }),
            ...(removeFollowers && { followersCount: toInt(data.projectGet.followersCount) - 1 }),
          }
        : data?.projectGet,
    }),
  )
}

type ProjectBalanceUpdateInput = {
  projectName: string
  balance?: number | null
  balanceUsdCent?: number | null
  followersCount?: number | null
}

export const updateProjectBalanceCache = (
  cache: ApolloCache<any> | ApolloClient<any>,
  { projectName, balance, balanceUsdCent, followersCount }: ProjectBalanceUpdateInput,
) => {
  const existingProject = cache.readQuery<ProjectPageBodyQuery>({
    query: QUERY_PROJECT_PAGE_BODY,
    variables: {
      where: {
        name: projectName,
      },
    },
  })
  if (existingProject) {
    cache.writeQuery({
      query: QUERY_PROJECT_PAGE_BODY,
      variables: {
        where: {
          name: projectName,
        },
      },
      data: {
        projectGet: {
          ...existingProject.projectGet,
          ...(balance && { balance }),
          ...(balanceUsdCent && { balanceUsdCent }),
          ...(followersCount && { followersCount }),
        },
      },
    })
  }
}
