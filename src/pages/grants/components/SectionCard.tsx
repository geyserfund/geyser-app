import { Box, BoxProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  box: {
    border: '2px solid',
    borderColor: 'neutral.200',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
})

export const SectionCard = (props: PropsWithChildren<BoxProps>) => {
  const classes = useStyles()
  return (
    <Box
      my={4}
      className={classes.box}
      display="flex"
      flexDir="column"
      width="100%"
      {...props}
    />
  )
}
