import { VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { Body2 } from '../../../components/typography'
import { getPath, WalletConnectDetails } from '../../../constants'
import { useAuthContext, useProjectContext } from '../../../context'
import { Wallet } from '../../../types'
import { useNotification } from '../../../utils'
import { ProjectCreationWalletConnectionForm } from '../../projectCreate'
import { ConnectionOption } from '../../projectCreate/ProjectCreationWalletConnectionForm'

export const ProjectWallet = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const navigate = useNavigate()

  const { user } = useAuthContext()

  const { project, refetch } = useProjectContext()

  const projectWallet: Wallet | undefined = useMemo(() => {
    return project?.wallets && project.wallets[0]
  }, [project])
  const isEdit = Boolean(projectWallet)

  const handleProjectLaunch = async () => {
    if (!project || isEdit) {
      refetch()
      return
    }

    navigate(getPath('project', project.name))
    toast({
      status: 'success',
      title: 'Wallet updated!',
      description: 'Project is now active',
    })
  }

  return (
    <VStack>
      <Body2 color="neutral.600">
        {t(
          'The project wallet can only be changed by the project creator with a verified email, for security reasons. You can verify your email in the Profile page’s Settings.',
        )}
      </Body2>
      {project && (
        <ProjectCreationWalletConnectionForm
          readOnly={!user.isEmailVerified}
          isEdit={isEdit}
          project={project}
          onNextClick={handleProjectLaunch}
          defaultConnectionOption={
            projectWallet
              ? projectWallet.connectionDetails.__typename ===
                WalletConnectDetails.LightningAddressConnectionDetails
                ? ConnectionOption.LIGHTNING_ADDRESS
                : ConnectionOption.PERSONAL_NODE
              : undefined
          }
        />
      )}
    </VStack>
  )
}
