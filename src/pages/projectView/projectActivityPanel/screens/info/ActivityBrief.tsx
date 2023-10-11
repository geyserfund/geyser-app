import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  HStack,
  SkeletonCircle,
  StackProps,
  Text,
  useDisclosure,
  useTheme,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineEllipsis } from 'react-icons/ai'

import { UserAvatar } from '../../../../../components/ui/UserAvatar'
import { useProjectContext } from '../../../../../context'
import {
  FunderWithUserFragment,
  OrderByOptions,
  ProjectMilestone,
  useProjectFundersQuery,
} from '../../../../../types'
import { toInt, useMobileMode, useNotification } from '../../../../../utils'
import { getProjectBalance } from '../../../../../utils/helpers'
import { ExternalAccountType } from '../../../../auth'
import {
  ContributeButton,
  FollowButton,
} from '../../../projectMainBody/components'
import { BalanceDisplayButton } from './components'
import {
  ProjectFundersModal,
  useProjectFundersModal,
} from './components/ProjectFundersModal'

const TIME_AFTER_WHICH_TOOLTIP_SHOULD_CLOSE_MILLIS = 1500

export const ActivityBrief = (props: StackProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const isMobile = useMobileMode()

  const { project } = useProjectContext()

  const {
    isOpen: isToolTipOpen,
    onOpen: onToolTipOpen,
    onClose: onToolTipClose,
  } = useDisclosure()
  const { isOpen: isUsd, onToggle: toggleUsd } = useDisclosure()

  useEffect(() => {
    if (isToolTipOpen) {
      setTimeout(() => {
        onToolTipClose()
      }, TIME_AFTER_WHICH_TOOLTIP_SHOULD_CLOSE_MILLIS)
    }
  }, [isToolTipOpen, onToolTipClose])

  const [socialFunders, setSocialFunders] = useState<FunderWithUserFragment[]>(
    [],
  )
  const [currentMilestone, setCurrentMilestone] = useState<ProjectMilestone>()
  const [milestoneIndex, setMilestoneIndex] = useState<number>(0)
  const [prevMilestone, setPrevMilestone] = useState(0)

  const { colors } = useTheme()

  const balance = useMemo(
    () => (project ? getProjectBalance(project) : 0),
    [project],
  )

  const fundersModal = useProjectFundersModal()

  const { loading: funderLoading } = useProjectFundersQuery({
    variables: {
      input: {
        where: {
          projectId: toInt(project?.id),
          anonymous: false,
          confirmed: true,
        },
        orderBy: {
          amountFunded: OrderByOptions.Desc,
        },
        pagination: {
          take: 50,
        },
      },
    },
    skip: !project,
    onError() {
      toast({
        status: 'error',
        title: 'Failed to fetch contributors leaderboard',
      })
    },
    onCompleted(data) {
      const funders = data?.fundersGet || []
      const socialFilteredFunders = [] as FunderWithUserFragment[]
      for (let i = 0; i < funders.length; i++) {
        const funder = funders[i]
        if (
          funder &&
          funder.confirmedAt &&
          funder.user &&
          funder.user.externalAccounts.find(
            (account) =>
              account.accountType === ExternalAccountType.nostr ||
              account.accountType === ExternalAccountType.twitter,
          )
        ) {
          socialFilteredFunders.push(funder)
        }
      }

      funders.map((funder) => {})
      setSocialFunders(socialFilteredFunders)
    },
  })

  useEffect(() => {
    if (!project) {
      return
    }

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

  const getColor = useCallback(() => {
    switch (milestoneIndex % 4) {
      case 1:
        return 'primary.400'
      case 2:
        return 'primary.200'
      case 3:
        return 'primary.600'
      case 0:
        return 'primary.100'
      default:
        return 'primary.200'
    }
  }, [milestoneIndex])

  const circularPercentage = useMemo(() => {
    if (currentMilestone) {
      return (
        ((balance - prevMilestone) /
          (currentMilestone.amount - prevMilestone)) *
        100
      )
    }
  }, [balance, currentMilestone, prevMilestone])

  const renderCircularProgress = useCallback(() => {
    if (currentMilestone) {
      return (
        <CircularProgress
          capIsRound
          isIndeterminate={funderLoading}
          value={circularPercentage}
          size="116px"
          thickness="16px"
          color={getColor()}
          trackColor="neutral.200"
        />
      )
    }

    return null
  }, [circularPercentage, currentMilestone, funderLoading, getColor])

  const getMilestoneValue = useCallback(() => {
    if (currentMilestone) {
      const percentage = Math.ceil(
        ((balance - prevMilestone) /
          (currentMilestone.amount - prevMilestone)) *
          100,
      )
      return (
        <Box pl={2} color="neutral.600" w="100%">
          <Text fontWeight={500} display="inline">
            {`${percentage} % ${t('of Milestone')} ${milestoneIndex}:`}
          </Text>{' '}
          <Text display="inline">{currentMilestone.name}</Text>
        </Box>
      )
    }

    return null
  }, [balance, currentMilestone, milestoneIndex, prevMilestone, t])

  const latestFunders = socialFunders.slice(0, 12)

  return (
    <VStack w="100%" {...props}>
      <HStack
        w="100%"
        padding={3}
        justifyContent="start"
        onMouseEnter={onToolTipOpen}
        onMouseLeave={onToolTipClose}
        _hover={{ cursor: 'pointer' }}
        onClick={toggleUsd}
      >
        {renderCircularProgress()}
        <VStack
          flex="1"
          spacing={0}
          width="100%"
          px={2}
          alignItems={circularPercentage === undefined ? 'center' : 'start'}
        >
          <BalanceDisplayButton
            balance={balance}
            isToolTipOpen={isToolTipOpen}
            isUsd={isUsd}
          />

          {getMilestoneValue()}
        </VStack>
      </HStack>
      {(funderLoading || latestFunders.length) && (
        <VStack
          textAlign="left"
          alignItems="start"
          w="100%"
          py={10}
          px="10px"
          overflow="hidden"
          spacing={1}
          as={Button}
          onClick={() =>
            fundersModal.onOpen({
              projectId: Number(project?.id),
            })
          }
          size="lg"
          variant="transparent"
        >
          <Text fontWeight={500}>{t('Contributors')}</Text>
          <HStack ml={1} spacing={0} alignItems="start">
            {!funderLoading
              ? latestFunders.map((funder) => {
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
                })
              : [1, 2, 3].map((s) => (
                  <SkeletonCircle
                    key={s}
                    border={`2px solid ${colors.neutral[0]}`}
                    display="inline-block"
                    marginLeft="-5px"
                    bg="neutral.100"
                    color="neutral.900"
                    size="8"
                  />
                ))}

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
      )}

      {!isMobile ? (
        <VStack w="full" spacing="10px">
          <ContributeButton w="full" />
          <FollowButton size="md" w="full" projectId={project?.id} />
        </VStack>
      ) : null}
      <ProjectFundersModal {...fundersModal} />
    </VStack>
  )
}
