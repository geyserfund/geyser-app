import {
  Avatar,
  Button,
  HStack,
  SkeletonCircle,
  SkeletonText,
  StackProps,
  Text,
  useTheme,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineEllipsis } from 'react-icons/ai'

import { SkeletonLayout } from '../../../../../../../../../components/layouts'
import { UserAvatar } from '../../../../../../../../../components/ui/UserAvatar'
import { ExternalAccountType } from '../../../../../../../../../pages/auth'
import { useFollowedProjectsValue } from '../../../../../../../../../pages/auth/state'
import { FunderWithUserFragment, OrderByOptions, useProjectFundersQuery } from '../../../../../../../../../types'
import { removeProjectAmountException, toInt, useMobileMode, useNotification } from '../../../../../../../../../utils'
import { useProjectContext } from '../../../../../../../context'
import { ContributeButton, FollowButton, ShareButton } from '../../../../projectMainBody/components'
import { SubscribeButton } from '../components'
import { ProjectBalanceDisplay } from '../components/ProjectBalanceDisplay'
import { ProjectFundersModal, useProjectFundersModal } from '../components/ProjectFundersModal'

export const ActivityBrief = (props: StackProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const isMobile = useMobileMode()

  const { project, goals } = useProjectContext()
  const followedProjects = useFollowedProjectsValue()

  const [allFunders, setAllFunders] = useState<FunderWithUserFragment[]>([])
  const [socialFunders, setSocialFunders] = useState<FunderWithUserFragment[]>([])

  const { colors } = useTheme()

  const fundersModal = useProjectFundersModal()

  const { loading: funderLoading } = useProjectFundersQuery({
    variables: {
      input: {
        where: {
          projectId: toInt(project?.id),
          confirmed: true,
          anonymous: false,
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
          funder.user.externalAccounts.find((account) => account.accountType !== ExternalAccountType.lightning)
        ) {
          socialFilteredFunders.push(funder)
        }
      }

      setAllFunders(funders)
      funders.map((funder) => {})
      setSocialFunders(socialFilteredFunders)
    },
  })

  const latestFunders = socialFunders.slice(0, 12)

  const removeBalance = removeProjectAmountException(project?.name) || project?.balance === 0

  if (!project) {
    return null
  }

  return (
    <VStack w="100%" {...props}>
      {!removeBalance && (
        <ProjectBalanceDisplay
          defaultGoalId={project.defaultGoalId}
          balance={project.balance}
          balanceUsdCent={project.balanceUsdCent}
          inProgressGoals={goals.inProgressGoals}
        />
      )}

      {!isMobile ? (
        <VStack w="full" spacing="10px" pb={3}>
          <HStack w="full">
            <SubscribeButton flex="1" projectName={project.name} projectTitle={project.title} />
            <ContributeButton flex="1" />
          </HStack>

          {followedProjects.some((followedProject) => followedProject?.id === project?.id) ? (
            <ShareButton w="full" />
          ) : (
            <FollowButton hasIcon variant="secondary" size="md" w="full" project={project} />
          )}
        </VStack>
      ) : null}

      {(funderLoading || allFunders.length) && (
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
              ? latestFunders.length > 0
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
                : allFunders
                    .slice(0, 12)
                    .map((s, i) => (
                      <UserAvatar
                        size="sm"
                        border={`2px solid ${colors.neutral[0]}`}
                        display="inline-block"
                        marginLeft="-5px"
                        key={i}
                      />
                    ))
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
      <ProjectFundersModal {...fundersModal} />
    </VStack>
  )
}

export const ActivityBriefSkeleton = (props: StackProps) => {
  return (
    <VStack w="100%" {...props}>
      <HStack w="100%" padding={3} justifyContent="start">
        <SkeletonCircle height="116px" width="116px" />
        <VStack flex="1" spacing={'20px'} width="100%" px={2}>
          <SkeletonLayout height="40px" width="180px" />
          <SkeletonText noOfLines={2} w="100%" />
        </VStack>
      </HStack>

      <VStack w="full" spacing="10px" pb={3} px={3}>
        <SkeletonLayout height="40px" width="100%" />
        <SkeletonLayout height="40px" width="100%" />
      </VStack>

      <VStack
        textAlign="left"
        alignItems="start"
        w="100%"
        py={10}
        px="10px"
        overflow="hidden"
        spacing={1}
        as={Button}
        size="lg"
        variant="transparent"
      >
        <SkeletonLayout height="32px" width="200px" />
        <HStack ml={1} spacing={0} alignItems="start">
          {[1, 2, 3].map((s) => (
            <SkeletonCircle
              key={s}
              border={`2px solid`}
              borderColor={'neutral.0'}
              display="inline-block"
              marginLeft="-5px"
              bg="neutral.100"
              color="neutral.900"
              size="8"
            />
          ))}
        </HStack>
      </VStack>
    </VStack>
  )
}
