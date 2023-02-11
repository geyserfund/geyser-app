import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'

export const TwitterSuccess = () => {
  useEffect(() => {
    window.close()
  })

  return <Box>something</Box>
}
