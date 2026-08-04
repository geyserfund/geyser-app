import { Center, Spinner, VStack } from '@chakra-ui/react'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { getAuthEndPoint } from '@/config/domain.ts'
import { defaultUser } from '@/context/auth.tsx'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'
import { useNotification } from '@/utils/index.ts'

import { authUserAtom, followedProjectsAtom } from '../state/index.ts'

const authServiceEndPoint = getAuthEndPoint()

/** Handles user LoggingOut and redirects back to previous page */
export const SignOut = () => {
  const [user, setUser] = useAtom(authUserAtom)
  const setFollowedProjects = useSetAtom(followedProjectsAtom)
  const setAccountPassword = useSetAtom(accountPasswordAtom)

  const navigate = useNavigate()
  const toast = useNotification()

  useEffect(() => {
    let isActive = true
    let logoutTimeout: ReturnType<typeof setTimeout> | undefined

    const logout = async () => {
      try {
        await fetch(`${authServiceEndPoint}/logout`, {
          credentials: 'include',
        })
        if (!isActive) return

        toast.warning({
          title: "You've been logged out.",
          description: 'Please login again.',
        })
        logoutTimeout = setTimeout(() => {
          if (!isActive) return

          setUser({ ...defaultUser })
          setFollowedProjects([])
          setAccountPassword(null)
          navigate(-1)
        }, 1000)
      } catch {
        if (!isActive) return

        toast.warning({
          title: 'Failed to log out properly.',
          description: 'Please clear your cookies.',
        })
      }
    }

    if (user.id) {
      logout()
    }

    return () => {
      isActive = false
      if (logoutTimeout) {
        clearTimeout(logoutTimeout)
      }
    }
  }, [setUser, setFollowedProjects, setAccountPassword, navigate, toast, user])

  return (
    <Center h="100vh">
      <VStack spacing={4}>
        <Spinner size="xl" />
      </VStack>
    </Center>
  )
}
