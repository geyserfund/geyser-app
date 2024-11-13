import { Button, Input, Link, useClipboard, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCopy } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { useAuthModal } from '@/pages/auth/hooks'
import { Body } from '@/shared/components/typography'
import { useNotification } from '@/utils'

interface ProjectShareViewProps {
  heroCount?: number
  satAmount?: number
}

export const ProjectShareView = ({ heroCount = 10, satAmount = 1000000 }: ProjectShareViewProps) => {
  const { t } = useTranslation()
  const toast = useNotification()
  const { isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()

  const heroId = 'hero'
  const heroLink = `https://geyser.fund/project/geyser${isLoggedIn ? `&hero=${heroId}` : ''}`
  const { onCopy, hasCopied } = useClipboard(heroLink)

  const handleCopy = () => {
    onCopy()
    toast.success({
      title: t('Copied!'),
      description: t('Hero link copied to clipboard'),
    })
  }

  return (
    <VStack w="100%">
      <VStack border="1px solid" borderColor="neutral1.6" borderRadius="md" width="100%" spacing={0}>
        <VStack
          bgGradient={isLoggedIn ? 'linear(to-r, primary1.4, indigo.3)' : 'linear(to-r, neutral1.4, neutral1.2)'}
          p={4}
          borderTopRadius="md"
          width="100%"
          spacing={2}
        >
          <Body size="md" textAlign="center">
            {!heroCount ? (
              <Body>
                Be the first <strong>hero</strong> to spread the word and enable more <strong>contributions</strong> to
                this project.
              </Body>
            ) : (
              <Body>
                Join the <strong>{heroCount}</strong> heroes that have spread the word and enabled{' '}
                <strong>{satAmount?.toLocaleString()}</strong> sats in <strong>contributions</strong> to this project.
              </Body>
            )}
          </Body>
          {!isLoggedIn && (
            <Body size="md" borderTop="1px solid" borderColor="neutral1.6" pt={2} mt={2} textAlign="center">
              <Link
                color="primary1.500"
                onClick={(e) => {
                  e.preventDefault()
                  loginOnOpen()
                }}
              >
                Sign in
              </Link>{' '}
              to get your Hero ID and track the impact of sharing
            </Body>
          )}
        </VStack>
        <VStack width="100%" p={3} bgColor="neutral1.2">
          <Input
            value={heroLink.replace('https://', '')}
            readOnly
            bg="white"
            borderColor="neutral1.6"
            _hover={{ borderColor: 'neutral1.8' }}
          />

          <Button
            variant="solid"
            colorScheme="primary1"
            w="full"
            rightIcon={<PiCopy />}
            onClick={handleCopy}
            isDisabled={hasCopied}
            fontSize="md"
          >
            {t('Copy link')}
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}
