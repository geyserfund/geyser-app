import { Button, Image, Link } from '@chakra-ui/react'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { H3 } from '../../../components/typography'

interface GrantWinnerAnnouncementProps extends CardLayoutProps {
  imageUrl: string
  linkUrl: string
}

export const GrantWinnerAnnouncement = ({
  imageUrl,
  linkUrl,
  ...rest
}: GrantWinnerAnnouncementProps) => {
  return (
    <CardLayout
      backgroundColor="white"
      w="full"
      alignItems="center"
      spacing="20px"
      {...rest}
    >
      <H3>See the winner announcement</H3>

      <Image maxWidth="350px" alt="grant-3-announcement-url" src={imageUrl} />

      <Button
        as={Link}
        isExternal
        href={linkUrl}
        size="sm"
        variant="containedWhite"
        px="10px"
        textDecoration="none"
      >
        Announcement
      </Button>
    </CardLayout>
  )
}
