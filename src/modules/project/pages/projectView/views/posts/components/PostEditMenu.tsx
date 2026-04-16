import { ButtonProps, Menu, MenuButton, MenuItem, MenuList, Portal, useDisclosure } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiNotePencil, PiTrash } from 'react-icons/pi'
import { Link } from 'react-router'

import { DeleteConfirmModal } from '@/components/molecules'
import { useProjectPostsAPI } from '@/modules/project/API/useProjectPostsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { ProjectPostFragment } from '@/types'
import { useNotification } from '@/utils'

import { CreatorEditButton } from '../../body/components'

type PostEditMenuProps = {
  post: Pick<ProjectPostFragment, 'id'>
  onDeleteComplete?: () => void
} & ButtonProps

export const PostEditMenu = ({ post, onDeleteComplete, ...props }: PostEditMenuProps) => {
  const { t } = useTranslation()
  const toast = useNotification()

  const menu = useDisclosure()

  const { project, isProjectOwner } = useProjectAtom()

  const postDeleteModal = useModal()

  const { postDelete } = useProjectPostsAPI()

  const handleDeletePost = () => {
    postDelete.execute({
      variables: { postDeleteId: post.id },
      onCompleted() {
        if (onDeleteComplete) {
          onDeleteComplete()
        }

        toast.success({
          title: 'Successfully deleted post!',
        })
      },
      onError(error) {
        toast.error({
          title: 'Failed to delete post',
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
              to={getPath('projectPostEdit', project.name, post.id)}
              icon={<PiNotePencil fontSize={'16px'} />}
            >
              {t('Edit')}
            </MenuItem>
            <MenuItem
              icon={<PiTrash fontSize={'16px'} />}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                postDeleteModal.onOpen()
              }}
              isDisabled={postDelete.loading}
              color="error.11"
              _hover={{ color: 'utils.whiteContrast', backgroundColor: 'error.9' }}
            >
              {t('Delete')}
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
      <DeleteConfirmModal
        {...postDeleteModal}
        title="Delete post"
        description="Are you sure you want to remove the post?"
        confirm={handleDeletePost}
      />
    </>
  )
}
