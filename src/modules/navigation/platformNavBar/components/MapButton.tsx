import { Icon, IconButton, Link, Tooltip } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiGlobeHemisphereWestFill } from 'react-icons/pi'

const MAP_URL = 'https://map.geyser.fund'

export const MapButton = () => {
  return (
    <Tooltip label={t('Browse map')}>
      <IconButton
        as={Link}
        href={MAP_URL}
        isExternal
        icon={<Icon as={PiGlobeHemisphereWestFill} fontSize="28px" />}
        aria-label="Map"
        variant="soft"
        size="lg"
        _hover={{ '& > svg': { color: 'primary1.9' } }}
      />
    </Tooltip>
  )
}
