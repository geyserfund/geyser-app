import {
  Box,
  Button,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { Modal } from '../layouts'
import { Body1 } from '../typography'

export enum ImageCrop {
  Square = 'square',
  Rectangle = 'rectangle',
}

interface ImageCropperModalProps {
  isOpen: boolean
  onClose: () => void
  onCompleted: (_: File) => void
  fileSrc?: File
  shape?: ImageCrop
}

export const ImageCropperModal = ({
  isOpen,
  onClose,
  onCompleted,
  fileSrc,
  shape,
}: ImageCropperModalProps) => {
  const [imageSrc, setImageSrc] = useState('')

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()

  const startCrop = useCallback(async (file: File) => {
    const value = await readFile(file)
    setImageSrc(`${value}`)
  }, [])

  useEffect(() => {
    if (fileSrc) {
      startCrop(fileSrc)
    }
  }, [fileSrc, startCrop])

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const uploadCroppedImage = async () => {
    onClose()
    if (!croppedAreaPixels) return
    try {
      const croppedImage = await getCroppedImg({
        imageSrc,
        pixelCrop: croppedAreaPixels,
        rotation,
        fileName: fileSrc?.name || '',
      })
      if (croppedImage) {
        onCompleted(croppedImage)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Upload image'} size="lg">
      <VStack>
        <Box position={'relative'} width="100%" height="400px">
          <Cropper
            image={imageSrc}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={shape === ImageCrop.Square ? 1 : 16 / 9}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Box>

        <HStack></HStack>
        <Body1>Zoom</Body1>
        <Slider
          aria-label="slider-ex-1"
          defaultValue={1}
          min={1}
          max={3}
          step={0.1}
          onChange={setZoom}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button variant="primary" onClick={uploadCroppedImage}>
          Save
        </Button>
      </VStack>
    </Modal>
  )
}

const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

interface getCroppedImgProps {
  imageSrc: string
  pixelCrop: Area
  fileName: string
  rotation?: number
  flip?: { horizontal: boolean; vertical: boolean }
}

export const getCroppedImg = async ({
  imageSrc,
  pixelCrop,
  fileName,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
}: getCroppedImgProps): Promise<File | undefined> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  )

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  // draw rotated image
  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')

  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    return
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((file) => {
      if (file) {
        resolve(blobToFile(file, fileName))
      } else {
        reject(new Error('Failed to crop image'))
      }
    }, 'image/jpeg')
  })
}

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  const b: any = theBlob
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date()
  b.name = fileName

  // Cast to a File() type
  return theBlob as File
}
