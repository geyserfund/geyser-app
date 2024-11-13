import { Avatar, Box, Button, HStack, Text, useClipboard, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import Confetti from 'react-confetti'
import { Link, useNavigate } from 'react-router-dom'

import { AnonymousAvatar } from '@/components/ui'
import { useAuthContext } from '@/context'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useFundingTxAtom } from '@/modules/project/funding/state'
import { CardLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'
import { FundingStatus } from '@/types'

import { ProjectFundingSummary } from '../../components/ProjectFundingSummary'
// import { FundingLayout } from '../../layouts/FundingLayout'
// import { SuccessImageComponent } from './components'
import { ConfirmationMessages } from './components/ConfirmationMessage'
// import { DownloadInvoice } from './components/DownloadInvoice'
// import { SafeToDeleteRefund } from './components/SafeToDeleteRefund'
// import { SendEmailToCreator } from './components/SendEmailToCreator'

export const FundingSuccess = () => {
  const { project } = useFundingFormAtom()
  const { fundingTx } = useFundingTxAtom()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const heroLink = `geyser.fund/project/${project.name}/hero=${user?.username}`
  const { onCopy } = useClipboard(heroLink)

  useEffect(() => {
    if (fundingTx.status !== FundingStatus.Paid) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [fundingTx, navigate, project.name])

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Confetti gravity={0.07} numberOfPieces={250} />
      <Box maxW="800px" mx="auto">
        <Box textAlign="right" mb={4}>
          <Button as={Link} to={getPath('project', project.name)} variant="ghost" colorScheme="gray">
            {t('Back to project')}
          </Button>
        </Box>

        <CardLayout bg="white" borderRadius="xl" overflow="hidden">
          <VStack spacing={8} w="full" p={8}>
            <VStack w="full" spacing={4} bg="linear-gradient(to right, #40E0D0, #87CEEB)" p={8} borderRadius="xl">
              {user?.imageUrl ? (
                <Avatar size="md" src={user?.imageUrl || ''} name={user?.username} />
              ) : (
                <AnonymousAvatar seed={user?.id} />
              )}
              <Text fontSize="xl">{user?.username}</Text>
              <Text fontSize="lg">{t('Successfully contributed to')}</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {project.title}
              </Text>

              <Box mt={4} textAlign="center">
                <Text>
                  {t('Become an')}{' '}
                  <Text as="span" fontWeight="bold">
                    {t('Ambassador')}
                  </Text>{' '}
                  {t('for this project by spreading the word using your')}{' '}
                  <Text as="span" fontWeight="bold">
                    {t('Hero link')}
                  </Text>
                </Text>
                <Box bg="white" p={3} borderRadius="md" mt={2}>
                  <Text>{heroLink}</Text>
                </Box>
                <HStack spacing={4} mt={4} justify="center">
                  <Button variant="outline" bg="white">
                    {t('Share on X')}
                  </Button>
                  <Button onClick={onCopy} bg="black" color="white">
                    {t('Copy Hero link')}
                  </Button>
                </HStack>
              </Box>
            </VStack>

            <ConfirmationMessages />

            <Box w="full">
              <VStack spacing={2} align="stretch">
                <input
                  type="email"
                  placeholder="satoshi@email.com"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #E2E8F0',
                  }}
                />
                <Text fontSize="sm" color="gray.600">
                  {t(
                    "To receive the selected items, you need to send your shipping details to the creator's email. Geyser does not want to store your private information for security reasons.",
                  )}
                </Text>
              </VStack>
            </Box>
          </VStack>
        </CardLayout>
      </Box>
    </Box>
  )
}

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 10v2.67A1.33 1.33 0 0112.67 14H3.33A1.33 1.33 0 012 12.67V10m3-3l3 3m0 0l3-3m-3 3V2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
