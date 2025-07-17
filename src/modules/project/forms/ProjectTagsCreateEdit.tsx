import { Button, StackProps, useDisclosure, VStack } from '@chakra-ui/react'
import { chakraComponents, MenuListProps } from 'chakra-react-select'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { PiPlus } from 'react-icons/pi'
import { createUseStyles } from 'react-jss'

import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'

import { AppTheme } from '../../../context'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { SkeletonLayout } from '../../../shared/components/layouts'
import { TagsGetResult, useProjectTagCreateMutation, useTagsGetQuery } from '../../../types'
import { useNotification } from '../../../utils'
import { ProjectCreationVariables } from '../pages1/projectCreation/types.ts'

const MAX_TAGS_ALLOWED = 4

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  select: {
    width: '100%',
    borderRadius: '8px',
  },

  menuGroup: {
    backgroundColor: colors.secondary.red,
  },
}))

interface ProjectTagsCreateEditProps extends StackProps {
  form: UseFormReturn<ProjectCreationVariables>
}

const TAG_MIN_LENGTH = 3
const TAG_MAX_LENGTH = 25

export const ProjectTagsCreateEdit = ({ form, ...rest }: ProjectTagsCreateEditProps) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { toast } = useNotification()

  const [tagOptions, setTagOptions] = useState<TagsGetResult[]>([])
  const [inputValue, setInputValue] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const tags = form.watch('tags') || []

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
        form.setValue('tags', [...tags, data.tagCreate.id], {
          shouldDirty: true,
          shouldValidate: true,
        })
        setTagOptions([...tagOptions, { ...data.tagCreate, count: 0 } as TagsGetResult])
        setInputValue('')
        onClose()
      }
    },
  })

  const handleInputChange = (newValue: string) => {
    if (tags.length >= MAX_TAGS_ALLOWED) {
      return
    }

    setInputValue(newValue)
    if (newValue?.length >= 1) {
      onOpen()
    } else {
      onClose()
    }
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
  const handleMenuOpen = () => {
    if (tags.length >= MAX_TAGS_ALLOWED) {
      return
    }

    onOpen()
  }

  return (
    <>
      <FieldContainer title="Tags" subtitle={SubTitle} {...rest}>
        <VStack width="100%" spacing="10px">
          {loading ? (
            <SkeletonLayout h="40px" />
          ) : (
            <ControlledCustomSelect<ProjectCreationVariables, TagsGetResult, true>
              isMulti
              menuIsOpen={isOpen}
              className={classes.select}
              isLoading={loading}
              name="tags"
              placeholder={t('Add tags')}
              control={form.control}
              options={tagOptions}
              getOptionLabel={(option: TagsGetResult) => option.label}
              getOptionValue={(option: TagsGetResult) => option.label}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              inputValue={inputValue}
              components={{ MenuList }}
              onMenuOpen={handleMenuOpen}
              onMenuClose={onClose}
            />
          )}
        </VStack>
      </FieldContainer>
    </>
  )
}
