import { VStack } from '@chakra-ui/layout'

import { ActivityBrief } from './ActivityBrief'
import { Box } from '@chakra-ui/react'
import { useProjectContext } from '../../../../../context'
import classNames from 'classnames'
import { useStyles } from '../../styles'
import { useMobileMode } from '../../../../../utils'
import { InfoScreenRewards } from './InfoScreenRewards'

export const InfoScreen = () => {

  const isMobile = useMobileMode()
  const { project } = useProjectContext()
  const classes = useStyles({ isMobile })

  if(!project) {
    return null;
  }

  return (
    <VStack
      py={{ base: '0px', lg: '10px' }}
      spacing={4}
      width="100%"
      height="100%"
      position="relative"
    >
      <Box
        className={classNames(classes.mainPanel)}
        style={{width: '100%'}}
      >
        <ActivityBrief px={{ base: '10px', lg: '20px' }} />
      </Box>
      <VStack px={6} width="100%">
        <InfoScreenRewards />
      </VStack>
    </VStack>
  )
}