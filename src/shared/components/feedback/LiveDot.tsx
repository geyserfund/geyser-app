import { Box, BoxProps } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginRight: 6,
    animation: '$pulse 1.6s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.55, transform: 'scale(0.9)' },
    '50%': { opacity: 1, transform: 'scale(1.15)' },
  },
})

export const LiveDot = (props: BoxProps) => {
  const styles = useStyles()
  return <Box className={styles.liveDot} background="primary1.9" {...props} />
}
