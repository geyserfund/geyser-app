import { SimpleGrid } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../../constants'
import { useModal } from '../../../hooks/useModal'
import { ProjectFundersFragment } from '../../../types'
import { Modal } from '../../layouts'
import { UserAvatarButton } from '../../ui/UserAvatar'

export const useProjectFundersModal = () => {
  return useModal<{
    funders: ProjectFundersFragment[]
  }>()
}

type Props = ReturnType<typeof useProjectFundersModal>

export const ProjectFundersModal = ({
  props: { funders },
  ...props
}: Props) => {
  const navigate = useNavigate()

  if (!props.isOpen) {
    return null
  }

  return (
    <Modal title="Supporters" {...props}>
      <SimpleGrid
        overflowY="auto"
        overflowX="hidden"
        maxHeight="50vh"
        width="100%"
        pr={3}
        columns={2}
        spacing={2}
      >
        {funders &&
          funders
            .filter((funder) => funder && funder.confirmedAt && funder.user)
            .map((funder) => {
              return (
                <UserAvatarButton
                  key={funder.id}
                  user={funder.user}
                  onClick={(e) =>
                    navigate(getPath('userProfile', funder.user?.id))
                  }
                />
              )
            })}
      </SimpleGrid>
    </Modal>
  )
}
