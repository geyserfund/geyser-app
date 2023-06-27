import { CheckCircleIcon } from '@chakra-ui/icons'
import { GridItem, HStack, Text, VStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiPencil } from 'react-icons/bi'
import { useNavigate } from 'react-router'

import { IconButtonComponent } from '../../../components/ui'
import { getPath } from '../../../constants'
import { useProjectContext } from '../../../context'
import {
  LightningAddressConnectionDetails,
  LndConnectionDetailsPrivate,
  Wallet,
} from '../../../types'
import { useNotification } from '../../../utils'
import { ProjectCreationWalletConnectionForm } from '../../projectCreate'
import { TNodeInput } from '../../projectCreate/types'
import { ProjectFundingSettingsLightningAddressView } from '../components/ProjectFundingSettingsLightningAddressView'

export const ProjectWallet = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const navigate = useNavigate()

  const { project } = useProjectContext()

  const [nodeData, setNodeData] = useState<TNodeInput>()
  const [tiggerWalletOpen, setTriggerWalletOpen] = useState(false)

  const projectWallet: Wallet | undefined = useMemo(() => {
    return project?.wallets && project.wallets[0]
  }, [project])

  const handleProjectLaunch = async () => {
    if (!project) {
      return
    }

    navigate(getPath('project', project.name))
    toast({
      status: 'success',
      title: 'Wallet updated!',
      description: 'Project is now active',
    })
  }

  const renderWalletConnectionDetails = () => {
    const { connectionDetails } = projectWallet || {}

    if (!connectionDetails) {
      return null
    }

    if (connectionDetails.__typename === 'LightningAddressConnectionDetails') {
      const lightningConnectionDetails =
        connectionDetails as LightningAddressConnectionDetails

      return (
        <GridItem colSpan={8} display="flex" justifyContent="center">
          <ProjectFundingSettingsLightningAddressView
            lightningAddress={lightningConnectionDetails.lightningAddress}
          />
        </GridItem>
      )
    }

    const lndConnectionDetails =
      connectionDetails as LndConnectionDetailsPrivate

    return (
      <>
        <VStack
          width="100%"
          border="1px solid"
          borderColor="neutral.400"
          borderRadius="4px"
          alignItems="flex-start"
          padding="10px"
          spacing="10px"
        >
          <HStack width="100%" justifyContent="space-between">
            <Text fontWeight={500}>{projectWallet?.name}</Text>
          </HStack>
          <HStack width="100%">
            <CheckCircleIcon color="primary.800" fontSize="12px" />
            <Text color="primary.800" fontSize="12px">
              {t('RUNNING')}
            </Text>
          </HStack>

          <VStack width="100%" spacing="4px" alignItems="flex-start">
            <Text color="neutral.700" fontSize="10px">
              {t('Hostname or IP address')}
            </Text>
            <Text wordBreak="break-all" color="neutral.900" fontSize="14px">
              {lndConnectionDetails.hostname}
            </Text>
          </VStack>

          <VStack width="100%" spacing="4px" alignItems="flex-start">
            <Text color="neutral.700" fontSize="10px">
              {t('Public key')}
            </Text>
            <Text wordBreak="break-all" color="neutral.900" fontSize="14px">
              {lndConnectionDetails.pubkey}
            </Text>
          </VStack>
          <VStack
            width="100%"
            spacing="4px"
            alignItems="flex-start"
            flexWrap="wrap"
          >
            <Text color="neutral.700" fontSize="10px">
              {t('Invoice Macaroon')}
            </Text>
            <Text wordBreak="break-all" color="neutral.900" fontSize="14px">
              {lndConnectionDetails.macaroon}
            </Text>
          </VStack>
          {lndConnectionDetails.tlsCertificate && (
            <VStack width="100%" spacing="4px" alignItems="flex-start">
              <Text color="neutral.700" fontSize="10px">
                {t('TLS certificate')}
              </Text>
              <Text wordBreak="break-all" color="neutral.900" fontSize="14px">
                {lndConnectionDetails.tlsCertificate}
              </Text>
            </VStack>
          )}
          <VStack width="100%" spacing="4px" alignItems="flex-start">
            <Text color="neutral.700" fontSize="10px">
              {t('gRPC port')}
            </Text>
            <Text wordBreak="break-all" color="neutral.900" fontSize="14px">
              {lndConnectionDetails.grpcPort}
            </Text>
          </VStack>
        </VStack>
        <Text color="neutral.700" fontSize="10px">
          {t(
            'If you want to change how you receive your funds reach out to hello@geyser.fund. We are not currently enabling editing of this information for security reasons.',
          )}
        </Text>
      </>
    )
  }

  return (
    <VStack>
      {!projectWallet && project && (
        <ProjectCreationWalletConnectionForm
          project={project}
          onNextClick={handleProjectLaunch}
          setNodeInput={setNodeData}
          triggerWallet={tiggerWalletOpen}
        />
      )}
      {projectWallet && renderWalletConnectionDetails()}

      {nodeData && (
        <VStack
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="370px"
          width="100%"
          spacing="10px"
          paddingY="20px"
        >
          {nodeData.name && (
            <VStack
              width="100%"
              border="1px solid"
              borderColor="neutral.300"
              borderRadius="4px"
              alignItems="flex-start"
              padding="10px"
            >
              <HStack width="100%" justifyContent="space-between">
                <Text fontWeight={500}>{nodeData.name}</Text>
                <IconButtonComponent
                  aria-label="edit-node"
                  icon={<BiPencil />}
                  onClick={() => setTriggerWalletOpen(true)}
                />
              </HStack>

              <VStack width="100%" alignItems="flex-start">
                <Text color="neutral.900">{t('Hostname or IP address')}</Text>
                <Text>{nodeData?.hostname}</Text>
              </VStack>
            </VStack>
          )}
        </VStack>
      )}
    </VStack>
  )
}
