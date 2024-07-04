import { AddIcon } from '@chakra-ui/icons'
import { Button, IconButton, Tooltip } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillHeartFill } from 'react-icons/bs'

import { IconButtonComponent } from '../../../../../../../components/ui'
import { useAuthContext } from '../../../../../../../context'
import { useFollowProject } from '../../../../../../../hooks/graphqlState'
import { useAuthModal } from '../../../../../../../pages/auth/hooks'
import { useEmailPromptModal } from '../../../../../../../pages/auth/hooks/useEmailPromptModal'
import { shouldPromptAtom } from '../../../../../../../pages/auth/state/emailPromptAtom'
import { Project } from '../../../../../../../types'

interface FollowComponentProps {
  project: Pick<Project, 'id' | 'name' | 'title'>
  hasIcon?: boolean
  type?: 'button' | 'icon'
}

export const FollowButton = ({ project, hasIcon, type = 'button', ...rest }: FollowComponentProps) => {
  const { t } = useTranslation()
  const { isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const { emailPromptOnOpen, setEmailPromptOnCloseAction } = useEmailPromptModal()

  const { isFollowed, handleFollow, handleUnFollow, followLoading, unfollowLoading } = useFollowProject(project)

  const shouldPrompt = useAtomValue(shouldPromptAtom)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!isLoggedIn) {
      loginOnOpen()
      return
    }

    if (shouldPrompt) {
      setEmailPromptOnCloseAction(handleFollowUnfollow)
      emailPromptOnOpen()
      return
    }

    handleFollowUnfollow()
  }

  const handleFollowUnfollow = () => {
    if (isFollowed) {
      handleUnFollow()
    } else {
      handleFollow()
    }
  }

  if (type === 'icon') {
    return (
      <>
        {!isFollowed ? (
          <>
            <Tooltip label={isLoggedIn ? t('Follow project') : t('Login to follow project')} placement="top">
              <IconButton
                size="sm"
                aria-label="project-follow-icon"
                isLoading={followLoading}
                icon={<AddIcon />}
                borderRadius="8px"
                onClick={handleClick}
                isDisabled={!isLoggedIn}
                _hover={{
                  border: `2px solid`,
                  borderColor: 'primary.600',
                  color: 'primary.600',
                }}
                {...rest}
              />
            </Tooltip>
          </>
        ) : (
          <Tooltip label={t('Unfollow project')} placement="top">
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
      </>
    )
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
    </>
  )
}
