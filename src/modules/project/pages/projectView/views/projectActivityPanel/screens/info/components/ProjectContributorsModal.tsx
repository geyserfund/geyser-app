import { Box } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'

import { Modal } from '../../../../../../../../../components/layouts'
import { useModal } from '../../../../../../../../../hooks'
import { useProjectContext } from '../../../../../../../context'
import { ProjectContributorsList } from './ProjectContributorsList'

export const useProjectContributorsModal = () => {
  return useModal()
}

type Props = ReturnType<typeof useProjectContributorsModal>

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

export const ProjectContributorsModal = ({ ...props }: Props) => {
  const classes = useProjectLayoutStyles()

  const { project } = useProjectContext()

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
