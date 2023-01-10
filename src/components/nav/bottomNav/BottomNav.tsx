import { Box, HStack, Slide } from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import { AiTwotoneRocket } from 'react-icons/ai';
import { BiHomeAlt } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { colors } from '../../../constants';
import { slideUpBottomDynamic } from '../../../css';

interface BottomNavProps {
  showNavBar: boolean;
}

const useStyles = createUseStyles({
  container: {
    backgroundColor: colors.bgWhite,
    width: '100%',
    bottom: '0px',
    height: '60px',
    borderTop: '1px solid',
    borderTopColor: colors.neutral400,
  },
  // ...slideUpBottomDynamic(100, 0.5),
});

export const BottomNav = ({ showNavBar }: BottomNavProps) => {
  const [animationEnded, setAnimationEnded] = useState(false);

  const handleScrollEnd = () => {
    if (showNavBar) {
      setAnimationEnded(true);
    }
  };

  if (!animationEnded) {
    return (
      <Slide
        direction="bottom"
        in={showNavBar}
        style={{ zIndex: 10 }}
        onAnimationComplete={handleScrollEnd}
      >
        <NavUI />
      </Slide>
    );
  }

  return <NavUI />;
};

const NavUI = () => {
  const classes = useStyles();
  return (
    <HStack className={classNames(classes.container)}>
      <Box>
        <BiHomeAlt />
      </Box>
      <Box>
        <AiTwotoneRocket />
      </Box>
    </HStack>
  );
};
