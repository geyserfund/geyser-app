import { HStack, ModalProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

import { ScrollInvoke } from '@/helpers'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { usePaginationAtomHook } from '@/shared/hooks'
import { OrderByOptions, ProjectFunderFragment, ProjectFundingTxFragment, useProjectPageFundingTxQuery } from '@/types'

import { UserAvatar } from '../../../components/UserAvatar'
import { FundersContributionItem, FundersContributionItemSkeleton } from './FundersContributionItem'

type FunderContributionModalProps = {
  funder: ProjectFunderFragment
} & Omit<ModalProps, 'children'>

const MAXIMUM_USER_CONTRIBUTION_ITEMS = 20

export const FunderContributionModal = ({ funder, ...props }: FunderContributionModalProps) => {
  const { project } = useProjectAtom()

  const [contributions, setContributions] = useState<ProjectFundingTxFragment[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const where = {
    projectId: project.id,
    funderId: funder.id,
  }

  const orderBy = {
    createdAt: OrderByOptions.Desc,
  }

  const { fetchMore } = useProjectPageFundingTxQuery({
    skip: !project.id || !funder.id,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where,
        orderBy,
        pagination: {
          take: MAXIMUM_USER_CONTRIBUTION_ITEMS,
        },
      },
    },
    onCompleted(data) {
      handleDataUpdate(data.fundingTxsGet?.fundingTxs || [])
      setIsLoading(false)
    },
    onError(error) {
      setIsLoading(false)
    },
  })

  const { handleDataUpdate, isLoadingMore, noMoreItems, fetchNext } = usePaginationAtomHook<ProjectFundingTxFragment>({
    fetchMore,
    queryName: ['fundingTxsGet', 'fundingTxs'],
    itemLimit: MAXIMUM_USER_CONTRIBUTION_ITEMS,
    where,
    orderBy,
    setData: setContributions,
  })

  const id = 'user-contributions-modal-scroll-container'

  return (
    <Modal
      title={t("User's contributions")}
      {...props}
      bodyProps={{
        as: VStack,
        id,
        gap: 3,
        maxHeight: '500px',
        paddingX: 0,
        paddingTop: 1,
        alignItems: 'start',
        overflowY: 'auto',
      }}
    >
      <HStack spacing={1} paddingX={6}>
        <UserAvatar user={funder.user} id={funder.id} />
        <Body size="sm" bold dark>
          {funder.user?.username || t('Anonymous')}
        </Body>
      </HStack>

      {isLoading ? (
        <Skeletons />
      ) : (
        contributions.length > 0 &&
        contributions.map((contribution, index) => {
          return <FundersContributionItem key={contribution.id} contribution={contribution} />
        })
      )}
      <ScrollInvoke elementId={id} onScrollEnd={fetchNext} isLoading={isLoadingMore} noMoreItems={noMoreItems} />
    </Modal>
  )
}

const Skeletons = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item) => {
        return <FundersContributionItemSkeleton key={item} />
      })}
    </>
  )
}