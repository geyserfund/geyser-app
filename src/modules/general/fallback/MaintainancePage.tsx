import { Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { H1, H3 } from '@/shared/components/typography/Heading.tsx'

export const MaintainancePage = () => {
  return (
    <VStack
      width="100%"
      minHeight="100vh"
      alignItems="center"
      spacing={8}
      padding={6}
      paddingTop={{ base: 10, lg: 20 }}
    >
      <Image
        src="https://storage.googleapis.com/geyser-projects-media/utils/server_maintainance1.png"
        alt="Maintenance in progress"
        maxWidth="500px"
        width="100%"
      />
      <VStack spacing={4} maxWidth="900px" textAlign="center">
        <H1 bold>{t("We're Upgrading Your Experience")}</H1>
        <VStack spacing={2}>
          <H3>{t('Our team is working hard behind the scenes to bring you something better.')}</H3>
          <H3>{t("We're fine-tuning, polishing, and preparing an enhanced Geyser experience just for you.")}</H3>
          <H3>{t('Thank you for your patience – stay tuned for a refreshing update!')}</H3>
        </VStack>
      </VStack>
    </VStack>
  )
}
