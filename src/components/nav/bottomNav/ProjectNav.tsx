import { Button, HStack, Slide, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsHeartFill, BsLightningChargeFill } from 'react-icons/bs';
import { fonts } from '../../../constants';
import { useScrollDirection } from '../../../hooks';
import { MobileViews, useProject } from '../../../pages/projectView';
import { DescriptionIcon, LeaderBoardIcon } from '../../icons';

export const ProjectNav = () => {
  const { loading, mobileView, setMobileView, project } = useProject();

  const descriptionScrollUp = useScrollDirection({
    elementId: 'project-scroll-container',
    initialValue: true,
    loading,
    mobileView,
  });
  const contributionScrollUp = useScrollDirection({
    elementId: 'project-activity-list-container',
    initialValue: true,
    loading,
    mobileView,
  });
  const leaderboardScrollUp = useScrollDirection({
    elementId: 'project-leaderboard-list-container',
    initialValue: true,
    loading,
    mobileView,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [noTransition, setNoTransition] = useState(true);

  useEffect(() => {
    switch (mobileView) {
      case MobileViews.description:
        handleTransition(descriptionScrollUp);
        break;
      case MobileViews.contribution:
        handleTransition(contributionScrollUp);
        break;
      case MobileViews.leaderboard:
        handleTransition(leaderboardScrollUp);
        break;
      case MobileViews.funding:
        onOpen();
        break;

      default:
        break;
    }
  }, [
    descriptionScrollUp,
    contributionScrollUp,
    leaderboardScrollUp,
    mobileView,
  ]);

  const handleTransition = (isView: boolean) => {
    if (isView) {
      onOpen();
    } else {
      setNoTransition(false);
      onClose();
    }
  };

  const getColor = (value: string) => {
    if (value === mobileView) {
      return 'black';
    }

    return 'brand.neutral600';
  };

  const transactionCount = project?.fundingTxsCount;
  const fundersCount = project?.fundersCount;

  return (
    <Slide
      direction="bottom"
      in={isOpen}
      style={{ zIndex: 10 }}
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
          onClick={() => setMobileView(MobileViews.description)}
          color={getColor(MobileViews.description)}
          _hover={{}}
        >
          <DescriptionIcon fontSize="20px" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setMobileView(MobileViews.contribution)}
          color={getColor(MobileViews.contribution)}
          leftIcon={<BsHeartFill fontSize="20px" />}
          _hover={{}}
        >
          {transactionCount && (
            <Text font={fonts.mono}>{transactionCount}</Text>
          )}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setMobileView(MobileViews.leaderboard)}
          color={getColor(MobileViews.leaderboard)}
          _hover={{}}
        >
          <LeaderBoardIcon fontSize="20px" />
          {fundersCount && <Text font={fonts.mono}>{fundersCount}</Text>}
        </Button>
        <HStack>
          <Button
            size="sm"
            background="transparent"
            border="1px solid"
            borderColor="brand.primary"
            _hover={{}}
            leftIcon={<BsLightningChargeFill />}
            onClick={() => setMobileView(MobileViews.funding)}
          >
            Contribute
          </Button>
        </HStack>
      </HStack>
    </Slide>
  );
};
