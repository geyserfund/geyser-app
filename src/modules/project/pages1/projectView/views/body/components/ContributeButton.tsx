import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getPath } from '@/shared/constants'

// import { useNavigate } from 'react-router-dom'
import { isActive } from '../../../../../../../utils'
import { useProjectAtom } from '../../../../../hooks/useProjectAtom'

export const ContributeButton = (props: ButtonProps) => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

  if (!project) {
    return null
  }

  const isFundingDisabled = !isActive(project.status)

  return (
    <Button
      size="lg"
      variant="solid"
      colorScheme="primary1"
      isDisabled={isFundingDisabled}
      as={Link}
      to={getPath('projectFunding', project.name)}
      {...props}
    >
      {t('Contribute')}
    </Button>
  )
}
