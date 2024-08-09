import { ButtonProps, Menu, MenuButton, MenuItem, MenuList, Portal, useDisclosure } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiNotePencil, PiTrash } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { DeleteConfirmModal } from '@/components/molecules'
import { useProjectEntriesAPI } from '@/modules/project/API/useProjectEntriesAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { ProjectEntryFragment } from '@/types'
import { useNotification } from '@/utils'

import { CreatorEditButton } from '../../body/components'

type PostEditMenuProps = {
  entry: Pick<ProjectEntryFragment, 'id'>
  onDeleteComplete?: () => void
} & ButtonProps

export const PostEditMenu = ({ entry, onDeleteComplete, ...props }: PostEditMenuProps) => {
  const { t } = useTranslation()
  const toast = useNotification()

  const menu = useDisclosure()

  const { project, isProjectOwner } = useProjectAtom()

  const deleteEntryModal = useModal()

  const { deleteEntry } = useProjectEntriesAPI()

  const handleDeleteEntry = () => {
    deleteEntry.execute({
      variables: { deleteEntryId: entry.id },
      onCompleted() {
        if (onDeleteComplete) {
          onDeleteComplete()
        }

        toast.success({
          title: 'Successfully deleted entry!',
        })
      },
      onError(error) {
        toast.error({
          title: 'Failed to delete entry',
          description: `${error}`,
        })
      },
    })
  }

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
          as={CreatorEditButton}
          isMenu
          {...props}
        />
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
              isDisabled={deleteEntry.loading}
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
        confirm={handleDeleteEntry}
      />
    </>
  )
}
