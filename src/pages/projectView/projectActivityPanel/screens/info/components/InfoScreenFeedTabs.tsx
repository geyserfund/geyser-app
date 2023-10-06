import { Box, HStack, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import { ProjectFragment } from '../../../../../../types'

interface InfoScreenTabsProps {
  project: ProjectFragment
  setTab: Dispatch<SetStateAction<string>>
  tab: string
}

export const InfoScreenFeedTabs = ({
  project,
  tab,
  setTab,
}: InfoScreenTabsProps) => {
  const { t } = useTranslation()

  const createTabButton = (type: string, labelKey: string, count?: number) => (
    <>
      <Button
        _hover={{ backgroundColor: 'none' }}
        w="100%"
        rounded="none"
        bg="none"
        fontWeight={tab === type ? 'bold' : 'normal'}
        fontSize="16px"
        onClick={() => setTab(type)}
      >
        {t(labelKey)}{' '}
        {count && (
          <Text ml={1} bg="neutral.100" rounded="lg" px={1} py={1}>
            {count}
          </Text>
        )}
      </Button>
      <Box
        bg={tab === type ? 'primary.800' : 'primary.50'}
        w="100%"
        h="4px"
        rounded="lg"
      />
    </>
  )

  return (
    <HStack width="100%" spacing="0px" px={{ base: '10px', lg: '20px' }}>
      <Box w="50%">
        {createTabButton(
          'leaderboard',
          'Leaderboard',
          project.fundersCount || 0,
        )}
      </Box>
      <Box w="50%">
        {createTabButton(
          'activity',
          'Contributions',
          project.fundingTxsCount || 0,
        )}
      </Box>
    </HStack>
  )
}
