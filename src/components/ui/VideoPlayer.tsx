import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'

export const VideoPlayer = (props: ReactPlayerProps) => {
  const [isReady, setReady] = useState(false)

  return (
    <Box
      position="relative"
      sx={{ '& iframe': { borderRadius: '8px' } }}
      pt="56.25%"
    >
      {/* 56.25% makes an aspect ratio of 16:9 */}
      <ReactPlayer
        controls
        width="100%"
        height="100%"
        onReady={() => setReady(true)}
        style={{
          visibility: isReady ? 'visible' : 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        {...props}
      />
      <Box
        bg="neutral.200"
        width="100%"
        height="100%"
        sx={{
          visibility: isReady ? 'hidden' : 'visible',
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '8px',
        }}
      />
    </Box>
  )
}
