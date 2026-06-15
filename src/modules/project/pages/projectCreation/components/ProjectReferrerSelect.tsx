import { useLazyQuery } from '@apollo/client'
import { useMemo } from 'react'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { QUERY_PROJECT_REFERRERS_SEARCH } from '@/modules/project/graphql/queries/projectReferrersQuery.ts'

type ReferrerUser = {
  id: number
  username: string
  heroId: string
  imageUrl?: string | null
  isFieldPartner: boolean
}

type ProjectReferrersSearchQuery = {
  projectReferrersSearch: {
    fieldPartners: ReferrerUser[]
    others: ReferrerUser[]
  }
}

type ProjectReferrersSearchVariables = {
  input?: {
    heroId?: string | null
  } | null
}

type ReferrerOption = {
  value: string
  label: string
  user: ReferrerUser
}

type ReferrerOptionGroup = {
  label: string
  options: ReferrerOption[]
}

type ProjectReferrerSelectProps = {
  value: string
  onChange: (heroId: string) => void
  placeholder?: string
}

const toOption = (user: ReferrerUser): ReferrerOption => ({
  value: user.heroId,
  label: `${user.username} (${user.heroId})`,
  user,
})

export const ProjectReferrerSelect = ({ value, onChange, placeholder }: ProjectReferrerSelectProps) => {
  const [searchReferrers, { data, loading }] = useLazyQuery<
    ProjectReferrersSearchQuery,
    ProjectReferrersSearchVariables
  >(QUERY_PROJECT_REFERRERS_SEARCH, {
    fetchPolicy: 'cache-and-network',
  })

  const groupedOptions = useMemo<ReferrerOptionGroup[]>(() => {
    const fieldPartners = data?.projectReferrersSearch.fieldPartners.map(toOption) || []
    const others = data?.projectReferrersSearch.others.map(toOption) || []

    return [
      { label: 'Field Partners', options: fieldPartners },
      { label: 'Other', options: others },
    ].filter((group) => group.options.length > 0)
  }, [data])

  const selectedOption =
    groupedOptions.flatMap((group) => group.options).find((option) => option.value === value) ||
    (value
      ? {
          value,
          label: value,
          user: {
            id: 0,
            username: value,
            heroId: value,
            isFieldPartner: false,
          },
        }
      : null)

  return (
    <CustomSelect<ReferrerOption, false>
      value={selectedOption}
      options={groupedOptions}
      isClearable
      isSearchable
      isLoading={loading}
      placeholder={placeholder}
      onInputChange={(inputValue, meta) => {
        if (meta.action !== 'input-change') {
          return
        }

        if (inputValue.trim().length < 2) {
          return
        }

        searchReferrers({
          variables: {
            input: {
              heroId: inputValue,
            },
          },
        })
      }}
      onChange={(option) => {
        onChange(option?.value || '')
      }}
      formatOptionLabel={(option) => option.label}
      width="100%"
      menuMinWidth="100%"
    />
  )
}
