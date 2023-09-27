import { Box } from '@chakra-ui/layout'
import { HStack } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'
import { useParams } from 'react-router'

import { ProjectProvider } from '../../context'
import { useMobileMode } from '../../utils'
import { ProjectContainer } from './ProjectContainer'
import { ProjectNavigation } from './projectNavigation/components/ProjectNavigation'
import { useSideNavbarAtom } from './projectNavigation/sideNavAtom'
import {
  slideBackInRightBody,
  slideInLeftProjectSidebar,
  slideOutRightBody,
} from './projectNavigation/styles'

const useStyles = createUseStyles({
  ...slideInLeftProjectSidebar,
  ...slideOutRightBody,
  ...slideBackInRightBody,
  isLeft: {
    // opacity: 0,
  },
  isRight: {
    // opacity: 1,
  },
})

export const ProjectView = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const isMobile = useMobileMode()
  const [sideNav] = useSideNavbarAtom()
  const classes = useStyles()
  return (
    <ProjectProvider projectId={projectId || ''}>
      <HStack
        display="flex"
        justifyContent="center"
        alignItems="start"
        height="100%"
        // width={sideNav.open ? 'calc(100% + 200px)' : '100%'}
        transition="width 2s linear"
        position="relative"
        backgroundColor={'neutral.50'}
      >
        {isMobile && (
          <HStack
            className={
              sideNav.open
                ? `${classes.slideInLeftProjectSidebar} ${classes.isRight}`
                : classes.isLeft
            }
            zIndex={11}
            position="absolute"
            top={0}
            left={0}
            width={sideNav.open ? '200px' : 0}
            height="100%"
            backgroundColor={'neutral.0'}
            alignItems="start"
            overflow="hidden"
          >
            <ProjectNavigation showLabel />
          </HStack>
        )}
        <Box
          className={
            sideNav.open && isMobile
              ? classes.slideOutRightBody
              : classes.slideBackInRightBody
          }
          width="100%"
          height="100%"
          display="flex"
          overflow="hidden"
          position="relative"
          bg={{ base: 'neutral.0', lg: 'neutral.50' }}
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <ProjectContainer />
        </Box>
      </HStack>
    </ProjectProvider>
  )
}
