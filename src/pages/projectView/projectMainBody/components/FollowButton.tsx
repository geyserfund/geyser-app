import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonProps, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsFillHeartFill } from 'react-icons/bs'

import { useAuthContext } from '../../../../context'
import { useFollowProject } from '../../../../hooks/graphqlState'

interface FollowButtonProps extends ButtonProps {
  projectId: number
}

export const FollowButton = ({ projectId, ...rest }: FollowButtonProps) => {
  const { t } = useTranslation()
  const { isLoggedIn, loginOnOpen } = useAuthContext()
  const {
    isFollowed,
    handleFollow,
    handleUnFollow,
    followLoading,
    unfollowLoading,
  } = useFollowProject(projectId)

  const handleClick = () => {
    if (!isLoggedIn) {
      loginOnOpen()
      return
    }

    if (isFollowed) {
      handleUnFollow()
    } else {
      handleFollow()
    }
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      isActive={isFollowed}
      leftIcon={isFollowed ? <BsFillHeartFill fontSize="14px" /> : <AddIcon />}
      onClick={handleClick}
      isLoading={followLoading || unfollowLoading}
      {...rest}
    >
      <Text isTruncated> {isFollowed ? t('Following') : t('Follow')}</Text>
    </Button>
  )
}
