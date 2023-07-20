import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { getPath } from '../../../constants'
import { ProjectFragment } from '../../../types'

export const BackToProjectMobile = ({
  project,
}: {
  project?: Pick<ProjectFragment, 'name'> | null
}) => {
  const { t } = useTranslation()
  return (
    <Button
      variant="secondary"
      size="sm"
      w="full"
      type="submit"
      leftIcon={<BsArrowLeft />}
      as={Link}
      to={getPath('project', project?.name)}
    >
      {t('Back to project')}
    </Button>
  )
}
