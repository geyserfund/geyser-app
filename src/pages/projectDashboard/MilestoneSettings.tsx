import { EditIcon } from '@chakra-ui/icons';
import {
  HStack,
  Text,
  useDisclosure,
  VStack,
  GridItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  ButtonComponent,
  IconButtonComponent,
  SatoshiAmount,
} from '../../components/ui';
import { colors } from '../../constants';
import { IProject } from '../../interfaces';
import {
  defaultMilestone,
  MilestoneAdditionModal,
} from '../creation/projectCreate/components';
import { TMilestone } from '../creation/projectCreate/types';

export const MilestoneSettings = ({ project }: { project: IProject }) => {
  const [milestones, setMilestones] = useState<TMilestone[]>([]);

  const {
    isOpen: isMilestoneOpen,
    onClose: onMilestoneClose,
    onOpen: openMilestone,
  } = useDisclosure();

  const [isSatoshi, setIsSatoshi] = useState(true);

  useEffect(() => {
    if (project.milestones && project.milestones.length > 0) {
      setMilestones(project.milestones);
    }
  }, [project]);

  const handleMilestoneSubmit = (milestones: TMilestone[]) => {
    // eslint-disable-next-line no-debugger
    debugger;

    setMilestones(milestones);
  };

  return (
    <>
      <GridItem colSpan={8} display="flex" justifyContent="center">
        <VStack
          spacing="30px"
          width="100%"
          minWidth="350px"
          maxWidth="400px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack w="100%" spacing="40px">
            <VStack width="100%" alignItems="flex-start">
              <Text name="title">Project Milestones </Text>
              <ButtonComponent isFullWidth onClick={openMilestone}>
                Add a milestone
              </ButtonComponent>
              <Text fontSize="12px">
                Milestones help you and your community keep track of your
                progress and set your expectations. You can edit Milestones
                later.
              </Text>
            </VStack>
            <VStack alignItems="flex-start" width="100%" spacing="10px">
              {milestones.length > 0 && (
                <>
                  <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="18px" fontWeight={500}>
                      MILESTONES
                    </Text>
                    <IconButtonComponent
                      aria-label="edit"
                      onClick={openMilestone}
                    >
                      <EditIcon />
                    </IconButtonComponent>
                  </HStack>

                  {milestones.map((milestone, index) => (
                    <VStack
                      key={index}
                      width="100%"
                      border="1px solid"
                      borderColor={colors.gray300}
                      borderRadius="4px"
                      alignItems="flex-start"
                      padding="10px"
                    >
                      <Text>{milestone.name}</Text>
                      {isSatoshi ? (
                        <SatoshiAmount>{milestone.amount}</SatoshiAmount>
                      ) : (
                        <Text>{`$ ${milestone.amount}`}</Text>
                      )}
                    </VStack>
                  ))}
                </>
              )}
            </VStack>
          </VStack>
        </VStack>
      </GridItem>

      {isMilestoneOpen && (
        <MilestoneAdditionModal
          isOpen={isMilestoneOpen}
          onClose={onMilestoneClose}
          milestones={milestones.length > 0 ? milestones : [defaultMilestone]}
          onSubmit={handleMilestoneSubmit}
          isSatoshi={isSatoshi}
          setIsSatoshi={setIsSatoshi}
          projectId={parseInt(`${project.id}`, 10)}
        />
      )}
    </>
  );
};
