import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Head } from '@/config/Head'
import { useServiceWorkerUpdate } from '@/context'
import { Body, H2 } from '@/shared/components/typography'

import { NotFoundPageImageUrl } from '../../../shared/constants/platform/url'

export const NotFoundProject = () => {
  const { t } = useTranslation()

  const { updateServiceWorker } = useServiceWorkerUpdate()

  const handleActionButton = () => {
    updateServiceWorker()
    window.history.back()
  }

  return (
    <>
      <Head title="Project Not Found" />
      <VStack
        width="100%"
        height="100%"
        padding="40px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing="20px"
      >
        <Image width={308} height={278} src={NotFoundPageImageUrl} />

        <H2 size="2xl" bold textAlign="center">
          {t('This project does not exist')}
        </H2>
        <Button variant="solid" colorScheme="primary1" width={'400px'} onClick={handleActionButton}>
          {t('Refresh Page')}
        </Button>
        <VStack
          width={{ base: '100%', lg: '600px' }}
          border="2px solid"
          borderColor="neutral.400"
          backgroundColor="neutral.50"
          borderRadius="8px"
          alignItems="flex-start"
          px={10}
          py={5}
          spacing="20px"
        >
          <Body bold>{t('What may have gone wrong:')}</Body>
          <Box width="100%" display="flex" flexDirection="column" ml={5}>
            <ul>
              <li>
                <Body>{t('You may have typed the wrong URL')}</Body>
              </li>
              <li>
                <Body>{t('The project may have been deleted')}</Body>
              </li>
              <li>
                <Body>{t('The creator may have changed the project URL')}</Body>
              </li>
            </ul>
          </Box>
        </VStack>
      </VStack>
    </>
  )
}

export default NotFoundProject
