import { CheckCircleIcon } from '@chakra-ui/icons'
import { GridItem, HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { useNavigate } from 'react-router'

import { IconButtonComponent } from '../../components/ui'
import { getPath } from '../../constants'
import { useProjectContext } from '../../context'
import {
  LightningAddressConnectionDetails,
  LndConnectionDetailsPrivate,
  Wallet,
} from '../../types/generated/graphql'
import { useNotification } from '../../utils'
import { ProjectCreationWalletConnectionForm } from '../projectCreate'
import { TNodeInput } from '../projectCreate/types'
import { DashboardGridLayout } from './components/DashboardGridLayout'
import { ProjectFundingSettingsLightningAddressView } from './components/ProjectFundingSettingsLightningAddressView'

export const ProjectFundingSettings = () => {
  const { toast } = useNotification()
  const navigate = useNavigate()
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

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
              RUNNING
            </Text>
          </HStack>

          <VStack width="100%" spacing="4px" alignItems="flex-start">
            <Text color="neutral.700" fontSize="10px">
              Hostname or IP address
            </Text>
            <Text wordBreak="break-all" color="neutral.900" fontSize="14px">
              {lndConnectionDetails.hostname}
            </Text>
          </VStack>

          <VStack width="100%" spacing="4px" alignItems="flex-start">
            <Text color="neutral.700" fontSize="10px">
              Public key
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
              Invoice Macaroon
            </Text>
            <Text wordBreak="break-all" color="neutral.900" fontSize="14px">
              {lndConnectionDetails.macaroon}
            </Text>
          </VStack>
          {lndConnectionDetails.tlsCertificate && (
            <VStack width="100%" spacing="4px" alignItems="flex-start">
              <Text color="neutral.700" fontSize="10px">
                TLS certificate
              </Text>
              <Text wordBreak="break-all" color="neutral.900" fontSize="14px">
                {lndConnectionDetails.tlsCertificate}
              </Text>
            </VStack>
          )}
          <VStack width="100%" spacing="4px" alignItems="flex-start">
            <Text color="neutral.700" fontSize="10px">
              gRPC port
            </Text>
            <Text wordBreak="break-all" color="neutral.900" fontSize="14px">
              {lndConnectionDetails.grpcPort}
            </Text>
          </VStack>
        </VStack>
        <Text color="neutral.700" fontSize="10px">
          If you want to change how you receive your funds reach out to
          hello@geyser.fund. We are not currently enabling editing of this
          information for security reasons.
        </Text>
      </>
    )
  }

  return (
    <DashboardGridLayout>
      <GridItem
        colSpan={isLargerThan1280 ? 6 : 2}
        display="flex"
        justifyContent="center"
      >
        <VStack
          spacing="40px"
          width="100%"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {!projectWallet && project && (
            <ProjectCreationWalletConnectionForm
              project={project}
              onNextClick={handleProjectLaunch}
              setNodeInput={setNodeData}
              triggerWallet={tiggerWalletOpen}
            />
          )}
          {projectWallet && renderWalletConnectionDetails()}
        </VStack>
      </GridItem>
      {nodeData && (
        <GridItem
          colSpan={isLargerThan1280 ? 3 : 2}
          display="flex"
          justifyContent="center"
        >
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
                  <Text color="neutral.600">Hostname or IP address</Text>
                  <Text>{nodeData?.hostname}</Text>
                </VStack>
              </VStack>
            )}
          </VStack>
        </GridItem>
      )}
    </DashboardGridLayout>
  )
}
