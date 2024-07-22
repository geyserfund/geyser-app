import { ButtonProps, Menu, MenuButton, MenuItem, MenuList, Portal, useDisclosure } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiEyeSlash, PiNotePencil, PiTrash } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { DeleteConfirmModal } from '@/components/molecules'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { addUpdateRewardsAtom, deleteRewardAtom } from '@/modules/project/state/rewardsAtom'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { ProjectRewardFragment, useRewardDeleteMutation, useRewardUpdateMutation } from '@/types'
import { useNotification } from '@/utils'

import { CreatorEditButton } from '../../body/components'

type RewardEditMenuProps = {
  reward: ProjectRewardFragment
} & ButtonProps

export const RewardEditMenu = ({ reward, ...props }: RewardEditMenuProps) => {
  const { t } = useTranslation()
  const toast = useNotification()

  const menu = useDisclosure()

  const { project } = useProjectAtom()

  const addUpdateReward = useSetAtom(addUpdateRewardsAtom)
  const deleteReward = useSetAtom(deleteRewardAtom)

  const deleteRewardModal = useModal()

  const [updateRewardVisibilityMutation, { loading: updateRewardVisibilityLoading }] = useRewardUpdateMutation({
    onCompleted(data) {
      if (!data.projectRewardUpdate) return
      addUpdateReward(data.projectRewardUpdate)
      toast.success({
        title: 'Successfully updated!',
        description: `${t('Reward')} ${data.projectRewardUpdate?.name} ${t('was successfully updated')}`,
      })
    },
    onError(error) {
      toast.error({
        title: 'Failed to update reward',
        description: `${error}`,
      })
    },
  })

  const [deleteRewardMutation, { loading: deleteRewardLoading }] = useRewardDeleteMutation({
    onCompleted(data) {
      toast.success({
        title: 'Successfully !',
        description: `${t('Reward')} ${reward.name} ${t('was successfully deleted')}`,
      })
      deleteRewardModal.onClose()
      deleteReward(reward.id)
    },
    onError(error) {
      toast.error({
        title: 'Failed to delete reward',
        description: `${error}`,
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          projectRewardsGet(existingRewards = [], { readField }) {
            return existingRewards.filter((val: ProjectRewardFragment) => readField('id', val) !== reward.id)
          },
        },
      })
    },
  })

  const handleRewardHide = () => {
    updateRewardVisibilityMutation({
      variables: {
        input: {
          projectRewardId: reward.id,
          isHidden: !reward.isHidden,
        },
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
          {...props}
        >
          <CreatorEditButton as={'div'} isMenu {...props} />
        </MenuButton>
        <Portal>
          <MenuList p={2} zIndex="99" shadow="md">
            <MenuItem
              icon={<PiEyeSlash fontSize={'16px'} />}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleRewardHide()
              }}
              isDisabled={updateRewardVisibilityLoading}
            >
              {reward.isHidden ? t('Unhide') : t('Hide')}
            </MenuItem>
            <MenuItem
              as={Link}
              to={getPath('projectRewardEdit', project.name, reward.id)}
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
              isDisabled={deleteRewardLoading}
              color="error.11"
            >
              {t('Delete')}
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
      <DeleteConfirmModal
        {...deleteRewardModal}
        title="Delete reward"
        description="Are you sure you want to remove the reward?"
        confirm={() => deleteRewardMutation({ variables: { input: { projectRewardId: reward.id } } })}
      />
    </>
  )
}
