import { AddIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import { BsFillHeartFill } from 'react-icons/bs'

import { useAuthContext } from '../../../../context'
import { useFollowProject } from '../../../../hooks/graphqlState'

export const FollowButton = ({ projectId }: { projectId: number }) => {
  const { isLoggedIn } = useAuthContext()
  const {
    isFollowed,
    handleFollow,
    handleUnFollow,
    followLoading,
    unfollowLoading,
  } = useFollowProject(projectId)

  if (isFollowed) {
    return (
      <Button
        variant="ghost"
        {...buttonStyle}
        _hover={{
          backgroundColor: 'none',
          borderColor: 'secondary.red',
          color: 'secondary.red',
        }}
        _active={{ backgroundColor: 'secondary.red' }}
        borderColor="primary.500"
        color="primary.500"
        leftIcon={<BsFillHeartFill fontSize="14px" />}
        onClick={handleUnFollow}
        isLoading={unfollowLoading}
      >
        Following
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      {...buttonStyle}
      _hover={{
        backgroundColor: 'none',
        borderColor: 'primary.400',
      }}
      borderColor="neutral.200"
      leftIcon={<AddIcon />}
      onClick={handleFollow}
      isLoading={followLoading}
      isDisabled={!isLoggedIn}
    >
      Follow
    </Button>
  )
}

const buttonStyle = {
  size: 'sm',
  bg: 'none',
  border: '1px solid',
}
