import { Box, Button, HStack, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getRootstockExplorerAddressUrl } from '@/shared/utils/external/rootstock.ts'

type RootstockAddressCardProps = {
  address?: string | null
}

export const RootstockAddressCard = ({ address }: RootstockAddressCardProps) => {
  return (
    <VStack spacing={2} align="flex-start" w="full">
      <Body size="md" medium color="neutral1.11">
        {t('Rootstock address')}
      </Body>
      <Box w="full" px={4} py={3} borderWidth="1px" borderColor="neutral1.6" borderRadius="xl" bg="neutral1.1">
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems={{ base: 'flex-start', md: 'center' }}
          flexDirection={{ base: 'column', md: 'row' }}
          spacing={3}
        >
          <Body size="md" color="neutral1.11" overflowWrap="anywhere" flex={1} fontFamily="mono" medium>
            {address}
          </Body>
          {address ? (
            <Button
              as={ChakraLink}
              href={getRootstockExplorerAddressUrl(address)}
              isExternal
              size="sm"
              variant="soft"
              colorScheme="blue"
              flexShrink={0}
            >
              {t('View on Rootstock explorer')}
            </Button>
          ) : null}
        </HStack>
      </Box>
    </VStack>
  )
}
