import { ButtonProps, IconButton } from '@chakra-ui/react'
import { MouseEvent } from 'react'
import { PiBell } from 'react-icons/pi'

import { useAuthContext } from '../../../../../../../context'
import { useFollowProject } from '../../../../../../../shared/hooks/graphqlState'
import { useAuthModal } from '../../../../../../../pages/auth/hooks'
import { Project } from '../../../../../../../types'

interface FollowButtonProps extends ButtonProps {
  project: Pick<Project, 'id' | 'name' | 'title'>
}

export const FollowButton = ({ project, ...rest }: FollowButtonProps) => {
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
    <IconButton
      aria-label="follow-button"
      size="sm"
      variant="soft"
      colorScheme={isFollowed ? 'primary1' : 'neutral1'}
      onClick={handleClick}
      isLoading={followLoading || unfollowLoading}
      icon={<PiBell />}
      {...rest}
    />
  )
}
