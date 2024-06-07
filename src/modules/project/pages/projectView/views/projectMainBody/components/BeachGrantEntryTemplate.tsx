import { AddIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../../../../components/layouts'
import { Body1 } from '../../../../../../../components/typography'
import { getPath } from '../../../../../../../constants'
import { standardPadding } from '../../../../../../../styles'
import { useGrantQuery } from '../../../../../../../types'
import { useProjectContext } from '../../../../../context'

const BITCOIN_BEACH_GRANT_ID = 8

export const BeachGrantEntryTemplate = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectContext()

  const { data } = useGrantQuery({
    variables: {
      input: {
        where: {
          id: BITCOIN_BEACH_GRANT_ID,
        },
      },
    },
  })

  const grantApplicants = data?.grant.applicants.map((applicant) => applicant.project)

  if (!isProjectOwner || !project || !grantApplicants?.some((applicant) => applicant.id === project?.id)) return null

  return (
    <Link
      to={getPath('projectEntryCreation', project.name)}
      state={{ grantId: BITCOIN_BEACH_GRANT_ID }}
      style={{ width: '100%' }}
    >
      <CardLayout
        w="full"
        backgroundColor="neutral.200"
        direction="row"
        spacing={4}
        borderRadius={'8px'}
        alignItems="center"
        padding={standardPadding}
      >
        <AddIcon />
        <Body1 bold>{t('Bitcoin Beach Grant Application Template')}</Body1>
      </CardLayout>
    </Link>
  )
}
