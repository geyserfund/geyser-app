import { Button, ButtonProps, Link, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsTwitter } from 'react-icons/bs'

import { AUTH_SERVICE_ENDPOINT } from '../../constants'
import { useAuthContext } from '../../context'
import { useMeLazyQuery } from '../../types'
import { hasTwitterAccount, useNotification } from '../../utils'

interface ConnectWithTwitterProps extends ButtonProps {
  onClose?: () => void
}

export const ConnectWithTwitter = ({
  onClose,
  ...rest
}: ConnectWithTwitterProps) => {
  const { t } = useTranslation()
  const { login } = useAuthContext()
  const { toast } = useNotification()

  const [canLogin, setCanLogin] = useState(true)

  const [queryCurrentUser, { stopPolling }] = useMeLazyQuery({
    onCompleted(data) {
      if (data && data.me) {
        const hasTwitter = hasTwitterAccount(data.me)

        if (hasTwitter) {
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
          statusRes = await fetch(`${AUTH_SERVICE_ENDPOINT}/status`, {
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

  useEffect(() => {
    const initalizeLogin = async () => {
      try {
        const response = await fetch(`${AUTH_SERVICE_ENDPOINT}/auth-token`, {
          credentials: 'include',
          redirect: 'follow',
        })

        if (response.status >= 200 && response.status < 400) {
          setCanLogin(true)
          queryCurrentUser()
        } else {
          setCanLogin(false)
        }
      } catch (err) {
        setCanLogin(false)
      }
    }

    initalizeLogin()
  }, [])

  const handleToastError = (reason?: string) => {
    toast({
      title: 'Something went wrong.',
      description: `${t('The authentication request failed.')} ${reason}.`,
      status: 'error',
    })
  }

  return (
    <Tooltip label={!canLogin && t('Please refresh the page and try again.')}>
      <Button
        as={Link}
        href={`${AUTH_SERVICE_ENDPOINT}/twitter?nextPath=/auth/twitter`}
        isExternal
        w="100%"
        backgroundColor="social.twitter"
        leftIcon={<BsTwitter />}
        color="white"
        _hover={{
          backgroundColor: 'social.twitterDark',
          textDecoration: 'none',
        }}
        onClick={handleClick}
        isDisabled={!canLogin}
        textDecoration={'none'}
        {...rest}
      >
        Twitter
      </Button>
    </Tooltip>
  )
}
