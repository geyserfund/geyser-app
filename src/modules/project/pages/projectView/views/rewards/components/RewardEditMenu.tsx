import { ButtonProps, Menu, MenuButton, MenuItem, MenuList, Portal, useDisclosure } from '@chakra-ui/react'
import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { PiEyeSlash, PiNotePencil, PiTrash } from 'react-icons/pi'
import { Link } from 'react-router'

import { DeleteConfirmModal } from '@/components/molecules'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { ProjectRewardFragment } from '@/types'
import { useNotification } from '@/utils'

import { CreatorEditButton } from '../../body/components'

type RewardEditMenuProps = {
  reward: ProjectRewardFragment
  isLaunch?: boolean
} & ButtonProps

export const RewardEditMenu = ({ reward, isLaunch, ...props }: RewardEditMenuProps) => {
  const { t } = useTranslation()
  const toast = useNotification()

  const menu = useDisclosure()

  const { project } = useProjectAtom()

  const deleteRewardModal = useModal()

  const { deleteReward, updateReward } = useProjectRewardsAPI()

  const handleRewardVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    updateReward.execute({
      variables: {
        input: {
          projectRewardId: reward.id,
          isHidden: !reward.isHidden,
        },
      },
      onCompleted(data) {
        if (!data.projectRewardUpdate) return
        toast.success({
          title: 'Successfully updated!',
          description: `${t('Product')} ${data.projectRewardUpdate?.name} ${t('was successfully updated')}`,
        })
      },
      onError(error) {
        toast.error({
          title: 'Failed to update product',
          description: `${error}`,
        })
      },
    })
  }

  const handleDeleteReward = () => {
    deleteReward.execute({
      variables: { input: { projectRewardId: reward.id } },
      onCompleted(data) {
        toast.success({
          title: 'Successfully !',
          description: `${t('Product')} ${reward.name} ${t('was successfully deleted')}`,
        })
        deleteRewardModal.onClose()
      },
      onError(error) {
        toast.error({
          title: 'Failed to delete product',
          description: `${error}`,
        })
      },
    })
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
              icon={<PiEyeSlash fontSize={'16px'} />}
              onClick={handleRewardVisibility}
              isDisabled={updateReward.loading}
            >
              {reward.isHidden ? t('Unhide') : t('Hide')}
            </MenuItem>
            <MenuItem
              as={Link}
              to={
                isLaunch
                  ? getPath('launchProjectRewardsEdit', project.id, reward.uuid)
                  : getPath('projectRewardEdit', project.name, reward.uuid)
              }
              icon={<PiNotePencil fontSize={'16px'} />}
            >
              {t('Edit')}
            </MenuItem>
            <MenuItem
              icon={<PiTrash fontSize={'16px'} />}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                deleteRewardModal.onOpen()
              }}
              isDisabled={deleteReward.loading}
              color="error.11"
              _hover={{ color: 'utils.whiteContrast', backgroundColor: 'error.9' }}
            >
              {t('Delete')}
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
      <DeleteConfirmModal
        {...deleteRewardModal}
        title="Delete product"
        description="Are you sure you want to remove the product?"
        confirm={handleDeleteReward}
      />
    </>
  )
}
