import { Box, Button, IconButton, Link, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getAuthEndPoint } from '../../config/domain'
import { useAuthContext } from '../../context'
import { useMeQuery } from '../../types'
import { useNotification } from '../../utils'
import { SocialConfig } from './SocialConfig'
import { ConnectWithButtonProps } from './type'
import { useAuthToken, useCanLogin } from './useAuthToken'

export const ConnectWithSocial = ({
  onClose,
  isIconOnly,
  accountType,
  ...rest
}: ConnectWithButtonProps) => {
  const { t } = useTranslation()
  const { login } = useAuthContext()
  const { toast } = useNotification()

  useAuthToken()

  const canLogin = useCanLogin()
  const authServiceEndpoint = getAuthEndPoint()

  const { hasSocialAccount, icon, label } = SocialConfig[accountType]

  const { stopPolling } = useMeQuery({
    onCompleted(data) {
      if (data && data.me) {
        const hasAccount = hasSocialAccount(data.me)

        if (hasAccount) {
          if (onClose !== undefined) {
            onClose()
          }

          stopPolling()
          login(data.me)
        }
      }
    },
    fetchPolicy: 'network-only',
    pollInterval: 1000,
  })

  const [pollAuthStatus, setPollAuthStatus] = useState(false)

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
  }, [pollAuthStatus])

  const handleClick = async () => {
    if (canLogin) {
      setPollAuthStatus(true)
    }
  }

  const handleToastError = (reason?: string) => {
    toast({
      title: 'Something went wrong.',
      description: `${t('The authentication request failed.')} ${reason}.`,
      status: 'error',
    })
  }

  const ButtonComponent = isIconOnly ? IconButton : Button

  const buttonProps = isIconOnly
    ? {
        icon,
      }
    : {
        leftIcon: icon,
      }

  const isDisabled = !canLogin

  return (
    <Tooltip label={!canLogin && t('Please refresh the page and try again.')}>
      <ButtonComponent
        aria-label={`Connect with ${accountType}`}
        as={Link}
        variant="login"
        href={`${authServiceEndpoint}/${accountType}?nextPath=/auth/${accountType}`}
        isExternal
        maxWidth={isIconOnly ? '40px' : '100%'}
        color={`social.${accountType}`}
        onClick={handleClick}
        isDisabled={isDisabled}
        pointerEvents={isDisabled ? 'none' : undefined}
        {...buttonProps}
        {...rest}
      >
        {!isIconOnly && (
          <Box as="span" color="neutral.900">
            {t(label)}
          </Box>
        )}
      </ButtonComponent>
    </Tooltip>
  )
}
