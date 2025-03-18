import { Button, IconButton, Link, Tooltip } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getAuthEndPoint } from '../../config/domain'
import { useAuthContext } from '../../context'
import { useMeLazyQuery } from '../../types'
import { useCustomTheme, useNotification } from '../../utils'
import { SocialConfig } from './SocialConfig'
import { loginMethodAtom } from './state'
import { ConnectWithButtonProps } from './type'
import { useAuthToken, useCanLogin } from './useAuthToken'

export const TWITTER_AUTH_ATTEMPT_KEY = 'twitterAuthAttempt'
export const TWITTER_AUTH_ATTEMPT_MESSAGE_TIME_MILLIS = 1000 * 60 * 15 // 15 minutes

export const ConnectWithSocial = ({ onClose, isIconOnly, accountType, ...rest }: ConnectWithButtonProps) => {
  const { t } = useTranslation()
  const { login } = useAuthContext()
  const { toast } = useNotification()

  useAuthToken()

  const { colors } = useCustomTheme()

  const canLogin = useCanLogin()
  const setLoginMethod = useSetAtom(loginMethodAtom)
  const authServiceEndpoint = getAuthEndPoint()

  const { hasSocialAccount, icon: Icon, label } = SocialConfig[accountType]

  const [getMe, { stopPolling, startPolling }] = useMeLazyQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      if (data && data.me) {
        const hasAccount = hasSocialAccount(data.me)
        if (hasAccount) {
          if (onClose !== undefined) {
            onClose()
          }

          stopPolling()
          login(data.me)
          setLoginMethod(accountType)
        }
      }
    },
  })

  const [pollAuthStatus, setPollAuthStatus] = useState(false)

  const handleToastError = useCallback(
    (reason?: string) => {
      toast({
        title: t('Something went wrong.'),
        description: `${t('The authentication request failed.')} ${reason}.`,
        status: 'error',
      })
    },
    [toast, t],
  )

  useEffect(() => {
    if (pollAuthStatus) {
      const id = setInterval(async () => {
        let statusRes
        try {
          statusRes = await fetch(`${authServiceEndpoint}/status`, {
            credentials: 'include',
            redirect: 'follow',
          })
        } catch (error) {
          stopPolling()
          setPollAuthStatus(false)
          handleToastError((error as Error).message)
        }

        if (statusRes && statusRes.status === 200) {
          const { status: authStatus, reason } = await statusRes.json()
          if (authStatus === 'success') {
            setPollAuthStatus(false)
          } else if (authStatus === 'failed') {
            if (stopPolling) {
              stopPolling()
            }

            setPollAuthStatus(false)
            handleToastError(reason)
          }
        }
      }, 1000)

      return () => clearInterval(id)
    }
  }, [pollAuthStatus, stopPolling, authServiceEndpoint, handleToastError])

  const handleClick = async () => {
    if (canLogin) {
      setPollAuthStatus(true)
      getMe()
      startPolling(1000)
    }

    localStorage.setItem(TWITTER_AUTH_ATTEMPT_KEY, DateTime.now().toMillis().toString())
  }

  const ButtonComponent = isIconOnly ? IconButton : Button

  const buttonProps = isIconOnly
    ? {
        icon: <Icon color={colors.social[accountType]} fontSize="20px" boxSize="20px" />,
      }
    : {
        leftIcon: <Icon color={colors.social[accountType]} fontSize="20px" boxSize="20px" />,
      }

  const isDisabled = !canLogin

  return (
    <Tooltip label={!canLogin && t('Please refresh the page and try again.')}>
      <ButtonComponent
        aria-label={`Connect with ${accountType}`}
        as={Link}
        size="lg"
        variant="outline"
        colorScheme="neutral1"
        href={`${authServiceEndpoint}/${accountType}?nextPath=/auth/${accountType}`}
        isExternal
        onClick={handleClick}
        isDisabled={isDisabled}
        pointerEvents={isDisabled ? 'none' : undefined}
        {...buttonProps}
        {...rest}
      >
        {!isIconOnly && t(label)}
      </ButtonComponent>
    </Tooltip>
  )
}
