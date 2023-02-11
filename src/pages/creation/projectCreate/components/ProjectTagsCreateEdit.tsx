import { useQuery } from '@apollo/client'
import { CloseIcon } from '@chakra-ui/icons'
import { HStack, StackProps, useDisclosure, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import Select, { MultiValue } from 'react-select'

import { Body1, Body2, Caption } from '../../../../components/typography'
import { IconButtonComponent, SelectComponent } from '../../../../components/ui'
import { QUERY_TAGS } from '../../../../graphql/queries/tags'
import { colors } from '../../../../styles'
import { Tag, TagsGetResult } from '../../../../types'

const useStyles = createUseStyles({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    spacing: '5px',
  },

  tagContainer: {
    width: '100%',
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: colors.neutral400,
    borderRadius: '8px',
    padding: '12px',
  },

  select: {
    width: '100%',
    borderRadius: '8px',
  },

  menuGroup: {
    backgroundColor: 'red',
  },
})

interface ProjectTagsCreateEditProps extends StackProps {
  tags: Tag[]
  updateTags: (_: Tag[]) => void
}

export const ProjectTagsCreateEdit = ({
  tags,
  updateTags,
  ...rest
}: ProjectTagsCreateEditProps) => {
  const classes = useStyles()

  const [tagOptions, setTagOptions] = useState<TagsGetResult[]>([])
  const [inputValue, setInputValue] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { loading } = useQuery<{ tagsGet: TagsGetResult[] }>(QUERY_TAGS, {
    onCompleted(data) {
      setTagOptions(data.tagsGet)
    },
  })

  const handleChange = (value: MultiValue<TagsGetResult>) => {
    const newTag: Tag = { id: value[0].id, label: value[0].label }
    if (!tags.some((tag) => tag.id === newTag.id)) {
      updateTags([...tags, newTag])
    } else {
      updateTags(tags.filter((tag) => tag.id !== newTag.id))
    }
  }

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
    if (newValue?.length >= 2) {
      onOpen()
    } else {
      onClose()
    }
  }

  const removeTag = (id: number) => {
    updateTags(tags.filter((tag) => tag.id !== id))
  }

  const isDisabled = tags.length >= 3

  return (
    <VStack className={classes.container} {...rest}>
      <Body2>Tags</Body2>
      <Caption>
        Get discovered more easily by users through Tags. You can select up to 3
        project tags.{' '}
      </Caption>
      <VStack className={classes.tagContainer} spacing="10px">
        <SelectComponent<TagsGetResult, true>
          isMulti
          isDisabled={isDisabled}
          menuIsOpen={isOpen}
          className={classes.select}
          onChange={handleChange}
          isLoading={loading}
          name="tags"
          placeholder="Add tags"
          value={[]}
          options={tagOptions}
          getOptionLabel={(option: TagsGetResult) => option.label}
          getOptionValue={(option: TagsGetResult) => option.label}
          onInputChange={handleInputChange}
          inputValue={inputValue}
        />
        <HStack width="100%" spacing="10px">
          {tags.map((tag) => {
            return (
              <HStack
                key={tag.id}
                borderRadius="4px"
                paddingLeft="8px"
                backgroundColor="brand.neutral100"
              >
                <Body1 semiBold>{tag.label}</Body1>
                <IconButtonComponent
                  noBorder
                  size="xs"
                  borderRadius="8px"
                  aria-label="remove-tag-close-icon"
                  onClick={() => removeTag(tag.id)}
                  icon={<CloseIcon />}
                />
              </HStack>
            )
          })}
        </HStack>
      </VStack>
    </VStack>
  )
}
