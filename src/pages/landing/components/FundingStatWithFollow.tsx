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

import { MonoBody1 } from '../../../components/typography'
import { IconButtonComponent } from '../../../components/ui'
import { SatoshiUrl } from '../../../constants'
import { useAuthContext } from '../../../context'
import { useFollowProject } from '../../../hooks/graphqlState'
import { fonts } from '../../../styles'
import { getShortAmountLabel } from '../../../utils'

export interface FundingStatWithFollowProps extends StackProps {
  fundersCount: number
  amountFunded: number
  projectId: number
  bold?: boolean
}

export const FundingStatWithFollow = ({
  bold,
  fundersCount = 0,
  amountFunded = 0,
  projectId,
  ...rest
}: FundingStatWithFollowProps) => {
  const { isLoggedIn } = useAuthContext()

  const {
    isFollowed,
    handleFollow,
    handleUnFollow,
    followLoading,
    unfollowLoading,
  } = useFollowProject(projectId)

  return (
    <HStack direction={'row'} spacing="20px" {...rest}>
      <VStack alignItems={'center'} spacing={0}>
        <MonoBody1 bold={bold}>{fundersCount}</MonoBody1>

        <Text
          fontSize="12px"
          color={'neutral.600'}
          fontFamily={fonts.mono}
          textTransform="uppercase"
        >
          funders
        </Text>
      </VStack>

      <VStack alignItems={'center'} spacing={0}>
        <HStack spacing="3px">
          <Image src={SatoshiUrl} height="18px" />
          <MonoBody1 bold={bold}>{getShortAmountLabel(amountFunded)}</MonoBody1>
        </HStack>
        <Text
          fontSize="12px"
          color={'neutral.600'}
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
              borderColor: 'primary.600',
              color: 'primary.600',
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
            color="primary.500"
            border={`1px solid`}
            borderColor="primary.500"
            _hover={{
              border: `2px solid`,
              borderColor: 'secondary.red',
              color: 'secondary.red',
            }}
          />
        </Tooltip>
      )}
    </HStack>
  )
}
