import { Button, IconButton, Link, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFacebook } from 'react-icons/bs'

import { getAuthEndPoint } from '../../config/domain'
import { useAuthContext } from '../../context'
import { useMeQuery } from '../../types'
import { hasFacebookAccount, useNotification } from '../../utils'
import { ConnectWithButtonProps } from './type'

export const ConnectWithFacebook = ({
  onClose,
  isIconOnly,
  ...rest
}: ConnectWithButtonProps) => {
  const { t } = useTranslation()
  const { login } = useAuthContext()
  const { toast } = useNotification()

  const authServiceEndpoint = getAuthEndPoint()

  const [canLogin, setCanLogin] = useState(true)

  const { stopPolling } = useMeQuery({
    onCompleted(data) {
      if (data && data.me) {
        const hasFacebook = hasFacebookAccount(data.me)

        if (hasFacebook) {
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

  useEffect(() => {
    const initalizeLogin = async () => {
      try {
        const response = await fetch(`${authServiceEndpoint}/auth-token`, {
          credentials: 'include',
          redirect: 'follow',
        })

        if (response.status >= 200 && response.status < 400) {
          setCanLogin(true)
        } else {
          setCanLogin(false)
        }
      } catch (err) {
        setCanLogin(false)
      }
    }

    initalizeLogin()
  }, [])

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
        icon: <BsFacebook fontSize={'20px'} />,
      }
    : {
        leftIcon: <BsFacebook fontSize={'20px'} />,
      }

  return (
    <Tooltip label={!canLogin && t('Please refresh the page and try again.')}>
      <ButtonComponent
        aria-label="Connect with Facebook"
        as={Link}
        href={`${authServiceEndpoint}/facebook?nextPath=/auth/facebook`}
        isExternal
        w="100%"
        size="sm"
        variant={'secondaryNeutral'}
        fontWeight={600}
        color={'social.facebook'}
        onClick={handleClick}
        isDisabled={!canLogin}
        pointerEvents={!canLogin ? 'none' : undefined}
        {...buttonProps}
        {...rest}
      >
        Facebook
      </ButtonComponent>
    </Tooltip>
  )
}
