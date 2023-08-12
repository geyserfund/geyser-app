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

  const contributionButton = () => {
    return (
      <>
        <Button
          _hover={{ backgroundColor: 'none' }}
          w="100%"
          rounded="none"
          bg="none"
          fontWeight={tab === 'activity' ? 'bold' : 'normal'}
          fontSize="16px"
          onClick={() => setTab('activity')}
        >
          {t('Contributions')}{' '}
          <Text ml={1} bg="neutral.100" rounded="lg" px={1} py={1}>
            {project.fundingTxsCount}
          </Text>
        </Button>
        <Box
          bg={tab === 'activity' ? 'primary.800' : 'primary.50'}
          w="100%"
          h="4px"
          rounded="lg"
        ></Box>
      </>
    )
  }

  const leaderBoardButton = () => {
    return (
      <>
        <Button
          _hover={{ backgroundColor: 'none' }}
          w="100%"
          rounded="none"
          bg="none"
          fontWeight={tab === 'activity' ? 'normal' : 'bold'}
          fontSize="16px"
          onClick={() => setTab('leaderboard')}
        >
          {t('Leaderboard')}{' '}
          <Text ml={1} bg="neutral.100" rounded="lg" px={1} py={1}>
            {project.fundersCount}
          </Text>
        </Button>
        <Box
          bg={tab === 'activity' ? 'primary.50' : 'primary.800'}
          w="100%"
          h="4px"
          rounded="lg"
        ></Box>
      </>
    )
  }

  return (
    <HStack width="100%" spacing="0px" px={{ base: '10px', lg: '20px' }}>
      <Box w="50%">{contributionButton()}</Box>;
      <Box w="50%">{leaderBoardButton()}</Box>;
    </HStack>
  )
}
