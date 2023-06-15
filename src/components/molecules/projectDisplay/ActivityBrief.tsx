import { CircularProgress, HStack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'

import { Countdown } from '../../../pages/projectView/projectActivityPanel/components/Countdown'
import {
  ProjectFragment,
  ProjectMilestone,
} from '../../../types/generated/graphql'
import { isActive } from '../../../utils'
import { getProjectBalance } from '../../../utils/helpers'
import { SatoshiAmount } from '../../ui'

interface IActivityBrief {
  loading?: boolean
  project: ProjectFragment
}

export const ActivityBrief = ({ loading, project }: IActivityBrief) => {
  const [currentMilestone, setCurrentMilestone] = useState<ProjectMilestone>()
  const [milestoneIndex, setMilestoneIndex] = useState<number>(0)
  const [prevMilestone, setPrevMilestone] = useState(0)

  const balance = useMemo(() => getProjectBalance(project), [project])

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

  return (
    <HStack width="100%" padding={3} justifyContent="start">
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
  )
}
