import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import geyserBlack from '../../assets/images/geyser-short-black.svg';
import { HTMLChakraProps } from '@chakra-ui/system';
import { useHistory } from 'react-router';
import { createUseStyles } from 'react-jss';

interface ILogoP extends HTMLChakraProps<'div'> {
  className?: string;
  imageClassName?: string;
  full?: boolean;
}

const useStyles = createUseStyles({
  container: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export const LogoBlack = ({
  className,
  imageClassName,
  full,
  ...rest
}: ILogoP) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <Box
      className={`${classes.container} ${className}`}
      {...rest}
      onClick={handleClick}
    >
      <Image
        className={imageClassName}
        height="40px"
        src={geyserBlack}
        alt="geyser logo image"
        objectFit="contain"
      />
    </Box>
  );
};
