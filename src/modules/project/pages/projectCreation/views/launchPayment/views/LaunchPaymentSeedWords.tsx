import { Box, Button, ButtonProps, Checkbox, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { ProjectCreationStep } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'

type LaunchPaymentSeedWordsState = {
  seedWords?: string[]
}

export const LaunchPaymentSeedWords = () => {
  const { project } = useProjectAtom()
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as LaunchPaymentSeedWordsState | undefined) || {}
  const seedWords = state.seedWords || []
  const [showSeedWords, setShowSeedWords] = useState(false)
  const [seedWordsSaved, setSeedWordsSaved] = useState(false)

  const { updateProjectWithLastCreationStep, loading } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.IdentityVerification,
    getPath('launchFinalize', project.id),
  )

  const continueProps: ButtonProps = {
    onClick() {
      updateProjectWithLastCreationStep()
    },
    isDisabled: !seedWordsSaved,
    isLoading: loading,
  }

  const backProps: ButtonProps = {
    onClick() {
      navigate(getPath('launchPaymentAccountPassword', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Save your seed words')}
      continueButtonProps={continueProps}
      backButtonProps={backProps}
    >
      <VStack w="full" alignItems="start" gap={6}>
        <Body>
          {t(
            'These recovery words back up your Bitcoin wallet on Geyser. They are the only way to recover your funds if you lose access.',
          )}
        </Body>

        <Feedback variant={FeedBackVariant.WARNING}>
          <Body size="sm">
            {t(
              'Store them somewhere secure and offline, like a paper backup. Never share them. Anyone with these words can access your Bitcoin.',
            )}
          </Body>
        </Feedback>

        <Feedback variant={FeedBackVariant.INFO}>
          <Body size="sm">
            {t('These recovery words store your Bitcoin on the Rootstock sidechain or on base-chain.')}
          </Body>
        </Feedback>

        <VStack w="full" alignItems="start" gap={4}>
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <Body size="lg" bold>
              {t('Recovery words')}
            </Body>
            <Button size="sm" variant="soft" colorScheme="primary1" onClick={() => setShowSeedWords((prev) => !prev)}>
              {showSeedWords ? t('Hide words') : t('Show words')}
            </Button>
          </HStack>

          <SimpleGrid w="full" columns={{ base: 2, md: 3 }} spacing={3}>
            {seedWords.map((word, index) => (
              <Box key={`${word}-${index}`} borderWidth="1px" borderColor="neutral1.4" borderRadius="md" p={3}>
                <HStack spacing={2}>
                  <Body size="sm" muted medium>
                    {index + 1}.
                  </Body>
                  <Body size="sm" medium>
                    {showSeedWords ? word : '••••••••'}
                  </Body>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>

          <Checkbox
            colorScheme="primary1"
            isChecked={seedWordsSaved}
            onChange={(event) => setSeedWordsSaved(event.target.checked)}
          >
            <Body size="sm">{t('I stored my seed words somewhere secure.')}</Body>
          </Checkbox>
        </VStack>
      </VStack>
    </ProjectCreationPageWrapper>
  )
}
