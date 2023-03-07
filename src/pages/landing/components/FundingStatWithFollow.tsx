import { useMutation } from '@apollo/client'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { HStack, Image, StackProps, Text, VStack } from '@chakra-ui/react'

import { SatoshiPng } from '../../../assets'
import { MonoBody1 } from '../../../components/typography'
import { IconButtonComponent } from '../../../components/ui'
import { useAuthContext } from '../../../context'
import {
  MUTATION_FOLLOW_PROJECT,
  MUTATION_UNFOLLOW_PROJECT,
} from '../../../graphql/mutations'
import { fonts } from '../../../styles'
import { MutationProjectFollowArgs } from '../../../types'
import { getShortAmountLabel, toInt } from '../../../utils'

interface FundingStatWithFollowProps extends StackProps {
  fundersCount: number
  amountFunded: number
  projectId: number
  bold?: boolean
}

export const FundingStatWithFollow = ({
  bold,
  fundersCount,
  amountFunded,
  projectId,
  ...rest
}: FundingStatWithFollowProps) => {
  const { followedProjects, queryFollowedProjects } = useAuthContext()

  const [followProject, { loading: followLoading }] = useMutation<
    any,
    MutationProjectFollowArgs
  >(MUTATION_FOLLOW_PROJECT, {
    variables: {
      input: {
        projectId: toInt(projectId),
      },
    },
    onCompleted() {
      queryFollowedProjects()
    },
  })

  const [unFollowProject, { loading: unfollowLoading }] = useMutation<
    any,
    MutationProjectFollowArgs
  >(MUTATION_UNFOLLOW_PROJECT, {
    variables: {
      input: {
        projectId: toInt(projectId),
      },
    },
    onCompleted() {
      queryFollowedProjects()
    },
  })

  const isFollowed = Boolean(
    followedProjects.find((project) => toInt(project?.id) === toInt(projectId)),
  )

  const handleFollow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    followProject()
  }

  const handleUnFollow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    unFollowProject()
  }

  return (
    <HStack direction={'row'} spacing="20px" {...rest}>
      <VStack alignItems={'center'} spacing={0}>
        <MonoBody1 bold={bold}>{fundersCount}</MonoBody1>

        <Text
          fontSize="12px"
          color={'brand.neutral600'}
          fontFamily={fonts.mono}
          textTransform="uppercase"
        >
          funders
        </Text>
      </VStack>

      <VStack alignItems={'center'} spacing={0}>
        <HStack spacing="3px">
          <Image src={SatoshiPng} height="18px" />
          <MonoBody1 bold={bold}>{getShortAmountLabel(amountFunded)}</MonoBody1>
        </HStack>
        <Text
          fontSize="12px"
          color={'brand.neutral600'}
          fontFamily={fonts.mono}
          textTransform="uppercase"
        >
          Funded
        </Text>
      </VStack>
      {!isFollowed ? (
        <IconButtonComponent
          size="sm"
          aria-label="project-follow-icon"
          isLoading={followLoading}
          icon={<AddIcon />}
          borderRadius="8px"
          onClick={handleFollow}
        />
      ) : (
        <IconButtonComponent
          size="sm"
          aria-label="project-unfollow-icon"
          isLoading={unfollowLoading}
          icon={<MinusIcon />}
          borderRadius="8px"
          onClick={handleUnFollow}
        />
      )}
    </HStack>
  )
}
