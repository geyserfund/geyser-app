import { useQuery } from '@apollo/client'
import { Badge, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { HiOutlineTag } from 'react-icons/hi'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import { QUERY_TAGS } from '../../../graphql/queries'
import { colors } from '../../../styles'
import { Tag, TagsGetResult } from '../../../types'

interface FilterByTagsProps extends CardLayoutProps {
  tags?: Tag[]
  setTags?: (_: Tag[]) => void
}

export const FilterByTags = ({ tags }: FilterByTagsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [allTags, setAllTags] = useState<TagsGetResult[]>([])

  const { loading } = useQuery<{ tagsGet: TagsGetResult[] }>(QUERY_TAGS, {
    onCompleted(data) {
      if (data.tagsGet) {
        const sortedTags = [...data.tagsGet].sort((a, b) => b.count - a.count)
        setAllTags(sortedTags)
      }
    },
  })
  const tagsToRender = isOpen ? allTags.slice(0, 9) : allTags.slice(0, 4)
  return (
    <CardLayout width="100%" direction="column" padding="20px" spacing="20px">
      <HStack>
        <HiOutlineTag color={colors.neutral600} />
        <Body1 color={colors.neutral600}>Filter by project tags</Body1>
      </HStack>
      <VStack width="100%" alignItems="start">
        {tagsToRender.map((tag) => {
          const isActive = tags?.some((tagValue) => tagValue.id === tag.id)
          return (
            <ButtonComponent
              size="sm"
              w="full"
              noBorder
              key={tag.id}
              backgroundColor={isActive ? 'brand.neutral100' : 'white'}
              position="relative"
            >
              <HStack width="100%" justifyContent="start">
                <Body1 color="brand.neutral900">{tag.label}</Body1>
                <Badge rounded="full">{tag.count}</Badge>
              </HStack>
            </ButtonComponent>
          )
        })}
      </VStack>
      {!isOpen && (
        <ButtonComponent size="sm" onClick={onOpen}>
          View more tags
        </ButtonComponent>
      )}
    </CardLayout>
  )
}
