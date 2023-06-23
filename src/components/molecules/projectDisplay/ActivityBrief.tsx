import {
  Avatar,
  CircularProgress,
  HStack,
  Text,
  useTheme,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { AiOutlineEllipsis } from 'react-icons/ai'

import { ExternalAccountType } from '../../../pages/auth'
import { Countdown } from '../../../pages/projectView/projectActivityPanel/components/Countdown'
import {
  FunderWithUserFragment,
  ProjectFragment,
  ProjectMilestone,
} from '../../../types/generated/graphql'
import { isActive } from '../../../utils'
import { getProjectBalance } from '../../../utils/helpers'
import { SatoshiAmount } from '../../ui'
import { UserAvatar } from '../../ui/UserAvatar'
import {
  ProjectFundersModal,
  useProjectFundersModal,
} from '../projectActivity/ProjectFundersModal'

interface IActivityBrief {
  loading?: boolean
  project: ProjectFragment
  funders: FunderWithUserFragment[]
  onFetchMoreFunders: () => void
}

export const ActivityBrief = ({
  loading,
  project,
  funders,
  onFetchMoreFunders: fetchMoreFunders,
}: IActivityBrief) => {
  const [currentMilestone, setCurrentMilestone] = useState<ProjectMilestone>()
  const [milestoneIndex, setMilestoneIndex] = useState<number>(0)
  const [prevMilestone, setPrevMilestone] = useState(0)

  const { colors } = useTheme()

  const balance = useMemo(() => getProjectBalance(project), [project])

  const fundersModal = useProjectFundersModal()

  useEffect(() => {
    if (project.milestones && project.milestones.length > 0) {
      let selectedMilestone: ProjectMilestone | undefined
      let prevTotal = 0

      project.milestones.map((milestone, index) => {
        const hasNextMilestone =
          project.milestones && Boolean(project.milestones[index + 1])
        if (!selectedMilestone) {
          if (milestone && (milestone.amount >= balance || !hasNextMilestone)) {
            selectedMilestone = milestone
            setCurrentMilestone(milestone)
            setMilestoneIndex(index + 1)
          } else {
            prevTotal = milestone?.amount || 0
          }
        }
      })
      setPrevMilestone(prevTotal)
    }
  }, [balance, project])

  const getTrackColor = () => {
    switch (milestoneIndex % 3) {
      case 1:
        if (milestoneIndex === 1) return 'neutral.200'
        return 'primary.800'
      case 2:
        return 'primary.400'
      case 0:
        return 'primary.600'
      default:
        return 'neutral.200'
    }
  }

  const getColor = () => {
    switch (milestoneIndex % 3) {
      case 1:
        return 'primary.400'
      case 2:
        return 'primary.600'
      case 0:
        return 'primary.800'
      default:
        return 'primary.300'
    }
  }

  const circularPercentage = useMemo(() => {
    if (currentMilestone) {
      return (
        ((balance - prevMilestone) /
          (currentMilestone.amount - prevMilestone)) *
        100
      )
    }
  }, [balance, currentMilestone, prevMilestone])

  const renderCircularProgress = () => {
    if (currentMilestone) {
      return (
        <CircularProgress
          capIsRound
          isIndeterminate={loading}
          value={circularPercentage}
          size="116px"
          thickness="16px"
          color={getColor()}
          trackColor={getTrackColor()}
        />
      )
    }

    return null
  }

  const getMilestoneValue = () => {
    if (currentMilestone) {
      const percentage = Math.ceil(
        ((balance - prevMilestone) /
          (currentMilestone.amount - prevMilestone)) *
          100,
      )
      return (
        <Text pl={2} color="neutral.600" w="100%">
          <Text w="100%" fontWeight={500} display="inline">
            {percentage}% of Milestone {milestoneIndex}:
          </Text>{' '}
          {currentMilestone.name}
        </Text>
      )
    }

    return null
  }

  const showCountdown = isActive(project.status) && Boolean(project.expiresAt)

  const socialFunders = useMemo(
    () =>
      funders.filter(
        (funder) =>
          funder &&
          funder.confirmedAt &&
          funder.user &&
          funder.user.externalAccounts.find(
            (account) =>
              account.accountType === ExternalAccountType.nostr ||
              account.accountType === ExternalAccountType.twitter,
          ),
      ),
    [funders],
  )

  const latestFunders = socialFunders.slice(0, 12)

  return (
    <VStack w="100%">
      <HStack w="100%" padding={3} justifyContent="start">
        {renderCircularProgress()}
        <VStack
          flex="1"
          spacing={0}
          width="100%"
          px={2}
          alignItems={circularPercentage === undefined ? 'center' : 'start'}
        >
          <SatoshiAmount variant="satoshi" color="primary.600">
            {balance}
          </SatoshiAmount>
          {getMilestoneValue()}
          {/* We can force unwrap project.expiresAt because the showCountdown expression check for a null or undefined value */}
          {showCountdown && project.expiresAt && (
            <Countdown endDate={project.expiresAt} />
          )}
        </VStack>
      </HStack>
      <VStack textAlign="left" alignItems="start" w="100%" spacing={1}>
        <Text fontWeight={500}>Supporters</Text>
        <HStack
          spacing={0}
          cursor="pointer"
          alignItems="start"
          onClick={() =>
            fundersModal.onOpen({
              funders: socialFunders,
              onFetchMore: () => fetchMoreFunders(),
            })
          }
        >
          {latestFunders.map((funder) => {
            return (
              <UserAvatar
                size="sm"
                border={`2px solid ${colors.neutral[0]}`}
                display="inline-block"
                marginLeft="-5px"
                key={funder.id}
                user={funder.user}
              />
            )
          })}

          {latestFunders.length >= 12 ? (
            <Avatar
              border={`2px solid ${colors.neutral[0]}`}
              display="inline-block"
              marginLeft="-5px"
              bg="neutral.100"
              color="neutral.900"
              size="sm"
              icon={<AiOutlineEllipsis size="sm" />}
            />
          ) : null}
        </HStack>
      </VStack>
      <ProjectFundersModal {...fundersModal} />
    </VStack>
  )
}
