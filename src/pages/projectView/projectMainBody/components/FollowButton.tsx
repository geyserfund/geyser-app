import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

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
          borderColor: 'brand.secondaryRed',
        }}
        _active={{ backgroundColor: 'brand.secondaryRed' }}
        border="1px solid"
        borderColor="neutral.200"
        leftIcon={<MinusIcon />}
        onClick={handleUnFollow}
        isLoading={unfollowLoading}
      >
        Unfollow
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      {...buttonStyle}
      border="1px solid"
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
  _hover: {
    backgroundColor: 'none',
    border: '1px solid #20ECC7',
  },
  _active: { backgroundColor: 'brand.primary' },
  bg: 'none',
}
