import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Project,
  UniqueProjectQueryInput,
} from '../../../types/generated/graphql';
import { ProjectsGridCard } from '../../../components/molecules/projectDisplay/ProjectsGridCard';
import { toInt } from '../../../utils';

type Props = {
  projectID: number;
};

const GET_PROJECT = gql`
  query GetProject($where: UniqueProjectQueryInput!) {
    project(where: $where) {
      id
      name
      title
      description
      image
      balance
      active
      draft
      funders {
        id
      }
      wallets {
        state {
          status
          statusCode
        }
      }
    }
  }
`;

type ResponseData = {
  project: Project;
};

type QueryVariables = {
  where: UniqueProjectQueryInput;
};

export const UserProfilePageProjectsListItem = ({ projectID }: Props) => {
  const { data, loading, error } = useQuery<ResponseData, QueryVariables>(
    GET_PROJECT,
    { variables: { where: { id: toInt(projectID) } } },
  );

  return data ? (
    <ProjectsGridCard project={data.project} height="100%" width="100%" />
  ) : null;
};
