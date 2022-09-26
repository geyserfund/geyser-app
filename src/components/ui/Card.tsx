import { Box } from '@chakra-ui/layout';
import { HTMLChakraProps } from '@chakra-ui/system';
import classNames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';

export interface ICard extends HTMLChakraProps<'div'> {
  children?: React.ReactNode;
}

const useStyles = createUseStyles({
  cardContainer: {
    borderRadius: '4px',
    boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.1)',
  },
});

export const Card = ({ className, children, overflow, ...rest }: ICard) => {
  const classes = useStyles();
  return (
    <Box
      className={classNames(classes.cardContainer, className)}
      overflow={overflow ? overflow : 'hidden'}
      {...rest}
    >
      {children}
    </Box>
  );
};
