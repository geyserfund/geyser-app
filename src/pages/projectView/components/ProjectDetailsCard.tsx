import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  Card,
  SatoshiAmount,
  ProjectStatusLabel,
} from '../../../components/ui';
import { ProjectLightningQR } from './ProjectLightningQR';
import { BoltIcon, ShareIcon, AmbossIcon } from '../../../components/icons';
import { AvatarElement } from './AvatarElement';
import { useAuthContext } from '../../../context';
import { Project } from '../../../types/generated/graphql';
import { getPath, HomeUrl, AmbossUrl } from '../../../constants';
import { isMobileMode } from '../../../utils';

export const ProjectDetailsCard = ({
  project,
  fundButtonFunction,
}: {
  project: Project;
  fundButtonFunction: any;
}) => {
  const { user } = useAuthContext();
  const isMobile = isMobileMode();

  const [hasCopiedSharingLink, setHasCopiedSharingLink] = useState(false);
  const owner = project.owners[0];

  const handleShareButtonTapped = () => {
    const relativePath = getPath('project', project.name);

    navigator.clipboard.writeText(`${HomeUrl}${relativePath}`);
    setHasCopiedSharingLink(true);
  };

  const renderMilestone = () => {
    if (!project.milestones) {
      return null;
    }

    const currentMilestone = project.milestones.find(
      (milestone) => Number(milestone?.amount) > project.balance,
    );

    if (!currentMilestone) {
      return null;
    }

    return (
      <VStack alignItems="flex-start">
        <Text color="brand.neutral600">Next Milestone</Text>
        <HStack>
          <Text color="brand.neutral800">{`${currentMilestone?.name}: ${currentMilestone?.description} - `}</Text>
          <SatoshiAmount>
            {currentMilestone.amount - project.balance}
          </SatoshiAmount>
          <Text color="brand.neutral800"> to go.</Text>
        </HStack>
      </VStack>
    );
  };

  const renderYourFunding = () => {
    if (project.funders.length > 0) {
      const currentFund = project.funders.find(
        (funder) => funder?.user?.id === user.id,
      );

      if (!currentFund) {
        return null;
      }

      return (
        <>
          {!isMobile && <Text color="brand.primary800">|</Text>}
          <HStack>
            <Text color="brand.primary800" fontWeight={500}>
              {'You contributed'}
            </Text>
            <SatoshiAmount color="brand.primary800" fontWeight={500}>
              {currentFund.amountFunded}
            </SatoshiAmount>
            <Text color="brand.primary800" fontWeight={500}>
              {' towards this project'}
            </Text>
          </HStack>
        </>
      );
    }

    return null;
  };

  const renderContributorsCount = () => {
    const contributorsCount = project.funders.length;
    return (
      <Text color="brand.primary800" fontWeight={500}>
        {contributorsCount}{' '}
        {contributorsCount === 1 ? 'contributor' : 'contributors'}
      </Text>
    );
  };

  return (
    <Card padding="24px" backgroundColor="brand.bgWhite">
      <VStack alignItems="flex-start" width="100%" spacing="18px">
        {project.image && (
          <Box width="100%" overflow="hidden">
            <Image
              borderRadius="4px"
              width="100%"
              height="100%"
              src={project.image}
              maxH="210px"
              objectFit="cover"
            />
          </Box>
        )}

        <VStack width="100%" spacing="10px" alignItems="flex-start">
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing="0px"
            justifyContent="space-between"
            width="100%"
          >
            <Text fontSize="30px" fontWeight={700}>
              {project.title}
            </Text>
            <ProjectStatusLabel project={project} />
          </Stack>

          <HStack
            flexWrap="wrap"
            justifyContent="start"
            alignItems="center"
            spacing={1}
          >
            <ProjectLightningQR project={project} />

            <Tooltip
              label={hasCopiedSharingLink ? 'Copied!' : 'Share Project'}
              placement="top"
              closeOnClick={false}
            >
              <IconButton
                size="sm"
                _hover={{
                  backgroundColor: 'none',
                  border: '1px solid #20ECC7',
                }}
                _active={{ backgroundColor: 'brand.primary' }}
                bg="none"
                icon={<ShareIcon />}
                aria-label="share"
                onClick={handleShareButtonTapped}
              />
            </Tooltip>
            {project.wallets && project.wallets[0]?.connectionDetails?.pubkey && (
              <IconButton
                size="sm"
                _hover={{
                  backgroundColor: 'none',
                  border: '1px solid #20ECC7',
                }}
                _active={{ backgroundColor: 'brand.primary' }}
                bg="none"
                icon={<AmbossIcon fontSize="20px" />}
                aria-label="share"
                onClick={() =>
                  window
                    .open(
                      `${AmbossUrl}${project.wallets[0].connectionDetails.pubkey}`,
                      '_blank',
                    )
                    ?.focus()
                }
              />
            )}
          </HStack>
        </VStack>
        <HStack>
          <Text color="brand.neutral600">Creator</Text>
          <AvatarElement user={owner.user} />
        </HStack>
        <VStack alignItems="flex-start">
          <Text color="brand.neutral600" textAlign="left">
            Objective
          </Text>
          <Text color="brand.neutral800">{project.description}</Text>
        </VStack>
        {renderMilestone()}
        {project.funders.length > 0 && (
          <Stack
            direction={isMobile ? 'column' : 'row'}
            width="100%"
            justifyContent="center"
            alignItems={'center'}
          >
            {renderContributorsCount()}
            {renderYourFunding()}
          </Stack>
        )}
        {!isMobile && (
          <Button
            isFullWidth
            backgroundColor={
              project.active ? 'brand.primary' : 'brand.grayPlaceholder'
            }
            leftIcon={<BoltIcon />}
            onClick={fundButtonFunction}
            isDisabled={project.active === false}
          >
            Contribute
          </Button>
        )}
      </VStack>
    </Card>
  );
};
