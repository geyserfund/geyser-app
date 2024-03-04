import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonProps, Text } from '@chakra-ui/react'
import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillHeartFill } from 'react-icons/bs'

import { useAuthContext } from '../../../../context'
import { useFollowProject } from '../../../../hooks/graphqlState'
import { Project } from '../../../../types'
import { useAuthModal } from '../../../auth/hooks'

interface FollowButtonProps extends ButtonProps {
  project: Pick<Project, 'id' | 'name' | 'title'>
  hasIcon?: boolean
}

export const FollowButton = ({ project, hasIcon, ...rest }: FollowButtonProps) => {
  const { t } = useTranslation()
  const { isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const { isFollowed, handleFollow, handleUnFollow, followLoading, unfollowLoading } = useFollowProject(project)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

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
      variant={isFollowed ? 'secondary' : 'primary'}
      size="sm"
      onClick={handleClick}
      isLoading={followLoading || unfollowLoading}
      flexShrink={0}
      {...(hasIcon
        ? {
            leftIcon: isFollowed ? <BsFillHeartFill fontSize="14px" /> : <AddIcon />,
          }
        : {})}
      {...rest}
    >
      <Text> {isFollowed ? t('Followed') : t('Follow')}</Text>
    </Button>
  )
}
