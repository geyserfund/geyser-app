import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'

import { Modal } from '@/shared/components/layouts'

import { useModal } from '../../../../../../../../../shared/hooks'
import { GrantApplicantContributor } from '../../../../../../../../../types'
import { ProjectGrantApplicantContributorsList } from './ProjectGrantApplicantContributorsList'

export const useProjectGrantApplicantContributorsModal = () => {
  return useModal()
}

type Props = ReturnType<typeof useProjectGrantApplicantContributorsModal> & {
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

export const ProjectGrantApplicantContributorsModal = ({ grantApplicantContributors, ...props }: Props) => {
  const classes = useProjectLayoutStyles()
  const { t } = useTranslation()

  if (!grantApplicantContributors) {
    return null
  }

  return (
    <Modal title={t('Logged in Contributors')} size={'sm'} {...props}>
      <Box className={classes.detailsContainer}>
        <ProjectGrantApplicantContributorsList grantApplicantContributors={grantApplicantContributors} />
      </Box>
    </Modal>
  )
}
