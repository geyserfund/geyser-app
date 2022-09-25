import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
// Import { BiError } from 'react-icons/bi';
// import { FaCheckDouble } from 'react-icons/fa';

interface IStatusBarProp {
  message: string;
  variant: 'problem' | 'idea';
}

export const StatusBar = ({ message, variant }: IStatusBarProp) => {
  const getLabel = () => {
    switch (variant) {
      case 'problem':
        return 'PROBLEM';
      case 'idea':
        return 'IDEA';
      default:
        return 'PROBLEM';
    }
  };

  const getBackground = () => {
    switch (variant) {
      case 'problem':
        return 'brand.bgStatusProblem';
      case 'idea':
        return 'brand.bgStatusIdea';
      default:
        return 'brand.bgStatusProblem';
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      backgroundColor={getBackground()}
      padding="8px 10px"
      borderRadius="8px"
    >
      {/* <Box padding="10px">
				{getIcon()}
			</Box> */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems={'flex-start'}
      >
        <Text fontSize="10px" color="brand.textGrey">{`${getLabel()} `}</Text>
        <Text>
          <ReactMarkdown>{message}</ReactMarkdown>
        </Text>
      </Box>
    </Box>
  );
};
