import { Box, HStack, VStack } from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { PiCheckCircle } from 'react-icons/pi'

import { Body } from '../../../../../../../shared/components/typography'
import { ProjectGoal } from '../../../../../../../types'
import { useCustomTheme } from '../../../../../../../utils'
import { GoalTarget } from './GoalTarget'

type Props = {
  goal: ProjectGoal
}

export const GoalCompleted = ({ goal }: Props) => {
  const { t } = useTranslation()

  const { colors } = useCustomTheme()

  return (
    <VStack display="flex" alignItems="flex-start" width="100%" height="100%" spacing={0}>
      <HStack w="full" justifyContent={'start'}>
        {goal.emojiUnifiedCode && (
          <Box display="flex" justifyContent="center" width="24px" height="34px">
            <Emoji size={24} unified={goal.emojiUnifiedCode} emojiStyle={EmojiStyle.NATIVE} />
          </Box>
        )}
        <Body size="xl" medium dark>
          {goal.title}
        </Body>
      </HStack>

      <Body size="md" medium dark pt={1}>
        {goal.description}
      </Body>

      <HStack w="full" justifyContent={'space-between'} pt={3}>
        <HStack spacing={0.5}>
          <PiCheckCircle fontSize="12px" color={colors.primary1[11]} />
          <Body size="xs" medium dark>
            {t('Completed')}
          </Body>
          <Body size="xs" muted>
            {DateTime.fromMillis(goal.completedAt).toFormat('dd, LLL yyyy')}
          </Body>
        </HStack>

        <GoalTarget goal={goal} />
      </HStack>
    </VStack>
  )
}
