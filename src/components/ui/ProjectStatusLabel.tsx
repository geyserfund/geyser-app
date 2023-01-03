import React from 'react';

import { Stack, StackDirection, Text } from '@chakra-ui/react';
import { HTMLChakraProps } from '@chakra-ui/system';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';

import { colors } from '../../constants';
import { Project, WalletStatus } from '../../types/generated/graphql';

interface IProjectStatusLabel extends HTMLChakraProps<'div'> {
  project: Project;
  fontSize?: string;
  fontFamily?: string;
  direction?: StackDirection;
}

export const ProjectStatusLabel = ({
  project,
  fontSize,
  fontFamily,
  direction = 'row',
}: IProjectStatusLabel) => {
  const commonStyles = {
    fontWeight: 'semibold',
    fontFamily,
    fontSize: fontSize || '12px',
  };

  const getIcon = () => {
    if (
      project?.wallets[0] &&
      project.wallets[0]?.state?.status === WalletStatus.Inactive
    ) {
      return <BsFillXCircleFill color={colors.secondaryRed} />;
    }

    if (
      project?.wallets[0] &&
      project.wallets[0].state.status === WalletStatus.Unstable
    ) {
      return <BsFillXCircleFill color={colors.secondaryGold} />;
    }

    if (project.active) {
      return <BsFillCheckCircleFill color={colors.primary600} />;
    }

    if (project.draft) {
      return <BsFillXCircleFill color={colors.neutral500} />;
    }

    return <BsFillXCircleFill color={colors.neutral500} />;
  };

  const getLabel = () => {
    if (
      project?.wallets[0] &&
      project.wallets[0].state.status === WalletStatus.Inactive
    ) {
      return (
        <Text color={colors.secondaryRed} {...commonStyles}>
          INACTIVE WALLET
        </Text>
      );
    }

    if (
      project?.wallets[0] &&
      project.wallets[0].state.status === WalletStatus.Unstable
    ) {
      return (
        <Text color={colors.secondaryGold} {...commonStyles}>
          UNSTABLE WALLET
        </Text>
      );
    }

    if (project.active) {
      return (
        <Text color={colors.primary600} {...commonStyles}>
          RUNNING
        </Text>
      );
    }

    if (project.draft) {
      return (
        <Text color={colors.neutral500} {...commonStyles}>
          DRAFT
        </Text>
      );
    }

    return (
      <Text color={colors.neutral500} {...commonStyles}>
        INACTIVE
      </Text>
    );
  };

  return (
    <Stack direction={direction}>
      {getIcon()}
      {getLabel()}
    </Stack>
  );
};
