import {
  Box,
  CircularProgress,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import { IProfileProject } from '../../../interfaces';
import {
  checkExpired,
  getFormattedDate,
  isDarkMode,
  useBitcoinRates,
} from '../../../utils';
import { getShortAmountLabel } from '../../../utils/helperFunctions';
import { SatoshiIconTilted } from '../../icons';
import { Card, ICard } from '../../ui';
import { ProjectCardTime } from './ProjectCard';

interface IProjectCardProp extends ICard {
  title: string;
  open?: boolean;
  name: string;
  className?: string;
  imgSrc?: string;
  project: IProfileProject;
  privateUser?: boolean;
}

const useStyles = createUseStyles({
  container: {
    borderRadius: '4px',
    // height: '365px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    minWidth: '300px',
    marginLeft: '15px',
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 0px 12px -2px, rgba(0, 0, 0, 0.3) 0px 0px 7px -3px',
    '&:hover': {
      cursor: 'pointer',
      boxShadow:
        'rgba(60, 64, 67, 0.3) 0px 0px 2px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 1px',
      '.rocketicon': {
        color: 'brand.primary',
      },
    },

    transition: 'box-shadow 0.3s ease-in-out',
  },

  circularProgress: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15))',
  },
});

export const ProfileProjectCard = ({
  title,
  imgSrc,
  open,
  name,
  className,
  project,
  privateUser,
  ...rest
}: IProjectCardProp) => {
  const classes = useStyles();
  const isDark = isDarkMode();

  const { btcRate } = useBitcoinRates();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (btcRate && project.balance) {
      const amountUSD = (project.balance * btcRate).toFixed(2);
      const percent = Math.ceil(
        (parseFloat(amountUSD) / project.fundingGoal) * 100,
      );
      setPercentage(percent);
    }
  }, [btcRate, project]);

  const getProjectBackers = () =>
    project && project.funders ? project.funders.length : '';

  const getProjectStatus = () => {
    // TODO after project creation flow
    // if (!project.creationConfirmed) {
    // 	return (
    // 		<Badge variant="solid" colorScheme="gray">
    // 			Draft Project
    // 		</Badge>
    // 	);
    // }
    if (checkExpired(project.expiresAt)) {
      return (
        <Box
          background="brand.bgGrey3"
          padding="2px 8px"
          borderRadius="4px"
          width="100%"
          textAlign="center"
        >
          <Text variant="subtle" color="textGrey" fontSize="12px">
            COMPLETED
          </Text>
        </Box>
      );
    }

    if (
      project.fundingGoal > 0 &&
      project.balance * btcRate >= project.fundingGoal
    ) {
      return (
        <Box
          background="brand.primary"
          padding="2px 8px"
          borderRadius="4px"
          width="100%"
          textAlign="center"
        >
          <Text width="100%" variant="subtle" color="black" fontSize="12px">
            GOAL REACHED
          </Text>
        </Box>
      );
    }

    if (project.active) {
      return (
        <Box
          background="brand.white"
          borderWidth="2px"
          borderColor="brand.primary"
          padding="2px 8px"
          borderRadius="4px"
          width="100%"
          textAlign="center"
        >
          <Text width="100%" variant="subtle" color="black" fontSize="12px">
            LIVE
          </Text>
        </Box>
      );
    }
  };

  const getProjectUpdate = () => {
    // TODO after project creation flow
    // if (!project.creationConfirmed) {
    // 	return (
    // 		<Text>{`Last edited on: ${project.updatedAt}`}</Text>
    // 	);
    // }

    if (checkExpired(project.expiresAt)) {
      return (
        <Text
          fontSize="12px"
          color="brand.textGrey"
        >{`Closed on: ${getFormattedDate(project.expiresAt)}`}</Text>
      );
    }

    if (project.active) {
      return (
        <Text
          fontSize="12px"
          color="brand.textGrey"
        >{`Went live on ${getFormattedDate(project.createdAt)}`}</Text>
      );
    }
  };

  return (
    <Link to={`/project/${project.name}`}>
      <Card
        className={classNames(classes.container, className)}
        backgroundColor={isDark ? 'brand.bgHeavyDarkMode' : 'white'}
        {...rest}
      >
        <Box height="160px" width="100%" position="relative">
          <Image src={imgSrc} height="100%" width="100%" objectFit="cover" />
        </Box>
        <VStack spacing="7px" width="100%" padding="10px">
          <Text fontSize="16px" fontWeight={600} width="100%" isTruncated>
            {title}
          </Text>
          <Text fontSize="12px" width="100%" height="40px" noOfLines={2}>
            {project.description}
          </Text>
          <HStack
            alignItems="center"
            justifyContent={'center'}
            width="100%"
            spacing="15px"
          >
            {project.fundingGoal && (
              <CircularProgress
                className={classes.circularProgress}
                value={percentage}
                size="55px"
                thickness="10px"
                color="brand.primary"
              >
                <Box
                  position="absolute"
                  fontSize="12px"
                  top="19px"
                  display="flex"
                  justifyContent="center"
                >
                  <Text
                    fontSize="12px"
                    fontWeight={500}
                  >{`${percentage}%`}</Text>
                </Box>
              </CircularProgress>
            )}
            <VStack alignItems="center" justifyContent="center" spacing="0">
              <Text fontSize="14px" fontWeight={600}>
                {getProjectBackers()}
              </Text>
              <Text fontSize="12px">BACKERS</Text>
            </VStack>
            <VStack alignItems="center" justifyContent={'center'} spacing="0">
              <HStack spacing="2px">
                <SatoshiIconTilted scale={0.6} />
                <Text fontSize="14px" fontWeight={600}>
                  {getShortAmountLabel(project.balance)}
                </Text>
              </HStack>
              <Text fontSize="12px">RECEIVED</Text>
            </VStack>
            {project.active && (
              <ProjectCardTime
                expiresAt={project.expiresAt}
                active={project.active}
              />
            )}
          </HStack>
          {getProjectStatus()}
          {privateUser && (
            <HStack spacing="5px" width="100%">
              {getProjectUpdate()}
            </HStack>
          )}
        </VStack>
      </Card>
    </Link>
  );
};
