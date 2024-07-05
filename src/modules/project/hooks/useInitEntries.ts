import { LazyQueryExecFunction } from '@apollo/client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
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
} from '@/types'

import { entriesAtom, initialEntriesLoadAtom, unpublishedEntriesAtom } from '../state/entriesAtom'
import { isProjectOwnerAtom, projectAtom } from '../state/projectAtom'

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
  /** If the entries query is loading */
  entriesLoading?: boolean
}

/** Fetch project entries for project context, pass true to load on render */
export const useInitEntries = (load?: boolean): UseInitEntriesReturn => {
  const isProjectOwner = useAtomValue(isProjectOwnerAtom)

  const { id: projectId } = useAtomValue(projectAtom)

  const setentries = useSetAtom(entriesAtom)
  const setunpublishedEntries = useSetAtom(unpublishedEntriesAtom)
  const [initialEntriesLoad, setInitialEntriesLoad] = useAtom(initialEntriesLoadAtom)

  const [queryProjectEntries, { loading: entriesLoading }] = useProjectEntriesLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      where: {
        id: projectId,
      },
    },
    onCompleted(data) {
      const entries = data?.projectGet?.entries || []
      setentries(entries)
      setInitialEntriesLoad(true)
    },
  })

  const [queryUnpublishedProjectEntries] = useProjectUnplublishedEntriesLazyQuery({
    fetchPolicy: 'cache-first',
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
    if (projectId && load && !initialEntriesLoad) {
      queryProjectEntries()
      if (isProjectOwner) {
        queryUnpublishedProjectEntries()
      }
    }
  }, [projectId, load, initialEntriesLoad, queryUnpublishedProjectEntries, queryProjectEntries, isProjectOwner])

  return {
    queryProjectEntries,
    queryUnpublishedProjectEntries,
    entriesLoading,
  }
}
