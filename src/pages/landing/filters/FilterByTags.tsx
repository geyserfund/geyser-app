import { useQuery } from '@apollo/client'
import { HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { HiOutlineTag } from 'react-icons/hi'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { QUERY_TAGS } from '../../../graphql/queries'
import { colors } from '../../../styles'
import { Tag, TagsGetResult } from '../../../types'

interface FilterByTagsProps extends CardLayoutProps {
  tags?: Tag[]
  setTags?: (_: Tag[]) => void
}

export const FilterByTags = (props: FilterByTagsProps) => {
  const [selectedTags, setSelectedTags] = useState()

  const { loading, data } = useQuery<{ tagsGet: TagsGetResult }>(QUERY_TAGS)

  console.log('checking data', data, loading)

  return (
    <CardLayout width="100%" direction="column" padding="20px">
      <HStack>
        <HiOutlineTag color={colors.neutral600} />
        <Body1 color={colors.neutral600}>Filter by project tags</Body1>
      </HStack>
    </CardLayout>
  )
}
