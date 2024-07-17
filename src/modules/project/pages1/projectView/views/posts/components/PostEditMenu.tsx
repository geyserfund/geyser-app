import { ButtonProps, Menu, MenuButton, MenuItem, MenuList, Portal, useDisclosure } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiNotePencil, PiTrash } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { DeleteConfirmModal } from '@/components/molecules'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { deleteEntryAtom } from '@/modules/project/state/entriesAtom'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { ProjectEntryFragment, useDeleteEntryMutation } from '@/types'
import { useNotification } from '@/utils'

import { CreatorEditButton } from '../../body/components'

type PostEditMenuProps = {
  entry: Pick<ProjectEntryFragment, 'id'>
} & ButtonProps

export const PostEditMenu = ({ entry, ...props }: PostEditMenuProps) => {
  const { t } = useTranslation()
  const toast = useNotification()

  const menu = useDisclosure()

  const { project, isProjectOwner } = useProjectAtom()

  const deleteEntry = useSetAtom(deleteEntryAtom)

  const deleteEntryModal = useModal()

  const [deleteEntryMutation, { loading: deleteEntryLoading }] = useDeleteEntryMutation({
    onCompleted(data) {
      toast.success({
        title: 'Successfully deleted entry!',
      })
      deleteEntry(entry.id)
    },
    onError(error) {
      toast.error({
        title: 'Failed to delete entry',
        description: `${error}`,
      })
    },
  })

  if (!isProjectOwner) {
    return null
  }

  return (
    <>
      <Menu isOpen={menu.isOpen} onClose={menu.onClose} placement="bottom-end" closeOnSelect={true} strategy="fixed">
        <MenuButton
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            menu.onToggle()
          }}
          {...props}
        >
          <CreatorEditButton as={'div'} isMenu {...props} />
        </MenuButton>
        <Portal>
          <MenuList p={2} zIndex="99" shadow="md">
            <MenuItem
              as={Link}
              to={getPath('projectPostEdit', project.name, entry.id)}
              icon={<PiNotePencil fontSize={'16px'} />}
            >
              {t('Edit')}
            </MenuItem>
            <MenuItem
              icon={<PiTrash fontSize={'16px'} />}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                deleteEntryModal.onOpen()
              }}
              isDisabled={deleteEntryLoading}
              color="error.11"
            >
              {t('Delete')}
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
      <DeleteConfirmModal
        {...deleteEntryModal}
        title="Delete post"
        description="Are you sure you want to remove the post?"
        confirm={() => deleteEntryMutation({ variables: { deleteEntryId: entry.id } })}
      />
    </>
  )
}
