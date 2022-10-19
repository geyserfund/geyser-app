import { CircularProgress, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../../constants';
import { fonts } from '../../../constants/fonts';
import { IProject, IProjectMilestone } from '../../../interfaces';
import { Countdown } from '../../../pages/project/Activity/Countdown';
import { SatoshiAmount } from '../../ui';

interface IActivityBrief {
  loading: boolean;
  project: IProject;
}

const useStyles = createUseStyles({
  circularProgress: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .amount-label-sat': {
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  },
});

export const ActivityBrief = ({ loading, project }: IActivityBrief) => {
  const classes = useStyles();

  const [currentMilestone, setCurrentMilestone] = useState<IProjectMilestone>();
  const [milestoneIndex, setMilestoneIndex] = useState<number>(0);

  useEffect(() => {
    if (project.milestones && project.milestones.length > 0) {
      let selectedMilestone: IProjectMilestone | undefined;

      project.milestones.map((milestone, index) => {
        if (milestone.amount >= project.balance && !selectedMilestone) {
          selectedMilestone = milestone;
          setCurrentMilestone(milestone);
          setMilestoneIndex(index + 1);
        }
      });
    }
  }, [project]);

  const getTrackColor = () => {
    switch (milestoneIndex) {
      case 1:
        return undefined;
      case 2:
        return 'brand.primary400';
      case 3:
        return 'brand.primary700';
      default:
        return undefined;
    }
  };

  const getColor = () => {
    switch (milestoneIndex) {
      case 1:
        return 'brand.primary400';
      case 2:
        return 'brand.primary700';
      case 3:
        return 'brand.primary400';
      default:
        return 'brand.primary400';
    }
  };

  const renderCircularProgress = () => {
    if (currentMilestone) {
      const percentage = (project.balance / currentMilestone.amount) * 100;
      return (
        <CircularProgress
          capIsRound
          isIndeterminate={loading}
          className={classes.circularProgress}
          value={percentage}
          size="105px"
          thickness="15px"
          color={getColor()}
          trackColor={getTrackColor()}
        />
      );
    }

    return null;
  };

  const getMilestoneValue = () => {
    if (currentMilestone) {
      const percentage = Math.ceil(
        (project.balance / currentMilestone.amount) * 100,
      );
      return (
        <Text
          isTruncated
          fontSize="14px"
          fontFamily={fonts.mono}
          color={colors.neutral600}
        >{`${percentage}% of ${currentMilestone.name}`}</Text>
      );
    }

    return null;
  };

  const showCountdown = project.active && Boolean(project.expiresAt);

  return (
    <HStack width="100%" padding="20px" justifyContent="space-between">
      {renderCircularProgress()}
      <VStack flex="1" spacing="5px">
        <Text fontSize="18px" fontWeight={600} color="brand.neutral900">
          {project.title}
        </Text>
        <SatoshiAmount fontSize="20px" fontFamily={fonts.mono}>
          {project.balance}
        </SatoshiAmount>
        {getMilestoneValue()}
        {showCountdown && <Countdown endDate={project.expiresAt} />}
      </VStack>
    </HStack>
  );
};
