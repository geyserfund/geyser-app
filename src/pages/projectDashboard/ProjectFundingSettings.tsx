import { HStack, Text, VStack, GridItem } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router';

import { BiPencil } from 'react-icons/bi';
import { IconButtonComponent } from '../../components/ui';
import { TNodeInput } from '../creation/projectCreate/types';
import { colors, getPath } from '../../constants';
import { useNotification } from '../../utils';
import {
  LightningAddressConnectionDetails,
  LndConnectionDetailsPrivate,
  Project,
  Wallet,
} from '../../types/generated/graphql';
import { ProjectFundingSettingsLightningAddressView } from './ProjectFundingSettingsLightningAddressView';
import { ProjectCreationWalletConnectionForm } from '../creation/projectCreate';
import { CheckCircleIcon } from '@chakra-ui/icons';

export const ProjectFundingSettings = ({ project }: { project: Project }) => {
  const { toast } = useNotification();
  const history = useHistory();
  const [nodeData, setNodeData] = useState<TNodeInput>();
  const [tiggerWalletOpen, setTriggerWalletOpen] = useState(false);

  const projectWallet: Wallet | undefined = useMemo(() => {
    return project.wallets && project.wallets[0];
  }, [project.wallets]);

  // const projectLightningAddress: string | undefined = useMemo(() => {
  //   project.wallets?.forEach((wallet: Wallet) => {
  //     if (wallet.connectionDetails as LightningAddressConnectionDetails) {
  //       return (wallet.connectionDetails as LightningAddressConnectionDetails)
  //         .lightningAddress;
  //     }
  //   });

  //   return undefined;
  // }, [project.wallets]);

  const handleProjectLaunch = async () => {
    history.push(getPath('project', project.name));
    toast({
      status: 'success',
      title: 'Node updated!',
      description: 'Project is now active',
    });
  };

  const renderWalletConnectionDetails = () => {
    const { connectionDetails } = projectWallet;
    let castedConnectionDetails;
    switch (connectionDetails.__typename) {
      case 'LightningAddressConnectionDetails':
        castedConnectionDetails =
          connectionDetails as LightningAddressConnectionDetails;

        return (
          <GridItem colSpan={8} display="flex" justifyContent="center">
            <ProjectFundingSettingsLightningAddressView
              lightningAddress={castedConnectionDetails.lightningAddress}
            />
          </GridItem>
        );

      default:
        castedConnectionDetails =
          connectionDetails as LndConnectionDetailsPrivate;
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
        );
    }
  };

  return (
    <>
      <GridItem colSpan={8} display="flex" justifyContent="center">
        <VStack
          spacing="40px"
          width="100%"
          minWidth="350px"
          maxWidth="400px"
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
        <GridItem colSpan={5} display="flex" justifyContent="center">
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
  );
};
