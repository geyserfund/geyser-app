import { Box, HStack } from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { PiCheckCircle } from 'react-icons/pi'

import { CardLayout } from '@/shared/components/layouts/CardLayout'

import { Body } from '../../../../../../../shared/components/typography'
import { ProjectGoalFragment } from '../../../../../../../types'
import { useCustomTheme } from '../../../../../../../utils'
import { GoalTarget } from './GoalTarget'

type Props = {
  goal: ProjectGoalFragment
}

export const GoalCompleted = ({ goal }: Props) => {
  const { t } = useTranslation()

  const { colors } = useCustomTheme()

  return (
    <CardLayout padding={6} display="flex" alignItems="flex-start" width="100%" height="100%" spacing={0}>
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
    </CardLayout>
  )
}
