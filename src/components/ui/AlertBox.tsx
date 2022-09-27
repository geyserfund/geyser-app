import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from '@chakra-ui/react';
import React from 'react';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';

type Props = AlertProps & {
  title: string;

  /**
   * A longer description message for the alert.
   */
  message?: string;
};

export const AlertBox = ({ title, message, ...rest }: Props) => (
  <Alert
    status="info"
    variant="subtle"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    borderRadius="10px"
    {...rest}
  >
    <AlertIcon boxSize="40px" mr={0} as={MdOutlineReportGmailerrorred} />
    <AlertTitle mt={4} mb={1} fontSize="lg">
      {title}
    </AlertTitle>
    <AlertDescription maxWidth="sm">{message}</AlertDescription>
  </Alert>
);
