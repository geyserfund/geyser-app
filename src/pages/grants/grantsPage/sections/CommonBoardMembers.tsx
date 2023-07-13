import { Box, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { fonts } from '../../../../styles'
import { GrantBoardMember } from '../../../../types'
import { BoardMembers } from '../../components/BoardMembers'

export const CommonBoardMembers = ({
  members,
}: {
  members: GrantBoardMember[]
}) => {
  const { t } = useTranslation()
  return (
    <VStack w={'full'} alignItems={'start'}>
      <Box my={8}>
        <Text fontFamily={fonts.interBlack} fontSize="24px" fontWeight={'bold'}>
          {t('Principled Bitcoiners Board')}
        </Text>
        <Text color={'neutral.600'} fontWeight="600">
          {t(
            'The board will be responsible for reviewing and evaluating the applications.',
          )}
        </Text>
      </Box>
      <BoardMembers members={members} />
    </VStack>
  )
}
