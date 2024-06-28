import { Box } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'

import { useModal } from '../../../../../../../../../hooks'
import { Modal } from '../../../../../../../../../shared/components/layouts'
import { ProjectContributorsList } from '../../../../../../../pages/projectView/views/projectActivityPanel/screens/info/components/ProjectContributorsList'
import { ProjectState } from '../../../../../../../state/projectAtom'

export const useProjectContributorsModal = () => {
  return useModal()
}

type Props = ReturnType<typeof useProjectContributorsModal> & {
  project?: ProjectState
}

type Rules = string

type Styles = {
  isMobile?: boolean
  inView: boolean
  fadeStarted?: boolean
}

export const useProjectLayoutStyles = createUseStyles<Rules, Styles>({
  detailsContainer: {
    height: '80vh',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    marginTop: '30px',
    overflowX: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
})

export const ProjectContributorsModal = ({ project, ...props }: Props) => {
  const classes = useProjectLayoutStyles()

  if (!project) {
    return null
  }

  return (
    <Modal title={''} size={'sm'} {...props}>
      <Box className={classes.detailsContainer}>
        <ProjectContributorsList project={project} />
      </Box>
    </Modal>
  )
}
