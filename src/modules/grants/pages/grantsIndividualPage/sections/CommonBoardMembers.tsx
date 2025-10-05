import { Box, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { GrantBoardMember } from '../../../../../types'
import { BoardMembers } from '../components/BoardMembers'
import { GrantItemTitle } from '../components/GrantItemTitle.tsx'

export const CommonBoardMembers = ({ members }: { members: GrantBoardMember[] }) => {
  const { t } = useTranslation()
  return (
    <VStack w={'full'} alignItems={'start'} paddingX={'10px'}>
      <Box my={4}>
        <GrantItemTitle>{t('Challenge Judges')}</GrantItemTitle>
        <Text color={'neutral.600'} fontWeight="600">
          {t('The judges will be responsible for reviewing and evaluating the applications.')}
        </Text>
      </Box>
      <BoardMembers members={members} />
    </VStack>
  )
}
