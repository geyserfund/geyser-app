import React from 'react';

import { HStack, Text } from '@chakra-ui/react';
import { HTMLChakraProps } from '@chakra-ui/system';
import {
  BsFillCheckCircleFill,
  BsFillXCircleFill,
  BsExclamationCircleFill,
} from 'react-icons/bs';

import { colors } from '../../constants';
import { Project } from '../../types/generated/graphql';

interface IProjectStatusLabel extends HTMLChakraProps<'div'> {
  project: Project;
}

export const ProjectStatusLabel = ({
  project,
  ...rest
}: IProjectStatusLabel) => {
  // This function will need to be refactored to use project.status

  const renderLabel = () => {
    if (project.active) {
      return (
        <HStack {...rest}>
          <Text
            fontWeight={'semibold'}
            fontSize="12px"
            color="brand.primary800"
            textTransform="uppercase"
          >
            RUNNING
          </Text>
          <BsFillCheckCircleFill color={colors.primary800} />
        </HStack>
      );
    }

    if (project.draft) {
      return (
        <HStack>
          <Text
            fontWeight={'semibold'}
            fontSize="12px"
            color={'orange'}
            textTransform="uppercase"
          >
            DRAFT
          </Text>
          <BsExclamationCircleFill color={'orange'} />
        </HStack>
      );
    }

    return (
      <HStack>
        <Text
          fontWeight={'semibold'}
          fontSize="12px"
          color={colors.neutral500}
          textTransform="uppercase"
        >
          INACTIVE
        </Text>
        <BsFillXCircleFill color={colors.neutral500} />
      </HStack>
    );
  };

  return renderLabel();
};
