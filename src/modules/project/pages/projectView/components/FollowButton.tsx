import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonProps, IconButton, Tooltip } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillHeartFill } from 'react-icons/bs'

import { IconButtonComponent } from '../../../../../components/ui'
import { useAuthContext } from '../../../../../context'
import { useAuthModal } from '../../../../../pages/auth/hooks'
import { useEmailPromptModal } from '../../../../../pages/auth/hooks/useEmailPromptModal'
import { shouldPromptAtom } from '../../../../../pages/auth/state/emailPromptAtom'
import { useFollowProject } from '../../../../../shared/hooks/graphqlState'
import { Project } from '../../../../../types'

interface FollowComponentProps extends ButtonProps {
  project: Pick<Project, 'id' | 'name' | 'title'>
  hasIcon?: boolean
  useCase?: 'button' | 'icon'
}

export const FollowButton = ({ project, hasIcon, useCase = 'button' }: FollowComponentProps) => {
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

  if (useCase === 'icon') {
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
    <Button
      variant={'secondary'}
      onClick={handleClick}
      isLoading={followLoading || unfollowLoading}
      w="full"
      {...(hasIcon
        ? {
            leftIcon: isFollowed ? <BsFillHeartFill fontSize="14px" /> : <AddIcon />,
          }
        : {})}
    >
      {isFollowed ? t('Followed') : t('Follow')}
    </Button>
  )
}
