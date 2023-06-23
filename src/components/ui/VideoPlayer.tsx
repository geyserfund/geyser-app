import { Box } from '@chakra-ui/react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'

export const VideoPlayer = (props: ReactPlayerProps) => {
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
        style={{ position: 'absolute', top: 0, left: 0 }}
        {...props}
      />
    </Box>
  )
}
