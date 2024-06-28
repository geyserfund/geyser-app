import { LazyQueryExecFunction } from '@apollo/client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  Exact,
  InputMaybe,
  ProjectEntriesGetInput,
  ProjectEntriesQuery,
  ProjectUnplublishedEntriesQuery,
  UniqueProjectQueryInput,
  useProjectEntriesLazyQuery,
  useProjectUnplublishedEntriesLazyQuery,
} from '../../../../types'
import { entriesAtom, entriesLoadingAtom, unpublishedEntriesAtom } from '../../state/entriesAtom'
import { isProjectOwnerAtom } from '../../state/projectAtom'

type UseInitEntriesProps = {
  /** The id of the project */
  projectId: string | number | undefined
  /** If true, the query will not be executed */
  skip?: boolean
}

export type UseInitEntriesReturn = {
  /** Query in progress entries for the Project in context */
  queryProjectEntries: LazyQueryExecFunction<
    ProjectEntriesQuery,
    Exact<{
      where: UniqueProjectQueryInput
      input?: InputMaybe<ProjectEntriesGetInput> | undefined
    }>
  >
  /** Query unpublished entries for the Project in context */
  queryUnpublishedProjectEntries: LazyQueryExecFunction<
    ProjectUnplublishedEntriesQuery,
    Exact<{
      where: UniqueProjectQueryInput
    }>
  >
}

/** Fetch project entries for project context */
export const useInitEntries = ({ projectId, skip }: UseInitEntriesProps): UseInitEntriesReturn => {
  const isProjectOwner = useAtomValue(isProjectOwnerAtom)

  const setentries = useSetAtom(entriesAtom)
  const setunpublishedEntries = useSetAtom(unpublishedEntriesAtom)
  const setentriesLoading = useSetAtom(entriesLoadingAtom)

  const [queryProjectEntries] = useProjectEntriesLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      where: {
        id: projectId,
      },
    },
    onError(error) {
      setentriesLoading(false)
    },
    onCompleted(data) {
      setentriesLoading(false)
      const entries = data?.projectGet?.entries || []
      setentries(entries)
    },
  })

  const [queryUnpublishedProjectEntries] = useProjectUnplublishedEntriesLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        id: projectId,
      },
    },
    onCompleted(data) {
      const unpublishedEntries = data?.projectGet?.entries || []
      setunpublishedEntries(unpublishedEntries)
    },
  })

  useEffect(() => {
    if (projectId && !skip) {
      queryProjectEntries()
      if (isProjectOwner) {
        queryUnpublishedProjectEntries()
      }
    }
  }, [projectId, skip, queryUnpublishedProjectEntries, queryProjectEntries, isProjectOwner])

  return {
    queryProjectEntries,
    queryUnpublishedProjectEntries,
  }
}
