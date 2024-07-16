import { useMutation, useQuery } from '@apollo/client'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { Button, HStack, StackProps, useDisclosure, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { components, MenuProps, MultiValue } from 'react-select'

import { Body1 } from '../../../components/typography'
import { ButtonComponent, IconButtonComponent, SelectComponent } from '../../../components/ui'
import { getListOfTags } from '../../../shared/constants'
import { AppTheme } from '../../../context'
import { FieldContainer } from '../../../forms/components/FieldContainer'
import { MUTATION_TAG_CREATE } from '../../../graphql/mutations'
import { QUERY_TAGS } from '../../../graphql/queries/tags'
import { Modal, SkeletonLayout } from '../../../shared/components/layouts'
import { Tag, TagCreateInput, TagsGetResult } from '../../../types'
import { useNotification } from '../../../utils'

const MAX_TAGS_ALLOWED = 4

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  tagContainer: {
    width: '100%',
    backgroundColor: colors.neutral[0],
    border: '1px solid',
    borderColor: colors.neutral[400],
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
  const { isOpen: infoIsOpen, onOpen: infoOnOpen, onClose: infoOnClose } = useDisclosure()

  const { loading } = useQuery<{ tagsGet: TagsGetResult[] }>(QUERY_TAGS, {
    onCompleted(data) {
      setTagOptions(data.tagsGet)
    },
  })

  const [createTag, { loading: createLoading }] = useMutation<{ tagCreate: Tag }, { input: TagCreateInput }>(
    MUTATION_TAG_CREATE,
    {
      onError() {
        toast({
          status: 'error',
          title: 'failed to create new tag',
        })
      },
      onCompleted(data) {
        if (data.tagCreate) {
          updateTags((current) => [...current, data.tagCreate])
          setInputValue('')
          onClose()
        }
      },
    },
  )

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
        title: 'failed to create tag',
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

  const Menu = (props: MenuProps<TagsGetResult, true, any>) => {
    return (
      <components.Menu<TagsGetResult, true, any> {...props}>
        {props.children}
        {showAddTag && (
          <HStack padding="5px">
            <ButtonComponent
              variant="ghost"
              isDisabled={disableShowAddTag}
              leftIcon={<AddIcon />}
              onClick={handleCreateTag}
            >
              {t('add tag')}
            </ButtonComponent>
          </HStack>
        )}
      </components.Menu>
    )
  }

  const isDisabled = tags.length >= MAX_TAGS_ALLOWED
  const showAddTag = !tagOptions.some((tag) => tag.label.toLowerCase().includes(inputValue.toLowerCase()))
  const disableShowAddTag = inputValue.length < MAX_TAGS_ALLOWED || createLoading

  const SubTitle = (
    <span>
      <Trans
        i18nKey={
          'Get discovered more easily by selecting up to {{MAX_TAGS_ALLOWED}} project tags. Make sure to select some of the tags that appear in the trending view.'
        }
        values={{ MAX_TAGS_ALLOWED }}
      >
        {
          'Get discovered more easily by selecting up to {{MAX_TAGS_ALLOWED}} project tags. Make sure to select some of the tags that appear in the trending view.'
        }
      </Trans>{' '}
      <Button variant="ghost" size="sm" onClick={infoOnOpen}>
        {t('See trending tags')}
      </Button>
    </span>
  )

  return (
    <>
      <FieldContainer title="Tags" subtitle={SubTitle} {...rest}>
        <VStack className={classes.tagContainer} spacing="10px">
          {loading ? (
            <SkeletonLayout h="40px" />
          ) : (
            <SelectComponent<TagsGetResult, true>
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
              components={{ Menu }}
              onMenuOpen={onOpen}
              onMenuClose={onClose}
            />
          )}
          <HStack width="100%" spacing="10px">
            {tags.map((tag) => {
              return (
                <HStack key={tag.id} borderRadius="4px" paddingLeft="8px" backgroundColor="neutral.100">
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
      </FieldContainer>
      <Modal
        {...{
          isOpen: infoIsOpen,
          onOpen: infoOnOpen,
          onClose: infoOnClose,
        }}
        title={t('Trending page tags')}
      >
        <VStack w="full">
          <Body1 color="neutral.600" semiBold>
            {t('The trending page showcases the following list of general tags')}
          </Body1>
          <Wrap>
            {getListOfTags().map((tag) => {
              return (
                <WrapItem key={tag.label} background="neutral.100" borderRadius={'8px'} px="8px" py="3px">
                  <Body1 color="neutral.900" semiBold>
                    {tag.label}
                  </Body1>
                </WrapItem>
              )
            })}
          </Wrap>
        </VStack>
      </Modal>
    </>
  )
}
