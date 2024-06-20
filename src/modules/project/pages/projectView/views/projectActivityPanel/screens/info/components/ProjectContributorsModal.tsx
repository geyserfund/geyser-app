import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'

import { Modal } from '../../../../../../../../../components/layouts'
import { useModal } from '../../../../../../../../../hooks'
import { GrantApplicantContributor, Project, ProjectFragment } from '../../../../../../../../../types'
import { ProjectContributorsList } from './ProjectContributorsList'

export const useProjectContributorsModal = () => {
  return useModal()
}

type Props = ReturnType<typeof useProjectContributorsModal> & {
  project?: ProjectFragment | Project
  grantApplicantContributors?: GrantApplicantContributor[]
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
    overflowX: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
})

export const ProjectContributorsModal = ({ project, grantApplicantContributors, ...props }: Props) => {
  const classes = useProjectLayoutStyles()
  const { t } = useTranslation()

  if (!project) {
    return null
  }

  return (
    <Modal title={t('Logged in Contributors')} size={'sm'} {...props}>
      <Box className={classes.detailsContainer}>
        <ProjectContributorsList project={project} />
      </Box>
    </Modal>
  )
}
