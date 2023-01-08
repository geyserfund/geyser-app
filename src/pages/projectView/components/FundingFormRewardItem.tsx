import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../../constants';
import { IRewardCount } from '../../../interfaces';
import { ImageWithReload } from '../../../components/ui';
import { ProjectReward } from '../../../types/generated/graphql';

const useStyles = createUseStyles({
  container: {
    backgroundColor: '#FDFDFD',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    border: '2px solid',
    borderColor: colors.bgLightGrey,
    borderRadius: '12px',
    '&:hover': {
      cursor: 'pointer',
      borderColor: colors.gray300,
    },
  },
  focused: {
    borderColor: `${colors.normalLightGreen} !important`,
    boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
  },
  upperContainer: {
    borderBottom: `1px solid ${colors.bgLightGrey}`,
    paddingBottom: '10px',
  },
  backer: {
    padding: '3px 5px',
    backgroundColor: colors.bgLightGrey,
    fontSize: '10px',
    borderRadius: '5px',
  },
  extraIcons: {
    padding: '10px 5px',
    fontSize: '12px',
    height: '40px',
  },
});

interface IRewardItemProps {
  item: ProjectReward;
  updateCount?: (_: IRewardCount) => void;
  count?: number;
  readOnly?: boolean;
  onClick?: any;
}

export const FundingFormRewardItem = ({
  item,
  updateCount,
  count: initialCount,
  readOnly,
  onClick,
}: IRewardItemProps) => {
  const classes = useStyles();

  const { cost, name, backers, description } = item;

  const [count, setCount] = useState(initialCount || 0);
  const { isOpen: focus, onOpen: setFocus, onClose: setBlur } = useDisclosure();

  const handleAdd = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (updateCount) {
      updateCount({ id: item.id, count: newCount });
    }
  };

  const handleRemove = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      if (updateCount) {
        updateCount({ id: item.id, count: newCount });
      }
    }
  };

  const renderIcon = count ? <Text fontSize="20px">{count}</Text> : <AddIcon />;

  return (
    <Box
      tabIndex={-1}
      onFocus={setFocus}
      onBlur={setBlur}
      className={classNames(classes.container, { [classes.focused]: focus })}
      onClick={onClick}
    >
      <HStack className={classes.upperContainer}>
        <VStack spacing={0}>
          <Text fontSize="14px" color={colors.textBlack} fontWeight="bold">{`$${
            cost / 100
          }`}</Text>
          <Text fontSize="10px" color={colors.textBlack} fontWeight="bold">
            per item
          </Text>
        </VStack>
        <VStack alignItems="flex-start" flex={1} spacing="0px">
          <Text fontSize="14px">{name}</Text>
          <Box className={classes.backer}>
            {backers === 1 ? `${backers} backer` : `${backers} backers`}
          </Box>
        </VStack>
        {!readOnly && (
          <HStack>
            {count && (
              <HStack spacing="2px">
                <IconButton
                  onFocus={setFocus}
                  onBlur={setBlur}
                  size="xs"
                  className={classes.extraIcons}
                  aria-label="remove-reward"
                  icon={<MinusIcon />}
                  onClick={handleRemove}
                />
                <IconButton
                  onFocus={setFocus}
                  onBlur={setBlur}
                  size="xs"
                  className={classes.extraIcons}
                  aria-label="add-reward"
                  icon={<AddIcon />}
                  onClick={handleAdd}
                />
              </HStack>
            )}
            <IconButton
              onFocus={setFocus}
              onBlur={setBlur}
              backgroundColor={count ? colors.primary : undefined}
              aria-label="select-reward"
              icon={renderIcon}
              onClick={handleAdd}
            />
          </HStack>
        )}
      </HStack>
      {item.image && (
        <Box>
          <ImageWithReload
            borderRadius="4px"
            src={item.image}
            width="100%"
            height="192px"
            objectFit="cover"
            noCacheId={(Math.random() + 1).toString(36).substring(7)}
          />
        </Box>
      )}
      <Text marginTop="5px">{description}</Text>
    </Box>
  );
};
