import { Center, Spinner, VStack } from '@chakra-ui/react'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { getAuthEndPoint } from '@/config/domain.ts'
import { defaultUser } from '@/context/auth.tsx'
import { useNotification } from '@/utils/index.ts'

import { authUserAtom, followedProjectsAtom } from '../state/index.ts'

const authServiceEndPoint = getAuthEndPoint()

/** Handles user LoggingOut and redirects back to previous page */
export const SignOut = () => {
  const [user, setUser] = useAtom(authUserAtom)
  const setFollowedProjects = useSetAtom(followedProjectsAtom)

  const navigate = useNavigate()
  const toast = useNotification()

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch(`${authServiceEndPoint}/logout`, {
          credentials: 'include',
        })
        toast.warning({
          title: "You've been logged out.",
          description: 'Please login again.',
        })
        setTimeout(() => {
          setUser({ ...defaultUser })
          setFollowedProjects([])
          navigate(-1)
        }, 1000)
      } catch {
        toast.warning({
          title: 'Failed to log out properly.',
          description: 'Please clear your cookies.',
        })
      }
    }

    if (user.id) {
      logout()
    }

    // Navigate back to the previous page
  }, [setUser, setFollowedProjects, navigate, toast, user])

  return (
    <Center h="100vh">
      <VStack spacing={4}>
        <Spinner size="xl" />
      </VStack>
    </Center>
  )
}
