import { Button, IconButton, Link, useDisclosure, VStack, Wrap } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaPodcast, FaTelegramPlane } from 'react-icons/fa'
import { RiTwitterXLine } from 'react-icons/ri'
import { Link as ReactLink } from 'react-router-dom'

import { NostrSvgIcon } from '../../../components/icons'
import { Subscribe } from '../../../components/nav/Subscribe'
import { Caption } from '../../../components/typography'
import {
  AnalyticsUrl,
  getPath,
  GeyserGithubUrl,
  GeyserHomepageUrl,
  GeyserNostrUrl,
  GeyserPodcastUrl,
  GeyserTelegramUrl,
  GeyserTwitterUrl,
  GuideUrl,
} from '../../../constants'

export const FilterFooter = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <VStack width="100%" alignItems="start" color="neutral.500">
      <Button variant="primaryNeutral" size="sm" width="100%" onClick={onOpen}>
        {t('Subscribe')}
      </Button>
      <Wrap>
        <Link href={GeyserHomepageUrl} isExternal>
          <Caption bold>Geyser, Inc.</Caption>
        </Link>

        <Link href={GuideUrl} isExternal>
          <Caption bold textTransform="capitalize">
            {t('guide')}
          </Caption>
        </Link>

        <ReactLink to={getPath('legalTerms')} style={{ textDecoration: 'underline' }}>
          <Caption bold>T&amp;C</Caption>
        </ReactLink>

        <ReactLink to={getPath('legalPrivacy')} style={{ textDecoration: 'underline' }}>
          <Caption bold>{t('Privacy')}</Caption>
        </ReactLink>

        <Link href={AnalyticsUrl} isExternal>
          <Caption bold>{t('Analytics')}</Caption>
        </Link>
      </Wrap>
      <Wrap>
        <Link href={GeyserTwitterUrl} isExternal>
          <IconButton
            size="sm"
            background={'none'}
            aria-label="Geyser on Twitter"
            icon={<RiTwitterXLine fontSize="20px" />}
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
        <Link href={GeyserGithubUrl} isExternal>
          <IconButton
            size="sm"
            background={'none'}
            aria-label="Geyser github"
            icon={<FaGithub fontSize="20px" />}
            marginLeft="5px"
          />
        </Link>
      </Wrap>
      <Subscribe {...{ isOpen, onClose }} style="button-modal" />
    </VStack>
  )
}
