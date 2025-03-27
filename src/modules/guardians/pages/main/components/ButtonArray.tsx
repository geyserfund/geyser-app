import { Button, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { fonts } from '@/shared/styles/fonts.ts'

/** Helper function to scroll element to the top of viewport */
/** Helper function to scroll element into view */
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export const ButtonArray = () => {
  const { t } = useTranslation()

  return (
    <HStack spacing={{ base: 2, lg: 8 }} justify="center" w="full" flexWrap="wrap">
      <Button
        size={{ base: 'sm', lg: 'lg' }}
        onClick={() => scrollToElement('guardians-card')}
        variant="soft"
        paddingX="4"
        fontFamily={fonts.cormorant}
        textTransform="uppercase"
        color="neutral1.12"
        fontWeight={600}
      >
        {t('Collectible Cards')}
      </Button>
      <Button
        size={{ base: 'sm', lg: 'lg' }}
        onClick={() => scrollToElement('guardians-jersey')}
        variant="soft"
        paddingX="4"
        fontFamily={fonts.cormorant}
        textTransform="uppercase"
        color="neutral1.12"
        fontWeight={600}
      >
        {t('Jerseys')}
      </Button>
      <Button
        size={{ base: 'sm', lg: 'lg' }}
        onClick={() => scrollToElement('guardians-tshirt')}
        variant="soft"
        paddingX="4"
        fontFamily={fonts.cormorant}
        textTransform="uppercase"
        color="neutral1.12"
        fontWeight={600}
      >
        {t('T-Shirts')}
      </Button>
      <Button
        size={{ base: 'sm', lg: 'lg' }}
        onClick={() => scrollToElement('guardians-bitaxe')}
        variant="soft"
        paddingX="4"
        fontFamily={fonts.cormorant}
        textTransform="uppercase"
        color="neutral1.12"
        fontWeight={600}
      >
        {t('BitAxe')}
      </Button>
    </HStack>
  )
}
