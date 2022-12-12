import { HStack, Text, VStack, GridItem } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { IconButtonComponent } from '../../components/ui';
import { colors, getPath } from '../../constants';
import { useNotification } from '../../utils';
import { TNodeInput } from '../creation/projectCreate/types';
import {
  LightningAddressConnectionDetails,
  Project,
  Wallet,
} from '../../types/generated/graphql';
import { ProjectFundingSettingsLightningAddressView } from './ProjectFundingSettingsLightningAddressView';
import { ProjectCreationWalletConnectionForm } from '../creation/projectCreate';
import { useHistory } from 'react-router';

export const ProjectFundingSettings = ({ project }: { project: Project }) => {
  const { toast } = useNotification();
  const history = useHistory();
  const [nodeData, setNodeData] = useState<TNodeInput>();
  const [tiggerWalletOpen, setTriggerWalletOpen] = useState(false);

  // const node = project.wallets && project.wallets[0];

  const projectWallet: Wallet | undefined = useMemo(() => {
    return project.wallets && project.wallets[0];
  }, [project.wallets]);

  const projectLightningAddress: string | undefined = useMemo(() => {
    project.wallets?.forEach((wallet: Wallet) => {
      if (wallet.connectionDetails as LightningAddressConnectionDetails) {
        return (wallet.connectionDetails as LightningAddressConnectionDetails)
          .lightningAddress;
      }
    });

    return undefined;
  }, [project.wallets]);

  const handleProjectLaunch = async () => {
    history.push(getPath('project', project.name));
    toast({
      status: 'success',
      title: 'Node updated!',
      description: 'Project is now active',
    });
  };

  if (projectLightningAddress) {
    return (
      <GridItem colSpan={8} display="flex" justifyContent="center">
        <ProjectFundingSettingsLightningAddressView
          lightningAddress={projectLightningAddress}
        />
      </GridItem>
    );
  }

  console.log('checking node data', nodeData);
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

          {projectWallet && projectWallet.name && (
            <>
              <VStack
                width="100%"
                border="1px solid"
                borderColor={colors.gray300}
                borderRadius="4px"
                alignItems="flex-start"
                padding="10px"
              >
                <HStack width="100%" justifyContent="space-between">
                  <Text fontWeight={500}>{projectWallet?.name}</Text>
                </HStack>

                <VStack width="100%" alignItems="flex-start">
                  <Text color="brand.neutral700">Hostname or IP address</Text>
                  <Text
                    wordBreak="break-all"
                    color="brand.neutral700"
                    fontSize="12px"
                  >
                    {projectWallet?.connectionDetails.hostname}
                  </Text>
                </VStack>

                <VStack width="100%" alignItems="flex-start">
                  <Text color="brand.neutral700">Public key</Text>
                  <Text
                    wordBreak="break-all"
                    color="brand.neutral700"
                    fontSize="12px"
                  >
                    {projectWallet?.connectionDetails.pubkey}
                  </Text>
                </VStack>
                <VStack width="100%" alignItems="flex-start" flexWrap="wrap">
                  <Text color="brand.neutral700">Invoice Macaroon</Text>
                  <Text wordBreak="break-all">
                    {projectWallet?.connectionDetails.macaroon}
                  </Text>
                </VStack>
                <VStack width="100%" alignItems="flex-start">
                  <Text color="brand.neutral700">TLS certificate</Text>
                  <Text
                    wordBreak="break-all"
                    color="brand.neutral700"
                    fontSize="12px"
                  >
                    {projectWallet?.connectionDetails.tlsCertificate}
                  </Text>
                </VStack>
                <VStack width="100%" alignItems="flex-start">
                  <Text color="brand.neutral700">gRPC port</Text>
                  <Text
                    wordBreak="break-all"
                    color="brand.neutral700"
                    fontSize="12px"
                  >
                    {projectWallet?.connectionDetails.grpcPort}
                  </Text>
                </VStack>
              </VStack>
              <Text color="brand.neutral700" fontSize="10px">
                If you want to change your node reach out to hello@geyser.fund
              </Text>
            </>
          )}
        </VStack>
      </GridItem>
      <GridItem colSpan={5} display="flex" justifyContent="center">
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
        )}
      </GridItem>
    </>
  );
};
