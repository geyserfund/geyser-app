import { useAuthContext } from '@/context'

/** General project creation is limited to Field Partners. LABIF applications use their own entry point. */
export const useCanStartProject = () => {
  const { isLoggedIn, user } = useAuthContext()

  return isLoggedIn && Boolean(user.isFieldPartner)
}
