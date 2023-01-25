import { CircularProgress, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { GEYSER_FEE, noFeeProjects } from '../../../constants';
import { Countdown } from '../../../pages/projectView/ActivityPanel/Countdown';
import { colors } from '../../../styles';
import { fonts } from '../../../styles';
import { Project, ProjectMilestone } from '../../../types/generated/graphql';
import { isActive, useMobileMode } from '../../../utils';
import { SatoshiAmount } from '../../ui';

interface IActivityBrief {
  loading?: boolean;
  project: Project;
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
  const isMobile = useMobileMode();
  const [currentMilestone, setCurrentMilestone] = useState<ProjectMilestone>();
  const [milestoneIndex, setMilestoneIndex] = useState<number>(0);
  const [prevMilestone, setPrevMilestone] = useState(0);

  const balance = noFeeProjects.includes(project.name)
    ? project.balance
    : Math.round(project.balance * (1 - GEYSER_FEE));

  useEffect(() => {
    if (project.milestones && project.milestones.length > 0) {
      let selectedMilestone: ProjectMilestone | undefined;
      let prevTotal = 0;

      project.milestones.map((milestone, index) => {
        const hasNextMilestone =
          project.milestones && Boolean(project.milestones[index + 1]);
        if (!selectedMilestone) {
          if (milestone && (milestone.amount >= balance || !hasNextMilestone)) {
            selectedMilestone = milestone;
            setCurrentMilestone(milestone);
            setMilestoneIndex(index + 1);
          } else {
            prevTotal = milestone?.amount || 0;
          }
        }
      });
      setPrevMilestone(prevTotal);
    }
  }, [project]);

  const getTrackColor = () => {
    switch (milestoneIndex % 3) {
      case 1:
        if (milestoneIndex === 1) return undefined;
        return 'brand.primary800';
      case 2:
        return 'brand.primary400';
      case 0:
        return 'brand.primary600';
      default:
        return undefined;
    }
  };

  const getColor = () => {
    switch (milestoneIndex % 3) {
      case 1:
        return 'brand.primary400';
      case 2:
        return 'brand.primary600';
      case 0:
        return 'brand.primary800';
      default:
        return 'brand.primary300';
    }
  };

  const renderCircularProgress = () => {
    if (currentMilestone) {
      const circularPercentage =
        ((balance - prevMilestone) /
          (currentMilestone.amount - prevMilestone)) *
        100;

      return (
        <CircularProgress
          capIsRound
          isIndeterminate={loading}
          className={classes.circularProgress}
          value={circularPercentage}
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
        ((balance - prevMilestone) /
          (currentMilestone.amount - prevMilestone)) *
          100,
      );
      return (
        <Text
          fontSize="14px"
          fontFamily={fonts.mono}
          color={colors.neutral600}
          maxW="100%"
        >{`${percentage}% of ${currentMilestone.name}`}</Text>
      );
    }

    return null;
  };

  const showCountdown = isActive(project.status) && Boolean(project.expiresAt);

  return (
    <HStack
      width="100%"
      padding={isMobile ? '20px 20px 0px 20px' : '10px 20px'}
      justifyContent="space-between"
    >
      {renderCircularProgress()}
      <VStack flex="1" spacing="5px" width="100%" overflow="hidden">
        {!isMobile && (
          <Text fontSize="18px" fontWeight={600} color="brand.neutral900">
            {project.title}
          </Text>
        )}
        <SatoshiAmount
          fontSize="32px"
          fontFamily={fonts.courier}
          fontWeight={400}
          fontStyle={'normal'}
          color="brand.primary600"
        >
          {balance}
        </SatoshiAmount>
        {getMilestoneValue()}
        {/* We can force unwrap project.expiresAt because the showCountdown expression check for a null or undefined value */}
        {showCountdown && <Countdown endDate={project.expiresAt!} />}
      </VStack>
    </HStack>
  );
};
