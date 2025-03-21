import { HStack, ModalProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ScrollInvoke } from '@/helpers'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProfileText } from '@/shared/components/display/ProfileText'
import { Modal } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'
import { usePaginationAtomHook } from '@/shared/hooks/utils/usePaginationAtomHook'
import {
  OrderByOptions,
  ProjectContributionFragment,
  ProjectLeaderboardContributorsFragment,
  useProjectPageContributionsGetQuery,
} from '@/types'

import { UserAvatar } from '../../../../../../../shared/molecules/UserAvatar'
import { FundersContributionItem, FundersContributionItemSkeleton } from './FundersContributionItem'

type FunderContributionModalProps = {
  funder: ProjectLeaderboardContributorsFragment
} & Omit<ModalProps, 'children'>

const MAXIMUM_USER_CONTRIBUTION_ITEMS = 20

export const FunderContributionModal = ({ funder, ...props }: FunderContributionModalProps) => {
  const { project } = useProjectAtom()

  const [contributions, setContributions] = useState<ProjectContributionFragment[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const where = {
    projectId: project.id,
    funderId: funder.funderId,
  }

  const orderBy = {
    createdAt: OrderByOptions.Desc,
  }

  const { fetchMore } = useProjectPageContributionsGetQuery({
    skip: !project.id || !funder.funderId,
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
      handleDataUpdate(data.contributionsGet?.contributions || [])
      setIsLoading(false)
    },
    onError(error) {
      setIsLoading(false)
    },
  })

  const { handleDataUpdate, isLoadingMore, noMoreItems, fetchNext } =
    usePaginationAtomHook<ProjectContributionFragment>({
      fetchMore,
      queryName: ['contributionsGet', 'contributions'],
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
      <HStack
        spacing={1}
        paddingX={6}
        {...(funder.user && {
          as: Link,
          to: getPath('userProfile', funder.user.id),
        })}
      >
        <UserAvatar user={funder.user} id={funder.funderId} />
        <ProfileText guardian={funder.user?.guardianType} size="sm" bold dark>
          {funder.user?.username || t('Anonymous')}
        </ProfileText>
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
