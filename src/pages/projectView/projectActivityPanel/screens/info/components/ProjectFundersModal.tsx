import { SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Modal } from '../../../../../../components/layouts'
import { UserAvatarButton } from '../../../../../../components/ui/UserAvatar'
import { getPath, ID } from '../../../../../../constants'
import { QUERY_PROJECT_FUNDERS } from '../../../../../../graphql'
import { ScrollInvoke } from '../../../../../../helpers'
import { useQueryWithPagination } from '../../../../../../hooks'
import { useModal } from '../../../../../../hooks/useModal'
import { FunderWithUserFragment, OrderByOptions } from '../../../../../../types'
import { useNotification } from '../../../../../../utils'

export const useProjectFundersModal = () => {
  return useModal<{
    projectId: number
  }>()
}

type Props = ReturnType<typeof useProjectFundersModal>

const SUPPORTERS_ITEM_LIMIT = 50

export const ProjectFundersModal = ({
  props: { projectId },
  ...props
}: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { toast } = useNotification()

  const funders = useQueryWithPagination<FunderWithUserFragment>({
    queryName: 'fundersGet',
    itemLimit: SUPPORTERS_ITEM_LIMIT,
    query: QUERY_PROJECT_FUNDERS,
    where: { projectId: Number(projectId), anonymous: false, confirmed: true },
    orderBy: {
      amountFunded: OrderByOptions.Desc,
    },
    options: {
      skip: !projectId,
      onError() {
        toast({
          status: 'error',
          title: 'Failed to fetch contributors leaderboard',
        })
      },
    },
  })

  if (!props.isOpen) {
    return null
  }

  const id = ID.project.activity.supporterModal
  return (
    <Modal title={t('Contributors')} {...props}>
      <SimpleGrid
        id={id}
        overflowY="auto"
        overflowX="hidden"
        maxHeight="50vh"
        width="100%"
        pr={3}
        columns={2}
        spacing={2}
      >
        {funders.data &&
          funders.data.map((funder) => {
            return (
              <UserAvatarButton
                key={funder.id}
                user={funder.user}
                onClick={() => {
                  if (funder.user?.id) {
                    navigate(getPath('userProfile', funder.user?.id))
                  }
                }}
              />
            )
          })}
        <ScrollInvoke
          elementId={id}
          onScrollEnd={funders.fetchNext}
          isLoading={funders.isLoadingMore}
          noMoreItems={funders.noMoreItems}
        />
      </SimpleGrid>
    </Modal>
  )
}
