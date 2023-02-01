import { CheckCircleIcon } from '@chakra-ui/icons'
import { GridItem, HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { useNavigate } from 'react-router'

import { IconButtonComponent } from '../../components/ui'
import { getPath } from '../../constants'
import { useProjectContext } from '../../context'
import { colors } from '../../styles'
import {
  LightningAddressConnectionDetails,
  LndConnectionDetailsPrivate,
  Wallet,
} from '../../types/generated/graphql'
import { useNotification } from '../../utils'
import { ProjectCreationWalletConnectionForm } from '../creation/projectCreate'
import { TNodeInput } from '../creation/projectCreate/types'
import { ProjectFundingSettingsLightningAddressView } from './ProjectFundingSettingsLightningAddressView'

export const ProjectFundingSettings = () => {
  const { toast } = useNotification()
  const navigate = useNavigate()
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  const { project } = useProjectContext()

  const [nodeData, setNodeData] = useState<TNodeInput>()
  const [tiggerWalletOpen, setTriggerWalletOpen] = useState(false)

  const projectWallet: Wallet | undefined = useMemo(() => {
    return project.wallets && project.wallets[0]
  }, [project.wallets])

  const handleProjectLaunch = async () => {
    navigate(getPath('project', project.name))
    toast({
      status: 'success',
      title: 'Wallet updated!',
      description: 'Project is now active',
    })
  }

  const renderWalletConnectionDetails = () => {
    const { connectionDetails } = projectWallet
    let castedConnectionDetails
    switch (connectionDetails.__typename) {
      case 'LightningAddressConnectionDetails':
        castedConnectionDetails =
          connectionDetails as LightningAddressConnectionDetails

        return (
          <GridItem colSpan={8} display="flex" justifyContent="center">
            <ProjectFundingSettingsLightningAddressView
              lightningAddress={castedConnectionDetails.lightningAddress}
            />
          </GridItem>
        )

      default:
        castedConnectionDetails =
          connectionDetails as LndConnectionDetailsPrivate
        return (
          <>
            <VStack
              width="100%"
              border="1px solid"
              borderColor={colors.gray300}
              borderRadius="4px"
              alignItems="flex-start"
              padding="10px"
              spacing="10px"
            >
              <HStack width="100%" justifyContent="space-between">
                <Text fontWeight={500}>{projectWallet?.name}</Text>
              </HStack>
              <HStack width="100%">
                <CheckCircleIcon color={colors.primary800} fontSize="12px" />
                <Text color={colors.primary800} fontSize="12px">
                  RUNNING
                </Text>
              </HStack>

              <VStack width="100%" spacing="4px" alignItems="flex-start">
                <Text color="brand.neutral700" fontSize="10px">
                  Hostname or IP address
                </Text>
                <Text
                  wordBreak="break-all"
                  color="brand.neutral900"
                  fontSize="14px"
                >
                  {castedConnectionDetails.hostname}
                </Text>
              </VStack>

              <VStack width="100%" spacing="4px" alignItems="flex-start">
                <Text color="brand.neutral700" fontSize="10px">
                  Public key
                </Text>
                <Text
                  wordBreak="break-all"
                  color="brand.neutral900"
                  fontSize="14px"
                >
                  {castedConnectionDetails.pubkey}
                </Text>
              </VStack>
              <VStack
                width="100%"
                spacing="4px"
                alignItems="flex-start"
                flexWrap="wrap"
              >
                <Text color="brand.neutral700" fontSize="10px">
                  Invoice Macaroon
                </Text>
                <Text
                  wordBreak="break-all"
                  color="brand.neutral900"
                  fontSize="14px"
                >
                  {castedConnectionDetails.macaroon}
                </Text>
              </VStack>
              {castedConnectionDetails.tlsCertificate && (
                <VStack width="100%" spacing="4px" alignItems="flex-start">
                  <Text color="brand.neutral700" fontSize="10px">
                    TLS certificate
                  </Text>
                  <Text
                    wordBreak="break-all"
                    color="brand.neutral900"
                    fontSize="14px"
                  >
                    {castedConnectionDetails.tlsCertificate}
                  </Text>
                </VStack>
              )}
              <VStack width="100%" spacing="4px" alignItems="flex-start">
                <Text color="brand.neutral700" fontSize="10px">
                  gRPC port
                </Text>
                <Text
                  wordBreak="break-all"
                  color="brand.neutral900"
                  fontSize="14px"
                >
                  {castedConnectionDetails.grpcPort}
                </Text>
              </VStack>
            </VStack>
            <Text color="brand.neutral700" fontSize="10px">
              If you want to change how you receive your funds reach out to
              hello@geyser.fund. We are not currently enabling editing of this
              information for security reasons.
            </Text>
          </>
        )
    }
  }

  return (
    <>
      <GridItem
        colSpan={isLargerThan1280 ? 6 : 2}
        display="flex"
        justifyContent="center"
      >
        <VStack
          spacing="40px"
          width="100%"
          minWidth="350px"
          maxWidth="600px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {!projectWallet && (
            <ProjectCreationWalletConnectionForm
              project={project}
              onProjectLaunchSelected={handleProjectLaunch}
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
                borderColor={colors.gray300}
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
                  <Text color="brand.textGray">Hostname or IP address</Text>
                  <Text>{nodeData?.hostname}</Text>
                </VStack>
              </VStack>
            )}
          </VStack>
        </GridItem>
      )}
    </>
  )
}
