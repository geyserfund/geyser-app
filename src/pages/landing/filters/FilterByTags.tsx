import { useQuery } from '@apollo/client'
import { CloseIcon } from '@chakra-ui/icons'
import { HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { HiOutlineTag } from 'react-icons/hi'
import { MultiValue } from 'react-select'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import {
  ButtonComponent,
  IconButtonComponent,
  SelectComponent,
} from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { QUERY_TAGS } from '../../../graphql/queries'
import { FilterState } from '../../../hooks/state'
import { colors } from '../../../styles'
import { TagsGetResult } from '../../../types'
import { useNotification } from '../../../utils'
import { RenderTags } from './components'

interface FilterByTagsProps extends CardLayoutProps, FilterState {}

export const FilterByTags = ({
  filters,
  updateFilter,
  ...rest
}: FilterByTagsProps) => {
  const { toast } = useNotification()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { tagIds } = filters

  const {
    isOpen: selectMenuOpen,
    onOpen: onSelectMenuOpen,
    onClose: onSelectMenuClose,
  } = useDisclosure()

  const isDisabled = tagIds.length >= 5

  const [allTags, setAllTags] = useState<TagsGetResult[]>([])

  const { loading } = useQuery<{ tagsGet: TagsGetResult[] }>(QUERY_TAGS, {
    onCompleted(data) {
      if (data.tagsGet) {
        const sortedTags = [...data.tagsGet].sort((a, b) => b.count - a.count)
        setAllTags(sortedTags)
      }
    },
  })

  const handleTagsSelection = (newValue: MultiValue<TagsGetResult>) => {
    updateFilter({ tagIds: [...tagIds, newValue[0].id] })
  }

  const handleTagsClick = (tag: TagsGetResult) => {
    if (tagIds.includes(tag.id)) {
      updateFilter({ tagIds: tagIds.filter((val) => val !== tag.id) })
    } else {
      if (isDisabled) {
        toast({
          status: 'warning',
          title: 'cannot select more than 5 tags',
        })
        return
      }

      updateFilter({ tagIds: [...tagIds, tag.id] })
    }
  }

  const handleInputChange = (newValue: string) => {
    if (newValue?.length >= 1) {
      onSelectMenuOpen()
    } else {
      onSelectMenuClose()
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <CardLayout
      width="100%"
      direction="column"
      padding="10px"
      spacing="10px"
      {...rest}
    >
      <HStack width="100%" position="relative">
        <HiOutlineTag color={colors.neutral600} />
        <Body1 color={colors.neutral600}>Filter by project tags</Body1>
        {isOpen && (
          <IconButtonComponent
            noBorder
            size="xs"
            aria-label="filter-close-icon"
            position="absolute"
            right="-5px"
            top="-5px"
            icon={<CloseIcon />}
            onClick={onClose}
          />
        )}
      </HStack>
      {isOpen && (
        <SelectComponent<TagsGetResult, true>
          isMulti
          isDisabled={isDisabled}
          menuIsOpen={selectMenuOpen}
          onBlur={onSelectMenuClose}
          options={allTags}
          value={[]}
          getOptionLabel={(option) => option.label}
          onChange={handleTagsSelection}
          onInputChange={handleInputChange}
        />
      )}
      <VStack width="100%" alignItems="start" spacing="5px">
        <RenderTags
          {...{ isOpen, allTags, tagIds, handleClick: handleTagsClick }}
        />
      </VStack>
      {!isOpen && (
        <ButtonComponent size="sm" onClick={onOpen}>
          View more tags
        </ButtonComponent>
      )}
    </CardLayout>
  )
}
