import { Box, HStack, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ProjectState } from '@/modules/project/state/projectAtom'

interface InfoScreenTabsProps {
  project: ProjectState
}

export const InfoScreenFeedTabs = ({ project }: InfoScreenTabsProps) => {
  const { t } = useTranslation()

  const createTabButton = useCallback(
    (labelKey: string, count?: number) => (
      <>
        <Button
          _hover={{ backgroundColor: 'none' }}
          w="100%"
          rounded="none"
          bg="none"
          // onClick={() => setTab(type)}
        >
          <Text
            isTruncated
            // fontWeight={type === 'tab' ? 'bold' : 'normal'}
            fontSize="16px"
          >
            {t(labelKey)}
          </Text>
          {count && (
            <Text ml={1} bg="neutral.100" rounded="lg" px={1} py={1}>
              {count}
            </Text>
          )}
        </Button>
        <Box
          // bg={type === 'tab' ? 'primary.800' : 'primary.50'}
          w="100%"
          h="4px"
          rounded="lg"
        />
      </>
    ),
    [t],
  )

  return (
    <HStack width="100%" spacing="0px" px={{ base: '10px', lg: '20px' }}>
      <Box w="50%">{createTabButton('Leaderboard', project.fundersCount || 0)}</Box>
      <Box w="50%">{createTabButton('Contributions', project.fundingTxsCount || 0)}</Box>
    </HStack>
  )
}
