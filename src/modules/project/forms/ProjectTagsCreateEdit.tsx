import { Button, HStack, IconButton, StackProps, useDisclosure, VStack } from '@chakra-ui/react'
import { chakraComponents, MenuListProps, MultiValue } from 'chakra-react-select'
import { Dispatch, SetStateAction, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { PiPlus, PiX } from 'react-icons/pi'
import { createUseStyles } from 'react-jss'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { Body } from '@/shared/components/typography'

import { AppTheme } from '../../../context'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { SkeletonLayout } from '../../../shared/components/layouts'
import { Tag, TagsGetResult, useProjectTagCreateMutation, useTagsGetQuery } from '../../../types'
import { useNotification } from '../../../utils'

const MAX_TAGS_ALLOWED = 4

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  tagContainer: {
    width: '100%',
    backgroundColor: colors.utils.pbg,
    border: '1px solid',
    borderColor: colors.neutral1[6],
    borderRadius: '8px',
    padding: '12px',
  },

  select: {
    width: '100%',
    borderRadius: '8px',
  },

  menuGroup: {
    backgroundColor: colors.secondary.red,
  },
}))

interface ProjectTagsCreateEditProps extends StackProps {
  tags: Tag[]
  updateTags: Dispatch<SetStateAction<Tag[]>>
}

const TAG_MIN_LENGTH = 3
const TAG_MAX_LENGTH = 25

export const ProjectTagsCreateEdit = ({ tags, updateTags, ...rest }: ProjectTagsCreateEditProps) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { toast } = useNotification()

  const [tagOptions, setTagOptions] = useState<TagsGetResult[]>([])
  const [inputValue, setInputValue] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { loading } = useTagsGetQuery({
    onCompleted(data) {
      setTagOptions(data.tagsGet)
    },
  })

  const [createTag, { loading: createLoading }] = useProjectTagCreateMutation({
    onError() {
      toast({
        status: 'error',
        title: t('failed to create new tag'),
      })
    },
    onCompleted(data) {
      if (data.tagCreate) {
        updateTags((current) => [...current, data.tagCreate])
        setInputValue('')
        onClose()
      }
    },
  })

  const handleChange = (value: MultiValue<TagsGetResult>) => {
    if (!value[0]) {
      return
    }

    const newTag: Tag = { id: value[0].id, label: value[0].label }
    if (!tags.some((tag) => tag.id === newTag.id)) {
      updateTags([...tags, newTag])
    } else {
      updateTags(tags.filter((tag) => tag.id !== newTag.id))
    }
  }

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
    if (newValue?.length >= 1) {
      onOpen()
    } else {
      onClose()
    }
  }

  const removeTag = (id: number) => {
    updateTags(tags.filter((tag) => tag.id !== id))
  }

  const handleCreateTag = () => {
    if (inputValue.length < TAG_MIN_LENGTH || inputValue.length > TAG_MAX_LENGTH) {
      toast({
        status: 'error',
        title: t('failed to create tag'),
        description: `${t('tag length must be between')} ${TAG_MIN_LENGTH} ${t('and')} ${TAG_MAX_LENGTH}`,
      })
      return
    }

    createTag({
      variables: {
        input: {
          label: inputValue,
        },
      },
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && showAddTag) {
      handleCreateTag()
    }
  }

  const MenuList = (props: MenuListProps<TagsGetResult, true, any>) => {
    return (
      <chakraComponents.MenuList {...props}>
        {props.children}
        {showAddTag && (
          <Button
            w="full"
            variant="select"
            colorScheme="primary1"
            isDisabled={disableShowAddTag}
            leftIcon={<PiPlus />}
            onClick={handleCreateTag}
          >
            {t('add tag')}
          </Button>
        )}
      </chakraComponents.MenuList>
    )
  }

  const isDisabled = tags.length >= MAX_TAGS_ALLOWED
  const showAddTag = !tagOptions.some((tag) => tag.label.toLowerCase().includes(inputValue.toLowerCase()))
  const disableShowAddTag = inputValue.length < MAX_TAGS_ALLOWED || createLoading

  const SubTitle = (
    <span>
      <Trans
        i18nKey={'Get discovered more easily by selecting up to {{MAX_TAGS_ALLOWED}} project tags.'}
        values={{ MAX_TAGS_ALLOWED }}
      >
        {'Get discovered more easily by selecting up to {{MAX_TAGS_ALLOWED}} project tags.'}
      </Trans>{' '}
    </span>
  )

  return (
    <>
      <FieldContainer title="Tags" subtitle={SubTitle} {...rest}>
        <VStack className={classes.tagContainer} spacing="10px">
          {loading ? (
            <SkeletonLayout h="40px" />
          ) : (
            <CustomSelect<TagsGetResult, true>
              isMulti
              isDisabled={isDisabled}
              menuIsOpen={isOpen}
              className={classes.select}
              onChange={handleChange}
              isLoading={loading}
              name="tags"
              placeholder={t('Add tags')}
              value={[]}
              options={tagOptions}
              getOptionLabel={(option: TagsGetResult) => option.label}
              getOptionValue={(option: TagsGetResult) => option.label}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              inputValue={inputValue}
              components={{ MenuList }}
              onMenuOpen={onOpen}
              onMenuClose={onClose}
            />
          )}
          <HStack width="100%" spacing="10px" flexWrap={'wrap'}>
            {tags.map((tag) => {
              return (
                <HStack key={tag.id} borderRadius="4px" paddingLeft="8px" backgroundColor="neutral1.2">
                  <Body medium>{tag.label}</Body>
                  <IconButton
                    variant="ghost"
                    _hover={{}}
                    _pressed={{}}
                    _active={{}}
                    size="xs"
                    borderRadius="8px"
                    aria-label="remove-tag-close-icon"
                    onClick={() => removeTag(tag.id)}
                    icon={<PiX />}
                  />
                </HStack>
              )
            })}
          </HStack>
        </VStack>
      </FieldContainer>
    </>
  )
}
