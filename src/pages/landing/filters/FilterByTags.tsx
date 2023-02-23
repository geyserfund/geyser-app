import { useQuery } from '@apollo/client'
import { CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { HiOutlineTag } from 'react-icons/hi'
import { MultiValue } from 'react-select'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { ButtonComponent, SelectComponent } from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { QUERY_TAGS } from '../../../graphql/queries'
import { FilterState } from '../../../hooks/state'
import { colors } from '../../../styles'
import { TagsGetResult } from '../../../types'
import { useNotification } from '../../../utils'
import { RenderTags } from './components'

const MAX_TAG_INDEX_DEFAULT_VIEW = 5

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

  const isDisabled = tagIds.length >= 3

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
          status: 'info',
          title: 'cannot select more than 3 tags',
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
    <>
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
        </HStack>
        <VStack width="100%" alignItems="start" spacing="5px">
          <RenderTags
            {...{
              max: MAX_TAG_INDEX_DEFAULT_VIEW,
              allTags,
              tagIds,
              handleClick: handleTagsClick,
            }}
          />
        </VStack>
        <ButtonComponent size="sm" onClick={onOpen}>
          View more tags
        </ButtonComponent>
      </CardLayout>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent maxHeight="700px" overflow="hidden" borderRadius="8px">
          <ModalHeader>
            <HStack width="100%" position="relative">
              <HiOutlineTag color={colors.neutral600} />
              <Body1 color={colors.neutral600}>Filter by project tags</Body1>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody as={VStack} overflow="hidden" paddingX="0px">
            <Box width="100%" paddingX="24px">
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
            </Box>

            <Box width="100%" overflowY="auto">
              <VStack
                width="100%"
                padding="24px"
                alignItems="start"
                spacing="5px"
              >
                <RenderTags
                  {...{ allTags, tagIds, handleClick: handleTagsClick }}
                />
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
