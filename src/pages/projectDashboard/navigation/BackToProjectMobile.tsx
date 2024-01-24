import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { getPath } from '../../../constants'
import { ProjectFragment } from '../../../types'

export const BackToProjectMobile = ({
  project,
  ...rest
}: {
  project?: Pick<ProjectFragment, 'name'> | null
} & ButtonProps) => {
  const { t } = useTranslation()
  return (
    <Button
      variant="secondary"
      w="full"
      type="submit"
      leftIcon={<BsArrowLeft />}
      as={Link}
      to={getPath('project', project?.name)}
      {...rest}
    >
      {t('Back to project')}
    </Button>
  )
}
