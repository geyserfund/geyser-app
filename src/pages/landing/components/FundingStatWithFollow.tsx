import { useMutation } from '@apollo/client'
import { AddIcon } from '@chakra-ui/icons'
import {
  HStack,
  Image,
  StackProps,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { BsFillHeartFill } from 'react-icons/bs'

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

export interface FundingStatWithFollowProps extends StackProps {
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
  const { isLoggedIn, followedProjects, queryFollowedProjects } =
    useAuthContext()

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
        <Tooltip
          label={isLoggedIn ? 'follow project' : 'login to follow project'}
          placement="top"
        >
          <IconButtonComponent
            size="sm"
            aria-label="project-follow-icon"
            isLoading={followLoading}
            icon={<AddIcon />}
            borderRadius="8px"
            onClick={handleFollow}
            isDisabled={!isLoggedIn}
            _hover={{
              border: `2px solid`,
              borderColor: 'brand.primary600',
              color: 'brand.primary600',
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip label={'unfollow project'} placement="top">
          <IconButtonComponent
            size="sm"
            aria-label="project-unfollow-icon"
            isLoading={unfollowLoading}
            icon={<BsFillHeartFill fontSize="14px" />}
            borderRadius="8px"
            onClick={handleUnFollow}
            boxShadow="none !important"
            color="brand.primary500"
            border={`1px solid`}
            borderColor="brand.primary500"
            _hover={{
              border: `2px solid`,
              borderColor: 'brand.secondaryRed',
              color: 'brand.secondaryRed',
            }}
          />
        </Tooltip>
      )}
    </HStack>
  )
}
