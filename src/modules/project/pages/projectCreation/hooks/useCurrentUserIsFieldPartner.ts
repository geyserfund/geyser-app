import { gql, useQuery } from '@apollo/client'

type CurrentUserFieldPartnerQuery = {
  me?: {
    id: number
    isFieldPartner: boolean
  } | null
}

const QUERY_CURRENT_USER_FIELD_PARTNER = gql`
  query CurrentUserFieldPartner {
    me {
      id
      isFieldPartner
    }
  }
`

export const useCurrentUserIsFieldPartner = () => {
  const { data, loading } = useQuery<CurrentUserFieldPartnerQuery>(QUERY_CURRENT_USER_FIELD_PARTNER, {
    fetchPolicy: 'cache-and-network',
  })

  return {
    isFieldPartner: Boolean(data?.me?.isFieldPartner),
    loading,
  }
}
