import {
  Button,
  IconButton,
  Link,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { FaPodcast, FaTelegramPlane, FaTwitter } from 'react-icons/fa'

import { NostrSvgIcon } from '../../../components/icons'
import { Subscribe } from '../../../components/nav/Subscribe'
import { Caption } from '../../../components/typography'
import {
  AnalyticsUrl,
  GeyserHomepageUrl,
  GeyserNostrUrl,
  GeyserPodcastUrl,
  GeyserPrivacyUrl,
  GeyserTelegramUrl,
  GeyserTermsAndConditionsURL,
  GeyserTwitterUrl,
} from '../../../constants'

export const FilterFooter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <VStack width="100%" alignItems="start" color="neutral.500">
      <Button
        variant="primaryNeutral"
        color="neutral.600"
        size="sm"
        width="100%"
        onClick={onOpen}
      >
        Subscribe
      </Button>
      <Wrap>
        <Link href={GeyserHomepageUrl} isExternal>
          <Caption bold>Geyser, Inc.</Caption>
        </Link>

        <Link href={GeyserTermsAndConditionsURL} isExternal>
          <Caption bold>T&amp;C</Caption>
        </Link>

        <Link href={GeyserPrivacyUrl} isExternal>
          <Caption bold>Privacy</Caption>
        </Link>

        <Link href={AnalyticsUrl} isExternal>
          <Caption bold>Analytics</Caption>
        </Link>
      </Wrap>
      <Wrap>
        <Link href={GeyserTwitterUrl} isExternal>
          <IconButton
            size="sm"
            background={'none'}
            aria-label="Geyser on Twitter"
            icon={<FaTwitter fontSize="20px" />}
          />
        </Link>

        <Link href={GeyserTelegramUrl} isExternal>
          <IconButton
            size="sm"
            background={'none'}
            aria-label="Geyser on Telegram"
            icon={<FaTelegramPlane fontSize="20px" />}
            marginLeft="5px"
          />
        </Link>

        <Link href={GeyserPodcastUrl} isExternal>
          <IconButton
            size="sm"
            background={'none'}
            aria-label="Geyser Podcasts"
            icon={<FaPodcast fontSize="20px" />}
            marginLeft="5px"
          />
        </Link>
        <Link href={GeyserNostrUrl} isExternal>
          <IconButton
            size="sm"
            background={'none'}
            aria-label="Geyser Podcasts"
            icon={<NostrSvgIcon height="20px" width="20px" />}
            marginLeft="5px"
          />
        </Link>
      </Wrap>
      <Subscribe {...{ isOpen, onClose }} style="button-modal" />
    </VStack>
  )
}
