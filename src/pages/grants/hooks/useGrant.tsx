import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { QUERY_GRANT } from '../../../graphqlBase/queries/grant'
import { Grant } from '../../../types'

type ResponseData = {
  grant: Grant
}

const GRANT_CUSTOM_URL_TO_ID_MAP = {
  bcegrants: 8,
  bitcoin2024: 10,
  thailandbitcoinconference: 11,
  bonlyconference: 12,
  satshack2024: 13,
} as {
  [key: string]: number
}

export const useGrant = (id?: string | number) => {
  const variables = useMemo(() => {
    if (!id) return undefined

    const customUrlToIdMap = GRANT_CUSTOM_URL_TO_ID_MAP[`${id}`]

    if (customUrlToIdMap) {
      return { variables: { input: { where: { id: customUrlToIdMap } } } }
    }

    return { variables: { input: { where: { id } } } }
  }, [id])

  const { data, error, loading, refetch } = useQuery<ResponseData>(QUERY_GRANT, variables)

  return {
    grant: data ? data.grant : null,
    error,
    loading,
    refetch,
  }
}
