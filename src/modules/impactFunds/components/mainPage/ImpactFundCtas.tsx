import { Button, HStack, Icon, Link as ChakraLink } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRightBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'

type DonateButtonProps =
  | {
      onClick: () => void
    }
  | {
      to: string
    }

/** Primary amber Donate CTA for Impact Funds surfaces. */
export function ImpactFundDonateButton(props: DonateButtonProps): JSX.Element {
  if ('onClick' in props) {
    return (
      <Button
        type="button"
        onClick={props.onClick}
        size="lg"
        variant="solid"
        colorScheme="amber"
        borderRadius="8px"
        fontWeight="bold"
      >
        {t('Donate now')}
      </Button>
    )
  }

  return (
    <Button as={Link} to={props.to} size="lg" variant="solid" colorScheme="amber" borderRadius="8px" fontWeight="bold">
      {t('Donate now')}
    </Button>
  )
}

type LearnMoreButtonProps = {
  href?: string
  isExternal?: boolean
  to?: string
}

/** Ghost Learn more CTA with arrow affordance. */
export function ImpactFundLearnMoreButton({ href, isExternal, to }: LearnMoreButtonProps): JSX.Element {
  const content = (
    <HStack spacing={1.5}>
      <Body bold color="neutral1.11">
        {t('Learn More')}
      </Body>
      <Icon as={PiArrowRightBold} className="learn-more-arrow" boxSize={4} color="neutral1.11" />
    </HStack>
  )
  const commonProps = {
    size: 'md' as const,
    variant: 'ghost' as const,
    colorScheme: 'neutral1' as const,
    borderRadius: '8px',
    _hover: { bg: 'transparent' },
    sx: {
      '& .learn-more-arrow': {
        opacity: 0,
        transform: 'translateX(-6px)',
        transition: 'all 0.2s',
      },
    },
  }

  if (to) {
    return (
      <Button as={Link} to={to} {...commonProps}>
        {content}
      </Button>
    )
  }

  return (
    <Button as={ChakraLink} href={href} isExternal={isExternal} {...commonProps}>
      {content}
    </Button>
  )
}
