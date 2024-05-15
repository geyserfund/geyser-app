import { Box, Button, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, VStack } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { useTranslation } from 'react-i18next'

import { blobToFile, createImage, fileToBase64, getRadianAngle, rotateSize } from '../../utils'
import { Modal } from '../layouts'
import { Body2 } from '../typography'

export enum ImageCrop {
  Square = 1,
  Rectangle = 3,
  Reward = 4 / 3,
}

interface ImageCropperModalProps {
  isOpen: boolean
  onClose: () => void
  onCompleted: (_: File) => void
  fileSrc?: File
  aspectRatio?: number
}

export const ImageCropperModal = ({ isOpen, onClose, onCompleted, fileSrc, aspectRatio }: ImageCropperModalProps) => {
  const { t } = useTranslation()

  const [imageSrc, setImageSrc] = useState('')

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()

  const startCrop = useCallback(async (file: File) => {
    const value = await fileToBase64(file)
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
        <Box position="relative" width="100%" height="400px">
          <Box position={'absolute'} width="100%" height="100%" top="0" left="0">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
        </Box>

        <HStack width="100%" spacing="10px">
          <Body2 bold>{t('Zoom')}</Body2>
          <Slider aria-label="slider-ex-1" defaultValue={1} min={1} max={3} step={0.1} onChange={setZoom} flex="1">
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </HStack>

        <HStack width="full">
          <Button flex="1" variant="primary" onClick={uploadCroppedImage}>
            {t('Save')}
          </Button>
        </HStack>
      </VStack>
    </Modal>
  )
}

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
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

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
