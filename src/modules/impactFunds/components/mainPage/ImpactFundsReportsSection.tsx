import { Box, Button, Flex, Icon, Image, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowSquareOut } from 'react-icons/pi'

import { H2 } from '@/shared/components/typography/Heading.tsx'

import {
  IMPACT_FUNDS_CIRCULAR_ECONOMIES_REPORT_BANNER_URL,
  IMPACT_FUNDS_CIRCULAR_ECONOMIES_REPORT_PDF_URL,
} from '../../utils/constants.ts'

type ImpactFundsReportsSectionProps = {
  sectionPrimaryTextColor: string
}

/** Report banner spanning the content column (same horizontal margins as the page). */
export function ImpactFundsReportsSection({
  sectionPrimaryTextColor,
}: ImpactFundsReportsSectionProps): JSX.Element {
  const reportPdfUrl = IMPACT_FUNDS_CIRCULAR_ECONOMIES_REPORT_PDF_URL
  const reportBannerUrl = IMPACT_FUNDS_CIRCULAR_ECONOMIES_REPORT_BANNER_URL

  return (
    <VStack align="stretch" spacing={4} w="full" pt={{ base: 10, md: 12 }}>
      <H2 size="2xl" bold color={sectionPrimaryTextColor}>
        {t('Impact Fund Reports')}
      </H2>

      <Box position="relative" lineHeight={0} w="full">
        <ChakraLink href={reportPdfUrl} isExternal display="block" _hover={{ opacity: 0.98 }}>
          <Image
            src={reportBannerUrl}
            alt={t('The Case for Bitcoin Circular Economies')}
            w="full"
            h="auto"
            objectFit="cover"
          />
        </ChakraLink>

        <Flex
          position="absolute"
          inset={0}
          align="flex-start"
          justify="flex-end"
          p={{ base: 4, md: 6 }}
          pointerEvents="none"
        >
          <Button
            as={ChakraLink}
            href={reportPdfUrl}
            isExternal
            pointerEvents="auto"
            size="md"
            bg="white"
            color="black"
            borderRadius="md"
            fontWeight="semibold"
            rightIcon={<Icon as={PiArrowSquareOut} aria-hidden boxSize="1.15em" />}
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.200' }}
          >
            {t('Read full report')}
          </Button>
        </Flex>
      </Box>
    </VStack>
  )
}
