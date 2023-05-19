import { CircularProgress, HStack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

import { Countdown } from '../../../pages/projectView/projectActivityPanel/components/Countdown'
import { colors } from '../../../styles'
import { fonts } from '../../../styles'
import {
  ProjectFragment,
  ProjectMilestone,
} from '../../../types/generated/graphql'
import { isActive, useMobileMode } from '../../../utils'
import { getProjectBalance } from '../../../utils/helpers'
import { SatoshiAmount } from '../../ui'

interface IActivityBrief {
  loading?: boolean
  project: ProjectFragment
}

const useStyles = createUseStyles({
  circularProgress: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .amount-label-sat': {
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  },
})

export const ActivityBrief = ({ loading, project }: IActivityBrief) => {
  const classes = useStyles()
  const isMobile = useMobileMode()
  const [currentMilestone, setCurrentMilestone] = useState<ProjectMilestone>()
  const [milestoneIndex, setMilestoneIndex] = useState<number>(0)
  const [prevMilestone, setPrevMilestone] = useState(0)

  const balance = getProjectBalance(project)

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
  }, [project])

  const getTrackColor = () => {
    switch (milestoneIndex % 3) {
      case 1:
        if (milestoneIndex === 1) return undefined
        return 'primary.800'
      case 2:
        return 'primary.400'
      case 0:
        return 'primary.600'
      default:
        return undefined
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

  const renderCircularProgress = () => {
    if (currentMilestone) {
      const circularPercentage =
        ((balance - prevMilestone) /
          (currentMilestone.amount - prevMilestone)) *
        100

      return (
        <CircularProgress
          capIsRound
          isIndeterminate={loading}
          className={classes.circularProgress}
          value={circularPercentage}
          size="105px"
          thickness="15px"
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
        <Text
          fontSize="14px"
          fontFamily={fonts.mono}
          color={colors.neutral600}
          maxW="100%"
        >{`${percentage}% of ${currentMilestone.name}`}</Text>
      )
    }

    return null
  }

  const showCountdown = isActive(project.status) && Boolean(project.expiresAt)

  return (
    <HStack
      width="100%"
      padding={isMobile ? '20px 20px 0px 20px' : '10px 20px'}
      justifyContent="space-between"
    >
      {renderCircularProgress()}
      <VStack flex="1" spacing="5px" width="100%" overflow="hidden">
        {!isMobile && (
          <Text
            fontSize="18px"
            fontWeight={600}
            color="neutral.900"
            wordBreak="break-word"
          >
            {project.title}
          </Text>
        )}
        <SatoshiAmount
          fontSize="32px"
          fontFamily={fonts.mono}
          fontWeight={400}
          fontStyle={'normal'}
          color="primary.600"
        >
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
