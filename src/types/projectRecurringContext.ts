import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'

import {
  ProjectRecurringContextQuery,
  ProjectRecurringContextQueryVariables,
  QUERY_PROJECT_RECURRING_CONTEXT,
} from '@/modules/project/recurring/graphql.ts'

export const useProjectRecurringContextQuery = (
  baseOptions: QueryHookOptions<ProjectRecurringContextQuery, ProjectRecurringContextQueryVariables> &
    ({ variables: ProjectRecurringContextQueryVariables; skip?: boolean } | { skip: boolean }),
): QueryResult<ProjectRecurringContextQuery, ProjectRecurringContextQueryVariables> => {
  return useQuery<ProjectRecurringContextQuery, ProjectRecurringContextQueryVariables>(
    QUERY_PROJECT_RECURRING_CONTEXT,
    baseOptions,
  )
}
