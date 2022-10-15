import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { IProject } from '../../interfaces';
import { Card, SatoshiAmount } from '../../components/ui';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { LighteningQR } from './components/LighteningQR';
import { BoltIcon } from '../../components/icons';
import { AvatarElement } from './components/AvatarElement';
import { colors, fundingStages, IFundingStages } from '../../constants';
import { useAuthContext } from '../../context';

export const DetailsCard = ({
  project,
  setFundState,
}: {
  project: IProject;
  setFundState: React.Dispatch<React.SetStateAction<IFundingStages>>;
}) => {
  const { user } = useAuthContext();
  const owner = project.owners[0];

  // const { projectDetails, projectUpdates } = projectData;
  console.log(project);

  const renderMilestone = () => {
    if (!project.milestones) {
      return null;
    }

    const currentMilestone = project.milestones.find(
      (milestone) => milestone.amount > project.balance,
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
        (funder) => funder.user?.id === user.id,
      );
      console.log(currentFund);

      if (!currentFund) {
        return null;
      }

      return (
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
      );
    }

    return null;
  };

  const renderContributorsCount = () => {
    const contributorsCount = project.funders.length;
    return (
      <Text color="brand.primary800" fontWeight={500}>
        {contributorsCount}{' '}
        {contributorsCount === 1 ? 'contributor' : 'contributors'} |
      </Text>
    );
  };

  const handleFundProject = () => {
    setFundState(fundingStages.form);
  };

  return (
    <Card padding="24px">
      <VStack alignItems="flex-start" width="100%" spacing="18px">
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
        <VStack width="100%" spacing={0} alignItems="flex-start">
          <HStack justifyContent="space-between" width="100%">
            <Text fontSize="30px" fontWeight={700}>
              {project.title}
            </Text>
            <HStack>
              <Text fontSize="12px" color="brand.primary800">
                RUNNING
              </Text>
              <BsFillCheckCircleFill color={colors.primary800} />
            </HStack>
          </HStack>
          <LighteningQR project={project} />
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
          <HStack width="100%" justifyContent="center">
            {renderContributorsCount()}
            {renderYourFunding()}
          </HStack>
        )}
        <Button
          isFullWidth
          backgroundColor="brand.primary"
          leftIcon={<BoltIcon />}
          onClick={handleFundProject}
        >
          Fund this project
        </Button>
      </VStack>
    </Card>
  );
};
