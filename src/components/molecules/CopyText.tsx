import { Box, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'

export const CopyText = ({ children }: { children: React.ReactNode }) => {
  const [copy, setCopy] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`${children}`)

    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }

  return (
    <Tooltip label={copy ? 'copied' : 'copy'}>
      <Box
        as="span"
        color="primary.500"
        textDecoration="underline"
        onClick={handleCopy}
        _hover={{ cursor: 'pointer' }}
      >
        {children}
      </Box>
    </Tooltip>
  )
}
