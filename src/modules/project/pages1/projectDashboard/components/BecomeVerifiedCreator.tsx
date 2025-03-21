import { Box, Button, Flex, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { VerifiedBadge } from '@/modules/profile/pages/profilePage/views/account/views/badges/VerifiedBadge.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { lightModeColors } from '@/shared/styles/colors.ts'
import { BrandCreamGradient } from '@/shared/styles/custom.ts'

import { VerificationModal } from './VerificationModal.tsx'

/** Banner component prompting users to become a verified creator */
export const BecomeVerifiedCreator = () => {
  const { t } = useTranslation()

  const verifyIntroModal = useModal()

  return (
    <>
      <VStack paddingX={{ base: 0, lg: 6 }} width="100%">
        <CardLayout borderRadius="md" boxShadow="sm" width="100%" padding={4} background={BrandCreamGradient}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <HStack>
                <Body bold color={lightModeColors.neutral1[12]}>
                  {t('Become a Verified Creator')}
                </Body>
                <VerifiedBadge />
              </HStack>

              <Body size="sm" color={lightModeColors.neutral1[10]}>
                {t(
                  'Earn a "Verified Creator" badge, increase your limits and enable flat contributions on your project.',
                )}
              </Body>
            </Box>
            <Button variant="solid" colorScheme="primary1" onClick={verifyIntroModal.onOpen}>
              {t('Verify Now')}
            </Button>
          </Flex>
        </CardLayout>
      </VStack>
      <VerificationModal {...verifyIntroModal} />
    </>
  )
}
