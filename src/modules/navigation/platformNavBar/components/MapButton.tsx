import { Icon, IconButton, Link } from '@chakra-ui/react'
import { PiGlobeHemisphereWestFill } from 'react-icons/pi'

const MAP_URL = 'https://map.geyser.fund'

export const MapButton = () => {
  return (
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
  )
}
