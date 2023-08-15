import { AddIcon } from '@chakra-ui/icons'
import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsFillHeartFill } from 'react-icons/bs'

import { useAuthContext } from '../../../../context'
import { useFollowProject } from '../../../../hooks/graphqlState'

export const FollowButton = ({ projectId }: { projectId: number }) => {
  const { t } = useTranslation()
  const { isLoggedIn } = useAuthContext()
  const {
    isFollowed,
    handleFollow,
    handleUnFollow,
    followLoading,
    unfollowLoading,
  } = useFollowProject(projectId)

  return (
    <Button
      variant="secondary"
      size="sm"
      isActive={isFollowed}
      leftIcon={isFollowed ? <BsFillHeartFill fontSize="14px" /> : <AddIcon />}
      onClick={isFollowed ? handleUnFollow : handleFollow}
      isLoading={followLoading || unfollowLoading}
      isDisabled={!isLoggedIn}
    >
      <Text isTruncated> {isFollowed ? t('Following') : t('Follow')}</Text>
    </Button>
  )
}
