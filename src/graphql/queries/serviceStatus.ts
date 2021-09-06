import { gql } from '@apollo/client';

export const QUERY_SERVICE_STATUS = gql`
    query status {
        statusCheck
    }
`;
