import { Button, Container, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import MapCanvas from '../../components/canvas/MapCanvas'

export const MapPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Container maxWidth="5xl" pt={10}>
      <Button
        mt={4}
        size="sm"
        bg="neutral.0"
        variant="outline"
        gap={2}
        onClick={() => navigate(-1)}
        fontSize="sm"
      >
        <FaArrowLeft /> {t('Back')}
      </Button>
      <VStack spacing={4} justify="center" textAlign="center" mb={12}>
        <Container maxWidth="xl">
          <Text mb={4} variant="h2">
            {t('Geyser badges')}
          </Text>
          <Text variant="body1">{t('Testing')}</Text>
        </Container>
      </VStack>
      <MapCanvas />
    </Container>
  )
}

export default MapPage
