import { Box, Button, Flex, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { BrandCreamGradient } from '@/shared/styles/custom.ts'

import { VerificationModal } from './VerificationModal.tsx'

/** Banner component prompting users to become a verified creator */
export const BecomeVerifiedCreator = () => {
  const { t } = useTranslation()

  const verifyIntroModal = useModal()

  return (
    <>
      <VStack padding={{ base: 0, lg: 6 }} width="100%">
        <CardLayout borderRadius="md" boxShadow="sm" width="100%" padding={4} background={BrandCreamGradient}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Body bold>{t('Become a Verified Creator')}</Body>
              <Body size="sm" light>
                {t(
                  'Earn a "Verified Creator" badge, increase your limits and enable flat contributions on your project.',
                )}
              </Body>
            </Box>
            <Button variant="outline" colorScheme="primary1" onClick={verifyIntroModal.onOpen}>
              {t('Verify Now')}
            </Button>
          </Flex>
        </CardLayout>
      </VStack>
      <VerificationModal {...verifyIntroModal} />
    </>
  )
}
