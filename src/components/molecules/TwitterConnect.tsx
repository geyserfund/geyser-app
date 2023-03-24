import { useLazyQuery } from '@apollo/client'
import Icon from '@chakra-ui/icon'
import { useEffect, useState } from 'react'
import { SiTwitter } from 'react-icons/si'

import { AUTH_SERVICE_ENDPOINT } from '../../constants'
import { useAuthContext } from '../../context'
import { ME } from '../../graphql'
import { User } from '../../types/generated/graphql'
import { hasTwitterAccount, useNotification } from '../../utils'
import { ButtonComponent } from '../ui'

type Props = {
  onClose?: () => void
}

export const TwitterConnect = ({ onClose }: Props) => {
  const { login } = useAuthContext()
  const { toast } = useNotification()

  const [queryCurrentUser, { stopPolling }] = useLazyQuery(ME, {
    onCompleted(data: { me: User }) {
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
    try {
      const response = await fetch(`${AUTH_SERVICE_ENDPOINT}/auth-token`, {
        credentials: 'include',
        redirect: 'follow',
      })

      if (response.status >= 200 && response.status < 400) {
        setPollAuthStatus(true)
        queryCurrentUser()
        window.open(
          `${AUTH_SERVICE_ENDPOINT}/twitter?nextPath=/auth/twitter`,
          '_blank',
          'noopener,noreferrer',
        )
      } else {
        handleToastError('could not get authentication token.')
      }
    } catch (err) {
      handleToastError()
    }
  }

  const handleToastError = (reason?: string) => {
    toast({
      title: 'Something went wrong',
      description: `The authentication request failed. ${reason}.`,
      status: 'error',
    })
  }

  return (
    <ButtonComponent
      w="full"
      primary
      standard
      leftIcon={<Icon as={SiTwitter} />}
      onClick={handleClick}
    >
      Twitter
    </ButtonComponent>
  )
}
