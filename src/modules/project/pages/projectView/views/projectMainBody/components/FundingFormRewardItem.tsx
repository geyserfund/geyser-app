import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, IconButton, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { MouseEvent } from 'react'
import { createUseStyles } from 'react-jss'

import { ImageWithReload } from '../../../../../../../components/ui'
import { AppTheme } from '../../../../../../../context'
import { ProjectRewardForCreateUpdateFragment, RewardCurrency } from '../../../../../../../types'
import { useProjectContext } from '../../../../../context'

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
    height: '30px',
    backgroundColor: colors.neutral[100],
  },
  inputField: {
    padding: '10px 5px',
    height: '30px',
  },
}))

interface IRewardItemProps {
  reward: ProjectRewardForCreateUpdateFragment
  count?: number
  readOnly?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  onRemoveClick?: (e: MouseEvent<HTMLButtonElement>) => void
  onAddClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const FundingFormRewardItem = ({
  reward,
  count,
  readOnly,
  onClick,
  onRemoveClick,
  onAddClick,
}: IRewardItemProps) => {
  const classes = useStyles()

  const { project } = useProjectContext()
  const { onOpen: setFocus, onClose: setBlur } = useDisclosure()
  const isRewardAvailable = reward.maxClaimable ? reward.maxClaimable - reward.sold > (count || 0) : true

  return (
    <Box
      backgroundColor="neutral.50"
      border="2px"
      borderColor="neutral.200"
      borderRadius={12}
      mt={2}
      p={3}
      pos={'relative'}
      width={'100%'}
    >
      <Stack direction="row" flexWrap={'wrap'}>
        <Box
          width="96px"
          height="auto"
          maxHeight="72px"
          borderRadius={6}
          overflow={'hidden'}
          border="1px solid"
          borderColor={'neutral.700'}
        >
          <ImageWithReload src={reward.image || ''} alt={reward.name} width="100%" height="100%" objectFit="contain" />
        </Box>
        <Stack direction="column" flex={1} pl={2} gap={0.25}>
          <Text fontWeight={700} fontSize={16} color="neutral.900">
            {reward.name}
          </Text>
          <Text fontSize={12} color="neutral.600">{`${
            reward.maxClaimable && reward.maxClaimable > 0 ? reward.maxClaimable - reward.sold + ' remaining, ' : ''
          }${reward.sold} sold`}</Text>
        </Stack>
        <Stack direction="column" align={'flex-end'}>
          <Text fontWeight={700} fontSize={16} color="neutral.600">
            {project && project.rewardCurrency === RewardCurrency.Usdcent
              ? `$${reward.cost / 100}`
              : `${reward.cost.toLocaleString()} sats`}
          </Text>
          <Stack direction={'row'} gap={1}>
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
              variant="secondary"
              isActive={Boolean(count)}
              className={classes.inputField}
              size="sm"
              aria-label="select-reward"
              icon={<Text fontSize="14px">{count}</Text>}
              onClick={onAddClick}
            />
            <IconButton
              onFocus={setFocus}
              onBlur={setBlur}
              size="xs"
              className={classes.extraIcons}
              aria-label="add-reward"
              icon={<AddIcon />}
              onClick={onAddClick}
              isDisabled={!isRewardAvailable}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
