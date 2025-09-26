import { Button, ButtonProps, ComponentWithAs, Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'

export const DiscoverMoreButton: ComponentWithAs<'button', ButtonProps> = (props) => {
  return (
    <Button variant="ghost" colorScheme="neutral1" rightIcon={<Icon as={PiArrowRight} />} {...props}>
      {t('Discover more')}
    </Button>
  )
}
