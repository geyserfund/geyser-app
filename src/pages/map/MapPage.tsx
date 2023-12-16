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
      <MapCanvas />
    </Container>
  )
}

export default MapPage
