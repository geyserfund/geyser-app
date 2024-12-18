import { forwardRef, Image, ImageProps, VStack } from '@chakra-ui/react'
import Tilt from 'react-parallax-tilt'

export const ImageComponentForCards = forwardRef((props: ImageProps, ref) => {
  return (
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
      <VStack ref={ref} height="430px" paddingY={2}>
        <Image height="full" {...props} />
      </VStack>
    </Tilt>
  )
})
