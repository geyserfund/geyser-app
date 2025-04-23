import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { ProjectStatus } from '@/types/index.ts'

import { getPath } from '../../../../../../../shared/constants'
import { useProjectAtom, useWalletAtom } from '../../../../../hooks/useProjectAtom'

export const FinalizeProjectNotice = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectAtom()
  const { wallet, loading } = useWalletAtom()
  const navigate = useNavigate()

  if (!project || !isProjectOwner) return null

  const handleConnectNodeClick = () => {
    navigate(getPath('launchProjectStrategy', project.id))
  }

  if (project.status !== ProjectStatus.Draft) {
    return null
  }

  if (wallet?.id || loading) return null

  return (
    <CardLayout mobileDense w="full">
      <H3 size="lg">{t('Finalize project')}</H3>

      <Body>
        {t(
          'Your project is not live yet. Head back to the creation flow to finalize your project information and launch it!',
        )}
      </Body>

      <Button variant="solid" colorScheme="primary1" w="full" onClick={handleConnectNodeClick}>
        {t('Finalize project')}
      </Button>
    </CardLayout>
  )
}
