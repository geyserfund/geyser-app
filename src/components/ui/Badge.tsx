import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { useState } from 'react'

export const Badge = ({ badge }: { badge: string }) => {
  const [hover, setHover] = useState(false)
  return (
    <Box
      position="relative"
      as="span"
      backgroundColor="neutral.300"
      padding="0px 8px"
      borderRadius="20px"
      onMouseEnter={() => {
        if (badge === '🏅' || badge === '🏆' || badge === '👑' || badge === '⭐') {
          setHover(true)
        }
      }}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <>
          <Box position="absolute" bottom="-85px" left="-93px" p={2} zIndex={2} bg="neutral.500" rounded="lg">
            <Text color="neutral.0" fontWeight="bold" fontSize="10px">
              Emoji badges
            </Text>
            <HStack mt={1}>
              <VStack spacing={0} rounded="lg" bg="rgba(0, 0, 0, 0.11)" px={3}>
                <Box>🏅</Box>
                <Text color="neutral.0" fontSize="9px" fontWeight="medium">
                  $10
                </Text>
              </VStack>
              <VStack spacing={0} rounded="lg" bg="rgba(0, 0, 0, 0.11)" px={3}>
                <Box>🏆</Box>
                <Text color="neutral.0" fontSize="9px" fontWeight="medium">
                  $100
                </Text>
              </VStack>
              <VStack spacing={0} rounded="lg" bg="rgba(0, 0, 0, 0.11)" px={3}>
                <Box>👑</Box>
                <Text color="neutral.0" fontSize="9px" fontWeight="medium">
                  $300
                </Text>
              </VStack>
              <VStack spacing={0} rounded="lg" bg="rgba(0, 0, 0, 0.11)" px={3}>
                <Box>⭐</Box>
                <Text color="neutral.0" fontSize="9px" fontWeight="medium">
                  $500
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Box
            position="absolute"
            bottom="-24px"
            left="-5px"
            zIndex={1}
            borderLeft="20px solid transparent"
            borderRight="20px solid transparent"
            borderBottom="20px solid"
            borderBottomColor="neutral.500"
          />
        </>
      )}
      <Text fontSize="10px">{badge}</Text>
    </Box>
  )
}

export default Badge
