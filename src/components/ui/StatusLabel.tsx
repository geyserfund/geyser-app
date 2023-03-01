import { Box, BoxProps } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'

import { colors } from '../../styles'

const useStyles = createUseStyles({
  box: {
    borderRadius: '8px',
    backgroundColor: colors.primary100,
    textAlign: 'center',
    color: colors.neutral900,
    fontSize: '14px',
    fontWeight: 500,
  },
})

export const StatusLabel = ({ ...props }: BoxProps) => {
  const { box } = useStyles()
  return <Box p={2} className={box} {...props} />
}
