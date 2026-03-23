import { Button, HStack, useDisclosure } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

import { ProjectShareModal } from '../views/body/sections/header/shareModal'

export const AmbassadorNotice = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Feedback variant={FeedBackVariant.PRIORITY} noIcon>
        <HStack w="full" justifyContent="space-between">
          <Body>{t('Share the project and earn satoshis for every contribution you enable')}</Body>
          <Button variant="solid" colorScheme="cyan" onClick={onOpen}>
            {t('Learn more')}
          </Button>
        </HStack>
      </Feedback>

      <ProjectShareModal isOpen={isOpen} onClose={onClose} projectId="" title="" />
    </>
  )
}
