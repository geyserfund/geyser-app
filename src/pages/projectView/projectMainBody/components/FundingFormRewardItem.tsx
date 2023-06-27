import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import classNames from 'classnames'
import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'

import { ItemCard } from '../../../../components/layouts/ItemCard'
import { ImageWithReload } from '../../../../components/ui'
import { AppTheme } from '../../../../context'
import { ProjectRewardForCreateUpdateFragment } from '../../../../types'

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  focused: {
    borderColor: `${colors.neutral[500]} !important`,
    boxShadow: `0 0 0 1px ${colors.neutral[500]}`,
  },
  upperContainer: {
    borderBottom: `1px solid ${colors.neutral[100]}`,
    paddingBottom: '10px',
  },
  backer: {
    padding: '3px 5px',
    backgroundColor: colors.neutral[100],
    fontSize: '10px',
    borderRadius: '5px',
  },
  extraIcons: {
    padding: '10px 5px',
    fontSize: '12px',
    height: '40px',
  },
}))

interface IRewardItemProps {
  item: ProjectRewardForCreateUpdateFragment
  count?: number
  readOnly?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  onRemoveClick?: (e: MouseEvent<HTMLButtonElement>) => void
  onAddClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const FundingFormRewardItem = ({
  item,
  count,
  readOnly,
  onClick,
  onRemoveClick,
  onAddClick,
}: IRewardItemProps) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const { cost, name, sold, description } = item

  const { isOpen: focus, onOpen: setFocus, onClose: setBlur } = useDisclosure()

  const renderIcon = count ? <Text fontSize="20px">{count}</Text> : <AddIcon />

  return (
    <ItemCard
      tabIndex={-1}
      onFocus={setFocus}
      onBlur={setBlur}
      className={classNames({ [classes.focused]: focus })}
      onClick={onClick}
    >
      <HStack className={classes.upperContainer}>
        <VStack spacing={0}>
          <Text fontSize="14px" color={'neutral.1000'} fontWeight="bold">{`$${
            cost / 100
          }`}</Text>
          <Text fontSize="10px" color={'neutral.1000'} fontWeight="bold">
            {t('per item')}
          </Text>
        </VStack>
        <VStack alignItems="flex-start" flex={1} spacing="0px">
          <Text fontSize="14px">{name}</Text>
          <Box className={classes.backer}>
            {sold === 1 ? `${sold} ${t('backer')}` : `${sold} ${t('backers')}`}
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
                  onClick={onRemoveClick}
                />
                <IconButton
                  onFocus={setFocus}
                  onBlur={setBlur}
                  size="xs"
                  className={classes.extraIcons}
                  aria-label="add-reward"
                  icon={<AddIcon />}
                  onClick={onAddClick}
                />
              </HStack>
            )}
            <IconButton
              onFocus={setFocus}
              onBlur={setBlur}
              variant="secondary"
              isActive={Boolean(count)}
              aria-label="select-reward"
              icon={renderIcon}
              onClick={onAddClick}
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
          />
        </Box>
      )}
      <Text marginTop="5px">{description}</Text>
    </ItemCard>
  )
}
