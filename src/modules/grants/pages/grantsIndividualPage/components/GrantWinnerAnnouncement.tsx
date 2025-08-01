import { Button, Image, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { H3 } from '@/shared/components/typography'

interface GrantWinnerAnnouncementProps extends CardLayoutProps {
  imageUrl: string
  linkUrl: string
}

export const GrantWinnerAnnouncement = ({ imageUrl, linkUrl, ...rest }: GrantWinnerAnnouncementProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout backgroundColor="neutral.0" w="full" alignItems="center" spacing="20px" {...rest}>
      <H3 size="lg" medium>
        {t('See the winner announcement')}
      </H3>

      <Image borderRadius="8px" maxWidth="350px" alt="grant-3-announcement-url" src={imageUrl} />

      <Button
        as={Link}
        isExternal
        href={linkUrl}
        size="sm"
        variant="outline"
        colorScheme="neutral1"
        px="10px"
        textDecoration="none"
      >
        {t('View announcement')}
      </Button>
    </CardLayout>
  )
}
