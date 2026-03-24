import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { useInitialColorModeEffect } from '@/shared/hooks/utils/useInitialColorMode.tsx'

import { useGuardianProjectRewards } from '../hooks/useGuardianProjectRewards.tsx'

/** Loads Guardians data and renders the standard platform shell for nested Guardians pages. */
export const GuardiansLayout = () => {
  useInitialColorModeEffect()
  useGuardianProjectRewards()

  return (
    <Box w="full" bg="utils.pbg">
      <Outlet />
    </Box>
  )
}
