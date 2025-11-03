import { Button, HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import Confetti from 'react-confetti'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { ContributionSuccessIllustrationUrl, getPath } from '@/shared/constants/index.ts'
import { lightModeColors } from '@/shared/styles/colors.ts'

export const SuccessfullyAppliedToGrant = ({ projectName }: { projectName?: string }) => {
  return (
    <VStack w="full" alignItems="center" h="100%" spacing={10} paddingTop={6}>
      <CardLayout mobileDense w="full" padding={{ base: 0, lg: 12 }} alignItems="center" maxWidth="800px">
        <Confetti
          gravity={0.07}
          numberOfPieces={250}
          colors={[
            lightModeColors.primary1[5],
            lightModeColors.primary1[6],
            lightModeColors.primary1[8],
            lightModeColors.primary1[9],
            lightModeColors.amber[6],
            lightModeColors.amber[8],
            lightModeColors.orange[6],
            lightModeColors.orange[8],
            lightModeColors.ruby[6],
            lightModeColors.ruby[8],
          ]}
        />
        <VStack w="full" maxWidth="800px" alignItems="start" spacing={6}>
          <VStack w="full" alignItems="start">
            <VStack
              id="successful-contribution-banner"
              w="full"
              spacing={4}
              justifyContent="center"
              backgroundColor="utils.pbg"
            >
              <Image height="140px" src={ContributionSuccessIllustrationUrl} alt="Contribution success" />

              <VStack w="full" spacing={1} zIndex={1}>
                <H3 light fontSize="2xl" regular w="full" textAlign={'center'}>
                  {t('Successfully applied to grant')}
                </H3>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </CardLayout>
      <HStack w="full" maxWidth="800px">
        <Button
          flex={1}
          size="lg"
          variant="solid"
          colorScheme="primary1"
          as={Link}
          to={getPath('discoveryGrant', 'time2build')}
        >
          {t('Back to grants')}
        </Button>
        <Button
          flex={1}
          size="lg"
          variant="outline"
          colorScheme="neutral1"
          as={Link}
          to={getPath('project', projectName || '')}
        >
          {t('View your project')}
        </Button>
      </HStack>
    </VStack>
  )
}
