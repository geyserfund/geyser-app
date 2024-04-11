import { useMutation } from '@apollo/client'
import { GridItem, IconButton, SimpleGrid, Text, useBreakpoint } from '@chakra-ui/react'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsPencilFill } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../../../../components/layouts'
import { DeleteConfirmModal } from '../../../../../../../components/molecules'
import { TitleDivider } from '../../../../../../../components/ui/TitleDivider'
import { getPath, ID } from '../../../../../../../constants'
import { MUTATION_DELETE_PROJECT_REWARD } from '../../../../../../../graphql/mutations'
import { useModal } from '../../../../../../../hooks/useModal'
import { ProjectRewardForCreateUpdateFragment as Reward } from '../../../../../../../types'
import { Project, ProjectRewardForCreateUpdateFragment } from '../../../../../../../types/generated/graphql'
import { isActive, toInt, useMobileMode, useNotification } from '../../../../../../../utils'
import { truthyFilter } from '../../../../../../../utils/array'
import { MobileViews, useProjectContext } from '../../../../../context'
import { RewardCard } from '../components/RewardCard'

export const Rewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const navigate = useNavigate()
  const location = useLocation()
  const breakpoint = useBreakpoint({ ssr: false })
  const largeView = ['xl', '2xl'].includes(breakpoint)
  const { toast } = useNotification()
  const isLaunch = location.pathname.includes('launch')

  const {
    project,
    setMobileView,
    fundForm: { state: fundFormState, setState: setFundingFormState, updateReward },
    isProjectOwner,
    updateProject,
  } = useProjectContext()

  const [selectedReward, setSelectedReward] = useState<ProjectRewardForCreateUpdateFragment>()
  const { isOpen: isRewardDeleteOpen, onClose: onRewardDeleteClose, onOpen: openRewardDelete } = useModal()

  const [deleteRewardMutation] = useMutation<any, { input: { projectRewardId: Number } }>(
    MUTATION_DELETE_PROJECT_REWARD,
    {
      onCompleted() {
        const newRewards = project?.rewards?.filter((reward) => reward?.id !== selectedReward?.id)
        updateProject({ rewards: newRewards || [] } as Project)
        handleClose()
        toast({
          title: 'Successfully removed!',
          description: `${t('Reward')} ${selectedReward?.name} ${t('was successfully removed')}`,
          status: 'success',
        })
      },
      onError(error) {
        handleClose()
        toast({
          title: 'Failed to remove reward',
          description: `${error}`,
          status: 'error',
        })
      },
    },
  )

  if (!project || !isActive || !project.rewards || project.rewards.length === 0) {
    return null
  }

  const activeProjectRewards = project.rewards.filter((reward) => reward.isHidden === false)

  const handleOnRewardSelect = (reward: Reward, count: number) => {
    const isRewardAvailable = reward.maxClaimable ? reward.maxClaimable - reward.sold > count : true
    if (isRewardAvailable) {
      updateReward({ id: toInt(reward.id), count: count + 1 })
    } else {
      toast({
        title: 'Reward Limit',
        description: `Maximum number of ${(reward.maxClaimable || 0) - (reward.sold || 0)} rewards are available`,
        status: 'error',
      })
    }

    setMobileView(MobileViews.funding)
    setFundingFormState('step', 'contribution')
  }

  const handleClose = () => {
    setSelectedReward(undefined)
    onRewardDeleteClose()
  }

  const triggerRewardRemoval = (id?: number) => {
    const currentReward = project.rewards?.find((reward) => reward?.id === id)
    if (!currentReward) {
      return
    }

    setSelectedReward(currentReward)
    openRewardDelete()
  }

  const handleRemoveReward = async () => {
    if (!selectedReward?.id) {
      return
    }

    deleteRewardMutation({
      variables: {
        input: {
          projectRewardId: selectedReward.id,
        },
      },
    })
  }

  const handleOnRewardEdit = (reward: Reward) => {
    navigate(getPath('launchProjectRewardsEdit', project.id, reward.id))
  }

  const handleOnRewardDelete = (reward: Reward) => {
    triggerRewardRemoval(reward.id)
  }

  const renderRewards = () => {
    if (activeProjectRewards.length > 0) {
      return activeProjectRewards.filter(truthyFilter).map((reward) => {
        const count = (fundFormState.rewardsByIDAndCount && fundFormState.rewardsByIDAndCount[`${reward.id}`]) || 0
        return (
          <RewardCard
            key={reward.id}
            width="100%"
            reward={reward}
            count={count}
            onRewardClick={() => handleOnRewardSelect(reward, count)}
            handleEdit={() => handleOnRewardEdit(reward)}
            handleRemove={() => handleOnRewardDelete(reward)}
          />
        )
      })
    }

    return (
      <GridItem colSpan={isMobile ? 2 : 1}>
        <Text>{t('There are no rewards available.')}</Text>
      </GridItem>
    )
  }

  const isRewardTitleFixed = location.pathname.includes('rewards') && isMobile

  const rightActionButton = isProjectOwner ? (
    <IconButton
      aria-label="editRewards"
      as={Link}
      to={getPath('projectManageRewards', project.name)}
      variant="ghost"
      icon={<BsPencilFill />}
    />
  ) : undefined

  if (!project.rewards.length) {
    return null
  }

  return (
    <>
      <CardLayout
        ref={ref}
        id={ID.project.rewards.container}
        width="100%"
        flexDirection="column"
        alignItems="flex-start"
        spacing="25px"
        mobileDense
        {...(isLaunch ? { border: 'none', p: 0 } : {})}
      >
        {!isLaunch && (
          <TitleDivider
            badge={activeProjectRewards.length}
            isFixed={isRewardTitleFixed}
            rightAction={rightActionButton}
          >
            {t('Rewards')}
          </TitleDivider>
        )}

        <SimpleGrid columns={largeView ? 2 : 1} spacing={'20px'} width={'100%'}>
          {renderRewards()}
        </SimpleGrid>
      </CardLayout>
      <DeleteConfirmModal
        isOpen={isRewardDeleteOpen}
        onClose={handleClose}
        title={`${t('Delete reward')}`}
        description={t('Are you sure you want to remove the reward?')}
        confirm={handleRemoveReward}
      />
    </>
  )
})
