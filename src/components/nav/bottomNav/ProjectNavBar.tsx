import {
  Button,
  HStack,
  Slide,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { AiOutlineTrophy } from 'react-icons/ai';
import { BsCardText, BsHeartFill, BsLightningChargeFill } from 'react-icons/bs';
import { useScrollDirection } from '../../../hooks';
import { MobileViews, useMobileView } from '../../../pages/projectView';
import { LandingNavBar } from './LandingNavBar';

interface ProjectNavBarProps {
  elementId: string;
}

export const ProjectNavBar = ({ elementId }: ProjectNavBarProps) => {
  const { view, setView } = useMobileView();

  const isScrollingUp = useScrollDirection({ elementId, initialValue: true });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isScrollingUp) {
      onOpen();
    } else {
      onClose();
    }
  }, [isScrollingUp]);

  const isCurrent = (value: string) => value === view;

  return (
    <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
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
        <HStack
          spacing="0px"
          onClick={() => setView(MobileViews.description)}
          color={
            isCurrent(MobileViews.description) ? 'black' : 'brand.neutral600'
          }
        >
          <BsCardText fontSize="20px" />
        </HStack>
        <HStack
          spacing="0px"
          onClick={() => setView(MobileViews.contribution)}
          color={
            isCurrent(MobileViews.contribution) ? 'black' : 'brand.neutral600'
          }
        >
          <BsHeartFill fontSize="20px" />
        </HStack>
        <HStack
          spacing="0px"
          onClick={() => setView(MobileViews.leaderboard)}
          color={
            isCurrent(MobileViews.leaderboard) ? 'black' : 'brand.neutral600'
          }
        >
          <AiOutlineTrophy fontSize="20px" />
        </HStack>
        <HStack spacing="0px">
          <Button
            size="sm"
            background="transparent"
            border="1px solid"
            borderColor="brand.primary"
            leftIcon={<BsLightningChargeFill />}
            onClick={() => setView(MobileViews.funding)}
          >
            Contribute
          </Button>
        </HStack>
      </HStack>
    </Slide>
  );
};
