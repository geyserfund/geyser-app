import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'

export const ExternalAuthSuccess = () => {
  useEffect(() => {
    window.close()
  })

  return <Box>...</Box>
}
