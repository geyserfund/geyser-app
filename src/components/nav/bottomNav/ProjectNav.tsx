import {
  Box,
  Button,
  HStack,
  Slide,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsHeartFill, BsLightningChargeFill } from 'react-icons/bs';
import { fonts } from '../../../constants';
import { useScrollDirection } from '../../../hooks';
import { MobileViews, useProject } from '../../../pages/projectView';
import { DescriptionIcon, LeaderBoardIcon } from '../../icons';

export const ProjectNav = () => {
  const { mobileView } = useProject();

  const isScrollingUp = useScrollDirection({
    initialValue: true,
    mobileView,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [noTransition, setNoTransition] = useState(true);

  useEffect(() => {
    if (isScrollingUp) {
      onOpen();
    } else {
      setNoTransition(false);
      onClose();
    }
  }, [isScrollingUp, mobileView]);

  return (
    <>
      {<Box width="100%" height="60px"></Box>}
      <Slide
        direction="bottom"
        in={isOpen}
        style={{
          zIndex: 10,
        }}
        unmountOnExit
        transition={
          noTransition
            ? {
                exit: {
                  duration: 0,
                },
                enter: {
                  duration: 0,
                },
              }
            : undefined
        }
      >
        <ProjectNavUI />
      </Slide>
    </>
  );
};

export const ProjectNavUI = () => {
  const { mobileView, setMobileView, project } = useProject();

  const getTextColor = (value: string) => {
    if (value === mobileView) {
      return 'black';
    }

    return 'brand.neutral600';
  };

  const transactionCount = project?.fundingTxsCount;
  const fundersCount = project?.fundersCount;

  const handleClick = (value: MobileViews) => {
    if (mobileView === value) {
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setMobileView(value);
      document.scrollingElement?.scrollTo({ top: 0 });
    }
  };

  return (
    <HStack
      backgroundColor="brand.neutral50"
      width="100%"
      bottom="0px"
      height="60px"
      borderTop="2px solid"
      borderTopColor="brand.neutral200"
      paddingX="20px"
      justifyContent="center"
      alignItems="center"
      spacing="40px"
    >
      <Button
        variant="ghost"
        onClick={() => handleClick(MobileViews.description)}
        color={getTextColor(MobileViews.description)}
        _hover={{}}
      >
        <DescriptionIcon fontSize="20px" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleClick(MobileViews.contribution)}
        color={getTextColor(MobileViews.contribution)}
        leftIcon={<BsHeartFill fontSize="20px" />}
        _hover={{}}
      >
        {transactionCount && <Text font={fonts.mono}>{transactionCount}</Text>}
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleClick(MobileViews.leaderboard)}
        color={getTextColor(MobileViews.leaderboard)}
        _hover={{}}
      >
        <LeaderBoardIcon fontSize="20px" />
        {fundersCount && <Text font={fonts.mono}>{fundersCount}</Text>}
      </Button>
      <HStack>
        <Button
          size="sm"
          backgroundColor={
            mobileView === MobileViews.funding
              ? 'brand.neutral500'
              : 'brand.primary'
          }
          border="1px solid"
          borderColor={
            mobileView === MobileViews.funding
              ? 'brand.neutral500'
              : 'brand.primary'
          }
          _hover={{}}
          leftIcon={<BsLightningChargeFill />}
          onClick={() => {
            handleClick(MobileViews.funding);
          }}
        >
          Contribute
        </Button>
      </HStack>
    </HStack>
  );
};
