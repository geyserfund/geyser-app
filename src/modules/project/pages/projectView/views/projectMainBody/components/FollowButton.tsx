import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react'
import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillHeartFill } from 'react-icons/bs'

import { useAuthContext } from '../../../../../../../context'
import { useFollowProject } from '../../../../../../../hooks/graphqlState'
import { EmailPromptModal } from '../../../../../../../pages/auth/components/EmailPromptModal'
import { useAuthModal } from '../../../../../../../pages/auth/hooks'
import { useEmailPrompt } from '../../../../../../../pages/auth/hooks/useEmailPrompt'
import { Project } from '../../../../../../../types'

interface FollowButtonProps extends ButtonProps {
  project: Pick<Project, 'id' | 'name' | 'title'>
  hasIcon?: boolean
}

export const FollowButton = ({ project, hasIcon, ...rest }: FollowButtonProps) => {
  const { t } = useTranslation()
  const { isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const emailModalProps = useDisclosure()
  const { isFollowed, handleFollow, handleUnFollow, followLoading, unfollowLoading } = useFollowProject(project)

  const { shouldPrompt } = useEmailPrompt()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!isLoggedIn) {
      loginOnOpen()
      return
    }

    if (shouldPrompt) {
      emailModalProps.onOpen()
      return
    }

    handleFollowUnfollow()
  }

  const onEmailUpdated = () => {
    handleFollowUnfollow()
  }

  const handleFollowUnfollow = () => {
    if (isFollowed) {
      handleUnFollow()
    } else {
      handleFollow()
    }
  }

  return (
    <>
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
        {isFollowed ? t('Followed') : t('Follow')}
      </Button>
      <EmailPromptModal onEmailUpdated={onEmailUpdated} {...emailModalProps} />
    </>
  )
}
