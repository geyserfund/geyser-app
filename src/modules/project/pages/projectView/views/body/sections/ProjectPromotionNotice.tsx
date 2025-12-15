import { Button, IconButton, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { PiX } from 'react-icons/pi'
import { Link } from 'react-router'

import { GEYSER_PROMOTIONS_PROJECT_NAME } from '@/modules/discovery/pages/landing/views/mainView/defaultView/sections/Featured.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { lightModeColors } from '@/shared/styles/colors.ts'

const promotionsModalAtom = atomWithStorage('promotionsModal', false)

export const ProjectPromotionNotice = () => {
  const { isProjectOwner } = useProjectAtom()

  const [isPromotionsModalOpen, setIsPromotionsModalOpen] = useAtom(promotionsModalAtom)

  if (isPromotionsModalOpen || !isProjectOwner) {
    return null
  }

  return (
    <CardLayout w="full" background={lightModeColors.orange[3]} direction="row" padding={2}>
      <Image
        src={'https://storage.googleapis.com/geyser-projects-media/utils/amplify_image.png'}
        alt="amplify image"
        width="120px"
        height="120px"
      />
      <IconButton
        variant="ghost"
        colorScheme="error"
        position="absolute"
        right="5px"
        top="5px"
        icon={<PiX />}
        aria-label="close"
        onClick={() => setIsPromotionsModalOpen(true)}
      />
      <VStack flex={1} spacing={0} alignItems="start" paddingY={2}>
        <Body size="lg" bold color={lightModeColors.neutral1[12]}>
          {t('Amplify your reach')}
        </Body>
        <Body size="sm" color={lightModeColors.neutral1[12]}>
          {t('This Christmas we are making it cheaper to get featured on Geyser!')}
        </Body>
        <Button
          as={Link}
          to={getPath('projectRewards', GEYSER_PROMOTIONS_PROJECT_NAME)}
          variant="solid"
          backgroundColor="utils.blackContrast"
          color="utils.whiteContrast"
          marginTop={2}
        >
          {t('View promotion plans')}
        </Button>
      </VStack>
    </CardLayout>
  )
}
