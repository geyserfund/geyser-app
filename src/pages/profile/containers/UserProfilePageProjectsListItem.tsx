import { gql, useQuery } from '@apollo/client'

import {
  Project,
  UniqueProjectQueryInput,
} from '../../../types/generated/graphql'
import { toInt } from '../../../utils'
import { LandingProjectCard } from '../../landing/components'
import { ProjectParametersForLandingPage } from '../../landing/projects/projects.graphql'
type Props = {
  projectID: number
}

const GET_PROJECT = gql`
  query GetProject($where: UniqueProjectQueryInput!) {
    project(where: $where) ${ProjectParametersForLandingPage}
  }
`

type ResponseData = {
  project: Project
}

type QueryVariables = {
  where: UniqueProjectQueryInput
}

export const UserProfilePageProjectsListItem = ({ projectID }: Props) => {
  const { data, loading, error } = useQuery<ResponseData, QueryVariables>(
    GET_PROJECT,
    { variables: { where: { id: toInt(projectID) } } },
  )

  if (error || loading) {
    return null
  }

  return data ? <LandingProjectCard project={data.project} /> : null
}
